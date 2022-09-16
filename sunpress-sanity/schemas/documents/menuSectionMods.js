export default {
	name: 'menuSectionMods',
	type: 'document',
	title: 'Menu Section Modifiers',
	fields: [
		{
			name: 'menuSectionModsId',
			type: 'slug',
			title: 'Menu Section Modifiers ID (must be unique)'
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
			name: 'mods',
			type: 'array',
			title: 'Modifiers For This Menu Section',
			of: [
				{
					type: 'reference',
					name: 'menuItemModReference',
					to: [{ type: 'menuItemMod' }]
				}
			]
		}
	]
};
