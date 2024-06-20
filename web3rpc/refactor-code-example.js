const zlib = require("zlib");
const fs = require('fs');

const refactorCodeExample = async (path) => {
    const filesToRefactor = [];
    fs.readdir(path, (err, files) => {
        files.forEach(async file => {
            filesToRefactor.push(file);
        })
    })

    const promises = filesToRefactor.map(filePath => refactorOpenAPI(filePath));
    await Promise.all(promises);
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
    const newFileContents = lines.join("\n");
    fs.writeFileSync(path, newFileContents);
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