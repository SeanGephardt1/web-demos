//	Dashboard specific example
"use strict";
function DashboardExtension_ViewModel( parentViewModel, strName )
{
	ko.utils.extend( this, new Extension_ViewModel( parentViewModel, strName ) );
	var _self = this;
	this.ExtensionName( strName );
	this.ExtensionTemplateName( "ko-Extension-Dashboard-Template" );
	this.BladeName( strName );
	this.BladeIcon( SVG.Color.Dashboard.SVG );
	this.NavIcon( SVG.Color.Dashboard.SVG );
	this.DashboardChevronIcon = ko.observable( SVG.Shell.ChevronDown.SVG );
	this.AddDashboardIcon = ko.observable( SVG.Shell.Add.SVG );
	this.EditDashboardIcon = ko.observable( SVG.Shell.Edit.SVG );
	this.ShareDashboardIcon = ko.observable( SVG.Glyphs.Share.SVG );
	this.FullscreenDashboardIcon = ko.observable( SVG.Glyphs.FullscreenExpandView.SVG );
	this.CloneDashboardIcon = ko.observable( SVG.Clone.SVG );
	this.DeleteDashboardIcon = ko.observable( SVG.Delete.SVG );
	return;
};