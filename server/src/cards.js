const _ = require('lodash');
const data = require('./data.json');
const Card = require('./Card.js');

const allCards = data.data.map(member => new Card({
  name: member.person.name,
  party: member.person.party.acronym,
  attributes: [
    { name: 'spokenWords', value: member.results.spoken_words.score },
    { name: 'presence', value: member.results.presence_sessions.rank },
  ],
}));

exports.generateDeck = () => _.sampleSize(allCards, 10);
