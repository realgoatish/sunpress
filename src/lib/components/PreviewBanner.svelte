<script lang="ts">
	import { sanityUser } from '$lib/config/sanity';
	import { Cluster, Frame } from 'svelte-every-layout';

	export let embedded = false;

	$: ({ data } = sanityUser());
</script>

{#if !embedded}
	<div class="banner">
		<Cluster justify="space-between" space="var(--s0)" wrapperElement="div">
			<div class="avatar">
				<Frame ratio="1:1">
					{#if $data?.profileImage}
						<img src={$data.profileImage} alt="" />
					{/if}
				</Frame>
			</div>
			<div>
				<span>Hi {$data?.name ? $data.name : 'there'}!</span>
				<span> This page is a draft.</span>
				<span>
					<a rel="external" href="/api/exit-preview">Exit?</a>
				</span>
			</div>
		</Cluster>
	</div>
{/if}

<style>
	.banner {
		min-block-size: 7rem;
		padding-block: var(--s0);
		padding-inline: var(--s0);
		background: var(--color-secondary--dark);
		color: var(--color-secondary--white);
	}

	.banner .avatar {
		inline-size: 5rem;
	}

	.banner .avatar img {
		border: 3px solid var(--color-secondary--white);
		border-radius: 50%;
	}

	.banner a {
		color: var(--color-primary--light);
	}
</style>
