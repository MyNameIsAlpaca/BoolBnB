<script>
import { store } from '../store.js';
import axios from 'axios';


import ServiceHouses from '../components/ServiceHouses.vue';
export default {
  name: 'AppAdvSearch',
  data() {
    return {
      store,
      notFound: false,
      searchBed: 1,
      searchBath: 1,
    };
  },
  components: {
    ServiceHouses
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
  <div class="home_container">

    <h1 class="text-center my-5">Ricerca Avanzata</h1>
    <hr>
    <div id="services">
      <h5 class="text-center">Seleziona un servizio</h5>
    
      <div class="my_services">
        <div class="single_service" v-for="service in this.store.services">
          <input type="checkbox" :value="service.id" v-model="store.checkFilter" @change="getHouses()">
          <label class="ps-1" for="vehicle1">{{ service.name }}</label>
        </div>
      </div>

      <div class="my_select_services">
        <div>
          <span> Numero di letti: </span>
          <select aria-label="Default select example" v-model="searchBed" @change="getHouses()">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9+</option>
          </select>
        </div>
        <div>
          <span> Numero di bagni: </span>
          <select aria-label="Default select example" v-model="searchBath" @change="getHouses()">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9+</option>
          </select>
        </div>
  
      </div>
    </div>
    <div class="text-center alert alert-warning" v-show="this.store.notFoundSearch">La tua ricerca non ha prodotto risultati</div>
    <div class="row">
      <div v-for="house in this.store.definitiveHouse" v-show="this.store.notFoundSearch == false && this.searchBed <= house.beds && this.searchBath <= house.bathrooms" v-if="this.notFound == false" class="col-sm-12 col-md-6 col-lg-4 mb-5">
        <ServiceHouses :house="house"></ServiceHouses>
      </div>
      <div v-else>
        <h4 class="alert alert-danger">Non ci sono case con questi filtri!</h4>
      </div>
    </div> 
  </div>
</template>

<style scoped lang="scss">


@import "../scss/variables";
@import "../scss/mixins";

.my_services{
  margin: 2rem 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;


  .single_service{
    @include border();
    padding: 8px 10px;
    background-color: $secondary;
    color: white;
  }

  
}

.my_select_services{
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 2rem 0;

  select{
    border: 2px solid $accent;
    border-radius: 30px;

    padding: 10px;
  }
}




</style>
