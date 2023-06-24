<script>
import axios from 'axios';

export default {
    name: 'AppShow',

    data() {
        return {
            successMessage: '',
             house: {},
             houseId: '',
             isLoading: true,
             houseFound: false,
             imgUrl: 'http://127.0.0.1:8000/',
             form: {
                email: '',
                name: '',
                text: '',
                read: 0,
                house_id: this.$route.params.id,
             }
        }
    },

    mounted() {

          this.houseId = this.$route.params.id;
          this.getHouse();
    },

    computed:{
         houseImg(){

            return this.imgUrl + 'storage/' + this.house.thumbnail
        }
    },

    methods: {
        submitForm(){
            console.log(this.form)
            axios.post('http://127.0.0.1:8000/api/messages', this.form).then(
                response => {
                    console.log(response);
                }
            ).catch(error => {
                console.log(error)
            }).finally(() => {
                this.successMessage = 'Messaggio inviato con successo!'
            });
        },
        getHouse() {
            axios.get('http://127.0.0.1:8000/api/houses/' + this.houseId).then(res => {
                if (res.data.success) {

                    this.house = res.data.house;
                    this.houseFound = true;
                    this.isLoading = false;
                } else {
                    this.houseFound = false;
                    this.isLoading = false;
                }
            })
        }
    }
}
</script>


<template>
    <div v-if="isLoading">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div class="container" v-if="houseFound">
            <div class="my-img-container-show">
                <img :src="houseImg" alt="img">
            </div>
            <h1>{{ house.title }}</h1>
            <p>{{ house.description }}</p>
            <hr>
            <span>N° stanze: {{ house.rooms}}</span><br>
            <span>N° posti letto: {{ house.beds}}</span><br>
            <span>N° bagni: {{ house.bathrooms }}</span><br>
            <span>Indirizzo: {{ house.street}} , {{house.house_number}} - {{house.city}}</span>
            <br>
            <span>Servizi: </span>
            <span v-for="service in house.services">
               <i :class="service.icon"></i> - {{ service.name }} <br>
            </span>
            <div class="message container w-50">
                <form class="d-flex flex-column gap-2" v-on:submit.prevent="submitForm" v-if="this.successMessage == ''">
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Aggiungi un email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="nome@mail.com" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Aggiungi un Nome</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Aggiungi un nome" v-model="form.name">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Aggiungi un Messaggio</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.text"></textarea>
                    </div>
                    <button type="submit" class="btn btn-secondary d-flex align-self-center">Invia</button>
                </form>
                <h2 v-else class="text-center alert alert-success">{{ this.successMessage }}</h2>
            </div>
            
        </div>
        <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                    <path
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
            </svg>
            <div class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Warning:">
                    <use xlink:href="#exclamation-triangle-fill" />
                </svg>
                <div>
                    File not found !!!
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>