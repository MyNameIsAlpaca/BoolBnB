import {reactive} from 'vue';

export const store = reactive({

  firstTime: true,

  houses: [],

  housesHome: [],

  sponsoredHouses:[],
      
  searchHouse: [],

  notFoundSearch: false,

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