// JavaScript ES5/6 test playground
//	Notes: All script references need to be 'type=module', if using import/export
//	Example methods include the following:
//	- "import" & "export" styles
//	- "Generator" functions

"use strict";
import { Application as App } from "../components/application.js";

( function ()
{
	console.log( "BEGIN \t\t\t\t\t", new Date().toISOString() );
	try
	{
        console.log( "in 'TRY' \t\t\t\t", new Date().toISOString()  );
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
	        console.log( "in 'DOMContentLoaded' \t", new Date().toISOString()  );
			const app = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo", IsCssLoaded: false } );
			return;
        } );
	}
    catch ( ex )
    {
        console.log( "in 'CATCH' \t\t\t\t\t", new Date().toISOString()  );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
	finally
	{
		console.log( "in 'FINALLY' \t\t\t", new Date().toISOString()  );
	}
    console.log( "END \t\t\t\t\t", new Date().toISOString() );
	return; 
} )();