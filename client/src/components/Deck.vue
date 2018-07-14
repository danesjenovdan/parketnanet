<template>
    <div class="" v-if="state.playing && state.currentState !== 'WAITING_FOR_ATTRIBUTE_SELECTION'">


        <button class="btn btn-lg btn-primary">
            {{ buttonText }}
        </button>

        <!--
        <div class="card-header">
            <div>
                <h4 class="text-uppercase text-center mb-0 py-5">{{ buttonText }}</h4>
            </div>
        </div>
        <div class="card card-back">
            <div class="card-header"></div>
        </div>
        <div class="card card-back">
            <div class="card-header"></div>
        </div>
        <div class="card card-back">
            <div class="card-header"></div>
        </div>  -->
    </div>
</template>

<script>
  export default {
    name: 'Deck',
    props: ['state'],
    computed: {
      buttonText: function () {
        switch (this.state.currentState) {
          case 'WAITING_FOR_ACTIVE_PLAYER':
          case 'WAITING_FOR_INACTIVE_PLAYER':
            return 'Potegni karto';
          case 'WAITING_FOR_ATTRIBUTE_SELECTION':
            return 'Izberi statistiko';
          case 'TURN_ENDED':
          case 'WAITING_FOR_REACTION':
            return 'Potrdi rezultat';
        }

        return this.state.currentState;
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
<style lang="scss" scoped>

    .card-back {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 100%;
        height: 100%;
        z-index: -1;

        .card-header {
            height: 100%;
        }
    }

    .card-back + .card-back {
        top: -10px;
        right: -10px;
        z-index: -2;
    }

</style>
