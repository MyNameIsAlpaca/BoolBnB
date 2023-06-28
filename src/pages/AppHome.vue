

<script>
import {store} from '../store.js';

import axios from 'axios';

import SponsoredHouses from '../components/SponsoredHouses.vue';
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
    SponsoredHouses
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
  <div id="home_container">
    
    <h1>In Evidenza</h1>
    <hr> 
    
    <SponsoredHouses></SponsoredHouses>
    
    <h1>Appartamenti</h1>
    <hr> 
    <div id="house_card_container" class="d-flex justify-content-between row">
      <div v-for="house in this.store.housesHome" class="col-sm-12 col-md-6 col-lg-4 mb-5">
        <HouseCard :house="house"></HouseCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  
@import "../scss/variables";
@import "../scss/mixins";


#home_container{
  max-width: 1200px;
  margin: 3rem auto;

  h1{
    color: $text;
    padding: 1rem 0;
  }

  hr{
    padding: 1rem 0; 
  }
}

@media screen and (max-width: 992px) {
 
  #home_container{
    max-width: 700px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 576px) {
 
  #home_container{
    max-width: 400px;
    margin: 0 auto;
  }
}

</style>
