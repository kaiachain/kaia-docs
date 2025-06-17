// scripts/optimize-images.js
const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const MAX_DIMENSION = 16383;

// Store optimized images outside build directory to survive builds
const OPTIMIZED_IMAGES_DIR = path.join(process.cwd(), '.optimized-images');
const CACHE_FILE = path.join(process.cwd(), '.image-optimization-cache.json');
let optimizationCache = {};

const config = {
  sourceDir: './static/img',
  buildDir: './build/assets/images',
  outputDir: OPTIMIZED_IMAGES_DIR,
  formats: {
    avif: {
      options: { quality: 75, effort: 4 },
      processor: async (sharpInstance, outputPath, isAnimated) => {
        if (isAnimated) return false;
        await sharpInstance.avif(config.formats.avif.options).toFile(outputPath);
        return true;
      },
    },
    webp: {
      options: { quality: 80 },
      processor: async (sharpInstance, outputPath) => {
        await sharpInstance.webp(config.formats.webp.options).toFile(outputPath);
        return true;
      },
    },
    jpeg: {
      options: { quality: 85, mozjpeg: true },
      processor: async (sharpInstance, outputPath) => {
        await sharpInstance.jpeg(config.formats.jpeg.options).toFile(outputPath);
        return true;
      }
    },
    png: {
      options: { quality: 80, compressionLevel: 8 },
      processor: async (sharpInstance, outputPath) => {
        await sharpInstance.png(config.formats.png.options).toFile(outputPath);
        return true;
      }
    }
  },
};

function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      optimizationCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      console.log(`📋 Loaded cache with ${Object.keys(optimizationCache).length} entries`);
    } catch (e) {
      console.warn('⚠️  Could not read cache file, starting fresh.');
      optimizationCache = {};
    }
  }
}

function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(optimizationCache, null, 2));
    console.log(`💾 Saved cache with ${Object.keys(optimizationCache).length} entries`);
  } catch (e) {
    console.error('⚠️  Could not save cache file.', e);
  }
}

function getSourceFileHash(sourcePath) {
  try {
    const buffer = fs.readFileSync(sourcePath);
    return crypto.createHash('sha1').update(buffer).digest('hex');
  } catch (error) {
    return null;
  }
}

function findSourceFile(builtImagePath) {
  const builtBasename = path.basename(builtImagePath);
  const sourcePattern = `${config.sourceDir}/**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}`;
  const sourceFiles = glob.sync(sourcePattern);
  
  for (const sourceFile of sourceFiles) {
    const sourceBasename = path.basename(sourceFile);
    const sourceNameWithoutExt = path.parse(sourceBasename).name;
    const builtNameWithoutExt = path.parse(builtBasename).name;
    
    if (builtNameWithoutExt.startsWith(sourceNameWithoutExt)) {
      return sourceFile;
    }
  }
  return null;
}

// Generate external path for optimized images, preserving structure
function getOptimizedImagePath(builtImagePath, format) {
  const relativePath = path.relative(config.buildDir, builtImagePath);
  const parsedPath = path.parse(relativePath);
  
  // For fallback optimization, keep the same extension
  const newFilename = format === 'optimized' 
    ? `${parsedPath.name}${parsedPath.ext}` 
    : `${parsedPath.name}.${format}`;
    
  return path.join(config.outputDir, parsedPath.dir, newFilename);
}

// Copy optimized image to build directory
function copyOptimizedToBuild(externalPath, builtImagePath, format) {
  const buildOutputPath = format === 'optimized' 
    ? builtImagePath 
    : builtImagePath.replace(/\.(jpe?g|png|gif)$/i, `.${format}`);
    
  try {
    fs.ensureDirSync(path.dirname(buildOutputPath));
    fs.copyFileSync(externalPath, buildOutputPath);
    return true;
  } catch (error) {
    console.warn(`⚠️  Failed to copy ${format} to build directory: ${error.message}`);
    return false;
  }
}

function needsProcessing(builtImagePath, sourceFile, format) {
  if (!sourceFile || !fs.existsSync(sourceFile)) return true;
  
  const sourceHash = getSourceFileHash(sourceFile);
  if (!sourceHash) return true;
  
  const cacheKey = `${sourceFile}:${format}`;
  const cachedHash = optimizationCache[cacheKey];
  
  // Check cache first
  if (cachedHash !== sourceHash) return true;
  
  // If cached, check if external file still exists
  const externalPath = getOptimizedImagePath(builtImagePath, format);
  return !fs.existsSync(externalPath);
}

function markAsProcessed(sourceFile, format) {
  if (!sourceFile) return;
  
  const sourceHash = getSourceFileHash(sourceFile);
  if (sourceHash) {
    const cacheKey = `${sourceFile}:${format}`;
    optimizationCache[cacheKey] = sourceHash;
  }
}

async function optimizeImage(file) {
  try {
    const inputPath = path.resolve(file);
    const fileExtension = path.extname(file).toLowerCase().substring(1);
    const isAnimated = fileExtension === 'gif';
    
    const sourceFile = findSourceFile(inputPath);
    if (!sourceFile) {
      console.warn(`⚠️  Could not find source file for ${path.basename(file)}`);
      return 0;
    }
    
    console.log(`🔗 Mapped ${path.basename(file)} → ${path.relative(process.cwd(), sourceFile)}`);

    const metadata = await sharp(inputPath).metadata();
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      console.warn(`⚠️  Skipping ${path.basename(file)} because its dimensions exceed limits.`);
      return 0;
    }

    let conversionsPerformed = 0;

    // First, handle fallback optimization for PNG/JPEG files
    if (['jpeg', 'jpg', 'png'].includes(fileExtension)) {
      if (!needsProcessing(inputPath, sourceFile, 'optimized')) {
        console.log(`⏭️  Skipping optimization of ${path.basename(file)} - source unchanged`);
        
        // Copy existing optimized fallback to build directory
        const externalPath = getOptimizedImagePath(inputPath, 'optimized');
        if (copyOptimizedToBuild(externalPath, inputPath, 'optimized')) {
          console.log(`📋 Copied cached optimized fallback to build directory`);
        }
      } else {
        // Create optimized version in external directory first
        const externalOutputPath = getOptimizedImagePath(inputPath, 'optimized');
        fs.ensureDirSync(path.dirname(externalOutputPath));
        
        const sharpInstance = sharp(inputPath, { limitInputPixels: false });
        const startTime = Date.now();
        
        try {
          const processorKey = (fileExtension === 'jpg' || fileExtension === 'jpeg') ? 'jpeg' : fileExtension;
          await config.formats[processorKey].processor(sharpInstance, externalOutputPath);

          const originalSize = (await fs.stat(inputPath)).size;
          const newSize = (await fs.stat(externalOutputPath)).size;

          if (newSize < originalSize) {
            // Copy optimized version to build directory
            fs.copyFileSync(externalOutputPath, inputPath);
            const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
            const duration = Date.now() - startTime;
            console.log(`✅ Optimized fallback ${path.basename(file)} (${savings}% smaller) in ${duration}ms`);
            conversionsPerformed++;
          } else {
            // Even if no savings, copy original to external storage for consistency
            fs.copyFileSync(inputPath, externalOutputPath);
            console.log(`⏭️  No savings on ${path.basename(file)}, stored original for future`);
          }
          
          markAsProcessed(sourceFile, 'optimized');
        } catch(error) {
          console.warn(`⚠️  Failed to optimize fallback for ${path.basename(file)}: ${error.message}`);
        }
      }
    }

    // Process modern formats (AVIF, WebP) - use the potentially optimized file from build directory
    for (const format of ['avif', 'webp']) {
      if (!needsProcessing(inputPath, sourceFile, format)) {
        console.log(`⏭️  Skipping ${path.basename(file)} to ${format.toUpperCase()} - source unchanged`);
        
        // Copy existing optimized file to build directory
        const externalPath = getOptimizedImagePath(inputPath, format);
        if (copyOptimizedToBuild(externalPath, inputPath, format)) {
          console.log(`📋 Copied cached ${format.toUpperCase()} to build directory`);
        }
        continue;
      }

      // Create optimized version in external directory
      const externalOutputPath = getOptimizedImagePath(inputPath, format);
      fs.ensureDirSync(path.dirname(externalOutputPath));

      const sharpInstance = sharp(inputPath, { animated: isAnimated, limitInputPixels: false });
      const startTime = Date.now();
      
      try {
        const success = await config.formats[format].processor(sharpInstance, externalOutputPath, isAnimated);
        if (success) {
          const originalSize = (await fs.stat(inputPath)).size;
          const newSize = (await fs.stat(externalOutputPath)).size;
          const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          const duration = Date.now() - startTime;
          console.log(`✅ Created ${format.toUpperCase()} (${savings}% smaller) in ${duration}ms`);
          
          // Copy to build directory
          if (copyOptimizedToBuild(externalOutputPath, inputPath, format)) {
            console.log(`📋 Copied ${format.toUpperCase()} to build directory`);
          }
          
          markAsProcessed(sourceFile, format);
          conversionsPerformed++;
        }
      } catch (error) {
        console.warn(`⚠️  Failed to convert ${path.basename(file)} to ${format.toUpperCase()}: ${error.message}`);
      }
    }

    return conversionsPerformed;
  } catch (error) {
    console.warn(`⚠️  Could not process ${path.basename(file)}: ${error.message}`);
    return 0;
  }
}

async function runOptimization() {
  console.log('🖼️  Starting persistent image optimization...');
  
  // Ensure external directory exists
  fs.ensureDirSync(OPTIMIZED_IMAGES_DIR);
  loadCache();

  const files = glob.sync(`${config.buildDir}/**/*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}`);

  if (files.length === 0) {
    console.log('No images found in the build directory to optimize.');
    return;
  }
  
  console.log(`📁 Found ${files.length} built images to process.`);
  console.log(`💾 Using external storage: ${path.relative(process.cwd(), OPTIMIZED_IMAGES_DIR)}`);

  const concurrencyLimit = os.cpus().length;
  const chunks = [];
  for (let i = 0; i < files.length; i += concurrencyLimit) {
      chunks.push(files.slice(i, i + concurrencyLimit));
  }

  let totalConversions = 0;
  for (const chunk of chunks) {
    const results = await Promise.all(chunk.map(file => optimizeImage(file)));
    totalConversions += results.reduce((sum, count) => sum + (count || 0), 0);
  }

  saveCache();
  console.log(`\n📊 Optimization complete. Performed ${totalConversions} new conversions.`);
}

runOptimization().catch(console.error);