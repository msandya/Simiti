<template>
    <div>
        <div class="page-header">
            <h1>Editer un user</h1>
        </div>

        <form @submit="onSubmit($event)">
            <div class="alert alert-danger" v-if="errors.length > 0">
                <b>Les champs suivants semblent invalides : </b>
                <ul>
                    <li v-for="e of errors">{{e}}</li>
                </ul>
            </div>
            <div class="form-group">
                <label>Mot de passe ancien: </label>
                <input type="text" v-model="mdpa" class="form-control">
            </div>
            <div class="form-group">
                <label>Nouveau mot de passe: </label>
                <input type="text" v-model="nmdp1" class="form-control">
            </div>
            <div class="form-group">
                <label>Modifier mot de passe: </label>
                <input type="text" v-model="nmdp2" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Sauvegarder</button>
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
            errors: [],
            model: {
                mdpa: '',
                nmdp1: '',
                nmdp2: ''
            },
        }
    },

    async mounted() {
        var userEmail = AuthService.emailUser();
        this.item = await UserApiService.getUserAsync(userEmail);
    },

    methods: {
            async onSubmit(e) {
                e.preventDefault();

                var errors = [];
                this.errors = errors;

                if (errors.length == 0) {
                    try {
                            this.$router.replace('/');
                        }
                    catch (error) {
                        
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
        },

    computed: {
    ...mapGetters(['isLoading']),
    auth: () => AuthService
    }
}
</script>