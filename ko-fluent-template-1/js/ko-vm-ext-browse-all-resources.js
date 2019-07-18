/// <reference path="../script/knockout-3.5.0.js" />
/// "Browsing_ViewModel" ViewModel V.1.1.0

"use strict";
function BrowseAllResources_ViewModel(parentViewModel)
{	//	console.debug("Browsing_ViewModel", parentViewModel);
	ko.utils.extend(this, new Extension_ViewModel(parentViewModel));
	const _self = this;

	this.ExtensionName("Browse All Resources");
	this.BladeIcon( SVG.Color.AllResources_color.SVG );
	this.NavIcon( SVG.Color.AllResources_color.SVG );
	this.BladeName("All resources");
	this.BladeSubName("");
	this.ExtensionTemplateName("KO-Extensions-BrowseAllResources-Template");
	//this.ContextBladeViewModel();
	this.IsVisible_TagsColumn = ko.observable( false );
	this.GlobalPillsFilters = ko.observableArray( [] );

	this._crumbs = [
		"Home",
		this.BladeName()
	];
	this.BreadCrumbs(this._crumbs);


	// command button functions
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ShowCommandButtonContextBlade" );
		let _blank_context = new ContextBlade_ViewModel( _self, "Add a resource" );
		_blank_context.Subtitle( "" );
		_blank_context.IsSelected( true );
		_blank_context.Index( 0 );

		//let _cd = new ColumnsEditor_ContextBlade_ViewModel( this );
		//_cd.IsSelected( true );
		//_cd.Index( 1 );
		//_self.ParentViewModel().CurrentContextBladeViewModel( [_blank_context, _cd] );
		//_self.ParentViewModel().CurrentContextSize( _cd.BladeSize() );

		_self.ParentViewModel().CurrentContextBladeViewModel( [_blank_context] );
		_self.ParentViewModel().CurrentContextSize( _blank_context.BladeSize() );
		_self.ParentViewModel().ContextBlade_OpenClosed( true );

		return;
	};
	// general context blade open/close function
	this.OnClick_ShowContextBlade_Columns = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowContextBlade_Columns");
		let _cd = new ColumnsEditor_ContextBlade_ViewModel( _self );
		_cd.IsSelected( true );
		_cd.Index( 0 );

		_self.ParentViewModel().CurrentContextBladeViewModel( [ _cd] );
		_self.ParentViewModel().CurrentContextSize( _cd.BladeSize() );
		_self.ParentViewModel().ContextBlade_OpenClosed( true );
		return;
	};
	// context blade for adding/editing tags on a data row
	this.OnClick_ShowContext_TagsEditor = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowContextBlade_Columns", vm );

		let _selected_resources = _self.Data().filter( function ( item )
		{
			let _rv;
			if ( item.IsRowSelected() == true )
			{ _rv = item; }
			return _rv;
		} );
		//	console.debug( "_selected_resources", _selected_resources );

		let _te = new TagEditor_ContextBlade_ViewModel( _self, _selected_resources );
		_te.IsSelected( true );
		_te.Index( 0 );
		//	_te.ViewModels();

		_self.ParentViewModel().CurrentContextBladeViewModel( [_te] );
		_self.ParentViewModel().CurrentContextSize( _te.BladeSize() );
		_self.ParentViewModel().ContextBlade_OpenClosed( true );
		return;
	};

	this._cmd_btns = [
		new CommandBarButton({ Text: "Add", Image: SVG.Shell.CreateHub.SVG, Action: this.OnClick_ShowCommandButtonContextBlade }),
		new CommandBarButton( { Text: "Edit columns", Image: SVG.Columns.SVG, Action: this.OnClick_ShowContextBlade_Columns } ),
		new CommandBarButton( { Text: "Refresh", Image: SVG.Refresh.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Assign tags", Image: SVG.Tag_m.SVG, Action: this.OnClick_ShowContext_TagsEditor } ),
		new CommandBarButton( { Text: "Delete", Image: SVG.Delete.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
		new CommandBarButton( { Text: "Export", Image: SVG.Download.SVG, Action: this.OnClick_ShowCommandButtonContextBlade } ),
	];
	this.CommandButtons(this._cmd_btns);

	// EVENTS COMMAND BUTTON BAR
	// CALLED FROM PARENTVIEWMODEL,
	this.CloseAllFilterDropdowns = function ()
	{	//	console.debug( "vms- CloseAllFilterDropdowns" );
		//	console.debug( "close pills" );
		this.GlobalPillsFilters().forEach( function ( v, i, a )
		{	//	console.debug( "close pills\t", i, v.SelectedKey() );
			v.CloseAllDropDowns()
			return;
		} );

		return;
	}
	// CALLE FROM DATAGRID ITEMS
	this.OnClick_OpenResourceBlade = function ( vm, ev )
	{
		_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[8] );
		return;
	};


	// data
	this.PagesNumbersArray = ko.observableArray([]);
	this.NumberOfDataPages = ko.observable();
	this.Data_Temp = ko.observableArray([]);
	this.Data = ko.observableArray([]);
	this.TotalDataCount = ko.computed(function () {
		let _num_of_pages = Math.round(this.Data().length / 33);
		this.NumberOfDataPages(_num_of_pages);

		let _page_array = [];
		for (let i = 0; i < _num_of_pages; i++) {
			_page_array.push(i + 1);
		}
		this.PagesNumbersArray(_page_array);


		let _item = "";
		let _item_text = "item";

		let _total_count = _self.Data_Temp().length;
		let _filter_count = _self.Data().length;

		if (_filter_count == 0) {
			_item = "No items of " + _total_count + " items";
		}
		else if (_filter_count == 1) {
			_item = "One item of " + _total_count + " items";
		}
		else {
			_item = _filter_count + " items of " + _total_count + " items";
		}

		return _item;
	}, this);


	// Pills collection stuffz
	this.SetPillsDefault = function ()
	{	//	.debug( "SetPillsDefault" );
		let _default_pills = [];

		// search pill
		let _search_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_search_pill.CloseAllDropDowns();
		_search_pill.IsSearchPill( true );
		_default_pills.push( _search_pill );

		// subs pill
		let _subs_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_subs_pill.IsVisible( true );
		_subs_pill.IsRemovable( false );
		_subs_pill.IsTagsPill( false );
		_subs_pill.HasOperators( false );
		_subs_pill.OnClick_SelectKey( _subs_pill.KeyData()[0], null );
		_subs_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			//	console.debug( "browse subs", i, v.Title(), v.IsChecked() );
			v.IsChecked( true );
		} );
		_subs_pill.CloseAllDropDowns();
		_default_pills.push( _subs_pill );

		// res groups pill
		let _rgs_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_rgs_pill.IsVisible( true );
		_rgs_pill.IsRemovable( false );
		_rgs_pill.IsTagsPill( false );
		_rgs_pill.HasOperators( false );
		_rgs_pill.OnClick_SelectKey( _subs_pill.KeyData()[1], null );
		_rgs_pill.ValuesListOpen( false );
		_rgs_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			v.IsChecked( true );
		} );
		_default_pills.push( _rgs_pill );

		// locations pill
		let _locations_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_locations_pill.IsVisible( true );
		_locations_pill.IsRemovable( false );
		_locations_pill.IsTagsPill( false );
		_locations_pill.HasOperators( false );
		_locations_pill.OnClick_SelectKey( _subs_pill.KeyData()[2], null );
		_locations_pill.ValuesListOpen( false );
		_locations_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			v.IsChecked( true );
		} );
		_default_pills.push( _locations_pill );

		// types pill
		let _types_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_types_pill.IsVisible( true );
		_types_pill.IsRemovable( false );
		_types_pill.IsTagsPill( false );
		_types_pill.HasOperators( false );
		_types_pill.OnClick_SelectKey( _subs_pill.KeyData()[3], null );
		_types_pill.ValuesListOpen( false );
		_types_pill.KeyValueData().forEach( function ( v, i, a )
		{	//	console.debug( "tags", i, v );
			v.IsChecked( true );
		} );
		_default_pills.push( _types_pill );

		//// tags pill
		let _tags_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_tags_pill.IsVisible( true );
		_tags_pill.IsRemovable( false );
		_tags_pill.IsTagsPill( true );
		_tags_pill.OnClick_SelectKey( _subs_pill.KeyData()[4], null );
		_tags_pill.ValuesListOpen( false );
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

		// reset pill
		let _reset_pill = new Pill_ViewModel( _self, BrowseAll_PillsData );
		_reset_pill.IsVisible( true );
		_reset_pill.IsRemovable( false );
		_reset_pill.HasOperators( false );
		_reset_pill.IsSearchPill( false );
		_reset_pill.CloseAllDropDowns();
		_reset_pill.IsAddPill( false );
		_reset_pill.IsTagsPill( false );
		_reset_pill.IsResetPill( true );
		_default_pills.push( _reset_pill );

		this.GlobalPillsFilters( _default_pills );
		this.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].CloseAllDropDowns();

		return;
	};
	this.Add_GlobalPills = function (vm, ev) {	//	close the add filters pill drop down
		//	console.debug( "Add_GlobalPills", vm, _self );
		//	console.debug( "Add_GlobalPills", vm.Title() );

		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].CloseAllDropDowns();

		// get selected title
		let _vm_title = vm.Title();

		// get index from raw data, for selecting in the pill
		let _vmpd_index = VirtualMachine_PillsData.findIndex(function (item) {	//	console.debug( "item", item.title, _vm_title, vm.Title() );
			return item.title == _vm_title;
		});
		//	console.debug( "_vmpd_index", _vmpd_index, VirtualMachine_PillsData[_vmpd_index] );

		// create new pill
		let _new_pill = new Pill_ViewModel(_self, [VirtualMachine_PillsData[_vmpd_index]]);
		_new_pill.IsVisible(true);
		_new_pill.IsRemovable(true);
		_new_pill.OnClick_SelectKey(_new_pill.KeyData()[0], null);
		_new_pill.KeyValueData().forEach(function (v, i, a) {
			v.IsChecked(false);
		});
		_new_pill.CloseAllDropDowns();
		_new_pill.ValuesListOpen(true);

		let _prev_array = _self.GlobalPillsFilters().filter(function (item) {
			return item.IsSearchPill() == false || item.IsAddPill() == false;
		});

		_prev_array.splice(_prev_array.length - 1, 0, _new_pill);
		_self.GlobalPillsFilters(_prev_array);

		// remove from add filters list
		let _remaining = _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().filter(function (item) {	//	console.debug( "add filter", item );
			if (item.title !== _vm_title) {
				return item;
			}
			else {
				return;
			}
		});
		//	console.debug( "_remaining", _remaining );

		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData(_remaining);

		return;
	};
	this.Remove_SelectedPill = function (vm, ev) {	//	console.debug( "Remove_SelectedPill", vm, _self );
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].CloseAllDropDowns();

		// filter out the clicked pill viewmodel
		let _filtered = _self.GlobalPillsFilters().filter(function (item) {	//	console.debug( "item", item.ID(), vm.ID() );
			return vm.ID() !== item.ID();
		}); //	console.debug( "_filtered", _filtered );
		_self.GlobalPillsFilters(_filtered);

		//	console.debug( _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].Title() );
		//_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().forEach( function ( v, i, a )
		//{
		//	console.debug( i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		let _re = BrowseAll_PillsData.filter(function (v, i, a) {	//	console.debug( i, v.title );
			return v.title == vm.SelectedKey();
		});
		//	console.debug( "_re", _re );

		// find the removed pill and re-add it to the add filters pill data
		let _removed = new FilterData_ViewModel(_re[0].title, _re[0].data);

		let _prev = _self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData();
		_prev.push(_removed);

		_prev.sort(function (a, b) {
			//	console.debug( a.title, b.title );
			if (b.Title() > a.Title()) {
				return -1;
			}
			else if (b.Title() == a.Title()) {
				return 0;
			}
			else if (b.Title() < a.Title()) {
				return 1;
			}

			return;
		});

		// add recomputed array?
		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData([]);

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

		_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData(_prev);

		//_self.GlobalPillsFilters()[_self.GlobalPillsFilters().length - 1].KeyData().forEach( function ( v, i, a )
		//{
		//	console.debug("add", i, v.Title() );//	, v.Data() );
		//	return;
		//} );

		// redo query filtering
		_self.Compute_GlobalFilter_Data_Lists();

		// reset add pill button visible setting
		_self.Visible_AllFiltersUsed(false);
		return;
	};
	this.OnClick_ResetPillsToDefaultState = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ResetPillsToDefaultState", vm, ev );
		_self.SetPillsDefault();
		_self.Compute_GlobalFilter_Data_Lists();
		return;
	};
	this.Close_AllPillDropDowns = function (vm, ev) {
		this.GlobalPillsFilters().forEach(function (v, i, a) {
			if (v !== vm) {
				v.CloseAllDropDowns();
			}
		});
		return;
	};

	/* filtering methods */
	// search box pill
	this.SearchBoxValue = ko.observable( "" );
	this.SearchBoxValue.subscribe( function ( newValue )
	{	//	console.debug( "FilterSearchBox", newValue, _self.Data().length, _self.Data_Temp().length );
		_self.Compute_GlobalFilter_Data_Lists();
		//	console.debug( "_self.Data().length", _self.Data().length );
		return;
	}, this );
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
	this.FilterCascade = function (filter, filterKey, dataSet) {	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length );
		let _selected_keys = [];
		filter.Data_Temp().forEach(function (v, i, a) {   //	console.debug("FilterCascade", i, v.Title(), v.IsChecked() );
			if (v.IsChecked() == true) {
				_selected_keys.push(v.Title());
			}
		});
		//	 console.debug( "_selected_keys", _selected_keys );

		let _return_results = [];
		dataSet.forEach(function (v, i, a) {   //	console.debug( i, v.ResourceName(), v.TagsCollection().length, _selected_keys.length );
			if (_selected_keys.length !== 0) {	//	special for tags filters
				_selected_keys.forEach(function (v2, i2, a2) {   //  console.debug( i2, v2 );
					if (v[filterKey]() == v2) {
						_return_results.push(v);
					}
				});
			}
			else {
				_return_results.push(v);
			}
			return;
		});
		//	console.debug( filterKey, "_return_results", _return_results.length );
		return _return_results;
	};
	this.Pills_FilterCascade = function (filter, filterKey, dataSet) {	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length );
		let _selected_keys = [];
		let _return_results = [];

		// for tags & not tags pills
		filter.KeyValueData().forEach(function (v, i, a) {   //	
			//	console.debug( "FilterCascade", i, v.Title(), v.IsChecked() );
			if (v.IsChecked() == true) {
				if (filterKey !== FilterViewModelTypes.TagsList.filterColumnKey) {	// not tags
					_selected_keys.push(v.Title());
				}
				else if (filterKey == FilterViewModelTypes.TagsList.filterColumnKey) {	//tags
					//	console.debug( "FilterCascade", i, v.Title(), v.IsChecked() );
					v.Data().forEach(function (v2, i2, a2) {
						if (v2.IsChecked() == true) {
							let _tag = new Tag();
							_tag.Title(v.Title());
							_tag.Value(v2.Title());

							_selected_keys.push(_tag);
						}
						return;
					});
				}
			}
			return;
		});
		//	console.debug( "_selected_keys.length", _selected_keys.length );

		dataSet.forEach(function (v, i, a) {   //	console.debug( i, v.ResourceName(), v.Subscription(), v.IP_Address(), _selected_keys.length );
			if (_selected_keys.length !== 0) {
				//	NOT TAGS
				if (filterKey !== FilterViewModelTypes.TagsList.filterColumnKey) {
					_selected_keys.forEach(function (v2, i2, a2) {   //  console.debug( i2, v2 );
						if (v[filterKey]() == v2) {
							_return_results.push(v);
						}
						return;
					});
				}
				else if (filterKey == FilterViewModelTypes.TagsList.filterColumnKey) {	//	console.debug( "FilterCascade", filter.Title(), filterKey, dataSet.length, i, v, v.TagsCollection().length );
					let _match = false;

					v.TagsCollection().forEach(function (val, idx, arr) {	//	console.debug( i, v.ResourceName(), val.Title(), val.Value() );
						_selected_keys.forEach(function (v2, i2, a2) {   //	console.debug( i, idx, i2, v2.Title(), v2.Value() );
							if (val.Title() == v2.Title() && val.Value() == v2.Value()) {
								_match = true;
								return;
							}
							return;
						});
						return;
					});

					//	console.debug( "_match", _match );
					if (_match == true) {
						_return_results.push(v);
					}
				}
			}
			else {
				_return_results.push(v);
			}
			return;
		});

		//	console.debug( filterKey, "_return_results", _return_results.length );
		return _return_results;
	};

	// special case for filtering tags
	this.FilterCascadeTags = function (dataSet) {	//	console.debug( "FilterCascadeTags", dataSet.length );
		let _results = [];
		let _selected_tags = [];

		this.TagsFilter.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.Tags().length );
			if (i !== 0) {
				let _group_name = v.Title();
				v.Tags().forEach(function (v2, i2, a2) {
					if (v2.IsChecked() == true) {	//	console.debug( i2, v2.Title(), v2.IsChecked() );
						let _temp = _group_name + " : " + v2.Title();
						_selected_tags.push(_temp);
					}
					return;
				});
			}
			return;
		});

		//	console.debug( "_selected_tags", _selected_tags.length );
		//	console.debug("this.TagsFilter.Data_Temp()[0].IsChecked()",this.TagsFilter.Data_Temp()[0].IsChecked());

		if (_selected_tags.length > 0) {	//	console.debug( " this.TagsFilter.TagsFilterType();",  this.TagsFilter.TagsFilterType() );
			if (this.TagsFilter.TagsFilterType() == "all") {
				dataSet.forEach(function (v, i, a) {	//	console.debug( i, v.ResourceName() );
					let _all_matched = 0;

					v.TagsCollection().forEach(function (v2, i2, a2) {
						let _tag = v2.Title() + " : " + v2.Value();
						//	console.debug( i, i2, _tag );
						_selected_tags.forEach(function (v3, i3, a3) {	//	console.debug( i, i2, i3, v3 );
							if (v3 == _tag) {
								//	_results.push( v );
								_all_matched++;
							}
							return;
						});
						return;
					});

					//	console.debug( "MATCH??", _all_matched, _selected_tags.length );

					if (_all_matched > 0) {
						if (_all_matched == _selected_tags.length) {
							_results.push(v);
						}
					}
					return;
				});
			}
			else if (this.TagsFilter.TagsFilterType() == "all" && this.TagsFilter.Data_Temp()[0].IsChecked() == true) {
				_results = [];
			}
			else if (this.TagsFilter.TagsFilterType() == "any" && this.TagsFilter.Data_Temp()[0].IsChecked() == false) {
				dataSet.forEach(function (v, i, a) {	//	console.debug( i, v.ResourceName() );
					v.TagsCollection().forEach(function (v2, i2, a2) {
						let _tag = v2.Title() + " : " + v2.Value();
						//	console.debug( i, i2, _tag );
						_selected_tags.forEach(function (v3, i3, a3) {	//	console.debug( i, i2, i3, v3 );
							if (v3 == _tag) {
								_results.push(v);
							}
							return;
						});
						return;
					});
					return;
				});
			}
			else if (this.TagsFilter.TagsFilterType() == "any" && this.TagsFilter.Data_Temp()[0].IsChecked() == true) {
				_results = dataSet;
			}
		}
		else {
			_results = dataSet;
		}

		//	console.debug( "FilterCascadeTags::_results", _results.length );
		return _results;
	};
	this.PopulateFilterDataCount = function (filter, map) {	//	console.debug( "this.PopulateFilterDataCount", filter, map );
		//	console.debug( "this.PopulateFilterDataCount");
		let _temp = 0;
		let _arr = [];

		//	initial run, not yet populate, create new list
		if (filter.Data_Temp().length == 0) {
			map.forEach(function (value, key, arr) {	//	console.debug( key, value );
				_arr.push({ key, value });
				return;
			});

			_arr.push({ key: "Select all", value: _self.Data_Temp().length });
			_arr.sort(function (a, b) {
				//	console.debug( a, b );
				return b.value - a.value;
			});

			_arr.forEach(function (v, i, a) {
				//	console.debug("PopulateFilterDataCount", i, v );
				let _fdvm = new FilterData_ViewModel();
				_fdvm.Title(v.key);
				_fdvm._ItemCount(v.value);
				_fdvm.IsChecked(false);

				if (v.key == "Select all") {
					_fdvm.IsSelectAll(true);
				}

				filter.Data_Temp.push(_fdvm);
				return;
			});

			//console.debug( filter.Data_Temp().length );
			//console.debug( filter.Data().length );
			//console.debug( "BREAK" );

		} // subsequent runs, should be populated, just changing values
		else if (filter.Data_Temp().length !== 0) {
			filter.Data_Temp().forEach(function (v, i, a) {
				//	console.debug( i, v.Title(), v._ItemCount(), v.IsChecked() );
				let _temp;
				map.forEach(function (value, key, arr) {	//    console.debug( v.Title(), key, value );
					if (v.Title() == key) {
						_temp = value;
					}
				});

				if (_temp !== undefined) {
					v._ItemCount(_temp);
				}
				else {
					if (v.Title() == "Select all") {
						v._ItemCount(_self.Data_Temp().length);
					}
					else {
						v._ItemCount(0);
					}
				}
				//    console.debug("_temp", _temp);
				return;

			});

			//console.debug( filter.Data_Temp().length );
			//console.debug( filter.Data().length );
			//console.debug( "BREAK" );
		}
		return;
	};
	this.Compute_TypeCounts = function () {	//	
		//	console.debug( "Compute_TypeCounts::this.Data().length", this.Data().length, this.Data_Temp().length );
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
		// no ip address count needed
		let _count_tags = new Map();

		let _current_data = [];
		if (this.Data().length == this.Data_Temp().length) {
			_current_data = this.Data_Temp();
		}
		else if (this.Data().length !== this.Data_Temp().length) {
			_current_data = this.Data();
		}

		_current_data.forEach(function (v, i, a) {	//	console.debug( i, v.ResourceName(), v.ResourceType() );
			// get Subscription counts
			if (_count_subs.has(v.Subscription()) == true) {   //  console.debug( "true", _count_res_type_map.has( item.Subscription() ) );
				let _found = _count_subs.get(v.Subscription());
				_count_subs.set(v.Subscription(), _found + 1);
			}
			else {   //  console.debug( "false", _count_res_type_map.has( v.Subscription() ) );
				_count_subs.set(v.Subscription(), 1);
			}

			// get Location counts
			if (_count_locations.has(v.ResourceLocation()) == true) {   //  console.debug( "true", _count_map.has( item.ResourceLocation() ) );
				let _found = _count_locations.get(v.ResourceLocation());
				_count_locations.set(v.ResourceLocation(), _found + 1);
			}
			else {   //  console.debug( "false", _count_map.has( v.ResourceLocation() ) );
				_count_locations.set(v.ResourceLocation(), 1);
			}

			// get ResourcGrp counts
			if (_count_r_groups.has(v.ResourceGroup()) == true) {   //  console.debug( "true", _count_r_groups.has( item.ResourceGroup() ) );
				let _found = _count_r_groups.get(v.ResourceGroup());
				_count_r_groups.set(v.ResourceGroup(), _found + 1);
			}
			else {   //  console.debug( "false", _count_r_groups.has( v.ResourceType() ) );
				_count_r_groups.set(v.ResourceGroup(), 1);
			}

			// get ResourceType counts
			if (_count_res_type_map.has(v.ResourceType()) == true) {   //  console.debug( "true", _count_res_type_map.has( item.ResourceType() ) );
				let _found = _count_res_type_map.get(v.ResourceType());
				_count_res_type_map.set(v.ResourceType(), _found + 1);
			}
			else {   //  console.debug( "false", _count_map.has( v.ResourceType() ) );
				_count_res_type_map.set(v.ResourceType(), 1);
			}

			// avail sets
			if (_count_avaiL_set.has(v.AvailabilitySet()) == true) {   //  console.debug( "true", _count_avaiL_set.has( item.ResourceType() ) );
				let _found = _count_avaiL_set.get(v.AvailabilitySet());
				_count_avaiL_set.set(v.AvailabilitySet(), _found + 1);
			}
			else {   //  console.debug( "false", _count_avaiL_set.has( v.ResourceType() ) );
				_count_avaiL_set.set(v.AvailabilitySet(), 1);
			}

			// _count_vnet
			if (_count_vnet.has(v.VirtualNetwork()) == true) {   //  console.debug( "true", _count_vnet.has( item.VirtualNetwork() ) );
				let _found = _count_vnet.get(v.VirtualNetwork());
				_count_vnet.set(v.VirtualNetwork(), _found + 1);
			}
			else {   //  console.debug( "false", _count_vnet.has( v.ResourceType() ) );
				_count_vnet.set(v.VirtualNetwork(), 1);
			}

			// count OperatingSystem
			if (_count_os.has(v.OperatingSystem()) == true) {   //  console.debug( "true", _count_os.has( _item.OperatingSystem() ) );
				let _found = _count_os.get(v.OperatingSystem());
				_count_os.set(v.OperatingSystem(), _found + 1);
			}
			else {   //  console.debug( "false", _count_map.has( v.ResourceType() ) );
				_count_os.set(v.OperatingSystem(), 1);
			}
			//  console.debug( "_count_os", _count_os );

			//_count_disk
			if (_count_disk.has(v.Disk()) == true) {   //  console.debug( "true", _count_disk.has( _item.Disk() ) );
				let _found = _count_disk.get(v.Disk());
				_count_disk.set(v.Disk(), _found + 1);
			}
			else {   //  console.debug( "false", _count_disk.has( v.Disk() ) );
				_count_disk.set(v.Disk(), 1);
			}

			//_count_status
			if (_count_status.has(v.Status()) == true) {   //  console.debug( "true", _count_status.has( _item.Status() ) );
				let _found = _count_status.get(v.Status());
				_count_status.set(v.Status(), _found + 1);
			}
			else {   //  console.debug( "false", _count_status.has( v.Status() ) );
				_count_status.set(v.Status(), 1);
			}

			//_count_app_type
			if (_count_app_type.has(v.AppType()) == true) {   //  console.debug( "true", _count_app_type.has( _item.AppType() ) );
				let _found = _count_app_type.get(v.AppType());
				_count_app_type.set(v.AppType(), _found + 1);
			}
			else {   //  console.debug( "false", _count_app_type.has( v.AppType() ) );
				_count_app_type.set(v.AppType(), 1);
			}

			//_count_app_svc
			if (_count_app_svc.has(v.AppServicePlan()) == true) {   //  console.debug( "true", _count_app_svc.has( _item.AppServicePlan() ) );
				let _found = _count_app_svc.get(v.AppServicePlan());
				_count_app_svc.set(v.AppServicePlan(), _found + 1);
			}
			else {   //  console.debug( "false", _count_app_svc.has( v.AppServicePlan() ) );
				_count_app_svc.set(v.AppServicePlan(), 1);
			}

			//_count_pricing
			if (_count_pricing.has(v.PricingTier()) == true) {   //  console.debug( "true", _count_pricing.has( _item.PrivingTier() ) );
				let _found = _count_pricing.get(v.PricingTier());
				_count_pricing.set(v.PricingTier(), _found + 1);
			}
			else {   //  console.debug( "false", _count_pricing.has( v.PrivingTier() ) );
				_count_pricing.set(v.PricingTier(), 1);
			}

			// tags list _ _count_tags
			// custom behavior for tags
			// tags need to be broken out by collections 
			// and also by specific tags for the "top 5"

			//	console.debug( "v.TagsCollection()", v.ResourceName(), v.TagsCollection().length );
			if (v.TagsCollection().length > 0) {
				v.TagsCollection().forEach(function (val, idx, arr) {	///	console.debug( idx, val.Title(), val.Value() );
					let _new_map_value = val.Title() + " : " + val.Value();

					if (_count_tags.has(_new_map_value) == true) {   //  console.debug( "true", _count_pricing.has( _item.PrivingTier() ) );
						let _found = _count_tags.get(_new_map_value);
						_count_tags.set(_new_map_value, _found + 1);
					}
					else {   //  console.debug( "false", _count_pricing.has( v.PrivingTier() ) );
						_count_tags.set(_new_map_value, 1);
					}

					return;
				});
			}

			return;
		});

		// refactored for all the swapping and counting of data per control
		// set counts & sort
		this.PopulateFilterDataCount(this.SubscriptionFilter, _count_subs);
		this.PopulateFilterDataCount(this.ResourceGroupFilter, _count_r_groups);
		this.PopulateFilterDataCount(this.ResourceTypesFilter, _count_res_type_map);
		this.PopulateFilterDataCount(this.DataLocationFilter, _count_locations);
		this.PopulateFilterDataCount(this.AvailSetFilter, _count_avaiL_set);
		this.PopulateFilterDataCount(this.VirtualNetworkFilter, _count_vnet);
		this.PopulateFilterDataCount(this.OSFilter, _count_os);
		this.PopulateFilterDataCount(this.DisksFilter, _count_disk);
		this.PopulateFilterDataCount(this.StatusFilter, _count_status);
		this.PopulateFilterDataCount(this.AppTypeFilter, _count_app_type);
		this.PopulateFilterDataCount(this.AppServicePlanFilter, _count_app_svc);
		this.PopulateFilterDataCount(this.PricingTiersFilter, _count_pricing);

		// tags list _ _count_tags
		// custom behavior for tags
		// tags need to be broken out by collections 
		// and also by specific tags for the "top 5"
		this.PopulateFilterDataCount(this.TagsFilter, _count_tags);

		return;
	};
	this.Special_Check_IP_SearchString = function (values) {
		let _rv = [];
		values.forEach(function (v, i, a) {   //  console.debug( i, _self.IPFilter.SearchString(), v.ResourceName(), v.IP_Address() );
			if (_self.IPFilter.SearchString() !== undefined) {
				if (_self.IPFilter.SearchString().length > 0) {   //  
					//	console.debug(_self.IPFilter.SearchString() , "v.IP_Address()", v.IP_Address() );

					if (v.IP_Address().indexOf(_self.IPFilter.SearchString()) != -1) {
						//console.debug( "v.IP_Address().indexOf(_self.IPFilter.SearchString())", v.IP_Address().indexOf( _self.IPFilter.SearchString() ) );

						_rv.push(v);
					}
				}
				else {
					_rv.push(v);
				}
			}
			else {
				_rv.push(v);
			}
			return;
		});
		//	console.debug( "_rv", _rv.length, "values", values.length );
		return _rv;
	};

	// MAIN FILTERING FUNCTION
	this.Compute_GlobalFilter_Data_Lists = function ()
	{	//	console.debug( "Compute_GlobalFilter_Data_Lists -- CHANGE LOGIC BASED ON WITH 
		let _results_14 = this.Data_Temp();
		let _temp_pills_data = [];	//	_self.Data_Temp();
		this.GlobalPillsFilters().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.SelectedKey(), v.KeyValueData(), v.IsAddPill(), v.IsSearchPill() );
			if (v.IsAddPill() == false && v.IsSearchPill() == false) {
				//console.debug( i, v.Title(), v.SelectedKey(), v.FilterKey(), v.KeyValueData(), v.IsTagsPill() );
				//	console.debug( i, v.Title(), v.SelectedKey(), v.FilterKey(), v.KeyValueData() );
				_temp_pills_data = _self.Pills_FilterCascade(v, v.FilterKey(), _results_14);
				_results_14 = _temp_pills_data;
			}
			return;
		});

		//	test search box
		let _after_search_results = this.FilterSearchBox(_self.SearchBoxValue, _results_14);

		//	console.debug("_after_search_results.length", _after_search_results.length);
		this.Data(_after_search_results);
		return;
	};

	// init & init_data
	this._tags_data = [];
	this.Parse_TagsData_ForPills = function () {
		this.Data_Temp().forEach(function (val, idx, arr) {
			val.TagsCollection().forEach(function (v, i, a) {
				console.debug("_uxr_gem.TagsCollection()", i, v.Title(), v.Value());

				let _tag_fdvm = new FilterData_ViewModel();
				_tag_fdvm.Title(v.Title() + ":" + v.Value());

				_self._tags_data.push(_tag_fdvm);

				return;
			});
			return;
		});
		return;
	};

	// add UXR easter egg
	this.ADD_UXR_EGG = function () {
		// set for UXR testing 
		let _uxr_gem = new DataRow_ViewModel();
		_uxr_gem.Subscription(FilterViewModelTypes.Subscriptions.data[1]); // "Fabrikam"
		_uxr_gem.ResourceGroup(FilterViewModelTypes.ResourceGroups.data[0]); // 	"Fabrikam Public Portal RG 1",
		_uxr_gem.ResourceType(FilterViewModelTypes.ResourceTypes.data[89]); //	"virtual machines"
		_uxr_gem.ResourceTypeIcon("svg/vms.svg");
		_uxr_gem.ResourceLocation(FilterViewModelTypes.DataLocations.data[0]); // "US West 1",
		_uxr_gem.IP_Address("113.10.27.192");
		_uxr_gem.ResourceName("FABRIKAM-VM-2020");
		_uxr_gem.OperatingSystem(FilterViewModelTypes.OSTypes.data[1]); // "Linux"
		_uxr_gem.Status(FilterViewModelTypes.Status.data[0]); // "Running"

		//	pre-defined "tags" from FilterViewModelTypes.TagsList.data.length
		let _uxr_tag_array = [];

		//	 FilterViewModelTypes.TagsList.data[3] -- department - "engineering"
		let _tag_dept = new Tag();
		_tag_dept.Title(FilterViewModelTypes.TagsList.data[3].name);
		_tag_dept.Value(FilterViewModelTypes.TagsList.data[3].list[1]);
		_uxr_tag_array.push(_tag_dept);

		//	FilterViewModelTypes.TagsList.data[4] -- created - "April 2018"
		let _tag_created = new Tag();
		_tag_created.Title(FilterViewModelTypes.TagsList.data[4].name);
		_tag_created.Value(FilterViewModelTypes.TagsList.data[4].list[1]);
		_uxr_tag_array.push(_tag_created);

		//	FilterViewModelTypes.TagsList.data[5] -- AppName  -- "Fabrikam"
		let _tag_app_name = new Tag();
		_tag_app_name.Title(FilterViewModelTypes.TagsList.data[5].name);
		_tag_app_name.Value(FilterViewModelTypes.TagsList.data[5].list[1]);
		_uxr_tag_array.push(_tag_app_name);

		//	FilterViewModelTypes.TagsList.data[6] -- location - "west2"
		let _tag_location = new Tag();
		_tag_location.Title(FilterViewModelTypes.TagsList.data[6].name);
		_tag_location.Value(FilterViewModelTypes.TagsList.data[6].list[1]);
		_uxr_tag_array.push(_tag_location);

		//	FilterViewModelTypes.TagsList.data[7] -- createdby -- "april@reagan.com"
		let _tag_created_by = new Tag();
		_tag_created_by.Title(FilterViewModelTypes.TagsList.data[7].name);
		_tag_created_by.Value(FilterViewModelTypes.TagsList.data[7].list[1]);
		_uxr_tag_array.push(_tag_created_by);

		_uxr_gem.TagsCollection(_uxr_tag_array);
		//console.debug( "_uxr_gem", _uxr_gem );
		//_uxr_gem.TagsCollection().forEach( function (v,i,a)
		//{
		//	console.debug( "_uxr_gem.TagsCollection()", i, v.Title(), v.Value() );
		//	return;
		//} );

		// TRY TO KEEP THE SPECIFIED DATAROW FOR UXR WITHIN THE FIRST 20 ROWS
		this.Data_Temp().splice(Math.round(Math.random() * 20), 0, _uxr_gem);
		return;
	};

	this.Init_Data = function ()
	{	//	console.debug("this.Init_Data");
		const _seed = 100;
		let _range = Math.floor(Math.random() * _seed) + _seed;
		//	console.debug( "Browsing_ViewModel::Data:_range", _range );

		for (let i = 0; i < _range; i++) {
			let _item = new DataRow_ViewModel();
			this.Data_Temp.push(_item);
		}

		this.ADD_UXR_EGG();
		//	this.Parse_TagsData_ForPills();

		this.Data( this.Data_Temp() );

		this.SetPillsDefault();
		return;
	};

	// INIT
	this.Init_Data();
	return;
};