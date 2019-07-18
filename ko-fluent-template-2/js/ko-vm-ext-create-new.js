/// <reference path="../script/knockout-3.5.0.js" />
"use strict";
// expired - OLD CREATE BEGINNING
function CreateNew_ViewModel( parentViewModel )
{
	ko.utils.extend( this, new Extension_ViewModel( parentViewModel ) );

    const _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

	this.BladeIcon( SVG.Color.NewPlusSign.SVG );
	this.ExtensionTemplateName( "ko-Extension-Create-New-Template" );
	this.BladeName("Create a new resource");
	this.ExtensionName( "Create" );
	this.BladeSubName("All new resources" );
	//	this.ContextBladeViewModel();

	this._crumbs = [
		"Home",
		"New",
		"Marketplace",
		"Compute",
		"Windows Server",
		//	this.BladeName(),
	];
	this.BreadCrumbs( this._crumbs );
	this.ServerList = ko.observableArray( [
		new WindowsServer_ViewModel( "Windows Server 2016 Datacenter" ),
		new WindowsServer_ViewModel( "Windows Server 2016 - Server Core" ),
		new WindowsServer_ViewModel( "Windows Server 2016 Datacenter with Containers" ),
		new WindowsServer_ViewModel( "Windows Server, version 1709" ),
		new WindowsServer_ViewModel( "Windows Server, version 1709 with Containers" ),
		new WindowsServer_ViewModel( "Windows Server 2012 R2 Datacetner" ),
		new WindowsServer_ViewModel( "Windows Server 2012 Datacetner" ),
		new WindowsServer_ViewModel( "Windows Server 2008 R2 SP1" ),
		new WindowsServer_ViewModel( "Windows Server 2008 R2" ),
		new WindowsServer_ViewModel( "Windows Server 2008" ),
		new WindowsServer_ViewModel( "HPC Pack 2012 Compute Node on Windows Server 2012 R2" ),
		new WindowsServer_ViewModel( "HPC Pack 2012 Compute Node with Excel on Windows Server 2012 R2" ),
		new WindowsServer_ViewModel( "[smalldisk] WIndows Server 2016" ),
		new WindowsServer_ViewModel( "[smalldisk] WIndows Server 2012 R2" ),
		new WindowsServer_ViewModel( "[smalldisk] WIndows Server 2012" ),
		new WindowsServer_ViewModel( "[smalldisk] WIndows Server 2012 Datacenter" ),
		new WindowsServer_ViewModel( "[smalldisk] WIndows Server 2016 Datacenter - Server Core" ),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
		new WindowsServer_ViewModel(),
	] );

	// event handlers
	this.OnClick_Open_SmartDefaults = function ( vm, ev )
	{
		//	console.debug( "OnClick_Open_SmartDefaults", _self );
		//	IF CONTEXT BLADE IS OPEN
		//	_self.ParentViewModel().CurrentContextBladeViewModel( [] );
		//	_self.ParentViewModel().OnClick_HideContextBlade( vm, ev );
		//	_self.ParentViewModel().OnClick_ShowDashboard( vm, ev );
		let _smart_defaults_view_model = new SmartDefaults_CreateFlow_VMS_ViewModel( _self.ParentViewModel() );
		_self.ParentViewModel().CurrentExtensionViewModel( _smart_defaults_view_model );
		return;
	};
    return;
};
function WindowsServer_ViewModel( title, subtitle, icon )
{
    const _self = this;
	this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( title || "Windows Server" );
	this.SubTitle = ko.observable( subtitle || "Microsoft" );
	this.Icon = ko.observable( "img/windows-server-115x115.png" );
	return;
};


//	being used
//	C:\_git\General-Prototyping\azure-template\ko-fluent-template-1\js\ko-vm-ext-marketplace-new.js
function SmartDefaults_CreateFlow_VMS_ViewModel( parentViewModel, strName, smartDefaultsFlag )
{
    ko.utils.extend( this, new Extension_ViewModel(parentViewModel, strName) );
	const _self = this;

	this._smart_defaults_1 = {
		extensionName: "Choose recommended defaults that match your work load",
		bladeName: "Choose recommended defaults that match your work load",
		bladeSubName: "",
		breadCrumbs: ["Home", "New", "Choose recommended defaults that match your workload"],
		template: "ko-create-smart-defaults-template",
		icon: SVG.Test.rush_cloud_green.SVG,
		workflowIcon: SVG.Test.green_check.SVG,
	};
	this._smart_defaults_2 = {
		extensionName: "Choose recommended defaults that match your work load",
		bladeName: "Choose recommended defaults that match your work load",
		bladeSubName: "",
		breadCrumbs: ["Home", "New", "Choose recommended defaults that match your workload"],
		template: "ko-create-smart-defaults-template",
		icon: SVG.Test.rush_cloud_green.SVG,
		workflowIcon: SVG.Test.green_checkmark.SVG,
	};
	this._create_vms_defaults = {
		extensionName: "Create virtual machines",
		bladeName: "Create a virtual machine",
		bladeSubName: "Create virtual machines",
		breadCrumbs: ["Home", "New", "Create a virtual machine"],
		template: "ko-create-smart-defaults-template"// "ko-create-flow-vms-tabs-template"
	};

	//this.ClickedFromAdd = ko.observable();
	this.Defaults = ko.observable( this._smart_defaults_2 );
	this.ClickedFrom = ko.observable( "" );
	this.IsSmartDefaults = ko.observable( smartDefaultsFlag );
	//	console.debug( smartDefaultsFlag, this.IsSmartDefaults() );

	if ( this.IsSmartDefaults() == true )
	{
		this.Defaults( this._smart_defaults_2 );
	}
	else if ( this.IsSmartDefaults() == false )
	{
		this.Defaults( this._create_vms_defaults );
	}
	
	this.ExtensionTemplateName( this.Defaults().template );
	this.ExtensionName( this.Defaults().extensionName );
	this.BladeName( this.Defaults().bladeName );
	this.BladeSubName( this.Defaults().bladeSubName );
	this.BreadCrumbs( this.Defaults().breadCrumbs );
	this.BladeIcon( this.Defaults().icon );
	this.NavIcon( this.Defaults().icon ); 

	// FEATURE FLAG STUFF FOR TESTING
	this.InLineHelp_FF_IsVisible = ko.observable( false );
	this.SmartDefaults_FeatureFlag = ko.observable();
	if ( this.ParentViewModel().FeatureFlags().length > 0 )
	{
		this.SmartDefaults_FeatureFlag( this.ParentViewModel().FeatureFlags()[0].value );
		//	console.debug( "this.SmartDefaults_FeatureFlag", this.SmartDefaults_FeatureFlag() );
		switch ( this.SmartDefaults_FeatureFlag() )
		{
			case "right":
				{
					this.InLineHelp_FF_IsVisible( true );
					break;
				}
			default:
				{
					this.InLineHelp_FF_IsVisible( false );
					break;
				}
		}
	}

	// CALLOUT control specifics

	//	this.CurrentContentIndex = ko.observable( 0 );
	this.CurrentCallOut = ko.observable( new CallOut_ViewModel( _self ) );
	this.CurrentCallOut_IsClicked = ko.observable( false );
	this.OnMouseOver_ShowCallOut = function(contentIndex,vm,ev)
	{	//	console.debug( "this.OnHover_ShowCallOut", contentIndex, _self.CurrentCallOut() );
		let _data = CalloutData[contentIndex];
		//	console.debug( "OnHover_ShowCallOut._data", CalloutData, _data, this.SmartDefaults_FeatureFlag() );

		let _new_callout = new CallOut_ViewModel(_self, ev);
		_new_callout.Type( _data.type );
		_new_callout.Header( _data.title );
		_new_callout.PopupMessages( _data.messages );
		_new_callout.CurrentPopupMessage( _data.messages[0] );

		if ( this.SmartDefaults_FeatureFlag() !== undefined )
		{	//	for future use, see "CalloutDirection" object in "CallOut_ViewModel"
			//	_new_callout.DisplayDirection( this.SmartDefaults_FeatureFlag() );
			_new_callout.DisplayDirection( CalloutDirection.Right );
		}
		_new_callout.IsPopupDisplayed( true );

		_self.CurrentCallOut( _new_callout );
		//this has to happen, after the tooltip is rendered, to get the full size including inner content
		_new_callout.SetPosition();
		return;
	};
	this.OnMouseOut_HideCallOut = function ( vm, ev )
	{	//`console.debug( "this.OnMouseOut_HideCallOut", _self.CurrentCallOut(), _self.CurrentCallOut_IsClicked() );
		window.setTimeout( function ()
		{
			if ( _self.CurrentCallOut_IsClicked() == false )
			{
				_self.CurrentCallOut().IsPopupDisplayed( false );
			}
			return;
		}, 200 );
		return;
	};
	this.OnClick_PersistCallout = function ( vm, ev )
	{	//	console.debug( "this.OnClick_PersistCallout", _self.CurrentCallOut() );
		this.CurrentCallOut_IsClicked( true );
		return;
	};
	this.Hide_CurrentCallout = function (vm,ev)
	{	//	console.debug( "this.Hide_CurrentCallout" );
		_self.CurrentCallOut().IsPopupDisplayed( false );
		_self.CurrentCallOut_IsClicked( false );
		return;
	};

	//	SMART DEFAULT OBSERVABLES
	//	this.SmartDefaults_Icon = ko.observable( this.Defaults().icon );
	this.SmartDefaults_Icon = ko.observable( "svg/rush-cloud-green.svg" );
	this.SmartDefaults_Icon_2 = ko.observable( SVG.Test.rush_cloud_green.SVG );

	this.CheckMarkIcon = ko.observable( this.Defaults().workflowIcon );
	this.WorkFlowStepOneIcon = ko.observable( SVG.Test.blue_number_one.SVG );
	this.WorkFlowStepTwoIcon = ko.observable( SVG.Test.blue_number_two.SVG );

	this.Family_Icon = ko.observable( SVG.Test.vm_family_icon.SVG);
	this.CPU_Icon = ko.observable( SVG.Test.vm_cpu_icon.SVG );
	this.WorkloadType_Icon = ko.observable( SVG.Test.vms_workload_icon.SVG );
	this.WindowsDatacenter_Icon = ko.observable( SVG.Test.windows_server_2019.SVG );
	this.VMSets_Icon = ko.observable( SVG.Test.virtual_machine_grouped.SVG );
	this.LoadBalancer_Icon = ko.observable( SVG.Test.load_balancer_2019.SVG );
	this.UltraDisks_Icon = ko.observable( SVG.Test.ultra_ssd.SVG );

	// events 
	// handle radio button groups
	this.SelectedWorkEnv = ko.observable( "general-env" );
	this.SelectedWorkType = ko.observable( "memory-type" );

	this.OnChange_HandleRadioButtonGroup = function ( vm, ev )
	{	//	console.debug( "this.OnChange_HandleRadioButtonGroup");
		return false;
	};
	this.OnClick_Select_Workload_Env = function (vm, ev )
	{	//	console.debug( "this.OnClick_Select_Workload_Env", this.SelectedWorkEnv() );
		return true;
	};
	this.OnClick_Select_Workload_Type = function (vm, ev )
	{	//	console.debug( "this.OnClick_Select_Workload_Type", this.SelectedWorkType() );
		return true;
	};
	// handle create button

	// "SMART DEFAULTS" DATA PASSTHROUGH
	this._vm_avail_default = ["High availibility is recommended for ", "production/mission critical workloads."];
	this.VM_Avail_Values = ko.observableArray( this._vm_avail_default );

	this._vm_size_default = ["Basic D2s v3", "2 vcpus, 8 GB memory", "D-series is recommended for", "general purpose workloads."];
	this._vm_size_memory = ["Standard E1s V3", "1 vcpu, 3.5 GB memory", "E-Series is recommended for", "memory optimized workloads."];	
	this._vm_size_compute = ["Standard F1 v2", "1 vcpu, 3.5 GB memory","F-Series is recommended for","compute optimized workloads." ];
	this.VM_Size_Values = ko.observableArray( this._vm_size_default );

	this._vm_prem_disk_default = ["Premium SSD is recommended for", "general purpose workloads."];
	this._vm_prem_disk_memory = ["Premium SSD is recommended for", "production/mission critical workloads."];
	this.VM_PremiumDisk_Values = ko.observableArray( this._vm_prem_disk_default );


	this._vm_mngt_general = ["Azure Security Center (basic plan) is recommended for","general workloads."];
	this._vm_mngt_prod = ["Azure Security Center (basic plan) is recommended for", "production/mission critical workloads."];
	this.VM_Mngt_Values = ko.observableArray( this._vm_mngt_general );


	this._vm_backup_default = ["Azure backup is recommmended for", "production/mission critical workloads."];
	this.VM_Backup_Values = ko.observableArray( this._vm_backup_default );

	//this.OnClick_SkipThisStep = function ( vm, ev )
	//{	//	console.debug( "OnClick_SkipThisStep " );
	//	_self.SelectedWorkEnv( "general-env"  ); 
	//	_self.SelectedWorkType( "memory-type" );
	//	_self.OnClick_CreateNewVM( vm, ev );
	//	return;
	//};
	this.OnClick_CreateNewVM = function ( vm, ev )
	{	//	console.debug( "this.OnClick_CreateNewVM" );
		//	console.debug( "this.SelectedWorkEnv", this.SelectedWorkEnv() );
		//	console.debug( "this.SelectedWorkType", this.SelectedWorkType() );

		this.ClickedFrom( "smart-defs" );
		this.IsSmartDefaults( false );
		this.Defaults( this._create_vms_defaults );

		// dont need to refresh the template, just do an visible toggle
		//	this.ExtensionTemplateName( this.Defaults().template );
		this.ExtensionName( this.Defaults().extensionName );
		this.BladeName( this.Defaults().bladeName );
		this.BladeSubName( this.Defaults().bladeSubName );
		this.BladeIcon( this.Defaults().icon ); 

		// hacking for state navigation
		let _new_sm_bc = [
			this.Defaults().breadCrumbs[0],
			this.Defaults().breadCrumbs[1],
			this._smart_defaults_2.breadCrumbs[2],
			this.Defaults().breadCrumbs[2]
		];
		//`console.debug( "_new_sm_bc", _new_sm_bc );
		this.BreadCrumbs( _new_sm_bc);

		//	console.debug( "this.SelectedWorkEnv", this.SelectedWorkEnv() );
		//	dev-env, general-env, prod-env
		switch ( this.SelectedWorkEnv() )
		{
			case "dev-env": {
				this.SelectedDiskType( this.OSDiskTypes()[1] );
				this.AzureSecurityPlan_Toggle( "off" );
				this.Backup_Toggle( "off" );
				this.SelectedAvailabilityOptions( this.AvailabilityOptions()[0] );
				this.VM_PremiumDisk_Values( this._vm_prem_disk_default );
				this.VM_Mngt_Values( this._vm_mngt_general );
				break;
			}
			case "general-env": {
				this.SelectedDiskType( this.OSDiskTypes()[0] );
				this.AzureSecurityPlan_Toggle( "on" );
				this.Backup_Toggle( "off" );
				this.SelectedAvailabilityOptions( this.AvailabilityOptions()[0] );
				this.VM_PremiumDisk_Values( this._vm_prem_disk_default );
				this.VM_Mngt_Values( this._vm_mngt_general );
				break;
			}
			case "prod-env": {
				this.SelectedDiskType( this.OSDiskTypes()[0] );
				this.AzureSecurityPlan_Toggle( "on" );
				this.Backup_Toggle( "on" );
				this.SelectedAvailabilityOptions( this.AvailabilityOptions()[1] );
				this.VM_PremiumDisk_Values( this._vm_prem_disk_memory );
				this.VM_Mngt_Values( this._vm_mngt_prod );
				break;
			}
		}

		// configure vm disk sizes text & values from smart default selection
		switch ( this.SelectedWorkType() )
		{
			case "memory-type": {
				this.VM_Size_Values( this._vm_size_default );
				break;
			}
			case "general-type": {
				this.VM_Size_Values( this._vm_size_memory );
				break;
			}
			case "compute-type": {
				this.VM_Size_Values( this._vm_size_compute  );
				break;
			}
			default:
			{
				this.VM_Size_Values( this._vm_size_default );
				break;
			}
		}

		this.VM_Size_Values();

        this.TabButtons().forEach( function ( v, i, a )
        {   //  console.debug( i, v.Title(), v.Index(), v.IsSelectedTab() );
            v.IsSelectedTab( false );
        } );
		this.TabButtons()[0].IsSelectedTab( true );
		this.OnClick_SelectTab(this.TabButtons()[0]);
		return;
	};

	// special hax to mimic navigating the bread crumbs
	this.Alert_ChangingSmartDefaults = function ()
	{
		let _value = confirm( "Navigating away from this page will cause you to lose your existing settings" );
		//	console.debug( "Alert_ChangingSmartDefaults._value", _value );
		return _value;
	};
	this.OnClick_NavigateBackToSmartDefaults = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavigateBackToSmartDefaults", vm, _self._create_vms_defaults.breadCrumbs[2], _self.SmartDefaults_FeatureFlag() );
		let _nav_back = _self.Alert_ChangingSmartDefaults();

		if ( _nav_back == true )
		{
			if ( vm == _self._create_vms_defaults.breadCrumbs[2]
				|| vm == _self._smart_defaults_2.breadCrumbs[2] )
			{
				_self.ClickedFrom( "create-vms" );
				_self.IsSmartDefaults( true );

				_self.Defaults( _self._smart_defaults_2 );
				_self.ExtensionName( _self.Defaults().extensionName );
				_self.BladeName( _self.Defaults().bladeName );
				_self.BladeSubName( _self.Defaults().bladeSubName );
				_self.BreadCrumbs( _self.Defaults().breadCrumbs );
				_self.BladeIcon( _self.Defaults().icon );
			}
		}

		return;
	};
	this.OnClick_FromChangeDefaultsLinks = function ( vm, ev )
	{	//	console.debug( "OnClick_FromChangeDefaultsLinks", _self.ClickedFrom() );
		let _nav_back = _self.Alert_ChangingSmartDefaults();

		if ( _nav_back == true )
		{
			_self.ClickedFrom( "marketplace-no-smart-defs" );
			_self.IsSmartDefaults( true );
			_self.Defaults( _self._smart_defaults_2 );
			_self.ExtensionName( _self.Defaults().extensionName );
			_self.BladeName( _self.Defaults().bladeName );
			_self.BladeSubName( _self.Defaults().bladeSubName );
			_self.BreadCrumbs( _self.Defaults().breadCrumbs );
			_self.BladeIcon( _self.Defaults().icon ); 
		}
		return;
	};
	this.OnClick_CloseBackToSmartDefaults = function ( vm, ev )
	{	//	console.debug( "this.OnClick_CloseBackToSmartDefaults", this.ClickedFromAdd(), this.IsSmartDefaults() );
		//	console.debug( "REFACTORED FOR MARKETPLACE->SMAR DEFAULTS->CREATE" );
		//	console.debug( "self.ClickedFrom()", _self.ClickedFrom() );

		let _nav_back = _self.Alert_ChangingSmartDefaults();

		if ( _nav_back == true )
		{
			switch ( _self.ClickedFrom() )
			{
				case "marketplace-no-smart-defs":
					{
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[0] );
						break;
					}
				case "marketplace-smart-defs":
					{
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[0] );
						break;
					}
				case "vms-browse-blade":
					{
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[5] );
						break;
					}
				case "smart-defs":
					{
						//_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[0] );
						break;
					}
				case "create-flow":
					{
						//_self.ClickedFrom( "marketplace-smart-defs" );
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[0] );
						break;
					}
				case "quickstart":
					{
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().ExtensionViewModelCollection()[7] );
						break;
					}
				default:
					{
						_self.ParentViewModel().CurrentExtensionViewModel( _self.ParentViewModel().DefaultHomeExtension() );
						break;
					}
			}

			_self.IsSmartDefaults( true );
			_self.Defaults( _self._smart_defaults_2 );

			_self.ExtensionName( _self.Defaults().extensionName );
			_self.BladeName( _self.Defaults().bladeName );
			_self.BladeSubName( _self.Defaults().bladeSubName );
			_self.BreadCrumbs( _self.Defaults().breadCrumbs );
			_self.BladeIcon( _self.Defaults().icon ); 

		}
		return;
	};

	// "CREATE VIRTUAL MACHINE" TABS OBSERVABLES
	// tags
    this.TagsCollection = ko.observableArray( [
        new TagViewModel( "Created by", "boakley" , "All resources"),
        new TagViewModel( "Created date", "11/17/2018", "Virtual Network (private)"),
		new TagViewModel( "Team", "Azure Framework", "App Service Environment" ),
		new TagViewModel( "Marketing", "IaaS", "App Service Environment" ),
	] );

	// SMART DEFAULTS INFO BOXS AND ICONS
	this.SD_Info_Icon = ko.computed( function ()
	{
		//	console.debug( "SD_Info_Icon", this.SmartDefaults_FeatureFlag() );
		let _rv = "";

		//let _green_check = SVG.Test.green_check.SVG;
		////	console.debug( "_green_check", _green_check );

		//let _brand_check = SVG.Test.rush_cloud.SVG;
		////	console.debug( "_brand_check", _brand_check );

		//if ( this.SmartDefaults_FeatureFlag() == 1 || this.SmartDefaults_FeatureFlag() == undefined )
		//{
		//	_rv = "svg/green-check.svg";
		//}
		//else if ( this.SmartDefaults_FeatureFlag() == 2 )
		//{
		//	_rv = "svg/rush-cloud.svg";
		//}
		return SVG.Test.rush_cloud_green.SVG;
	}, this );


	// TABS & TAB NAV
	// Create button, funky logic for this one
	this.CreateNewButtonText = ko.observable( "Create new" );
	this.ConfigureButtonText = ko.observable( "Configure" );
	this.CreateBtn_Visible = ko.observable( true );
	this.CreateBtn_Text = ko.observable( "Review + create" );
	this._prev_btn_default = "<< Previous : [0]";
	this._next_btn_default = "Next : [0] >>";
	this.PrevBtn_Visible = ko.observable( true );
	this.NextBtn_Visible = ko.observable( true );
	this.PrevBtn_Text = ko.observable();
	this.NextBtn_Text = ko.observable();
	this.DownloadLinkIsDisplayed = ko.observable( false );
	this.CreateValidateBtn_Visible = ko.observable( false );

	// tabs
    this.TabButtons = ko.observableArray( [
        new TabButton_ViewModel( "Basics", true, true ),
		new TabButton_ViewModel( "Disks", false ),
		new TabButton_ViewModel( "Networking", false ),
		new TabButton_ViewModel( "Management", false ),
		new TabButton_ViewModel( "Guest Config", false ),
        new TabButton_ViewModel( "Tags", false ),
        new TabButton_ViewModel( "Review + create", false ),
	] );

	//	TAB PANELS DATA, IN ORDER
	//	BASICS TAB
	//	SUBSCRIPTIONS 
	this.SubscriptionList = ko.observableArray( [
        "IaaS EXP",
        "MSDN Developer",
        "Personal Subscription",
        "Corporate Subscription",
        "Free trial subscription"
    ] );
    this.SelectedSubscription = ko.observable( this.SubscriptionList()[0] );
    this.OnChange_SelectedSubscription = function ( vm, ev )
    {   //  console.debug( "this.OnChange_SelectedSubscription", vm );
        return;
	};
	//	RESOURCE GROUPS
    this.ResourceGroupNewOrExisting = ko.observable( "new" );
    this.ResourceGroupNewOrExisting.subscribe( function ( nv )
	{   //  console.debug( "this.ResourceGroupNewOrExisting.subscribe", nv, this.IsNewResourceGroup() );
        if ( nv == "new" )
        {
			this.IsNewResourceGroup( true );
        }
        else if ( nv == "existing" )
        {
			this.IsNewResourceGroup( false );
        }
        return;
    }, this );
	this.ResourceGroupList = ko.observableArray( [
        "VMs Resource Group",
        "My Team's Resource Group",
        "My Org's Resource Group",
        "My Company's Resource Group",
	] );
	this.SelectedResourceGroup = ko.observable( this.ResourceGroupList()[0] );
	this.OnChange_SelectedResourceGroup = function ( vm, ev )
	{   //  console.debug( "this.OnChange_SelectedResourceGroup", vm );
        return;
	};

	// VM name
	// 3/25/19	- ADDING VALIDATION FOR INLINE HELP FLYOUTS TESTING
	this.validation_icon = ko.observable( SVG.Color.check_circle_green.SVG );

	this.VirtualMachineName = ko.observable( "(new)  VM Instance" );
	this.NameBoxHasFocus = ko.observable( false );

	this.VM_UserName = ko.observable( "" );
	this.VM_UserName_HasFocus = ko.observable( false );


	// VM location
	this.LocationsList = ko.observableArray( [
        "Australia",
		"Brazil",
		"Chile",
		"Denmark",
		"England",
		"France",
		"Germany",
		"Hungary",
		"Italy",
		"Japan",
		"Kenya",
		"Libya",
		"Morocco",
		"New Zealand",
		"Oman",
		"Peru",
		"Qatar",
		"Russian Federation",
		"Spain",
		"Taiwan",
		"United States",
		"Venezuela",
		"Western Sahara",
		"Yemen",
		"Zambia"
    ] );
	this.SelectedLocationList = ko.observable( this.LocationsList()[0] );
	// VM availbility options
	this.AvailabilityOptions = ko.observableArray( [
		"No infrastructure redundacy required",
		"High Availability",
		"Availability zone",
		"Availability set"
	] );
	this.SelectedAvailabilityOptions = ko.observable( this.AvailabilityOptions()[0] );
	this.OnChange_AvailabilityOptions = function ( vm, ev )
	{	//	console.debug( "this.OnChange_AvailabilityOptions", this.SelectedAvailabilityOptions() );
		if ( this.SelectedAvailabilityOptions() !== this.AvailabilityOptions()[1] )
		{
			this.SelectedWorkEnv( "dev-env" );
		}
		else if ( this.SelectedAvailabilityOptions() == this.AvailabilityOptions()[1] )
		{
			this.SelectedWorkEnv( "prod-env" );
		}
		return;
	};

	// VM Image
    this.VM_Images = ko.observableArray( [
        "Windows Server 2016 Datacenter",
        "Ubuntu Server 16.04 LTS",
        "SQL Server 1016 SP1 Enterprise on Windows",
        "Windows Server 2012 R2 Datacenter"
	] );
	this.Selected_VM_Image = ko.observable( this.VM_Images()[1] );
	// VM auth type
	this.AuthType = ko.observable( "ssh" );
	// username
	//this.VM_UserName = ko.observable("");
	// SHH key
	this.VM_SSH_KEY = ko.observable("");
	// aad
	this.VM_AzureAD = ko.observable("off");
	// public ports
	this.VM_PublicPorts = ko.observable( "none" );
	// ports list
	this.PublicPorts = ko.observableArray( [
		"Select one or more ports",
		"127.0.0.1",
	] );
	this.SelectedPublicPorts = ko.observable( this.PublicPorts()[0] );

	// disks tab - smart defaults
	this.OSDiskTypes = ko.observableArray( [
		"Premium SSD",
		"Standard SSD",
	] );
	this.SelectedDiskType = ko.observable( this.OSDiskTypes()[0] );
	this.OnChange_OSDIskTypes = function ( vm, ev )
	{	//	console.debug( "this.OnChange_OSDIskTypes" );
		if ( this.SelectedDiskType() !== this.OSDiskTypes()[0] )
		{
			this.SelectedWorkEnv( "dev-env" );
		}
		else if ( this.SelectedDiskType() == this.OSDiskTypes()[0] )
		{
			this.SelectedWorkEnv( "general-env" );
		}
		return;
	};

	// networking tab
	this.VirtualNetworks = ko.observableArray( [
		"(new) VirtualNetworkOne",
		"Contoso VNET",
		"Fabrikam VNET"
	] );
	this.SelectedVirtualNetwork = ko.observable( this.VirtualNetworks()[0] );
	this.Subnets = ko.observableArray( [
		"(new) default (10.1.16.0/24)",
		"127.0.0.1",
		"Fabrikam VNET"
	] );
	this.SelectedSubNet = ko.observable( this.Subnets()[0] );
	this.PublicIPS = ko.observableArray( [
		"(new) defaultname-pub-ip",
		"contoso.azure.net",
		"fabrikam.azure.net"
	] );
	this.SelectedPublicIP = ko.observable( this.PublicIPS()[0] );
	this.NetworkSecurityGroup = ko.observable( "basic" );
	this.NetworkingPublicPorts = ko.observable( "allow" );
	this.AcceleratedVirtualNetworks = ko.observableArray( [
		"Select one or more ports",
		"default NIC port",
		"All NIC ports",
		"custom"
	] );
	this.SelectedAcceleratedVirtualNetwork = ko.observable( this.AcceleratedVirtualNetworks()[0] );
	this.AcceleratedNetworkingToggle = ko.observable("off");

	// MANAGEMENT TAB
	this.AzureSecurityPlan_Toggle = ko.observable( "on" );
	this.OnClick_Select_AzureSecurityPlan = function ( vm, ev )
	{	//	console.debug( "this.OnClick_Select_AzureSecurityPlan", this.AzureSecurityPlan_Toggle() );
		if ( this.AzureSecurityPlan_Toggle() == "on" )
		{
			this.SelectedWorkEnv( "general-env" );
		}
		else	if ( this.AzureSecurityPlan_Toggle() == "off" )
		{
			this.SelectedWorkEnv( "dev-env" );
		}
		return true;
	};

	this.Backup_Toggle = ko.observable( "on" );
	this.OnClick_Select_BackupToggle = function ( vm, ev )
	{	//	console.debug( "this.OnClick_Select_BackupToggle", this.Backup_Toggle() );
		if ( this.Backup_Toggle() == "on" )
		{
			this.SelectedWorkEnv( "prod-env" );
		}
		else	if ( this.Backup_Toggle() == "off" )
		{
			this.SelectedWorkEnv( "dev-env" );
		}
		return true;
	};


	// OTHER
	this._performance_list = [
		"Standard",
		"Premium"
	];
	this._accounts_list = [
		"Storage",
		"Storage v2",
		"Files",
		"Blob storage",
		"Block blobs"
	];
	this._replication_list = [
		"Read access geo-redundant storage (RA_GRS)",
		"Locally-redundant storage (LRS)",
		"Geo-redundant storage (GRS)",
		"Zone-redundant storage (ZRS)"
	];

	this._std_account_default_list = [
		this._accounts_list[1], //	"storage v2"
		this._accounts_list[0], //	"storage"
		this._accounts_list[3]	//	"blob storage"
	];
	this._std_default_replication_list = this._replication_list;

	this._pre_account_default_list = [
		this._accounts_list[0],	//	"storage"
		this._accounts_list[1],	//	"storage v2"
		this._accounts_list[2],	//	"files"
		this._accounts_list[4]	//	"block blobs"
	];
	this._pre_replication_default_list = [
		"Locally-redundant storage",
	];

	this.AccountKindList = ko.observableArray( this._std_account_default_list );
	this.SelectedAccountKindList = ko.observable( this.AccountKindList()[0] );

	this.ReplicationList = ko.observableArray( this._std_default_replication_list );
	this.SelectedReplicationList = ko.observable( this.ReplicationList()[0] );

	this.PerformanceSpecSelection = ko.observable( this._performance_list[0] );
	this.PerformanceSpecSelection.subscribe( function (newValue)
	{	//	console.debug("this.PerformanceSpecSelection.subscribe", newValue);
        if ( newValue == this._performance_list[0] )
        {
			this.AccountKindList( this._std_account_default_list );
			this.ReplicationList( this._std_default_replication_list );
        }
        else if ( newValue == this._performance_list[1] )
        {
			this.AccountKindList( this._pre_account_default_list );
			this.ReplicationList( this._pre_replication_default_list );
		}
		//	console.debug( "this.AccountKindList()", this.AccountKindList() );
		this.SelectedAccountKindList( this.AccountKindList()[0] );
		this.SelectedReplicationList( this.ReplicationList()[0] );
		return;
	}, this );

	this.OnChange_AccountKindSelection = function ( vm, ev )
	{	//	console.debug( "OnChange_AccountKindSelection", this.PerformanceSpecSelection(), this.SelectedAccountKindList() );
		//	console.debug( "OnChange_AccountKindSelection" );

		if ( this.PerformanceSpecSelection() == this._performance_list[0] )
		{	//	console.debug( "this.PerformanceSpecSelection()", this.PerformanceSpecSelection(),":", this.SelectedAccountKindList(), ":",this._std_account_default_list );
			// "storage v2"
			if ( this.SelectedAccountKindList() == this._std_account_default_list[0] )
			{
				this.ReplicationList( this._replication_list );
			}

			//  "storage"
			if ( this.SelectedAccountKindList() == this._std_account_default_list[1] )
			{
				this.ReplicationList( this._replication_list );
			}

			//  "blob storage"
			if ( this.SelectedAccountKindList() == this._std_account_default_list[2] )
			{
				this.ReplicationList( [
					this._replication_list[0],
					this._replication_list[1],
					this._replication_list[2],
				] );
			}
		}
		else if ( this.PerformanceSpecSelection() == this._performance_list[1] )
		{	//	console.debug( "this.PerformanceSpecSelection()", this.PerformanceSpecSelection(), ":", this.SelectedAccountKindList(), ":", this._pre_account_default_list );
			//	"storage"
			if ( this.SelectedAccountKindList() == this._pre_account_default_list[0] )
			{
				this.ReplicationList( [ this._replication_list[1] ] );
			}

			//  "storage v2"
			if ( this.SelectedAccountKindList() == this._pre_account_default_list[1] )
			{
				this.ReplicationList( [ this._replication_list[1] ] );
			}

			//  "files"
			if ( this.SelectedAccountKindList() == this._pre_account_default_list[2] )
			{
				this.ReplicationList( [
					this._replication_list[1],
					this._replication_list[3]
				] );
			}		

			//  "block blobs"
			if ( this.SelectedAccountKindList() == this._pre_account_default_list[3] )
			{
				this.ReplicationList( [
					this._replication_list[1],
					this._replication_list[3]
				] );
			}	

		}
		return;
	};

	// "ADVANCED" TAB
	// VIP TYPE LIST & DYNAMIC DOMAIN NAME TEXT FIELD
	this.Is_VIP_Type_Internal = ko.observable( false );
	this.VIP_Internal_Domain_Name = ko.observable("");
    this.VIP_Types = ko.observableArray( [
        "External",
        "Internal"
    ] );
	this.Selected_VIP_Type = ko.observable( this.VIP_Types()[0] );
	this.OnChange_VIP_Type_Selection = function ( vm, ev )
	{	//	console.debug( "this.OnChange_VIP_Type_Selection" );
		if ( this.Selected_VIP_Type() == this.VIP_Types()[1] )
		{
			this.Is_VIP_Type_Internal( true );
		}
		else
		{
			this.Is_VIP_Type_Internal( false );
		}
		return;
	};

	// NETWORKING TAB - VIRTUAL NETWORK
	this.IsVnextConfigureVisible = ko.observable( true );
	this.VirtualNetworksList = ko.observableArray( [
		new VirtualNetwork_ViewModel( "(new) VNet", "North US", "10.10.10.0/255" ),
		new VirtualNetwork_ViewModel( "VNet 1", "North US", "10.2.128.0/255" ),
		new VirtualNetwork_ViewModel( "VNet 2", "Central US", "12.2.128.0/255" ),
		new VirtualNetwork_ViewModel( "VNet 3", "South US", "12.2.128.0/255" ),
		new VirtualNetwork_ViewModel( "VNet 4", "East US", "13.2.128.0/255" ),
		new VirtualNetwork_ViewModel( "VNet 5", "West US", "14.2.128.0/255" ),
	] );
	this.Selected_VirtualNetwork = ko.observable( this.VirtualNetworksList()[0] );
	this.OnChange_VNetList = function ( vm, ev )
	{	//	console.debug( "this.OnChange_VNetList", this.Selected_VirtualNetwork() );
		if ( this.Selected_VirtualNetwork() == this.VirtualNetworksList()[0] )
		{
			this.IsVnextConfigureVisible( true );
		}
		else
		{
			this.IsVnextConfigureVisible( false );
		}
		return;
	};
	this.Configure_Selected_VirtualNetwork = ko.observable( "Create new virtual network" );
	this.OnClick_CreateVirtualNetworkContextBlade = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ShowVirtualNetworkContextBlade" );
		//this.ParentViewModel().ContextBladeViewModel( new VirtualNetworkContext_ViewModel( this, 0 ) );
		//this.ParentViewModel().IsContextBladeLarge( false );
		//this.ParentViewModel().OnClick_CloseContextBlade();

		//	console.debug( "this.OnClick_CreateVirtualNetworkContextBlade " );
		let _specpicker_mv = new VirtualNetworkContext_ViewModel( this );
		this.ContextBladeViewModel( _specpicker_mv );

		this.ParentViewModel().CurrentContextBladeViewModel( this.ContextBladeViewModel() );
		this.ParentViewModel().ContextBlade_SizeLarge( false );
		this.ParentViewModel().ContextBlade_OpenClosed( true );

		return;
	};
	this.OnClick_ConfigureVirtualNetworkContextBlade = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ShowVirtualNetworkContextBlade" );
		let _current = new VirtualNetworkContext_ViewModel( this, 1);
		_current.CurrentVirtualNetwork( this.Selected_VirtualNetwork() );

		this.ParentViewModel.ContextBladeViewModel( _current );
		this.ParentViewModel.IsContextBladeLarge( false );
		this.ParentViewModel.OnClick_CloseContextBlade();
		return;
	};

	// SUBNET
	this.SubNet = ko.observable( new SubNet_ViewModel( "(new) SubNet 1", this.Selected_VirtualNetwork().Address() ) );
	this.OnClick_ConfigureNewSubNet = function ( vm, ev )
	{
		//	console.debug( "this.OnClick_ConfigureNewSubNet" );
		//let _subnet = new SubnetContext_ViewModel( this );
		//_subnet.CurrentSubNet( this.SubNet() );

		//this.ParentViewModel.ContextBladeViewModel( _subnet );
		//this.ParentViewModel.IsContextBladeLarge( false );
		//this.ParentViewModel.OnClick_CloseContextBlade();
		let _specpicker_mv = new SubnetContext_ViewModel( this );
		this.ContextBladeViewModel( _specpicker_mv );

		this.ParentViewModel().CurrentContextBladeViewModel( this.ContextBladeViewModel() );
		this.ParentViewModel().ContextBlade_SizeLarge( false );
		this.ParentViewModel().ContextBlade_OpenClosed( true );
		return;
	};


	// compute the tab nav buttons 
	this.Compute_CurrentNavButtons = ko.computed( function ()
	{	//	console.debug( "Compute_CurrentNavButtons" );
		let _selected_tab = 0;
		let _create_text = "";
		let _prev_text = "";
		let _next_text = "";

		this.TabButtons().forEach( function ( v, i, a )
		{   //	console.debug( i, v.Title(), v.Index(), v.IsSelectedTab() );
			v.Index( i );
			if ( v.IsSelectedTab() == true )
			{
				_selected_tab = i;
			}
        } );

		//	console.debug( "_selected_tab", _selected_tab );
		switch ( _selected_tab )
		{
			case 0:
				{
					_create_text = "Review + create";	//	this._next_btn_default.replace( "[0]", this.TabButtons()[1].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[1].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					//	this.IsValidationCompleteVisible( false );	
					this.CreateValidateBtn_Visible( false );
					this.PrevBtn_Visible( false );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					//	this.DownloadLinkIsDisplayed( false );
					break;
				}
			case 1:
				{
					_create_text = "Review + create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[0].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[2].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					//	this.IsValidationCompleteVisible( false );	
					this.CreateValidateBtn_Visible( false );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					this.DownloadLinkIsDisplayed( false );
					break;
				}
			case 2:
				{
					_create_text = "Review + create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[1].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[3].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					break;
				}
			case 3:
				{
					_create_text = "Review + create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[2].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[4].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					break;
				}
			case 4:
				{
					_create_text = "Review + create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[3].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[5].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					break;
				}
			case 5:
				{
					_create_text = "Review + create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[4].Title() );
					_next_text = this._next_btn_default.replace( "[0]", this.TabButtons()[6].Title() );

					this.CreateBtn_Visible( true );
					this.CreateBtn_Text( _create_text );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( true );
					this.NextBtn_Text( _next_text );
					break;
				}
			case 6:
				{
					_create_text = "Create";
					_prev_text = this._prev_btn_default.replace( "[0]", this.TabButtons()[5].Title() );
					_next_text = "";//this._next_btn_default.replace( "[0]", this.TabButtons()[6].Title() );

					this.CreateBtn_Text( _create_text );
					this.CreateBtn_Visible( true );
					this.PrevBtn_Visible( true );
					this.PrevBtn_Text( _prev_text );
					this.NextBtn_Visible( false );
					//	this.NextBtn_Text( _next_text );
					break;
				}
		}
		return;
	}, this );    

    //  SHOW DIFFERENT FILTERED TABLE IN CONTENT PANEL
    //	SET TABBUTTON INDEX VALUE AND HASPREVBUTTON/HASNEXTBUTTON
    //  USER WILL NEED TO RE-CLICK DASHBOARD FILTERS
    //	ADDING CLICKING TO CHANGE TABS FROM THE SUMMARY VIEW SECTION HEADERS
    this.OnClick_SelectTab = function ( vm, ev )
	{   //  console.debug( "OnClick_SelectTab", vm.Title(), vm.Index() );
        _self.TabButtons().forEach( function ( v, i, a )
        {   //  console.debug( i, v.Title(), v.Index(), v.IsSelectedTab() );
            v.IsSelectedTab( false );
        } );

        _self.TabButtons()[vm.Index()].IsSelectedTab( true );

        // Show Tab Content
        var _tabs = document.getElementsByClassName( "TabPanel" );
        //  console.debug( "_tabs", _tabs.length );

        for ( var i = 0; i < _tabs.length; i++ )
        {
            _tabs[i].style.display = "none";
        }
        _tabs[vm.Index()].style.display = "block";
        return;
    };

    // PREV/NEXT BUTTON EVENT HANDLERS
    this.OnClick_PrevTab = function ( vm, ev )
    {   //  console.debug( "this.OnClick_PrevTab", vm.Title(), vm.Index() );
		let _next = 0;

		this.TabButtons().forEach( function ( v, i, a )
		{   // console.debug( i, v.Title(), v.Index(), v.IsSelectedTab(), v.IsVisible() );
			//v.IsSelectedTab( false );
			if ( v.IsSelectedTab() == true )
			{
				_next = i;
			}
        } );
		_next--;
		//	console.debug( "_next", _next );
		let _vm = _self.TabButtons()[_next];
		if ( _vm.IsVisible() == false )
		{
			_next--
			_vm = _self.TabButtons()[_next];
		}
		//	console.debug( "_next", _next );
        //	console.debug( "_vm", _vm.Title() );
        _self.OnClick_SelectTab(_vm);
        return;
    };
    this.OnClick_NextTab = function ( vm, ev )
	{   //  console.debug( "this.OnClick_NextTab", vm.Title(), vm.Index() );
		let _next = 0;

		this.TabButtons().forEach( function ( v, i, a )
		{   // console.debug( i, v.Title(), v.Index(), v.IsSelectedTab(), v.IsVisible() );
			//v.IsSelectedTab( false );
			if ( v.IsSelectedTab() == true )
			{
				_next = i;
			}
        } );
		_next++;
		//	console.debug( "_next", _next );
		let _vm = _self.TabButtons()[_next];
		if ( _vm.IsVisible() == false )
		{
			_next++;
			_vm = _self.TabButtons()[_next];
		}
		//	console.debug( "_next", _next );
        //	console.debug( "_vm", _vm.Title() );
        _self.OnClick_SelectTab(_vm);
        return;
	};

	// validation panel and click for "review & create"	
	this.OnClick_ReviewCreate = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ReviewCreate" );
		//this.OnClick_SelectTab( this.TabButtons()[this.TabButtons().length - 1] );
		//this.CreateBtn_Visible( false );
		//this.CreateValidateBtn_Visible( true );
		this.CreateBtn_Text( "Validating..." );
		//this.IsValidationCompleteVisible( false );	

		window.setTimeout( function ()
		{
			_self.CreateBtn_Text( "Created" );
			return;
		}, 2000);

		window.setTimeout(function ()
		{
			_self.CreateBtn_Text("Created");

			let _notifications_list = [
				new Notification( "Success", "Your virtual machine has been created. ", SVG.Color.VirtualMachines, _self.OnClick_TestNotificationAction, _self.OnClick_NotificationDismiss ),
			];

			_self.ParentViewModel().NotificationsData( _notifications_list );
			_self.ParentViewModel().Overlay_NotificationsData( _notifications_list );
			_self.CreateBtn_Text( "Review + create" );
			_self.OnClick_NavBackToBasicsTab();
			return;
		}, 3000 );

		window.setTimeout( function ()
		{
			_self.ParentViewModel().Overlay_NotificationsData( [] );
			return;
		}, 7000 );


		return;
	};

	this.OnClick_CreateValidate = function ( vm, ev )
	{	//	console.debug( "this.OnClick_CreateValidate" );
		//this.CreateBtn_Text( "Validating..." );
		////this.IsValidationCompleteVisible( false );	

		//window.setTimeout( function ()
		//{
		//	_self.CreateBtn_Text( "Created" );
		//	//	_self.IsValidationCompleteVisible( true );	
		//	return;
		//}, 2000 );
		return;
	};

	// BUTTONS FROM SUMMARY TAB
	this.OnClick_NavBackToBasicsTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToBasicsTab", this.TabButtons()[0] );
		this.OnClick_SelectTab( this.TabButtons()[0] );
		return;
	};
	this.OnClick_NavBackToDisksTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToNetworkingTab", this.TabButtons()[1] );
		this.OnClick_SelectTab( this.TabButtons()[1] );
		return;
	};
	this.OnClick_NavBackToNetTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToNetworkingTab", this.TabButtons()[1] );
		this.OnClick_SelectTab( this.TabButtons()[2] );
		return;
	};
	this.OnClick_NavBackToMngtTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToNetworkingTab", this.TabButtons()[1] );
		this.OnClick_SelectTab( this.TabButtons()[3] );
		return;
	};
	this.OnClick_NavBackToGuestTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToNetworkingTab", this.TabButtons()[1] );
		this.OnClick_SelectTab( this.TabButtons()[4] );
		return;
	};
	this.OnClick_NavBackToTagsTab = function ( vm, ev )
	{	//	console.debug( "this.OnClick_NavBackToNetworkingTab", this.TabButtons()[1] );
		this.OnClick_SelectTab( this.TabButtons()[4] );
		return;
	};


	// custom event handlers
	this.OnClick_OpenVMSizeContextBlade = function ( vm, ev )
	{
		console.debug( "OnClick_OpenVMSizeContextBlade " ,
			_self.ParentViewModel().CurrentContextBladeViewModel().length
		);

		//	_self.Init_ContextBlade();

		let _prev = _self.ParentViewModel().CurrentContextBladeViewModel();

		let _test_context_blade = new ContextBlade_ViewModel(
			this.ParentViewModel(),
			"Select a virtual machine size",
			"Browse available virtual machine sizes and thier features",
			"ko-select-vm-size-context-template"
		);

		//	_test_context_blade.IsSelected( true );
		//	_test_context_blade.Index( 0 );
		_test_context_blade.BladeSize( "1000px" );

		_prev.splice( 0, 0, _test_context_blade );

		_prev.forEach( function ( v, i, a )
		{
			v.Index( i );
			v.IsSelected( false );

			if ( i == 0 )
			{
				v.IsSelected( true );
			}
			return;
		} );

		_self.ParentViewModel().CurrentContextBladeViewModel( _prev);
		_self.ParentViewModel().CurrentContextSize( _prev[0].BladeSize() );


		if ( _self.ParentViewModel().ContextBlade_OpenClosed() == false )
		{
			_self.ParentViewModel().ContextBlade_OpenClosed(true)
		}
		//	_self.ParentViewModel().OnClick_OpenCloseContextBlade();
		return;
	};
	this.OnClick_OpenDefaultContextBlade = function ( vm, ev )
	{
		console.debug( "OnClick_OpenDefaultContextBlade" );
		this.Init_ContextBlade();
		return;
	};
	this.Init_ContextBlade = function ()
	{	//	console.debug( "Init_ContextBlade" );
		let _quick_start_blade = new ContextBlade_ViewModel(
			this.ParentViewModel(),
			"Creating a virtual machine",
			"Quick Start Center",
			"ko-context-quick-start-context-template"
		);
		_quick_start_blade.IsSelected( true );
		_quick_start_blade.Index( 0 );

		_self.ParentViewModel().CurrentContextBladeViewModel( [_quick_start_blade] );
		_self.ParentViewModel().CurrentContextSize( _quick_start_blade.BladeSize() );
		_self.ParentViewModel().OnClick_OpenCloseContextBlade();

		return;
	};

	// each instance
	//	this.Init_ContextBlade();
    return;
};
