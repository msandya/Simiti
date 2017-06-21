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

//-----------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------In progress-----------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
function station_progress(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, topPos, leftPos) {
	var top = (topPos + 60) + "px";
	var left = (leftPos) + "px";
	var progress_list = [];
	var progress_detail_list = [];

	var progress_list_index = 0;
	var progress_detail_list_index = 0;

	var workstation_type = "";

	var port_used_id = portOriginal;
	var dest_text = "BCAST";
	var post_text = "p-" + postIdOriginal;
	var count = 0;
	var myScript = "qfytqsgkudhflqjisdkfjqhsdifnvqhsidufnvhqlsidfmvqlskjvdmfosq";

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
		"Adresse de broadcast",
		"Réémission autres ports actifs",
		""
	]

	var progress_post = [
		"Examiner le destinataire",
		"Traiter la trame",
		"Fin de la demonstration"
	]
	var progress_post_detail = [
		"Destinataire: BCAST",
		"Transmettre à la couche concernée",
		""
	]

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

	if (workstation_type == "Switch" || workstation_type == "Hub") {
		setTimeout(function () {
			var x = document.createElement("div");
			x.id = workstationId;
			x.style.position = "absolute";
			x.style.width = "220px";
			x.style.height = "115px";
			x.style.left = left;
			x.style.top = top;
			x.style.background = "blue";
			//color text in box
			x.style.color = "white";

			//Movement of box info
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

			var list_bg = document.createElement("div");
			list_bg.style.overflow = "auto";
			list_bg.style.position = "absolute";
			list_bg.id = "listBg";
			list_bg.style.left = "10px";
			list_bg.style.top = "115px";
			list_bg.style.width = "200px";
			list_bg.style.height = "60px";
			list_bg.style.background = "black";
			
			for (var j = 0; j < tab_workstation[x.id].TTL.length; j++) {

				var post_list = document.createTextNode("p-" + tab_workstation[x.id].TTL[j].id);
				var post_bg_list = document.createElement("div");
				post_bg_list.style.position = "absolute";
				post_bg_list.style.left = "0px";
				post_bg_list.style.width = "30px";
				post_bg_list.style.height = "10px";
				post_bg_list.style.background = "black";
				post_bg_list.style.fontSize = "13px";
				post_bg_list.appendChild(post_list);

				var TTL_text = document.createTextNode(TTL_status(tab_workstation[x.id].TTL[j].status));
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
			wall1.style.background = "blue";

			var wall2 = document.createElement("div");
			wall2.style.position = "absolute";
			wall2.style.left = "110px";
			wall2.style.width = "3px";
			wall2.style.height = "20px";
			wall2.style.background = "blue";

			//create Port background
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

			//create Post background
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


			//create destination background
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
					searche_and_send_from_station(postIdOriginal, x.id, tabVect);
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
						//Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "200px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						//Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);

						//Detail background
						//Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "200px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						//Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

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
					//Remove element
					var element = document.getElementById("text1" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var progress_text = document.createElement("div");
					progress_text.id = "text1" + x.id;
					progress_text.style.position = "absolute";
					progress_text.style.left = "10px";
					progress_text.style.top = "35px";
					progress_text.style.width = "200px";
					progress_text.style.height = "20px";
					progress_text.style.background = "black";

					//Create text and add it to element
					var t = document.createTextNode(progress_list[progress_list_index]);
					progress_text.appendChild(t);

					//Detail background
					//Remove element
					var element = document.getElementById("text2" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var detail_info = document.createElement("div");
					detail_info.id = "text2" + x.id;
					detail_info.style.position = "absolute";
					detail_info.style.left = "10px";
					detail_info.style.top = "60px";
					detail_info.style.width = "200px";
					detail_info.style.height = "15px";
					detail_info.style.background = "black";
					detail_info.style.fontSize = "13px";

					//Create text and add it to element
					var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
					detail_info.appendChild(detail);

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
						searche_and_send_from_station(postIdOriginal, x.id, tabVect);
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
						//Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "200px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						//Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);


						//Detail background
						//Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "200px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						//Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

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
			//color text in box
			x.style.color = "white";

			//Movement of box info
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
					searche_and_send_from_station(postIdOriginal, x.id, tabVect);
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
						//Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "210px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						//Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);

						//Detail background
						//Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "210px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						//Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

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
					//Remove element
					var element = document.getElementById("text1" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var progress_text = document.createElement("div");
					progress_text.id = "text1" + x.id;
					progress_text.style.position = "absolute";
					progress_text.style.left = "10px";
					progress_text.style.top = "35px";
					progress_text.style.width = "210px";
					progress_text.style.height = "20px";
					progress_text.style.background = "black";

					//Create text and add it to element
					var t = document.createTextNode(progress_list[progress_list_index]);
					progress_text.appendChild(t);

					//Detail background
					//Remove element
					var element = document.getElementById("text2" + x.id);
					element.parentNode.removeChild(element);

					//Create element
					var detail_info = document.createElement("div");
					detail_info.id = "text2" + x.id;
					detail_info.style.position = "absolute";
					detail_info.style.left = "10px";
					detail_info.style.top = "60px";
					detail_info.style.width = "210px";
					detail_info.style.height = "15px";
					detail_info.style.background = "black";
					detail_info.style.fontSize = "13px";

					//Create text and add it to element
					var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
					detail_info.appendChild(detail);

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
						searche_and_send_from_station(postIdOriginal, x.id, tabVect);
						x.parentNode.removeChild(x);
					} else {
						progress_list_index++;
						progress_detail_list_index++;

						//Progress background
						//Remove element
						var element = document.getElementById("text1" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var progress_text = document.createElement("div");
						progress_text.id = "text1" + x.id;
						progress_text.style.position = "absolute";
						progress_text.style.left = "10px";
						progress_text.style.top = "35px";
						progress_text.style.width = "210px";
						progress_text.style.height = "20px";
						progress_text.style.background = "black";

						//Create text and add it to element
						var t = document.createTextNode(progress_list[progress_list_index]);
						progress_text.appendChild(t);

						//Detail background
						//Remove element
						var element = document.getElementById("text2" + x.id);
						element.parentNode.removeChild(element);

						//Create element
						var detail_info = document.createElement("div");
						detail_info.id = "text2" + x.id;
						detail_info.style.position = "absolute";
						detail_info.style.left = "10px";
						detail_info.style.top = "60px";
						detail_info.style.width = "210px";
						detail_info.style.height = "15px";
						detail_info.style.background = "black";
						detail_info.style.fontSize = "13px";

						//Create text and add it to element
						var detail = document.createTextNode(progress_detail_list[progress_detail_list_index]);
						detail_info.appendChild(detail);

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

	//list_workStation_level();
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

// send the request from port_1 to port_2
function send_request(portOriginal, postIdOriginal, tabVect, workstationType, workstationId, port_1_left, port_1_top, port_2_left, port_2_top) {
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
		portOriginal,
		postIdOriginal,
		tabVect,
		workstationType,
		workstationId,
		port_2_top, port_2_left);
}

function good_path(s, next, path) {
	if (path != null && s.type == "switch") {
		if (!is_in(s.id, path) || !is_in(next.id, path))
			return false;
	}
	return true;
}

function rec_simulation(s, h, marked, tab_vect, father, path) {
	marked.push(s);
	var next = null;

	for (var i = 0; i < s.ports.length; i++) {
		if (s.ports[i].used) // Si un port est utilisé
		{
			next = get_linked_port(s, i); // On regarde a qui il est relié
			if (!is_in(next.obj, marked) && good_cable(s.type, next.obj.type, next.cable.type) && good_path(s, next.obj, path)) // On vérifie que le voisin n'est pas marqué
			{
				var aux1 = 26;
				var aux2 = 26;
				if (s.ports.length > 3)
					aux1 = ((50 + ((s.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;
				if (next.obj.ports.length > 3)
					aux2 = ((50 + ((next.obj.ports.length - 3) * (PORT_SIZE + 3))) / 2) + 1;

				// On envoi la requète
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

//parcour largeur
function simulate(s, target) // s, sommet selectionné
{
	var h = 0;
	var marked = []; // marked, tableau des sommet déjà vu
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

	searche_and_send_from_station(s.id, s.id, tab_vect);

	/*for (var i = 0; i < tab_vect.length; i++) {
		send_req(tab_vect[i]);
	}*/
}

/*function send_req(obj) {
	setTimeout(function () {
		send_request(obj.x1, obj.y1, obj.x2, obj.y2);
	}, obj.h * 1000)
}*/


function searche_and_send_from_station(postIdOriginal, stationId, tabVect) {
	var tab_vect_chosen = [];
	//alert(tabVect[0].obj1.id);
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
		send_req_2(tab_vect_chosen[i].vect_port_original, postIdOriginal, tabVect, tab_vect_chosen[i].vect_type, tab_vect_chosen[i].vect, tab_vect_chosen[i].vect_id);
	}
}

function send_req_2(portOriginal, postIdOriginal, tabVect, vectType, obj, vectId) {
	send_request(portOriginal, postIdOriginal, tabVect, vectType, vectId, obj.x1, obj.y1, obj.x2, obj.y2);
}

function set_ttl(s, tab_vect) {
	var ok = false;
	for (var i = 0; i < tab_vect.length; i++) {
		if (tab_vect[i].obj2.type == 'switch') {
			//alert('switch ' + tab_vect[i].obj2.id);
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

			/*console.log("id:" + tab_vect[i].obj2.id + " length :" + tab_vect[i].obj2.TTL.length);
			for (var j = 0; j < tab_vect[i].obj2.TTL.length; j++)
				console.log("id: " + tab_vect[i].obj2.TTL[j].id + "   status: " + tab_vect[i].obj2.TTL[j].status);
				*/
		}
	}
}