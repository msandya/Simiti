<template>
<h1>Profile</h1>

</template>

<script>
    import { mapActions } from 'vuex'
    import StudentApiService from '../../services/StudentApiService'

    export default {
        data() {
            return {
                item: {},
                mode: null,
                id: null,
                errors: []
            }
        },

        async mounted() {
            this.mode = this.$route.params.mode;
            this.id = this.$route.params.id;

            if (this.mode == 'edit') {
                try {
                    // Here, we use "executeAsyncRequest" action. When an exception is thrown, it is not catched: you have to catch it.
                    // It is useful when we have to know if an error occurred, in order to adapt the user experience.
                    //this.item = await this.executeAsyncRequest(() => StudentApiService.getStudentAsync(this.id));
                    this.notifyLoading(true);
                    this.item = await StudentApiService.getStudentAsync(this.id);
                }
                catch (error) {
                    // So if an exception occurred, we redirect the user to the students list.
                    this.notifyError(error);
                    this.$router.replace('/students');
                }
                finally {
                    // Three: in all cases, we reset the "loading" state to false.
                    this.notifyLoading(false);
                }
            }
        },

        methods: {
            ...mapActions(['notifyLoading', 'notifyError']),

            async onSubmit(e) {
                e.preventDefault();

                var errors = [];

                if (!this.item.lastName) errors.push("Nom")
                if (!this.item.firstName) errors.push("Prénom")
                if (!this.item.birthDate) errors.push("Date de naissance")

                this.errors = errors;

                if (errors.length == 0) {
                    try {
                        if (this.mode == 'create') {
                            await StudentApiService.createStudentAsync(this.item);
                        }
                        else {
                            await StudentApiService.updateStudentAsync(this.item);
                        }

                        this.$router.replace('/students');
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
        }
    }
</script>