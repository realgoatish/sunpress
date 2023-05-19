import { slugWithType } from '../js/createSlugs';

export default {
	name: 'page',
	type: 'document',
	title: 'Page',
	fields: [
		{
			name: 'menu',
			type: 'boolean',
			title: 'Menu page?',
			initialValue: false,
			validation: (Rule) =>
				Rule.custom((thisFieldValue, context) => {
					if (typeof thisFieldValue === 'undefined') {
						return true;
					}

					if (thisFieldValue && context.document.home == true) {
						return 'Menu Page cannot be selected if Home Page is also selected. Please choose one or neither';
					}

					return true;
				})
		},
		{
			name: 'home',
			type: 'boolean',
			title: 'Home page?',
			initialValue: false,
			validation: (Rule) =>
				Rule.custom((thisFieldValue, context) => {
					if (typeof thisFieldValue === 'undefined') {
						return true;
					}

					if (thisFieldValue && context.document.menu == true) {
						return 'Home Page cannot be selected if Menu Page is also selected. Please choose one or neither';
					}

					return true;
				})
		},
		{
			name: 'webPageSeo',
			title: 'Page SEO Data',
			description:
				'Data about this page for search results and thumbnail presentation when you share links to the page on e.g. social media. This data does not effect anything visible on the page',
			type: 'seoPage'
		},
		{
			name: 'title',
			type: 'string',
			title: 'Title'
		},
		{
			name: 'description',
			type: 'string',
			title: 'Short Page Description'
		},
		// {
		// 	type: 'figure',
		// 	name: 'figure',
		// 	title: 'Image'
		// },
		// need to edit createSlugs.js so the properties it looks for are ones you have on your Pages
		// before you can uncomment this
		slugWithType(),
		{
			name: 'body',
			type: 'richText',
			title: 'Body Text'
		}
	]
};
