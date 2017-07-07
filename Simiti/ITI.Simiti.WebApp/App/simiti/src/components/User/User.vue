<template>
    <div>
        <div class="page-header">
            <h2>Editer un user</h2>
        </div>

        <form>
            <div class="alert alert-danger" v-if="errors.length > 0">
                <b>Les champs suivants semblent invalides : </b>
                <ul>
                    <li v-for="e of errors">{{e}}</li>
                </ul>
            </div>
            <div class="form-group">
                <label>Pseudo: </label>
                <input type="text" v-model="item.pseudo" class="form-control">
            </div>
            <div class="form-group">
                <label>Email: </label>
                <input type="text" v-model="item.email" class="form-control">
            </div>
            <button type="button" @click="modifyPassword()" class="btn btn-primary">Modifier mot de passe</button>
            <button type="button" @click="onSubmit()" class="btn btn-primary">Sauvegarder</button>
        </form>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import UserApiService from '../../services/UserApiService'
import AuthService from '../../services/AuthService'

export default {
    data() {
        return {
            item: {},
            errors: []
        }
    },

    computed: {
    ...mapGetters(['isLoading']),
    auth: () => AuthService
    },
  
    async mounted() {
        var userEmail = AuthService.emailUser();
        this.item = await UserApiService.getUserAsync(userEmail);
    },

    methods: {
            ...mapActions(['notifyLoading', 'notifyError']),

            async refreshList() {
                try {
                    this.notifyLoading(true);
                }
                catch (error) {
                    this.notifyError(error);
                }
                finally {
                    this.notifyLoading(false);
                }
            },

            modifyPassword(){
                AuthService.modifyPassword();
            },

            async onSubmit() {

                var errors = [];

                if (!this.item.pseudo) errors.push("Pseudo")
                if (!this.item.email) errors.push("Email")
                this.errors = errors;

                if (errors.length == 0) {
                    try {
                            await UserApiService.updateUserAsync(this.item);
                            AuthService.onSignedOut();
                            AuthService.logout();
                            this.$router.replace('/');
                        }
                    catch (error){
                        
                        this.notifyError(error);
                        
                        // Custom error management here.
                        // In our application, errors throwed when executing a request are managed globally via the "executeAsyncRequest" action: errors are added to the 'app.errors' state.
                        // A custom component should react to this state when a new error is added, and make an action, like showing an alert message, or something else.
                        // By the way, you can handle errors manually for each component if you need it...
                    }
                    finally {
                        this.notifyLoading(false);
                    }
                }
            }
        }
}
</script>
<style lang="less">
h2 {
    color: black;
}
</style>