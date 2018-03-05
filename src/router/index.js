import Vue from 'vue'
import Router from 'vue-router'
import Restaurants from '@/components/Restaurants'
import CubeSpinner from '@/components/CubeSpinner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Restaurants',
      component: Restaurants
    }
  ]
})
