<script>
	import { page } from '$app/stores';
	import { Center, Frame, Cluster, Icon } from '@realgoatish/svelte-every-layout';
	import Social from './Social.svelte';

	export let data;

	// $: console.log(`ALL prop data in header: ${JSON.stringify(data, null, 2)}`);

	$: ({ address, logo, navigationSections, openingHours } = data);

	$: [socialNav] = navigationSections.filter((item) => item.id === 'social-nav');
	$: [sitewideNav] = navigationSections.filter((item) => item.id === 'sitewide-nav');

	$: console.log(`address in header: ${JSON.stringify(address, null, 2)}`);
	$: console.log(`logo in header: ${JSON.stringify(logo, null, 2)}`);
	$: console.log(`openingHours in header: ${JSON.stringify(openingHours, null, 2)}`);
	$: console.log(`socialNav in header: ${JSON.stringify(socialNav, null, 2)}`);
	$: console.log(`sitewideNav in header: ${JSON.stringify(sitewideNav, null, 2)}`);
</script>

<header>
	<Center max="var(--measure)">
		<Cluster wrapperElement="div" justify="space-around">
			<div class="logo-social-contact">
				<div>
					<Frame ratio="1.5:3.5">
						<img
							alt={logo.alt}
							srcset={`${logo.image.desktop} 2400w, ${logo.image.tablet} 1600w, ${logo.image.mobile} 800w`}
							sizes="50vw"
							src="{logo.image.fullSize}}"
						/>
					</Frame>
				</div>
				<div class="social">
					<Social data={socialNav} />
				</div>
			</div>
			<div class="site-navigation">
				<nav>
					<Cluster wrapperElement="ul" align="center">
						{#each sitewideNav.items as item}
							<li>
								<a
									href={item.link.internal.url}
									class="nav-link"
									class:selected={$page.url.pathname === item.link.internal.url}>{item.text}</a
								>
							</li>
						{/each}
					</Cluster>
				</nav>
			</div>
		</Cluster>
	</Center>
</header>

<style>
	header .logo-social-contact {
		min-inline-size: var(--s5);
	}

	header div.social {
		font-size: var(--s3);
	}

	header :global(div.social ul),
	header div.social li {
		line-height: 1;
	}

	header .site-navigation {
		block-size: 100%;
	}
</style>
