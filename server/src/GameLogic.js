module.exports = class GameLogic {
  create(p1, p2) {
    this.players = [p1, p2];
    this.turns = [null, null];

    this.sendToPlayers('status', 'GAME_START');

    // this.players.forEach((player, idx) => {
    //   player.on('turn', (turn) => {
    //     this.onTurn(idx, turn);
    //   });
    // });
  }

  sendToPlayers(type, data) {
    this.players.forEach((player) => {
      player.emit(type, data);
    });
  }

  sendToPlayer(i, type, data) {
    this.players[i].emit(type, data);
  }
};
