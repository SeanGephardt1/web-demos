class Application 
{	
	constructor( props )
	{	//	super( props );
		this.Id = "new-id-1";
		this.State = {
			AppName: ( props.AppName || "ES 6 Test App" ),
			IsCssLoaded: ( props.IsCssLoaded || false),
		};
		this.Data = (props.Data || [] );

		this.InjectControlCss = function( filePath, boolAdd )
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
					if ( v.tagName.toLowerCase() == "link" )
					{	//	console.debug( i, v.id, _css.id, v.href, filePath );
						if ( v.id == _css.id )
						{	//	console.debug( i, v.tagName, v.id, v.href );
							_found = true;
						}
					}
				}
				return;
			} ); 

			//	console.debug( "_found::", _found, "boolAdd::", boolAdd );

			if ( _found == true )
			{
				if ( boolAdd == true )
				{
					document.head.insertBefore( _css, document.head.childNodes[document.head.childNodes.length] );
				}
				else if ( boolAdd == false )
				{
					let _css_head_node = document.getElementById( _css.id );
					_css_head_node.remove();
				}
			}
			else if ( _found == false)
			{
				if ( boolAdd == true )
				{
					document.head.insertBefore( _css, document.head.childNodes[document.head.childNodes.length] );
				}
				else if ( boolAdd == false )
				{
					let _css_head_node = document.getElementById( _css.id );
					_css_head_node.remove();
				}
			}
			return;
		}

		this.OnClick_TestHandler = function( mouseEvent, options )
		{	//	testing changing the border color
			//	console.debug( "OnClick_TestHandler", mouseEvent, options);
			//	console.debug( "this", this );
			if ( this.State.IsCssLoaded == false )
			{
				this.InjectControlCss( "../components/application.css", true );
				this.State.IsCssLoaded = true;
			}
			else if (this.State.IsCssLoaded == true)
			{
				this.InjectControlCss("../components/application.css", false);
				this.State.IsCssLoaded = false;
			}
			return;
		}

		this.Render();
		return;
	};
	ParseState()
	{
		//	console.debug( "ParseState", this.State );
		if ( this.State.IsCssLoaded == true )
		{
			this.InjectControlCss( "../components/application.css", true );
		}
		return;
	};
	Render()
	{
		this.ParseState();
		this.Debug();

		for ( let i = 0; i < 3; i++ )
		{
			let _new_btn = document.createElement( "button" );
			_new_btn.classList.add( "def_btn" );
			_new_btn.innerHTML = ( i + 1 ) + ". " + this.State.AppName;
			_new_btn.addEventListener( "click", this.OnClick_TestHandler.bind(this) );

			document.body.appendChild( _new_btn );
		}
		return;
	};
	Debug()
	{
		console.debug( "class Application", this );
		return;
	};
};