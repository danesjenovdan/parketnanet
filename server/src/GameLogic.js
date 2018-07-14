const { generateDeck } = require('./cards');

const STATES = [
  'WAITING_FOR_ACTIVE_PLAYER',
  'WAITING_FOR_INACTIVE_PLAYER',
  'WAITING_FOR_ATTRIBUTE_SELECTION',
  'WAITING_FOR_REACTION',
  'TURN_ENDED',
  'GAME_ENDED',
];

class GameLogic {
  constructor(p1, p2) {
    this.players = [p1, p2];
    this.players.forEach((player, index) => {
      player.on('game', payload => this.onAction(index, payload));
      player.on('disconnect', () => this.killGame());
    });
    this.sendToPlayers('status', 'GAME_START');

    this.state = {
      decks: [generateDeck(), generateDeck()],
      pot: [],
      winnings: [[], []],
      playing: 0,
      selectedAttribute: null,
      currentState: 0,
      turnWinner: -1,
    };

    this.sendState();
  }

  getCurrentState() {
    return STATES[this.state.currentState];
  }

  getAttributeValueForPlayer(attributeName, playerIndex) {
    return this.state.pot[playerIndex].getAttribute(attributeName).value;
  }

  sendToPlayers(type, data) {
    this.players.forEach((player) => {
      player.emit(type, data);
    });
  }

  sendToPlayer(i, type, data) {
    this.players[i].emit(type, data);
  }

  resolveState(playerIndex, action, data) {
    switch (this.getCurrentState()) {
      case 'WAITING_FOR_ACTIVE_PLAYER':
      case 'WAITING_FOR_INACTIVE_PLAYER': {
        if (action === 'DRAW_CARD') {
          this.drawCard(playerIndex);
          this.state.playing = 1 - this.state.playing;
          this.nextState();
        }
        break;
      }
      case 'WAITING_FOR_ATTRIBUTE_SELECTION': {
        if (action === 'SELECT_ATTRIBUTE') {
          this.state.selectedAttribute = data;
          this.state.playing = 1 - this.state.playing;
          this.nextState();
        }
        break;
      }
      case 'WAITING_FOR_REACTION': {
        if (action === 'CONFIRM') {
          const current = this.getAttributeValueForPlayer(this.state.selectedAttribute, playerIndex);
          const opponent = this.getAttributeValueForPlayer(this.state.selectedAttribute, 1 - playerIndex);
          if (current > opponent) {
            this.state.winnings[playerIndex].push(...this.state.pot);
            this.state.turnWinner = playerIndex;
          } else if (current === opponent) {
            // TODO
          } else {
            this.state.winnings[1 - playerIndex].push(...this.state.pot);
            this.state.turnWinner = 1 - playerIndex;
          }
          this.state.playing = 1 - playerIndex;
          this.nextState();
        }
        break;
      }
      case 'TURN_ENDED': {
        if (action === 'CONFIRM') {
          this.state.playing = this.state.turnWinner;
          this.state.selectedAttribute = null;
          this.state.pot = [];
          this.nextState();
        }
        break;
      }
      case 'GAME_ENDED':
      default:
        break;
    }
  }

  nextState() {
    this.state.currentState = (this.state.currentState + 1) % STATES.length;
    if (this.getCurrentState() === 'GAME_ENDED' && this.getGameOutcome(0) === 'undetermined') {
      this.nextState();
    }
  }

  generatePlayerState(playerIndex) {
    return {
      playing: this.state.playing === playerIndex,
      score: {
        you: this.state.winnings[playerIndex].length,
        opponent: this.state.winnings[1 - playerIndex].length,
      },
      cards: {
        you: this.state.pot[playerIndex],
        opponent: this.state.selectedAttribute ? this.state.pot[1 - playerIndex] : null,
      },
      selectedAttribute: this.state.selectedAttribute,
      turnOutcome: this.getTurnOutcome(playerIndex),
      gameOutcome: this.getGameOutcome(playerIndex),
      currentState: this.getCurrentState(),
    };
  }

  getTurnOutcome(playerIndex) {
    if (this.state.selectedAttribute) {
      const current = this.getAttributeValueForPlayer(this.state.selectedAttribute, playerIndex);
      const opponent = this.getAttributeValueForPlayer(this.state.selectedAttribute, 1 - playerIndex);
      return current > opponent ? 'win' : 'lose';
    }
    return 'undetermined';
  }

  getGameOutcome(playerIndex) {
    if (this.state.decks[0].length === 0) {
      return this.state.decks[playerIndex].length > this.state.decks[1 - playerIndex].length
        ? 'win'
        : 'lose';
    }
    return 'undetermined';
  }

  sendState() {
    this.sendToPlayer(0, 'game', this.generatePlayerState(0));
    this.sendToPlayer(1, 'game', this.generatePlayerState(1));
  }

  drawCard(playerIndex) {
    this.state.pot[playerIndex] = this.state.decks[playerIndex].pop();
  }

  onAction(playerIndex, { action, data }) {
    if (this.state.playing === playerIndex) {
      this.resolveState(playerIndex, action, data);
      this.sendState();
    }
  }

  killGame() {
    this.sendToPlayers('status', 'SOMEONE_DISCONNECTED');
    this.players.forEach(player => player.disconnect(true));
    this.players = [];
  }
}

module.exports.createGame = (player1, player2) => new GameLogic(player1, player2);
