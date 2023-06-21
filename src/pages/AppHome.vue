<script>
import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';

export default{
  name: 'AppHome',

  data(){
    return{
      apiUrl: 'http://127.0.0.1:8000/api/houses',

      houses: [],
      
      searchHouse: [],

      searchUser: '',

      searchLat: '',

      searchLong: '',

      distanceSearch: '',
      
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
        
        this.houses = res.data.results;
      });
    },
    searchApi(){
      this.searchHouse = [];
      axios.get('https://api.tomtom.com/search/2/search/' + this.searchUser + '.json?countrySet=IT&key=5dkGa9b2PDdCXlAFGvkpEYG83DUj9jgv').then(res =>{

        this.searchLat = res.data.results[0].position.lat;
        this.searchLong = res.data.results[0].position.lon;
        this.filterHouse()
      })
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
        this.distanceSearch = distance;
    },
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    filterHouse(){
      
      for(let i = 0;i < this.houses.length; i++ ){
        

        this.getDistanceFromLatLonInKm(this.houses[i].latitude, this.houses[i].longitude, this.searchLat, this.searchLong)

        if(this.distanceSearch < 150){
          this.searchHouse.push(this.houses[i]);
        }
        

      }
      console.log(this.searchHouse);
    },
    chooseArray(){
      if(this.searchHouse.length > 0){
        return this.searchHouse
      } else {
        return this.houses
      }
    },
  },
}
</script>

<template>
  <div class="text-center pt-3 pb-2">
    <input type="text" placeholder="Cerca in un luogo" v-model="searchUser">
    <button @click="searchApi()">Cerca</button>
  </div>
  <h1 class="text-center">In evidenza: </h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in chooseArray()" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
    </div> 
</template>

<style scoped lang="scss">

</style>
