<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          <router-link class="myHome" :to="{ name : 'home'}">
          Best Cars
          </router-link>
        </q-toolbar-title>

        <q-tabs 
        inline-label
        >
          <q-route-tab
            icon="list"
            to="/list"
            label="List"
            exact
          />
          <q-route-tab
            icon="add"
            to="/add"
            label="Add Car"
            exact
          />
        </q-tabs>
      </q-toolbar>


    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>

        <q-item
          clickable
          tag="a"
          :to='{name: "home"}'
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Visit the homepage</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
        clickable 
        tag="a" 
        :to='{name: "car-list"}'
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Car list</q-item-label>
            <q-item-label caption>Discover all the cars</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          :to='{name: "addCar"}'
        >
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add a car</q-item-label>
            <q-item-label caption>Add a new car</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <NotificationContainer/>
      <router-view :key="$route.fullPath"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import NotificationContainer from '../components/NotificationContainer.vue'
export default {
  name: "MyLayout",
  components: {
    NotificationContainer
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>

<style>
.myHome{
  text-decoration: none;
}

.myHome:visited{
  color: #fff;
}
</style>