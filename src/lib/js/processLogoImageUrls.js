import { SANITY_PROJECT_ID, SANITY_DATASET } from '$env/static/private';

export const processLogoImageUrls = (response) => {
	const cloneResponse = JSON.parse(JSON.stringify(response));

	const logo = cloneResponse.logo;

	const unprocessedImageUrl = logo.unprocessedImageUrl;

	const lastIndexOfDash = unprocessedImageUrl.lastIndexOf('-');

	const replacement = '.';

	const dashReplacedWithDot =
		unprocessedImageUrl.substring(0, lastIndexOfDash) +
		replacement +
		unprocessedImageUrl.substring(lastIndexOfDash + 1);

	const strippedPrefix = dashReplacedWithDot.replace('image-', '');

	const sanityImageUrl = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${strippedPrefix}`;

	const newImageAttribute = {
		mobile: `${sanityImageUrl}?w=800&auto=format`,
		tablet: `${sanityImageUrl}?w=1600&auto=format`,
		desktop: `${sanityImageUrl}?w=2400&auto=format`,
		fullSize: `${sanityImageUrl}?auto=format`,
		sourceImage: `${sanityImageUrl}`
	};

	const newLogo = {
		...logo,
		image: newImageAttribute
	};

	cloneResponse.logo = newLogo;

	console.log(`finished response: ${JSON.stringify(cloneResponse, null, 2)}`);

	return cloneResponse;
};
