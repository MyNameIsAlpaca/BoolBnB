<script>
import { store } from '../store.js';
import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';

export default {
  name: 'AppAdvSearch',
  data() {
    return {
      store,
      filteredHouse: [],
      checkFilter: [],
    };
  },
  components: {
    HouseCard,
  },
  methods: {
    getHouses(){
      axios.get('http://127.0.0.1:8000/api/houses', {
       params: {
        filtri: this.checkFilter.join(',')
       }
     }).then(res =>{
        
        this.store.houses = res.data.results;
      });
    },
    chooseArray() {
      if (this.store.isSearch) {
        return this.store.searchHouse;
      } else {
        return this.store.houses;
      }
    },
    
    getServices() {
      axios.get("http://127.0.0.1:8000/api/services").then(res => {
        this.store.services = res.data.results;
      });
    },
  },
  created() {
    this.getServices();
  },
};
</script>

<template>
  <div class="d-flex justify-content-center gap-4 py-3">
    <div v-for="service in this.store.services">
      <input type="checkbox" :value="service.id" v-model="checkFilter">
      <label class="ps-1" for="vehicle1">{{ service.name }}</label>
    </div>
    <button @click="this.getHouses()">clicca</button>
  </div>
  <h1 class="text-center">Benvenuto alla ricerca avanzata</h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in chooseArray()" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
    <div v-show="this.store.searchUser.length > 0 && this.store.searchHouse.length ==0">
    </div>
  </div> 
</template>

<style scoped lang="scss">

</style>
