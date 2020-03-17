export default class ProblemThree
{
	constructor()
	{
		console.debug( "PROBLEM STATEMENT" );
		this.Answer;
		return;
	};
	DisplayAnswer( expectedResult, arrayAnswer )
	{
		console.debug( "Expected result:", expectedResult, "answer:", arrayAnswer );
		return;
	};
	Solution( A )
	{
		let _return_value = A.sort();
		return _return_value;
	};
	DoProblems()
	{
		this.Answer = this.Solution( ["dog", "cat", "bird"] );
		this.DisplayAnswer( "test value 1", this.Answer );

		this.Answer = this.Solution( ["car", "truck", "bike"] );
		this.DisplayAnswer( "test value 2", this.Answer );

		this.Answer = this.Solution( ["guitar", "piano", "drums"] );	
		this.DisplayAnswer( "test value 3", this.Answer );

		return;
	}
}