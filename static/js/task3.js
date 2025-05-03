function createSupermarketBuffers() {
    fetch("/static/data/supermarket.geojson")
        .then(response => response.json())
        .then(supermarket => {
            // Lägg till punkterna på kartan
            L.geoJSON(supermarket, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#2E86AB",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function(feature, layer) {
                    if (feature.properties && feature.properties.name) {
                        layer.bindPopup(`<b>${feature.properties.name}</b>`);
                    }
                }
            }).addTo(mymap);

            // Skapa buffertar för varje supermarket och lagra dem
            const buffers = supermarket.features.map(function(currentFeature) {
                const currentPoint = turf.point(currentFeature.geometry.coordinates);
                const buffer = turf.buffer(currentPoint, 1, { units: 'kilometers' });
                return buffer;
            });

            // Skapa enskilda buffertar med färglogik
            supermarket.features.forEach(function(currentFeature, index) {
                const buffer = buffers[index];  // Få den aktuella bufferten

                // Kontrollera om denna buffert överlappar någon annan buffert
                const overlapWithOtherBuffers = buffers.some(function(otherBuffer, otherIndex) {
                    if (index === otherIndex) return false; // Skip current buffer
                    return turf.booleanOverlap(buffer, otherBuffer); // Kolla om buffertarna överlappar
                });

                const bufferColor = overlapWithOtherBuffers ? "green" : "red"; // Grönt om överlappar, rött annars

                L.geoJSON(buffer, {
                    style: {
                        color: bufferColor,
                        fillOpacity: 0.2,
                        weight: 2
                    },
                    onEachFeature: function (feature, layer) {
                        if (currentFeature.properties && currentFeature.properties.name) {
                            layer.bindPopup(`<b>${currentFeature.properties.name}</b>`);
                        }
                    }
                }).addTo(mymap);
                
            });
        });
}
