//Importing So Require Works in Node 14+
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const modulesFolder = './src/modules/';
const fs = require('fs');


function mkDir(){
    fs.readdir(modulesFolder, (err, files) => {
        if (err) {
            console.log(err)
        } else {
            files.forEach(file => { 
                const dirSchema  = modulesFolder + file + '/schema'
                const dirResolver  = modulesFolder + file + '/resolver'
                if (!fs.existsSync(dirSchema)){
                    fs.mkdirSync(dirSchema);
                    populateSchema(dirSchema, file)
                }
                if (!fs.existsSync(dirResolver)){
                    fs.mkdirSync(dirResolver);
                    populateResolver(dirResolver, file)
                }
            }) 
        }
    });
}

function populateSchema(path,file){
    const schemaFile = path + '/'+file+"Schema.js"
    if(!fs.existsSync(schemaFile)){
        fs.writeFile(schemaFile, schemaDefault(file), 'utf-8', function (err) {
            if (err) throw err;
        });
    }
}

function schemaDefault(file){
return `import { composeMongoose } from 'graphql-compose-mongoose';
import { ${file} } from '../models/${file}Mongoose.js'

const customizationOptions = {}; // left it empty for simplicity, described below
export const ${file}TC = composeMongoose(${file}, customizationOptions);
`
}


function populateResolver(path,file){
    const resolverFile = path + '/'+file+"Resolver.js"
    if(!fs.existsSync(resolverFile)){
        fs.writeFile(resolverFile, resolverDefault(file), 'utf-8', function (err) {
            if (err) throw err;
        });
    }
}

function resolverDefault(file){
    const fileLowerCase = file.toLowerCase()
return `import { ${file}TC } from '../schema/${file}Schema.js'

export const ${fileLowerCase}Query = {
    ${fileLowerCase}ById: ${file}TC.mongooseResolvers.findById(),
    ${fileLowerCase}ByIds: ${file}TC.mongooseResolvers.findByIds(),
    ${fileLowerCase}One: ${file}TC.mongooseResolvers.findOne(),
    ${fileLowerCase}Many: ${file}TC.mongooseResolvers.findMany(),
    ${fileLowerCase}DataLoader: ${file}TC.mongooseResolvers.dataLoader(),
    ${fileLowerCase}DataLoaderMany: ${file}TC.mongooseResolvers.dataLoaderMany(),
    ${fileLowerCase}ByIdLean: ${file}TC.mongooseResolvers.findById({ lean: true }),
    ${fileLowerCase}ByIdsLean: ${file}TC.mongooseResolvers.findByIds({ lean: true }),
    ${fileLowerCase}OneLean: ${file}TC.mongooseResolvers.findOne({ lean: true }),
    ${fileLowerCase}ManyLean: ${file}TC.mongooseResolvers.findMany({ lean: true }),
    ${fileLowerCase}DataLoaderLean: ${file}TC.mongooseResolvers.dataLoader({ lean: true }),
    ${fileLowerCase}DataLoaderManyLean: ${file}TC.mongooseResolvers.dataLoaderMany({ lean: true }),
    ${fileLowerCase}Count: ${file}TC.mongooseResolvers.count(),
    ${fileLowerCase}Connection: ${file}TC.mongooseResolvers.connection(),
    ${fileLowerCase}Pagination: ${file}TC.mongooseResolvers.pagination(),
};
  
export const ${fileLowerCase}Mutation ={
    ${fileLowerCase}CreateOne: ${file}TC.mongooseResolvers.createOne(),
    ${fileLowerCase}CreateMany: ${file}TC.mongooseResolvers.createMany(),
    ${fileLowerCase}UpdateById: ${file}TC.mongooseResolvers.updateById(),
    ${fileLowerCase}UpdateOne: ${file}TC.mongooseResolvers.updateOne(),
    ${fileLowerCase}UpdateMany: ${file}TC.mongooseResolvers.updateMany(),
    ${fileLowerCase}RemoveById: ${file}TC.mongooseResolvers.removeById(),
    ${fileLowerCase}RemoveOne: ${file}TC.mongooseResolvers.removeOne(),
    ${fileLowerCase}RemoveMany: ${file}TC.mongooseResolvers.removeMany(),
};

`}


function build(){
    mkDir();
}

build();