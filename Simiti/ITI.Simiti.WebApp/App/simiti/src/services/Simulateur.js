import {
	fabric
} from 'fabric'
import simu from '../services/VariaG.js';
import helper from '../services/helper.js';
import simulation from '../services/simulation.js';
import struct from '../services/struct.js';
import load from '../services/load.js';
import save from '../services/save.js';
import simi from '../components/simulateur.vue';


export default {
	init() {
		this.canvas = new fabric.Canvas('c', {
			selection: false,
		});
		simu.canvas = this.canvas;

		simu.ctrl = {
			'selected': null,
			'pressed': false
		};
	},
	displayArrayProject(listProject) {
 		var len = listProject.length;
		 console.log(len);
 		var text = '<span style="color:#A4A4A4">PROJETS :</span><br>';
 		text += '<select v-model="projectN">';
 		for (var i = 0; i < len; i++) {
 			var myObject = listProject[i];
 
 			text += '<option value="' + myObject.name + '">' + myObject.name + '</option>';
 		}
 		text += '</select>';
 		document.getElementById("listProject").innerHTML = text;
 	},

	get_save_data() {
		return simu.save_data;
	},

	get_save_workstation(){
		return simu.tab_workstation;
	},

	get_save_cables(){
		return simu.tab_cable;
	},

	suppr() // 46 = suppr
	{
		var s = null;
		if (this.canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < simu.tab_workstation.length; i++) {
				if (this.canvas.getActiveObject() == simu.tab_workstation[i].obj)
					s = simu.tab_workstation[i];
			}
			struct.delete_workStation(s);
		}

		for (var i = 0; i < simu.tab_cable.length; i++) {
			if (simu.tab_cable[i].object_1 != null && simu.tab_cable[i].object_2 != null) {
				if (this.canvas.getActiveObject() == simu.tab_cable[i].object_1.obj || this.canvas.getActiveObject() == simu.tab_cable[i].object_2.obj) {
					struct.delete_cable(simu.tab_cable[i]);
				}
			}
		}

		var activeObject = this.canvas.getActiveObject(),
			activeGroup = this.canvas.getActiveGroup();
		if (activeObject) {
			this.canvas.remove(activeObject);
		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			this.canvas.discardActiveGroup();
			objectsInGroup.forEach(function (object) {
				this.canvas.remove(object);
			});
		}
		this.canvas.renderAll();
	},

	space()  // 32 = space
	{
		//alert('space pressed');
	},

	press_c() // 67 = c 
	{
	},
	
	press_a() // 65 = a
	{
		struct.get_create_port(simu.tab_workstation[0].ports.length, simu.tab_workstation[0], simu.tab_workstation[0].obj.left + 4 + simu.tab_workstation[0].ports.length * (simu.PORT_SIZE + 3));
		if (simu.tab_workstation[0].ports.length > 3) {
			var aux = simu.tab_workstation[0].obj.getObjects();
			aux[0].set({
				width: 50 + (simu.tab_workstation[0].ports.length - 3) * (simu.PORT_SIZE + 3)
			});
			aux[0].set({
				strokeWidth: 2
			});
			aux[0].set({
				strokeWidth: 1
			});
		}
	},
	
	enter()
	{
		var s = null;
		if (this.canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < simu.tab_workstation.length; i++) {
				if (this.canvas.getActiveObject() == simu.tab_workstation[i].obj)
					s = simu.tab_workstation[i];
			}
		} else
			s = simu.tab_workstation[0];

		if (s.type == 'post')
		{
			var options = document.createElement("div");
			options.className = "options";
			options.style = "left: " + (s.obj.left + 40) + "px; top: " + (s.obj.top + 70) + "px; ";
			document.body.appendChild(options);

			var broad = document.createElement("button");
			broad.className = "btn btn-primary btn-xs";
			broad.style = "margin-right: 5px";
			broad.innerHTML = "Broadcast";
			broad.addEventListener("click", broadcast);
			options.appendChild(broad);

			var uni = document.createElement("button");
			uni.className = "btn btn-primary btn-xs";
			uni.innerHTML = "Unicast";
			uni.addEventListener("click", unicast);
			options.appendChild(uni);

			if (simu.trame_type == 3) {
				var br = document.createElement("br");
				options.appendChild(br);
				var input = document.createElement("input");
				input.type = "text";
				input.placeholder = "Taille de la trame";
				input.id = "trameSize";
				options.appendChild(input);
			}
		
			function broadcast() {
				var tram_size = null;
				if (simu.trame_type == 3)
				{
					var imput = document.getElementById("trameSize").value;
					if (imput != null && imput != '' && !isNaN(Number(imput)) && imput > 63) {
						tram_size = imput;
					}
					else
					{
						if (imput < 64)
							alert("La taille minimum d'une trame est de 64 octets");
						tram_size = 128;
						alert('Entrée invalide, trame de 128 octets par défault');
					}
				}
				else
					tram_size = 128;
				simulation.simulate(s, null, tram_size);
				options.remove();
			}

			function unicast() {
				var tram_size = null;
				var targetid = prompt("Select target id");
				if (simu.tram_type == 3)
				{
					var imput = document.getElementById("trameSize").value;
					if (imput != null && imput != '' && !isNaN(Number(imput)) && imput > 63) {
						tram_size = imput;
					}
					else
					{
						if (imput < 64)
							alert("La taille minimum d'une trame est de 64 octets");
						tram_size = 128;
						alert('Entrée invalide, trame de 128 octets par défault');
					}
				}
				else
					tram_size = 128;
				if (targetid != "" && !isNaN(Number(targetid)))
				{
					if (targetid == s.id)
						alert('Vous ne pouvez pas envoyer une requette au post émetteur.')
					else if (test_target_id(targetid))
						simulation.simulate(s, targetid, tram_size);
				}
				else
					alert('Entrée invalide');
				options.remove();
			}
		}
	},

	button_pressed(nb)
	{
		simu.isDown = true;
		simu.selected = nb - 1;
		if (nb > 2)
			simu.ctrl.selected = nb - 1;
	},

	contrl(bool)
	{
		simu.ctrl.pressed = bool;
	},

	set_trame_type(nb)
	{
		simu.trame_type = nb;
	},

	mousedown(x, y)
	{
		simu.isDown = true;
		var points = [x, y, x, y];

		if (simu.selected == 2 || (simu.ctrl.pressed && simu.ctrl.selected == 2)) {
			this.canvas.add(struct.create_work_station(simu.nb_workstation, x - 25, y - 25, 1, false, "post"));
			simu.nb_workstation++;
			simu.selected = 1;
		} else if (simu.selected == 3 || (simu.ctrl.pressed && simu.ctrl.selected == 3)) {
			this.canvas.add(struct.create_work_station(simu.nb_workstation, x - 25, y - 25, 3, false, "hub"));
			simu.nb_workstation++;
			simu.selected = 1;
		} else if (simu.selected == 4 || (simu.ctrl.pressed && simu.ctrl.selected == 4)) {
			this.canvas.add(struct.create_work_station(simu.nb_workstation, x - 25, y - 25, 6, false, "switch"));
			simu.nb_workstation++;
			simu.selected = 1;
		} else if (simu.selected == 0) {
			for (var i = 0; i < simu.tab_workstation.length; i++) {
				for (var j = 0; j < simu.tab_workstation[i].ports.length; j++) {
					if (helper.is_inside(x, y, simu.tab_workstation[i].ports[j], simu.tab_workstation[i])) {
						simu.tab_workstation[i].ports[j].type = (simu.tab_workstation[i].ports[j].type + 1) % 3;

						if (simu.tab_workstation[i].ports[j].used) {
							for (var cab = 0; cab < simu.tab_cable.length; cab++) {
								if (simu.tab_cable[cab].object_1 == simu.tab_workstation[i]) {
									if (j == simu.tab_cable[cab].obj_1_port_nb) {
										simu.tab_cable[cab].type = simu.tab_workstation[i].ports[j].type;
										simu.tab_cable[cab].object_2.ports[simu.tab_cable[cab].obj_2_port_nb].type = simu.tab_workstation[i].ports[j].type;
										helper.apply_color(simu.tab_cable[cab].l, simu.tab_cable[cab].type, true);
										helper.apply_color(simu.tab_cable[cab].object_2.ports[simu.tab_cable[cab].obj_2_port_nb].rect, simu.tab_cable[cab].type, false);
										helper.apply_color(simu.tab_cable[cab].object_1.ports[simu.tab_cable[cab].obj_1_port_nb].rect, simu.tab_cable[cab].type, false);
									}
								}
								if (simu.tab_cable[cab].object_2 == simu.tab_workstation[i]) {
									if (j == simu.tab_cable[cab].obj_2_port_nb) {
										simu.tab_cable[cab].type = simu.tab_workstation[i].ports[j].type;
										simu.tab_cable[cab].object_1.ports[simu.tab_cable[cab].obj_1_port_nb].type = simu.tab_workstation[i].ports[j].type;
										helper.apply_color(simu.tab_cable[cab].l, simu.tab_cable[cab].type, true);
										helper.apply_color(simu.tab_cable[cab].object_2.ports[simu.tab_cable[cab].obj_2_port_nb].rect, simu.tab_cable[cab].type, false);
										helper.apply_color(simu.tab_cable[cab].object_1.ports[simu.tab_cable[cab].obj_1_port_nb].rect, simu.tab_cable[cab].type, false);
									}
								}
							}
						}
					}
				}
			}
		} else if (simu.selected == 1) {
			if (simu.line_creation == 0 && this.canvas.getActiveObject() != null) {
				var actual_obj = null;
				var points_line;

				for (var i = 0; actual_obj == null && i < simu.tab_workstation.length; i++) {
					if (this.canvas.getActiveObject() == simu.tab_workstation[i].obj) {
						actual_obj = simu.tab_workstation[i];
					}
				}

				for (var j = 0; j < actual_obj.ports.length; j++) {
					if (helper.is_inside(x, y, actual_obj.ports[j], actual_obj)) {
						if (actual_obj.ports[j].used) {
							for (var cab = 0; cab < simu.tab_cable.length; cab++) {
								if (simu.tab_cable[cab].object_1 == actual_obj && simu.tab_cable[cab].obj_1_port_nb == j) {
									actual_obj = simu.tab_cable[cab].object_2;
									j = simu.tab_cable[cab].obj_2_port_nb;
									struct.delete_cable(simu.tab_cable[cab]);
								} else if (simu.tab_cable[cab].object_2 == actual_obj && simu.tab_cable[cab].obj_2_port_nb == j) {
									actual_obj = simu.tab_cable[cab].object_1;
									j = simu.tab_cable[cab].obj_1_port_nb;
									struct.delete_cable(simu.tab_cable[cab]);
								}
							}
						}

						var aux = 26;
						if (actual_obj.ports.length > 3)
							aux = ((50 + ((actual_obj.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;

						points_line = [actual_obj.obj.left + actual_obj.ports[j].rect.left + aux + simu.PORT_SIZE / 2,
						actual_obj.obj.top + actual_obj.ports[j].rect.top + 26 + simu.PORT_SIZE / 2, x, y
						];
						simu.last_object_port_nb = j;
					}
				}

				if (points_line != null) {
					simu.line = new fabric.Line(points_line, {
						strokeWidth: 1,
						fill: 'black',
						originX: 'center',
						originY: 'center',
						selectable: false
					});

					helper.apply_color(simu.line, actual_obj.ports[simu.last_object_port_nb].type, true); // true if it's for line

					this.canvas.add(simu.line);
					simu.line_creation = 1;
					simu.last_object = actual_obj;
				}
			} else if (simu.line_creation == 1) {
				simu.line_creation = 0;
				if (this.canvas.getActiveObject() != null) {
					var matched = false;
					var actual_obj;
					var object_port_nb;

					for (var i = 0; i < simu.tab_workstation.length; i++) {
						if (this.canvas.getActiveObject() == simu.tab_workstation[i].obj) {
							actual_obj = simu.tab_workstation[i];
						}
					}

					for (var j = 0; !matched && j < actual_obj.ports.length; j++) {
						if (helper.is_inside(x, y, actual_obj.ports[j], actual_obj)) {
							var aux = 26;
							if (actual_obj.ports.length > 3) {
								aux = ((50 + ((actual_obj.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;
							}

							simu.line.set({
								x2: actual_obj.obj.left + actual_obj.ports[j].rect.left + aux + simu.PORT_SIZE / 2,
								y2: actual_obj.obj.top + actual_obj.ports[j].rect.top + 26 + simu.PORT_SIZE / 2
							});
							object_port_nb = j;
							matched = true;
						}
					}

					if (matched) {
						struct.create_cable(simu.line, simu.last_object, actual_obj, simu.last_object_port_nb, object_port_nb, simu.last_object.ports[simu.last_object_port_nb].type);
						actual_obj.ports[object_port_nb].type = simu.last_object.ports[simu.last_object_port_nb].type;
					} else
						simu.line.remove();
				} else {
					simu.line.remove();
				}
			}
		} 
		this.canvas.renderAll();
	},


	move(x, y) {
		simu.canvas.on('object:moving', function () {
			var s = null;
			if (simu.canvas.getActiveObject() != null) {
				for (var i = 0; s == null && i < simu.tab_workstation.length; i++) {
					if (simu.canvas.getActiveObject() == simu.tab_workstation[i].obj)
						s = simu.tab_workstation[i];
				}
			}
			if (s.obj.left <= 0)
				s.obj.left = 0;
			if (s.obj.top <= 0)
				s.obj.top = 0;
			if (s.obj.left + s.obj.width >= 1300)
				s.obj.left = 1300 - s.obj.width;
			if (s.obj.top + s.obj.height >= 600)
				s.obj.top = 600 - s.obj.height;
		});

		for (var i = 0; i < simu.tab_workstation.length; i++) {
			for (var j = 0; j < simu.tab_workstation[i].ports.length; j++) {
				if (helper.is_inside(x, y, simu.tab_workstation[i].ports[j], simu.tab_workstation[i]) || simu.tab_workstation[i].ports[j].used) {
					switch (simu.tab_workstation[i].ports[j].type) {
						case 0:
							simu.tab_workstation[i].ports[j].rect.set({
								fill: simu.color_0
							});
							break;
						case 1:
							simu.tab_workstation[i].ports[j].rect.set({
								fill: simu.color_1
							});
							break;
						default:
							simu.tab_workstation[i].ports[j].rect.set({
								fill: simu.color_2
							});
							break;
					}
				} else {
					simu.tab_workstation[i].ports[j].rect.set({
						fill: 'white'
					});
				}
			}
		}

		if (simu.selected == 1 && this.canvas.getActiveObject() != null && simu.line_creation == 1) {
			simu.line.set({
				x2: x,
				y2: y
			});
		}

		for (var i = 0; i < simu.tab_cable.length; i++) {
			if (simu.tab_cable[i].object_1 != null) {
				var aux1 = 26;
				if (simu.tab_cable[i].object_1.ports.length > 3)
					aux1 = ((50 + ((simu.tab_cable[i].object_1.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;
				var aux2 = 26
				if (simu.tab_cable[i].object_2.ports.length > 3)
					aux2 = ((50 + ((simu.tab_cable[i].object_2.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;

				simu.tab_cable[i].l.set({
					x1: simu.tab_cable[i].object_1.obj.left + simu.tab_cable[i].object_1.ports[simu.tab_cable[i].obj_1_port_nb].rect.left + aux1 + simu.PORT_SIZE / 2,
					y1: simu.tab_cable[i].object_1.obj.top + simu.tab_cable[i].object_1.ports[simu.tab_cable[i].obj_1_port_nb].rect.top + 26 + simu.PORT_SIZE / 2,
					x2: simu.tab_cable[i].object_2.obj.left + simu.tab_cable[i].object_2.ports[simu.tab_cable[i].obj_2_port_nb].rect.left + aux2 + simu.PORT_SIZE / 2,
					y2: simu.tab_cable[i].object_2.obj.top + simu.tab_cable[i].object_2.ports[simu.tab_cable[i].obj_2_port_nb].rect.top + 26 + simu.PORT_SIZE / 2
				});

				helper.apply_color(simu.tab_cable[i].l, simu.tab_cable[i].type, true); // true if it's for line
			}
		}

		var WorkStation = [];
		for (var j = 0; j < simu.tab_workstation.length; j++) {
			var aux = {
				id: simu.tab_workstation[j].id,
				type: simu.tab_workstation[j].type
			};
			WorkStation.push(aux);
		}
		displayArrayObjects(WorkStation);

		if (!simu.is_sending_package) {
			this.canvas.renderAll();
		}
	},

	set_color(i, color)
	{
		if (i == 0)
			simu.post_color = color;
		else if (i == 1)
			simu.hub_color = color;
		else
			simu.switch_color = color;

		for (var i = 0; i < simu.tab_workstation.length; i++)
		{
			var aux = simu.tab_workstation[i].obj.getObjects();
			if (simu.tab_workstation[i].type == 'hub')
				aux[0].set({fill: simu.hub_color});
			else if (simu.tab_workstation[i].type == 'post')
			{
				aux[0].set({fill: simu.post_color});
			}
			else
				aux[0].set({fill: simu.switch_color});
		}
	},

	send_request_3(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top, request_size, target)
	{
		send_request_2(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top, request_size, target)
	}
}

function test_target_id(id)
{
	for (var i = 0; i < simu.tab_workstation.length; i++)
	{
		if(simu.tab_workstation[i].id == id && simu.tab_workstation[i].type == "post")
			return true;
	}
	alert('Aucun post ne possède cette id');
	return false;
}

function displayArrayObjects(WorkStation) {
	var len = WorkStation.length;
	var text = "<br>";
	var label = "";
	var checkbox = "";

	for (var i = 0; i < len; i++) {
		var myObject = WorkStation[i];
		label = "";

		for (var x in myObject) {
			label += (x + " : " + myObject[x] + " ");
		}

		if (simu.tab_workstation[i].checked == true) {
			checkbox = '<input type="checkbox" id="checkbox' + WorkStation[i].id + '" v-model="checkbox" style="margin-right:10px; margin-left:30px;" checked>';
			checkbox += '<label style="color:white;" for="checkbox' + WorkStation[i].id + '">' + label + '</label>';
		}
		else
		{
			checkbox = '<input type="checkbox" id="checkbox' + WorkStation[i].id + '" v-model="checkbox" style="margin-right:10px; margin-left:30px;">';
			checkbox += '<label style="color:white;" for="checkbox' + WorkStation[i].id + '">' + label + '</label>';
		}

		text += checkbox + "</br>";


		var check = document.getElementById('checkbox' + WorkStation[i].id);

		if (check != null) {
			if (check.checked)
				simu.tab_workstation[i].checked = true;
		}
	}
	document.getElementById("message").innerHTML = text;
}
// variable to hold how many frames have elapsed in the animation

function send_request_2(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top, request_size, target) {
	var vertices = [];
	var fps = 17;
	var count1 = 0;
	var count2 = 0;

	var originX = port_1_left + simu.PORT_SIZE / 2 - 1;
	var originY = port_1_top + simu.PORT_SIZE / 2 - 1;

	vertices.push({
		x: originX,
		y: originY
	});
	vertices.push({
		x: port_2_left + simu.PORT_SIZE / 2 - 1,
		y: port_2_top + simu.PORT_SIZE / 2 - 1
	});

	var points = calcWaypoints(vertices);

	//Create Line
	var line = new fabric.Line([originX, originY, originX, originY], {
		stroke: 'blue',
		strokeWidth: 3,
		hasControls: false,
	});
	simu.canvas.add(line);

	//First parcour
	function draw() {
		if (count1 < points.length) {
			requestAnimationFrame(draw);
			line.set({
				x1: points[count1].x,
				y1: points[count1].y
			});
		};
		simu.canvas.renderAll();
		count1++;
	}
	draw();

	//Second Parcour
	setTimeout(function () {
		function draw() {
			if (count2 < points.length) {
				requestAnimationFrame(draw);
				line.set({
					x2: points[count2].x,
					y2: points[count2].y
				});
			};
			simu.canvas.renderAll();
			count2++;
		}
		draw();
	}, fps * points.length * (request_size / 200));

	count1 = 0;
	count2 = 0;

	setTimeout(function () {
		for (var i = 0; i < simu.tab_workstation.length; i++) {
			if (simu.tab_workstation[i].id == workstationId) {
				simulation.call_station_progress(
					simu.tab_workstation[i].checked,
					portOriginal,
					postIdOriginal,
					tabVect,
					workstationType,
					workstationId,
					port_2_top, port_2_left,
					request_size,
					target);
			}
		}
	}, fps * points.length * (request_size / 200) + 1500);
}

// calculate waypoints traveling along vertices
function calcWaypoints(vertices) {
	var waypoints = [];
	var pt0 = vertices[0];
	var pt1 = vertices[1];

	var dx = pt1.x - pt0.x;
	var dy = pt1.y - pt0.y;
	for (var j = 0; j < 100; j++) {
		var x = pt0.x + dx * j / 100;
		var y = pt0.y + dy * j / 100;
		waypoints.push({
			x: x,
			y: y
		});
	}
	return (waypoints);
}
