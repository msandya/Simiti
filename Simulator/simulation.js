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
						} /*else {
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
			if(current_Station_2.package_received == false){
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

function list_workStation_level(){
	for(var i = 0; i < tab_workstation_level.length - 1; i++){
		alert("We are in level: " + i);
		for(var j = 0; j < tab_workstation_level[i].length; j++){
			station_information(tab_workstation_level[i][j]);
		}
	}
}

function simulation()
{
	//Verify information of ports
	/*for (var i = 0; i < tab_cable.length; i++) {
		txt1 = "Cable number: " + i + "\n";
		txt2 = "Object 1 Id: " + tab_cable[i].object_1.id + "\n" + "Object 2 Id: " + tab_cable[i].object_2.id;
		txt3 = "Port number of Object 1: " + tab_cable[i].obj_1_port_nb + "\n" + "Port number of Object 2: " + tab_cable[i].obj_2_port_nb;
		txt4 = txt1 + "\n-----------------\n" + txt2 + "\n-----------------\n" + txt3 + "\n-----------------\n";
		alert(txt4);
	}*/
	//Verify information of stations
	/*for (var i = 0; i < tab_workstation.length; i++) {
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
	}*/

	tab_workstation_level = [];
	tab_created = [];
	determine_workStation_level(tab_workstation[start]);
	/*for (var i = 0; i < tab_workstation_level.length; i++) {
		for (var j = 0; j < tab_workstation_level[i].length; j++) {
			var txt = i + " : " + tab_workstation_level[i][j].id;
			alert(txt);
		}
	}*/

	//list_workStation_level();
	/*for (var i = 0; i < tab_workstation[y].ports.length; i++) {
	var current_station_test = determine_station_from_port(i, tab_workstation[y]);
		if (tab_workstation[y].ports[i].used == true) {
			alert(current_station_test.id);
		}
	}*/
	for(var i = 0; i < tab_workstation.length; i++){
		tab_workstation[i].package_received = false;
	}
	tab_workstation[y].package_received = true;
	for (var i = 0; i < tab_workstation_level.length - 1; i++) {
		for (var j = 0; j < tab_workstation_level[i].length; j++) {
			send_package_from_station(tab_workstation_level[i][j]);
		}
	}
	//send_package_from_station(tab_workstation[0]);
	//	(tab_workstation[start]);
}

// create the circle
function create_request(left, top)
{
	return new fabric.Circle({
		radius: PORT_SIZE / 2,
		top: top,
		left: left,
		fill: 'blue',
		stroke: 'red',
		selectable: false
	});
}

// send the request from port_1 to port_2
function send_request(port_1_left, port_1_top, port_2_left, port_2_top)
{
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
}


function rec_simulation(s, h, marked, tab_vect)
{
	marked.push(s);
	var next = null;

	for (var i = 0; i < s.ports.length; i++)
	{
		if (s.ports[i].used)					// Si un port est utilisé
		{
			next = get_linked_port(s, i);		// On regarde a qui il est relié
			if (!is_in(next.obj, marked))		// On vérifie que le voisin n'est pas marqué
			{
				// On envoi la requète
				var vect =
				{
					'h': h,
					'x1': s.obj.left + s.ports[i].rect.left + 26, 
					'y1': s.obj.top + s.ports[i].rect.top + 26,
					'x2': next.obj.obj.left + next.port.rect.left + 26,
					'y2': next.obj.obj.top + next.port.rect.top + 26
				};
				tab_vect.push(vect);
				
				rec_simulation(next.obj, h + 1, marked, tab_vect);
			}
		}
	}
}


//parcour largeur
function simulate(s)		// s, sommet selectionné
{
	var h = 0;
	var marked = [];	    // marked, tableau des sommet déjà vu
	var next = null;

	var tab_vect = [];

	rec_simulation(s, h, marked, tab_vect);

	var aux = 0;
	for(var i = 0; i < tab_vect.length; i++)
	{
		if (tab_vect[i].h != aux)
		{
			sleep(100);
			aux++;
		}
		send_request(tab_vect[i].x1, tab_vect[i].y1, tab_vect[i].x2, tab_vect[i].y2);
	}
}

/*
 ParcoursLargeur(Graphe G, Sommet s):
       f = CreerFile();
       f.enfiler(s);
       marquer(s);
       tant que la file est non vide
                s = f.defiler();
                afficher(s);
                pour tout voisin t de s dans G
                         si t non marqué
                                 f.enfiler(t);
                                 marquer(t);
*/