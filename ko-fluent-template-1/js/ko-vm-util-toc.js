/// <reference path="../script/knockout-3.4.2.js" />
/// "TocNode_ViewModel" ViewModel V.1.0.0
"use strict";
function TocGroup_ViewModel(title, nodes, titleDisplayed)
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);

    /* Easy TocNodeGroup & TocNode ViewModels */
    this.Title = ko.observable( title || "Toc Group Title" );
    this.AttributeTitle = ko.observable( title || "Toc Group Title" );
    this.TocGroupNodes = ko.observableArray( nodes );

    this.IsTitleDisplayed = ko.observable( titleDisplayed );

    return;
};
function TocNode_ViewModel(rootVM,  title, icon, TocUrls, isSelected, bladeVM )
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "toc-id-" + Math.random().toPrecision(5).replace(".", ""); }, this);

    /* Easy TocNodeGroup & TocNode ViewModels */
    this.Title = ko.observable( title || "Toc Group Title" );
    this.AttributeTitle = ko.observable( title || "Toc Group Title" );

    this.TocIcon = ko.observable(SVG.Color.VirtualMachines.SVG);
    this.TocIconAltText = ko.observable(SVG.Color.VirtualMachines.Name);

    //validating 
    if (icon !== undefined) {
        this.TocIcon(icon.SVG);
        this.TocIconAltText(icon.Name);
    }

	this.IconIsDisplayed = ko.observable( true );
    this.IsDisplayed = ko.observable( true );
    this.IsSelected = ko.observable( isSelected || false );
    this.RootViewModel = rootVM;

	this.BladeViewModel = ko.observable( bladeVM || new ExtensionChild_ViewModel( rootVM, this.Title() ) );
    this.TocPage_Images = ko.observableArray( TocUrls );

    function HotSpot_ViewModel( json )
    {
        var _self = this;
        this.ID = ko.pureComputed( function () { return "hs-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );

        this.Top = ko.observable();
        this.Left = ko.observable();
        this.Height = ko.observable();
        this.Width = ko.observable();
        this.Step = ko.observable();

        this.Check_Values = function ( value )
        {
            var _temp;
            if ( value == undefined || parseInt( value ) == 'NaN' )
            {   //  console.debug( "NO TOP VALUE" );
                _temp = "10px";
            }
            else
            {
                _temp = value + "px";
            }
            return _temp;
        };
        this.Compute_Values = ko.computed( function ()
        {
            this.Top( this.Check_Values( json.top ) );
            this.Left( this.Check_Values( json.left ) );
            this.Height( this.Check_Values( json.height ) );
            this.Width( this.Check_Values( json.width ) );
            this.Step( json.step );
        }, this );

        return;
    };
    function Page_ViewModel( json )
    {
        var _self = this;
        _self.js = json;
        //	console.debug( "Page_ViewModel", _self.js );

        this.ID = ko.pureComputed( function () { return "page-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );

        this.Title = ko.observable();
        this.ImageSource = ko.observable();
        this.HotSpots = ko.observableArray();
        this.IsVisible = ko.observable(false);

        this.Default_Image = ko.observable( true );
        this.ShowCommandBar = ko.observable( true );
        this.CustomBackground = ko.observable();

        this.Compute_Json = ko.computed( function ()
        {   //  console.debug( "Compute_Json", _self.js );
            this.Title( _self.js.title );
            this.ImageSource( _self.js.img );

            if ( _self.js.ShowCommandBar !== undefined )
            {
            	//	console.debug( " _self.js.ShowCommandBar", _self.js.ShowCommandBar );
            	this.ShowCommandBar( _self.js.ShowCommandBar );
            }

            if ( _self.js.CustomBackground !== undefined )
            {
            	//	console.debug( " _self.js.CustomBackground", _self.js.CustomBackground );
            	this.CustomBackground( _self.js.CustomBackground );
            }

            _self.js.hotspots.forEach( function ( v2, i1, a2 )
            {   //  console.debug( i1, "hotspots", v2 );
                var _hs = new HotSpot_ViewModel( v2 );
                _self.HotSpots().push( _hs );
                return;
            } );

            return;
        }, this );

        return;
	};

    this.Pages = ko.observableArray( [] );

    this.IsTocPage = ko.computed( function ()
    {   //  console.debug( "IsTocPage", this.Title(), this.TocPage_Images(), this.BladeViewModel() );
        var _bool_rv = false;

        if ( this.TocPage_Images().length >= 0 )
        {
            _bool_rv = true;
        }
        else
        {
            _bool_rv = false;
        }

        if ( this.BladeViewModel() !== undefined )
        {
            _bool_rv = false;
        }

        this.TocPage_Images().forEach( function ( v, i, a )
        {
            //  console.debug( i, "Compute_TocPages", v );
            v["title"] = _self.Title();
            var _page = new Page_ViewModel( v );
            _page.Default_Image( false );

            if ( i == 0 )
            {
                _page.IsVisible( true );
            }
            _self.Pages().push( _page );
            return;
        } );

        if ( this.TocPage_Images().length == 0 )
        {
            var _page = new Page_ViewModel( { img: "screenshots/0_default_no_content/Slide1.png" , hotspots:[]} );
            _page.IsVisible( true );
            _page.Default_Image( true );
            _page.Title(_self.Title());
            _self.Pages().push( _page );
        }

        //  console.debug( "this.Pages()", this.Pages() );
        return _bool_rv;
    }, this );

    // somehow check if it is a screengrab and set hot spots
    this.OnClick_TocDelegate = function ( vm, ev )
	{   //  console.debug( "OnClick_SelectThisNode", vm );
        this.RootViewModel.ResetTocNodeCollection( vm, ev );        
        //	this.RootViewModel.ResetTocNodeCollection( vm, ev );        
        return;
	};

    return;
};