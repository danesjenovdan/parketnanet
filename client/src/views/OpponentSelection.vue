<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 d-flex align-items-center justify-content-center">
        <button
          class="btn btn-success btn-lg"
          @click="redirect('friend')"
        >
          Igraj s prijateljem 😁
        </button>
      </div>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <button
          class="btn btn-danger btn-lg"
          @click="redirect('stranger')"
        >
          Igraj z neznancem 😨
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpponentSelection',
  methods: {
    redirect(opponentMode) {
      this.$router.push({ name: 'game', query: { opponentMode }});
    },
  },
};
</script>

<style scoped>
.container-fluid,
.row { height: 100vh; }

.btn { font-size: 2rem; }
</style>
