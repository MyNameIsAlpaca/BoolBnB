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

      <!-- destra -->
      <img class="long_logo" src="public/logochiaro.png" alt="logo">
      <img class="short_logo" src="public/logo-bool.png" alt="logo">
      <!-- /destra -->
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
        padding-bottom: 10px;
        background-color: $primary;

      #footer{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul{
          display: flex;
          gap: 20px;
        }


        .long_logo{
          width: 150px;
        }

        .short_logo{
          width: 80px;
          display: none;
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
          flex-direction: column;
          gap: 10px;

        }

        .long_logo{
          display: none;
        }

        .short_logo{
          display: block;
        }
      }
    }
  }
</style>