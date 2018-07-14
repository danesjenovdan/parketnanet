<template>
    <div class="turn-order">
        <div class="">
            <div class="card-body text-center">
                <div v-if="state.turnOutcome === 'undetermined'">

                    <h1>{{ state.playing ? 'Ti si na vrsti' : 'Čakam nasprotnika' }}</h1>

                    <div v-if="state.playing">
                        <p>{{ humanReadableState }}</p>
                    </div>
                </div>
                <div v-else="">
                    <h1>{{ state.turnOutcome === 'win' ? 'Zmaga' : 'Sožalje' }}</h1>

                    <div v-if="state.playing">
                        <p>{{ humanReadableState }}</p>
                    </div>
                    <div v-else="">
                        <p>Čakam, da nasprotnik potrdi rezultat</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TurnOrder',
    props: {
      current: Number,
      state: Object,
    },
    computed: {
      humanReadableState(){
        switch (this.state.currentState)
        {
          case 'WAITING_FOR_ACTIVE_PLAYER':
          case 'WAITING_FOR_INACTIVE_PLAYER':
            //return 'Potegni karto';
            return '';
          case 'WAITING_FOR_ATTRIBUTE_SELECTION':
            return 'Izberi statistiko';
          case 'TURN_ENDED':
          case 'WAITING_FOR_REACTION':
            return 'Potrdi rezultat';
        }

        return this.state.currentState;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
