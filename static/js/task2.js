  function loadSchoolLines() {
    const schoolCoords = [
      [59.384911471411755, 17.83675616886731], // Neptun
      [59.366121405055026, 18.06012909690233], // SU
      [59.349072938891425, 18.06914564190444], // Försvars
      [59.21920478627072, 17.93479121886577],  // Karolinska
      [59.398737842997406, 17.849838410067036] // Björkes
    ];
  
    // Skapa polyline för linjerna mellan skolor
    const polyline = L.polyline(schoolCoords, { color: "blue" }).addTo(mymap);
  
    // Lägg till polylineMeasure-kontrollen för att mäta avståndet
    let polylineMeasure = L.control.polylineMeasure({
      position: 'topleft',
      unit: 'kilometres', 
      showBearings: true, // Visa riktning
      clearMeasurementsOnStop: false, 
      showClearControl: true, 
      showUnitControl: true // Visa enhet
    }).addTo(mymap);
  
    // Lägg till linjen till polylineMeasure för att mäta avstånd
    polylineMeasure.seed([schoolCoords]);
  
    // Popup med information om linjen
    polyline.bindPopup("<h3>Skollinje</h3><p>Förbindelse mellan skolor</p>");
  }
  
  
  document.getElementById("l3").addEventListener('click', function() {
    loadSchoolLines();
  });
  
  