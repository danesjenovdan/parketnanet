import data from './data.json';

const allCards = data.data.map(member => ({
    name: member.person.name,
    score: member.results.spoken_words.score,
}))

export const generateDeck = () => {
    return allCards.splice(0, 10);
}
