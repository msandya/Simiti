<template>
    <h1>Inscription</h1>
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
        }

    }

</script>