// sample javascript class, with module export

"use strict";
export class StandardControlTemplate
{	// methods in order, constructor first, render last, events & function in the middle
	constructor( props )
	{
		super( props );

		//event handlers
		this.handleClick = this.OnClick_ChangeBorderColor.bind( this );

		return;
	};
	OnClick_ChangeBorderColor( ev )
	{	//	testing changing the border color
		//	console.debug( "RootLink::handleClick" );
		return;
	};
	Render()
	{
		for ( let i = 0; i < 1; i++ )
		{
			let _new_btn = document.createElement( "button" );
			_new_btn.classList.add( "def_btn" );
			_new_btn.innerHTML = ( i + 1 ) + ". " + this.State.AppName;
			_new_btn.addEventListener( "click", this.OnClick_TestHandler.bind(this) );

			document.body.appendChild( _new_btn );
		}
		return;
	};
};
