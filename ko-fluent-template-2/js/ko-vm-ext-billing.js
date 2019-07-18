// "Billing" extension for testing a new date picker design
"use strict";
function AzureBilling_ViewModel( parentViewModel, strName, iconId ) 
{
	ko.utils.extend( this, new Extension_ViewModel( parentViewModel, strName, iconId ) );
    const _self = this;
	this.ExtensionName( "Cost management + billing" );
	this.ExtensionTemplateName( "ko-Extensions-AllResources-Template" );
	this.BladeName("Cost management");
	this.BladeSubName(this.ExtensionName());
	this.BladeIcon( SVG.Color.BillingColor.SVG );
	this.NavIcon( SVG.Color.BillingColor.SVG );


    // toc data - defined for this blade
    // set up a default , likely "overview"
    // function TocNode_ViewModel(rootVM,  title, icon, TocUrls, isSelected, bladeVM )
	this.Default_ChildExtension = new ExtensionChild_ViewModel( this, undefined, "ko-ChildExtension-OverviewImg-Template", [
        { Text: "Assign tags", Image: "svg/tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
	] );

	this.CostAnalysis_ChildExtension = new CostAnalysis_ExtChildViewModel( this,
		"Contoso - Cost Analysis - FY2019",
		"ko-child-ext-template-cost-analysis",
		[
			{ Text: "Refresh", Image: "svg/Restart.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
			{ Text: "Tour", Image: "svg/MediaStart.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
			{ Text: "Export", Image: "svg/Download.svg", Action: this.OnClick_ShowCommandButtonContextBlade }
		] );

	// needs work to swap data bind for child templates just for testing purposes
	this.CurrentChildExtension = ko.observable( this.Default_ChildExtension );

	this._crumbs = [
		"Home",
		this.BladeName(),
		this.CurrentChildExtension().Title()
	];
	this.BreadCrumbs = ko.observableArray( this._crumbs );

	// SUB EXTENSION TOC STUFF
    this.TocGroup_1 = ko.observableArray([
        new TocNode_ViewModel(this, "Overview", SVG.Extensions.StorageAlt, undefined, true ),
        new TocNode_ViewModel(this, "Go to Billing account", SVG.Color.BillingColor ),
        new TocNode_ViewModel(this, "Access control (IAM)", SVG.TeamProject),
        new TocNode_ViewModel(this, "Diagnose and solve problems", SVG.Shell.Designer)
    ]);

	this.TocGroup_2 = ko.observableArray( [
        new TocNode_ViewModel(this, "Cost analysis", SVG.Color.Cost_analysis,  undefined, false, this.CostAnalysis_ChildExtension),
        new TocNode_ViewModel(this, "Budgets", SVG.Polychromatic.AvailabilitySet),
        new TocNode_ViewModel(this, "Advisor recommendations", SVG.Color.Disks),
        new TocNode_ViewModel(this, "Cloudyn", SVG.Polychromatic.SSLCustomDomains), 
    ]);

    this.TocGroup_3 = ko.observableArray([
        new TocNode_ViewModel(this, "Exports", SVG.Glyphs.Lock),
        new TocNode_ViewModel(this, "New support request", SVG.Download),
    ]);

    this.TocGroupCollection = ko.observableArray([
        new TocGroup_ViewModel("", this.TocGroup_1(), false),
        new TocGroup_ViewModel("Cost Management", this.TocGroup_2(), true),
        new TocGroup_ViewModel("Settings", this.TocGroup_3(), true),
	] );

	this.ResetTocNodeCollection = function ( vm, ev ) 
	{   //  console.debug( "ClearTocNodeCollection" );
		this.TocGroupCollection().forEach( function ( v, i, a )
		{
			v.TocGroupNodes().forEach( function ( v2, i2, a2 )
			{   //  console.debug( v2.Title(), v2.IsSelected() );
                v2.IsSelected(false);
                return;
            });
            return;
        });
		//	console.debug( vm.Title(), vm.IsSelected(), vm.TocIcon() );

		if ( vm.IsSelected() == false ) 
		{
            vm.IsSelected(true);
			//	console.debug( "vm.BladeViewModel()", vm.BladeViewModel() );

			if ( vm.BladeViewModel() !== undefined )
			{
				this.CurrentChildExtension( vm.BladeViewModel() );

				let _temp_crumbs = this.BreadCrumbs();
				_temp_crumbs[2] = vm.BladeViewModel().BladeName();
				this.BreadCrumbs( _temp_crumbs );

				this.BladeName(this.CurrentChildExtension().Title());
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

    this._toc_chevron_open = "svg/collapse-left.svg";
    this._toc_chevron_close = "svg/collapse-right.svg";
	this.TocPanel_Chevron = ko.observable( this._toc_chevron_open );
	this.TocPanel_IsOpen = ko.observable( false );
	this.OnClick_OpenClose_TocPanel = function ( vm, ev )
	{	//	console.debug( "this.OnClick_HideShow_TocPanel" );
		if ( this.TocPanel_IsOpen() == false )
		{
            this.TocPanel_IsOpen(true);
            this.TocPanel_Chevron(this._toc_chevron_close);
        }
		else if ( this.TocPanel_IsOpen() == true )
		{
            this.TocPanel_IsOpen(false);
            this.TocPanel_Chevron(this._toc_chevron_open);
        }
        return;
    };

    // EVENT HANDLERS
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{
        console.debug("this.OnClick_ShowCommandButtonContextBlade");
        return;
    };

    //	INIT & INIT_DATA
    //	this.Init_Data = function () {	//	console.debug("this.Init_Data");
    //    return;
    //	};
    //	this.Init_Data();

	this.ResetTocNodeCollection( this.TocGroup_2()[0] );
	//	this.OnClick_OpenClose_TocPanel();
    return;
};

function CostAnalysis_ExtChildViewModel(parentViewModel, strName, templateName, cmdBtns)
{
	ko.utils.extend( this, new ExtensionChild_ViewModel( parentViewModel, strName, templateName, cmdBtns ) );
	let _self = this;

	this.ScopeIcon = ko.observable( SVG.Color.BillingColor.SVG );
	this.AddFilterIcon = ko.observable( SVG.add_filter.SVG );

	this.DownChevron = ko.observable( SVG.ChevronDown.SVG );
	this.UpChevron = ko.observable( SVG.ChevronUp.SVG );

	// ALL FOR THE DATE PICKER
	this.DatePickerIcon = ko.observable( SVG.Glyphs.CalendarDate.SVG );
	this.DatePickerChevron = ko.observable( this.DownChevron() );

	//	this._default_date_range_text = "Select a range";
	this.DatePicker = new DatePickerViewModel( parentViewModel );
	this.DatePickerSelectedRange = ko.observable( this.DatePicker.SelectedDateRange() );

	this.ChartBars = ko.observableArray( [] );

	this.ComputeChain_Random_BarChartItemSections = function (shade)
	{
		const _section_colors = [
			"legend-1",
			"legend-2",
			"legend-3",
			"legend-4",
			"legend-5",
			"legend-6",
			"legend-7"
		];
		const _section_forecast_colors = [
			"legend-1-forecast",
			"legend-2-forecast",
			"legend-3-forecast",
			"legend-4-forecast",
			"legend-5-forecast",
			"legend-6-forecast",
			"legend-7-forecast"
		];

		const _section_count = 7;
		let _rv = [];

		for ( let i = 0; i < _section_count; i++ )
		{
			let _h = Math.round( (Math.random() * _section_count ) * (_section_count * 1.1) ) + "px";
			//	console.debug( "_h", _h );
			let _section = new BarSection_ViewModel();
			_section.Value(i);
			_section.Height( _h );

			if ( shade == "h" || shade == undefined )
			{
				_section.SectionColor("vert-bar-section " + _section_colors[i]);
			}
			else if ( shade == "f" )
			{
				_section.SectionColor("vert-bar-section " + _section_forecast_colors[i]);
			}

			_rv.push( _section );
		}

		//	console.debug( "_rv", _rv[0] );
		return _rv;
	};
	this.Computed_BarGraph = ko.computed( function ()
	{	//	console.debug( "Computed_BarGraph", this.DatePickerSelectedRange() );
		let _dates = this.DatePickerSelectedRange().split( "-" );
		//	console.debug( "_dates", _dates );

		if ( _dates[0] === _dates[1] )
		{
			let _one_bar = new BarChartItem_ViewModel();
			_one_bar.Sections(  this.ComputeChain_Random_BarChartItemSections() );
			this.ChartBars( [_one_bar] );
		}
		else if ( _dates[0] !== _dates[1] )
		{
			let _temp_today = new Date();
			//	console.debug( "_temp_today\t", _temp_today );
			let _today = new Date( _temp_today.getFullYear(), _temp_today.getMonth(), _temp_today.getDate() );
			//	console.debug( "_today\t\t\t", _today );

			let _forecast_today = new Date( _temp_today.getFullYear(), _temp_today.getMonth(), _temp_today.getDate() + 1 );
			// console.debug( "_forecast_today\t", _forecast_today );

			let _begin_date = new Date( _dates[0] );
			let _end_date = new Date( _dates[1] );
			//	console.debug( "_begin_date\t\t", _begin_date );
			//	console.debug( "_end_date\t\t", _end_date );

			let _new_chart_bars = [];
			const _one_day = ( 24 * 60 * 60 * 1000 ); // hours*minutes*seconds*milliseconds

			//let _diff_count = Math.round( Math.abs( ( _begin_date.getTime() - _end_date.getTime() ) / ( _one_day ) ) );
			//console.debug( "_diff_count", _diff_count );

			// less than today
			let _historic_count = 0;
			let _forecast_count = 0;

			//	console.debug( "CASE", ( _today.getTime() < _begin_date.getTime() ), ( _today.getTime() == _end_date.getTime() ) );

			let _t = _today.getTime();
			let _b = _begin_date.getTime();
			let _e = _end_date.getTime();
			//	console.debug( "values", _one_day, _t, _b, _e );

			if ( _b < _t && _e < _t || _b < _t && _e == _t )
			{
				_historic_count = Math.round( Math.abs( ( _b - _e ) / ( _one_day ) ) ) + 1;
				//	console.debug( "< < || < ==", _historic_count );
			}
			else if ( _b < _t && _e > _t )
			{
				_historic_count = Math.round( Math.abs( ( _b - _t ) / ( _one_day ) ) ) + 1;
				//	console.debug( "< > ", _historic_count );
			}
			else if ( _b == _t )
			{
				_historic_count = 1; // Math.round( Math.abs( ( _b - _t ) / ( _one_day ) ) ) + 1;
				//	console.debug( "< > ", _historic_count );
			}

			for ( let i = 0; i < _historic_count; i++ )
			{
				let _one_bar = new BarChartItem_ViewModel();
				_one_bar.Sections(  this.ComputeChain_Random_BarChartItemSections("h") );
				_new_chart_bars.push( _one_bar );
			}

			// if end date is after today
			//console.debug( "new Date() < _end_date ", _today , _end_date, _today < _end_date );
			if ( _t < _e )
			{
				_forecast_count = Math.round( Math.abs( ( _t - _e ) / ( _one_day ) ) );
				//	console.debug( "_forecast_count", _forecast_count );
			}

			for ( let i = 0; i < _forecast_count; i++ )
			{
				let _one_bar = new BarChartItem_ViewModel();
				_one_bar.Sections(  this.ComputeChain_Random_BarChartItemSections("f") );
				_new_chart_bars.push( _one_bar );
			}

			this.ChartBars( _new_chart_bars );
		}
		return;
	}, this );

	this.DatePicker_StartDate = ko.observable();
	this.DatePicker_EndDate = ko.observable();

	this.IsDisplayed = ko.observable( false );
	this.OnClick_StopBubble = function ()
	{	//	console.debug( "this.OnClick_StopBubble" );
		return false;
	};
	this.OnClick_HideDatePicker = function ()
	{	//	console.debug( "OnClick_HideDatePicker", this.IsDisplayed() );
		this.IsDisplayed( false );
		return false;
	};
	this.OnClick_ShowHideDatePicker = function ()
	{	//	console.debug( "OnClick_ShowHideDatePicker", this.IsDisplayed() );
		if ( this.IsDisplayed() == false )
		{
			this.IsDisplayed( true );
		}
		else if ( this.IsDisplayed() == true )
		{
			this.IsDisplayed( false );
		}
		return false;
	};

	// data picker button overrides
	this.OnClick_ApplyDateRange = function (vm, ev)
	{	//	console.debug( "OnClick_ApplyDateRange", vm, _self.DatePickerSelectedRange() );
		_self.DatePickerSelectedRange( vm.SelectedDateRange() );
		// UPDATE GRAPH
		_self.IsDisplayed( false );
		return;
	};
	this.OnClick_CancelDateRange = function (vm, ev)
	{	//	console.debug( "OnClick_CancelDateRange", vm, _self.DatePickerSelectedRange() );
		//	_self.DatePickerSelectedRange( _self._default_date_range_text );
		_self.IsDisplayed( false );
		return;
	};
	return;
};

function BarChartItem_ViewModel()
{
    this.ID = ko.pureComputed( function () { return "vert-bar-chart-item-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

	//  7 sections max, see dynamic generation
	//	"CostAnalysis_ExtChildViewModel.ComputeChain_Random_BarChartItemSections"
	this.Sections = ko.observableArray( [
		//new BarSection_ViewModel(),
		//new BarSection_ViewModel(),
		//new BarSection_ViewModel(),
	] );
	return;
};

function BarSection_ViewModel(height, className)
{
	this.Value = ko.observable( "Value" );
	this.Height = ko.observable( height || "30px" );
	this.SectionColor = ko.observable( className || "legend-orange" );
	return;
}