// Given a matrix of numbers, if an element is 0, then set it's entire row and column to 0.

//Input:
//[
//  [1,1,0],
//  [1,1,1],
//  [1,1,1]
//]
//Output:
//[
//  [0,0,0],
//  [1,1,0],
//  [1,1,0]
//]
//Input:
//[
//  [1,1,0], // row 0 - true
//  [1,1,1], // row 1 - false
//  [0,1,1]  // row 2 - true
//]
//Output:
//[
//  [0,0,0],
//  [0,1,0],
//  [0,0,0]
//]

export default class ProblemThree
{
	constructor()
	{
		console.debug( "Change the values in a matrix, based on values in the first array in a jagged array" );
		this.Answer;

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

		return;
	};
	Solution( A )
	{

		for (let i = 0; i< _arr1.length; i++)
		{
		  let _row = [];
		  for (let j = 0; j< _arr1[i].length; j++)
		  {
 
		    let _col = _arr1[i][j];
		    if (_col === 0)
		    {
		      //
		      _row.push(true);  
		    }
		     else if (_col === 1)
		     {
		       _row.push(false);
		     }
		  }
		  _data.push(_row);
		}

		_ret_arr.sort();
		return _ret_arr;
	};
	DoProblems()
	{
		this.Solution(); 
		return;
	}
}