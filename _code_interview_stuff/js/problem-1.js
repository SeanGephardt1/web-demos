export default class ProblemOne
{
	constructor()
	{
		console.clear();
		console.debug( "FIND THE NEXT LOWEST INTEGER ABOVE 0 IN AN ARRAY" );
		this._array_1 = [1, 3, 6, 4, 1, 2, 6, 4, 3]; // 5
		this._array_2 = [1, 2, 3]; // 4
		this._array_3 = [-1, -3]; // 1
		this._array_4 = [-99, -1, -5, -1, -3, 6, 19, 1, 9, 31,4]; // 5
		this.Answer;
		return;
	};
	DisplayAnswer( result, arr )
	{
		console.debug( "Expected answer:", result, ":", arr[1], arr[0] );
		return;
	};
	Solution( A )
	{
		let _return_value = undefined;

		let _filtered = A.filter( val => val > 0 ).sort( ( a, b ) =>
		{
			if ( a > b )
			{ return 1; }

			if ( a < b )
			{ return -1; }

			if ( a === b )
			{ return 0; }
		} );

		let _arr = Array.from( new Set( _filtered ) );

		for ( let i = 0; i < _arr.length; i++ )
		{
			if (_arr[i] +1 === _arr[i + 1])
			{
				continue;
			}
			else if (_arr[i] +1 !== _arr[i + 1] )
			{
				_return_value = ( _arr[i] + 1 );
				break;
			}
		}

		if ( _return_value === undefined )
		{	
			_return_value = _arr.length + 1;
		}
		return [A,_return_value];
	};
	DoProblems()
	{
		this.Answer = this.Solution( this._array_1 );
		this.DisplayAnswer( 5, this.Answer );

		this.Answer = this.Solution( this._array_2 );
		this.DisplayAnswer( 4, this.Answer );

		this.Answer = this.Solution( this._array_3 );
		this.DisplayAnswer( 1, this.Answer );

		this.Answer = this.Solution( this._array_4 );
		this.DisplayAnswer( 2, this.Answer );

		return;
	}
}