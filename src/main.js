import './firebase'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueFire from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEyeSlash, faEye, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faEyeSlash, faEye, faTrashAlt, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueFire)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
