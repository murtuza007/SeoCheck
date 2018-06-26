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
// var objWriter1 = new Writer.writeFile('./admin/write2.txt').write(data).then(console.log).catch(console.log);
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
      new Rule.RuleCountTagAttribute('', 'img', 'alt', undefined ,4),
      new Rule.RuleExistsTagAttribute('', 'img', 'alt')
];
// var config = new Configure(new Reader.readStream(fs.createReadStream('./google.html')), objWriter, rules);
var config = new Configure(new Reader.readStream(fs.createReadStream('./image.html')), objWriter, rules);

config.validate(function(err, data){
      console.log(err);
      console.log(data);
});

// // console.log(Rule);
// const cheerio = require('cheerio')
// const $ = cheerio.load('<h2 class="title" name="str234234">Hello world</h2><h2 class="title" name="str234234">Hello world</h2>');

// // console.log($.html());
// console.log($('h2[name="str234234"]').length);


// // $('h2').hasAttr()
// // if($('h2 :not([class])')) {
// //       console.log($('h2').attr("class"));
// // } else {
// //       console.log($('h2').attr("class1"));
// // }
// // var data = {};

// var rule1 = new Rule.RuleTag('', 'img');
// var rule2 = new Rule.RuleHead();

// console.log(rule1.validate($));
// console.log(rule1.message());

// console.log(rule2.validate($));
// console.log(rule2.message());


