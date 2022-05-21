/* Note: This example requires that you consent to location sharing when
  * prompted by your browser. If you see the error "Geolocation permission
  * denied.", it means you probably did not give permission for the browser * to locate you. */
let pos;
let pos2;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;
let inputPos=null;



function saveUserData() {
    inputPos = document.getElementById('InputAddress').value;
    //       document.getElementById("demo").innerHTML =inputPos;

//    console.log(inputPos);
    updateMap();
}

function updateMap(){
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': inputPos}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var latitude = parseFloat(results[0].geometry.location.lat());
            var longitude = parseFloat(results[0].geometry.location.lng());
            pos2 = {lat: latitude, lng: longitude};
            console.log(pos);
            console.log(pos2);
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos2,
                zoom: 15
            });

            bounds.extend(pos2);

            infoWindow.setPosition(pos2);
            infoWindow.setContent(' Input Location.');
            infoWindow.open(map);
            map.setCenter(pos2);

            // Call Places Nearby Search on user's location
            getNearbyPlaces(pos2);

        } else {
            handleLocationError2(false, infoWindow);
        }

    });
}




function initMap() {
    // Initialize variables
    document.getElementById("InputAddress").innerHTML = null;

    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */

    infoPane = document.getElementById('panel');

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log(pos);
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15
            });
            bounds.extend(pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            // Call Places Nearby Search on user's location
            getNearbyPlaces(pos);
        }, () => {
            // Browser supports geolocation, but user has denied permission
            handleLocationError(true, infoWindow);
        });
    }
    else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
    }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
    // Set default location to Sydney, Australia
    pos = { lat: -33.856, lng: 151.215 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
}

// handle can't find location
function handleLocationError2(browserHasGeolocation, infoWindow) {
    // Set default location to Sydney, Australia
    pos = { lat: -33.856, lng: 151.215 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: can\'t find this geolocation, this is the default location');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;

    // Call Places Nearby Search on the default location
    getNearbyPlaces(pos);
}




// Perform a Places Nearby Search Request
function getNearbyPlaces(position) {
    let request = {
        location: position,
        radius: 3000,
        keyword: 'park',
        type: 'park'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);

    } else {
        document.getElementById('findVets').innerHTML = 'Nearby Vets (0 results)';
    }
}




// Set markers at the location of each place result
let icon = {
    url: "http://4upets.live/wp-content/uploads/2022/05/park.png",
    scaledSize: {width: 41, height: 41}
};
// Set markers at the location of each place result
function createMarkers(places) {
    places.forEach(place => {
        let marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: icon,
            title: place.name
        });

        /* TODO: Step 4B: Add click listeners to the markers */
        // Add click listener to each marker
        google.maps.event.addListener(marker, 'click', () => {
            let request = {
                placeId: place.place_id,
                fields: ['name', 'formatted_address', 'geometry', 'rating',
                    'website', 'opening_hours','photos']
            };

            /* Only fetch the details of a place when the user clicks on a marker.
             * If we fetch the details for all place results as soon as we get
             * the search response, we will hit API rate limits. */
            service.getDetails(request, (placeResult, status) => {
                showDetails(placeResult, marker, status)
            });
        });

        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
    });
    /* Once all the markers have been placed, adjust the bounds of the map to
     * show all the markers within the visible area. */
    map.fitBounds(bounds);
}

/* TODO: Step 4C: Show place details in an info window */
// Builds an InfoWindow to display details above the marker
function showDetails(placeResult, marker, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();

        if (placeResult.rating)
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
            '</strong><br><br>'+
            'Rating: ' +
            placeResult.rating + '<br>'+
            '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
    } else {
        console.log('showDetails failed: ' + status);
    }
}





