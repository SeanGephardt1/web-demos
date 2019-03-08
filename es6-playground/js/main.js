// JavaScript ES5/6 test playground
//	Notes: All script references need to be 'type=module', if using import/export
//	Example methods include the following:
//	- "import" & "export" styles
//	- "Generator" functions
//	-	testing javascript es5/6 class modules with imports, exports, generator functions

"use strict";
import { Application as App } from "../components/application.js";

( function ()
{
	console.log( "BEGIN", new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
			const app_DOMLOADED = new App( { AppName: "Sean's EMCAScript 6 Demo - DOMContentLoaded", IsCssLoaded: false } );
			// app_DOMLOADED.Render();
			return;
        } );
	}
    catch ( ex )
    {
        console.log( "CATCH", new Date().toISOString()  );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
	finally
	{
		console.log( "FINALLY", new Date().toISOString()  );
	}
    console.log( "END IIFE", new Date().toISOString() );
	return; 
} )();