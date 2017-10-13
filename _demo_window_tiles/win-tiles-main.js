/// <reference path="../script/jquery-2.1.1.js" />
/// <reference path="../script/knockout-3.1.0.js" />
/// <reference path="../script/skg-util-1.0.0.js" />


function GlobalNavObject( json )
{
	this.ID = ko.observable( json.ID || "App_Id_" + new String( Math.random() * 99 ).split( "." )[1] );
	this.Title = ko.observable( json.Title || "No Name Given" );
	this.Content = ko.observable( json.Content );
	this.LoadContent = ko.computed( function ()
	{
		//	console.log( this.ID );
		//	console.log( this.Title() );
		//	console.log( this.Content() );
		//	this.Content( "<h1>LOADED CONTENT</h1>" );
		return;
	}, this );
	return;
}

function Sample( json )
{
	var _tile_sizes = { 1: "small", 2: "medium", 3: "large" };

	var self = this;
	this._Current_Title = "Current Title";
	this._Current_Content = "Current Content";

	this._global_nav_items =
		[
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
			new GlobalNavObject( { ID: "1", Title: "About" } ),
			new GlobalNavObject( { ID: "2", Title: "News" } ),
			new GlobalNavObject( { ID: "3", Title: "Media" } ),
			new GlobalNavObject( { ID: "4", Title: "Social" } ),
			new GlobalNavObject( { ID: "5", Title: "Tour" } ),
		];

	this.Name = ko.observable( json.Name );
	this.GlobalNav = ko.observableArray( this._global_nav_items );
	this.CurrentTitle = ko.observable( this._Current_Title );
	this.CurrentContent = ko.observable( this._Current_Content );
	this.ShowContent = function ( vm, event )
	{
		var _demo_url = "data/data_" + vm.ID() + ".js";

		if ( vm.Content() === undefined )
		{
			console.log( "Loading content" );

			$.getJSON( _demo_url, function ( result, message, xhr )
			{
				//console.log( result );
				//console.log( message );
				//console.log( xhr );
				return;
			} )
			.done( function ( result, message, xhr )
			{
				//console.log( result );
				//console.log( message );
				//console.log( xhr );
				self.CurrentTitle( result.Title );
				self.CurrentContent( result.Content );
				return;
			} )
			.fail( function ( result, message, xhr )
			{
				//console.log( result );
				//console.log( message );
				//console.log( xhr );
				self.CurrentTitle( result.status );
				self.CurrentContent( result.statusText );
			} )
			.always( function ( result, message, xhr )
			{
				//console.log( result );
				//console.log( message );
				//console.log( xhr );
				return;
			} );
		}
		$( "div.content_window" ).show();
		return;
	};

	this.CloseContentWindow = function ( thisObj, event )
	{
		$( "div.content_window" ).hide();
		return;
	};
};


try
{
	console.clear();
	console.info( "BEGIN" );
	var s = new Sample( { Name: "Simple Windows 8 Style web app" } );
	ko.applyBindings( s );
}
catch ( err )
{
	console.error( err.number, err.name, err.message, err.stack );
}
finally
{
	console.info( "END" );
}



