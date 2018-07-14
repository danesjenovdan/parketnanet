<template>
    <div class="card">
        <div class="card-body bg-light">
            <div class="row">
                <div class="col-8">{{title}}</div>
                <div class="col-4">{{ score }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Score',
        props: {
            title: String,
            score: String,
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
