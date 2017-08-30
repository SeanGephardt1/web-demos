/// <reference path="../script/react/react-15.6.1.js" />
/// <reference path="../script/react/react-dom-15.6.1.js" />
"use strict";

// control template - flesh out all functions, methods, events
class RootLink extends React.Component
{
	constructor( props )
	{
		super( props );
		this.handleClick = this.handleClick.bind( this );
		this.state = {
			items: [],
			inner_text: this.props.InnerText
		};
		return;
	};
	handleClick( ev )
	{	console.debug( "RootLink::handleClick", ev, this.props, this.state );
		ev.preventDefault();

		//	this.setState( { inner_text: 'Changed' } );
		var _changed = "Changed";
		this.setState( { inner_text: _changed } );
		//	this.props.InnerText = "Changed";
		return;
	};
	render()
	{
		console.debug( "RootLink", this.props, typeof RootLink );
		//	alternation syntax for data-binding
		//	return React.createElement( 'div', { className: 'SearchPanel' }, `Search: ${this.props.InnerText}` );
		if ( this.state.inner_text.length > 0)
		{
			var _rv = [];
			var _list = new Array( this.state.inner_text );
			var _self = this;

			_list.forEach( function ( v, i, a )
			{
				_rv.push( React.createElement( 'div', { className: 'RootLinkCss', id: 'Azure-App-Panel', onClick: _self.handleClick }, this.state.inner_text[i] ) );
			} );			
			return _rv;
		}
		else
		{
			return React.createElement( 'div', { className: 'RootLinkCss', id: 'Azure-App-Panel', onClick: this.handleClick }, this.state.inner_text );
		}
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
	//	JSX need to be compiled
	//	return <div>Hello {this.props.InnerText}</div>;
	constructor( props )
	{
		super( props );
		this.handleClick = this.handleClick.bind( this );
		this.state = {
			items: [],
			inner_text: this.props.InnerText
		};
		return;
	};
	handleClick( ev )
	{	console.debug( "Application::handleClick", ev, this.props, this.state );
		ev.preventDefault();
		return;
	};
	render()
	{	console.debug( "Application::render", this.state, this.props );
		//	return React.createElement( 'div', null, `Hello ${this.props.InnerText}` );
		//  params
		//	1. output html element
		//	2. output html element attributes
		//	3. array of child controls
		return React.createElement(
			 "div",
			 { className: 'MainAppContainer' },
			 React.createElement( RootLink, { InnerText: this.props["RootLink.InnerText"] } ),
			 React.createElement( RootLink, { InnerText: this.props["SearchLink.InnerText"] } ),
			 React.createElement( RootLink, { InnerText: this.props["UserSwitchList"] } ),
			 React.createElement( SearchLink, { InnerText: this.props["SearchLink.InnerText"] } ),
			 React.createElement( UserSwitch, { InnerText: this.props["UserSwitchList"] } ),
			 React.createElement( VerticalNavigation, { InnerText: this.props["VerticalNavigation"] } )
			 );
	};
};