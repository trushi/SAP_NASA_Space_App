var launchSites = new sap.ui.model.json.JSONModel();
launchSites.attachRequestCompleted(function() {
    var data = launchSites.oData.locations;
    for(var loc in data) {
        var l = data[loc];
        var marker = L.marker([l.location[1], l.location[0]], {
			title: l.name,
		}).addTo(map);
		marker.on('click', function (e) { 
		    map.setView([e.target._latlng.lat, e.target._latlng.lng], 10);
		});
		L.circleMarker([l.location[1], l.location[0]],  {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			title: l.name,
		}).addTo(map);
    }
});
launchSites.loadData("xsjs/selectLaunchSites.xsjs");

sap.ui.getCore().attachInit(function() {
    new sap.ui.view({
    	id: "idGraph",
    	viewName: "wildcats.view.Main",
    	type: sap.ui.core.mvc.ViewType.XML
    }).placeAt("ui5");
    
    $("#title").css('font-size', '2em');
    $("#title span").css('opacity', '1');
});

var users = new sap.ui.model.json.JSONModel();
users.attachRequestCompleted(function() {
    var data = users.oData.locations;
    var heatmapData = [];
    for(var loc in data) {
        var l = data[loc];
        heatmapData.push([l.location[1], l.location[0], Math.random()]);
        //var marker = L.circle([l.location[1], l.location[0]], 1).addTo(map);
    }
    
    L.heatLayer(heatmapData, {radius: 50, blur:5, gradient: {0.2: 'black', 0.3: 'blue', 0.4: 'lime', 0.5: 'red'}}).addTo(map);
});
users.loadData("xsjs/selectUsers.xsjs");