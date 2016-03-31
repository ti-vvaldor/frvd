$(document).ready(function(){

    var mapLayerGroups = [];
    var lat,long;
    var layerFacile, layerIntermediaire,layerDifficile;
    lat = 48.0588;
    long = -77.7936;
    console.log ('lat is '+lat);
    console.log('long is ' +long);
    var map = L.mapbox.map('map','mapbox.satellite',{accessToken:'pk.eyJ1IjoidnZhbGRvciIsImEiOiJjaWx0a3VhaXowMDkxdmdrc2Z4c256OGp2In0.txeFQrlL85WTya456LL15w'}).setView([lat,long],13);
    var geojsonLayer = L.mapbox.featureLayer({accessToken:'pk.eyJ1IjoidnZhbGRvciIsImEiOiJjaWx0a3VhaXowMDkxdmdrc2Z4c256OGp2In0.txeFQrlL85WTya456LL15w'}).loadURL('map.geojson').addTo(map);

    addCurrentLocationToMap = function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                lat = position.coords.latitude;
                long = position.coords.longitude;
                var marker = L.marker([lat,long],{opacity:'0.6'}).addTo(map);
                marker.bindPopup('Votre position:<br>'+ lat +', '+ long);
                map.panTo([lat,long]).zoomIn(10);
            });
        }
    };

    function showLayer(id) {
    }
    function hideLayer(id) {
    }
    $('#get-facile').click(function(event){
        hideLayer('difficile');
        hideLayer('intermediaire');
        showLayer("facile");
    });
    $('#get-intermediaire').click(function(){

        hideLayer('facile');
        hideLayer('difficile');
        showLayer("intermediaire");
    });

    $('#get-position').click(function(event){
        addCurrentLocationToMap();
    });


})
