<template>
<div>
    <form v-on:submit.prevent="findAddress">
      <p>Find restuarants for this address:<input type="text" v-model="address"><button type="submit">Search</button></p>
    </form>
        <iframe v-if="embedURL" v-bind:src="embedURL"></iframe>
      <router-link :to="{ name: 'Weekly', params: { lat: this.lat, lng: this.lng }}">Click here to find restaurant</router-link>
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
      lng: '',
      embedURL: ''
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
        this.findNearbyRestaurant();
      })
      .catch(error => {
        this.errors.push(error);
      });
    },
    findNearbyRestaurant: function() {
      axios.get('https://maps.googleapis.com/maps/api/place/radarsearch/json', {
        params: {
          key: 'AIzaSyCaENM1qL1ZLAuVH4zczvi-_G2LPaaMA_Q',
          location: `${this.lat},${this.lng}`,
          radius: 5000,
          type: 'restaurant'
        }
      })
      .then(response => {
        const place_id = response.results[0]["place_id"];
        this.embedURL = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDpfr0LbX7DxQNVzUsxAObNkeMQKC1SiFU&origin=place_id:${place_id}`;
      })
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
