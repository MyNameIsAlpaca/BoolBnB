<script>
export default {
    name: 'HouseCard',

    data() {
        return {
            
        }
    },

    props: {
        house: Object,
    },

    computed: {

        shortContent() {
            if (this.house.description.length > 30) {
                return this.house.description.substring(0, 30) + '...';
            } else {
                return this.house.description;
            }
        },

    }
}
</script>

<template>
  <div class="my_card">
    <p><span>  
      <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
    </span></p>
    <p><span>
      <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
    </span></p>
    <p><span>
      <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
    </span></p>
  </div>
  <div class="d-flex flex-column py-2">
    <strong>{{house.title}}</strong>
    <em>{{ house.street}} , {{house.house_number}} - {{house.city}}</em>
  </div>
  <router-link :to="{name:'show', params:{id: house.id}}" class="btn btn-primary">Dettaglio</router-link>
</template>

<style scoped>

/* @use "../scss/variables" as *; */
.my_card {
  width: 300px;
  height: 300px;
  display: flex;
  padding-bottom: 3px;
}

.my_card p {
  height: 100%;
  flex: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  transition: all .5s;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my_card p:hover {
  flex: 4;
}

.my_card p span {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 300px;
  transform: rotate(0);
  transition: all .5s;
}

.my_card p:hover span {
  transform: rotate(0);
}

.my_card img{
  height: 100%;
  object-fit: cover;
}

</style>