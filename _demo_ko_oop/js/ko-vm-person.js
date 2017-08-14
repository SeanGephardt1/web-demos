/// <reference path="../script/knockout-3.4.2.js" />
/// "PersonViewModel" base
///  All "person" viewmodel types
"use strict";
function Person_ViewModel( rootViewModel, extendedType, options )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "pid-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Name = ko.observable( options.name );
    this.ParentViewModel = ko.observable( rootViewModel );
    this.ExtendedType = extendedType;

	// events - this.constructor.name 
    this.OnClick_ShowAction = function ( vm, ev )
    {   //	this.constructor.name;
    	//	console.debug( "Person_ViewModel.OnClick_ShowAction", this.constructor.name );
        return;
    };

	//	http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    this.ComputeProperties = ko.computed( function ()
    {
    	console.debug( "Person_ViewModel.ExtendedType.Properties", this.ExtendedType.constructor.name );
    	for ( var property in this.ExtendedType )
    	{
    		console.debug( "property::", typeof property, '\'' +  property + "\'==", this.ExtendedType[property]() );

    		//	console.debug( "1. this.hasOwnProperty", this.hasOwnProperty( property ) , "this.ExtendedType.hasOwnProperty", this.ExtendedType.hasOwnProperty( property ) );
			// adding extended property to parent view model
    		if ( this.hasOwnProperty( property ) == false && this.ExtendedType.hasOwnProperty( property ) == true )
    		{
    			this[property] = this.ExtendedType[property];
    		}
    		//	console.debug( "2. this.hasOwnProperty", this.hasOwnProperty( property ) , "this.ExtendedType.hasOwnProperty", this.ExtendedType.hasOwnProperty( property ) );

    		//console.debug( "1. isPrototypeOf", this.ExtendedType.isPrototypeOf( Person_ViewModel ) );
    		//console.debug( "1. isPrototypeOf", this.ExtendedType.isPrototypeOf( "Person_ViewModel" ) );
    		//console.debug( "1. isPrototypeOf", this.ExtendedType.isPrototypeOf( this ) );

    		//	console.debug( "isInstanceOf", this.ExtendedType instanceof Person_ViewModel );

    		//console.debug( "this.ExtendedType.propertyIsEnumerable", this.ExtendedType.propertyIsEnumerable( property ) );
    		//	console.debug( "propertyIsEnumerable", this.ExtendedType[property].propertyIsEnumerable( property ) );

    		//console.debug( "valueOf", this.ExtendedType[property]() );
    		//console.debug( "valueOf", this.ExtendedType[property]().valueOf() );

			// KO checks
    		//	console.debug( "ko.isComputed( property )", ko.isComputed( property ) );
    		//console.debug( "ko.isComputed( this[property]  )", ko.isComputed( this[property] ) );
    		//console.debug( "ko.isComputed( this.ExtendedType[property] )", ko.isComputed( this.ExtendedType[property] ) );

    		//	console.debug( "ko.isPureComputed( property )", ko.isPureComputed( property ) );
    		//console.debug( "ko.isPureComputed( this[property]  )", ko.isPureComputed( this[property] ) );
    		//console.debug( "ko.isPureComputed( this.ExtendedType[property] )", ko.isPureComputed( this.ExtendedType[property] ) );

    		//	console.debug( "ko.isObservable( property )", ko.isObservable( property ) );this.ExtendedType
    		//console.debug( "ko.isObservable( this[property]  )", ko.isObservable( this[property] ) );
    		//console.debug( "ko.isObservable( this.ExtendedType[property] )", ko.isObservable( this.ExtendedType[property] ) );

    		//	console.debug( "ko.isSubscribable( property )", ko.isSubscribable( property ) );
    		//console.debug( "ko.isSubscribable( this[property]  )", ko.isSubscribable( this[property] ) );
    		//console.debug( "ko.isSubscribable( this.ExtendedType[property] )", ko.isSubscribable( this.ExtendedType[property] ) );

    		//	console.debug( "ko.isWritableObservable( property )", ko.isWritableObservable( property ) );
    		//console.debug( "ko.isWritableObservable( this[property]  )", ko.isWritableObservable( this[property] ) );
    		//console.debug( "ko.isWritableObservable(  this.ExtendedType[property] )", ko.isWritableObservable( this.ExtendedType[property] ) );

    		//	console.debug( "ko.isWriteableObservable( property )", ko.isWriteableObservable( property ) );
    		//console.debug( "ko.isWriteableObservable( this[property]  )", ko.isWriteableObservable( this[property] ) );
    		//console.debug( "ko.isWriteableObservable(  this.ExtendedType[property] )", ko.isWriteableObservable( this.ExtendedType[property] ) );

    		//console.debug( "ko.isPrototypeOf( property )", ko.isPrototypeOf( property ) );
    		//console.debug( "ko.isPrototypeOf( this.ExtendedType[property] )", ko.isPrototypeOf( this.ExtendedType[property] ) );

    		//console.debug( "ko.propertyIsEnumerable( property )", ko.propertyIsEnumerable( property ) );
    		//console.debug( "ko.propertyIsEnumerable( this.ExtendedType[property] )", ko.propertyIsEnumerable( this.ExtendedType[property] ) );


			// ADD ALL INHERITED PROPERTIES TO ROOT
			// ENUMERATE FOR EDITING SURFACE
    	}

    	//	ko.utils.objectForEach();

    	return;
    }, this );

    return;
};

/// "GrandParent_ViewModel"
function GrandParent_ViewModel( rootViewModel, options )
{
	this.IsGrandParent = ko.observable( true );
	ko.utils.extend( this, new Person_ViewModel( rootViewModel, this, options ) );
    return;
};

/// "Parent_ViewModel"
function Parent_ViewModel( rootViewModel, options )
{
	this.IsParent = ko.observable( true );
	ko.utils.extend( this, new Person_ViewModel( rootViewModel, this, options ) );
    return;
};

/// "Child_ViewModel"
function Child_ViewModel( rootViewModel, options )
{
	this.IsChild = ko.observable( true );
	ko.utils.extend( this, new Person_ViewModel( rootViewModel, this, options ) );
	return;
};

/// "GrandChild_ViewModel"
function GrandChild_ViewModel( rootViewModel, options )
{
	this.IsGrandChild = ko.observable( true );
	ko.utils.extend( this, new Person_ViewModel( rootViewModel, this, options ) );
	return;
};

/// "GreatGrandChild_ViewModel"
function GreatGrandChild_ViewModel( rootViewModel, options )
{
	this.IsGreatGrandChild = ko.observable( true );
	ko.utils.extend( this, new Person_ViewModel( rootViewModel, this, options ) );
	return;
};