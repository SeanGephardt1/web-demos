/// <reference path="../script/ko/knockout-3.4.2.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( demoName || "Demo Title" );
    this.DEBUGFLAG = ko.observable( debugFlag || false );
    this.DebugOutput = ko.pureComputed( function ()
    {
        if ( this.DEBUGFLAG() == true )
        {
            console.debug( "DebugOutput::this", this );
            console.debug( "DebugOutput::_self", _self );
        }
        return;
    }, this );
    this.DebugOutput();

    // non-standard ko.observables


    //-----
    //  GLOBAL EVENT HANDLERS AND TESTING
    //  Handle All Clicks on the body element, return false.
    //  <body data-bind="event: { click: CloseAllFlyouts}, clickBubble: false">
    this.CloseAll = function ( viewModel, event )
    {
        if ( this.DEBUGFLAG() == true )
        {
            console.debug( "this.CloseAll", viewModel, event );
        }
        var _rv_false = false;
        // handle objects like popups, drop down menus and other UI events
        return _rv_false;
    };

    //  test method - to reload page to see new random ID and ComputedMathValue values
    //  set DEBUGFLAG to false doesn't reload
    //  uncomment call to disable
    //this.DEBUG_PageReload = ko.pureComputed( function ()
    //{   //  console.debug( "this.DEBUG_PageReload", this.DEBUGFLAG() );
    //    if ( this.DEBUGFLAG() == true )
    //    {
    //        window.setTimeout( function ()
    //        {
    //            window.location.reload( true );
    //            return;
    //        }, 5000 );
    //    }
    //    return;
    //}, this );
    //  this.DEBUG_PageReload();
    return;
};
