"use strict";
(function ()
{
	var _demo_name = "Demo";
	try
	{
		console.info("BEGIN", _demo_name);

		//var _nav = new NavigationLinks();
		//_nav.Init();

		window.document.addEventListener("DOMContentLoaded", function (str)
		{
			//	console.log( "DOMContentLoaded." );
			var _qb_vm = new ListTestViewModel("Query Builder DEBUG");
			ko.applyBindings(_qb_vm);
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