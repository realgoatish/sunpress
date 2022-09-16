export default {
	name: 'menuSection',
	type: 'document',
	title: 'Menu Section',
	fields: [
		{
			name: 'menuSectionId',
			type: 'slug',
			title: 'Menu Section ID (must be unique)'
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
					name: 'menuSectionModsReference',
					to: [{ type: 'menuSectionMods' }]
				}
			]
		},
		{
			name: 'items',
			type: 'array',
			title: 'Menu Items',
			of: [
				{
					type: 'reference',
					name: 'menuItemReference',
					to: [{ type: 'menuItem' }]
				}
			]
		}
	]
};
