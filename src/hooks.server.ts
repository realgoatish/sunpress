// import { getPreviewCookie } from '$lib/js/previewCookie.server';
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const previewModeCookie = getPreviewCookie(event.cookies);

// 	event.locals.previewMode = false;

// 	if (previewModeCookie === 'true') {
// 		event.locals.previewMode = true;
// 	}

// 	const response = await resolve(event);

// 	return response;
// };

import { getPreviewCookie } from '$lib/js/previewCookie';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const previewModeCookie = getPreviewCookie(event.cookies);
  
  console.log(`previewModeCookie in hooks: ${previewModeCookie}`)

	event.locals.previewMode = false;

	if (previewModeCookie === 'true') {
		event.locals.previewMode = true;
  }
  
  console.log(`event.locals in hooks: ${JSON.stringify(event.locals, null, 2)}`)

	const response = await resolve(event);

	return response;
};