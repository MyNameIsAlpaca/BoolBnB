import {reactive} from 'vue';

export const store = reactive({

  houses: [],

  housesHome: [],
      
  searchHouse: [],

  filterHouse: [],

  definitiveHouse: [],

  searchUser: '',

  searchLat: '',

  searchLong: '',

  distanceSearch: '',

  distanceSet: 20,

  isSearch: false,

  services: [],
    
});