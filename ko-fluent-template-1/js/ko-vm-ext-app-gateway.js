
function ApplicationGateway_ViewModel(parentViewModel, strName) {
    ko.utils.extend(this, new Extension_ViewModel(parentViewModel, strName));
    var _self = this;
    this.ExtensionName(strName);
    this.BladeIcon(SVG.Color.ApplicationGateways_color.SVG );
    // this.BladeIcon("#FxSymbole-Application-Gateway");
    this.BladeName("Create an application gateway");
    this.ExtensionTemplateName("ko-Extension-Feature-Comparison");
    this.chevron = ko.observable('<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.20001 8.70078L8.80001 5.00078L5.20001 1.30078" stroke="#0078D7" stroke-miterlimit="10"/><path d="M1.20001 8.70078L4.80001 5.00078L1.20001 1.30078" stroke="#0078D7" stroke-miterlimit="10"/></svg>');
    this.blueadd = ko.observable('<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.6593 5.83971H5.65979V11H4.99948V5.83971H2.34271e-10V5.16029H4.99948V0H5.65979V5.16029H10.6593V5.83971Z" fill="#015CDA"/> </svg>');
    this.updown = ko.observable('<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.7999 3.60313L8.6999 1.70312V7.10312H9.1999V1.70312L10.9999 3.60313L11.3999 3.30313L8.8999 0.703125L6.3999 3.30313L6.7999 3.60313Z" fill="#A0A0A0"/> <path d="M0.4 7.20313L2.2 9.10312V3.70312H2.7V9.10312L4.6 7.20313L5 7.50312L2.5 10.1031L0 7.50312L0.4 7.20313Z" fill="black"/> </svg>');
    this.backendtarget = ko.observable('<svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.4"> <path d="M43.6062 6.28516H60.2793V27.1702C60.2793 29.4711 54.7221 33.2187 43.6062 33.2187C32.4904 33.2187 26.9331 29.4903 26.9331 27.1702V6.28516H43.6062Z" fill="#0072C6"/> <path d="M60.2793 5.4457C60.2793 8.45455 52.8136 11.2864 43.6062 11.2864C34.3988 11.2864 26.9331 8.45327 26.9331 5.4457C26.9331 2.43812 34.3988 0 43.6062 0C52.8136 0 60.2793 2.43812 60.2793 5.4457Z" fill="white"/> <path opacity="0.2" d="M43.6062 6.28516H26.9331V27.1702C26.9331 29.4903 32.4904 33.2187 43.6062 33.2187V6.28516Z" fill="white"/> <path d="M43.6056 8.72104C51.3972 8.72104 57.7136 7.12817 57.7136 5.16326C57.7136 3.19834 51.3972 1.60547 43.6056 1.60547C35.8139 1.60547 29.4976 3.19834 29.4976 5.16326C29.4976 7.12817 35.8139 8.72104 43.6056 8.72104Z" fill="#59B4D9"/> <path d="M16.6731 16.543H33.3462V37.428C33.3462 39.7289 27.789 43.4765 16.6731 43.4765C5.55728 43.4765 0 39.7481 0 37.428V16.543H16.6731Z" fill="#0072C6"/> <path d="M33.3462 15.7035C33.3462 18.7111 25.8805 21.5442 16.6731 21.5442C7.46571 21.5442 0 18.7111 0 15.7035C0 12.6959 7.46571 10.2578 16.6731 10.2578C25.8805 10.2578 33.3462 12.6959 33.3462 15.7035Z" fill="white"/> <path opacity="0.2" d="M16.6731 16.543H0V37.428C0 39.7481 5.55728 43.4765 16.6731 43.4765V16.543Z" fill="white"/> <path d="M16.6739 18.9828C24.4656 18.9828 30.782 17.3899 30.782 15.425C30.782 13.4601 24.4656 11.8672 16.6739 11.8672C8.88229 11.8672 2.56592 13.4601 2.56592 15.425C2.56592 17.3899 8.88229 18.9828 16.6739 18.9828Z" fill="#59B4D9"/> <path d="M47.4544 26.8047H64.1275V47.6897C64.1275 49.9906 58.5702 53.7382 47.4544 53.7382C36.3385 53.7382 30.7812 50.0098 30.7812 47.6897V26.8047H47.4544Z" fill="#0072C6"/> <path d="M64.1275 25.973C64.1275 28.9806 56.6618 31.8138 47.4544 31.8138C38.247 31.8138 30.7812 28.9806 30.7812 25.973C30.7812 22.9655 38.247 20.5273 47.4544 20.5273C56.6618 20.5273 64.1275 22.9655 64.1275 25.973Z" fill="white"/> <path opacity="0.2" d="M47.4544 26.8047H30.7812V47.6897C30.7812 50.0098 36.3385 53.7382 47.4544 53.7382V26.8047Z" fill="white"/> <path d="M47.4537 29.2406C55.2454 29.2406 61.5617 27.6477 61.5617 25.6828C61.5617 23.7179 55.2454 22.125 47.4537 22.125C39.6621 22.125 33.3457 23.7179 33.3457 25.6828C33.3457 27.6477 39.6621 29.2406 47.4537 29.2406Z" fill="#59B4D9"/> <path opacity="0.6" d="M62.8449 43.3393C60.4491 43.297 57.7148 43.0007 57.7148 40.9102C57.7148 42.7993 55.1497 45.2708 52.5846 45.2708C50.0195 45.2708 47.4544 43.6907 47.4544 42.1927C47.4544 43.6907 44.8893 45.2708 42.3242 45.2708C39.7591 45.2708 37.194 42.7993 37.194 40.9102C37.194 43.3893 33.3463 43.347 30.7812 43.347V46.5752C30.7812 48.8312 36.3385 53.0944 47.4544 53.0944C55.5062 53.0944 60.6261 50.8473 62.8449 48.7581V43.3393Z" fill="white"/> <path d="M20.5213 37.0625H37.1944V57.9475C37.1944 60.2484 31.6371 63.996 20.5213 63.996C9.40542 63.996 3.84814 60.2676 3.84814 57.9475V37.0625H20.5213Z" fill="#0072C6"/> <path d="M37.1944 36.223C37.1944 39.2306 29.7287 42.0638 20.5213 42.0638C11.3139 42.0638 3.84814 39.2306 3.84814 36.223C3.84814 33.2155 11.3139 30.7773 20.5213 30.7773C29.7287 30.7773 37.1944 33.2155 37.1944 36.223Z" fill="white"/> <path opacity="0.2" d="M20.5213 37.0625H3.84814V57.9475C3.84814 60.2676 9.40542 63.996 20.5213 63.996V37.0625Z" fill="white"/> <path d="M20.5211 39.4984C28.3128 39.4984 34.6291 37.9055 34.6291 35.9406C34.6291 33.9757 28.3128 32.3828 20.5211 32.3828C12.7295 32.3828 6.41309 33.9757 6.41309 35.9406C6.41309 37.9055 12.7295 39.4984 20.5211 39.4984Z" fill="#59B4D9"/> <path opacity="0.6" d="M35.9115 53.8511C33.5157 54.0986 30.7813 53.2585 30.7813 51.168C30.7813 53.0572 28.2162 55.5286 25.6511 55.5286C23.086 55.5286 20.5209 53.9485 20.5209 52.4505C20.5209 53.9485 17.9558 55.5286 15.3908 55.5286C12.8257 55.5286 10.2606 53.0572 10.2606 51.168C10.2606 53.2585 7.52617 54.0986 5.13037 53.8511V59.0249C7.34918 61.1154 12.4691 63.3522 20.5209 63.3522C28.5728 63.3522 33.6927 61.1051 35.9115 59.0159V53.8511Z" fill="white"/> </g> </svg>');
    this.check = ko.observable('<svg viewBox="0 0 16 16" class="fxs-portal-svg" role="presentation" focusable="false" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="FxSymbol0-048" width="100%" height="100%"><g><title></title><path d="M.632 8.853l-.531-.575a.38.38 0 0 1 .022-.538l1.534-1.418a.374.374 0 0 1 .531.022l4.218 4.523 7.258-9.296a.374.374 0 0 1 .298-.145.37.37 0 0 1 .233.081l1.659 1.28a.362.362 0 0 1 .064.524L6.595 15.246.632 8.853z"></path></g></svg>');
    this.dropdown = ko.observable('<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 3.20703L10 3.20703L4.96875 8.26953L0 3.20703Z" fill="#252525"/> </svg>');
    this.rightArray = ko.observable('<svg width="535" height="18" viewBox="0 0 535 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <line y1="-0.5" x2="11.6726" y2="-0.5" transform="matrix(-0.685365 -0.7282 0.685365 -0.7282 535 8.5)" stroke="#A6A6A6"/> <line y1="-0.5" x2="11.6726" y2="-0.5" transform="matrix(-0.685365 0.7282 0.685365 0.7282 535 8.5)" stroke="#A6A6A6"/> <line x1="-4.37114e-08" y1="8.5" x2="534" y2="8.49995" stroke="#A6A6A6"/> </svg>');
    this.VMSS = ko.observable('');
    this.checkvisible = ko.observable(false);


    this.clearAll = function(){
        _self.clickedRegion('');
    }


    this.clickedRegion = ko.observable("");
    this.onclick_toggleRegionClicked = function(value){

        if (_self.clickedRegion() == ''){
            _self.clickedRegion(value);
        } else if (_self.clickedRegion() == 'center'){
            if (value == 'center'){
                _self.clickedRegion('');
            } else if (value == 'right'){
                _self.clickedRegion('right');
            }
        } else if (_self.clickedRegion() == 'right'){
            if (value == 'right'){
                _self.clickedRegion('');
            } else if (value == 'center'){
                _self.clickedRegion('center');
            }
        }


        return;
    };





    this.OnClick_CloseAll = function () {
        _self.PopUpModal(false);
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);
    };

    //TABS
    this.Tabs = ko.observableArray(["Basics", "FrontEnd", "Backendpool", "Configure", "Tags", "Review + create"]);
    this.SelectedState = ko.observable("Basics");

    this.SelectTab = function (vm) {
        //console.log(vm);
        _self.SelectedState(vm);
        //console.log("new Selected State value: ", _self.SelectedState());
        return;
    };

    //STEPS
    // this.ShowSteps = ko.observable(true);
    this.AddFrontEnd = ko.observable(false);
    this.AddBackEnd = ko.observable(false);
    this.AddListeners = ko.observable(false);

    //instructions
    this.GuidedSteps = ko.observable(false);

    //STEPS COMPLETED
    this.Step1Complete = ko.observable(false);
    this.Step2Complete = ko.observable(false);
    this.Step3Complete = ko.observable(false);
    this.Step4Complete = ko.observable(false);

    //POST FLYOUT OUTPUTS
    this.FrontEndStep1 = ko.observable(false);

    this.onClick_EnableStepGuide = function () {
        this.ShowSteps(false);
        this.AddFrontEnd(true);
        this.GuidedSteps(true);
    };

    //-----------------------TAB: BASICS ---------------------------------
    //submit first tab (basics)
    this.FrontEndsStep = ko.observable(false);
    this.first_step_flag = ko.observable(false);
    this.AppGatewayname = ko.observable("");
    this.BasicsFlag = ko.observable(false);
    this.firstTab = ko.observable(false);
    this.secondTab = ko.observable(false);
    this.thirdTab = ko.observable(false);
    this.fourthTab = ko.observable(false);
    this.onclick_SubmitBasics = function () {
        if (_self.AppGatewayname() == "") {
            console.log("empty");
            _self.BasicsFlag(true);
        }
        else {
            //_self.BasicsFlag(false);
            _self.SelectedState('Frontend');
            //enable check step 1
            //enable second button
            _self.FrontEndsStep(true);
        }
    }

    //------------------------TAB: FRONTENDS ------------------------------
    this.BackEndSteps = ko.observable(false);
    this.PrivateIPError = ko.observable(false);
    this.PublicIPError = ko.observable(false);
    this.namePrivateIPAddress = ko.observable("");



    this.onclick_SubmitFrontEnd = function (vm, ev) {   
    
        if (_self.NamePublicIPAddress() === ""){
            console.log("Error: need to enter a name ");
            _self.PublicIPError(true);
        } else {
            _self.FrontendDropdownSelected(_self.NamePublicIPAddress());
            var tempObject = { name: _self.NamePublicIPAddress(), setting: _self.EighteenthRadioBtn(), indexof: vm.FrontEndNameArray().length };
             _self.FrontEndNameArray.push(tempObject);
            _self.NamePublicIPAddress("");
             _self.SelectedState('Backendpool');
            _self.FrontEndsStep(true);
            _self.BackEndStep(true);
        }
       
    }

    //-----------------------TAB: BACKENDS ---------------------------------
    
    this.ConfigureStep = ko.observable(false);
    this.BackEndStep = ko.observable(false);
    this.onclick_SubmitBackEnd = function(){
        //console.log("onclick_SubmitBackEnd");
        _self.SelectedState('Configure');
        _self.BackEndStep(true);
        _self.ConfigureStep(true);
    }
    
    //IP address SKU
    this.Frontends_IPSKU_DropDown = ko.observable(false);
    this.Frontends_IPSKU_Value = ko.observable("Standard");
    this.FrontendsIPSKUArray = ko.observableArray(["Nothing", "Nothing else"]);
    this.OnClick_Toggle_Basic_Subscription_DropDown = function () {
        if (_self.Frontends_IPSKU_DropDown() == false) {
            _self.Frontends_IPSKU_DropDown(true);
        }
        else if (_self.Frontends_IPSKU_DropDown() == true) {
            _self.Frontends_IPSKU_DropDown(false);
        }
        return;
    };

    this.OnClick_Change_Name_Frontends_IPSKU = function (vm, ev) {
        _self.Frontends_IPSKU_Value(false);
        _self.Basic_Subscription_Value(vm);
        return;
    };


    //---------------------CONTEXT BLADE: FRONTENDS -----------------------
    this.ContextBlade_AddFrontEnd_OpenClosed = ko.observable(false);

    this.onclick_AddFrontEnd = function () {
        _self.ContextBlade_AddFrontEnd_OpenClosed(true);
    };

    //array of IP addresses
    this.ipAddressArray = ko.observableArray(["104.6.456.12", "2125.696.3"]);
    //input fields from flyout
    this.FrontEndNameArray = ko.observableArray([]);
    this.NamePublicIPAddress = ko.observable("");
    this.DNS_NameLabel = ko.observable("");
    this.Range = ko.observable(4);
    this.OnClick_OpenClose_FrontEnd_ContextBlade = function (vm, ev) {	//	console.debug( "this.OnClick_CloseContextBlade");
        if (_self.ContextBlade_AddFrontEnd_OpenClosed() == false) {
            _self.ContextBlade_AddFrontEnd_OpenClosed(true);
        }
        else if (_self.ContextBlade_AddFrontEnd_OpenClosed() == true) {
            _self.ContextBlade_AddFrontEnd_OpenClosed(false);
        }
        return;
    };

    //context blade radio btns
    this.firstRadioBtn = ko.observable(true);
    this.secondRadioBtn = ko.observable(true);
    this.thirdRadioBtn = ko.observable(false);
    this.fourthRadioBtn = ko.observable(true);
    this.fifthRadioBtn = ko.observable(true);
    this.sixthhRadioBtn = ko.observable(true);
    this.seventhRadioBtn = ko.observable(true);
    this.eighthRadioBtn = ko.observable(true);
    this.ninthRadioBtn = ko.observable(true);
    this.tenthRadioBtn = ko.observable(true);
    this.eleventhRadioBtn = ko.observable(false);
    this.twelfthRadioBtn = ko.observable(false);
    this.thirteenthRadioBtn = ko.observable(true);
    this.fourtheenthRadioBtn = ko.observable(true);
    this.fifthteenthRadioBtn = ko.observable(true);
    this.SixteenthRadioBtn = ko.observable(true);
    this.SeventeenthRadioBtn = ko.observable(true);
    this.EighteenthRadioBtn = ko.observable("Public");
    this.NintheenthRadioBtn = ko.observable(true);
    this.HostNameRadioBtn = ko.observable(false);
    this.OverrideHostNameBtn = ko.observable(false);
    this.NewHTTPSettingRadioBtn = ko.observable(true);
    this.HealthProbeBtn = ko.observable(false);
    this.HealthProbeProtocol = ko.observable(true);

    this.Onclick_Toggle_HealthProbeProtocolRadioBtn = function () {
        if (_self.HealthProbeProtocol() == false) {
            _self.HealthProbeProtocol(true);
        }
        else if (_self.HealthProbeProtocol() == true) {
            _self.HealthProbeProtocol(false);
        }
        return;
    };

    this.Onclick_Toggle_HealthProbeRadioBtn = function () {
        if (_self.HealthProbeBtn() == false) {
            _self.HealthProbeBtn(true);
        }
        else if (_self.HealthProbeBtn() == true) {
            _self.HealthProbeBtn(false);
        }
        return;
    };

    this.Onclick_Toggle_NewHTTPSettingRadioBtn = function () {
        if (_self.NewHTTPSettingRadioBtn() == false) {
            _self.NewHTTPSettingRadioBtn(true);
            _self.port(80);
        }
        else if (_self.NewHTTPSettingRadioBtn() == true) {
            _self.NewHTTPSettingRadioBtn(false);
            _self.port(443);
        }
        return;
    };

    this.Onclick_Toggle_OverrideHostNameRadioBtn = function () {
        if (_self.OverrideHostNameBtn() == false) {
            _self.OverrideHostNameBtn(true);
        }
        else if (_self.OverrideHostNameBtn() == true) {
            _self.OverrideHostNameBtn(false);
        }
        return;
    };

    this.Onclick_Toggle_HostNameRadioBtn = function () {
        if (_self.HostNameRadioBtn() == false) {
            _self.HostNameRadioBtn(true);
        }
        else if (_self.HostNameRadioBtn() == true) {
            _self.HostNameRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleNinteenthRadioBtn = function (vm, ev) {
        if (_self.NintheenthRadioBtn() == false) {
            _self.NintheenthRadioBtn(true);
        }
        else if (_self.NintheenthRadioBtn() == true) {
            _self.NintheenthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleEighteenthRadioBtn = function (vm, ev) {
        console.log(vm);
        _self.EighteenthRadioBtn(vm);

        //if (vm === "Public") {
        //    _self.firstRadioBtn(true);
        //} else if (vm === "Private") {
        //    _self.firstRadioBtn(false);
        //}


        //EighteenthRadioBtn

        return;
    };

    this.OnClick_ToggleSeventeenthRadioBtn = function (vm, ev) {
        if (_self.SeventeenthRadioBtn() == false) {
            _self.SeventeenthRadioBtn(true);
        }
        else if (_self.SeventeenthRadioBtn() == true) {
            _self.SeventeenthRadioBtn(false);
        }
        return;
    };

    this.OnClick_TogglesixteenthRadioBtn = function (vm, ev) {
        if (_self.SixteenthRadioBtn() == false) {
            _self.SixteenthRadioBtn(true);
        }
        else if (_self.SixteenthRadioBtn() == true) {
            _self.SixteenthRadioBtn(false);
        }
        return;
    };


    this.OnClick_ToggleFifteenthRadioBtn = function (vm, ev) {
        if (_self.fifthteenthRadioBtn() == false) {
            _self.fifthteenthRadioBtn(true);
            _self.portNumber("80");
        }
        else if (_self.fifthteenthRadioBtn() == true) {
            _self.fifthteenthRadioBtn(false);
            _self.portNumber("443");
        }
        return;
    };


    this.OnClick_ToggleFirstRadioBtn = function (vm, ev) {
        if (_self.firstRadioBtn() == false) {
            _self.firstRadioBtn(true);
        }
        else if (_self.firstRadioBtn() == true) {
            _self.firstRadioBtn(false);
        }

        _self.EighteenthRadioBtn('Public');
        return;
    };

    this.OnClick_ToggleSecondRadioBtn = function (vm, ev) {
        if (_self.secondRadioBtn() == false) {
            _self.secondRadioBtn(true);
        }
        else if (_self.secondRadioBtn() == true) {
            _self.secondRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleThirdRadioBtn = function (vm, ev) {
        if (_self.thirdRadioBtn() == false) {
            _self.thirdRadioBtn(true);
        }
        else if (_self.thirdRadioBtn() == true) {
            _self.thirdRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleFourthRadioBtn = function (vm, ev) {
        if (_self.fourthRadioBtn() == false) {
            _self.fourthRadioBtn(true);
        }
        else if (_self.fourthRadioBtn() == true) {
            _self.fourthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleFifthRadioBtn = function (vm, ev) {
        if (_self.fifthRadioBtn() == false) {
            _self.fifthRadioBtn(true);
        }
        else if (_self.fifthRadioBtn() == true) {
            _self.fifthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleSixthRadioBtn = function (vm, ev) {
        if (_self.sixthhRadioBtn() == false) {
            _self.sixthhRadioBtn(true);
        }
        else if (_self.sixthhRadioBtn() == true) {
            _self.sixthhRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleSeventhRadioBtn = function (vm, ev) {
        if (_self.seventhRadioBtn() == false) {
            _self.seventhRadioBtn(true);
        }
        else if (_self.seventhRadioBtn() == true) {
            _self.seventhRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleEigthRadioBtn = function (vm, ev) {
        if (_self.eighthRadioBtn() == false) {
            _self.eighthRadioBtn(true);
        }
        else if (_self.eighthRadioBtn() == true) {
            _self.eighthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleNinthRadioBtn = function (vm, ev) {
        if (_self.ninthRadioBtn() == false) {
            _self.ninthRadioBtn(true);
        }
        else if (_self.ninthRadioBtn() == true) {
            _self.ninthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleTenthRadioBtn = function (vm, ev) {
        if (_self.tenthRadioBtn() == false) {
            _self.tenthRadioBtn(true);
        }
        else if (_self.tenthRadioBtn() == true) {
            _self.tenthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleEleventhRadioBtn = function (vm, ev) {
        if (_self.eleventhRadioBtn() == false) {
            _self.eleventhRadioBtn(true);
        }
        else if (_self.eleventhRadioBtn() == true) {
            _self.eleventhRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleTwelfthRadioBtn = function (vm, ev) {
        if (_self.twelfthRadioBtn() == false) {
            _self.twelfthRadioBtn(true);
        }
        else if (_self.twelfthRadioBtn() == true) {
            _self.twelfthRadioBtn(false);
        }
        return;
    };


    this.OnClick_ToggleThirteenthRadioBtn = function (vm, ev) {
        if (_self.thirteenthRadioBtn() == false) {
            _self.thirteenthRadioBtn(true);
        }
        else if (_self.thirteenthRadioBtn() == true) {
            _self.thirteenthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleFourtheenthRadioBtn = function (vm, ev) {
        if (_self.fourtheenthRadioBtn() == false) {
            _self.fourtheenthRadioBtn(true);
        }
        else if (_self.fourtheenthRadioBtn() == true) {
            _self.fourtheenthRadioBtn(false);
        }
        return;
    };


    this.FrontEndSubmitBtn = ko.observable(false);
    this.Add1 = function (vm, ev) {

        _self.FrontEndSubmitBtn(true);
        return true;
    };

    
    this.publicOrPrivate = ko.observable("");
    this.OnClick_SubmitFrontEndIPddress = function (vm, ev) {
    
        if(_self.firstRadioBtn() == true ){
            _self.publicOrPrivate("Public");
            
        }else {
            _self.publicOrPrivate("Private");
        }

        var tempObject = { name: _self.NamePublicIPAddress(), setting: _self.publicOrPrivate() };
        //console.log(tempObject);
        _self.FrontEndNameArray.push(tempObject);
        _self.NamePublicIPAddress("");
        _self.ContextBlade_AddFrontEnd_OpenClosed(false);
        _self.Step1Complete(true);
        _self.AddListeners(true);
        _self.firstRadioBtn(true);
        _self.secondRadioBtn(true);
        _self.thirdRadioBtn(true);
        _self.DNS_NameLabel("");
    };

    //---------------------CONTEXT BLADE: LISTENERS -----------------------
    this.ContextBlade_AddListeners_OpenClosed = ko.observable(false);

    this.OnClick_OpenClose_Listeners_ContextBlade = function () {
        _self.fourthRadioBtn(true);
        if (_self.ContextBlade_AddListeners_OpenClosed() == false) {
            _self.ContextBlade_AddListeners_OpenClosed(true);
        }
        else if (_self.ContextBlade_AddListeners_OpenClosed() == true) {
            _self.ContextBlade_AddListeners_OpenClosed(false);
        }
        return;


    };

    this.NameListener = ko.observable(""); //temp value for theinput field, will be pushed to ListenerArray
    this.ListenerNameArray = ko.observableArray([]);

    //console.log("this.ListenerNameArray", this.ListenerNameArray()[0]);

    //this.ListenerSelected = ko.observable(this.ListenerNameArray()[0]);
    this.ListenerSelected = ko.observable("Select a listener");

    this.OnClick_ChangeListenerSelected = function (vm, ev) {
        //("vm", vm);
        //console.log(vm.name);
        _self.ListenerSelected(vm.name + " (" + vm.setting + ")" );
        _self.NewRuleDropDown(false);
        return;
    };

    this.portNumber = ko.observable("80");

    //radio bts
    this.fourthRadioBtn = ko.observable(true);
    //this.fifthRadioBtn = ko.observable(false);
    this.sixthRadioBtn = ko.observable(true);

    this.OnClick_ToggleFourthRadioBtn = function (vm, ev) {
        if (_self.fourthRadioBtn() == false) {
            _self.fourthRadioBtn(true);
        }
        else if (_self.fourthRadioBtn() == true) {
            _self.fourthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleFifthRadioBtn = function (vm, ev) {
        if (_self.fifthRadioBtn() == false) {
            _self.fifthRadioBtn(true);
        }
        else if (_self.fifthRadioBtn() == true) {
            _self.fifthRadioBtn(false);
        }
        return;
    };

    this.OnClick_ToggleSixthRadioBtn = function (vm, ev) {
        if (_self.sixthRadioBtn() == false) {
            _self.sixthRadioBtn(true);
        }
        else if (_self.sixthRadioBtn() == true) {
            _self.sixthRadioBtn(false);
        }
        return;
    };

    this.myHTTPSetting = ko.observable("");
    this.OnClick_SubmitListener = function (vm, ev) {
        //close blade
        _self.ContextBlade_AddListeners_OpenClosed(false);
        //show results from frontend flyout
        _self.Step2Complete(true);
        _self.AddBackEnd(true);

        if(_self.fourthRadioBtn() == true){
            //console.log("Fourth radio button is true HTTP");
            _self.myHTTPSetting("HTTP");
        }else {
            //console.log("fourth radio button is false HTTPS");
            _self.myHTTPSetting("HTTPS");
        }

        //NameListener & ListenerSelected
        this.concat = ko.observable(_self.NameListener() + " (" + _self.myHTTPSetting() + ")");
        console.log("concat:", this.concat());


        if (_self.ListenerNameArray().length > 0){
            // console.log("listener selected:", _self.ListenerSelected());
            // console.log("NameListener:", _self.NameListener());
            
             _self.ListenerSelected(this.concat());
        }
       
       var tempObject = { name: _self.NameListener(), setting: _self.myHTTPSetting() };
       //console.log(tempObject);
       _self.ListenerNameArray.push(tempObject);
        _self.NameListener("");
    };

    this.ListenerSubmitBtn = ko.observable(false);
    this.Add2 = function (vm, ev) {

        _self.ListenerSubmitBtn(true);
        return true;
    };


    //ADD A TARGET FOR LISTENER 


    //---------------------CONTEXT BLADE: BACKENDS -----------------------
    
    this.ContextBlade_BackEnd_OpenClosed = ko.observable(false);
    this.onclick_AddBackEnd = function () {
        _self.ContextBlade_BackEnd_OpenClosed(true);
        _self.VMType_Value("Add a target");

    };

    this.OnClick_OpenClose_BackEnd_ContextBlade = function (vm, ev) {	//	console.debug( "this.OnClick_CloseContextBlade");
        if (_self.ContextBlade_BackEnd_OpenClosed() == false) {
            _self.ContextBlade_BackEnd_OpenClosed(true);
        }
        else if (_self.ContextBlade_BackEnd_OpenClosed() == true) {
            _self.ContextBlade_BackEnd_OpenClosed(false);
        }
        return;
    };

    // number of items
    this.numberOfItems = ko.observable(0);

    //input fields from backend fly out
    
    this.NameBackEndPool = ko.observable("");
    this.BackEndPoolNameArray = ko.observableArray([]);

    //dropdown
    this.BackEndPoolDropDown = ko.observable(false);
    this.DropDownValue = ko.observable("No backend target");
    this.OnClick_ToggleBackEndPoolDropDown = function () {
        if (_self.BackEndPoolDropDown() == false) {
            _self.BackEndPoolDropDown(true);
        }
        else if (_self.BackEndPoolDropDown() == true) {
            _self.BackEndPoolDropDown(false);
        }
        return;
    };

    this.BackEndNameSection = ko.observable(false);
    this.OnClick_ChangeNameBackEndPool = function (vm, ev) {
        _self.BackEndPoolDropDown(false);
        _self.DropDownValue(vm);
        _self.BackEndNameSection(true);

        //clear the target type, and TargetTypeArray
        
        

        return;
    };

    this.BackEndPoolSelected = ko.observable("Select a backend target");

    this.OnClick_ChangeBackEndSelected = function (vm, ev) {
        //console.log("vm", vm);
        //console.log("ev", ev);
        _self.BackEndPoolSelected(vm);
        _self.NewRuleDropDown2(false);
        return;
    };

    this.firstInput = ko.observable(true);
    this.secondInput = ko.observable(false);
    this.thirdInput = ko.observable(false);
    this.fourthInput = ko.observable(false);
    this.fifthInput = ko.observable(false);

    this.firstTrashCan = ko.observable(false);
    this.secondTrashCan = ko.observable(false);
    this.thirdTrashCan = ko.observable(false);
    this.fourthTrashCan = ko.observable(false);

    this.EnterString = function (vm, ev) {
        //console.log("vm: ", vm);
        //console.log(ev.which);

        if (ev.which == 13) {
            //console.log("enter pressed");
            //append another input or just show the next one. 
            this.secondInput(true);
            this.firstTrashCan(true);
        }
        return true;
    };

    this.EnterString1 = function (vm, ev) {
        //console.log("vm: ", vm);
        //console.log(ev.which);

        if (ev.which == 13) {
            //console.log("enter pressed");
            //append another input or just show the next one. 
            this.thirdInput(true);
            this.secondTrashCan(true);
        }
        return true;
    };

    this.EnterString2 = function (vm, ev) {
        //console.log("vm: ", vm);
        //console.log(ev.which);

        if (ev.which == 13) {
            //console.log("enter pressed");
            //append another input or just show the next one. 
            this.fourthInput(true);
            this.thirdTrashCan(true);
        }
        return true;
    };

    this.EnterString3 = function (vm, ev) {
        //console.log("vm: ", vm);
        //console.log(ev.which);

        if (ev.which == 13) {
            //console.log("enter pressed");
            //append another input or just show the next one. 
            this.fifthInput(true);
            this.fourthTrashCan(true);
        }
        return true;
    };

    // this.DeleteFirstInput = function (vm, ev) {
    //     _self.firstInput(false);
    // };

    // this.DeleteSecondInput = function (vm, ev) {
    //     _self.secondInput(false);
    // };

    // this.DeleteThirdInput = function (vm, ev) {
    //     _self.thirdInput(false);
    // };

    // this.DeleteFourthInput = function (vm, ev) {
    //     _self.fourthInput(false);
    // };

    


    this.NoBackendTargets = ko.observable(true);
    this.BEPobject = ko.observableArray([]);
    this.OnClick_SubmitBackEndPool = function (vm, ev) {

        _self.numberOfItems(0);
        var temp = { name: _self.NameBackEndPool(), targets: _self.TargetTypeArray() };
        _self.BEPobject.push(temp);

        // console.log(_self.BEPobject());

        _self.ContextBlade_BackEnd_OpenClosed(false);
        _self.Step3Complete(true);
        _self.AppServiceFlag(false);

        //push to array
        //_self.BackEndPoolNameArray.push(_self.NameBackEndPool());
        _self.DropDownValue("No backend target");
        _self.BackEndNameSection(false);
        _self.BackEndPoolSelected(_self.NameBackEndPool());
        _self.NameBackEndPool("");
 
        //clear inputs
        _self.TargetsContainer(true);
        _self.firstInput(true);
        _self.secondInput(false);
        _self.thirdInput(false);
        _self.fourthInput(false);
        _self.fifthInput(false);
        //console.log(_self.TargetTypeArray());
        _self.TargetTypeArray([]);
        //console.log(_self.TargetTypeArray());
        _self.TargetType_Value("Choose a target type");
        _self.VMSSType_Value("Add a target");
        _self.NoBackendTargets(false);
        
    };

    //UPDATED BACKEND POOL STUFF

    //drop downs
    this.TargetsContainer = ko.observable(true);

    //target type
    this.ChooseTargetType_DropDown = ko.observable(false);
    this.TargetType_Value = ko.observable("Choose a target type");
    this.ChooseTarrgetArray = ko.observableArray([
        { name: "Virtual Machine", img: "#FxSymbol0-018-VirtualMachines" },
        { name: "Virtual machine scale set", img: "#FxSymbole-VM-ScaleSets" },
        { name: "IP address or FQDN", img: "#FxSymbole-IP-Address" },
        { name: "App Services", img: "#FxSymbol0-016-App-Services" },
        // "Virtual Machine", "Virtual machine scale set", 
        //"IP address or FQDN", "App Services"
    ]);
    
    this.OnClick_Toggle_TarrgetType_DropDown = function () {
        this.ChooseVMType_DropDown(false);
        if (_self.ChooseTargetType_DropDown() == false) {
            _self.ChooseTargetType_DropDown(true);
        }
        else if (_self.ChooseTargetType_DropDown() == true) {
            _self.ChooseTargetType_DropDown(false);
        }
        //close anything else you might want to close here: 

        return;

    };

    this.TargetTypeArray = ko.observableArray([
        // {name: "testing", description: "test"}

    ]);

    this.NewTargetTypeArray = ko.observableArray([

    ]);

    this.tempVM = "";
    this.AppServiceFlag = ko.observable(false);
    this.OnClick_Change_TargetTypeValue = function (vm, ev) {

        //console.log("vmmm:", vm);
        if(vm == "App Services"){
            _self.AppServiceFlag(true);
        }
        
        _self.ChooseTargetType_DropDown(false);
        _self.TargetType_Value(vm);

        //create temp variable 
        _self.tempVM = vm;
        //console.log("tempVM", _self.tempVM);
  
        return;
    };

    //add rules > add target 
    //target type = backend pools

    this.ChooseRuleTargetType_DropDown = ko.observable(false);
    this.ChooseRuleTypeArray = ko.observableArray(["Backend pool", "External site", "Listener", "Backend pool"]);
    this.OnClick_Toggle_TargetType_DropDown = function () {
        if (_self.ChooseRuleTargetType_DropDown() == false) {
            _self.ChooseRuleTargetType_DropDown(true);
        }
        else if (_self.ChooseRuleTargetType_DropDown() == true) {
            _self.ChooseRuleTargetType_DropDown(false);
        }
        //close anything else you might want to close here: 
        return;
    };
    
    

    this.RuleTargetType_Value = ko.observable("Backend pool");
    this.OnClick_Change_RuleTargetType = function (vm, ev) {
        //show the divider part
        _self.ChooseRuleTargetType_DropDown(false);
        _self.RuleTargetType_Value(vm);
        
        return;
    };

    //target backend pools drop down

    this.ChooseBackEndPool_DropDown = ko.observable(false);
    // this.ChooseRuleTypeArray = ko.observableArray(["Backend pool", "External site", "Listener"]);
    //using BackEndPoolNameArray
    this.OnClick_Toggle_BackEndPool_DropDown = function () {
        if (_self.ChooseBackEndPool_DropDown() == false) {
            _self.ChooseBackEndPool_DropDown(true);
        }
        else if (_self.ChooseBackEndPool_DropDown() == true) {
            _self.ChooseBackEndPool_DropDown(false);
        }
        //close anything else you might want to close here: 
        return;
    };

    this.BackEndPool_Value = ko.observable("Select a target type");
    this.OnClick_Change_BackEndPoolSelected = function (vm, ev) {
        //show the divider part
        console.log("vm backendpool", vm);
        _self.ChooseBackEndPool_DropDown(false);
        _self.BackEndPool_Value(vm.name);
        
        return;
    };

    //target external site drop down

    this.ChooseExternalSite_DropDown = ko.observable(false);
    this.ChooseExternalSiteeArray = ko.observableArray(["Backend pool", "External site", "Listener"]);

    this.OnClick_Toggle_ExternalSite_DropDown = function () {
        if (_self.ChooseExternalSite_DropDown() == false) {
            _self.ChooseExternalSite_DropDown(true);
        }
        else if (_self.ChooseExternalSite_DropDown() == true) {
            _self.ChooseExternalSite_DropDown(false);
        }
        return;
    };

    this.ExternalSite_Value = ko.observable("Permanent");
    this.OnClick_Change_ExternalSiteSelected = function (vm, ev) {
        //console.log("vm backendpool", vm);
        _self.ChooseExternalSite_DropDown(false);
        _self.ExternalSite_Value(vm);
        
        return;
    };

    //add a target / "name"
    this.ChooseVMType_DropDown = ko.observable(false);
    this.VMType_Value = ko.observable("Add a target");
    this.VMSSType_Value = ko.observable("Add a target");
    this.ChooseVMArray = ko.observableArray([
        { name: "MyVirtualMachine01", description: "MyNic01" },
        { name: "MyVirtualMachine01", description: "Same-VM-different-NIC" },
        { name: "My-other-VM-with-one-nic", description: "" },
        { name: "Another-VM-with-one-nic", description: "" },    
    ]);

    this.ChooseVMScaleSetArray = ko.observableArray([
        { name: "testenv", description: "NIC: Net-Interface-02 <br />IP: 40.65.140.73"},
        { name: "Mediaservices", description: "NIC: Net-Interface-02 <br />IP: 40.65.140.73" },
        { name: "Dataproc1", description: "NIC: Net-Interface-02 <br />IP: 40.65.140.73" },
        { name: "Dataproc2", description: "NIC: Net-Interface-02 <br />IP: 40.65.140.73" },    
        { name: "Dataproc3", description: "NIC: Net-Interface-02 <br />IP: 40.65.140.73" },    
    ]);

    this.OnClick_Toggle_VMType_DropDown = function () {
        this.ChooseTargetType_DropDown(false);
        if (_self.ChooseVMType_DropDown() == false) {
            _self.ChooseVMType_DropDown(true);
        }
        else if (_self.ChooseVMType_DropDown() == true) {
            _self.ChooseVMType_DropDown(false);
        }
        return;
    };

    this.ChooseVMSSType_DropDown = ko.observable(false);
    this.OnClick_Toggle_VMSSType_DropDown = function () {
        if (_self.ChooseVMSSType_DropDown() == false) {
            _self.ChooseVMSSType_DropDown(true);
        }
        else if (_self.ChooseVMSSType_DropDown() == true) {
            _self.ChooseVMSSType_DropDown(false);
        }
        return;
    };

    this.addTargetFlag = ko.observable(false);

    this.OnClick_Change_VMValue = function (vm, ev) {

        _self.addTargetFlag(true);
        console.log("virtual machine vm: ", vm);
        _self.VMType_Value(vm); 
        tempObject = { name: _self.tempVM, description: vm, backendpoolname: _self.NameBackEndPool(), targettype: "VM" };

        if (_self.addTargetFlag() == false) {
            //console.log('EMPTY!');
            
        } else if (_self.addTargetFlag() == true) {
            //console.log("goood");
            _self.numberOfItems(_self.numberOfItems() + 1);
            _self.TargetTypeArray.push(tempObject);
            _self.NewTargetTypeArray.push(tempObject);
            _self.addTargetFlag(false);
            _self.TargetsContainer(false);
            _self.TargetType_Value("Choose a target type");
            _self.VMSSType_Value("Add a target");
        }
        //reset tempObject
        tempObject = {name: "", description: "", };


        // _self.ChooseVMSSType_DropDown(false);
        // _self.ChooseVMType_DropDown(false);
        return;
    };

    //submit input line
    this.appServicesValue = ko.observable("");
    this.addIPAddress = function (vm, ev) {
        tempObject = { name: "IP Address or FQDN", description: _self.appServicesValue, backendpoolname: _self.NameBackEndPool()};
        return true;
    };


    this.OnClick_Change_AppServiceValue = function (vm, ev) {
        _self.ChooseAppServiceType_DropDown(false);
        _self.AppServiceType_Value(vm);
        tempObject = { name: "app services", description: vm, backendpoolname: _self.NameBackEndPool()};
        // _self.TargetTypeArray.push(tempObject);


        _self.numberOfItems(_self.numberOfItems() + 1);
        _self.TargetTypeArray.push(tempObject);
        _self.NewTargetTypeArray.push(tempObject);
        _self.addTargetFlag(false);
        _self.TargetsContainer(false);






        return;
    };


    this.tempObject = ko.observableArray([]);

    this.OnClick_Change_VMVSSalue = function (vm, ev) {
        //show the divider part
        _self.ChooseVMSSType_DropDown(false);
        _self.ChooseVMType_DropDown(false);
        _self.addTargetFlag(true);
        _self.VMSSType_Value(vm); 

        tempObject = { name: _self.tempVM, description: vm, backendpoolname: _self.NameBackEndPool(), img: _self.VMSS, targettype:  "VMSS"}; //_self.TargetType_Value()
        //tempObject = {name: _self.tempVM, description: vm};


        if (_self.addTargetFlag() == false) {
            //console.log('EMPTY!');
            
        } else if (_self.addTargetFlag() == true) {
            //console.log("goood");
            _self.numberOfItems(_self.numberOfItems() + 1);
            _self.TargetTypeArray.push(tempObject);
            _self.NewTargetTypeArray.push(tempObject);
            _self.addTargetFlag(false);
            _self.TargetsContainer(false);
        }
        //reset tempObject
        tempObject = {name: "", description: "", };

        _self.TargetType_Value("Choose a target type");
        _self.VMSSType_Value("Add a target");
        
        return;
    };

    this.onclick_submit_target = function () {  

        //need to check EVERY TYPE 
        //1. OnClick_Change_VMValue, 2. OnClick_Change_VMVSSalue, 3.OnClick_Change_AppServiceValue

        //THIS NOW SHOWS / HIDES THE DROP DOWN 
        _self.TargetsContainer(true);

        // if (_self.addTargetFlag() == false) {
        //     //console.log('EMPTY!');
            
        // } else if (_self.addTargetFlag() == true) {
        //     //console.log("goood");
        //     _self.numberOfItems(_self.numberOfItems() + 1);
        //     _self.TargetTypeArray.push(tempObject);
        //     _self.NewTargetTypeArray.push(tempObject);
        //     _self.addTargetFlag(false);
        // }
        // //reset tempObject
        // tempObject = {name: "", description: "", };

        // _self.TargetType_Value("Choose a target type");
        // _self.VMSSType_Value("Add a target");
    };

    this.OnClick_Change_VMSSValue = function (vm, ev) {

        //show the divider part
        _self.ChooseTargetTypeSS_DropDown(false);
        _self.ChooseVMSSType_DropDown(false);
        _self.VMSSType_Value(vm); 
        console.log(_self.TargetType_Value())
        tempObject = {name: _self.tempVMSS, description: vm};
        return;
    };

    //select app service 
    this.ChooseAppServiceType_DropDown = ko.observable(false);
    this.AppServiceType_Value = ko.observable("Add a target");
    this.ChooseAppServicesArray = ko.observableArray(["app1", "app2", "app3"]);
    this.OnClick_Toggle_AppServiceType_DropDown = function () {
        if (_self.ChooseAppServiceType_DropDown() == false) {
            _self.ChooseAppServiceType_DropDown(true);
        }
        else if (_self.ChooseAppServiceType_DropDown() == true) {
            _self.ChooseAppServiceType_DropDown(false);
        }
        return;

    };

    //---------------------CONTEXT BLADE: RULES -----------------------//
    this.ContextBlade_Rules_OpenClosed = ko.observable(false);

    this.OnClick_OpenClose_Rules_ContextBlade = function () {
        if (_self.ContextBlade_Rules_OpenClosed() == false) {
            _self.ContextBlade_Rules_OpenClosed(true);
            _self.TargetsContainer(true)
        }
        else if (_self.ContextBlade_Rules_OpenClosed() == true) {
            _self.ContextBlade_Rules_OpenClosed(false);
        }
        return;
    };

    //dropdowns
    this.NameNeRule = ko.observable("");
    this.NewRuleDropDown = ko.observable(false);
    this.NewRuleDropDown2 = ko.observable(false);
    this.FrontendDropDown = ko.observable(false);
    this.NewRule_DropDownValue = ko.observable("");
    this.NewRule_DropDownValue2 = ko.observable("None");

    this.OnClick_ToggleRulesDropDown = function (vm, ev) {

        _self.ChooseDefaultHTTPSetting_DropDown(false);
        _self.NewRuleDropDown2(false);
        if (_self.NewRuleDropDown() == false) {
            _self.NewRuleDropDown(true);
        }
        else if (_self.NewRuleDropDown() == true) {
            _self.NewRuleDropDown(false);
        }
        return;
    };

    this.OnClick_ToggleRulesDropDown2 = function (vm, ev) {
        _self.NewRuleDropDown(false);
        _self.ChooseDefaultHTTPSetting_DropDown(false);
        if (_self.NewRuleDropDown2() == false) {
            _self.NewRuleDropDown2(true);
        }
        else if (_self.NewRuleDropDown2() == true) {
            _self.NewRuleDropDown2(false);
        }
        return;

    };

    this.FrontendDropdownSelected = ko.observable("Select a frontend target"); //this.FrontEndNameArray()[0].name ||

    this.OnClick_ToggleFrontendDropDown = function (vm, ev) {
        _self.FrontendDropDown(false);
        _self.ChooseDefaultHTTPSetting_DropDown(false);
        if (_self.FrontendDropDown() == false) {
            _self.FrontendDropDown(true);
        }
        else if (_self.FrontendDropDown() == true) {
            _self.FrontendDropDown(false);
        }
        return;

    };

    this.OnClick_ChangeFrontendSelected = function (vm, ev) {
        // console.log("vm", vm);
        // console.log("ev", ev);
        _self.FrontendDropdownSelected(vm.name);
        _self.FrontendDropDown(false);
        return;
    };


    this.OnClick_ChangeNameRules = function (vm, ev) {
        _self.NewRule_DropDownValue(vm);
        _self.NewRuleDropDown(false);
    };

    this.OnClick_ChangeNameRules2 = function (vm, ev) {
        _self.NewRule_DropDownValue2(vm);
        _self.NewRuleDropDown2(false);
    };

    this.OnClick_CloseAllLocal = function (vm, ev) {
        _self.NewRuleDropDown(false);
        _self.NewRuleDropDown2(false);
        _self.ChooseDefaultHTTPSetting_DropDown(false);
    };

    //TABS
    this.FlyOutListener = ko.observable(true);
    this.onclick_ToggleFlyOutListener = function (vm, ev) {
        _self.FlyOutListener(vm);
    };

    //CREATE NEW HTTP SETTING 
    this.ChooseDefaultHTTPSetting_DropDown = ko.observable(false);
    this.OnClick_Toggle_HTTPSetting_DropDown = function () {
        _self.NewRuleDropDown(false);
        _self.NewRuleDropDown2(false);
        if (_self.ChooseDefaultHTTPSetting_DropDown() == false) {
            _self.ChooseDefaultHTTPSetting_DropDown(true);
        }
        else if (_self.ChooseDefaultHTTPSetting_DropDown() == true) {
            _self.ChooseDefaultHTTPSetting_DropDown(false);
        }
        //close anything else you might want to close here: 
        return;
    };
    
    this.HTTPSetting_Value = ko.observable("");
    this.OnClick_Change_HTTPSetting = function (vm, ev) {
     
        _self.ChooseDefaultHTTPSetting_DropDown(false);
        _self.HTTPSetting_Value(vm);

        return;
    };


    this.CreateNewHTTPSetting2 = ko.observable(false);

    this.rulesubmitdisabled = ko.observable(false);

    this.ToggleModal = ko.observable(false);
    this.onclick_ToggleModal = function(){
        if (_self.ToggleModal() == false) {
            _self.ToggleModal(true);
        }
        else if (_self.ToggleModal() == true) {
            _self.ToggleModal(false);
        }
        return;
    }

    this.modalInputValue = ko.observable("");

    this.OnClick_ToggleCreateNewHTTPSetting2 = function (vm, ev) {
        _self.ToggleModal(false);
        _self.rulesubmitdisabled(true);
        _self.HTTPsettingname("");
        _self.ChooseDefaultHTTPSetting_DropDown(false);
        if (_self.CreateNewHTTPSetting2() == false) {
            _self.CreateNewHTTPSetting2(true);
        }
        else if (_self.CreateNewHTTPSetting2() == true) {
            _self.CreateNewHTTPSetting2(false);
        }
        return;
    };
    

    this.HTTPsettingname = ko.observable("");
    this.HTTPSettingNameArray = ko.observableArray([]);
    this.CreateNew = ko.observable(true);

    this.OnClick_ToggleCreateNewHTTPSetting3 = function (vm, ev) {
        _self.RoutingSubmitFlag(true);
        _self.RoutingSubmitFlag(true);
        _self.HTTPSettingWarning(false);
        _self.rulesubmitdisabled(false);
        _self.fifthteenthRadioBtn(true);
        _self.CreateNewHTTPSetting2(false);
        //console.log(_self.HTTPsettingname());
        _self.HTTPSettingNameArray.push(_self.HTTPsettingname());
        // _selfHTTPsettingname();
        console.log("HTTPSetting_Value", _self.HTTPSetting_Value());
        console.log("HTTPsettingname", _self.HTTPsettingname());

        _self.HTTPSetting_Value(_self.HTTPsettingname());
        _self.CreateNew(false);
        return;
    };

    //creat new HTTP setting in fly out blade
    this.CreateNewHTTPSetting = ko.observable(false);
    this.FINALLY = ko.observable(true);
    this.OnClick_ToggleCreateNewHTTPSetting = function (vm, ev) {
       _self.FINALLY(true);
        if (_self.CreateNewHTTPSetting() == false) {
            _self.CreateNewHTTPSetting(true);
            _self.rulesubmitdisabled(true);
        }
        else if (_self.CreateNewHTTPSetting() == true) {
            _self.CreateNewHTTPSetting(false);
            _self.rulesubmitdisabled(false);
        }
        return;
    };

    this.OnClick_SubmitCreateNewHTTPSetting = function (vm, ev) {
        _self.FINALLY(false);
         if (_self.CreateNewHTTPSetting() == false) {
             _self.CreateNewHTTPSetting(true);
             _self.rulesubmitdisabled(true);
         }
         else if (_self.CreateNewHTTPSetting() == true) {
             _self.CreateNewHTTPSetting(false);
             _self.rulesubmitdisabled(false);
         }
         return;
     };

    this.NameRule = ko.observable(""); //temp value for theinput field, will be pushed to ListenerArray
    this.RuleNameArray = ko.observableArray([]);

    this.port = ko.observable("80");
    this.Small = ko.observable(false);
    this.BackEndTarget_Warning = ko.observable(true);
    this.HTTPSettingWarning = ko.observable(true);

    this.RoutingSubmitFlag = ko.observable(false);
    this.OnClick_SubmitNewRule = function (vm, ev) {

        if(_self.RoutingSubmitFlag() == false){
            console.log("cannot submit routing rule");
            _self.FlyOutListener(false);

        } else {
            _self.RoutingSubmitFlag(false);
            if(_self.FINALLY() == false){
                //need to data bind exisiting stuff & the new target stuff
                //data bind "small" to the add button
                _self.Small(true);

                //close blade
                _self.ContextBlade_Rules_OpenClosed(false);

                //flag may not be necessary anymore
                _self.Step4Complete(true);
                _self.CreateNew(true);

                this.HTTPSettingValue = ko.observable("");
                if (_self.fifthteenthRadioBtn() == true) {
                    this.HTTPSettingValue("HTTP");
                } else if (_self.fifthteenthRadioBtn() == false) {
                    this.HTTPSettingValue("HTTPS");
                }

                //console.log("name rule: ", _self.nameRule());
                tempObject = { name: _self.NameListener(), rule: _self.NameRule(), port: _self.port(), HTTPSetting: this.HTTPSettingValue(), pathBasedRule: _self.pathValue() }; //setting: vm.setting, indexof: vm.indexof 
                _self.RuleNameArray.push(tempObject);

                //subimt the name >> NameRule
                //_self.RuleNameArray.push(_self.NameRule());

                //clear the value in the text box
                _self.ListenerSelected("");

                //tab reverts back to listener tab
                _self.FlyOutListener(true);
                //UNSURE ABOUT EVERYHTING DOWN HERE ON.
                _self.BackEndPoolSelected("");
                _self.NameRule("");
                //everything that "go back to rule" btn does
                _self.fifthteenthRadioBtn(true);
                _self.CreateNewHTTPSetting2(false);
                //console.log(_self.HTTPsettingname());

                if(  _self.HTTPSettingNameArray() != _self.HTTPsettingname()){
                    _self.HTTPSettingNameArray.push(_self.HTTPsettingname());
                }

                _self.onclick_ToggleFlyOutListener(true);
                _self.NameListener("");


            }

            else {
                //data bind "small" to the add button
                _self.Small(true);

                //close blade
                _self.ContextBlade_Rules_OpenClosed(false);

                //flag may not be necessary anymore
                _self.Step4Complete(true);
                _self.CreateNew(true);

                this.HTTPSettingValue = ko.observable("");
                if (_self.fifthteenthRadioBtn() == true) {
                    this.HTTPSettingValue("HTTP");
                } else if (_self.fifthteenthRadioBtn() == false) {
                    this.HTTPSettingValue("HTTPS");
                }

                //console.log("name rule: ", _self.nameRule());
                tempObject = { name: _self.NameListener(), rule: _self.NameRule(), port: _self.port(), HTTPSetting: this.HTTPSettingValue(), pathBasedRule: "" }; //setting: vm.setting, indexof: vm.indexof 
                _self.RuleNameArray.push(tempObject);

                //subimt the name >> NameRule
                //_self.RuleNameArray.push(_self.NameRule());

                //clear the value in the text box
                _self.ListenerSelected("");

                //tab reverts back to listener tab
                _self.FlyOutListener(true);
                //UNSURE ABOUT EVERYHTING DOWN HERE ON.
                _self.BackEndPoolSelected("");
                _self.NameRule("");
                //everything that "go back to rule" btn does
                _self.fifthteenthRadioBtn(true);
                _self.CreateNewHTTPSetting2(false);
                //console.log(_self.HTTPsettingname());

                if(  _self.HTTPSettingNameArray() != _self.HTTPsettingname()){
                    _self.HTTPSettingNameArray.push(_self.HTTPsettingname());
                }

                _self.onclick_ToggleFlyOutListener(true);
                _self.NameListener("");

            }

        }




 
 


    };

    this.HTTPSettingName = ko.observable();

    this.RulesSubmitBtn = ko.observable(false);
    this.Add3 = function (vm, ev) {
        _self.RulesSubmitBtn(true);
        return true;
    };

    //----------------------------BASIC tab KO logic--------------------------
    this.Basic_Subscription_DropDown = ko.observable(false);
    this.Basic_Subscription_Value = ko.observable("IaaS Exp");
    this.BasicSubscriptionArray = ko.observableArray(["Iaas Exp"]);
    this.OnClick_Toggle_Basic_Subscription_DropDown = function () {
        if (_self.Basic_Subscription_DropDown() == false) {
            _self.Basic_Subscription_DropDown(true);
        }
        else if (_self.Basic_Subscription_DropDown() == true) {
            _self.Basic_Subscription_DropDown(false);
        }
        //close the rest 
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);
        return;

    };

    this.OnClick_Change_Name_Basic_Subscription = function (vm, ev) {
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_Subscription_Value(vm);
        return;

    };


    this.Basic_ResourceGroup_DropDown = ko.observable(false);
    this.Basic_ResourceGroup_Value = ko.observable("Default RG");
    this.BasicResourceGroupArray = ko.observableArray(["Default RG", "Secondary RG"]);
    this.OnClick_Toggle_Basic_ResourceGroup_DropDown = function () {
        if (_self.Basic_ResourceGroup_DropDown() == false) {
            _self.Basic_ResourceGroup_DropDown(true);
        }
        else if (_self.Basic_ResourceGroup_DropDown() == true) {
            _self.Basic_ResourceGroup_DropDown(false);
        }
        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_ResourceGroup = function (vm, ev) {
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ResourceGroup_Value(vm);
        return;

    };

    this.Basic_ApplicationGateway_DropDown = ko.observable(false);
    this.Basic_ApplicationGateway_Value = ko.observable("AppGateway01");
    this.AppGatewayArray = ko.observableArray(["AppGatway01", "AppGatway02", "AppGatway03", "AppGatway04"]);
    this.OnClick_Toggle_Basic_ApplicationGateway_DropDown = function () {
        if (_self.Basic_ApplicationGateway_DropDown() == false) {
            _self.Basic_ApplicationGateway_DropDown(true);
        }
        else if (_self.Basic_ApplicationGateway_DropDown() == true) {
            _self.Basic_ApplicationGateway_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_ApplicationGateway = function (vm, ev) {
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_ApplicationGateway_Value(vm);
        return;

    };

    this.Basic_Location_DropDown = ko.observable(false);
    this.Basic_Location_Value = ko.observable("East US");
    this.BasicLocationArray = ko.observableArray(["East US", "West US", "Europe", "S Africa"]);

    this.OnClick_Toggle_Basic_Location_DropDown = function () {
        if (_self.Basic_Location_DropDown() == false) {
            _self.Basic_Location_DropDown(true);
        }
        else if (_self.Basic_Location_DropDown() == true) {
            _self.Basic_Location_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_Location = function (vm, ev) {
        _self.Basic_Location_DropDown(false);
        _self.Basic_Location_Value(vm);
        return;

    };

    this.Basic_Tier_DropDown = ko.observable(false);
    this.Basic_Tier_Value = ko.observable("Standard V2");
    this.BasicTierArray = ko.observableArray(["Standard", "Standard V2", "Web application firewall", "Web application firewall V2"]);

    this.OnClick_Toggle_Basic_Tier_DropDown = function (vm, ev) {

        if (_self.Basic_Tier_DropDown() == false) {
            _self.Basic_Tier_DropDown(true);
        }
        else if (_self.Basic_Tier_DropDown() == true) {
            _self.Basic_Tier_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_Tier = function (vm, ev) {
        //console.log("vm", vm);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_Tier_Value(vm);
        return;

    };

    this.Basic_InstanceCount_DropDown = ko.observable(false);
    this.Basic_InstanceCount_Value = ko.observable("2");
    this.BasicInsanceCountArray = ko.observableArray(["1", "2", "3", "4"]);
    this.OnClick_Toggle_Basic_InstanceCount_DropDown = function () {
        if (_self.Basic_InstanceCount_DropDown() == false) {
            _self.Basic_InstanceCount_DropDown(true);
        }
        else if (_self.Basic_InstanceCount_DropDown() == true) {
            _self.Basic_InstanceCount_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);
        return;

    };

    this.OnClick_Change_Name_Basic_InstanceCount = function (vm, ev) {
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_InstanceCount_Value(vm);

        return;

    };

    this.Basic_SKUSize_DropDown = ko.observable(false);
    this.Basic_SKUSize_Value = ko.observable("Medium");
    this.BasicSKUSizeArray = ko.observableArray(["Small", "Medium", "Large"]);
    this.OnClick_Toggle_Basic_SKUSize_DropDown = function () {
        if (_self.Basic_SKUSize_DropDown() == false) {
            _self.Basic_SKUSize_DropDown(true);
        }
        else if (_self.Basic_Tier_DropDown() == true) {
            _self.Basic_SKUSize_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_SKUSize = function (vm, ev) {
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_SKUSize_Value(vm);
        return;

    };


    //avail zone

    this.Basic_AvailZone_DropDown = ko.observable(false);
    this.Basic_AvailZone_Value = ko.observable("None");
    this.BasicAvailZoneArray = ko.observableArray(["None"]);
    this.OnClick_Toggle_Basic_AvailZone_DropDown = function () {
        if (_self.Basic_AvailZone_DropDown() == false) {
            _self.Basic_AvailZone_DropDown(true);
        }
        else if (_self.Basic_AvailZone_DropDown() == true) {
            _self.Basic_AvailZone_DropDown(false);
        }

        //close the rest 
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        //_self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_SKUSize = function (vm, ev) {
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_SKUSize_Value(vm);
        return;

    };


    this.Basic_VirtualNetwork_DropDown = ko.observable(false);
    this.Basic_VirtualNetwork_Value = ko.observable("(new) fooNet");
    this.BasicVirtualNetworkArray = ko.observableArray(["(new) fooNet", "(new) fooNet2", "(new) fooNet3"]);
    this.OnClick_Toggle_Basic_VirtualNetwork_DropDown = function () {
        if (_self.Basic_VirtualNetwork_DropDown() == false) {
            _self.Basic_VirtualNetwork_DropDown(true);
        }
        else if (_self.Basic_VirtualNetwork_DropDown() == true) {
            _self.Basic_VirtualNetwork_DropDown(false);
        }

        //close the rest
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);

        return;

    };

    this.OnClick_Change_Name_Basic_VirtualNetwork = function (vm, ev) {
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_VirtualNetwork_Value(vm);

        return;

    };

    this.Basic_Subnet_DropDown = ko.observable(false);
    this.Basic_Subnet_Value = ko.observable("default");
    this.BasicSubnetArray = ko.observableArray(["default"]);
    this.OnClick_Toggle_Basic_Subnet_DropDown = function () {
        if (_self.Basic_Subnet_DropDown() == false) {
            _self.Basic_Subnet_DropDown(true);
        }
        else if (_self.Basic_Subnet_DropDown() == true) {
            _self.Basic_Subnet_DropDown(false);
        }

        //close the rest
        _self.Basic_Subscription_DropDown(false);
        _self.Basic_ResourceGroup_DropDown(false);
        _self.Basic_ApplicationGateway_DropDown(false);
        _self.Basic_Location_DropDown(false);
        _self.Basic_Tier_DropDown(false);
        _self.Basic_InstanceCount_DropDown(false);
        _self.Basic_SKUSize_DropDown(false);
        _self.Basic_VirtualNetwork_DropDown(false);
        _self.Basic_AvailZone_DropDown(false);
        return;

    };

    this.OnClick_Change_Name_Basic_Subnet = function (vm, ev) {
        _self.Basic_Subnet_DropDown(false);
        _self.Basic_Subnet_Value(vm);

        return;

    };

    this.PopUpModal = ko.observable("");

    this.OnClick_PopUpModal = function (vm, ev) {
        // console.log("vm: ", vm);
        // console.log("ev: ", ev);

        _self.PopUpModal(vm);
    };

    this.ContextBlade_ShowTraffic_OpenClosed = ko.observable(false);

    this.SelectTrafficFlow = function () {
        ////_self.PopUpModal(false);
        //_self.ContextBlade_ShowTraffic_OpenClosed(true);
        if (_self.ContextBlade_ShowTraffic_OpenClosed() == false) {
            _self.ContextBlade_ShowTraffic_OpenClosed(true);
        }
        else if (_self.ContextBlade_ShowTraffic_OpenClosed() == true) {
            _self.ContextBlade_ShowTraffic_OpenClosed(false);
        }
    };

    this.SelectEdit = function () {
        //_self.PopUpModal(false);
    };

    this.SelectMoveUp = function () {
        //_self.PopUpModal(false);
    };

    this.SelectMoveDown= function () {
        //_self.PopUpModal(false);
    };

    this.SelectClone = function () {
        //_self.PopUpModal(false);
    };

    this.SelectDelete = function () {
        //_self.PopUpModal(false);
    };

    this.removeItem = function (idx, vm, ev)
    {
        //console.log("vm", vm, _self);
        //` this.TargetTypeArray().remove(vm);
        let _new = [];
        _self.TargetTypeArray().forEach(function (v, i, a) {
            if (i !== idx)
            {
                _new.push(v);
            }
        });
        _self.TargetTypeArray(_new);

        //decrement from numberOfItems
        _self.numberOfItems(_self.numberOfItems() - 1);

    };
    

    this.pathValue = ko.observable("");
    this.targetNameVlaue = ko.observable("");
    this.HTTPSetting_Value2 = ko.observable("");
    this.OnClick_Change_HTTPSettingSecond = function (vm, ev) {
     
        _self.ChooseDefaultHTTPSetting_DropDown(false);
        _self.HTTPSetting_Value2(vm);

        return;
    };

    //-------------------------------EDIT FRONT END-------------------------------------------
    this.EditableFrontEnd = ko.observableArray([]);
    this.ContextBlade_AddFrontEndEdit_OpenClosed = ko.observable(false);

    this.OnClick_EditFrontEnd = function(vm, ev){
        console.log("edit front end VM: ",  vm);
        _self.ContextBlade_AddFrontEndEdit_OpenClosed(true);
        tempObject = { name: vm.name, indexof: vm.indexof }; //setting: vm.setting, indexof: vm.indexof 
        _self.EditableFrontEnd.push(tempObject);
        return;
    };

    this.OnClick_OpenClose_EditFrontEnd_ContextBlade = function (vm, ev) {	//	console.debug( "this.OnClick_CloseContextBlade");
        if (_self.ContextBlade_AddFrontEndEdit_OpenClosed() == false) {
            _self.ContextBlade_AddFrontEndEdit_OpenClosed(true);
        }
        else if (_self.ContextBlade_AddFrontEndEdit_OpenClosed() == true) {
            _self.ContextBlade_AddFrontEndEdit_OpenClosed(false);
        }
        return;
    };

    //submit edit
    this.OnClick_SubmitFrontEndEdit = function (vm, ev) {
        console.log("submit click vm: ", vm);
        this.IPType = ko.observable("Public");
        for (i = 0; i < _self.FrontEndNameArray().length; i++) {
            console.log(_self.FrontEndNameArray()[i].indexof);
            console.log(vm.indexof);
            console.log("----------------------");

            if (_self.FrontEndNameArray()[i].indexof === vm.indexof) {
                _self.FrontEndNameArray()[i].name = vm.name;
                console.log("vm.setting: ", vm.setting);
                console.log("vm.name: ", vm.name);
                if( _self.firstRadioBtn()){

                }else{
                    this.IPType("Private");
                }
                // console.log(_self.FrontEndNameArray()[i].name);
                _self.FrontEndNameArray.replace(_self.FrontEndNameArray()[i], {
                    name: vm.name,
                    setting: this.IPType(),
                    indexof: vm.indexof
                });
            }
        }

        _self.ContextBlade_AddFrontEndEdit_OpenClosed(false);
        _self.EditableFrontEnd([]);

    };



    //--------------------------------------EDIT BACKEND -------------------------------------------------
    this.EditableBackEnd = ko.observableArray([]);
    this.ContextBlade_BackEndEdit_OpenClosed = ko.observable(false);

    this.OnClick_EditBackEnd = function (vm, ev) {
        console.log("vm", vm);
        _self.ContextBlade_BackEndEdit_OpenClosed(true);
        //console.log(_self.FrontEndNameArray());

        ////push vm to EditableBackEnd
        //tempObject = { name: vm.name, setting: vm.setting, indexof: vm.indexof };
        //_self.EditableBackEnd.push(tempObject);
        ////console.log(_self.EditableBackEnd());
        return;
    };

    this.OnClick_EditBackEnd = function (vm, ev) {
        console.log("vm", vm);
        _self.ContextBlade_BackEndEdit_OpenClosed(true);
        //push vm to EditableBackEnd
        tempObject = { name: vm.name, setting: vm.setting, indexof: vm.indexof };


        _self.EditableBackEnd.push(tempObject);
        //console.log(_self.EditableBackEnd());
        return;
    };
    
    this.OnClick_OpenClose_EditBackEnd_ContextBlade = function (vm, ev) {	//	console.debug( "this.OnClick_CloseContextBlade");
        if (_self.ContextBlade_BackEndEdit_OpenClosed() == false) {
            _self.ContextBlade_BackEndEdit_OpenClosed(true);
        }
        else if (_self.ContextBlade_BackEndEdit_OpenClosed() == true) {
            _self.ContextBlade_BackEndEdit_OpenClosed(false);
        }
        return;
    };



    return;
};