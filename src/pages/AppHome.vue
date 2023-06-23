

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
    getHouses(){
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
        this.store.housesHome = res.data.results;
      });
    },
  },

  created() {
    this.getHouses();
  },

}
</script>

<template>
  <h1 class="container text-center">In evidenza: </h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in this.store.housesHome" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
  </div> 
</template>

<style lang="scss">
  
</style>
