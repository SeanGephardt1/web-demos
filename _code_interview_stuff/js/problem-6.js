/*
Figure out your Travel Itinerary

You don’t know where you’re going or where you are … you woke up with temporary 
memory loss and a handful of plane tickets ... write the code that outputs your origin, 
waypoints and your destination

Output should look like: ORIG -> waypoint -> ... -> ... -> waypoint -> waypoint -> DEST

jfk -> atl -> fla -> tex -> dev -> sfo -> lax
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
		console.debug( "ComputeSchedule", this.tickets );
		return;
	};
};