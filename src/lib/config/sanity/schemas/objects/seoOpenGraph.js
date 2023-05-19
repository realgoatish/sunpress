export default {
	name: 'seoOpenGraph',
	type: 'object',
	title: 'OpenGraph Metadata',
	description: 'For Thumbnail Presentation on Social Media, iMessage, etc.',
	fields: [
		{
			name: 'title',
			title: 'Title',
			description: 'Page Title',
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
			name: 'ogImage',
			title: 'OG Image',
			description: 'Sharing Thumbnail Image(s)',
			type: 'figure'
		}
		// {
		// 	name: 'locale',
		// 	title: 'Locale',
		// 	description:
		// 		'The locale the open graph tags are marked up in. Of the format language_TERRITORY. Default is en_US.',
		// 	type: 'string',
		// 	initialValue: 'en_US'
		// },
		// {
		// 	name: 'siteName',
		// 	title: 'Site Name',
		// 	type: 'string'
		// }
	]
};
