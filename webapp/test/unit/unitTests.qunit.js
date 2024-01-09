/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ypf/zz1_com512_free_lm4/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
