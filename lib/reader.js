
/*
    Reader can be of 2 types direct file reader or stream reader

*/


const fs = require('fs');
const path = require('path');
class ReadFile{
    constructor(file) {
        this.path = file;
    }

    read() {
        return new ReadStream(fs.createReadStream(this.path)).read();
    }
}

class ReadStream {
    constructor(stream) {
        this.readStream = stream;
    }

    read() {
        return new Promise((resolve, reject) => {
            var doc = '';
            this.readStream.setEncoding('utf8');
            this.readStream.on('data', (chunk) => {
                doc += chunk;
            })
            .on('end', (status) => {
                return resolve({doc: doc});
            })
            .on('error', (stack) => {
                return reject({error: stack});
            });
        })
    }
}



module.exports =  {
    readFile: ReadFile,
    readStream: ReadStream
};