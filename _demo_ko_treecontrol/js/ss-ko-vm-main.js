/// <reference path="knockout-3.4.2.js" />
/// "ScopeSelectorViewModel" ViewModel V.1.0.0
"use strict";

function ScopeSelectorViewModel(demoName, debugFlag, featureFlag) {
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.Error = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    // ko.observableArray collection of viewmodels for html templates
    // get test data into this collection
    var _debug_nodes_1 = [
        new NodeViewModel( "Node C-A" ),
        new NodeViewModel( "Node D"),
        new NodeViewModel( "Node E"),
        new NodeViewModel( "Node F")
    ];
    var _debug_nodes_2 = [
        new NodeViewModel( "Node G"),
        new NodeViewModel( "Node H"),
        new NodeViewModel( "Node I")
    ];

    var _debug_nodes = [
        new NodeViewModel( "Node A", _debug_nodes_1),
        new NodeViewModel( "Node B", _debug_nodes_2 ),
        new NodeViewModel( "Node C")
    ];

    var _granchild_nodes_111 = [
        new NodeViewModel( "Node 1.1.1", _debug_nodes ),
        new NodeViewModel( "Node 1.1.2"),
        new NodeViewModel( "Node 1.1.3"),
    ];
    var _granchild_nodes_211 = [
        new NodeViewModel( "Node 2.1.1" ),
        new NodeViewModel( "Node 2.1.2" ),
        new NodeViewModel( "Node 2.1.3" ),
    ];
    var _granchild_nodes_311 = [
        new NodeViewModel( "Node 3.1.1" ),
        new NodeViewModel( "Node 3.1.2" ),
        new NodeViewModel( "Node 3.1.3" ),
    ];

    var _child_nodes_11 = [
        new NodeViewModel( "Node 1.0", _granchild_nodes_111),
        new NodeViewModel( "Node 1.1"),
        new NodeViewModel( "Node 1.2"),
        new NodeViewModel( "Node 1.3"),
    ];
    var _child_nodes_21 = [
        new NodeViewModel( "Node 2.0", _granchild_nodes_211 ),
        new NodeViewModel( "Node 2.1" ),
        new NodeViewModel( "Node 2.2" ),
        new NodeViewModel( "Node 2.3" )
    ];
    var _child_nodes_31 = [
        new NodeViewModel( "Node 3.1", _granchild_nodes_311 ),
        new NodeViewModel( "Node 3.2" ),
        new NodeViewModel( "Node 3.3" ),
    ];

    this.DefaultNodeCollection = ko.observableArray( [
        new NodeViewModel( "Node 1", _child_nodes_11),
        new NodeViewModel( "Sean's Node", _child_nodes_21),
        new NodeViewModel( "Node 3", _child_nodes_31),
        new NodeViewModel( "Node 4"),
    ] );

    /* search fltering */
    this.SearchedNodeCollection = ko.observableArray( [] );
    this.SearchBoxValue = ko.observable();
    this.SearchBoxValue.subscribe( function ( value )
    {   //  console.debug("this.SearchBoxValue.subscribe", value);
        return;
    }, this );
    this.SortNodesCollection = function ( vm, ev )
    {
        console.debug( "this.SortNodesCollection", vm.ID(), ev.type );
        return true;
    };

    // counting selected
    this.SelectedNodesCount = ko.observable( 0 );
    this.SelectedNodesCountText = ko.observable( "" );
    this.Compute_SelectedNodesCountText = ko.computed( function ()
    {   //  console.debug( "this.Compute_SelectedNodesCountText" );
        var _item = "item";
        var _selected = "selected";
        var _number_text = "";

        switch ( this.SelectedNodesCount() )
        {
            case 0: { _number_text = "No"; break; }
            case 1: { _number_text = "One"; break; }
            case 2: { _number_text = "Two"; break; }
            case 3: { _number_text = "Three"; break; }
            case 4: { _number_text = "Four"; break; }
            case 5: { _number_text = "Five"; break; }
            case 6: { _number_text = "Six"; break; }
            case 7: { _number_text = "Seven"; break; }
            case 8: { _number_text = "Eight"; break; }
            case 9: { _number_text = "Nine"; break; }
            default: { _number_text = this.SelectedNodesCount(); break; }
        }

        if ( this.SelectedNodesCount() > 1 )
        {
            _item = _item + "s";
        }

        this.SelectedNodesCountText( _number_text + " " + _item + " " + _selected );
        return;
    }, this );

    this._temp_count = 0;
    this.CountCheckedNodes = function ( nodeCollection )
    {   //  console.debug( "_self._temp_count", _self._temp_count );
        nodeCollection.forEach( function ( v, i, a )
        {
            if ( v.IsChecked() == true )
            {   //  console.debug( i, v.DisplayText(), v.IsChecked() );
                _self._temp_count++;
            }

            if ( v.NodesCollection().length > 0 )
            {
                _self.CountCheckedNodes( v.NodesCollection() );
            }
            return;
        } );

        return;
    };
    this.Compute_SelectedNodes = ko.computed( function ()
    {   //  console.debug( "this.Compute_SelectedNodes()" );
        this.CountCheckedNodes( this.DefaultNodeCollection() );

        //  console.debug( "_self._temp_count", _self._temp_count );
        _self.SelectedNodesCount( _self._temp_count );
        _self._temp_count = 0;
        return;
    }, this );




    // Buttons handlers
    this.Click_SaveButton = function ( vm, ev )
    {
        console.debug( "this.Click_SaveButton" );
        return;
    };
    this.Click_CancelButton = function ( vm, ev )
    {
        console.debug( "this.Click_CancelButton" );
        return;
    };


    // opens first node, for three levels
    this.ExpandFirstNode = function ()
    {   //  console.debug( "this.ExpandFirstNode::MAY NOT BE NEEDED" );        
        this.DefaultNodeCollection()[0].ShowHideChildCollection( this.DefaultNodeCollection()[0] );
        //  this.DefaultNodeCollection()[0].IsChecked( true );

        this.DefaultNodeCollection()[0].NodesCollection()[0].ShowHideChildCollection( this.DefaultNodeCollection()[0].NodesCollection()[0] );
        //  this.DefaultNodeCollection()[0].NodesCollection()[0].IsChecked( true );

        this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].ShowHideChildCollection( this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0] );
        //  this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].IsChecked( true );

        this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].NodesCollection()[0].ShowHideChildCollection( this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].NodesCollection()[0] );
        //  this.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].NodesCollection()[0].IsChecked( true );

        //window.setTimeout( function ()
        //{
        //    _self.DefaultNodeCollection()[0].NodesCollection()[0].NodesCollection()[0].NodesCollection()[0].IsChecked( false );
        //    return
        //}, 3000 );

        return;
    };
    //  this.ExpandFirstNode();

    //  Handle All Clicks on the body element, return false. <body data-bind="event: { click: CloseAll }, clickBubble: false">
    this.CloseAll = function ( viewModel, event )
    {
        if ( this.DEBUGFLAG() == true )
        {
            console.debug("this.CloseAll", viewModel, event);
        }
        var _rv_false = false;
        // handle objects like popups, drop down menus and other UI events
        return _rv_false;
    };
    return;
};