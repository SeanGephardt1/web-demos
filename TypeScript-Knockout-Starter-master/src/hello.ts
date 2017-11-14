"use strict";
import * as ko from "knockout";

class HelloViewModel
{
    APPDEBUG: KnockoutObservable<boolean>
    language: KnockoutObservable<string>
    framework: KnockoutObservable<string>
    userConfig: KnockoutObservableArray<any>

    constructor( _debug: boolean, language: string, framework: string, config_data: any )
    {
        var _self = this;
        this.APPDEBUG = ko.observable( _debug );
        this.language = ko.observable( language );
        this.framework = ko.observable( framework );

        this.userConfig = ko.observableArray( [config_data] );
    }
    return;
}

let _app_config = {
    AppTitle: "Azure Prototype V2 Template Project",
    Copyright: "2018 Microsoft Corporation",
    Version: "2.0.1",
    Theme: "Dark"
};

ko.applyBindings( new HelloViewModel( true,"TypeScript", "Knockout", _app_config ) );
