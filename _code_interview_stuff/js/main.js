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
			const _p1 = new ProblemOne();
			_p1.DoProblems();

			const _p2 = new ProblemTwo();
			_p2.DoProblems();

			const _p3 = new ProblemThree();
			_p3.DoProblems();

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

