
// Create a map instance
const map = L.map('viewer').setView([30.4515, -91.1871], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

projects = document.getElementById('projects')
info = document.getElementById('info')
// draw 3 divs next to the map that represent 3 differnt projects
// each div will have a button that when clicked will draw a line on the map
// start code
const project1 = document.createElement('div');
project1.style.width = '100px';
project1.style.height = '100px';
project1.style.backgroundColor = 'red';
project1.style.float = 'right';
projects.appendChild(project1);

const project2 = document.createElement('div');
project2.style.width = '100px';
project2.style.height = '100px';
project2.style.backgroundColor = 'blue';
project2.style.float = 'right';
projects.appendChild(project2);

const project3 = document.createElement('div');
project3.style.width = '100px';
project3.style.height = '100px';
project3.style.backgroundColor = 'green';
project3.style.float = 'right';
projects.appendChild(project3);

const line = document.createElement('div');
line.style.width = '100px';
line.style.height = '100px';
line.style.backgroundColor = 'black';
line.style.float = 'right';
projects.appendChild(line);

line1 =  L.polyline([[30.50605701015909, -91.17261886596681], [30.527204300845384, -91.1195755004883]]);
line1_visible = false;
line2 =  L.polyline([[30.4515, -91.1871], [30.4515, -91.1873]]);
line2_visible = false;
line3 =  L.polyline([[30.4515, -91.1871], [30.4515, -91.1874]]);
line3_visible = false;

project1.addEventListener('click', () => {
   line1.addTo(map);
    // focus on the line
    map.setView(line1.getCenter(), 13);
    line1_visible = true;
    line2_visible = false;
    line3_visible = false;
    line2.remove();
    line3.remove();
    updateVisibleLots(line1);
})

project2.addEventListener('click', () => {
    line2.addTo(map);
    //focus on the line
    map.setView(line2.getCenter(), 13);
    line2_visible = true;
    line1_visible = false;
    line3_visible = false;
    line1.remove();
    line3.remove();
    updateVisibleLots(line2);
})

project3.addEventListener('click', () => {
    line3.addTo(map);
    //focus on the line
    map.setView(line3.getCenter(), 13);
    line3_visible = true;
    line1_visible = false;
    line2_visible = false;
    line2.remove();
    line1.remove();
    updateVisibleLots(line3);
})
// end code


// Allow to plot a line to represent a project.
// filter the lots to only show the lots whos polygon is touched by the line 

//remove the previous visible lots
function updateVisibleLots(visible_line) {
    map.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
            layer.remove();
        }
    });

    visible_lots = {
        "type": "FeatureCollection",
        "name": "Lot",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": []
    }
    visible_lots.features = lots.features.filter(lot => {
        // use turf.js to check if the line intersects with the lot
        return turf.booleanIntersects(lot, visible_line.toGeoJSON());
    })
    visible_lots.features.map(lot => {
        console.log(lot)
        let landCard = document.createElement('land-info-card');
        landCard.setAttribute('data', JSON.stringify(lot.properties));
        info.appendChild(landCard)
        
    })
    L.geoJSON(visible_lots).addTo(map);
}


map.on('click', function(e) {
    // Extract the latitude and longitude from the event object
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Display the latitude and longitude
    console.log("Latitude: " + lat + ", Longitude: " + lng);
});