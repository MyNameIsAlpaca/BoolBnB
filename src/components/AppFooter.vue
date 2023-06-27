<script>
export default {
  name: 'AppFooter',

  data() {
    return {
      
    }
  }
}
</script>

<template>
  <footer>
    <div class="footer">
      <div class="links">
        <ul class="pt-4">
          <li><a href="">Lavora con noi</a></li>
          <li><a href="">About Us</a></li>
          <li><a href="">Contatti</a></li>
          <li><a href="">Termini&Servizi</a></li>
        </ul>
      </div>
      <img src="public/logochiaro.png" alt="logo">
    </div>
    <div class="text-center">
      <hr>
      Made with &hearts; by Team 5;

    </div>
  </footer>
</template>

<style lang="scss" scoped>


@import "../scss/variables";
@import "../scss/mixins";

    footer {
        padding-bottom: 20px;
        background-color: $primary;
      .footer{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li{
          padding: 5px 0;
        }

        img{
          width: 250px;
        }
        
        a{
          color: $text;
        }
      }
    }
</style>