<template>
    <div  class="q-pa-md">
        <h2 class="text-h2 text-center">Editing car {{ modifiedCar.name }}</h2>
        <q-form
            @submit.prevent="editCar"
            class="q-gutter-md"
        >
            <q-input
                filled
                v-model="modifiedCar.name"
                label="Car name *"
                hint="Name of the car"
                lazy-rules
            >
                
            </q-input>
            <q-input
                filled
                v-model="modifiedCar.color"
                label="Color"
                hint="Color of the car"
                lazy-rules
            >
                
            </q-input>
            <q-input
                filled
                v-model="modifiedCar.model"
                label="Model"
                hint="Model of the car"
                lazy-rules
            >
                
            </q-input>

            <div>
                <q-btn label="Submit" type="submit" color="primary" value="Submit"/>
            </div>

        </q-form>
    </div>


</template>

<script>
import { mapState, mapActions} from 'vuex'
import { clone } from 'quasar'

export default {
    props: ['id'],
    data(){
        return {
            modifiedCar: {}
        }
    },
    mounted() {
        this.fetchCar(this.id).then(() => {
           this.modifiedCar = clone(this.car);
        })
        .catch(err => {
            console.log(err);
        })
    },
    computed: mapState({
        car: state => state.car.car
    }),
    methods: {
        editCar() {
                this.$store
                    .dispatch('car/editCar', this.modifiedCar)
                    .then(() => {
                        this.$router.push({
                            name: 'car-list'
                        })
                    })
                    .catch(error => {
                       console.log(error)
                    })
            },
        ...mapActions('car',['fetchCar'])
    }
}
</script>

<style scoped>

</style>