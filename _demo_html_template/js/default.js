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