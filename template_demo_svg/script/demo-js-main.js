/// <reference path="knockout-3.4.2.js" />
"use strict";
(
	function ()
	{
		var _demo_name = "seangephardt.com SVG Knockout.js demo";
		var _debug_flag = true;
		var _data = [];

		try
		{
		    console.info( "BEGIN", _demo_name, new Date().toTimeString() );
			window.document.addEventListener("DOMContentLoaded", function (str)
			{   //	console.log( "DOMContentLoaded." );
				window.KoSvgMainVm = new KoSvgMainViewModel( _debug_flag, _demo_name, _data );
				ko.applyBindings( window.KoSvgMainVm );
				return;
			});
		}
		catch (ex)
		{
			console.error("Exception", _demo_name);
			console.error(ex.number, ":", ex.name, ":", ex.message);
			console.error("stack::", ex.stack);
			return;
		}
		finally
		{
		    console.info( "END", _demo_name, new Date().toTimeString() );
		}
	return;
})();