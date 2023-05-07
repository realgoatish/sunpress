import { createDayHours } from '../js/createDayHours';

export default {
	name: 'seoLocalBusiness',
	type: 'object',
	title: 'Organization SEO',
	fields: [
		{
			name: 'name',
			title: 'Name',
			description: 'Business Name',
			type: 'string'
		},
		{
			name: 'description',
			title: 'Description',
			description: 'Business Description',
			type: 'string'
		},
		{
			name: 'url',
			title: 'URL',
			description: 'Business website URL',
			type: 'url'
		},
		{
			name: 'logo',
			title: 'Logo',
			description: 'Business Logo',
			type: 'figure'
		},
		{
			// process this in query into an array of 16x9, 4x3 & 1x1 aspect ratio versions
			name: 'businessImage',
			title: 'Image of Business',
			type: 'figure'
		},
		{
			name: 'sameAs',
			title: 'Same As',
			description: 'Social Media Profiles & Other Websites Representing Business',
			type: 'urlArray'
		},
		{
			type: 'stringArray',
			name: 'servesCuisine',
			title: 'Add keywords to describe the types of cuisine your restaurant serves'
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
			type: 'address'
		},
		{
			name: 'geo',
			title: 'Location',
			type: 'geopoint'
		},
		{
			name: 'openingHours',
			type: 'array',
			title: 'Hours of Operation',
			initialValue: [
				createDayHours('Monday'),
				createDayHours('Tuesday'),
				createDayHours('Wednesday'),
				createDayHours('Thursday'),
				createDayHours('Friday'),
				createDayHours('Saturday'),
				createDayHours('Sunday')
			],
			of: [
				createDayHours('Monday'),
				createDayHours('Tuesday'),
				createDayHours('Wednesday'),
				createDayHours('Thursday'),
				createDayHours('Friday'),
				createDayHours('Saturday'),
				createDayHours('Sunday')
			]
		}
	]
};
