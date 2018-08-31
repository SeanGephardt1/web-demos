// testing simple ES5/6 module exports
"use strict";

const _perfect_number = 1.13579197531;
const _very_long_string = "A quick Brown Fox jumps over the Lazy Dog.";

function _generated_id()
{
	let _id = "ID-" + Math.random().toPrecision( 5 ).replace( ".", "" );
	//	console.debug( "testing javascript modules::Generated_ID()", _id );
	return _id;
};

class _TestClass
{
	constructor()
	{
		this.ID = _generated_id();
		return;
	};
	TestConsole()
	{
		return "This is a test of _TestClass.TestConsole() function.";
	};
	static TestStaticVeryLongString()
	{
		return "This is a test of _TestClass.TestStaticVeryLongString() static function." + _very_long_string;
	};
};

// seems to work best, keeps this specific
export
{
	_perfect_number as PerfectNumber,
	_very_long_string as LongString,
	_generated_id as ID,
	_TestClass as TestClass
};