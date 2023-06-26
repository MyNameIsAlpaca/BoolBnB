import {reactive} from 'vue';

export const store = reactive({

  houses: [],

  housesHome: [],
      
  searchHouse: [],

  filterHouse: [],

  definitiveHouse: [],

  searchUser: '',

  checkFilter: [],

  searchLat: '',

  searchLong: '',

  distanceSearch: '',

  distanceSet: 20,

  isSearch: false,

  services: [],
    
});