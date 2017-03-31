/// <reference path="knockout-3.4.2.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.ERROR = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    this.DataArray = ko.observableArray( [
        new ChildViewModel( "Sean", 49, 3 ),
        new ChildViewModel( "Kim", 51, 2 ),
        new ChildViewModel( "Gerry", 47, 6 ),
        new ChildViewModel( "Zach", 15, 0 ),
        new ChildViewModel( "Carl", 46, 1 ),
        new ChildViewModel( "Octo-Mom", 37, 8 ),
        new ChildViewModel( "Bob", 49, 4 ),
    ] );

    this.SortType = { ASC: "asc", DESC: "DESC" };
    this.CurrentNameSort = ko.observable( this.SortType.ASC );

    this.SortByName = function ( vm, ev )
    {
        console.debug( "1. SortByName.this.CurrentNameSort", this.CurrentNameSort() );
        this.SortThisArray( this.DataArray(), "Name", this.CurrentNameSort() );

        if ( this.CurrentNameSort() == this.SortType.ASC )
        {
            this.CurrentNameSort( this.SortType.DESC );
        }
        else if ( this.CurrentNameSort() == this.SortType.DESC )
        {
            this.CurrentNameSort( this.SortType.ASC );
        }
        console.debug( "2. SortByName.this.CurrentNameSort", this.CurrentNameSort() );
        return;
    };


    // try to handle all sorting, good luck.
    this.SortThisArray = function(array, key, direction)
    {
        array.sort( function ( a, b )
        {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            //  sort string ascending
            if ( nameA < nameB )
                return -1;
            //  sort string descending    
            if ( nameA > nameB )
                return 1;
            //  default return value (no sorting)
            return 0;
        } );
        return;
    };

    return;
};

function ChildViewModel( name, age, kids )
{
    var _self = this;
    this.ID = ko.pureComputed( function ()
    { return "c-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );

    this.Name = ko.observable( name );
    this.Age = ko.observable( age );

    this.BornDate = ko.observable();
    this.GetBornDate = ko.pureComputed( function ()
    {
        var _current_year = (new Date().getFullYear() - age);
        //  console.debug( "_current_year", _current_year );
        this.BornDate( _current_year );
        return;
    }, this );
    this.GetBornDate();

    this.DiedDate = ko.observable();
    this.GetDiedDate = ko.pureComputed( function ()
    {
        var _current_year = Math.round(new Date().getFullYear() + Math.random() * 30);
        //console.debug( "_current_year", _current_year );
        this.DiedDate( _current_year );
        return;
    }, this );
    this.GetDiedDate();

    this.Children = ko.observable( kids );
    return;
};