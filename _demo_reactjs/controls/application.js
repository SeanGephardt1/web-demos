/// <reference path="../script/react/react-15.6.1.js" />
/// <reference path="../js/utilities.js" />
/// <reference path="../script/react/react-dom-15.6.1.js" />
"use strict";

// control template - flesh out all functions, methods, events
class RootLink extends React.Component
{	// methods in order, constructor first, render last, events & function in the middle
	constructor( props )
	{
		super( props );
		this.handleClick = this.handleClick.bind( this );
		this.Id = this.props.id;

		this.CssClassNames = {
			Normal: "RootLinkCss",
			Alerted: "RootLinkCssExtra"
		};

		this.state = {
			items: [],
			inner_text: this.props.InnerText,
			prev_text: this.props.InnerText,
			isClicked: false,
			currentCssClass: this.CssClassNames.Normal
		};
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
	handleClick( ev )
	{	//	testing changing the border color
		//	console.debug( "RootLink::handleClick" );
		ev.preventDefault();
		var _changed = "Handling this event...";

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
		return;
	};
	render()
	{
		//	console.debug( "RootLink", this.props, typeof RootLink );
		//	alternation syntax for data-binding
		//	return React.createElement( 'div', { className: 'SearchPanel' }, `Clicked: ${this.props.InnerText}` );
		return React.createElement( 'div', {
			id: Utilities.NewId( "rl" ),
			className: this.state.currentCssClass,
			onClick: this.handleClick
		},`this.state.inner_text: ${this.state.inner_text} | this.state.isClicked: ${this.state.isClicked}` );
	};
};

// simple controls
class SearchLink extends React.Component
{
	render()
	{	//	console.debug( "SearchLink", this.props );
		return React.createElement( 'div', { className: 'SearchPanel' }, `Search: ${this.props.InnerText}` );
	};
};

class UserSwitch extends React.Component
{
	render()
	{	//	console.debug( "UserSwitch", this.props );
		return React.createElement( 'div', { className: 'UserSwitchPanel' }, `Users: ${this.props.InnerText}` );
	};
};

class VerticalNavigation extends React.Component
{
	render()
	{	//	console.debug( "VerticalNavigation", this.props );
		return React.createElement( 'div', { className: 'VerticalNavigationPanel' }, `Users: ${this.props.InnerText}` );
	};
};


//	main application - 
//	try breaking down to seperate control files
//	and managing state for walk-throughs & editing
class Application extends React.Component
{
	//	simple default
	//	JSX need to be compiled, may not use JSX for this
	//	return <div>Hello {this.props.InnerText}</div>;
	constructor( props )
	{
		super( props );
		this.handleClick = this.handleClick.bind( this );
		this.state = { };
		return;
	};
	handleClick( ev )
	{	console.debug( "Application::handleClick", ev, this.props, this.state );
		ev.preventDefault();
		return;
	};
	render()
	{
		console.debug( "Application::render", this.state, this.props );

		// arrays of config style properties
		var _root_links_array = [];
		for(var i = 0; i < this.props.RootLinks.length; i++)
		{
			//	console.debug( "this.props.RootLinks", this.props.RootLinks[i] );
			_root_links_array.push(
				React.createElement( RootLink, { key: Utilities.NewId(), InnerText: this.props.RootLinks[i].RootLink.InnerText } )
			);
		}

		//	return React.createElement( 'div', null, `Hello ${this.props.InnerText}` );
		//  params
		//	1. output html element type
		//	2. output html element attributes
		//	3. array of child controls
		return React.createElement(
			 "div",
			 { className: 'MainAppContainer' },
			 //React.createElement( RootLink, { InnerText: this.props.RootLinks[1].RootLink.InnerText } ),
			 //React.createElement( RootLink, { InnerText: this.props["SearchLink.InnerText"] } ),
			 //React.createElement( RootLink, { InnerText: this.props["UserSwitchList"] } ),
			 _root_links_array,
			 React.createElement( SearchLink, { InnerText: this.props["SearchLink.InnerText"] } ),
			 React.createElement( UserSwitch, { InnerText: this.props["UserSwitchList"] } ),
			 React.createElement( VerticalNavigation, { InnerText: this.props["VerticalNavigation"] } )
			 );
	};
};