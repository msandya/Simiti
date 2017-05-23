<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#iti-navbar-collapse" aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
          <router-link class="navbar-brand" to="/">Simiti</router-link>
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

//import AuthService from '../services/AuthService'
import { mapGetters, mapActions } from 'vuex'
import '../directives/requiredProviders'

export default {
  computed: {
    ...mapGetters(['isLoading']),    
    auth: () => AuthService
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