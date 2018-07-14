<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-4">
                    <img src="http://placehold.it/200x200" alt="" class="img-fluid img-thumbnail">
                </div>
                <div class="col-8">
                    <h3>{{ firstName }} {{ lastName }}</h3>
                    <p>{{ group }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <tr v-for="attribute in attributes" v-on:click="$emit('selectAttribute', attribute)">
                            <td>{{ attribute.name }}</td>
                            <td>{{ attribute.value }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    export default {
        name: 'Card',
        props: {
            firstName: String,
            lastName: String,
            portraitUrl: String,
            group: String,
            attributes: Array,
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
