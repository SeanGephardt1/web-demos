/// <reference path="../../script/knockout-3.3.0.js" />

"use strict";
function UserLoginViewModel( json )
{
	//	console.log( "UserLoginViewModel", json );
	/* const */
	var _self = this;

	var _demo_title = "AJAX User Login Demo using KnockOut.js ViewModel";
	var _instruct = "Enter your user name and password";
	var _saved_label = "Save My Login Info";
	var _send_button_text = "Log Me in";
	var _logout_text = "Log Me Out";
	var _clear_data_text = "Clear Data";

	this._ws_url = "http://localhost:18258/services/login-service.asmx/ValidateCredentials";
	this._local_storage_key = "ajax-demo-0001";

	/* variables */
	this.ViewModelName = ko.observable( _demo_title );
	this.SubTitle = ko.observable( _instruct );
	this.SaveLoginLabel = ko.observable( _saved_label );
	this.SubmitButtonLabel = ko.observable( _send_button_text );
	this.LogOutLabel = ko.observable( _logout_text );
	this.ClearDataLabel = ko.observable(_clear_data_text);

	this.UserID = ko.observable("");
	this.UserName = ko.observable( "" );
	this.UserName.subscribe( CheckUserInput );
	this.UserPassword = ko.observable( "" );
	this.UserPassword.subscribe( CheckUserInput );
	this.UserDataSaved = ko.observable( false );
	this.UserLoggedIn = ko.observable( false );
	this.SubmitButtonDisabled = ko.observable( true );
	this.IsFormVisible = ko.observable( true );
	this.IsFormSubmitted = ko.observable( false );

	/* Utility functions */
	this.SubmitCredentials = function(data,event)
	{
		_self.SendCredentials();
		_self.SetLocalCredentials();
		return;
	};

	this.SendCredentials = function ( )
	{
		//	console.log( "SendCredentials", _self.UserName(), _self.UserPassword(), _self.UserID(), _self.UserDataSaved() );
		var _data = "{ name: \"" + _self.UserName() + "\", password: \"" + _self.UserPassword() + "\", id: \"" + _self.UserID() + "\", saved: \"" + _self.UserDataSaved() + "\"}";
		//	console.log( _data );
		var _raw = "{ 'creds' : \'" + _data + "\' }";
		//	console.log( _raw );

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", this._ws_url, false );
		xmlHttp.setRequestHeader( "Content-type", "application/json" );
		xmlHttp.setRequestHeader( "Content-length", _raw.length );
		xmlHttp.setRequestHeader( "Connection", "close" );
		xmlHttp.onerror = function ( args )
		{
			console.log( "xmlhttp.onerror - contact system admin" );
			return;
		};
		xmlHttp.onreadystatechange = function ( args )
		{
			//	console.log("SendCredentials", this.readyState, this.status );
			if ( this.readyState === 4 && this.status == "200" )
			{	//	console.log( this.readyState, this.responseText );
				var _response = JSON.parse( this.responseText );
				//	console.log( _response.d );
				if ( _response.d !== undefined )
				{	//	console.log( "success!" );
					var _creds = JSON.parse( _response.d );
					//	console.log( "_creds", _creds );
					_self.UserID( _creds["ID"] );
					_self.UserName( _creds["Name"] );
					_self.UserPassword( _creds["Password"] );
					_self.UserDataSaved( _creds["Saved"] );
					_self.UserLoggedIn( _creds["Authenticated"] );
					//	console.log("UserLoggedIn", _self.UserLoggedIn());
					return;
				}
			}
			return;
		}
		xmlHttp.send( _raw );
		return;
	}

	this.ReadCredentials = function ()
	{
		var _local_store = window.localStorage.getItem( _self._local_storage_key );
		//	console.log( "ReadCredentials::_local_store", _local_store );

		if ( _local_store != null && _local_store !== "" )
		{
			var _json = JSON.parse( window.localStorage.getItem( _self._local_storage_key ) );
			//	console.log( "_json", JSON.stringify( _json ) );

			if ( _json["Saved"] == "true" )
			{
				_self.UserID( _json["ID"] );
				_self.UserName( _json["Name"] );
				_self.UserPassword( _json["Password"] );
				_self.UserDataSaved( _json["Saved"] );
				_self.UserLoggedIn( _json["Authenticated"] );
				_self.SetLocalCredentials();
			}
			else
			{
				_self.ClearUserData();
			}
		}
		else
		{
			_self.ClearUserData();
		}
		return;
	};

	this.SetLocalCredentials = function ()
	{
		var _saved_json = {
			"ID": _self.UserID(),
			"Name": _self.UserName(),
			"Password": _self.UserPassword(),
			"Authenticated": _self.UserLoggedIn(),
			"Saved": _self.UserDataSaved()
		};
		//	console.log( "_saved_json", _saved_json );
		window.localStorage.setItem(_self._local_storage_key, JSON.stringify(_saved_json));
		//	console.log("window.localStorage.setItem(_self._local_storage_key", window.localStorage.getItem(_self._local_storage_key));
		//	console.log( "this.SetLocaleCredentials - UserLoggedIn",_self.UserLoggedIn() );
		if ( _self.UserLoggedIn() == "true")
		{
			_self.SubmitButtonDisabled( true );
			_self.IsFormVisible( false );
			_self.IsFormSubmitted( true );
		}
		else 
		{
			_self.SubmitButtonDisabled( false );
			_self.IsFormVisible( true );
			_self.IsFormSubmitted( false );
		}
		return;
	}

	this.UserLogOut = function ()
	{
		_self.UserLoggedIn("false");
		this.SetLocalCredentials();
		return;
	}

	this.ClearUserData = function ()
	{
		_self.UserID( "" );
		_self.UserName( "" );
		_self.UserPassword( "" );
		_self.UserDataSaved( false);
		_self.UserLoggedIn( "false" );
		_self.SetLocalCredentials();
		return;
	};

	function CheckUserInput( newValue )
	{
		//	console.log( "this.UserName.subscribe", newValue );
		if ( _self.UserName().length > 0 && _self.UserPassword().length > 0 )
		{
			_self.SubmitButtonDisabled( false );
		}
		else
		{
			_self.SubmitButtonDisabled( true );
		}
		//	console.log( "_self.SubmitButtonDisabled ", _self.SubmitButtonDisabled() );
		return;
	};

	/* Start */
	this.ReadCredentials();
	return;
}