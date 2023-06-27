<script>
import {store} from '../store.js';

import axios from 'axios';

import SponsorTemporaneo from '../components/SponsorTemporaneo.vue';

import { defineComponent } from 'vue'

import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'


export default defineComponent({
  name: 'Breakpoints',

  data: () => ({
    settings: {
            itemsToShow: 1,
            snapAlign: 'center',
        },
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 5,
                snapAlign: 'start',
            },
        },
        apiUrl: 'http://127.0.0.1:8000/api/houses',
        store,
    }),

  components:{
    Carousel,
    Slide,
    Navigation,
    SponsorTemporaneo
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

})
</script>

<template>
  <!-- inizio carousel case sponsorizzate -->
  <div class="container w-75 mx-auto my-2">

  
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="house in this.store.housesHome" :key="house">
        <div class="carousel__item">
            <SponsorTemporaneo
             :house="house"></SponsorTemporaneo>
        </div>
      </Slide>

      <template #addons>
        <Navigation>
          <template #next>
              <i class="fa-solid fa-chevron-right"></i>
          </template>
          <template #prev>
              <i class="fa-solid fa-chevron-left"></i>
          </template>
        </Navigation>
      </template>
    </Carousel>
  </div>

  <!-- fine carousel case sponsorizzate -->

  <!-- <div class="container w-75 mx-auto my-2">
    <h1 class="w-75 mx-auto mt-5">In evidenza</h1>
    <hr class="w-75 mx-auto py-2"> 
    <div class="d-flex justify-content-between row">
      <div v-for="house in this.store.housesHome" class="col-4 mb-5">
        <HouseCard :house="house"></HouseCard>
      </div>
    </div>
  </div> -->

</template>

<style lang="scss">
  
@import "../scss/variables";

h1{
  color: $text;
}

.fa-solid.fa-chevron-right {
        font-size: 50px;
        padding-left: 100px;
        color: $text;
        transition: all 0.4s ease-in-out;
    }

    .fa-solid.fa-chevron-left {
        font-size: 50px;
        padding-right: 100px;
        color: $text;
        transition: all 0.4s ease-in-out;
    }

    .fa-solid.fa-chevron-right:hover,
    .fa-solid.fa-chevron-left:hover {
        transform: scale(1.15);
    }

</style>