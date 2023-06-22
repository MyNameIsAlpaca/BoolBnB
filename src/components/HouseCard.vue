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
  <div class="card" style="width: 18rem;">
    <img :src="'http://127.0.0.1:8000/storage/' + house.thumbnail"  class="card-img-top" alt="Immagine di copertina">
    <div class="card-body">
      <h5 class="card-title">{{house.title}}</h5>
      <p class="card-text">{{house.description}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">N° stanze: {{house.rooms}}</li>
      <li class="list-group-item">N° bagni: {{house.bathrooms}}</li>
      <li class="list-group-item">m&sup2;: {{house.square_mt}}</li>
      <li class="list-group-item">Servizi:
        <div v-for="singleService in house.services" >
            <i :class="singleService.icon"></i> {{singleService.name}}
        </div>
      </li>
    </ul>

    <router-link :to="{name:'show', params:{id: house.id}}" class="btn btn-warning">Dettaglio</router-link>

    
    <!-- <div class="card-body d-flex gap-3 align-items-center">
      <div class="container d-flex align-items-center gap-2">
        <button class="btn btn-secondary"><a href="{{route('houses.show', $house)}}" class="link-light">Guarda la tua casa</a></button> 
      </div>
      <form action="{{ route('visibility.index', $house) }}" method="POST">
        @csrf
        <div class="form-check form-switch">
          <input name="visibility" class="form-check-input submitCheckbox" type="checkbox" role="switch" {{  $house->visibility ? "checked" : "" }}>
        </div>
      </form>
    </div> -->
  </div>
</template>