"use strict";
window.DemoUtils =
{
	// Create a unique ID in this format - [string]-[number]
	UniqueID: function(shortString, intLength)
	{
		if (shortString === undefined)
		{
			shortString = "this-app-id";
		}
		if (intLength === undefined || intLength == 0 || intLength == NaN)
		{
			intLength = 7;
		}
		var _rv = shortString + "-" + Math.random().toPrecision(intLength).replace(".", "");
		//	console.log("Util.CreateUniqueID", _rv);
		return _rv;
	},

};