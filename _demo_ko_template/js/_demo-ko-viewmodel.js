/// <reference path="knockout-3.4.0.js" />
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
    this.ComputedMathValue = ko.observable( 0 );
    this.Compute_NewMathValue = ko.pureComputed( function ()
    {
        var _temp_val = Math.random().toPrecision( 5 ).replace( ".", "" );
        this.ComputedMathValue( _temp_val );
        return;
    }, this );
    this.Compute_NewMathValue();

    // ko.observableArray collection of viewmodels for html templates
    this.ChildCollection = ko.observableArray( [
        new ChildViewModel( "Child 1", this ),
        new ChildViewModel( "Child 2", this ),
        new ChildViewModel( "Child 3", this ),
        new ChildViewModel( "Child 4", this ),
        new ChildViewModel( "Child 5" ),
    ] );

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
    this.DEBUG_PageReload = ko.pureComputed( function ()
    {   //  console.debug( "this.DEBUG_PageReload", this.DEBUGFLAG() );
        if ( this.DEBUGFLAG() == true )
        {
            window.setTimeout( function ()
            {
                window.location.reload( true );
                return;
            }, 5000 );
        }
        return;
    }, this );
    //  this.DEBUG_PageReload();

    return;
};

//  "ChildViewModel" to show templates and collections
function ChildViewModel( title, parentViewModel )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "child-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( title || "ChildViewModel - Title" );
    this.ParentViewModel = ko.observable();

    //  this will allow the demo to continue,
    //  and provides a better explanation in the browser console
    //  than a simple KO exception
    //  though it needs deeper investigation
    try
    {
        if ( parentViewModel == undefined )
        {
            throw new Error( "ParentViewModel not assigned to this ChildViewModel" );
        }
        else
        {
            this.ParentViewModel( parentViewModel );
        }
    }
    catch ( exNoParent )
    {
        console.error( exNoParent.stack );
        //  throw exNoParent;
    }
    return;
};