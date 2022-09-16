export default {
	name: 'link',
	type: 'object',
	title: 'Link',
	fields: [
		{
			title: 'Internal Link',
			name: 'internalLink',
			description: 'Select pages for navigation',
			type: 'reference',
			to: [{ type: 'page' }]
		},
		{
			name: 'externalUrl',
			title: 'External URL',
			description: 'Use fully qualified URLs for external link',
			// changed this from type: url so we can do mailto: and tel: links
			// TODO there needs to be a better solution to this for clients
			type: 'string'
		}
	]
};
