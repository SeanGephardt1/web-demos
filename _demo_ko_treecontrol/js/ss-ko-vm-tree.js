/// <reference path="../script/knockout-3.4.2.js" />
/// "TreeNodeViewModel"
"use strict";
function TreeNodeViewModel( displayText, parentViewModel, childNodes )
{   /* template defaults */
    var _self = this;
    this.ID = ko.pureComputed( function () { return "ss-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable();
    this.ParentViewModel = ko.observable();

    /* demo defaults */
    //this.DisplayText = ko.observable( displayText || "Node [x]");
    //this.TitleText = ko.observable( "title attribute for Node [x]");

    /* tree view collections and parent */
    //this.ParentNode = ko.observable();

    //var _granchild_nodes_111 = [
    //    new NodeViewModel( "Node 1.1.1" ),
    //    new NodeViewModel( "Node 1.2.1" ),
    //    new NodeViewModel( "Node 1.3.1" ),
    //];
    //var _granchild_nodes_211 = [
    //    new NodeViewModel( "Node 1.2.1" ),
    //    new NodeViewModel( "Node 1.2.2" ),
    //    new NodeViewModel( "Node 1.2.3" )
    //];
    //var _granchild_nodes_311 = [
    //    new NodeViewModel( "Node 1.3.1" ),
    //    new NodeViewModel( "Node 1.3.2" ),
    //    new NodeViewModel( "Node 1.3.3" ),
    //];

    //var _child_nodes = [
    //    new NodeViewModel( "Node 1.1", this, _granchild_nodes_111 ),
    //    new NodeViewModel( "Node 1.2", this, _granchild_nodes_211 ),
    //    new NodeViewModel( "Node 1.3", this ),
    //];


    //this.NodesCollection = ko.observableArray( [] );
    //this.HasNodesCollection = ko.observable( false );
    //this.Compute_NodesCollection = ko.computed( function ()
    //{
    //    console.debug( "HasNodesCollection", this.NodesCollection().length );

    //    this.NodesCollection().forEach( function ( v, i, a )
    //    {
    //        console.debug( "Compute_NodesCollection", i, v.NodesCollection().length );
    //        //if ( this.NodesCollection().length > 0 )
    //        //{
    //        //    this.HasNodesCollection( true );
    //        //}
    //        //else if ( this.NodesCollection().length == 0 )
    //        //{
    //        //    this.HasNodesCollection( false );
    //        //}
    //        return;
    //    } );
    //    return;
    //}, this );


    //this.IsNode = ko.observable();
    //this.IsSelected = ko.observable();

    /* icons for checkboxes */
    //this.IconValue = ko.observable();

    ///* check box event handlers */
    //// state value updates the HTML value on the <input> element
    //this.IsChecked = ko.observable( true );
    ////  this.IsChecked.subscribe( function ( newValue ) {   console.log( "this.IsChecked.subscribe", newValue ); return; } );
    //this.IsCheckBoxChecked = ko.observable( true );
    //this.CheckThisItem = function ( vm, jEvent, parentViewModel )
    //{   //      console.log( "1. this.CheckThisItem", this.IsChecked() );	//, this.IsCheckBoxChecked());	//	parentViewModel.constructor.name);
    //    if ( this.IsChecked() == false )
    //    {
    //        this.IsChecked( true );
    //        this.IsCheckBoxChecked( "checked" );
    //    }
    //    else
    //    {
    //        this.IsChecked( false );
    //        this.IsCheckBoxChecked( "unchecked" );
    //    }
    //    //  console.log( "2. this.CheckThisItem", this.IsChecked() );	//, this.IsCheckBoxChecked());	//	parentViewModel.constructor.name);
    //    //  parentViewModel.UpdateSelection( vm );
    //    return true;
    //};
    //this.HandleClickChangeEvent = function ()
    //{	//  needed for handling the event binding of the label/checkbox
    //    //  console.log("this.HandleClickChangeEvent");
    //    return true;
    //};


    //  this will allow the demo to continue, and provides a better explanation in the browser console than a simple KO exception 
    //this.Validate_Input = ko.pureComputed(function ()
    //{
    //    try
    //    {
    //        if ( parentViewModel == undefined )
    //        {
    //            var _e = new Error( "ParentViewModel not assigned to this ChildViewModel" );
    //            this.Error( true );
    //            this.ErrorMessage( _e.message );
    //            throw _e;
    //        } else
    //        {
    //            this.ParentViewModel( parentViewModel );
    //        }
    //    }
    //    catch ( exNoParent )
    //    {
    //        console.error( exNoParent.stack );
    //        //  throw exNoParent;
    //    }
    //},this);
    //  this.Validate_Input();
    return;
};