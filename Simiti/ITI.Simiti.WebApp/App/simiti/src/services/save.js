import simu from '../services/VariaG.js';
import helper from '../services/helper.js';

export default {
	save(tabWorkstation, tabCable){
		var cables = save_all_cables(tabCable);
		var workstations = save_all_workstations(tabWorkstation);
		var save_data = cables + workstations;
		return save_data;
	}
}

function save_all_workstations(tabWorkstation) {
	var tab_workstation_saved = '';
	var new_workstation;
	var type;
	for (var i = 0; i < tabWorkstation.length; i++) {
		switch (tabWorkstation[i].type) {
			case "switch":
				type = "s";
				break;
			case "post":
				type = "p";
				break;
			case "hub":
				type = "h";
				break;
		}

		new_workstation =
			"< " + tabWorkstation[i].id +
			" " + type +
			" " + tabWorkstation[i].nb_port +
			" " + Math.round(tabWorkstation[i].obj.left) +
			" " + Math.round(tabWorkstation[i].obj.top) +
			" >";
		tab_workstation_saved += new_workstation;
	}
	tab_workstation_saved = "w" + tab_workstation_saved;
	return tab_workstation_saved;
}

function save_all_cables(tabCable) {
	var tab_cable_saved = '';
	var new_cable;
	var type;
	for (var i = 0; i < tabCable.length; i++) {
		new_cable =
			"< " + tabCable[i].type +
			" " + tabCable[i].object_1.id +
			" " + tabCable[i].object_2.id +
			" " + tabCable[i].obj_1_port_nb +
			" " + tabCable[i].obj_2_port_nb +
			" >";
		tab_cable_saved += new_cable;
	}
	tab_cable_saved = "c" + tab_cable_saved;
	return tab_cable_saved;
}