<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-4">
                    <img :src="`https://cdn.parlameter.si/v1/parlassets/img/people/square/${imageId}.png`" alt=""
                         class="img-fluid img-thumbnail">
                </div>
                <div class="col-8">
                    <h3>{{ name }}</h3>
                    <p>{{ party }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table class="table table-sm mt-5">
                        <tr :class="{'bg-primary': isSelected(attribute), 'text-white': isSelected(attribute)}"
                            v-for="attribute in attributes"
                            :key="attribute.name"
                            @click="$emit('selectAttribute', attribute)"
                        >
                            <td>{{ attribute.name }}</td>
                            <td class="text-right font-weight-bold">{{ Number((attribute.value).toFixed(1)) }}</td>
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
      name: String,
      imageId: String,
      party: String,
      attributes: Array,
      state: Object,
      isOpponent: Boolean,
    },
    methods: {
      isSelected(attribute) {
        return attribute.name === this.state.selectedAttribute;
      },
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

    .table {
        tr:hover {
            background: darken(white, 60%);
            color: white;
        }
    }

</style>
