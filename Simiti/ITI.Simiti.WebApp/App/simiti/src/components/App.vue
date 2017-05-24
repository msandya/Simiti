<template>
<div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
          <div class="navbar-header">
              <router-link class="navbar-brand" to="/">Simiti Project</router-link>
          </div>
      </div>
    </nav>
    <div class="container">
      <router-view class="child"></router-view>
    </div>
</div>
</template>

<script>

import AuthService from '../services/AuthService'
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