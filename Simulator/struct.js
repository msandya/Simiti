//Create a port
function create_port(portId, obj, left) {
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
		'id': portId + 1,
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
		create_port(i, obj, left);
	}
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
	apply_color(object_1.ports[obj_1_port_nb].rect, object_1.ports[obj_1_port_nb].type, false);
	apply_color(object_2.ports[obj_2_port_nb].rect, object_2.ports[obj_2_port_nb].type, false);

	tab_cable.push(cable);
}

//Delete Cable
function delete_cable(cable) {
 	cable.l.remove();
	cable.object_2.ports[cable.obj_2_port_nb].rect.set({fill: 'white'});
	cable.object_1.ports[cable.obj_1_port_nb].rect.set({fill: 'white'});
	
 	cable.object_1.ports[cable.obj_1_port_nb].used = false;
 	cable.object_2.ports[cable.obj_2_port_nb].used = false;
 	cable.object_1 = null;
 	cable.object_2 = null;

	canvas.renderAll();
}

//Create the name of the workstation
function create_name(obj)
{
	var text = new fabric.Text(obj.type + "\n" + obj.id, {
    fontSize: 13,
    left: obj.obj.left + 4,
    top: obj.obj.top,
    //lineHeight: 1,
    //originX: 'left',
    fontFamily: 'Helvetica',
	fill: 'white'
    //statefullCache: true
  });
  obj.obj.addWithUpdate(text);
}

//Create a Workstation
function create_work_station(id, x, y, nb_port, package_received, type) {
	//Create a big rectangle outside
	big_rect = new fabric.Rect({
		width: 50,
		height: 50,
		stroke: 'black',
		strokeWidth: 1
	});

	if (nb_port > 3)
		big_rect.set({width: 50 + (nb_port - 3) * (PORT_SIZE + 3)});

	switch (type) {
		case "switch":
			big_rect.set({
				fill: 'blue'
			});
			break;
		case "post":
			big_rect.set({
				fill: 'green'
			});
			break;
		case "hub":
			big_rect.set({
				fill: 'red'
			});
			break;
	}

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
		'type': type,
		'ip': '',
		'masque': ''
	};

	//Create a port in order to add in a GroupStation
	create_ports(work_station, nb_port);

	create_name(work_station);

	//Giving permission not to resize, rotate... object selected
	station.hasControls = false;
	//Adding a distance of a rectangle and the highlight around it
	station.padding = 2;

	tab_workstation.push(work_station);
	canvas.add(station);
}

function delete_workStation(station)
 {
	for(var i = 0; i < tab_workstation.length; i++)
	{
		if(tab_workstation[i] == station)
			tab_workstation.splice(i,1);
	}
 }