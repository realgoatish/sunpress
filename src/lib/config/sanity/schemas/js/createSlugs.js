import slug from 'slug';

function formatSlug(input, slugStart) {
	const theSlug = slug(input, { lower: true });
	return slugStart + theSlug;
}

export function slugWithType() {
	const slugStart = `/`;

	return {
		name: `slug`,
		type: `slug`,
		// TODO this checks the page 'home' boolean, which also seems hacky
		hidden: ({ document }) => document?.home,
		options: {
			source: (doc) => `${doc.title}/`,
			slugify: (value) => formatSlug(value, slugStart)
		},
		validation: (Rule) =>
			Rule.required().custom(({ current }, context) => {
				if (typeof current === 'undefined') {
					return true;
				}

				// TODO this is also checking the document's title. need to refactor to something more stable or else make title unchangeable?
				if (current && context.document.title !== 'Home') {
					if (!current.startsWith('/')) {
						return `Slug must begin with "/". Click "Generate" to reset.`;
					}

					if (!current.endsWith('/')) {
						return `Slug must end with "/"`;
					}
				}

				return true;
			})
	};
}
