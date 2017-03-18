/// <reference path="knockout-3.4.0.js" />
/// <reference path="list-test-viewmodel.js" />
"use strict";
( function ()
{
	var _demo_name = "Knockout.js SVG shapes demo";
	var _debug_flag = false;
	var SvgShapesKoViewModel;

	try
	{
		console.info("BEGIN:", _demo_name);
		window.document.addEventListener( "DOMContentLoaded", function ( str )
		{	//	console.log( "DOMContentLoaded." );
		    SvgShapesKoViewModel = new ShapesMainViewModel();
		    ko.applyBindings( SvgShapesKoViewModel );
			return;
		});
	}
	catch ( ex )
	{
		console.error("Prototype Exception", _demo_name );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.info("END:", _demo_name);
	}
	return;
})();


//function ChangeColumnData()
//{
//	var _rv = [];
//	var _rnd_col_count = Math.round((Math.random() * 20) + 1);
//	//	console.log("_rnd_col_count ", _rnd_col_count);
//	for (var i = 0; i < _rnd_col_count; i++)
//	{
//		_rv[i] = "New Column " + i;
//	}
//	//	console.log("_rv ", _rv);
//	return _rv;
//}

//function ChangeRowsData()
//{
//	var _rv = [];
//	var _total_row_count = Math.round((Math.random() * 500) + 1);
//	//	console.log("ChangeRowsData", _total_row_count);
//	for (var i = 0; i < _total_row_count; i++)
//	{
//		var _temp_id = "Row-Id-" + Math.round((Math.random() * 550) + 1);
//		var _new_row = { Id: _temp_id, Action: "Rnd Test Action", Data: [] };
//		for (var x = 0; x < 10; x++)
//		{
//			var _text = "Test Data " + Math.round((Math.random() * 500) + 1);
//			var _message = "Test Message " + Math.round((Math.random() * 500) + 1);
//			var _icon = GetRandomIcon(Math.round((Math.random() * 10) + 1));
//			var _temp_row = { Text: _text, Message: _message, Icon: _icon};
//			_new_row.Data[x] = _temp_row;
//		}
//		_rv[i] = _new_row;
//	}
//	//	console.log("ChangeRowsData._rv", _rv);
//	return _rv;
//}

//function GetRandomIcon(index)
//{
//	var _imgs = [
//		"img/donut_chart.svg",
//		"img/delete.svg",
//		"img/Chart.svg",
//		"img/filter.svg",
//		"img/function.svg",
//		"img/line_chart.svg",
//		"img/list_chart.svg",
//		"img/save.svg",
//		"img/table.svg",
//		"img/vert_bar_chart.svg"
//	];
//	//	console.log("GetRandomIcon._rv[index]", _imgs[index]);
//	return _imgs[index];
//}