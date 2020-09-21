/*
Figure out your Travel Itinerary

You don’t know where you’re going or where you are you woke up with temporary 
memory loss and a handful of plane tickets ... write the code that outputs your origin, 
waypoints and your destination

Output should look like: ORIG -> waypoint -> ... -> ... -> waypoint -> waypoint -> DEST

jfk -> atl -> fla -> tex -> den -> sfo -> lax
*/
export default class Flights
{
	constructor()
	{
		console.debug( "Figure out your Travel Itinerary" );

		this.tickets = [
			{from: 'atl', to: 'fla'},
			{from: 'sfo', to: 'lax'},
			{from:'jfk', to:'atl'},
			{from: 'fla', to: 'tex'},
			{from:'den', to:'sfo'},
			{from:'tex', to: 'den'}
		];
		return;
	};
	ComputeSchedule()
	{
		console.debug( "Expected outpuit" );
		console.debug( "jfk -> atl -> fla -> tex -> den -> sfo -> lax" );

		console.table( this.tickets );

		let _start;
		let _new = [];
		let _tickets2 = [];

		// FIND THE FIRST DESTINATION
		this.tickets.forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			let _fin = a.filter( item =>
			{
				return item.to === v.from;
			} );

			if ( _fin.length === 0 )
			{
				_start = v;
				_new.push( _start );
			}

			return;
		} );
		console.debug( "Starting element", _start );

		//	FILTER OUT THE STARTING ITEM TO A SECOND ARRAY
		_tickets2 = this.tickets.filter( item =>
		{
			return item !== _start;
		}, _start );
		//	console.debug( _tickets2.length);

		// SORT THE REST
		for ( let i = 0; i < this.tickets.length; i++ )
		{	//	console.debug( i, _start, this.tickets[i] );
			let _fin = _tickets2.filter( item =>
			{
				return _start.to === item.from;
			} );
			//	console.debug( "_fin", _fin );

			if ( _fin.length !== 0 )
			{
				_start = _fin[0];
				_new.push( _start );
			}
		}

		console.table( _new );

		//	FORMAT
		//	`string text ${expression} string text`
		let _formatted_string = "";

		for ( let i = 0; i < _new.length; i++ )
		{
			if ( i === 0 )
			{
				_formatted_string += `${_new[i].from} -> ${_new[i].to} `;
			}
			else if ( i === _new.length )
			{
				_formatted_string += `-> ${_new[i].from}`;
			}
			else
			{
				_formatted_string += `-> ${_new[i].to} `;
			}
		}
		console.debug( "Formatted output" );
		console.debug( _formatted_string.toUpperCase() );

		return;
	};
};