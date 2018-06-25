
class RuleTag {
    // check for both the with and without
    constructor(parent, tag) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
    }

    validate(doc) {
        console.log(doc(this.parent + " " +  this.tag).length);
        this.present = doc(this.parent + " " +  this.tag).length > 0; 
        return this;
    }

    message() {
        var message  = false;
        if(!this.present)
            message =  '<' + this.parent + '> tag, does not contain <' + this.tag + '> tag'
        
        return message;
    }
}

class RuleTagAttribute {
    // check for both the with and without
    constructor(parent, tag, attr) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;        
        this.attribute = attr;
    }

    validate(doc) {
        console.log(doc(this.parent + " " +  this.tag).length);
        console.log(doc(this.parent + " " +  this.tag + "[" + this.attribute + "]").length);
        this.noDiffAttribute =  doc(this.parent + " " +  this.tag).length - doc(this.parent + " " +  this.tag + "[" + this.attribute + "]").length;
        this.present = this.noDiffAttribute > 0; 
        return this;
    }

    message() {
        var message  = false;
        if(!this.present){
            message =  '<' + this.parent + '> tag contains, '+ this.noDiffAttribute + ' <' + this.tag + '> tag not having <' + this.attribute + '> attribute';
        }
        return message;
    }
}

class RuleTagAttributeValue {
    // check for both the with and without
    constructor(parent, tag, attr, value) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;        
        this.attribute = attr;
        this.value = value;
    }
    
    validate(doc) {
        console.log(this.parent + " " +  this.tag + "[" + this.attribute + "=\"" + this.value +"\"]");
        this.noDiffAttribute =  doc(this.parent + " " +  this.tag).length - doc(this.parent + " " +  this.tag + "[" + this.attribute + "=\"" + this.value +"\"]").length;
        this.present = this.noDiffAttribute > 0; 
        return this;
    }

    message() {
        var message  = false;
        if(!this.present){
            message =  '<' + this.parent + '> tag contains, '+ this.noDiffAttribute + ' <'+ this.tag +' ' + this.attribute +'="' +  this.value +'">';
        }
            
        return message;
    }
}


class RuleTagCount {
    constructor(parent, tag, maxCount) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
        this.maxCount = maxCount;
    }

    validate(doc) {
        this.noDiffAttribute =  doc(this.parent + " " +  this.tag).length;
        this.present = this.maxCount >= this.noDiffAttribute; 
        return this;
    }

    message() {
        var message  = false;
        if(!this.present){
            message = '<' + this.parent + '> tag contains, more than ' + this.maxCount + ' tags of <' + this.tag + '> (total: ' + this.noDiffAttribute + ')';
        }
        return message;
    }
}

class RuleHead {

    constructor() {
        this.rules = [
            new RuleTag('head', 'title'),
            new RuleTagAttributeValue('head', 'meta', 'name', 'descriptions'),
            new RuleTagAttributeValue('head', 'meta', 'name', 'keywords')
        ];
    }

    validate(doc) {
        this.rules.forEach((rule) => {
            rule.validate(doc);
        })

        return this;
    }

    message() {
        var arrMessage = [];
        var message = '';
        this.rules.forEach((rule) => {
            message = rule.message();
            if(message) {
                arrMessage.push(message);
            }
            
        });

        console.log("it ishhere ");
        return arrMessage.join('\r\n');
    }
}


module.exports = {
    RuleTagCount: RuleTagCount,
    RuleTag: RuleTag,
    RuleTagAttribute: RuleTagAttribute,
    RuleTagAttributeValue: RuleTagAttributeValue,
    RuleHead: RuleHead
}