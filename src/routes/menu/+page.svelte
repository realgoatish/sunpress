<script>
	import { Center } from '@realgoatish/svelte-every-layout';
	import { PortableText } from '@portabletext/svelte';
	import MenuSection from './MenuSection.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// $: console.log(`menuPage data on the front end: ${JSON.stringify(data, null, 2)}`);

	// $: [starters] = data.body.filter((section) => section.id === 'starters');
	// $: [tacos] = data.body.filter((section) => section.id === 'tacos');
	// $: [burritos] = data.body.filter((section) => section.id === 'burritos');
	// $: [cubanos] = data.body.filter((section) => section.id === 'cubanos');
	// $: [quesadillas] = data.body.filter((section) => section.id === 'quesadillas');
	// $: [soupsAndSides] = data.body.filter((section) => section.id === 'soups-and-sides');
	// $: [dulcero] = data.body.filter((section) => section.id === 'dulcero');
</script>

<main id="main">
	<div>
		<Center max="var(--measure)" gutters="var(--s-1)">
			<div>
				<Center max="var(--measure)" intrinsic="true">
					<h1>{data.title}</h1>
				</Center>
			</div>
			<PortableText
				value={data.body}
				components={{
					types: {
						menuSectionReference: MenuSection
					}
				}}
			/>
		</Center>
	</div>
</main>

<style>
	main h1 {
		color: var(--color-primary--black);
	}
</style>
