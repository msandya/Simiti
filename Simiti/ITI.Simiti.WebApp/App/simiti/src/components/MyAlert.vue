<template>
    <div :class="getClass" class="alert" role="alert" v-if="!isClosed">
        {{ message }}

        <button type="button" class="close" @click="close()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isClosed: false
            }
        },

        props: {
            message: {
                type: String
            },

            color: {
                type: String
            }
        },

        computed: {
            getClass() {
                if (this.color == 'red') return 'alert-danger';
                if (this.color == 'orange') return 'alert-warning';
                if (this.color == 'green') return 'alert-success';

                return 'alert-info';
            }
        },

        methods: {
            close() {
                this.isClosed = true;
            }
        }
    }
</script>
<style lang="less">

</style>