/// <reference path="knockout-3.4.0.js" />
/// based on SKG.COM ViewModel template V 1.1
"use strict";
function ShapesMainViewModel( debugFlag )
{
    var _self = this;

	this.ID = ko.pureComputed(function () { return "list-test-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( "SVG Shapes demo with Knockout.js");

    // DEFINE OBSERVABLES HERE


    // EVENT HANDLERS
	this.CloseAllFlyouts = function ()
	{
	    console.debug( "ShapesMainViewModel.CloseAllFlyouts" );
	    return false;
	};


    // TESTS
    // Timer Test #1
    //var _test1 = window.setTimeout(function ()
    //{
    //	_listview_vm.TestCountText("Timer Test # 1");
    //	var _temp_cols = ChangeColumnData();
    //	_listview_vm.Columns(_temp_cols);
    //	//var _temp_rows = ChangeRowsData();
    //	//_listview_vm.Rows(_temp_rows);
    //	return;
    //}, 2000);
    // Timer Test #2
    //var _test2 = window.setTimeout(function ()
    //{
    //	_listview_vm.TestCountText("Timer Test # 2");
    //	var _temp_cols = ChangeColumnData();
    //	_listview_vm.Columns(_temp_cols);
    //	//var _temp_rows = ChangeRowsData();
    //	//_listview_vm.Rows(_temp_rows);
    //	return;
    //}, 4000);
    // Timer Test #3
    //var _test3 = window.setTimeout(function ()
    //{
    //	_listview_vm.TestCountText("Timer Test # 3");
    //	var _temp_cols = ChangeColumnData();
    //	_listview_vm.Columns(_temp_cols);
    //	//var _temp_rows = ChangeRowsData();
    //	//_listview_vm.Rows(_temp_rows);
    //	return;
    //}, 6000);
	return;
}