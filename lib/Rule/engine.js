const rule = require('./base');

class RuleAllContainTagAttribute {
    constructor(parent, tag, attribute, value){
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
        this.attribute = attribute
        this.attrValue = undefined;

        if(typeof value !== 'undefined')
            this.attrValue = value;

        this.message = false;
    }

    validate(doc) {
        var tagCount = new rule.RuleTagAttribute(this.parent, this.tag, this.attribute, this.attrValue).allTagContainsAttribute(doc);
        if( tagCount > 0){
            var strMessage = 'There are ' + tagCount + ' <' + this.tag  +'>  tag without ' + this.attribute + 'attribute';

            if(typeof this.attrValue !== undefined){
                strMessage += ' having attribute value ' + this.attrValue;
            }
            this.message = strMessage;
        }
    }

    message() {
        return this.message;
    }
}

class