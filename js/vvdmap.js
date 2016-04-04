$(document).ready(function() {
    moment.locale('fr-ca');
    var lat, long;
    lat = 48.0588;
    long = -77.7936;

    console.log('lat is ' + lat);
    console.log('long is ' + long);
    var pointList = [];
    var firstpolyline = new L.polyline(pointList, {
        color: 'red',
        weight: 8,
        opacity: 0.8,
        smoothFactor: 1
    });
    var map = L.mapbox.map('map', 'mapbox.satellite', {accessToken: 'pk.eyJ1IjoidnZhbGRvciIsImEiOiJjaWx0a3VhaXowMDkxdmdrc2Z4c256OGp2In0.txeFQrlL85WTya456LL15w'}).setView([lat, long], 13);
    var smallGeoJsonLayer = L.mapbox.featureLayer('js/smallmap.geojson', {accessToken: 'pk.eyJ1IjoidnZhbGRvciIsImEiOiJjaWx0a3VhaXowMDkxdmdrc2Z4c256OGp2In0.txeFQrlL85WTya456LL15w'});
    var allGeoJsonLayer = L.mapbox.featureLayer('js/vdm.geojson', {accessToken: 'pk.eyJ1IjoidnZhbGRvciIsImEiOiJjaWx0a3VhaXowMDkxdmdrc2Z4c256OGp2In0.txeFQrlL85WTya456LL15w',style:function(feature){
        switch (feature.properties.Niveau){
            case 'Facile':return {color:'#00ff00'};
            case 'Difficile':return {color:'#ff0000'};
        }
    }});
    var precipitation = L.tileLayer('http://maps.owm.io:8091/570273c14ccf430100c369d5/{z}/{x}/{y}?hash=5bd7e312c6736ad1b25fc201563578ec', {
        attribution: 'Map data © OpenWeatherMap',
        maxZoom: 18
    });
    var vents = L.tileLayer('http://maps.owm.io:8091/570275d44ccf430100c369d8/{z}/{x}/{y}?hash=5bd7e312c6736ad1b25fc201563578ec', {
        attribution: 'Map data © OpenWeatherMap',
        maxZoom: 18
        });
    var nuages = L.tileLayer('http://maps.owm.io:8091/570278c94ccf430100c369dd/{z}/{x}/{y}?hash=5bd7e312c6736ad1b25fc201563578ec',{
        attribution: 'Map data © OpenWeatherMap',
        maxZoom: 18
    });
    var control = L.control.layers(null,{
        'Facile': smallGeoJsonLayer,
        'Difficile': allGeoJsonLayer,
        'Vents':vents,
        'Précipitation':precipitation,
        'Nuages':nuages
    });

    var tid;

     addCurrentLocationToMap = function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                lat = position.coords.latitude;
                long = position.coords.longitude;
                var marker = L.marker([lat,long]);
                pointList.push(marker.getLatLng());
                marker.addTo(map);
                marker.bindPopup('Votre position:<br>'+ lat +', '+ long+ '<br />Temps: '+moment().format('DD MMMM YYYY, h:mm:ss a'));
                map.setView([lat,long],16);
                firstpolyline.addLatLng(marker.getLatLng());
            });
        }
    };
    function startTimer() {
        addCurrentLocationToMap();
       tid = setTimeout(startTimer, 30000);
    }
    function abortTimer() {
        clearTimeout(tid);
    }


    firstpolyline.addTo(map);
    control.addTo(map);
    firstpolyline.on('click',function(){
       map.fitBounds(this.getBounds());
        this.bindPopup('Distance: ' + this.measuredDistance()).addTo(map);
        console.log(this.measuredDistance());
    });

    addCurrentLocationToMap();

    $('#get-position').click(function(event){
        addCurrentLocationToMap();
    });
    $('#get-stop').click(function(){
        abortTimer();
        $(this).hide();
        $('#get-start').show();
    });
    $('#get-start').click(function(){
        startTimer();
        $(this).hide();
        $('#get-stop').show();
    });
$('#get-stop').hide();
/*
    var onEachFeature = function(feature, layer) {
        // Load the default style.
        layer.setStyle(defaultStyle);
        // Create a self-invoking function that passes in the layer
        // and the properties associated with this particular record.
        (function(layer, properties) {
            // Create a mouseover event
            layer.on("mouseover", function (e) {
                // Change the style to the highlighted version
                layer.setStyle(highlightStyle);
                // Create a popup with a unique ID linked to this record
                var popup = $("<div></div>", {
                    id: "popup-" + properties.DISTRICT,
                    css: {
                        position: "absolute",
                        bottom: "85px",
                        left: "50px",
                        zIndex: 1002,
                        backgroundColor: "white",
                        padding: "8px",
                        border: "1px solid #ccc"
                    }
                });
                // Insert a headline into that popup
                var hed = $("<div></div>", {
                    text: "District " + properties.DISTRICT + ": " + properties.REPRESENTATIVE,
                    css: {fontSize: "16px", marginBottom: "3px"}
                }).appendTo(popup);
                // Add the popup to the map
                popup.appendTo("#map");
            });
            // Create a mouseout event that undoes the mouseover changes
            layer.on("mouseout", function (e) {
                // Start by reverting the style back
                layer.setStyle(defaultStyle);
                // And then destroying the popup
                $("#popup-" + properties.DISTRICT).remove();
            });
            // Close the "anonymous" wrapper function, and call it while passing
            // in the variables necessary to make the events work the way we want.
        })(layer, feature.properties);
    };
    */
    $('#login').click(function(){
        alert('Section membre non disponible');
    })
});
