<template>
    <div id="app">
        <Navbar></Navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-4" v-if="state">
                    <TurnOrder></TurnOrder>
                    <Score class="mt-4" title="Tvoje točke" :score="state.score.you"></Score>
                    <Score class="mt-4" title="Nasprotnikove točke" :score="state.score.opponent"></Score>
                </div>
                <div class="col-8" v-if="state">
                    <Card
                      v-if="state.cards.you"
                      @selectAttribute="playStat"
                      v-bind="state.cards.you"
                    />
                    <Card
                      v-if="state.cards.opponent"
                      v-bind="state.cards.opponent"
                    />
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
              state: null,
              card: null,
              turnOutcome: null,
              gameOver: false,
              socket: io('http://127.0.0.1:8081'),
            };
        },
        methods: {
            drawCard() {
                this.socket.emit('game', { action: 'DRAW_CARD' });
            },
            playStat(stat) {},
        },
        created() {
          this.socket.on('status', response => {
            console.log(response);
          });

          this.socket.on('game', response => this.state = response);
        }
    };
</script>