export default {
	name: 'address',
	type: 'object',
	title: 'Address',
	fields: [
		{
			name: 'addressCountry',
			title: 'Country',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((name) => {
					if (typeof name === 'undefined') {
						return true;
					}

					return name.length === 2
						? true
						: 'Please enter the 2-letter ISO 3166-1 alpha-2 country code';
				}).warning()
		},
		{
			name: 'addressLocality',
			title: 'City',
			type: 'string'
		},
		{
			name: 'addressRegion',
			title: 'State or Province, if applicable',
			type: 'string'
		},
		{
			name: 'postalCode',
			title: 'Postal or zip code',
			type: 'string'
		},
		{
			name: 'streetAddress',
			title: 'Street number, street name, and unit number',
			type: 'string'
		}
	]
};
