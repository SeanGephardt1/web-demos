"use strict";
( function ()
{
    var _demo_name = "JavaScript Funtime";
    var _debug_flag = true;
    console.info( "BEGIN", _demo_name );
    try
    {
        window.document.addEventListener( "DOMContentLoaded", function ( e )
        {   //  console.log( "in 'window.document.DOMContentLoaded'", e.type );
            var _main_vm = new MainViewModel( _demo_name, _debug_flag );
            ko.applyBindings( _main_vm );
            return;
        } );
	}
    catch ( ex )
    {
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
    finally {}
    console.info( "END", _demo_name );
	return;
} )();