/* Chèch Lajan
*
* /views/terminal-map.js - backbone terminal map view
*
* started @ 19/12/14
*/

"use strict";

var _ = require( "underscore" ),
Backbone = require( "backbone" ),
$ = require( "jquery" ),
jeyodistans = require( "jeyo-distans" );

Backbone.$ = require( "jquery" );

var TerminalMapView = require( "./terminals-map-element" );

var _tpl;
var myPoints = [];
var aMarkers = [];

module.exports = Backbone.View.extend( {

  "el": "<section />",

  "constructor": function( oTerminalsCollection ) {
    Backbone.View.apply( this, arguments );

    this.collection = oTerminalsCollection;

    console.log( "TerminalsMapView:init()" );

    if( !_tpl ) {
      _tpl = $( "#tpl-map" ).remove().text();
    }
  },

  "events": {},

  "render": function( map, oPosition ) {

    // display the back buttons
    $("#header")
      .find("#back")
        .css("display", "block")
        .end()

    // hide the problem buttons
    $("#header")
      .find("#problems")
        .css("display", "none")
        .end()

    // display the status button
    $(document).find( ".status" )
      .css( "display", "block" )
      .end();

    // blured turn off
    $("#gmap")
      .removeAttr("class")
      .end();

    // User current marker
    var oCurrentPosition = {
      "latitude": oPosition.latitude,
      "longitude": oPosition.longitude
    };

    var mapOptions = {
      center: {
        lat: oCurrentPosition.latitude,
        lng: oCurrentPosition.longitude
      },
      zoom: 16,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false,
      scaleControl: true,
      styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}]
    };
    map = new google.maps.Map(document.getElementById('gmap'), mapOptions);



    var image = '../images/markers/me-marker.png';
    var CurrentLatlng = new google.maps.LatLng( oCurrentPosition.latitude, oCurrentPosition.longitude );

    addMarker(CurrentLatlng, image);

    function addMarker(location, image){
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "My position" ,
        icon: image
      });
      aMarkers.push(marker);
    };

    myPoints.push( new google.maps.LatLng( oCurrentPosition.latitude, oCurrentPosition.longitude ));

    this.collection.each( function( oTerminalModel ) {
      ( new TerminalMapView( oTerminalModel ) ).render( map, myPoints, aMarkers );
    } );


    return this;
  },

  "toggleEmptyState": function( e ) {
    e.preventDefault();
    var that = this;
    this.model.set( "empty", false );
    this.model.save( null, {
      "url": "/api/terminals/" + this.model.get( "id" ) + "/empty",
      "success": function() {
        that.$el
        .find( "empty" )
        .show()
        .end()
        .find( ".problems" )
        .hide();
      }
    } );
  }

} );
