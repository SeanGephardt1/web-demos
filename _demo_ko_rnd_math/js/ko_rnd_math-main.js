"use strict";
( function ()
{
    var _debug_flag = false;
    var _demo_name = "Knockout.js Demo Template";
    try
    {
        console.info( "BEGIN", _demo_name );
        window.document.addEventListener( "DOMContentLoaded", function ( ev )
        {   //	console.log( "DOMContentLoaded." );
            var _rnd_math_vm = new RandomMathViewModel( _demo_name, _debug_flag );
            ko.applyBindings( _rnd_math_vm );
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