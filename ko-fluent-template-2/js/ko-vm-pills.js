/// <reference path="ko-filters-data.js" />
/// <reference path="../script/knockout-3.5.0.js" />
/// "Pill_ViewModel" ViewModel V.1.1.0
"use strict";
function Pill_ViewModel( parent, filter_data)
{	// console.debug( "Pill_ViewModel", filter_data);
	let _self = this;
	this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( "Pill_ViewModel" );
	this.SearchPlaceholder = ko.observable( "search" );
	this.FilterCloseIcon = ko.observable( SVG.StatusBadge.Failed.SVG );

	this.ParentViewModel = parent;
	this.IsVisible = ko.observable( false );
	this.IsSearchPill = ko.observable( false );
	this.SearchPlaceholderText = ko.observable( "Search" );
	this.IsAddPill = ko.observable( false );
	this.IsTagsPill = ko.observable( false );
	this.IsResetPill = ko.observable( false );
	this.HasOperators = ko.observable( false );
	this.Is_IP_Pill = ko.observable( false );

	this.Created_Animation = ko.observable( false );

	this.SelectAllLineItem = ko.observable( "Select all" );
	this.SelectedData = ko.observable( "All" );
	this.SelectAll = ko.observable( false );
	this.IsRemovable = ko.observable( true );

	this.HasFilterSelections = ko.observable( false );
	this.IsMultiSelect = ko.observable( true );

	//	tied deeply to the "DataRow_ViewModel"
	this.FilterKey = ko.observable("");

	this.KeyData = ko.observableArray( [] );
	this.SelectedKey = ko.observable( "Select key" );
	this.KeyIsSelected = ko.observable( false );

	this.Operators = ko.observableArray( [
		"==",
		"!=",
		"<",
		">"
	] );
	this.SelectedOperator = ko.observable( this.Operators()[0] );
	this.OperatorIsSelected = ko.observable( false );

	this.KeyValueData = ko.observableArray( [] );
	this.SelectedValue = ko.observable( "Select value" );
	this.KeyValueIsSelected = ko.observable( false );

	this._pill_data = filter_data;	//	PillsData;
	// need to handle tags, maybe change 
	this._pill_data.forEach( function ( v, i, a )
	{	//	
		//	console.debug( i, v );

		if ( v.IsSearchPill == undefined &&  v.IsAddPill == undefined )
		{
			let _sa = new FilterData_ViewModel();
			_sa.Title( v.title );
			_sa.Type( v.type );
			_sa.IsChecked( false );
			_sa.Description( v.desc );

			_self.IsRemovable( v.isRemovable );
			_self.HasOperators( v.hasOperators );


			//	hax, changes template, console.debug( "v", v.title, v.IsTags );
			if ( v.IsTags !== undefined )
			{
				_self.IsTagsPill( v.IsTags );
			}
			else
			{
				_self.IsTagsPill( false );
			}

			// hax is ip filter, changes template
			//	console.debug( "v", v.title, v.isIpFilter );
			if ( v.isIpFilter !== undefined )
			{
				_self.Is_IP_Pill( v.isIpFilter );
			}
			else
			{
				_self.Is_IP_Pill( false );
			}


			//	console.debug( v.title, v.filterColumnKey );
			_self.FilterKey( v.filterColumnKey );

			if ( _self.IsTagsPill() == true )
			{
				_self.HasOperators( true );
				//	console.debug( "v.data", v.data );
				v.data.forEach( function ( v2, i2, a2 )
				{
					//	console.debug( i2, v2 );
					let _data = new FilterData_ViewModel();
					_data.Title( v2.name );
					_data.IsChecked( false );
					_data.IsSelectAll( false );
					_data.IsGroup( true );

					v2.list.forEach( function ( v3, i3, a3 )
					{
						//	console.debug( i2, i3, v2.name, v3 )
						let _list_item = new FilterData_ViewModel();
						_list_item.Title( v3 );
						_list_item.IsChecked( false );
						_list_item.IsSelectAll( false );

						_data.Data().push( _list_item );
						return;
					} );

					_sa.Data().push( _data );

					return;
				} );

				_self.KeyData().push( _sa );
				//	console.debug( "_self.KeyData()", _self.KeyData() );
			}
			else if ( _self.IsTagsPill() == false )
			{
				let _select_all = new FilterData_ViewModel();
				_select_all.Title( "Select All" );
				_select_all.IsChecked( false );
				_select_all.IsSelectAll( true );

				_sa.Data().push(_select_all);

				v.data.forEach( function ( v2, i2, a2 )
				{
					//	console.debug( i2, v2 );
					let _data= new FilterData_ViewModel();
					_data.Title( v2 );
					_data.IsChecked( false );
					_data.IsSelectAll( false );
					_sa.Data().push(_data);
					return;
				} );

				_self.KeyData().push( _sa );
			}
		}

		//	console.debug( "pills_data._self", v.title, _self.IsSearchPill(), _self.IsAddPill()  );
		return;
	} );


	// tags hacks
	this.TagGroupsCollection = ko.observableArray( [] );

	this.OperaterType = ko.observable( "equal" );
	this.OperatorData = ko.observableArray( [] );

	// for the tags filter pill drop down
	this.TagFilterOperaterType = ko.observable( "all" );
	this.TagFilterOperatorData = ko.observableArray( [] );

	this.IPFilterOperatorType = ko.observable("ip-equal");


	this.OnChange_SelectedTagFilterType = function ( vm, ev )
	{   //	console.debug( "OnChange_SelectedTagFilterType", vm.OperaterType() );
		return true;
	};
	this.OnClick_SelectTagFilterType = function ( vm, ev )
	{   //	console.debug( "OnClick_SelectTagFilterType", vm.OperaterType() );
		return true;
	};

	/* event handlers */
	this._down_arrow = "svg/ChevronDown.svg";
	this._up_arrow = "svg/ChevronUp.svg";
	this.KeysOpenArrow = ko.observable( this._down_arrow );
	this.OperatorsOpenArrow = ko.observable( this._down_arrow );
	this.ValuesOpenArrow = ko.observable( this._down_arrow );

	this.KeyListOpen = ko.observable( false );
	this.KeyListOpen.subscribe( function ( nv )
	{	//	console.debug( "KeyListOpen", nv );
		if ( nv == false )
		{
			_self.KeysOpenArrow( _self._down_arrow );
		}
		else
		{
			_self.KeysOpenArrow( _self._up_arrow );
		}
		return;
	}, this );
	this.OperatorListOpen = ko.observable( false );
	this.OperatorListOpen.subscribe( function ( nv )
	{	//	console.debug( "OperatorListOpen", nv );
		if ( nv == false )
		{
			_self.OperatorsOpenArrow( _self._down_arrow );
			_self.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		}
		else
		{
			_self.OperatorsOpenArrow( _self._up_arrow );
		}
		return;
	}, this );
	this.ValuesListOpen = ko.observable( false );
	this.ValuesListOpen.subscribe( function ( nv )
	{	// console.debug( "ValuesListOpen", nv );
		if ( nv == false )
		{
			_self.ValuesOpenArrow( _self._down_arrow );
		}
		else
		{
			_self.ValuesOpenArrow( _self._up_arrow );
		}
		return;
	}, this );
	// hide/show keys, ops, values drop downs
	this.OnClick_HideShowKeys = function ( vm, ev )
	{	//	console.debug( "OnClick_HideShowKey" );
		this.ParentViewModel.Close_AllPillDropDowns( vm, ev );

		this.OperatorListOpen( false );
		this.ValuesListOpen( false );
		if ( this.KeyListOpen() == false )
		{
			this.KeyListOpen( true );
		}
		else if ( this.KeyListOpen() == true )
		{
			this.KeyListOpen( false );
		}
		return;
	};
	this.OnClick_HideShowOperators = function ( vm, ev )
	{	//	console.debug( "OnClick_HideShowOperators" );
		this.KeyListOpen( false );
		this.ValuesListOpen( false );
		if ( this.OperatorListOpen() == false )
		{
			this.OperatorListOpen( true );
		}
		else if ( this.OperatorListOpen() == true )
		{
			this.OperatorListOpen( false );
		}
		return;
	};
	this.OnClick_HideShowValues = function ( vm, ev )
	{	//	console.debug( "OnClick_HideShowValues",vm, this.KeyValueData().length, this.ValuesListOpen() );
		this.ParentViewModel.Close_AllPillDropDowns( vm, ev );

		if ( this.KeyValueData().length == 0 )
		{
			return;
		}

		this.KeyListOpen( false );
		this.OperatorListOpen( false );
		if ( this.ValuesListOpen() == false )
		{
			this.ValuesListOpen( true );
		}
		else if ( this.ValuesListOpen() == true )
		{
			this.ValuesListOpen( false );
		}
		return;
	};
	this.CloseAllDropDowns = function ()
	{	//	console.debug( "CloseAllDropDowns" );
		this.KeyListOpen( false );
		this.OperatorListOpen( false );
		this.ValuesListOpen( false );

		//this.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		return;
	};

	// manages CSS for when the flyouts are open.
	this.Computed_DropDownsOpened = ko.computed( function ()
	{
		let _bool_rv = false;

		if ( this.KeyListOpen() == true || this.OperatorListOpen() == true || this.ValuesListOpen() == true )
		{
			_bool_rv = true;
		}
		//	console.debug( "_bool_rv", _bool_rv );

		return _bool_rv;
	}, this );
	// always single click
	this.OnClick_SelectKey = function (vm, ev)
	{	//	
		//	console.debug( "OnClick_SelectKey::vm", vm.Title(), vm.IsChecked(), );
		//	console.debug( "OnClick_SelectKey::_self", _self.SelectedKey(), _self.FilterKey(), _self.KeyIsSelected(), _self.IsAddPill(), _self.IsTagsPill() );

		_self.KeyData().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title() );
			if ( v.Title() == vm.Title() )
			{
				if ( vm.IsChecked() == false )
				{
					vm.IsChecked( true );
					_self.SelectedKey( vm.Title() );
					_self.KeyValueData( vm.Data() );
					_self.KeyListOpen( false );
					//	_self.ValuesListOpen( true );
					_self.KeyValueData().forEach( function ( v, i, a )
					{
						v.IsChecked( true );
					} );
				}
				else if ( vm.IsChecked() == true )
				{
					vm.IsChecked( false );
					_self.SelectedKey( "Select key" );
					_self.KeyValueData( [] );
					_self.SelectedValue( "Select value XXX" );
					_self.KeyListOpen( true );
				}
			}
			else
			{
				v.IsChecked( false );
			}
			return;
		} );

		//	console.debug( _self.SelectedKey(), _self.FilterKey(), _self._pill_data );
		_self._pill_data.forEach( function ( v, i, a )
		{	//	console.debug( i, v.title, v.filterColumnKey );
			if ( _self.SelectedKey() == v.title )
			{
				_self.FilterKey( v.filterColumnKey );
			}		
			return;
		} );
		//	console.debug( _self.SelectedKey(), _self.FilterKey(), _self.KeyIsSelected() );

		// sets the pill to only allow editing of the values drop down
		if ( _self.FilterKey() !== "" )
		{
			_self.KeyIsSelected( true );
		}
		//	console.debug( "_self.KeyIsSelected()", _self.KeyIsSelected() );

		return;
	};

	// hax for IP filtering
	this.IP_MinRange_IsNotValid = ko.observable( false );
	this.IP_MaxRange_IsNotValid = ko.observable( false );
	this.IP_MinRange = ko.observable( "" );
	this.IP_MaxRange = ko.observable( "" );
	this.IP_MinRange.subscribe( function ( newValue )
	{	//	console.debug( "this.IP_MinRange.subscribe", newValue, _self.IP_MaxRange());
		let _ip_split = newValue.split( "." );

		if ( _ip_split.length == 4 )
		{
			_self.IP_MinRange_IsNotValid( false );	
		}
		else if ( _ip_split.length > 4 )
		{
			_self.IP_MinRange_IsNotValid( true );
			return;
		}

		_ip_split.forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			if ( isNaN( v ) == true )
			{
				_self.IP_MinRange_IsNotValid( true );
			}
			else if ( isNaN( v ) == false )
			{
				if ( v < 1 || v > 255 )
				{
					_self.IP_MinRange_IsNotValid( true );
				}
				else if ( v > 1 || v < 256)
				{
					_self.IP_MinRange_IsNotValid( false );
				}
			}
			return;
		} );

		_self.IP_MaxRange( _ip_split.join(".") );

		return;
	}, this );


	// always hanlde click events, too keep the menus open until otherwise needing to close them
	this.OnClick_HandleLabelClick = function ( vm, ev )
	{   //  console.debug( "Filter_ViewModel:OnClick_HandleLabelClick", vm );
        return false;
    };
	this.OnClick_SetFilterValue = function ( vm, ev )
	{	//	console.debug( "OnClick_SetFilterValue" );
		//	console.debug( "vm:", vm.Title(), vm.IsSelectAll(), vm.IsChecked() );
		if ( vm.IsSelectAll() == true )
		{
			vm.IsChecked( !vm.IsChecked() );

			_self.KeyValueData().forEach( function ( v, i, a )
			{
				v.IsChecked( vm.IsChecked() );
				return;
			} );
		}
		else
		{
			if ( vm.IsChecked() == true )
			{
				vm.IsChecked( false );
			}
			else if (vm.IsChecked() == false)
			{
				vm.IsChecked( true );
			}

			let _checked_count = [];

			_self.KeyValueData().forEach( function ( v, i, a )
			{	//	console.debug( i, v.Title(), v.IsChecked());
				if ( v.IsChecked() == true )
				{
					_checked_count.push( i );
				}
				return;
			} );

			if ( _checked_count.length == _self.KeyValueData().length -1 )
			{
				if ( _self.KeyValueData()[0].IsSelectAll() == true )
				{
					_self.KeyValueData()[0].IsChecked( vm.IsChecked() );
				}
			}
		}

		//	specific to ResourceTypeFilters, 
		if ( _self.IsMultiSelect() == false )
		{	//	console.debug( "_self.IsMultiSelect() ", _self.IsMultiSelect() );
			_self.KeyValueData().forEach( function ( v, i, a )
			{
				if ( v.Title() !== vm.Title() )
				{
					v.IsChecked( false );
				}
				return;
			} );
		}

		_self.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		return;
	};

	// hide pill filter
	this.OnClick_HideThisFilter = function ( vm, ev )
	{
		vm.KeyData().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.IsChecked() );
			v.IsChecked( false );
			return;
		} );

		vm.IsVisible( false );
		vm.KeyListOpen( true );
		vm.OperatorListOpen( false );
		vm.ValuesListOpen( false );
		vm.SelectedKey("Select key");
		vm.KeyValueData( [] );
		vm.SelectedValue( "Select value" );

		vm.ParentViewModel.Compute_GlobalFilter_Data_Lists();
		return;
	};

	// select all functionality
    this.FilterType_SelectAll = ko.computed(function()
    {	//	console.debug( "FIX RESOURCE FILTER FOR SINGLE SELECT: set flag for single/multi select, so for this.ResourceTypeFilter");
		//	console.debug( "FilterType_SelectAll" );

		let _all_selected = true;
        let _is_displayed = false;
        let _selected_text = [];

		if ( _self.IsTagsPill() == true )
		{
			_self.KeyValueData().forEach( function ( v, i, a )
			{	//	console.debug( i, v.Title(), v.IsChecked(), v.Data() );
				v.Data().forEach( function ( v2, i2, a2 )
				{
					if ( v2.IsChecked() == true )
					{
						_selected_text.push(v2.Title() );
					}
				} );

				return;
			} );
		}
		else if ( _self.IsTagsPill() == false )
		{
			_self.KeyValueData().forEach( function ( v, i, a )
			{    //   console.debug( "_self.Data().forEach", i, v.Title(), v.IsChecked() );
				if ( v.IsChecked() == true )
				{
					_selected_text.push( v.Title() );
				}
				return;
			} );
		}

		//	console.debug( "_selected_text", _selected_text.length );
        if ( _selected_text.length == 0)
        {
            _self.SelectedValue( "None" );
            _self.HasFilterSelections( false );
		}
        else if ( _selected_text.length == 1 )
        {
            _self.SelectedValue( _selected_text );
            _self.HasFilterSelections( true );
		}
        else if ( _selected_text.length > 1 )
		{
			if ( _selected_text.length == _self.KeyValueData().length )
			{
				_self.SelectedValue( "All" );
				_self.HasFilterSelections( true );
			}
			else
			{
				let _temp = _selected_text.length + " selected";
				_self.SelectedValue( _temp );
				_self.HasFilterSelections( true );
			}
		}

        return;
    }, this );

	// init
	this.KeyListOpen( true );
	this.KeysOpenArrow( this._up_arrow );
	return;
}