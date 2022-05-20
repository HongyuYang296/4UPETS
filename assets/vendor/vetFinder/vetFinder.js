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
let searDistance;
let openData;

console.log(inputPos);
console.log(pos);


function saveUserData() {
    inputPos = document.getElementById('InputAddress').value + ',au';
    //       document.getElementById("demo").innerHTML =inputPos;
    searDistance = document.getElementById('km').value;
    console.log("distance is: " + searDistance);
    console.log("users value is: " + inputPos);
    updateMap();
}

function updateMap(){
    document.getElementById('temps').innerHTML = "";
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */
    infoPane = document.getElementById('panel');
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
            infoWindow.setContent(' new Location.');
            infoWindow.open(map);
            map.setCenter(pos2);

            // Call Places Nearby Search on user's location
            getNearbyPlaces(pos2);

        } else {
            handleLocationError2(false, infoWindow);
        }

    });
}

function backToYourLocation() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */
    infoPane = document.getElementById('panel');
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });

    bounds.extend(pos);
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location find.');
    infoWindow.open(map);
    map.setCenter(pos);

    // Call Places Nearby Search on user's location
    searDistance = 5000;
    getNearbyPlaces(pos);
}

function initMap() {
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow;
    currentInfoWindow = infoWindow;
    /* TODO: Step 4A3: Add a generic sidebar */

    infoPane = document.getElementById('panel');

    // Try HTML5 geolocation
    if (navigator.geolocation && inputPos == null) {
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
            searDistance = 5000;
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
        radius: searDistance,
        keyword: 'vet'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

// Handle the results (up to 20) of the Nearby Search
function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);
        showOnList(results);
        //     console.log(results);
    }
}

function detailCallback(results, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
        showOnList2(results);
        //         console.log(results.opening_hours.isOpen());
    }
}


function showOnList2(places){
    //      console.log(places.name);

    //      document.getElementById('tests').innerHTML += places

    //  var i,
    //      len = places.address_components.length;
    //  for (i=0; i<len; i++) {
    //      const content = '<div class="task">\n' +
    //          '                <div class="abstract">\n' +
    //          '                    <h5>' +
    //          places[i].address_components.name +
    //          '</h5>\n' +
    //          '                    <p>' +
    //          '<i class="fa fa-map-marker"></i>'+ ' ' +
    //          places[i].vicinity +
    //          '</p>\n' +
    //          '                </div>\n' +
    //          '                <div class="details">\n' +
    //          '                    <div class="details__inner">\n' +
    //          '                        <h5>Details</h5>\n' +
    //          '<p>' + 'Rating: ' +
    //          places[i].rating + ' ' +
    //          '<i class="fa fa-star" aria-hidden="true"></i>'+
    //          '</p>\n' +
    //          '<p>'+ 'openss:'+ places[i].opening_hours + '</p>' +
    //          '                    </div>\n' +
    //          '                </div>\n' +
    //          '            </div>' +
    //          '            <br>'
    //      document.getElementById('temps').innerHTML += content
    // }

}



function showOnList(places){
    var i,
        len = places.length;
//        console.log('ee'+ places.length);
    const findVet =  'Nearby Vets '+'('+ len + ' results)';
    document.getElementById('findVets').innerHTML = findVet;


    //       console.log(places)
    // for (var i=0; i<6; i++) {
    //     console.log(openResults.opening_hours.weekday_text[i])
    // }
    service = new google.maps.places.PlacesService(map);
    for (i=0; i<len; i++) {
        let request = {
            placeId : places[i].place_id
        };

        service.getDetails(request, detailCallback)


        const content1 = '<div class="task">\n' +
            '                <div class="abstract">\n' +
            '                    <h5>' +
            places[i].name +
            '</h5>\n' +
            '                </div>\n' +
            '                <div class="details">\n' +
            '                    <div class="details__inner">\n' +
            '                        <h5>Details</h5>\n' +
            '                    <p>' +
            '<i class="fa fa-map-marker"></i>'+ ' ' +
            places[i].vicinity +
            '</p>\n' +
            '<p>' + 'Rating: ' +
            places[i].rating + ' ' +
            '<i class="fa fa-star" aria-hidden="true"></i>'+
            '</p>\n' +
            '<p>'+ 'Open now: Opening</p>\n' +
            '<a href="https://www.gihosoft.com/youtube-downloader/purchase.html?from=prod"> open on google map ' +
            '</a>'+
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>' +
            '            <br>'


        const content2 = '<div class="task">\n' +
            '                <div class="abstract">\n' +
            '                    <h5>' +
            places[i].name +
            '</h5>\n' +
            '                </div>\n' +
            '                <div class="details">\n' +
            '                    <div class="details__inner">\n' +
            '                        <h5>Details</h5>\n' +
            '                    <p>' +
            '<i class="fa fa-map-marker"></i>'+ ' ' +
            places[i].vicinity +
            '</p>\n' +
            '<p>' + 'Rating: ' +
            places[i].rating + ' ' +
            '<i class="fa fa-star" aria-hidden="true"></i>'+
            '</p>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>' +
            '            <br>'


        var openNot = places[i].opening_hours.open_now;
        if (openNot === true) {
            document.getElementById('temps').innerHTML += content1;
        }else {
            document.getElementById('temps').innerHTML += content2;
        }



        console.log(places[i].name);
    }

    places.forEach(place => {
        const title = place.name;
        console.log(title)

        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
    });

}


// Set markers at the location of each place result
let icon = {
    url: "http://4upets.live/wp-content/uploads/2022/05/WechatIMG68.png", // url
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
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        let open = placeResult.opening_hours.weekday_text + '';
        let open2 = open.split(',')

        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
            '</strong><br><br>'+
            open2[0] + '<br>' +
            open2[1] + '<br>' +
            open2[2] + '<br>' +
            open2[3] + '<br>' +
            open2[4] + '<br>' +
            open2[5] + '<br>' +
            open2[6] + '<br>' +
            '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
    } else {
        console.log('showDetails failed: ' + status);
    }
}

/* TODO: Step 4D: Load place details in a sidebar */
// Displays place details in a sidebar
function showPanel(placeResult) {
    // If infoPane is already open, close it
    if (infoPane.classList.contains("open")) {
        infoPane.classList.remove("open");
    }

    // Clear the previous details
    while (infoPane.lastChild) {
        infoPane.removeChild(infoPane.lastChild);
    }

    /* TODO: Step 4E: Display a Place Photo with the Place Details */
    // Add the primary photo, if there is one
    if (placeResult.photos) {
        let firstPhoto = placeResult.photos[0];
        let photo = document.createElement('img');
        photo.classList.add('hero');
        photo.src = firstPhoto.getUrl();
        infoPane.appendChild(photo);
    }

    // Add place details with text formatting
    let name = document.createElement('h1');
    name.classList.add('place');
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating) {
        let rating = document.createElement('p');
        rating.classList.add('details');
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
    }
    let address = document.createElement('p');
    address.classList.add('details');
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
        let websitePara = document.createElement('p');
        let websiteLink = document.createElement('a');
        let websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
    }

    // Open the infoPane
    infoPane.classList.add("open");
}

// autocomplete address when user input
function initAutocomplete() {
    address1Field = document.querySelector('#search-address');
    // Create the autocomplete object, restricting the search predictions to
    // addresses in the US and Canada.
    autocomplete = new google.maps.places.Autocomplete(address1Field, {
        componentRestrictions: {country: 'au'},
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    address1Field.focus();
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
}
