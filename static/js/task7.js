
function task7Kluster() {
  const colors = ["red", "blue", "yellow", "orange", "purple"];
  fetch("/api/clusters")
    .then((res) => res.json())
    .then((data) => {
      const clusters = data.clusters; // array med skolorna vi visar, vi returnerar objekt från main.py och behöver denna för att hantera objekten som kommer. ( optimal_k, clusters)
      clusters.forEach((school) => {
        const color = colors[school.cluster % colors.length]; // out of range hanterare
        L.circleMarker([school.lat, school.lon], {
          radius: 8,
          color: "#000",
          weight: 1,
          fillColor: color,
          fillOpacity: 0.8,
        })
          .addTo(mymap)
          .bindPopup(
            `<strong>${school.Name || "Skola"}</strong><br>Kluster: ${school.cluster}`
          );
      });
    });
}
