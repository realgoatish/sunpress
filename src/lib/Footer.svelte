<script>
	import { Cluster, Center, Stack } from '@realgoatish/svelte-every-layout';
	import Social from './Social.svelte';

	export let data;

	$: [socialNav] = data.filter((item) => item.id === 'social-nav');
	$: [sitewideNav] = data.filter((item) => item.id === 'sitewide-nav');

	// $: console.log(`socialNav in footer: ${JSON.stringify(socialNav, null, 2)}`);
	// $: console.log(`sitewideNav in footer: ${JSON.stringify(sitewideNav, null, 2)}`);
</script>

<footer>
	<Center max="var(--measure)" intrinsic={true}>
		<div>
			<Social data={socialNav} />
		</div>
	</Center>
</footer>

<style>
	div {
		max-inline-size: var(--s5);
		font-size: var(--s3);
	}

	/* div :global(ul), div :global(li) {

  } */
</style>
