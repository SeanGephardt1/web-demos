/// <reference path="../script/ko/knockout-3.4.2.js" />
/// "ProgressBarViewModel" ViewModel V.1.0.0
"use strict";
function CircleSpinnerViewModel( demoName, debugFlag )
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

    // specific KOs

    return;
};