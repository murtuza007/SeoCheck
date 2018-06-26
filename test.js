const fs = require('fs');
//       stremaPro = require('./index');
const {Configure, Rule, Writer, Reader} = require('./index.js');

// console.log("-------------------------");
var r = fs.createReadStream('./dummy.txt', 'utf8');
// // const r = fs.readFile('./dummy.txt', 'utf8');

// reader.pipe();
// r.pipe(new Writer());
// r.pipe(stremaPro());
// var objReader = new Reader.readFile('./dummy.txt');
// var objReader = new Reader.readFile('../README.md');
// var objReader1 = new Reader.readStream(fs.createReadStream('../README.md'));
// console.log(objReader.read().then(console.log).catch(console.log));
// console.log(objReader1.read().then(console.log).catch(console.log));



var data = 'this is the output';
// var objWriter = new Writer.writeConsole().write(data);
var objWriter = new Writer.writeConsole()
var objWriter1 = new Writer.writeFile('./write2.txt');
// var objWriter2 = new Writer.writeStream(fs.createWriteStream('./admin/write1.txt')).write(data).then(console.log).catch(console.log);

// new Rule.RuleTag('head', 'title'),
// new Rule.RuleTagAttributeValue('head', 'meta', 'name', 'descriptions'),
// new Rule.RuleTagAttributeValue('head', 'meta', 'name', 'keywords'),
// new Rule.RuleHead(),
var rules = [
      
      // new Rule.RuleTag('head', 'title'),
      // new Rule.RuleTagAttributeValue('head', 'meta', 'name', 'descriptions'),
      // new Rule.RuleTagAttributeValue('head', 'meta', 'name', 'keywords'),
      // new Rule.RuleHead(),
      new Rule.RuleAllContainTagAttribute('', 'img', 'alt'),
      new Rule.RuleMaxTagAttribute('', 'img', 'alt', '' ,4),
      new Rule.RuleExistsTagAttribute('body', 'img', 'rel'),
      new Rule.RuleExistsTagAttribute('head', 'meta', 'name', 'descriptions'),
      new Rule.RuleExistsTag('body', 'img1'),
      new Rule.RuleMaxTag('body', 'img',5),
];
// var config = new Configure(new Reader.readStream(fs.createReadStream('./google.html')), objWriter, rules);
var config = new Configure(new Reader.readStream(fs.createReadStream('./image.html')), objWriter, rules);

config.validate(function(err, data){
      console.log(err);
      console.log(data);
});
