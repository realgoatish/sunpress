export default {
	name: 'navigationItem',
	title: 'Navigation Item',
	type: 'object',
	fields: [
		{
			name: 'text',
			type: 'string',
			title: 'Navigation Text'
		},
		{
			name: 'description',
			type: 'text',
			title: 'Short Description Of The Resource'
		},
		{
			name: 'navigationItemUrl',
			type: 'link',
			title: 'Navigation Item URL'
		}
	]
};
