"use strict";

( function ()
{
	const _demo_name = "Javascritp Object Parse Interview Question";
	try
	{
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{	//	console.log( "DOMContentLoaded" );
			const _rv1 = ParseForm("GuitarOrder1");
			console.debug( "_rv1", _rv1);

			let _rv2 = ParseForm("GuitarOrder2");
			console.debug( "_rv2", _rv2 );

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


function ParseForm(strRootName)
{	
	let _rv = {};

	_rv[strRootName] = {
		guitar: {
			name: undefined,
			color: undefined,
			neck: {
				base: undefined,
				fretboard: undefined,
			}
		},
		case: false
	};

	if ( document.forms[strRootName].children.length > 0 )
	{
		if ( document.forms[strRootName].children["guitar"] !== undefined )
		{
			_rv[strRootName].guitar.name = document.forms[strRootName].children["guitar"].value;
		}

		if ( document.forms[strRootName].children["guitar.color"] !== undefined )
		{
			_rv[strRootName].guitar.color = document.forms[strRootName].children["guitar.color"].value;
		}

		if ( document.forms[strRootName].children["guitar.neck.fretboard"] !== undefined )
		{
			_rv[strRootName].guitar.neck.fretbaord = document.forms[strRootName].children["guitar.neck.fretboard"].value;
		}

		if ( document.forms[strRootName].children["guitar.neck.base"] !== undefined )
		{
			_rv[strRootName].guitar.neck.base = document.forms[strRootName].children["guitar.neck.base"].value;
		}

		if ( document.forms[strRootName].children["case"] !== undefined )
		{
			_rv[strRootName].case = document.forms[strRootName].children["case"].value;
		}

	}

	return _rv;
}
