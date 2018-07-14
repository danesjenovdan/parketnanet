const _ = require('lodash');
const request = require('request');
const Card = require('./Card.js');

const API_URL = 'https://analize.parlameter.si/v1/p/getListOfMembersTickers/';
let allCards;

request.get({
  url: API_URL,
  json: true,
  headers: {'User-Agent': 'request'}
}, (err, res, data) => {
  if (err) {
    console.log('Error:', err);
  } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
  } else {
    allCards = data.data.map(member => new Card({
      name: member.person.name,
      party: member.person.party.acronym,
      imageId: member.person.gov_id,
      attributes: [
        { name: 'mandates', value: member.results.mandates.score },
        { name: 'education', value: Number(member.results.education.score.replace('/', '.')) },
        { name: 'presence', value: member.results.presence_votes.score },
        { name: 'nonconformity', value: Number(member.results.mismatch_of_pg.score) },
        { name: 'words', value: member.results.spoken_words.score },
        { name: 'vocabulary', value: member.results.vocabulary_size.score },
      ],
    }));
  }
});

exports.generateDeck = () => _.sampleSize(allCards, 1);
