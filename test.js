// const fs = require('fs'),
//       stremaPro = require('./index');


// console.log("-------------------------");
// const r = fs.createReadStream('./dummy.txt', 'utf8');
// // const r = fs.readFile('./dummy.txt', 'utf8');


// r.pipe(stremaPro());

const {Rule} = require('./index.js');

// console.log(Rule);
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title" name="str234234">Hello world</h2><h2 class="title" name="str234234">Hello world</h2>');

// console.log($.html());
console.log($('h2[name="str234234"]').length);


// $('h2').hasAttr()
// if($('h2 :not([class])')) {
//       console.log($('h2').attr("class"));
// } else {
//       console.log($('h2').attr("class1"));
// }
// var data = {};

var rule1 = new Rule.RuleTag('', 'img');
var rule2 = new Rule.RuleHead();

console.log(rule1.validate($));
console.log(rule1.message());

console.log(rule2.validate($));
console.log(rule2.message());