"use strict";
export class PromisesTestClass
{	
	constructor( props )
	{
		//	super( props );
		this.ClassName = "Promise Test Class";
		this.DefaultPromise = undefined;
		this.TestValueTwo = 100;

		return;
	};
	PromiseResolve( args )
	{
		console.debug( "PromiseResolve()::args", args );
		this.TestValueTwo = (this.TestValueTwo * args) + args;
		console.debug( "this.TestValueTwo:: ", this.TestValueTwo );
		return;
	};
	PromiseReject( args )
	{
		console.debug( "PromiseReject()", args, this.TestValueTwo  );
		return;
	};
	PromiseFormatted( args, name )
	{
		let _time = Math.round( Math.random() * 1000 );
		let _prom_obj = { promiseName: name, promiseTime: _time };

		window.setTimeout( function ()
		{	console.debug( "PromiseFormatted", _prom_obj );
			return _prom_obj;
		}, _time );

		return;
	};
	PromiseReturnOddEven(res,rej)
	{	//	console.debug( "PromiseReturnOddEven", res, rej );
		//	console.debug( "PromiseReturnOddEven");
		let _num = Math.random();
		//	console.debug( "_num", _num);

		if ( _num < 0.5 )
		{
			res( true );
		}
		else if ( _num > 0.5 )
		{
			rej( false );
		}
		return;
	};
	PromiseRaceEntry( res, name)
	{	//	console.debug( "PromiseRaceEntry" );
		let _time = Math.round( Math.random() * 3000 );
		//	console.debug( "time", _time );
		setTimeout( res, _time, name );
		return _time;
	};

	FirePromise_Inline()
	{	
		console.debug( "FirePromiseOne, no scope passed");
		console.debug( "This function uses consectutive .then functions to change a value that is passed through, based on a Math.random() boundary condition");

		const _p1 = new Promise( function(resolve,reject)
		{
			console.debug( "started 'FirePromiseOne' " );

			let _val = Math.round( Math.random() );
			console.debug( "_val", _val );

			if ( _val == 0 )
			{
				resolve( "Resolving" );
			}
			else if ( _val == 1 )
			{
				reject( new Error( "Rejecting" ));
			}

			return;
		} )
		.then( function ( val )
		{
			console.debug( "then 1", val );
			if ( val == "Resolving" )
			{
				return  val + "!!!";
			}
			return val;
		} )
		.then( function ( val )
		{
			console.debug( "then 2",  val );
			return "***" + val;
		} )
		.then( function ( val )
		{
			console.debug( "then 3",  val );
			return "(((" + val + ")))";
		} )
		.then( function ( val )
		{
			console.debug( "then 4",  val );
			return val;
		} )
		.catch(  function ( val )
		{
			console.debug( "catch",  val );
			return;
		} );

		//	console.debug( "_p1", _p1 );
		return;
	};
	FirePromise_ClassScope()
	{	
		console.debug( "FirePromise_ClassScope" );
		console.debug( "This function runs promises against this class, and attempts to change the 'this.TestValueTwo'. " );

		const _p2 = new Promise( ( resolve, reject ) =>
		{
			const _self = this;
		
			window.setTimeout( function ()
			{
				let _val = Math.round( Math.random() );
				//	console.debug( "window.setTimeout _p2 _val", _val );

				if ( _val == 0 )
				{	
					resolve( _self );
				}
				else if ( _val == 1 )
				{
					reject( _self );
				}
				return;
			}, 1000 );
		} )
		.then( function ( val )
		{
			val.PromiseResolve( Math.random() );
			return val;
		} )
		.then( function ( val )
		{
			val.PromiseResolve( Math.random() );
			return val;
		})
		.then( function ( val )
		{
			val.PromiseResolve( Math.random() );
			return val;
		})
		.catch( function (err)
		{
			err.PromiseReject( "REJECTED" );
			return;
		} );

		//	console.debug( "_p2", _p2 );
		return;
	};
	FirePromise_All()
	{
		console.clear();
		console.debug( "FirePromiseAll()" );
		console.debug( "This function generates an array of 5 promises that compute a random number." );
		console.debug( "If random number is higher than 0.5, then true, otherwise false, If any test fails they all fail." );
		console.debug( "The result is usually false, given the algorithm" );

		const _self = this;
		let _promises = [];

		for ( let i = 0; i < 5; i++ )
		{
			let _p1 = new Promise( function ( resolve, reject ) 
			{
				_self.PromiseReturnOddEven( resolve, reject );
				return;
			} );
			_promises.push( _p1 );
		}

		Promise.all( _promises ).then( function ( values ){
			console.log( "Promise.All.resolve", values );
			return values;
		} ).catch ( function ( value ){
			console.log("Promise All.reject", value );
			return;
		} );

		return;
	};
	FirePromise_Race()
	{
		console.debug( "FirePromiseRace()" );
		console.debug( "This test generates five promises, based on setTimeout" );
		console.debug( "The promise with the fast time wins, and could be used for XHR patterns" );
		console.debug( "Because of the algorithm, the promises usually 'resolve' and don't fail or 'reject'" );

		let _self = this;
		let _promises = [];

		for ( let i = 0; i < 5; i++ )
		{
			let _p1 = new Promise( function ( resolve, reject ) 
			{
				let _t = _self.PromiseRaceEntry( resolve, ( "Promise " + (i + 1) ));
				console.debug( i, "time::", _t );
				return;
			} );
			_promises.push( _p1 );
		}

		Promise.race( _promises ).then( function ( value )
		{
			console.log("Winner! " + value );
			return;
		}, _promises ).catch( function ( value )
		{
			console.log("Loser! " + value);
			return;
		});;

		return;
	};
};
