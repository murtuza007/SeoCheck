# SeoCheck

**SeoCheck** module is build to check if there is/are any irregularites in your HTML file. You can customise your own set of rules to check if your end requirements are met.

[![npm](https://img.shields.io/badge/npm-v6.0.1-brightgreen.svg)](https://npmjs.com/package/check-seo)
[![npm](https://img.shields.io/badge/node-8.5.0-orange.svg)](https://npmjs.com/package/check-seo)

## Install via [npm](https://npmjs.com)

```sh
npm i check-seo
npm test
```

## Usage

Load all the modules

```javascript
const fs = require('fs');
const {Configure, Rule, Writer, Reader} = require('check-seo');

// Or load individual modules 
const Configure = require('check-seo').Configure;
const Rule = require('check-seo').Rule;
const Writer = require('check-seo').Writer;
const Reader = require('check-seo').Reader;
```

## Rules Available

```javascript
RuleAllContainTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch(optional))
RuleMaxTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch or '', maxCount)
RuleExistsTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch(optional))
RuleMaxTag(parentTag, tagSearch, maxCount)
RuleExistsTag(parentTag, tagSearch)
```

## Example

```javascript
// To write data to console 
var writeConsole = new Writer.writeConsole()
// To write data to file
var writeFile = new Writer.writeFile('path/to/outputfile');
// To write data to file stream
var writeFilestream = new Writer.writeStream(fs.createWriteStream('path/to/outputfile'));

var rules = [];
//Check if all tag contains attribute eg. all <img> contain alt attribute
rules.push(new Rule.RuleAllContainTagAttribute('', 'img', 'alt'));

//Check <img alt> tag count greater than 4 
rules.push(new Rule.RuleMaxTagAttribute('', 'img', 'alt', '' ,4));

//check parent contains <tag attribute> eg: body containg <img alt>
rules.push(new Rule.RuleExistsTagAttribute('body', 'img', 'rel'));

//check parent contains <tag attribute=value> eg: head contains  <meta name="keywords">
rules.push(new Rule.RuleExistsTagAttribute('head', 'meta', 'name', 'keywords'));

//check if parent contains <tag> eg: body conatins <img>
rules.push(new Rule.RuleExistsTag('body', 'img'));

//check tag count: parent contains <tag> eg: body conatins <img>
rules.push(new Rule.RuleMaxTag('', 'strong',5))


var config1 = new Configure(new Reader.readStream(fs.createReadStream('./test/image.html')), writeConsole, rules);

config1.validate(function(err, data){
      console.log(err);
      console.log(data);
});

```
