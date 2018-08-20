"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var error = chalk_1.default.bold.red;
var warning = chalk_1.default.keyword('orange');
var logger = {
    log: function (text) { return log(text); },
    error: function (text) { return log(error(text)); },
    warning: function (text) { return log(warning(text)); }
};
function log(text) {
    var date = new Date();
    var hms = date.toTimeString().split(' ')[0];
    var timeStr = chalk_1.default.gray("[" + hms + "]");
    console.log(timeStr + "   " + text);
}
exports.default = logger;
//# sourceMappingURL=Logger.js.map