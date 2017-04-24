/// <reference path="../script/knockout-3.4.2.js" />
/// "NodeViewModel"
"use strict";
function NodeViewModel( displayText, childNodes,  parent_vm  )
{   /* template defaults */
    //  this.HasNodesCollection.subscribe( function ( newValue ) { console.debug("this.HasNodesCollection.subscribe", newValue); return; },this);
    var _self = this;
    this.ID = ko.pureComputed( function () { return "ss-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable();

    /* demo defaults */
    this.DisplayText = ko.observable( displayText || "Node [x]" );
    this.TitleText = ko.observable( "title attribute for Node [x]");
    // node selection 
    //this.IsNode = ko.observable();
    //this.IsSelected = ko.observable();

    /* tree view collections and parent */
    this._node_opened_image = "img/ss-opened.png";
    this._node_closed_image = "img/ss-closed.png";
    this.NodeStateImage = ko.observable( this._node_closed_image );
    this.NodeStateImageDisplayed = ko.observable( false );
    this.HasNodesCollection = ko.observable( false );
    this.ShowNodeCollection = ko.observable( false );

    this.NodesCollectionID = ko.pureComputed( function () { return "ss-nodes-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.NodesCollection = ko.observableArray( childNodes );

    //  this.ParentViewModel = ko.observable();
    //  console.debug( this.ID(), "parent_vm", parent_vm );
    //  this.ParentNode = ko.observable( parent_vm || undefined );
    this.ParentNode = ko.observable();
    //  console.debug( this.ID(), "ParentNode", this.ParentNode() );
    //  console.debug( "this.NodesCollection().forEach" );
    this.NodesCollection().forEach( function ( v, i, a )
    {
        //  console.debug( i, v.constructor.name, _self.constructor.name );
        v.ParentNode( _self );
        //  console.debug( i, v.DisplayText(), v.ParentNode().DisplayText() );
        return;
    } );

    this.Compute_NodesCollection = ko.computed( function ()
    {   //  console.debug( "Compute_NodesCollection", this.NodesCollection().length );
        if ( this.NodesCollection().length > 0 )
        {
            this.HasNodesCollection( true );
            //  this.NodeStateImageDisplayed( true );
        }
        else
        {
            this.HasNodesCollection( false );
            this.NodeStateImageDisplayed( true );
        }
        //  console.debug(" this.HasNodesCollection", this.DisplayText(), this.NodesCollection().length, this.HasNodesCollection());
        return;
    }, this );
    this.ShowHideChildCollection = function ( vm, ev )
    {   //  console.debug( "ShowHideChildCollection", vm.ID(), vm.NodesCollection().length, vm.ShowNodeCollection() );
        if ( vm.NodesCollection().length == 0 )
        {
            vm.ShowNodeCollection( false );
            return;
        }

        if ( vm.ShowNodeCollection() == false )
        {
            vm.ShowNodeCollection( true );
            vm.NodeStateImage( this._node_opened_image );
        }
        else if ( vm.ShowNodeCollection() == true )
        {
            vm.ShowNodeCollection( false );
            vm.NodeStateImage( this._node_closed_image );
        }
        return;
    };

    //  node icon - needs work
    //  http://localhost:30273/../svg/GeoReplicationStandard.svg
    this._random_icon_array = [
        "svg/ADFS.svg",
        "svg/DatabaseCache.svg",
        "svg/DatabaseSQLServer.svg",
        "svg/DirectorySync.svg",
        "svg/GeoReplicationStandard.svg",
        "svg/LocalNetwork.svg",
        "svg/Server.svg",
        "svg/ServerCloud.svg",
        "svg/ServerFarm.svg",
        "svg/ServerProxy.svg",
        "svg/VPNSiteToSite.svg",
    ];
    this.IconValue = ko.observable();
    this.RandomIcon = ko.computed( function ()
    {   //  console.debug( "RandomIcon" );
        var _random = Math.round( Math.random() * this._random_icon_array.length );

        if ( _random == this._random_icon_array.length )
        {
            _random = Math.round( Math.random() * this._random_icon_array.length - 1 );
        }

        if ( _random < 0 )
        {
            _random = 0;
        }

        var _icon = this._random_icon_array[_random];
        this.IconValue( _icon );
        return;
    }, this );

    /* check box event handlers */
    // state value updates the HTML value on the <input> element
    this.ShowCheckBox = ko.observable( true );
    this.CheckBoxId = ko.pureComputed( function () { return "ss-cbx-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );

    this.IsCheckedAttribute = ko.observable( false );
    this.IsChecked = ko.observable( false );
    this.IsChecked.subscribe( function ( newValue )
    {   //  added this check because the UI wasn't updating properly
        //  console.log( "this.IsChecked.subscribe", newValue );
        _self.IsCheckedAttribute( newValue );
        return true;
    } );
    this.HandleClickChangeEvent = function ()
    {	//  HACK - needed for handling the event binding of the label/checkbox
        //  console.log( "this.HandleClickChangeEvent", this.IsChecked() );
        return true;
    };

    this.CheckThisItem = function ( vm, ev )
    {   //  console.log( "1. this.CheckThisItem", this.DisplayText(), this.IsChecked()  );
        if ( this.IsChecked() == false || this.IsChecked() == undefined )
        {
            this.IsChecked( true );
        }
        else
        {
            this.IsChecked( false );
        }

        // check/uncheck children
        if ( this.NodesCollection().length > 0 )
        {   //console.log( "3. this.CheckThisItem", vm.IsChecked(), vm.IsCheckedAttribute(), vm.NodesCollection().length );
            this.SetNodesCollectionCheckedStatus();
        }

        //  check for parentNode() or root node viewModel
        if ( this.ParentNode() !== undefined )
        {
            this.SetParentNodedCheckedStatus();
        }

        return;
    };
    // set this vm.NodesCollection items
    this.SetNodesCollectionCheckedStatus = function ()
    {   //  console.debug( "SetNodesCollectionCheckedStatus::checkFlag", _self.IsChecked() );
        this.NodesCollection().forEach( function ( v, i, a )
        {   //  console.debug( "this.NodesCollection().forEach:", i, v.DisplayText(), v.IsChecked(), _self.IsChecked() );
            if ( v.IsChecked() !== _self.IsChecked() )
            {
                v.IsChecked( _self.IsChecked() );
            }

            if ( v.NodesCollection().length > 0 )
            {   //  console.debug( i, v.NodesCollection().length );
                v.SetNodesCollectionCheckedStatus( );
            }
            return;
        } );
        return;
    };
    this.SetParentNodedCheckedStatus = function ()
    {
        //  console.debug( "this.SetParentNodedCheckedStatus", this.ParentNode().DisplayText(), this.ParentNode().IsChecked(), this.IsChecked() );

        var _temp_flag = false;
        this.ParentNode().NodesCollection().forEach( function ( v, i, a )
        {   //, _self.DisplayText(), _self.IsChecked() 
            //  console.debug( "parentViewModel.NodesCollection", i, _temp_flag, v.DisplayText(),  v.IsChecked());
            if ( v.IsChecked() == true )
            {
                _temp_flag = true;
            }
            return;
        } );
        this.ParentNode().IsChecked( _temp_flag );

        //  console.debug( "this.SetParentNodedCheckedStatus", this.ParentNode().DisplayText(), this.ParentNode().IsChecked(), this.IsChecked() );

        //  console.debug( "this.ParentNode().ParentNode()", this.ParentNode().ParentNode() );
        if ( this.ParentNode().ParentNode() !== undefined )
        {
            this.ParentNode().SetParentNodedCheckedStatus();
        }

        return;
    };
    return;
};