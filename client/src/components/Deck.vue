<template>
    <div class="card position-relative">
        <div class="card-header">
            <div>
                <h4 class="text-uppercase text-center mb-0 py-5">Kupček kart</h4>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Deck',
        props: {},
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
