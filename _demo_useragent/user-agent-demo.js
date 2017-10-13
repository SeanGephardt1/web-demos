/// <reference path="../../script/jquery-2.1.4.js" />


/* Main */
"use strict";
( function ()
{
	try
	{
		console.info( "BEGIN - Demo 1." );

		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{
			console.log( "DOMContentLoaded" );
			console.log( window.navigator.userAgent );
			document.getElementById( "demo_id" ).innerText = window.navigator.userAgent;
			return;
		} );
	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END - Demo 1." );
	}
	return;
} )();