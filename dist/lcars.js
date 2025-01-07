checkSdkCompatibility(0, 1);
let exports = {};
"use strict";

// dist/index.js
Object.defineProperty(exports, "__esModule", { value: true });
var eventLoop = require("@flipperdevices/fz-sdk/event_loop");
var gui = require("@flipperdevices/fz-sdk/gui");
var dialog = require("@flipperdevices/fz-sdk/gui/dialog");
var widget = require("@flipperdevices/fz-sdk/widget");
var buttons = [];
var icon_dn = 0;
var icon_cn = 0;
var icon_w = 0;
icon_dn = widget.loadImageXbm(__dirname + "/bw-light-ship.fxbm");
icon_cn = widget.loadImageXbm(__dirname + "/cerritos.fxbm");
var w_open = "";
function show_ship(type) {
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
var views = {
  change_i: dialog.makeWith({
    header: "LCARS Display",
    text: "A display only pixelart remake of\nthe origal star trek ui",
    left: "< Eegg",
    center: "Exit",
    right: "Lcars >"
  })
};
eventLoop.subscribe(views.change_i.input, function(_sub, button, eventLoop2) {
  if (button === "center") {
    print("Bye *waves*");
    eventLoop2.stop();
  }
  if (button === "right")
    reboot_ship(0);
  if (button === "left")
    reboot_ship(1);
  buttons.push(button);
}, eventLoop);
gui.viewDispatcher.switchTo(views.change_i);
eventLoop.subscribe(gui.viewDispatcher.navigation, function(_sub, _item, eventLoop2) {
  print("Bye *waves*");
  eventLoop2.stop();
}, eventLoop);
eventLoop.run();
