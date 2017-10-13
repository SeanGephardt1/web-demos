/// <reference path="../script/jquery/jquery-2.1.4.js" />
/// <reference path="../script/ko/knockout-3.3.0.js" />
/// http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp

/* Main */
"use strict";
( function ()
{
    try
    {
        console.info( "BEGIN - Async Demo 1." );

        window.data_index = [
            { "filename": "data/level2/secure/secure-data.json", "data": [] },
            { "filename": "data-01.json", "data": [] },
            { "filename": "data-02.json", "data": [] },
            { "filename": "data-03.json", "data": [] },
        ];
		window.data_array = [];

		window.document.addEventListener("DOMContentLoaded", function (ev)
		{	//	
		    console.log("window.document.DOMContentLoaded", ev);

		    for (var i = 0; i < window.data_index.length; i++)
		    {   //  console.log("BEFORE: ", window.data_index[i]);
		        FetchJsonDataFile(window.data_index[i]);
		    }

		    window.div_array = GetDivArrayCollection(); // console.log(div_array[div_array.length-1].id);

		    DisplayDiv(1, 3000, window.data_index[0], window.div_array[0]);
		    DisplayDiv(2, 6000, window.data_index[1], window.div_array[1]);
		    DisplayDiv(3, 9000, window.data_index[2], window.div_array[2]);
		    DisplayDiv(3, 12000, window.data_index[3], window.div_array[3]);
		    return;
		});

	}
	catch ( ex )
	{
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
	    console.info("  END - Async Demo 1.");
	}
	return;
})();

// get the div references from the HTML
function GetDivArrayCollection()
{
    console.log("GetDivArrayCollection");
    return [
        document.getElementById("demo_id_1"),
        document.getElementById("demo_id_2"),
        document.getElementById("demo_id_3"),
        document.getElementById("demo_id_4"),
    ];

}

// Fetch the file, based on name
// in the same folder, but name could be a longer path
function FetchJsonDataFile(json)
{   //  console.log("FetchJsonDataFile: ", json.filename);
    var return_data = undefined;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", json.filename, false);
    xmlHttp.setRequestHeader("Content-type", "application/json");
   //    xmlHttp.setRequestHeader("Content-length",100000);
   //   xmlHttp.setRequestHeader("Connection", "close");
    xmlHttp.onerror = function (args)
    {
        console.log("xmlhttp.onerror - contact system admin");
        return;
    };
    xmlHttp.onreadystatechange = function (args)
    {   //  console.log("xmlHttp.onreadystatechange", this.readyState, this.status);
        if (this.readyState === 4 && this.status == "200")
        {   //  console.log(this.readyState, typeof this.responseText);
            json.data = JSON.parse(this.responseText);
            //  console.log(json.data);
        }
        return;
    }
    xmlHttp.send();

    return json;
}

// display the loaded divs based on preset timeout values
function DisplayDiv(int_case, int_time, int_data, int_div)
{
    window.setTimeout(function ()
    {   //  console.log("DisplayDiv::window.SetTimeout: ", int_time);
        int_div.innerText = JSON.stringify(int_data);
        return;
    }, int_time);
}