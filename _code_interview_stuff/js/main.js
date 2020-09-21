"use strict";
import ProblemOne from './problem-1.js';
import ProblemTwo from './problem-2.js';
import ProblemThree from './problem-3.js';
import ProblemFour from './problem-4.js';
import JSQA from './problem-5.js';
import Flights from './problem-6.js';



( function ()
{
	const _demo_name = "JavaScript Code Interview Demos";

	try
	{
		console.info( "BEGIN", _demo_name );

		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{	
			document.getElementById( "btn1" ).addEventListener( "click", function ()
			{
				const _p = new ProblemOne();
				_p.DoProblems();
			}, false );

			document.getElementById( "btn2" ).addEventListener( "click", function ()
			{
				const _p = new ProblemTwo();
				_p.DoProblems();
			}, false );

			document.getElementById( "btn3" ).addEventListener( "click", function ()
			{
				const _p = new ProblemThree();
				_p.DoProblems();
			}, false );

			document.getElementById( "btn4" ).addEventListener( "click", function ()
			{
				const _p = new ProblemFour();
				_p.DoProblems();
			}, false );
			
			document.getElementById( "btn5" ).addEventListener( "click", function ()
			{
				JSQA.RunAllQuestions();
			}, false );

			document.getElementById( "btn6" ).addEventListener( "click", function ()
			{
				const f = new Flights();
				f.ComputeSchedule();
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