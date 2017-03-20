/* 
Copyright 2017 Sean Gephardt
*/
"use strict";
$( function ()
{
	try
	{
		console.clear();
		console.info( "BEGIN" );
		/* begin testing of 'supergood' here */

		var random_ID = SuperGood.Random.ID("");
		$( "#Ex-Rnd-Id" ).text( random_ID );

		var rnd_web = SuperGood.Random.ID( "" );

		$( "#Ex-Rnd-Web" ).css( {
			"background-color": SuperGood.Random.RandomColor(),
			"color": SuperGood.Random.RandomColor(),
			"font-family": SuperGood.Random.RandomFont(),
			"font-size": SuperGood.Random.WebFontSize(),
			"border-width": SuperGood.Random.Number(1),
			"border-style": "solid",
			"border-color": SuperGood.Random.RandomColor()
		} ).text( SuperGood.Random.OperatingSystem() );

		console.log( "Numbers" );
		console.log( "SuperGood.Random.Number()", SuperGood.Random.Number() );
		console.log( "SuperGood.Random.Number(2)", SuperGood.Random.Number( 2 ) );
		console.log( "SuperGood.Random.Number(5)", SuperGood.Random.Number( 5 ) );
		console.log( "SuperGood.Random.Number(9)", SuperGood.Random.Number( 9 ) );
		console.log( "" );
		console.log( "IDs and formatted values" );
		console.log( "SuperGood.Random.GUID()", SuperGood.Random.GUID() );
		console.log( "SuperGood.Random.ID()", SuperGood.Random.ID() );
		console.log( "SuperGood.Random.Percentage()", SuperGood.Random.Percentage() );
		console.log( "SuperGood.Random.Date()", SuperGood.Random.Date() );
		console.log( "" );
		console.log( "Colors and value specific functions" );
		console.log( "SuperGood.Random.GreyColors()", SuperGood.Random.GreyColors() );
		console.log( "SuperGood.Random.RandomColor()", SuperGood.Random.RandomColor() );
		console.log( "SuperGood.Random.DefinedColor()", SuperGood.Random.DefinedColor() );
		console.log( "SuperGood.Random.IpAddress()", SuperGood.Random.IpAddress() );
		console.log( "SuperGood.Random.MacAddress()", SuperGood.Random.MacAddress() );
		console.log( "SuperGood.Random.OperatingSystem()", SuperGood.Random.OperatingSystem() );
		console.log( "SuperGood.Random.RamValue()", SuperGood.Random.RamValue() );
		console.log( "SuperGood.Random.HardDriveSize()", SuperGood.Random.HardDriveSize() );
		console.log( "SuperGood.Random.FontSize()", SuperGood.Random.FontSize() );
		console.log( "SuperGood.Random.WebFontSize()", SuperGood.Random.WebFontSize() );
		console.log( "SuperGood.Random.RandomFont()", SuperGood.Random.RandomFont() );

		window.setTimeout( function ()
		{
		    console.log( "auto-reloading" );
		    window.location.reload( true );
		    return;
		}, 5000 );
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
} );