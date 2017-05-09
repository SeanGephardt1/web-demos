"use strict";
( function ()
{
	try
	{
		console.info("BEGIN");

		var _nav = new NavigationLinks();
		_nav.Init();

		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{
			console.log( "DOMContentLoaded", str );
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
})();