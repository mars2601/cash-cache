/* Chèch Lajan
 *
 * /views/terminals-list-element.js - backbone terminals list view
 *
 * started @ 12/12/14
 */

"use strict";

var _ = require( "underscore" ),
    Backbone = require( "backbone" ),
    $ = require( "jquery" );

Backbone.$ = require( "jquery" );

var _tpl;

module.exports = Backbone.View.extend( {

    "el": "<li />",

    "constructor": function( oTerminalModel ) {
        Backbone.View.apply( this, arguments );

        this.model = oTerminalModel;

        // en faisant comme ceci, on écrase le template à chaque fois, il ne faut l'affecter qu'une seule fois
        // _tpl = $( "#tpl-result-list-elt" ).remove().text();
        if( !_tpl ) {
            _tpl = $( "#tpl-result-list-elt" ).remove().text();
        }
    },

    "events": {
        "click a": "showTerminal"
    },

    "render": function() {
        var oBank = this.model.get( "bank" );

        this.$el
            .html( _tpl )
            .find( "a" )
              .css("border-left", "solid 6px #" + ( oBank && oBank.color ? oBank.color : "333" ))
              // .attr( "style", "border-left: 3px solid #" + (oBank && oBank.color ? oBank.color : "333"))
              .end()
                .find( "img" )
                    .attr( "src", oBank && oBank.icon ? "/images/banks/" + oBank.icon : "images/banks/unknown.png" )
                    .attr( "alt", oBank && oBank.name ? oBank.name : "Inconnu" )
                    .end()
                .find( "strong" )
                    .css( "color", "#" + ( oBank && oBank.color ? oBank.color : "333" ) )
                    .text( oBank && oBank.name ? oBank.name : "Inconnu" )
                    .end()
                .find( "span" )
                    .text( ( parseFloat( this.model.get( "distance" ) ) * 1000 ) + "m" );
        return this;
    },

    "showTerminal": function( e ) {
        e.preventDefault();
        window.app.router.navigate( "terminals/details/" + this.model.get( "id" ), { trigger: true } );
    }

} );
