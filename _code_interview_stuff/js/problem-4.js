/* Trim to the Initial of the first name variable, and case the last name variable */
export default class ProblemFour
{
	constructor()
	{
		console.clear();
		console.debug( "TRIM TO THE INITIAL OF THE FIRST NAME VARIABLE, AND CASE THE LAST NAME VARIABLE" );

		this.ArrayOne = ["SEAN", "GEPHARDT"];
		this.ArrayTwo = ["robert", "hope"];
		this.ArrayThree = ["maximilian", "uriah", "washington"];
		this.ArrayFour = ["LIVINGSTON", "conan", "allan", "DOYLE"];

		return;
	};
	Solution( nameArray )
	{
		//	console.debug( "nameArray", nameArray );
		let _return_value = [];
		let _initial, _last_name, _new_name;

		for ( let i = 0; i < nameArray.length; i++ )
		{
			_initial = nameArray[i].slice( 0, 1 ).toUpperCase();
			//	console.debug( "_initial", _initial );

			if ( i < nameArray.length - 1 )
			{
				_return_value.push( _initial + ".");
			}

			if ( i === nameArray.length - 1 )
			{
				_last_name = _initial + nameArray[i].slice( 1, nameArray[i].length ).toLowerCase();
				//	console.debug( "_last_name ", _last_name  );
				_return_value.push( _last_name);
			}
		}
		_return_value = _return_value.join(" ");
		//	console.debug( "_return_value", _return_value );
		return _return_value;
	};
	DoProblems()
	{
		const returnedValue1 = this.Solution( this.ArrayOne ); 
		console.debug( "1: input:", this.ArrayOne, "return value:", returnedValue1 );

		const returnedValue2 = this.Solution( this.ArrayTwo ); 
		console.debug( "2: input:", this.ArrayTwo, "return value:", returnedValue2 );

		const returnedValue3 = this.Solution( this.ArrayThree ); 
		console.debug( "3: input:", this.ArrayThree, "return value:", returnedValue3 );

		const returnedValue4 = this.Solution( this.ArrayFour ); 
		console.debug( "4: input:", this.ArrayFour, "return value:", returnedValue4 );
		return;
	}
}