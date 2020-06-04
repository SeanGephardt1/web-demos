"use strict";
import ProblemOne from './problem-1.js';
import ProblemTwo from './problem-2.js';
import ProblemThree from './problem-3.js';

( function ()
{
	const _demo_name = "Code Interview Demo";

	try
	{
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{	
			document.getElementById( "btn1" ).addEventListener( "click", function ()
			{
				FireSample( ProblemOne );
			}, false );
			document.getElementById( "btn2" ).addEventListener( "click", function ()
			{
				FireSample( ProblemTwo );
			}, false );
			document.getElementById( "btn3" ).addEventListener( "click", function ()
			{
				FireSample( ProblemThree );
			}, false );
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

function FireSample( classObj )
{
	console.clear();
	const _p1 = new classObj();
	_p1.DoProblems();
	return;
}
