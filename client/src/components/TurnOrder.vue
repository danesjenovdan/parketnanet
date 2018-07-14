<template>
    <div class="turn-order">
        <div class="card">
            <div class="card-body bg-light">
                <h6 class="text-uppercase text-center">Poteze</h6>
                <ol class="mt-5">
                    <li class="font-weight-bold">Potegni karto</li>
                    <li>Izberi statistiko</li>
                    <li>Nasprotnik potegne karto</li>
                    <li>Določi se zmagovalec</li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TurnOrder',
        props: {
            current: Number,
        },
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
