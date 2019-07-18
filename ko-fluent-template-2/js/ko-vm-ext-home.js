"use strict";
function AzureHomePage_ViewModel( parentViewModel ) 
{
	ko.utils.extend( this, new Extension_ViewModel( parentViewModel ) );
    const _self = this;
	this.ExtensionName( "Home" );
	this.BladeIcon( SVG.Color.Home.SVG );
	this.BladeName("Azure services");
	this.BladeSubName( "Azure services" );
	this.ExtensionTemplateName( "ko-Extension-Homepage-Template" );
	this.NavIcon( SVG.Color.Home.SVG );
    return;
};