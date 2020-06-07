/* Trim to the Initial of the first name variable, and case the last name variable */
/*
 * SEAN GEPHARDT
 * Gephardt, S.
 * */
export default class ProblemFour
{
	constructor()
	{
		console.debug( "Trim to the Initial of the first name variable, and case the last name variable" );
		return;
	};
	Solution( firstName, lastName )
	{
		//	console.debug( "firstName", firstName );
		//	console.debug( "lastName", lastName );

		let _first_initial = firstName.slice( 0, 1 ).toUpperCase();
		//	console.debug( "_first_initial", _first_initial );

		let _last_initial = lastName.slice( 0, 1 ).toUpperCase();
		//	console.debug( "_last_initial", _last_initial );

		let _last_string = lastName.slice( 1, lastName.length ).toLowerCase();
		//	console.debug( "_last_string", _last_string);

		let retrunValue = _last_initial + _last_string + ", " + _first_initial + ".";
		//	console.debug( "retrunValue", retrunValue );
		return retrunValue;
	};
	DoProblems()
	{
		const returnedValue1 = this.Solution( "SEAN", "GEPHARDT" ); 
		console.debug( "One: input:", this.ArrayOne, "return value:", returnedValue1 );

		const returnedValue2 = this.Solution( "robert", "hope"); 
		console.debug( "Two: input:", this.ArrayTwo, "return value:", returnedValue2 );

		return;
	}
}