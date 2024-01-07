import type { RequestHandler } from './$types';
import { clearPreviewCookie } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies, url }) => {
	const referer = request.headers.get('referer');

	clearPreviewCookie(cookies);

	redirect(302, referer || url.origin || '/');
};