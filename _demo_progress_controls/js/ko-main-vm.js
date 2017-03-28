/// <reference path="../script/ko/knockout-3.4.2.js" />
/// <reference path="ko-prog-bar-vm.js" />
/// <reference path="ko-ellipsis-nodes-vm.js" />
/// <reference path="ko-circle-spinner-vm.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "main-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
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
    //  MAY NOT NEED
    //  this.DebugOutput(); 

    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable("No errors");

    this.Show_ColorPalette = ko.observable( true );
    this.Show_GreyPalette = ko.observable( false );

    // child ko viewmodels
    this.ProgressBars = ko.observableArray( [
        new ProgressBarViewModel( this ),
        //new ProgressBarViewModel( this ),
        //new ProgressBarViewModel( this )
    ] );

    //  console.debug( "CircleSpinnerStyle", window.CircleSpinnerStyles.ArcStyle );
    this.CircleSpinners = ko.observableArray( [
        new CircleSpinnerViewModel( this, window.CircleSpinnerStyles.ArcStyle ),
        new CircleSpinnerViewModel( this, window.CircleSpinnerStyles.PathStyle ),
        new CircleSpinnerViewModel( this, window.CircleSpinnerStyles.DotsStyle ),
    ] );



    //-----
    //  not really being used in this demo
    //  GLOBAL EVENT HANDLERS AND TESTING
    //  Handle All Clicks on the body element, return false.
    //  KO events have to return false to work properly with event bubbling on child controls
    //  <body data-bind="event: { click: CloseAll}, clickBubble: false">
    this.CloseAll = function ( viewModel, event )
    {
        //  console.debug( "MainViewModel.CloseAll" );
        //if ( this.DEBUGFLAG() == true )
        //{
        //    console.debug( "this.CloseAll", viewModel, event );
        //}
        // handle objects like popups, drop down menus and other UI events
        var _rv_false = false;
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
