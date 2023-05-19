export default {
	name: 'richText',
	title: 'Rich Text Block',
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'H5', value: 'h5' },
				{ title: 'H6', value: 'h6' }
			]
		},
		{
			type: 'figure'
		},
		{
			type: 'reference',
			name: 'navigationReference',
			to: [{ type: 'navigation' }]
		},
		{
			type: 'reference',
			name: 'menuSectionReference',
			to: [{ type: 'menuSection' }]
		}
	]
};
