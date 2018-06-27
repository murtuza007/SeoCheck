const fs = require('fs');
// const {Configure, Rule, Writer, Reader} = require('../index.js');

const Configure = require('../index').Configure;
const Rule = require('../index').Rule;
const Writer = require('../index').Writer;
const Reader = require('../index').Reader;

var writeConsole = new Writer.writeConsole()
var writeFile = new Writer.writeFile('./test/output/write.txt');
var writeFilestream = new Writer.writeStream(fs.createWriteStream('./test/output/writestream.txt'));

var rules = [];

rules.push(new Rule.RuleAllContainTagAttribute('', 'img', 'alt'));
rules.push(new Rule.RuleMaxTagAttribute('', 'img', 'alt', '' ,4));
rules.push(new Rule.RuleExistsTagAttribute('body', 'img', 'rel'));
rules.push(new Rule.RuleExistsTagAttribute('head', 'meta', 'name', 'keywords'));
rules.push(new Rule.RuleExistsTag('body', 'img1'));
rules.push(new Rule.RuleMaxTag('body', 'img',5))
rules.push(new Rule.RuleMaxTag('', 'strong',5))

rules.push(new Rule.RuleMaxTag('', 'h1', 3))

// var config = new Configure(new Reader.readStream(fs.createReadStream('./google.html')), objWriter, rules);
var config1 = new Configure(new Reader.readStream(fs.createReadStream('./test/image.html')), writeConsole, rules);

config1.validate(function(err, data){
      console.log(err);
      console.log(data);
});



var config2 = new Configure(new Reader.readStream(fs.createReadStream('./test/image.html')), writeFile, rules);

config2.validate(function(err, data){
      console.log(err);
      console.log(data);
});


var config3 = new Configure(new Reader.readStream(fs.createReadStream('./test/image.html')), writeFilestream, rules);

config3.validate(function(err, data){
      console.log(err);
      console.log(data);
});
