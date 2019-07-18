function item_view_model( parent, title, icon, type, keywordArray, description )
{	//	item view model - name, icon, type
    this.title = ko.observable(title || 'Test Name');
	this.icon = ko.observable( icon || '#FxSymbol0-015-AllResources' );
	this.type = ko.observable( type || 'default type' );
	this.keywords = ko.observableArray( keywordArray || [] );
	this.description = ko.observable( description || "generic bio" );
	this.tabbedIndex = ko.observable();
    this.parent = parent;
};

function category_view_model(parent, category_name, data) {
    this.slow = ko.observable(false);
    this.parent = parent;
    this.category_name = ko.observable(category_name || "default cat name"); 
    this.data = ko.observableArray(data || []); //what is actually shown
    this.data_temp = ko.observableArray(data || []); //what is cached
    this.loaderAnimation = ko.observable(false);
    this.noResults = ko.observable(false);
    this.computed_results = ko.computed(function () {
		if ( this.data().length === 0 )
		{	//	console.log();
			return "";
        }
        //else if (this.data().length == 6) {
        //    // console.log("10 10 10");
        //    return "Show 25 results";
        //}
        else if (this.data().length === 1 || this.data().length === 2 || this.data().length === 3 ) {
            return "1 ";
        }
        //else if (this.data().length === 2) {
        //    return "2";
        //}
        //else { 
        //    return "All " + this.data().length + " results";
        //}
        else {
            return "See more"; //if more than newvalue, x ln 217 prototype.js
        }
        
    }, this);

    //new function that
    this.filtering = function (m, count) {
        //do filtering
        //check to see if _rv is less than

        let _rv = this.data_temp().filter(function (item)
        {
            //console.debug(item, item.title());
            //if (item.title().toLowerCase().includes(strValue().toLowerCase()) == true) {
            //    _found = true;
            //}

            return item.title().toLowerCase().includes(m.toLowerCase()) === true; /* || item.keywords().toLowerCase().includes(m.toLowerCase()) === true;*/
        });
        
		if ( _rv.length < count )
		{
            //console.log("_rv.length: ", _rv.length);
            this.data(_rv); 
        }
        else {
            //console.debug("trim array");
            let _temp_rv = [];

            for (let i = 0; i < count; i++)
            {
                _temp_rv.push(_rv[i]);
            }
            this.data(_temp_rv); 
        }
        return;
    };

    //function that does the filtering: 
    //will return and populate data
    //if no match.... no results
};

// NEW GLOBAL SEARCH
function GlobalSearch_ViewModel(parent)
{
	const _self = this;

	this.searchPanelVisible = ko.observable( false );
	this.showSearchResults = ko.observable( false );
	this.showSearchPlaceHolder = ko.observable( false );
	this.showNoResults = ko.observable( false );

    // RESOURCES search panel
    this.resourceItems = []; //this array is the data 
    this.resourceCategoryViewModel = new category_view_model(this, "Resources");

	var titleArray = [" Test SQL app", "Production SQL server", "Staging SQL DB", "Team SQL DB", "Master sql", "SQL servers", "Elastic Job Agents", "HDInsights clusters", "Managed SQL dataabases", "Virtual machines",];

	var keywordsArray = ["SQL server", "SQL database", "SQL database", "Analysis Services", "Virtual Network", "Application Insights", "SQL", "Data Lake Sotrage Gen1 SQL", "Log Analytics", "SQL data warehouse"];

	//var svgArray = [
	//	"#FxSymbol0-019-SQL",
	//	"#FxSymbol0-016-App-Services",
	//	"#FxSymbol0-018-VirtualMachines",
	//	"#FxSymbol0-019-SQL",
	//	"#FxSymbol0-016-App-Services",
	//	"#FxSymbol0-018-VirtualMachines",
	//	"#FxSymbol0-018-VirtualMachines",
	//	"#FxSymbol0-019-SQL",
	//	"#FxSymbol0-016-App-Services",
	//	"#FxSymbol0-018-VirtualMachines"
	//];
	var svgArray = [
		SVG.Color.Database_color.SVG,
		SVG.Color.AppService_color.SVG,
		SVG.Color.VirtualMachines.SVG,
		SVG.Color.Database_color.SVG,
		SVG.Color.AppService_color.SVG,
		SVG.Color.VirtualMachines.SVG,
		SVG.Color.VirtualMachines.SVG,
		SVG.Color.Database_color.SVG,
		SVG.Color.AppService_color.SVG,
		SVG.Color.VirtualMachines.SVG,
	];

	for ( let i = 0; i < 10; i++ )
	{
        let temp = new item_view_model();
        //let x = Math.floor(Math.random() * 7) + 1;
        temp.title(titleArray[i]);
        temp.icon(svgArray[i]);
        temp.keywords(keywordsArray[i]);
        this.resourceItems.push(temp);
    }
   // this.resourceCategoryViewModel.data(this.resourceItems);
    this.resourceCategoryViewModel.data_temp(this.resourceItems);
    //console.debug("this.resourceCategoryViewModel", this.resourceCategoryViewModel);

    // RESOURCE GROUP search panel 
    this.resourceGroupItems = []; //this array is the data 
	this.resourceGroupCategoryViewModel = new category_view_model( this, "Resource Group" );

    for (let i = 0; i < 7; i++) {
        let temp = new item_view_model();
        var titleArray = ["SQL group 1", "SQL group 2", "SQL group 3", "SQL group 4", "SQL group 5", "SQL group 6", "SQL group 7"];
        //var svgArray = ["FxSymbol0-017-ResourceGroups"];
        //let x = Math.floor(Math.random() * 3) + 1;
        temp.title(titleArray[i]);
		// temp.icon("#FxSymbol0-017-ResourceGroups");
		temp.icon( SVG.Color.ResourceGroup.SVG );
        this.resourceGroupItems.push(temp);
    }
    this.resourceGroupCategoryViewModel.data_temp(this.resourceGroupItems);
    //console.debug("this.resourceGroupCategoryViewModel", this.resourceGroupCategoryViewModel);

    // SERVICES search panel 
    this.servicesGroupItems = []; //this array is the data 

    var titleArray2 = ["SQL data warehouses", "SQL databases", "SQL elastic pools", "SQL managed instances", "SQL Server stretch databases", "SQL servers", "Elastic Job Agents", "HDInsights clusters", "Managed dataabases SQL", "Azure Database for MySQL servers"];
    //var svgArray2 = ["#FxSymbol0-019-SQL", "#FxSymbol0-016-App-Services", "#FxSymbol0-018-VirtualMachines", "#FxSymbol0-019-SQL", "#FxSymbol0-016-App-Services", "#FxSymbol0-018-VirtualMachines", "#FxSymbol0-018-VirtualMachines", "#FxSymbol0-019-SQL", "#FxSymbol0-016-App-Services", "#FxSymbol0-018-VirtualMachines"];
    var keywordsArray2 = ["", "", "", "", "", "", "Keywords: SQL", "Keywords: SQL", "Keywords: SQL", "Keywords: SQL"];

	this.servicesCategoryViewModel = new category_view_model( this, "Services" );

	for ( let i = 0; i < 10; i++ )
	{
        let temp = new item_view_model();
        //let x = Math.floor(Math.random() * 3) + 1;
        temp.title(titleArray2[i]);
        temp.icon(svgArray[i]);
        temp.keywords(keywordsArray2[i]);
        this.servicesGroupItems.push(temp);
    }
    //this.servicesCategoryViewModel.data(this.servicesGroupItems);
    this.servicesCategoryViewModel.data_temp(this.servicesGroupItems);
    //console.debug("this.servicesCategoryViewModel", this.servicesCategoryViewModel);

    // MARKETPLACE search panel 
    this.marketplaceGroupItems = []; //this array is the data 
	this.marketplaceCategoryViewModel = new category_view_model( this, "Marketplace" );

    var titleArray = ["Web app + SQL", "SQL server 2016 SP1 Enterprise on Windows Server 2016", "SQL stream Blaze 5.2.4.1", "SQL Server 2012 Sp4 Standard on Windows Server 2012 R2"];
	//var svgArray = ["#FxSymbol0-019-SQL", "#FxSymbol0-018-VirtualMachines", "#FxSymbol0-016-App-Services", "#FxSymbol0-019-SQL"];

	for ( let i = 0; i < 4; i++ )
	{

        let temp = new item_view_model();
        //let x = Math.floor(Math.random() * 3) + 1;
        temp.title(titleArray[i]);
        temp.icon(svgArray[i])      
        this.marketplaceGroupItems.push(temp);
    }

	//this.marketplaceCategoryViewModel.data(this.marketplaceGroupItems);
    this.marketplaceCategoryViewModel.data_temp(this.marketplaceGroupItems);
    //	console.debug("this.marketplaceCategoryViewModel", this.marketplaceCategoryViewModel);

    // DOCUMENTATION search panel 
    this.documentationGroupItems = []; //this array is the data 
    this.documentationCategoryViewModel = new category_view_model(this, "Documentation");
    var titleArray3 = ["SQL transformation", "Servers - Sql", "SQL Beacon", "SQL transformation" ];
    var keywordsArray3 = ["this simple example shows how SQL transformation helps the user transform...", "Determines whether a resource can be created with the windows server 2012 R2...", "Introducing SQL Beacon. SQL Beacon monitors SQL Server activities in an effective...", "this simple example shows how SQL transformation helps the user transform..."];

	for ( let i = 0; i < 4; i++ )
	{
        let temp = new item_view_model();
        //let x = Math.floor(Math.random() * 3) + 1;
        temp.title(titleArray3[i]);
        temp.keywords(keywordsArray3[i]);
        this.documentationGroupItems.push(temp);
    }
    //this.documentationCategoryViewModel.data(this.documentationGroupItems);
    this.documentationCategoryViewModel.data_temp(this.documentationGroupItems);
    //console.debug("this.documentationCategoryViewModel", this.documentationCategoryViewModel);

    this.searchQuadrantsLeft = ko.observableArray([
        this.servicesCategoryViewModel,
        this.resourceCategoryViewModel
    ]);

    this.searchQuadrantsRight = ko.observableArray([
        this.marketplaceCategoryViewModel,
        this.documentationCategoryViewModel,
        this.resourceGroupCategoryViewModel
    ]);



    this.onclick_toggleSearchResults = function (vm, ev) {	//	console.debug( "this.OnClick_CloseContextBlade");
        if (_self.showSearchResults() === false) {
            //_self.showSearchResults(true);
            _self.showSearchPlaceHolder(true);
        }
        else if (_self.showSearchResults() === true) {
            //_self.showSearchResults(false);
            _self.showSearchPlaceHolder(false);
        }
        return;
    };

    this.SearchBoxValue = ko.observable("");
    this.SearchBoxValue.subscribe(function (newValue)
    {	//	console.debug("this.SearchBoxValue.subscribe", newValue);
		if ( newValue.length === 0 )
		{
            console.log("NewValue undefined");
            _self.showSearchPlaceHolder(true);
            _self.showSearchResults(false);
        }
		else
		{
            _self.showSearchResults(true);
            _self.showSearchPlaceHolder(false);

            _self.servicesCategoryViewModel.filtering(newValue, 7);
            _self.marketplaceCategoryViewModel.filtering(newValue, 5);
            _self.documentationCategoryViewModel.filtering(newValue, 5);

            _self.resourceGroupCategoryViewModel.loaderAnimation(true);
            _self.resourceCategoryViewModel.loaderAnimation(true);  

            //console.debug("_self._query_timer", _self._query_timer);

			window.setTimeout( function ()
			{
                _self.resourceCategoryViewModel.filtering(newValue, 10);
                _self.resourceGroupCategoryViewModel.filtering(newValue, 7);

                _self.resourceCategoryViewModel.loaderAnimation(false);
                _self.resourceGroupCategoryViewModel.loaderAnimation(false);
                return;
             }, 2000);          
        }
        return;
    }, this);
	return;
}
