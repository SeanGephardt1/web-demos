/// <reference path="../knockout-js/knockout-3.4.2.js" />
"use strict";
( function ()
{
	try
	{
		console.info("BEGIN");

		var _params = {
		    DEBUG: false,
		    sampleText: "Hello, Universe!",
		    FeatureFlag1: true,
            FeatureFlag2: false
		};

		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{   //  console.log( "DOMContentLoaded", str );
		    var _ko_main_viewmodel = new DemoMainViewModel( _params );
		    ko.applyBindings( _ko_main_viewmodel );
			return;
		} )
	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END" );
	}
	return;
} )();

function DemoMainViewModel( parameters )
{
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.DEBUG = ko.observable( parameters.DEBUG || false );
    this.ERROR = ko.observable( false );
    this.ERROR_MESSAGE = ko.observable( "No errors" );
    this.SampleText = ko.observable( parameters.sampleText || "Hello, World!" );

    // Event handlers
    // button
    this.Click_CancelButton = function ( vm, ev )
    {
        console.debug( "this.Click_CancelButton" );
        return;
    };

    //  checkbox
    //  show/hide checkboxes example
    //  this is for cross browser work, using a "<label>"
    //  <label for="id-001">
    //      <input type="checkbox" id="id-001"
    //          data-bind="event: { change: OnChange_FeatureHandleCheckboxVisible, click: OnClick_FeatureCheckboxVisible },
    //          checked: CheckboxVisible_IsChecked, attr: { checked: CheckboxVisible_IsChecked}"/>
    //      <span data-bind="text: CheckboxVisibleText"></span>
    //  </label>
    this._checkbox_display_text_show = "Show checkboxes on every node";
    this._checkbox_display_text_hide = "Hide checkboxes on every node";
    this.CheckboxVisibleText = ko.observable( this._checkbox_display_text_hide );
    this.CheckboxVisible_IsChecked = ko.observable( true );
    this.CheckboxVisible_IsChecked.subscribe( function ( newValue )
    {   //console.debug( "CheckboxVisible_IsChecked", newValue );
        //if ( newValue == true )
        //{
        //    this.CheckboxVisibleText( this._checkbox_display_text_hide );
        //}
        //else if ( newValue == false )
        //{
        //    this.CheckboxVisibleText( this._checkbox_display_text_show );
        //}
        return;
    }, this );
    this.OnChange_FeatureHandleCheckboxVisible = function ( vm, ev )
    {   //  console.debug( "Click_FeatureHandleSelectionType" );
        return true;
    };
    this.OnClick_FeatureCheckboxVisible = function ( vm, ev )
    {   //  console.debug( "Click_FeatureCheckboxVisible", this.CheckboxVisible_IsChecked() );
        //if ( this.CheckboxVisible_IsChecked() == true )
        //{
        //    this.CheckboxVisible_IsChecked( false );
        //}
        //else if ( this.CheckboxVisible_IsChecked() == false )
        //{
        //    this.CheckboxVisible_IsChecked( true );
        //}
        //  console.debug( "Click_FeatureCheckboxVisible", this.CheckboxVisible_IsChecked() );
        return true;
    };
    return;
}