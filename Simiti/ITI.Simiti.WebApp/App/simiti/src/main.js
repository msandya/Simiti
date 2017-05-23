import 'babel-polyfill'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import Vue from 'vue'
import store from './vuex/store'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Home from './components/Home.vue'

import AuthService from './services/AuthService'

Vue.use(VueRouter)

/**
 * Filter for routes requiring an authenticated user
 * @param {*} to 
 * @param {*} from 
 * @param {*} next 
 */
function requireAuth (to, from, next)  {
  if (!AuthService.isConnected) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });

    return;
  }

  var requiredProviders = to.meta.requiredProviders;

  if(requiredProviders && !AuthService.isBoundToProvider(requiredProviders)) {
    next( false )
  };

  next();
}

/**
 * Declaration of the different routes of our application, and the corresponding components
 */
const router = new VueRouter({
  mode: 'history',
  base: '/Home',
  routes: [
    { path: '', component: Home },

  ]
})

/**
 * Configuration of the authentication service
 */

// Allowed urls to access the application (if your website is http://mywebsite.com, you have to add it)
AuthService.allowedOrigins = ['http://localhost:5000', /* 'http://mywebsite.com' */];

// Server-side endpoint to logout
AuthService.logoutEndpoint = '/Account/LogOff';

// Allowed providers to log in our application, and the corresponding server-side endpoints
AuthService.providers = {
  'Base': {
    endpoint: '/Account/Login'
  },
};

AuthService.appRedirect = () => router.replace('/');

// Creation of the root Vue of the application
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})