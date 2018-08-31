import List_Item from '../components/list_item.js';
import DataLists from '../store/data-lists.js';

export default
{
    items: [],
	RandomData: function()
	{
		let _temp = [];
		const _seed = 10;
		let _range = Math.floor( Math.random() * _seed ) + _seed;
		console.debug( "RandomData:_range", _range );

		for ( var i = 0; i < _range; i++ )
		{
			let _new_list_item = new List_Item();

			let _first_name_index = Math.floor( Math.random() * DataLists.firstNames.length - 1 );
			if ( _first_name_index < 0 )
			{
				_first_name_index = 0;
			}
			let _first_name = DataLists.firstNames[_first_name_index]; //	console.debug( _first_name_index, "_first_name", _first_name );

			let _last_name_index = Math.floor( Math.random() * DataLists.lastNames.length - 1 );
			if ( _last_name_index < 0 )
			{
				_last_name_index = 0;
			}
			let _last_name = DataLists.lastNames[_last_name_index]; //	console.debug(_last_name_index, "_last_name", _last_name );

			let _full_name = _first_name + " " + _last_name; //	console.debug("_full_name", _full_name );
			_new_list_item.name = _full_name;



			let _y = new Number( Math.floor( Math.random() * ( 2020 - 1920 + 1 ) + 1920 ));
			console.debug( "_y", _y );
			let _m = new Number( Math.random() * 13 );
			let _d = new Number( Math.random() * 32 );
			let _new_date = new Date( _y, _m, _d );
			//	console.debug( "_new_date", _new_date.toUTCString() );

			_new_list_item.date = _new_date.toDateString();
			_temp.push( _new_list_item );

			//let _rnd = new Number(Math.random() * _seed).toPrecision( 11 );
			//let _r_str = _rnd.toString().split( '.' );
			//let _item = "List item #" + _r_str[1];
			//this.items.push( _item );
		}

		_temp.sort( function (a,b)
		{
			return a.name > b.name;
		} );

		this.items = _temp;

		return;
	},

	};