const _ = require('lodash');
const data = require('./data.json');
const Card = require('./Card.js');

const allCards = data.data.map(member => new Card({
  name: member.person.name,
  party: member.person.party.acronym,
  attributes: [
    { name: 'mandates', value: member.results.mandates.score },
    { name: 'education', value: Number(member.results.education.score.replace('/', '.')) },
    { name: 'presence', value: member.results.presence_votes.score },
    { name: 'nonconformity', value: Number(member.results.mismatch_of_pg.score) },
    { name: 'words', value: member.results.spoken_words.score },
    { name: 'vocabulary', value: member.results.vocabulary_size.score },
  ],
}));

exports.generateDeck = () => _.sampleSize(allCards, 10);
