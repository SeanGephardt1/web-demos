/// <reference path="../script/jquery-2.1.1.js" />
/// <reference path="../script/skg-util-1.0.0.js" />
/// <reference path="../script/knockout-3.1.0.js" />
"use strict";
window.onload =function ()
{
	try
	{
		console.clear();

		var _counter = 0;
		var _timer = window.setInterval( function ()
		{
			var a = new Button( {
				Text: "Click Here Please!",
				Title: "Only the strong survive, and no one really survives.",
				URL: "http://seangephardt.com",
				newWindow: false,
				img: "http://villainsofyesterday.com/img/03.22.2014_th/voy.kurt.clark.2014._%20(1).jpg",
			} );

			//console.log( "_timer", _timer, "_counter", _counter );
			//console.log( "a", a );
			document.body.appendChild( a );
			_counter++;

			if ( _counter == 5 )
			{
				window.clearInterval( _timer );
				_timer == undefined;
				_counter = 0;
				return;
			}
			return;
		}, 2000 );
	}
	catch ( err )
	{
		console.error( err.number, err.name, err.message, err.stack );
	}
	finally
	{
		console.info( "END" );
	}
	return;
}

function Button(json_options)
{
	this._index = "//";
	this._placeholder = "placeholder";
	this._btn_class = "SkgBtnClass";
	this._btn_id_prefix = "skg_btn_id_";

	this._btn_id = function ()
	{
		var r = new String( (Math.random() * 99.99).toFixed(9) );	//	console.log( "r", r );
		var _r = r.replace( ".", "" );	//	console.log( "_r", _r );
		var _rv = this._btn_id_prefix + _r;	//	console.log( "_rv", _rv );
		return _rv;
	}

	this._target = undefined;
	this._text = undefined;
	this._title = undefined;
	this._url = undefined;
	this._image = undefined;

	if ( json_options !== undefined )
	{
		this._target = json_options.newWindow;
		this._text = json_options.Text;
		this._title = json_options.Title;
		this._url = json_options.URL;
		this._image = json_options.img;
	}
	else
	{
		this._target = false;
		this._text = this._placeholder;
		this._title = this._placeholder;
		this._url = this._index;
	}

	var _a_href = document.createElement( "a" );
	_a_href.setAttribute( "id", this._btn_id() );
	_a_href.setAttribute( "class", this._btn_class );
	_a_href.setAttribute( "title", this._title );
	_a_href.setAttribute( "href", this._url );

	if ( this._target === true )
	{
		_a_href.setAttribute( "target", "_new" );
	}

	if ( this._image !== undefined )
	{
		var _img = document.createElement( "img" );
		_img.setAttribute( "id", _a_href.id + "_img" );
		_img.setAttribute( "class", this._btn_class );
		_img.setAttribute( "title", this._title );
		_img.setAttribute( "src", this._image );
		_img.dataset.voyd = "Villains Of Yesterday";

		_a_href.appendChild( _img );
	}
	else
	{
		_a_href.innerText = this._text;
	}

	return _a_href;
};
