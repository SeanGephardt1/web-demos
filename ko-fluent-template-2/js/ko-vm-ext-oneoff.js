//jackies new instances
function JaxExplorer1_ViewModel( parentViewModel, strName, iconId)
{
    ko.utils.extend( this, new Extension_ViewModel(parentViewModel) );
    var _self = this;

	/// blade specifics
	//	this.ParentViewModel( parentViewModel );
	this.ExtensionName( strName );
	this.BladeIcon( iconId || "#FxSymbol0-01c-Monitor" );
	this.BladeName( "Metrics" );
	this.ExtensionTemplateName("ko-Extensions-Monitoring-Template");

	// toc data - defined for this blade
	// set up a default , likely "overview"
    // function TocNode_ViewModel(rootVM,  title, icon, TocUrls, isSelected, bladeVM )
    this.Default_ChildExtension = new ExtensionChild_ViewModel(this, "Overview", "ko-ChildExtension-Overview-Template", [{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }] );

	this.CurrentChildExtension = ko.observable( this.Default_ChildExtension );

	// procedurally, this needs to be defined before being assigned to the "metric explorer" child extension
	this.OnClick_ShowCommandButtonContextBlade = function ( vm, ev )
	{
		console.debug( "this.OnClick_ShowCommandButtonContextBlade" );
		return;
    };

    this.TocGroup_1 = ko.observableArray( [
		new TocNode_ViewModel( this, "Overview", undefined,undefined, true, this.Default_ChildExtension ), 
		new TocNode_ViewModel( this, "Quick start", undefined,undefined, false,  new ExtensionChild_ViewModel( this, "Quick Start"  )),
		new TocNode_ViewModel( this, "Test Extension", undefined,undefined, false,  new Jackies_ExtensionChild_ViewModel( this, "Test Extensions" , "ko-ChildExtension-ME-PREVIEW-Template", [{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }])),  //parentViewModel, extName, templateName, cmdBtns
		new TocNode_ViewModel( this, "Search" ),
		new TocNode_ViewModel( this, "Support" ),
		new TocNode_ViewModel( this, "Documentation" ),
        new TocNode_ViewModel( this, "Live Metrics Stream" ),
		new TocNode_ViewModel( this, "Metrics Explorer" ),
		new TocNode_ViewModel( this, "Metrics Explorer (preview)", undefined, undefined, false, new ExtensionChild_ViewModel( this, "Metrics Explorer (preview2)", "ko-ChildExtension-ME-PREVIEW-Template", [
		{ Text: "Add", Image: "svg/Add.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Refresh", Image: "svg/Restart.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Delete", Image: "svg/Delete.svg", Action: this.OnClick_ShowCommandButtonContextBlade },
		{ Text: "Assign tags", Image: "svg/Tag.m.svg", Action: this.OnClick_ShowCommandButtonContextBlade }
		] ) ),
    ] );
    this.TocGroup_2 = ko.observableArray( [
        new TocNode_ViewModel( this, "Mobile apps" ),
        new TocNode_ViewModel( this, "eBooks" ),
        new TocNode_ViewModel( this, "Conditional access" ),
        new TocNode_ViewModel( this, "On-premise access" ),
        new TocNode_ViewModel( this, "Users" ),
        new TocNode_ViewModel( this, "Groups" ),
        new TocNode_ViewModel( this, "Intune roles" ),
        new TocNode_ViewModel( this, "Software updates"),
    ] );
    this.TocGroupCollection = ko.observableArray( [
        new TocGroup_ViewModel( "OVERVIEW", this.TocGroup_1(), false ),
        new TocGroup_ViewModel( "USAGE (PREVIEW)", this.TocGroup_2(), true ),
	] );
	this.BladeName( this.CurrentChildExtension().Title() );

    this.ResetTocNodeCollection = function (vm,ev)
    {   //  console.debug( "ClearTocNodeCollection" );
        this.TocGroupCollection().forEach( function ( v, i, a )
        {
            v.TocGroupNodes().forEach( function ( v2, i2, a2 )
            {   //  console.debug( v2.Title(), v2.IsSelected() );
                v2.IsSelected( false );
                return;
            } );
            return;
        } );
        //  console.debug(vm.Title(), vm.IsSelected());
        if ( vm.IsSelected() == false )
        {
			vm.IsSelected( true );
			//	console.debug( "vm.BladeViewModel()", vm.BladeViewModel() );
			if ( vm.BladeViewModel() !== undefined )
			{
				this.CurrentChildExtension( vm.BladeViewModel() );
			}
			else if ( vm.BladeViewModel() == undefined )
			{
				this.CurrentChildExtension(this.Default_ChildExtension);
			}
			this.BladeName( this.CurrentChildExtension().Title() );
        }
        //else if ( vm.IsSelected() == true )
        //{
        //    vm.IsSelected( false );
        //}
        return;
	};

	this._toc_chevron_open = "svg/collapse-left.svg";
	this._toc_chevron_close = "svg/collapse-right.svg";
	this.TocPanel_Chevron = ko.observable( this._toc_chevron_open );
	this.TocPanel_IsOpen = ko.observable( false );
	this.OnClick_OpenClose_TocPanel = function (vm,ev)
	{	//	console.debug( "this.OnClick_HideShow_TocPanel" );
		if ( this.TocPanel_IsOpen() == false )
		{
			this.TocPanel_IsOpen( true );
			this.TocPanel_Chevron( this._toc_chevron_close );
		}
		else if ( this.TocPanel_IsOpen() == true )
		{
			this.TocPanel_IsOpen( false );
			this.TocPanel_Chevron( this._toc_chevron_open );
		}
		return;
	};

	// event handlers

    // init & init_data
    this.Init_Data = function ()
	{	//	console.debug("this.Init_Data");
        return;
    };

	this.Init_Data();
    return;
};

function Jackies_ExtensionChild_ViewModel(parentViewModel, extName, templateName, cmdBtns) {

    ko.utils.extend(this, new ExtensionChild_ViewModel(parentViewModel, extName, templateName, cmdBtns));
    var _self = this;

    this.ExtensionName = ko.observable(extName);
    this.TemplateName = ko.observable(templateName || "ko-ChildExtension-Overview-Template");
    this.BladeIcon = ko.observable("svg/AuditingServer.svg");
    this.BladeName = ko.observable("Metrics");

    this.OnClick_HandleClick = function (vm, ev) {
        //	console.debug("ExtensionChild_ViewModel::this.OnClick_HandleClick");
        return;
    };

    let _cmd_btns = [];
    if (cmdBtns !== undefined) {
        cmdBtns.forEach(function (v, i, a) {	//	console.debug( i, v );
            let _tmp = new CommandBarButton(v);
            //	console.debug( i, _tmp );
            _cmd_btns.push(_tmp);
        });
    }

    this.CommandsBarButtons = ko.observableArray(_cmd_btns);

    // cals
    function Event(parent) {
        self = this;
        this.ID = Math.random();
        this.EventNameForMe = ko.observable("foo name") //appears on top of the red
        this.Title = ko.observable("Your virtual machine was unavailable due to host server maintenance");
        this.AlertStatus = ko.observable();
        this.AlertType = ko.observable("red");
        this.parent = ko.observable(parent);
        this.Bio = ko.observable("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
        this.TimeStart = ko.observable("4:00pm, Oct X 2018");
        this.TimeDuration = ko.observable("2h 10min");
        this.EventMargin = ko.observable();
        this.EventHeight = ko.observable("20px");
        this.ModalMargin = ko.observable("-40px 0 0 70px;");
        this.EventWidth = ko.observable();
        this.Left = ko.observable("");
        this.RedSingular = ko.observable(false);
        this.EventMargin = ko.observable();
        this.EventTop = ko.observable();
        this.ShowModal = ko.observable(false);
  
        this.Overlay = ko.observable(false);

        this.ShowModelIsOpen = ko.observable(false);
        this.ToggleShowModal = function (vm, ev) {
            //console.debug(vm, ev);
            //this.parent....
            //chain
            this.parent().onclick_HideModals(this.parent(), null, this);
            return;
        }
    }

    function DateColumn(parent) {
        self = this;
        this.EventDate = ko.observable("");
        this.DisplayDate = ko.observable("");
        this.IsPastToday = ko.observable(false);
        this.parent = ko.observable(parent);
        this._events = [];
        this.Events = ko.observableArray(this._events);

        this.onclick_HideModals = function (vm, ev, eventItem) {
            //console.debug(vm.parent().CalDates());

            vm.parent().CalDates().forEach(function (v, i, a) {
                //console.debug(i, v, v.Events().length);
                v.Events().forEach(function (v2, i2, a2) {
                    //console.debug(i, v2.ShowModal());
                    if (eventItem !== undefined) {
                        if (v2.ID !== eventItem.ID) {
                            v2.ShowModal(false);
                        }
                        else if (v2.ID == eventItem.ID) {
                            if (eventItem.ShowModal() == true) {
                                eventItem.ShowModal(false);
                            }
                            else if (eventItem.ShowModal() == false) {
                                eventItem.ShowModal(true);
                            }
                        }
                    }
                    else if (v2.ShowModal() == true) {
                        v2.ShowModal(false);
                    }

                    return;
                });
            });
            return;
        }
    }

    // temp vanilla JS array, for easier filtering
    this._date_snaps = [];
    this.CalDates = ko.observableArray([]);

    this.FixedHours = ko.observableArray([
        "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]);

    //PAGINATION
    this.currentPage = 0;
    this._default_page_size = 7;
    this.onclick_LeftChevron = function (vm, ev) {
        if (this.currentPage === 0) {
            //console.log();
            //KO observable for chevron styling
        }
        else {
            this.currentPage--;
        }
        let currentIndex = this.currentPage * this._default_page_size;
        let last7days = this._date_snaps.slice(currentIndex, currentIndex + this._default_page_size);
        this.CalDates(last7days);
        this.computed_WeekTitle();
    };

    this.onclick_RightChevron = function (vm, ev) {
        //console.log("currentPage before: ", this.currentPage);
        if (this.currentPage === 12) {
            //something
            //re work logic, backwards. 
        }

        else {
            this.currentPage++;
        }
       
        let currentIndex = this.currentPage * this._default_page_size;
        let last7days = this._date_snaps.slice(currentIndex, currentIndex + this._default_page_size);
        this.CalDates(last7days);
        this.computed_WeekTitle();
    };

    this.WeekTitle = ko.observable('weektitle');

    this.computed_WeekTitle = function () {
        //CalDates
        if (this.CalDates().length > 0) {
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            let month1 = this.CalDates()[0].EventDate().getMonth();
            let day1 = this.CalDates()[0].EventDate().getDate();
            
            let month7 = this.CalDates()[6].EventDate().getMonth();
            let day7 = this.CalDates()[6].EventDate().getDate();

            day1 = day1.toString();
            var monthName = month[month1];
            monthName = monthName.slice(0,3);
            var secondMonthName;

            if (month[month1] === month[month7]) {
                secondMonthName = "";
            }
            else {
                secondMonthName = month[month7];
                secondMonthName = secondMonthName.slice(0, 3);
            }
            
            var weekName = monthName + " " + day1 + " - " + day7 + " " + secondMonthName + ", 2018";
            this.WeekTitle(weekName);
        }
    };

    // init & init_data
    this.Init_Data = function ()
    {	//console.debug("this.Init_Data");
        // date data
        this.currentPage = 12;
        let _new_date = new Date(2018,9,11);

        let totalDays = 91;


        for ( let i = 0; i < totalDays; i++)
        {
            let _temp_day = (_new_date.getDate() - i) + (6 - _new_date.getDay());
            let _temp_date = new Date(_new_date.getFullYear(), _new_date.getMonth(), _temp_day);
            let _temp_snap = new DateColumn(this);
            _temp_snap.EventDate(_temp_date);
            this._date_snaps.push(_temp_snap);
		}
        
        //blue status event last page (most recent)
        let _foo_event = new Event(this._date_snaps[86]);

        _foo_event.EventNameForMe("_foo_event");
        _foo_event.AlertType("blue");
        _foo_event.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event.EventHeight("26px");
        _foo_event.EventWidth("105px");
        _foo_event.EventTop("121px");
        _foo_event.ModalMargin("-40px 0 0 70px");
        _foo_event.EventMargin("");
        _foo_event.AlertStatus(true);
        _foo_event.TimeStart("2:00am, Oct 9 2018 (2 d 22 h ago)");
        _foo_event.TimeDuration("1 min");

        //red status event last page 
        let _foo_event2 = new Event(this._date_snaps[85]);
        _foo_event2.EventNameForMe("_foo_event2");
        _foo_event2.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event2.EventHeight("6px");
        _foo_event2.EventWidth("105px");
        _foo_event2.EventTop("551px");
        _foo_event2.EventMargin("");
        _foo_event2.AlertStatus(true);
        _foo_event2.ModalMargin("-37px 0 0 120px");
        _foo_event2.TimeStart("9:00am, Oct 7 2018");
        _foo_event2.TimeDuration("30 min");

        //red status event last page 
        let _foo_event3 = new Event(this._date_snaps[3]);
        _foo_event3.EventNameForMe("_foo_event3");
        _foo_event3.EventHeight("20px");
        _foo_event3.EventWidth("105px");
        _foo_event3.EventMargin("");
        _foo_event2.ModalMargin("-30px 0 0 120px");
        _foo_event3.EventTop("150px");

        //red status event (1/2) last page 
        let _foo_event5 = new Event(this._date_snaps[85]);
        _foo_event5.EventNameForMe("_foo_event5");
        _foo_event5.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event5.EventHeight("126px");
        _foo_event5.EventWidth("47px");
        _foo_event5.EventMargin("");
        _foo_event5.EventTop("268px");
        _foo_event5.ModalMargin("-20px 0px 0px 65px"); 
        _foo_event5.AlertStatus(true);
        _foo_event5.TimeStart("7:30am, Oct 3 2018 (2 d 15 h ago)");
        _foo_event5.TimeDuration("4h 30 min");

        //red status event (1/2) last page 
        let _foo_event6 = new Event(this._date_snaps[85]);
        _foo_event6.EventNameForMe("_foo_event6");
        _foo_event6.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event6.EventHeight("29px");
        _foo_event6.EventWidth("58px");
        _foo_event6.EventTop("311px");
        _foo_event6.Left("213px");
        _foo_event6.AlertStatus(true);
        _foo_event6.EventMargin("0 0 0 47px");
        _foo_event6.TimeStart("9:00am, Oct 3 2018 (2 d 14 h ago)");
        _foo_event6.ModalMargin("-23px 0 0 120px");
        _foo_event6.TimeDuration("1h");
        _foo_event6.EventMargin("0px 0px 0px 47px"); //pushes event over to left /right 

        //red status event last page 
        let _foo_event7 = new Event(this._date_snaps[88]);
        _foo_event7.EventNameForMe("_foo_event7");
        _foo_event6.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event7.EventHeight("50px");
        _foo_event7.EventWidth("105px");
        _foo_event7.EventTop("200px");
        _foo_event7.ModalMargin("-20px 0 0 120px");
        _foo_event7.AlertStatus(true);
        _foo_event7.EventMargin("");
        _foo_event7.TimeStart("5:00am, Oct 11 2018 (5 h ago)");
        _foo_event7.TimeDuration("1h 45 min");

        //red status event last page 
        let _foo_event8 = new Event(this._date_snaps[88]);
        _foo_event8.EventNameForMe("_foo_event8");
        _foo_event8.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event8.EventHeight("130px");
        _foo_event8.EventWidth("105px");
        _foo_event8.EventTop("286px");
        _foo_event8.ModalMargin("-20px 0 0 120px");
        _foo_event8.EventMargin("");
        _foo_event8.AlertStatus(true);
        _foo_event8.TimeStart("8:00am, Oct 11 2018 (2 h ago)");
        _foo_event8.TimeDuration("4h 45 min");

        //blue status event last page 
        let _foo_event9 = new Event(this._date_snaps[88]);
        _foo_event9.EventNameForMe("_foo_event9");
        _foo_event9.AlertType("blue");
        _foo_event9.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event9.EventHeight("26px");
        _foo_event9.EventWidth("105px");
        _foo_event9.EventMargin("-3px 0 0 15px");
        _foo_event9.EventTop("470px");
        _foo_event9.ModalMargin("-39px 0px 0px 40px");
        _foo_event9.AlertStatus(true);
        _foo_event9.TimeStart("3:00pm, Oct 11 2018 (1 h ago)");
        _foo_event9.TimeDuration("1 min");


        //blue status event last page 
        let _foo_event10 = new Event(this._date_snaps[88]);
        _foo_event10.EventNameForMe("_foo_event10");
        _foo_event10.AlertType("blue");
        _foo_event10.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event10.EventHeight("26px");
        _foo_event10.EventWidth("105px");
        _foo_event10.EventTop("472px");
        _foo_event10.EventMargin("-3px 0 0 75px");
        _foo_event10.ModalMargin("-40px 0px 0px 99px");
        _foo_event10.AlertStatus(true);
        _foo_event10.TimeStart("3:01pm, Oct 11 2018 (1 h ago)");
        _foo_event10.TimeDuration("1 min");

        //blue status event last page 
        let _foo_event11 = new Event(this._date_snaps[88]);
        _foo_event11.EventNameForMe("_foo_event11");
        _foo_event11.AlertType("blue");
        _foo_event11.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event11.EventHeight("26px");
        _foo_event11.EventWidth("105px");
        _foo_event11.EventTop("472px");
        _foo_event11.EventMargin("");
        _foo_event11.ModalMargin("-41px 0px 0px 100px");
        _foo_event11.AlertStatus(true);
        _foo_event11.TimeStart("3:00pm, Oct 3 2018 (1 h ago)");
        _foo_event11.TimeDuration("1 min");

        //red status event last page red singualr
        let _foo_event12 = new Event(this._date_snaps[84]);
        _foo_event12.EventNameForMe("_foo_event12");
        _foo_event12.AlertType("red-square");
        _foo_event12.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event12.EventHeight("1px");
        _foo_event12.EventWidth("105px");
        _foo_event12.EventTop("472px");
        _foo_event12.ModalMargin("-40px 0px 0px 71px");
        _foo_event12.AlertStatus(true);
        _foo_event12.RedSingular(true);
        _foo_event12.AlertType("red");
        _foo_event12.EventMargin("-4px 0 0 45px");
        _foo_event12.TimeStart("3:00pm, Oct 7 2018 (5 d ago)");
        _foo_event12.TimeDuration("1 min");

        //blue status event second to last page 
        let _foo_event13 = new Event(this._date_snaps[78]);
        _foo_event13.EventNameForMe("_foo_event13");
        _foo_event13.AlertType("blue");
        _foo_event13.EventMargin("");
        _foo_event13.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event13.EventHeight("26px");
        _foo_event13.EventWidth("105px");
        _foo_event13.EventTop("121px");
        _foo_event13.ModalMargin("-40px 0 0 70px");
        _foo_event13.AlertStatus(true);
        _foo_event13.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event13.TimeDuration("7h 30 min");


        //blue status event second to last page 
        //let _foo_event14 = new Event(this._date_snaps[78]);
        //_foo_event14.EventNameForMe("_foo_event1");
        //_foo_event14.AlertType("blue");
        //_foo_event14.Title("Your virtual machine was paused for a memory preserving update");
        //_foo_event14.EventHeight("26px");
        //_foo_event14.EventWidth("105px");
        //_foo_event14.EventTop("201px");
        //_foo_event14.ModalMargin("");
        //_foo_event14.AlertStatus(true);
        //_foo_event14.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        //_foo_event14.TimeDuration("7h 30 min");


        //red status event  secondlast page 
        let _foo_event15 = new Event(this._date_snaps[82]);
        _foo_event15.EventNameForMe("_foo_event15");
        _foo_event15.AlertType("red-square");
        _foo_event15.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event15.EventHeight("50px");
        _foo_event15.EventMargin("");
        _foo_event15.EventWidth("105px");
        _foo_event15.AlertType("red");
        _foo_event15.EventTop("472px");
        _foo_event15.ModalMargin("-12px 0px 0px 119px");
        _foo_event15.AlertStatus(true);
        _foo_event15.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event15.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event16 = new Event(this._date_snaps[76]);
        _foo_event16.EventNameForMe("_foo_event16");
        _foo_event16.AlertType("red-square");
        _foo_event16.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event16.EventHeight("165px");
        _foo_event16.EventWidth("105px");
        _foo_event16.AlertType("red");
        _foo_event16.EventMargin("");
        _foo_event16.EventTop("178px");
        _foo_event16.ModalMargin("-5px 0px 0px 120px");
        _foo_event16.AlertStatus(true);
        _foo_event16.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event16.TimeDuration("7h 30 min");

        //blue event third to last page 
        let _foo_event17 = new Event(this._date_snaps[78]);
        _foo_event17.EventNameForMe("_foo_event17");
        _foo_event17.AlertType("blue");
        _foo_event17.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event17.EventHeight("26px");
        _foo_event17.EventWidth("105px");
        _foo_event17.EventMargin("-4px 0px 0px 45px");
        _foo_event17.EventTop("121px");
        _foo_event17.ModalMargin("-40px 0 0 70px");
        _foo_event17.AlertStatus(true);
        _foo_event17.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event17.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event18 = new Event(this._date_snaps[78]);
        _foo_event18.EventNameForMe("_foo_event18");
        _foo_event18.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event18.EventHeight("57px");
        _foo_event18.EventMargin("");
        _foo_event18.EventWidth("105px");
        _foo_event18.EventTop("472px");
        _foo_event18.ModalMargin("-10px 0px 0px 119px");
        _foo_event18.AlertStatus(true);
        _foo_event18.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event18.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event19 = new Event(this._date_snaps[78]);
        _foo_event19.EventNameForMe("_foo_event19");
        _foo_event19.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event19.EventHeight("10px");
        _foo_event19.EventWidth("105px");
        _foo_event19.EventMargin("");
        _foo_event19.EventTop("538px");
        _foo_event19.ModalMargin("-35px 0px 0px 120px");
        _foo_event19.AlertStatus(true);
        _foo_event19.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event19.TimeDuration("7h 30 min");

        //red status event third to last page red singular
        let _foo_event20= new Event(this._date_snaps[84]);
        _foo_event20.EventNameForMe("_foo_event20");
        _foo_event20.AlertType("red-square");
        _foo_event20.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event20.EventHeight("1px");
        _foo_event20.EventWidth("105px");
        _foo_event20.EventMargin("");
        _foo_event20.AlertType("red");
        _foo_event20.EventTop("200px");
        _foo_event20.ModalMargin("-41px 0px 0px 72px");
        _foo_event20.AlertStatus(true);
        _foo_event20.RedSingular(true);
        _foo_event20.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event20.TimeDuration("7h 30 min");

        //red status event third to last page red singular
        let _foo_event21 = new Event(this._date_snaps[84]);
        _foo_event21.EventNameForMe("_foo_event21");
        _foo_event21.AlertType("red-square");
        _foo_event21.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event21.EventHeight("1px");
        _foo_event21.EventWidth("105px");
        _foo_event21.AlertType("red");
        _foo_event21.EventMargin("");
        _foo_event21.EventTop("570px");
        _foo_event21.ModalMargin("-40px 0px 0px 71px");
        _foo_event21.AlertStatus(true);
        _foo_event21.RedSingular(true);
        _foo_event21.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event21.TimeDuration("7h 30 min");

        //blue event fourth to last page 
        let _foo_event22 = new Event(this._date_snaps[78]);
        _foo_event22.EventNameForMe("_foo_event22");
        _foo_event22.AlertType("blue");
        _foo_event22.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event22.EventHeight("26px");
        _foo_event22.EventWidth("105px");
        _foo_event22.EventTop("121px");
        _foo_event22.ModalMargin("-40px 0 0 70px");
        _foo_event22.AlertStatus(true);
        _foo_event22.EventMargin("-4px 0px 0px 45px");
        _foo_event22.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event22.TimeDuration("7h 30 min");

        //blue event fourth to last page 
        let _foo_event23 = new Event(this._date_snaps[78]);
        _foo_event23.EventNameForMe("_foo_event23");
        _foo_event23.AlertType("blue");
        _foo_event23.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event23.EventHeight("26px");
        _foo_event23.EventWidth("105px");
        _foo_event23.EventMargin("");
        _foo_event23.EventTop("151px");
        _foo_event23.ModalMargin("-40px 0 0 70px");
        _foo_event23.AlertStatus(true);
        _foo_event23.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event23.TimeDuration("7h 30 min");

        //red status event third to last page red singular
        let _foo_event24 = new Event(this._date_snaps[84]);
        _foo_event24.EventNameForMe("_foo_event24");
        _foo_event24.AlertType("red-square");
        _foo_event24.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event24.EventHeight("1px");
        _foo_event24.EventWidth("105px");
        _foo_event24.EventMargin("");
        _foo_event24.AlertType("red");
        _foo_event24.EventTop("570px");
        _foo_event24.ModalMargin("-41px 0px 0px 72px");
        _foo_event24.AlertStatus(true);
        _foo_event24.RedSingular(true);
        _foo_event24.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event24.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event25 = new Event(this._date_snaps[78]);
        _foo_event25.EventNameForMe("_foo_event25");
        _foo_event25.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event25.EventHeight("10px");
        _foo_event25.EventWidth("105px");
        _foo_event25.EventTop("538px");
        _foo_event25.EventMargin("-36px 0 0 120px");
        _foo_event25.ModalMargin("-36px 0 0 120px");
        _foo_event25.AlertStatus(true);
        _foo_event25.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event25.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event26 = new Event(this._date_snaps[78]);
        _foo_event26.EventNameForMe("_foo_event26");
        _foo_event26.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event26.EventHeight("250px");
        _foo_event26.EventWidth("105px");
        _foo_event26.EventTop("158px");
        _foo_event26.EventMargin("");
        _foo_event26.ModalMargin("-5px 0px 0px 119px");
        _foo_event26.AlertStatus(true);
        _foo_event26.TimeStart("9:00am, Oct 3 2018 (22 h ago)");
        _foo_event26.TimeDuration("7h 30 min");

        //red status event third to last page 
        let _foo_event27 = new Event(this._date_snaps[78]);
        _foo_event27.EventNameForMe("_foo_event27");
        _foo_event27.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event27.EventHeight("57px");
        _foo_event27.EventMargin("");
        _foo_event27.EventWidth("105px");
        _foo_event27.EventTop("472px");
        _foo_event27.ModalMargin("-10px 0px 0px 119px");
        _foo_event27.AlertStatus(true);
        _foo_event27.TimeStart("3:00pm, Jul 16 2018 (2 m 11 d ago)");
        _foo_event27.TimeDuration("2h 0 min");


        //blue status event second to last page 
        let _foo_event28 = new Event(this._date_snaps[78]);
        _foo_event28.EventNameForMe("_foo_event28");
        _foo_event28.AlertType("blue");
        _foo_event28.EventMargin("");
        _foo_event28.Title("Your virtual machine was paused for a memory preserving update");
        _foo_event28.EventHeight("26px");
        _foo_event28.EventWidth("105px");
        _foo_event28.EventTop("121px");
        _foo_event28.ModalMargin("-40px 0 0 70px");
        _foo_event28.AlertStatus(true);
        _foo_event28.TimeStart("2:00am,July 18 2018 (2 mon 19 d ago)");
        _foo_event28.TimeDuration("1 min");

        //red status event last page 
        let _foo_event29 = new Event(this._date_snaps[88]);
        _foo_event29.EventNameForMe("_foo_event29");
        _foo_event29.Title("Your virtual machine was unavailable due to host server maintenance");
        _foo_event29.EventHeight("50px");
        _foo_event29.EventWidth("105px");
        _foo_event29.EventTop("200px");
        _foo_event29.ModalMargin("-20px 0 0 120px");
        _foo_event29.AlertStatus(true);
        _foo_event29.EventMargin("");
        _foo_event29.TimeStart("5:00am, Jul 20 2018 (2 mon 17 d ago)");
        _foo_event29.TimeDuration("1h 45 min");
        
        this._date_snaps.sort(function (a, b) {
            return a.EventDate() - b.EventDate();
        });

        this._date_snaps.forEach(function (v, i, a) {
            //console.log("EventDate(): ", v.EventDate());
            //console.log("_new_date: ", _new_date);
            if (_new_date < v.EventDate()) {
                //console.log("EventDate " + v.EventDate());
                v.IsPastToday(true);
            }
            //console.log(v.EventDate(), v.IsPastToday());

        });


        this._date_snaps[1].Events([_foo_event27]);

        this._date_snaps[3].Events([_foo_event28]);

        this._date_snaps[5].Events([_foo_event29]);

        this._date_snaps[15].Events([_foo_event7]);

        this._date_snaps[17].Events([_foo_event13, _foo_event21]);

        this._date_snaps[20].Events([_foo_event, _foo_event2, _foo_event3]);

        this._date_snaps[25].Events([_foo_event22, _foo_event2]);

        this._date_snaps[30].Events([_foo_event20, _foo_event24]);

        this._date_snaps[37].Events([_foo_event18, _foo_event2]);

        this._date_snaps[40].Events([_foo_event8, _foo_event]);

        this._date_snaps[44].Events([_foo_event8, _foo_event13]);

        this._date_snaps[48].Events([_foo_event17]);

        this._date_snaps[50].Events([_foo_event16]);


        this._date_snaps[55].Events([_foo_event2]);

        this._date_snaps[60].Events([_foo_event15]);

        this._date_snaps[64].Events([_foo_event22, _foo_event23]);
        this._date_snaps[65].Events([_foo_event24]);
        this._date_snaps[67].Events([_foo_event26]);
        this._date_snaps[69].Events([_foo_event25]);

        this._date_snaps[73].Events([_foo_event21]);

        this._date_snaps[71].Events([_foo_event20]);

        this._date_snaps[72].Events([_foo_event18, _foo_event19]);

        this._date_snaps[75].Events([_foo_event17]);
        
        this._date_snaps[76].Events([_foo_event16]);

        this._date_snaps[78].Events([_foo_event13]);
    
        this._date_snaps[82].Events([_foo_event15]);

        this._date_snaps[84].Events([_foo_event2, _foo_event12]);

        this._date_snaps[85].Events([_foo_event5, _foo_event6]); //_foo_event4, 
        
        this._date_snaps[86].Events([_foo_event]);

        this._date_snaps[88].Events([_foo_event7, _foo_event8, _foo_event9, _foo_event10, _foo_event11]);


        let last7days = this._date_snaps.slice(this._date_snaps.length - 7, this._date_snaps.length);
        
        this.CalDates(last7days);
        this.computed_WeekTitle();
        return;
    };

    this.Init_Data();
    return;
};

function Jackies_ExtensionChild_ViewModelTest(parentViewModel, extName, templateName, cmdBtns) {

    ko.utils.extend(this, new ExtensionChild_ViewModel(parentViewModel, extName, templateName, cmdBtns));
    var _self = this;

    this.ExtensionName = ko.observable(extName);
    this.TemplateName = ko.observable(templateName || "ko-ChildExtension-Overview-Template");
    this.BladeIcon = ko.observable("svg/AuditingServer.svg");
    this.BladeName = ko.observable("Metrics");

    this.OnClick_HandleClick = function (vm, ev) {
        //	console.debug("ExtensionChild_ViewModel::this.OnClick_HandleClick");
        return;
    };

    let _cmd_btns = [];
    if (cmdBtns !== undefined) {
        cmdBtns.forEach(function (v, i, a) {	//	console.debug( i, v );
            let _tmp = new CommandBarButton(v);
            //	console.debug( i, _tmp );
            _cmd_btns.push(_tmp);
        });
    }

    this.CommandsBarButtons = ko.observableArray(_cmd_btns);

    // init & init_data
    this.Init_Data = function () {	//	console.debug("this.Init_Data");
        return;
    };

    //	this.Init_Data();
    return;
};


