<template>
  <div id="game">
    <Navbar></Navbar>
    <div class="container-fluid">
      <ConnectionState :state="connectionState"></ConnectionState>
      <template v-if="state && connectionState !== 'SOMEONE_DISCONNECTED'">
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
    </div>
    <router-view/>
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
  },
  data() {
    return {
      state: null,
      socket: null,
      connectionState: 'NOT INITIALIZED',
      myId: null,
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
    const { opponentMode } = this.$route.query;

    if (opponentMode === 'stranger') {
      this.socket = io("http://127.0.0.1:8081");
    } else {
      this.socket = io("http://127.0.0.1:8081/friend")
    }

    this.socket.on("status", response => {
      this.connectionState = response;
      this.myId = this.socket.id;
      debugger;
    });

    this.socket.on("game", response => {
      console.log('EVENT RECEIVED', 'game', response)
      this.state = response;
    });
  }
};
</script>