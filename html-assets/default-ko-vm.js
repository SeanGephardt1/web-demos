/// "ScenarioServiceViewModel" ViewModel V.1.0.0
"use strict";

function ScenarioServiceViewModel( title )
{
	var _self = this;
	this.Title = ko.observable( title );

	this.CreateNewScenario = function ( vm, ev )
	{	//	console.debug("CreateNewScenario", vm, ev );
		// get the new scenario object
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onabort = ( function ( event, args, args2 )
		{	//	console.log( "xmlHttp.onabort" );
			return;
		} );
		xmlHttp.onerror = ( function ( event, args, args2 )
		{	//	console.log( "xmlHttp.onerror" );
			return;
		} );
		xmlHttp.ontimeout = ( function ( event, args, args2 )
		{	//	console.log( "xmlHttp.ontimeout");
			return;
		} );
		xmlHttp.onprogress = ( function ( progressEvent )
		{	//	console.log( "xmlHttp.onprogress" );
			return;
		} );
		xmlHttp.onreadystatechange = ( function ( progressEvent )
		{	// console.log( "GetScenarioNameList.xmlHttp.onreadystatechange", xmlHttp.readyState );
			return;
		} );
		xmlHttp.onloadstart = ( function ( progressEvent )
		{	//	console.log( "xmlHttp.onloadstart" );
			return;
		} );
		xmlHttp.onload = ( function ( progressEvent )
		{	//	console.log( "xmlHttp.onload", xmlHttp.readyState );
			return;
		} );
		xmlHttp.onloadend = ( function ( progressEvent )
		{	//	console.log( "GetScenarioNameList.xmlHttp.onloadend", xmlHttp.readyState );
			if ( xmlHttp.readyState === 4 && xmlHttp.status === 200 )
			{
				var json_results = JSON.parse( xmlHttp.response );
				_self.CurrentScenario( json_results );
			}
			return;
		} );

		xmlHttp.open( "GET", this.uri_create_new_scenario, true, "", "" );
		xmlHttp.send();
		return;
	};

	return;
};