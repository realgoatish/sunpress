import {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_BASE_IMAGE_URL
} from '$env/static/public';

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

export const sitemapImageUrls = (imageObjects) => {
	const newImageObjects = imageObjects.map((item) => {
		const sanityImageUrl = `${PUBLIC_SANITY_BASE_IMAGE_URL}/${PUBLIC_SANITY_PROJECT_ID}/${PUBLIC_SANITY_DATASET}/${processImageRef(
			item.image.asset._ref
		)}`;

		return sanityImageUrl;
	});

	return newImageObjects;
};
