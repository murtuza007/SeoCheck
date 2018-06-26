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
new Rule.RuleAllContainTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch(optional))
new Rule.RuleMaxTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch or '', maxCount)
new Rule.RuleExistsTagAttribute(parentTag, tagSearch, attributeSearch, valueSearch(optional))
new Rule.RuleMaxTag(parentTag, tagSearch, maxCount)
new Rule.RuleExistsTag(parentTag, tagSearch)
```

## Example

```javascript

```
