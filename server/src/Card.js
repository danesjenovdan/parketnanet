module.exports = class Card {
  constructor({
    name,
    party,
    imageId,
    attributes,
  }) {
    this.name = name;
    this.party = party;
    this.imageId = imageId;
    this.attributes = attributes;
  }

  getAttribute(attributeName) {
    return this.attributes.find(attribute => attribute.name === attributeName);
  }
};
