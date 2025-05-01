function weatherDestinations(){
    const weatherStations = {
        "Göteborg": {id: 98230, coords: [57.7089, 11.9746]},
        "Falun": {id: 97100, coords: [60.6072, 15.6310]},
        "Uppsala": {id: 97510, coords: [59.8586, 17.6389]},
        "Stockholm": {id: 97400, coords: [59.6269, 17.9545]},
        "Västerås": {id: 97400, coords: [59.6099, 16.5448]}
    };

    let weatherMarker;
    function goToWeather(cityName) {
        const station = weatherStations[cityName];
        const smhiUrl = `https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/${station.id}/period/latest-hour/data.json`;

        fetch(smhiUrl)
            .then(response => response.json())
            .then(data => {
                const temp = data.value[0].value;
                const time = new Date(data.value[0].date).toLocaleString();

                if (weatherMarker) {
                    mymap.removeLayer(weatherMarker);
                }

                weatherMarker = L.marker(station.coords)
                    .addTo(mymap)
                    .bindPopup(`<h4>${cityName}</h4><p><strong>${temp}°C</strong></p><p><small>${time}</small></p>`)
                    .openPopup();

                mymap.flyTo(station.coords, 12);
            })
            .catch(error => {
                console.error("Fel vid hämtning av väderdata:", error);
            });
    }

    $("#btnGbgWeather").click(() => { goToWeather("Göteborg"); });
    $("#btnSthlmWeather").click(() => { goToWeather("Stockholm"); });
    $("#btnUppsalaWeather").click(() => { goToWeather("Uppsala"); });
    $("#btnFalunWeather").click(() => { goToWeather("Falun"); });
    $("#btnVasterasWeather").click(() => { goToWeather("Västerås"); });

}