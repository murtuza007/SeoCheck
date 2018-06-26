const fs = require('fs');
//       stremaPro = require('./index');
const {Configure, Rule, Writer, Reader} = require('../index.js');

// var objWriter = new Writer.writeConsole().write(data);
var objWriter = new Writer.writeConsole()
var objWriter1 = new Writer.writeFile('./write2.txt');
// var objWriter2 = new Writer.writeStream(fs.createWriteStream('./admin/write1.txt')).write(data).then(console.log).catch(console.log);

var rules = [];

rules.push(new Rule.RuleAllContainTagAttribute('', 'img', 'alt'));
rules.push(new Rule.RuleMaxTagAttribute('', 'img', 'alt', '' ,4));
rules.push(new Rule.RuleExistsTagAttribute('body', 'img', 'rel'));
rules.push(new Rule.RuleExistsTagAttribute('head', 'meta', 'name', 'descriptions'));
rules.push(new Rule.RuleExistsTag('body', 'img1'));
rules.push(new Rule.RuleMaxTag('body', 'img',5))

// var config = new Configure(new Reader.readStream(fs.createReadStream('./google.html')), objWriter, rules);
var config = new Configure(new Reader.readStream(fs.createReadStream('./test/image.html')), objWriter, rules);

config.validate(function(err, data){
      console.log(err);
      console.log(data);
});
