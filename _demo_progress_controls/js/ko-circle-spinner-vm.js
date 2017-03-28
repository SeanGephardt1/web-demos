/// <reference path="../script/ko/knockout-3.4.2.js" />
/// "ProgressBarViewModel" ViewModel V.1.0.0
"use strict";
// public static enum
var CircleSpinnerStyles = {
    ArcStyle: 0,
    PathStyle: 1,
    DotsStyle: 2
};
function CircleSpinnerViewModel( pViewModel, spinnerStyle )
{
    var _self = this;
    this.ID = ko.pureComputed( function () { return "circle-spinner-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );
    this.ParentViewModel = ko.observable();
    this.SpinnerStyle = ko.observable( spinnerStyle || window.CircleSpinnerStyles.ArcStyle );
    //  console.debug( "this.SpinnerStyle", this.SpinnerStyle(), spinnerStyle );

    //  assign incoming values
    //  catch, instead of throw
    //  this will allow the demo to continue,
    //  and provides a better explanation in the browser console
    //  than just a vague KO exception
    //  
    //-- example:
    //  using "console" displays this exception & the KO exception
    //  and allows for the rest of the code to continue
    //  console.error( exNoParent.stack );
    //  using "throw" just shows this exception, not the KO exception
    //  and whole app crashes
    //  throw exNoParent;
    //--
    //  
    //  though it needs deeper investigation and testing
    //  move to my ko-template demo example
    //  and to "main-viewmodel" code
    this.AssignDefaultValues = ko.pureComputed( function ()
    {   // check for parent viewmodel reference parameter
        try
        {
            if ( pViewModel == undefined )
            {
                var _e = new Error( "ParentViewModel not assigned to this ProgressBarViewModel" );
                this.Error( true );
                this.ErrorMessage( _e.message );
                throw _e;
            }
            else
            {
                this.ParentViewModel( pViewModel );
            }
        }
        catch ( exNoParent )
        {
            console.error( exNoParent.stack );
            //  throw exNoParent;
        }

        //  check for spinnerStyle value, not really needed, 
        //  can fall back in the declaration to the enum
        try
        { 
            if ( spinnerStyle == undefined )
            {
                var _e = new Error( "\'CircleSpinnerViewModel.SpinnerStyle\' is undefined, using a default style" );
                //this.Error( true );
                //this.ErrorMessage( _e.message );
                throw _e;
            }
            else
            {
                this.SpinnerStyle( spinnerStyle );
            }
        }
        catch ( exNoStyle )
        {
            console.info( exNoStyle.message );
            //  throw exNoParent;
        }
        return;
    }, this );
    this.AssignDefaultValues();

    // specific KOs
    this.LoaderButton_Text = ko.observable("Run");
    this.Click_CircleSpinner = function ( vm, ev )
    {
        //  console.debug( "Click_CircleSpinner" );
        //  console.debug( "SpinnerStyle", this.SpinnerStyle() );
        switch( this.SpinnerStyle() )
        {
            case 0:
            {
                //  console.debug( "CircleSpinnerStyles.ArcStyle" );
                this.Render_ArcStyle(vm, ev);
                break;
            }
            case 1: { console.debug( "CircleSpinnerStyles.PathStyle" ); break; }
            case 2: { console.debug( "CircleSpinnerStyles.DotsStyle" ); break; }
        }
        return;
    };

    // for arcStyle 
    // compute the size to make the dash look proper
    this.Radius = ko.observable( 30 );
    this.DashArray = ko.observable( 0 );
    this.StrokeOpacity = ko.observable( 0 );
    this.StrokeColor = ko.observable("rgba(0,0,0,1)");
    this.Transform = ko.observable();
    //  console.debug( "ID", vm.ID() );
    //  var _r = document.getElementById( vm.ID() ).children[0].attributes["r"].value;
    //  var _cx = document.getElementById( vm.ID() ).children[0].attributes["cx"].value;
    //  var _cy = document.getElementById( vm.ID() ).children[0].attributes["cy"].value;
    //  console.debug( "_r, _cx, _cy", _r, _cx, _cy );
    this.Render_ArcStyle = function ( vm, ev )
    {   //  console.debug( "Render_ArcStyle");
        var _ada = 360 / Math.PI;
        this.DashArray( _ada );
        this.StrokeOpacity( 1 );
        this.Radius( 30 );

        var _x = 0;

        var _red = 0;
        var _green = 96;
        var _blue = 255;
        // COME BACK TO MAKING A GRADIENT
        //  var _blue_hit_bool = false;
        //  console.debug( "1. _blue", _blue, _blue_hit_bool );
        //if ( _blue_hit_bool == false )
        //{
        //    _blue++;
        //}
        //else if ( _blue_hit_bool == true )
        //{
        //    _blue--;
        //}
        //if ( _blue == 255 )
        //{
        //    _blue_hit_bool = true;
        //}
        //else if ( _blue == 0 )
        //{
        //    _blue_hit_bool = false;
        //}
        //  console.debug( "2. _blue", _blue, _blue_hit_bool );

        var _new_color = "rgba(" + _red + "," + _green + "," + _blue + ",1)";
        //    console.debug( "_new_color", _new_color );
        _self.StrokeColor( _new_color );

        var _loop = window.setInterval( function ()
        {   //  console.debug("_x", _x);
            var _rotate = "rotate(" + _x + " " + document.getElementById( vm.ID() ).children[0].attributes["cx"].value + " " + document.getElementById( vm.ID() ).children[0].attributes["cy"].value + ")";
            //  console.debug( "_rotate", _rotate );
            _self.Transform( _rotate );
            _x = _x + 1;

            // end when hitting 1000 - for demo purposes
            if ( _x > 1000 )
            {
                window.clearInterval( _loop );
                _self.DashArray( 0 );
                _self.StrokeOpacity( 0 );
                _self.Radius( 0 );
                _self.Transform( "" );
            }
            return;
        }, 1 );

        return;
    };


    // EVM
    return;
};