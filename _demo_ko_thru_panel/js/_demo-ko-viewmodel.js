/// <reference path="knockout-3.4.0.js" />
/// "Main" ViewModel V.1.0.0
"use strict";

function MainViewModel(demoName, debugFlag) {
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.DebugOutput = ko.pureComputed(function() {
        if (this.DEBUGFLAG() == true) {
            console.debug("DebugOutput::this", this);
            console.debug("DebugOutput::_self", _self);
        }
        return;
    }, this);
    this.DebugOutput();
    this.Error = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    // non-standard ko.observables


    // ko.observableArray collection of viewmodels for html templates
    this.ChildCollection = ko.observableArray([
        new ChildViewModel("Child 1", this),
        new ChildViewModel("Child 2", this),
        new ChildViewModel("Child 3", this),
        new ChildViewModel("Child 4", this),
        new ChildViewModel("Child 5", this),
    ]);

    //  Handle All Clicks on the body element, return false.
    //  <body data-bind="event: { click: CloseAllFlyouts}, clickBubble: false">
    this.CloseAll = function(viewModel, event) {
        if (this.DEBUGFLAG() == true) {
            console.debug("this.CloseAll", viewModel, event);
        }
        var _rv_false = false;
        // handle objects like popups, drop down menus and other UI events
        return _rv_false;
    };
    return;
};

//  "ChildViewModel" to show templates and collections
function ChildViewModel(title, parentViewModel) {
    var _self = this;
    this.ID = ko.pureComputed(function() { return "child-id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(title || "ChildViewModel - Title");
    this.Error = ko.observable(false);
    this.ErrorMessage = ko.observable();
    this.ParentViewModel = ko.observable();

    //  this will allow the demo to continue,
    //  and provides a better explanation in the browser console
    //  than a simple KO exception
    //  though it needs deeper investigation
    try {
        if (parentViewModel == undefined) {
            var _e = new Error("ParentViewModel not assigned to this ChildViewModel");
            this.Error(true);
            this.ErrorMessage(_e.message);
            throw _e;
        } else {
            this.ParentViewModel(parentViewModel);
        }
    } catch (exNoParent) {
        console.error(exNoParent.stack);
        //  throw exNoParent;
    }
    return;
};