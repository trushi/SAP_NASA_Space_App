sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/ui/core/HTML',
	'sap/ui/model/json/JSONModel'
], function(Controller, Dialog, Button, HTML, JSONModel) {
	"use strict";

	return Controller.extend("wildcats.controller.Main", {
        onInit: function () {
			// set explored app's demo model on this sample
			//var oModel = new JSONModel("xsjs/selectLaunchSites.xsjs");
			
			this.getView().setModel(launchSites);
		},
        
        eventHome: function() {
            map.setView.apply(map, home);
        },
        
        eventSelect: function(oControlEvent) {
            var item = oControlEvent.getParameters().selectedItem;
			var dialog = new Dialog({
				title: 'Launch site video - ' + item.getText(),
				contentWidth: "650px",
				contentHeight: "400px",
				content: new HTML({
				    //content: "<div style='height: 100%, width: 100%'>CONTENT</div>"
				    content: '<iframe width="650" height="400" src="https://www.youtube.com/embed/' + item.getKey() + '?autoplay=1&controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>'
				}),
				beginButton: new Button({
					text: 'Close',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			//to get access to the global model
			this.getView().addDependent(dialog);
			dialog.open();
        }
	});

});