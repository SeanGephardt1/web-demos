/// <reference path="knockout-3.4.2.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
//ko.observableArray.fn.sortByProperty = function ( prop )
//{
//    this.sort( function ( obj1, obj2 )
//    {
//        if ( obj1[prop] == obj2[prop] )
//            return 0;
//        else if ( obj1[prop] < obj2[prop] )
//            return -1;
//        else
//            return 1;
//    } );
//}

function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed(function() { return "id-" + Math.random().toPrecision(5).replace(".", ""); }, this);
    this.Title = ko.observable(demoName || "Demo Title");
    this.DEBUGFLAG = ko.observable(debugFlag || false);
    this.ERROR = ko.observable(false);
    this.ErrorMessage = ko.observable("No errors");

    this.SortType = {
        DEFAULT: { text: "default", arrow: "&varr;" },
        ASC: { text: "asc", arrow: "&uarr;" },
        DESC: { text: "desc", arrow: "&darr;" }
    };

    this.DataArray = ko.observableArray( [
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
    ] );

    // maybe compute this button array based on the data someday
    this.SortButtonArray = ko.observableArray( [
        new SortButtonViewModel( "First Name", "FirstName", this.SortType.DEFAULT ),
        new SortButtonViewModel( "Last Name", "LastName", this.SortType.DEFAULT ),
        new SortButtonViewModel( "Age", "Age", this.SortType.DEFAULT ),
        new SortButtonViewModel( "Date Born", "BornDate", this.SortType.DEFAULT ),
        new SortButtonViewModel( "Date Died", "DiedDate", this.SortType.DEFAULT ),
        new SortButtonViewModel( "# of Children", "Children", this.SortType.DEFAULT )
    ] );

    //  sorting observables
    //  sort direction
    this.CurrentSort = ko.observable( this.SortType.DEFAULT );
    //  event handler, see template "KO-SortTabButtonArray-Template"
    this.Click_SortByColumnName = function ( vm, ev )
    {   //  console.debug( "B: Click_SortByColumnName", vm.ColumnName(), _self.CurrentSort() );
        if ( _self.CurrentSort() == _self.SortType.DEFAULT )
        { 
            _self.CurrentSort( _self.SortType.ASC );
        }
        else if ( _self.CurrentSort() == _self.SortType.ASC )
        {
            _self.CurrentSort( _self.SortType.DESC );
        }
        else if ( _self.CurrentSort() == _self.SortType.DESC )
        {
            _self.CurrentSort( _self.SortType.ASC );
        } 

        // reset sibling buttons
        _self.SortButtonArray().forEach( function ( v, i, a )
        {
            if ( v.ColumnName() !== vm.ColumnName() )
            {
                v.SortDirection( _self.SortType.DEFAULT );
            }
            else
            {
                v.SortDirection( _self.CurrentSort() );
            }
            return;
        } );

        console.debug( "SORTING:", vm.ColumnName(), _self.CurrentSort().text );
        _self.SortThisArray( vm.ColumnName(), _self.CurrentSort() );
        return;
    };
    //  Sort this data array by ko property of "ChildViewModel"
    this.SortThisArray = function ( key, dir )
    {   //  console.debug( "SortThisArray", key, dir );
        this.DataArray().sort( function ( a, b )
        {
            var key_a = a[key]();
            var key_b = b[key]();
            //  console.debug( "dir", dir, _self.SortType2.ASC );
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

    // create new, add, remove data for this.DataArray
    this.Click_DataArray_NewData = function ( vm, ev )
    {   //console.debug( "Click_DataArray_NewData" );
        var _new = [];
        for ( var i = 0; i < this.DataArray().length; i++ )
        {
            _new[i] = new ChildViewModel();
        }
        this.DataArray( _new );
        _self.SortButtonArray().forEach( function ( v, i, a )
        {
            v.SortDirection( _self.SortType.DEFAULT );
            return;
        } );
        return;
    };
    this.Click_DataArray_Add = function ( vm, ev )
    {
        this.DataArray.push( new ChildViewModel() );
        return;
    }
    this.Click_DataArray_Remove = function ( vm, ev )
    {
        this.DataArray.pop( new ChildViewModel() );
        return;
    }

    // end of viewmodel
    return;
};

function SortButtonViewModel( text, columnName, direction )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "btn-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

    this.Text = ko.observable( text );
    this.ColumnName = ko.observable( columnName );
    this.SortDirection = ko.observable( direction );
};

function ChildViewModel()
{
    var _self = this;
    this.ID = ko.pureComputed( function ()
    { return "c-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );

    this.FirstName = ko.observable();
    this.LastName = ko.observable();
    this.GetNames = ko.pureComputed( function ()
    {
        var _first_names = ["John", "Kim", "Mary", "Jennifer", "James", "Sean", "Zach", "Robert", "Carl", "Gibson", "Jimmy", "Scott", "Kathy"];
        var _index = Math.round( Math.random() * _first_names.length - 1 );
        if ( _index < 0 )
        {
            _index = Math.round( _first_names.length / 3 );
        }
        //  console.debug( _names.length, _index );
        this.FirstName( _first_names[_index] );

        var _last_names = ["Smith", "Bailey", "Williams", "Jones","Doe","Rocker","Kunis","Fender","Englebert","Foxy-Shazam"];
        _index = Math.round( Math.random() * _last_names.length - 1 );
        if ( _index < 0 )
        {
            _index = Math.round( _last_names.length / 3 );
        }
        this.LastName( _last_names[_index] );
        //  console.debug( "this.FirstName", this.FirstName(), "this.LastName", this.LastName() );
        return;
    }, this );
    this.GetNames();

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