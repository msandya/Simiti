//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Menu----------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

menu_selected = 0;
text = "";
trame_type = 0;

/*
document.oncontextmenu = function() {
	alert(trame_type);
	return false;
}
*/


//document.getElementById('un').addEventListener("click", menu, false);
//document.getElementById('deux').addEventListener("click", menu, false);
/*
document.getElementById('Ethernet').addEventListener("click", menu, false);



function menu(e) {
	var select = this;

	if (document.getElementById("menu") != null) {
		document.getElementById("menu").remove();
	}

	var menu = document.createElement('div');
	menu.className = 'menu';
	menu.id = 'menu';
	menu.style.left = select.offsetLeft + "px";
	menu.style.top = (select.offsetTop + 20) + "px";
	document.getElementsByTagName('body')[0].appendChild(menu);

	if (select.id == "un") {
		var bt1 = document.createElement('button');
		bt1.name = "1";
		bt1.innerHTML = "Nouveau";
		menu.appendChild(bt1);
		menu.appendChild(document.createElement('br'));
		bt1.addEventListener("click", click, false);
		var bt2 = document.createElement('button');
		bt2.name = "2";
		bt2.innerHTML = "2";
		menu.appendChild(bt2);
		menu.appendChild(document.createElement('br'));
		bt2.addEventListener("click", click, false);
		var bt3 = document.createElement('button');
		bt3.name = "3";
		bt3.innerHTML = "3";
		menu.appendChild(bt3);
		menu.appendChild(document.createElement('br'));
		bt3.addEventListener("click", click, false);
	} else if (select.id == "deux") {
		var bt1 = document.createElement('button');
		bt1.name = "4";
		bt1.innerHTML = "Conception";
		menu.appendChild(bt1);
		menu.appendChild(document.createElement('br'));
		bt1.addEventListener("click", click, false);
		var bt2 = document.createElement('button');
		bt2.name = "5";
		bt2.innerHTML = "Ethernet";
		menu.appendChild(bt2);
		menu.appendChild(document.createElement('br'));
		bt2.addEventListener("click", click, false);
		var bt3 = document.createElement('button');
		bt3.name = "6";
		bt3.innerHTML = "IP";
		menu.appendChild(bt3);
		menu.appendChild(document.createElement('br'));
		bt3.addEventListener("click", click, false);
		var bt4 = document.createElement('button');
		bt4.name = "7";
		bt4.innerHTML = "Transport";
		menu.appendChild(bt4);
		menu.appendChild(document.createElement('br'));
		bt4.addEventListener("click", click, false);
	}
}

*/



function click(e) {
	var select = this;
	selected = parseInt(select.name);
	select.parentNode.remove();
}

//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Fuction()-----------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

var canvas = new fabric.Canvas('c', {
	selection: false
});

var line, isDown, rect;

window.addEventListener('keydown', this.check, false);

var PORT_SIZE = 12;
var selected = 0;
var tab_workstation = [];
var tab_workstation_saved = '';
var tab_cable = [];
var tab_cable_saved = '';
var last_object;
var last_object_port_nb;
var line_creation = 0;
var tab_images = [];
var current;

var color_0 = 'black';
var color_1 = 'red';
var color_2 = 'green';

var buttons = [];
var buttons_selected = [];

var start = 0;
var nb_workstation = 0;
var y = 0;

var WorkStationType = 0;

var tab_buttons = [];

//Create rectangle
function rectangle(x, y, color) {
	rect = new fabric.Rect({
		width: 100,
		height: 50,
		left: x,
		top: y,
		stroke: 'black',
		strokeWidth: 1,
		fill: color,
		selectable: false
	});
	canvas.add(rect);
}

function add_image(nameImage, imageURL) {
	var inserted = false;

	for (var i = 0; i < tab_images.length; i++) {
		if (tab_images[i].name_image == nameImage) {
			inserted = true;
		}
	}

	if (inserted == true) {
		alert("This image is inserted.");
	} else {
		var image = {
			'name_image': nameImage,
			'image': imageURL
		}
		tab_images.push(image);
		//alert("Inserted successfully.");
	}
}

function get_image(nameImage) {
	var result;
	for (var i = 0; i < tab_images.length; i++) {
		if (nameImage == tab_images[i].name_image) {
			result = tab_images[i];
		}
	}
	if (result == null) {
		alert("Error: Image can not be found.");
	} else {
		return result;
	}
}

function add_button(buttonImage, nameButton) {
	var button_add = {
		'button_image': buttonImage,
		'name_button': nameButton
	}
	tab_buttons.push(button_add);
}

function create_button(image, x, y, normal_button) {
	var button = new fabric.Image.fromURL(image, function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = x;
		img.top = y;
		img.selectable = false;
		canvas.add(img);

		if (normal_button)
			buttons.push(img);
		else
			buttons_selected.push(img);
	});
}

function remove_button(image) {
	var button = new fabric.Image.fromURL(image, function (img) {
		canvas.remove(img);
	});
	/*for (var i = 0; i < tab_buttons.length; i++) {
		if (buttonName == tab_buttons[i].name_button) {
			canvas.remove(tab_buttons[i].button_image);
			return 1;
		}
	}*/
}

function bring_front_buttons() {
	for (var i = 0; i < buttons.length; i++) {
		canvas.bringToFront(buttons[i]);
	}
}

//Create 3 big rectangles to create the WorkStation
function init() {
	create_button('Images/mousepointerbutton_clicked.png', 10, 10, false);
	create_button('Images/cablebutton_clicked.png', 120, 10, false);
	create_button('Images/postbutton_clicked.png', 230, 10, false);
	create_button('Images/switchbutton_clicked.png', 340, 10, false);
	create_button('Images/hubbutton_clicked.png', 450, 10, false);

	create_button('Images/mousepointerbutton.png', 10, 10, true);
	create_button('Images/cablebutton.png', 120, 10, true);
	create_button('Images/postbutton.png', 230, 10, true);
	create_button('Images/switchbutton.png', 340, 10, true);
	create_button('Images/hubbutton.png', 450, 10, true);

	bring_front_buttons();
}

function search_work_station(id) {
	for (var i = 0; i < tab_workstation.length; i++) {
		if (tab_workstation[i].id == id) {
			return tab_workstation[i];
		}
	}
}

//Save
function save_all_workstations(tabWorkstation) {
	if (tab_workstation_saved.charAt[0] != '') {
		tab_workstation_saved = "";
	}
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
}

function save_all_cables(tabCable) {
	if (tab_cable_saved.charAt[0] != '') {
		tab_cable_saved = "";
	}

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
}

//load
function load_all_workstations(tab) {
	var i = 0;
	while (i <= tab.length) {
		if (tab[i] == "<") {
			var id = '';
			var type = '';
			var nb_port = '';
			var left = '';
			var top = '';

			i = i + 2;
			while (tab[i] != ' ') {
				id += tab[i];
				i++;
			}

			i = i + 1;
			switch (tab[i]) {
				case "s":
					type = "switch";
					break;
				case "p":
					type = "post";
					break;
				case "h":
					type = "hub";
					break;
			}

			i = i + 2;
			while (tab[i] != ' ') {
				nb_port += tab[i];
				i++;
			}
			i++;
			while (tab[i] != ' ') {
				left += +tab[i];
				i++;
			}
			i++;
			while (tab[i] != ' ') {
				top += tab[i];
				i++;
			}
			create_work_station(Number(id), Number(left), Number(top), Number(nb_port), type);
		}
		i++;
	}
}

function load_all_cables(tab) {
	var i = 0;
	while (i <= tab.length) {
		if (tab[i] == "<") {
			var type = '';
			var obj1;
			var obj2;
			var nb_obj1_port = '';
			var nb_obj2_port = '';

			i += 2;
			type = type + tab[i];
			i += 2;
			var obj1_id = ''
			while (tab[i] != ' ') {
				obj1_id += tab[i];
				i++;
			}
			obj1 = search_work_station(Number(obj1_id));
			i++;
			var obj2_id = ''
			while (tab[i] != ' ') {
				obj2_id += tab[i];
				i++;
			}
			obj2 = search_work_station(Number(obj2_id));
			i++;
			while (tab[i] != ' ') {
				nb_obj1_port += tab[i];
				i++;
			}
			i++;
			while (tab[i] != ' ') {
				nb_obj2_port += tab[i];
				i++;
			}

			console.log(type);
			console.log(obj1_id);
			console.log(obj2_id);
			console.log(nb_obj1_port);
			console.log(nb_obj2_port);
		}
		i++;
	}
}

//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Main()--------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

init();

function check(o) {
	if (o.which == 46) // 46 = suppr
	{
		var s = null;
		if (canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < tab_workstation.length; i++) {
				if (canvas.getActiveObject() == tab_workstation[i].obj)
					s = tab_workstation[i];
			}
			delete_workStation(s);
		}

		for (var i = 0; i < tab_cable.length; i++) {
			if (tab_cable[i].object_1 != null && tab_cable[i].object_2 != null) {
				if (canvas.getActiveObject() == tab_cable[i].object_1.obj || canvas.getActiveObject() == tab_cable[i].object_2.obj) {
					delete_cable(tab_cable[i]);
					//tab_cable.splice(i, 1);
				}
			}
		}

		var activeObject = canvas.getActiveObject(),
			activeGroup = canvas.getActiveGroup();
		if (activeObject) {
			//if (confirm('Are you sure ?')) {
			canvas.remove(activeObject);
			//}
		} else if (activeGroup) {
			var objectsInGroup = activeGroup.getObjects();
			canvas.discardActiveGroup();
			objectsInGroup.forEach(function (object) {
				canvas.remove(object);
			});
		}
	} else if (o.which == 13) // 13 = enter
	{
		simulation();
	} else if (o.which == 67) // 67 = c 
	{

		for (var i = 0; i < tab_workstation.length; i++) {
			console.log("id: " + tab_workstation[i].id + " checked:" + tab_workstation[i].checked);
			//tab_workstation[i].checked = 1;
		}

		save_all_workstations(tab_workstation);
		save_all_cables(tab_cable);
		console.log(tab_workstation_saved);
		console.log(tab_cable_saved);
		//var ex_workstation = "< 0 s 6 387 117 >< 1 s 6 501 116 >< 2 s 6 605 118 >< 3 p 1 714 115 >< 4 p 1 784 112 >< 5 h 3 863 114 >< 6 h 3 942 113 >";
		//load_all_workstations(ex_workstation);
		//var ex_cables = "< 0 2 0 0 0 >< 0 0 1 3 0 >< 0 0 3 5 0 >";
		//load_all_cables(ex_cables);

	} else if (o.which == 32) // 32 = space
	{
		o.preventDefault();
		var s = null;
		if (canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < tab_workstation.length; i++) {
				if (canvas.getActiveObject() == tab_workstation[i].obj)
					s = tab_workstation[i];
			}
		} else
			s = tab_workstation[0];

		var options = document.createElement("div");
		options.className = "options";
		options.style = "left: " + s.obj.left + "px; top: " + s.obj.top + "px;";
		document.body.appendChild(options);

		var broad = document.createElement("button");
		broad.className = "btn btn-primary btn-xs";
		broad.innerHTML = "Broadcast";
		broad.addEventListener("click", broadcast);
		options.appendChild(broad);

		var uni = document.createElement("button");
		uni.className = "btn btn-primary btn-xs";
		uni.innerHTML = "Unicast";
		uni.addEventListener("click", unicast);
		options.appendChild(uni);

		if (trame_type == 3) {
			br = document.createElement("br");
			options.appendChild(br);
			var input = document.createElement("input");
			input.type = "text";
			input.placeholder = "Taille de la trame";
			input.id = "trameSize";
			options.appendChild(input);
		}

		function broadcast() {
			simulate(s, null);
			alert(document.getElementById("trameSize").value);
			options.remove();
		}

		function unicast() {
			var targetid = prompt("Select target id");
			if (targetid != "") {
				simulate(s, targetid);
			}
			alert(document.getElementById("trameSize").value);
			options.remove();
		}

	} else if (o.which == 65) // 65 = a
	{
		o.preventDefault();

		var s = null;
		if (canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < tab_workstation.length; i++) {
				if (canvas.getActiveObject() == tab_workstation[i].obj)
					s = tab_workstation[i];
			}
		} else
			s = tab_workstation[0];

		document.getElementById("ipconfig").style.display = "block";
		document.getElementById("mavar2").value = s.ip;
		document.getElementById("mavar3").value = s.masque;

		function saveip() {
			s.ip = document.getElementById("mavar2").value;
			s.masque = document.getElementById("mavar3").value;
			document.getElementById("saveip").removeEventListener("click", saveip);
		}

		document.getElementById("saveip").addEventListener("click", saveip);
	}
}

canvas.on('selection:created', function (o) {
	o.target.set({
		lockScalingX: true,
		lockScalingY: true,
		hasControls: false
	});
});

canvas.on('mouse:down', function (o) {
	isDown = true;
	var pointer = canvas.getPointer(o.e);
	var points = [pointer.x, pointer.y, pointer.x, pointer.y];

	if (pointer.x >= 10 && pointer.x <= 110 && pointer.y <= 60 && pointer.y >= 10) {
		/*rectangle(10, 10, 'black');
		rectangle(120, 10, 'white');
		rectangle(230, 10, 'white');*/
		bring_front_buttons();
		for (var i = 0; i < buttons_selected.length; i++) {
			if (buttons_selected[i].left == 10)
				canvas.bringToFront(buttons_selected[i]);
		}
		selected = 0;
		canvas.selection = false;
	} else if (pointer.x >= 120 && pointer.x <= 220 && pointer.y <= 60 && pointer.y >= 10) {
		bring_front_buttons();
		for (var i = 0; i < buttons_selected.length; i++) {
			if (buttons_selected[i].left == 120)
				canvas.bringToFront(buttons_selected[i]);
		}
		selected = 1;
		canvas.selection = false;
	} else if (pointer.x >= 230 && pointer.x <= 330 && pointer.y <= 60 && pointer.y >= 10) {
		bring_front_buttons();
		for (var i = 0; i < buttons_selected.length; i++) {
			if (buttons_selected[i].left == 230)
				canvas.bringToFront(buttons_selected[i]);
		}
		//canvas.bringToFront(buttons_selected[2]);
		selected = 2;
		canvas.selection = false;
	} else if (pointer.x >= 340 && pointer.x <= 440 && pointer.y <= 60 && pointer.y >= 10) {
		bring_front_buttons();
		for (var i = 0; i < buttons_selected.length; i++) {
			if (buttons_selected[i].left == 340)
				canvas.bringToFront(buttons_selected[i]);
		}
		selected = 3;
		canvas.selection = false;
	} else if (pointer.x >= 450 && pointer.x <= 550 && pointer.y <= 60 && pointer.y >= 10) {
		bring_front_buttons();
		for (var i = 0; i < buttons_selected.length; i++) {
			if (buttons_selected[i].left == 450)
				canvas.bringToFront(buttons_selected[i]);
		}
		selected = 4;
		canvas.selection = false;
	} else if (selected == 0) {
		var pointer = canvas.getPointer(o.e);

		for (var i = 0; i < tab_workstation.length; i++) {
			for (var j = 0; j < tab_workstation[i].ports.length; j++) {
				if (is_inside(pointer.x, pointer.y, tab_workstation[i].ports[j], tab_workstation[i])) {
					tab_workstation[i].ports[j].type = (tab_workstation[i].ports[j].type + 1) % 3;

					if (tab_workstation[i].ports[j].used) {
						for (var cab = 0; cab < tab_cable.length; cab++) {
							if (tab_cable[cab].object_1 == tab_workstation[i]) {
								if (j == tab_cable[cab].obj_1_port_nb) {
									tab_cable[cab].type = tab_workstation[i].ports[j].type;
									tab_cable[cab].object_2.ports[tab_cable[cab].obj_2_port_nb].type = tab_workstation[i].ports[j].type;
									apply_color(tab_cable[cab].l, tab_cable[cab].type, true);
									apply_color(tab_cable[cab].object_2.ports[tab_cable[cab].obj_2_port_nb].rect, tab_cable[cab].type, false);
									apply_color(tab_cable[cab].object_1.ports[tab_cable[cab].obj_1_port_nb].rect, tab_cable[cab].type, false);
								}
							}
							if (tab_cable[cab].object_2 == tab_workstation[i]) {
								if (j == tab_cable[cab].obj_2_port_nb) {
									tab_cable[cab].type = tab_workstation[i].ports[j].type;
									tab_cable[cab].object_1.ports[tab_cable[cab].obj_1_port_nb].type = tab_workstation[i].ports[j].type;
									apply_color(tab_cable[cab].l, tab_cable[cab].type, true);
									apply_color(tab_cable[cab].object_2.ports[tab_cable[cab].obj_2_port_nb].rect, tab_cable[cab].type, false);
									apply_color(tab_cable[cab].object_1.ports[tab_cable[cab].obj_1_port_nb].rect, tab_cable[cab].type, false);
								}
							}
						}
					}
				}
			}
		}
	} else if (selected == 1) {
		if (line_creation == 0 && canvas.getActiveObject() != null) {
			var actual_obj = null;
			var points_line;

			for (var i = 0; actual_obj == null && i < tab_workstation.length; i++) {
				if (canvas.getActiveObject() == tab_workstation[i].obj) {
					actual_obj = tab_workstation[i];
				}
			}

			for (var j = 0; j < actual_obj.ports.length; j++) {
				if (is_inside(pointer.x, pointer.y, actual_obj.ports[j], actual_obj)) {
					if (actual_obj.ports[j].used) {
						for (var cab = 0; cab < tab_cable.length; cab++) {
							if (tab_cable[cab].object_1 == actual_obj && tab_cable[cab].obj_1_port_nb == j) {
								actual_obj = tab_cable[cab].object_2;
								j = tab_cable[cab].obj_2_port_nb;
								delete_cable(tab_cable[cab]);
							} else if (tab_cable[cab].object_2 == actual_obj && tab_cable[cab].obj_2_port_nb == j) {
								actual_obj = tab_cable[cab].object_1;
								j = tab_cable[cab].obj_1_port_nb;
								delete_cable(tab_cable[cab]);
							}
						}
					}

					var aux = 26;
					if (actual_obj.ports.length > 3)
						aux = ((50 + ((actual_obj.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;

					points_line = [actual_obj.obj.left + actual_obj.ports[j].rect.left + aux + PORT_SIZE / 2,
						actual_obj.obj.top + actual_obj.ports[j].rect.top + 26 + PORT_SIZE / 2, pointer.x, pointer.y
					];
					last_object_port_nb = j;
				}
			}

			if (points_line != null) {
				line = new fabric.Line(points_line, {
					strokeWidth: 1,
					fill: 'black',
					originX: 'center',
					originY: 'center',
					selectable: false
				});

				apply_color(line, actual_obj.ports[last_object_port_nb].type, true); // true if it's for line

				canvas.add(line);
				line_creation = 1;
				last_object = actual_obj;
			}
		} else if (line_creation == 1) {
			line_creation = 0;
			if (canvas.getActiveObject() != null) {
				var matched = false;
				var actual_obj;
				var object_port_nb;

				for (var i = 0; i < tab_workstation.length; i++) {
					if (canvas.getActiveObject() == tab_workstation[i].obj) {
						actual_obj = tab_workstation[i];
					}
				}

				for (var j = 0; !matched && j < actual_obj.ports.length; j++) {
					if (is_inside(pointer.x, pointer.y, actual_obj.ports[j], actual_obj)) {
						var aux = 26;
						if (actual_obj.ports.length > 3) {
							aux = ((50 + ((actual_obj.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;
						}

						line.set({
							x2: actual_obj.obj.left + actual_obj.ports[j].rect.left + aux + PORT_SIZE / 2,
							y2: actual_obj.obj.top + actual_obj.ports[j].rect.top + 26 + PORT_SIZE / 2
						});
						object_port_nb = j;
						matched = true;
					}
				}

				if (matched) {
					create_cable(line, last_object, actual_obj, last_object_port_nb, object_port_nb, last_object.ports[last_object_port_nb].type);
					actual_obj.ports[object_port_nb].type = last_object.ports[last_object_port_nb].type;
				} else
					line.remove();
			} else {
				line.remove();
			}
		}
	} else if (selected == 2) {
		create_work_station(nb_workstation, pointer.x - 25, pointer.y - 25, 1, "post");
		nb_workstation++;
	} else if (selected == 3) {
		create_work_station(nb_workstation, pointer.x - 25, pointer.y - 25, 3, "hub");
		nb_workstation++;
	} else if (selected == 4) {
		create_work_station(nb_workstation, pointer.x - 25, pointer.y - 25, 6, "switch");
		nb_workstation++;
	}
	canvas.renderAll();
});

canvas.on('mouse:move', function (o) {

	//if (!isDown) return;
	var pointer = canvas.getPointer(o.e);

	for (var i = 0; i < tab_workstation.length; i++) {
		for (var j = 0; j < tab_workstation[i].ports.length; j++) {
			if (is_inside(pointer.x, pointer.y, tab_workstation[i].ports[j], tab_workstation[i]) || tab_workstation[i].ports[j].used) {
				switch (tab_workstation[i].ports[j].type) {
					case 0:
						tab_workstation[i].ports[j].rect.set({
							fill: color_0
						});
						break;
					case 1:
						tab_workstation[i].ports[j].rect.set({
							fill: color_1
						});
						break;
					default:
						tab_workstation[i].ports[j].rect.set({
							fill: color_2
						});
						break;
				}
			} else {
				tab_workstation[i].ports[j].rect.set({
					fill: 'white'
				});
			}
		}
	}

	if (selected == 1 && canvas.getActiveObject() != null && line_creation == 1) {
		line.set({
			x2: pointer.x,
			y2: pointer.y
		});
	}

	for (var i = 0; i < tab_cable.length; i++) {
		if (tab_cable[i].object_1 != null) {
			var aux1 = 26;
			if (tab_cable[i].object_1.ports.length > 3)
				aux1 = ((50 + ((tab_cable[i].object_1.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;
			var aux2 = 26
			if (tab_cable[i].object_2.ports.length > 3)
				aux2 = ((50 + ((tab_cable[i].object_2.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;

			tab_cable[i].l.set({
				x1: tab_cable[i].object_1.obj.left + tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb].rect.left + aux1 + PORT_SIZE / 2,
				y1: tab_cable[i].object_1.obj.top + tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb].rect.top + 26 + PORT_SIZE / 2,
				x2: tab_cable[i].object_2.obj.left + tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb].rect.left + aux2 + PORT_SIZE / 2,
				y2: tab_cable[i].object_2.obj.top + tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb].rect.top + 26 + PORT_SIZE / 2
			});

			apply_color(tab_cable[i].l, tab_cable[i].type, true); // true if it's for line
		}
	}

	var WorkStation = [];
	for (var j = 0; j < tab_workstation.length; j++) {
		var aux = {
			id: tab_workstation[j].id,
			type: tab_workstation[j].type
		};
		WorkStation.push(aux);
	}
	displayArrayObjects(WorkStation);

	canvas.renderAll();
});

canvas.on('mouse:up', function (o) {
	isDown = false;
});

function displayArrayObjects(WorkStation) {
	var len = WorkStation.length,
		text = "";

	for (var i = 0; i < len; i++) {
		var myObject = WorkStation[i];

		for (var x in myObject) {
			text += (x + ": " + myObject[x] + " ");
		}

		if (tab_workstation[i].checked == true) {
			var checkbox = '<input type="checkbox" id="' + WorkStation[i].id + '"checked/>';
		} else
			var checkbox = '<input type="checkbox" id="' + WorkStation[i].id + '"/>';


		text += checkbox + "<br/>";


		var check = document.getElementById(WorkStation[i].id);

		if (check != null) {
			if (check.checked)
				tab_workstation[i].checked = true;
			/*
			else
			tab_workstation[i].checked = false;
			*/
		}

	}

	document.getElementById("message").innerHTML = text;
}