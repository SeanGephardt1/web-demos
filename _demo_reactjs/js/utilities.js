var Utilities = {
	NewId: function(strValue)
	{
		var _rv = "";
		var _id_name = "";
		if ( strValue !== undefined )
		{
			_id_name = strValue + "-";
		}
		else
		{
			_id_name = "id-";
		}
		_rv = _id_name + Math.random().toPrecision( 4 ).replace( ".", "" );
		//	console.debug( "Utilities.NewId()._rv", _rv );
		return _rv;
	},
};