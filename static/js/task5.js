function fuelCluster(){
    var fuelCluster = L.markerClusterGroup();
    var fuelLayer = L.geoJSON(fuel, {
        onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(`<b>${feature.properties.name}</b>`);
            }
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng);
        }
    });
    fuelCluster.addLayer(fuelLayer);
    mymap.addLayer(fuelCluster);
}