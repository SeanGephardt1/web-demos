/// <reference path="../script/knockout-3.4.2.js" />
///  this.Property.subscribe( function ( newValue ) { console.debug("this.HasNodesCollection.subscribe", newValue); return; },this);
///  this.OnEventHandler = function ( vm, ev ) { console.debug("this.OnEventHandler"); return; };
///  for implied performance help - http://knockoutjs.com/documentation/deferred-updates.html

"use strict";
// command buttons
function CommandBarButton(json)
{
    let _self = this;
	this.ID = ko.pureComputed( function () { return "cbb-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Text = ko.observable( json.Text ||  "Button" );
	this.Image = ko.observable( json.Image || SVG.Shell.CreateHub.SVG );
	this.Action = json.Action;
	return;
};

// Notification
function Notification( title, desc, icon, action, dismissAction )
{
    let _self = this;
	this.ID = ko.pureComputed( function () { return "note-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( title || "Notification" );
	this.Description = ko.observable( desc || "Notification description" );
	this.Icon = ko.observable( icon.SVG || SVG.Glyphs.Notification.SVG );
	this.IconName = ko.observable( icon.Name || SVG.Glyphs.Notification.Name );
	this.IsVisible = ko.observable( true );
	this.Action = action;
	this.DismissAction = dismissAction;
	return;
};

    // TAGS TAB
function TagViewModel(k,v,r)
{
    this.Key = ko.observable( k || "key" );
	this.Value = ko.observable( v || "value" );
	this.ResourceType = ko.observable( r || "resource type" );
	return;
};

/* TABS FUNCTIONALITY */
function TabButton_ViewModel( name, isSelected, hasRequired )
{
    let _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( name || "tab button" );
    this.Index = ko.observable();
    this.IsVisible = ko.observable( true );
    this.IsVisible.subscribe( function ( nv )
    {
        if ( nv == true )
        {
            _self.HasPrevButton( true );
            _self.HasNextButton( true );
        }
        else
        {
            _self.HasPrevButton( false );
            _self.HasNextButton( false );
        }
    }, this );
    this.HasRequiredFields = ko.observable( hasRequired || false );
    this.RequiredFlagText = ko.observable( "*" );
    this.RequiredText = ko.observable( "This section has required fields" );
    this.IsSelectedTab = ko.observable( isSelected || false );
    this.HasPrevButton = ko.observable( true );
	this.HasNextButton = ko.observable( true );
	return;
};


/* "ko-tool-tip-control-template" */
// only top & right currently work for this proto
// based on "infoicon" position
const CalloutDirection = {
	Top: "top",
	Left: "left",
	Right: "right",
	Bottom: "bottom"
};
const CalloutTypes = {
	Regular: "regular",
	Paged: "paged"
};
const CalloutData = [
	{	// subscription
		title: "Subscriptions",
		type: CalloutTypes.Regular,
		messages: ["All resources in an Azure subscription are billed together"]
	},
	{	// resrouce group
		title: "Resource groups",
		type: CalloutTypes.Regular,
		messages: ["A resource group is a collection of resources that share the same lifecycle, permissions, and policies."]
	},
	{	// VM machine name
		title: "Virtual machine name",
		type: CalloutTypes.Paged,
		messages: ["Virtual machines in Azure have two distinct names: virtual machine name used as the Azure resource identifier, and in guest host name. When you create a VM in the portal, the same name is used for both the virtual machine name and the host name. The virtual machine name cannot be changed after the VM is created. You can change the host name when you log into the virtual machine."]
	},
	{	// region
		title: "Regions",
		type: CalloutTypes.Regular,
		messages: ["Choose the Azure region that is right for you and your customers. Not all VM sizers are available in all regions."]
	},
	{	// availabiity options
		title: "Availability options",
		type: CalloutTypes.Paged,
		messages: [
			"Azure offers a range of options for managing availability and resiliency for your applications. Leave Availability options as No infrastructure redundancy required if this is for a single instance web application. This option is used to ensure the VM is highly available by grouping multiple VMs together as a set to deal with planned or unplanned maintenance. ",
			"An availability set is a logical grouping of VMs within a datacenter that allows Azure to understand how your application is built to provide for redundancy and availability. We recommended that two or more VMs are created within an availability set to provide for a highly available application and to meet the 99.95% Azure SLA.",
			"Availability zones, an alternative to availability sets, expand the level of control you have to maintain the availability of the applications and data on your VMs. An Availability Zone is a physically separate zone within an Azure region. There are three Availability Zones per supported Azure region. By architecting your solutions to use replicated VMs in zones, you can protect your apps and data from the loss of a datacenter."
		]
	},
	{	// image
		title: "Virtual machine image",
		type: CalloutTypes.Regular,
		messages: ["Choose the base operating system or application for the VM."]
	},
	{	// image size
		title: "Virtual machine image size",
		type: CalloutTypes.Paged,
		messages: [
			"The Size field is not directly editable and has a DS2_v3 default size, which is one of the general-purpose computing selections. This choice is perfect for a public web server but you can explore other VM sizes.",
			"Prices presented are estimates in your local currency that include only Azure infrastructure costs and any discounts for the subscription and location. The prices don't include any applicable software costs. Recommended sizes are determined by the publisher of the selected image based on hardware and software requirements."
		]
	},
	{	// authentication type
		title: "Authentication type",
		type: CalloutTypes.Regular,
		messages: ["Choose whether the administrator account will use username/password or SSH keys for authentication."]
	},
	{	// username
		title: "Administrator username",
		type: CalloutTypes.Regular,
		messages: ["The administrator username for the VM"]
	},
	{	// SSH public key
		title: "SSH Public key",
		type: CalloutTypes.Paged,
		messages: ["Provide an RSA public key in the single-line format (starting with \"ssh - rsa\") or the multi-line PEM format. You can generate SSH keys using ssh-keygen on Linux and OS X, or PuTTYGen on Windows. Copy the SSH key from your public key file and paste it into the SSH public key field. DO NOT add any additional white space or line-fed characters when copying the public key"]
	},
	{	//	AAD
		title: "Using Azure AD",
		type: CalloutTypes.Paged,
		messages: [
			"When you use Azure AD authentication for Linux VMs, you centrally control and enforce policies that allow or deny access to the VMs. Use your corporate Active Directory credentials to log in to the VM, enforce MFA, and enable access via RBAC roles.",
			"With Role-Based Access Control (RBAC), you can specify who can sign in to a given VM as a regular user or with administrator privileges. When users join or leave your team, you can update the RBAC policy for the VM to grant access as appropriate."
		]
	},
	{	//	public inbound ports
		title: "Public inbound ports",
		type: CalloutTypes.Paged,
		messages: ["By default, access to the virtual machine is restricted to sources in the same virtual network, and traffic from Azure load balancing solutions. Select None to confirm, or choose to allow traffic from the public internet to one of these common ports. If this is a Linux VM, you may want to be able to access the VM using SSH remotely. Scroll the list if necessary until you find SSH (22) and select it. You can also adjust the network ports after you create the VM."]
	},
];
function CallOut_ViewModel( parentViewModel, eventSource )
{
	let _self = this;	
	this.ID = ko.pureComputed( function () { return "callout-vm-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
	this.Template = ko.observable( "ko-tool-tip-control-template" );
	this.Type = ko.observable( CalloutTypes.Regular );
	this.IsToolTip = ko.observable( true );

	this.PageLeftIcon = ko.observable( SVG.ChevronLeft.SVG );
	this.PageRightIcon = ko.observable( SVG.ChevronRight.SVG);
	this.HeaderIsDisplayed = ko.observable( false );
	this.Header = ko.observable("");
	this.CurrentMessageIndex = ko.observable( 0 );
	this.CurrentPopupMessage = ko.observable( "" );
	this.PopupMessages = ko.observableArray( [] );
	this.OnClick_DoNothing = function ( vm, ev )
	{	//	console.debug( "OnClick_DoNothing" );
		//	allows pinned callout to stay when use clicks on callout
		return false;
	};
	this.OnClick_PageMessages = function ( index, vm, ev )
	{	//	console.debug( "this.OnClick_PageMessages", index, _self.PopupMessages().length );
		_self.CurrentMessageIndex( index );
		_self.CurrentPopupMessage( _self.PopupMessages()[index] );
		_self.ResetPosition();
		return;
	};
	this.OnClick_LeftPaging = function ( vm, ev )
	{	//	console.debug( "OnClick_LeftPaging", _self.CurrentMessageIndex() );
		let _new_index = _self.CurrentMessageIndex() - 1;
		if ( _new_index < 1 )
		{
			_new_index = 0;
		}
		_self.CurrentMessageIndex( _new_index );
		_self.CurrentPopupMessage( _self.PopupMessages()[_new_index] );
		_self.ResetPosition();
		return;
	};
	this.OnClick_RightPaging = function ( vm, ev )
	{	//	console.debug( "OnClick_RightPaging", _self.CurrentMessageIndex(), _self.PopupMessages().length);
		let _new_index = _self.CurrentMessageIndex() + 1;
		if ( _new_index >= _self.PopupMessages().length - 1 )
		{
			_new_index = _self.PopupMessages().length -1 ;
		}
		_self.CurrentMessageIndex( _new_index );
		_self.CurrentPopupMessage( _self.PopupMessages()[_new_index] );
		_self.ResetPosition();
		return;
	};

	this.DisplayDirection = ko.observable( CalloutDirection.Top );
	this.IsPopupDisplayed = ko.observable( false );
	this.PopupTop = ko.observable( 0 );
	this.PopupLeft = ko.observable( 0 );
	this.OriginalClientRect = ko.observable();
	this.ChevronPosition = ko.observable( "10px" );
	this.SetPosition = function ()
	{	//	console.debug( "this.SetPosition()", eventSource, _self.PreviousHeight() );
		const _px = "px";
		const _spacing = 5;

		let _client_rect;
		let _new_height = 0;
		let _new_top = 0;
		let _new_left = 0;
		let _box = document.getElementById( "context-panel-tooltip-001" );

		//	console.debug( "this.SetPosition", this.Type(), this.DisplayDirection() );

		if ( _box !== undefined && _box !== null )
		{
			_client_rect = _box.getBoundingClientRect();
			//	console.debug( "_client_rect", _client_rect );

			if ( _client_rect.height > 45 )
			{
				_new_height = _client_rect.height - 45;
			}
		}
		//	console.debug( "_box", _box ); 
		//	console.debug( "_client_rect", _client_rect.top, _client_rect.height );

		if ( this.DisplayDirection() == "right" )
		{
			//	console.debug( "eventSource.clientY", eventSource.clientY );
			let _evc = eventSource.currentTarget;
			//	console.debug( "_evc.offsetTop", _evc.offsetTop );
			//	console.debug( "_evc.offsetLeft", _evc.offsetLeft );
			let _parent = _evc.offsetParent;
			//	console.debug( "_parent.offsetTop", _parent.offsetTop );
			//	console.debug( "_parent.offsetLeft", _parent.offsetLeft );
			//	console.debug( "_parent.scrollTop", _parent.scrollTop );
			let _new_top = ( _parent.offsetTop + _evc.offsetTop ) - _parent.scrollTop + 45 + _px;
			//	console.debug( "_new_top", _new_top);

			let _new_left = ( _evc.offsetLeft + ( _evc.width + 34 ) + _parent.offsetLeft ) + _px;
			//	console.debug( "_new_left", _new_left );

			_self.PopupTop( _new_top );
			_self.PopupLeft( _new_left );
		}
		else //"undefined" or "left"
		{ 
			let _evc = eventSource.currentTarget;
			//	console.debug( "_evc", _evc.offsetTop );

			let _parent = _evc.offsetParent;
			//console.debug( "_parent", _parent.offsetTop );

			let _temp_top = ( ( _parent.offsetTop + _evc.offsetTop ) - _parent.scrollTop ) + ( _spacing * 2 );
			//	console.debug( "_temp_top", _temp_top );

			_new_top = ( _temp_top - _new_height ) + _px;
			//	console.debug( "_new_top", _new_top );

			_new_left = ( _parent.offsetLeft + _evc.offsetLeft + _spacing ) + _px;

			_self.PopupTop( _new_top );
			_self.PopupLeft( _new_left );
		}
		// get final position for paging
		_box = document.getElementById( "context-panel-tooltip-001" );
		//	console.debug( "_self.OriginalClientRect();,_client_rect", _self.OriginalClientRect(), _client_rect );

		if ( _box !== undefined && _box !== null )
		{
			_self.OriginalClientRect( _box.getBoundingClientRect() );
		}
		//	console.debug( "_self.OriginalClientRect();,_client_rect", _self.OriginalClientRect(), _client_rect );
		//	this.ChevronPosition( "10px" );
		return;
	};
	this.ResetPosition = function ()
	{	//	console.debug( "this.ResetPosition(), only used with callouts that have pages");
		const _px = "px";
		//	const _spacing = 5;
		let _client_rect;
		//	let _new_height = 0;
		let _new_top = 0;
		let _bottom_diff = 0;	
		let _temp_top = parseInt(_self.PopupTop());
		let _box = document.getElementById( "context-panel-tooltip-001" );

		if ( _box !== undefined && _box !== null )
		{
			_client_rect = _box.getBoundingClientRect();
		}
		//	console.debug( "RESET: _self.OriginalClientRect(), _client_rect", _self.OriginalClientRect().bottom, _client_rect.bottom );
		if ( this.DisplayDirection() !== "right" )
		{
			if ( _self.OriginalClientRect().bottom < _client_rect.bottom )
			{
				_bottom_diff = ( _client_rect.bottom - _self.OriginalClientRect().bottom );
				_new_top = _temp_top - _bottom_diff + _px;
				//	console.debug( _self.PopupTop(), _temp_top, _new_top );
				_self.PopupTop( _new_top );
			}
			else if ( _self.OriginalClientRect().bottom > _client_rect.bottom )
			{
				_bottom_diff = ( _self.OriginalClientRect().bottom - _client_rect.bottom );
				_new_top = _temp_top + _bottom_diff + _px;
				_self.PopupTop( _new_top );
			}
			else if ( _self.OriginalClientRect().bottom == _client_rect.bottom )
			{
				//	_bottom_diff = ( _client_rect.bottom - _self.OriginalClientRect().bottom );
				//	console.debug( "DO NOTHING" );
				_new_top = _temp_top + _px;
				_self.PopupTop( _new_top );
			}
			//console.debug( "_bottom_diff", _bottom_diff, "_temp_top", _temp_top );
			//console.debug( _self.PopupTop(), "_new_top", _new_top );
		}
		return;
	};

	this.Computed_Initialize = ko.computed( function ()
	{	//	console.debug( "Computed_Position" );
		if ( this.Type() == CalloutTypes.Regular )
		{
			this.IsToolTip( true );
		}
		else if ( this.Type() == CalloutTypes.Paged )
		{
			this.IsToolTip( false );
		}
		//	console.debug( "Computed_Initialize.this.IsToolTip", this.IsToolTip() );
		return;
	}, this );
	return;
}