import simu from '../services/VariaG.js';
import helper from '../services/helper.js';
import struct from '../services/struct.js';

export default {
     load(savedData) {
        var j = 0;
        var index = 0;
        var cables = '';
        var workstations = '';

        while (j < savedData.length) {
            if (savedData[j] == 'w') {
                index = j;
            }
            j++;
        }

        for (var i = 0; i < index; i++) {
            cables += savedData[i];
        }

        for (var i = index; i < savedData.length; i++) {
            workstations += savedData[i];
        }

        console.log(workstations);
        console.log(cables);

        load_all_workstations(workstations);
        load_all_cables(cables);
    }
}

function create_line(obj1, obj2, nb_obj1_port, nb_obj2_port, type) {
    var aux = 26;
    if (obj1.ports.length > 3)
        aux = ((50 + ((obj1.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;

    var aux2 = 26;
    if (obj2.ports.length > 3)
        aux2 = ((50 + ((obj2.ports.length - 3) * (simu.PORT_SIZE + 3))) / 2) + 1;

    var points_line = [
        obj1.obj.left + obj1.ports[nb_obj1_port].rect.left + aux + simu.PORT_SIZE / 2,
        obj1.obj.top + obj1.ports[nb_obj1_port].rect.top + 26 + simu.PORT_SIZE / 2,
        obj2.obj.left + obj2.ports[nb_obj2_port].rect.left + aux2 + simu.PORT_SIZE / 2,
        obj2.obj.top + obj2.ports[nb_obj2_port].rect.top + 26 + simu.PORT_SIZE / 2
    ];

    if (points_line != null) {
        var line = new fabric.Line(points_line, {
            strokeWidth: 1,
            fill: 'black',
            originX: 'center',
            originY: 'center',
            selectable: false
        });

        helper.apply_color(line, obj1.ports[nb_obj1_port].type, true);
        obj1.ports[nb_obj1_port].type = type;
        obj2.ports[nb_obj2_port].type = type;

        simu.canvas.add(line);
        return line;
    }
}

function load_all_cables(tab, index) {
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
            obj1 = helper.search_work_station(Number(obj1_id));
            i++;
            var obj2_id = ''
            while (tab[i] != ' ') {
                obj2_id += tab[i];
                i++;
            }
            obj2 = helper.search_work_station(Number(obj2_id));
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

            var line = create_line(obj1, obj2, nb_obj1_port, nb_obj2_port, Number(type));

            struct.create_cable(line, obj1, obj2, nb_obj1_port, nb_obj2_port, Number(type));
        }
        i++;
    }
}

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
            simu.canvas.add(struct.create_work_station(Number(id), Number(left), Number(top), Number(nb_port), false, type));
        }
        i++;
    }
}