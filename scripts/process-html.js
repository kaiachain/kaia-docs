// scripts/process-html.js
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');

const buildDirs = [
  './build',        // English
  './build/ko',     // Korean
  './build/ja',     // Japanese
  './build/zh-CN',  // Simplified Chinese
  './build/zh-TW',  // Traditional Chinese
  './build/vi'      // Vietnamese
];

const formatsToTry = ['avif', 'webp'];

// Enhanced check for HTML file processing needs
function needsHtmlProcessing(htmlFile) {
  try {
    const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
    
    // Quick check: if already has <picture> tags, skip
    if (htmlContent.includes('<picture>')) {
      return false;
    }
    
    // Additional check: if no <img> tags at all, skip entirely
    if (!htmlContent.includes('<img')) {
      return false;
    }
    
    return true;
  } catch (error) {
    return true; // Process if we can't read the file
  }
}

// Find which build directory contains this HTML file
function getBuildRootForHtmlFile(htmlFile) {
  const resolvedHtmlPath = path.resolve(htmlFile);
  
  for (const buildDir of buildDirs) {
    const resolvedBuildDir = path.resolve(buildDir);
    if (resolvedHtmlPath.startsWith(resolvedBuildDir)) {
      return resolvedBuildDir;
    }
  }
  
  // Fallback to first build directory
  return path.resolve(buildDirs[0]);
}

async function processHtmlFiles() {
  console.log('🚀 Starting post-build HTML processing...');
  
  let allHtmlFiles = [];
  for (const buildDir of buildDirs) {
    const htmlFiles = glob.sync(`${buildDir}/**/*.html`);
    console.log(`📄 Found ${htmlFiles.length} HTML files in ${buildDir}`);
    allHtmlFiles = allHtmlFiles.concat(htmlFiles);
  }
  
  console.log(`📄 Total: ${allHtmlFiles.length} HTML files to check across all languages.`);

  // Filter files that need processing
  const filesToProcess = allHtmlFiles.filter(file => needsHtmlProcessing(file));
  console.log(`📝 ${filesToProcess.length} files need processing (${allHtmlFiles.length - filesToProcess.length} already processed or no images).`);

  if (filesToProcess.length === 0) {
    console.log('✅ All HTML files are already optimized or contain no processable images.');
    return;
  }

  let imagesUpgraded = 0;
  let filesModified = 0;
  let totalImagesFound = 0;
  let imagesSkipped = 0;

  for (const htmlFile of filesToProcess) {
    console.log(`\n🔍 Processing: ${path.relative(process.cwd(), htmlFile)}`);
    
    try {
      const htmlContent = await fs.readFile(htmlFile, 'utf-8');
      const $ = cheerio.load(htmlContent);
      let fileModified = false;

      const images = $('img');
      console.log(`  Found ${images.length} img tags`);
      
      if (images.length === 0) continue;

      // Get the build root for this HTML file
      const buildRoot = getBuildRootForHtmlFile(htmlFile);

      images.each((index, imgNode) => {
        const $imgNode = $(imgNode);
        totalImagesFound++;

        // Check if already in picture
        if ($imgNode.parent().is('picture')) {
          console.log(`  ⏭️  Image ${index + 1}: Already in <picture>, skipping`);
          imagesSkipped++;
          return;
        }

        const src = $imgNode.attr('src');
        console.log(`  🖼️  Image ${index + 1}: src="${src}"`);
        
        // Skip external URLs, data URLs, and SVGs
        if (!src || src.startsWith('http') || src.startsWith('data:') || src.toLowerCase().endsWith('.svg')) {
          console.log(`  ⏭️  Image ${index + 1}: External/data/SVG, skipping`);
          imagesSkipped++;
          return;
        }

        // Path resolution - FIXED
        let imgPathInBuild;
        if (src.startsWith('/')) {
          // Root-relative path - resolve from build root
          imgPathInBuild = path.join(buildRoot, src.substring(1));
          console.log(`  📁 Root-relative path: ${path.relative(process.cwd(), imgPathInBuild)}`);
        } else {
          // Relative path - resolve from HTML file directory
          imgPathInBuild = path.resolve(path.dirname(htmlFile), src);
          console.log(`  📁 Relative path: ${path.relative(process.cwd(), imgPathInBuild)}`);
        }
        
        if (!fs.existsSync(imgPathInBuild)) {
          console.log(`  ❌ Source image not found: ${path.relative(process.cwd(), imgPathInBuild)}`);
          imagesSkipped++;
          return;
        }
        console.log(`  ✅ Source image exists`);

        const imageExtensionRegex = /\.(jpe?g|png|gif|webp|avif)$/i;
        const sources = [];

        formatsToTry.forEach(format => {
          const modernPath = imgPathInBuild.replace(imageExtensionRegex, `.${format}`);
          console.log(`  🔍 Checking for ${format}: ${path.relative(process.cwd(), modernPath)}`);
          
          if (fs.existsSync(modernPath)) {
            const modernSrc = src.replace(imageExtensionRegex, `.${format}`);
            sources.push({ srcset: modernSrc, type: `image/${format}` });
            console.log(`  ✅ Found ${format} version`);
          } else {
            console.log(`  ❌ No ${format} version found`);
          }
        });

        console.log(`  📊 Found ${sources.length} optimized formats`);

        if (sources.length > 0) {
          const picture = $('<picture></picture>');
          
          // Add source elements for modern formats
          sources.forEach(source => {
            picture.append(`<source srcset="${source.srcset}" type="${source.type}">`);
          });

          // Add fallback img (clone to preserve all attributes)
          const fallbackImg = $imgNode.clone();
          picture.append(fallbackImg);
          
          // Replace original img with picture
          $imgNode.replaceWith(picture);
          imagesUpgraded++;
          fileModified = true;
          console.log(`  🎉 Upgraded image to <picture> with ${sources.length} sources`);
        } else {
          console.log(`  ⏭️  No optimized versions found, skipping`);
          imagesSkipped++;
        }
      });

      if (fileModified) {
        await fs.writeFile(htmlFile, $.html());
        filesModified++;
        console.log(`  💾 File modified and saved`);
      } else {
        console.log(`  ⏭️  No changes made to file`);
      }

    } catch (error) {
      console.error(`❌ Failed to process ${htmlFile}: ${error.message}`);
    }
  }

  console.log(`\n📊 SUMMARY:`);
  console.log(`- HTML files checked: ${allHtmlFiles.length}`);
  console.log(`- HTML files processed: ${filesToProcess.length}`);
  console.log(`- HTML files modified: ${filesModified}`);
  console.log(`- Total images found: ${totalImagesFound}`);
  console.log(`- Images upgraded to <picture>: ${imagesUpgraded}`);
  console.log(`- Images skipped: ${imagesSkipped}`);
}

processHtmlFiles().catch(console.error);