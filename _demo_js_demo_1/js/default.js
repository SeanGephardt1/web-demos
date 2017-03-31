"use strict";
( function ()
{
    var _demo_name = "Javascript Funtime";
    console.info( "BEGIN", _demo_name );
    try
    {
        //  console.log( "in 'try'" );
        window.document.addEventListener( "DOMContentLoaded", function ( e )
        {   console.log( "in 'window.document.DOMContentLoaded'", e.type );
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
        //  console.log( "in 'finally'" );
	}
    console.info( "END", _demo_name );
	return;
} )();

function SortThisArray()
{	
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
	return;
};