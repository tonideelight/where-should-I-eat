<template>
<div>
    <form v-on:submit.prevent="findAddress">
      <p>Find restaurants for this address:<input type="text" v-model="address"><button type="submit">Let's Eat!</button></p>
      <spinner v-if="showSpinner"></spinner>
    </form>
    <iframe width="50%" height="400" frameborder="0" style="border:0" v-if="embedURL" v-bind:src="embedURL"></iframe>
    
</div>    
</template>
<script>
import axios from 'axios';
import CubeSpinner from '@/components/CubeSpinner';

function getRandomValue(values) {
  const randomIndex = Math.floor(Math.random() * Math.floor(values.length));
  return values[randomIndex];
}
export default {
  name: 'LatLong',
  components: {
    spinner: CubeSpinner,
  },
  data () {
    return {
      results: null,
      errors: [],
      address: '',
      lat: '',
      lng: '',
      embedURL: '',
      showSpinner: false
    }
  },
  methods: {
    findAddress: function(){
      this.showSpinner = true;
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
        this.showSpinner = false;
        this.errors.push(error);
      });
    },
    findNearbyRestaurant: function() {
      axios.get('https://crossorigin.me/https://maps.googleapis.com/maps/api/place/radarsearch/json', {
        params: {
          key: 'AIzaSyCaENM1qL1ZLAuVH4zczvi-_G2LPaaMA_Q',
          location: `${this.lat},${this.lng}`,
          radius: 300,
          type: 'restaurant'
        }
      })
      .then(response => {
        const place_id = getRandomValue(response.data.results).place_id;
        this.embedURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDpfr0LbX7DxQNVzUsxAObNkeMQKC1SiFU&q=place_id:${place_id}&center=${this.lat},${this.lng}`;
        this.showSpinner = false;
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
