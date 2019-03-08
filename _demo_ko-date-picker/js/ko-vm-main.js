/// <reference path="../script/knockout-3.4.2.js" />
/// "DemoViewModel" ViewModel V.1.0.0
"use strict";
function DemoViewModel( )
{
    const _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( "Knockout.JS Date Picker Demo" );
	this.DatePickerControl = new DatePickerViewModel( this );

	this.FormattedSelectedDateRange = ko.computed( function ()
	{
		let _string = _self.DatePickerControl.SelectedDateRange();
		return _string;
	}, this );

    return;
};

