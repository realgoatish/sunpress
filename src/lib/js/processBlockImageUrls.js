import { SANITY_PROJECT_ID, SANITY_DATASET } from '$env/static/private';

export const processBlockImageUrls = (response) => {
	const cloneResponse = JSON.parse(JSON.stringify(response));

	const { body } = cloneResponse;

	const imageObjects = body.filter((item) => item._type === 'figure' && item.image);

	if (!imageObjects.length) {
		return response;
	}

	const newImageObjects = imageObjects.map((item) => {
		const unprocessedImageUrl = item.image.asset._ref;

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

		return {
			...item,
			image: newImageAttribute
		};
	});

	const newBody = body.map((obj) => newImageObjects.find((o) => o._key === obj._key) || obj);

	cloneResponse.body = newBody;

	console.log(`finished response: ${JSON.stringify(cloneResponse, null, 2)}`);

	return cloneResponse;
};
