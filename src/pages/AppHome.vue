

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
    getHousesHomeSponsored(){
      axios.get("http://127.0.0.1:8000/api/sponsoredHouses").then(res =>{
        
        this.store.sponsoredHouses = res.data.results;
      });
    },
    getHousesHome(){
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
        this.store.housesHome = res.data.results;
      });
    },
  },

  created() {
    this.getHousesHome();
    this.getHousesHomeSponsored();
  },

}
</script>

<template>
  <div class="home_container">
    
    <div v-if="this.store.sponsoredHouses.length == 0">
      Benvenuto in BoolBnB
    </div>
    <div v-else>
      <div>
        <h1>In Evidenza</h1>
          <hr> 
    
          
          <SponsoredHouses></SponsoredHouses>
      </div>
    </div>
    
    
    <h1>Appartamenti</h1>
    <hr> 
    <div id="house_card_container" class="row">
      <div v-for="house in this.store.housesHome" class="col-sm-12 col-md-6 col-lg-4 mb-5">
        <HouseCard :house="house"></HouseCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  
@import "../scss/variables";
@import "../scss/mixins";


.home_container{
  max-width: 1200px;
  margin: 2rem auto;

  h1{
    color: $text;
    padding: 1rem 0;
  }

  hr{
    padding: 1rem 0; 
  }
}

@media screen and (max-width: 992px) {
 
  .home_container{
    max-width: 700px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 576px) {
 
  .home_container{
    max-width: 300px;
    margin: 0 auto;
  }
}

</style>
