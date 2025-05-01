function loadSchools() {
  // Skapar template för skolorna
  const schoolData = [
      {
        name: "Neptuniskolan",
        coords: [59.384911471411755, 17.83675616886731],
        popupImg: "neptuniskolan.jpg",
        info: `
          <h3>Neptuniskolan</h3>
          <p>Antal elever: 350</p>
          <p>Adress: Neptunigatan 12, Järfälla</p>
          <img src='/static/img/neptuniskolan.jpg' width='200px'>
          `
      },
      {
        name: "Stockholms Universitet",
        coords: [59.366121405055026, 18.06012909690233],
        popupImg: "universitet.jpg",
        info: `
          <h3>Stockholms Universitet</h3>
          <p>Antal studenter: 30 000+</p>
          <p>Adress: Universitetsvägen 10A, Stockholm</p>
          <img src='/static/img/universitet.jpg' width='200px'>
          `
      },
      {
        name: "Försvarshögskolan",
        coords: [59.349072938891425, 18.06914564190444],
        popupImg: "Försvarshögskolan.png",
        info: `
          <h3>Försvarshögskolan</h3>
          <p>Fokus: Försvar, säkerhet & krisberedskap</p>
          <p>Adress: Drottning Kristinas väg 37, Stockholm</p>
          <img src='/static/img/Försvarshögskolan.png' width='200px'>
          `
      },
      {
        name: "Karolinska Institutet",
        coords: [59.21920478627072, 17.93479121886577],
        popupImg: "Karolinska universitetet.jpg",
        info: `
          <h3>Karolinska Institutet</h3>
          <p>Antal studenter: 6 000+</p>
          <p>Adress: Nobels väg 6, Solna</p>
          <img src='/static/img/Karolinska universitetet.jpg' width='200px'>
          `
      },
      {
        name: "Björkebyskolan",
        coords: [59.398737842997406, 17.849838410067036],
        popupImg: "björkebyskolan.jpg",
        info: `
          <h3>Björkebyskolan</h3>
          <p>Antal elever: 450</p>
          <p>Adress: Björkebyvägen 10, Järfälla</p>
          <img src='/static/img/björkebyskolan.jpg' width='200px'>
          `
      }
  ];

    const schoolCoords = [
      [59.384911471411755, 17.83675616886731], // Neptun
      [59.366121405055026, 18.06012909690233], // SU
      [59.349072938891425, 18.06914564190444], // Försvars
      [59.21920478627072, 17.93479121886577],  // Karolinska
      [59.398737842997406, 17.849838410067036] // Björkes
    ];
  
    // Skapa polyline för linjerna mellan skolor
    const polyline = L.polyline(schoolCoords, { color: "blue" }).addTo(mymap);

    // Loopar igenom skol data arrayen för att leta efter specifik skola beroende på vilken marker som tryckts på. Är en onclick function
    schoolData.forEach(school => {
      const marker = L.marker(school.coords).addTo(mymap);
      marker.bindPopup(`<h3>${school.name}</h3><img src='/static/img/${school.popupImg}' width='150px'>`);
      marker.on('click', function() {
        ctlSlidebar.show();
        $("#school-info").html(school.info);
      });
    });
  
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
  
  