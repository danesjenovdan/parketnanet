<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>player deck: {{ playerDeck }}</div>
    <div>oponnent deck: {{ oponnentDeck }}</div>
    <div>player winnings: {{ playerWinnings }}</div>
    <div>oponnent winnings: {{ oponnentWinnings }}</div>
    <button @click="makeMove">Potegni karto</button>
  </div>
</template>

<script>
import { generateDeck } from './cards';
// import state from './state';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      playerDeck: generateDeck(),
      oponnentDeck: generateDeck(),
      pot: [],
      playerWinnings: [],
      oponnentWinnings: [],
      turn: 'player',
    };
  },
  methods: {
    makeMove() {
      this.pot.push(this.playerDeck.pop(), this.oponnentDeck.pop());
      if (this.pot[0].score > this.pot[1].score) {
        this.playerWinnings = this.playerWinnings.concat(this.pot);
      } else {
        this.oponnentWinnings = this.oponnentWinnings.concat(this.pot);
      }
      this.pot = []
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
