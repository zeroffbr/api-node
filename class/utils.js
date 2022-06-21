const fs  = require('fs');
const ini = require('ini');

const contentFilePath = './config.ini';

function save(xcontentFilePath, content){
    let filePath = contentFilePath;
    if (xcontentFilePath != ''){ filePath = xcontentFilePath }
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(filePath, contentString);
}

function load(){
    const fileBuffer  = fs.readFileSync(contentFilePath, 'utf-8')
    const contentJson = JSON.parse(fileBuffer)
    return contentJson
}

function fileExists(FilePath){    
    if (fs.existsSync(FilePath)) {
        return true
    }else{
        return false
    }
    
}

function formatDate(data, formato) {
    if (formato == 'pt-br') {
      return (data.substr(0, 10).split('-').reverse().join('/'));
    } else {
      return (data.substr(0, 10).split('/').join('-'));
    }
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    save, 
    load,
    fileExists,
    formatDate,
    delay
};