/// <reference path="spinner.js" />
/// <reference path="knockout-3.4.0.js" />
// Global ViewModel V 1
"use strict";
function QueryBuilderViewModel(title)
{
	var _self = this;
	this.ID = ko.pureComputed( function ()
	{
		return "qb-vm-" + Math.random().toPrecision( 7 ).replace( ".", "" );
	}, this );
	this.Title = ko.observable( title );

    // FOR TABS
    // KO UX interactivity
	this._qb_tab_id = ko.observable( "filter-ui-qb-tab-button" );
	this._qb_panel_id = ko.observable( "filter-ui-qb-panel-id" );
	this._qb_panel_displayed = ko.observable( false );

	this._search_tab_id = ko.observable( "filter-ui-qb-search-button" );
	this._search_panel_id = ko.observable( "filter-ui-search-panel-id" );
	this._search_panel_displayed = ko.observable( true );

	this.CurrentNubbinViewModel = ko.observable();	 
	this.ToggleUxPanels = function ( jEvent, thisViewModel )
	{	
		if ( thisViewModel.currentTarget.id == this._qb_tab_id() )
		{
			this._qb_panel_displayed( false );
			this._search_panel_displayed( true );
        }
		else if ( thisViewModel.currentTarget.id == this._search_tab_id() )
		{
			this._qb_panel_displayed( true );
			this._search_panel_displayed( false );
		}
		return;
	};
	this.CloseAllFlyouts = function ( vm, ev )
	{
		//  console.log( "this.CloseAllFlyouts", vm, ev );
		//   this.PopupHide();
		this.HidePopup();
		this.DisplayFnTypeMenu(false);
		this.CurrentNubbinViewModel("");
        this.HideAllFlyouts(vm, ev);

	    for ( var i = 0; i < vm.Filters().length; i++ )
		{	//  console.debug( "this.CloseAllFlyouts.vm.Filters()[i].IsDirty() ", vm.Filters()[i].IsDirty() );
	        if ( vm.Filters()[i].IsDirty() == true )
	        {
	            vm.Filters()[i].AcceptFieldQuery(vm.ev);
	        }
		}

		for ( var i = 0; i < vm.Functions().length; i++ )
		{	//  console.debug( "this.CloseAllFlyouts.vm.Functions()[i].IsDirty() ", vm.Functions()[i].IsDirty() );
		    if ( vm.Functions()[i].IsDirty() == true )
		    {
		        vm.Functions()[i].AcceptFieldQuery(vm,ev);
		    }
		}

		for (var i = 0; i < vm.Visualization().length; i++)
		{	//  console.debug( "this.CloseAllFlyouts.vm.Visualization()[i].IsDirty() ", vm.Visualization()[i].IsDirty() );
		    if ( vm.Visualization()[i].IsDirty() == true )
		    {
		        vm.Visualization()[i].AcceptFieldQuery( vm.Visualization()[i], undefined );
		    }
		}
		return true;
	};
	this.HideAllFlyouts = function (vm, ev)
	{	//console.log("this.HideAllFlyouts", vm, ev);
		//console.log(this.CurrentNubbinViewModel() );

		for (var i = 0; i < vm.Filters().length; i++)
		{
			//	console.debug("this.CloseAllFlyouts.vm.Filters()[i].ValuesDropDownDisplayed() ", vm.Filters()[i].ValuesDropDownDisplayed());
			if (vm.Filters()[i] !== this.CurrentNubbinViewModel())
			{
				vm.Filters()[i].FieldDropDownDisplayed(false);
				vm.Filters()[i].OperatorDropDownDisplayed(false);
				vm.Filters()[i].ValuesDropDownDisplayed(false);
			}
		}

		for (var i = 0; i < vm.Functions().length; i++)
		{
			//	console.debug("this.CloseAllFlyouts.vm.Functions()[i].ValuesDropDownDisplayed() ", vm.Functions()[i].ValuesDropDownDisplayed());
			if (vm.Functions()[i] !== this.CurrentNubbinViewModel())
			{
				vm.Functions()[i].FieldDropDownDisplayed(false);
				vm.Functions()[i].OperatorDropDownDisplayed(false);
				vm.Functions()[i].ValuesDropDownDisplayed(false);
			}
		}
		for (var i = 0; i < vm.Visualization().length; i++)
		{
			//	console.debug("this.CloseAllFlyouts.vm.Visualization()[i].FieldDropDownDisplayed() ", vm.Visualization()[i].FieldDropDownDisplayed());
			if (vm.Visualization()[i] !== this.CurrentNubbinViewModel())
			{
				vm.Visualization()[i].FieldDropDownDisplayed(false);
				vm.Visualization()[i].OperatorDropDownDisplayed(false);
				vm.Visualization()[i].ValuesDropDownDisplayed(false);
			}
		}
		return;
	};
	this.RemoveUnfinishedNubbins = function ()
	{
		// if nubbins aren't complete, when the user clicks the "search" button, remove them
		for (var i = 0; i < this.Filters().length; i++)
		{	//	console.debug("this.CloseAllFlyouts.vm.Filters()[i].IsDirty() ", this.Filters()[i].ID(), this.Filters()[i].IsDirty());
			if (this.Filters()[i].IsDirty() == false)
			{
				this.RemoveFilter(this.Filters()[i]);
				i--;
				continue;
			}
		}

		for (var _f = 0; _f < this.Functions().length; _f++)
		{	//	
			//	console.debug("this.CloseAllFlyouts.vm.Functions()[i].IsDirty() ", _f, this.Functions()[_f].ID(), this.Functions()[_f].IsDirty());
			if (this.Functions()[_f].IsDirty() == false)
			{
				this.RemoveFunction(this.Functions()[_f]);
				_f--;
				continue;
			}
		}

		return;
	};

    /* handle ctrl-enter for searching */
	this.KeyDown_HandleSearch = function ( vm, jEvent )
	{
	    if ( jEvent.ctrlKey == true && jEvent.keyCode == 10 )
	    {
	        this.RunThisQuery();
	    }
	    return;
	};

    /* "master popup" */
	this._master_popup_text = "";
    //  "LORUM IPSUM DEFAULT POP UP TEXT - LORUM IPSUM DEFAULT POP UP TEXT - LORUM IPSUM DEFAULT POP UP TEXT - LORUM IPSUM DEFAULT POP UP TEXT";
	this.MasterPopUpIsDisplayed = ko.observable( false );
	this.MasterPopUpText = ko.observable( this._master_popup_text );
	this.PopupTop = ko.observable( "0px" );
	this.PopupLeft = ko.observable( "0px" );

	this.ShowPopup = function ( vm, event, strMessage )
	{
		//	console.log("this.ShowPopup")	;//, event.srcElement);
		window.setTimeout(function ()
		{
			//  console.log( "this.ShowPopup" );
			_self.MasterPopUpText( strMessage );
			_self.MasterPopUpIsDisplayed( true );

			var _popup_height = parseInt( document.getElementById( "qb_master_popup" ).getBoundingClientRect().height );
			var _popup_width = parseInt( document.getElementById( "qb_master_popup" ).getBoundingClientRect().width );

			var _new_top = _self.GetPopupTop( vm.ID(), _popup_height ); //console.log( "_new_top", _new_top );
			_self.PopupTop( _new_top );

			var _new_left = _self.GetPopupLeft( vm.ID(), _popup_width, event ); //  console.log( "_new_left", _new_left );
			_self.PopupLeft( _new_left );
			return;
		},300);

		return;
	};
	this.HidePopup = function ( vm, event )
	{	//  console.log( "this.HidePopup" );
	    _self.MasterPopUpIsDisplayed( false );
	    _self.MasterPopUpText( "" );
	    return;
	};
	this.GetPopupTop = function ( vm_id, _ph )
	{
		var _rv = undefined;
		if (vm_id == undefined)
		{
			return;
		}
	    var _top = parseInt( document.getElementById( vm_id ).getBoundingClientRect().top ); // for paddings/margins - 4;
	    _rv = ( _top ) - ( _ph ) + "px"; //  console.log( "GetPopupTop:_rv", _rv );
	    return _rv;
	};
	this.GetPopupLeft = function ( vm_id, _popup_width, event )
	{
		//	console.log("this.GetPopupLeft", event.x, event.y);
		var _rv = undefined;
		var _src_left = event.srcElement.getBoundingClientRect().left;
		var _src_width = event.srcElement.getBoundingClientRect().width;
		//	console.log(_src_left, _src_width, _popup_width);
		_rv = (_src_left + (_src_width / 2)) - (_popup_width/2) + "px";
		//	console.log("_rv", _rv);
	    return _rv;
	};


    // KO QueryBuilder object collections
    /* Filters */
	this.Filters = ko.observableArray();
	this.Filters.subscribe( function ( newValue )
	{
	    //  console.log( "Filters.subscribe: if all filters removed, and 1 by default");
		if ( newValue.length == 0 )
		{
			//	console.log( "Filters.subscribe: if all filters removed, and 1 by default", newValue.length, newValue);
			_self.AddFilter();
		}
		return;
	} );
	this.AddFilter = function (vm, ev)
	{	//	console.log( "this.AddFilter::new FilterViewModel()" );

		this.CurrentNubbinViewModel("");
		this.HideAllFlyouts(this, ev);

		var _new_filter = new FilterViewModel( this );
		this.Filters.push( _new_filter );
		return;
	};
	this.RemoveFilter = function ( filter_vm )
	{	//	console.log( "QueryBuilderViewModel.RemoveFilter", filter_vm.ID() );
	    this.Filters.remove( filter_vm );
	    //  console.log( "this.Filters().length", this.Filters().length, filter_vm.IsDirty() );
	    if ( this.Filters().length == 1 && this.Filters()[0].IsDirty() == false )
	    {
	        this.IsFilterReady( false );
	    }
		return;
	};

    /* Functions */
	this.Functions = ko.observableArray();
	this.Functions.subscribe( function ( newValue )
	{
		//  console.log( "Functions: if all Functions removed, and 1 by default" );
		//if ( newValue.length == 0 )
		//{
		//	//	console.log( "Filters.subscribe: if all filters removed, and 1 by default", newValue.length, newValue);
		//	_self.AddFunction();
		//}
		return;
	} );
	this.AddFunction = function (vm,ev)
	{
		//	console.log( "QueryBuilderViewModel.AddFunction" );
		this.CurrentNubbinViewModel("");
		this.HideAllFlyouts(this, ev);

		var _new_function = new FunctionViewModel( this );
		this.Functions.push( _new_function );
		return;
	};
	this.RemoveFunction = function ( function_vm)
	{
		//	console.log( "QueryBuilderViewModel.RemoveFunction" );
	    this.Functions.remove( function_vm );
	    //  console.log( "this.RemoveFunction::this.Functions().length", this.Functions().length );
	    if ( this.Functions().length <1)
	    {
	        this.IsFunctionReady( false );
	    }
	    else if ( this.Functions().length == 1 && this.Functions()[0].IsDirty() == false )
	    {
	        this.IsFunctionReady( false );
	    }
	    //  console.log( "this.RemoveFunction::this.IsFunctionReady()",  this.IsFunctionReady( ));
		return;
	};

    /* function selection drop down */
	this.SelectFnMeasureText = ko.observable("Add measure function");
	this.SelectFnOtherText = ko.observable("Add other function");
	//this._selected_fn_type = ko.observable();

	this.DisplayFnTypeMenu = ko.observable(false);
	this.DisplayAddPanel = function(vm, jEvent)
	{
	    //  console.log("DisplayAddPanel.this.DisplayFnTypeMenu()", vm.DisplayFnTypeMenu());
	    if (vm.DisplayFnTypeMenu() == false)
	    {
	        vm.DisplayFnTypeMenu(true);
	    }
	    else
	    {
	        vm.DisplayFnTypeMenu(false);
	    }
	    return;
	};

    /* determine type of function */
	this.SelectFnType = function (param, vm, jEvent)
	{
	    //  console.log("SelectFnType : ", param, vm);
	    if (param == 1)
	    {
	        vm.AddFunction();
	    }
	    else
	    {
	        console.log("For future functions");
	    }
	    vm.DisplayFnTypeMenu(false);
	    return;
	};

    /* Visualization */
	this.Visualization = ko.observableArray();
	this.AddVisualization = function ()
	{   //  console.log( "this.AddVisualization" );
	    var _single_viz = new VisualizationViewModel( this );
	    this.Visualization.push(_single_viz);
		return;
	};

    /* query text & button manipulations */
	this._default_master_query = "New Advanced Query";
	this.MasterQueryIsDirty = ko.observable( false );
	this.MasterQueryText = ko.observable( this._default_master_query );
	this.ChangeMasterQueryText = ko.computed( function ()
	{
	    var _temp_query = [];
	    var _filters = [];
	    var _functions = [];

		//	 get the filters text
	    for ( var i = 0; i < this.Filters().length; i++ )
	    {
	        if ( this.Filters()[i].DisplayText() !== undefined )
	        {
	        	_filters.push(this.Filters()[i].DisplayText());
	        }
	    }
	    //	console.log("_filters", _filters);
	    _filters = _filters.join("; ");
	    //	console.log("_filters", _filters);
	    if (_filters.length > 0)
	    {
	    	_temp_query.push(_filters);
	    }

		//	 get the functions text
	    for ( var i = 0; i < this.Functions().length; i++ )
	    {
	        if ( this.Functions()[i].DisplayText() !== undefined )
	        {
	        	_functions.push(this.Functions()[i].DisplayText());
	        }
	    }
	    //	console.log("_functions", _functions);
	    _functions = _functions.join("; ");
	    //	console.log("_functions", _functions);
	    if (_functions.length > 0)
	    {
	    	_temp_query.push(_functions);
	    }

	    //	console.log("_temp_query", _temp_query, _temp_query.length);
	    if (_temp_query.length == 0)
	    {
	        this.MasterQueryText( this._default_master_query );
	        this.MasterQueryIsDirty( false );
	    }
	    else
	    {
	    	//		_temp_query = _temp_query.join(" | ");
	    	_temp_query.push(this.Visualization()[0].DisplayText());
	    	_temp_query = _temp_query.join(" | ");
	    	//	console.debug("this.MasterQueryText:_temp_filter_query", _temp_query);
	    	//_temp_query = _temp_query.join(" ");
	    	//console.debug("this.MasterQueryText:_temp_filter_query", _temp_query);
	    	this.MasterQueryText(_temp_query);
	        this.MasterQueryIsDirty( true );
	    }
	    //  console.debug( "this.MasterQueryText:", this.MasterQueryText() );
	    return;
	}, this );

	this.IsFilterReady = ko.observable( false );
	this.IsFunctionReady = ko.observable( false );
	this.IsQueryReady = ko.observable( false );
	this.IsSearchButtonEnabled = ko.observable( false );

    /* results related */
	this.SplashPanelDisplayed = ko.observable( true );
	this.SearchPanelDisplayed = ko.observable( true );
	this.ResultsPanelDisplayed = ko.observable( false );
	this.SpinnerPanelDisplayed = ko.observable( false );

	this.CheckQueryReady = ko.computed( function ()
	{
	    //  console.log( "this.CheckQueryReady", this.IsQueryReady() );
	    //console.log( "this.IsSearchButtonEnabled", this.IsSearchButtonEnabled() );
	    //console.log( "this.IsQueryReady()", this.IsQueryReady() );
	    //console.log( "this.IsFilterReady()", this.IsFilterReady() );
	    //console.log( "this.IsFunctionReady()", this.IsFunctionReady() );
	    if ( this.IsFilterReady() == true || this.IsFunctionReady() == true )
	    {
	        this.IsQueryReady( true );
	        this.IsSearchButtonEnabled( false );
	    }
	    else
	    {
	        this.IsQueryReady( false );
	        this.IsSearchButtonEnabled( true );
        }
	    return;
	}, this );
	this.ResetThisQuery = function ()
	{
		//	console.log( "QueryBuilderViewModel::this.ResetThisQuery()" );
		this.Filters([]);
		this.Functions([]);
		this.Visualization([]);
		this.AddVisualization();
		this.IsFilterReady( false );
		this.IsFunctionReady( false );
		this.IsQueryReady( false );
		this.MasterQueryText( this._default_master_query );
		this.CloseAllFlyouts( this );
		this.SplashPanelDisplayed( true );
		this.SearchPanelDisplayed( true );
		this.SpinnerPanelDisplayed( false );
		this.ResultsPanelDisplayed( false );
		return;
	};
	this.RunThisQuery = function ()
	{
	    //console.log( "this.IsSearchButtonEnabled", this.IsSearchButtonEnabled() );
	    //console.log( "this.IsQueryReady()", this.IsQueryReady() );
	    //console.log( "this.IsFilterReady()", this.IsFilterReady() );
	    //console.log( "this.IsFunctionReady()", this.IsFunctionReady() );

	    var _qb = this;
	    if ( this.IsQueryReady() == true )
	    {
	        this.CloseAllFlyouts( this );
	        this.RemoveUnfinishedNubbins();

	        _qb.SplashPanelDisplayed( false );
	        _qb.SearchPanelDisplayed( false );
	        _qb.SpinnerPanelDisplayed( true );
	        _qb.ResultsPanelDisplayed( false );

	        window.setTimeout( function ()
	        {
	            _qb.SpinnerPanelDisplayed( false );
	            _qb.ResultsPanelDisplayed( true );
	            //   pick the default visualization 
	            //  console.log("running query - viz", _qb.Visualization()[0].VisualizationType() );
	            //  console.log( "this.ResultsTabs", _qb.ResultsTabs() );

	            for ( var i = 0; i < _qb.ResultsTabs().length; i++ )
	            {
	                //  console.log( "_qb.ResultsTabs()", _qb.Visualization()[0].VisualizationType(), _qb.ResultsTabs()[i].TabName(), _qb.ResultsTabs()[i].ResultImage() );
	                _qb.ResultsTabs()[i].ResultTabVisible( false );

	                if ( _qb.ResultsTabs()[i].TabName().toLowerCase() == "list" )
	                {
	                    _qb.ResultsTabs()[i].ResultTabVisible( true );
	                    _qb.ResultsTabs()[i].ResultTabSelected( false );
	                }
	                    	                    
	                if( _qb.Visualization()[0].VisualizationType() == _qb.ResultsTabs()[i].TabName() )
	                {
	                    _qb.ResultsTabs()[i].ResultTabVisible( true );
	                    _qb.ResultsTabs()[i].ResultTabSelected( true );
	                    _qb.Results_Selected_Image( _qb.ResultsTabs()[i].ResultImage() );
	                }
	            }

	            return;
	        }, 2500 );
	    }
	    else
	    {
	   	    alert( "Please create a query"); 
	    }
	    return;
	};

    /* INIT DEFAULTS */
	this.AddFilter();
    //  this.AddFunction();
	this.AddVisualization();

    /* add visualiation data for results tabs */
	this.ResultsTabs = ko.observableArray( [] );
	this.Results_Selected_Image = ko.observable();
	this.InitResultsTabs = function ()
	{
	    //  console.log( "this.Visualization().Data", this.Visualization()[0].Data );
	    for ( var i = 0 ; i < this.Visualization()[0].Data.length; i++)
	    {
	        //  console.log( "this.Visualization().Data", this.Visualization()[0].Data[i].shortKey );
	        var rt = new ResultTab(
                this.Visualization()[0].Data[i].shortKey,
                this.Visualization()[0].Data[i].icon,
                this.Visualization()[0].Data[i].result_image,
                false);

	        this.ResultsTabs.push( rt );
	    }
        return;
	};
	this.SwitchResultsTabs = function ( vm, event )
	{
	    //  console.log( "this.SwitchResultsTabs", vm );
	    for ( var i = 0; i < _self.ResultsTabs().length; i++ )
	    {
	        //  console.log( "_qb.ResultsTabs()", _qb.Visualization()[0].VisualizationType(), _qb.ResultsTabs()[i].TabName(), _qb.ResultsTabs()[i].ResultImage() );
	        //    this.ResultsTabs()[i].ResultTabVisible( false );
	        if ( _self.ResultsTabs()[i].ResultTabVisible() == true )
	        {
	            //  console.log( _self.ResultsTabs()[i].TabName() );
	            _self.ResultsTabs()[i].ResultTabSelected( false );
	        }

	        //  console.log( _self.ResultsTabs()[i].TabName(), vm.TabName() );
	        if ( _self.ResultsTabs()[i].TabName() == vm.TabName() )
	        {
	            _self.ResultsTabs()[i].ResultTabSelected( true );
	            _self.Results_Selected_Image( vm.ResultImage() );
	        }
	    }
	    return;
	};
	this.InitResultsTabs();
	return;
}

function ResultTab( name, icon, image, visible )
{
    var _self = this;
    this.Id = ko.pureComputed( function ()
    {
        return "qb-result-vm-" + Math.random().toPrecision( 7 ).replace( ".", "" );
    }, this );
    this.TabName = ko.observable( name );
    this.TabIcon = ko.observable( icon );
    this.ResultImage = ko.observable( image );
    this.ResultTabVisible = ko.observable( visible );
    this.ResultTabSelected = ko.observable( false );
    // this.ResultsTabDisabled = ko.observable( false );
    return;
}