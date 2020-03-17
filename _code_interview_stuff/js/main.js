"use strict";

( function ()
{
	const _demo_name = "Code Interview Demo";

	try
	{
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{
			console.log( "DOMContentLoaded" );
			console.debug( "FIND THE NEXT LOWEST INTEGER ABOVE 0" );

			const _array_1 = [1, 3, 6, 4, 1, 2, 6, 4, 3]; // 5
			const _array_2 = [1, 2, 3]; // 4
			const _array_3 = [-1, -3]; // 1
			const _array_4 = [-99, -1, -5, -1, -3, 6, 19, 1, 9, 31,4]; // 5

			let _answer;

			_answer = solution( _array_1 ); // 5
			console.debug( "_answer 1: expected answer: 5: \t", _answer[0],  _answer[1] );

			_answer = solution( _array_2 ); // 4
			console.debug( "_answer 2: expected answer: 4: \t", _answer[0],  _answer[1] );

			_answer = solution( _array_3 ); // 1
			console.debug( "_answer 3: expected answer: 1: \t",_answer[0],  _answer[1] );

			_answer = solution( _array_4 ); // 2
			console.debug( "_answer_4: expected answer: 3: \t", _answer[0],  _answer[1] );
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

function solution( A )
{
	// write your code in JavaScript (Node.js 8.9.4)
	let _return_value = undefined;
	//	console.debug( "A", A.length, A );

	let _filtered = A.filter( val => val > 0 ).sort( ( a, b ) =>
	{
		if ( a > b )
		{ return 1; }

		if ( a < b )
		{ return -1; }

		if ( a === b )
		{ return 0; }
	} );
	//	console.debug( "_filtered", _filtered.length, _filtered );

	let _arr = Array.from( new Set( _filtered ) );
	//	console.debug( "_arr", _arr );

	for ( let i = 0; i < _arr.length; i++ )
	{
		//	console.debug( "for:", _arr[i], _arr[i + 1] );
		if (_arr[i] +1 === _arr[i + 1])
		{
			continue;
		}
		else if (_arr[i] +1 !== _arr[i + 1] )
		{
			//	console.debug( "breaking");
			_return_value = ( _arr[i] + 1 );
			break;
		}
	}

	if ( _return_value === undefined )
	{	
		_return_value = _arr.length + 1;
	}
	return [A,_return_value];
}