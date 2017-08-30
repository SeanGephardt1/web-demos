/// <reference path="../script/react/react-15.6.1.js" />
/// <reference path="../script/react/react-dom-15.6.1.js" />
"use strict";
( function ()
{
	console.log( "BEGIN" );
	try
	{
		console.log( "in 'try'" );

		var _application_property_bag = {
			RootLinks: [
        		{ RootLink: { InnerText: "Sean Gephardt explores react.js" } },
				{ RootLink: { InnerText: "Robert Taft explores react.js" } },
        		{ RootLink: { InnerText: "Jaqueline explores react.js" } }
			],
        	"SearchLink.InnerText": "Guitars",
        	"UserSwitchList": ["Sean", "Robert", "Jacqueline", "Jon", "Jonah"],
			"VerticalNavigation": ["Menu","New","All Resources","Your Resources","Virtual Machines","Databases"]
        };

    	//  wait for dom to complete and make any databinding or dom changes
        window.document.addEventListener( "DOMContentLoaded", function ( e )
        {	//	console.log( "window.document.DOMContentLoaded", e.type );			
        	//	console.debug( "React", React );
        	//	console.debug( "React.DOM", React.DOM );

        	//ReactDOM.render( React.createElement( Application, _application_property_bag ), document.getElementById( "AppBody" ) );
        	//ReactDOM.render( React.createElement( Application, _application_property_bag, null ), document.getElementById( "AppBody" ) );
        	ReactDOM.render( React.createElement( Application, _application_property_bag, [] ), document.getElementById( "AppBody" ) );

			return;
        } );
	}
    catch ( ex )
    {
        console.log( "in 'catch'" );
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("exception stack::", ex.stack);
		return;
	}
    finally
    {
        console.log( "in 'finally'" );
	}
    console.log( "END" );
	return;
} )();