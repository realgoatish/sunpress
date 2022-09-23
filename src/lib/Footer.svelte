<script>
	import { Center } from '@realgoatish/svelte-every-layout';
	import Social from './Social.svelte';

	export let data;

	$: [socialNav] = data.filter((item) => item.id === 'social-nav');
	$: [sitewideNav] = data.filter((item) => item.id === 'sitewide-nav');

	// $: console.log(`socialNav in footer: ${JSON.stringify(socialNav, null, 2)}`);
	// $: console.log(`sitewideNav in footer: ${JSON.stringify(sitewideNav, null, 2)}`);
</script>

<footer class="content-section--spacer--biggish">
	<Center max="var(--measure)" intrinsic={true}>
		<div class="social-icons">
			<Social data={socialNav} />
		</div>
	</Center>
</footer>

<style>
	footer div {
		max-inline-size: var(--s5);
	}
</style>
