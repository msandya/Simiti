// look if x is in tab
function is_in(x, tab) {
	for (var i = 0; i < tab.length; i++) {
		if (x == tab[i])
			return true;
	}
	return false;
}

//Checking if the mouse is inside of the Port or not
function is_inside(x, y, port, station) {
	var aux = 25;
	if (station.ports.length > 3) {
		aux = (50 + ((station.ports.length - 3) * (PORT_SIZE + 3))) / 2;
	}
	return (x >= station.obj.left + port.rect.left + aux && x <= station.obj.left + port.rect.left + PORT_SIZE + aux &&
		y >= station.obj.top + port.rect.top + 25 && y <= station.obj.top + port.rect.top + PORT_SIZE + 25);
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

//take in parameter type of object 1,2 and cable
//0 = torsadé droit
//1 = torsadé croisée
//2 = cable coaxial
//3 = ligne télécom
function good_cable(type_1, type_2, type_cable) {
	//If menu_selected = 5 (Ethernet)
	if ((type_cable == 1 && type_1 == type_2) ||
		(type_cable == 2 && type_1 == type_2 && type_1 == "post") ||
		(type_cable == 0 && (type_1 == "post" || type_2 == "post") && type_1 != type_2) ||
		(type_cable == 1 && ((type_1 == "hub" && type_2 == "switch") || (type_2 == "hub" && type_1 == "switch"))))
		return true;
	return false;
}

function get_linked_port(work_station, port_nb) {
	for (var i = 0; i < tab_cable.length; i++) {
		if (tab_cable[i].object_1 == work_station && port_nb == tab_cable[i].obj_1_port_nb) {
			var res = {
				'port': tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb],
				'obj': tab_cable[i].object_2,
				'cable': tab_cable[i],
				'nb_port': tab_cable[i].obj_2_port_nb
			};
			return res;
		} else if (tab_cable[i].object_2 == work_station && port_nb == tab_cable[i].obj_2_port_nb) {
			var res = {
				'port': tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb],
				'obj': tab_cable[i].object_1,
				'cable': tab_cable[i],
				'nb_port': tab_cable[i].obj_1_port_nb
			};
			return res;
		}
	}
	alert('port not linked');
	return null;
}

function apply_color(obj, type, is_line) {
	switch (type) {
		case 0:
			if (is_line)
				obj.set({
					stroke: color_0,
					strokeDashArray: [1, 0]
				});
			else
				obj.set({
					fill: color_0
				});
			break;
		case 1:
			if (is_line)
				obj.set({
					stroke: color_1,
					strokeDashArray: [2, 5]
				});
			else
				obj.set({
					fill: color_1
				});
			break;
		default:
			if (is_line)
				obj.set({
					stroke: color_2,
					strokeDashArray: [10, 5]
				});
			else
				obj.set({
					fill: color_2
				});
			break;
	}
}