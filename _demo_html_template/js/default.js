"use strict";
( function ()
{
    console.log( "BEGIN" );
    try
    {
        console.log( "in 'try'" );
        // instaniate any new javascript object in global scope
		var _test_string = "Test String";
		window._debug_string = "Debug String";
        //  quickest syntax, runs first, regardless of coded order, DOM not available
        //  throws a DOM exception
		window.onload = WriteDefaultScopeText( _test_string, "window.onload" );
        //  if these are reversed in code, this second call doesn't happen
        //  this fires after "DOMContentLoaded" regardless of order
        //  DOM available
		window.onload = function ( e )
		{   //  wait for dom to complete and make any databinding or dom changes
		    //  console.log( "window.onload", e.type );
		    WriteDefaultScopeText( _test_string, "window.onload = function" );
		    return;
		};

        //  quickest syntax, runs first, regardless of coded order, DOM not available
        //  throws a DOM exception
		  window.document.addEventListener( "DOMContentLoaded", WriteDefaultScopeText( _test_string, "window.document.addEventListener(DOMContentLoaded)" ) );

        //  runs before "onload"  w/wrapper function, 
		//  DOM available
        window.document.addEventListener( "DOMContentLoaded", function ( e )
        {
            //  wait for dom to complete and make any databinding or dom changes
            //  console.log( "window.document.DOMContentLoaded", e.type );
            WriteDefaultScopeText( _test_string, "window.document.addEventListener(DOMContentLoaded), function" );
            SortThisArray();
            return;
        } );
	}
    catch ( ex )
    {
        console.log( "in 'catch'" );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
    finally
    {
        console.log( "in 'finally'" );
	}
    console.log( "END" );
	return;
} )();

function WriteDefaultScopeText( strSampleText, strCaller )
{
    console.debug( "strCaller", strCaller );
    console.log( "limited scope:: strSampleText", strSampleText );
    console.log( "global scope:: window._debug_string", window._debug_string );

    try
    {
        var _d = document.getElementById( "TestDebugDiv" );
        console.log( "_d", _d.innerText );
    }
    catch ( exDom )
    {
        console.error( exDom );
        //  throw exDom;
    }
    return;
};

function SortThisArray()
{	
    var employees = [];
	employees[0] = { name: "George", age: 32, retiredate: "March 12, 2014" };
	employees[1] = { name: "Edward", age: 17, retiredate: "June 2, 2023" };
	employees[2] = { name: "Christine", age: 58, retiredate: "December 20, 2036" };
	employees[3] = { name: "Sarah", age: 62, retiredate: "April 30, 2020" };
    
	employees.sort( function ( a, b )
	{
	    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        //  sort string ascending
	    if ( nameA < nameB ) 
	        return -1;
        //  sort string descending    
	    if ( nameA > nameB )
	        return 1;
        //  default return value (no sorting)
	    return 0;
	} );


};