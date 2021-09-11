//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs')

function resolverUpdater(modulesFolder){
    const allModules = []
    fs.readdir(modulesFolder, (err, files) => {
        if (err) {
            console.log(err)
        } else {
            files.forEach(file => { 
                allModules.push(file)
            }) 
        }
        createResolver(allModules)
        // returnImport(allModules)
    });

}

function createResolver(allModules){
    const resolverFile = './src/resolver/resolverIndex.js'
    if(!fs.existsSync(resolverFile)){
        fs.writeFile(resolverFile, resolverDefault(allModules), 'utf-8', function (err) {
            if (err) throw err;
        });
    }
}



function resolverDefault(allModules){
    return `${returnImport(allModules)}
import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
    ${returnQuery(allModules)}
})

schemaComposer.Mutation.addFields({
    ${returnMutation(allModules)}
})


export const graphqlSchema = schemaComposer.buildSchema();`

}
function returnImport(allModules){
    var imports = ``
    for(const file of allModules){
        const fileLowerCase = file.toLowerCase();
        imports += (`import { ${fileLowerCase}Query, ${fileLowerCase}Mutation } from '../modules/${file}/resolver/${file}Resolver.js' `)
        imports += (`\n`);
    }

    return imports
}

function returnQuery(allModules){
    var query = ``
    for(const file of allModules){
        const fileLowerCase = file.toLowerCase();
        query += (`...${fileLowerCase}Query,`)
        query += (`\n\t`);
    }
    return query
}


function returnMutation(allModules){
    var mutation = ``
    for(const file of allModules){
        const fileLowerCase = file.toLowerCase();
        mutation += (`...${fileLowerCase}Mutation,`)
        mutation += (`\n\t`);
    }
    return mutation
}


function main(){
    const modulesFolder = './src/modules/';
    resolverUpdater(modulesFolder);
}
main();