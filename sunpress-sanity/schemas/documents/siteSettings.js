export default {
	name: 'siteSettings',
	title: 'Global Site Settings',
	type: 'document',
	fields: [
		{
			name: 'siteName',
			type: 'string',
			title: 'Site Name'
		},
		{
			name: 'siteDescription',
			type: 'string',
			title: 'Site Description'
		},
		{
			name: 'logo',
			type: 'figure'
		},
		{
			name: 'telephone',
			type: 'string',
			title: 'Phone Number',
			validation: (Rule) =>
				Rule.required()
					.regex(/^\+\d{11}$/)
					.error(
						`Phone number must start with '+1' and include area code, with no spaces or non-digit characters`
					)
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
			type: 'url',
			name: 'hasMap',
			title: 'Google Maps Link'
		},
		{
			type: 'urlArray',
			name: 'sameAs',
			title: 'Add URLs for this business on other platforms (Yelp, Facebook, etc.)'
		},
		{
			type: 'stringArray',
			name: 'servesCuisine',
			title: 'Add keywords to describe the types of cuisine your restaurant serves'
		},
		{
			name: 'openingHours',
			type: 'array',
			title: 'Hours of Operation',
			initialValue: [
				{
					name: 'monday',
					type: 'object',
					title: 'Monday Hours',
					fields: [
						{
							name: 'day',
							type: 'string',
							initialValue: 'Monday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Tuesday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Wednesday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Thursday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Friday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Saturday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Sunday',
							readOnly: true
						},
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
			],
			of: [
				{
					name: 'monday',
					type: 'object',
					title: 'Monday Hours',
					fields: [
						{
							name: 'day',
							type: 'string',
							initialValue: 'Monday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Tuesday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Wednesday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Thursday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Friday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Saturday',
							readOnly: true
						},
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
							name: 'day',
							type: 'string',
							initialValue: 'Sunday',
							readOnly: true
						},
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
