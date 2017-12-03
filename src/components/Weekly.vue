<template>
<div>
    <form v-on:submit.prevent="findURL">
      <p>Find view for these coordinates:<input type="text" v-model="lat"><input type="text" v-model="lng"><button type="submit">Search</button></p>
    </form>
    <iframe v-if="results" v-bind:src="results"></iframe>
    <router-link :to="{ path: '/' }">Go Back</router-link>
</div>    
</template>
<script>
import axios from 'axios';

export default {
  name: 'View',
  data () {
    return {
      results: null,
      errors: [],
      lat: '',
      lng: ''
    }
  },
  //show location on satellite
  methods: {
      findURL: function(){
         this.results = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCFhAKFuPVCI4QOnzIUm44Ng9LGEsxZjzM&center=${this.lat},${this.lng}&zoom=18&maptype=satellite`
      }
      
    },
    //lat and long are populated on this page
  created () {
      this.lat = this.$route.params.lat;
      this.lng = this.$route.params.lng;

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
