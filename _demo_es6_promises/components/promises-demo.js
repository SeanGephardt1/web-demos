class PromiseDemoClass
{	
	constructor( props )
	{
		console.debug( "props", props );

		this.ID = Symbol( ( Math.random() * 99 ).toFixed( 5 ) );
		//	console.debug( this.ID );

		this.Element = document.getElementById( props.elementID );
		this.DefaultPromise = new Promise( function ( resolve, reject )
		{
			console.debug( "Inside 'this.DefaultPromise' assignment" );

			setTimeout( function ()
			{
				resolve( "resolve done" );
			}, 1000 );

			setTimeout( function ()
			{
				reject( "reject done" );
			}, 3000 );
			return;
		} );
		return;
	};
	Display()
	{
		this.Element.innerText = this.ID.toString();
		return;
	};
};
export
{
	PromiseDemoClass as PromiseDemo
};