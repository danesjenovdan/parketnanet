module.exports = class Card {
  constructor({ name, party, attributes }) {
    this.name = name;
    this.party = party;
    this.attributes = attributes;
  }

  getAttribute(attributeName) {
    return this.attributes.find(attribute => attribute.name === attributeName);
  }
};
