<template>
<body>
 <div id="app"> 
<div class="container">
            <div class="col-sm-12">

                <div class="bs-calltoaction bs-calltoaction-default">
                    <div class="row">
                        <div class="col-md-9 cta-contents">
                            <h1 class="cta-title">Incrivez-vous!</h1>
                            <div class="cta-desc">
                                <p>Enregistrez votre projet</p>
                                <p>Partagez le !</p>
                                <p>Modifier le!</p>
                            </div>
                        </div>
                        <div class="col-md-3 cta-button">
                            <a href="#" @click="register()" class="btn btn-lg btn-block btn-default">S'inscrire</a>
                            <a href="#" @click="login()" class="btn btn-lg btn-block btn-success">Se connecter</a>

                        </div>
                     </div>
                </div>
                 <div class="jumbotron">
                 <h1>Application</h1>

                  </div>
            </div>
        </div>

  </div>
</body>
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


h2 {
    color: black;
}
  .progress {
    margin: 0px;
    padding: 0px;
    height: 5px;
  }

  a.router-link-active {
    font-weight: bold;
  }



  @import "../styles/global.less";
  .bs-calltoaction{
    position: relative;
    width:auto;
    padding: 15px 25px;
    border: 1px solid black;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

    .bs-calltoaction > .row{
        display:table;
        width: calc(100% + 30px);
    }
     
        .bs-calltoaction > .row > [class^="col-"],
        .bs-calltoaction > .row > [class*=" col-"]{
            float:none;
            display:table-cell;
            vertical-align:middle;
        }

            .cta-contents{
                padding-top: 10px;
                padding-bottom: 10px;
            }

                .cta-title{
                    margin: 0 auto 15px;
                    padding: 0;
                }

                .cta-desc{
                    padding: 0;
                }

                .cta-desc p:last-child{
                    margin-bottom: 0;
                }

            .cta-button{
                padding-top: 10px;
                padding-bottom: 10px;
            }

@media (max-width: 991px){
    .bs-calltoaction > .row{
        display:block;
        width: auto;
    }

        .bs-calltoaction > .row > [class^="col-"],
        .bs-calltoaction > .row > [class*=" col-"]{
            float:none;
            display:block;
            vertical-align:middle;
            position: relative;
        }

        .cta-contents{
            text-align: center;
        }
}



.bs-calltoaction.bs-calltoaction-default{
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.bs-calltoaction.bs-calltoaction-primary{
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}


.bs-calltoaction.bs-calltoaction-primary .cta-button .btn,
.bs-calltoaction.bs-calltoaction-info .cta-button .btn,
.bs-calltoaction.bs-calltoaction-success .cta-button .btn,
.bs-calltoaction.bs-calltoaction-warning .cta-button .btn,
.bs-calltoaction.bs-calltoaction-danger .cta-button .btn{
    border-color:#fff;
}

body {
    background-color: lightgrey;
}

</style>
