<script>
	import { Center, Frame, Sidebar } from '@realgoatish/svelte-every-layout';
	import { mapOpeningHoursUI } from '$lib/js/mapHoursOfOperation';
	import Social from './Social.svelte';
	import SiteNav from './SiteNav.svelte';

	export let data;

	// $: console.log(`ALL prop data in header: ${JSON.stringify(data, null, 2)}`);

	$: ({ address, logo, navigationSections, openingHours } = data);

	$: [socialNav] = navigationSections.filter((item) => item.id === 'social-nav');
	// TODO change this to get the dereferenced phone number from query re: socialNav
	// TODO also probably want to do .substring(2).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
	$: [phone] = socialNav.items.filter((item) => item.text === 'phone');
	// $: console.log(`PHONE: ${JSON.stringify(phone, null, 2)}`);
	$: [sitewideNav] = navigationSections.filter((item) => item.id === 'sitewide-nav');
	$: hoursOfOperation = mapOpeningHoursUI(openingHours);

	// $: console.log(`address in header: ${JSON.stringify(address, null, 2)}`);
	// $: console.log(`logo in header: ${JSON.stringify(logo, null, 2)}`);
	// $: console.log(`openingHours in header: ${JSON.stringify(openingHours, null, 2)}`);
	// $: console.log(
	// 	`openingHours mapped to Hours of Operation: ${JSON.stringify(hoursOfOperation, null, 2)}`
	// );
	// $: console.log(`socialNav in header: ${JSON.stringify(socialNav, null, 2)}`);
	// $: console.log(`sitewideNav in header: ${JSON.stringify(sitewideNav, null, 2)}`);
</script>

<header class="content-section--spacer--biggish">
	<div class="skip-link screen-reader-only">
		<a href="#main">Skip to Content</a>
	</div>
	<Center max="var(--measure)" gutters="var(--s-1)">
		<!-- NOTE: this is a rare instance where we're hacking for pixel-perfection to get all 
         the icons on one line. you'll need to adjust sideWidth value if more icons are
         added to .social-icons. -->
		<Sidebar side="left" sideWidth="max(295px, 35%)" contentMin="40%" space="var(--s-3)">
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
					<!-- TODO change this to get the dereferenced phone number from Social -->
					<p>{phone.link.externalUrl}</p>
					<h2 class="screen-reader-only">Address</h2>
					<p class="flex column">
						<span>{`${address.streetAddress},`}</span>
						<span>{`${address.city}, ${address.state} ${address.zip}`}</span>
					</p>
					<h2 class="screen-reader-only">Hours of Operation</h2>
					{#each hoursOfOperation as daysTimes}
						{#if daysTimes.times === 'Closed'}
							<p class="bold">{`${daysTimes.times} ${daysTimes.days}`}</p>
						{:else}
							<p class="bold">{daysTimes.days}</p>
							<p>{daysTimes.times}</p>
						{/if}
					{/each}
				</div>
			</div>
			<div slot="last-child" class="site-navigation">
				<SiteNav data={sitewideNav} />
			</div>
		</Sidebar>
	</Center>
</header>

<style>
	header .logo-social-contact {
		margin: 0 auto;
	}

	header .logo-wrapper {
		margin: 0 auto;
		max-inline-size: var(--s5);
	}

	header .bold {
		font-weight: 800;
	}

	header .site-navigation {
		block-size: 100%;
	}
</style>
