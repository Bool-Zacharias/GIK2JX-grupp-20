function createPointLinePolygon(){
    var skepparholmenCoords = [
        [59.328011243647694, 18.081854590366447],
        [59.32670617876357, 18.080234335191022],
        [59.3245962477435, 18.080873973159783],
        [59.32355198503157, 18.082622071647478],
        [59.32400885821306, 18.08769608573911],
        [59.3250529953724, 18.08944445223389],
        [59.3262276390428, 18.087696012087235],
        [59.32688020869972, 18.08556415797875],
        [59.328011243647694, 18.081854590366447]
      ];

    // Punkt
    var marker = L.marker([59.3265, 18.0830]).addTo(mymap);
        marker.bindPopup("<h3>Här ligger Skeppsholmen</h3><img src='/static/img/Skepparholmen.jpg'width='150px'>")

    // Linje
    var latlngs = [
        [59.33296041947983, 18.07581915579391],
        [59.33152747707297, 18.081092120229442],
        [59.33174793368488, 18.093410110918455],
        [59.329940147243775, 18.094577078457064],
        [59.3281763604609, 18.09656524537519],
        [59.3263904330673, 18.096176256196003],
        [59.32502336349748,18.097213560674845],

    ];

    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(mymap);
    polyline.bindPopup("<h3>Här är en polyline för Strandvägen</h3><img src='/static/img/Strandvägen.jpg'width='150px'>");

    // Polygon
    var skepparholmenPolygon = L.polygon(skepparholmenCoords, {
        color: 'blue'
    }).addTo(mymap);

    skepparholmenPolygon.bindPopup("<h3>Här är en polygon fördeling över Skeppsholmen</h3><img src='/static/img/Skeppholmen2.jpg'width='150px'>");

    L.control.polylineMeasure().addTo(mymap);
}


