
/*
    Reader can be of 2 types direct file reader or stream reader

*/


const fs = require('fs');
const path = require('path');

class WriteConsole {
    write(output) {
        console.log(output);
    }
}

class WriteFile{
    constructor(file) {
        this.path = file;
    }

    write(output) {
        return new WriteStream(fs.createWriteStream(this.path)).write(output);
    }
}

class WriteStream {
    constructor(stream) {
        this.writeStream = stream;
    }

    write(output) {
        return new Promise((resolve, reject) => {
            this.writeStream.write(output);
            this.writeStream.end();
            this.writeStream.on('finish', () => {
                console.log('coming here');
                return resolve({status: true});
            })
            this.writeStream.on('error', (stack) => {
                return reject(stack)
            });
        })
    }
}



module.exports =  {
    writeConsole: WriteConsole,
    writeFile: WriteFile,
    writeStream: WriteStream
};