/// <reference path="../../script/react/react-dom-16.4.0.js" />
/// <reference path="../../script/react/react-dom-latest.js" />
/// <reference path="../../js/utilities.js" />
"use strict";
// control template - flesh out all functions, methods, events
class StandardControlTemplate extends React.Component
{	// methods in order, constructor first, render last, events & function in the middle
	constructor( props )
	{
		super( props );

		//properties
		//this.Id = this.props.id;
		//this.props = props.Application.props.TopNavigationBar;
		//this.Theme = props.Application.props.Theme;
  //      this.CssFileID = "btn-css"; //Utilities.NewId("btn-css");
  //      this.CssFile = "components/standard-controls/button/button.css";
		//this.CssClassNames = {
  //          Normal: this.Theme + " buttonControl " + this.ButtonStyle,
  //          Alerted: this.Theme + " RootLinkCssExtra " + this.ButtonStyle,
  //      };
		//this.state = {
		//	items: [],
		//	inner_text: this.props.InnerText,
		//	prev_text: this.props.InnerText,
		//	isClicked: false,
		//	currentCssClass: this.CssClassNames.Normal
		//};

		//event handlers
		this.handleClick = this.OnClick_ChangeBorderColor.bind( this );

		//	inject CSS
		//	Utilities.InjectControlCss(this.CssFileID, this.CssFile);
		return;
	};
	componentDidMount()
	{	//	not used yet
		return;
	};
	componentDidUnMount()
	{	//	not used yet
		return;
	};	
	OnClick_ChangeBorderColor( ev )
	{	//	testing changing the border color
		//	console.debug( "RootLink::handleClick" );
		ev.preventDefault();
		ev.stopPropagation();

		//let _changed = Utilities.ReverseString( this.state.prev_text );

		if ( this.state.isClicked == true )
		{
			this.setState( { isClicked: false } );
			this.setState( { inner_text: this.state.prev_text } );
			this.setState( { currentCssClass: this.CssClassNames.Normal } );
		}
		else if ( this.state.isClicked == false )
		{
			this.setState( { isClicked: true } );
			this.setState( { inner_text: _changed } );
			this.setState( { currentCssClass: this.CssClassNames.Normal + " " + this.CssClassNames.Alerted } );
		}
		//	for firing events at the top level of "Application" class
		this.Application.OnClick_OpenCloseLeftNav( ev, false );
		return;
	};
	render()
	{
		//	console.debug( "RootLink", this.props, typeof RootLink );
		//	alternation syntax for data-binding
		//	return React.createElement( 'div', { className: 'SearchPanel' }, `Clicked: ${this.props.InnerText}` );
		//	contents of the element: `this.state.inner_text: ${this.state.inner_text} | this.state.isClicked: ${this.state.isClicked}`
		return React.createElement( 'div', {
			id: Utilities.NewId( "root-link" ),
			className: this.state.currentCssClass,
			onClick: this.handleClick
		}, `${this.state.inner_text} : ${this.state.isClicked}` );
	};
};
