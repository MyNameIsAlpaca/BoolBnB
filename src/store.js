import {reactive} from 'vue';

export const store = reactive({

  houses: [],
      
  searchHouse: [],

  searchUser: '',

  searchLat: '',

  searchLong: '',

  distanceSearch: '',

  distanceSet: 20,

  isSearch: false,
    
});