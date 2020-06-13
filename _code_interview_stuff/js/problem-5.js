/* Javacript examples from https://github.com/lydiahallie/javascript-questions#readme */
/*
	Task_()
	{
		console.debug( "Task _" );
		try
		{

		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
 */

class Chameleon 
{
	static colorChange( newColor )
	{
		this.newColor = newColor;
		return this.newColor;
	}
	constructor( { newColor = 'green' } = {} ) 
	{
		this.newColor = newColor;
	}
}

function bark() 
{
	console.log( 'Woof!' );
	return;
};

function Person( firstName, lastName )
{
	this.firstName = firstName;
	this.lastName = lastName;
	return;
}

function Sum( a, b ) 
{
	return a + b;
}

function getPersonInfo( one, two, three )
{
	console.log( "getPersonInfo one", one );
	console.log( "getPersonInfo two", two );
	console.log( "three", three );
	return;
}

function checkAge( data )
{
	console.debug( "checkAge", data );
	if ( data === { age: 18 } )
	{
		console.log('You are an adult!');
	}
	else if ( data == { age: 18 } ) 
	{
		console.log( 'You are still an adult.' );
	}
	else
	{
		console.log(`Hmm.. You don't have an age I guess.`);
	}
	return;
}

function getAge( ...args )
{
	console.log( "getAge", typeof args, args );
	return;
}


export default class JSQA
{
	constructor()
	{
		console.debug( "Javacript examples from https://github.com/lydiahallie/javascript-questions#readme" );
		return;
	};
	static Task1()
	{
		console.debug( "Task 1" );
		try
		{
			console.log( "name", name );
			console.log( "age", age );
			var name = 'Lydia';
			let age = 21;
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task2()
	{
		console.debug( "Task 2" );
		try
		{
			for ( var i = 0; i < 3; i++ )
			{
				setTimeout(() => console.log("Task 2 : for loop 1", i), 1);
			}

			for ( let i = 0; i < 3; i++ )
			{
				setTimeout( () => console.log( "Task 2: for loop 2", i ), 1 );
			}
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task3()
	{
		console.debug( "Task 3" );
		try
		{
			const shape =
			{
				radius: 10,
				diameter()
				{
					return this.radius * 2;
				},
				perimeter: () => 2 * Math.PI * this.radius,
			};

			console.log( "shape.diameter()", shape.diameter() );
			console.log( "shape.perimeter()",shape.perimeter() );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task4()
	{
		console.debug( "Task 4" );
		try
		{
			console.debug( "+true", +true );
			console.debug( "!'Lydia'", !'Lydia' );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task5()
	{
		console.debug( "Task 5" );
		try
		{
			const bird = {
			  size: 'small',
			};

			const mouse = {
			  name: 'Mickey',
			  small: true,
			};

			console.debug( "A: mouse.bird.size", mouse.bird.size );
			console.debug( "B: mouse[bird.size]", mouse[bird.size] );
			console.debug( "C: mouse[bird['size']]", mouse[bird["size"]] );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task6()
	{
		console.debug( "Task 6" );
		try
		{
			let c = { greeting: 'Hey!' };
			let d;
			console.log("c", c, "d", d );

			d = c;
			c.greeting = 'Hello';
			console.log("c", c, "d", d );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task7()
	{
		console.debug( "Task 7" );
		try
		{
			let a = 3;
			let b = new Number(3);
			let c = 3;

			console.log("a == b", a == b);
			console.log("a === b", a === b);
			console.log("b === c", b === c);
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};	
	static Task8()
	{
		console.debug( "Task 8" );
		try
		{
			const freddie = new Chameleon( { newColor: 'purple' } );
			console.log( freddie.colorChange( 'orange' ) );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task9()
	{
		console.debug( "Task 9" );
		try
		{
			let greeting;
			greetign = {}; // Typo!
			console.log(greetign);
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task10()
	{
		console.debug( "Task 10" );
		try
		{
			bark.animal = 'dog';

			console.debug( "bark()", bark );
			console.debug( "new bark()", new bark() );
			console.debug( "bark.animal", bark.animal );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};	
	static Task11()
	{
		console.debug( "Task 11" );
		try
		{
			console.log( "Person", Person );
			console.log( "Person.prototype", Person.prototype );

			const member = new Person( 'Lydia', 'Hallie' );
			Person.getFullName = function () 
			{
				return `${this.firstName} ${this.lastName}`;
			};

			console.log( member.getFullName() );

		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task12()
	{
		console.debug( "Task 12" );
		try
		{
			function Person2( firstName, lastName )
			{
				this.firstName = firstName;
				this.lastName = lastName;
				return;
			}

			const lydia = new Person2('Lydia', 'Hallie');
			const sarah = Person2('Sarah', 'Smith');

			console.log("lydia", lydia);
			console.log("sarah", sarah);
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};	
	static Task15()
	{
		console.debug( "Task 15" );
		try
		{
			let _sum = Sum( 1, '2' );
			console.debug( "_sum", _sum );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};	
	static Task16()
	{
		console.debug( "Task 16" );
		try
		{
			let number = 0;

			console.log( "number", number );
			console.log( "number++", number++ );
			console.log( "++number", ++number );
			console.log( "number", number );
			console.log( "number--", number-- );
			console.log( "--number", --number );
			console.log( "number", number );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task17()
	{
		console.debug( "Task 17" );
		try
		{
			const person = 'Lydia';
			const age = 21;

			getPersonInfo`${person} is ${age} years old`;

			console.log( `${person} is ${age} years old` );
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task18()
	{
		console.debug( "Task 18" );
		try
		{
			console.debug( "checkAge({ age: 18 });" );
			checkAge({ age: 18 });
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	};
	static Task19()
	{
		console.debug( "Task 19" );
		try
		{
			console.debug( "getAge(21);" );
			getAge(21);
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	}
	static Task20()
	{
		console.debug( "Task 20" );
		try
		{
			function getAge()
			{
			  'use strict';
			  age = 21;
			  console.log(age);
			}

			getAge();
		}
		catch ( ex )
		{
			console.error( ex );
		}
		return;
	}
	static RunAllQuestions()
	{
		JSQA.Task1();
		JSQA.Task2();
		JSQA.Task3();
		JSQA.Task4();
		JSQA.Task5();
		JSQA.Task6();
		JSQA.Task7();
		JSQA.Task8();
		JSQA.Task9();
		JSQA.Task10();
		JSQA.Task11();
		JSQA.Task12();
		JSQA.Task15();
		JSQA.Task16();
		JSQA.Task17();
		JSQA.Task18();
		JSQA.Task19();
		JSQA.Task20();

		return;
	}
};