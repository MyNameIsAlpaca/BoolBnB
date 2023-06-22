
<script>
import {store} from '../store.js';

import axios from 'axios';

import HouseCard from '../components/HouseCard.vue';



export default{
  name: 'AppHeader',

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
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand">BoolBnB</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'search'}">Ricerca Avanzata</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'AppTwo'}">AppTwo</router-link>
            </li> 
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Cerca un luogo..." aria-label="Search" v-model="this.store.searchUser">
            <div v-show="this.store.searchUser.length > 0">
            </div>
            <select  v-model="this.store.distanceSet" name="distanceSet" id="distanceSet">
              <option selected value="20">20km</option>
              <option value="40">40km</option>
              <option value="100">60km</option>
            </select>
            <router-link :to="{ name: 'search' }"><button class="btn btn-outline-success ms-2" type="submit" @click="searchApi()" @onkeyup="searchApi()">Cerca</button></router-link>
          </form>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" :to="{name: 'login'}">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'register'}">Registrati</router-link>
            </li>
            <li>
              <a href="http://127.0.0.1:8000/register">registraaaaaa</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<style lang="scss" scoped>
  
</style>