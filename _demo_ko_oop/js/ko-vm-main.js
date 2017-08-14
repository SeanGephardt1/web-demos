/// <reference path="../script/knockout-3.4.2.js" />
"use strict";
function MainViewModel( _demo_name, _debug_flag )
{
	console.debug( ko.version );
	console.debug( ko.options );
	//	console.debug( ko.computedContext );
    var _self = this;
    this.DEBUG = ko.observable( _debug_flag || false );
    this.ID = ko.pureComputed( function ()
    { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); },
	this );

    this.Name = ko.observable( _demo_name );
    this.DocumentTitle = ko.computed( function ()
    {
    	document.title = this.Name() + " | " + this.ID();
    	return;
    }, this );


    this.Collection = ko.observableArray( [
		new GrandParent_ViewModel( this, { name: "Grandpa" } ),
		new GrandParent_ViewModel( this, { name: "Grandma" } ),
		new Parent_ViewModel( this, { name: "Sean" }),
		new Parent_ViewModel( this, { name: "Kim"} ),
		new Parent_ViewModel( this, { name: "Scott"} ),
		new Child_ViewModel( this, { name: "Sean-Paul"} ),
		new Child_ViewModel( this, { name: "James"} ),
		new Child_ViewModel( this, { name: "Zach"} ),
		new GrandChild_ViewModel( this, { name: "Zach Jr."} ),
		new GrandChild_ViewModel( this, { name: "Jamie Ann"} ),
		new GreatGrandChild_ViewModel( this, { name: "Zeus"} ),
		new GreatGrandChild_ViewModel( this, { name: "Apollo"} ),
		new GreatGrandChild_ViewModel( this, { name: "Isis" } ),
    ] );

    return;
};