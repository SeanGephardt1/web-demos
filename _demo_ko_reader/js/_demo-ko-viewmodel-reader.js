/// <reference path="../script/knockout-3.4.2.js" />
/// "ReaderViewModel" V.1.0.0
"use strict";
function ReaderViewModel( demoTitle, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( demoTitle || "Demo Title" );
    this.DEBUGFLAG = ko.observable( debugFlag || false );
    this.DebugOutput = ko.pureComputed( function ()
    {
        if ( this.DEBUGFLAG() == true )
        {
            console.debug("DebugOutput::this", this);
            console.debug("DebugOutput::_self", _self);
        }
        return;
    }, this );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );

    // Change Text Size
    this.CurrentFontSize = ko.observable( 12 );
    this.CurrentTextSize = ko.computed( function ()
    {   //  console.debug( "this.CurrentFontSize", this.CurrentFontSize() );
        return this.CurrentFontSize() + "px";
    }, this );
    this.OnClick_IncreaseTextSize = function ( vm, ev )
    {   //  console.debug( "OnClick_IncreaseTextSize" );
        var _ceiling = 40;
        var _temp = this.CurrentFontSize();
        _temp++;

        if ( _temp < _ceiling )
        {
            this.CurrentFontSize( _temp );
        }
        else
        {
            this.CurrentFontSize( _ceiling );
        }
        return;
    };
    this.OnClick_DecreaseTextSize = function ( vm, ev )
    {   //  console.debug( "OnClick_DecreaseTextSize" );
        var _floor = 6;
        var _temp = this.CurrentFontSize();
        _temp--;

        if ( _temp > _floor )
        {
            this.CurrentFontSize( _temp );
        }
        else
        {
            this.CurrentFontSize( _floor );
        }
        return;
    };

    // Change Font
    this.FontFamilyList = ko.observableArray( [
        "Arial", "Tahoma", "Verdana", "Segoe UI", "Calibri", "Onyx", "Britannic", "Blackadder ITC", "Times New Roman"
    ] );
    this.SelectedFontFamily = ko.observable( this.FontFamilyList()[0] );

    // Line Height
    this.LineHeightList = ko.observableArray( [
        "80%", "90%", "100%", "125%", "150%", "200%","normal"
    ] );
    this.SelectedLineHeight = ko.observable( this.LineHeightList()[this.LineHeightList().length-1] );

    // letter spacing
    this.LetterSpaceList = ko.observableArray( [
        "-1px","-0.5px","0px","0.5px","1px","2px", "normal"
    ] );
    this.SelectedLetterSpace = ko.observable( this.LetterSpaceList()[this.LetterSpaceList().length-1] );





    //  HANDLE ALL CLICKS ON THE BODY ELEMENT, RETURN FALSE.
    //  <body data-bind="event: { click: OnClick_CloseAll }, clickBubble: false">
    this.OnClick_CloseAll = function ( viewModel, event )
    {
        if ( this.DEBUGFLAG() == true )
        {
            console.debug("this.CloseAll", viewModel, event);
        }
        var _rv_false = false;
        // handle objects like popups, drop down menus and other UI events
        return _rv_false;
    };

    //  LAST BUT NOT LEAST, MAKE ANY NEEDS CALLS
    //  this.DebugOutput();
    return;
};