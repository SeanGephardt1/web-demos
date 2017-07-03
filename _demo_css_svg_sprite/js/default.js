"use strict";
( function ()
{
	var _demo_name = "CSS 3 SVG Sprite Demo";
    try
    {
    	console.log( "BEGIN:", _demo_name );
	}
    catch ( ex )
    {
    	console.warning( "excpetion:", _demo_name );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
    finally
    {
    	console.log( "END:", _demo_name );
	}
	return;
} )();