/// <reference path="../script/knockout-3.5.0.js" />
/// "BrowseVirtualMachinesExtension_ViewModel" ViewModel V.1.1.0
"use strict";
function BrowseVirtualMachinesExtension_ViewModel( parentViewModel )
{
	ko.utils.extend(this, new Extension_ViewModel(parentViewModel));
    const _self = this;

	this.ExtensionName( "All Virtual Machines" );
	this.BladeName( "All virtual machines" );
	this.BladeSubName( "" );
	this.BladeIcon( SVG.Color.VirtualMachines.SVG );
	this.NavIcon( SVG.Color.VirtualMachines.SVG );
	this.ExtensionTemplateName("KO-Extensions-BrowseAllResources-Template");

	this._crumbs = [
		"Home",
		this.BladeName()
	];
	this.BreadCrumbs(this._crumbs);

	// COMMAND BUTTON BAR EVENTS
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{	//	
		console.debug( "BrowseVirtualMachinesExtension_ViewModel.OnClick_ShowCommandButtonContextBlade" );
		return;
	};
	this.OnClick_OpenCreateVmFlow = function ( vm, ev )
	{
		//	console.debug( "BrowseVirtualMachinesExtension_ViewModel.OnClick_OpenCreateVmFlow" );
		let _create_vms = new SmartDefaults_CreateFlow_VMS_ViewModel( _self.ParentViewModel(),"Create VMS", false );
		_create_vms.ClickedFrom( "vms-browse-blade" );
		_self.ParentViewModel().CurrentExtensionViewModel( _create_vms );
		return;
	};
	//this.OnClick_OpenSmartDefaultsVmFlow  = function ( vm, ev )
	//{ //	console.debug( "BrowseVirtualMachinesExtension_ViewModel.OnClick_OpenCreateVmFlow" );
	//	let _create_vms = new SmartDefaults_CreateFlow_VMS_ViewModel( _self.ParentViewModel() );
	//	_create_vms.ClickedFrom( "vms-blade" );
	//	//	_create_vms.IsSmartDefaults( true );
	//	//	_create_vms.ClickedFromAdd( false );
	//	_create_vms.OnClick_CloseBackToSmartDefaults();
	//	_self.ParentViewModel().CurrentExtensionViewModel( _create_vms );
	//	return;
	//};

	this._cmd_btns = [
		new CommandBarButton( { Text: "Add", Image: SVG.Shell.CreateHub.SVG, Action: this.OnClick_OpenCreateVmFlow } ),
		//new CommandBarButton( { Text: "Create with Smart Defaults", Image: SVG.Shell.CreateHub.SVG, Action: this.OnClick_OpenSmartDefaultsVmFlow } ),
		new CommandBarButton( { Text: "Reservations", Image: SVG.Clock.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Edit columns", Image: SVG.Columns.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Refresh", Image: SVG.Refresh.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Assign tags", Image: SVG.Tag_m.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Start", Image: SVG.MediaStart.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Restart", Image: SVG.Redo.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Stop", Image: SVG.StatusBadge.Stopped.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Delete", Image: SVG.Delete.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Services", Image: SVG.Properties.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
	];

	this.CommandButtons(this._cmd_btns);

	////hack
	//this.IsVirtualMachinesListBlade = ko.observable( true );
	//this.IsResourceBlade = ko.observable( false );

	// open a quick blade, to get to the tag editor
	//this.IsResourceBladeVisible = ko.observable( true );
	//this.CurrentResourceBlade = ko.observable();
	this.OnClick_OpenResourceBlade = function ( vm, ev )
	{	//	console.debug( "this.OnClick_OpenResourceBlade", _self.ParentViewModel().CurrentTocViewModel() );
		//_self.ParentViewModel().OnClick_HideShowAllResourcesBlade();
		//_self.ParentViewModel().OnClick_HandleLeftNav( 0 );

		//let _new_blade = new SingleResourceViewModel( _self.ParentViewModel() );

		//_new_blade.Title( vm.ResourceName() );
		////"#FxSymbol0-015-AllResources"
		//_new_blade.BladeIcon( "#FxSymbol0-015-AllResources" );
		//_new_blade.ApplicationName( vm.ResourceName() );
		//_new_blade.Data( vm );

		//_self.ParentViewModel().CurrentResourceBlade( _new_blade );
		//_self.ParentViewModel().IsResourceBladeVisible( true );
		//	_self.ParentViewModel().OnClick_HandleLeftNav( 0 );

		_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[8] );
		return;
	};

	//	feature flag -- 
	//	set the default flyout filter menu
	this.IsFacetPanelDisplayed = ko.observable( false );

	// resource filter back button behavior
	this.IsResourceFilterSelected = ko.observable( false );
	this.CurrentActiveFilter = ko.observable();

	// 08/30/2018
	this.IsVisible_TagsColumn = ko.observable( false );

	// 3/1/18 change apply button behavior
	// 7/24/2018 updated to enable "apply" button state
	this.DataGridLoadingPanel_IsDisplayed = ko.observable( true );
	this.ShowDataGridLoadingPanel = function ()
	{	//	console.debug( "this.ShowDataGridLoadingPanel", _self.ParentViewModel().Selected_FullPageLoadingTime() );
		//this.DataGridLoadingPanel_IsDisplayed( false );

		//window.setTimeout( function ()
		//{
		//	_self.DataGridLoadingPanel_IsDisplayed( true );
		//	return;
		//}, _self.ParentViewModel().Selected_DataGridLoadingTime() );
		return;
	};


	/*
	moving this up to a generic, inheritable blade viewmodel
	DATA OBSERVABLEARRAYS 
    this.Data_Temp is meant to be a cache of the original unfiltered data
    this.Data is meant to be the filterable version of the data
    */
	this.ParentViewModel = ko.observable( parentViewModel );
	this.Data_Temp = ko.observableArray( [] );
	this.Data = ko.observableArray( [] );
    this.TotalDataCount = ko.computed( function ()
	{
		let _item = "";
		let _item_text = "item";

		let _total_count = _self.Data_Temp().length;
		let _filter_count = _self.Data().length;

        if ( _filter_count == 0 )
        {
            _item = "No items of " + _total_count + " items";
        }
        else if ( _filter_count == 1 )
        {
            _item = "One item of " + _total_count + " items";
        }
        else
        {
            _item = _filter_count + " items of " + _total_count + " items";
        }

        return _item;
	}, this );

    // open/close for when the facet panel is open
    this._facet_open = "svg/collapse-right.svg";
    this._facet_closed = "svg/collapse-left.svg";
    this.Facet_OpenClose_Button = ko.observable( this._facet_open );
    this.FacetPanel_IsOpen = ko.observable( false );
    this.OnClick_OpenClose_FacetPanel = function ( data, ev )
    {   //  console.debug( "OnClick_OpenClose_FacetPanel", this.FacetPanel_IsOpen() );
        if ( this.FacetPanel_IsOpen() == true )
        {
            this.FacetPanel_IsOpen( false );
            this.Facet_OpenClose_Button( this._facet_open );
        }
        else if ( this.FacetPanel_IsOpen() == false )
        {
            this.FacetPanel_IsOpen( true );
            this.Facet_OpenClose_Button( this._facet_closed );
        }
        return;
    };

    //	global filters
	//	this.AddNewFilter = new Filter_ViewModel( FilterViewModelTypes.AddButton, this );
	//	this.SubscriptionFilter = new Filter_ViewModel( FilterViewModelTypes.Subscriptions, this );
	//	no longer used, but still needed until we remove the actual KO template that uses it.
	this.GlobalFacetFilters = ko.observableArray( [] );

	//// pills
	this.GlobalPillsFilters = ko.observableArray( [] );

	// 1-15-2018
	// refactored 7/26/2018
	this.ClearAllFilter_IsVisible = ko.observable( false );
	this.ClearAllFiltersText = ko.observable( "Reset filters" );
	// new add pills behavior
	// check the existing pills, and limit ability to add duplicate key entries
	this.Visible_AllFiltersUsed = ko.observable( false );
	this.OnClick_AddNewPill = function ( vm, ev )
	{	//	console.debug( "this.OnClick_AddNewPill", vm);

		if ( vm !== undefined )
		{
			vm.OperatorListOpen( false );
			vm.ValuesListOpen( false );
			if ( vm.KeyListOpen() == false )
			{
				vm.KeyListOpen( true );
			}
			else if ( vm.KeyListOpen() == true )
			{
				vm.KeyListOpen( false );
			}
		}

		//// SAVE THIS WORKS FOR REMOVING THE  ITEM FROM THE LIST ON A PILL KEY 
		let _temp_selected_keys = [];
		let _new_data = [];
		let _prev_array = _self.GlobalPillsFilters().filter( function (item)
		{
			return item.IsSearchPill() == false || item.IsAddPill() == false;
		} );
		//	console.debug( "_prev_array", _prev_array );

		_self.GlobalPillsFilters().forEach( function ( v, i, a )
		{	//	console.debug( i, v.SelectedKey() );
			v.CloseAllDropDowns();
			_temp_selected_keys.push( v.SelectedKey() );
			return;
		} );

		VirtualMachine_PillsData.forEach( function ( v2, i2, a2 )
		{	//	console.debug( i2, v2.title );
			let _test = false;
			_temp_selected_keys.forEach( function ( v3,i3, a3 )
			{	//	console.debug( i2, i3, v3 );
				if ( v2.title == v3 )
				{
					_test = true;
				}
				return;
			} );

			if ( _test == false )
			{
				_new_data.push( v2 );
			}

			return;
		} );	//	console.debug( "_new_data", _new_data );

		_prev_array.splice( _prev_array.length - 1, 0, new Pill_ViewModel( _self, _new_data ) );
		_self.GlobalPillsFilters( _prev_array );

		//	console.debug( "PillsData.length, this.GlobalPillsFilters().length", PillsData.length, this.GlobalPillsFilters().length );
		if ( VirtualMachine_PillsData.length == _self.GlobalPillsFilters().length )
		{
			_self.Visible_AllFiltersUsed( true );
		}
		else if ( VirtualMachine_PillsData.length != _self.GlobalPillsFilters().length )
		{
			_self.Visible_AllFiltersUsed( false );
		}
		return;
	};
	this.Add_GlobalPills = function ( vm, ev )
	{	//	console.debug( "Add_GlobalPills", vm, _self );
		//	 close the add filters pill drop down
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 2].CloseAllDropDowns();

		// get selected title
		let _vm_title = vm.Title();

		// get index from raw data, for selecting in the pill
		let _vmpd_index = VirtualMachine_PillsData.findIndex( function ( item )
		{	//	console.debug( "item", item.title, _vm_title, vm.Title() );
			return item.title == _vm_title;
		} );
		//	console.debug( "_vmpd_index", _vmpd_index, VirtualMachine_PillsData[_vmpd_index] );

		// create new pill
		let _new_pill = new Pill_ViewModel( _self, [VirtualMachine_PillsData[_vmpd_index]] );
		_new_pill.IsVisible( true );
		_new_pill.IsRemovable( true );
		//_new_pill.Created_Animation( true );
		_new_pill.OnClick_SelectKey( _new_pill.KeyData()[0], null );
		_new_pill.KeyValueData().forEach( function ( v, i, a )
		{
			v.IsChecked( false );
		} );
		_new_pill.CloseAllDropDowns();
		_new_pill.ValuesListOpen( true );

		let _prev_array = _self.GlobalPillsFilters().filter( function (item)
		{
			return item.IsSearchPill() == false || item.IsAddPill() == false;
		} );

		_prev_array.splice( _prev_array.length - 2, 0, _new_pill );
		_self.GlobalPillsFilters( _prev_array );

		// remove from add filters list
		let _remaining = _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().filter( function ( item )
		{	//	console.debug( "add filter", item );
			if ( item.title !== _vm_title )
			{
				return item;
			}
			else
			{
				return;
			}
		} );
		//	console.debug( "_remaining", _remaining );
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData( _remaining );

		_new_pill.Created_Animation( true );
		return;
	};
	this.Remove_SelectedPill = function ( vm, ev )
	{	//	
		console.debug( "Remove_SelectedPill", vm, _self );
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].CloseAllDropDowns();

		// filter out the clicked pill viewmodel
		let _filtered  = _self.GlobalPillsFilters().filter( function ( item )
		{	//	console.debug( "item", item.ID(), vm.ID() );
			return vm.ID() !== item.ID();
		} ); //	console.debug( "_filtered", _filtered );
		_self.GlobalPillsFilters( _filtered );

		//	console.debug( _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].Title() );
		//_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().forEach( function ( v, i, a )
		//{
		//	console.debug( i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		let _re = VirtualMachine_PillsData.filter( function ( v, i, a )
		{	//	console.debug( i, v.title );
			return v.title == vm.SelectedKey();
		} );
		//	console.debug( "_re", _re );

		// find the removed pill and re-add it to the add filters pill data
		let _removed = new FilterData_ViewModel(_re[0].title, _re[0].data);

		let _prev = _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData();
		_prev.push( _removed );

		_prev.sort( function ( a, b )
		{	
			//	console.debug( a.title, b.title );
			if ( b.Title() > a.Title())
			{
				return -1;
			}
			else if ( b.Title() == a.Title() )
			{
				return 0;
			}
			else if ( b.Title() < a.Title() )
			{
				return 1;
			}

			return;
		} );

		// add recomputed array?
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData( [] );
		
		//_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().forEach( function ( v, i, a )
		//{
		//	console.debug("add", i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		//_prev.forEach( function ( v, i, a )
		//{
		//	console.debug("prev", i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData( _prev );
	
		//_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().forEach( function ( v, i, a )
		//{
		//	console.debug("add", i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		// redo query filtering
		_self.Compute_GlobalFilter_Data_Lists();

		// reset add pill button visible setting
		_self.Visible_AllFiltersUsed( false );
		return;
	};
	this.OnClick_ResetPillsToDefaultState = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ResetPillsToDefaultState", vm, ev );
		_self.Visible_AllFiltersUsed( false );
		//	_self.GlobalPillsFilters( [] );
		_self.SetPillsDefault();
		_self.Compute_GlobalFilter_Data_Lists();
		return;
	};
	this.Close_AllPillDropDowns = function ( vm, ev )
	{
		this.GlobalPillsFilters().forEach( function ( v, i, a )
		{
			if ( v !== vm )
			{
				v.CloseAllDropDowns();
			}
		} );
		return;
	};

	// reset all facets & pills
	// set & reset pills defaults
	this.SetPillsDefault = function ()
	{	//	console.debug( "SetPillsDefault" );
		let _default_pills = [];

		let _search_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData );
		_search_pill.CloseAllDropDowns();
		_search_pill.IsSearchPill( true );
		_default_pills.push( _search_pill );

		let _subs_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData );
		_subs_pill.IsVisible( true );
		_subs_pill.IsRemovable( false );
		_subs_pill.OnClick_SelectKey( _subs_pill.KeyData()[0], null );
		_subs_pill.KeyValueData().forEach( function ( v, i, a )
		{
			v.IsChecked( true );
		} );
		_subs_pill.CloseAllDropDowns();
		_default_pills.push( _subs_pill );

		// res groups pill
		let _rgs_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData  );
		_rgs_pill.IsVisible( true );
		_rgs_pill.IsRemovable( false );
		_rgs_pill.OnClick_SelectKey(_rgs_pill.KeyData()[1],null);
		_rgs_pill.KeyValueData().forEach( function ( v, i, a )
		{
			v.IsChecked( true );
		} );
		_rgs_pill.CloseAllDropDowns();
		_default_pills.push( _rgs_pill );

		// locations pill
		let _locations_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData  );
		_locations_pill.IsVisible( true );
		_locations_pill.IsRemovable( false );
		_locations_pill.OnClick_SelectKey(_locations_pill.KeyData()[2],null);
		_locations_pill.KeyValueData().forEach( function ( v, i, a )
		{
			v.IsChecked( true );
		} );
		_locations_pill.CloseAllDropDowns();
		_default_pills.push( _locations_pill );

		// tags pill
		let _tags_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData  );
		_tags_pill.IsVisible( true );
		_tags_pill.IsRemovable( false );
		_tags_pill.IsTagsPill( true );
		_tags_pill.HasOperators( false );
		_tags_pill.OnClick_SelectKey(_tags_pill.KeyData()[3],null);
		//_tags_pill.KeyValueData().forEach( function ( v, i, a )
		//{	//	console.debug( "tags", i, v );
		//	v.IsChecked( true );
		//	v.Data().forEach( function ( v2, i2, a2 )
		//	{
		//		v2.IsChecked( true );
		//	} );
		//} );
		_tags_pill.CloseAllDropDowns();
		_default_pills.push( _tags_pill );

		let _add_data = [];
		VirtualMachine_PillsData.forEach( function ( v, i, a )
		{	//	console.debug( a.length, i, v );
			if ( i > (_default_pills.length - 1) && i < a.length )
			{
				_add_data.push(v);
			}
			return;
		} );
		//	console.debug( "_add_data", _add_data );

		_add_data.sort( function ( a, b )
		{	
			//	console.debug( a.title, b.title );
			if ( b.title > a.title )
			{
				return -1;
			}
			else if ( b.title == a.title )
			{
				return 0;
			}
			else if ( b.title < a.title )
			{
				return 1;
			}

			return;
		} );
		//	console.debug( "_add_data", _add_data );

		let _add_pill = new Pill_ViewModel( _self, _add_data );
		_add_pill.Title( "Add filters" );
		_add_pill.IsAddPill( true );
		_add_pill.CloseAllDropDowns();
		_default_pills.push( _add_pill );

		// reset pill
		let _reset_pill = new Pill_ViewModel( _self, VirtualMachine_PillsData );
		_reset_pill.IsVisible( true );
		_reset_pill.IsRemovable( false );
		_reset_pill.IsTagsPill( false );
		_reset_pill.HasOperators( false );
		_reset_pill.IsResetPill( true );
		_reset_pill.IsSearchPill( false );
		_reset_pill.CloseAllDropDowns();
		_default_pills.push( _reset_pill );

		this.GlobalPillsFilters( _default_pills );
		return;
	};
	this.SetInit_AllFilters = function ()
	{	//	console.debug( "this.SetInit_AllFilters" );
		//this.GlobalFacetFilters().forEach( function ( v, i, a )
		//{
		//	v.ResetFilterData();
		//} );

		//	this.SetPillsDefault();
		return;
	};
	this.OnClick_ClearAllFilters = function ( vm, ev )
	{	// console.debug( "OnClick_ClearAllFilters", vm, ev );
		//	this.ShowDataGridLoadingPanel();
		//this.GlobalFacetFilters().forEach( function ( v, i, a )
		//{
		//	console.debug("OnClick_ClearAllFilters",  i, v.Title() );
		//	//	v.ResetData_Temp_IsChecked();
		//} );
		this.Data( this.Data_Temp() );
		//	this.Compute_GlobalFilter_Data_Lists();
		this.Compute_PagingControls();
		//	this.Compute_TypeCounts();
		//	this.SetInit_AllFilters();
		this.SetPillsDefault();

		return;
	};

    // set the default tab show
    this.CloseAllFilterDropdowns = function ()
	{	//	console.debug( "vms- CloseAllFilterDropdowns" );
		this.GlobalFacetFilters().forEach( function ( v, i, a )
		{	//	console.debug( "close facets\t", i, v.Title() );
			v.CloseMoreMenu();
			return;
		} );

		//	console.debug( "close pills" );
		this.GlobalPillsFilters().forEach( function ( v, i, a )
		{	//	console.debug( "close pills\t", i, v.SelectedKey() );
			v.CloseAllDropDowns()
			return;
		} );

		return;
	}

	//	hax - specific to facets panel
	//	disable / enabled the reset filters button
	this.Filters_Selected_State = ko.computed( function ()
	{	//	console.debug( "this.Filters_Selected_State" );
		let _rv_value = false;
		this.GlobalFacetFilters().forEach( function ( v, i, a )
		{	//	console.debug( "GlobalFacetFilters", i, v.Title() );
			// select all hax
			if ( i !== 0 )
			{
			//	check for subscriptionHack flag
				v.Data_Temp().forEach( function (val, idx, arr)
				{	//	console.debug( v.Title(), idx, val.Title(), val.IsChecked() );
					if ( val.IsChecked() == true )
					{
						_rv_value = true;
					}
					return;
				} );
			}
			return;
		} );
		//	console.debug( "_rv_value:", _rv_value );
		return _rv_value;
	}, this );

	// trying to get accurate counts
	//	this.Custom_PageSize = ko.observable( "custom" );
	this.PagesNumbersArray = ko.observableArray( [] );
	this.NumberOfDataPages = ko.observable();

	this.Compute_PagingControls = function ()
	{
		//	console.debug( "this.Compute_PagingControls", this.Data().length );
		//	eventually do row based on browser window size, row == 33px
		//	but for now just compute the number of pages
		//	let _browse_grid = document.getElementById( "browse-data-grid" );
		//	console.debug( "_browse_grid", _browse_grid );

		let _num_of_pages = Math.round( this.Data().length / 33 );
		this.NumberOfDataPages( _num_of_pages );

		let _page_array = [];
		for ( let i = 0; i < _num_of_pages; i++ )
		{
			_page_array.push( i + 1);
		}
		this.PagesNumbersArray( _page_array );

		return;
	};
	this.FilterCascade = function ( filter, filterKey, dataSet )
	{	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length );
		let _selected_keys = [];
        filter.Data_Temp().forEach( function (v,i,a)
		{   //	console.debug("FilterCascade", i, v.Title(), v.IsChecked() );
            if ( v.IsChecked() == true )
            {
                _selected_keys.push( v.Title() );
            }
		} );
        //	console.debug( "_selected_keys", _selected_keys );

		let _return_results = [];
        dataSet.forEach( function ( v, i, a )
		{   //	console.debug( i, v.ResourceName(), v.Subscription(), v.IP_Address(), _selected_keys.length );
            if ( _selected_keys.length !== 0 )
            {
                _selected_keys.forEach( function ( v2, i2, a2 )
				{   //  console.debug( i2, v2 );
                    if ( v[filterKey]() == v2 )
                    {
                        _return_results.push( v );
                    }
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
	this.Pills_FilterCascade = function ( filter, filterKey, dataSet )
	{	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length );
		let _selected_keys = [];
		let _return_results = [];

		// for tags & not tags pills
        filter.KeyValueData().forEach( function (v,i,a)
		{   //	
			//	console.debug( "FilterCascade", i, v.Title(), v.IsChecked() );
            if ( v.IsChecked() == true )
			{	
				if ( filterKey !== FilterViewModelTypes.TagsList.filterColumnKey )
				{	// not tags
					_selected_keys.push( v.Title() );
				}
				else if ( filterKey == FilterViewModelTypes.TagsList.filterColumnKey )
				{	//tags
					//	console.debug( "FilterCascade", i, v.Title(), v.IsChecked() );
					v.Data().forEach( function ( v2, i2, a2 )
					{
						if ( v2.IsChecked() == true )
						{
							let _tag = new Tag();
							_tag.Title( v.Title() );
							_tag.Value( v2.Title() );

							_selected_keys.push( _tag );
						}
						return;
					} );
				}
			}
			return;
		} );
		//	console.debug( "_selected_keys.length", _selected_keys.length );

        dataSet.forEach( function ( v, i, a )
		{   //	console.debug( i, v.ResourceName(), v.Subscription(), v.IP_Address(), _selected_keys.length );
            if ( _selected_keys.length !== 0 )
			{
				//	NOT TAGS
				if ( filterKey !== FilterViewModelTypes.TagsList.filterColumnKey )
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
				else if ( filterKey == FilterViewModelTypes.TagsList.filterColumnKey )
				{	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length, i, v, v.TagsCollection().length );
					let _match = false;

					v.TagsCollection().forEach( function ( val, idx, arr )
					{	//	console.debug( i, v.ResourceName(), val.Title(), val.Value() );
						_selected_keys.forEach( function ( v2, i2, a2 )
						{   //	console.debug( i, idx, i2, v2.Title(), v2.Value() );
							if ( val.Title() == v2.Title() && val.Value() == v2.Value() )
							{
								_match = true;
								return;
							}
							return;
						} );
						return;
					} );

					//	console.debug( "_match", _match );
					if ( _match == true )
					{
						_return_results.push( v );
					}
				}
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

	// special case for filtering tags
	this.Special_Check_IP_SearchString = function (values )
	{
			let _rv = [];
			values.forEach( function ( v, i, a )
			{   //  console.debug( i, _self.IPFilter.SearchString(), v.ResourceName(), v.IP_Address() );
				if ( _self.IPFilter.SearchString() !== undefined )
				{
					if ( _self.IPFilter.SearchString().length > 0 )
					{   //  
						//	console.debug(_self.IPFilter.SearchString() , "v.IP_Address()", v.IP_Address() );

						if ( v.IP_Address().indexOf(_self.IPFilter.SearchString()) != -1 )
						{
						//console.debug( "v.IP_Address().indexOf(_self.IPFilter.SearchString())", v.IP_Address().indexOf( _self.IPFilter.SearchString() ) );

							_rv.push( v );
						}
					}
					else
					{
						_rv.push( v );
					}
				}
				else
				{
					_rv.push( v );
				}
				return;
			} );
			//	console.debug( "_rv", _rv.length, "values", values.length );
			return _rv;
	};
	this.FilterCascadeTags = function ( dataSet )
	{	//	console.debug( "FilterCascadeTags", dataSet.length );
		let _results = [];
		let _selected_tags = [];

		this.TagsFilter.TagGroupsCollection().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.Tags().length );
			if ( i !== 0 )
			{
				let _group_name = v.Title();
				v.Tags().forEach( function ( v2, i2, a2 )
				{
					if ( v2.IsChecked() == true )
					{	//	console.debug( i2, v2.Title(), v2.IsChecked() );
						let _temp = _group_name + " : " + v2.Title();
						_selected_tags.push( _temp );
					}
					return;
				});
			}
			return;
		} );

		//	console.debug( "_selected_tags", _selected_tags.length );
		//	console.debug("this.TagsFilter.Data_Temp()[0].IsChecked()",this.TagsFilter.Data_Temp()[0].IsChecked());

		if ( _selected_tags.length > 0 )
		{	//	console.debug( " this.TagsFilter.TagsFilterType();",  this.TagsFilter.TagsFilterType() );
			if ( this.TagsFilter.TagsFilterType() == "all" )
			{
				dataSet.forEach( function ( v, i, a )
				{	//	console.debug( i, v.ResourceName() );
					let _all_matched = 0;

					v.TagsCollection().forEach( function ( v2, i2, a2 )
					{
						let _tag = v2.Title() + " : " + v2.Value();
						//	console.debug( i, i2, _tag );
						_selected_tags.forEach( function ( v3, i3, a3 )
						{	//	console.debug( i, i2, i3, v3 );
							if ( v3 == _tag )
							{
								//	_results.push( v );
								_all_matched++;
							}
							return;
						} );
						return;
					} );

					//	console.debug( "MATCH??", _all_matched, _selected_tags.length );

					if ( _all_matched > 0 )
					{
						if ( _all_matched == _selected_tags.length )
						{
							_results.push( v );
						}
					}
					return;
				} );
			}
			else if ( this.TagsFilter.TagsFilterType() == "all" && this.TagsFilter.Data_Temp()[0].IsChecked() == true )
			{
				_results = [];
			}
			else if ( this.TagsFilter.TagsFilterType() == "any" && this.TagsFilter.Data_Temp()[0].IsChecked() == false )
			{
				dataSet.forEach( function ( v, i, a )
				{	//	console.debug( i, v.ResourceName() );
					v.TagsCollection().forEach( function ( v2, i2, a2 )
					{
						let _tag = v2.Title() + " : " + v2.Value();
						//	console.debug( i, i2, _tag );
						_selected_tags.forEach( function ( v3, i3, a3 )
						{	//	console.debug( i, i2, i3, v3 );
							if ( v3 == _tag )
							{
								_results.push( v );
							}
							return;
						} );
						return;
					} );
					return;
				} );
			}
			else if ( this.TagsFilter.TagsFilterType() == "any" && this.TagsFilter.Data_Temp()[0].IsChecked() == true )
			{
				_results = dataSet;
			}
		}
		else
		{
			_results = dataSet;
		}

		//	console.debug( "FilterCascadeTags::_results", _results.length );
		return _results;
	};
	this.PopulateFilterDataCount = function ( filter, map )
	{	//	console.debug( "this.PopulateFilterDataCount", filter, map );
		let _temp = 0;
		let _arr = [];

		//	initial run, not yet populate, create new list
		//	console.debug( filter.Title(), filter.Data_Temp().length );

		if ( filter.Data_Temp().length == 0 )
		{
			map.forEach( function ( value, key, arr )
			{	//	console.debug( key, value );
				_arr.push( { key, value } );
				return;
			} );

			_arr.push( { key: "Select all", value: _self.Data_Temp().length } );
			_arr.sort( function ( a, b )
			{
				//	console.debug( a, b );
				return b.value - a.value;
			} );

			_arr.forEach( function ( v, i, a )
			{
				//	console.debug("PopulateFilterDataCount", i, v );
				let _fdvm = new FilterData_ViewModel();
				_fdvm.Title( v.key );
				_fdvm._ItemCount( v.value );
				_fdvm.IsChecked( false );
				if ( v.key == "Select all" )
				{
					_fdvm.IsSelectAll( true );
				}

				filter.Data_Temp.push( _fdvm );
				return;
			} );
			//console.debug( filter.Data_Temp().length );
			//console.debug( filter.Data().length );
			//console.debug( "BREAK" );
		} // subsequent runs, should be populated, just changing values
		else if ( filter.Data_Temp().length !== 0 )
		{
			filter.Data_Temp().forEach( function ( v, i, a )
			{
				//	console.debug( i, v.Title(), v._ItemCount(), v.IsChecked() );
				let _temp;
				map.forEach( function ( value, key, arr )
				{	//    console.debug( v.Title(), key, value );
					if ( v.Title() == key )
					{
						_temp = value;
					}
				} );

				if ( _temp !== undefined )
				{
					v._ItemCount( _temp );
				}
				else
				{
					if ( v.Title() == "Select all" )
					{
						v._ItemCount( _self.Data_Temp().length );
					}
					else
					{
						v._ItemCount( 0 );
					}
				}
				//    console.debug("_temp", _temp);
				return;

			} );


			//console.debug( filter.Data_Temp().length );
			//console.debug( filter.Data().length );
			//console.debug( "BREAK" );
		}
		return;
	};
	this.Compute_TypeCounts = function ()
	{	//	console.debug( "Compute_TypeCounts::this.Data().length", this.Data().length, this.Data_Temp().length );
		let _count_subs = new Map();
		let _count_locations = new Map();
		let _count_r_groups = new Map();
		let _count_res_type_map = new Map();
		let _count_avaiL_set = new Map();
		let _count_os = new Map();
		let _count_vnet = new Map();
		let _count_disk = new Map();
		let _count_status = new Map();
		let _count_app_type = new Map();
		let _count_app_svc = new Map();
		let _count_pricing = new Map();
		let _count_tags = new Map();
		// no ip address count needed

		let _current_data = [];
		if ( this.Data().length == this.Data_Temp().length )
		{
			_current_data = this.Data_Temp();
		}
		else if ( this.Data().length !== this.Data_Temp().length )
		{
			_current_data = this.Data();
		}

        _current_data.forEach( function ( v, i, a )
		{	//	console.debug( i, v.ResourceName(), v.ResourceType() );
			// get Subscription counts
			if ( _count_subs.has( v.Subscription() ) == true )
            {   //  console.debug( "true", _count_res_type_map.has( item.Subscription() ) );
                let _found = _count_subs.get( v.Subscription() );
                _count_subs.set( v.Subscription(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_res_type_map.has( v.Subscription() ) );
                _count_subs.set( v.Subscription(), 1 );
			}

			// get Location counts
			if ( _count_locations.has( v.ResourceLocation() ) == true )
            {   //  console.debug( "true", _count_map.has( item.ResourceLocation() ) );
                let _found = _count_locations.get( v.ResourceLocation() );
                _count_locations.set( v.ResourceLocation(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_map.has( v.ResourceLocation() ) );
                _count_locations.set( v.ResourceLocation(), 1 );
            }

            // get ResourcGrp counts
            if ( _count_r_groups.has( v.ResourceGroup() ) == true )
            {   //  console.debug( "true", _count_r_groups.has( item.ResourceGroup() ) );
                let _found = _count_r_groups.get( v.ResourceGroup() );
                _count_r_groups.set( v.ResourceGroup(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_r_groups.has( v.ResourceType() ) );
                _count_r_groups.set( v.ResourceGroup(), 1 );
            }

            // get ResourceType counts
            if ( _count_res_type_map.has( v.ResourceType() ) == true )
            {   //  console.debug( "true", _count_res_type_map.has( item.ResourceType() ) );
                let _found = _count_res_type_map.get( v.ResourceType() );
                _count_res_type_map.set( v.ResourceType(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_map.has( v.ResourceType() ) );
                _count_res_type_map.set( v.ResourceType(), 1 );
            }

			// avail sets
            if ( _count_avaiL_set.has( v.AvailabilitySet() ) == true )
            {   //  console.debug( "true", _count_avaiL_set.has( item.ResourceType() ) );
                let _found = _count_avaiL_set.get( v.AvailabilitySet() );
                _count_avaiL_set.set( v.AvailabilitySet(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_avaiL_set.has( v.ResourceType() ) );
                _count_avaiL_set.set( v.AvailabilitySet(), 1 );
            }

			// _count_vnet
            if ( _count_vnet.has( v.VirtualNetwork() ) == true )
            {   //  console.debug( "true", _count_vnet.has( item.VirtualNetwork() ) );
                let _found = _count_vnet.get( v.VirtualNetwork() );
                _count_vnet.set( v.VirtualNetwork(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_vnet.has( v.ResourceType() ) );
                _count_vnet.set( v.VirtualNetwork(), 1 );
			}

            // count OperatingSystem
            if ( _count_os.has( v.OperatingSystem() ) == true )
            {   //  console.debug( "true", _count_os.has( _item.OperatingSystem() ) );
                let _found = _count_os.get( v.OperatingSystem() );
                _count_os.set( v.OperatingSystem(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_map.has( v.ResourceType() ) );
                _count_os.set( v.OperatingSystem(), 1 );
            }
            //  console.debug( "_count_os", _count_os );

			//_count_disk
            if ( _count_disk.has( v.Disk() ) == true )
            {   //  console.debug( "true", _count_disk.has( _item.Disk() ) );
                let _found = _count_disk.get( v.Disk() );
                _count_disk.set( v.Disk(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_disk.has( v.Disk() ) );
                _count_disk.set( v.Disk(), 1 );
            }

			//_count_status
            if ( _count_status.has( v.Status() ) == true )
            {   //  console.debug( "true", _count_status.has( _item.Status() ) );
                let _found = _count_status.get( v.Status() );
                _count_status.set( v.Status(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_status.has( v.Status() ) );
                _count_status.set( v.Status(), 1 );
            }

			//_count_app_type
            if ( _count_app_type.has( v.AppType() ) == true )
            {   //  console.debug( "true", _count_app_type.has( _item.AppType() ) );
                let _found = _count_app_type.get( v.AppType() );
                _count_app_type.set( v.AppType(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_app_type.has( v.AppType() ) );
                _count_app_type.set( v.AppType(), 1 );
            }

			//_count_app_svc
            if ( _count_app_svc.has( v.AppServicePlan() ) == true )
            {   //  console.debug( "true", _count_app_svc.has( _item.AppServicePlan() ) );
                let _found = _count_app_svc.get( v.AppServicePlan() );
                _count_app_svc.set( v.AppServicePlan(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_app_svc.has( v.AppServicePlan() ) );
                _count_app_svc.set( v.AppServicePlan(), 1 );
            }

			//_count_pricing
            if ( _count_pricing.has( v.PricingTier() ) == true )
            {   //  console.debug( "true", _count_pricing.has( _item.PrivingTier() ) );
                let _found = _count_pricing.get( v.PricingTier() );
                _count_pricing.set( v.PricingTier(), _found + 1);
            }
            else
            {   //  console.debug( "false", _count_pricing.has( v.PrivingTier() ) );
                _count_pricing.set( v.PricingTier(), 1 );
			}

			// tags list _ _count_tags
			// custom behavior for tags
			// tags need to be broken out by collections 
			// and also by specific tags for the "top 5"

			//	console.debug( "v.TagsCollection()", v.ResourceName(), v.TagsCollection().length );
			if ( v.TagsCollection().length > 0 )
			{
				v.TagsCollection().forEach( function ( val, idx, arr )
				{	///	console.debug( idx, val.Title(), val.Value() );
					let _new_map_value = val.Title() + " : " + val.Value();

					if ( _count_tags.has( _new_map_value ) == true )
					{   //  console.debug( "true", _count_pricing.has( _item.PrivingTier() ) );
						let _found = _count_tags.get( _new_map_value );
						_count_tags.set( _new_map_value, _found + 1);
					}
					else
					{   //  console.debug( "false", _count_pricing.has( v.PrivingTier() ) );
						_count_tags.set( _new_map_value, 1 );
					}

					return;
				} );
			}
            return;
		} );

		// refactored for all the swapping and counting of data per control
		// set counts & sort
		//this.PopulateFilterDataCount( this.SubscriptionFilter, _count_subs );
		//this.PopulateFilterDataCount( this.ResourceGroupFilter, _count_r_groups );
		//this.PopulateFilterDataCount( this.ResourceTypesFilter, _count_res_type_map );
		//this.PopulateFilterDataCount( this.DataLocationFilter, _count_locations );
		//this.PopulateFilterDataCount( this.AvailSetFilter, _count_avaiL_set );
		//this.PopulateFilterDataCount( this.VirtualNetworkFilter, _count_vnet );
		//this.PopulateFilterDataCount( this.OSFilter, _count_os );
		//this.PopulateFilterDataCount( this.DisksFilter, _count_disk );
		//this.PopulateFilterDataCount( this.StatusFilter, _count_status );
		//this.PopulateFilterDataCount( this.AppTypeFilter, _count_app_type );
		//this.PopulateFilterDataCount( this.AppServicePlanFilter, _count_app_svc );
		//this.PopulateFilterDataCount( this.PricingTiersFilter, _count_pricing );


		//	no need for ipfilter this.PopulateFilterDataCount( this.IPFilter, _count_ip );
		// tags list _ _count_tags
		// custom behavior for tags
		// tags need to be broken out by collections 
		// and also by specific tags for the "top 5"
		//	this.PopulateFilterDataCount( this.TagsFilter, _count_tags );

		return;
	};

	// default facet/filters
	this.SearchBoxValue = ko.observable("");
	this.SearchBoxValue.subscribe(function (newValue)
	{	//	console.debug( "FilterSearchBox", newValue, _self.Data().length, _self.Data_Temp().length );
		_self.Compute_GlobalFilter_Data_Lists();
		//	console.debug( "_self.Data().length", _self.Data().length );
		return;
	},this);
	this.FilterSearchBox = function ( strValue, dataSet )
	{	//console.debug( "FilterSearchBox", strValue(), dataSet.length );
		let _set = dataSet.filter( function ( item )
		{
			//	console.debug( "item", item );
			let _found = false;

			//	console.debug( newValue, item.Subscription() );
			// subscription
			if ( item.Subscription().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// resource group
			if ( item.ResourceGroup().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// ResourceType group
			//if ( item.ResourceType().toLowerCase().includes( strValue().toLowerCase() ) == true )
			//{
			//	_found = true;
			//}

			//name or resrouce name
			if ( item.ResourceName().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// location
			if ( item.ResourceLocation().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			//avail set
			if ( item.AvailabilitySet().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// ip address
			if ( item.IP_Address().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// os
			if ( item.OperatingSystem().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// VirtualNetwork
			if ( item.VirtualNetwork().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// Disk
			if ( item.Disk().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// Status
			if ( item.Status().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// AppType
			if ( item.AppType().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// AppServicePlan
			if ( item.AppServicePlan().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
			}

			// PricingTier
			if ( item.PricingTier().toLowerCase().includes( strValue().toLowerCase() ) == true )
			{
				_found = true;
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

	// MAIN FILTERING FUNCTION
    this.Compute_GlobalFilter_Data_Lists = function ()
	{	//	console.debug( "Compute_GlobalFilter_Data_Lists -- FOR PILLS ONLY AT THIS TIME + NEED TO RESOLVE HOW FACETS & PILLS COEXIST" );
		//	console.debug( "this.ShowDataGridLoadingPanel()" );
		//	this.ShowDataGridLoadingPanel();

		let _temp_data = [];
		let _temp_results =  this.Data_Temp();

		// for facets
		//this.GlobalFacetFilters().forEach( function ( v, i, a )
		//{	//	console.debug( i, v.Title(), v.FilterKey(), v.Data_Temp() );
		//	let _temp_data = _self.FilterCascade( v, v.FilterKey(), _temp_results );

		//	//	console.debug( "_temp_data", _temp_data.length );
		//	_temp_results = _temp_data;
		//	return;
		//} );

		// for pills
		let _temp_pills_data = [];
		this.GlobalPillsFilters().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.SelectedKey(), v.KeyValueData(), v.IsAddPill(), v.IsSearchPill() );
			if ( v.IsAddPill() == false && v.IsSearchPill() == false)
			{
				//	console.debug( i, v.Title(), v.SelectedKey(), v.FilterKey(), v.KeyValueData(), v.IsAddPill(), v.IsSearchPill() );
				//	console.debug( i, v.Title(), v.SelectedKey(), v.FilterKey(), v.KeyValueData() );
				//	console.debug("Compute_GlobalFilter_Data_Lists", _temp_results.length );
				_temp_pills_data = _self.Pills_FilterCascade( v, v.FilterKey(), _temp_results );
				_temp_results = _temp_pills_data;
			}			
			return;
		} );

		//console.debug( "_temp_data", _temp_data.length );
		//console.debug( "_temp_pills_data", _temp_pills_data.length );
		//console.debug( "_temp_results", _temp_results.length );

		// test search box
		let _atfer_search_results = this.FilterSearchBox( _self.SearchBoxValue, _temp_results );

		this.Data( _atfer_search_results );

		// final data, counting and sorting
		this.Compute_PagingControls();
		//	this.Compute_TypeCounts();

		//	console.debug( "this.Data().length", this.Data().length, this.Data_Temp().length );
		if ( this.Data().length == this.Data_Temp().length )
		{
			this.ClearAllFilter_IsVisible( false );
		}
		else
		{
			this.ClearAllFilter_IsVisible( true );
		}
        return;
	};

	// quick hax, context columns blade
	// general context blade open/close function
	this.OnClick_ShowContextBlade_Columns = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowContextBlade_Columns", _self.ParentViewModel().ContextBlade_OpenClosed() );
		//	HAXXY
		if ( _self.ParentViewModel().ContextBlade_OpenClosed() == false )
		{
			let _cd = new ColumnsViewModel( null, _self );
			_self.ParentViewModel().ContextBladeTemplate( "ko-context-blade-columns-template" );
			_self.ParentViewModel().ContextBladeViewModel( _cd );
			_self.ParentViewModel().ContextBlade_OpenClosed( true );
		}
		else if (_self.ParentViewModel().ContextBlade_OpenClosed() == true)
		{
			_self.ParentViewModel().ContextBladeTemplate( "ko-empty-template" );
			_self.ParentViewModel().ContextBladeViewModel( undefined );
			_self.ParentViewModel().ContextBlade_OpenClosed( false );
		}
		return;
	};
	// quick hax, context blade for adding/editing tags on a data row
	this.OnClick_ShowContext_TagsEditor = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowContextBlade_Columns", vm );
		// HAXXY
		if ( _self.ParentViewModel().ContextBlade_OpenClosed() == false )
		{
			let _selected_resources = [];

			this.Data_Temp().forEach( function ( v, i, a )
			{	//	console.debug( i, v.ResourceName(), v.IsRowSelected() );
				if ( v.IsRowSelected() == true )
				{
					_selected_resources.push( v );
				}
				return;
			} );

			//	console.debug( "_selected_resources", _selected_resources.length );
			if ( _selected_resources.length > 0 )
			{
				let _tag_editor = new TagEditorViewModel( _selected_resources, _self );			
				_self.ParentViewModel().ContextBladeTemplate( "ko-tags-editor-context-blade-template" );
				_self.ParentViewModel().ContextBladeViewModel( _tag_editor );
				_self.ParentViewModel().ContextBlade_OpenClosed( true );
			}
		}
		else if (_self.ParentViewModel().ContextBlade_OpenClosed() == true)
		{
			_self.ParentViewModel().ContextBladeTemplate( "ko-empty-template" );
			_self.ParentViewModel().ContextBladeViewModel( undefined );
			_self.ParentViewModel().ContextBlade_OpenClosed( false );
		}
		return;
	};

    // init & init_data
	this.ADD_UXR_EGG = function ()
	{
		// set for UXR testing 
		let _uxr_gem = new DataRow_ViewModel();
		_uxr_gem.Subscription( FilterViewModelTypes.Subscriptions.data[1] ); // "Fabrikam"
		_uxr_gem.ResourceGroup( FilterViewModelTypes.ResourceGroups.data[0] ); // 	"Fabrikam Public Portal RG 1",
		_uxr_gem.ResourceType( FilterViewModelTypes.ResourceTypes.data[89] ); //	"virtual machines"
		_uxr_gem.ResourceTypeIcon( "svg/vms.svg" );
		_uxr_gem.ResourceLocation( FilterViewModelTypes.DataLocations.data[0] ); // "US West 1",
		_uxr_gem.IP_Address( "113.10.27.192" );
		_uxr_gem.ResourceName( "FABRIKAM-VM-2020" );
		_uxr_gem.OperatingSystem( FilterViewModelTypes.OSTypes.data[1] ); // "Linux"
		_uxr_gem.Status( FilterViewModelTypes.Status.data[0] ); // "Running"

		//	pre-defined "tags" from FilterViewModelTypes.TagsList.data.length
		let _uxr_tag_array = [];

		//	 FilterViewModelTypes.TagsList.data[3] -- department - "engineering"
		let _tag_dept = new Tag();
		_tag_dept.Title( FilterViewModelTypes.TagsList.data[3].name );
		_tag_dept.Value( FilterViewModelTypes.TagsList.data[3].list[1] );
		_uxr_tag_array.push( _tag_dept );

		//	FilterViewModelTypes.TagsList.data[4] -- created - "April 2018"
		let _tag_created = new Tag();
		_tag_created.Title( FilterViewModelTypes.TagsList.data[4].name );
		_tag_created.Value( FilterViewModelTypes.TagsList.data[4].list[1] );
		_uxr_tag_array.push( _tag_created );

		//	FilterViewModelTypes.TagsList.data[5] -- AppName  -- "Fabrikam"
		let _tag_app_name = new Tag();
		_tag_app_name.Title( FilterViewModelTypes.TagsList.data[5].name );
		_tag_app_name.Value( FilterViewModelTypes.TagsList.data[5].list[1] );
		_uxr_tag_array.push( _tag_app_name);

		//	FilterViewModelTypes.TagsList.data[6] -- location - "west2"
		let _tag_location = new Tag();
		_tag_location.Title( FilterViewModelTypes.TagsList.data[6].name );
		_tag_location.Value( FilterViewModelTypes.TagsList.data[6].list[1] );
		_uxr_tag_array.push( _tag_location );

		//	FilterViewModelTypes.TagsList.data[7] -- createdby -- "april@reagan.com"
		let _tag_created_by = new Tag();
		_tag_created_by.Title( FilterViewModelTypes.TagsList.data[7].name );
		_tag_created_by.Value( FilterViewModelTypes.TagsList.data[7].list[1] );
		_uxr_tag_array.push( _tag_created_by );

		_uxr_gem.TagsCollection(_uxr_tag_array);
		//console.debug( "_uxr_gem", _uxr_gem );
		//_uxr_gem.TagsCollection().forEach( function (v,i,a)
		//{
		//	console.debug( "_uxr_gem.TagsCollection()", i, v.Title(), v.Value() );
		//	return;
		//} );

		// TRY TO KEEP THE SPECIFIED DATAROW FOR UXR WITHIN THE FIRST 20 ROWS
		this.Data_Temp().splice(Math.round(Math.random() * 20) , 0, _uxr_gem );
		return;
	};
    this.Init_Data = function ()
	{	//	console.debug("this.Init_Data");
		let _temp_data = [];
        const _seed = 100;
		let _range = Math.floor( Math.random() * _seed ) + _seed;
		//	console.debug( "Data:_range", _range );

        for ( let i = 0; i < _range; i++ )
        {
			let _item = new DataRow_ViewModel();
			_item.ResourceType( FilterViewModelTypes.ResourceTypes.data[89] ); // "virtual machines"
			_item.ResourceTypeIcon( "svg/vms.svg" );
			//	this.Data_Temp.push( _item );
			this.Data_Temp.push( _item );
			//	console.debug( "_item.IP_Address()", _item.IP_Address() );
        }

		this.ADD_UXR_EGG();

		this.Data( this.Data_Temp() );

		this.Compute_PagingControls();
		//	this.Compute_TypeCounts();
		//	this.SetInit_AllFilters();
		this.SetPillsDefault();

		return;
    };

	// ok, now do these things.
	this.Init_Data();
	//	this.OnClick_OpenClose_FacetPanel();

    return;
};