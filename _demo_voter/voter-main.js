/// <reference path="../../script/ko/knockout-3.3.0.js" />
"use strict";
( function ()
{
	try
	{
		console.info( "Voter demo - BEGIN" );
		var voterViewModel = new VoterViewModel( { topics: window.VoterData } );
		ko.applyBindings( voterViewModel );
	}
	catch ( ex ){console.error( ex.number, ex.name, ex.message, ex.stack );}
	finally{console.info( "END" );}
	return;
}() );
