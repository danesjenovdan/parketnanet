import data from './data.json';

const allCards = data.data.map(member => ({
    name: member.person.name,
    party: member.person.party.acronym,
    attributes: [
        {name: 'spokenWords', value: member.results.spoken_words.score},
        {name: 'presence', value: member.results.presence_sessions.rank}
    ]
}))

export const generateDeck = () => {
    return allCards.splice(0, 10);
}
