<template>
  <div id="fond">
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
          <!--router-link class="navbar-brand" to="/Quisommesnous">Qui sommes-nous ?</router-link-->
        </div>
        <ul class="nav navbar-nav navbar-right" v-if="!auth.isConnected">
			<li><a href="#" @click="login()">Connexion</a></li>
			<li><a href="#" @click="register()">Inscription</a></li>
			</ul>
        <ul class="nav navbar-nav navbar-center">
			<li class=""><a href="#" v-if="!auth.isConnected" v-on:click="reset()">Nouveau</a></li>
			<li>
				<a href="#" id="un" v-if="auth.isConnected"class="dropdown-toggle" data-toggle="dropdown">Fichier <b class="caret"></b></a>

				<ul class="dropdown-menu">
					<li><a href="#" v-on:click="reset()">Nouveau</a></li>
					<li><a href="#" onclick="document.getElementById('save').style.display = 'block'">Sauvegarder</a></li>
					<li><a href="#" onclick="document.getElementById('load').style.display = 'block'" v-on:click="set_list()">Charger</a></li>
				</ul>
			</li>
			<li class=""><a href="#" onclick="document.getElementById('config').style.display = 'block'">Parametrage</a></li>
			<li class=""><a style="color:#A4A4A4">Type de trame :</a></li>
			<li class=""><a style="margin-left:-25px">
				<select v-model="trame" v-on:change="set_trame_type(trame)">
					<option style="color: black" value="0">Pas à pas</option>
					<option style="color: black" value="3">Trame reelle</option>
				</select></a>
			</li>
			<ul class="nav navbar-nav navbar-right hidden-xs">
				<a style="margin-left: 10px" type="button" class="navbar-btn btn btn-gradient-blue" onclick="document.getElementById('noeud').style.display = 'block'"
					data-toggle="modal" data-target="#Modal" am-latosans="bold" href="#noeud">Tracer des noeuds</a>
			</ul> 
          
          <!--li class=""><a href="#" onclick="document.getElementById('aide').style.display = 'block'">Aide</a></li-->
          </ul>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="iti-navbar-collapse" v-if="auth.isConnected">

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
                    <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="`users/information`">Profil</router-link>
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
import Vue from 'vue'
import $ from 'jquery'
import UserApiService from '../services/UserApiService'
import ProjectApiService from '../services/ProjectApiService'
import api from '../services/Simulateur.js'
import struct from '../services/struct.js'
import { mapGetters, mapActions } from 'vuex'
import '../directives/requiredProviders'

export default {
  data() {
    return {
      userEmail: null,
      endpoint:null,
      userInfo: {},
      trame: '',
      list:[]
    }
  },

  computed: {
    ...mapGetters(['isLoading']),
    auth: () => AuthService
  },

  async mounted() {
    this.userEmail = AuthService.emailUser();
    console.log(this.userEmail);
    AuthService.registerAuthenticatedCallback(() => this.onAuthenticated());
    this.userInfo = await UserApiService.getUserAsync(this.userEmail);
    this.list = await ProjectApiService.getAllProjectByUserIdAsync(this.userInfo.userId);
  },

 beforeDestroy() {
   AuthService.removeAuthenticatedCallback(() => this.onAuthenticated());
  },
  methods: {
    login() {
        AuthService.login();
    },

    register(){
        AuthService.register();
    },

    onAuthenticated() {
        this.$router.replace('/');
    },

    set_list: function() {
 	    api.displayArrayProject(this.list);
 	},

    set_trame_type: function (nb) {
 	    api.set_trame_type(nb);
 	},

    reset: function (){
        struct.reset();
    },

    save() {
      AuthService.save();
    }
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