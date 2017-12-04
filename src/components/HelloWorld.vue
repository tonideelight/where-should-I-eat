<template>
<div>
    <form v-on:submit.prevent="findAddress">
      <p>Find coordinates for this address:<input type="text" v-model="address"><button type="submit">Search</button></p>
    </form>
    <li v-for="item in results" class="item">
        <p>Latitude: {{ item.geometry.location.lat }} Longitude: {{ item.geometry.location.lng }}</p>
    </li>
      <router-link :to="{ name: 'Weekly', params: { lat: this.lat, lng: this.lng }}">Click here to see satellite view</router-link>
</div>    
</template>
<script>
import axios from 'axios';

export default {
  name: 'LatLong',
  data () {
    return {
      results: null,
      errors: [],
      address: '',
      lat: '',
      lng: ''
    }
  },
  methods: {
    findAddress: function(){
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: this.address,
          key: 'AIzaSyBRuRh3DR7TV4iKuVpot-dBPqNoOW7iQto'
        }
      })
      .then(response => {
        this.results = response.data.results;
        this.lat = this.results[0].geometry.location.lat;
        this.lng = this.results[0].geometry.location.lng;
      })
      .catch(error => {
        this.errors.push(error);
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
