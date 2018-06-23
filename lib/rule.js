
class RuleTag {
    // check for both the with and without
    constructor(parent, tag) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
    }

    validate(doc) {
        this.present = doc(this.parent + " " +  this.tag).length > 0; 
        return this.present;
    }

    message() {
        var message  = '';
        if(!this.present)
            message =  'This html page is not having <' + this.tag + '> tag'
        
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
        this.noDiffAttribute =  doc(this.parent + " " +  this.tag).length - doc(this.parent + " " +  this.tag + "[" + this.attribute + "]").length;
        this.present = this.noDiffAttribute > 0; 
        return this.present;
    }

    message() {
        var message  = '';
        if(!this.present){
            if(this.noDiffAttribute == 1) 
                message =  'There is 1 <' + this.tag + '> tag not having <' + this.attribute + '> attribute';
            else 
                message = 'There are ' + this.noDiffAttribute + '<' + this.tag + '> tag not having <' + this.attribute + '> attribute';
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
        return this.present;
    }

    message() {
        var message  = '';
        if(!this.present){
            if(this.noDiffAttribute == 1) 
                message =  'There is 1 <' + this.tag + '> tag not having <' + this.attribute + '> attribute with value ' + this.value;
            else 
                message = 'There are ' + this.noDiffAttribute + ' <' + this.tag + '> tag not having <' + this.attribute + '> attribute with value ' + this.value;
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
        return this.present;
    }

    message() {
        var message  = '';
        if(!this.present){
            message = 'There are more than ' + this.maxCount + ' tags of <' + this.tag + '> (' + this.noDiffAttribute + ')';
        }
        return message;
    }
}

class RuleHead {

    validate(doc) {
        var failedRule = null
        var rules = [
            new RuleTag('head', 'title'),
            new RuleTagAttributeValue('head', 'meta', 'name', 'descriptions'),
            new RuleTagAttributeValue('head', 'meta', 'name', 'keywords')
        ];


        for(var i = 0; i < rules.length; i++){
            if(!rules[i].validate()){
                failedRule = i;
                break;
            }
        }

        if(failedRule != null){
            return rules[failedRule].message()
        } else {
            return '';
        }
    }
}


module.exports = {
    RuleTagCount: RuleTagCount,
    RuleTagExist: RuleTagExist,
    RuleTagAttribute: RuleTagAttribute,
    RuleTagAttributeValue: RuleTagAttributeValue
}