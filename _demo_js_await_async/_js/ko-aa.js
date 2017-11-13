function AsyncAwaitViewModel()
{
	var _self = this;
	this.Output = ko.observable("debug");

	this.Double = function( x )
	{
		return new Promise( resolve =>
		{
			setTimeout( () =>
			{
				resolve( x * 3 );
			}, 2000);
		});
	}

	this.AddAsync = async function( x )
	{
		const a = await this.Double( 10 );
		console.debug( "await:a:", a );
		this.Output("a: " +  a );

		const b = await this.Double( 20 );
		console.debug( "await:b:", b );
		this.Output("b: " +  b );

		const c = await this.Double( 30 );
		console.debug( "await:c:", c );
		this.Output( "c: " + c );

		window.setTimeout(() =>
		{
			 console.log("F");
			 return;
		}, 5000);

		return x + a + b + c;
	}

	this.Init = ko.computed( function ()
	{	//	console.debug("this.init");
		this.AddAsync( 10 ).then( ( sum ) =>
		{	//	console.debug( "then.sum", sum );
			this.Output( "sum = " + sum );
			return;
		} );

		return;
	}, this );

	return;
};