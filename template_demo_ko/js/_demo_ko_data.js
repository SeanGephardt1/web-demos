"use strict";
var _data = [
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