"use strict";
import {calc, printCalc} from './callback-pattern.js';

import Car from './class-pattern.js';
import {SUV,Hummer}  from './constructor-pattern.js';
import Car2  from './singleton-pattern.js';
import {carFactory}  from './factory-pattern.js';


( function ()
{
	const _demo_name = "Linked In JavaScript Design Patterns - https://www.linkedin.com/learning/javascript-patterns-2/class-design-pattern";

	try
	{
		console.clear();
		console.info( "BEGIN", _demo_name );
		window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{   
			console.log( "DOMContentLoaded" );

            // chapter 1 
            let aNumber = calc();
            console.debug(aNumber);
          
            printCalc(calc);

			const civic = new Car(4, "v6", "red");
			console.debug("class pattern", civic);

			const CX5 = new SUV(2, "v8", "black");
			console.debug("constructor pattern", CX5);

			const Hummer2 = new Hummer(6, "v12", "white");
			console.debug("constructor pattern", Hummer2);	

			const mini = new Car2(2, "v6", "blue");
			console.debug("singleton pattern - instance 1", mini);

			const mini2 = new Car2(4, "v8", "yellow");
			console.debug("singleton pattern - instance 2", mini2);	

			const carMaker = new carFactory();
			const newHonda = carMaker.createCar('honda');
			const newCivic = carMaker.createCar('civic');
			
			console.debug("factory pattern", carMaker);
			console.debug("factory pattern", newHonda);
			console.debug("factory pattern", newCivic);
				

			// chapter 2

			return;
		} );
	}
	catch ( ex )
	{
		console.error( "Exception", _demo_name );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "stack::", ex.stack );
		return;
	}
	finally
	{
		console.info( "END", _demo_name );
	}
	return;
} )();