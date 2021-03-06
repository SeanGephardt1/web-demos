"use strict";
(function ()
{
    var _debug_flag = true;
	var _demo_name = "Knockout.js demo template";
    try
	{
		console.info("BEGIN", _demo_name);

		window.document.addEventListener("DOMContentLoaded", function (ev)
		{   //	console.log( "DOMContentLoaded." );
		    var _main_vm = new MainViewModel( _demo_name, _debug_flag );
			ko.applyBindings( _main_vm );
			return;
		});
	}
	catch (ex)
	{
		console.error("Prototype Exception", _demo_name);
		console.error(ex.number, ":", ex.name, ":", ex.message);
		console.error("stack::", ex.stack);
		return;
	}
	finally
	{
		console.info("END", _demo_name);
	}
	return;
})();