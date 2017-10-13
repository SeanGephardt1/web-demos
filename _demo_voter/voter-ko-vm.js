/// <reference path="../../script/ko/knockout-3.3.0.js" />
/// <reference path="voter-data.js" />
"use strict";
function VoterViewModel( json )
{
	/* self reference */
	var self = this; 
	/* constants */
	//this._cr = "\n";
	//this._comma = ", ";

	/* Observables */
	/* public */
	this.Topics = ko.observableArray( json.topics || [] );



	/* private */
	//this._IsNavOpen = ko.observable( false );
	//this._isPanelOpen = ko.observable( json.IsPanelOpen || false );
	return;
}

function Topic( json )
{
	this.ID = json.id;
	this.Title = ko.observable(json.title || "No Title");
	this.Url = ko.observable( json.url || "http://votr.com/no-url/" );
	this.IsNSFW = ko.observable( json.nsfw || false );
	this.Votes = ko.observable( json.votes || new Votes( { up: 0, neutral: 0, down: 0 } ) );
	this.Comments = ko.observable( json.comments || new Comments( { id: this.ID, count: 0 } ) );
	return;
}

function Votes(json)
{
	var self = this;
	this.Up = ko.observable( json.up || 0 );
	this.Neutral = ko.observable( json.neutral || 0 );
	this.Down = ko.observable( json.down || 0 );
	this.ScorePercentage = ko.computed( function ()
	{
		var u1 = this.Up();
		var n1 = this.Neutral();
		var d1 = this.Down();
		console.log( u1, n1, d1 );

		var avg = (( u1 / 100 ) * 2 ) + 
						(( n1 / 2 ) / 100 ) - 
						(( d1 / 6 ) / 100 );

		console.log( avg );

		if ( avg == NaN )
		{
			avg = 0.0;
		}
		//	console.log(avg);		
		return avg.toFixed(2);
	}, this );
	this.PreviousVote = ko.observable();
	this.CurrentVote = ko.observable();
	//this.CurrentVote.subscribe( function ( val )
	//{
	//	//	self.CastVote();
	//	return;
	//} );

	this.CastVote = function ( val, data, ev )
	{
		//	console.log( "CastVote", val );
		this.CurrentVote( val );
		//	console.log( "this.PreviousVote", this.PreviousVote(), "this.CurrentVote", this.CurrentVote() );
		if ( this.CurrentVote() === this.PreviousVote() )
		{
			//	this.PreviousVote( undefined );
			switch ( this.PreviousVote() )
			{
				case 'u': {
					this.ManageVote( this.Up, false );
					break;
				}
				case 'n': {
					this.ManageVote( this.Neutral, false );
					break;
				}
				case 'd': {
					this.ManageVote( this.Down, false );
					break;
				}
			}
			this.PreviousVote( undefined );
			this.CurrentVote( undefined );
			return;
		}

		if ( this.PreviousVote() !== undefined )
		{
			switch ( this.PreviousVote() )
			{
				case 'u': {
					this.ManageVote( this.Up, false );
					break;
				}
				case 'n': {
					this.ManageVote( this.Neutral, false );
					break;
				}
				case 'd': {
					this.ManageVote( this.Down, false );
					break;
				}
			}
		}

		switch ( this.CurrentVote() )
		{
			case 'u': {
				this.ManageVote( this.Up, true );
				break;
			}
			case 'n': {
				this.ManageVote( this.Neutral, true );
				break;
			}
			case 'd': {
				this.ManageVote( this.Down, true );
				break;
			}
		}

		this.PreviousVote( this.CurrentVote() );
		return;
	};
	this.ManageVote = function ( vote, upDown )
	{
		//	console.log( "1. VoteUp", vote() );
		var _temp = vote();
		//	console.log( "1. _temp", _temp );

		if ( upDown == true )
		{
			_temp++;
		}
		else if ( upDown == false )
		{
			_temp--;
		}
		//	console.log( "2. _temp", _temp );
		vote( _temp );
		//	console.log( "2. VoteUp", vote() );
		return;
	}

	return;
}

function Comments( json )
{
	this.ID = json.id;
	this.Count = ko.observable( json.count || 0 );
	this.Url = ko.observable();
	this._url = ko.computed( function ()
	{
		var _temp = "https://votr.com/" + this.ID + "/comments/";
		this.Url( _temp );
		return;
	}, this);
}