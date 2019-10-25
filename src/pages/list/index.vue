<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">List of cars</div>

        <div class="q-gutter-md q-my-md row">
          <q-select
            filled
            v-model="color"
            label="Color"
            :options="this.car.colors"
            style="width: 250px; "
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            filled
            v-model="model"
            label="Model"
            :options="this.car.models"
            style="width: 250px;"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn color="primary" icon="filter_list" label="Filter" @click="filterList" />
        </div>
      </q-card-section>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-right">Color</th>
            <th class="text-right">Model</th>
          </tr>
        </thead>
        <tbody>
          <CarItem v-for="car in car.cars" :key="car.id" :car="car" />
        </tbody>
      </q-markup-table>
    </q-card>
    <div class="text-center q-pt-md pagination">
      <template v-if="page != 1">
        <router-link :to="{ name: 'car-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>
        <template v-if="hasNextPage">|</template>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'car-list', query: { page: page + 1 } }"
        rel="next"
      >Next Page</router-link>
    </div>
  </div>
</template>

<script>
import CarItem from "../../components/CarItem.vue";
import { mapState } from "vuex";

export default {
  components: {
    CarItem
  },
  data() {
    return {
      color: null,
      model: null
    };
  },
  methods: {
    // filterByColor(val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase();
    //     this.options = colorOptions.filter(
    //       v => v.toLowerCase().indexOf(needle) > -1
    //     );
    //     //add code here for query
    //   });
    // },
    // filterByModel(val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase();
    //     this.options = modelOptions.filter(
    //       v => v.toLowerCase().indexOf(needle) > -1
    //     );
    //   });
    // },
    filterList() {
      this.$store
        .dispatch("car/fetchCars", {
          page: this.page,
          pageSize: this.car.pageSize,
          color: this.color,
          model: this.model
        })
        .then(() => {
          this.color = "";
          this.model = "";
        });
    }
  },
  created() {
    this.$store.dispatch("car/fetchCars", {
      page: this.page,
      pageSize: this.car.pageSize
    });

    this.$store.dispatch("car/fetchColors");
    this.$store.dispatch("car/fetchModels");
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.car.carsTotal > this.page * this.car.pageSize;
    },
    ...mapState(["car"])
  }
};
</script>

<style scoped>
.pagination a {
  text-decoration: none;
  font-size: 1rem;
}
</style>