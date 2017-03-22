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

    // this works, but needs to "new" a CircleSpinnerViewModel
    //var _static_spinner_styles = new CircleSpinnerViewModel( this ).CircleSpinnerStyles;
    //console.debug( "_static_spinner_styles", _static_spinner_styles );
    //this.CircleSpinnerStyles = {
    //    ArcStyle: 0,
    //    PathStyle: 1,
    //    DotsStyle: 2
    //};
    //  this.SpinnerStyle = ko.observable( || CircleSpinnerStyles.ArcStyle );

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
    return;
};