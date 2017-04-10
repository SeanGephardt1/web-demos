/// <reference path="knockout-3.4.2.js" />
"use strict";
(
	function ()
	{
	    var _demo_name = "SVG Knockout.js demo, seangephardt.com";
		var _debug_flag = true;

		try
		{
		    console.info( "BEGIN", _demo_name, new Date().toTimeString() );
			window.document.addEventListener("DOMContentLoaded", function (str)
			{
			    window.KoSvgMainVm = new KoSvgMainViewModel( _debug_flag, _demo_name, window._debug_data_001 );
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