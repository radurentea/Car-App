<template>
    <div  class="q-pa-md">
        <h2 class="text-h2 text-center">Add a car</h2>
        <q-form
            @submit.prevent="addCar"
            class="q-gutter-md fit column justify-center items-center content-center"
        >
            <q-input
                filled
                v-model="car.name"
                label="Car name *"
                class="input-add"
                hint="Name of the car"
                lazy-rules
            >
                
            </q-input>
            <q-input
            class="input-add"
                filled
                v-model="car.color"
                label="Color"
                hint="Color of the car"
                lazy-rules
            >
                
            </q-input>
            <q-input
            class="input-add"
                filled
                v-model="car.model"
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
    export default {
        data() {
            return {
                car: this.createFreshCarObject()
            }
        },
        methods: {
            addCar() {
                this.$store
                    .dispatch('car/addCar', this.car)
                    .then((response) => {
                        console.log('Here it is: ' + JSON.stringify(response));
                        this.$router.push({
                            name: 'car-show',
                            params: { id: response }
                        })
                        this.car = this.createFreshCarObject()
                    })
                    .catch(() => {})
            },
            createFreshCarObject() {
                return {
                    name: '',
                    color: '',
                    model: ''
                }
            },
        },
    }
</script>

<style scoped>
.input-add {
    width: 400px;
}
</style>