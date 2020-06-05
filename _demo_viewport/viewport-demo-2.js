/// <reference path="../script/jquery/jquery-2.1.4.js" />
/// <reference path="../script/ko/knockout-3.3.0.js" />
/// <reference path="viewport-demo-2-ko.js" />

/* Main */
"use strict";
( function ()
{
	try
	{
		console.info( "BEGIN - Viewport 2 Demo." );
		var _vp_ko = new ViewportViewModel( { Name: "Viewport Slider Demo" } );
		ko.applyBindings(_vp_ko);
	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END - Viewport 2 Demo." );
	}
	return;
} )();