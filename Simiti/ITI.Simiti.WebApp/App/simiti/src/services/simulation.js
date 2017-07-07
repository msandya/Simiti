import simu from '../services/VariaG.js';
import helper from '../services/helper.js';
import simulateur from '../services/Simulateur.js';

export default {
	simulate(s, target, request_size) {
		var h = 0;
		var marked = [];
		var next = null;

		var tab_vect = [];

		var path = [];

		rec_simulation(s, h, marked, tab_vect, null, null);

		for (var i = 0; i < tab_vect.length; i++) {
			if (tab_vect[i].obj2.id == target) {
				var vect = tab_vect[i];
				while (vect.father != null) {
					path.push(vect.obj2.id);
					vect = vect.father;
				}
				path.push(vect.obj2.id);
				path.push(vect.obj1.id);
			}
		}

		if (target != null && path.length != 0) {
			tab_vect = [];
			rec_simulation(s, h, [], tab_vect, null, path);
		}

		set_ttl(s, tab_vect);

		searche_and_send_from_station(s.id, s.id, tab_vect, request_size, target);
	},

	call_station_progress(workStationChecked, portOriginal, postIdOriginal, tabVect, workstationType, workstationId, topPos, leftPos, request_size, target)
	{
		station_progress(workStationChecked, portOriginal, postIdOriginal, tabVect, workstationType, workstationId, topPos, leftPos, request_size, target);
	}
}

function movement_package(rect, left, top) {
	rect.animate('left',
		left, {
			onChange: this.canvas.renderAll.bind(this.canvas),
			duration: 1000,
			onComplete: function () {
				rect.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});
	rect.animate('top',
		top, {
			onChange: this.canvas.renderAll.bind(this.canvas),
			duration: 1000,
			onComplete: function () {
				rect.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});
}

function TTL_status(id) {
	var status;
	switch (id) {
		case 0:
			status = "Maximum";
			break;
		case 1:
			status = "Élevé";
			break;
		case 2:
			status = "Moyen";
			break;
		case 3:
			status = "Faible";
			break;
		case 4:
			status = "Nul";
			break;
	}
	return status;
}

function station_progress(workStationChecked, portOriginal, postIdOriginal, tabVect, workstationType, workstationId, topPos, leftPos, request_size, target) {
	var top = (topPos + 60) + "px";
	var left = (leftPos) + "px";
	var progress_list = [];
	var progress_detail_list = [];

	var progress_list_index = 0;
	var progress_detail_list_index = 0;

	var workstation_type = "";

	var port_used_id = portOriginal;

	var dest_text = "";
	if (target != null) {
		dest_text = "p-" + target;
	} else {
		dest_text = "BCAST";
	}

	var post_text = "p-" + postIdOriginal;
	var count = 0;

	var list_test = [
		"element 1",
		"element 2",
		"element 3",
		"element 4",
		"element 5",
		"element 6"
	]

	var progress_switch = [
		"Examiner mac émetteur",
		"Examiner le port d’origine",
		"Chercher émet. ds mac/port",
		"Réinitialiser TTL émetteur",
		"Sélect. dest. ds mac/port",
		"Réémettre sur les autres ports",
		"Fin de la demonstration"
	]

	var progress_switch_detail = [
		"Post émetteur: p-" + postIdOriginal,
		"Port d'origine:" + portOriginal,
		"Port de l'émetteur connu et correct",
		"TTL réinitialisé",
		"",
		"",
		""
	]
	if (target != null) {
		progress_switch_detail[4] = "Destinataire port " + target;
		progress_switch_detail[5] = "Réémission autres ports: " + target;
	} else {
		progress_switch_detail[4] = "Adresse de broadcast";
		progress_switch_detail[5] = "Réémission autres ports actifs";
	}

	var progress_post = [
		"Examiner le destinataire",
		"Traiter la trame",
		"Fin de la demonstration"
	]
	var progress_post_detail = [
		"",
		"Transmettre à la couche concernée",
		""
	]
	if (target != null) {
		progress_post_detail[0] = "Destinataire: p-" + target;
	} else {
		progress_post_detail[0] = "Destinataire: BCAST";
	}

	var progress_hub = [
		"Examiner le port d'origine",
		"Répéter sur les autres ports",
		"Fin de la démonstration"
	]
	var progress_hub_detail = [
		"Port d'origine" + portOriginal,
		"Ports actifs uniquement",
		""
	]

	switch (workstationType) {
		case "switch":
			progress_list = progress_switch;
			progress_detail_list = progress_switch_detail;
			workstation_type = "Switch";
			break;
		case "post":
			progress_list = progress_post;
			progress_detail_list = progress_post_detail;
			workstation_type = "Post";
			break;
		case "hub":
			progress_list = progress_hub;
			progress_detail_list = progress_hub_detail;
			workstation_type = "Hub";
			break;
	}
	if (workStationChecked == true) {
		if (workstation_type == "Switch" || workstation_type == "Hub") {
			var color_background = "";
			setTimeout(function () {
				var x = document.createElement("div");
				x.id = workstationId;
				x.style.position = "absolute";
				x.style.width = "220px";
				x.style.height = "115px";
				x.style.left = left;
				x.style.top = top;
				if (workstation_type == "Switch") {
					color_background = "blue";
				} else {
					color_background = "red";
				}
				x.style.background = color_background;

				x.style.color = "white";

				x.addEventListener('mousedown', function (e) {
					simu.isDown = true;
					/*var offset = [
						x.offsetLeft - e.clientX,
						x.offsetTop - e.clientY
					];*/
				}, true);

				x.addEventListener('mouseup', function () {
					simu.isDown = false;
				}, true);

				/*
				x.addEventListener('mousemove', function (event) {
					event.preventDefault();
					if (simu.isDown) {
						var mousePosition = {
							posX: event.clientX,
							posY: event.clientY
						};
						x.style.left = (mousePosition.posX + offset[0]) + 'px';
						x.style.top = (mousePosition.posY + offset[1]) + 'px';
					}
				}, true);*/

				var list_bg = document.createElement("div");
				list_bg.style.overflow = "auto";
				list_bg.style.position = "absolute";
				list_bg.id = "listBg";
				list_bg.style.left = "10px";
				list_bg.style.top = "115px";
				list_bg.style.width = "200px";
				list_bg.style.height = "60px";
				list_bg.style.background = "black";

				for (var j = 0; j < simu.tab_workstation[x.id].TTL.length; j++) {

					var post_list = document.createTextNode("p-" + simu.tab_workstation[x.id].TTL[j].id);
					var post_bg_list = document.createElement("div");
					post_bg_list.style.position = "absolute";
					post_bg_list.style.left = "0px";
					post_bg_list.style.width = "30px";
					post_bg_list.style.height = "10px";
					post_bg_list.style.background = "black";
					post_bg_list.style.fontSize = "13px";
					post_bg_list.appendChild(post_list);

					var TTL_text = document.createTextNode(TTL_status(simu.tab_workstation[x.id].TTL[j].status));
					var TTL_bg_list = document.createElement("div");
					TTL_bg_list.style.position = "absolute";
					TTL_bg_list.style.left = "100px";
					TTL_bg_list.style.height = "10px";
					TTL_bg_list.style.background = "black";
					TTL_bg_list.style.fontSize = "13px";
					TTL_bg_list.appendChild(TTL_text);

					var Element_bg_list = document.createElement("div");
					Element_bg_list.style.position = "absolute";
					Element_bg_list.style.left = "10px";
					Element_bg_list.style.top = count * 20 + "px";
					Element_bg_list.style.height = "10px";
					Element_bg_list.style.background = "black";

					Element_bg_list.appendChild(post_bg_list);
					Element_bg_list.appendChild(TTL_bg_list);

					list_bg.appendChild(Element_bg_list);
					count++;
				}

				var z = document.createElement("div");
				z.style.position = "absolute";
				z.style.left = "10px";
				z.style.top = "10px";
				z.style.width = "200px";
				z.style.height = "20px";
				z.style.background = "black";

				var t = document.createTextNode(workstation_type + " id " + x.id);
				z.appendChild(t);

				var t = document.createTextNode(progress_list[0]);
				var progress_text = document.createElement("div");
				progress_text.id = "text1" + x.id;
				progress_text.style.position = "absolute";
				progress_text.style.left = "10px";
				progress_text.style.top = "35px";
				progress_text.style.width = "200px";
				progress_text.style.height = "20px";
				progress_text.style.background = "black";

				progress_text.appendChild(t);

				var detail = document.createTextNode(progress_detail_list[0]);
				var detail_info = document.createElement("div");
				detail_info.id = "text2" + x.id;
				detail_info.style.position = "absolute";
				detail_info.style.left = "10px";
				detail_info.style.top = "60px";
				detail_info.style.width = "200px";
				detail_info.style.height = "15px";
				detail_info.style.background = "black";
				detail_info.style.fontSize = "13px";

				detail_info.appendChild(detail);

				var detail_info_2 = document.createElement("div");
				detail_info_2.id = "text3" + x.id;
				detail_info_2.style.position = "absolute";
				detail_info_2.style.left = "10px";
				detail_info_2.style.top = "85px";
				detail_info_2.style.width = "200px";
				detail_info_2.style.height = "20px";
				detail_info_2.style.background = "black";

				//create walls
				var wall1 = document.createElement("div");
				wall1.style.position = "absolute";
				wall1.style.left = "50px";
				wall1.style.width = "3px";
				wall1.style.height = "20px";
				wall1.style.background = color_background;

				var wall2 = document.createElement("div");
				wall2.style.position = "absolute";
				wall2.style.left = "110px";
				wall2.style.width = "3px";
				wall2.style.height = "20px";
				wall2.style.background = color_background;

				//Create Port background
				var port = document.createTextNode("Port:");
				var port_bg = document.createElement("div");
				port_bg.style.position = "absolute";
				port_bg.style.background = "black";
				port_bg.style.color = "white";
				port_bg.appendChild(port);

				var port_num = document.createTextNode(port_used_id);
				var port_num_bg = document.createElement("div");
				port_num_bg.style.position = "absolute";
				port_num_bg.style.left = "30px";
				port_num_bg.style.background = "black";
				port_num_bg.style.color = "white";
				port_num_bg.appendChild(port_num);

				//Create Post background
				var post = document.createTextNode("De:");
				var post_bg = document.createElement("div");
				post_bg.style.position = "absolute";
				post_bg.style.left = "55px";
				post_bg.style.background = "black";
				post_bg.style.color = "white";
				post_bg.appendChild(post);

				var post_num = document.createTextNode(post_text);
				var post_num_bg = document.createElement("div");
				post_num_bg.style.position = "absolute";
				post_num_bg.style.left = "80px";
				post_num_bg.style.background = "black";
				post_num_bg.style.color = "white";
				post_num_bg.appendChild(post_num);


				//Create destination background
				var dest = document.createTextNode("Vers:");
				var dest_bg = document.createElement("div");
				dest_bg.style.position = "absolute";
				dest_bg.style.left = "115px";
				dest_bg.style.background = "black";
				dest_bg.style.color = "white";
				dest_bg.appendChild(dest);

				var dest_num = document.createTextNode(dest_text);
				var dest_num_bg = document.createElement("div");
				dest_num_bg.style.position = "absolute";
				dest_num_bg.style.left = "150px";
				dest_num_bg.style.width = "50px";
				dest_num_bg.style.height = "0px";
				dest_num_bg.style.background = "red";
				dest_num_bg.style.color = "white";
				dest_num_bg.appendChild(dest_num);

				detail_info_2.appendChild(port_bg);
				detail_info_2.appendChild(post_bg);
				detail_info_2.appendChild(dest_bg);
				detail_info_2.appendChild(port_num_bg);
				detail_info_2.appendChild(post_num_bg);
				detail_info_2.appendChild(dest_num_bg);
				detail_info_2.appendChild(wall1);
				detail_info_2.appendChild(wall2);

				{
					var btnStop = document.createElement("button");
					btnStop.type = "button";
					btnStop.style.position = "absolute";
					btnStop.style.left = "120px";
					btnStop.style.top = "3px";
					btnStop.style.width = "15px";
					btnStop.style.height = "15px";
					btnStop.addEventListener("click", function () {
						searche_and_send_from_station(postIdOriginal, x.id, tabVect, request_size, target);
						x.parentNode.removeChild(x);
					});
					z.appendChild(btnStop);
				} {
					var btnBack = document.createElement("button");
					btnBack.type = "button";
					btnBack.style.position = "absolute";
					btnBack.style.left = "140px";
					btnBack.style.top = "3px";
					btnBack.style.width = "15px";
					btnBack.style.height = "15px";
					btnBack.addEventListener("click", function () {
						if (progress_list_index > 0 && progress_detail_list_index > 0) {
							progress_list_index--;
							progress_detail_list_index--;

							//Add space for list
							if ((progress_list_index == 2 || progress_list_index == 3) && workstation_type == "Switch") {
								count = 0;
								x.style.height = "190px";
								x.appendChild(list_bg);

							} else {
								if (document.getElementById("listBg") != null) {
									list_bg.parentNode.removeChild(list_bg);
								}
								x.style.height = "115px";
							}

							//Progress background
							////Remove element
							var element = document.getElementById("text1" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var progress_text = document.createElement("div");
							progress_text.id = "text1" + x.id;
							progress_text.style.position = "absolute";
							progress_text.style.left = "10px";
							progress_text.style.top = "35px";
							progress_text.style.width = "200px";
							progress_text.style.height = "20px";
							progress_text.style.background = "black";

							////Create text and add it to element
							var t = document.createTextNode(progress_list[progress_list_index]);
							progress_text.appendChild(t);

							//Detail background
							////Remove element
							var element = document.getElementById("text2" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var detail_info = document.createElement("div");
							detail_info.id = "text2" + x.id;
							detail_info.style.position = "absolute";
							detail_info.style.left = "10px";
							detail_info.style.top = "60px";
							detail_info.style.width = "200px";
							detail_info.style.height = "15px";
							detail_info.style.background = "black";
							detail_info.style.fontSize = "13px";

							////Create text and add it to element
							var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
							detail_info.appendChild(detail);

							//Add all to box info
							x.appendChild(detail_info);
							x.appendChild(progress_text);
						}
					});
					z.appendChild(btnBack);
				} {
					var btnReset = document.createElement("button");
					btnReset.type = "button";
					btnReset.style.position = "absolute";
					btnReset.style.left = "160px";
					btnReset.style.top = "3px";
					btnReset.style.width = "15px";
					btnReset.style.height = "15px";
					btnReset.addEventListener("click", function () {
						progress_list_index = 0;
						progress_detail_list_index = 0;

						//Progress background
						////Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						////Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "200px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						////Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);

						//Detail background
						////Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						////Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "200px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						////Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

						//Add all to box info
						x.appendChild(detail_info);
						x.appendChild(progress_text);
					});
					z.appendChild(btnReset);
				} {
					var btnNext = document.createElement("button");
					btnNext.type = "button";
					btnNext.style.position = "absolute";
					btnNext.style.left = "180px"
					btnNext.style.top = "3px"
					btnNext.style.width = "15px";
					btnNext.style.height = "15px";
					btnNext.addEventListener("click", function () {
						if (progress_list_index == progress_list.length - 1) {
							searche_and_send_from_station(postIdOriginal, x.id, tabVect, request_size, target);
							x.parentNode.removeChild(x);
						} else {
							progress_list_index++;
							progress_detail_list_index++;

							//Add space for list
							if ((progress_list_index == 2 || progress_list_index == 3) && workstation_type == "Switch") {
								x.style.height = "190px";
								count = 0;
								x.appendChild(list_bg);
							} else {
								if (document.getElementById("listBg") != null) {
									list_bg.parentNode.removeChild(list_bg);
								}
								x.style.height = "115px";
							}

							//Progress background
							////Remove element
							var element = document.getElementById("text1" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var progress_text = document.createElement("div");
							progress_text.id = "text1" + x.id;
							progress_text.style.position = "absolute";
							progress_text.style.left = "10px";
							progress_text.style.top = "35px";
							progress_text.style.width = "200px";
							progress_text.style.height = "20px";
							progress_text.style.background = "black";

							////Create text and add it to element
							var t = document.createTextNode(progress_list[progress_list_index]);
							progress_text.appendChild(t);


							//Detail background
							////Remove element
							var element = document.getElementById("text2" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var detail_info = document.createElement("div");
							detail_info.id = "text2" + x.id;
							detail_info.style.position = "absolute";
							detail_info.style.left = "10px";
							detail_info.style.top = "60px";
							detail_info.style.width = "200px";
							detail_info.style.height = "15px";
							detail_info.style.background = "black";
							detail_info.style.fontSize = "13px";

							////Create text and add it to element
							var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
							detail_info.appendChild(detail);

							//Add all to box info
							x.appendChild(detail_info);
							x.appendChild(progress_text);
						}
					});
					z.appendChild(btnNext);
				}

				x.appendChild(z);
				x.appendChild(progress_text);
				x.appendChild(detail_info);
				x.appendChild(detail_info_2);

				document.body.appendChild(x);
			}, 1000)
		} else {
			setTimeout(function () {
				var x = document.createElement("div");
				x.id = workstationId;
				x.style.position = "absolute";
				x.style.width = "230px";
				x.style.height = "115px";
				x.style.left = left;
				x.style.top = top;
				x.style.background = "green";

				x.style.color = "white";

				x.addEventListener('mousedown', function (e) {
					simu.isDown = true;
					var offset = [
						x.offsetLeft - e.clientX,
						x.offsetTop - e.clientY
					];
				}, true);

				x.addEventListener('mouseup', function () {
					simu.isDown = false;
				}, true);

				x.addEventListener('mousemove', function (event) {
					event.preventDefault();
					if (simu.isDown) {
						var mousePosition = {
							posX: event.clientX,
							posY: event.clientY
						};
						x.style.left = (mousePosition.posX + offset[0]) + 'px';
						x.style.top = (mousePosition.posY + offset[1]) + 'px';
					}
				}, true);
				document.body.appendChild(x);

				var z = document.createElement("div");
				z.style.position = "absolute";
				z.style.left = "10px";
				z.style.top = "10px";
				z.style.width = "210px";
				z.style.height = "20px";
				z.style.background = "black";

				var t = document.createTextNode(workstation_type + " id " + x.id);
				z.appendChild(t);

				var t = document.createTextNode(progress_list[0]);
				var progress_text = document.createElement("div");
				progress_text.id = "text1" + x.id;
				progress_text.style.position = "absolute";
				progress_text.style.left = "10px";
				progress_text.style.top = "35px";
				progress_text.style.width = "210px";
				progress_text.style.height = "20px";
				progress_text.style.background = "black";
				progress_text.appendChild(t);

				var detail = document.createTextNode(progress_detail_list[0]);
				var detail_info = document.createElement("div");
				detail_info.id = "text2" + x.id;
				detail_info.style.position = "absolute";
				detail_info.style.left = "10px";
				detail_info.style.top = "60px";
				detail_info.style.width = "210px";
				detail_info.style.height = "15px";
				detail_info.style.background = "black";
				detail_info.style.fontSize = "13px";
				detail_info.appendChild(detail);

				var text4 = document.createTextNode("Destination:")
				var text_bg = document.createElement("div");
				text_bg.style.position = "absolute";
				text_bg.style.left = "0px";
				text_bg.style.color = "white";
				text_bg.appendChild(text4);

				var detail_info_2 = document.createElement("div");
				detail_info_2.id = "text3" + x.id;
				detail_info_2.style.position = "absolute";
				detail_info_2.style.left = "10px";
				detail_info_2.style.top = "85px";
				detail_info_2.style.width = "210px";
				detail_info_2.style.height = "20px";
				detail_info_2.style.background = "black";

				//create Post background
				var dest = document.createTextNode(dest_text);
				var dest_bg = document.createElement("div");
				dest_bg.style.position = "absolute";
				dest_bg.style.left = "80px";
				dest_bg.style.color = "white";
				dest_bg.appendChild(dest);

				detail_info_2.appendChild(dest_bg);
				detail_info_2.appendChild(text_bg);

				{
					var btnStop = document.createElement("button");
					btnStop.type = "button";
					btnStop.style.position = "absolute";
					btnStop.style.left = "130px";
					btnStop.style.top = "3px";
					btnStop.style.width = "15px";
					btnStop.style.height = "15px";
					btnStop.addEventListener("click", function () {
						searche_and_send_from_station(postIdOriginal, x.id, tabVect, request_size, target);
						x.parentNode.removeChild(x);
					});
					z.appendChild(btnStop);
				} {
					var btnBack = document.createElement("button");
					btnBack.type = "button";
					btnBack.style.position = "absolute";
					btnBack.style.left = "150px";
					btnBack.style.top = "3px";
					btnBack.style.width = "15px";
					btnBack.style.height = "15px";
					btnBack.addEventListener("click", function () {
						if (progress_list_index > 0) {
							progress_list_index--;
							progress_detail_list_index--;

							//Progress background
							////Remove element
							var element = document.getElementById("text1" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var progress_text = document.createElement("div");
							progress_text.id = "text1" + x.id;
							progress_text.style.position = "absolute";
							progress_text.style.left = "10px";
							progress_text.style.top = "35px";
							progress_text.style.width = "210px";
							progress_text.style.height = "20px";
							progress_text.style.background = "black";

							////Create text and add it to element
							var t = document.createTextNode(progress_list[progress_list_index]);
							progress_text.appendChild(t);

							//Detail background
							////Remove element
							var element = document.getElementById("text2" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var detail_info = document.createElement("div");
							detail_info.id = "text2" + x.id;
							detail_info.style.position = "absolute";
							detail_info.style.left = "10px";
							detail_info.style.top = "60px";
							detail_info.style.width = "210px";
							detail_info.style.height = "15px";
							detail_info.style.background = "black";
							detail_info.style.fontSize = "13px";

							////Create text and add it to element
							var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
							detail_info.appendChild(detail);

							//Add all to box info
							x.appendChild(detail_info);
							x.appendChild(progress_text);
						}
					});
					z.appendChild(btnBack);
				} {
					var btnReset = document.createElement("button");
					btnReset.type = "button";
					btnReset.style.position = "absolute";
					btnReset.style.left = "170px";
					btnReset.style.top = "3px";
					btnReset.style.width = "15px";
					btnReset.style.height = "15px";
					btnReset.addEventListener("click", function () {
						progress_list_index = 0;

						//Progress background
						////Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						////Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "210px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						////Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);

						//Detail background
						////Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						////Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "210px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						////Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

						//Add all to box info
						x.appendChild(detail_info);
						x.appendChild(progress_text);
					});
					z.appendChild(btnReset);
				} {
					var btnNext = document.createElement("button");
					btnNext.type = "button";
					btnNext.style.position = "absolute";
					btnNext.style.left = "190px"
					btnNext.style.top = "3px"
					btnNext.style.width = "15px";
					btnNext.style.height = "15px";
					btnNext.addEventListener("click", function () {
						if (progress_list_index == progress_list.length - 1) {
							searche_and_send_from_station(postIdOriginal, x.id, tabVect, request_size, target);
							x.parentNode.removeChild(x);
						} else {
							progress_list_index++;
							progress_detail_list_index++;

							//Progress background
							////Remove element
							var element = document.getElementById("text1" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var progress_text = document.createElement("div");
							progress_text.id = "text1" + x.id;
							progress_text.style.position = "absolute";
							progress_text.style.left = "10px";
							progress_text.style.top = "35px";
							progress_text.style.width = "210px";
							progress_text.style.height = "20px";
							progress_text.style.background = "black";

							////Create text and add it to element
							var t = document.createTextNode(progress_list[progress_list_index]);
							progress_text.appendChild(t);

							//Detail background
							////Remove element
							var element = document.getElementById("text2" + x.id);
							element.parentNode.removeChild(element);

							////Create element
							var detail_info = document.createElement("div");
							detail_info.id = "text2" + x.id;
							detail_info.style.position = "absolute";
							detail_info.style.left = "10px";
							detail_info.style.top = "60px";
							detail_info.style.width = "210px";
							detail_info.style.height = "15px";
							detail_info.style.background = "black";
							detail_info.style.fontSize = "13px";

							////Create text and add it to element
							var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
							detail_info.appendChild(detail);

							//Add all to box info
							x.appendChild(detail_info);
							x.appendChild(progress_text);
						}
					});
					z.appendChild(btnNext);

				}

				x.appendChild(z);
				x.appendChild(progress_text);
				x.appendChild(detail_info);
				x.appendChild(detail_info_2);

				document.body.appendChild(x);
			}, 1000);
		}
	} else {
		setTimeout(function () {
			searche_and_send_from_station(postIdOriginal, workstationId, tabVect, request_size, target);
		}, 1000)
	}
}

//Create the circle
function create_request(left, top, request_size) {
	if (request_size != null) {
		return new fabric.Circle({
			radius: simu.PORT_SIZE / 2,
			top: top,
			left: left,
			fill: 'blue',
			stroke: 'red',
			selectable: false
		});
	} else {
		return new fabric.Circle({
			radius: simu.PORT_SIZE / 2,
			top: top,
			left: left,
			fill: 'blue',
			stroke: 'red',
			selectable: false
		});
	}
}

//Send request between 2 ports
function send_request(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top, request_size) {
	var request = create_request(port_1_left, port_1_top, request_size);
	this.canvas.add(request);

	request.animate('left',
		port_2_left, {
			onChange: this.canvas.renderAll.bind(this.canvas),
			duration: 1000,
			onComplete: function () {
				request.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});
	request.animate('top',
		port_2_top, {
			onChange: this.canvas.renderAll.bind(this.canvas),
			duration: 1000,
			onComplete: function () {
				request.remove();
			},
			easing: fabric.util.ease.easeInQuand
		});

	for (var i = 0; i < simu.tab_workstation.length; i++) {
		if (simu.tab_workstation[i].id == workstationId) {
			station_progress(
				simu.tab_workstation[i].checked,
				portOriginal,
				postIdOriginal,
				tabVect,
				workstationType,
				workstationId,
				port_2_top, port_2_left,
				request_size);
		}
	}
}

function good_path(s, next, path) {
	if (path != null && s.type == "switch") {
		if (!helper.is_in(s.id, path) || !helper.is_in(next.id, path))
			return false;
	}
	return true;
}

function rec_simulation(s, h, marked, tab_vect, father, path) {
	marked.push(s);
	var next = null;

	for (var i = 0; i < s.ports.length; i++) {
		if (s.ports[i].used) //If port is used
		{
			next = helper.get_linked_port(s, i); //If it is linked to others ports
			if (!helper.is_in(next.obj, marked) && helper.good_cable(s.type, next.obj.type, next.cable.type) && good_path(s, next.obj, path)) // On vérifie que le voisin n'est pas marqué
			{
				var aux1 = 26;
				var aux2 = 26;
				if (s.ports.length > 3)
					aux1 = ((50 + ((s.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;
				if (next.obj.ports.length > 3)
					aux2 = ((50 + ((next.obj.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;

				//We send the request
				var vect = {
					'h': h,
					'father': father,
					'obj1': s,
					'obj2': next.obj,
					'obj2Port': next.nb_port + 1,
					'x1': s.obj.left + s.ports[i].rect.left + aux1,
					'y1': s.obj.top + s.ports[i].rect.top + 26,
					'x2': next.obj.obj.left + next.port.rect.left + aux2,
					'y2': next.obj.obj.top + next.port.rect.top + 26
				};
				tab_vect.push(vect);

				rec_simulation(next.obj, h + 1, marked, tab_vect, vect, path);
			}
		}
	}
}

function searche_and_send_from_station(postIdOriginal, stationId, tabVect, request_size, target) {
	var tab_vect_chosen = [];
	for (var i = 0; i < tabVect.length; i++) {
		if (tabVect[i].obj1.id == stationId) {
			var vect = {
				'vect': tabVect[i],
				'vect_port_original': tabVect[i].obj2Port,
				'vect_id': tabVect[i].obj2.id,
				'vect_type': tabVect[i].obj2.type
			}
			tab_vect_chosen.push(vect);
		}
	}

	for (var i = 0; i < tab_vect_chosen.length; i++) {
		simulateur.send_request_3(
			tab_vect_chosen[i].vect_port_original,
			stationId,
			tabVect,
			tab_vect_chosen[i].vect_type,
			tab_vect_chosen[i].vect_id,
			tab_vect_chosen[i].vect.x1,
			tab_vect_chosen[i].vect.y1,
			tab_vect_chosen[i].vect.x2,
			tab_vect_chosen[i].vect.y2,
			request_size,
			target);
	}
}

function set_ttl(s, tab_vect) {
	var ok = false;
	for (var i = 0; i < tab_vect.length; i++) {
		if (tab_vect[i].obj2.type == 'switch') {
			for (var j = 0; j < tab_vect[i].obj2.TTL.length; j++) {
				if (tab_vect[i].obj2.TTL[j].id == s.id) {
					tab_vect[i].obj2.TTL[j].status = 0;
					ok = true;
				} else {
					tab_vect[i].obj2.TTL[j].status++;
					if (tab_vect[i].obj2.TTL[j].status > 4)
						tab_vect[i].obj2.TTL.splice(j, 1);
				}
			}
			if (!ok) {
				var pair = {
					'id': s.id,
					'status': 0
				}
				tab_vect[i].obj2.TTL.push(pair);
			}
		}
	}
}