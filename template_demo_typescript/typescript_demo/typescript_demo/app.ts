"use strict";

class Greeter
{
	body: HTMLBodyElement;
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

	constructor( element: HTMLElement ) 
	{
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
		this.span.innerText = new Date().toUTCString();
		return;
    }

	start() 
	{
		this.timerToken = window.setInterval( () => this.span.innerHTML = new Date().toUTCString(), 500 );
		return;
    }

	stop() 
	{
		window.clearTimeout( this.timerToken );
		return;
    }
	return;
}




( function ()
{
	var _debug_flag: boolean = false;
	var _demo_name: string = "TypeScript Demo Template";

    try
    {
        console.info( "BEGIN", _demo_name );
        window.document.addEventListener( "DOMContentLoaded", function ( ev )
		{   
			console.debug( "DOMContentLoaded." );
			var el: HTMLElement = document.getElementById( 'content' );
			var greeter: Greeter = new Greeter(el);
			greeter.start();

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

// from VS Project template
//window.onload = () => {
//    var el = document.getElementById('content');
//    var greeter = new Greeter(el);
//    greeter.start();
//};