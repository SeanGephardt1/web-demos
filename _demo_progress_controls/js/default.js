/// <reference path="../script/ko/knockout-3.4.2.js" />
"use strict";
( function ()
{
    var _demo_name = "Processing Controls Demo";
    console.log( "BEGIN" );
    try
    {
        window.document.addEventListener( "DOMContentLoaded", function ( e )
        {   //  console.log( "window.document.DOMContentLoaded", e.type );
            var _main_vm = new MainViewModel( _demo_name, _debug_flag );
            ko.applyBindings( _main_vm );
            return;
        } );
	}
    catch ( ex )
    {
        console.log( "in 'catch'" );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
    finally
    {
        //  console.log( "in 'finally'" );
	}
    console.log( "END" );
	return;
} )();