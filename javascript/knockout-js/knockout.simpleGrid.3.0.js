(function () {
    // Private function
	function getColumnsForScaffolding( data )
	{
		if ( ( typeof data.length !== 'number' ) || data.length === 0 )
		{
            return [];
        }
        var columns = [];
        for ( var propertyName in data[0] )
        {
            columns.push({ headerText: propertyName, rowText: propertyName });
        }
        return columns;
    }

	// Defines a view model class you can use to populate a grid
	ko.simpleGrid =
	{
		viewModel: function ( configuration )
		{
            this.data = configuration.data;
            this.currentPageIndex = ko.observable(0);
            this.pageSize = configuration.pageSize || 5;

            // If you don't specify columns configuration, we'll use scaffolding
            this.columns = configuration.columns || getColumnsForScaffolding(ko.unwrap(this.data));

            this.itemsOnCurrentPage = ko.computed( function ()
            {
            	var startIndex = this.pageSize * this.currentPageIndex();
            	var _ret_val = ko.unwrap( this.data ).slice( startIndex, startIndex + this.pageSize );
				// returns an array of objects
            	return _ret_val ; //ko.unwrap(this.data).slice(startIndex, startIndex + this.pageSize);
            }, this);

            this.maxPageIndex = ko.computed( function ()
            {
                return Math.ceil(ko.unwrap(this.data).length / this.pageSize) - 1;
            }, this);
        }
    };

    // Templates used to render the grid
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function ( templateName, templateMarkup )
    {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

	templateEngine.addTemplate("ko_simpleGrid_grid", "<div class=\"ko-grid\" cellspacing=\"0\"><div data-bind=\"template: { name: 'ko_simpleGrid_row_item', foreach: itemsOnCurrentPage }\"></div></div>" );

	templateEngine.addTemplate( "ko_simpleGrid_row_item", "\
                    <div class=\"ko-grid-row\">\
						<div class=\"ko-grid-row-div-img\">\
							<img class=\"ko-grid-row-div-img-url\" data-bind=\"attr: {src: images[0].url } \">\
							<div class=\"ko-grid-row-div-img-text\" data-bind=\"html: used == true ? 'NEW' : 'USED' \"></div>\
						</div>\
						<div class=\"ko-grid-row-div-text\">\
							<div class=\"ko-grid-row-div-text-title-larger\"><span data-bind=\"html: brand \"></span> <span data-bind=\"html: model \"></span></div>\
							<div class=\"ko-grid-row-div-text-title-name\"><span data-bind=\"html: fullname \"></span></div>\
							<div class=\"ko-grid-row-div-text-title\">Serial Number: <span data-bind=\"html: sn \"></span></div>\
							<div class=\"ko-grid-row-div-text-title\">Color: <span data-bind=\"html: color \"></span></div>\
							<div class=\"ko-grid-row-div-text-title\">Specs: <span data-bind=\"html: specs \"></span></div>\
							<div class=\"ko-grid-row-div-text-title\">Price: </span>$<span data-bind=\"html: price\"></span></div>\
						</div>\
                    </div>");

	templateEngine.addTemplate( "ko_simpleGrid_pageLinks", "\
                    <div class=\"ko-grid-pageLinks\">\
                        <span>Page:</span>\
                        <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                               <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                            </a>\
                        <!-- /ko -->\
                    </div>");

	// Previous <table> layout didn't respond well to the layout UX we needed.
    //templateEngine.addTemplate("ko_simpleGrid_grid", "\
    //                <table class=\"ko-grid\" cellspacing=\"0\">\
    //                    <thead>\
    //                        <tr data-bind=\"foreach: columns\">\
    //                           <th data-bind=\"text: headerText\"></th>\
    //                        </tr>\
    //                    </thead>\
    //                    <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
    //                       <tr data-bind=\"foreach: $parent.columns\">\
	//							<td>\
	//							<span data-bind=\"html: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \" ></span>\
	//							</td>\
    //                        </tr>\
    //                    </tbody>\
    //                </table>" );


    // The "simpleGrid" binding
    ko.bindingHandlers.simpleGrid = {
    	init: function ()
    	{
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function ( element, viewModelAccessor, allBindings )
        {
            var viewModel = viewModelAccessor();
            // Empty the element
            while(element.firstChild) ko.removeNode(element.firstChild);

            // Allow the default templates to be overridden
            var gridTemplateName = allBindings.get( 'simpleGridTemplate' ) || "ko_simpleGrid_grid";
			var pageLinksTemplateName = allBindings.get('simpleGridPagerTemplate') || "ko_simpleGrid_pageLinks";

        	// Render the page links 1
            var pageLinksContainer1 = element.appendChild( document.createElement( "DIV" ) );
            ko.renderTemplate( pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer1, "replaceNode" );

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links 2
            var pageLinksContainer2 = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer2, "replaceNode");
        }
    };
})();