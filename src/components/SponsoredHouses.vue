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
  <div class="my_container my-2">

  
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="house in this.store.housesHome" :key="house">
        <div class="carousel__item">
          <div class="my_card_container">

            <div class="my_card">
              <p><span>  
                <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
              </span></p>

            </div>
            <!-- <div class="d-flex flex-column py-2">
              <strong>{{house.title}}</strong>
              <em>{{ house.street}} , {{house.house_number}} - {{house.city}}</em>
            </div>
            <div class="my_show_btn">
              <router-link :to="{name:'show', params:{id: house.id}}" class="btn">
                <span class="px-2">Info</span>
                <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                </svg>
              </router-link>
            </div> -->
          </div>
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

.my_container{
  max-width: 1400px;
  margin: 0 auto;
}

h1{
  color: $text;
}

.carousel__track{
  display: flex;
  gap: 30px;
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