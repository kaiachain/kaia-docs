const fs = require('fs');
const endpointRegex = /<MethodEndpoint(.*?)MethodEndpoint>/s;
const titleRegex = /sidebar_label: "\[[a-zA-Z]+\]/s;

const deleteEndpoint = (path) => {
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            // Read the file contents
            let fileContents = fs.readFileSync(path + "/" + file, 'utf8');
            
            // Replace the matching text
            let newFileContents = fileContents.replace(endpointRegex, '').replace(titleRegex, "sidebar_label: \"");
            
            // Write the updated contents back to the file
            fs.writeFileSync(path + "/" + file, newFileContents);
        })
    })
}

deleteEndpoint('../docs/references/json-rpc/klay')
deleteEndpoint('../docs/references/json-rpc/kaia')
deleteEndpoint('../docs/references/json-rpc/eth')
deleteEndpoint('../docs/references/json-rpc/debug')
deleteEndpoint('../docs/references/json-rpc/admin')
deleteEndpoint('../docs/references/json-rpc/governance')
deleteEndpoint('../docs/references/json-rpc/net')
deleteEndpoint('../docs/references/json-rpc/txpool')
deleteEndpoint('../docs/references/json-rpc/mainbridge')
deleteEndpoint('../docs/references/json-rpc/subbridge')
deleteEndpoint('../docs/references/json-rpc/personal')