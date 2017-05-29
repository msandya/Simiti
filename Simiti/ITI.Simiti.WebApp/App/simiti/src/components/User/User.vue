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
                <label>Pseudo: </label>
                <input type="text" v-model="item.pseudo" class="form-control">
            </div>
            <div class="form-group">
                <label>Email: </label>
                <input type="text" v-model="item.email" class="form-control">
            </div>
            <div class="form-group">
                <label>Password: </label>
                <input type="text" v-model="item.password" class="form-control">
            </div>
            <div class="form-group">
                <label>Confirm Password: </label>
                <input type="text" v-model="item.password" class="form-control">
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
                emailUser: null,
                errors: []
            }
        },
  
  async mounted() {
    await this.refreshList();
  },

  methods: {
            ...mapActions(['notifyLoading', 'notifyError']),

            async refreshList() {
                try {
                    this.notifyLoading(true);
                    this.emailUser = AuthService.emailUser();
                    this.item = await UserApiService.getUserAsync(emailUser);
                }
                catch (error) {
                    this.notifyError(error);
                }
                finally {
                    this.notifyLoading(false);
                }
            },

            async onSubmit(e) {
                e.preventDefault();

                var errors = [];

                if (!this.item.pseudo) errors.push("Pseudo")
                if (!this.item.email) errors.push("Email")
                this.errors = errors;

                if (errors.length == 0) {
                    try {
                            await UserApiService.updateUserAsync(this.item);
                        }
                    catch (error) {
                        this.notifyError(error);
                        this.$router.replace('/');
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