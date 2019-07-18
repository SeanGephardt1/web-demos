/// <reference path="../script/knockout-3.5.0.js" />
///  this.OnEventHandler = function ( vm, ev ) { console.debug("this.OnEventHandler"); return; };
"use strict";
function MarketPlaceFilterView_ViewModel( parentViewModel )
{
	ko.utils.extend( this, new Extension_ViewModel( parentViewModel ) );
	const _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

	this.BladeIcon( SVG.Test.marketplace_test.SVG);
	this.NavIcon( SVG.Color.NewPlusSign.SVG  );
	this.ExtensionTemplateName( "ko-new-marketplace-filter-template" );
	this.BladeName("Marketplace");
	this.ExtensionName( "Create" );
	this.BladeSubName( "" );

	this._crumbs = [
		"Home",
		this.BladeName(),
	];
	this.BreadCrumbs( this._crumbs );

	// TOC STUFF
	this.All_ChildExtension = new AllMarketplace_ChildExtension_ViewModel( this );
	this.CurrentChildExtension = ko.observable( );

	this.TocGroup_1 = ko.observableArray( [
		new TocNode_ViewModel( this, "My saved list" ),
		new TocNode_ViewModel( this, "Recently created" ),
		new TocNode_ViewModel( this, "Private offers" ),
	] );
	this.TocGroup_2 = ko.observableArray( [
		new TocNode_ViewModel( this, "All", undefined, undefined, true, this.All_ChildExtension ),
		new TocNode_ViewModel( this, "Compute"),
		new TocNode_ViewModel( this, "Networking"),
		new TocNode_ViewModel( this, "Storage"),
		new TocNode_ViewModel( this, "Web"),
		new TocNode_ViewModel( this, "Mobile"),
		new TocNode_ViewModel( this, "Containers"),
		new TocNode_ViewModel( this, "Databases"),
		new TocNode_ViewModel( this, "Analytics" ),
		new TocNode_ViewModel( this, "AI + Machine learning" ),
		new TocNode_ViewModel( this, "Internet of Things (IoT)" ),
		new TocNode_ViewModel( this, "Mixed reality" ),
		new TocNode_ViewModel( this, "Intergation" ),
		new TocNode_ViewModel( this, "Security" ),
		new TocNode_ViewModel( this, "Identity" ),
		new TocNode_ViewModel( this, "Developer tools" ),
		new TocNode_ViewModel( this, "Management tools" ),
		new TocNode_ViewModel( this, "Software as a service (SaaS)" ),
		new TocNode_ViewModel( this, "Blockchain" ),
	] );
	this.TocGroupCollection = ko.observableArray( [
		new TocGroup_ViewModel( "My Marketplace", this.TocGroup_1(), true ),
		new TocGroup_ViewModel( "Categories", this.TocGroup_2(), true ),
	] );

	// HACK TO USED THE TOC VIEWMODELS, BUT HIDE THE ICONS
	this.ResetTocNodeIcons = function ( ) 
	{   //  console.debug( "ClearTocNodeCollection" );
		this.TocGroupCollection().forEach( function ( v, i, a )
		{
			v.TocGroupNodes().forEach( function ( v2, i2, a2 )
			{   // console.debug( v2.Title(), v2.IconIsDisplayed() );
				v2.IconIsDisplayed( false );
				return;
			} );
			return;
		} );
		return;
	};
	this.ResetTocNodeCollection = function ( vm, ev ) 
	{   //  console.debug( "ClearTocNodeCollection" );
		this.TocGroupCollection().forEach( function ( v, i, a )
		{
			v.TocGroupNodes().forEach( function ( v2, i2, a2 )
			{   //  console.debug( v2.Title(), v2.IsSelected() );
				v2.IsSelected( false );
				return;
			} );
			return;
		} );
		//	console.debug( vm.Title(), vm.IsSelected(), vm.TocIcon() );

		if ( vm.IsSelected() == false ) 
		{
			vm.IsSelected( true );
			//	console.debug( "vm.BladeViewModel()", vm.BladeViewModel() );

			if ( vm.BladeViewModel() !== undefined )
			{
				this.CurrentChildExtension( vm.BladeViewModel() );

				let _temp_crumbs = this.BreadCrumbs();
				_temp_crumbs[2] = vm.BladeViewModel().BladeName();
				this.BreadCrumbs( _temp_crumbs );

				this.BladeName( this.CurrentChildExtension().Title() );
			}
			else if ( vm.BladeViewModel() == undefined )
			{
				this.CurrentChildExtension( this.Default_ChildExtension );

				let _temp_crumbs = this.BreadCrumbs();
				_temp_crumbs[2] = vm.Title();
				this.BreadCrumbs( _temp_crumbs );

				//	this.BladeIcon( vm.TocIcon() );
				this.BladeName( vm.Title() );
			}
		}
		return;
	};

	this.CloseAllFilterDropdowns = function (vm)
	{
		if ( this.CurrentChildExtension().PillsCollection !== undefined )
		{
			this.CurrentChildExtension().PillsCollection().forEach( function ( v, i, a )
			{
				if ( v !== vm )
				{
					v.CloseAllDropDowns();
				}
			} );
		}

		////	console.debug( "close pills" );
		//this.GlobalPillsFilters().forEach( function ( v, i, a )
		//{	//	console.debug( "close pills\t", i, v.SelectedKey() );
		//	v.KeyListOpen( false );
		//	v.OperatorListOpen( false );
		//	v.ValuesListOpen( false );
		//	return;
		//} );

		return;
	};

	// details page stuff
	this.DetailsPageDisplayed = ko.observable( false );
	this.CreateButtonMenuDisplayed = ko.observable( false );
	this.SelectedDetailsPage = ko.observable( new MarketplaceResult_ViewModel( _self, { "displayName": "OnCommand Cloud Manager for Cloud Volumes ONTAP", "publisher": "NetApp", "summary": "Streamline the deployment and management of Cloud Volumes ONTAP", "icon": "/mp-images/d244e4d5-3587-43ca-b800-209cdd81089a.jpg", "badge": false, "rating": 2.47, "ratingCount": 771 } ) );

	this.OnClick_CloseThisDetailsBlade = function ( vm, ev )
	{	//	console.debug( "OnClick_CloseThisDetailsBlade " );
		_self.DetailsPageDisplayed( false );
		return;
	};
	this.OnClick_HideShow_CreateBtnMenu = function ( vm, ev )
	{	//	console.debug( "OnClick_HideShow_CreateBtnMenu " );
		if ( _self.CreateButtonMenuDisplayed() === false )
		{
			_self.CreateButtonMenuDisplayed( true );
		}
		else if ( _self.CreateButtonMenuDisplayed() === true )
		{
			_self.CreateButtonMenuDisplayed( false );
		}
		return;
	};
	this.OnClick_CloseCreateBtnMenu = function ( vm, ev )
	{	//console.debug( "OnClick_HideShow_CreateBtnMenu " );
		_self.CreateButtonMenuDisplayed( false );
		return;
	};
	this.OnClick_CreateWithoutSmartDefaults = function ( vm, ev )
	{	//	console.debug( "OnClick_CreateWithoutSmartDefaults " );
		_self.CreateButtonMenuDisplayed( false );

		let _smart_defaults_view_model = new SmartDefaults_CreateFlow_VMS_ViewModel( _self.ParentViewModel(),"Create VMS", false);
		_smart_defaults_view_model.ClickedFrom( "marketplace-no-smart-defs" );

		_self.ParentViewModel().CurrentExtensionViewModel( _smart_defaults_view_model );
		return;
	};
	this.OnClick_CreateWithSmartDefaults = function ( vm, ev )
	{	//	console.debug( "OnClick_CreateWithSmartDefaults " );
		_self.CreateButtonMenuDisplayed( false );

		let _smart_defaults_view_model = new SmartDefaults_CreateFlow_VMS_ViewModel( _self.ParentViewModel(), "Smart Defaults", true );
		_smart_defaults_view_model.ClickedFrom( "marketplace-smart-defs" );

		_self.ParentViewModel().CurrentExtensionViewModel( _smart_defaults_view_model );
		return;
	};
	this.OnClick_CreateWithProg = function ( vm, ev )
	{	//	console.debug( "OnClick_CreateWithoutSmartDefaults " );
		_self.CreateButtonMenuDisplayed( false );
	//	_self.DetailsPageDisplayed( false );
	//	_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[1] );
		return;
	};


	// DEFAULT INITS
	this.ResetTocNodeIcons();
	this.ResetTocNodeCollection( this.TocGroup_2()[0] );
    return;
};

function AllMarketplace_ChildExtension_ViewModel( parentViewModel )
{
	ko.utils.extend( this, new ExtensionChild_ViewModel( parentViewModel, "All" ) );
	const _self = this;

	this.ExtensionName( "All" );
	this.BladeName( "All" );
	this.TemplateName( "ko-mp-all-filter-child-ext-template" );

	this._data = _market_place_data_scrubbed;

	// SUB-SECTIONS STUFF
	this.Data_Temp = ko.observableArray( [] );
	this.DataGroups = ko.observableArray( [] );	
	this.Set_Defaults_DataGroups = function ()
	{
		_self.Data_Temp( [] );
		let _whats_new = new ResultGroup_ViewModel();
		_whats_new.Title( "What's new" );

		let _web_apps = new ResultGroup_ViewModel();
		_web_apps.Title( "Web apps" );

		let _dev_apps = new ResultGroup_ViewModel();
		_dev_apps.Title( "Dev + test" );

		let _monitor_apps = new ResultGroup_ViewModel();
		_monitor_apps.Title( "Monitoring + management" );

		this._data.forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			let _new = new MarketplaceResult_ViewModel( parentViewModel, v );
			_self.Data_Temp().push( _new );

			if ( i < 124 )
			{
				_whats_new.Data().push( _new );
			}
			if ( i > 123 && i < 250 )
			{
				_web_apps.Data().push( _new );
			}
			if ( i > 249 && i < 375 )
			{
				_dev_apps.Data().push( _new );
			}
			if ( i > 374 )
			{
				_monitor_apps.Data().push( _new );
			}

			return;
		} );

		this.DataGroups( [
			_whats_new, _web_apps, _dev_apps, _monitor_apps
		] );
		return;
	};

	// PILL FILTERS STUFF
	this.PillsCollection = ko.observableArray( [] );

	this.GetPublishersList = function ()
	{
		let _pubs_set = new Set();
		let _pubs_array = [];

		this._data.forEach( function ( v, i, a )
		{	//	console.debug( "item", v.publisher );
			_pubs_set.add( v.publisher );
			return;
		} );

		let _select_all = new FilterData_ViewModel();
		_select_all.Title( "Select All" );
		_select_all.IsChecked( true );
		_select_all.IsSelectAll( true );
		_pubs_array.push( _select_all );

		for ( let entry of _pubs_set.entries() )
		{	//	console.log( entry[0] );
			let _new_filter_data_vm = new FilterData_ViewModel( entry[0] );
			_new_filter_data_vm.IsChecked( true );
			_pubs_array.push( _new_filter_data_vm );
		}
		return _pubs_array;
	};
	this.SetPillsDefault = function ()
	{	//	.debug( "SetPillsDefault" );
		let _default_pills = [];

		// search pill
		let _search_pill = new Pill_ViewModel( _self, MarketPlaceAll_PillsData );
		_search_pill.CloseAllDropDowns();
		_search_pill.IsSearchPill( true );
		_search_pill.SearchPlaceholderText( "Search the Marketplace" );
		_default_pills.push( _search_pill );

		// Pricing pill pill
		let _subs_pill = new Pill_ViewModel( _self, MarketPlaceAll_PillsData );
		_subs_pill.IsVisible( true );
		_subs_pill.IsRemovable( false );
		_subs_pill.IsTagsPill( false );
		_subs_pill.HasOperators( true );
		_subs_pill.OnClick_SelectKey( _subs_pill.KeyData()[0], null );
		_subs_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			//	console.debug( "browse subs", i, v.Title(), v.IsChecked() );
			v.IsChecked( true );
		} );
		_subs_pill.CloseAllDropDowns();
		_default_pills.push( _subs_pill );

		// OS pill
		let _os_pill = new Pill_ViewModel( _self, MarketPlaceAll_PillsData );
		_os_pill.IsVisible( true );
		_os_pill.IsRemovable( false );
		_os_pill.HasOperators( false );
		_os_pill.OnClick_SelectKey( _os_pill.KeyData()[1], null );
		_os_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			//	console.debug( "browse subs", i, v.Title(), v.IsChecked() );
			v.IsChecked( true );
		} );
		_os_pill.CloseAllDropDowns();
		_default_pills.push( _os_pill );

		// Publisher pill
		let _pubs_list = this.GetPublishersList();

		let _pubs_pill = new Pill_ViewModel( _self, MarketPlaceAll_PillsData );
		_pubs_pill.IsVisible( true );
		_pubs_pill.IsRemovable( false );
		_pubs_pill.HasOperators( false );
		_pubs_pill.OnClick_SelectKey( _pubs_pill.KeyData()[2], null );
		_pubs_pill.KeyValueData( _pubs_list );
		_pubs_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "browse subs", i, v.Title(), v.IsChecked() );
			v.IsChecked( true );
		} );
		_pubs_pill.CloseAllDropDowns();
		_default_pills.push( _pubs_pill );


		this.PillsCollection( _default_pills );
		this.PillsCollection()[_self.PillsCollection().length - 1].CloseAllDropDowns();

		return;
	};
	this.Close_AllPillDropDowns = function ( vm, ev )
	{
		this.PillsCollection().forEach( function ( v, i, a )
		{
			if ( v !== vm )
			{
				v.CloseAllDropDowns();
			}
		} );
		return;
	};

	// MAIN FILTERING FUNCTION
	// special for this collection of pill filters
	this.HasSearchResults = ko.observable( false );
	this.ListCardToggle = ko.observable( SVG.Test.list_card_toggle.SVG );

	this.SearchBoxValue = ko.observable( "" );
	this.SearchBoxValue.subscribe( function ( newValue )
	{	//	console.debug( "FilterSearchBox", newValue );
		_self.Compute_GlobalFilter_Data_Lists();
		return;
	}, this );
	this.FilterSearchBox = function ( strValue, dataSet )
	{	//	console.debug( "FilterSearchBox", strValue, dataSet.length );
		let _set = dataSet.filter( function ( item )
		{	//	console.debug( "item", item );
			//console.debug( "Name()", item.Name() );
			//console.debug( "Publisher()", item.Publisher() );
			//console.debug( "Summary()", item.Summary() );

			let _found = false;

			if ( item.Name().toLowerCase().includes( strValue.toLowerCase() ) == true )
			{
				_found = true;
			}
			if ( item.Publisher().toLowerCase().includes( strValue.toLowerCase() ) == true )
			{
				_found = true;
			}
			if ( item.Summary() !== undefined )
			{
				if ( item.Summary().toLowerCase().includes( strValue.toLowerCase() ) == true )
				{
					_found = true;
				}
			}

			//	console.debug( "found", _found, item );
			if ( _found == true )
			{
				return item;
			}
			else if ( _found == false )
			{
				return;
			}
		} );

		//	console.debug( "_set.length", _set.length );
		return _set;
	};
	this.Pills_Filter = function ( filter, filterKey, data)
	{	//	console.debug( "Pills_Filter", filter );
		let _return_results = [];
		let _selected_keys = [];

		filter.KeyValueData().forEach( function ( v, i, a )
		{   //	
			//	console.debug( "FilterCascade", i, v.Title(), v.IsChecked() );
			if ( v.IsChecked() == true )
			{
				_selected_keys.push( v.Title() );
			}
			return;
		} );
		//	console.debug( "_selected_keys.length", _selected_keys.length );

		data.forEach( function ( v, i, a )
		{   //	console.debug( i, v.ResourceName(), v.Subscription(), v.IP_Address(), _selected_keys.length );
			if ( _selected_keys.length !== 0 )
			{
				_selected_keys.forEach( function ( v2, i2, a2 )
				{   //  console.debug( i2, v2 );
					if ( v[filterKey]() == v2 )
					{
						_return_results.push( v );
					}
					return;
				} );
			}
			else
			{
				_return_results.push( v );
			}
			return;
		} );
		//	console.debug( filterKey, "_return_results", _return_results.length );
		return _return_results;
	};
	this.Compute_GlobalFilter_Data_Lists = function ()
	{	//	console.debug( "Compute_GlobalFilter_Data_Lists", this._data.length, this.Data_Temp().length);
		let _temp_pills_data = [];
		let _pill_results = this.Data_Temp();

		// LOOP THROUGH STANDARD PILLS
		this.PillsCollection().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.SelectedKey(), v.KeyValueData(), v.IsAddPill(), v.IsSearchPill() );
			if ( v.IsAddPill() == false && v.IsSearchPill() == false )
			{	//	console.debug( i, v.Title(), v.SelectedKey(), v.FilterKey(), v.KeyValueData() );
				_temp_pills_data = _self.Pills_Filter(v, v.FilterKey(), _pill_results );
				_pill_results = _temp_pills_data;
			}
			return;
		} );
		//	console.debug( "dataa compare", _self.Data_Temp().length, _pill_results.length, _temp_pills_data.length );

		// FILTER BASED ON USER ENTERER SEARCH TEXT
		_temp_pills_data = this.FilterSearchBox( this.SearchBoxValue(), _temp_pills_data );

		// IF NO MATCHES, RESET
		if ( _temp_pills_data.length == _self.Data_Temp().length )
		{	//	console.debug( "TOTALS MATCH" );
			this.HasSearchResults( false );
			this.Set_Defaults_DataGroups();
		}
		else
		{	//	console.debug( "TOTALS DO NOT MATCH" );
			let _results_title = "";
			if ( _temp_pills_data.length == 0 )
			{
				_results_title = " No results found";
			}
			else if ( _temp_pills_data.length == 1 )
			{
				_results_title = "One result found";
			}
			else if ( _temp_pills_data.length > 1 )
			{
				_results_title = _temp_pills_data.length + " results found";
			}

			let _results = new ResultGroup_ViewModel();
			_results.Title( _results_title );
			_results.Data( _temp_pills_data );
			_results.IsOpen( true );

			this.HasSearchResults( true );
			this.DataGroups( [_results] );
		}
		return;
	};

	// CARD EVENT
	this.OnClick_ShowDetailPage = function ( vm, ev )
	{	//console.debug( "OnClick_ShowDetailPage", vm.JsonBlob(), vm.ParentViewModel(), this.ParentViewModel() );
		let _new_details = new MarketplaceResult_ViewModel( _self, vm.JsonBlob() );		
		this.ParentViewModel().SelectedDetailsPage( _new_details );
		this.ParentViewModel().DetailsPageDisplayed( true );
		return;
	};

	// INIT
	this.Set_Defaults_DataGroups();
	this.SetPillsDefault();
	return;
};

function ResultGroup_ViewModel()
{
	this._open_text = "View more";
	this._closed_text = "View less";
	this.Title = ko.observable();
	this.Data = ko.observableArray( [] );
	this.OpenButtonText = ko.observable( this._open_text );
	this.IsOpen = ko.observable( false );
	this.IsOpen.subscribe( function ( newValue )
	{	//	console.debug( "newValue", newValue);
		if ( newValue == true )
		{
			this.OpenButtonText( this._closed_text );
		}
		else if ( newValue == false )
		{
			this.OpenButtonText( this._open_text );
		}
		return;
	}, this );
	this.OnClick_HideShowResults = function ( vm, ev )
	{	//	console.debug( "OnClick_HideShowResults", this.IsOpen() );
		if ( this.IsOpen() === false )
		{
			this.IsOpen( true );
		}
		else if ( this.IsOpen() === true )
		{
			this.IsOpen( false );
		}
		return;
	};
	return;
};

function MarketplaceResult_ViewModel( parent, json)
{
	this.ParentViewModel = ko.observable( parent );
	this.JsonBlob = ko.observable( json );
	this.Name = ko.observable( json.displayName );
	this.Publisher = ko.observable( json.publisher );
	this.Summary = ko.observable( json.summary );
	this.Icon = ko.observable( json.icon );
	this.HasBadge = ko.observable( json.badge );
	this.BageIcon = ko.observable( SVG.Test.marketplace_badge_text.SVG );
	this.HeartFavoriteIcon = ko.observable( SVG.Test.heart_favorite.SVG );
	this.Rating = ko.observable( json.rating );
	this.RatingCount = ko.observable( json.ratingCount );
	this.PricingTier = ko.observable( FilterViewModelTypes.MarketPricing.data[1] );
	this.OperatingSystem = ko.observable( FilterViewModelTypes.OperatingSystems.data[0] );

	this.SmartDefaultsIcon = ko.observable( SVG.Test.rush_cloud_blue.SVG );
	

	this.OnClick_HeartFav_Fake = function ( vm, ev )
	{	//	console.debug( "html: HeartFavoriteIcon" );
		return false;
	};

	this.SetOtherValues = function ()
	{
		let _random = Math.round( Math.random() * FilterViewModelTypes.MarketPricing.data.length - 1 ) ;
		if ( _random < 0 )
		{
			_random = 1;
		}
		this.PricingTier( FilterViewModelTypes.MarketPricing.data[_random] );
		//	console.debug( "SetRandomPricing.this.PricingTier()", _random, this.PricingTier() );

		_random = Math.round( Math.random() * FilterViewModelTypes.OperatingSystems.data.length - 1 );
		if ( _random < 0 )
		{
			_random = 1;
		}
		this.OperatingSystem( FilterViewModelTypes.OperatingSystems.data[_random] );
		//	console.debug( "SetRandomPricing.this.OperatingSystem()", _random, this.OperatingSystem() );

		return;
	};
	this.SetOtherValues();
	return;
};
