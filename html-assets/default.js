"use strict";
( function ()
{
	var _debug_flag = false;
	var _demo_name = "Azure UX Web Services V.1 Test Page";
	try
	{
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{   //	console.log( "DOMContentLoaded." );
			var _main_vm = new ScenarioServiceViewModel( _demo_name );
			ko.applyBindings( _main_vm );
			return;
		} );
	}
	catch ( ex )
	{
		console.error( "Exception", _demo_name );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END", _demo_name );
	}
	return;
} )();