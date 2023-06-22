

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

  created() {
    this.getHouses();
    this.chooseArray();
  },

  methods:{
    getHouses(){
      axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
        this.store.houses = res.data.results;
      });
    },
    searchApi(){

      if(this.store.searchUser.length == 0){
        this.store.isSearch = false;
      }else{
        this.store.isSearch = true;
      }
      
      this.store.searchHouse = [];

      if(this.store.searchUser != '') {
        axios.get('https://api.tomtom.com/search/2/search/' + this.store.searchUser + '.json?countrySet=IT&key=5dkGa9b2PDdCXlAFGvkpEYG83DUj9jgv').then(res =>{
  
          this.store.searchLat = res.data.results[0].position.lat;
          this.store.searchLong = res.data.results[0].position.lon;
          this.filterHouse()
        })
      }

    },
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const earthRadiusKm = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadiusKm * c;
        this.store.distanceSearch = distance;
    },
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    filterHouse(){
      
      for(let i = 0;i < this.store.houses.length; i++ ){
        
        this.getDistanceFromLatLonInKm(this.store.houses[i].latitude, this.store.houses[i].longitude, this.store.searchLat, this.store.searchLong)

        if(this.store.distanceSearch < this.store.distanceSet){
          this.store.searchHouse.push(this.store.houses[i]);
        }
      }

    },
    chooseArray(){
      if(this.store.isSearch){
        return this.store.searchHouse
      }else{
        return this.store.houses
      }
    },
  },
}
</script>

<template>
  <h1 class="container text-center">In evidenza: </h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in this.store.houses" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
  </div> 
</template>

<style scoped lang="scss">
  .container {
    padding-top: 100px;
  }
</style>
