// JavaScript ES5/6 test playground
//	Notes: All script references need to be 'type=module', if using import/export
//	Example methods include the following:
//	- "import" & "export" styles
//	- "Generator" functions

"use strict";
const appBeforeImportIIFE = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo - BEFORE IMPORT IIFE", IsCssLoaded: false } );

import { Application as App } from "../components/application.js";

// runs first, page may not be loaded and dom elements may not be available
const appBeforeIIFE = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo - BEFORE IIFE", IsCssLoaded: false } );

( function ()
{
	console.log( "BEGIN", new Date().toISOString() );
	try
	{
		console.log( "TRY IIFE", new Date().toISOString() );
		//	runs second, page may not be loaded and dom elements may not be available
		//	const app_IIFE = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo - IIEF try/catch", IsCssLoaded: false } );

		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
	        console.log( "DOMContentLoaded IIFE", new Date().toISOString()  );
			//	runs last , page may not be loaded and dom elements would be available
			const app_DOMLOADED = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo - DOMContentLoaded", IsCssLoaded: false } );
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

//	runs third, page may not be loaded and dom elements may not be available
const app_AFTER_IIFE = new App( { AppName: "Sean's JavaScript/ES 5/6 Demo - AFTER IIFE", IsCssLoaded: false } );