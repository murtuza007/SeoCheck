
const cheerio = require('cheerio')
// const $ = cheerio.load('<h2 class="title" name="str234234">Hello world</h2><h2 class="title" name="str234234">Hello world</h2>');

class Configure{
    constructor(reader, writer, rules){
        this.rules = rules;
        if(!Array.isArray(rules)){
            this.rules = [rules];
        } else {
            this.rules = rules;
        }
        this.reader = reader;
        this.writer = writer;
    }

    setReader(reader){
        this.reader = reader;
    }

    setWriter(writer) {
        this.writer = writer;
    }

    validate(cb) {
        var self = this;
        var arrMessage = [];
        let message = null;
        self.reader.read().then((reader) => {
            const parse = cheerio.load(reader.doc);
            self.rules.forEach(function(rule) {
                message = rule.validate(parse).getMessage();
                if(message) {
                    arrMessage.push(message)
                }
            });
            
            return self.writer.write(arrMessage.join(' \r\n'));
        })
        .then((status) => {
            return cb(null, status);
        })
        .catch((reject) => {
            return cb(reject);
        })

    }
}

module.exports = Configure;