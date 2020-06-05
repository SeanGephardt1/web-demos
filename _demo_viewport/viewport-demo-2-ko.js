/// <reference path="../../script/knockout-3.3.0.js" />

"use strict";
function ViewportViewModel( json )
{
	var _self = this;
	var _div_id = "ViewPortAreaID_1";

	this.ViewModelName = ko.observable( json.Name);
	this.Area_ID = ko.observable( _div_id );
	this.RangeValue = ko.observable( 2 );

	this.Init = ko.computed( function ()
	{
		console.log( "KO.INIT" );
		return;
	}, this );

	this.ViewPortFontSize = ko.computed( function ()
	{
		//	console.log( "KO.ViewPortFontSize" );
		/*
		1vw = 1% of viewport width
		1vh = 1% of viewport height
		1vmin = 1vw or 1vh, whichever is smaller
		1vmax = 1vw or 1vh, whichever is larger
		 */
		var _rt = _self.RangeValue() + "vh";
		//	console.log( "ViewPortFontSize", _rt );
		return _rt;
	}, this );

	//	console.log( "ViewportViewModel", this.ViewModelName() );
	return;
}