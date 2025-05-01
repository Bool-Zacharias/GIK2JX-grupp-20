
function task7Kluster() {
  clearMap();
  const colors = ["red", "blue", "yellow", "orange", "purple"];

  fetch("/api/clusters")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((school) => {
      const color = colors[school.cluster];
      L.circleMarker([school.lat, school.lon], {
        radius: 8,
        color: "#000",
        weight: 1,
        fillColor: color,
        fillOpacity: 0.8,
      })
              .addTo(mymap)
              .bindPopup(`<strong>${school.Name || "Skola"}</strong><br>Kluster: ${school.cluster}`);
          });
      });
}
