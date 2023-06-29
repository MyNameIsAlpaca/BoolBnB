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
    <div id="footer">
      <!-- sinistra -->
      <div class="links">
        <ul class="pt-4">
          <li><a href="#">Lavora con noi</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contatti</a></li>
          <li><a href="#">Termini&Servizi</a></li>
        </ul>
      </div>
      <!-- /sinistra -->
      <div class="footer-right">

        <img class="long_logo" src="public/logochiaro.png" alt="logo">
        <img class="short_logo" src="public/logo-bool.png" alt="logo">
      </div>
      <!-- destra -->
      <!-- /destra -->
    </div>
    <!-- <div class="text-center">
      <hr>
      Made with &hearts; by Team 5;

    </div> -->
  </footer>
</template>

<style lang="scss" scoped>


@import "../scss/variables";
@import "../scss/mixins";

    footer {
        height: 80px;
        background-color: $primary;
        
       

        #footer{
        // padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul{
          display: flex;
          gap: 20px;
        }

        .footer-right {
          padding-right: 20px;
          padding-top: 10px;
          .long_logo{
            width: 150px;
            display: none;
          }

          .short_logo{
            width: 60px;
            height: 60px;
            display: block;
          }
        }
        
        a{
          color: $text;
          letter-spacing: 1px;


          &:hover{
            text-decoration: underline;
          }
        }
      }
    }


    @media screen and (max-width: 576px) {
      
    footer{

      #footer{
        width: 100%;


        ul{
          display: flex;
          // justify-content: space-between;
          gap: 10px;

        }

        .footer-right {
          // display: none;
          .long_logo{
            display: none;
          }

          .short_logo{
            display: block;
          }
        }
      }
    }
  }
</style>