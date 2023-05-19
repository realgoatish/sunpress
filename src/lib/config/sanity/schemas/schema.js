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
import seoLocalBusiness from './objects/seoLocalBusiness';
import address from './objects/address';
import seoPage from './objects/seoPage';
import seoOpenGraph from './objects/seoOpenGraph';
// import day from './objects/day';
// import dayHours from './objects/dayHours';

export const schemaTypes = [
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
	stringArray,
	seoLocalBusiness,
	address,
	seoOpenGraph,
	seoPage
	// day,
	// dayHours
];
