

<script>
import {store} from '../store.js';

import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';



export default{
  name: 'AppHome',

  data(){
    return{
      apiUrl: 'http://127.0.0.1:8000/api/houses',
      store,
      
    }
  },

  components:{
    HouseCard,
  },  
  
  methods:{
    getHousesHome(){
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
        this.store.housesHome = res.data.results;
      });
    },
  },

  created() {
    this.getHousesHome();
  },

}
</script>

<template>
<<<<<<< HEAD
  <div class="py-4 px-4">
    <h1 class="text-start">In evidenza</h1>
    <div class="w-75 mx-auto d-flex justify-content-between row">
      <div v-for="house in this.store.housesHome" class="col-4 mb-5">
        <HouseCard :house="house"></HouseCard>
      </div>
=======
  
  <h1 class="container text-center">In evidenza: </h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in this.store.housesHome" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
>>>>>>> badc494cda29b3d5a62e43ba8a5b126c72c63394
    </div>
  </div>
</template>

<style lang="scss">
  
</style>
