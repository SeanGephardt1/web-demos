/// <reference path="knockout-3.4.2.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
ko.observableArray.fn.sortByProperty = function ( prop )
{
    this.sort( function ( obj1, obj2 )
    {
        if ( obj1[prop] == obj2[prop] )
            return 0;
        else if ( obj1[prop] < obj2[prop] )
            return -1;
        else
            return 1;
    } );
}

function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.ERROR = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    this.DataArray = ko.observableArray( [
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
    ] );

    this.SortType = { ASC: "asc", DESC: "desc" };
    this.CurrentNameSort = ko.observable( this.SortType.ASC );
    this.Click_SortByName = function ( vm, ev )
    {   //  console.debug( "1. SortByName.this.CurrentNameSort", this.CurrentNameSort() );
        this.SortThisArray( "Name", this.CurrentNameSort() );

        if ( this.CurrentNameSort() == this.SortType.ASC )
        {
            this.CurrentNameSort( this.SortType.DESC );
        }
        else if ( this.CurrentNameSort() == this.SortType.DESC )
        {
            this.CurrentNameSort( this.SortType.ASC );
        }   //  console.debug( "2. SortByName.this.CurrentNameSort", this.CurrentNameSort() );
        return;
    };

    this.CurrentAgeSort = ko.observable( this.SortType.ASC );
    this.Click_SortByAge = function ( vm, ev )
    {   //  console.debug( "1. Click_SortByAge.this.CurrentAgeSort", this.CurrentAgeSort() );
        this.SortThisArray( "Age", this.CurrentAgeSort() );

        if ( this.CurrentAgeSort() == this.SortType.ASC )
        {
            this.CurrentAgeSort( this.SortType.DESC );
        }
        else if ( this.CurrentAgeSort() == this.SortType.DESC )
        {
            this.CurrentAgeSort( this.SortType.ASC );
        }   //  console.debug( "2. Click_SortByAge.this.CurrentAgeSort", this.CurrentAgeSort() );
        return;
    };

    this.CurrentBornSort = ko.observable( this.SortType.ASC );
    this.Click_SortByBorn = function ( vm, ev )
    {   //  console.debug( "1. Click_SortByBorn.this.CurrentBornSort", this.CurrentBornSort() );
        this.SortThisArray( "BornDate", this.CurrentBornSort() );

        if ( this.CurrentBornSort() == this.SortType.ASC )
        {
            this.CurrentBornSort( this.SortType.DESC );
        }
        else if ( this.CurrentBornSort() == this.SortType.DESC )
        {
            this.CurrentBornSort( this.SortType.ASC );
        }   //  console.debug( "2. Click_SortByBorn.this.CurrentBornSort", this.CurrentBornSort() );
        return;
    };

    this.CurrentDiedSort = ko.observable( this.SortType.ASC );
    this.Click_SortByDied = function ( vm, ev )
    {   //  console.debug( "1. Click_SortByDied.this.CurrentDiedSort", this.CurrentDiedSort() );
        this.SortThisArray( "DiedDate", this.CurrentDiedSort() );

        if ( this.CurrentDiedSort() == this.SortType.ASC )
        {
            this.CurrentDiedSort( this.SortType.DESC );
        }
        else if ( this.CurrentDiedSort() == this.SortType.DESC )
        {
            this.CurrentDiedSort( this.SortType.ASC );
        }   //  console.debug( "2. Click_SortByDied.this.CurrentDiedSort", this.CurrentDiedSort() );
        return;
    };

    this.CurrentChildrenSort = ko.observable( this.SortType.ASC );
    this.Click_SortByChildren = function ( vm, ev )
    {   //  console.debug( "1. Click_SortByChildren.this.CurrentChildrenSort", this.CurrentChildrenSort() );
        this.SortThisArray( "Children", this.CurrentChildrenSort() );

        if ( this.CurrentChildrenSort() == this.SortType.ASC )
        {
            this.CurrentChildrenSort( this.SortType.DESC );
        }
        else if ( this.CurrentChildrenSort() == this.SortType.DESC )
        {
            this.CurrentChildrenSort( this.SortType.ASC );
        }   //  console.debug( "2. Click_SortByChildren.this.CurrentChildrenSort", this.CurrentChildrenSort() );
        return;
    };


    //  try to handle all sorting, good luck.
    //  this works only for observable properties on a viewmodel
    //  this.DataArray().sort( function ( left, right )
    //  { return left.Name == right.Name ? 0 : ( left.Name < right.Name ? -1 : 1 ) } );
    //  sort string ascending
    //  if ( key_a < key_b ) return -1;
    //  sort string descending    
    //  if ( key_a > key_b ) return 1;
    //  return 0;        //  default return value (no sorting)
    this.SortThisArray = function(key, dir)
    {   //  console.debug( "SortThisArray", key, dir );
        this.DataArray().sort( function ( a, b )
        {   
            var key_a = a[key]();
            var key_b = b[key]();

            switch ( dir )
            {
                case _self.SortType.ASC:
                    {   //  sort string ascending
                        if ( key_a < key_b ) return -1;
                        //  sort string descending    
                        if ( key_a > key_b ) return 1;
                        //  default return value (no sorting)
                        return 0;
                    }
                case _self.SortType.DESC:
                    {   //  sort string ascending
                        if ( key_a < key_b ) return 1;
                        //  sort string descending    
                        if ( key_a > key_b ) return -1;
                        //  default return value (no sorting)
                        return 0;
                    }
            };
        } );
        //  console.debug( "this.DataArray()", this.DataArray() );
        this.DataArray( this.DataArray() );
        return;
    };
    // end of viewmodel
    return;
};


function ChildViewModel()
{
    var _self = this;
    this.ID = ko.pureComputed( function ()
    { return "c-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );

    this.Name = ko.observable();
    this.GetName = ko.pureComputed( function ()
    {
        var _names = ["John", "Kim", "Mary", "Jennifer", "James", "Sean", "Zach", "Robert", "Carl", "Gibson", "Jimmy", "Scott", "Kathy"];
        var _index = Math.round( Math.random() * _names.length - 1 );

        if ( _index < 0 )
        {
            _index = Math.round( _names.length / 3 );
        }
        //  console.debug( _names.length, _index );
        this.Name( _names[_index] );
        return;
    }, this );
    this.GetName();

    this.Age = ko.observable();
    this.GetAge = ko.pureComputed( function ()
    {
        var _age = Math.round(Math.random() * 100);
        this.Age( _age );
        return;
    }, this );
    this.GetAge();

    this.BornDate = ko.observable();
    this.GetBornDate = ko.pureComputed( function ()
    {
        var _current_year = (new Date().getFullYear() - this.Age());
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

    this.Children = ko.observable( );
    this.GetChildren = ko.pureComputed( function ()
    {
        this.Children( Math.round( Math.random() * 10 ) );
        return;
    }, this );
    this.GetChildren();
    return;
};