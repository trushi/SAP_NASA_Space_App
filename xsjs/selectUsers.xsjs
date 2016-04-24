var con = $.hdb.getConnection();
var rs = con.executeQuery("SELECT name, text, location.ST_AsGeoJSON() as loc from NASA.USERS");

var res = [];
for (var row in rs) {
    var r = rs[row];
    res.push({ name: r.NAME, text: r.TEXT, location: JSON.parse(r.LOC).coordinates});
}

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify({locations: res}));