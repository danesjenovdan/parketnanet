<template>
    <div id="game">
        <Navbar></Navbar>
        <div class="container-fluid">
            <ConnectionState :state="connectionState"></ConnectionState>
            <template
                    v-if="state && connectionState !== 'SOMEONE_DISCONNECTED' && state.currentState !== 'GAME_ENDED'">
                <div class="row">
                    <div class="col-12 my-5">
                        <TurnOrder :state="state"></TurnOrder>

                        <div class="text-center">
                            <Deck :disabled="!canPlay" @click.native="next" :state="state"></Deck>
                        </div>
                    </div>

                    <div class="col-6">
                        <Score class="mt-4" title="Ti" :score="state.score.you"></Score>
                    </div>
                    <div class="col-6">
                        <Score class="mt-4" title="Nasprotnik" :score="state.score.opponent"></Score>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <Card
                                        :isOpponent="false"

                                        :state="state"
                                        v-if="state.cards.you"
                                        @selectAttribute="selectAttribute"
                                        v-bind="state.cards.you"
                                />
                            </div>
                            <div class="col-6">
                                <Card
                                        :isOpponent="true"
                                        :state="state"
                                        v-if="state.cards.opponent"
                                        v-bind="state.cards.opponent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="state  && state.currentState === 'GAME_ENDED'">

                <div class="row">
                    <div class="col-12 my-5 text-center">

                        <div v-if="state.gameOutcome === 'win'">
                            <h1>Zmaga!</h1>
                            <p>Pridobil/a si {{ state.score.you }} točk.</p>
                        </div>
                        <div v-else-if="state.gameOutcome === 'lose'">
                            <h1>Poraz!</h1>
                            <p>Pridobil/a si {{ state.score.you }} točk.</p>
                        </div>
                    </div>
                </div>

            </template>
        </div>
        <scorekeeper :state="state" ref="scorekeeper"></scorekeeper>
    </div>
</template>

<script>
    import _ from 'lodash';
    import HelloWorld from "../components/HelloWorld.vue";
    import Card from "../components/Card.vue";
    import Navbar from "../components/Navbar.vue";
    import TurnOrder from "../components/TurnOrder.vue";
    import Score from "../components/Score.vue";
    import Deck from "../components/Deck.vue";
    import ConnectionState from "../components/ConnectionState.vue";

    import Scorekeeper from '../components/Scorekeeper.vue';

<<<<<<< Updated upstream
    export default {
        name: "app",
        components: {
            HelloWorld,
            Card,
            Navbar,
            TurnOrder,
            Score,
            Deck,
            ConnectionState,
            Scorekeeper,
        },
        data() {
            return {
                state: null,
                socket: null,
                connectionState: 'NOT INITIALIZED',
            };
        },
        methods: {
            next() {
                const action = _.includes(['WAITING_FOR_REACTION', 'TURN_ENDED'], this.state.currentState)
                    ? 'CONFIRM'
                    : 'DRAW_CARD'
                this.sendAction(action);
            },
            sendAction(action, data) {
                this.socket.emit("game", {action, data});
            },
            selectAttribute(attribute) {
                if (this.canPlay) {
                    this.sendAction('SELECT_ATTRIBUTE', attribute.name);
                }
            }
        },
        computed: {
            canPlay() {
                return this.state.playing;
            }
        },
        created() {
            this.socket = io("http://127.0.0.1:8081");
            this.socket.on("status", response => {
                this.connectionState = response;
            });

            this.socket.on("game", response => {
                console.log('EVENT RECEIVED', 'game', response)
                this.state = response;
=======
export default {
  name: "app",
  components: {
    HelloWorld,
    Card,
    Navbar,
    TurnOrder,
    Score,
    Deck,
    ConnectionState,
    Scorekeeper,
  },
  data() {
    return {
      state: null,
      socket: null,
      connectionState: 'NOT INITIALIZED',
    };
  },
  methods: {
    next() {
      const action = _.includes(['WAITING_FOR_REACTION', 'TURN_ENDED'], this.state.currentState)
        ? 'CONFIRM'
        : 'DRAW_CARD'
      this.sendAction(action);
    },
    sendAction(action, data) {
      this.socket.emit("game", { action, data });
    },
    selectAttribute(attribute) {
      if (this.canPlay) {
        this.sendAction('SELECT_ATTRIBUTE', attribute.name);
      }
    }
  },
  computed: {
    canPlay() {
      return this.state.playing;
    }
  },
  created() {
    this.socket = io();
    this.socket.on("status", response => {
      this.connectionState = response;
    });
>>>>>>> Stashed changes

                if (this.state.currentState === 'GAME_ENDED') {
                    this.$refs.scorekeeper.incrementScore(this.state.score.you);
                }
            });
        }
    };
</script>