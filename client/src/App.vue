<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-4">
                    <TurnOrder></TurnOrder>
                    <Score class="mt-4" title="Tvoje točke" score="2"></Score>
                    <Score class="mt-4" title="Nasprotnikove točke" score="3"></Score>
                </div>
                <div class="col-8">
                    <Card firstName="Jožef" lastName="Horvat" party="NSI" :attributes="attributes"></Card>
                </div>
            </div>
            <div class="row">
                <div class="offset-8 col-4">
                    <Deck></Deck>
                </div>
            </div>
        </div>

        <div>player deck: {{ playerDeck }}</div>
        <div>oponnent deck: {{ oponnentDeck }}</div>
        <div>player winnings: {{ playerWinnings }}</div>
        <div>oponnent winnings: {{ oponnentWinnings }}</div>
        <button @click="makeMove">Potegni karto</button>
    </div>
</template>

<script>
    import {generateDeck} from './cards';
    // import state from './state';
    import HelloWorld from './components/HelloWorld.vue';
    import Card from './components/Card.vue';
    import Navbar from './components/Navbar.vue';
    import TurnOrder from './components/TurnOrder.vue';
    import Score from './components/Score.vue';
    import Deck from './components/Deck.vue';

    export default {
        name: 'app',
        components: {
            HelloWorld,
            Card, Navbar, TurnOrder, Score, Deck
        },
        data() {
            return {
                playerDeck: generateDeck(),
                oponnentDeck: generateDeck(),
                pot: [],
                playerWinnings: [],
                oponnentWinnings: [],
                turn: 'player',


                attributes: [{name: 'Število mandatov', value: 3}],
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
