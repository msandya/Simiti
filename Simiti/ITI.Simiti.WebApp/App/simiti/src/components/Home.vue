<template>
    <div class="jumbotron">
        <h1>Welcome to SIMITI</h1>
        <p>
            <a class="btn btn-primary btn-lg" href="http://vuejs.org/v2/guide/" role="button">Guide Vue 2.0</a>
            <a class="btn btn-primary btn-lg" href="http://vuejs.org/v2/api/" role="button">Documentation API Vue 2.0</a>
        </p>
    </div>
</template>

<script>
    import MyAlert from './MyAlert.vue';

    export default {
        components: {
            MyAlert
        }
    }
</script>
<style lang="less">

</style>