"use strict";
var _demo_data = [
	{
        ID: "abc-123-def-456",
	    Name: "SuperWindowsMachine-2017-001",
	    State: "online", // "offline", "rebooting"
        IP: "191.100.121.11",
        Status: "normal", // "critical"
        Services:
        [
            { Name: "CCComExec", Active: false, Status: "running" },
            { Name: "Windows Search", Active: true, Status: "running" },
            { Name: "Remote Registry", Active: false, Status: "stopped" },
            { Name: "Net/TCP Sharing", Active: false, Status: "running" },
            { Name: "Defrag", Active: false, Status: "running" },
            { Name: "Intel V-Hardware Monitor", Active: false, Status: "running" },
            { Name: "Group Policy", Active: false, Status: "running" },
            { Name: "Remote Desktop Service", Active: false, Status: "running" },
            { Name: "Windows Update Service", Active: false, Status: "running" },
        ],
	},
];

var _logic_data = [
	{ key: "Equal to", value: "=" },
	{ key: "Not equal to", value: "!=" },
	{ key: "Greater than", value: ">" },
	{ key: "Greater or equals", value: "≥" },
	{ key: "Less than", value: "<" },
	{ key: "Less than or equals", value: "≤" }
];