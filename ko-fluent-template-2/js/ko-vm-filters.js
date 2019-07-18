/// <reference path="../script/knockout-3.4.2.js" />
/// "Filter_ViewModel" ViewModel V.1.1

"use strict";
function FilterData_ViewModel(title, data)
{
	let _self = this;
	this.Type = ko.observable(this.constructor.name);
	this.ID = ko.pureComputed(function () { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
	this.Title = ko.observable(title || "");
	this.IsChecked = ko.observable(false);
	this.IsSelectAll = ko.observable(false);
	this._ItemCount = ko.observable(999);
	this.ItemCount = ko.computed(function () {
		if (this._ItemCount() == 999) {
			let random = Math.round(Math.random() * 10);
			this._ItemCount(random);
		};
		return "(" + this._ItemCount() + ")";
	}, this);
	this.Description = ko.observable("");
	this.Data = ko.observableArray(data || []);
	this.IsGroup = ko.observable(false);
	return;
};

function Filter_ViewModel(fvmType, parent)
{
	let _self = this;
	this.ID = ko.pureComputed(function () { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
	this.Title = ko.observable(fvmType.title);

	this.ParentViewModel = parent;
	this.FilterIsVisible = ko.observable(true);
	this.FilterIsAvailable = ko.observable(true);
	this.IsFading = ko.observable(false);
	this.HasPillsStyle = ko.observable(false);
	this.IsBeingUsed = ko.observable(false);

	//	tied deeply to the "DataRow_ViewModel"
	//	console.debug( this.Title(), fvmType.filterColumnKey);
	this.FilterKey = ko.observable(fvmType.filterColumnKey);
	//	console.debug( this.Title(), this.FilterKey() );

	//	tags filter hack
	this.IsTagsFilter = ko.observable(false);
	this.TagsFilterType = ko.observable("all");
	this.TagGroupsCollection = ko.observableArray([]);
	this.OnClick_SelectTagFilterType = function (vm, ev) {   //	console.debug( "OnClick_SelectTagFilterType", vm.TagsFilterType() );
		return true;
	};
	this.OnChange_SelectedTagFilterType = function (vm, ev) {   //		console.debug( "OnChange_SelectedTagFilterType", vm.TagsFilterType() );
		let _data_selected_count = this.Data().filter(function (item) { return item.IsChecked(); });

		if (_data_selected_count.length > 0) {
			console.debug("this.OnChange_SelectedTagFilterType()::_data_selected_count", _data_selected_count);
			this.CloseMoreMenu(vm, ev);
		}
		return true;
	};

	this.Data = ko.observableArray([]);
	this.Data_Temp = ko.observableArray([]);

	// total hack to change UI for "subscriptions" only
	this.IsSubscriptionHack = ko.observable(false);

	// OLD & UNUSED
	// for IP filter hackeyt-hack-hack
	this.HasOnlySearch = ko.observable(false);
	// special methods
	this.IsAddButton = ko.computed(function () {	//	console.debug( " fvmType.isAddButton", fvmType.isAddButton );

		if (fvmType.isAddButton == true) {
			let _data_items = []
			fvmType.data.forEach(function (v, i, a) {	//	console.debug( i, v );
				let _filter_type = new FilterData_ViewModel(v);
				_filter_type.Title(v);
				_filter_type._ItemCount(0);
				_filter_type.IsChecked(false);

				_data_items.push(_filter_type);
				return;
			});

			this.Data_Temp(_data_items);

			return true;
		}
		else if (fvmType.isAddButton == false || fvmType.isAddButton == undefined || fvmType.isAddButton == null || fvmType.isAddButton == "") {
			return false;
		}
	}, this);
	this.AddButtonIcon = ko.observable("svg/add_filter.svg");

	// close icon and methods
	this.FilterCloseIcon = ko.observable("svg/Failed.svg");
	this.IsRemovable = ko.computed(function () {	//	console.debug( " fvmType.IsRemovable", fvmType.isRemovable );
		if (fvmType.isRemovable == true) {
			return true;
		}
		else if (
			fvmType.isRemovable == false ||
			fvmType.isRemovable == undefined ||
			fvmType.isRemovable == null ||
			fvmType.isRemovable == "") {
			return false;
		}
	}, this);

	// search box specific
	// trying to hack an Edge issue with foucsing on an input text element
	this.HasSearchFocus = ko.observable(false);
	this.SearchString = ko.observable();
	this.SearchPlaceholder = ko.computed(function () {
		return "Search " + this.Title();
	}, this);
	this.HasSearch = ko.computed(function () {
		let _bool = true;
		if (fvmType.hasSearch !== undefined && fvmType.hasSearch == false) {
			_bool = false;
		}
		//	console.debug( "HasSearch", _bool );
		return _bool;
	}, this);

	// back button functionality for facet "ResourceType" Filter
	this.HasCheckboxes = ko.observable(true);
	this._back_btn_down = "svg/ChevronDown.svg";
	this._back_btn_left = "svg/ChevronLeft.svg";
	this.BackButton = ko.observable(this._back_btn_down);
	this.PanelIsDisplayed = ko.observable(true);

	this._mmdd_arrow_down = "svg/ChevronDown.svg";
	this._mmdd_arrow_up = "svg/ChevronUp.svg";
	this.MoreMenuArrow = ko.observable(this._mmdd_arrow_down);
	this.MoreMenuIsDisplayed = ko.observable(false);
	this.MorePopup_Top = ko.observable("10px");
	this.MorePopup_Left = ko.observable("13px");
	this.MenuLoadingDisplayed = ko.observable(false);

	// select all functionality
	this.MoreMenu_ID = ko.observable();
	this.ShowAllText_IsDisplayed = ko.observable(false);
	this.ShowAllText = ko.observable();
	this.SearchAllText = ko.observable();
	this.SeeAllText = ko.observable();
	this.SearchToSeeMoreText = ko.observable();
	this.FlyoutDropDown_Strings = ko.computed(function () {	//	console.debug( "this.FlyoutDropDown_Strings", this.Title(), this.Title().length );
		let _new_title = "";
		let _t = this.Title();
		let _s_found = _t.substring(this.Title().length - 1, this.Title().length);
		//	console.debug( "_s_found", _s_found );

		if (_s_found.toLowerCase() != "s") {
			_new_title = this.Title() + "s";
		}
		else {
			_new_title = this.Title();
		}
		_new_title = _new_title.toLowerCase();
		//	console.debug( "_new_title", _new_title );

		this.MoreMenu_ID("dd-" + this.ID());
		if (this.Data_Temp().length > 50) {
			this.ShowAllText_IsDisplayed(true);
			this.ShowAllText("Showing top 100 " + _new_title);
		}
		this.SearchAllText("Search " + _new_title);
		this.SeeAllText("Search " + _new_title);
		this.SearchToSeeMoreText("Search for additional " + _new_title)
		return;
	}, this);

	//	hack - for facets panel
	//	first, hide any global pills drop down menus
	//	second, enable the floating drop down menu for the facets panel drop down menus
	//	-- this was diesign this way to have an overflow menu render over both the facets panel and the content panel
	//	third, position the floating drop down menu
	this.OnClick_MoreMenuOpenClose = function (vm, ev) {	//	
		//console.debug("OnClick_MoreMenuOpenClose", _self.MoreMenuIsDisplayed());

		this.ParentViewModel.GlobalFacetFilters().forEach(function (v, i, a) {	//	console.debug( i, v.Title() );
			v.MoreMenuIsDisplayed(false);
			return;
		});

		if (_self.MoreMenuIsDisplayed() == false) {
			_self.MoreMenuIsDisplayed(true);
			_self.MoreMenuArrow(_self._mmdd_arrow_up);
		}
		else if (_self.MoreMenuIsDisplayed() == true) {
			_self.MoreMenuIsDisplayed(false);
			_self.MenuLoadingDisplayed(false);
			_self.MoreMenuArrow(_self._mmdd_arrow_down);
		}


		// for having a current active filter at a high scope, to avoid layout issues.
		// is the screen hieght to small// dd is 346+
		let _computed_top = 0;
		let _hard_menu_height = 346;
		const _hard_top = 114;
		//	const _hard_bottom = document.body.clientHeight;
		const _hard_right = document.body.clientWidth;

		// check is "ShowAllText" property is displayed
		_self.ParentViewModel.CurrentActiveFilter(vm);

		let _active_filter_has_box = _self.ParentViewModel.CurrentActiveFilter().ShowAllText_IsDisplayed();
		if (_active_filter_has_box == true) {
			_hard_menu_height = 373;
		}
		else {
			_hard_menu_height = 346;
		}

		// hax for the floating drop down
		//console.debug( "_hard_top", _hard_top );
		//console.debug( "ev.x", ev.x );
		//console.debug( "ev.layerX", ev.layerX );
		//console.debug( "ev.offsetX", ev.offsetX );
		//console.debug( "ev.currentTarget.offsetTop",ev.currentTarget.offsetTop );
		//console.debug( "ev.currentTarget.offsetHeight", ev.currentTarget.offsetHeight );

		let _top = _hard_top + ev.currentTarget.offsetTop - ev.currentTarget.offsetHeight + "px";
		//	console.debug( "_top:", _top );
		//	console.debug( "check for browser size here" );

		_self.MorePopup_Top(_top);

		//console.debug( "compute left", _left + 250, _hard_right );
		let _final_left;
		let _left = ev.currentTarget.offsetLeft; // ev.layerX
		//	console.debug( "_left:", _left );

		if ((_left + 250) > _hard_right) {	// about 20 pixels
			_final_left = _left - ((_left + 250) - _hard_right) + "px";
		}
		else {
			_final_left = _left + "px";
		}

		_self.MorePopup_Left(_final_left);

		return;
	};

	//	hack - for global pills panel dropdown templates
	//	first, close the floating drop menu from the left facet panel
	//	second. close the global pills drop menu
	//	thrid, show the selected drop down menu
	this.OnClick_DisplayPillsPanelDropDown = function (vm, ev) {	//	console.debug( "OnClick_DisplayPillsPanelDropDown " );

		if (this.ParentViewModel.CurrentActiveFilter()) {
			this.ParentViewModel.CurrentActiveFilter().MoreMenuIsDisplayed(false);
		}

		this.ParentViewModel.GlobalFacetFilters().forEach(function (v, i, a) {	//	console.debug( i, v.Title() );
			if (v !== vm) {
				v.MoreMenuIsDisplayed(false);
			}
			return;
		});

		if (this.MoreMenuIsDisplayed() == false) {
			this.MoreMenuIsDisplayed(true);
			this.MoreMenuArrow(this._mmdd_arrow_up);
		}
		else if (this.MoreMenuIsDisplayed() == true) {
			//	this.MoreMenuIsDisplayed( false );
			this.CloseMoreMenu(vm, ev);
		}
		return;
	};

	// search field stuffs
	this.MoreSearchField = ko.observable("");
	this.DropDownListVisible = ko.observable(10);
	this.TempSearchDataList = ko.observableArray([]);
	this.MoreSearchField.subscribe(function (newValue) {	//		console.debug( "this.MoreSearchField.subscribe", newValue );
		if (newValue == "") {
			_self.Data_Temp().sort(function (a, b) { return b._ItemCount() - a._ItemCount(); });
			_self.TempSearchDataList(_self.Data_Temp());
			_self.DropDownListVisible(10);
		}
		else {
			let _temp_filter_list = _self.Data_Temp().filter(function (v, i, a) {	//	
				//	console.debug( i, v, v.Title(), newValue );
				return v.Title().toLowerCase().includes(newValue.toLowerCase());
			});
			//	console.debug( "_temp_filter_list", _temp_filter_list );

			if (_temp_filter_list > 10) {
				_self.DropDownListVisible(10);
			}
			else {
				_self.DropDownListVisible(_temp_filter_list.length);
			}

			_self.TempSearchDataList(_temp_filter_list);
		}
		return;
	}, this);

	// load & massage data from json
	this.SelectAllLineItem = ko.observable("Select all");
	this.SelectedData = ko.observable("All");
	this.SelectAll = ko.observable(true);
	//this.RefreshData = function ()
	//{	//	
	//	console.debug( new Date().toISOString(), "RefreshData" );
	//	//if ( fvmType.hasSelectAll == true )
	//	//{
	//	//	let _sa = new FilterData_ViewModel();
	//	//	_sa.Title( this.SelectAllLineItem() );
	//	//    _sa.IsChecked( false );
	//	//	_sa.IsSelectAll( true );
	//	//	_self.Data_Temp.push( _sa );
	//	//}

	//	//if ( fvmType.data !== undefined)
	//	//{
	//	//	fvmType.data.forEach( function ( v, i, a )
	//	//	{	//	console.debug( i, v );
	//	//		let _data = new FilterData_ViewModel( v );
	//	//		_self.Data_Temp.push( _data );
	//	//		return;
	//	//	} );
	//	//}

	//	//this.Data_Temp().sort( function ( a, b ) { return b._ItemCount() - a._ItemCount(); } );

	//	//let _search_list = [];
	//	//let _top_list = [];

	//	//this.Data_Temp().forEach( function ( v, i, a )
	//	//{
	//	//	v.IsChecked( false );
	//	//	_search_list.push( v );

	//	//	if ( i !== 0 && i < 6 )
	//	//	{
	//	//		_top_list.push( v );
	//	//	}
	//	//} );

	//	//this.TempSearchDataList( _search_list );
	//	//this.Data( _top_list );

	//	return;
	//};
	this.ResetFilterData = function () {	//	console.debug( "ResetFilterData",this.Title(), this.IsSubscriptionHack() );
		let _search_list = [];
		let _top_list = [];

		if (this.IsSubscriptionHack() == true) {
			this.SubscriptionDefault_CheckAll();
		}

		this.Data_Temp().forEach(function (v, i, a) {
			_search_list.push(v);

			if (i !== 0 && i < 6) {
				_top_list.push(v);
			}
		});

		this.TempSearchDataList(_search_list);
		this.Data(_top_list);
		return;
	};
	//this.ParseData = ko.computed( function ()
	//{	//	console.debug( "ParseData" );
	//	this.RefreshData();
	//	return;
	//}, this );


	// pill drop down properties
	//	this._dd_left_position = ko.observable(0);
	this.DropDown_IsVisible = ko.observable(false);

	// facet panel drop down properties
	this._facet_closed = "svg/ChevronRight.svg";
	this._facet_open = "svg/ChevronDown.svg";
	this.PanelToggleIcon = ko.observable(this._facet_open);
	this.IsPanelDisplayed = ko.observable(true);
	this.OnClick_TogglePanel = function (data, ev) {   //  console.debug( "OnClick_TogglePanel", data.Title(), data.IsPanelDisplayed(), data.PanelToggleIcon() );
		if (this.IsPanelDisplayed() == false) {
			this.IsPanelDisplayed(true);
			this.PanelToggleIcon(this._facet_open);
		}
		else if (this.IsPanelDisplayed() == true) {
			this.IsPanelDisplayed(false);
			this.PanelToggleIcon(this._facet_closed);
		}
		return;
	};

	// has filter selections
	this.HasFilterSelectionsIcon = ko.observable("svg/clear-filter.svg");
	this.HasFilterSelections = ko.observable(false);
	this.OnClick_RemoveSelectedFilters = function (vm, ev) {   // console.debug( "OnClick_RemoveSelectedFilters", vm.Title() );
		if (vm.HasFilterSelections() == false) {
			vm.HasFilterSelections(true);
		}
		else if (vm.HasFilterSelections() == true) {
			vm.HasFilterSelections(false);
		}

		this.ResetData_Temp_IsChecked();
		this.CloseMoreMenu();
		this.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		return false;
	};

	//	event handlers 
	//	for drop down items
	this.OnClick_HandleLabelClick = function (vm, ev) {   //  console.debug( "Filter_ViewModel:OnClick_HandleLabelClick", vm );
		return false;
	};

	this.RefinedFilterTitle = ko.observable("");
	this.SelectedFilterTitle = ko.observable("");
	this.DisplaySelectedFilterTitle = ko.observable(false);
	this.IsMultiSelect = ko.observable(true);

	//	OLD
	//	new 1.5.18 - global facets - top bar
	//	 hide/show the two additional filters
	this._all_resource_types_text = "Back to all types";
	this._resource_type_text = "Resource Type";
	this.OnClick_HideThisFilter = function (vm, ev) {	//	
		//	console.debug("OnClick_HideThisFilter", vm.Title());
		// vm.FilterIsVisible( false );
		//_self.ParentViewModel.AddVirtualMachineFilters( false );
		//_self.ParentViewModel.AddAppServiceFilters( false );
		//_self.ParentViewModel.ResourceTypesFilter.PanelIsDisplayed( true );
		//_self.ParentViewModel.ResourceTypesFilter.IsPanelDisplayed( false );
		//_self.ParentViewModel.ResourceTypesFilter.OnClick_TogglePanel();

		//      _self.Data().forEach( function ( v, i, a )
		//      {   //console.debug( "_self.Data().forEach", i, v.Title(), v.IsChecked() );
		//          v.IsChecked( false );
		//          return;
		//      } );

		//	this.ApplyFilter();
		return;
	};
	this.OnClick_FilterOpenDropdown = function (vm, ev) {	//  console.debug( "OnClick_AddFilter", vm.ID(), vm.Title(), vm.DropDown_IsVisible(), vm._dd_left_position() );
		if (ev.srcElement.tagName == "INPUT") {
			return false;
		}
		return;
	};

	//	this.CurrentFacetDropDown = undefined;
	this.FacetDropDown_IsDisplayed = ko.observable(false);
	this.OnClick_GlobalFacet_OpenDropDown = function (vm, ev) {   //  console.debug( "this.OnClick_GlobalFacet_OpenDropDown", vm, this.ParentViewModel.constructor.name);
		if (this.ParentViewModel.GlobalFacetFilters().length !== 0) {
			this.ParentViewModel.GlobalFacetFilters().forEach(function (v, i, a) {
				if (v !== vm) {
					v.FacetDropDown_IsDisplayed(false);
				}
				return;
			});
		}

		if (this.FacetDropDown_IsDisplayed() == false) {
			this.FacetDropDown_IsDisplayed(true);
		}
		else if (this.FacetDropDown_IsDisplayed() == true) {
			this.FacetDropDown_IsDisplayed(false);
		}

		return;
	};

	// CURRENT 
	// check box selection
	this.Reset_TagFilterGroups = function () {
		if (this.IsTagsFilter() == true) {
			this.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.Tags().length );
				v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val );
					val.IsChecked(false);
					return;
				});
				return;
			});
		};
		return;
	};
	this.ResetData_Temp_IsChecked = function () {	//	console.debug( "this.ResetData_Temp_IsChecked" );
		this.MoreSearchField("");

		this.Data_Temp().forEach(function (v, i, a) {
			v.IsChecked(false);
			return;
		});

		this.Reset_TagFilterGroups();

		if (this.IsSubscriptionHack() == true) {
			this.SubscriptionDefault_CheckAll();
		}
		return;
	};

	// hack - for css data bing
	this.HasOptionsChecked = ko.observable(false);
	this.TotalChecked = ko.computed(function () {	//	"VirtualMachinesList_ViewModel"
		//	console.debug( "	this.TotalChecked", this.ParentViewModel.ParentViewModel() );

		// for "standard" filter/pill
		let _rv = _self.Data_Temp().filter(function (item) {
			return item.IsChecked() == true;
		});

		//	hax special for TagGroupsCollection
		let _tv = 0;
		if (_self.IsTagsFilter() == true) {
			_self.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.Tags().length );
				v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val );\
					if (val.IsChecked() == true) {
						_tv++;
					}
					return;
				});
				return;
			});
		}
		//	console.debug( "_tv ", _tv );

		if (_rv.length == 0 && _tv == 0) {
			this.HasOptionsChecked(false);
		}
		else if (_rv.length > 0 || _tv > 0) {
			this.HasOptionsChecked(true);
		}

		return _rv;
	}, this);

	// these functions have to be determined in order of execution
	this.OnClick_SetFilterValue = function (vm, ev) {	//	console.debug( "OnClick_SetFilterValue" );
		//	console.debug( "vm:", vm.Title(), vm.IsSelectAll(), vm.IsChecked() );
		vm.IsChecked(!vm.IsChecked());

		if (vm.IsSelectAll() == true) {
			if (vm.IsChecked() == false) {
				_self.Data_Temp().forEach(function (v, i, a) {
					v.IsChecked(false);
					return;
				});
			}
			else {
				_self.Data_Temp().forEach(function (v, i, a) {
					v.IsChecked(true);
					return;
				});
			}

			if (_self.IsTagsFilter() == true) {
				_self.TagGroupsCollection().forEach(function (v, i, a) {	//	
					//	console.debug("OnClick_SetFilterValue", i, v.Title(), v.Tags().length );
					v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val );
						val.IsChecked(vm.IsChecked());
						return;
					});
					return;
				});
			}
		}

		// if none selected, reset main data
		// if all selected, check "select all"
		// if all not selected, uncheck "select all"
		let _selected_total = _self.TotalChecked();
		//	console.debug( "_selected_total", _selected_total.length, "_self.Data_Temp().length", _self.Data_Temp().length, vm.IsChecked() );

		if (_selected_total.length == _self.Data_Temp().length && vm.IsChecked() == true) {
			_self.Data_Temp()[0].IsChecked(true);
		}
		else if (_selected_total.length == _self.Data_Temp().length && vm.IsChecked() == false) {
			_self.Data_Temp()[0].IsChecked(false);
		}
		else if (_selected_total.length == (_self.Data_Temp().length - 1) && vm.IsChecked() == true) {
			_self.Data_Temp()[0].IsChecked(true);
		}
		else if (_selected_total.length == (_self.Data_Temp().length - 1) && vm.IsChecked() == false) {
			_self.Data_Temp()[0].IsChecked(false);
		}

		if (_self.IsTagsFilter() == true) {
			//console.debug( _self.Data_Temp()[0].IsChecked() );
			//console.debug( _self.TagGroupsCollection()[0].Tags()[0].IsChecked( ) );
			_self.TagGroupsCollection()[0].Tags()[0].IsChecked(_self.Data_Temp()[0].IsChecked());
			//console.debug( _self.Data_Temp()[0].IsChecked() );
			//console.debug( _self.TagGroupsCollection()[0].Tags()[0].IsChecked( ) );
		}
		return;
	};

	//this.RunQuery = function ( vm, ev )
	//{	//console.debug( "RunQuery" );
	//	_self.ParentViewModel.Compute_GlobalFilter_Data_Lists();
	//	return;
	//};

	this.OnClick_Top5_Handler = function (vm, ev) {	//	console.debug( "OnClick_Top5_Handler" );
		_self.OnClick_SetFilterValue(vm, ev);
		_self.CloseMoreMenu(vm, ev);
		//	_self.RunQuery( vm, ev );
		return;
	};

	/// used to do all check boxes and text
	this.SubscriptionDefault_CheckAll = function () {	//	console.debug( "SubscriptionDefault_CheckAll, what should be displayed" );
		_self.Data_Temp().forEach(function (v, i, a) {    //   console.debug( "_self.Data().forEach", i, v.Title(), v.IsChecked() );
			v.IsChecked(true);
			return;
		});
		return;
	};

	this.Pills_Selected_Text = ko.observable("All");
	this.FilterType_SelectAll = ko.computed(function () {	//	console.debug(new Date().toISOString(),  "FilterType_SelectAll" );
		//	console.debug(new Date().toISOString(),  "FIX RESOURCE FILTER FOR SINGLE SELECT: set flag for single/multi select, so for this.ResourceTypeFilter" );
		//	compute the flyout drop down strings
		//	console.debug( "FilterType_SelectAll::_self.IsSubscriptionHack", _self.IsSubscriptionHack() );
		//	console.debug( "FilterType_SelectAll", this.Title(), this.HasPillsStyle() );

		let _all_selected = true;
		let _is_displayed = false;
		//	let _selected_text = [];

		let _tags_selected = [];
		if (this.IsTagsFilter() == true) {
			this.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug("FilterType_SelectAll", i, v.Title(), v.Tags().length );
				v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val.Title(), val.IsChecked( ) );
					if (val.IsChecked() == true) {
						_tags_selected.push(v.Title() + " : " + val.Title());
					}
					return;
				});
				return;
			});
			//	console.debug("_tags_selected", _tags_selected );

			if (this.HasPillsStyle() == true) {
				if (_tags_selected.length == _self.Data_Temp().length) {
					_self.Pills_Selected_Text("All");
					_self.HasFilterSelections(true);
				}
				else if (_tags_selected.length == 0) {
					_self.Pills_Selected_Text("All");
					_self.HasFilterSelections(false);
				}
				else if (_tags_selected.length == 1) {
					let _temp = _tags_selected;
					_self.Pills_Selected_Text(_temp);
					_self.HasFilterSelections(true);
				}
				else {
					let _temp = _tags_selected.length + " selected";
					_self.Pills_Selected_Text(_temp);
					_self.HasFilterSelections(true);
				}
			}
			else {
				if (_tags_selected.length == _self.Data_Temp().length) {
					_self.SelectedData("All " + this.Title().toLowerCase());
					//	_self.FilterIsVisible( true );
					_self.HasFilterSelections(true);
				}
				else if (_tags_selected.length == 0) {
					//	_self.SelectedData( "No " + this.Title().toLowerCase() + " selected" );
					_self.SelectedData("All  " + this.Title().toLowerCase());
					//  console.debug( _self.ParentViewModel.IsFacetPanelDisplayed() );
					if (_self.ParentViewModel.IsFacetPanelDisplayed() == true) {
						_self.FilterIsVisible(false);
					}
					_self.HasFilterSelections(false);
				}
				else if (_tags_selected.length == 1) {
					_self.SelectedData(_tags_selected);
					_self.FilterIsVisible(true);
					//	if ( _self.IsMultiSelect() == false )
					//	_self.Data()[0].IsChecked( false );
					_self.HasFilterSelections(true);
				}
				else {
					let _temp = _tags_selected.length + " " + this.Title().toLowerCase() + " selected";
					_self.SelectedData(_temp);
					_self.FilterIsVisible(true);
					//	_self.Data()[0].IsChecked( false );
					_self.HasFilterSelections(true);
				}
			}
		}
		else {
			if (this.HasPillsStyle() == true) {
				let _selected_text = [];
				_self.Data_Temp().forEach(function (v, i, a) {    //   console.debug( "_self.Data().forEach", i, v.Title(), v.IsChecked() );
					if (v.IsChecked() == true) {
						_selected_text.push(v.Title());
					}
					return;
				});

				//	console.debug( "_selected_text" ,_selected_text.length, _self.Data_Temp().length);

				if (_selected_text.length == _self.Data_Temp().length) {
					_self.Pills_Selected_Text("All");
					_self.HasFilterSelections(true);
				}
				else if (_selected_text.length == 0) {
					_self.Pills_Selected_Text("All");
					_self.HasFilterSelections(false);
				}
				else if (_selected_text.length == 1) {
					let _temp = _selected_text + " selected";
					_self.Pills_Selected_Text(_temp);
					_self.HasFilterSelections(true);
				}
				else {
					let _temp = _selected_text.length + " selected";
					_self.Pills_Selected_Text(_temp);
					_self.HasFilterSelections(true);
				}
			}
			else {
				let _selected_text = [];

				_self.Data_Temp().forEach(function (v, i, a) {    //   console.debug( "_self.Data().forEach", i, v.Title(), v.IsChecked() );
					if (v.IsChecked() == true) {
						_selected_text.push(v.Title());
					}
					return;
				});

				if (_selected_text.length == _self.Data_Temp().length) {
					_self.SelectedData("All " + this.Title().toLowerCase());
					//	_self.FilterIsVisible( true );
					_self.HasFilterSelections(true);
				}
				else if (_selected_text.length == 0) {
					//	_self.SelectedData( "No " + this.Title().toLowerCase() + " selected" );
					_self.SelectedData("All  " + this.Title().toLowerCase());
					//  console.debug( _self.ParentViewModel.IsFacetPanelDisplayed() );
					if (_self.ParentViewModel.IsFacetPanelDisplayed() == true) {
						_self.FilterIsVisible(false);
					}
					_self.HasFilterSelections(false);
				}
				else if (_selected_text.length == 1) {
					_self.SelectedData(_selected_text);
					_self.FilterIsVisible(true);
					//	if ( _self.IsMultiSelect() == false )
					//	_self.Data()[0].IsChecked( false );
					_self.HasFilterSelections(true);
				}
				else {
					let _temp = _selected_text.length + " " + this.Title().toLowerCase() + " selected";
					_self.SelectedData(_temp);
					_self.FilterIsVisible(true);
					//	_self.Data()[0].IsChecked( false );
					_self.HasFilterSelections(true);
				}
			}
		}

		return;
	}, this);

	// close the drop down and apply the selections from "TempSearchList" to short "Data"/"Data_View"
	// with tagsfilter changes, this is fired from other events and may not have viewmodel??
	this.CloseMoreMenu = function (vm, ev) {	//	
		//	console.debug( "CloseMoreMenu", this.Title(), this.IsTagsFilter() );
		this.MoreMenuIsDisplayed(false);
		this.MoreMenuArrow(this._mmdd_arrow_down);

		//	ALSO DO TAGS FILTER HACK!
		//	console.debug( "pilfer tag groups to data_temp" );		
		if (this.IsTagsFilter() == true) {	//	console.debug( "CloseMoreMenu::this.IsTagsFilter()", this.IsTagsFilter() );
			//	if item in coming from the "top 5"
			if (vm !== undefined) {	//	console.debug( typeof vm);
				if (vm.constructor.name == "Filter_ViewModel") {
					_self.ParentViewModel.Compute_GlobalFilter_Data_Lists();
					return;
				}

				let _tag_text = vm.Title().split(" : ");
				let _tag_group = _tag_text[0].trim();
				let _tag_val = _tag_text[1].trim();
				//	console.debug( "_tag_text", _tag_text );
				//	console.debug( "_tag_group", _tag_group );
				//	console.debug( "_tag_val", _tag_val );

				// set the "IsChecked()" value in the tag collection
				this.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.Tags().length );
					if (v.Title() == _tag_group) {	//	console.debug( "MATCH!!!", i, v.Title(), _tag_group, _tag_val );
						v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val.Title(), val.IsChecked(), _tag_val, vm.IsChecked() );
							if (val.Title() == _tag_val) {
								val.IsChecked(vm.IsChecked());
							}
							return;
						});
					}
					return;
				});

				//	console.debug( "FIX UP THE VM IS CLICKED VERSIONS", this.Data().length );
				let _temp_arr = [];
				this.Data().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.IsChecked() );
					if (i > 4) {
						if (v.IsChecked() == true) {
							_temp_arr.push(v);
						}
					}
					else {
						_temp_arr.push(v);
					}
					return;
				});
				this.Data(_temp_arr);
			}
			else 	//	 from the tag collection flyout
			{
				//	console.debug( "NO VIEWMODEL, SHOULD BE GRABBING ITEMS FROM THE FLYOUT, TAGS COLLECTION" );
				let _tags_selected = [];

				this.TagGroupsCollection().forEach(function (v, i, a) {	//	console.debug( i, v.Title(), v.Tags().length );
					v.Tags().forEach(function (val, idx, arr) {	//	console.debug( idx, val );
						if (val.IsChecked() == true) {	//	console.debug( i, v.Title(), idx, val.Title(), val.IsChecked(), val._ItemCount() );
							let _new_val = new FilterData_ViewModel();
							_new_val.Title(v.Title() + " : " + val.Title());
							_new_val.IsChecked(true);

							_tags_selected.push(_new_val);
						}
						return;
					});
					return;
				});

				//	console.debug( "_tags_selected", _tags_selected );

				// check to see if an item in the top 5 needed to be selected
				let _temp_tags_selected = [];
				_tags_selected.forEach(function (v, i, a) {	//	console.debug( "_tags_selected:", i, v.Title() );
					let _matched = false;

					_self.Data().forEach(function (v2, i2, a2) {	// console.debug( i2, v2.Title(), v2.IsChecked(), v2._ItemCount() );
						if (v2.Title() == v.Title()) {
							v2.IsChecked(v.IsChecked());
							_matched = true;
						}
						return;
					});

					//	console.debug(i, v.Title(), "_matched", _matched );
					if (_matched == false) {
						_temp_tags_selected.push(v);
					}
					return;
				});

				//	add checked items, not part of top 5, to list
				//	console.debug( "_tags_selected", _tags_selected.length );
				//	console.debug( "_temp_tags_selected", _temp_tags_selected.length );

				if (_tags_selected.length == 0 && _temp_tags_selected.length == 0) {
					let _new_data_list = this.Data_Temp().slice(1, 6);
					this.Data(_new_data_list);
				}
				else if (_tags_selected.length > 0 && _temp_tags_selected.length == 0) {
					//	console.debug( "this.Data_Temp()", this.Data_Temp().length );
					//	console.debug( "this.Data()", this.Data().length );

					let _new_data_list = this.Data();

					_temp_tags_selected.forEach(function (v, i, a) {
						_new_data_list.push(v);
						return;
					});

					this.Data(_new_data_list);
				}
				else if (_tags_selected.length > 0 && _temp_tags_selected.length > 0) {
					let _new_data_list = this.Data();
					_temp_tags_selected.forEach(function (v, i, a) {
						_new_data_list.push(v);
						return;
					});

					//	console.debug( "_new_data_list", _new_data_list );
					this.Data(_new_data_list);
				}
			}
		}
		else {	// GET ITEMS THAT ARE CHECKED, BUT HIGHER THAT #5, WHICH SHOULD INCLUDE "SELECT ALL"
			let _data_temp_selected = [];
			this.Data_Temp().forEach(function (v, i, a) {
				if (i > 5) {
					if (v.IsChecked() == true) {
						_data_temp_selected.push(v);
					}
				}
				return;
			});
			//	console.debug( "_data_temp_selected", _data_temp_selected );

			if (_data_temp_selected.length == 0) {
				let _new_data_list = this.Data_Temp().slice(1, 6);
				this.Data(_new_data_list);
			}
			else if (_data_temp_selected.length > 0) {
				//	console.debug( "Adding", _data_temp_selected.length );
				let _new = this.Data_Temp().slice(1, 6);
				_data_temp_selected.forEach(function (v, i, a) {
					_new.push(v);
					return;
				});
				this.Data(_new);
			}
			//	console.debug( "_self.Data().length",_self.Data().length);
		}

		_self.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		return;
	};


	//hacks for tags gilter
	this.Init_TagsFilter = function () {	//	console.debug( "this.Init_TagsFilter()::this.IsTagsFilter", this.IsTagsFilter(), fvmType);
		if (this.IsTagsFilter() == true) {
			let _sa = new TagGroup_ViewModel();
			_sa.Title("Select all group");
			_sa.TitleIsVisible(false);

			let _sa_item = new FilterData_ViewModel();
			_sa_item.Title("Select all");
			_sa_item.IsSelectAll(true);
			_sa_item._ItemCount(0);
			_sa_item.IsChecked(false);

			_sa.Tags().push(_sa_item);

			_self.TagGroupsCollection().push(_sa);

			fvmType.data.forEach(function (v, i, a) {	//	console.debug("FilterViewModelTypes.TagsList.data", i, v );
				let _tg = new TagGroup_ViewModel();
				_tg.Title(v.name);

				v.list.forEach(function (v2, i2, a2) {
					let _filter_data_item = new FilterData_ViewModel();
					_filter_data_item.Title(v2);
					_filter_data_item._ItemCount(0);
					_filter_data_item.IsChecked(false);

					_tg.Tags().push(_filter_data_item);
				});

				_self.TagGroupsCollection().push(_tg);
				return;
			});
		}

		//	console.debug( "false:::this.Init_TagsFilter()::this.IsTagsFilter", this.IsTagsFilter() );
		//	console.debug( "_self.TagGroupsCollection()", _self.TagGroupsCollection() );
		return;
	};

	// feature flag hax
	//if ( this.ParentViewModel.ParentViewModel().FeatureFlag_PillsStyle() !== undefined)
	//{
	//	if ( this.ParentViewModel.ParentViewModel().FeatureFlag_PillsStyle() == true )
	//	{
	//		this.HasPillsStyle( true );
	//	}
	//	else
	//	{
	//		this.HasPillsStyle( false );
	//	}
	//}

	//console.debug( "this.ParentViewModel.ParentViewModel().FeatureFlag_PillsStyle()", this.ParentViewModel.ParentViewModel().FeatureFlag_PillsStyle() );
	//console.debug( "this.HasPillsStyle", this.HasPillsStyle() );
	return;
};