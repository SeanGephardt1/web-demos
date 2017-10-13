$(function ()
{
	try
	{
		console.clear();
		console.info( "BEGIN" );
		App.Init();
	}
	catch ( err )
	{
		console.error( "ERROR", new Date().toUTCString() );
		console.error( err.number, err.name, err.message, err.stack );
	}
	finally
	{
		console.info( "END" );
	}
	return;
});

var App =
{
	Constants:
	{
		_BeginNote:"Sample 5 Begin",
		_EndNote: "Sample 5 End",
		_PageTitle: "HTML5 div & CSS3 columns",
		_Columns: 8,
		_Rows:8,
	},	
	Init: function ()
	{	
		console.log( this.Constants._BeginNote );

		this.DoGridLayout();
		this.AssignBoardTiles();

		console.log( this.Constants._EndNote );
		return;
	},
	Tiles: 
	 [
		{ class: "grid_item", id: "gi1", c: 1, r: 1, h: 1, w: 1, text: "Tile 1" },
		{ class: "grid_item", id: "gi2", c: 2, r: 1, h: 2, w: 1, text: "Tile 2" },
		{ class: "grid_item", id: "gi3", c: 3, r: 1, h: 2, w: 2, text: "Tile 3" },
		{ class: "grid_item", id: "gi4", c: 5, r: 1, h: 2, w: 4, text: "Tile 4" },
		{ class: "grid_item", id: "gi5", c: 1, r: 2, h: 1, w: 1, text: "Tile 5" },
		{ class: "grid_item", id: "gi6", c: 1, r: 3, h: 1, w: 1, text: "Tile 6" },

	 ],
	DoGridLayout: function()
	{	//	Do the grid layout based on config values
		for ( var c = 1; c < App.Constants._Columns + 1; c++ )
		{
			for ( var r = 1; r < App.Constants._Rows + 1; r++ )
			{	//	console.log( "column=", c, "row=", r, "-ms-grid-column:", c, "-ms-grid-row:", r );
				var gi_style = "-ms-grid-column:" + c + ";-ms-grid-row:" + r;
				var div_grid_item = $( "<div/>" )
					.attr( "row", r )
					.attr( "column", c )
					.attr( "style", gi_style )
					.attr( "data-tiled", "false" )
					.attr( "data-tile-id", "" )
					.attr( "class", "div_grid_item" )
					.attr( "ondrop", "App.Tile_Drop(event,this);" )
					.attr( "ondragover", "App.CurrentGridCell(this);" );
				$( "#Grid" ).append( div_grid_item );
			}
		}
		return;
	},
	AssignBoardTiles: function ()
	{
		for ( var x = 0; x < this.Tiles.length; x++ )
		{
			var gi_style = "-ms-grid-column:" + this.Tiles[x].c + ";-ms-grid-row:" + this.Tiles[x].r + ";-ms-grid-column-span:" + this.Tiles[x].w + ";-ms-grid-row-span:" + this.Tiles[x].h;
			console.log( this.Tiles[x].text, "gi_style", gi_style );
			var div_grid_item = $( "<div/>" )
				.attr( "style", gi_style )
				.attr( "id", this.Tiles[x].id )
				.attr( "class", this.Tiles[x].class )
				.attr( "ondragstart", "App.Tile_OnDragStart(event,this);" )
				.attr( "draggable", "true" )
				.text( this.Tiles[x].text );

			//	console.log( "div_grid_item", $(div_grid_item).html());
			$( "#Grid" ).append( div_grid_item );
		}
		return;
	},

	ActiveElement:
		{
			id: "",
			column: 0,
			row: 0,
			height: 0,
			width: 0,
			currentColumn: 0,
			currentRow: 0,
			Init: function ()
			{
				this.id = "";
				this.column = 0;
				this.row = 0;
				this.height = 0;
				this.width = 0;
				this.currentColumn = 0;
				this.currentRow = 0;
			}
		},
	CurrentGridCell: function(cell)
	{	//	console.log( "cell", cell.getAttribute( "column" ), cell.getAttribute( "row" ) );
		this.ActiveElement.currentColumn = cell.getAttribute( "column" );
		this.ActiveElement.currentRow= cell.getAttribute( "row" );
		return;
	},
	Tile_OnDragStart: function ( e, o )
	{	//	console.log( "Grid_Item_OnDragStart:: ", o.id );
		this.ActiveElement.id = o.id;
		this.ActiveElement.column = $( o ).css( "-ms-grid-column" );
		this.ActiveElement.row = $( o ).css( "-ms-grid-row" );
		this.ActiveElement.height = $( o ).css( "-ms-grid-column-span" );
		this.ActiveElement.width = $( o ).css( "-ms-grid-row-span" );
		//	console.log("Grid_Item_OnDragStart::",this.ActiveElement );
		return;
	},
	Tile_Allow_Drop: function ( e, o )
	{
		e.preventDefault();
		return;
	},
	Tile_Drop: function ( e, o )
	{
		//	console.log( "this.ActiveElement.id ", this.ActiveElement.id );
	
		var gi_style = "-ms-grid-column:" + this.ActiveElement.currentColumn + ";-ms-grid-row:" + this.ActiveElement.currentRow + ";-ms-grid-column-span:" + this.ActiveElement.height + ";-ms-grid-row-span:" + this.ActiveElement.width;
		//	console.log( "gi_style::", gi_style );
		$( "#"+ this.ActiveElement.id ).attr( "style", gi_style );

		this.Tiles.forEach( function (obj)
		{	//console.log( "id", obj.id ); //console.log( "id", App.ActiveElement.id);
			//	console.log("before", obj.c,",",obj.r);
			if ( obj.id == App.ActiveElement.id)
			{
				//	console.log( "ID MATCH", obj.id, App.ActiveElement.id );
				App.ActiveElement.column = App.ActiveElement.currentColumn;
				App.ActiveElement.row= App.ActiveElement.currentRow;
				obj.c = App.ActiveElement.column;
				obj.r = App.ActiveElement.row;
			}
			//	console.log("after",obj.c, ",", obj.r );
		});

		this.ActiveElement.Init();
		return;
	},
};