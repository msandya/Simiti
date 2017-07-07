export default {
	canvas: null, 

	color_0:'black',
	color_1:'red',
	color_2:'green',

	post_color:'green',
	switch_color:'blue',
	hub_color:'red',

	buttons: [],
	buttons_selected: [],

	menu_selected: null,
	trame_type:0,

	line: null,
	isDown: null,
	rect: null,

	PORT_SIZE: 12,
	selected: 0,
	tab_workstation: [],
	tab_cable: [],
	last_object: null,
	last_object_port_nb: null,
	line_creation: 0,
	tab_images: [],
	current: null,

	save_cable: '',
	save_workstation: '',
	save_data: '',

	is_sending_package: false,
	
	start: 0,
	nb_workstation: 0,
	WorkStationType: 0,
	text: 'oui',
	test: 0,

	tab_buttons: [],

	ctrl: null,
	project:null
}