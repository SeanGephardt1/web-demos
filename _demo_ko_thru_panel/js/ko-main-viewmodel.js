/// <reference path="knockout-3.4.0.js" />
/// "Main" ViewModel V.1.0.0
"use strict";

function MainViewModel( demoName, debugFlag, demoData )
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.DebugOutput = ko.pureComputed(function() {
        if (this.DEBUGFLAG() == true) {
            console.debug("DebugOutput::this", this);
            console.debug("DebugOutput::_self", _self);
        }
        return;
    }, this);
    this.DebugOutput();
    this.Error = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    // non-standard ko.observables
    this.MainData = ko.observable();
    //  this exception handling will allow the demo to continue,
    //  and provides a better explanation in the browser console
    try
    {
        if ( demoData == undefined )
        {
            var _e = new Error( "Data was not available or incorrectly formated." );
            this.Error( true );
            this.ErrorMessage( _e.message );
            throw _e;
        }
        else
        {
            this.MainData( new ThruDataViewModel( demoData ) );
        }
    }
    catch ( exMain_BadData )
    {
        console.error( exMain_BadData.stack );  //  throw exNoParent;
    }




    // ko.observableArray collection of viewmodels for html templates
    this.ChildCollection = ko.observableArray([
        new ChildViewModel("Child 1 - this is the child of the damned. Let's all become wrappers and try to fix this race condition.", this),
        new ChildViewModel("Child 2", this),
        new ChildViewModel("Child 3", this),
        new ChildViewModel("Child 4", this),
        new ChildViewModel( "Child 5", this )
    ]);


    // Refresh the data
    this.Refresh_DataCollection = function ( vm, ev )
    {
        console.debug("Refresh_DataCollection");
        return false;
    };


    // handle all clild chevrons
    this.Click_OpenClose_ListPanel = function ( vm, ev )
    {
        console.debug( "ChildViewModel.Click_OpenClose_ListPanel" );
        return;
    };

    //	BEGIN MAIN LAYOUT OBJECTS
    this.MainContainer_CSS_Style = ko.observable();

    // centers the SVG canvas
    this.Resize_MainContainer = function ()
    {
        //var _client_rect_one = window.document.body.getClientRects();
        //console.log( "_client_rect_one", _client_rect_one[0] );
        //var _client_rect_two = window.document.body.getBoundingClientRect();
        //console.log( "_client_rect_two", _client_rect_two );

        var _cr_3 = document.getElementsByClassName( "MainContainer" )[0].getClientRects()[0];
        //  console.log( "_cr_3", _cr_3 );


        //var _h = _client_rect[0].height;
        //var _w = _client_rect[0].width;
        //	console.debug( "_w, _h", _w, _h );

        return;
    };
    this.Resize_MainContainer();
    window.addEventListener( "resize", function ()
    {	//	
        console.log( "window.addEventListener.resize" );
        _self.Resize_MainContainer();
        return;
    }, false );


    //  Handle All Clicks on the body element, return false.
    //  <body data-bind="event: { click: CloseAllFlyouts}, clickBubble: false">
    this.CloseAll = function ( vm, ev )
    {
        console.debug( "this.CloseAll", vm, ev );
        if ( this.DEBUGFLAG() == true )
        {
            console.debug( "this.CloseAll", vm, ev );
        }
        var _rv_false = false;
        // handle objects like popups, drop down menus and other UI events
        return _rv_false;
    };
    return;
};

//  "ChildViewModel" to show templates and collections
function ChildViewModel(title, parentViewModel) {
    var _self = this;
    this.ID = ko.pureComputed(function() { return "child-id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(title || "ChildViewModel - Title");
    this.Error = ko.observable(false);
    this.ErrorMessage = ko.observable();
    this.ParentViewModel = ko.observable();

    //  this will allow the demo to continue,
    //  and provides a better explanation in the browser console
    //  than a simple KO exception
    //  though it needs deeper investigation
    try {
        if (parentViewModel == undefined) {
            var _e = new Error("ParentViewModel not assigned to this ChildViewModel");
            this.Error(true);
            this.ErrorMessage(_e.message);
            throw _e;
        } else {
            this.ParentViewModel(parentViewModel);
        }
    } catch (exNoParent) {
        console.error(exNoParent.stack);
        //  throw exNoParent;
    }



    return;
};