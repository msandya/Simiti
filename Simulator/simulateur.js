//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Menu----------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

menu_selected = 0;
text = "";
/*
document.oncontextmenu = function() {
	alert(text);
	return false;
}*/

document.getElementById('un').addEventListener("click", menu, false);
document.getElementById('deux').addEventListener("click", menu, false);

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
var tab_cable = [];
var last_object;
var last_object_port_nb;
var line_creation = 0;
var tab_images = [];

var color_0 = 'black';
var color_1 = 'red';
var color_2 = 'green';

var start = 0;
var nb_workstation = 0;
var y = 0;

var WorkStationType = 0;

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


//Checking if the mouse is inside of the Port or not
function is_inside(x, y, port, station) {
	return (x >= station.obj.left + port.rect.left + 25 && x <= station.obj.left + port.rect.left + PORT_SIZE + 25 &&
		y >= station.obj.top + port.rect.top + 25 && y <= station.obj.top + port.rect.top + PORT_SIZE + 25);
}

//Create 3 big rectangles to create the WorkStation
function init() {
	var mousepointerbutton = new fabric.Image.fromURL('mousepointerbutton.png', function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = 10;
		img.top = 10;
		img.filters.push(new fabric.Image.filters.Grayscale());
		img.selectable = false;
		canvas.add(img);
	});
	add_image("mousepointerbutton", mousepointerbutton);
	var cablebutton = new fabric.Image.fromURL('cablebutton.png', function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = 120;
		img.top = 10;
		img.filters.push(new fabric.Image.filters.Grayscale());
		img.selectable = false;
		canvas.add(img);
	});
	add_image("cablebutton", cablebutton);
	var postbutton = new fabric.Image.fromURL('postbutton.png', function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = 230;
		img.top = 10;
		img.filters.push(new fabric.Image.filters.Grayscale());
		img.selectable = false;
		canvas.add(img);
	});
	add_image("postbutton", postbutton);
	var switchbutton = new fabric.Image.fromURL('switchbutton.png', function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = 340;
		img.top = 10;
		img.selectable = false;
		canvas.add(img);
	});
	add_image("switchbutton", switchbutton);
	var hubbutton = new fabric.Image.fromURL('hubbutton.png', function (img) {
		img.setWidth(100);
		img.setHeight(50);
		img.left = 450;
		img.top = 10;
		img.selectable = false;
		canvas.add(img);
	});
	add_image("hubbutton", hubbutton);
}

//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------Main()--------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

init();

function check(o) {
	if (o.which == 46) // 46 = suppr
	{
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
		WorkStationType = (WorkStationType + 1) % 3;
		//tab_workstation[0].type = "switch";
	} else if (o.which == 32) // 32 = space
	{
		var s = null;
		if (canvas.getActiveObject() != null) {
			for (var i = 0; s == null && i < tab_workstation.length; i++) {
				if (canvas.getActiveObject() == tab_workstation[i].obj)
					s = tab_workstation[i];
			}
		} else
			s = tab_workstation[0];

		simulate(s);
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
		rectangle(10, 10, 'black');
		rectangle(120, 10, 'white');
		rectangle(230, 10, 'white');
		selected = 0;
		canvas.selection = false;
	} else if (pointer.x >= 120 && pointer.x <= 220 && pointer.y <= 60 && pointer.y >= 10) {
		rectangle(10, 10, 'white');
		rectangle(120, 10, 'black');
		rectangle(230, 10, 'white');
		selected = 1;
		canvas.selection = false;
	} else if (pointer.x >= 230 && pointer.x <= 330 && pointer.y <= 60 && pointer.y >= 10) {
		rectangle(10, 10, 'white');
		rectangle(120, 10, 'white');
		rectangle(230, 10, 'black');
		selected = 2;
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
								}
							}
							if (tab_cable[cab].object_2 == tab_workstation[i]) {
								if (j == tab_cable[cab].obj_2_port_nb) {
									tab_cable[cab].type = tab_workstation[i].ports[j].type;
									tab_cable[cab].object_1.ports[tab_cable[cab].obj_1_port_nb].type = tab_workstation[i].ports[j].type;
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

					points_line = [actual_obj.obj.left + actual_obj.ports[j].rect.left + 26 + PORT_SIZE / 2,
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

				switch (actual_obj.ports[last_object_port_nb].type) {
					case 0:
						line.set({
							stroke: color_0
						});
						break;
					case 1:
						line.set({
							stroke: color_1
						});
						break;
					default:
						line.set({
							stroke: color_2
						});
						break;
				}

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
						line.set({
							x2: actual_obj.obj.left + actual_obj.ports[j].rect.left + 26 + PORT_SIZE / 2,
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
		var type = "post";

		if (WorkStationType == 0)
			type = "switch";
		else if (WorkStationType == 1)
			type = "hub";

		create_work_station(nb_workstation, pointer.x - 25, pointer.y - 25, 3, false, type);
		nb_workstation++;
	}
});

canvas.on('mouse:move', function (o) {

	//if (!isDown) return;
	var pointer = canvas.getPointer(o.e);

	for (var i = 0; i < tab_workstation.length; i++) {
		switch (tab_workstation[i].type) {
			case "switch":
				tab_workstation[i].obj.set({
					fill: 'blue'
				});
				break;

			case "post":
				tab_workstation[i].obj.set({
					fill: 'green'
				});
				break;

			case "hub":
				tab_workstation[i].obj.set({
					fill: 'red'
				});
				break;
		}

	}

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
			tab_cable[i].l.set({
				x1: tab_cable[i].object_1.obj.left + tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb].rect.left + 26 + PORT_SIZE / 2,
				y1: tab_cable[i].object_1.obj.top + tab_cable[i].object_1.ports[tab_cable[i].obj_1_port_nb].rect.top + 26 + PORT_SIZE / 2,
				x2: tab_cable[i].object_2.obj.left + tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb].rect.left + 26 + PORT_SIZE / 2,
				y2: tab_cable[i].object_2.obj.top + tab_cable[i].object_2.ports[tab_cable[i].obj_2_port_nb].rect.top + 26 + PORT_SIZE / 2
			});
			switch (tab_cable[i].type) {
				case 0:
					tab_cable[i].l.set({
						stroke: color_0
					});
					tab_cable[i].l.set({
						strokeDashArray: [1, 0]
					});
					break;
				case 1:
					tab_cable[i].l.set({
						stroke: color_1
					});
					tab_cable[i].l.set({
						strokeDashArray: [2, 5]
					});
					break;
				default:
					tab_cable[i].l.set({
						stroke: color_2
					});
					tab_cable[i].l.set({
						strokeDashArray: [10, 5]
					});
					break;
			}
		}
	}

	canvas.renderAll();
});

canvas.on('mouse:up', function (o) {
	isDown = false;
});