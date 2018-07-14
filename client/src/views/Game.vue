<template> 
  <div id="game">
    <Navbar></Navbar>
    <div class="container-fluid">
      <h1>{{ connectionState }}</h1>
      <template v-if="state"> 
          <div class="row"> 
            <div class="col-4"> 
              <TurnOrder></TurnOrder> 
              <Score class="mt-4" title="Tvoje točke" :score="state.score.you"></Score> 
              <Score class="mt-4" title="Nasprotnikove točke" :score="state.score.opponent"></Score> 
            </div> 
            <div class="col-8"> 
              <div class="row"> 
                <div class="col-6"> 
                  <Card 
                    v-if="state.cards.you" 
                    @selectAttribute="selectAttribute" 
                    v-bind="state.cards.you" 
                  /> 
                </div> 
                <div class="col-6"> 
                  <Card 
                    v-if="state.cards.opponent" 
                    v-bind="state.cards.opponent" 
                  /> 
                </div> 
              </div> 
            </div> 
          </div> 
          <div class="row"> 
            <div class="offset-8 col-4"> 
              <Deck :disabled="!canPlay" @click.native="processQueue" :queue-length="queue.length"></Deck> 
            </div> 
          </div> 
        </template>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template> 
 
<script> 
import Card from "../components/Card.vue"; 
import Navbar from "../components/Navbar.vue"; 
import TurnOrder from "../components/TurnOrder.vue"; 
import Score from "../components/Score.vue"; 
import Deck from "../components/Deck.vue"; 
 
export default { 
  name: 'Game', 
  components: {
    Card, 
    Navbar, 
    TurnOrder, 
    Score, 
    Deck 
  }, 
  data() { 
    return { 
      queue: [], 
      state: null, 
      socket: null, 
      connectionState: 'NOT INITIALIZED', 
    }; 
  }, 
  methods: { 
    processQueue() { 
      if (this.queue.length > 0) { 
        this.state = this.queue.shift(); 
      } 
    }, 
    sendAction(action, data) { 
      this.socket.emit("game", { action, data }); 
    }, 
    selectAttribute(attribute) { 
      if (this.canPlay) { 
        this.state.playing = false; 
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
      this.queue.push(response); 
      if (this.state === null) { 
        this.processQueue(); 
      } 
    }); 
  } 
}; 
</script>