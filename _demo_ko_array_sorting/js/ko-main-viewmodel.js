/// <reference path="knockout-3.4.2.js" />
/// "Main" ViewModel V.1.0.0
"use strict";
function MainViewModel( demoName, debugFlag )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Title = ko.observable( demoName || "Demo Title" );
    this.DEBUGFLAG = ko.observable( debugFlag || false );
    this.ERROR = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );



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
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel()
    ] );

    //  maybe compute this button array based on the data someday
    //  very specific to the "ChildViewModel" used in "this.DataArray"
    //  checks for a standard "ko.observable" property, and then a child "ko.observable" of "DisplayName"
    this._button_array = [];

    this.DataArray().forEach( function ( v, i, a )
    {   //  console.debug( i, v );
        //  just try to parse the first "ChildViewModel()" in this array
        if ( i == 0 )
        {
            for ( var key in v )
            {   //  console.debug( 'key:', key, 'value: ' + typeof v[key] );
                if ( typeof v[key] == "function" )
                {   //  console.debug( 'key:', key, 'value: ' + typeof v[key], v[key] ); 
                    //  if v[key].name == "c" -- "c" == "ko.observable()" "e" == "ko.pureComputed()"
                    //  console.debug( 'key:', key, 'value: ' + typeof v[key], v[key].name );
                    if ( v[key].name == "c" && v[key].DisplayName !== undefined )
                    {   //  console.debug( 'key:', key, "v[key].name", v[key].name, v[key].DisplayName() );
                        var _t_btn = new SortButtonViewModel( v[key].DisplayName(), key, _self.SortType.DEFAULT );
                        _self._button_array.push( _t_btn );
                    }
                }
            }
        }
        return;
    } );

    this.SortButtonArray = ko.observableArray( this._button_array );

    //  sorting observables
    //  sort direction
    this.SortedColumn = ko.observable();
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
            {   //  console.debug( _self.SortedColumn(), v.ColumnName() );
                if ( _self.SortedColumn() !== v.ColumnName() )
                {
                    _self.CurrentSort( _self.SortType.ASC );
                }
                _self.SortedColumn( v.ColumnName() );
                v.SortDirection( _self.CurrentSort() );
            }
            return;
        } );

        //  console.debug( "SORTING:", _self.SortedColumn(), _self.CurrentSort().text );
        _self.SortThisArray( _self.SortedColumn(), _self.CurrentSort() );
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
        // create new array based on random number
        var _new = [];
        var _new_rnd = Math.round( Math.random() * 99 );
        for ( var i = 0; i < _new_rnd; i++ )
        {
            _new[i] = new ChildViewModel();
        }
        this.DataArray( _new );

        // reset the sort direction
        _self.SortButtonArray().forEach( function ( v, i, a )
        {
            v.SortDirection( _self.SortType.DEFAULT );
            return;
        } );

        // reset sorted columns
        _self.SortedColumn("");
        _self.CurrentPage( 0 );
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

    // for pagination
    this.PageSizeOptions = ko.observableArray( [3, 5, 10, 20] );

    this._default_page_size = 5;
    this.PageSize = ko.observable( this._default_page_size );
    this.NumberOfPages = ko.observable( 0 );
    this.PageNumbers = ko.observableArray( [] );
    this.CurrentPage = ko.observable( 0 );
    this.PageDataArray = ko.observableArray( [] );
    this.Get_PageData = ko.computed(function()
    {   //  console.debug( "Get_PageData" );
        //  console.debug( "DataArray", this.DataArray().length );
        //  console.debug( "PageDataArray", this.PageDataArray().length );
        //  console.debug( "PageSize", this.PageSize() );
        //  console.debug( "this.NumberOfPages", this.NumberOfPages() );
        //  console.debug( "CurrentPage", this.CurrentPage() );

        var _num_pages = Math.round( this.DataArray().length / this.PageSize() );
        //  console.debug( "this._num_pages", _num_pages );
        this.NumberOfPages( _num_pages );

        var _temp_page_numbers = [];
        for ( var i = 0; i < this.NumberOfPages() ; i++ )
        {
            var _new_i = i + 1;
            //  console.debug( "_new_i", _new_i );
            _temp_page_numbers[i] = _new_i;
        }
        this.PageNumbers( _temp_page_numbers );

        var _begin = this.CurrentPage() * this.PageSize();
        var _end = _begin + this.PageSize();
        //  console.debug( "_begin, _end", _begin, _end );

        var _current_slice = this.DataArray().slice( _begin, _end );
        //  console.debug( "_current_slice", _current_slice );
        this.PageDataArray( _current_slice );
        return;
    },this);

    // paging events
    this.Click_PreviousPage = function ( vm, ev )
    {
        //  console.debug( "Click_PreviousPage", this.CurrentPage(), this.NumberOfPages() );
        if ( this.CurrentPage() == 0 )
        {
            return;
        }

        this.CurrentPage( this.CurrentPage() - 1 );
        return;
    };
    this.Click_NextPage = function ( vm, ev )
    {
        //  console.debug( "Click_NextPage", this.CurrentPage(), this.NumberOfPages() );

        if ( this.CurrentPage() == ( this.NumberOfPages() - 1))
        {
            return;
        }

        this.CurrentPage( this.CurrentPage() + 1 );
        return;
    };
    this.Click_GotoPageNumber = function ( data, ev )
    {
        //  console.debug( "Click_GotoPageNumber", data, ev );
        //  console.debug( "CurrentPage", _self.CurrentPage() );
        _self.CurrentPage( data - 1 );
        //  console.debug( "CurrentPage", _self.CurrentPage() );
        return;
    };
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

    this._first_names = ["Allan", "Bob", "Catherine", "David", "Elmer", "Frank", "Gerry", "Herbert", "Ichabod", "Kelly", "Larry", "Mike", "Noel", "Oscar", "Paul", "Qunicy", "Rebecca", "Susan", "Terry", "Usha", "Vera", "Wendy", "Xana", "Yolanda", "Zena"];
    this._first_names.sort();

    this._last_names = ["Ambercrombie","Balley","Cristov","Dearborn","Everly","Frodenhimer","Grenman","Hotchkins","Klover","LaFluer","Michaels","Nelson","Otherman","Peterson","Qunitosa","Reed","Silvers","Thomas","Unger","Varvatos","Williams","Xhiao","Yonkers","Zeta-Jones"];
    this._last_names.sort();

    this.FirstName = ko.observable();
    this.FirstName.DisplayName = ko.observable( "First Name" );

    this.LastName = ko.observable();
    this.LastName.DisplayName = ko.observable("Last Name");

    this.GetNames = ko.pureComputed( function ()
    {
        var _index = Math.round( Math.random() * this._first_names.length - 1 );
        if ( _index < 0 )
        {
            _index = Math.round( this._first_names.length / 3 );
        }
        this.FirstName( this._first_names[_index] );

        _index = Math.round( Math.random() * this._last_names.length - 1 );
        if ( _index < 0 )
        {
            _index = Math.round( this._last_names.length / 3 );
        }
        this.LastName( this._last_names[_index] );
        //  console.debug( "this.FirstName", this.FirstName(), "this.LastName", this.LastName() );
        return;
    }, this );
    this.GetNames();

    this.Age = ko.observable();
    this.Age.DisplayName = ko.observable( "Age" );

    this.GetAge = ko.pureComputed( function ()
    {
        var _age = Math.round( Math.random() * 100 );
        if ( _age < 13 )
        {
            _age = 13;
        }
        this.Age( _age );
        return;
    }, this );
    this.GetAge();

    this.BornDate = ko.observable();
    this.BornDate.DisplayName = ko.observable("Date born");

    this.GetBornDate = ko.pureComputed( function ()
    {
        var _current_year = (new Date().getFullYear() - this.Age());
        this.BornDate( _current_year );
        return;
    }, this );
    this.GetBornDate();

    this.DiedDate = ko.observable();
    this.DiedDate.DisplayName = ko.observable( "Date died" );

    this.GetDiedDate = ko.pureComputed( function ()
    {
        this.DiedDate( Math.round( new Date().getFullYear() + Math.random() * 30 ) );
        return;
    }, this );
    this.GetDiedDate();

    this.Children = ko.observable();
    this.Children.DisplayName = ko.observable( "# of children" );

    this.GetChildren = ko.pureComputed( function ()
    {
        this.Children( Math.round( Math.random() * 10 ) );
        return;
    }, this );
    this.GetChildren();
    return;
};