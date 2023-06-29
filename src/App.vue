<script>
import AppMain from './pages/AppHome.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    AppMain,
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <div class="my_body">
    <div class="my_nav">
      <AppHeader></AppHeader>
      
    </div>
    <div class="my_main">
      <router-view></router-view> 
  
    </div>
    
      <AppFooter></AppFooter>        
  
    

  </div>
</template>

<style lang="scss" scoped>

.my_body{
  
  .my_nav{
    height: 50px;
    width: 100%;
  }
  
  .my_main{
    height: calc(100% - 150px);
  }
  
  // .my_footer{
  //   height: 100px;
  //   width: 100%;

  // }

}




</style>
