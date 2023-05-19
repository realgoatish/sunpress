export default {
	name: 'menuItem',
	type: 'document',
	title: 'Menu Item',
	fields: [
		{
			name: 'menuItemId',
			type: 'slug',
			title: 'Menu Item ID (must be unique)'
		},
		{
			// TODO this name needs to go away so you can
			name: 'figure',
			type: 'figure'
		},
		{
			name: 'title',
			type: 'string',
			title: 'Item Name'
		},
		{
			name: 'price',
			type: 'string',
			title: 'Price'
		},
		{
			name: 'description',
			type: 'text',
			title: 'Description'
		},
		{
			name: 'mods',
			type: 'array',
			title: 'Item Modifiers',
			of: [
				{
					type: 'reference',
					name: 'menuItemModReference',
					to: [{ type: 'menuItemMod' }]
				}
			]
		}

		// {
		// 	name: 'streetAddress',
		// 	type: 'string',
		// 	title: 'Street Address'
		// },
		// {
		// 	name: 'city',
		// 	type: 'string',
		// 	title: 'City'
		// },
		// {
		// 	name: 'state',
		// 	type: 'state'
		// },
		// {
		// 	name: 'dayOfWeek',
		// 	type: 'dayOfWeek'
		// },
		// {
		// 	name: 'timeOfDay',
		// 	type: 'timeOfDay'
		// },
		// {
		// 	name: 'morningOrNight',
		// 	type: 'morningOrNight'
		// }
	]
};
