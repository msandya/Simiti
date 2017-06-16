function movement_package(rect, left, top) {
	rect.animate('left',
		left, {
			onChange: canvas.renderAll.bind(canvas),
			duration: 1000,
			onComplete: function () {
				rect.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});
	rect.animate('top',
		top, {
			onChange: canvas.renderAll.bind(canvas),
			duration: 1000,
			onComplete: function () {
				rect.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});
}

function create_and_move_package(start_left, start_top, destionation_left, destination_top) {
	var rect = new fabric.Rect({
		width: PORT_SIZE,
		height: PORT_SIZE,
		left: start_left + 20,
		top: start_top + 25,
		fill: 'blue',
		stroke: 'red',
		selectable: false
	});
	canvas.add(rect);

	var animateBtn = document.getElementById('animate');
	movement_package(rect, destionation_left + 20, destination_top + 25);
};

//-----------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------In progress-----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
function set_position_box_2(topPos, leftPos) {
	var top = topPos + "px";
	var left = leftPos + "px";

	document.getElementById("myDIV").style.top = top;
	document.getElementById("myDIV").style.left = left;
}

var progress_switch = [
	"Examiner mac émetteur",
	"Examiner le port d’origine",
	"Chercher émet. ds mac/port",
	"Réinitialiser TTL émetteur",
	"Sélect. dest. ds mac/port",
	"Réémettre sur les autres ports",
	"Fin de la demonstration"
]

var progress_post = [
	"Examiner le destinataire",
	"Traiter la trame",
	"Fin de la demonstration"
]

var progress_hub = [
	"Examiner le port d'origine",
	"Répéter sur les autres ports",
	"Fin de la démonstration"
]

function station_progress(tabVectInfo, workstationType, workstationId, topPos, leftPos) {
	var top = (topPos + 60) + "px";
	var left = (leftPos) + "px";
	var progress_list = [];
	var progress_list_index = 0;
	var workstation_type = "";
	switch (workstationType) {
		case "switch":
			progress_list = progress_switch;
			workstation_type = "switch";
			break;
		case "post":		
			progress_list = progress_post;
			workstation_type = "Post";
			break;
		case "hub":
			progress_list = progress_hub;
			workstation_type = "Hub";
			break;
	}

	setTimeout(function () {
		var x = document.createElement("div");

		x.id = workstationId;
		x.style.position = "absolute";
		x.style.width = "200px";
		x.style.height = "100px";
		x.style.left = left;
		x.style.top = top;
		x.style.background = "red";
		x.style.color = "white";
		x.addEventListener('mousedown', function (e) {
			isDown = true;
			offset = [
				x.offsetLeft - e.clientX,
				x.offsetTop - e.clientY
			];
		}, true);

		x.addEventListener('mouseup', function () {
			isDown = false;
		}, true);

		x.addEventListener('mousemove', function (event) {
			event.preventDefault();
			if (isDown) {
				mousePosition = {
					posX: event.clientX,
					posY: event.clientY
				};
				x.style.left = (mousePosition.posX + offset[0]) + 'px';
				x.style.top = (mousePosition.posY + offset[1]) + 'px';
			}
		}, true);
		//x.appendChild(t);
		document.body.appendChild(x);

		var tab_button = document.createElement("div");
		tab_button.style.position = "absolute";
		tab_button.style.left = "0px";
		tab_button.style.top = "35px";

		var z = document.createElement("div");
		z.style.position = "absolute";
		z.style.left = "10px";
		z.style.top = "5px";
		z.style.width = "180px";
		z.style.height = "20px";
		z.style.background = "black";

		var t = document.createTextNode(workstation_type + " id " + x.id);
		z.appendChild(t);

		var progress_text = document.createElement("div");
		progress_text.id = "text1" + x.id;
		progress_text.style.position = "absolute";
		progress_text.style.left = "10px";
		progress_text.style.top = "55px";
		progress_text.style.width = "180px";
		progress_text.style.height = "20px";
		progress_text.style.background = "black";

		var t = document.createTextNode(progress_list[0]);
		progress_text.appendChild(t);

		{
			var btnStop = document.createElement("button");
			btnStop.type = "button";
			btnStop.style.position = "absolute";
			btnStop.style.left = "10px";
			btnStop.style.width = "15px";
			btnStop.style.height = "15px";
			btnStop.addEventListener("click", function () {
				searche_and_send_from_station(workstationId, tabVectInfo);
				var element = document.getElementById(x.id);
				element.parentNode.removeChild(element);
			});
			tab_button.appendChild(btnStop);
		} {
			var btnBack = document.createElement("button");
			btnBack.type = "button";
			btnBack.style.position = "absolute";
			btnBack.style.left = "30px";
			btnBack.style.width = "15px";
			btnBack.style.height = "15px";
			btnBack.addEventListener("click", function () {
				if (progress_list_index > 0) {
					progress_list_index--;

					//Remove element
					var element = document.getElementById("text1" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var progress_text = document.createElement("div");
					progress_text.id = "text1" + x.id;
					progress_text.style.position = "absolute";
					progress_text.style.left = "10px";
					progress_text.style.top = "55px";
					progress_text.style.width = "180px";
					progress_text.style.height = "20px";
					progress_text.style.background = "black";

					//Create text and add it to element
					var t = document.createTextNode(progress_list[progress_list_index]);
					progress_text.appendChild(t);

					x.appendChild(progress_text);
				}
			});
			tab_button.appendChild(btnBack);
		} {
			var btnReset = document.createElement("button");
			btnReset.type = "button";
			btnReset.style.position = "absolute";
			btnReset.style.left = "50px";
			btnReset.style.width = "15px";
			btnReset.style.height = "15px";
			btnReset.addEventListener("click", function () {
				progress_list_index = 0;

				//Remove element
				var element = document.getElementById("text1" + x.id);
				element.parentNode.removeChild(element);

				//Create element
				var progress_text = document.createElement("div");
				progress_text.id = "text1" + x.id;
				progress_text.style.position = "absolute";
				progress_text.style.left = "10px";
				progress_text.style.top = "55px";
				progress_text.style.width = "180px";
				progress_text.style.height = "20px";
				progress_text.style.background = "black";

				//Create text and add it to element
				var t = document.createTextNode(progress_list[progress_list_index]);
				progress_text.appendChild(t);

				x.appendChild(progress_text);
			});
			tab_button.appendChild(btnReset);
		} {
			var btnNext = document.createElement("button");
			btnNext.type = "button";
			btnNext.style.position = "absolute";
			btnNext.style.left = "70px"
			//btn4.innerHTML = "x";
			btnNext.style.width = "15px";
			btnNext.style.height = "15px";
			btnNext.addEventListener("click", function () {
				if (progress_list_index == progress_list.length - 1) {
					searche_and_send_from_station(workstationId, tabVectInfo);
					var element = document.getElementById(x.id);
					element.parentNode.removeChild(element);
				} else {
					progress_list_index++;

					//Remove element
					var element = document.getElementById("text1" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var progress_text = document.createElement("div");
					progress_text.id = "text1" + x.id;
					progress_text.style.position = "absolute";
					progress_text.style.left = "10px";
					progress_text.style.top = "55px";
					progress_text.style.width = "180px";
					progress_text.style.height = "20px";
					progress_text.style.background = "black";

					//Create text and add it to element
					var t = document.createTextNode(progress_list[progress_list_index]);
					progress_text.appendChild(t);

					x.appendChild(progress_text);
				}
			});
			tab_button.appendChild(btnNext);
		}
		x.appendChild(tab_button);
		x.appendChild(z);
		x.appendChild(progress_text);
	}, 1000)
}

function determine_workStation_level(work_station) {
	tab_workstation_level[0] = new Array();
	tab_workstation_level[0][0] = work_station;
	//alert("We are now in lv0");
	//station_information(tab_workstation_level[0][0]);
	tab_created.push(work_station.id);
	var condition_arret = false;
	var i = 0;
	var j = 0;
	var txt = "";

	while (condition_arret == false) {

		tab_workstation_level[i + 1] = new Array();
		if (i == 0) {
			//alert("we are now in lv1");
			//alert(i + 1);
			var w = 0;
			for (var n = 0; n < work_station.nb_port; n++) {
				if (work_station.ports[n].used == true) {
					var work_station_dertermine = determine_station_from_port(n, work_station);

					if (verfify_workstation_created(work_station_dertermine.id) != true) {
						tab_workstation_level[i + 1].push(work_station_dertermine);
						tab_created.push(work_station_dertermine.id);
						//station_information(tab_workstation_level[i + 1][w]);
						//w++;
					}
				}
			}
		} else {
			//alert("we are now in lv" + (i + 1));
			//alert(i);
			/*for (var j = 0; j < tab_workstation_level[i].length; j++) {
				station_information(tab_workstation_level[i][j]);
			}*/
			for (var j = 0; j < tab_workstation_level[i].length; j++) {
				//alert(tab_workstation_level[i].length);
				for (var k = 0; k < tab_workstation_level[i][j].nb_port; k++) {
					//alert(tab_workstation_level[i][j].nb_port);
					if (tab_workstation_level[i][j].ports[k].used == true) {
						//station_id_created();
						//alert("Station Id: " + tab_workstation_level[i][j].id + ", Port number: " + k);
						var work_station_dertermine = determine_station_from_port(k, tab_workstation_level[i][j]);
						if (verfify_workstation_created(work_station_dertermine.id) != true) {
							//alert("This station is not in tab_created");
							tab_workstation_level[i + 1].push(work_station_dertermine);
							tab_created.push(work_station_dertermine.id);
							//alert("ed successfully in lv " + (i + 1));
							//station_information(work_station_dertermine);
						}
						/*else {
							//alert("This station is in tab_created");
							//alert("ed unsuccessfully in lv " + (i + 1));
						}*/
					}
				}
			}
		}
		if (tab_workstation_level[i + 1].length == 0) {
			condition_arret = true;
		}
		i++;
	}
}

function station_id_created() {
	var txt = "";
	for (var i = 0; i < tab_created.length; i++) {
		txt = txt + tab_created[i] + ",";
	}
	alert(txt);
}

function determine_station_from_port(port_number, work_station) {
	var cable_examinate = [];
	for (var i = 0; i < tab_cable.length; i++) {
		if (tab_cable[i].object_1.id == work_station.id || tab_cable[i].object_2.id == work_station.id) {
			cable_examinate.push(tab_cable[i]);
		}
	}

	for (var j = 0; j < cable_examinate.length; j++) {
		if (cable_examinate[j].object_1.id == work_station.id && cable_examinate[j].obj_1_port_nb == port_number) {
			return cable_examinate[j].object_2;
		}
		if (cable_examinate[j].object_2.id == work_station.id && cable_examinate[j].obj_2_port_nb == port_number) {
			return cable_examinate[j].object_1;
		}
	}
}

function station_information(station) {
	txt1 = "WorkStation \n _Id: " + station.id + "\n _Number of ports: " + station.nb_port;
	txt2 = "";
	for (var j = 0; j < station.nb_port; j++) {
		if (station.ports[j].used == true) {
			txt2 = txt2 + "Port number " + j + " is used \n";
		} else {
			txt2 = txt2 + "Port number " + j + " is not used \n";
		}
	}
	txt3 = txt1 + "\n-----------------\n" + txt2;
	alert(txt3);
}

function send_package_from_station(current_Station) {
	for (var i = 0; i < current_Station.nb_port; i++) {
		if (current_Station.ports[i].used == true) {
			var current_Station_2 = determine_station_from_port(i, current_Station);
			if (current_Station_2.package_received == false) {
				create_and_move_package(current_Station.obj.left, current_Station.obj.top, current_Station_2.obj.left, current_Station_2.obj.top);
				current_Station_2.package_received = true;
			}
		}
	}
}

function verfify_workstation_created(workstation_id) {
	for (var i = 0; i < tab_created.length; i++) {
		if (workstation_id == tab_created[i]) {
			return true;
		}
	}
	return false;
}

function list_workStation_level() {
	for (var i = 0; i < tab_workstation_level.length - 1; i++) {
		alert("We are in level: " + i);
		for (var j = 0; j < tab_workstation_level[i].length; j++) {
			station_information(tab_workstation_level[i][j]);
		}
	}
}

function cables_information() {
	for (var i = 0; i < tab_cable.length; i++) {
		txt1 = "Cable number: " + i + "\n";
		txt2 = "Object 1 Id: " + tab_cable[i].object_1.id + "\n" + "Object 2 Id: " + tab_cable[i].object_2.id;
		txt3 = "Port number of Object 1: " + tab_cable[i].obj_1_port_nb + "\n" + "Port number of Object 2: " + tab_cable[i].obj_2_port_nb;
		txt4 = txt1 + "\n-----------------\n" + txt2 + "\n-----------------\n" + txt3 + "\n-----------------\n";
		alert(txt4);
	}
}

function stations_information() {
	for (var i = 0; i < tab_workstation.length; i++) {
		txt1 = "WorkStation \n _Id: " + tab_workstation[i].id + "\n _Number of ports: " + tab_workstation[i].nb_port;
		txt2 = "";
		for (var j = 0; j < tab_workstation[i].nb_port; j++) {
			if (tab_workstation[i].ports[j].used == true) {
				txt2 = txt2 + "Port number " + j + " is used \n";
			} else {
				txt2 = txt2 + "Port number " + j + " is not used \n";
			}
		}
		txt3 = txt1 + "\n-----------------\n" + txt2;
		alert(txt3);
	}
}

function simulation() {

	//cables_information();
	//stations_information();

	tab_workstation_level = [];
	tab_created = [];
	determine_workStation_level(tab_workstation[start]);
	/*for (var i = 0; i < tab_workstation_level.length; i++) {
		for (var j = 0; j < tab_workstation_level[i].length; j++) {
			var txt = i + " : " + tab_workstation_level[i][j].id;
			alert(txt);
		}
	}*/

	list_workStation_level();
	/*for (var i = 0; i < tab_workstation[y].ports.length; i++) {
	var current_station_test = determine_station_from_port(i, tab_workstation[y]);
		if (tab_workstation[y].ports[i].used == true) {
			alert(current_station_test.id);
		}
	}*/
	for (var i = 0; i < tab_workstation.length; i++) {
		tab_workstation[i].package_received = false;
	}
	tab_workstation[y].package_received = true;

	var i = 0;

	function myLoop() {
		setTimeout(function () {
			for (var j = 0; j < tab_workstation_level[i].length; j++) {
				send_package_from_station(tab_workstation_level[i][j]);
			}
			i++;
			if (i < tab_workstation_level.length - 1) {
				myLoop();
			}
		}, 2000)
	}

	myLoop();

	/*for (var i = 0; i < tab_workstation_level.length - 1; i++) {
		for (var j = 0; j < tab_workstation_level[i].length; j++) {
			send_package_from_station(tab_workstation_level[i][j]);
		}
	}*/
	//send_package_from_station(tab_workstation[0]);
}

// create the circle
function create_request(left, top) {
	return new fabric.Circle({
		radius: PORT_SIZE / 2,
		top: top,
		left: left,
		fill: 'blue',
		stroke: 'red',
		selectable: false
	});
}

function func_remove(elementId) {
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

// send the request from port_1 to port_2
function send_request(tabVectInfo, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top) {
	var request = create_request(port_1_left, port_1_top);
	canvas.add(request);

	var animation = document.getElementById('animate');

	request.animate('left',
		port_2_left, {
			onChange: canvas.renderAll.bind(canvas),
			duration: 1000,
			onComplete: function () {
				request.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});

	request.animate('top',
		port_2_top, {
			onChange: canvas.renderAll.bind(canvas),
			duration: 1000,
			onComplete: function () {
				request.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});

	station_progress(
		tabVectInfo,
		workstationType,
		workstationId,
		port_2_top, port_2_left);
}

function rec_simulation(s, h, marked, tabVectInfo) {
	marked.push(s);
	var next = null;

	for (var i = 0; i < s.ports.length; i++) {
		if (s.ports[i].used) // Si un port est utilisé
		{
			next = get_linked_port(s, i); // On regarde a qui il est relié

			if (!is_in(next.obj, marked) && good_cable(s.type, next.obj.type, next.cable.type)) // On vérifie que le voisin n'est pas marqué
			{
				// On envoi la requète
				var vect = {
					'h': h,
					'x1': s.obj.left + s.ports[i].rect.left + 26,
					'y1': s.obj.top + s.ports[i].rect.top + 26,
					'x2': next.obj.obj.left + next.port.rect.left + 26,
					'y2': next.obj.obj.top + next.port.rect.top + 26
				};
				tabVectInfo.tab_vect.push(vect);
				tabVectInfo.tab_vect_id.push(next.port.workstation_id);
				tabVectInfo.tab_vect_workstation_type.push(next.obj.type);

				var vect_type_2 = {
					'pos_origin': s.id,
					'x1': s.obj.left + s.ports[i].rect.left + 26,
					'y1': s.obj.top + s.ports[i].rect.top + 26,
					'x2': next.obj.obj.left + next.port.rect.left + 26,
					'y2': next.obj.obj.top + next.port.rect.top + 26
				};
				tabVectInfo.tab_vect_2.push(vect_type_2);

				//alert(next.port.workstation_id);
				rec_simulation(next.obj, h + 1, marked, tabVectInfo);
			}
		}
	}
}

//parcour largeur
function simulate(s) // s, sommet selectionné
{
	var h = 0;
	var marked = []; // marked, tableau des sommet déjà vu
	var next = null;

	var tab_vect_info = {
		'tab_vect': [],
		'tab_vect_2': [],
		'tab_vect_id': [],
		'tab_vect_workstation_type': []
	};

	rec_simulation(s, h, marked, tab_vect_info);

	searche_and_send_from_station(0, tab_vect_info);

	/*for (var i = 0; i < tab_vect_info.tab_vect.length; i++) {
		send_req(tab_vect_info.tab_vect_workstation_type[i], tab_vect_info.tab_vect[i], tab_vect_info.tab_vect_id[i], tab_vect_info.tab_vect_workstation_type[i]);
	}*/
}

function searche_and_send_from_station(stationId, tabVectInfo) {
	var tab_vect = [];

	for (var i = 0; i < tabVectInfo.tab_vect_2.length; i++) {
		if (tabVectInfo.tab_vect_2[i].pos_origin == stationId) {
			var vect = {
				'vect': tabVectInfo.tab_vect_2[i],
				'vect_id': tabVectInfo.tab_vect_id[i],
				'vect_type': tabVectInfo.tab_vect_workstation_type[i]
			}
			tab_vect.push(vect);
		}
	}

	for (var i = 0; i < tab_vect.length; i++) {
		send_req_2(tabVectInfo, tab_vect[i].vect_type, tab_vect[i].vect, tab_vect[i].vect_id);
	}
}

function send_req_2(tabVectInfo, vectType, obj, vectId) {
	send_request(tabVectInfo, vectType, vectId, obj.x1, obj.y1, obj.x2, obj.y2);
}

function send_req(vectType, vectInfo, obj, vectId, objType) {
	setTimeout(function () {
		send_request(vectType, vectId, obj.x1, obj.y1, obj.x2, obj.y2);
	}, obj.h * 1000);
}