<template>
    <div class="turn-order">
        <div class="card">
            <div class="card-body bg-light text-center">
                <div v-if="this.state.turnOutcome === 'undetermined'">
                    <div v-if="shouldSelectAttribute">
                        <h6 class="text-uppercase text-center">Ti si na vrsti</h6>
                        <p class="mb-0 mt-5"><b>Izberi statistiko</b></p>
                    </div>
                    <div v-else="">
                        <h6 class="text-uppercase text-center">Nasprotnik je na vrsti</h6>
                        <p class="mb-0 mt-5"><b>Počakaj, da izbere statistiko</b></p>
                    </div>
                </div>
                <div v-else-if="this.state.turnOutcome === 'win'">
                    <h6>Čestitke</h6>
                    <p class="mb-0">Dobil/a si točke.</p>
                </div>

                <div v-else="">
                    <h6>Škoda</h6>
                    <p class="mb-0">Tvoj nasprotnik je dobil točke</p>
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
      shouldSelectAttribute: function () {
        if (this.state) {
          return this.state.playing;
        }

        return false;
      }
    }
    /* data: function () {
         return {
             name: 'Jožef Horvat',
             group: 'NSI',
         }
     }*/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
