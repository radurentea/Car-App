<template>
    <div>
        <div class="car-header">
            <h2 class="text-h2 text-center">{{car.name}}</h2>
        </div>

        <div class="q-pa-md text-center">
            <q-list >
                <q-item clickable v-ripple> 
                    <q-item-section>
                        <q-item-label overline> Color </q-item-label>
                        <q-item-label> {{ car.color }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label overline> Model </q-item-label>
                        <q-item-label> {{ car.model }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'

export default {
    props: ['id'],
    created() {
        this.fetchCar(this.id)
    },
    computed: mapState({
        car: state => state.car.car
    }),
    methods: mapActions('car',['fetchCar'])
    }
</script>

<style scoped>

</style>