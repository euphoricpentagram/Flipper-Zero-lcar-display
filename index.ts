// import modules
// caution: `eventLoop` HAS to be imported before `gui`, and `gui` HAS to be
// imported before any `gui` submodules.
import * as eventLoop from "@next-flip/fz-sdk-mntm/event_loop";
import * as gui from "@next-flip/fz-sdk-mntm/gui";
import * as dialog from "@next-flip/fz-sdk-mntm/gui/dialog"
import * as flipper from "@next-flip/fz-sdk-mntm/flipper"
import * as widget from "@next-flip/fz-sdk-mntm/widget";

let buttons = [];

let icon_dn = 0;
let icon_cn = 0;

let icon_w = 0;

let show = true;
icon_dn = widget.loadImageXbm(__dirname + "/bw-light-ship.fxbm");
icon_cn = widget.loadImageXbm(__dirname + "/cerritos.fxbm");

let w_open = "";

function show_ship(type) {
	//0 - def, 1 - cerritos
	if (type === 0)
		icon_w = widget.addXbm(0, 0, icon_dn);
	if (type === 1)
		icon_w = widget.addXbm(0, 0, icon_cn);
	widget.show();
}

function reboot_ship(type) { 
	widget.remove(icon_w);
	widget.close();
	show_ship(type);
}

function check_widget() { 
	if (widget.isOpen) {
		w_open = "yes";
	} else { 
		w_open = "no";
	}
}
show_ship(0);
check_widget();

let views = {
	change_i: dialog.makeWith({
		header: "LCARS Display",
		text: "A display only pixelart remake of\nthe origal star trek ui",
		left: "< Eegg",
		center: "Exit",
		right: "Lcars >",
	}),
}

eventLoop.subscribe(views.change_i.input, (_sub, button, eventLoop) => {
	if (button === "center") {
		print("Bye *waves*");
		eventLoop.stop();
	}
	if (button === "right")
		reboot_ship(0);
	if (button === "left")
		reboot_ship(1);

	buttons.push(button);
}, eventLoop);

gui.viewDispatcher.switchTo(views.change_i);


eventLoop.subscribe(gui.viewDispatcher.navigation, (_sub, _item, eventLoop) => {
	print("Bye *waves*");
	eventLoop.stop();
}, eventLoop);

eventLoop.run();