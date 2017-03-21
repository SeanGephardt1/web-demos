/// <reference path="../script/ko/knockout-3.4.2.js" />
/// "ProgressBarViewModel" ViewModel V.1.0.0
"use strict";
function ProgressBarViewModel(pViewModel)
{
    var _self = this;
    // define defaults
    this.ID = ko.pureComputed( function () { return "pb-id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
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
    {
        // check for parent viewmodel reference parameter
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

    // event handlers
    this.Width = ko.observable( 0 );
    this._default_prog_step = 1;
    this.ProgressStep = ko.observable( this._default_prog_step );
    this.Progress_Interval = ko.observable();

    this._default_button_text_start = "Start";
    this._default_button_text_stop = "Stop";
    this.ButtonText = ko.observable( this._default_button_text_start );
    this.Button_IsClicked = ko.observable( false );

    this.Click_Progress = function ( vm, ev )
    {   //  console.debug( "1. ProgressBarViewModel.DoProgress" );
        if ( this.Width() == 0 )
        {
            this.ButtonText( this._default_button_text_stop );
            this.Progress_Interval( window.setInterval( function ()
            {

                //  console.debug( "in window.setInterval", _self.Width(), _self.ProgressStep() );
                _self.Width( _self.ProgressStep() );
                _self.ProgressStep( _self.ProgressStep() + _self._default_prog_step );
                //  console.debug( "in window.setInterval", _self.Width(), _self.ProgressStep() );

                if ( _self.ProgressStep() == 100 )
                {   //  console.debug( "clearInterval" );
                    window.clearInterval( _self.Progress_Interval() );

                    window.setTimeout( function ()
                    {   //  console.debug( "resetting" );
                        _self.Width( 0 );
                        _self.ProgressStep( _self._default_prog_step );
                        _self.ButtonText( _self._default_button_text_start );
                        return;
                    }, 2000 );
                }
                return;
            }, 10 ) );
        }
        //  console.debug( "2. ProgressBarViewModel.DoProgress", this.Width(), this.ProgressStep() );
        return;
    };


    return;
};