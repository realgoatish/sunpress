// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

import siteSettings from './documents/siteSettings';
import richText from './arrays/richText';
import page from './documents/page';
import navigation from './documents/navigation';
import navigationItem from './objects/navItem';
import link from './objects/link';
import figure from './objects/figure';
import menuItem from './documents/menuItem';
import menuSection from './documents/menuSection';
import militaryTime from './strings/militaryTime';
import timeOfDay from './strings/timeOfDay';
import morningOrNight from './strings/morningOrNight';
import menuItemMod from './documents/menuItemMod';
import menuSectionMods from './documents/menuSectionMods';
import urlArray from './arrays/urlArray';
import stringArray from './arrays/stringArray';
// import createSlugs from './js/createSlugs';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		siteSettings,
		richText,
		page,
		navigation,
		navigationItem,
		link,
		figure,
		menuItem,
		menuSection,
		militaryTime,
		timeOfDay,
		morningOrNight,
		menuItemMod,
		menuSectionMods,
		urlArray,
		stringArray
		// createSlugs
	])
});
