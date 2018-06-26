const rule = require('./base');
class RuleTagAttribute{
    constructor(parent, tag, attribute, value){
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
        this.attribute = attribute
        this.attrValue = undefined;

        if(typeof value !== 'undefined')
            this.attrValue = value;
    }

    
}

class RuleAllContainTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value){
        super(parent, tag, attribute, value);

    }

    validate(doc) {
        var tagCount = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).allTagContainsAttribute(doc);
        if( tagCount > 0){
            var strMessage = 'There are ' + tagCount + ' <' + this.tag  +'>  tag without ' + this.attribute + ' attribute';

            if(typeof this.attrValue !== 'undefined'){
                strMessage += ' having attribute value ' + this.attrValue;
            }
            this.message = strMessage;
        }
        return this;
    }

    getMessage() {
        return this.message;
    }
}

class RuleCountTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value, maxCount) {
        super(parent, tag, attribute, value)
        this.maxCount = parseInt(maxCount);
    }

    validate(doc) {
        var tagCount = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).count(doc);
        if( tagCount > this.maxCount){
            var strMessage = 'There are more than ' + this.maxCount + ' <' + this.tag  +'>  tag with ' + this.attribute + 'attribute';

            if(typeof this.attrValue !== undefined){
                strMessage += ' having attribute value ' + this.attrValue;
            }
            this.message = strMessage;
        }

        return this;
    }

    getMessage() {
        return this.message;
    }
}

class RuleExistsTagAttribute extends RuleTagAttribute{
    constructor(parent, tag, attribute, value, maxCount){
        super(parent, tag, attribute, value)
    }

    validate(doc) {
        var tagExists = new rule.BaseRuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).exists(doc);
        if( !tagExists ){
            var strMessage = this.parent + ' does not contain <' + this.tag  +'>  tag with ' + this.attribute + 'attribute';

            if(typeof this.attrValue !== undefined){
                strMessage += ' having attribute value ' + this.attrValue;
            }
            this.message = strMessage;
        }

        return this;
    }

    getMessage() {
        return this.message;
    }
}

module.exports = {
    RuleAllContainTagAttribute: RuleAllContainTagAttribute,
    RuleCountTagAttribute: RuleCountTagAttribute,
    RuleExistsTagAttribute: RuleExistsTagAttribute
}