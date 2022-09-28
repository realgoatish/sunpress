<script>
	import { Stack } from '@realgoatish/svelte-every-layout';
	import ToggleSection from '$lib/ToggleSection.svelte';
	import MenuItem from './MenuItem.svelte';

	// export let section;
	// export let index;

	export let portableText;

	$: ({ value } = portableText);

	// $: console.log(`value in /menu/ portableText component: ${JSON.stringify(value, null, 2)}`);
</script>

<div>
	<ToggleSection headerText={value.title} expanded={false}>
		<Stack>
			{#if value.description}
				<p>{value.description}</p>
			{/if}
			{#if value.mods}
				{#each value.mods as sectionMod}
					{#if sectionMod.id === 'choose-proteins'}
						<p>
							<strong>Choose Protein: </strong>
							{sectionMod.mods.map((protein) => protein.name).join(', ')}
						</p>
					{:else if sectionMod.id === 'add-proteins'}
						<p>
							<strong>Add: </strong>
							{sectionMod.mods.map((protein) => [protein.name, protein.price].join(' ')).join(', ')}
						</p>
					{:else if sectionMod.id === 'add-sides'}
						<p>
							<strong>Add: </strong>
							{sectionMod.mods.map((side) => [side.name, side.price].join(' ')).join(', ')}
						</p>
					{/if}
				{/each}
			{/if}
			{#each value.items as item}
				<div class="menu-item">
					<MenuItem data={item} />
				</div>
			{/each}
		</Stack>
	</ToggleSection>
</div>

<style>
	div .menu-item {
		border-block-start: 2px solid var(--color-primary--dark);
		/* sync top spacing up w/ bottom spacing provided by the Stack component
    that wraps all the children in the menu section */
		padding-block-start: var(--space, 1rem);
	}
</style>
