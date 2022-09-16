export default {
	name: 'siteSettings',
	type: 'document',
	__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
	title: 'Global Site Settings',
	fields: [
		{
			name: 'title',
			type: 'string',
			title: 'Site Name'
		},
		{
			name: 'description',
			type: 'string',
			title: 'Site Description'
		},
		{
			name: 'logo',
			type: 'figure'
		},
		{
			name: 'address',
			type: 'object',
			title: 'Address',
			fields: [
				{
					name: 'streetAddress',
					type: 'string',
					title: 'Street Address'
				},
				{
					name: 'city',
					type: 'string',
					title: 'City'
				},
				{
					name: 'state',
					type: 'string',
					title: 'State',
					initialValue: 'NJ'
				},
				{
					name: 'zip',
					type: 'string',
					title: 'Zip Code'
				}
			]
		},
		{
			name: 'openingHours',
			type: 'object',
			title: 'Hours of Operation',
			fields: [
				{
					name: 'monday',
					type: 'object',
					title: 'Monday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'tuesday',
					type: 'object',
					title: 'Tuesday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'wednesday',
					type: 'object',
					title: 'Wednesday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'thursday',
					type: 'object',
					title: 'Thursday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'friday',
					type: 'object',
					title: 'Friday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'saturday',
					type: 'object',
					title: 'Saturday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				},
				{
					name: 'sunday',
					type: 'object',
					title: 'Sunday Hours',
					fields: [
						{
							name: 'opens',
							type: 'militaryTime'
						},
						{
							name: 'closes',
							type: 'militaryTime'
						}
					]
				}
			]
		},
		{
			name: 'navigationSections',
			type: 'array',
			of: [
				{
					type: 'reference',
					name: 'navigationReference',
					to: [{ type: 'navigation' }]
				}
			]
		}
	]
};
