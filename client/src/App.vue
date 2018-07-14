<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-4">
                    <TurnOrder></TurnOrder>
                    <Score class="mt-4" title="Tvoje točke" :score="score.you"></Score>
                    <Score class="mt-4" title="Nasprotnikove točke" :score="score.opponent"></Score>
                </div>
                <div class="col-8">
                    <Card v-if="card" @selectAttribute="playStat" :name="card.name" :party="card.party" :attributes="card.attributes"></Card>
                </div>
            </div>
            <div class="row">
                <div class="offset-8 col-4">
                    <Deck @click.native="drawCard"></Deck>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { drawCard, getScore, playStat } from './state';
    import {generateDeck} from './cards';
    import state from './state';
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
              card: null,
              turnOutcome: null,
              score: getScore(),
              gameOver: false,
            };
        },
        methods: {
            drawCard() {
                this.turnOutcome = null;
                this.card = drawCard();
            },
            playStat(stat) {
                const outcome = playStat(stat.name)
                this.turnOutcome = outcome.turn;
                this.score = getScore();
                
                if (outcome.game !== 'undetermined') {
                    this.gameOver = true;
                    this.gameOutcome = `game over, you ${outcome.game}`;
                }

                this.card = null;
            }
        },
    };
</script>