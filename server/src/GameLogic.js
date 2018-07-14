const { generateDeck } = require('./cards');

module.exports = class GameLogic {
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
    };

    this.drawCards();
    this.sendState();
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

  generatePlayerState(index) {
    console.log(this.state.pot)
    return {
      playing: this.state.playing === index,
      score: {
        you: this.state.winnings[index].length,
        opponent: this.state.winnings[1 - index].length,
      },
      cards: {
        you: this.state.pot[index],
        opponent: this.state.selectedAttribute ? this.state.pot[1 - index] : null,
      },
      selectedAttribute: this.state.selectedAttribute,
      turnOutcome: (() => {
        if (this.state.selectedAttribute) {
          return this.getAttributeValueForPlayer(this.state.selectedAttribute, index)
          > this.getAttributeValueForPlayer(this.state.selectedAttribute, 1 - index)
            ? 'win'
            : 'lose';
        }
        return 'undetermined';
      })(),
      gameOutcome: (() => {
        if (this.state.decks[0].length === 0) {
          return this.state.decks[index].length > this.state.decks[1 - index].length
            ? 'win'
            : 'lose';
        }
        return 'undetermined';
      })(),
    };
  }

  sendState() {
    this.sendToPlayer(0, 'game', this.generatePlayerState(0));
    this.sendToPlayer(1, 'game', this.generatePlayerState(1));
  }

  drawCards() {
    this.state.pot = [this.state.decks[0].pop(), this.state.decks[1].pop()];
  }

  onAction(playerIndex, { action, data }) {
    if (this.state.playing === playerIndex) {
      switch (action) {
        case 'SELECT_ATTRIBUTE': {
          this.state.selectedAttribute = data;
          this.sendState();
          const current = this.getAttributeValueForPlayer(this.state.selectedAttribute, playerIndex);
          const opponent = this.getAttributeValueForPlayer(this.state.selectedAttribute, 1 - playerIndex);
          if (current > opponent) {
            this.state.winnings[playerIndex].push(...this.state.pot);
          } else if (current === opponent) {
            // TODO
          } else {
            this.state.winnings[1 - playerIndex].push(...this.state.pot);
          }
          this.state.selectedAttribute = null;
          this.drawCards();
          this.sendState();
          break;
        }
        default:
          break;
      }
    }
  }

  killGame() {
    console.log('GAME WAS KILLED');
    this.sendToPlayers('status', 'SOMEONE_DISCONNECTED');
    this.players.forEach(player => player.disconnect(true));
    this.players = [];
  }
};
