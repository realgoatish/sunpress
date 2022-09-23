<script>
	import { Center, Frame, Sidebar } from '@realgoatish/svelte-every-layout';
	import { Section, H } from 'tusculum';
	import Social from './Social.svelte';
	import SiteNav from './SiteNav.svelte';

	export let data;

	// $: console.log(`ALL prop data in header: ${JSON.stringify(data, null, 2)}`);

	$: ({ address, logo, navigationSections, openingHours } = data);

	$: [socialNav] = navigationSections.filter((item) => item.id === 'social-nav');
	$: [sitewideNav] = navigationSections.filter((item) => item.id === 'sitewide-nav');

	// $: console.log(`address in header: ${JSON.stringify(address, null, 2)}`);
	// $: console.log(`logo in header: ${JSON.stringify(logo, null, 2)}`);
	// $: console.log(`openingHours in header: ${JSON.stringify(openingHours, null, 2)}`);
	$: console.log(`socialNav in header: ${JSON.stringify(socialNav, null, 2)}`);
	// $: console.log(`sitewideNav in header: ${JSON.stringify(sitewideNav, null, 2)}`);
</script>

<header class="content-section--spacer--biggish">
	<div class="skip-link screen-reader-only">
		<a href="#main">Skip to Content</a>
	</div>
	<Center max="var(--measure)" gutters="var(--s-1)">
		<Sidebar side="left" sideWidth="var(--s5)" contentMin="55%" space="var(--s-3)">
			<div slot="first-child" class="logo-social-contact">
				<div class="logo-wrapper">
					<Frame ratio="1.5:3.5">
						<img
							alt=""
							srcset={`${logo.image.desktop} 2400w, ${logo.image.tablet} 1600w, ${logo.image.mobile} 800w`}
							sizes="50vw"
							src={logo.image.fullSize}
						/>
					</Frame>
				</div>
				<div class="text-center">
					<div class="social-icons">
						<Social data={socialNav} />
					</div>
					<h2 class="screen-reader-only">Phone Number</h2>
					<p>856-544-9355</p>
					<h2 class="screen-reader-only">Address</h2>
					<p>
						{`${address.streetAddress},`}<br />
						<span>{`${address.city}, ${address.state} ${address.zip}`}</span>
					</p>
					<h2 class="screen-reader-only">Hours of Operation</h2>
					<!-- add your processing of timemap to produce hours of operation here -->
				</div>
			</div>
			<div slot="last-child" class="site-navigation">
				<SiteNav data={sitewideNav} />
			</div>
		</Sidebar>
	</Center>
</header>

<style>
	header :global(.logo-social-contact) {
		min-inline-size: var(--s5);
		max-inline-size: clamp(28vw, 30vw, 35vw);
		margin: 0 auto;
	}

	header .site-navigation {
		block-size: 100%;
	}
</style>
