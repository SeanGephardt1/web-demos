/// <reference path="../script/knockout-3.4.2.js" />
///  All "list item" viewmodel types
/// "Listitem_ViewModel" base
"use strict";
function Listitem_ViewModel() {
	const _self = this;
	this.ID = ko.pureComputed(function () { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
	this.ParentViewModel = ko.observable();

	this.DisplayText = ko.observable("default-list-item-viewmodel-" + this.ID());
	this.Name = ko.observable("list-item-" + this.ID());
	this.InfoLinkUrl = ko.observable("#");

	// EVERYTHING HAS A "SUBSCRIPTION" & A "RESOURCE GROUP"
	this.Subscription = ko.observable();
	this.Subscription_Compute = ko.computed(function () {   //  console.debug( "Listitem_ViewModel:Subscription" );
		let _data_length = Math.round(Math.random() * FilterViewModelTypes.Subscriptions.data.length);
		//  console.debug( "1. _data_length", FilterViewModelTypes.Subscriptions.data.length, _data_length );
		if (
			_data_length > FilterViewModelTypes.Subscriptions.data.length ||
			_data_length == FilterViewModelTypes.Subscriptions.data.length
		) {
			_data_length = Math.round((FilterViewModelTypes.Subscriptions.data.length / 2));
		}
		//  console.debug( "2. _data_length", FilterViewModelTypes.Subscriptions.data.length, _data_length );
		let _rv = FilterViewModelTypes.Subscriptions.data[_data_length];
		//	console.debug( "3. _rv", _rv );
		this.Subscription(_rv);
		return;
	}, this);

	this.ResourceGroup = ko.observable();
	this.ResourceGroup_Compute = ko.computed(function () {
		//  console.debug( "Listitem_ViewModel:ResourceGroup" );
		let _data_length = Math.round(Math.random() * FilterViewModelTypes.ResourceGroups.data.length);
		//	console.debug( "ResourceGroup_Compute - 1. _data_length", FilterViewModelTypes.ResourceGroups.data.length, _data_length );

		if (
			_data_length > FilterViewModelTypes.ResourceGroups.data.length ||
			_data_length == FilterViewModelTypes.ResourceGroups.data.length
		) {
			_data_length = Math.round((FilterViewModelTypes.ResourceGroups.data.length / 2));
		}
		//	console.debug( "ResourceGroup_Compute - 2. _data_length", FilterViewModelTypes.ResourceGroups.data.length, _data_length );
		let _rv = FilterViewModelTypes.ResourceGroups.data[_data_length];
		//	console.debug( "3. ResourceGroup:_rv", _rv );
		this.ResourceGroup(_rv);
		return;
	}, this);

	// environment
	this.Environment = ko.observable();
	this.Environment_Compute = ko.computed(function () {
		//  console.debug( "Listitem_ViewModel:ResourceGroup" );
		let _data_length = Math.round(Math.random() * FilterViewModelTypes.Environments.data.length);
		//	console.debug( "ResourceGroup_Compute - 1. _data_length", FilterViewModelTypes.ResourceGroups.data.length, _data_length );

		if (
			_data_length > FilterViewModelTypes.Environments.data.length ||
			_data_length == FilterViewModelTypes.Environments.data.length
		) {
			_data_length = Math.round((FilterViewModelTypes.Environments.data.length / 2));
		}
		//	console.debug( "ResourceGroup_Compute - 2. _data_length", FilterViewModelTypes.ResourceGroups.data.length, _data_length );
		let _rv = FilterViewModelTypes.Environments.data[_data_length];
		//	console.debug( "3. ResourceGroup:_rv", _rv );
		this.Environment(_rv);
		return;
	}, this);


	// ADDING TAGS, letIABLE AMOUNT 
	this.TagsCollectionUXList = ko.observable(3);
	this.TagsCollection = ko.observableArray([]);
	this.TagsCollection_Compute = ko.computed(function () {	//	console.debug( "this.TagsCollection_Compute" );
		let _tag_array = [];
		let _num_of_tags = Math.round(Math.random() * 10);
		//	console.debug( "this.TagsCollection_Compute::_num_of_tags", _num_of_tags );

		for (let i = 0; i < _num_of_tags; i++) {
			let _selected = Math.round(Math.random() * FilterViewModelTypes.TagsList.data.length - 1);
			//	console.debug( "_selected", _selected, FilterViewModelTypes.TagsList.data.length );
			if (_selected < 0) {
				_selected = 4;
			}
			//	console.debug( "_selected", _selected, FilterViewModelTypes.TagsList.data.length );

			let _selected_group = FilterViewModelTypes.TagsList.data[_selected];
			//	console.debug( "_selected_group", _selected_group.name );

			let _selected_value_index = Math.round(Math.random() * _selected_group.list.length - 1);
			//	console.debug( "_selected_value_index", _selected_value_index, _selected_group.list.length );
			if (_selected_value_index < 0) {
				_selected_value_index = 0;
			}
			//	console.debug( "_selected_value_index", _selected_value_index, _selected_group.list.length );

			let _selected_value = _selected_group.list[_selected_value_index];
			//	console.debug( "_selected_value", _selected_group.name, _selected_group.tagName, _selected_value );

			let _tag = new Tag();
			_tag.Title(_selected_group.name);
			_tag.Value(_selected_value);
			//	console.debug( "_tag", _tag );

			let _found = _tag_array.filter(function (item) {
				return item.Title() == _tag.Title();
			});

			if (_found.length == 0) {
				_tag_array.push(_tag);
			}
			else {
				_tag == undefined;
			}
		}

		//	console.debug("_tag_array::", _tag_array);
		//_tag_array.forEach( function ( v, i, a )
		//{
		//	console.debug("_tag_array::", i, v.Title(), v.Value() );
		//	return;
		//} );
		this.TagsCollection(_tag_array);

		return;
	}, this);
	this.TagsCollectionOverFlowCount = ko.computed(function () {
		let _rv = "+" + (this.TagsCollection().length - this.TagsCollectionUXList());
		//	console.debug( this.Subscription(), this.ResourceGroup(),  "_rv", _rv, this.TagsCollection().length, this.TagsCollectionUXList() );
		return _rv;
	}, this);

	// ROW SELECTION
	this._mouseover_bcg = "rgba(0,190,255,0.1)";
	this._selected_bgc = "rgba(0,190,255,0.2)";
	this._unselected_bgc = "transparent";
	this.IsRowSelected = ko.observable(false);
	this.SelectedBackgroundColor = ko.observable(this._unselected_bgc);
	this.OnClick_HandleCheckBoxes = function (vm, ev) {
		return true;
	};
	this.OnClick_SelectRow = function (vm, ev) {   //  console.debug( "OnClick_SelectRow", this.IsRowSelected() );
		let _bgc = this._unselected_bgc;
		if (this.IsRowSelected() == false) {
			this.IsRowSelected(true);
			_bgc = this._selected_bgc;
		}
		else if (this.IsRowSelected() == true) {
			this.IsRowSelected(false);
			_bgc = this._unselected_bgc;
		}
		this.SelectedBackgroundColor(_bgc);
		// add parent viewmodel close on this event

		if (this.ParentViewModel() !== undefined) {
			//	console.debug( "this.ParentViewModel()", this.ParentViewModel().Title() );
			this.ParentViewModel().CloseAll(vm, ev);
		}
		return;
	};
	_self.OnMouseOver_HighlightRow = function (vm, ev) {
		//  console.debug( "OnMouseOver_HighlightRow" );
		_self.SelectedBackgroundColor(_self._mouseover_bcg);
		return;
	};
	_self.OnMouseOut_HighlightRow = function (vm, ev) {
		//  console.debug( "OnMouseOut_HighlightRow" );
		if (_self.IsRowSelected() == false) {
			_self.SelectedBackgroundColor(_self._unselected_bgc);
		}
		else if (_self.IsRowSelected() == true) {
			_self.SelectedBackgroundColor(_self._selected_bgc);
		}
		return;
	};

	// ROW ACTION
	this.ActionTitle = ko.observable("Action");
	this._unselected_action_border = "solid 1px rgba(0,0,0,0)";
	this._selected_action_border = "solid 1px rgba(192,192,192,1)";
	this.IsActionSelected = ko.observable(false);

	this.ActionPanel_IsVisible = ko.observable(false);
	this.SelectedActionBorder = ko.observable(this._unselected_action_border);
	this.OnClick_SelectRowAction = function (vm, ev) {   //console.debug( "OnClick_SelectRowAction" );
		if (this.ActionPanel_IsVisible() == false) {
			this.ActionPanel_IsVisible(true);
		}
		else if (this.ActionPanel_IsVisible() == true) {
			this.ActionPanel_IsVisible(false);
		}

		if (this.ParentViewModel() !== undefined) {
			//  console.debug( "this.ParentViewModel().OnClick_SelectRowAction", this.ParentViewModel().Title() );
			this.ParentViewModel().CloseAll(vm, ev);
		}
		return;
	};
	this.OnMouseOver_HighlightAction = function (vm, ev) {   //  console.debug( "OnMouseOver_HighlightRow" );
		this.SelectedActionBorder(_self._selected_action_border);
		return;
	};
	this.OnMouseOut_HighlightAction = function (vm, ev) {   //  console.debug( "OnMouseOut_HighlightRow" );
		if (this.IsActionSelected() == false) {
			this.SelectedActionBorder(this._unselected_action_border);
		}
		else if (this.IsActionSelected() == true) {
			this.SelectedActionBorder(this._selected_action_border);
		}
		return;
	};

	this.OnClick_ShowAction = function (vm, ev) {   // this.constructor.name;
		let _text = this.ActionTitle() + " " + this.Name();
		//	console.log( _text );
		this.ActionPanel_IsVisible(false);
		return;
	};
	return;
};

// browse all view model
function DataRow_ViewModel() {
	ko.utils.extend(this, new Listitem_ViewModel());

	this._names = [
		"Freezing Frog 1",
		"Freezing Frog 2",
		"Freezing Frog 3",
		"All Your Base",
		"Alpha Caterpillar",
		"Boring Crow",
		"Dancing Butterfly",
		"Crouching Panda",
		"Happy Kitten",
		"Dusty Dog",
		"Zuper Zebra",
		"Jazzy Jolopy",
		"Ghoti The Band",
		"Holiday Trout",
		"King Crocodile",
		"Beta Dogma",
		"Flying Frisbee",
		"Munching Manatee",
		"Screaming Demon 1",
		"Screaming Demon 2",
		"Screaming Demon 3"
	];

	this._res_type_icons = [
		"svg/web.svg",
		"svg/DatabaseSQL.svg",
		"svg/AppInsights.svg",
		"svg/vms.svg",
		"svg/action_groups.svg",
		"svg/sql-db.svg",
		"svg/StorageAlt.svg",
		"svg/TFSVCRepository.svg",
		"svg/Discs.svg",
		"svg/Automation.svg",
		"svg/Action_groups.svg",
		"svg/CustomDomain.svg",
		"svg/BizTalk.svg",
		"svg/DatabaseCache.svg",
		"svg/web.svg",
		"svg/web.svg",
		"svg/web.svg",
		"svg/web.svg",
		"svg/web.svg",
	];

	this.ResourceType = ko.observable("");
	this.ResourceTypeIcon = ko.observable(this._res_type_icons[0]);
	this.ResourceName = ko.observable("");
	this.ResourceLocation = ko.observable("");

	// for VMs
	this.AvailabilitySet = ko.observable("");
	this.IP_Address = ko.observable("");
	this.Public_IP_Address = ko.observable("");
	this.OperatingSystem = ko.observable("");
	this.VirtualNetwork = ko.observable("");
	this.Disk = ko.observable("");
	this.DiskEncryption = ko.observable("");
	this.ManagedDisk = ko.observable("");
	this.Subnet = ko.observable("");
	this.Status = ko.observable("");

	// for app service
	this.AppType = ko.observable("");
	this.AppServicePlan = ko.observable("");
	this.PricingTier = ko.observable("");

	//	console.debug("--MAKE NAMES FOR RANDOM---");
	let _rnd_name = Math.round(Math.random() * (this._names.length - 1));
	let _rnd_name_num = new String(Math.random().toPrecision(5));
	let _rnd_name_plus = this._names[_rnd_name].replace(/ /gi, '-') + "-" + _rnd_name_num.split('.')[1];
	this.ResourceName(_rnd_name_plus);

	let _rnd_res_type = Math.round(Math.random() * (FilterViewModelTypes.ResourceTypes.data.length - 1));
	//	console.debug( "_rnd_res_type", _rnd_res_type );

	this.ResourceType(FilterViewModelTypes.ResourceTypes.data[_rnd_res_type]);
	//	console.debug( "this.ResourceType", this.ResourceType());

	let _rnd_resource_type = Math.round(Math.random() * (this._res_type_icons.length));
	if (_rnd_res_type == FilterViewModelTypes.ResourceTypes.data.length) {
		_rnd_resource_type = 3;
	}
	else if (_rnd_res_type == FilterViewModelTypes.ResourceTypes.data.length + 1) {
		_rnd_resource_type = 0;
	}
	else if (_rnd_res_type == FilterViewModelTypes.ResourceTypes.data.length + 2) {
		_rnd_resource_type = 3;
	}

	// always find a icon, even if it is random
	if (_rnd_resource_type > this._res_type_icons.length - 1) {
		//	console.debug( "_rnd_resource_type", _rnd_resource_type );
		//	console.debug( "this._res_type_icons.length", this._res_type_icons.length );
		_rnd_resource_type = Math.round(Math.random() * (this._res_type_icons.length - 1));
		//	console.debug( "new _rnd_resource_type", _rnd_resource_type );
	}

	//	console.debug( "_rnd_resource_type", _rnd_resource_type );
	//	console.debug( "FilterViewModelTypes.ResourceTypes.data[_rnd_resource_type]", FilterViewModelTypes.ResourceTypes.data[_rnd_resource_type] );
	this.ResourceTypeIcon(this._res_type_icons[_rnd_resource_type]);

	let _rnd_loc = Math.round(Math.random() * (FilterViewModelTypes.DataLocations.data.length - 1));
	this.ResourceLocation(FilterViewModelTypes.DataLocations.data[_rnd_loc]);

	// for app service
	// app service plan
	let _app_srv_plan = Math.round(Math.random() * FilterViewModelTypes.AppServicePlan.data.length);
	if (_app_srv_plan == 4) {
		_app_srv_plan = 3;
	}
	//  console.debug( "_app_srv_plan", _app_srv_plan, FilterViewModelTypes.AppServicePlan.data[_app_srv_plan]);
	this.AppServicePlan(FilterViewModelTypes.AppServicePlan.data[_app_srv_plan]);
	//  console.debug( "this.AppServicePlan", this.AppServicePlan() );

	// app type
	let _app_type = Math.round(Math.random() * (FilterViewModelTypes.AppType.data.length - 1));
	this.AppType(FilterViewModelTypes.AppType.data[_app_type]);

	//pricing tier
	let _pt = Math.round(Math.random() * (FilterViewModelTypes.PricingTiers.data.length - 1));
	this.PricingTier(FilterViewModelTypes.PricingTiers.data[_pt]);

	// status
	this.Status(FilterViewModelTypes.Status.data[Math.round(Math.random())]);


	//	for VMS
	//this.AvailabilitySet = ko.observable("");
	//this.IP_Address = ko.observable( "" );
	//this.Public_IP_Address = ko.observable("");
	//this.OperatingSystem = ko.observable( "" );
	//this.VirtualNetwork = ko.observable( "" );
	//this.Disk = ko.observable( "" );
	//this.DiskEncryption = ko.observable( "" );
	//this.ManagedDisk = ko.observable( "" );
	//this.Subnet = ko.observable( "" );
	//this.Status = ko.observable( "" );
	// availability set
	let _rnd_aset = Math.round(Math.random() * (FilterViewModelTypes.AvailSets.data.length - 1));
	this.AvailabilitySet(FilterViewModelTypes.AvailSets.data[_rnd_aset]);

	// ip address 
	let _rnd_ip = Math.round(Math.random() * (FilterViewModelTypes.IPAddresses.data.length - 1));
	this.IP_Address(FilterViewModelTypes.IPAddresses.data[_rnd_ip]);

	// os
	let _os = FilterViewModelTypes.OSTypes.data[Math.round(Math.random())];
	this.OperatingSystem(_os);

	// virtual network
	let _vnet = Math.round(Math.random() * (FilterViewModelTypes.VirtualNetworks.data.length - 1));
	this.VirtualNetwork(FilterViewModelTypes.VirtualNetworks.data[_vnet]);

	// disk
	let _disk = Math.round(Math.random() * (FilterViewModelTypes.Disks.data.length - 1));
	this.Disk = ko.observable(FilterViewModelTypes.Disks.data[_disk]);

	//console.debug( "\n");
	//console.debug( "Subscription", this.Subscription() );
	//console.debug( "ResourceGroup", this.ResourceGroup() );
	//console.debug( "ResourceType", this.ResourceType() );
	//console.debug( "ResourceName", this.ResourceName() );
	//console.debug( "ResourceLocation", this.ResourceLocation() );
	//console.debug( "AvailabilitySet", this.AvailabilitySet() );
	//console.debug( "IP_Address", this.IP_Address() );
	//console.debug( "OperatingSystem", this.OperatingSystem() );
	//console.debug( "VirtualNetwork", this.VirtualNetwork() );
	//console.debug( "Disk", this.Disk() );
	//console.debug( "Status", this.Status() );
	//console.debug( "AppType", this.AppType() );
	//console.debug( "AppServicePlan", this.AppServicePlan() );
	//console.debug( "PricingTier", this.PricingTier() );
	//console.debug( "TagsCollection", this.TagsCollection() );
	//	console.debug( "Environment", this.Environment() );

	return;
};