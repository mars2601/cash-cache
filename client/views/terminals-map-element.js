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


var _tpl;

module.exports = Backbone.View.extend( {

  "el": "<section />",

  "constructor": function( oTerminalModel ) {
    Backbone.View.apply( this, arguments );

    this.model = oTerminalModel;

    // en faisant comme ceci, on écrase le template à chaque fois, il ne faut l'affecter qu'une seule fois
    // _tpl = $( "#tpl-result-list-elt" ).remove().text();
    if( !_tpl ) {
      _tpl = $( "#tpl-map-elt" ).remove().text();
    }
  },



  "render": function( map, myPoints, aMarkers ) {
    var oBank = this.model.get( "bank" );
    var oBankId = this.model.get( "id" );

    // Terminal marker
    var oTerminalPosition = {
      "latitude": this.model.get( "latitude" ),
      "longitude": this.model.get( "longitude" )
    };

    // add markers to myPoints array
    myPoints.push( new google.maps.LatLng(oTerminalPosition.latitude, oTerminalPosition.longitude));

    var bounds = new google.maps.LatLngBounds();

    var image = '../images/markers/terminal-marker.png';
    var TerminalLatlng = new google.maps.LatLng(oTerminalPosition.latitude,oTerminalPosition.longitude);

    addMarker(TerminalLatlng, image);

    // add marker to aMarker array
    function addMarker(location, image){
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "My position" ,
        icon: image
      });

      // On click marker redirection -> Details Terminal
      google.maps.event.addListener(marker, 'click', function() {
        window.app.router.navigate( "terminals/details/"+oBankId, { trigger: true } );
      });

      aMarkers.push(marker);
    };

    // fix the map bounds
    for(var i = 0; i < myPoints.length; i++){
      bounds.extend(myPoints[i]);
      // var thisMarker = addThisMarker(myPoints[i],i);
      // thisMarker.setMap(map);
    };
    map.fitBounds(bounds);
    map.setZoom(map.getZoom() - 1);

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
