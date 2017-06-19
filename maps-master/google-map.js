
/**
 * Config
 */

var marker,
    map,
    drag_and_drop = true, // allow drag and drop of marker?
    click_and_drop = true, // allow click and drop of marker?
    latitude = -6.726154685670986, // default latitude when map loads
    longitude = 111.04843139648438, // default longitude when map loads
    search_icon_url = "http://maps.google.com/mapfiles/kml/pal4/icon26.png", // what to mark searched places with
    zoom = 10; // how close to zoom in




/**
 * Place marker on coordinates
 * @param  {object} location {J: 14.557653862512797, M: 121.01658225059509}
 */
function placeMarker(location) {
    console.log(typeof location);
      if (marker === undefined){
          marker = new google.maps.Marker({
              position: location,
              map: map,
              animation: google.maps.Animation.DROP,
          });
      }
      else{
          marker.setPosition(location);
      }

      /**
       * Uncomment to set marker at center
       */
      // map.setCenter(location);
}  

/**
 * Initialize Google Map
 */

function initialize() {
    var $latitude = document.getElementById('latitude');
    var $longitude = document.getElementById('longitude');
    $latitude.value = latitude; 
    $longitude.value = longitude;

    var LatLng = new google.maps.LatLng(latitude, longitude);

    /**
     * Instantiate Map
     */
    var mapOptions = {
        zoom: zoom,
        center: LatLng,
        panControl: false,
        zoomControl: false,
        scaleControl: true,
        draggableCursor: 'pointer',
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }  
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    /**
     * Instantiate marker
     */
    var marker_setting = {
        position: LatLng,
        map: map,
        title: 'Drag and Drop'
    }  
    if(drag_and_drop === true){
        marker_setting.draggable = true;
    }    
    marker = new google.maps.Marker(marker_setting);


    /**
     * Create the search box and link it to the UI element.
     */
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    /**
     * Bias the SearchBox results towards current map's viewport.
     */
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    /**
     * [START region_getplaces]
     * Listen for the event fired when the user selects a prediction and retrieve
     * more details for that place.
     */
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: search_icon_url,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: search_icon_url,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
            map.fitBounds(bounds);
    });
    // [END region_getplaces]

    /**
     * Listen for click event, update marker location,update coordinates
     */
    if(click_and_drop === true){
        google.maps.event.addListener(map, 'click', function(event) {
            console.log(event.latLng.lat());
            console.log(event.latLng.lng());
            console.log('event.latLng:');
            console.log(event.latLng);
            placeMarker(event.latLng);
            $latitude.value = event.latLng.lat();
            $longitude.value = event.latLng.lng();        
        });          
    }

    /**
     * Listen for marker drag event and update coordinates
     */
    if(drag_and_drop === true){
        google.maps.event.addListener(marker, 'dragend', function(marker){
          var latLng = marker.latLng;
          $latitude.value = latLng.lat();
          $longitude.value = latLng.lng();
        });      
    }
}

/**
 * Fire the initialize function
 */
initialize();