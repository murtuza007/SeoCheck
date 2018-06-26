class BaseRuleTag {
    constructor(parent, tag) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;
    }

    count(doc) {
        return doc(this._createSearchString()).length;
    }

    exists(doc) {
        return doc(this._createSearchString()).length > 0;
    }
    
    _createSearchString() {
        return this.parent + " " +  this.tag;
    }
}

class BaseRuleTagAttribute {
    // check for both the with and without
    constructor(parent, tag, attr, attrValue) {
        this.parent = parent.length > 0 ? parent : 'html';
        this.tag = tag;        
        this.attribute = attr;
        this.attrValue = undefined;

        if(typeof attrValue !== 'undefined'){
            this.attrValue = attrValue;
        }
    }

    count(doc) {
        return doc(this._createSearchString()).length;
    }

    exists(doc) {
        return doc(this._createSearchString()).length > 0;
    }

    allTagContainsAttribute(doc) {
        var totalTags = doc(this.parent + " " +  this.tag).length;
        var tagsWithAttribute = doc(this._createSearchString()).length;
        return totalTags - tagsWithAttribute;
    }

    _createSearchString() {
        var searchAttrString = this.parent + ' ' +  this.tag + '[' + this.attribute;
        
        if(typeof this.attrValue !== 'undefined'){
            searchAttrString += '="' + this.attrValue +'\"';
        }

        searchAttrString +=  ']';

        return searchAttrString;
    }
}

module.exports = {
    BaseRuleTag: BaseRuleTag,
    BaseRuleTagAttribute: BaseRuleTagAttribute
}