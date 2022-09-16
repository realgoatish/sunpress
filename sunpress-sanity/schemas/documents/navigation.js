export default {
	name: 'navigation',
	title: 'Navigation',
	type: 'document',
	fields: [
		{
			name: 'navigationId',
			type: 'slug',
			title: 'Navigation ID (must be unique)'
		},
		{
			name: 'title',
			type: 'string',
			title: 'Title'
		},
		{
			name: 'description',
			type: 'string',
			title: 'Short Description'
		},
		{
			name: 'items',
			type: 'array',
			title: 'Navigation Items',
			of: [
				{
					type: 'navigationItem'
				}
			]
		}
	]
};
