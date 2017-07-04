<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#iti-navbar-collapse" aria-expanded="false">
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">
            <img src="../img/LogoPI.png" style="width:50px"></img>
          </router-link>
          <router-link class="navbar-brand" to="/Quisommesnous">Qui sommes-nous ?</router-link>
          <router-link class="navbar-brand" to="/simulateur">Simi</router-link>
        </div>
  
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="iti-navbar-collapse" v-if="auth.isConnected">
          <ul class="nav navbar-nav">
            <li>
              <router-link :to="`users/information`">Profile</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ auth.email }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/logout">Se déconnecter</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
  
      <div class="progress" v-show="isLoading">
        <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%"></div>
      </div>
    </nav>
  
    <div class="container">
      <router-view class="child"></router-view>
    </div>
  
  </div>
</template>

<script>

import AuthService from '../services/AuthService'
import UserApiService from '../services/AuthService'
import { mapGetters, mapActions } from 'vuex'
import '../directives/requiredProviders'

export default {
  data() {
    return {
      userEmail: null
    }
  },

  computed: {
    ...mapGetters(['isLoading']),
    auth: () => AuthService
  },

  async mounted() {
    this.userEmail = AuthService.emailUser();
    console.log(this.userEmail);
  }
}
</script>

<style lang="less" scoped>
.progress {
  margin: 0px;
  padding: 0px;
  height: 5px;
}

a.router-link-active {
  font-weight: bold;
}
</style>

<style lang="less">
@import "../styles/global.less";
</style>