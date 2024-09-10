const zlib = require("zlib");
const fs = require('fs');

const refactorCodeExample = (path) => {
    const filesToRefactor = [];
    fs.readdir(path, async (err, files) => {
        files.forEach(file => {
            if (file.endsWith('api.mdx')) {
                filesToRefactor.push(path + "/" + file);
            }
        })
        const promises = filesToRefactor.map(filePath => refactorOpenAPI(filePath));
        await Promise.all(promises);
    })
}

const refactorOpenAPI = async ( path ) => {
    let fileContents = fs.readFileSync(path, 'utf8')
    let apiLine = '';
    let apiIndex;
    
    const lines = fileContents.split("\n");
    lines.forEach((line, index) => {
        if (line.startsWith("api: ")) {
            apiLine = line.split("api: ")[1];
            apiIndex = index;
        }
    });

    const decompressedOpenAPI = await flateOpenAPI(apiLine);
    
    // remove the redundant postman url path
    // because the RPC APIs of kaiachain does not have the path
    decompressedOpenAPI.postman.url.path = [];
    const compressedOpenAPI = await deflateOpenAPI(
        JSON.stringify(decompressedOpenAPI)
    );
    
    lines[apiIndex] = `api: ${compressedOpenAPI}`;

    let newFileContents = lines.join('\n');

     // remove unwanted params from request and response
     newFileContents=removeSchemaItem('id',newFileContents)
     newFileContents=removeSchemaItem('method',newFileContents)
     newFileContents=removeSchemaItem('jsonrpc',newFileContents)
 
     // change <details or </details to <div or </div (details tag make description collapsed, we want it to be shown)
     newFileContents=newFileContents.replace(/<details/gi,'<div') 
     newFileContents=newFileContents.replace(/<\/details/gi,'</div') 

    fs.writeFileSync(path, newFileContents);
}
const removeSchemaItem=(name,str='')=>{
    return str.replace(new RegExp(`<\\s*SchemaItem\\b[^>]*\\bname\\s*=\\s*{"${name}"}[^>]*>\\s*</\\s*SchemaItem\\s*>`,'g'),'')
}
const flateOpenAPI = ( compressedData ) => {
    return new Promise((resolve, reject) => {
        zlib.inflate(Buffer.from(compressedData, 'base64'), (err, decompressedData) => {
            if (err) {
                return reject(err);
            }

            resolve(JSON.parse(decompressedData.toString()));
        });
    });
}

const deflateOpenAPI = ( contents ) => {
    return new Promise((resolve, reject) => {
        zlib.deflate(contents, (err, buffer) => {
            if (err) {
                return reject(err);
            }

            resolve(buffer.toString('base64'));
        });
    });
}


refactorCodeExample('../docs/references/json-rpc/klay')
refactorCodeExample('../docs/references/json-rpc/kaia')
refactorCodeExample('../docs/references/json-rpc/eth')
refactorCodeExample('../docs/references/json-rpc/debug')
refactorCodeExample('../docs/references/json-rpc/admin')
refactorCodeExample('../docs/references/json-rpc/governance')
refactorCodeExample('../docs/references/json-rpc/net')
refactorCodeExample('../docs/references/json-rpc/txpool')
refactorCodeExample('../docs/references/json-rpc/mainbridge')
refactorCodeExample('../docs/references/json-rpc/subbridge')
refactorCodeExample('../docs/references/json-rpc/personal')