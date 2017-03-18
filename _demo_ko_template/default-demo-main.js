"use strict";
( function ()
{
	try
	{
		console.info("BEGIN Filter UI Prototype");
		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{
			//	console.log( "DOMContentLoaded. Filter UI Prototype viewmodels & data are loaded and bound" );
			var _qb_vm = new QueryBuilderViewModel("Query Builder DEBUG");
			ko.applyBindings( _qb_vm );
			return;
		} );
	}
	catch ( ex )
	{
		console.error( "Filter UI Prototype Exception" );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END Filter UI Prototype" );
	}
	return;
})();