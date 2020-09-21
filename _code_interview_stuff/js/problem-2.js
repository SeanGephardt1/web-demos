export default class ProblemTwo
{
	constructor()
	{
		console.clear();
		console.debug( "CREATE AN ARRAY WITH THE SUM OF THE VALUES EQUAL ZERO." );
		this.Answer;
		return;
	};
	IsZero( A )
	{
		let _zero = 0;
		A.forEach( function ( v, i, a )
		{
			_zero = _zero + v;
			return;
		} );
		console.debug( "Adds to zero:", _zero, "length:",  A.length, "array:",  A);
		return;
	};
	Solution( A )
	{
		let _ret_arr = [];
		let _arr_neg = [];
		let _arr_pos = [];

		let _arr_count = 0;
		let _arr_mod = ( A % 2 );

		if ( _arr_mod === 0 )
		{
			_arr_count = Math.round( ( A / 2 ) );
		}
		else if ( _arr_mod === 1 )
		{
			_arr_count = Math.round( ( A / 2 ) - 1 );
		}

		for ( let i = 1; i < _arr_count + 1; i++ )
		{
			_arr_neg.push( -i );
			_arr_pos.push( i );
		}

		if ( ( _arr_neg.length + _arr_pos.length) < A )
		{
			_ret_arr = [..._arr_neg, ..._arr_pos, ...[0]];
		}
		else
		{
			_ret_arr = [..._arr_neg, ..._arr_pos];
		}

		_ret_arr.sort();
		return _ret_arr;
	};
	DoProblems()
	{
		this.Answer = this.Solution( 5 ); 
		this.IsZero( this.Answer );

		this.Answer = this.Solution( 4 ); 
		this.IsZero( this.Answer );

		return;
	}
}