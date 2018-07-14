import { generateDeck } from './cards';

const state = {
    decks: [generateDeck(), generateDeck()],
    pot: [],
    winnings: [[], []],
    turn: 0,
}


const getGameOutcome = () => {
    if (state.decks[0].length === 0) {
        return state.winnings[0].length > state.winnings[1].length ? 'win' : 'lose'; 
    }
    return 'undetermined';
}

const getValueForStat = (stat, card) =>
    card.attributes.find(item => item.name === stat).value

export const drawCard = () => {
    if (state.decks[0].length === 0) {
        return 'GAME OVER'
    }
    state.pot = [state.decks[0].pop(), state.decks[1].pop()];
    return state.pot[0];
}

export const playStat = stat => {
    let outcome;
    
    if (getValueForStat(stat, state.pot[0]) > getValueForStat(stat, state.pot[1])) {
        state.winnings[0].push(state.pot[0], state.pot[1]);
        outcome = 'win';
    } else {
        state.winnings[1].push(state.pot[0], state.pot[1]);
        outcome = 'lose';
    }
    state.pot = [];
    return {
        turn: outcome,
        game: getGameOutcome(),
    };
}

export const getScore = () => {
    return {
        you: state.winnings[0].length,
        opponent: state.winnings[1].length,
    };
}