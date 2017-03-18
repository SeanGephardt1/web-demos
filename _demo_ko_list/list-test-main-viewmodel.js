/// <reference path="knockout-3.4.0.js" />
/// basded on SKG.COM ViewModel template V 1.1
"use strict";
function ListTestViewModel(title, columns, rows, debugFlag )
{
	var _self = this;	
	// define all IDs first 
	this.ID = ko.pureComputed(function ()
	{
		return "list-test-" + Math.random().toPrecision( 7 ).replace( ".", "" );
	}, this );

	/* trying to make a decent multiple purpose template */
	this.DEBUGFLAG = ko.observable(debugFlag || false);
	this.DebugOutput = ko.pureComputed(function ()
	{
		if (this.DEBUGFLAG() === true)
		{
			console.log("DebugOutput::", this.Title());
		}
		return;
	}, this);
	//	this.DebugOutput();

	// define observables here
	this.Title = ko.observable(title);
	this.TestCountText = ko.observable("Default State");

	this.Columns = ko.observableArray(columns || []);
	this.Columns.subscribe(function (newValue)
	{
		//console.log("-- this.Columns.subscribe", _self.Columns().length);
		_self.RefactorColumnToRows();
		return;
	}, this);

	//	this.Row = ko.observable();
	// for editing and storage
	this.StoredRows = ko.observableArray(rows || []);

	this.VisibleRows = ko.observableArray([]);

	this.RefactorColumnToRows = function ()
	{
		console.log("RefactorColumnToRows", _self.Columns().length);

		_self.VisibleRows(_self.StoredRows().slice(0));

		_self.VisibleRows().forEach(function (value, index, arr)
		{
			console.log(value.Data.length);
			for (var i = 0; i < value.Data.length; i++)
			{
				console.log("_old.Data", i, arr[index].Id, value.Data[i].Text);
				if (i > _self.Columns().length)
				{
					value.Data[i] = {};
				}
			}
		});

		//var _temp;
		//_old.forEach(function (value, index, arr)
		//{
		//	var _col_len = _self.Columns().length;
		//	var _data_len = value.Data.length;
		//	console.log("row:index:", index, "row id:", value.Id, "row.Data.len", value.Data.length, "_col_len:", _col_len);

		//	_temp = value;
		//	//	_temp.Data = [];

		//	for (var i = 0; i < _col_len; i++)
		//	{
		//		var _new_data = value.Data[i];
		//		console.log("_new_data",i, _new_data.Text);
		//		_temp.Data[i] = _new_data;
		//	}

		//	//_temp.Data = _new_data;
		//	//console.log("_temp.Data", _temp.Data.length);
		//});

		//	_self.VisibleRows(_old);
		return;
	};
	this.RefactorColumnToRows();

	return;
}