<template>
  <div id="app">
    <Navbar></Navbar>
    <Card firstName="Jožef" lastName="Horvat" group="NSI" :attributes="attributes"></Card>
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
import Card from './components/Card.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
      Card, Navbar
  },
  data() {
    return {
      playerDeck: generateDeck(),
      oponnentDeck: generateDeck(),
      pot: [],
      playerWinnings: [],
      oponnentWinnings: [],
      turn: 'player',


        attributes : [{name: 'Število mandatov', value: 3}],
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
</style>
