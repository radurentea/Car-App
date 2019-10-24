<template>
        <tr>

            <td class="text-left">
                <router-link class="car-link" :to="{ name: 'car-show', params: { id: car.id } }">
                    {{ car.name }}
                </router-link>
                <router-link class="icon-link text-primary" :to="{ name: 'car-edit', params: { id: car.id } }">
                    <q-icon class="q-px-md" name="edit" />
                </router-link>
                <a class="icon-link text-primary" :to="{ name: 'car-list' }" @click="deleteCar">
                    <q-icon name="delete" />
                </a>
            </td>
            <td class="text-right">
                {{ car.color }}
            </td>
            <td class="text-right">
                {{ car.model }}
            </td>
        </tr>
</template>

<script>
    export default {
        props: {
            car: Object
        },
        methods: {
            deleteCar(){
                this.$store
                    .dispatch('car/deleteCar', this.car)
            },
        },
        
    }
</script>

<style scoped>
.car-link{
    color:black;

}
.icon-link{
    text-decoration: none;
}
</style>