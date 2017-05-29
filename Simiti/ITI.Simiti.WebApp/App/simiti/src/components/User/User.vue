<template>

<div class="container">

  <div id="1" class="off">
    <div id="snoAlertBox" class="alert alert-success" data-alert="alert">
        <strong>Succès ! </strong> {{ message }}</div>
  </div>  


<h2 class="page-header">Modifier son Compte</h2>
  <div class="row">
    <form @submit="onSubmitPasse($event)" class="form-horizontal" role="form">    
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input class="form-control" v-model="model.mail" type="email"required>
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label">Mot de passe:</label>
          <div class="col-md-8">
            <input class="form-control" v-model="newPass" type="password">
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-3 control-label"> Confirmation du mot de passe:</label>
          <div class="col-md-8">
            <input class="form-control" v-model="confirmNewPass" type="password">
          </div>
        </div>
        </form>
  </div>
  </div>

</template>

export default {
  computed: {
  }
}
</script>