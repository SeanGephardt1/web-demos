/// <reference path="knockout-3.4.0.js" />
// SKG.COM ViewModel template V 1.1
"use strict";
function TEMPLATE_ViewModel(title, debugFlag)
{
	var _self = this;
	this.ID = ko.pureComputed(function ()
	{
		return "ko-vm-id-" + Math.random().toPrecision(7).replace(".", "");
	}, this);
	this.Title = ko.observable(title);
	this.DEBUGFLAG = ko.observable(debugFlag || false);

	this.DebugOutput = ko.pureComputed(function ()
	{
		console.log("DebugOutput::", this);
		return;
	}, this);

	/* 
	 * Handle All Clicks on the body element, return false.
	 * <body data-bind="event: { click: CloseAllFlyouts}, clickBubble: false">
	 * 
	 * */
	this.CloseAllFlyouts = function (vm, ev)
	{
		//	Close the StatusPanelBar Ellipsis Flyout
		vm.FocusedProcess().IsEllipsisFlyoutDisplayed(false);

		return false;
	};

	return;
}