"use strict";
( function ()
{
    var _debug_flag = false;
    var _demo_name = "Knockout.js Reader Demo";
    try
    {
        console.info( "BEGIN", _demo_name, new Date().toJSON() );
        window.document.addEventListener( "DOMContentLoaded", function ( ev )
        {   //	console.log( "DOMContentLoaded." );
            var _main_vm = new ReaderViewModel( _demo_name, _debug_flag );
            ko.applyBindings( _main_vm );
            return;
        } );
    }
    catch ( ex )
    {
        console.error( "Exception::", _demo_name );
        console.error( ex.number, ":", ex.name, ":", ex.message );
        console.error( "stack::", ex.stack );
        return;
    }
    finally
    {
        console.info( "END", _demo_name, new Date().toJSON() );
    }
    return;
} )();