<template>
	<div>

		<div class="legend">
			<img src="../img/sample_black.png" /> Paires torsadées droites<br />
			<img src="../img/sample_red.png" /> Paires torsadées croisées<br />
			<img src="../img/sample_green.png" /> Cable coaxial
		</div>
        <canvas id="c" width="1500" height="650" style="">
        	Canvas is not implemented in this navagator
        </canvas>
		<form>
				<input type="text" v-model="this.projectN" name="project" size="10">
				
		<!--<a href="#" @click="RegisterP()" class="">Enregistrer le Project</a>-->
		<button type="button" @click="onSubmit()" class="btn btn-lg btn-block btn-danger">Sauvegarder</button>

		</form>

	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Vue from 'vue'
import jquery from 'jQuery'
//import {fabric} from 'fabric'
import api from '../services/simulateur.js'
import AuthService from '../services/AuthService'
import UserApiService from '../services/UserApiService'
import ProjectApiService from '../services/ProjectApiService'

export default {
	data(){
		return{
			userInfo: {},
			projectN: '',
			model:{
				nameProject: '',
				project: '',
				userId: ''
			}
		}
	},

	computed: {
    ...mapGetters(['isLoading']),
    auth: () => AuthService
    },
 
	async mounted() {
		api.init();
		var userEmail = AuthService.emailUser();
        this.userInfo = await UserApiService.getUserAsync(userEmail);
		
	},

	methods:{
		onClick: function(){
			alert('start');
		},

		async onSubmit() {
                var errors = [];
				this.model.nameProject = projectN;
				this.model.userId = this.userInfo.userId;
				this.model.project = 'datasaved';
				await ProjectApiService.createProjectAsync(this.model);

                /*if (!this.model.nameProject)errors.push("Project")
                this.errors = errors;

                if (errors.length == 0) {
                    try {
                            await ProjectApiService.createProjectAsync(this.model);
                        }
                    catch (error) {
                        
                        this.notifyError(error);
                        
                        // Custom error management here.
                        // In our application, errors throwed when executing a request are managed globally via the "executeAsyncRequest" action: errors are added to the 'app.errors' state.
                        // A custom component should react to this state when a new error is added, and make an action, like showing an alert message, or something else.
                        // By the way, you can handle errors manually for each component if you need it...
                    }
                }*/
            }
	}	
}	

</script>
<style lang="less">
		.menu {
			position: absolute;
		}

		.aide {
			display: none;
			position: absolute;
			left: 100px;
			top: 100px;
			height: 500px;
			width: 1200px;
			border-style: solid;
			border-width: 1px;
			border-color: black;
			background-color: white;

			text-align: center;
		}

		.text_aide {
			position: relative;
			margin-left: auto;
		}

		.config {
			display: none;
			position: absolute;
			left: 100px;
			top: 100px;
			height: 500px;
			width: 1200px;
			border-style: solid;
			border-width: 1px;
			border-color: black;
			background-color: white;
		}
		.ipconfig {
			display: none;
			position: absolute;
			left: 200px;
			top: 200px;
			height: 150px;
			width: 360px;
			border-style: solid;
			border-width: 1px;
			border-color: black;
			background-color: white;
		}

		.options {
 				position: absolute;
 				background-color: white;
 			}

        .noeud {
			display: none;
			position: absolute;
			left: 50px;
			top: 50px;
			height: 500px;
			width: 1200px;
			border-style: solid;
			border-width: 1px;
			border-color: black;
			background-color: white;
		}
		
		.legend {
			position: absolute;
			left: 1100px;
			top: 110px;
		}

		.navbar-template {
			padding: 40px 15px;
		}

		.modal-header-success {
			color: #fff;
			padding: 9px 15px;
			border-bottom: 1px solid #eee;
			background-color: #5cb85c;
			-webkit-border-top-left-radius: 5px;
			-webkit-border-top-right-radius: 5px;
			-moz-border-radius-topleft: 5px;
			-moz-border-radius-topright: 5px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}

		.btn.btn-gradient-blue {
			background-color: #0c5497 !important;
			background-image: -webkit-linear-gradient(top, #127bde 0%, #072d50 100%);
			background-image: -o-linear-gradient(top, #127bde 0%, #072d50 100%);
			background-image: linear-gradient(to bottom, #127bde 0%, #072d50 100%);
			background-repeat: repeat-x;
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff127bde', endColorstr='#ff072d50', GradientType=0);
			border-color: #072d50 #072d50 #0c5497;
			color: #fff !important;
			text-shadow: 0 -1px 0 rgba(31, 31, 31, 0.29);
			-webkit-font-smoothing: antialiased;  
		}


        .ui-group-buttons .or{position:relative;float:left;width:.3em;height:1.3em;z-index:3;font-size:12px}
        .ui-group-buttons .or:before{position:absolute;top:50%;left:50%;content:'or';background-color:#5a5a5a;margin-top:-.1em;margin-left:-.9em;width:1.8em;height:1.8em;line-height:1.55;color:#fff;font-style:normal;font-weight:400;text-align:center;border-radius:500px;-webkit-box-shadow:0 0 0 1px rgba(0,0,0,0.1);box-shadow:0 0 0 1px rgba(0,0,0,0.1);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}
        .ui-group-buttons .or:after{position:absolute;top:0;left:0;content:' ';width:.3em;height:2.84em;background-color:rgba(0,0,0,0);border-top:.6em solid #5a5a5a;border-bottom:.6em solid #5a5a5a}
        .ui-group-buttons .or.or-lg{height:1.3em;font-size:16px}
        .ui-group-buttons .or.or-lg:after{height:2.85em}
        .ui-group-buttons .or.or-sm{height:1em}
        .ui-group-buttons .or.or-sm:after{height:2.5em}
        .ui-group-buttons .or.or-xs{height:.25em}
        .ui-group-buttons .or.or-xs:after{height:1.84em;z-index:-1000}
        .ui-group-buttons{display:inline-block;vertical-align:middle}
        .ui-group-buttons:after{content:".";display:block;height:0;clear:both;visibility:hidden}
        .ui-group-buttons .btn{float:left;border-radius:0}
        .ui-group-buttons .btn:first-child{margin-left:0;border-top-left-radius:.25em;border-bottom-left-radius:.25em;padding-right:15px}
        .ui-group-buttons .btn:last-child{border-top-right-radius:.25em;border-bottom-right-radius:.25em;padding-left:15px}
</style>