/// <reference path="knockout-3.4.0.js" />
/// "Main" ViewModel V.1.0.0
"use strict";

function ThruDataViewModel(data)
{
    var _self = this;
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );
    this.ID = ko.pureComputed( function () { return "main-data-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
    this.Title = ko.observable("ThruDataViewModel");
    // non-standard ko.observables
    
    // ko.observableArray collection of viewmodels for html templates
    this.ChildCollection = ko.observableArray([
        new ChildViewModel("Child 1 - this is the child of the damned. Let's all become wrappers and try to fix this race condition.", this),
        new ChildViewModel("Child 2", this),
        new ChildViewModel("Child 3", this),
    ]);

    // end of function MainViewModel
    return;
};