const rule = require('./base');
class RuleTagAttribute{
    constructor(parent, tag, attribute, value){
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
        this.attribute = attribute
        this.attrValue = undefined;
        this.message = false;
        if(typeof value !== 'undefined' && value.toString().length > 0)
            this.attrValue = value;
    }

    getMessage() {
        return this.message;
    }
}

class RuleTag{
    constructor(parent, tag){
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
        this.message = false; 
    }
    getMessage() {
        return this.message;
    }
}

class RuleAllContainTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value){
        super(parent, tag, attribute, value);

    }

    validate(doc) {
        var tagCount = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).allTagContainsAttribute(doc);
        if( tagCount > 0){
            var strMessage = '<' + this.parent+ '> contains ' + tagCount + ' <' + this.tag  +'>  tag without "' + this.attribute + '" attribute';

            if(typeof this.attrValue !== 'undefined'){
                strMessage += ' having attribute value "' + this.attrValue + '"';
            }
            this.message = strMessage;
        }
        return this;
    }

    
}

class RuleMaxTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value, maxCount) {
        super(parent, tag, attribute, value)
        this.maxCount = this.maxCount = !isNaN(maxCount) ? parseInt(maxCount) : 0;
    }

    validate(doc) {
        var tagCount = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).count(doc);
        if( tagCount > this.maxCount){
            var strMessage = '<' + this.parent+ '> contains more than ' + this.maxCount + ' <' + this.tag  +'>  tag with "' + this.attribute + '" attribute';

            if(typeof this.attrValue !== 'undefined'){
                strMessage += ' having attribute value "' + this.attrValue + '"';
            }
            this.message = strMessage;
        }
        return this;
    }
}

class RuleExistsTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value, maxCount){
        super(parent, tag, attribute, value)
    }

    validate(doc) {
        var tagExists = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).exists(doc);
        if( !tagExists ){
            var strMessage = '<' + this.parent + '> does not contain <' + this.tag  +'>  tag with "' + this.attribute + '" attribute';

            if(typeof this.attrValue !== 'undefined'){
                strMessage += ' having attribute value "' + this.attrValue + '"';
            }
            this.message = strMessage;
        }

        return this;
    }

}

class RuleMaxTag extends RuleTag{
    constructor(parent, tag, maxCount){
        super(parent, tag);
        this.maxCount = !isNaN(maxCount) ? parseInt(maxCount) : 0;
    }

    validate(doc) {
        var tagCount = new rule.BaseRuleTag(this.parent, this.tag).count(doc);
        if( tagCount > this.maxCount){
            this.message = '<' + this.parent+ '> contains more than ' + this.maxCount + ' <' + this.tag  +'>  tag (overall: ' + tagCount + ')';
        }
        return this;
    }
}

class RuleExistsTag extends RuleTag{
    constructor(parent, tag){
        super(parent, tag);
    }

    validate(doc) {
        var tagExists = new rule.BaseRuleTag(this.parent, this.tag).exists(doc);
        if( !tagExists ){
            this.message = '<' + this.parent+ '> does not contain <' + this.tag  +'>  tag';;
        }
        return this;
    }
}

module.exports = {
    RuleAllContainTagAttribute: RuleAllContainTagAttribute,
    RuleMaxTagAttribute: RuleMaxTagAttribute,
    RuleExistsTagAttribute: RuleExistsTagAttribute,
    RuleMaxTag: RuleMaxTag,
    RuleExistsTag: RuleExistsTag
}