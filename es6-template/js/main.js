"use strict";
( function ()
{
	console.log( "BEGIN Azure Prototype\t", new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
			const app = new Application( { AppName: "Jackie's App", IsCssLoaded: true });
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
		//	console.log( "in 'finally'" );
	}
    console.log( "END Azure Prototype\t\t", new Date().toISOString() );
	return; 
} )();