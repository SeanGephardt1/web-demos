/// <reference path="../script/knockout-3.4.2.js" />
//	CONTEXT BLADE VIEW MODELS
"use strict";

// Base ViewModel
function ContextBlade_ViewModel( parentViewModel, title, subtitle, template)
{	//	console.debug( "ContextBlade_ViewModel", parentViewModel, title, template );
	this.ID = ko.pureComputed( function () { return "context-blade-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Parent = parentViewModel;
	this.Title = ko.observable( title || "ContextBlade_ViewModel" );
	this.Subtitle = ko.observable(subtitle || "Subtitle text" );
	this.IsSelected = ko.observable( false );
	this.Index = ko.observable( 0 );
	this.BladeSize = ko.observable( "355px" );
	this.TemplateName = ko.observable( template || "ko-context-blade-empty-template" );

	//	GENERAL DISCARD BUTTON EVENT HANDLER
	this.OnClick_Discard = function ( vm, ev )
	{	//	console.debug( "ContextBlade_ViewModel:OnClick_Discard" );
		this.Parent.ParentViewModel().OnClick_OpenCloseContextBlade();
		return;
	};

    this.ContentPanelSaveButton_Enabled = ko.observable( true );
    this.OnClick_Content_SaveButton = function ( vm, ev )
    {   //  console.debug( "this.Click_SaveButton");
        var _event = ev;
        _event.srcElement.innerText = "Saving...";

        var _saving = window.setTimeout( function ()
        {   //  console.debug( "_event", _event.srcElement.innerText = "Save" );
            window.clearTimeout( _saving );
            _event.srcElement.innerText = "Saved";

            window.setTimeout( function ()
            {
                _event.srcElement.innerText = "Save";
                return;
            }, 1000 );
            return;
        }, 1000 );
        return;
    };
    this.OnClick_Content_CancelButton = function ( vm, ev )
    {   //  console.debug( "this.Click_CancelButton" );
        //  this.ScopeSelectControl_IsDisplayed( false );
        return;
	};

	return;
}

// example context blade base & inherited view models
function NotificationsContextBlade_ViewModel( parentViewModel, title, template, data, clearAllAction )
{	//	console.debug( "NotificationsContextBlade_ViewModel", parentViewModel, strName, templateName, data );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel, title, template ) );
	this.Title( "Notifications" );
	this.Subtitle( "" );
	this.IsSelected( true );
	this.TemplateName( "ko-notifications-template" );
	this.NotificationsData = ko.observableArray( data || [] );
	this.BladeSize( "450px" );

	this.OnClick_ClearList = clearAllAction;
	//	console.debug( "this.OnClick_ClearList", this.OnClick_ClearList );
	return;
};

// Storage Account Spec Picker Feature Flag 2
function SpecPickerPill_Item_ViewModel(title)
{
	this.Title = ko.observable(title || "no title");
	this.IsSelected = ko.observable( false );
	return;
};
function SpecPickerPill_ViewModel( parent, title, optionsData )
{	//	console.debug( "SpecPicker_Pill_ViewModel", title );
	//	basics
	const _self = this;
	this.Parent = parent;
	this._header_divider = " : ";
	this._selected_none_text = "None";
	this._selected_all_text = "All";
	this._selected_some_text = " selected";
	this.HeaderText = ko.observable( title || "this.HeaderText" );
	this.SelectedText = ko.observable( this._selected_none_text );
	this.PillText = ko.computed( function ()
	{
		return this.HeaderText() + this._header_divider + this.SelectedText();
	}, this );

	// options & data
	this.Options_List = ko.observableArray( [] );
	optionsData.forEach( function ( v, i, a )
	{
		_self.Options_List.push( new SpecPickerPill_Item_ViewModel( v ) );
		return;
	} );

	// compute the pill text
	this.SelectedText_Checked = ko.computed( function ()
	{	//	console.debug( "SelectedText_Checked" );
		let _list_length = this.Options_List().length;
		let _selected_length = [];

		this.Options_List().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.IsSelected() );
			if ( v.IsSelected() == true )
			{
				_selected_length.push( v );
			}
			return;
		} );
		// console.debug( _selected_length.length, _list_length );

		if ( _selected_length.length == 0 )
		{
			this.SelectedText( this._selected_none_text );
		}
		else if ( _selected_length.length > 0 && _selected_length.length < _list_length )
		{
			let _temp = "";
			if ( _selected_length.length == 1 )
			{
				_temp = "\'" +_selected_length[0].Title() + "\'" + this._selected_some_text;
			}
			else
			{
				_temp = _selected_length.length + this._selected_some_text;
			}
			this.SelectedText( _temp );
		}
		else if ( _selected_length.length == _list_length )
		{
			this.SelectedText( this._selected_all_text );
		}

		return;
	}, this );

	// select an option
	this.OnClick_OptionSelected = function ( vm, ev )
	{	//	console.debug( "OnClick_OptionSelected", vm.Title(), vm.IsSelected() );
		if ( vm.IsSelected() == false )
		{
			vm.IsSelected( true );
		}
		else if ( vm.IsSelected() == true )
		{
			vm.IsSelected( false );
		}
		_self.Parent.Filter_Data();
		return;
	};

	// drop down menu
	this.DropDown_IsDisplayed = ko.observable( false );
	this.OnClick_OpenClose_PillDropDown = function ( vm, ev )
	{	// console.debug( "OnClick_OpenClose_PillDropDown" );
		//vm.Parent.CloseAll_Pills();
		this.Parent.Pills().forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			if ( vm !== v )
			{
				v.DropDown_IsDisplayed( false );
			}
			return;
		} );

		if ( this.DropDown_IsDisplayed() == false )
		{
			this.DropDown_IsDisplayed( true );
		}
		else if ( this.DropDown_IsDisplayed() == true )
		{
			this.DropDown_IsDisplayed( false );
		}
		return;
	};

	return;
};			
function SpecPicker_DataItem_ViewModel( c, p, a, r )
{	//	console.debug( "SpecPickerData_ViewModel" );
	this.Combination = ko.observable( c || "default");
	this.Performance = ko.observable( p );
	this.AccountKind = ko.observable( a );
	this.Replication = ko.observable( r );
	this.IsSelected = ko.observable( false );
	this.OnClick_DataRow_Selected = function ( vm, ev, parent )
	{
		vm.IsSelected( !vm.IsSelected() );

		parent.Grid_Data().forEach( function ( v, i, a )
		{
			if ( v.Combination() !== vm.Combination() )
			{
				v.IsSelected( false );
			}
			return;
		} );

		if ( vm.IsSelected() == true )
		{
			parent.Selected_Spec( vm );
		}
		else if ( vm.IsSelected() == false )
		{
			parent.Selected_Spec( undefined );
		}
		return;
	};
	return;
};
function SpeckPicker2_ViewModel( parentViewModel, title, template )
{
	// "sso" == selected state object
	//	console.debug( "SpeckPicker2_ViewModel", parentViewModel, title, template, sso );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel, title, template ) );
	const _self = this;
	this.Title( "Configuration picker" );
	this.ContextBladeTemplate( "ko-spec-picker2-template" );
	this.OK_Btn_Text = ko.observable( "OK" );
	this.Cancel_Btn_Text = ko.observable( "Cancel" );

	this.Performance_Pill = new SpecPickerPill_ViewModel(this,"Performance", this.Parent._performance_list );
	this.AccountKind_Pill = new SpecPickerPill_ViewModel(this,"Account kind", this.Parent._accounts_list );
	this.Replication_Pill = new SpecPickerPill_ViewModel(this,"Replication", this.Parent._replication_list );
	this.CloseAll_Pills = function ()
	{
		this.Performance_Pill.DropDown_IsDisplayed( false );
		this.AccountKind_Pill.DropDown_IsDisplayed( false );
		this.Replication_Pill.DropDown_IsDisplayed( false );
		return;
	};
	this.Pills = ko.observableArray( [
		this.Performance_Pill,
		this.AccountKind_Pill,
		this.Replication_Pill
	] );

	// default data & grid
	this._data = [
		// standard, storage v2
		new SpecPicker_DataItem_ViewModel( "Default", this.Parent._performance_list[0], this.Parent._accounts_list[1], this.Parent._replication_list[0] ),
		new SpecPicker_DataItem_ViewModel( "1", this.Parent._performance_list[0], this.Parent._accounts_list[1], this.Parent._replication_list[1] ),
		new SpecPicker_DataItem_ViewModel( "2", this.Parent._performance_list[0], this.Parent._accounts_list[1], this.Parent._replication_list[2] ),
		new SpecPicker_DataItem_ViewModel( "3", this.Parent._performance_list[0], this.Parent._accounts_list[1], this.Parent._replication_list[3] ),
		// standard, storage
		new SpecPicker_DataItem_ViewModel( "4", this.Parent._performance_list[0], this.Parent._accounts_list[0], this.Parent._replication_list[0] ),
		new SpecPicker_DataItem_ViewModel( "5", this.Parent._performance_list[0], this.Parent._accounts_list[0], this.Parent._replication_list[1] ),
		new SpecPicker_DataItem_ViewModel( "6", this.Parent._performance_list[0], this.Parent._accounts_list[0], this.Parent._replication_list[2] ),
		new SpecPicker_DataItem_ViewModel( "7", this.Parent._performance_list[0], this.Parent._accounts_list[0], this.Parent._replication_list[3] ),
		// standard, blob storage
		new SpecPicker_DataItem_ViewModel( "8", this.Parent._performance_list[0], this.Parent._accounts_list[3], this.Parent._replication_list[0] ),
		new SpecPicker_DataItem_ViewModel( "9", this.Parent._performance_list[0], this.Parent._accounts_list[3], this.Parent._replication_list[1] ),
		new SpecPicker_DataItem_ViewModel( "10", this.Parent._performance_list[0], this.Parent._accounts_list[3], this.Parent._replication_list[2] ),
		// premium, storage
		new SpecPicker_DataItem_ViewModel( "11", this.Parent._performance_list[1], this.Parent._accounts_list[0], this.Parent._replication_list[1] ),
		// premium, storage v2
		new SpecPicker_DataItem_ViewModel( "12", this.Parent._performance_list[1], this.Parent._accounts_list[1], this.Parent._replication_list[1] ),
		// premium, block blobs
		new SpecPicker_DataItem_ViewModel( "13", this.Parent._performance_list[1], this.Parent._accounts_list[4], this.Parent._replication_list[1] ),
		new SpecPicker_DataItem_ViewModel( "14", this.Parent._performance_list[1], this.Parent._accounts_list[4], this.Parent._replication_list[3] ),
		// premium, files
		new SpecPicker_DataItem_ViewModel( "15", this.Parent._performance_list[1], this.Parent._accounts_list[2], this.Parent._replication_list[1] ),
		new SpecPicker_DataItem_ViewModel( "16", this.Parent._performance_list[1], this.Parent._accounts_list[2], this.Parent._replication_list[3] ),
	];
	this.Grid_Data = ko.observableArray( this._data || [] );


	// test each pill collection against a data set
	this.Filter_Cascade = function ( data, selected, key, result_set )
	{
		let _return_value = [];
		data.forEach( function ( v, i, a )
		{	//	console.debug( i, v.Combination(), v.Performance(), v.AccountKind(), v.Replication() );
			// match perf
			if ( selected.length > 0 )
			{
				selected.forEach( function ( v1, i1, a1 )
				{
					//	console.debug( i1, v1.Title(), v.Performance() );
					if ( v1.Title() == v[key]() )
					{
						_return_value.push( v );
					}
					return;
				} );
			}
			else if ( selected.length == 0 )
			{
				_return_value.push( v );
			}
			return;
		} );
		//	console.debug( "_return_value", _return_value.length, _return_value );	
		return _return_value;
	};
	this.Filter_Data = function ()
	{	//	console.debug( "this.Filter_Data" );
		let _perf_pill_selected = this.Performance_Pill.Options_List().filter( function (item)
		{	
			return item.IsSelected() == true;
		} );
		let _ak_pill_selected = this.AccountKind_Pill.Options_List().filter( function ( item )
		{	
			return item.IsSelected() == true;
		} );
		let _rep_pill_selected = this.Replication_Pill.Options_List().filter( function ( item )
		{	
			return item.IsSelected() == true;
		} );

		//console.debug( "_perf_pill_selected", _perf_pill_selected );
		//console.debug( "_ak_pill_selected ", _ak_pill_selected );
		//console.debug( "_rep_pill_selected ", _rep_pill_selected );

		let _perf_matches = [];
		let _account_matches = [];
		let _rep_matches = [];

		_perf_matches = this.Filter_Cascade( this._data, _perf_pill_selected, "Performance" );
		_account_matches = this.Filter_Cascade( _perf_matches, _ak_pill_selected, "AccountKind" );
		_rep_matches = this.Filter_Cascade( _account_matches, _rep_pill_selected, "Replication" );

		//	console.debug( "_rep_matches", _rep_matches.length, _rep_matches );
		if ( _rep_matches.length > 0 )
		{
			this.Grid_Data( _rep_matches );
		}
		else if ( _rep_matches.length == 0 )
		{
			this.Grid_Data( [] );
		}
		else if ( _rep_matches.length == this.Grid_Data().length)
		{
			this.Grid_Data( this._data );
		}
		return;
	};
	// supporting only single select
	this.HasSpecSelection = ko.observable(false);
	this.Selected_Spec = ko.observable();
	this.Selected_Spec.subscribe( function ( _v )
	{	//	console.debug( "this.Selected_Spec.subscribe", _v );
		if ( _v !== undefined )
		{
			_self.HasSpecSelection( true );
		}
		else
		{
			_self.HasSpecSelection( false );
		}
		return;
	}, this );
	this.OnClick_SelectSpecification = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectSpecification", );
		//	console.debug( "this.Parent.SelectedSpec_State()", this.Parent.SelectedSpec_State() );
		//	console.debug( "this.Selected_Spec()", this.Selected_Spec() );
		this.Parent.SelectedSpec_State( this.Selected_Spec() );
		this.OnClick_Discard();
		return;
	};

	// close any flyout or other thing at this level
	this.OnClick_CloseAll_Flyouts = function ()
	{	//	console.debug( "this.OnClick_CloseAll_Flyouts" );
		this.CloseAll_Pills();
		return;
	};

	// default state
	this.AccountKind_Pill.Options_List()[1].IsSelected( true );
	this.Filter_Data();
	return;
};

// Stoage Accounts Spec Picker Feature Flag 3
function SelectedSpec_ViewModel( p, a, r )
{	//	console.debug( "SpecPickerData_ViewModel" );
	this.Performance = ko.observable( p );
	this.AccountKind = ko.observable( a );
	this.Replication = ko.observable( r );
	return;
};
function TDD_Item_ViewModel(title)
{
	const _self = this;
	this.Title = ko.observable( title || "TDD_Item_ViewModel" );
	this.IsDisabled = ko.observable( false );
	this.IsSelected = ko.observable( false );
	return;
};
function TouchDropDown_ViewModel( title, data )
{
	const _self = this;
	this.Title = ko.observable(title || "TouchDropDown_ViewModel");
	this.Data = ko.observableArray( [] );

	// set data
	data.forEach( function ( v, i, a )
	{	//	console.debug( i, v );
		let _temp_item = new TDD_Item_ViewModel( v );
		_self.Data().push( _temp_item );
		return;
	} );

	this.IsDirty = ko.observable( false );
	this.Selected = ko.observable();
	
	// enable single select
	this.OnClick_SelectThisItem = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectThisItem: this.IsDisabled()", this.IsDisabled() );
		//	console.debug( "OnClick_SelectThisItem:", vm );
		if ( vm.IsDisabled() == true )
		{
			return;
		}

		_self.Selected( undefined );
		_self.Data().forEach( function ( v, i, a )
		{
			if ( v !== vm )
			{
				v.IsSelected( false );
			}
			return;
		} );

		if ( vm.IsSelected() == false )
		{
			vm.IsSelected( true );
			_self.IsDirty( true );
			_self.Selected( vm );
		}
		else	if ( vm.IsSelected() == true )
		{
			vm.IsSelected( false );
			_self.IsDirty( false );
			_self.Selected( undefined );
		}
		return;
	};

	// open and close the drop down
	this._chevron_open =  "svg/ChevronUp.svg";
	this._chevron_closed =  "svg/ChevronDown.svg";
	this.OpenCloseButton = ko.observable( this._chevron_open );
	this.DropDown_IsVisible = ko.observable( true );
	this.OnClick_OpenClose_ListPanel = function ( vm, ev )
	{
		//	console.debug( "this.OnClick_OpenClose_ListPanel::this.DropDown_IsVisible()", this.DropDown_IsVisible() );
		if ( this.DropDown_IsVisible() == true )
		{
			this.DropDown_IsVisible( false );
			this.OpenCloseButton( this._chevron_closed );
		}
		else if ( this.DropDown_IsVisible() == false)
		{
			this.DropDown_IsVisible( true );
			this.OpenCloseButton( this._chevron_open );
		}
		return;
	}
	return;
};
function SpeckPicker3_ViewModel( parentViewModel, title, template )
{	//	console.debug( "PricingDetailsViewModel", parentViewModel, rootViewModel );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel, title, template ) );
	const _self = this;
	this.Title( "Configuration picker" );
	this.ContextBladeTemplate( "ko-spec-picker3-template" );
	this.OK_Btn_Text = ko.observable( "OK" );
	this.Cancel_Btn_Text = ko.observable( "Cancel" );
	// supporting only single select
	this.HasSpecSelection = ko.observable( false );
	this.Selected_Spec = ko.observable();

	//	console.debug( "SpeckPicker3_ViewModel", this.Parent );
	//	each drop down should only ever be single select, returning one result
	this.Performance_DropDown = new TouchDropDown_ViewModel("Performance", this.Parent._performance_list );
	this.AccountKind_DropDown = new TouchDropDown_ViewModel("Account kind", this.Parent._accounts_list );
	this.Replication_DropDown = new TouchDropDown_ViewModel("Replication", this.Parent._replication_list );

	this.Controls = ko.observableArray( [
		this.Performance_DropDown,
		this.AccountKind_DropDown,
		this.Replication_DropDown,
	] );
	//	set some defaults
	//	this.AccountKind_DropDown.OnClick_SelectThisItem( this.AccountKind_DropDown.Data()[1] );
	//	this.AccountKind_DropDown.Data()[2].IsDisabled( true );

	this.IsClearing = ko.observable( false );
	this.Compute_SelectedSpec = ko.computed( function ()
	{	//	console.debug( "this.Compute_SelectedSpec", this.Selected_Spec() );
		this.Selected_Spec( new SelectedSpec_ViewModel() );

		if ( this.IsClearing() == true )
		{
			return;
		}

		//	if on the perfomance drop down is dirty
		//console.debug( "this.Performance_DropDown.IsDirty()", this.Performance_DropDown.IsDirty() );
		//console.debug( "this.AccountKind_DropDown.IsDirty()", this.AccountKind_DropDown.IsDirty() );
		//console.debug( "this.Replication_DropDown.IsDirty()", this.Replication_DropDown.IsDirty() );

		if ( this.Performance_DropDown.IsDirty() == true && this.AccountKind_DropDown.IsDirty() == false && this.Replication_DropDown.IsDirty() == false )	
		{	//	console.debug( "perf is dirty only" );
			if ( this.Performance_DropDown.Data()[0].IsSelected() == true )
			{	//	console.debug( "Standard" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.Performance_DropDown.Data()[1].IsSelected() == true )
			{	//	console.debug( "Premium" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );

				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == true && this.AccountKind_DropDown.IsDirty() == true && this.Replication_DropDown.IsDirty() == false )	
		{
			//console.debug( "PERF & ACCOUNT ARE DIRTY ONLY" );
			//console.debug( "____" );

			if ( this.Performance_DropDown.Data()[0].IsSelected() == true )
			{	//	console.debug( "Standard" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.Performance_DropDown.Data()[1].IsSelected() == true )
			{	//	console.debug( "Premium" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );

				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}

			//	console.debug( "Standard" && "Storage" );
			if ( this.Performance_DropDown.Data()[0].IsSelected() == true && this.AccountKind_DropDown.Data()[0].IsSelected() == true ||
				this.Performance_DropDown.Data()[0].IsSelected() == true && this.AccountKind_DropDown.Data()[1].IsSelected() == true)
			{	
				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.Performance_DropDown.Data()[0].IsSelected() == true && this.AccountKind_DropDown.Data()[3].IsSelected() == true)
			{	//	console.debug( "Premium" );
				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( true );
			}

			if ( this.Performance_DropDown.Data()[1].IsSelected() == true && this.AccountKind_DropDown.Data()[0].IsSelected() == true ||
				this.Performance_DropDown.Data()[1].IsSelected() == true && this.AccountKind_DropDown.Data()[1].IsSelected() == true)
			{	
				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( true );
				this.Replication_DropDown.OnClick_SelectThisItem( this.Replication_DropDown.Data()[1] );
			}
			else if ( this.Performance_DropDown.Data()[1].IsSelected() == true && this.AccountKind_DropDown.Data()[2].IsSelected() == true ||
				this.Performance_DropDown.Data()[1].IsSelected() == true && this.AccountKind_DropDown.Data()[4].IsSelected() == true)
			{	//	console.debug( "Premium" );
				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == true && this.AccountKind_DropDown.IsDirty() == false && this.Replication_DropDown.IsDirty() == true )	
		{
			//	console.debug( "PERF & REPLICATION ARE DIRTY ONLY" );
			//	console.debug( "____" );
			if ( this.Performance_DropDown.Data()[0].IsSelected() == true )
			{	//	console.debug( "Standard" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );

				if ( this.Performance_DropDown.Data()[0].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true )
				{
					this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				}
			}
			else if ( this.Performance_DropDown.Data()[1].IsSelected() == true )
			{	//	console.debug( "Premium" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );

				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );

				if ( this.Performance_DropDown.Data()[1].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true )
				{
					this.AccountKind_DropDown.Data()[0].IsDisabled( true );
					this.AccountKind_DropDown.Data()[1].IsDisabled( true );
				}
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == false && this.AccountKind_DropDown.IsDirty() == true && this.Replication_DropDown.IsDirty() == true )	
		{
			//	console.debug( "ACC & REPLICATION ARE DIRTY ONLY" );
			//	Storage
			if (
				this.AccountKind_DropDown.Data()[0].IsSelected() == true && this.Replication_DropDown.Data()[0].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[0].IsSelected() == true && this.Replication_DropDown.Data()[2].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[0].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true
			)
			{
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( true );
				this.Performance_DropDown.Data()[1].IsDisabled( true );
				this.Performance_DropDown.Data()[1].IsSelected( false );
			}
			else if ( this.AccountKind_DropDown.Data()[0].IsSelected() == true && this.Replication_DropDown.Data()[1].IsSelected() == true )
			{	//	Storage - LRS
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsSelected( false );
			}

			//	Storage V2 - everything not LRS
			if (
				this.AccountKind_DropDown.Data()[1].IsSelected() == true && this.Replication_DropDown.Data()[0].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[1].IsSelected() == true && this.Replication_DropDown.Data()[2].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[1].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true
			)
			{
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( true );
				this.Performance_DropDown.Data()[1].IsSelected( false );
				this.Performance_DropDown.OnClick_SelectThisItem( this.Performance_DropDown.Data()[0] );
			}
			else if ( this.AccountKind_DropDown.Data()[1].IsSelected() == true && this.Replication_DropDown.Data()[1].IsSelected() == true )
			{
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsSelected( false );
			}

			// files
			if (
				this.AccountKind_DropDown.Data()[2].IsSelected() == true && this.Replication_DropDown.Data()[1].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[2].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true 
			)
			{
				this.Performance_DropDown.Data()[0].IsDisabled( true );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsSelected( false );
				this.Performance_DropDown.OnClick_SelectThisItem( this.Performance_DropDown.Data()[1] );
			}

			// blob storage
			if (
				this.AccountKind_DropDown.Data()[3].IsSelected() == true && this.Replication_DropDown.Data()[0].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[3].IsSelected() == true && this.Replication_DropDown.Data()[1].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[3].IsSelected() == true && this.Replication_DropDown.Data()[2].IsSelected() == true 
			)
			{
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( true );
				this.Performance_DropDown.Data()[1].IsSelected( false );
				this.Performance_DropDown.OnClick_SelectThisItem( this.Performance_DropDown.Data()[0] );
			}

			// block blobs
			if (
				this.AccountKind_DropDown.Data()[4].IsSelected() == true && this.Replication_DropDown.Data()[1].IsSelected() == true ||
				this.AccountKind_DropDown.Data()[4].IsSelected() == true && this.Replication_DropDown.Data()[3].IsSelected() == true 
			)
			{
				this.Performance_DropDown.Data()[0].IsDisabled( true );
				this.Performance_DropDown.Data()[0].IsSelected( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsSelected( false );
				this.Performance_DropDown.OnClick_SelectThisItem( this.Performance_DropDown.Data()[1] );
			}

		}
		else if ( this.Performance_DropDown.IsDirty() == false && this.AccountKind_DropDown.IsDirty() == true && this.Replication_DropDown.IsDirty() == false )	
		{
			//	console.debug( "account is dirty only" );
			if ( this.AccountKind_DropDown.Data()[0].IsSelected() == true )
			{	//	console.debug( "Standard" );
				//	console.debug( "storage" );
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.AccountKind_DropDown.Data()[1].IsSelected() == true )
			{	
				//	console.debug( "storage v2" );
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.AccountKind_DropDown.Data()[2].IsSelected() == true )
			{	
				//	console.debug( "files" );
				this.Performance_DropDown.Data()[0].IsDisabled( true );
				this.Performance_DropDown.Data()[0].IsSelected( false );

				this.Performance_DropDown.Data()[1].IsDisabled( false );
				//	this.Performance_DropDown.Data()[1].IsSelected( true );
				this.Performance_DropDown.OnClick_SelectThisItem( this.Performance_DropDown.Data()[1] );

				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
			else if ( this.AccountKind_DropDown.Data()[3].IsSelected() == true )
			{	
				//	console.debug( "blob storage" )
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[0].IsSelected( true );

				this.Performance_DropDown.Data()[1].IsDisabled( true );
				this.Performance_DropDown.Data()[1].IsSelected( false );

				this.Replication_DropDown.Data()[0].IsDisabled( false );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( false );
				this.Replication_DropDown.Data()[3].IsDisabled( true );
			}
			else if ( this.AccountKind_DropDown.Data()[4].IsSelected() == true )
			{
				//	console.debug( "block blobs" )
				this.Performance_DropDown.Data()[0].IsDisabled( true );
				this.Performance_DropDown.Data()[0].IsSelected( false );

				this.Performance_DropDown.Data()[1].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsSelected( true );

				this.Replication_DropDown.Data()[0].IsDisabled( true );
				this.Replication_DropDown.Data()[1].IsDisabled( false );
				this.Replication_DropDown.Data()[2].IsDisabled( true );
				this.Replication_DropDown.Data()[3].IsDisabled( false );
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == false && this.AccountKind_DropDown.IsDirty() == false && this.Replication_DropDown.IsDirty() == true )	
		{
			//	console.debug( "replication is dirty only" );
			if ( this.Replication_DropDown.Data()[0].IsSelected() == true )
			{	
				//	console.debug( "RA-GRS" )
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( true );

				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );
			}
			else if ( this.Replication_DropDown.Data()[1].IsSelected() == true )
			{	
				//	console.debug( "LRS" )
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );

				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );
			}
			else if ( this.Replication_DropDown.Data()[2].IsSelected() == true )
			{	
				//	console.debug( "GRS" )
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( true );

				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );
			}
			else if ( this.Replication_DropDown.Data()[3].IsSelected() == true )
			{	
				//	console.debug( "ZRS" )
				this.Performance_DropDown.Data()[0].IsDisabled( false );
				this.Performance_DropDown.Data()[1].IsDisabled( false );

				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == true && this.AccountKind_DropDown.IsDirty() == true && this.Replication_DropDown.IsDirty() == true )	
		{
			//console.debug( "ALL THREE ARE DIRTY" );
			//console.debug( "this.Performance_DropDown.IsDirty()", this.Performance_DropDown.IsDirty() );
			//console.debug( "this.AccountKind_DropDown.IsDirty()", this.AccountKind_DropDown.IsDirty() );
			//console.debug( "this.Replication_DropDown.IsDirty()", this.Replication_DropDown.IsDirty() );


			if ( this.Performance_DropDown.Data()[0].IsSelected() == true )
			{	//	console.debug( "Standard" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( true );
				this.AccountKind_DropDown.Data()[3].IsDisabled( false );
				this.AccountKind_DropDown.Data()[4].IsDisabled( true );

				if ( this.AccountKind_DropDown.Data()[0].IsSelected() == true || this.AccountKind_DropDown.Data()[1].IsSelected() == true )
				{
					this.Replication_DropDown.Data()[0].IsDisabled( false );
					this.Replication_DropDown.Data()[1].IsDisabled( false );
					this.Replication_DropDown.Data()[2].IsDisabled( false );
					this.Replication_DropDown.Data()[3].IsDisabled( false );
				}
				else if ( this.AccountKind_DropDown.Data()[3].IsSelected() == true )
				{
					this.Replication_DropDown.Data()[0].IsDisabled( false );
					this.Replication_DropDown.Data()[1].IsDisabled( false );
					this.Replication_DropDown.Data()[2].IsDisabled( false );
					this.Replication_DropDown.Data()[3].IsDisabled( true );

					this.Replication_DropDown.OnClick_SelectThisItem( this.Replication_DropDown.Data()[3] );
					//	this.Replication_DropDown.Data()[3].IsSelected( false );
				}
			}
			else if ( this.Performance_DropDown.Data()[1].IsSelected() == true )
			{	//	console.debug( "Premium" );
				this.AccountKind_DropDown.Data()[0].IsDisabled( false );
				this.AccountKind_DropDown.Data()[1].IsDisabled( false );
				this.AccountKind_DropDown.Data()[2].IsDisabled( false );
				this.AccountKind_DropDown.Data()[3].IsDisabled( true );
				this.AccountKind_DropDown.Data()[4].IsDisabled( false );

				if ( this.AccountKind_DropDown.Data()[0].IsSelected() == true || this.AccountKind_DropDown.Data()[1].IsSelected() == true )
				{
					this.Replication_DropDown.Data()[0].IsDisabled( true );
					this.Replication_DropDown.Data()[1].IsDisabled( false );
					this.Replication_DropDown.Data()[2].IsDisabled( true );
					this.Replication_DropDown.Data()[3].IsDisabled( true );

					//	this.Replication_DropDown.Data()[1].IsSelected( true );
					if ( this.Replication_DropDown.Data()[3].IsSelected() == true )
					{
						this.Replication_DropDown.OnClick_SelectThisItem( this.Replication_DropDown.Data()[3] );
					}

					if ( this.Replication_DropDown.Data()[1].IsSelected() == false )
					{
						this.Replication_DropDown.OnClick_SelectThisItem( this.Replication_DropDown.Data()[1] );
					}

					//	this.Replication_DropDown.OnClick_SelectThisItem( this.Replication_DropDown.Data()[1] );
				}
				else if ( this.AccountKind_DropDown.Data()[2].IsSelected() == true || this.AccountKind_DropDown.Data()[4].IsSelected() == true )
				{
					this.Replication_DropDown.Data()[0].IsDisabled( true );
					this.Replication_DropDown.Data()[1].IsDisabled( false );
					this.Replication_DropDown.Data()[2].IsDisabled( true );
					this.Replication_DropDown.Data()[3].IsDisabled( false );
				}
			}
		}
		else if ( this.Performance_DropDown.IsDirty() == false && this.AccountKind_DropDown.IsDirty() == false && this.Replication_DropDown.IsDirty() == false )	
		{	//	
			//	console.debug( "NOT DIRTY!!!" );
			this.Performance_DropDown.Data().forEach( function ( v, i, a ) { v.IsSelected( false );v.IsDisabled( false ) } );
			this.AccountKind_DropDown.Data().forEach( function ( v, i, a ) { v.IsSelected( false );v.IsDisabled( false ) } );
			this.Replication_DropDown.Data().forEach( function ( v, i, a ) { v.IsSelected( false );v.IsDisabled( false ) } );
		}


		// ENABLE/DISABLE BUTTON ONLY IS ALL THREE ARE SELECTED
		// re-eval based on selected values
		// as we are setting a third value based on a user's two selections when possible
		//console.debug( "this.Performance_DropDown.Selected() ", this.Performance_DropDown.Selected() );
		//console.debug( "this.AccountKind_DropDown.Selected() ", this.AccountKind_DropDown.Selected() );
		//console.debug( "this.Replication_DropDown.Selected() ", this.Replication_DropDown.Selected() );
		if ( this.Performance_DropDown.Selected() !== undefined )
		{
			this.Selected_Spec().Performance( this.Performance_DropDown.Selected().Title() );
		}
		if ( this.AccountKind_DropDown.Selected() !== undefined )
		{
			this.Selected_Spec().AccountKind( this.AccountKind_DropDown.Selected().Title() );
		}
		if ( this.Replication_DropDown.Selected() !== undefined )
		{
			this.Selected_Spec().Replication( this.Replication_DropDown.Selected().Title() );
		}

		if ( this.Performance_DropDown.IsDirty() != false && this.AccountKind_DropDown.IsDirty() != false && this.Replication_DropDown.IsDirty() != false )	
		{
			this.HasSpecSelection( true );
		}
		else
		{
			this.HasSpecSelection( false );
		}
		return;
	}, this );

	// context blade top level button event handlers
	this.OnClick_ClearAllSelections = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ClearAllSelections", this.IsClearing() );
		this.IsClearing( true );

		this.Performance_DropDown.Data().forEach( function ( v, i, a )
		{
			v.IsSelected( false );
			v.IsDisabled( false );
			return;
		} );
		this.Performance_DropDown.IsDirty( false );
		this.Performance_DropDown.Selected( undefined );


		this.AccountKind_DropDown.Data().forEach( function ( v, i, a )
		{
			v.IsSelected( false );
			v.IsDisabled( false );
			return;
		} );
		this.AccountKind_DropDown.IsDirty( false );
		this.AccountKind_DropDown.Selected(undefined);

		this.Replication_DropDown.Data().forEach( function ( v, i, a )
		{
			v.IsSelected( false );
			v.IsDisabled( false );
			return;
		} );
		this.Replication_DropDown.IsDirty( false );
		this.Replication_DropDown.Selected(undefined);

		this.IsClearing( false );
		//	console.debug( "this.OnClick_ClearAllSelections", this.IsClearing() );
		return;
	};

	// hide/show all drop downs
	this._expand_text = "Expand all";
	this._collapse_text = "Collapse all";
	this.ExpandCollapseAll_BtnText = ko.observable( this._collapse_text );
	this.AllDropDownsCollapsed = ko.observable( true );
	this.OnClick_CollapseAllSelections = function ( vm, ev )
	{	//console.debug( "this.OnClick_CollapseAllSelections " );
		if ( this.AllDropDownsCollapsed() == false )
		{
			this.Performance_DropDown.DropDown_IsVisible( true );
			this.Performance_DropDown.OpenCloseButton( this.Performance_DropDown._chevron_open );

			this.AccountKind_DropDown.DropDown_IsVisible( true );
			this.AccountKind_DropDown.OpenCloseButton( this.AccountKind_DropDown._chevron_open );

			this.Replication_DropDown.DropDown_IsVisible( true );
			this.Replication_DropDown.OpenCloseButton( this.Replication_DropDown._chevron_open );

			this.ExpandCollapseAll_BtnText( this._collapse_text );
			this.AllDropDownsCollapsed( true );
		}
		else if ( this.AllDropDownsCollapsed() == true )
		{
			this.Performance_DropDown.DropDown_IsVisible( false );
			this.Performance_DropDown.OpenCloseButton( this.Performance_DropDown._chevron_closed );

			this.AccountKind_DropDown.DropDown_IsVisible( false );
			this.AccountKind_DropDown.OpenCloseButton( this.AccountKind_DropDown._chevron_closed );

			this.Replication_DropDown.DropDown_IsVisible( false );
			this.Replication_DropDown.OpenCloseButton( this.Replication_DropDown._chevron_closed );

			this.ExpandCollapseAll_BtnText( this._expand_text );
			this.AllDropDownsCollapsed( false );
		}
		return;
	};

	//  select a spec for the main flow
	this.OnClick_SelectSpecification = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectSpecification", );
		//	console.debug( "this.Parent.SelectedSpec_State()", this.Parent.SelectedSpec_State() );
		//	console.debug( "this.Selected_Spec()", this.Selected_Spec() );
		this.Parent.SelectedSpec_State( this.Selected_Spec() );
		this.OnClick_Discard();
		return;
	};
	return;
};


// PRICING DETAILS CONTEXT VIEW MODEL
function PricingDetails_ViewModel( parentViewModel )
{	//	console.debug( "PricingDetailsViewModel", parentViewModel, rootViewModel );
	ko.utils.extend( this, new ContextBlade_ViewModel(parentViewModel) );
	this.ContextBladeTemplate( "ko-ase-pricing-details-template" );
	return;
};

//// CREATE REOURCE GROUP CONTEXT VIEW MODEL
function CreateResourceGroup_ViewModel( parentViewModel )
{	//	console.debug( "CreateResourceGroup_ViewModel", parentViewModel );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel ) );

	this.Title( "Create a new resource group");
	this.ContextBladeTemplate( "ko-context-blade-res-group-template" );
	this.ResourceGroupName = ko.observable( "New Resource Group" );

	this.OnClick_SaveNewResourceGroupName = function ( vm, ev )
	{	//	console.debug( "CreateResourceGroup_ViewModel:OnClick_SaveNewResourceGroupName" );
		this.Parent.ResourceGroupList.push( this.ResourceGroupName() );
		this.Parent.SelectedResourceGroup( this.Parent.ResourceGroupList()[this.Parent.ResourceGroupList().length-1] );
		this.Parent.ParentViewModel.OnClick_CloseContextBlade();
		return;
	};
	return;
};

//// VIRTUAL NETWORK CONTEXT VIEW MODEL
function VirtualNetwork_ViewModel( name, region, address )
{
	this.Name = ko.observable( name );
	this.Region = ko.observable( region );
	this.Address = ko.observable( address );
	this.ListName = ko.computed( function ()
	{
		return this.Name() + ' (' + this.Region() + ')';
	}, this );
	return;
};
function VirtualNetworkContext_ViewModel( parentViewModel, mode )
{
	//	console.debug( "VirtualNetwork_ViewModel", parentViewModel );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel ) );

	this.Mode = ko.observable( mode );
	this.SaveBtnIsVisible = ko.observable( true );

	this._create_title = "Create a new virtual network";
	this._config_title = "Configure this virtual network";
	this.Title( "" );

	this.ContextBladeTemplate( "ko-context-blade-ase-configure-new-vnet-template" );

	this.VirtualMachineName = ko.observable( "New Virtual Network 1" );
	this.RegionList = ko.observableArray( [
		"North US",
		"Central US",
		"South US",
		"East US",
		"West US",
	] );
	this.Selected_Region = ko.observable( this.RegionList()[0] );
	this.AddressBlock = ko.observable( "10.1.6.0/24" );

	let _temp = new VirtualNetwork_ViewModel(
		this.VirtualMachineName(),
		this.Selected_Region(),
		this.AddressBlock() );

	this.CurrentVirtualNetwork = ko.observable(_temp);

	// SAVE
	this.OnClick_CreateNewVirtualNetwork = function ( vm, ev )
	{	//	console.debug( "OnClick_CreateNewVirtualNetwork" );
		this.Parent.VirtualNetworksList.push( this.CurrentVirtualNetwork() );
		this.Parent.Selected_VirtualNetwork( this.Parent.VirtualNetworksList()[this.Parent.VirtualNetworksList().length-1] );
		this.Parent.ParentViewModel.OnClick_CloseContextBlade();
		return;
	};
	this.OnClick_SaveNewVirtualNetwork = function ( vm, ev )
	{	//	console.debug( "OnClick_SaveNewVirtualNetwork" );
		this.Parent.ParentViewModel.OnClick_CloseContextBlade();
		return;
	};

	//create
	if ( this.Mode() == 0 )
	{
		this.Title( this._create_title );
		this.SaveBtnIsVisible( true );
	} // configure
	else if ( this.Mode() == 1 )
	{
		this.Title( this._config_title );
		this.SaveBtnIsVisible( false );
	}
	return;
};

////	 SUBNET CONTEXT VIEW MODELS
function SubNet_ViewModel( name, vnetAddress, subnetAddress, existingSubnetAddress )
{
	this.Name = ko.observable( name || "None" );
	this.VnetAddress = ko.observable( vnetAddress || "10.1.1.1/255" );
	this.SubnetAddress = ko.observable( subnetAddress || "100.100.100.1/255" );
	return;
}
function ExistingSubNet_ViewModel( name, range )
{
	this.Name = ko.observable( name );
	this.Range = ko.observable( range );
	this.NameRange = ko.computed( function ()
	{
		return this.Name() + " : " + this.Range();
	}, this );
	return;
}
function SubnetContext_ViewModel( parentViewModel )
{
	//	console.debug( "SubnetContext_ViewModel", parentViewModel );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel ) );

	this.Title( "Configure this subnet" );
	this.ContextBladeTemplate( "ko-context-blade-ase-configure-subnet-template" );

	this.Name = ko.observable( "New SubNet 1" );
	this.ExistingSubNetList = ko.observableArray( [
		new ExistingSubNet_ViewModel("default", "10.1.1.1 - 10.1.1.255"),
		//new ExistingSubNet_ViewModel("corpSubNet1", "12.1.1.1 - 12.1.1.255"),
		//new ExistingSubNet_ViewModel("prodSubNet-zags1", "14.1.1.1 - 14.1.1.255"),
		//new ExistingSubNet_ViewModel("test-www-red", "16.1.1.1 - 16.1.1.255"),
		//new ExistingSubNet_ViewModel("test-www-blue", "18.1.1.1 - 18.1.1.255"),
		//new ExistingSubNet_ViewModel("text-www.yellow", "25.1.1.1 - 25.1.1.255"),
	] );
	this.Selected_ExistingSubNet = ko.observable( this.ExistingSubNetList()[0] );
	this.AddressBlock = ko.observable( "10.10.6.0/24" );

	let _temp = new SubNet_ViewModel();

	this.CurrentSubNet = ko.observable(  _temp );

	// SAVE
	this.OnClick_SaveSubNet = function ( vm, ev )
	{	//	console.debug( "OnClick_SaveNewVirtualNetwork" );
		this.Parent.ParentViewModel.OnClick_CloseContextBlade();
		return;
	};
	return;
};


// Portal Settings Context Blade
function PortalSettings_ContextBlade_ViewModel( parentViewModel, title, subtitle, template )
{	//	console.debug( "PortalSettings_ContextBlade_ViewModel" )
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel, title, template ) );
	const _self = this;
	//	this.Parent = parentViewModel;
	this.Title( "Portal Settings" );
	this.Subtitle( "" );
	//	this.IsSelected( false );
	//	this.Index = ko.observable( 0 );
	this.BladeSize( "500px" );
	this.TemplateName( "ko-context-blade-shell-settings-template" );

	this.TabOne = ko.observable( true );
	this.TabTwo = ko.observable( false );
	this.OnClick_SelectContextTab = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectContextTab", this.TabOne(), this.TabTwo() );
		if ( this.TabOne() == true && this.TabTwo() == false )
		{
			this.TabOne( false );
			this.TabTwo( true );
		}
		else if ( this.TabOne() == false && this.TabTwo() == true )
		{
			this.TabOne( true );
			this.TabTwo( false );
		}
		return;
	};

	this.StatusList = ko.observableArray( [
		"Never",
		"After 15 minutes",
		"After 30 minutes",
		"After 45 minutes",
		"After 1 hour",
		"After 1.5 hours",
		"After 2 hours",
		"Custom duration"
	] );
	this.SelectedStatusList = ko.observable( this.StatusList()[0] );

	// GENERAL EVENTS
	this.OnChange_HandleRadioGroups = function ()
	{	//	console.debug( "OnChange_HandleRadioGroups" );
		return false;
	};
	this.OnClick_HandleCheckBoxLabels = function ()
	{	//	console.debug( "OnChange_HandleRadioGroups" );
		return true;
	};

	this.OnClick_CloseThis = function ( vm, ev )
	{	//	console.debug( "OnClick_CloseThis", vm );
		this.Parent.ContextBlade_OpenClosed( false );
		return;
	};

	// CHECKBOX INFO BUBBLES
	this.IsPopupDisplayed = ko.observable( false );
	this.PopupTop = ko.observable( 0 );
	this.Computed_PopupTop = ko.computed( function ()
	{	//	console.debug( "this.PopupTop()", this.PopupTop() );
		let _rv = this.PopupTop() + "px";	// ";left:" + this.PopupLeft() + "px";
		//	console.debug( "Computed_PopupPosition:_rv", _rv );
		return _rv;
	}, this );
	this.PopupLeft = ko.observable( 0 );
	this.Computed_PopupLeft = ko.computed( function ()
	{	//	console.debug( "this.PopupTop()", this.PopupTop() );
		let _rv = (this.PopupLeft() + 5)+ "px";	// ";left:" + this.PopupLeft() + "px";
		//	console.debug( "Computed_PopupLeft:_rv", _rv );
		return _rv;
	}, this );
	this.PopupMessages = ko.observableArray( [
		"Choose Home or Dashboard as your default landing page when signing in.",
		"Choose a color theme for the portal",
		"Make the portal easier to see by using more distinct colors.",
		"Allow pop-up notifications in the upper-right corner of the screen.",
		"Double-clicking the dashboard will rotate through the various color themes.",
		"The All resources preview lets you browse your Azure resources by leveraging Azure Resource Graph."
	] );
	this.PreviousMessageIndex = ko.observable( 0 );
	this.CurrentPopupMessage = ko.observable( this.PopupMessages()[0] );

	this.MouseElement = ko.observable();
	this.OnMove_Track = function ( vm, ev )
	{	//	console.debug( "OnMove_Track", vm, ev.srcElement );
		this.MouseElement( ev.srcElement );
		return;
	};
	this.OnMouseOver_ShowTooltip = function ( index, vm, ev )
	{	//	console.debug( "OnMouseOver_ShowTooltip", index, this.IsPopupDisplayed(), this.PopupMessages()[index], this.PreviousMessageIndex() );

		if ( this.IsPopupDisplayed() == false )
		{
			this.IsPopupDisplayed( true );
		}
		else if ( this.IsPopupDisplayed() == true )
		{
			this.IsPopupDisplayed( false );
		}

		if ( this.PreviousMessageIndex() !== index )
		{
			this.IsPopupDisplayed( true );
		}

		if ( this.IsPopupDisplayed() == true)
		{
			this.PreviousMessageIndex( index );
			this.CurrentPopupMessage( this.PopupMessages()[index] );
		//	console.debug( "ev", ev.srcElement, _self.MouseElement() );
			// get top position
			let _top = ev.srcElement.offsetTop;
			let _height = ev.srcElement.height;
			let _measure_top = document.getElementById( "context-panel-tooltip" ).getBoundingClientRect().top;
			let _measure_height = document.getElementById( "context-panel-tooltip" ).getBoundingClientRect().height;

			//hax
			if ( _measure_height > 45 )
			{
				_height = _measure_height - 45 + _height;
			}
			let _new_top = ( _top - _height );

			_self.PopupTop( _new_top );
			_self.PopupLeft( ev.srcElement.offsetLeft );

			//window.setTimeout( function ()
			//{	//	console.debug( "Closing popup" );
			//	_self.IsPopupDisplayed( false );
			//	return;
			//}, 5000 );
		}

		return;
	};
	this.OnClick_CloseToolTip = function ( vm, ev )
	{	//	console.debug( "OnClick_CloseToolTip", this.IsPopupDisplayed() );
		this.IsPopupDisplayed( false );
		return;
	};

	// DEFAULT VIEW TOGGLE
	this.Setting_DefaultView = ko.observable( "home" );
	this.OnClick_SelectDefaultPage = function (vm,ev)
	{	//	console.debug( "OnClick_InfoIcon_DefaultView", "Select yoru default view." );
		return true;
	};

	// THEMES FUNCTIONALITY
	this.Theme_Icons = ko.observableArray( [
		new ThemeIcon_ViewModel( this, "Azure Theme", SVG.Shell.theme_azure_preview.SVG ),
		new ThemeIcon_ViewModel( this, "Light Theme", SVG.Shell.theme_light_preview.SVG ),
		new ThemeIcon_ViewModel( this, "Blue Theme", SVG.Shell.theme_blue_preview.SVG ),
		new ThemeIcon_ViewModel( this, "Default Theme", SVG.Shell.theme_default_preview.SVG  ),
		new ThemeIcon_ViewModel( this, "Dark Theme", SVG.Shell.theme_black_preview.SVG ),
	] );
	this.Theme_Icons()[0].IsSelected( true );
	this.OnClick_SelectIcon = function (vm,ev)
	{	//	console.debug( "OnClick_SelectIcon", vm );
		vm.Parent().Theme_Icons().forEach( function ( v, i, a )
		{	//	console.debug( "theme_icons", i, v );
			v.IsSelected( false );
			return;
		} );
		vm.IsSelected( true );
		return;
	};

	// HIGH CONTRAST
	this.Setting_HighContrastTheme = ko.observable( "none" );
	this.OnClick_SelectContrastTheme= function (vm,ev)
	{	//	console.debug( "OnClick_SelectContrastTheme", "Select yoru default view." );
		return true;
	};

	// LANGUAGE TAB
	this.DisplayLanguages = ko.observableArray( [
		"English", "Spanish", "French", "German", "Italian", "Portuguese", "Traditional Chinese", "Korean", "Japanese"
	] );
	this.RegionalLanguages = ko.observableArray( [] );

	for ( var key in ApplicationLocales )
	{
		if ( ApplicationLocales.hasOwnProperty( key ) )
		{	//	console.log( key, ApplicationLocales[key].EnglishName, ApplicationLocales[key].NativeName );
			//	this.DisplayLanguages().push( ApplicationLocales[key].EnglishName )
			this.RegionalLanguages().push( ApplicationLocales[key].NativeName );
		}
	}

	this.SelectedDisplayLanguages = ko.observable( this.DisplayLanguages()[0] );
	this.SelectedRegionalLanguages= ko.observable( this.RegionalLanguages()[60] );

	return;
}
function ThemeIcon_ViewModel( parentViewModel, title, icon, selected )
{	//	console.debug( "ThemeIcon_ViewModel" );
	this.Parent = ko.observable( parentViewModel );
	this.Title = ko.observable( title || "No theme title" );
	this.SvgIcon = ko.observable( icon || SVG.Color.theme_azure_preview.SVG );
	this.IsSelected = ko.observable( selected || false );
	this.SelectedIcon = ko.observable( SVG.Color.alert_success_settings_theme.SVG );
	return;
};

// Columns Editor Context Blade
function ColumnsEditor_ContextBlade_ViewModel( parentViewModel )
{	//	console.debug( "ColumnsEditor_ContextBlade_ViewModel" )
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel) );
	const _self = this;
	this.Title( "Edit columns" );
	this.Subtitle( "Select the columns to be displayed" );
	this.BladeSize( "400px" );
	this.TemplateName( "ko-context-blade-columns-template" );
	this.ColumnsData = ko.observableArray( [] );

	// data
	this.ColumnsData = ko.observableArray( [] );
	this._column_names = [
		{ name: "Subscription", isChecked: true },
		{ name: "Subscription ID", isChecked: false },
		{ name: "Resource Group", isChecked: true },
		{ name: "Resource Type", isChecked: false },
		{ name: "Resource ID", isChecked: false },
		{ name: "Type", isChecked: true },
		{ name: "Location", isChecked: true },
		{ name: "Location ID", isChecked: false },
		{ name: "Name", isChecked: true },
		{ name: "Tags", isChecked: false },
		{ name: "IP Address", isChecked: false },
		{ name: "Contact", isChecked: false },
		{ name: "__gitRepoUrl__", isChecked: false },
		{ name: "Status", isChecked: false }
	];
	this._column_names.sort( function ( a, b )
	{
		return b.isChecked - a.isChecked;
	} );

	this.CreateDefaultList = function ()
	{
		this._column_names.forEach( function ( v, i, a )
		{	//	console.debug( i, v.name, v.isChecked );
			//	HAX check if tags column has previously been selected
			//if ( v.name.toLowerCase() == "tags" )
			//{
			//	if ( _self.Parent.IsVisible_TagsColumn() == true )
			//	{
			//		v.isChecked = true;
			//	}
			//}

			let _column = new ColumnNameViewModel( v.name, v.isChecked );
			_self.ColumnsData().push( _column );
			return;
		} );
		return;
	};

	this.OnClick_ToggleColumnNameIsChecked = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ToggleColumnNameIsChecked", vm.IsChecked() );
		if ( vm.IsChecked() == true )
		{
			vm.IsChecked( false );
		}
		else if ( vm.IsChecked() == false )
		{
			vm.IsChecked( true );
		}
		return;
	};
	// buttons
	this.IsOkButtonEnabled = ko.observable( true );
	this.OnClick_OkColumnSelection = function ( vm, ev )
	{	//	console.debug( "this.OnClick_OkColumnSelection", this.Parent );
		this.ColumnsData().forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			if ( v.Name().toLowerCase() == "tags" )
			{
				if ( v.IsChecked() == true )
				{
					_self.Parent.IsVisible_TagsColumn( true );
				}
				else if ( v.IsChecked() == false )
				{
					_self.Parent.IsVisible_TagsColumn( false );
				}
			}
			return;
		} );
		_self.Parent.ParentViewModel().ContextBlade_OpenClosed( false );
		return;
	};
	this.OnClick_ResetColumnSelection = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ResetColumnSelection" );
		this.CreateDefaultList();
		return;
	};
	this.OnClick_CloseColumnSelection = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ResetColumnSelection" );
		//	_self.ParentViewModel().ContextBladeTemplate( "ko-empty-template" );
		//	_self.ParentViewModel().ContextBladeViewModel( undefined );
		_self.ParentViewModel().ContextBlade_OpenClosed( false );
		return;
	};

	this.CreateDefaultList();
	return;
}
function ColumnNameViewModel( name, value )
{
	const _self = this;
	this.Name = ko.observable( name );
	this.IsChecked = ko.observable( value );
	this.OnClick_CheckBoxHandler = function ( vm, ev )
	{	//	console.debug( "OnClick_CheckBoxHandler", this.IsChecked() );
		_self.IsChecked( !_self.IsChecked() );
		return true;
	};
};

/* Tags & TagEditor edit context blade */
function TagEditor_ContextBlade_ViewModel( parentViewModel, viewModels)
{
	console.debug( "NEED CSS WORK" );
	ko.utils.extend( this, new ContextBlade_ViewModel( parentViewModel ) );
	const _self = this;
	this._multi_resource_blade_title = "Edit tags to selected resources";
	this._single_resource_blade_title = "Assign tags to this resource";
	this.Title( "Tag Editor" );
	this.Subtitle( "Edit tags for resources" );
	this.BladeSize( "500px" );
	this.TemplateName( "ko-tags-editor-context-blade-template" );
	this.ViewModels = ko.observableArray( viewModels || [] );

	// user entered tag stuff
	//let _old = this.TempTags();
	//_old.push( new Tag() );
	//this.TempTags( _old );

	this.TempTags = ko.observableArray( [new Tag()] );
	//this.TempTags.subscribe( function ( newValue )
	//{
	//	console.debug( "this.TempTags().subscribe", newValue );
	//	return;
	//}, this, "beforeChange" );

	this.OnClick_ClearCurrentTempTag = function ( vm, ev )
	{	//	console.debug( "ClearCurrentTempTag", vm );
		vm.Title( "" );
		vm.Value( "" );
		return;
	};
	this.SaveButton_Enabled = ko.computed( function ()
	{
		let _dirty_count = 0;
		this.TempTags().forEach( function ( v, i, a )
		{	///	console.debug( i, v.Title(), v.Value(), v.IsDirty() );
			if ( v.IsDirty() == true )
			{
				_dirty_count++;
			}
			return;
		} );

		//	console.debug( "_dirty_count", _dirty_count, "this.TempTags()", this.TempTags().length );
		if ( _dirty_count == 0 && this.TempTags().length == 0 )
		{
			this.TempTags( [new Tag()] );
		}
		else if ( _dirty_count == 0 && this.TempTags().length == 1 )
		{
			this.TempTags( [new Tag()] );
		}
		else if ( _dirty_count != 0 && this.TempTags().length == 1 )
		{
			let _old = this.TempTags();
			_old.push( new Tag() );
			this.TempTags( _old );
		}
		else if ( _dirty_count == 0 && this.TempTags().length == 2 )
		{
			this.TempTags( [new Tag()] );
		}
		else if ( _dirty_count != 0 && ( _dirty_count == this.TempTags().length ) )
		{
			let _old = this.TempTags();
			_old.push( new Tag() );
			this.TempTags( _old );
		}
		else if ( _dirty_count != 0 && ( _dirty_count < this.TempTags().length ) )
		{
			let _temp = [];
			this.TempTags().forEach( function ( v, i, a )
			{	///	console.debug( i, v.Title(), v.Value(), v.IsDirty() );
				if ( v.IsDirty() == true )
				{
					_temp.push( v );
				}
				return;
			} );
			_temp.push( new Tag() );
			this.TempTags( _temp );
		}

		let _rv = false;
		this.TempTags().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Title(), v.Value(), v.IsDirty() );
			if ( v.IsDirty() == true )
			{
				_rv = true;
			}
			return;
		} );

		//	console.debug( "SaveButton_Enabled::_rv", _rv );
		return _rv;
	}, this );

	// delete a tag
	this.OnClick_RemoveThisTag = function ( vm, ev )
	{	//	console.debug( "OnClick_RemoveThisTag", vm );
		_self.ViewModels().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ResourceName(), v.TagsCollection() );
			let _new_collection = [];
			v.TagsCollection().forEach( function ( v2, i2, a2 )
			{	//	console.debug( i2, v2 );
				if ( v2.Title() !== vm.Title() && v2.Value() !== vm.Value() )
				{
					_new_collection.push( v2 );
				}
				return;
			} );
			v.TagsCollection( _new_collection );
			return;
		} );
		return;
	};

	// show the validation after clicking save
	this.Validation_IsDisplayed = ko.observable( false );

	this.OnClick_SaveTagsToResource = function ()
	{	//	console.debug( "this.OnClick_SaveTagsToResource" );

		window.setTimeout( function ()
		{
			_self.Validation_IsDisplayed( true );
			_self.SaveTags();

			//	close validation banner
			window.setTimeout( function ()
			{
				_self.Validation_IsDisplayed( false );
				return;
			}, 5000 );
			return;
		}, 2000 );

		return;
	};
	this.SaveTags = function ()
	{
		let _new_collection = [];

		_self.TempTags().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ResourceName(), v.TagsCollection() );

			if ( v.IsDirty() == true )
			{
				_new_collection.push( v );
			}
			return;
		} );

		_self.TempTags( [new Tag()] );

		_self.ViewModels().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ResourceName(), v.TagsCollection() );
			v.TagsCollection().forEach( function ( v2, i2, a2 )
			{	//	console.debug( i2, v2 );
				_new_collection.push( v2 );
				return;
			} );
			v.TagsCollection( _new_collection );
			return;
		} );

		return;
	};

	return;
};

// adding a "tag" view model for collections on viewmodels and data rows
function TagGroup_ViewModel()
{
	let _self = this;
	this.ID = ko.pureComputed( function () { return "tag-group-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
	this.Title = ko.observable();
	this.TitleIsVisible = ko.observable( true );
	this.Tags = ko.observableArray( [] );

	return;
};
function Tag()
{
	const _self = this;
	this.TitleIsDirty = ko.observable( false );
	this.Title = ko.observable( "" );
	this.Title.subscribe( function ( nv )
	{
		if ( nv !== undefined )
		{
			if ( nv.length > 0 || nv != "" )
			{
				_self.TitleIsDirty( true );
			}
			else if ( nv.length == 0 || nv == "" )
			{
				_self.TitleIsDirty( false );
			}
		}
		//	console.debug( "_self.TitleIsDirty", _self.TitleIsDirty() );
		return;
	}, this );

	this.ValueIsDirty = ko.observable( false );
	this.Value = ko.observable( "" );
	this.Value.subscribe( function ( nv )
	{
		if ( nv.length > 0 || nv != "" )
		{
			_self.ValueIsDirty( true );
		}
		else if ( nv.length == 0 || nv == "" )
		{
			_self.ValueIsDirty( false );
		}
		//	console.debug( "_self.ValueIsDirty", _self.ValueIsDirty() );
		return;
	}, this );

	this.IsDirty = ko.pureComputed( function ()
	{
		let _bool = false;

		if ( this.TitleIsDirty() == true || this.ValueIsDirty() == true )
		{
			_bool = true;
		}
		//	console.debug( "Tag.IsDirty()::_bool", _bool );
		return _bool;
	}, this );

	this.HasFocus = ko.observable( false );

	return;
};