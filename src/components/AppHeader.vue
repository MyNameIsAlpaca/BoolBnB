
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
      baseSearch: [],
      authenticated: true,
      
    }
  },

  components:{
    HouseCard,
  },  

  mounted(){
    this.baseSearch = [];
    axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
        
        this.baseSearch = res.data.results;
    });

    
  },

  methods:{
    resetSearch(){
      this.store.searchUser = '';
      this.store.filterHouse = [];
      this.store.searchHouse = [];
      this.store.definitiveHouse = this.store.housesHome;
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
    searchApi(){

      this.store.firstTime = false;

      this.store.notFoundSearch = false;
      
      this.store.definitiveHouse = [];

      this.store.filterHouse = [];
    
      this.store.searchHouse = [];
      
      this.store.checkFilter = [];
      
      if(this.store.searchUser != '') {
        axios.get('https://api.tomtom.com/search/2/search/' + this.store.searchUser + '.json?countrySet=IT&key=apjfXb9AwAOHRXxZDlUdnzwdqLaYSvFZ').then(res =>{
          if(res.data.results.length > 0){
            if(res.data.results[0] == null){
              this.store.searchLat = '';
              this.store.searchLong = '';
            }else{
              this.store.searchLat = res.data.results[0].position.lat;
              this.store.searchLong = res.data.results[0].position.lon;
              this.filterHouse()
            }
          }else{
            this.store.notFoundSearch = true
          }
          
        }).catch(function (error) {console.log(error)});
      }else{
        axios.get("http://127.0.0.1:8000/api/houses").then(res =>{
          
          this.store.definitiveHouse = res.data.results;
        }); 
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
      
      for(let i = 0;i < this.baseSearch.length; i++ ){
        
        this.getDistanceFromLatLonInKm(this.baseSearch[i].latitude, this.baseSearch[i].longitude, this.store.searchLat, this.store.searchLong)
        
        if(this.store.distanceSearch < this.store.distanceSet){

          this.baseSearch[i].distance = Math.round(this.store.distanceSearch)

          
          this.store.searchHouse.push(this.baseSearch[i]);
          
        }
      }
      
      if(this.store.searchHouse.length == 0){
        this.store.notFoundSearch = true
      }else{

        this.chooseArray()
      }
      
    },

    /* checkAuthentication() {
      axios.get("http://127.0.0.1:8000/authenticated").then(response => {
        this.authenticated = response.data.authenticated;
       console.log(response);
       console.log(this.authenticated);
      })
    }, */
  },
}
</script>

<template>
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid">
        <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}" @click="this.resetSearch()">
          <img class="logo" src="public\logochiaro.png" alt="logo">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}" @click="this.resetSearch()">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'search'}" @click="this.resetSearch()"> Ricerca Avanzata</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'AppTwo'}" @click="this.resetSearch()">AppTwo</router-link>
            </li> 
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control my_search" type="search" placeholder="Cerca un luogo..." aria-label="Search" v-model="this.store.searchUser" >
            <select class="my_select" v-model="this.store.distanceSet" name="distanceSet" id="distanceSet">
              <option selected value="20">20km</option>
              <option value="40">40km</option>
              <option value="100">60km</option>
            </select>
            <router-link :to="{ name: 'search' }"><button class="my_btn" type="submit" @click="searchApi()">CERCA</button></router-link>
          </form>

          <!-- questa è la sezione del login del nostro front end che deve cambiare per essere uguale al badk end -->
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <!-- qui va un if con se sei loggato allora devi nascondere questi <li> e mostrare il dropdown del backend -->
              
            <li  v-if="this.authenticated == false" class="nav-item">
              <a class="nav-link" href="http://127.0.0.1:8000/login/">Nuovo</a>
            </li>
            <li v-if="this.authenticated == true">
              <a class="nav-link" href="http://127.0.0.1:8000/register">Registrati</a>
            </li>
          </ul>


        </div>
      </div>
    </nav>
</template>

<style lang="scss" scoped>

@import "../scss/variables";
@import "../scss/mixins";

nav{
  background-color: $primary;
  color: white;
  .logo{
    width: 100px;
  }

  .my_search{
    background-color: white;
    @include border();
    width: 500px;
  }

  .my_select{
    @include border();
    padding: 0px 10px;
    margin: 0px 10px;
    background-color: $accent;
    color: white;
  }

  .my_btn{
    @include border();
    padding: 10px 30px;
    background-color: $secondary;
    color: white;
    font-weight: bold;
    letter-spacing: 3px;
    transition: .3s;
  }




  .my_btn:hover {
    background-color: $secondary;
    box-shadow: 0 0 0 5px white;
    color: #fff;
  }
  

}
</style>