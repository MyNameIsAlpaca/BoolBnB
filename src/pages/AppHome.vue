

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
  <div class="container w-75 mx-auto my-2">
    <h1 class="w-75 mx-auto mt-5">In evidenza</h1>
    <hr class="w-75 mx-auto py-2"> 
    <div class="d-flex justify-content-between row">
      <div v-for="house in this.store.housesHome" class="col-4 mb-5">
        <HouseCard :house="house"></HouseCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  
@import "../scss/variables";

h1{
  color: $text;
}
</style>
