/// <reference path="../script/knockout-3.4.2.js" />
/// "Dashboard_ViewModel" ViewModel V.1.0.0
///  this.Property.subscribe( function ( newValue ) { console.debug("this.HasNodesCollection.subscribe", newValue); return; },this);
///  this.OnEventHandler = function ( vm, ev ) { console.debug("this.OnEventHandler"); return; };
///  for implied performance help - http://knockoutjs.com/documentation/deferred-updates.html
"use strict";
function Prototype_ViewModel( demoName, debugFlag  )
{
    const _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( demoName );
    this.DEBUGFLAG = ko.observable( debugFlag || false );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );

	// shell icons
	this.Shell_Icon_Search = ko.observable( SVG.Shell.Search.SVG );
	this.Shell_Icon_CmdPrompt = ko.observable( SVG.Test.cloudshell_command.SVG );
	this.Shell_Icon_DirectorySwitcher = ko.observable( SVG.Shell.SubscriptionsAndDirectories.SVG );
	this.Shell_Icon_Notification = ko.observable( SVG.Shell.Notification.SVG );
	this.Shell_Icon_Settings = ko.observable( SVG.Shell.Gear.SVG );
	this.Shell_Icon_Help = ko.observable( SVG.Shell.Help.SVG );
	this.Shell_Icon_Feedback = ko.observable( SVG.Shell.Smiley.SVG );
	this.Shell_Icon_Persona = ko.observable( SVG.Person.SVG );
	this.Shell_Icon_PersonaAdd = ko.observable( SVG.PersonAdd.SVG );

    /* global prototype */
    this.ApplicationName = ko.observable();
	this.Data = ko.observableArray( [] );
	this.Overlay_NotificationsData = ko.observableArray( [] );
	this.NotificationsData = ko.observableArray( [] );
	this.DefaultHomeExtension = ko.observable();
	this.CurrentExtensionViewModel = ko.observable();
	this.NavigationStack = ko.observableArray( [] );
	this.GlobalSearch = new GlobalSearch_ViewModel( _self );

	// DEFAULT GENERIC "Extension_ViewModel" FOR LEFT NAV
	this.AllServices = new Extension_ViewModel( _self, "All Services", SVG.Color.All_Services );
	this.AppServices = new Extension_ViewModel( _self, "App services", SVG.Color.Websites );
	this.ResourceGroups = new Extension_ViewModel( _self, "Resource groups", SVG.Color.ResourceGroup );
	this.SqlDatabases = new Extension_ViewModel( _self, "SQL databases", SVG.Color.SQLDatabases );
	this.Subscriptions = new Extension_ViewModel( _self, "Subscriptions", SVG.Color.Subscriptions );
	this.AzureAD = new Extension_ViewModel( _self, "Azure Active Directory", SVG.Color.ActiveDirectory );
	this.OperationsCenter = new Extension_ViewModel( _self, "Operations Center" );
	this.SecurityCenter = new Extension_ViewModel( _self, "Security Center", SVG.Color.SecurityCenter );
	this.HelpAndSupport = new Extension_ViewModel( _self, "Help & Support", SVG.Color.HelpSupport_color );
	this.Advisor = new Extension_ViewModel( _self, "Advisor", SVG.Color.Advisor );
	this.MoreServices = new Extension_ViewModel( _self, "More Services", SVG.ChevronRight );

	//	Custom UXR test specific extension viewmodels
	//	this.CreateNewResource = new CreateNew_ViewModel( _self );
	this.NewMarketPlace = new MarketPlaceFilterView_ViewModel( _self );
	this.AzureHomePage = new AzureHomePage_ViewModel( _self );
	this.Dashboard = new DashboardExtension_ViewModel( _self, "Dashboard" );
	this.GettingStarted = new GettingStarted_ViewModel(_self);
	this.BrowseVirtualMachinesExtension = new BrowseVirtualMachinesExtension_ViewModel(_self);
	this.SingleVirtualMachine = new SingleVirtualMachine_ViewModel( _self, "CDS Virtual Machine" );
	this.MetricExplorer = new MetricsExplorer1_ViewModel( _self, "Monitoring" );
	this.BillingCenter = new AzureBilling_ViewModel( _self );
	this.BrowseAllResourcesExtension = new BrowseAllResources_ViewModel(_self);
	this.AppGateWayExtension = new ApplicationGateway_ViewModel( _self, "Application Gateway", SVG.Color.ApplicationGateways_color );

	// in left nav order
	this.ExtensionViewModelCollection = ko.observableArray( [
		//this.CreateNewResource,
		this.NewMarketPlace,
		this.AzureHomePage,
		this.Dashboard,
		this.AllServices,
		this.BrowseAllResourcesExtension,
		this.BrowseVirtualMachinesExtension,
		this.BillingCenter,
		this.GettingStarted,
		this.SingleVirtualMachine,
		this.AppGateWayExtension,
		this.AppServices,
		this.ResourceGroups,
		this.SqlDatabases,
		this.Subscriptions,
		this.AzureAD,
		this.OperationsCenter,
		this.SecurityCenter,
		this.HelpAndSupport,
		this.Advisor,
		this.MetricExplorer,
		this.MoreServices,
	] );


	//	ASSIGN DEFAULT LEFT NAV EXTENSION
	//	CURRENT EXTENSION
	//	NEEDS TO BE REFACTORED FOR STACKING EXTENSIONS FOR BREADCRUMBS NAVIGATION
	//	AND CREATING MULTI- EXTENSION FLOWS
	this.DefaultHomeExtension( this.ExtensionViewModelCollection()[1] );
	this.CurrentExtensionViewModel( this.DefaultHomeExtension() );
	this.NavigationStack = ko.observableArray( [] );

	//	-----
	//	PROTOTYPE LEVEL EVENT HANDLERS
	//	OLD NAV STUFF 
	//	LEFT NAV HANDLERS
	//this._open_chevron = SVG.DoubleChevronLeft.SVG;
	//this._closed_chevron = SVG.DoubleChevronRight.SVG;
	//this.LeftNavIcon = ko.observable(this._open_chevron);
	//this.LeftNavOpenClose = ko.observable( false );
	//this.OnClick_ToggleLeftNav = function ( vm, ev )
	//{	//	console.debug( "OnClick_ToggleLeftNav", this.LeftNavOpenClose() );
	//	if ( this.LeftNavOpenClose() == false )
	//	{
	//		this.LeftNavOpenClose( true );
	//		this.LeftNavIcon( this._open_chevron );
	//	}
	//	else if( this.LeftNavOpenClose() == true )
	//	{
	//		this.LeftNavOpenClose( false );
	//		this.LeftNavIcon( this._closed_chevron );
	//	}
	//	return;
	//};    
	// OLDERLEFT NAV METHOD
	this.OnClick_Display_CurrentViewModel = function ( vm, ev, index )
	{	//	
		//	console.debug( "OnClick_Display_CurrentViewModel", vm, ev, index );
		//	console.debug( "this.ExtensionViewModelCollection()[index]", this.ExtensionViewModelCollection()[index] );

		if ( vm.CurrentExtensionViewModel() === this.ExtensionViewModelCollection()[index] )
		{
			vm.CurrentExtensionViewModel( this.ExtensionViewModelCollection()[1] );
		}
		else
		{
			vm.CurrentExtensionViewModel( this.ExtensionViewModelCollection()[index] );
		}

		vm.CurrentContextSize( "0px" );
		vm.CurrentContextBladeViewModel( [] );
		vm.ContextBlade_OpenClosed( false );
		return;
	};

	/* NEW NAV SUTFF */
	this.NewMenu_IsDisplayed = ko.observable( false );
	this.NewMenuOverlay_IsDisplayed = ko.observable( true );
	this.NewNav_CallOut_Dismiss_IsClicked = ko.observable( false );
	this.NewNav_Callout_CloseBtn = ko.observable( SVG.Shell.close.SVG );
	this.ExtensionCoreCollection = ko.observableArray( [
		this.NewMarketPlace,
		this.AzureHomePage,
		this.Dashboard
	] );

	this._services_list = [
		this.GettingStarted,
		this.SingleVirtualMachine,
		this.AppGateWayExtension,
		this.AppServices,
		this.SqlDatabases,
		this.AzureAD,
		this.MetricExplorer,
		this.MoreServices,
		this.GettingStarted,
		this.SingleVirtualMachine,
		this.AppGateWayExtension,
		this.AppServices,
		this.SqlDatabases,
		this.AzureAD,
		this.MetricExplorer,
		this.MoreServices,
		this.GettingStarted,
		this.SingleVirtualMachine,
		this.AppGateWayExtension,
		this.AppServices,
		this.SqlDatabases,
		this.AzureAD,
		this.MetricExplorer,
		this.MoreServices,
		this.GettingStarted,
		this.SingleVirtualMachine,
		this.AppGateWayExtension,
		this.AppServices,
		this.SqlDatabases,
		this.AzureAD,
		this.MetricExplorer,
		this.MoreServices,
	];
	this._resources_list = [
		this.BrowseAllResourcesExtension,
		this.BrowseVirtualMachinesExtension,
		this.ResourceGroups,
	];
	this._resource_mngt_list = [
		this.BillingCenter,
		this.Subscriptions,
		this.SecurityCenter,
		this.OperationsCenter,
		this.HelpAndSupport,
		this.Advisor,
	];
	this.ExtensionTabCollection = ko.observableArray( this._services_list );

	this.OnClick_ToggleNewNav = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ToggleNewNav", this.MenuSwitcher().IsDisplayed() );
		this.NewMenu_IsDisplayed( !this.NewMenu_IsDisplayed() );
		return;
	};
	this.OnClick_HandleNavOverlay = function ( vm, ev )
	{	//	console.debug( "this.OnClick_HandleNavOverlay" );
		return false;
	};
	this.OnClick_HandleNewNav_CalloutButton = function ( vm, ev )
	{
		this.NewMenuOverlay_IsDisplayed( false );
		this.NewNav_CallOut_Dismiss_IsClicked( true );
		return;
	};
	this.OnClick_CloseNewNav = function ( vm, ev )
	{
		this.NewMenu_IsDisplayed( false );
		this.NewMenuOverlay_IsDisplayed( false );
		this.NewNav_CallOut_Dismiss_IsClicked( true );
		return;
	};

	this.SelectedNavTab = ko.observable(0);
	this.OnClick_ChangeNavTabs = function ( index, vm, ev )
	{	//	console.debug( "OnClick_ChangeNavTabs", index );
		this.SelectedNavTab( index );
		switch ( index )
		{
			case 0: {
				this.ExtensionTabCollection( this._services_list );
				break;
			}
			case 1: {
				this.ExtensionTabCollection( this._resources_list );
				break;
			}
			case 2: {
				this.ExtensionTabCollection( this._resource_mngt_list  );
				break;
			}
			default: {
				this.ExtensionTabCollection( this._services_list );
				break;
			}
		}
		return;
	};
	this.OnClick_NewNavDisplay_CurrentViewModel = function ( vm, ev )
	{	//	console.debug( "OnClick_Display_CurrentViewModel", vm, ev );
		this.CurrentExtensionViewModel( vm );
		this.CurrentContextSize( "0px" );
		this.CurrentContextBladeViewModel( [] );
		this.ContextBlade_OpenClosed( false );
		return;
	};





	// utility function for extension viewmodels
	this.OnClick_ShowDashboard = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowDashboard ", vm );
		this.CurrentContextSize( "0px" );
		this.CurrentExtensionViewModel( this.ExtensionViewModelCollection()[1] );
		return;
	};

	//	CONTEXT BLADE EVENT HANDLERS
	//	CURRENT CONTEXT BLADE VIEW MODEL
	//this.CurrentContextBladeViewModel = ko.observable();
	// same as default set in "ContextBlade_ViewModel"
	this.CurrentContextBladeViewModel = ko.observableArray( [] );
	this.CurrentContextSize = ko.observable( "0px" );
	this.ContextBlade_IsDocked = ko.observable( false );
	this.ContextBlade_OpenClosed = ko.observable( false );
	this.OnClick_HideContextBlade = function ( vm, ev )
	{	//	console.debug("OnClick_HideContextBlade")
		this.ContextBlade_OpenClosed( false );
		return;
	};
	this.OnClick_OpenCloseContextBlade = function ( vm, ev )
	{	//	console.debug( "this.OnClick_CloseContextBlade");
		//this.ContextBlade_OpenClosed( true );
		//this.ContextBlade_IsDocked( true );
		if ( _self.ContextBlade_OpenClosed() === false )
		{
			_self.ContextBlade_OpenClosed( true );	
			//	_self.CurrentContextSize();
		}
		else if(_self.ContextBlade_OpenClosed() === true )
		{
			_self.ContextBlade_OpenClosed( false );
			_self.CurrentContextSize("0px");
		}
		return;
	};

	// default show notifications context blade
	this.OnClick_ShowNotificationsContextBlade = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowNotificationsContextBlade");
		let _new_cntxt_blade = new NotificationsContextBlade_ViewModel( this, "Notifications", "ko-notifications-template", this.NotificationsData(), this.OnClick_NotificationClearList );
		//	console.debug( "this.CurrentContextSize", this.CurrentContextSize() );

		//	this.CurrentContextSize( "500px" );
		this.CurrentContextBladeViewModel( [_new_cntxt_blade] );
		this.CurrentContextSize( _new_cntxt_blade.BladeSize() );
		this.OnClick_OpenCloseContextBlade();
		return;
	};
	this.OnClick_NotificationClearList = function ( vm, ev )
	{	//	console.debug( "this.OnClick_ClearList" );
		_self.NotificationsData( [] );
		return;
	};
	this.OnClick_NotificationDismiss = function ( vm, ev )
	{	//	console.debug( "Notification.OnClick_NotificationDismiss ",vm );
		let _new_list = _self.NotificationsData().filter( note => note.ID() !== vm.ID() );
		_self.NotificationsData( _new_list );
		return;
	};
	this.OnClick_TestNotificationAction = function ( vm, ev )
	{	//	console.debug( "this.OnClick_TestNotificationAction" );
		return;
	};

	// SHOW HELP CONTEXT BLADE - UXR TEST - "COMPLEX CONTEXT BLADE" 11/25/2018
	this.OnClick_ShowHelpContextBlade = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowHelpContextBlade");
		let _shell_help = new ContextBlade_ViewModel( this, "Help", " ", "ko-shell-help-context-blade-template" );
		_shell_help.IsSelected( true );

		this.CurrentContextBladeViewModel( [_shell_help] );
		this.CurrentContextSize( _shell_help.BladeSize() );

		this.OnClick_OpenCloseContextBlade();
		return;
	};
	this.OnClick_ShowPortalSettings_ContextBlade = function ( vm, ev )
	{	//	console.debug( "OnClick_ShowPortalSettings_ContextBlade");
		let _shell_settings = new PortalSettings_ContextBlade_ViewModel( this, "Settings" );
		_shell_settings.IsSelected( true );

		this.CurrentContextBladeViewModel( [_shell_settings] );
		this.CurrentContextSize( _shell_settings.BladeSize() );

		this.OnClick_OpenCloseContextBlade();
		return;
	};

	this.OnClick_SelectContextBladeTab = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectContextBladeTab", vm.Index() );

		_self.CurrentContextBladeViewModel().forEach( function ( v, i, a )
		{
			v.IsSelected( false );
			return;
		} );

		if ( _self.CurrentContextBladeViewModel().length == 1 )
		{
			vm.Index( 0 );
		}

		_self.CurrentContextBladeViewModel()[vm.Index()].IsSelected( true );
		_self.CurrentContextSize( vm.BladeSize() );

		return;
	};
	this.OnClick_AddContextChild = function ( vm, ev )
	{	console.debug( "EXPIRED???? OnClick_AddContextChild" );
		//_self.CurrentContextBladeViewModel().forEach( function ( v, i, a )
		//{
		//	v.IsSelected( false );
		//	return;
		//} );

		//_self.CurrentContextBladeViewModel()[vm.Index()].IsSelected( true );
		//_self.CurrentContextSize( vm.BladeSize() );

		//	this.OnClick_OpenCloseContextBlade( vm, ev );
		return;
	};
	this.OnClick_RemoveContextChild = function ( vm, ev )
	{	//	console.debug( "OnClick_RemoveContextChild" );
		let _new = _self.CurrentContextBladeViewModel().filter( function ( item )
		{
			return item !== vm;
		} );

		if ( _new.length == 0 )
		{
			_self.OnClick_OpenCloseContextBlade( vm, ev );
			return;
		}
		else if ( _new.length > 0 )
		{
			//	console.debug( "_new", _new, _new[0].BladeSize() );
			_self.CurrentContextBladeViewModel( _new );
			_self.CurrentContextBladeViewModel()[0].IsSelected( true );
			_self.CurrentContextSize( _new[0].BladeSize() );
		}

		return;
	};


    /* Event handlers */
	//	event handlers for onchange of input type elements, dependign on the behavoir needed
	//	for example, checkboxes within labels, radio button groups, etc.
    this.OnClick_HandleReturnTrue = function ()
    { 
        return true;
	};
    this.OnClick_HandleReturnFalse = function ( vm, ev )
	{	//	console.debug( "OnClick_HandleReturnFalse" );
        return false;
	};
    this.OnClick_HandleReturnNull = function ( vm, ev )
    {
        return null;
	};
	this.OnClick_FullRefresh = function ( vm, ev )
	{	//	console.debug( "OnClick_FullRefresh" );
		window.location.reload();
		return;
	};

    //  Handle All Clicks on the body element, return false.
	// All extensions can call into this as needed
	//  <body data-bind="event: { click: OnClick_BodyCloseAll }, clickBubble: false">
	this.OnClick_BodyCloseAll = function ( vm, ev )
	{	//  console.debug( "Prototype_ViewModel.CloseAll()" );
        if (ev.srcElement.tagName === "INPUT" )
        {
            return true;
		}
		this.NewMenu_IsDisplayed( false );
        this.GlobalSearch.showSearchResults(false);
        this.GlobalSearch.showSearchPlaceHolder(false);

		this.UserPanel_IsDisplayed( false );

		//	console.debug( "this.CurrentExtensionViewModel()", this.CurrentExtensionViewModel().constructor.name );
		if (
			this.CurrentExtensionViewModel().constructor.name == "BrowseAllResources_ViewModel" ||
			this.CurrentExtensionViewModel().constructor.name == "BrowseVirtualMachinesExtension_ViewModel" ||
			this.CurrentExtensionViewModel().constructor.name == "MarketPlaceFilterView_ViewModel"
			)
		{
			this.CurrentExtensionViewModel().CloseAllFilterDropdowns();
		}


		if ( this.CurrentExtensionViewModel().constructor.name == "SmartDefaults_CreateFlow_VMS_ViewModel" )
		{
			this.CurrentExtensionViewModel().Hide_CurrentCallout();
		}

        return false;
	};

	// user/avatar drop down
    this.UserPanel_IsDisplayed = ko.observable( false );
    this.OnClick_ShowUserPanel = function ( vm, ev )
    {
        if ( this.UserPanel_IsDisplayed() == false )
        {
            this.UserPanel_IsDisplayed( true );
        }
        else if ( this.UserPanel_IsDisplayed() == true )
        {
            this.UserPanel_IsDisplayed( false );
        }
        return;
    };

    //  FEATURE FLAG PANEL
    //  PARSE QUERYSTRINGS FOR FEATURE FLAGS
	//	this can be customized in the future
	//	basic logic is to use the standard web syntax for query strings
	//	right now, it just fills an observable array for later use with in this view model or
	//	extension or child extension view models
	this.FF_NewNav = ko.observable(1);
	this.FeaturePanel_IsDisplayed = ko.observable( false );
	this.FeatureFlags = ko.observableArray( [] );
	this.parseQueryString = ko.computed(function ()
	{
		let queryArray = [];
		let _full_flags = window.location.search.split("?");
		//	console.log( "_full_flags: " + _full_flags[1]);

		if ( _full_flags.length > 1 )
		{
			let _flags = _full_flags[1].split( "&" );
			//	console.log( "_flags: " + _flags );

			_flags.forEach( function ( v, i, a )
			{
				let _v_split = v.split( "=" );
				//	console.debug( "_v_split", _v_split );
				let _feature_flag = {
					"name": _v_split[0],
					"value": _v_split[1]
				};
				queryArray.push( _feature_flag );
				return;
			});
			////	console array
			//queryArray.forEach( function ( v, i, a )
			//{
			//	console.debug( "v", v.name, v.value );
			//	return;
			//});
			this.FeatureFlags( queryArray );
		}
		//	console.debug( "return::this.FeatureFlags", this.FeatureFlags() );

		// check for your feature flag,
		// assign to a specific ko.observable for your use
		this.FeatureFlags().forEach( function ( v, i, a )
		{	//	console.debug( "this.FeatureFlags():v", v.name, v.value );
			if ( v.name === "nav" )
			{
				_self.FF_NewNav(v.value);
			}
			return;
		});
		//	console.debug( "this.FF_NewNav()::", this.FF_NewNav() );
		return;
	}, this);
    this.OnClick_ShowHideFeaturePanel = function ( vm, ev )
    {   //  console.debug( "this.OnClick_ShowHideFeaturePanel" );
        if ( this.FeaturePanel_IsDisplayed() === false )
        {
            this.FeaturePanel_IsDisplayed( true );
        }
        else if ( this.FeaturePanel_IsDisplayed() === true )
        {
            this.FeaturePanel_IsDisplayed( false );
        }
        return;
	};

	// IBIZA DAY 2019 DEMO FEATURES
	this.Demo_Animation = ko.observable();
	this.Demo_Animation_Panel_IsVisible = ko.observable( false );
	this.Demo_Features_Init = function ()
	{	//	console.debug( "this.Demo_Features_Init" );
		this.Demo_Animation( new AnimateAzureLogo() );

		//// start animation
		window.setTimeout( function ()
		{	//	console.debug( "start animation" );
			_self.Demo_Animation().StartAnimation();
			_self.Demo_Animation_Panel_IsVisible( true );
			return;
		}, 0 );

		//// stop animation
		window.setTimeout( function ()
		{	//	console.debug( "stop animation" );
			_self.Demo_Animation().StopAnimation();
			_self.Demo_Animation_Panel_IsVisible( false );
			return;
		}, 5000 );

		// FIRST SET OF NOTIFICATIONS, ADD 4
		//window.setTimeout( function ()
		//{
		//	let _notifications_list = [
		//		new Notification( "Alert #1", "Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. Your virtual machine is offline. ", SVG.Color.AllResources_color, _self.OnClick_TestNotificationAction, _self.OnClick_NotificationDismiss ),
		//		new Notification( "Alert #2", "Your app serivce is offline", SVG.Color.CloudServices_color, _self.OnClick_TestNotificationAction, _self.OnClick_NotificationDismiss ),
		//		new Notification( "Alert #3", "Your SQL server is offline", SVG.Color.Backup_color, _self.OnClick_TestNotificationAction, _self.OnClick_NotificationDismiss ),
		//		new Notification( "Alert #4", "Your SQL database is offline", SVG.Color.CDN_color, _self.OnClick_TestNotificationAction, _self.OnClick_NotificationDismiss ),
		//	];

		//	_self.NotificationsData( _notifications_list );
		//	_self.Overlay_NotificationsData( _notifications_list );

		//	window.setTimeout( function ()
		//	{
		//		_self.Overlay_NotificationsData( [] );
		//		return;
		//	}, 5000 );
		//	return;
		//}, 10000 );
		return;
	};


    //  INITIALIZATION  EVENTS
	//	this.Demo_Features_Init();
	return;
};