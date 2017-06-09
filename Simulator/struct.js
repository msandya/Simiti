//Create a port
function create_port(obj, left) {
	port_rect = new fabric.Rect({
		width: PORT_SIZE,
		height: PORT_SIZE,
		top: obj.obj.top + 35,
		left: left,
		stroke: 'black',
		strokeWidth: 1,
		fill: 'white'
	});

	var port = {
		'rect': port_rect,
		'used': false,
		'type': 0
	};

	obj.obj.addWithUpdate(port_rect);
	obj.ports.push(port);
}

//Create nb ports
function create_ports(obj, nb) {
	for (var i = 0; i < nb; i++) {
		var left = obj.obj.left + 4 + i * (PORT_SIZE + 3);
		create_port(obj, left);
	}
}

function get_linked_port(work_station, port_nb) {
	for (var i = 0; i < tab_cable.length; i++) {
		if (tab_cable[i].object_1 == work_station && port_nb == tab_cable[i].obj_1_port_nb) {
			var res = {
				'port': tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb],
				'obj': tab_cable[i].object_2,
				'cable': tab_cable[i]
			};
			return res;
		} else if (tab_cable[i].object_2 == work_station && port_nb == tab_cable[i].obj_2_port_nb) {
			var res = {
				'port': tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb],
				'obj': tab_cable[i].object_1,
				'cable': tab_cable[i]
			};
			return res;
		}
	}
	alert('port not linked');
	return null;
}

//Create cable linked with 2 ports of 2 WorkStations
function create_cable(l, object_1, object_2, obj_1_port_nb, obj_2_port_nb, type) {
	var cable = {
		'l': l,
		'object_1': object_1,
		'object_2': object_2,
		'obj_1_port_nb': obj_1_port_nb,
		'obj_2_port_nb': obj_2_port_nb,
		'type': type
	};

	//Checking if you clicked in a port which already linked with another port,
	//it will delete the previous line port
	if (object_2.ports[obj_2_port_nb].used == true) {
		for (var i = 0; i < tab_cable.length; i++) {
			if (tab_cable[i].object_1 == object_2) {
				if (tab_cable[i].obj_1_port_nb == obj_2_port_nb) {
					delete_cable(tab_cable[i]);
				}
			}

			if (tab_cable[i].object_2 == object_2) {
				if (tab_cable[i].obj_2_port_nb == obj_2_port_nb) {
					delete_cable(tab_cable[i]);
					//tab_cable.splice(i, 1);
				}
			}
		}
	}
	object_1.ports[obj_1_port_nb].used = true;
	object_2.ports[obj_2_port_nb].used = true;

	tab_cable.push(cable);
}

//Delete Cable
function delete_cable(cable) {
	cable.l.remove();
	cable.object_1.ports[cable.obj_1_port_nb].used = false;
	cable.object_2.ports[cable.obj_2_port_nb].used = false;
	cable.object_1 = null;
	cable.object_2 = null;
}

//Create a Workstation
function create_work_station(id, x, y, nb_port, package_received, type) {
	//Create a big rectangle outside
	big_rect = new fabric.Rect({
		width: 50,
		height: 50,
		stroke: 'black',
		strokeWidth: 1,
		fill: 'white'
	});

	//Create a GroupStation graphic
	station = new fabric.Group([big_rect], {
		left: x,
		top: y
	});

	//Create a WorkStation like a class of station(adding station, ports, number of ports)
	var work_station = {
		'id': id,
		'obj': station,
		'nb_port': nb_port,
		'ports': [],
		'package_received': package_received,
		'type': type
	};

	//Create a port in order to add in a GroupStation
	create_ports(work_station, nb_port);

	//Giving permission not to resize, rotate... object selected
	station.hasControls = false;
	//Adding a distance of a rectangle and the highlight around it
	station.padding = 2;

	tab_workstation.push(work_station);
	canvas.add(station);
}