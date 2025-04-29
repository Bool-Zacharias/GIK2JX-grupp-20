function loadTask7() {
  function clearMap() {
      mymap.eachLayer((layer) => {
          if (layer instanceof L.TileLayer) {
              // Behåll bakgrundskartan (OSM)
          } else {
              mymap.removeLayer(layer);
          }
      });
  }

  clearMap();
  mymap.setView([59.33559401837791, 18.021282737696875], 10);

  const colors = ["red", "blue", "green", "orange", "purple"];

  fetch("/api/clusters")
      .then((res) => {
          if (!res.ok) {
              throw new Error("HTTP error " + res.status);
          }
          return res.json();
      })
      .then((data) => {
          data.forEach((school) => {
              const color = colors[school.cluster % colors.length]; // För säkerhets skull
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
      })
      .catch((err) => {
          console.error("Fel vid hämtning av klusterdata:", err);
          alert("Kunde inte ladda klusterdata. Se konsolen för detaljer.");
      });
}

// Koppla till knappen
$("#btnTask7").click(() => {
  loadTask7();
});
