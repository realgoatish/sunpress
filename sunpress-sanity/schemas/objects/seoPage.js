export default {
	name: 'seoPage',
	type: 'object',
	title: 'Page SEO',
	fields: [
		{
			name: 'title',
			title: 'Title',
			description: 'Page Name',
			type: 'string'
		},
		{
			name: 'description',
			title: 'Description',
			description: 'Page Description',
			type: 'string'
		},
		// {
		// 	name: 'url',
		// 	title: 'URL',
		// 	description: 'Web Page URL',
		// 	type: 'url'
		// },
		{
			name: 'noindex',
			title: 'Noindex?',
			description: 'Sets whether page should be indexed in search engines or not',
			type: 'boolean',
			initialValue: false
		},
		{
			name: 'nofollow',
			title: 'Nofollow?',
			description: 'Sets whether page should be followed or not',
			type: 'boolean',
			initialValue: false
		},
		{
			name: 'openGraph',
			type: 'seoOpenGraph'
		}
	]
};
