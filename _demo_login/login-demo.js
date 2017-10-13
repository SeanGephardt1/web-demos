/// <reference path="../script/jquery/jquery-2.1.4.js" />
/// <reference path="../script/ko/knockout-3.3.0.js" />
/// <reference path="login-demo.js" />

/* Main */
"use strict";
( function ()
{
	try
	{
		console.clear();
		console.info( "BEGIN - AJAX Login Demo." );

		/* Begin */
		var _login_ko = new UserLoginViewModel( {} );
		ko.applyBindings( _login_ko );
	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END - AJAX Login Demo." );
	}
	return;
} )();