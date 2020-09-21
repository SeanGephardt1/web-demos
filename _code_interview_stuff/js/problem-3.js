// Given a matrix of numbers, if an element is 0, then set it's entire row and column to 0.
/*
//Input:
//[
//  [1,1,0], // row 0 - true
//  [1,1,1], // row 1 - false
//  [1,1,1]  // row 0 - false
//]
//Output:
//[
//  [0,0,0],
//  [1,1,0],
//  [1,1,0]
//]
*/

/*
Input:
[
  [1,1,0], // row 0 - true
  [1,1,1], // row 1 - false
  [0,1,1]  // row 2 - true
]
Output:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
*/

/*
Input:
[
  [1,1,1], // row 0 - true
  [1,0,1], // row 1 - false
  [1,1,1]  // row 2 - true
]
Output:
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
*/

export default class ProblemThree
{
	constructor()
	{
		console.clear();
		console.debug( "CHANGE THE VALUES IN A MATRIX, BASED ON VALUES IN THE FIRST ARRAY IN A NESTED ARRAY" );
		this.ArrayOne = [
			[1, 1, 0],
			[1, 1, 1],
			[1, 1, 1]
		];
		this.ArrayTwo = [
			[1, 1, 0],
			[1, 1, 1],
			[0, 1, 1]
		];
		this.ArrayThree = [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1]
		];
		return;
	};
	Solution( data )
	{
		let inputArray = JSON.parse( JSON.stringify( data ) );
		let _data = [];
		let _col_set = [];

		// FIND THE ROWS THAT CONTAIN ZEROS
		for ( let i = 0; i < inputArray.length; i++ )
		{	//	console.debug( inputArray[i] );
			_col_set[i] = 1;
			let _hasZero = inputArray[i].indexOf(0);
			//	console.debug( i, "_hasZero", _hasZero );

			if ( _hasZero !== -1 )
			{
				_data[i] = { found: true, cols: [...inputArray[i]] };
			}
			else 	if ( _hasZero === -1 )
			{
				_data[i] =  { found: false, cols: [...inputArray[i]] };
			}
		}
		//	console.debug( "_data", _data, _col_set );

		// COLLAPSE COLUMN MAPPING
		for ( let i = 0; i < _data.length; i++ )
		{	//	console.debug( "data", i, _data[i].cols );
			for ( let k = 0; k < _data[i].cols.length; k++ )
			{
				//	console.debug( i, k, "data", _data[i].cols[k], _col_set[i] );
				if (_col_set[k] === 1 && _data[i].cols[k] === 0)
				{
					_col_set[k] = 0;
				}
			}

			//	WORKING???
			if ( _data[i].found === true )
			{
				for ( let j = 0; j < inputArray[i].length; j++ )
				{
					inputArray[i][j] = 0;
				}
			}
			else if ( _data[i].found === false )
			{
				inputArray[i] = _col_set;
			}
		}

		return inputArray;
	};
	DoProblems()
	{
		const returnedValue1 = this.Solution( this.ArrayOne ); 
		console.debug( "One" );
		console.table( this.ArrayOne );
		console.table( returnedValue1 );

		const returnedValue2 = this.Solution( this.ArrayTwo ); 
		console.debug( "Two" );
		console.table( this.ArrayTwo );
		console.table( returnedValue2 );

		const returnedValue3 = this.Solution( this.ArrayThree ); 
		console.debug( "Three", );
		console.table( this.ArrayThree );
		console.table( returnedValue3 );

		return;
	}
}