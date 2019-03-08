//testing javascript es5/6 class modules with imports, exports, generator functions

"use strict";
//	importing specifics from the module
//	import { ID as NewGenID, PerfectNumber as PN } from "../components/es5-module-one.js"; can be used if needed for more aliasing to avoid collisions
//	import { ID, PerfectNumber, VeryLongString } from "../components/es5-module-one.js";
//	importing the whole module
import * as TestModule from "../components/es5-module-one.js";

//	importing specifically the class from the module, needed for access to static functions
import { TestClass as tc2 }  from "../components/es5-module-one.js";

//	catch all test class
export class Application 
{	
	constructor( props )
	{	//	super( props );
		console.debug( new Date().toISOString(), "Application::ctor", props.AppName );

		this.Id = "new-id-1";
		this.TestClassID1 = "test_class_id_div_1";
		this.TestClassID2 = "test_incremental_yield_1";
		this.State = {
			AppName: ( props.AppName || "ES 6 Test App" ),
			IsCssLoaded: ( props.IsCssLoaded || false),
		};
		this.Data = (props.Data || [] );

		//	inserts CSS after every other CSS, acting as an override, so CSS class names can change on the values that are needed.
		this.InjectControlCss = function ( filePath, boolAdd )
		{	//	console.debug( "Utilities.InjectControlCss", id, filePath );
			let _found = false;
			let _css = document.createElement( "link" );
			_css.id = "app-css";
			_css.rel = "stylesheet";
			_css.href = filePath;

			document.head.childNodes.forEach( function ( v, i, a )
			{
				if ( v.tagName !== undefined )
				{
					if ( v.tagName.toLowerCase() === "link" )
					{	//	console.debug( i, v.id, _css.id, v.href, filePath );
						if ( v.id === _css.id )
						{	//	console.debug( i, v.tagName, v.id, v.href );
							_found = true;
						}
					}
				}
				return;
			} );
			//	console.debug( "_found::", _found, "boolAdd::", boolAdd );

			if ( _found === true )
			{
				if ( boolAdd === true )
				{
					document.head.insertBefore( _css, document.head.childNodes[document.head.childNodes.length] );
				}
				else if ( boolAdd === false )
				{
					let _css_head_node = document.getElementById( _css.id );
					_css_head_node.remove();
				}
			}
			else if ( _found === false )
			{
				if ( boolAdd === true )
				{
					document.head.insertBefore( _css, document.head.childNodes[document.head.childNodes.length] );
				}
				else if ( boolAdd === false )
				{
					let _css_head_node = document.getElementById( _css.id );
					_css_head_node.remove();
				}
			}
			return;
		};

		this.ParseState();
		this.Render();
		return;
	};
	Debug()
	{
		console.debug( "class Application.Debug()", this );
		return;
	};
	ParseState()
	{	//	console.debug( "class Application.ParseState()", this );
		//	console.debug( "class Application.Render()", this.State.AppName );

		if ( this.State.IsCssLoaded === true )
		{
			this.InjectControlCss( "../css/application.css", true );
		}
		return;
	};
	ClearPreviousTestClassObjects( str_ID)
	{
		console.debug( "ClearPreviousTestClassObjects", str_ID );
		let _div = document.getElementById( str_ID );
		if ( _div != null ||  _div != undefined )
		{
			document.body.removeChild( _div );
		}
		return;
	};
	TestModuleImports()
	{
		console.debug( "BEGIN TestModuleImports", this );
		this.ClearPreviousTestClassObjects( this.TestClassID1 );
		this.ClearPreviousTestClassObjects( this.TestClassID2 );

		let _html_string;
		let _div = document.createElement( "div" );
		_div.classList.add( "test-class-div-list" );
		_div.id = this.TestClassID1;

		//	module import testing, module properties
		//	console.debug( "TestModule.PerfectNumber", TestModule.PerfectNumber );
		_html_string = "<div>TestModule.PerfectNumber: " + TestModule.PerfectNumber + "</div>"; 

		//	console.debug( "TestModule.LongString", TestModule.LongString );
		_html_string = _html_string + "<div>TestModule.LongString: " + TestModule.LongString + "</div>"; 

		// static function on the class, requires a specfic alias on the module import declaration
		//	console.debug( "TestModule.TestVeryLongString", TestClass.TestStaticVeryLongString() );
			_html_string = _html_string + "<div>TestClass.TestStaticVeryLongString(): " + tc2.TestStaticVeryLongString() + "</div>"; 


		// new class 
		let newTextClass = new TestModule.TestClass();

		//	console.debug( "new TestModule.TestClass()::newTextClass.ID", newTextClass.ID );
		_html_string = _html_string + "<div>newTextClass.ID: " + newTextClass.ID + "</div>"; 

		//	console.debug( "new TestModule.TestClass()::newTextClass.TestConsole()", newTextClass.TestConsole() );
		_html_string = _html_string + "<div>newTextClass.TestConsole(): " + newTextClass.TestConsole() + "</div>"; 


		_div.innerHTML = _html_string;
		document.body.insertBefore( _div, document.body.childNodes.item(document.body.childNodes.length) );

		console.debug( "END TestModuleImports" );
		return;
	};
	ChangeBackgroundCssColor( mouseEvent )
	{	//	testing changing the border color
		console.debug( "ChangeBackgroundCssColor::this.State.IsCssLoaded =", this.State.IsCssLoaded );

		if ( this.State.IsCssLoaded === false )
		{
			this.InjectControlCss( "../css/application.css", true );
			this.State.IsCssLoaded = true;
		}
		else if ( this.State.IsCssLoaded === true )
		{
			this.InjectControlCss( "../css/application.css", false );
			this.State.IsCssLoaded = false;
		}
		return;
	};
	AutoIncrementConsoleDebug( mouseEvent )
	{
		this.ClearPreviousTestClassObjects( this.TestClassID1 );
		this.ClearPreviousTestClassObjects( this.TestClassID2 );

		let _html_string = "";
		let _counter_1 = 0;
		let _test = this.TestGenerator( _counter_1, 0, 100 );

		let _div = document.createElement( "div" );
		_div.classList.add( "test-class-div-list" );
		_div.id = this.TestClassID2;

		let _timer_id = window.setInterval( function ()
		{
			let _next_val = _test.next();
			//	console.debug( "-next_val:val =", _next_val.value, ", done =", _next_val.done );

			_html_string = _html_string + "<div>_next_val.value = " + _next_val.value + ", _next_val.done = " + _next_val.done + "</div>";
			_div.innerHTML = _html_string;

			document.body.insertBefore( _div, document.body.childNodes.item(document.body.childNodes.length) );

			if ( _next_val.done === true )
			{
				window.clearInterval( _timer_id );
				_timer_id = null;
			}
			return;
		}, 1000 );
		return;
	};
	AutoIncrementCssChange( mouseEvent )
	{
		let _test = this.TestBackgroundSwitcher( );
		let _timer_id = window.setInterval( function ()
		{
			let _next_val = _test.next();
			console.debug( "-next_val:val =", _next_val.value, ", done =", _next_val.done );

			if ( _next_val.done === true )
			{
				window.clearInterval( _timer_id );
				_timer_id = null;
			}
			return;
		}, 1000 );
		return;
	};
	Render()
	{
		//	console.debug( "class Application.Render()", this );
		//	console.debug( "class Application.Render()", this.State.AppName );

		for ( let i = 0; i < 4; i++ )
		{
			let _new_btn = document.createElement( "button" );
			_new_btn.classList.add( "def_btn" );

			switch (i)
			{
				case 0: {
					_new_btn.innerHTML = ( i + 1 ) + ". Change CSS";
					_new_btn.addEventListener( "click", this.ChangeBackgroundCssColor.bind( this ) );
					break;
				}
				case 1: {
					_new_btn.innerHTML = ( i + 1 ) + ". Console Yield check";
					_new_btn.addEventListener( "click", this.AutoIncrementConsoleDebug.bind( this ) );
					break;
				}
				case 2: {
					_new_btn.innerHTML = ( i + 1 ) + ". Cycle CSS";
					_new_btn.addEventListener( "click", this.AutoIncrementCssChange.bind( this ) );
					break;
				}
				case 3: {
					_new_btn.innerHTML = ( i + 1 ) + ". Test Module Import";
					_new_btn.addEventListener( "click", this.TestModuleImports.bind( this ) );
					break;
				}
				default: {
					break;
				}
			}
			document.body.appendChild( _new_btn );
		}
		return;
	};
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
	// generator functions, it's like window.setInterval but easier.
	*TestGenerator( counter, base, step )
	{
		console.debug( "BEGIN *TestGenerator" );

		yield [counter = ( counter + base + step ), new Date().toTimeString() ];
		yield [counter = ( counter + base + step ), new Date().toTimeString() ];
		yield [counter = ( counter + base + step ), new Date().toTimeString() ];
		yield [counter = ( counter + base + step ), new Date().toTimeString() ];
		yield [counter = ( counter + base + step ), new Date().toTimeString() ];

		console.debug( "END *TestGenerator");
		return "FINISHED";
	};
	*TestBackgroundSwitcher(mouseEvent, args)
	{	// each yield returns a simple value
		//	final return can return anything
		console.debug( "BEGIN Generator function *TestBackgroundSwitcher" );

		this.ChangeBackgroundCssColor( null, null );
		yield "this.State.IsCssLoaded";

		this.ChangeBackgroundCssColor( null, null );
		yield "Mary had a little lamb";

		this.ChangeBackgroundCssColor( null, null );
		yield "Whose fleece was white as snow";

		this.ChangeBackgroundCssColor( null, null );
		yield "Everywhere Mary went, the sheep were sure to go.";

		console.debug( "END Generator function *TestBackgroundSwitcher");
		return "FINISHED";
	};
};