import { createPreviewSubscriptionStore } from './previewSubscriptionStore';
import { createCurrentUserStore } from './currentUser';
import { clientConfig } from './config';

export const previewSubscription = createPreviewSubscriptionStore(clientConfig);

export const sanityUser = createCurrentUserStore(clientConfig);