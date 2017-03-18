"use strict";
var _filter_data = [
	{
		key: 'Type',
		values: [
			'Perf',
			'SecurityEvent',
			'WindowsFirewall',
			'ServiceFabricOperationalEvent',
			'Syslog',
			'Event',
			'Heartbeat',
			'AzureActivity',
			'ProtectionStatus',
			'Alert',
			'Usage',
			'Update',
			'SecurityBaseline',
			'ConfigurationChange',
			'ServiceFabricReliableServiceEvent',
			'ComputerGroup',
			'ServiceFabricReliableActorEvent',
			'Operation',
			'SecurityBaselineSummary',
			'UpdateSummary']
	},
	{
		key: 'Computer',
		values: [
			'chi_SQL08_02',
			'chi_SQL08_03',
			'chi_SQL08_04',
			'chi_SQL08_05',
			'chi_SQL08_06',
			'chi_SQL08_07',
			'chi_SQL08_08',
			'chi_SQL12_01',
			'chi_SQL12_02',
			'chi_SQL12_03',
			'chi_SQL12_04',
			'chi_WS08R2_01',
			'chi_WS08R2_02',
			'chi_WS08R2_03',
			'chi_WS08R2_04',
			'chi_WS12_01',
			'chi_WS12_02',
			'sea_SQL08_01',
			'sea_SQL08_02',
			'sea_SQL08_03',
			'sea_SQL08_04',
			'sea_SQL08_05',
			'sea_SQL08_06',
			'sea_SQL12_01',
			'sea_SQL12_02',
			'sea_SQL12_03',
			'sea_SQL12_04',
			'sea_WS08R2_01',
			'sea_WS08R2_02',
			'sea_WS08R2_03',
			'sea_WS08R2_04',
			'sea_WS12_01',
			'sea_WS12_02'
		]
	},
	{
		key: 'ManagementGroupName',
		values: [
			'region_seattle',
			'region_chicago',
			'os_SQLS_2008',
			'os_SQLS_2008_R2',
			'os_SQLS_2012',
			'os_SQLS_2014',
			'os_Win_7',
			'os_Win_8',
			'os_Win_8_1',
			'os_Win_XP',
			'os_WS_2003',
			'os_WS_2003_R2',
			'os_WS_2008',
			'os_WS_2008_R2',
			'os_WS_2012',
			'os_WS_2012_R2'
		]
	},
	{
		key: 'SourceSystem',
		values: [
			'OpsManager',
			'AzureStorage',
			'Linux',
			'Azure',
			'OMS',
			'OMSAudit',
			'RestAPI'
		]
	},
	{
		key: 'CounterName',
		values: [
			'% Processor Time',
			'Working Set',
			'Used Memory kBytes',
			'% Free Space',
			'Used Memory',
			'% Idle Time',
			'% User Time',
			'Avg. Disk Bytes/Read',
			'% Disk Time',
			'Disk Writes/sec',
			'Disk Transfers/sec',
			'Current Disk Queue Length',
			'Disk Reads/sec',
			'% DPC Time',
			'% Free Inodes',
			'Physical Disk Bytes/sec',
			'% Nice Time',
			'Processor Queue Length',
			'Page Faults/sec',
			'% Committed Bytes In Use',
			'Page Reads/sec',
			'Available MBytes',
			'Thread Count',
			'Available MBytes Swap',
			'Used MBytes Swap Space'
		]
	},
	{
		key: 'CounterValue',
		values: ['16', '32', '64', '128','256','512','1024']
	},
	{
		key: 'EventID',
		values: ['1000', '1002', '1004', '1005','1007','1009','1011','1013','1015','1017']
	},
	{
		key: 'Level',
		values: ['0','1','2','3','4','5','6','7','8','9']
	},
	{
		key: 'AlertSeverity',
		values: [
			'critical',
			'informational'
		]
	},
	{
		key: 'EventLevelName',
		values: [
			'information',
			'error',
			'success',
			'warning'
		]
	},
	{
		key: 'SeverityLevel',
		values: [
			'warning',
			'info',
			'notice',
			'alert',
			'error'
		]
	}
];

var _logic_data = [
	{ key: "Equal to", value: ["="] },
	{ key: "Not equal to", value: ["!="] },
	{ key: "Greater than", value: [">"] },
	{ key: "Greater or equals", value: ["≥"] },
	{ key: "Less than", value: ["<"] },
	{ key: "Less than or equals", value: ["≤"] }
];

var _function_data = [
	{
		key: "count",
		values: []
	},
	{
		key: "min",
		values: ["Counter Value", "Severity"]
	},
	{

		key: "max",
		values: ["Counter Value", "Severity"]
	},
	{
		key: "avg",
		values: [ "Counter Value", "Severity"]
		//	values: [ "10%","25%","50%","75%","95%","100%"]
	},
	{
		key: "stddev",
		values: []
	},
	{
		key: "percentile",
		values: ["10%", "25%", "50%", "75%", "95%", "100%"]
	},
];

var _function_object_data = [
	{
		key: "Computer",
		values: []
	},
	{
		key: "Event Category",
		values: []
	},
	{
		key: "EventID",
		values: []
	},
	{
		key: "EventLevelName",
		values: []
	},
	{
		key: "EventLog",
		values: []
	},
	{
		key: "EventLevel",
		values: []
	},
	{
		key: "Source",
		values: []
	},
	{
		key: "Source",
		values: []
	},

];

var _visualization_data = [
	{
	    key: "List",
	    shortKey: "List",
	    //icon: "img/list_chart.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><rect x="5" y="7" width="8" height="8"/><rect x="5" y="21" width="8" height="8"/><rect x="5" y="35" width="8" height="8"/><rect x="19" y="9" width="26" height="4"/><rect x="19" y="23" width="26" height="4"/><rect x="19" y="37" width="26" height="4"/></svg>',
        result_image: "results/list.jpg",
        values: [ "No interval"]
	},
	{
	    key: "Line chart",
	    shortKey: "Line",
	    //icon: "img/line_chart.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><polygon points="14,29.707 3.5,40.207 -0.207,36.5 14,22.293 26,34.293 42,18.293 45.707,22 26,41.707 "/><polygon points="49,15 34,15 49,30 "/></svg>',
	    result_image: "results/line.jpg",
	    values: [
            "Auto interval",
            "One hour",
            "Two hours",
            "Six hours",
            "One day",
            //"One week",
            //"Two weeks",
            //"Custom"
	    ]
	},
	{   // needs a better chart
	    key: "Horiz. bar chart",
	    shortKey: "H-bar",
	    //icon: "img/horiz_bar_chart.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><rect x="2" y="8" width="16" height="6"/><rect x="2" y="28" width="24" height="6"/><rect x="2" y="38" width="46" height="6"/><rect x="2" y="18" width="32" height="6"/></svg>',
	    result_image: "results/hbar-chart.jpg",
	    values: [
            "No interval selected",
            "One hour",
            "Two hours",
            "Six hours",
            "One day",
            //"One week",
            //"Two weeks",
            //"Custom"
	    ]
	},
	{  // needs a better chart
	    key: "Stacked bar chart",
	    shortKey: "S-bar",
	    //icon: "img/vert_bar_chart.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><rect x="2" y="37" transform="matrix(6.123234e-17 -1 1 6.123234e-17 -30 50)" width="16" height="6"/><rect x="18" y="33" transform="matrix(6.123234e-17 -1 1 6.123234e-17 -6 66)" width="24" height="6"/><rect x="17" y="22" transform="matrix(6.123234e-17 -1 1 6.123234e-17 15 65)" width="46" height="6"/><rect x="4" y="29" transform="matrix(6.123234e-17 -1 1 6.123234e-17 -12 52)" width="32" height="6"/></svg>',
	    result_image: "results/stacked.jpg",
	    values: [
            "Auto interval",
            "One hour",
            "Two hours",
            "Six hours",
            "One day",
            //"One week",
            //"Two weeks",
            //"Custom"
	    ]
	},
	{
	    key: "Table",
	    shortKey: "Table",
	    //icon: "img/table.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><rect x="2" y="13" width="21" height="12"/><rect x="26" y="13" width="21" height="12"/><rect x="2" y="28" width="21" height="11"/><rect x="26" y="28" width="21" height="11"/></svg>',
	    result_image: "results/table.jpg",
	    values: [
            "No interval selected",
            "One hour",
            "Two hours",
            "Six hours",
            "One day",
            //"One week",
            //"Two weeks",
            //"Custom"
	    ] 
	},
	{
	    key: "Donut chart",
	    shortKey: "Donut",
	    //icon: "img/donut_chart.svg",
	    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" fill="rgba(0, 160, 32,1)"><path d="M23,10.545c-6.459,0.837-11.568,5.909-12.46,12.351H2.091C3.054,11.81,11.898,3.004,23,2.1V10.545z"/><path d="M39.209,22.896C38.329,16.537,33.341,11.507,27,10.574V2.122c10.984,1.015,19.703,9.771,20.659,20.774H39.209z"/><path d="M32.489,46.493c-2.382,0.841-4.944,1.303-7.614,1.303c-11.973,0-21.793-9.19-22.807-20.9h8.475 c0.977,7.058,7.006,12.5,14.333,12.5c1.402,0,2.751-0.211,4.031-0.586L32.489,46.493z"/><path d="M36.344,44.704l-3.579-7.675c3.437-2.241,5.868-5.883,6.454-10.133h8.453C47.012,34.514,42.628,41.057,36.344,44.704z"/></svg>',
	    result_image: "results/donut.jpg",
	    values: ["No interval"]
	}
];