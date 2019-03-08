/// <reference path="../script/knockout-3.4.2.js" />
/// "DatePickerViewModel" ViewModel V.1.0.0
"use strict";
function DatePickerViewModel( parent )
{
	//	console.debug( "DatePickerViewModel", this, parent );
    let _self = this;
    this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
	this.Title = ko.observable( "Date Picker" );
	this.Debug = ko.observable( true );
	this.Parent = ko.observable( parent );

	this.CurrentDate = ko.observable( new Date() );
	this.CurrentSelectedRange = ko.observableArray( [] );

	this.SelectedStartDate = ko.observable( this.CurrentDate() );
	this.SelectedEndDate = ko.observable( this.CurrentDate() );
	this.SelectedDateRange = ko.computed( function ()
	{
		// need to validate ranges, here or elsewhere
		let _start_date_year = new Date( _self.SelectedStartDate() ).getFullYear();
		let _start_date_month = new Date( _self.SelectedStartDate() ).getMonth() + 1;
		let _start_date_date = new Date( _self.SelectedStartDate() ).getDate();
		let _start_date_formatted = _start_date_month + "/" + _start_date_date + "/" + _start_date_year;
		//	console.debug( "_start_date_formatted", _start_date_formatted );

		let _end_date_year = new Date( _self.SelectedEndDate() ).getFullYear();
		let _end_date_month = new Date( _self.SelectedEndDate() ).getMonth() + 1;
		let _end_date_date = new Date( _self.SelectedEndDate() ).getDate();
		let _end_date_formatted = _end_date_month + "/" + _end_date_date + "/" + _end_date_year;
		//	console.debug( "_end_date_formatted", _end_date_formatted );

		let _formatted_range = _start_date_formatted + "-" + _end_date_formatted;
		//	console.debug( "_formatted_range", _formatted_range);
		return _formatted_range;
	} );

	this.FormatDateForDisplay = function ( date )
	{	//	console.debug( "FormatDateForDisplay", date );
		let _new = new Date( date ).toDateString();
		return _new;
	};
	this.DisplayedStartDate = ko.computed( function ()
	{
		return this.FormatDateForDisplay( this.SelectedStartDate() );
	}, this );
	this.DisplayedEndDate = ko.computed( function ()
	{
		return this.FormatDateForDisplay( this.SelectedEndDate() );
	}, this );

	
	// Tables Navigation
	// defaults, may need to change from computed, no real need
	this.PreviousMonthDate = ko.computed( function ()
	{
		let _next = new Date( _self.CurrentDate().getFullYear(), ( _self.CurrentDate().getMonth() ) );
		//	console.debug( "_next", _next );
		return _next;
	}, this );
	this.NextMonthDate = ko.computed( function ()
	{
		let _next = new Date( _self.CurrentDate().getFullYear(), ( _self.CurrentDate().getMonth() + 1 ) );
		//	console.debug( "_next", _next );
		return _next;
	}, this );

	this.LeftMonth = ko.observable( new MonthViewModel( this, this.PreviousMonthDate() ) );
	this.RightMonth = ko.observable( new MonthViewModel( this, this.NextMonthDate() ) );

	this.DisplayedCalenders = ko.observableArray( [
		this.LeftMonth(),
		this.RightMonth()
	] );

	this.ResetCalenderView = function ()
	{
		this.LeftMonth( new MonthViewModel( this, this.PreviousMonthDate() ) );
		this.RightMonth( new MonthViewModel( this, this.NextMonthDate() ) );

		this.DisplayedCalenders( [
			this.LeftMonth(),
			this.RightMonth()
		] );

		return;
	};

	// may need more work for button based large date ranges
	this.NavigateMonths = function ( incr )
	{	
		//	console.debug( "NavigateMonths", incr );
		//	console.debug( "_self.LeftMonth()", _self.LeftMonth().Date() );
		//	console.debug( "_self.RightMonth()", _self.RightMonth().Date() );

		let _left = new Date( _self.LeftMonth().Date().getFullYear(), _self.LeftMonth().Date().getMonth() );
		//	console.debug( "_left", _left,  _left.getMonth(), incr, (_left.getMonth() + incr) );
		_left.setMonth( (_left.getMonth() + incr) );
		//	console.debug( "_left", _left );
		_self.LeftMonth( new MonthViewModel( _self, _left  ) );

		let _right = new Date( _self.RightMonth().Date().getFullYear(), _self.RightMonth().Date().getMonth() );
		//	console.debug( "_right", _right, _right.getMonth(), incr, ( _right.getMonth() + incr ) );
		_right.setMonth( (_right.getMonth() + incr) );
		//	console.debug( "_right", _right );
		_self.RightMonth( new MonthViewModel( _self, _right ) );

		_self.DisplayedCalenders( [
			_self.LeftMonth(),
			_self.RightMonth()
		] );

		// Mark selected ranges
		_self.MarkDisplayCalenderViews();

		return;
	};
	this.OnClick_GoToPreviousMonth = function ( vm, ev )
	{	//	console.debug( "OnClick_GoToPreviousMonth" );
		_self.NavigateMonths( -1 );
		return;
	};
	this.OnClick_GoToNextMonth = function ( vm, ev )
	{	//	console.debug( "OnClick_GoToNextMonth" );
		_self.NavigateMonths( 1 );
		return;
	};

	this.MarkDisplayCalenderViews = function( )
	{	//	console.debug( "MarkDisplayCalenderViews" );
	// sort ranges
		_self.CurrentSelectedRange().sort( function ( a, b )
		{
			let rv;
			if ( a.Date() > b.Date() )
			{
				rv = 1;
			}
			else if ( a.Date() == b.Date() )
			{
				rv = 0;
			}
			else if ( a.Date() < b.Date() )
			{
				rv = -1;
			}
			return rv;
		} );

		// check sort
		//_self.CurrentSelectedRange().forEach( function ( v, i, a )
		//{	console.debug( i, v.Date() );
		//	return;
		//} );

		if ( _self.CurrentSelectedRange().length > 1 )
		{
			_self.SelectedStartDate( _self.CurrentSelectedRange()[0].Date() );
			_self.SelectedEndDate( _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date() );

			_self.DisplayedCalenders().forEach( function ( v, i, a )
			{	//	console.debug( i, "v", v.Computed_Month() );
				v.Weeks().forEach( function ( v2, i2, a2 )
				{	//	 console.debug( i2, "v2", v2 );
					v2.forEach( function ( v3, i3, a3 )
					{	
						if ( (v3.Date().getFullYear() === _self.CurrentSelectedRange()[0].Date().getFullYear() &&
							v3.Date().getMonth() === _self.CurrentSelectedRange()[0].Date().getMonth() &&
							v3.Date().getDate() === _self.CurrentSelectedRange()[0].Date().getDate() ) ||
							(v3.Date().getFullYear() === _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date().getFullYear() &&
							v3.Date().getMonth() === _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date().getMonth() &&
								v3.Date().getDate() === _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date().getDate() )
							)
						 {
							v3.IsRangeBoundary( true );
							v3.IsSelected( true );
						 }
						else if ( v3.Date() > _self.CurrentSelectedRange()[0].Date() && v3.Date() < _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date() )
						{
							v3.IsSelected( true );
							v3.IsRangeBoundary( false );
						}
						else if ( v3.Date() < _self.CurrentSelectedRange()[0].Date() && v3.Date() > _self.CurrentSelectedRange()[_self.CurrentSelectedRange().length - 1].Date() )
						{
							v3.IsSelected( false );
							v3.IsRangeBoundary( false );
						}
						return;
					} );
					return;
				} );
				return;
			} );
		}
		return;
	};

	// DATE SELECTION EVENTS
	this.OnClick_SelectThisDay = function ( vm, ev )
	{	//	console.debug( "OnClick_SelectThisDay ", vm.Date(), vm.IsSelected() );
		if ( _self.CurrentSelectedRange().length > 1 )
		{
			_self.OnClick_ClearSelectionValues();
			_self.CurrentSelectedRange([]);
		}

		if ( vm !== undefined )
		{
			if ( vm.IsSelected() == false )
			{
				vm.IsSelected( true );
				vm.IsRangeBoundary( true );
				_self.CurrentSelectedRange().push( vm );
			}
			else if ( vm.IsSelected() == true )
			{
				vm.IsSelected( false );
				vm.IsRangeBoundary( false );
				_self.CurrentSelectedRange().pop( vm );
			}
		}

		_self.MarkDisplayCalenderViews();
		return;
	};

	// historic buttons events
	this.OnClick_SevenDay = function ( vm, ev )
	{	//	console.debug( "OnClick_SevenDay", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );

		_self.OnClick_ClearSelectionValues();

		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		let _current_minus_7 = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), ( _self.CurrentDate().getDate() - 7 ) );

		let _today = new WeekDayViewModel( _self, _self.CurrentDate() );
		let _toady_minus_7 = new WeekDayViewModel( _self, _current_minus_7 );

		_self.CurrentSelectedRange()[0] = _toady_minus_7;
		_self.CurrentSelectedRange()[1] = _today;

		_self.MarkDisplayCalenderViews();
		return;
	};
	this.OnClick_MonthToDate = function ( vm, ev )
	{	//	console.debug( "OnClick_MonthToDate", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		_self.OnClick_ClearSelectionValues();

		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		let _month_start_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), 1 );
		//	console.debug( "_month_start_date", _month_start_date );

		// new WeekDayViewModel( parent, date, index )
		let _today = new WeekDayViewModel( _self, _self.CurrentDate() );
		let _today_minus_range = new WeekDayViewModel( _self, _month_start_date );

		_self.CurrentSelectedRange()[0] = _today_minus_range;
		_self.CurrentSelectedRange()[1] = _today;

		_self.MarkDisplayCalenderViews();
		return;
	};
	this.OnClick_Minus31 = function ( vm, ev )
	{
		//	console.debug( "OnClick_Minus31", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		_self.OnClick_ClearSelectionValues();

		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		//testing
		//	_self.CurrentDate( new Date( 2018, 10 ) );

		let _month_start_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth() - 1, 1 );
		//	console.debug( "_month_start_date", _month_start_date );

		let _month_end_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), 0 );
		//	console.debug( "_month_start_date", _month_end_date );

		// new WeekDayViewModel( parent, date, index )
		let _begin = new WeekDayViewModel( _self, _month_start_date );
		let _end = new WeekDayViewModel( _self, _month_end_date );

		_self.CurrentSelectedRange()[0] = _begin;
		_self.CurrentSelectedRange()[1] = _end;

		_self.MarkDisplayCalenderViews();

		//	_self.OnClick_GoToPreviousMonth();
		return;
	};
	this.OnClick_QuarterToDate= function ( vm, ev )
	{	//	console.debug( "OnClick_QuarterToDate", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );

		_self.OnClick_ClearSelectionValues();

		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		//	_self.CurrentDate( new Date( 2018, 11, 15 ) );
		//	console.debug( "_self.CurrentDate", _self.CurrentDate() );

		//	testing
		let _year = _self.CurrentDate().getFullYear();
		let _month = _self.CurrentDate().getMonth();
		let _quarter_month = 0;

		//	console.debug( "_year, _month, _quarter_month",_year, _month, _quarter_month );

		if ( _month > 0 && _month < 2 )
		{
			_quarter_month = 0;
		}
		else if ( _month > 2 && _month < 6 )
		{
			_quarter_month = 3;
		}
		else if ( _month > 5 && _month < 9 )
		{
			_quarter_month = 6;
		}
		else if ( _month > 8 && _month < 12 )
		{
			_quarter_month = 9;
		}
		//	console.debug( "_year, _month, _quarter_month",_year, _month, _quarter_month );

		if ( _quarter_month > _month )
		{
			_year--;
		}

		let _start_date = new Date( _year, _quarter_month, 1 );
		//	console.debug( "_start_date", _start_date );

		let _end_date = _self.CurrentDate();
		//	console.debug( "_end_date", _end_date );

		// new WeekDayViewModel( parent, date, index )
		let _begin = new WeekDayViewModel( _self, _start_date );
		let _end = new WeekDayViewModel( _self, _end_date );

		_self.CurrentSelectedRange()[0] = _begin;
		_self.CurrentSelectedRange()[1] = _end;

		_self.MarkDisplayCalenderViews();

		//	_self.OnClick_GoToPreviousMonth();
		return;
	};
	this.OnClick_PreviousThreeMonths= function ( vm, ev )
	{
		//	console.debug( "OnClick_PreviousThreeMonths", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		_self.OnClick_ClearSelectionValues();
		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		//	_self.CurrentDate( new Date( 2018, 11, 15 ) );
		//	console.debug( "_self.CurrentDate", _self.CurrentDate() );

		let _start_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth() - 3, 1 );
		console.debug( "_start_date", _start_date );

		let _end_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), 0 );
		console.debug( "_end_date", _end_date );

		// new WeekDayViewModel( parent, date, index )
		let _begin = new WeekDayViewModel( _self, _start_date );
		let _end = new WeekDayViewModel( _self, _end_date );

		_self.CurrentSelectedRange()[0] = _begin;
		_self.CurrentSelectedRange()[1] = _end;

		_self.MarkDisplayCalenderViews();

		//	_self.OnClick_GoToPreviousMonth();
		return;
	};
	this.OnClick_YearToDate = function ( vm, ev )
	{
		//	console.debug( "OnClick_YearToDate", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		_self.OnClick_ClearSelectionValues();
		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );

		//	_self.CurrentDate( new Date( 2018, 11, 15 ) );
		//	console.debug( "_self.CurrentDate", _self.CurrentDate() );

		let _start_date = new Date( _self.CurrentDate().getFullYear(), 0, 1 );
		//	console.debug( "_start_date", _start_date );

		let _end_date = _self.CurrentDate();	//new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), 0 );
		//	console.debug( "_end_date", _end_date );

		// new WeekDayViewModel( parent, date, index )
		let _begin = new WeekDayViewModel( _self, _start_date );
		let _end = new WeekDayViewModel( _self, _end_date );

		_self.CurrentSelectedRange()[0] = _begin;
		_self.CurrentSelectedRange()[1] = _end;

		_self.MarkDisplayCalenderViews();

		//	_self.OnClick_GoToPreviousMonth();
		return;
	};
	this.OnClick_OneFullYear = function ( vm, ev )
	{
		//	console.debug( "OnClick_YearToDate", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		_self.OnClick_ClearSelectionValues();
		_self.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );
		vm.IsSelected( true );
		//	_self.CurrentDate( new Date( 2018, 11, 15 ) );
		//	console.debug( "_self.CurrentDate", _self.CurrentDate() );

		let _start_date = new Date( _self.CurrentDate().getFullYear() - 1, _self.CurrentDate().getMonth(), _self.CurrentDate().getDate() );
		//c	onsole.debug( "_start_date", _start_date );

		let _end_date = new Date( _self.CurrentDate().getFullYear(), _self.CurrentDate().getMonth(), _self.CurrentDate().getDate() );
		//	console.debug( "_end_date", _end_date );

		// new WeekDayViewModel( parent, date, index )
		let _begin = new WeekDayViewModel( _self, _start_date );
		let _end = new WeekDayViewModel( _self, _end_date );

		_self.CurrentSelectedRange()[0] = _begin;
		_self.CurrentSelectedRange()[1] = _end;

		_self.MarkDisplayCalenderViews();

		//	_self.OnClick_GoToPreviousMonth();
		return;
	};
	this.OnClick_HistoricCustom = function ( vm, ev )
	{
		//	console.debug( "OnClick_YearToDate", _self.CurrentSelectedRange().length, "CurrentDate", _self.CurrentDate() );
		//_self.OnClick_ClearSelectionValues();
		//vm.IsSelected( true );
		//_self.MarkDisplayCalenderViews()
		//	_self.OnClick_GoToPreviousMonth();
		return false;
	};

	//	new RangeButton(text, selected, rangeArray, action )
	this.HistoricButtons = ko.observableArray(
		[
			new RangeButton( "7 D", false, this.OnClick_SevenDay ),
			new RangeButton( "MTD", false, this.OnClick_MonthToDate),
			new RangeButton( "1 M", false, this.OnClick_Minus31 ),
			new RangeButton( "QTD", false, this.OnClick_QuarterToDate ),
			new RangeButton( "3 M", false, this.OnClick_PreviousThreeMonths ),
			new RangeButton( "YTD", false, this.OnClick_YearToDate ),
			new RangeButton( "1 Y", false, this.OnClick_OneFullYear ),
			new RangeButton( "Custom", false, this.OnClick_HistoricCustom ),
		] );
	// forecast buttons events
	this.ForecastButtons = ko.observableArray(
		[
			new RangeButton( "7 D", false, this.OnClick_SevenDay ),
			new RangeButton( "MTD", false, this.OnClick_MonthToDate),
			new RangeButton( "1 M", false, this.OnClick_Minus31 ),
			new RangeButton( "QTD", false, this.OnClick_QuarterToDate ),
			new RangeButton( "3 M", false, this.OnClick_PreviousThreeMonths ),
			new RangeButton( "YTD", false, this.OnClick_YearToDate ),
			new RangeButton( "1 Y", false, this.OnClick_OneFullYear ),
			new RangeButton( "Custom", false, this.OnClick_HistoricCustom ),
		] );

	// Clear, Apply & Cancel buttons
	this.ClearSelectionText = ko.observable( "Clear selection" );
	this.OnClick_ClearSelectionValues = function ( vm, ev )
	{	////	console.debug( "OnClick_ClearSelectionValues", vm, ev );
		this.DisplayedCalenders().forEach( function ( v, i, a )
		{	//	console.debug( i, v.Weeks() );
			v.Weeks().forEach( function ( v2, i2, a2 )
			{	//	console.debug( i2, v2 );
				v2.forEach( function ( v3, i3, a3 )
				{
					v3.IsSelected( false );
					v3.IsRangeBoundary( false );
					return;
				} );
				return;
			} );
			return;
		} );

		this.HistoricButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );

		this.ForecastButtons().forEach( function ( v, i, a )
		{	//	console.debug( i, v.ButtonText(), v.IsSelected() );
			v.IsSelected( false ); 
			return;
		} );

		this.SelectedStartDate( this.CurrentDate() );
		this.SelectedEndDate( this.CurrentDate() );

		this.CurrentSelectedRange( [] );

		this.ResetCalenderView();

		this.MarkDisplayCalenderViews();

		return;
	};

	this.ApplyButtonText = ko.observable( "Apply" );
	this.ApplyButtonIsEnabled = ko.observable( true );
	this.OnClick_Apply = function ( vm, ev )
	{
		console.debug( "OnClick_Apply", vm, ev );
		return;
	};

	this.CancelButtonText = ko.observable( "Cancel" );
	this.CancelButtonIsEnabled = ko.observable( true );
	this.OnClick_Cancel = function ( vm, ev )
	{
		console.debug( "OnClick_Cancel", vm, ev );
		return;
	};

	return;
};

function MonthViewModel( parent, date )
{
	let _self = this;
	this.ID = ko.pureComputed( function () { return "id-" + Math.random().toPrecision( 5 ).replace( ".", "" ); }, this );
	this.Parent = ko.observable( parent );
	this.Month = ko.observable( date );
	this.Date = ko.observable( date );

	// comment for release
	this._weekday_placeholder = ["S","M","T","W","T","F","S"];
	this.Weeks = ko.observableArray( [
		this._weekday_placeholder,
		this._weekday_placeholder,
		this._weekday_placeholder,
		this._weekday_placeholder,
		this._weekday_placeholder,
		this._weekday_placeholder
	] );

	this.Computed_Month = ko.computed( function ()
	{	//	console.debug( "date.getMonth()", date.getMonth() );
		let _rv;
		switch ( date.getMonth() )
		{
			case 0:
				{
					_rv = "January";
					break;
				}
			case 1:
				{
					_rv = "February";
					break;
				}
			case 2:
				{
					_rv = "March";
					break;
				}
			case 3:
				{
					_rv = "April";
					break;
				}
			case 4:
				{
					_rv = "May";
					break;
				}
			case 5:
				{
					_rv = "June";
					break;
				}
			case 6:
				{
					_rv = "July";
					break;
				}
			case 7:
				{
					_rv = "August";
					break;
				}
			case 8:
				{
					_rv = "September";
					break;
				}
			case 9:
				{
					_rv = "October";
					break;
				}
			case 10:
				{
					_rv = "November";
					break;
				}
			case 11:
				{
					_rv = "December";
					break;
				}
			default:
				{
					_rv = "Incorrect Date";
					break;
				}
		}
		//	console.debug( "_rv", _rv );
		return _rv + " " + date.getFullYear();
	}, this );

	this.Computed_Weeks = ko.computed( function ()
	{	//	console.debug( "Computed_Weeks",  date.getMonth() );
		let _begin_month = new Date( date.getFullYear(), date.getMonth(), 1 );
		//	console.debug( "_begin_month", _begin_month );

		let _all_days = [];
		for ( let i = 0; i < 42; i++ )
		{
			let _day = new Date( date.getFullYear(), date.getMonth(), i - _begin_month.getDay()  + 1);
			//	console.debug( i, "_day", _day );
			let _new_date = new WeekDayViewModel( _self, _day, i );
			//	console.debug( "match day to month", _day.getMonth(), date.getMonth() );

			if ( _day.getMonth() === date.getMonth() )
			{
				_new_date.IsInMonth( true );
			}

			_all_days.push( _new_date );
		}
		//	console.debug( "_all_days", _all_days );

		let _weeks = [];
		for ( let i = 0; i < 6; i++ )
		{
			//	console.debug( i );
			let _week = _all_days.filter( function ( item )
			{
				//	console.debug( "filter", i, item.Index() );
				let _start = ( i * 7 ) - 1;
				let _end = ( i * 7 ) + 7;
				//	console.debug( i, item.Index(), _start, _end );
				return ( item.Index() > _start && item.Index() < _end );
			}, i );
			_weeks.push( _week );
		}

		_self.Weeks(_weeks);
		return;
	}, this );

	return;
};

function WeekDayViewModel( parent, date, index )
{
	this.DatePicker = ko.observable( parent.Parent() );
	this.Month = ko.observable( parent );
	this.Index = ko.observable( index );
	this.Date = ko.observable( date );
	this.Day = ko.observable( date.getDate() );
	this.IsInMonth = ko.observable( false );
	this.IsSelected = ko.observable( false );
	this.IsRangeBoundary = ko.observable( false );
	this.IsToday = ko.computed( function ()
	{
		//	console.debug( "this.IsToday", this.Date().getDate(), new Date().getDate() );
		if (
			this.Date().getFullYear() == new Date().getFullYear()
			&& this.Date().getMonth() == new Date().getMonth()
			&& this.Date().getDate() == new Date().getDate()
		)
		{
			return true;
		}
		else return false;
	}, this );
	return;
}

function RangeButton(text, selected, action )
{
	this.ButtonText = ko.observable(text ||  "button text");
	this.IsSelected = ko.observable( selected || false );
	this.ActionFilter = action;
	return;
}