<template>
    <div>
        <div class="text-center">
            <div class="page-header">
                <h1>Bienvenue sur Simiti</h1>
            </div>
            <button type="button" @click="login()" class="btn btn-lg btn-block btn-default">Se connecter via Simiti</button>
            <button type="button" @click="register()" class="btn btn-lg btn-block btn-default">S'inscrire sur Simiti</button>
        </div>
    </div>
</template>

<script>
    import AuthService from '../services/AuthService'
    import Vue from 'vue'
    import $ from 'jquery'

    export default {
        data() {
            return {
                endpoint: null
            }
        },

        mounted() {
            AuthService.registerAuthenticatedCallback(() => this.onAuthenticated());
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
            }
        }
    }
</script>

<style lang="less">
    iframe {
        width: 100%;
        height: 600px;
    }
</style>