<script>


export default {
    name: 'SponsorTemporaneo',

    data() {
        return {
            
        }
    },

    props: {
        house: Object,
    },

  
}
</script>

<template>
  <div id="sponsor_container">
    <div class="my_card_container">
  
      <div class="my_card">
          
          <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
      
  
      </div>
      <div class="d-flex flex-column py-3">
        <div>
          <strong>{{house.title}}</strong>
        </div>
        <div>
          <em>{{ house.street}} , {{house.house_number}}</em> <br>
          <em class="text-uppercase">{{house.city}}</em>

        </div>

      </div>
      <div id="sponsored_btn">
        <router-link :to="{name:'show', params:{id: house.id}}" class="my_show_btn">
          <span>Info</span>
          
        </router-link>
  
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">


@import "../scss/variables";
@import "../scss/mixins";

#sponsor_container{
  
.my_card_container{
  position: relative;

  #sponsored_btn{
      .my_show_btn{
        display: none;
        cursor: pointer;
        font-weight: 700;
        letter-spacing: 3px;
        padding: 10px 20px;
        background: $accent;
        color: white;

        @include border();

        position: absolute;
        top: 40%;
        right: 50%;

        transform: translate(50%, -100%);
        
    }
  }


  
}

  .my_card_container:hover {

    img{

      filter:opacity(0.8) ;
    }

    #sponsored_btn{
      .my_show_btn{
        display: block;

      }
    }
  }

}



</style>