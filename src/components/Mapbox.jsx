let map = new mapboxgl.Map({
    container: 'map',
    center: [-123.1121, 49.2569],
    zoom: 10,
    style:
    'mapbox://styles/mapbox/streets-v11',
    accessToken: '<your_access_token>'
});

map.addControl(
    new mapboxgl.NavigationControl());