/// <reference path="../script/react/react-15.6.1.js" />
/// <reference path="../script/react/react-dom-15.6.1.js" />
"use strict";

// simple control template - flesh out all functions, mehtods, events
class RootLink extends React.Component
{
	render()
	{	console.debug( "RootLink", this.props );
		//	alternation syntax for data-binding
		//	return React.createElement( 'div', { className: 'SearchPanel' }, `Search: ${this.props.InnerText}` );
		return React.createElement( 'div', { className: 'RootLinkCss', id: 'Azure-App-Panel'}, this.props.InnerText );
	};
};

// simple control
class SearchLink extends React.Component
{
	render()
	{	console.debug( "SearchLink", this.props );
		return React.createElement( 'div', { className: 'SearchPanel' }, `Search: ${this.props.InnerText}` );
	};
};

class UserSwitch extends React.Component
{
	render()
	{
		console.debug( "UserSwitch", this.props );
		return React.createElement( 'div', { className: 'UserSwitchPanel' }, `Users: ${this.props.InnerText}` );
	};
};

class VerticalNavigation extends React.Component
{
	render()
	{
		console.debug( "VerticalNavigation", this.props );
		return React.createElement( 'div', { className: 'VerticalNavigationPanel' }, `Users: ${this.props.InnerText}` );
	};
};


//	main application - 
//	try breaking down to seperate control files
//	and managing state for walk-throughs & editing
class Application extends React.Component
{
	//	JSX need to be compiled
	//	return <div>Hello {this.props.InnerText}</div>;
	render()
	{
		//	simple default
		//	return React.createElement( 'div', null, `Hello ${this.props.InnerText}` );

		console.debug("top level react.js object - 'Application' ", this.props);
		//  params
		//	1. output html element
		//	2. css style or lement className or ??
		//	3. array of child controls
		return React.createElement(
			 "div",
			 { className: 'MainAppContainer' },
			 //	React.createElement( SearchLink, { InnerText: this.props.products } ),
			 React.createElement( RootLink, { InnerText: this.props["RootLink.InnerText"] } ),
			 React.createElement( SearchLink, { InnerText: this.props["SearchLink.InnerText"] } ),
			 React.createElement( UserSwitch, { InnerText: this.props["UserSwitchList"] } ),
			 React.createElement( VerticalNavigation, { InnerText: this.props["VerticalNavigation"] } )
			 );
	};
};