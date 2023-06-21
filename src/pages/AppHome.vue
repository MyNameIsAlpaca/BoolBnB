<script>
import axios from 'axios';

import HouseCard from './components/HouseCard.vue';

export default{
  name: 'AppHome',

  data(){
    return{
      apiUrl: 'http://127.0.0.1:8000/api/houses',

      houses: [],

      
    }
  },

  components:{
    HouseCard,
  },  

  created() {
    this.getHouses(this.apiUrl);
  },

  methods:{
    getHouses(apiUrl){
      axios.get(apiUrl).then(res =>{
        console.log(res);
        
        this.houses = res.data.results.data;
      });
    }
  },
}
</script>

<template>
  <h1 class="text-center">In evidenza: </h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in houses" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>

    <!-- <div class="project-navigation">
      <button v-for="link in pagination.links" class="btn" v-html="link.label" :class="link.active ? 'btn-danger' : 'btn-outline-danger'"
        :disabled="link.url == null ? true : false" @click="getProjects(link.url)">
        
      </button>-->
    </div> 
</template>

<style scoped lang="scss">

</style>
