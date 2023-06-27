<script>
import { store } from '../store.js';
import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';

export default {
  name: 'AppAdvSearch',
  data() {
    return {
      store,
      notFound: false,
    };
  },
  components: {
    HouseCard,
  },
  methods: {
    getHouses(){
      this.notFound = false

      if(this.store.checkFilter.length > 0) {

        
        axios.get('http://127.0.0.1:8000/api/houses', {
          params: {
            filtri: this.store.checkFilter.join(',')
          }
        }).then(res =>{    
          
          
          if(res.data.results.length > 0) {
            this.store.filterHouse = res.data.results;
            
            this.chooseArray()
          } else{
            console.log('ciao')
            this.notFound = true
          }
    
        });
      } else if(this.store.checkFilter.length == 0 && this.store.searchHouse.length == 0){
        axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
          
          this.store.definitiveHouse = res.data.results;
        });
      } else{
        this.store.definitiveHouse = this.store.searchHouse
      }
    },
    chooseArray() {
      if (this.store.searchHouse.length == 0 && this.store.filterHouse.length == 0){
        axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
          
          this.store.definitiveHouse = res.data.results;
        });
      }
      else if(this.store.searchHouse.length != 0 && this.store.filterHouse.length != 0){
        this.store.definitiveHouse = [];
        for (const house of this.store.filterHouse) {
          const foundHouse = this.store.searchHouse.find(item => item.id === house.id);
          if (foundHouse) {
            this.store.definitiveHouse.push(foundHouse);
          } else{
          }
        }
        if(this.store.definitiveHouse.length == 0){
          this.notFound = true;
        }
        this.store.filterHouse = []
      }else if(this.store.searchHouse.length != 0 && this.store.filterHouse.length == 0){
        this.store.definitiveHouse = []
        this.store.definitiveHouse = this.store.searchHouse
      } else if(this.store.filterHouse.length != 0 && this.store.searchHouse.length == 0){
        this.store.definitiveHouse = []
        this.store.definitiveHouse = this.store.filterHouse
        this.store.filterHouse = []
      }
      console.log(this.store.definitiveHouse)
      
      this.store.definitiveHouse.sort((a, b) => a.distance - b.distance);
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

  mounted(){
    if(this.store.firstTime){
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
          
          this.store.definitiveHouse = res.data.results;
        });
    }
  }

};
</script>

<template>
  <div class="d-flex justify-content-center gap-4 py-3">
    <div v-for="service in this.store.services">
      <input type="checkbox" :value="service.id" v-model="store.checkFilter" @change="getHouses()">
      <label class="ps-1" for="vehicle1">{{ service.name }}</label>
    </div>
  </div>
  <h1 class="text-center">Benvenuto alla ricerca avanzata</h1>
  <div class="text-center alert alert-warning" v-show="this.store.notFoundSearch">La tua ricerca non ha prodotto risultati</div>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-show="this.store.notFoundSearch == false" v-if="this.notFound == false" v-for="house in this.store.definitiveHouse" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
    <div v-else>
      <h4 class="alert alert-danger">Non ci sono case con questi filtri!</h4>
    </div>
  </div> 
</template>

<style scoped lang="scss">

</style>
