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

    this.DataArray = ko.observableArray( [
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
        new ChildViewModel(),
    ] );

    this.SortType2 = {
        DEFAULT: { text: "default", arrow: "&varr;" },
        ASC: { text: "asc", arrow: "&uarr;" },
        DESC: { text: "desc", arrow: "&darr;" }
    };

    this.CurrentSort_Name = ko.observable( this.SortType2.DEFAULT );
    this.Click_SortByName = function ( vm, ev )
    {
        //  console.debug( "1. SortByName.this.CurrentNameSort", this.CurrentSort_Name() );
        if ( this.CurrentSort_Name() == this.SortType2.DEFAULT )
        {   // console.debug( "unsorted" );
            this.CurrentSort_Name( this.SortType2.ASC );
        }
        else if ( this.CurrentSort_Name() == this.SortType2.ASC )
        {
            this.CurrentSort_Name( this.SortType2.DESC );
        }
        else if ( this.CurrentSort_Name() == this.SortType2.DESC )
        {
            this.CurrentSort_Name( this.SortType2.ASC );
        }   
        this.SortThisArray( "Name", this.CurrentSort_Name() );
        //  console.debug( "2. SortByName.this.CurrentNameSort", this.CurrentSort_Name() );

        // change siblings
        //  this.CurrentSort_Name( this.SortyType2.DEFAULT );
        this.CurrentSort_Age( this.SortType2.DEFAULT );
        this.CurrentSort_Born( this.SortType2.DEFAULT );
        this.CurrentSort_Died( this.SortType2.DEFAULT );
        this.CurrentSort_Children( this.SortType2.DEFAULT );
        return;
    };

    this.CurrentSort_Age = ko.observable( this.SortType2.DEFAULT );
    this.Click_SortByAge = function ( vm, ev )
    { 
        //  console.debug( "1. Click_SortByAge.this.CurrentSort_Age", this.CurrentSort_Age() );
        if ( this.CurrentSort_Age() == this.SortType2.DEFAULT )
        {   // console.debug( "unsorted" );
            this.CurrentSort_Age( this.SortType2.ASC );
        }
        else if ( this.CurrentSort_Age() == this.SortType2.ASC )
        {
            this.CurrentSort_Age( this.SortType2.DESC );
        }
        else if ( this.CurrentSort_Age() == this.SortType2.DESC )
        {
            this.CurrentSort_Age( this.SortType2.ASC );
        }
        this.SortThisArray( "Age", this.CurrentSort_Age() );
        //  console.debug( "2. Click_SortByAge.this.CurrentNameSort", this.CurrentSort_Name() );

        // change siblings
        this.CurrentSort_Name( this.SortType2.DEFAULT );
        //this.CurrentSort_Age( this.SortType2.DEFAULT );
        this.CurrentSort_Born( this.SortType2.DEFAULT );
        this.CurrentSort_Died( this.SortType2.DEFAULT );
        this.CurrentSort_Children( this.SortType2.DEFAULT );
        return;
    };

    this.CurrentSort_Born = ko.observable( this.SortType2.DEFAULT );
    this.Click_SortByBorn = function ( vm, ev )
    { 
        //  console.debug( "1. Click_SortByBorn.this.CurrentSort_Born", this.CurrentSort_Born() );
        if ( this.CurrentSort_Born() == this.SortType2.DEFAULT )
        {   // console.debug( "unsorted" );
            this.CurrentSort_Born( this.SortType2.ASC );
        }
        else if ( this.CurrentSort_Born() == this.SortType2.ASC )
        {
            this.CurrentSort_Born( this.SortType2.DESC );
        }
        else if ( this.CurrentSort_Born() == this.SortType2.DESC )
        {
            this.CurrentSort_Born( this.SortType2.ASC );
        }
        this.SortThisArray( "BornDate", this.CurrentSort_Born() );
        //  console.debug( "2. Click_SortByBorn.this.CurrentSort_Born", this.CurrentSort_Born() );

        // change siblings
        this.CurrentSort_Name( this.SortType2.DEFAULT );
        this.CurrentSort_Age( this.SortType2.DEFAULT );
        //  this.CurrentSort_Born( this.SortType2.DEFAULT );
        this.CurrentSort_Died( this.SortType2.DEFAULT );
        this.CurrentSort_Children( this.SortType2.DEFAULT );
        return;
    };

    this.CurrentSort_Died = ko.observable( this.SortType2.DEFAULT );
    this.Click_SortByDied = function ( vm, ev )
    {  
        //  console.debug( "1. Click_SortByDied.this.CurrentSort_Died", this.CurrentSort_Died() );
        if ( this.CurrentSort_Died() == this.SortType2.DEFAULT )
        {   // console.debug( "unsorted" );
            this.CurrentSort_Died( this.SortType2.ASC );
        }
        else if ( this.CurrentSort_Died() == this.SortType2.ASC )
        {
            this.CurrentSort_Died( this.SortType2.DESC );
        }
        else if ( this.CurrentSort_Died() == this.SortType2.DESC )
        {
            this.CurrentSort_Died( this.SortType2.ASC );
        }
        this.SortThisArray( "DiedDate", this.CurrentSort_Died() );
        //  console.debug( "2. Click_SortByDied.this.CurrentSort_Born", this.CurrentSort_Born() );

        // change siblings
        this.CurrentSort_Name( this.SortType2.DEFAULT );
        this.CurrentSort_Age( this.SortType2.DEFAULT );
        this.CurrentSort_Born( this.SortType2.DEFAULT );
        //  this.CurrentSort_Died( this.SortType2.DEFAULT );
        this.CurrentSort_Children( this.SortType2.DEFAULT );
        return;
    };

    this.CurrentSort_Children = ko.observable( this.SortType2.DEFAULT );
    this.Click_SortByChildren = function ( vm, ev )
    {
        //  console.debug( "1. Click_SortByChildren.this.CurrentSort_Children", this.CurrentSort_Children() );
        if ( this.CurrentSort_Children() == this.SortType2.DEFAULT )
        {   // console.debug( "unsorted" );
            this.CurrentSort_Children( this.SortType2.ASC );
        }
        else if ( this.CurrentSort_Children() == this.SortType2.ASC )
        {
            this.CurrentSort_Children( this.SortType2.DESC );
        }
        else if ( this.CurrentSort_Children() == this.SortType2.DESC )
        {
            this.CurrentSort_Children( this.SortType2.ASC );
        }
        this.SortThisArray( "Children", this.CurrentSort_Children() );
        //  console.debug( "2. Click_SortByChildren.this.CurrentSort_Children", this.CurrentSort_Children() );

        // change siblings
        this.CurrentSort_Name( this.SortType2.DEFAULT );
        this.CurrentSort_Age( this.SortType2.DEFAULT );
        this.CurrentSort_Born( this.SortType2.DEFAULT );
        this.CurrentSort_Died( this.SortType2.DEFAULT );
        //  this.CurrentSort_Children( this.SortType2.DEFAULT );
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
            //  console.debug( "dir", dir, _self.SortType2.ASC );
            switch ( dir )
            {
                case _self.SortType2.ASC:
                    {   //  sort string ascending
                        if ( key_a < key_b ) return -1;
                        //  sort string descending    
                        if ( key_a > key_b ) return 1;
                        //  default return value (no sorting)
                        return 0;
                    }
                case _self.SortType2.DESC:
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