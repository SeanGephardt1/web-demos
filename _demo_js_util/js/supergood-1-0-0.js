/* UNDER DEVELOPMENT */
/* 
Copyright 2014 Sean Gephardt
http://seangephardt.com/
To be included in a html page, and called as applicable.
*/
var SuperGood = window.SuperGood || {};

/* Child functions that generate random data*/
SuperGood.Random =
{
	/* Utility functions, used internally & externally */
	FromArray: function ( array )
	{
		var rnd = Math.round( Math.random() * ( 0 || array.length - 1 ) );
		var final_state = array[rnd];
		return final_state;
	},
	FromCollection: function ( collection )
	{
		var temp_array = [];
		for ( var key in collection )
		{
			temp_array.push( collection[key] );
			//if ( collection.hasOwnProperty( key ) )
			//{
			//	console.log( key + " -> " + collection[key] );
			//}
		}
		//	console.log( "temp_array.length", temp_array.length );
		//	for ( var z = 0; z < temp_array.length; z++ )
		//	{
		//		console.log( "temp_array = ", z, temp_array[z] );
		//	}
		var rnd = Math.round( Math.random() * ( 0 || temp_array.length - 1 ) );
		//	console.log("rnd = ", rnd);
		var final_item = temp_array[rnd];
		console.log( "Random.FromCollection::final_item = ", final_item );
		return final_item;
	},

	/* Simple value ID-like functions */
	Number: function (predicate)
	{
		var retVal = 0;

		if ( predicate !== undefined )
		{
			retVal = new Number( Math.random() ).toFixed( predicate );
		}
		else
		{
			retVal = new Number( Math.random() ).toFixed( 3 );
		}

		var _temp = new Number(retVal.toString().split( "." ).join(""));
		//	console.log( "TrueRandomNumber()::retVal = ", retVal );
		//	console.log( "TrueRandomNumber()::_temp = ", _temp );
		return _temp.toString();
	},
	GUID: function ()
	{	//	Format - {A419A37A-8852-4929-B988-85AF859E793C}
		var _temp_guid = [];
		var bit_array = SuperGood.DataArrays.HexAlpha.concat( SuperGood.DataArrays.Numeric );

		for ( var i = 0; i < 36; i++ )
		{
			if ( i === 8 || i == 13 || i == 18 || i == 23 )
			{
				_temp_guid[i] = "-";
			}
			else
			{
				_temp_guid[i] = this.FromArray( bit_array );
			}
		}
		//	console.log( "_temp_guid = ", _temp_guid.join("") );
		return _temp_guid.join( "" );
	},
	ID: function(stringPrefix)
	{
		var _ret_val;
		var _temp_id = [];

		if ( stringPrefix !== undefined && stringPrefix.length > 0)
		{
			var pattern2 = /[0-9]|[`~!@!#\$\^%&*()]|[+=\-\_]|[{}\[\]\|\\\/]|[.:;,\'\"<>\?]/gi;
			var re1 = new RegExp(pattern2);
			var _temp = stringPrefix.replace( re1, "" );
			//	console.log( "_temp", _temp );
			_temp_id.push( _temp );
		}
		else
		{
			_temp_id.push( "sg" );
		}
		_temp_id.push( "-" );

		var _rnd = (Math.random() * Math.PI).toFixed(5).split(".");	//	console.log( "i = r = ", _rnd[1] );
		_temp_id.push( _rnd[1] );

		_ret_val = _temp_id.join( "" );
		//	console.log( "Random.ID::_ret_val", _ret_val );
		return _ret_val;
	},
	Percentage: function ()
	{
		return Math.round( Math.random() * 99 ) + "%";
	},
	Date: function ()
	{	// needs formatting work, for localization
		return new Date( 2017, Math.round( Math.random() * 12 ), Math.round( Math.random() * 31 ), Math.round( Math.random() * 24 ), Math.round( Math.random() * 60 ), Math.round( Math.random() * 60 ), Math.round( Math.random() * 1000 ) );
	},

	/* Methods for color values */
	GreyColors: function ()
	{
		//	for debugging - 
		//	var _retVal = this.FromArray( SuperGood.DataArrays.GreyScale );
		//	console.log("RandomData.RandomGreyColor() = ", _retVal);
		return this.FromArray( SuperGood.DataArrays.GreyScale );
	},
	RandomColor: function ()
	{
		var temp_color = ["#"];
		for ( var i = 0; i < 6; i++ )
		{
			if ( Math.round( Math.random() ) == 0 )
			{
				temp_color.push( this.FromArray( SuperGood.DataArrays.HexAlpha ) );
			}
			else
			{
				temp_color.push( this.FromArray( SuperGood.DataArrays.Numeric ) );
			}
		}
		return temp_color.join("");
	},
	DefinedColor: function ()
	{
		return this.FromArray( SuperGood.DataArrays.DefinedColorArray );
	},

	/* Specific formatted values */
	IpAddress: function ()
	{
		var _delim = ".";
		return [Math.round( Math.random() * 255 ), _delim, Math.round( Math.random() * 255 ), _delim, Math.round( Math.random() * 255 ), _delim, Math.round( Math.random() * 255 )].join( "" );
	},
	MacAddress: function ()
	{	// 00:09:5B:EC:EE:F2
		var _delim = ":";
		var _mac = [];

		for ( var i = 0; i < 6; i++ )
		{
			if ( Math.round( Math.random() ) == 0 )
			{
				_mac.push( this.FromArray( SuperGood.DataArrays.HexAlpha ) );
			}
			else
			{
				_mac.push( this.FromArray( SuperGood.DataArrays.Numeric ) );
			}
			if ( Math.round( Math.random() ) == 0 )
			{
				_mac.push( this.FromArray( SuperGood.DataArrays.HexAlpha ) );
			}
			else
			{
				_mac.push( this.FromArray( SuperGood.DataArrays.Numeric ) );
			}

			if ( i != 5 )
			{
				_mac.push( _delim );
			}
		}
		return _mac.join("");
	},

	/* misc random examples */
	OperatingSystem: function ()
	{
		return this.FromArray( SuperGood.DataArrays.OperatingSystems );
	},
	RamValue: function ()
	{
		return this.FromArray( SuperGood.DataArrays.RAM );
	},
	HardDriveSize: function ()
	{
		return this.FromArray( SuperGood.DataArrays.HardDriveSize );
	},
	FontSize: function ()
	{
		return this.FromArray( SuperGood.DataArrays.FontPointSizes );
	},
	WebFontSize: function ()
	{
		return this.FromArray( SuperGood.DataArrays.FontWebSizes );
	},
	RandomFont: function ()
	{
		return this.FromArray( SuperGood.DataArrays.Fonts );
	},
};
SuperGood.DataArrays =
{
	/* characters */
	Alpha: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	Numeric: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	HexAlpha: ["A", "B", "C", "D", "E", "F"],

	/* colors & color schemes */
	DefinedColorArray: ["#6e6058", "#718069", "#82ab80", "#b4cc8f", "#e3e2a8"],
	GreyScale: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"],
	PrimaryColors: ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"],

	/* fonts */
	Fonts: ["Arial", "Cambria", "Calibri", "Cooper Black", "Elephant", "Georgia", "Impact", "Segoe UI", "Showcard Gothic"],
	FontWebSizes: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
	FontPointSizes: ["8", "10", "12", "14", "16", "20", "24", "30", "36", "40", "48", "54", "60", "66", "70", "72", "76", "80", "90", "100", "120", "136", "148", "160"],

	/* misc */
	HardDriveSize: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
	RAM: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],
	OperatingSystems: ["Linux", "Atari MultiDOS", "BeOS", "Unix", "Apple OS X", "Apple iOS", "Google Chome OS", "Google Android", "Microsoft Windows", "Microsoft Windows Server "],
};