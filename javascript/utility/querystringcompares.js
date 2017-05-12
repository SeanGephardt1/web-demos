    // CHECK FEATUREFLAGS PARAM
    //  Query String parameters to be passed to demo app
    //  these are compared to string values from the query string
    //  "default.html#testing?ds=1&load=1000&amp;multi=true&amp;expand=true&hide=true"
    //  "?ds=1&load=1000&multi=true&expand=true&hide=true"
    //  "DataSetSize" - ds=1 - 1 == large, 0 or other = small, defaults to 0
    //  "LoadingTime" - load=[0-4], value is index of preset array index in main viewmodel
    //  "MultiSelect" - multi=true|false
    //  "ExplandTree" - expand=true|false
    //  "HideCheckboxes" - hide = true|false
function QueryStringParams()
    {
        return {
            ds: "",
            load: "",
            multi: "",
            expand: "",
            hide: ""
        };
    }
    function ObjectCompare( obj1, obj2 )
    {
        //Loop through properties in object 1
        for ( var p in obj1 )
        {
            //Check property exists on both objects
            if ( obj1.hasOwnProperty( p ) !== obj2.hasOwnProperty( p ) ) return false;

            switch ( typeof ( obj1[p] ) )
            {
                //Deep compare objects
                case 'object':
                    if ( !Object.compare( obj1[p], obj2[p] ) ) return false;
                    break;
                    //Compare function code
                case 'function':
                    if ( typeof ( obj2[p] ) == 'undefined' || ( p != 'compare' && obj1[p].toString() != obj2[p].toString() ) ) return false;
                    break;
                    //Compare values
                default:
                    if ( obj1[p] != obj2[p] ) return false;
            }
        }
        //Check object 2 for any extra properties
        for ( var p in obj2 )
        {
            if ( typeof ( obj1[p] ) == 'undefined' ) return false;
        }
        return true;
    };

        function Parse_QueryStringFeatures()
    {   //  console.debug( "Parse_QueryStringFeatures" );
        var _return_value = new QueryStringParams();
        var _temp_rv = new QueryStringParams();

        var _split = window.location.href.split( "?" );

        if ( _split.length > 1 )
        {
            var _temp = _split[1].replace( /&amp;/gi, "&" ); //  console.debug( "_temp", _temp );

            var _params = _temp.split( "&" );  //  console.debug( "_params", _params);

            if ( _params.length > 0 )
            {
                _params.forEach( function ( v, i, a )
                {   //      console.debug( i, v );
                    var _key_value = v.split( "=" );

                    for ( var key in _return_value )
                    {   //  console.debug( i, "key=", key, "value=", _return_value[key], "_key_value[0]", _key_value[0], "_key_value[1]", _key_value[1] );
                        if ( _key_value[0] == key )
                        {
                            _return_value[key] = _key_value[1];
                            break;
                        }
                    }
                    return;
                } );
            }
        }

        if ( ObjectCompare( _return_value, _temp_rv ) == true )
        {
            _return_value = null;
        }
        return _return_value;
    }