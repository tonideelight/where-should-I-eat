import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Weekly from '@/components/Weekly'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Weekly/:lat/:lng',
      name: 'Weekly',
      component: Weekly
    }
  ]
})
