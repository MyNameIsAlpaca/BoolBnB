<script>
import { store } from '../store.js';
import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';

export default {
  name: 'AppAdvSearch',
  data() {
    return {
      store,
      checkFilter: [],
      notFound: false,
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
      if(res.data.results.length == 0){
        if(this.checkFilter.length == 0){
          this.store.filterHouse = []
        }else{
          this.notFound = true,

          this.store.filterHouse = []
        }
        
      }else{

      this.notFound = false

        this.store.filterHouse = res.data.results;
      }

      });
    },
    chooseArray() {
      if (this.store.searchHouse == 0 && this.store.filterHouse == 0){
        axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
          this.store.definitiveHouse = res.data.results;
        });
      }
      else if(this.store.searchHouse != 0 && this.store.filterHouse != 0){
        this.store.definitiveHouse = [];
        for (const house of this.store.searchHouse) {
          const foundHouse = this.store.filterHouse.find(item => item.id === house.id);
          if (foundHouse) {
            this.store.definitiveHouse.push(foundHouse);
          } else{
          }
        }
      }else if(this.store.searchHouse.length != 0 && this.store.filterHouse.length == 0){
        this.store.definitiveHouse = this.store.searchHouse
      } else if(this.store.filterHouse.length != 0 && this.store.searchHouse.length == 0){
        this.store.definitiveHouse = this.store.filterHouse
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
    if(this.store.definitiveHouse.length > 0){
      console.log('ciao')
    }else{
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
          
          this.store.definitiveHouse = res.data.results;
        });
    }
  },
};
</script>

<template>
  <div class="d-flex justify-content-center gap-4 py-3">
    <div v-for="service in this.store.services">
      <input type="checkbox" :value="service.id" v-model="checkFilter" @change="getHouses()">
      <label class="ps-1" for="vehicle1">{{ service.name }}</label>
    </div>
    <button @click="this.chooseArray()">clicca</button>
  </div>
  <h1 class="text-center">Benvenuto alla ricerca avanzata</h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-if="this.notFound == false" v-for="house in this.store.definitiveHouse" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
    <div v-else>
      <h4 class="alert alert-danger">Non ci sono case con questi filtri!</h4>
    </div>
  </div> 
</template>

<style scoped lang="scss">

</style>
