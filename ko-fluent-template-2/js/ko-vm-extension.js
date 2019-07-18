/// <reference path="../script/knockout-3.4.2.js" />
///  this.Property.subscribe( function ( newValue ) { console.debug("this.HasNodesCollection.subscribe", newValue); return; },this);
///  this.OnEventHandler = function ( vm, ev ) { console.debug("this.OnEventHandler"); return; };
///  for implied performance help - http://knockoutjs.com/documentation/deferred-updates.html

"use strict";
// extension view model base object
function Extension_ViewModel( parentViewModel, strName, svgIcon, koTemplateName)
{
    const _self = this;
	this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

	this.ParentViewModel = ko.observable( parentViewModel );
	this.ExtensionName = ko.observable( strName || "Extension Name" );		// not used?
    this.Title = ko.observable(strName || "Extension_ViewModel");					// not used?
	this.BladeName = ko.observable( strName || "Blade Name" );
	this.BladeSubName = ko.observable( "Blade Sub Name" );
	this.BladeIcon = ko.observable( svgIcon || SVG.Color.ResourceExplorer.SVG );
	this.NavIcon = ko.observable( svgIcon || SVG.Color.ResourceDefault.SVG );
	this.ContextBladeViewModel = ko.observable();
	this.ExtensionTemplateName = ko.observable( koTemplateName || "ko-Extension-Homepage-Template");
	this.CommandButtons = ko.observableArray([]);

	if ( svgIcon !== undefined )
	{
		if ( svgIcon.SVG !== undefined )
		{
			this.BladeIcon( svgIcon.SVG );
			this.NavIcon( svgIcon.SVG );
		}
	}

	this._crumbs = [ "Home", this.BladeName() ];
	this.BreadCrumbs = ko.observableArray( this._crumbs );

	this.PinButtonSVG = ko.observable(SVG.Pin.SVG);
	this.CloseButtonSVG = ko.observable( SVG.Shell.close.SVG );
	
	// procedurally, this needs to be defined before being assigned to the "metric explorer" child extension
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{
		//	console.debug( "this.OnClick_ShowCommandButtonContextBlade" );
		return;
	};

	// event handlers
	this.OnClick_CloseThisBlade = function ( vm, ev )
	{
		this.ContextBladeViewModel( [] );

		this.ParentViewModel().OnClick_HideContextBlade( vm, ev );
		this.ParentViewModel().OnClick_ShowDashboard( vm, ev );
		return;
	};

	// init & init_data
	// override and use this pattern in the inherited viewmodels
	//	to create data sets that may be needed for grids or other scenarios
	//this.Init_Data = function ()
	//{	//	console.debug( "Extension_ViewModel.Init_Data" );
	//	return;
	//};
	//this.Init_Data();
    return;
};

// extensions child view mode base object
function ExtensionChild_ViewModel( parentViewModel, extName, templateName, cmdBtns )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( extName || "Overview");
    this.DEBUGFLAG = ko.observable( false );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );

	this.ParentViewModel = ko.observable( parentViewModel );
	this.ExtensionName = ko.observable( extName || "this.ExtensionName()" );
	this.TemplateName = ko.observable( templateName || "ko-ChildExtension-Overview-Template" );
	this.BladeIcon = ko.observable( SVG.Color.ResourceGroup.SVG );
	this.BladeName = ko.observable( extName || "this.BladeName()" );

	this.OnClick_HandleClick = function ( vm, ev )
	{
		//console.debug( "ExtensionChild_ViewModel::this.OnClick_HandleClick" );
		return;
	};

	let _cmd_btns = [];
	if ( cmdBtns !== undefined )
	{
		cmdBtns.forEach( function ( v, i, a )
		{	//	console.debug( i, v );
			let _tmp = new CommandBarButton( v );
			//	console.debug( i, _tmp );
			_cmd_btns.push( _tmp );
		} );
	}

	this.CommandsBarButtons = ko.observableArray( _cmd_btns );

    return;
};


//	all resources instance, actually tied to "virtual machines" left nav element
//	see line #33 in "ko-vm-prototype.js"
function SingleVirtualMachine_ViewModel(parentViewModel, strName, iconId) {
    ko.utils.extend(this, new Extension_ViewModel(parentViewModel));
    var _self = this;
	
	this.ExtensionName(strName);
	this.BladeIcon( SVG.Color.VirtualMachines.SVG );
	this.NavIcon( SVG.Color.VirtualMachines.SVG );
	this.BladeName(strName);
	this.BladeSubName(strName);
    this.ExtensionTemplateName("ko-Extensions-AllResources-Template");
	this.listTimes = ko.observableArray([24, 23, 22]);

	this._crumbs = [
		"Home",
		this.BladeName()
	];
	this.BreadCrumbs(this._crumbs);

    this.Default_ChildExtension = new ExtensionChild_ViewModel(this, "", "ko-ChildExtension-OverviewImg-Template", [{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }]);

    this.CurrentChildExtension = ko.observable(this.Default_ChildExtension);

    // procedurally, this needs to be defined before being assigned to the "metric explorer" child extension
    this.OnClick_ShowCommandButtonContextBlade = function (vm, ev) {
        //console.debug("this.OnClick_ShowCommandButtonContextBlade");
        return;
    };

    this.TocGroup_1 = ko.observableArray([
        new TocNode_ViewModel(this, "Overview", SVG.Extensions.StorageAlt),

        new TocNode_ViewModel(this, "Activity Log", SVG.Log),
        new TocNode_ViewModel(this, "Access control (IAM)", SVG.TeamProject),
        new TocNode_ViewModel(this, "Tags", SVG.Color.Tags),
        new TocNode_ViewModel(this, "Diagnose and solve problems", SVG.Glyphs.Tools ),
        new TocNode_ViewModel(this, "Storage Explorer (preview)", SVG.Color.VirtualMachines),
    ]);

    this.TocGroup_2 = ko.observableArray([
        new TocNode_ViewModel(this, "Access Keys", SVG.Glyphs.Key),
        new TocNode_ViewModel(this, "CORS", SVG.Extensions.WebApp),
        new TocNode_ViewModel(this, "Configuration", SVG.Polychromatic.Toolbox),
        new TocNode_ViewModel(this, "Encryption", SVG.Glyphs.Lock),
        new TocNode_ViewModel(this, "Shared access signature", SVG.Link ),
        new TocNode_ViewModel(this, "Firewalls and virtual networks", SVG.Polychromatic.VirtualNetwork),
        new TocNode_ViewModel(this, "Properties", SVG.Polychromatic.Controls),
        new TocNode_ViewModel(this, "Locks", SVG.Glyphs.Lock),
        new TocNode_ViewModel(this, "Automation script", SVG.Download),
    ]);

    this.TocGroup_3 = ko.observableArray([
        new TocNode_ViewModel(this, "Blobs", SVG.Extensions.StorageContainer),
        new TocNode_ViewModel(this, "Custom domain", SVG.Polychromatic.CustomDomain ),
        new TocNode_ViewModel(this, "Soft delete", SVG.Polychromatic.Versions),
        new TocNode_ViewModel(this, "Azure CDN", SVG.Polychromatic.WebsiteStaging),
        new TocNode_ViewModel(this, "Add Azure Search", SVG.Search),
    ]);

    this.TocGroup_4 = ko.observableArray([
        new TocNode_ViewModel(this, "Files", SVG.File),
    ]);

    this.TocGroup_5 = ko.observableArray([
        new TocNode_ViewModel(this, "Tables", SVG.Extensions.StorageTableAlt),
    ]);

    this.TocGroup_6 = ko.observableArray([
        new TocNode_ViewModel(this, "Queues", SVG.Extensions.StorageQueue),
    ]);

    this.TocGroup_7 = ko.observableArray([
        new TocNode_ViewModel(this, "Resource Health", SVG.Color.ServiceHealth, undefined, false, new Jackies_ExtensionChild_ViewModel(undefined, "Resource Health", "ko-ChildExtension-Resrouce-Health-Template")),
        new TocNode_ViewModel(this, "Availability Set", SVG.Polychromatic.AvailabilitySet, undefined, false, this.Default_ChildExtension),
        new TocNode_ViewModel(this, "Disks", SVG.Color.Disks, undefined, false, new ExtensionChild_ViewModel(this, "Quick Start")),
        new TocNode_ViewModel(this, "Security", SVG.Polychromatic.SSLCustomDomains, undefined, false, new Jackies_ExtensionChild_ViewModel(this, "Test Extensions", "ko-ChildExtension-ME-PREVIEW-Template", [{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }])),  //parentViewModel, extName, templateName, cmdBtns
        new TocNode_ViewModel(this, "Endpoints", SVG.Color.VirtualMachines, undefined, false, new Jackies_ExtensionChild_ViewModel(this, "Test Extensions", "ko-ChildExtension-ME-PREVIEW-Template", [{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }])),
        new TocNode_ViewModel(this, "Extensions", SVG.Polychromatic.Extensions),
        new TocNode_ViewModel(this, "IP Addresses", SVG.Polychromatic.IPAddress),
        new TocNode_ViewModel(this, "Load Balanced Sets", SVG.Polychromatic.LoadBalancer),
        new TocNode_ViewModel(this, "Network security group", SVG.ResourceDefault),
        new TocNode_ViewModel(this, "Size", SVG.Color.VirtualMachines),
        new TocNode_ViewModel(this, "Backup", SVG.Polychromatic.Backup),
        new TocNode_ViewModel(this, "Properties", SVG.Color.VirtualMachines),
        new TocNode_ViewModel(this, "Lock", SVG.ResourceDefault),
        //new TocNode_ViewModel(this, "Metrics Explorer (preview)", undefined, undefined, false, new ExtensionChild_ViewModel(this, "Metrics Explorer (preview2)", "ko-ChildExtension-ME-PREVIEW-Template", [
        //    { Text: "Add", Image: "svg/Add.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
        //    { Text: "Refresh", Image: "svg/Restart.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
        //    { Text: "Delete", Image: "svg/Delete.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
        //    { Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }
        //])),
    ]);

    this.TocGroup_8 = ko.observableArray([
        new TocNode_ViewModel(this, "Alerts", SVG.Color.MonitorService),
        new TocNode_ViewModel(this, "Metrics", SVG.Polychromatic.Chart),
    ]);

    this.TocGroup_9 = ko.observableArray([
        new TocNode_ViewModel(this, "Diagnostics", SVG.LogDiagnostics),
        new TocNode_ViewModel(this, "New support request", SVG.Color.Advisor),
        new TocNode_ViewModel(this, "Alerts (classic)", SVG.Color.MonitorService),
    ]);

    this.TocGroupCollection = ko.observableArray([
        new TocGroup_ViewModel(" ", this.TocGroup_1(), true),
        new TocGroup_ViewModel("Settings", this.TocGroup_2(), true),
        // new TocGroup_ViewModel("Blob service", this.TocGroup_3(), true),
        // new TocGroup_ViewModel("File service", this.TocGroup_4(), true),
        // new TocGroup_ViewModel("Table service", this.TocGroup_5(), true),
        // new TocGroup_ViewModel("Queue service", this.TocGroup_6(), true),
        new TocGroup_ViewModel("Monitoring", this.TocGroup_8(), true),
        new TocGroup_ViewModel("Support + Troubleshooting", this.TocGroup_7(), true),
    ]);

    this.BladeName(this.CurrentChildExtension().Title());

    this.ResetTocNodeCollection = function (vm, ev) {   //  console.debug( "ClearTocNodeCollection" );
        this.TocGroupCollection().forEach(function (v, i, a) {
            v.TocGroupNodes().forEach(function (v2, i2, a2) {   //  console.debug( v2.Title(), v2.IsSelected() );
                v2.IsSelected(false);
                return;
            });
            return;
        });
        //  console.debug(vm.Title(), vm.IsSelected());
        if (vm.IsSelected() == false) {
            vm.IsSelected(true);
            //	console.debug( "vm.BladeViewModel()", vm.BladeViewModel() );
            if (vm.BladeViewModel() !== undefined) {
                this.CurrentChildExtension(vm.BladeViewModel());
            }
            else if (vm.BladeViewModel() == undefined) {
                this.CurrentChildExtension(this.Default_ChildExtension);
            }
            this.BladeName(this.CurrentChildExtension().Title());
        }
        //else if ( vm.IsSelected() == true )
        //{
        //    vm.IsSelected( false );
        //}
        return;
    };

    this._toc_chevron_open = "svg/collapse-left.svg";
    this._toc_chevron_close = "svg/collapse-right.svg";
    this.TocPanel_Chevron = ko.observable(this._toc_chevron_open);
    this.TocPanel_IsOpen = ko.observable(false);
    this.OnClick_OpenClose_TocPanel = function (vm, ev) {	//	console.debug( "this.OnClick_HideShow_TocPanel" );
        if (this.TocPanel_IsOpen() == false) {
            this.TocPanel_IsOpen(true);
            this.TocPanel_Chevron(this._toc_chevron_close);
        }
        else if (this.TocPanel_IsOpen() == true) {
            this.TocPanel_IsOpen(false);
            this.TocPanel_Chevron(this._toc_chevron_open);
        }
        return;
    };

    // init & init_data
    this.Init_Data = function () {	//	console.debug("this.Init_Data");
        return;
    };

    this.Init_Data();
    return;
};

// metrics explorer specific example 
function MetricsExplorer1_ViewModel( parentViewModel, strName)
{
    ko.utils.extend( this, new Extension_ViewModel(parentViewModel,strName) );
    var _self = this;

	/// blade specifics
	//	this.ParentViewModel( parentViewModel );
	this.ExtensionName( strName );
	this.BladeIcon( SVG.Color.MonitorService.SVG );
	this.NavIcon( SVG.Color.MonitorService.SVG );
	this.BladeName( "Metrics" );
	this.ExtensionTemplateName("ko-Extensions-Monitoring-Template");

	// toc data - defined for this blade
	// set up a default , likely "overview"
    // function TocNode_ViewModel(rootVM,  title, icon, TocUrls, isSelected, bladeVM )
	this.Default_ChildExtension = new ExtensionChild_ViewModel( this, "Overview" ,"ko-ChildExtension-Overview-Template" );
	this.CurrentChildExtension = ko.observable( this.Default_ChildExtension );

	// procedurally, this needs to be defined before being assigned to the "metric explorer" child extension
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{
		//console.debug( "this.OnClick_ShowCommandButtonContextBlade" );
		return;
	};

    this.TocGroup_1 = ko.observableArray( [
		new TocNode_ViewModel( this, "Overview", undefined,undefined, true, this.Default_ChildExtension ), 
		new TocNode_ViewModel( this, "Quick start", undefined,undefined, false,  new ExtensionChild_ViewModel( this, "Quick Start"  )),
		new TocNode_ViewModel( this, "Search" ),
		new TocNode_ViewModel( this, "Support" ),
		new TocNode_ViewModel( this, "Documentation" ),
        new TocNode_ViewModel( this, "Live Metrics Stream" ),
		new TocNode_ViewModel( this, "Metrics Explorer" ),
		new TocNode_ViewModel( this, "Metrics Explorer (preview)", undefined, undefined, false, new ExtensionChild_ViewModel( this, "Metrics Explorer (preview2)", "ko-ChildExtension-ME-PREVIEW-Template", [
		{ Text: "Add", Image: "svg/Add.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Refresh", Image: "svg/Restart.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Delete", Image: "svg/Delete.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }
		] ) ),
    ] );
    this.TocGroup_2 = ko.observableArray( [
        new TocNode_ViewModel( this, "Mobile apps" ),
        new TocNode_ViewModel( this, "eBooks" ),
        new TocNode_ViewModel( this, "Conditional access" ),
        new TocNode_ViewModel( this, "On-premise access" ),
        new TocNode_ViewModel( this, "Users" ),
        new TocNode_ViewModel( this, "Groups" ),
        new TocNode_ViewModel( this, "Intune roles" ),
        new TocNode_ViewModel( this, "Software updates"),
    ] );
    this.TocGroupCollection = ko.observableArray( [
        new TocGroup_ViewModel( "OVERVIEW", this.TocGroup_1(), false ),
        new TocGroup_ViewModel( "USAGE (PREVIEW)", this.TocGroup_2(), true ),
	] );

	//
	this.BladeName( this.CurrentChildExtension().Title() );

    this.ResetTocNodeCollection = function (vm,ev)
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
        //  console.debug(vm.Title(), vm.IsSelected());
        if ( vm.IsSelected() == false )
        {
			vm.IsSelected( true );
			//	console.debug( "vm.BladeViewModel()", vm.BladeViewModel() );
			if ( vm.BladeViewModel() !== undefined )
			{
				this.CurrentChildExtension( vm.BladeViewModel() );
			}
			else if ( vm.BladeViewModel() == undefined )
			{
				this.CurrentChildExtension(this.Default_ChildExtension);
			}
			this.BladeName( this.CurrentChildExtension().Title() );
        }
        //else if ( vm.IsSelected() == true )
        //{
        //    vm.IsSelected( false );
        //}
        return;
	};

	this._toc_chevron_open = "svg/collapse-left.svg";
	this._toc_chevron_close = "svg/collapse-right.svg";
	this.TocPanel_Chevron = ko.observable( this._toc_chevron_open );
	this.TocPanel_IsOpen = ko.observable( false );
	this.OnClick_OpenClose_TocPanel = function (vm,ev)
	{	//	console.debug( "this.OnClick_HideShow_TocPanel" );
		if ( this.TocPanel_IsOpen() == false )
		{
			this.TocPanel_IsOpen( true );
			this.TocPanel_Chevron( this._toc_chevron_close );
		}
		else if ( this.TocPanel_IsOpen() == true )
		{
			this.TocPanel_IsOpen( false );
			this.TocPanel_Chevron( this._toc_chevron_open );
		}
		return;
	};

	// event handlers
    // init & init_data
 //   this.Init_Data = function ()
	//{	//	console.debug("this.Init_Data");
 //       return;
 //   };

	//this.Init_Data();
    return;
};

//	"Getting Started" specific example
function GettingStarted_ViewModel( parentViewModel, strName)
{
    ko.utils.extend( this, new Extension_ViewModel(parentViewModel, strName) );
	var _self = this;
	this.ExtensionName( "Quickstart Center" );
	this.BladeIcon( SVG.Quickstart.SVG );
	this.NavIcon( SVG.Quickstart.SVG );
	this.BladeName( "Quickstart Center" );
	this.BladeSubName( "Microsoft Azure" );
	this.ExtensionTemplateName( "ko-Getting-Started-Main-Template" );

	this._crumbs = [
		"Dashboard",
		"Quickstart Center",
		"Create an Azure service",
		"Deploy or imgrate virtual machines",
		"Create a virtual machine"
	];
	this.BreadCrumbs = ko.observableArray( [
		this._crumbs[0],
		this._crumbs[1]
	] );

	this._screens = [
		"img/quick-start-center-step-1.png",
		"img/quick-start-center-step-2.png",
		"img/quick-start-center-step-3.png",
	];

	this._current_step = 0;
	this.CurrentStep_IsVisible = ko.observable( false );
	this.CurrentScreenStep = ko.observable( this._screens[this._current_step] );
	this.OnClick_StepThroughScreens = function ( vm, ev )
	{	//	console.debug( "OnClick_StepThroughScreens", vm._current_step );
		if ( vm._current_step < vm._screens.length - 1 )
		{
			vm._current_step++;
			//	console.debug( "this._current_step", vm._current_step );
			vm.CurrentScreenStep( vm._screens[vm._current_step] );

			let _temp_crumbs = vm._current_step + 1;
			//	console.debug( _temp_crumbs, vm._crumbs[_temp_crumbs] );
			let _temp = vm.BreadCrumbs();
			_temp.push( vm._crumbs[_temp_crumbs] );
			vm.BreadCrumbs( _temp );

			vm.BladeName( vm._crumbs[_temp_crumbs]);
			vm.BladeSubName( vm._crumbs[_temp_crumbs - 1]);
		}
		else if ( vm._current_step == vm._screens.length - 1 )
		{	// reset and move to the create VM extensions
			vm._current_step = 0;
			//	console.debug( "this._current_step", vm._current_step );
			vm.CurrentScreenStep( vm._screens[vm._current_step] );
			vm.CurrentStep_IsVisible( false );
			vm.BreadCrumbs( [vm._crumbs[0], vm._crumbs[1]] );
			vm.BladeName( "Quickstart Center" );
			vm.BladeSubName( "Microsoft Azure" );

			let _new_create = new SmartDefaults_CreateFlow_VMS_ViewModel( vm.ParentViewModel(), "QuickCenter VM Create", false);

			_new_create.ClickedFrom( "quickstart" );
			vm.ParentViewModel().CurrentExtensionViewModel( _new_create);
		}
		return;
	};
    return;
};