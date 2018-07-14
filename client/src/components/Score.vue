<template>
    <div class="">
        <div class="card-body bg-light">
            <h6 class="display-4 text-center">{{ title }}</h6>
            <p class="text-center">Točke: {{ score }}</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Score',
    props: {
      title: String,
      score: Number,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .display-4 {
        font-size: 2.5rem;
    }

</style>
