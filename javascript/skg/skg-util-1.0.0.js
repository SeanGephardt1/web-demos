/* 
copyright 2014 Sean Gephardt 
Simple helper utility objects and methods.
*/

/* Console.log objects */
function DebugObject( o )
{
	Object.keys( o ).forEach( function ( key )
	{
		console.log( key, "=", o[key] );
	} );
	return;
}

/* 
Returns a variety of random data types 
i.e.  usage - 
var new_percent = RandomData.Percentage();
var new_color = RandomData.Color();
var new_device_name = RandomData.DeviceName();
*/
var RandomData =
{
	Number: function ()
	{
		var retVal = parseInt( new String( Math.random() * 0.999999999 ).split( '.' )[1] );
		//	console.log( "TrueRandomNumber()::retVal = ", retVal );
		return retVal;
	},
	RandomFromArray: function ( array )
	{
		var rnd = Math.round( Math.random() * ( 0 || array.length - 1 ) );
		var final_state = array[rnd];
		return final_state;
	},
	RandomFromCollection: function ( collection )
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
		console.log( "RandomValueFromCollection::final_item = ", final_item );
		return final_item;
	},
	GUID: function ()
	{	//	Format - {A419A37A-8852-4929-B988-85AF859E793C}
		var _temp_guid = [];
		var bit_array = this.ColorAlphaArray.concat( this.ColorNumericArray );

		for ( var i = 0; i < 36; i++ )
		{
			if ( i === 8 || i == 13 || i == 18 || i == 23 )
			{
				_temp_guid[i] = "-";
			}
			else
			{
				_temp_guid[i] = this.RandomFromArray( bit_array );
			}
		}
		//	console.log( "_temp_guid = ", _temp_guid.join("") );
		return _temp_guid.join( "" );
	},
	ColorArray: ["#000000", "#FFFFFF", "#333333", "#666666", "#999999", "#FF0000", "#00FF00", "#0000FF"],
	ColorAlphaArray: ["A", "B", "C", "D", "E", "F"],
	ColorNumericArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	GreyColorArray: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA", "#BBBBBB", "#CCCCCC", "#DDDDDD", "#EEEEEE", "#FFFFFF"],
	RandomGreyColor: function ()
	{
		var _retVal = this.RandomFromArray( this.GreyColorArray );
		//	console.log("RandomData.RandomGreyColor() = ", _retVal);
		return _retVal;
	},
	RandomColor: function ()
	{
		var temp_color = "#";

		for ( var i = 0; i < 6; i++ )
		{
			var alpha_num_mixer = Math.random();
			//	console.log("alpha_num_mixer::",alpha_num_mixer);
			var rounded = Math.round( alpha_num_mixer );
			//	console.log("rounded::",rounded);

			if ( rounded == 0 )
			{
				temp_color = temp_color + this.RandomFromArray( this.ColorAlphaArray );
			}
			else
			{
				temp_color = temp_color + this.RandomFromArray( this.ColorNumericArray );
			}
			//	console.log("temp_color = ", temp_color);
		}

		return temp_color;
	},
	DefinedColor: function ()
	{
		return this.RandomFromArray( this.ColorArray );
	},
	DeviceNameArray: ["Nokia 928", "Nokia 1020", "Nokia 1520", "Nokai Icon 2520", "Microsoft Surface 2", "Microsoft Surface 2 Pro", "Samsung Tablet", "Dell Tablet"],
	DeviceName: function ()
	{
		return this.RandomFromArray( this.DeviceNameArray );
	},
	AppNameArray: ["Application 1", "Application 3", "Application 71", "Application 19", "Application 23", "Application 37", "Application 9", "Application 7"],
	AppName: function ()
	{
		return this.RandomFromArray( this.AppNameArray );
	},
	IpAddress: function ()
	{
		return Math.round( Math.random() * 255 ) + "." + Math.round( Math.random() * 255 ) + "." + Math.round( Math.random() * 255 ) + "." + Math.round( Math.random() * 255 );
	},
	MacAddress: function ()
	{
		var _mac = [
			Math.round( Math.random() * 99 ),
			Math.round( Math.random() * 99 ),
			Math.round( Math.random() * 99 ),
			Math.round( Math.random() * 99 ),
			Math.round( Math.random() * 99 ),
			Math.round( Math.random() * 99 ),
		];
		return _mac[0] + ":" + _mac[1] + ":" + _mac[2] + ":" + _mac[3] + ":" + _mac[4] + ":" + _mac[5];
	},
	EnterpriseCount: function ()
	{
		return Math.round( Math.random() * 9753 );
	},
	Percentage: function ()
	{
		return Math.round( Math.random() * 99 );
	},
	InstallDate: function ()
	{
		return new Date( 2013, Math.round( Math.random() * 12 ), Math.round( Math.random() * 31 ), Math.round( Math.random() * 24 ), Math.round( Math.random() * 60 ), Math.round( Math.random() * 60 ), Math.round( Math.random() * 1000 ) );
	},
	PatchDate: function ()
	{
		var newDate = new Date() - 7;	//	console.log("newDate",newDate);
		return newDate;
	},
	IpType: function ()
	{
		var state_array = ["Dynamic", "Static"];
		return this.RandomFromArray( state_array );
	},
	AppStateArray: ["Online", "Offline", "Rebooting", "Needs Patch"],
	AppState: function ()
	{
		return this.RandomFromArray( this.AppStateArray );
	},
	OperatingSystemArray: ["Windows 8", "Windows Server 2003", "Windows Server 2008", "Windows Server 2008 R2", "Windows Server 2012", "Windows Server 2012 R2"],
	OperatingSystem: function ()
	{
		return this.RandomFromArray( this.OperatingSystemArray );
	},
	DomainNameArray: ["Redmond", "North America", "EMEA", "APAC", "Phoenix", "Quincy", "WINNT"],
	DomainName: function ()
	{
		return this.RandomFromArray( this.DomainNameArray );
	},
	CloudNameArray: ["Platinum", "Gold", "Silver", "Bronze"],
	CloudName: function ()
	{
		return this.RandomFromArray( this.CloudNameArray );
	},
	RamValueArray: [16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192],
	RamValue: function ()
	{
		return this.RandomFromArray( this.RamValueArray );
	},
	HDDValueArray: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
	HHDValue: function ()
	{
		return this.RandomFromArray( this.HDDValueArray );
	},
	LocationArray: ["Seattle", "San Francisco", "Redmond", "Quincy", "Charlotte", "Albany", "St. Louis", "Denver", "Phoenix", "Dublin", "Stalingrad", "Tokyo", "Singapore", "Anchorage", "Shanghai", "New York"],
	Location: function ()
	{
		return this.RandomFromArray( this.LocationArray );
	},
	FontSizeArray: ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
	FontSize: function ()
	{
		return this.RandomFromArray( this.FontSizeArray );
	},
	FontPointSizeArray: ["8", "10", "12", "14", "16", "20", "24", "30", "36", "40", "48", "54", "60", "66", "70", "72", "76", "80", "90", "100", "120", "136", "148", "160"],
	FontPointSize: function ()
	{
		return this.RandomFromArray( this.FontPointSizeArray );
	},
	FontArray: ["Arial", "Cambria", "Calibri", "Cooper Black", "Elephant", "Georgia", "Impact", "Segoe UI", "Showcard Gothic"],
	RandomFont: function ()
	{
		return this.RandomFromArray( this.FontArray );
	}
};