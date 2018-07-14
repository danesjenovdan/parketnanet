<template>
    <div>
        <div class="row">
            <div class="col-12 text-center">
                <div v-if="state === 'WAITING_FOR_OPPONENT'">
                    <h1 class="text-uppercase">Čakam na nasprotnika</h1>
                </div>
                <div v-else-if="state === 'SOMEONE_DISCONNECTED'">
                    <h1 class="text-uppercase">Nasprotnik se je odjavil</h1>
                    <button class="btn btn-lg btn-primary mt-5" @click="refresh">Poišči novega nasprotnika</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ConnectionState',
    props: ['state'],
    methods: {
      refresh: function () {
        window.location.reload();
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
