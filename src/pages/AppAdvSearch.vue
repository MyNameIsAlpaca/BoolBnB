<script>

import {store} from '../store.js';

import HouseCard from '../components/HouseCard.vue';

export default {
  name: 'AppAdvSearch',
  data() {
    return {
      store,
    }
  },
  components: {
    HouseCard,
  },
  methods: {
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
  <h1 class="text-center">Benvenuto alla ricerca avanzata</h1>
  <div class="text-center w-75 mx-auto d-flex justify-content-between row">
    <div v-for="house in chooseArray()" class="col-4 mb-5">
      <HouseCard :house="house"></HouseCard>
    </div>
    <div v-show="this.store.searchUser.length > 0 && this.store.searchHouse.length ==0">
      Non ho trovato risultati
    </div>
  </div> 
</template>

<style scoped lang="scss">

</style>
