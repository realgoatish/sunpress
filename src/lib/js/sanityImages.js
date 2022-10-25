import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_BASE_IMAGE_URL } from '$env/static/private';

// turn sanity image ref into the actual name of the image stored in sanity
const processImageRef = (imageRef) => {
	const unprocessedImageUrl = imageRef;

	const lastIndexOfDash = unprocessedImageUrl.lastIndexOf('-');

	const replacement = '.';

	const dashReplacedWithDot =
		unprocessedImageUrl.substring(0, lastIndexOfDash) +
		replacement +
		unprocessedImageUrl.substring(lastIndexOfDash + 1);

	const strippedPrefix = dashReplacedWithDot.replace('image-', '');

	return strippedPrefix;
};

export const processLayoutLogoUrl = (figure) => {
	const sanityImageUrl = `${SANITY_BASE_IMAGE_URL}/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${processImageRef(
		figure.image.asset._ref
	)}`;

	const newImageAttribute = {
		mobile: `${sanityImageUrl}?w=800&auto=format`,
		tablet: `${sanityImageUrl}?w=1600&auto=format`,
		desktop: `${sanityImageUrl}?w=2400&auto=format`,
		fullSize: `${sanityImageUrl}?auto=format`,
		sourceImage: `${sanityImageUrl}`
	};

	const newLogo = {
		alt: figure.alt,
		image: newImageAttribute
	};

	return newLogo;
};

export const processBlockImageUrls = (imageObjects) => {
	const newImageObjects = imageObjects.map((item) => {
		const sanityImageUrl = `${SANITY_BASE_IMAGE_URL}/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${processImageRef(
			item.image.asset._ref
		)}`;

		const newImageAttribute = {
			mobile: `${sanityImageUrl}?w=800&auto=format`,
			tablet: `${sanityImageUrl}?w=1600&auto=format`,
			desktop: `${sanityImageUrl}?w=2400&auto=format`,
			fullSize: `${sanityImageUrl}?auto=format`,
			sourceImage: `${sanityImageUrl}`
		};

		return {
			// can't strip out everything but alt & image attrs because PortableText component needs
			// _key & _type attrs too
			...item,
			image: newImageAttribute
		};
	});

	return newImageObjects;
};

export const processMenuImageUrls = (menuItems) => {
	const newMenuItems = menuItems.map((item) => {
		const sanityImageUrl = `${SANITY_BASE_IMAGE_URL}/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${processImageRef(
			item.figure.image.asset._ref
		)}`;

		const newImageAttribute = {
			mobile: `${sanityImageUrl}?w=800&auto=format`,
			tablet: `${sanityImageUrl}?w=1600&auto=format`,
			desktop: `${sanityImageUrl}?w=2400&auto=format`,
			fullSize: `${sanityImageUrl}?auto=format`,
			sourceImage: `${sanityImageUrl}`
		};

		return {
			...item,
			figure: {
				alt: item.figure.alt,
				image: newImageAttribute
			}
		};
	});

	return newMenuItems;
};

export const processPageSeoImageUrls = (figure) => {
	const sanityImageUrl = `${SANITY_BASE_IMAGE_URL}/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${processImageRef(
		figure.image.asset._ref
	)}`;

	const newImageAttribute = {
		facebook: `${sanityImageUrl}?w=1200&h=627&auto=format`,
		twitter: `${sanityImageUrl}?w=800&h=418&auto=format`,
		fullSize: `${sanityImageUrl}?auto=format`,
		sourceImage: `${sanityImageUrl}`
	};

	return {
		alt: figure.alt,
		image: newImageAttribute
	};
};

export const sitemapImageUrls = (imageObjects) => {
	const newImageObjects = imageObjects.map((item) => {
		const sanityImageUrl = `${SANITY_BASE_IMAGE_URL}/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${processImageRef(
			item.image.asset._ref
		)}`;

		return sanityImageUrl;
	});

	return newImageObjects;
};
