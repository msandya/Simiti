<template>
	<div>
		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li>
							<a href="#" id="un" class="dropdown-toggle" data-toggle="dropdown">Fichier
								<b class="caret"></b>
							</a>
	
							<ul class="dropdown-menu">
								<li>
									<a href="#">Nouveau</a>
								</li>
								<li>
									<a href="#">Sauvegarder</a>
								</li>
								<li>
									<a href="#">Charger</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="#" id="deux" class="dropdown-toggle" data-toggle="dropdown">Mode
								<b class="caret"></b>
							</a>
	
							<ul class="dropdown-menu">
								<li>
									<a href="#">Conception</a>
								</li>
								<li>
									<a href="#" id="Ethernet" onclick="alert('ton message alerte!')">Ethernet</a>
								</li>
								<li>
									<a href="#">IP</a>
								</li>
								<li>
									<a href="#">Transport</a>
								</li>
							</ul>
						</li>
						<li class="">
							<a href="#" onclick="document.getElementById('config').style.display = 'block'">Parametrage</a>
						</li>
						<li class="">
							<span style="color:#A4A4A4">Type de trame :</span>
							<br />
							<select v-model="trame" v-on:change="set_trame_type(trame)">
								<option value="0">Pas a pas</option>
								<option value="1">Automatique</option>
								<option value="2">Manuelle</option>
								<option value="3">Trame reelle</option>
							</select>
						</li>
	
						<ul class="nav navbar-nav navbar-right hidden-xs">
							<a type="button" class="navbar-btn btn btn-gradient-blue" onclick="document.getElementById('noeud').style.display = 'block'" data-toggle="modal" data-target="#Modal" am-latosans="bold" href="#noeud">Tracer des noeuds</a>
						</ul>
	
						<li class="">
							<a href="#" onclick="document.getElementById('aide').style.display = 'block'">Aide</a>
						</li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>
	
		<div>
			<div>
				<button v-on:click="clicked_button(1)" class='button-elements' id="btn1">
					<img style="width:100px;height:50px" src="../img/mousepointerbutton.png">
				</button>
				<button v-on:click="clicked_button(2)" class='button-elements' id="btn2">
					<img style="width:100px;height:50px;" src="../img/cablebutton.png">
				</button>
				<button v-on:click="clicked_button(3)" class='button-elements' id="btn3">
					<img style="width:100px;height:50px;" src="../img/postbutton.png">
				</button>
				<button v-on:click="clicked_button(4)" class='button-elements' id="btn4">
					<img style="width:100px;height:50px;" src="../img/switchbutton.png">
				</button>
				<button v-on:click="clicked_button(5)" class='button-elements' id="btn5">
					<img style="width:100px;height:50px;" src="../img/hubbutton.png">
				</button>
			</div>
			<div class="legend">
				<img src="../img/sample_black.png"></img> Paires torsadées droites
				<br>
				<img src="../img/sample_red.png"></img> Paires torsadées croisées
				<br>
				<img src="../img/sample_green.png"></img> Cable coaxial
			</div>
		</div>
	
		<div id="canvas_container" class="canvas_container" tabindex="-1" @mousedown="mousedown" @mousemove="move" @keyup.17="contrl(false)" @keydown.17="contrl(true)" @keyup.46="suppr" @keyup.enter="enter" @keyup.space="space" @keyup.65="press_a" @keyup.67="press_c">
			<canvas id="c" width="1300" height="600" style="border:1px solid #ccc">
				Canvas is not implemented in this navigator
			</canvas>
		</div>
	
		<form>
			<input type="text" v-model="projectN" size="10">
	
			<!--<a href="#" @click="RegisterP()" class="">Enregistrer le Project</a>-->
			<button type="button" @click="saveProject()" class="btn btn-lg btn-block btn-danger">Save</button>
			<button type="button" @click="loadProject()" class="btn btn-lg btn-block btn-danger">Load</button>
		</form>
	
		<div id="config" class="config">
			<input type="button" onclick="document.getElementById('config').style.display = 'none'" value="X" style="position: relative; float: right;" />
			<input type="text" id="mavar" style="position: relative; right: -45%; top: 45%; " />
			<input type="button" onclick="document.getElementById('config').style.display = 'none'; text = document.getElementById('mavar').value;" value="Valider" style="position: relative; right: -36%; top: 95%;" />
		</div>
	
		<div id="aide" class="aide">
			<input type="button" onclick="document.getElementById('aide').style.display = 'none'" value="X" style="position: relative; float: right;" />
			<h1 class="text_aide"> AIDE SIMITI </h1>
			<input type="button" onclick="document.getElementById('aide').style.display = 'none'; text = document.getElementById('mavar').value;" value="Valider" style="position: relative; top: 80%;" />
		</div>
	
		<div id="ipconfig" class="ipconfig">
			<input type="button" onclick="document.getElementById('ipconfig').style.display = 'none'" value="X" style="position: relative; float: right;" />
			<input type="text" id="mavar2" style="position: relative; right: -25%; top: 30%; " />
			<input type="text" id="mavar3" style="position: relative; right: -25%; top: 40%; " />
			<input type="button" onclick="document.getElementById('ipconfig').style.display = 'none';" value="Valider" id="saveip" style="position: relative; right: 5%; top: 65%;" />
		</div>
	
		<div id="noeud" class="noeud">
			<h1> Choisissez les stations </h1>
			<h4 id="message"></h4>
			<input type="button" onclick="document.getElementById('noeud').style.display = 'none'; text = document.getElementById('mavar').value;" value="Valider" style="position: relative; right: -36%; top: 70%;" />
		</div>
	</div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

import Vue from 'vue'
import jquery from 'jQuery'
//import {fabric} from 'fabric'
import api from '../services/simulateur.js'
import save from '../services/save.js'
import load from '../services/load.js'
import AuthService from '../services/AuthService'
import UserApiService from '../services/UserApiService'
import ProjectApiService from '../services/ProjectApiService'

export default {
	data() {
		return {
			userInfo: {},
			projectN: '',
			model: {},
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

	methods: {
		clicked_button: function (buttonNum) {
			api.button_pressed(buttonNum);
		},

		mousedown: function (e) {
			var rect = c.getBoundingClientRect();
			api.mousedown(e.pageX - (rect.left - rect.left % 1), e.pageY - (rect.top - rect.top % 1));
		},

		move: function (e) {
			var rect = c.getBoundingClientRect();
			api.move(e.pageX - (rect.left - rect.left % 1), e.pageY - (rect.top - rect.top % 1));
		},

		enter: function () {
			api.enter();
		},

		suppr: function () {
			api.suppr();
		},

		contrl: function (bool) {
			api.contrl(bool);
		},

		press_c: function () {
			api.press_c();
		},

		press_a: function () {
			api.press_a();
		},

		space: function () {
			api.space();
		},

		set_trame_type: function (nb) {
			api.set_trame_type(nb);
		},

		async saveProject() {
			this.model.name = this.projectN;
			this.model.userId = this.userInfo.userId;
			this.model.project = save.save(api.get_save_workstation(), api.get_save_cables());
			await ProjectApiService.createProjectAsync(this.model);
		},

		async loadProject() {
			this.model.name = this.projectN;
			this.model.userId = this.userInfo.userId;

			var saved_data = await ProjectApiService.getProjectAsync(this.projectN, this.userInfo.userId);
			console.log(saved_data.project);
			load.load(saved_data.project);
		}
	}
}

</script>
<style lang="less">
.canvas_container {
	margin-top: 20px;
	margin-left: -100px;
	background-color: white;
	width: 1300px;
	height: 600px;
}

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
	border-style: solid;
	border-width: 1px;
	border-color: black;
	background-color: grey;
	text-align: center;
	padding: 3px;
}

.noeud {
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

.legend {
	position: absolute;
	left: 1000px;
	top: 70px;
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

#button-elements {
	display: inline-block;
	height: 50px;
	width: 100px;
	padding: 0;
	margin: 0;
	vertical-align: top;
}

#close-image img {
	display: block;
	height: 50px;
	width: 100px;
}

.ui-group-buttons .or {
	position: relative;
	float: left;
	width: .3em;
	height: 1.3em;
	z-index: 3;
	font-size: 12px
}

.ui-group-buttons .or:before {
	position: absolute;
	top: 50%;
	left: 50%;
	content: 'or';
	background-color: #5a5a5a;
	margin-top: -.1em;
	margin-left: -.9em;
	width: 1.8em;
	height: 1.8em;
	line-height: 1.55;
	color: #fff;
	font-style: normal;
	font-weight: 400;
	text-align: center;
	border-radius: 500px;
	-webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	box-sizing: border-box
}

.ui-group-buttons .or:after {
	position: absolute;
	top: 0;
	left: 0;
	content: ' ';
	width: .3em;
	height: 2.84em;
	background-color: rgba(0, 0, 0, 0);
	border-top: .6em solid #5a5a5a;
	border-bottom: .6em solid #5a5a5a
}

.ui-group-buttons .or.or-lg {
	height: 1.3em;
	font-size: 16px
}

.ui-group-buttons .or.or-lg:after {
	height: 2.85em
}

.ui-group-buttons .or.or-sm {
	height: 1em
}

.ui-group-buttons .or.or-sm:after {
	height: 2.5em
}

.ui-group-buttons .or.or-xs {
	height: .25em
}

.ui-group-buttons .or.or-xs:after {
	height: 1.84em;
	z-index: -1000
}

.ui-group-buttons {
	display: inline-block;
	vertical-align: middle
}

.ui-group-buttons:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden
}

.ui-group-buttons .btn {
	float: left;
	border-radius: 0
}

.ui-group-buttons .btn:first-child {
	margin-left: 0;
	border-top-left-radius: .25em;
	border-bottom-left-radius: .25em;
	padding-right: 15px
}

.ui-group-buttons .btn:last-child {
	border-top-right-radius: .25em;
	border-bottom-right-radius: .25em;
	padding-left: 15px
}
</style>