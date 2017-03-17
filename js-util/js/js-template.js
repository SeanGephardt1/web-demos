/* 
Copyright 2017 Sean Gephardt. http://seangephardt.com/
Used as a template.
 */
"use strict";
( function ()
{
	try
	{
		console.info( "BEGIN" );
		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{
			console.log( "DOMContentLoaded" );
			return;
		} )
	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END" );
	}
	return;
} )();