import { createPreviewSubscriptionStore } from './sveltekit/previewSubscriptionStore';
import { createCurrentUserStore } from './sveltekit/currentUser';
import { clientConfig } from './config';

export const previewSubscription = createPreviewSubscriptionStore(clientConfig);

export const sanityUser = createCurrentUserStore(clientConfig);