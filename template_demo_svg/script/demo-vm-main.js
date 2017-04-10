/// <reference path="knockout-3.4.2.js" />
/* 
	KNOCKOUT.JS CODE FUNCTION TEMPLATES
	this.Object_Method = function ( vm, ev ) { console.debug("Object_Method", vm, ev); return; };
	this.Object_Method = ko.computed(function ( vm, ev ) { console.debug("Object_Method", vm, ev); return; }, this);
	this.Object_Method = ko.pureComputed(function ( vm, ev ) { console.debug("Object_Method", vm, ev); return; }, this);
*/
"use strict";
function KoSvgMainViewModel( debug, title, data ) 
{	
	var _self = this;
	this.DEBUG = ko.observable( data.DEBUG );
    //  console.debug( "DEBUG:", data.DEBUG, this.DEBUG() );
	this.Data = ko.observable( data || {} );
	//  console.debug( "DATA:", data, this.Data() );

	this.ID = ko.pureComputed( function () { return "skg-svg-ko-demo-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( title );

    //  main svg dimension
	this._default_translate_text = "translate(0,0)";
	this._default_scale_text = "scale(1)";

    //  for render time, it's better to set these to "0"
    //  less rendering flashs
	this.DEBUG_Crosshairs_Transform = ko.observable( "translate(100,100)" );
	this.SvgViewBox = ko.observable( "0 0 10 10" );
	this.SvgViewBoxHeight = ko.observable( "100" );
	this.SvgViewBoxWidth = ko.observable( "200" );

	//	for resizing the main SVG element and the "debug crosshairs"
	this.Resize_SvgViewBoxDimensions = function ()
	{
	    var __template_translate_text = "translate([x],[y])";
	    var _client_rect = window.document.body.getClientRects();
	    //  console.log( "_client_rect", _client_rect[0] );
	    var _h = _client_rect[0].height - 10;
	    var _w = _client_rect[0].width - 10;
        //  console.debug( "_w, _h", _w, _h );
	    this.SvgViewBoxHeight( _h );
	    this.SvgViewBoxWidth( _w );

		var _svg_vb = "\"" + _client_rect[0].top + " " + _client_rect[0].left + " " + ( _h * 2 ) + " " + ( _w * 2 ) + "\"";
		//  console.log( "_svg_vb", _svg_vb ); 
		this.SvgViewBox( _svg_vb );

		var _debug_crosshairs = __template_translate_text.replace( "[y]", ( this.SvgViewBoxHeight() / 2 ) ).replace( "[x]", ( this.SvgViewBoxWidth() / 2 ) );
		//  console.debug( "_debug_crosshairs", _debug_crosshairs );
		this.DEBUG_Crosshairs_Transform( _debug_crosshairs );

		return;
	};
	window.addEventListener( "resize", function ()
	{	//	console.log("resize");
		_self.Resize_SvgViewBoxDimensions();
		return;
	}, false );
	this.Resize_SvgViewBoxDimensions();

	// ZOOM & PAN/DRAG
	window.addEventListener( "mousewheel", function (ev)
	{	// console.log( "mousewheel", ev.deltaY, ev.ctrlKey );
	    if ( ev.ctrlKey == true )
		{
			return;
		}
		return;
	}, false );
	this.Compute_ZoomScale = function (ev )
	{	//	console.log( "this.Compute_ZoomScale" );
		var _increment = 0.1;
		var _temp = 0;
		var _old = _self.TempScaleValue();

		if ( ev.deltaY == "100" ) // down
		{
			_temp = (_old) + (_increment);
		}
		else if ( ev.deltaY == "-100" ) // up
		{
			_temp = (_old) - (_increment);
		}

		// stop, too small
		if ( _temp < 0.3 )
		{
			_temp = 0.3;
		}
		// stop, too large
		if ( _temp > 2.0 )
		{
			_temp = 2.0;
		}

		var _rouned_temp = Number( _temp.toPrecision( 2 ) ); //	console.log( "_rouned_temp ", typeof _rouned_temp, _rouned_temp );
		_self.TempScaleValue( _rouned_temp );
		_self.Main_G_Scale( "scale(" + _self.TempScaleValue() + ")" );	//	console.log( "_temp_scale", _temp_scale );
		return _self.Main_G_Scale();
	};
	this.Compute_ZoomTranslate = function (ev )
	{
		console.log( "REWORK::this.Compute_ZoomTranslate");
		//	console.log( "this.Compute_ZoomTranslate", this.Main_G_Translate(), this.TempScale() );
		//var _center_h = parseInt(_self.SvgViewBoxHeight());
		//var _center_w = parseInt(_self.SvgViewBoxWidth());
		//console.log( "_center_h", _center_h, "_center_w", _center_w );

		var _temp = this.Main_G_Translate().split( "(" );
		var _temp2 = _temp[1].split( ")" );
		var _values = _temp2[0].split( "," );
		var _left = Number(_values[0]);
		var _top = Number(_values[1]);

		//	console.log( "_temp", _temp, _temp2, _values, _left, _top );
		//	console.log( _left, _top );
		var _trans_left = 0;
		var _trans_top = 0;

		if ( ev.deltaY == "100" ) 
		{
			//	console.log( "down", ev.deltaY);
			_trans_left = _left - parseInt( this.TempScaleValue() );
			//	_trans_top = 0;
		}
		else if ( ev.deltaY == "-100" ) // up
		{
			//	console.log( "up", ev.deltaY);
			_trans_left = _left + parseInt( this.TempScaleValue() );
			//	_trans_top = 0;
		}
		//	console.log( "_trans_left",typeof _trans_left, _trans_left, "_trans_top", _trans_top );
		var _rv = "translate(" + _trans_left + "," + _trans_top  + ")";


		_self.Main_G_Translate( _rv );
		//	console.log( "_self.Main_G_Translate()", _self.Main_G_Translate() );
		return _self._default_translate;		// this.Main_G_Translate();
	};


	/* 
	APPLICATION SPECIFIC FUNCTIONALIITY ACROSS ALL CONTROLS 
	Handle All Clicks on the body element, return false.
	Set any flyouts, etc. back to default, which is "false".
	<body data-bind="event: { click: CloseAllFlyouts }, clickBubble: false">
	*/
	this.CloseAllFlyouts = function ( vm, ev )
	{   //	console.log( "this.CloseAllFlyouts" );
		return false;
	};
    return;
}