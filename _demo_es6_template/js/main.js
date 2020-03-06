"use strict";
import { PromiseDemo } from '/components/promises-demo.js';

( function ()
{
	const _demo_name = "ES 6 Promises Demo";
	try
	{
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{   
			console.log( "DOMContentLoaded" );
			const _promise_demo = new PromiseDemo({elementID:"results"});
			_promise_demo.Display();
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