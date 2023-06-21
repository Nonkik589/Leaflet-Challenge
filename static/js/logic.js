// Establish the url
// All earthquakes in the last week
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var geojson;

// Creating the Map centered in LA
var myMap = L.map("map", {
    center: [34.099, -118.328],
    zoom: 5
});

// Adding the topographic map layer
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);

// Initializing the fucntions to populate the map
function createFeatures(feature,layer) {
    layer.bindPopup("<strong>"+feature.properties.place+"</strpmg><br /><br />"+
    new Date(feature.properties.time)+"<br /><br />"+
    feature.properties.mag);
}
function colors(feature) {
    var depth = (feature.bbox[5]);
    if (depth >= 750) {
      return "#FF0000"; 
    } 
    else if (depth >= 500) {
      return "#FFBF00";
    } 
    else if (depth >= 250) {
      return "#FFFF00";
    } 
    else {
      return "#00FF00";
    }
  }
function createMarkers(feature,latlng) {
    return L.circleMarker(latlng, {
        radius: (feature.properties.mag**2),
        color: "#000",
        fillColor: colors,
    });
}
// Getting the data
d3.json(url).then(function(data) {
    
    // Log the data to the console
    console.log(data.bbox[5]);

    //Create the layers
    geojson = L.geoJSON(data, {
        onEachFeature: createFeatures,
        pointToLayer: createMarkers
    }).addTo(myMap);
});
