
import { error, redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

  throw redirect(308, '/menus/restaurant/')


}

