/// <reference path="../script/ko/knockout-3.4.2.js" />
/// "ProgressBarViewModel" ViewModel V.1.0.0
"use strict";
function ProgressBarViewModel(pViewModel)
{
    var _self = this;
    // define defaults
    this.ID = ko.pureComputed( function () { return "pb-id-" + Math.random().toPrecision( 3 ).replace( ".", "" ); }, this );
    this.Error = ko.observable( false );
    this.ErrorMessage = ko.observable( "No errors" );
    this.ParentViewModel = ko.observable();

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
        return;
    }, this );
    this.AssignDefaultValues();

    // event handlers & observables for SVG progress rect
    this.Width = ko.observable( 0 );
    this._default_prog_step = 1;
    this.ProgressStep = ko.observable( this._default_prog_step );
    this.Progress_Interval = ko.observable();

    this._default_button_text_start = "Start";
    this._default_button_text_stop = "Stop";
    this._default_button_text_pause = "Paused";

    this.ProgressButton_Text = ko.observable( this._default_button_text_start );
    this.ProgressButton_IsClicked = ko.observable( false );

    this.Click_Progress = function ( vm, ev )
    {   //  console.debug( "1. ProgressBarViewModel.DoProgress" );
        //  console.debug( "this.Button_IsClicked()", this.Button_IsClicked(), this.Width(), this.ProgressStep() );
        if ( this.ProgressButton_IsClicked() == true )
        {
            //  console.debug( "this.Button_IsClicked()true", this.Button_IsClicked() );
            window.clearInterval( this.Progress_Interval() );
            //this.Width( 0 );
            //this.ProgressStep( _self._default_prog_step );
            if ( this.Width() > 0 && this.Width() < 100 )
            {
                this.ProgressButton_Text( this._default_button_text_pause );
            }
            else
            {
                this.ProgressButton_Text( this._default_button_text_start );
            }
            this.ProgressButton_IsClicked( false );
        }
        else
        {
            this.ProgressButton_Text( this._default_button_text_stop );
            this.ProgressButton_IsClicked( true );

            this.Progress_Interval( window.setInterval( function ()
            {
                //  console.debug( "in window.setInterval", _self.Width(), _self.ProgressStep() );
                _self.Width( _self.ProgressStep() );
                _self.ProgressStep( _self.ProgressStep() + _self._default_prog_step );
                //  console.debug( "in window.setInterval", _self.Width(), _self.ProgressStep() );

                if ( _self.ProgressStep() == 100 )
                {   //  console.debug( "clearInterval" );
                    //  _self.Progress_Interval( null ); //  console.debug( _self.Progress_Interval() );
                    window.clearInterval( _self.Progress_Interval() );
                    //  console.debug( window.clearInterval() );
                    window.setTimeout( function ()
                    {   //  console.debug( "resetting" );
                        _self.Width( 0 );
                        _self.ProgressStep( _self._default_prog_step );
                        _self.ProgressButton_Text( _self._default_button_text_start );
                        _self.ProgressButton_IsClicked( false );
                        return;
                    }, 500 );
                }
                return;
            }, 10 ) );
        }
        //  console.debug( "2. ProgressBarViewModel.DoProgress", this.Width(), this.ProgressStep() );
        return;
    };

    // event handlers & observables for SVG progress rect
    this._badge_btn_text_show = "Show Badge";
    this._badge_btn_text_hide = "Hide Badge";
    this.BadgeButton_Text = ko.observable( this._badge_btn_text_show );

    //  these should match CSS class names
    //  best way would be to write these into the document, not enough time, do later
    //  first array entry is the default
    this._badge_border_classes = ["BorderBadge", "bb_orange", "bb_green", "bb_blue"];
    this._badge_poly_classes = ["PolyBadge", "PolyBadgeRed", "PolyBadgeGreen", "PolyBadgeBlue"];

    this.BadgeBorderClass = ko.observable( this._badge_border_classes[0] );
    this.BadgePolyClass = ko.observable( this._badge_poly_classes[0] );
    this.HasPolyBadge = ko.observable( false );

    this.Click_ChangeBadge = function ( vm, ev )
    {   //  console.debug( "ProgressBarViewModel.Click_ChangeBadge" );
        //  console.debug( "this.HasPolyBadge()", this.HasPolyBadge() );
        if ( this.HasPolyBadge() == false )
        {
            var _new_r = Math.round( Math.random() * 3 );
            if ( _new_r == 0 )
            {
                _new_r = 1;
            }
            //  console.debug( "_new_r", _new_r );
            this.BadgeBorderClass( this._badge_border_classes[_new_r] );
            this.BadgePolyClass( this._badge_poly_classes[_new_r] );

            this.HasPolyBadge( true );
            this.BadgeButton_Text( this._badge_btn_text_hide );
        }
        else if ( this.HasPolyBadge() == true )
        {
            this.BadgeBorderClass( this._badge_border_classes[0] );
            this.BadgePolyClass( this._badge_poly_classes[0] );
            this.HasPolyBadge( false );
            this.BadgeButton_Text( this._badge_btn_text_show );
        }
        return;
    };

    // mouse events and KOs for each title background
    this.TileBackground = ko.observable();
    this.TileBackground_MouseOver = function ( vm, ev )
    {   //  console.debug( "TileBackground_MouseOver", ev.fromElement );
        this.TileBackground( "background-color:rgba(248,248,248,1)" );
        return;
    };
    this.TileBackground_MouseOut = function ( vm, ev )
    {   //  console.debug( "TileBackground_MouseOut", ev.fromElement );
        this.TileBackground( "background-color:rgba(230,230,230,1)" );
        return;
    };
    this.Click_Tile = function ( vm, ev )
    {   //  console.debug( "ProgressBarViewModel.Click_Tile" );
        this.Click_ChangeBadge( vm, ev );
        //  this.Click_Progress( vm, ev );
        return;
    };
    return;
};