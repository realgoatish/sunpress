<script>
	import { H } from 'tusculum';
	import { enhanceToggleSection } from '$lib/js/actions';
	import { afterUpdate } from 'svelte';
	import { browser } from '$app/environment';

	/**
	 * @type {string}
	 * set an optional class name for the top-level element of this component to enable scoped styling of each component instance from outside (in parent components or pages)
	 */
	export let wrapperClass;
	/**
	 * @type {string}
	 * title text to serve as a heading for the section
	 */
	export let headerText = 'My Section';
	/**
	 * @type {boolean}
	 * controls the aria-expanded state and the hidden attribute on the content
	 */
	export let expanded = false;

	let toggleSection;

	afterUpdate(() => {
		if (browser) {
			enhanceToggleSection(toggleSection, { headerText, expanded });
		}
	});
</script>

<div
	bind:this={toggleSection}
	class={wrapperClass
		? `collapsible-section-wrapper ${wrapperClass}`
		: 'collapsible-section-wrapper'}
>
	<H>{headerText}</H>
	<div class="content-wrapper">
		<slot />
	</div>
</div>

<style>
	.collapsible-section-wrapper :global(button) {
		all: inherit;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0.5em 0;
	}
	.collapsible-section-wrapper :global(svg.toggle-svg) {
		height: 1em;
		margin-left: 0.5em;
	}
	.collapsible-section-wrapper :global([aria-expanded] rect) {
		fill: currentColor;
	}
	.collapsible-section-wrapper :global([aria-expanded='true'] .vert) {
		display: none;
	}
	.collapsible-section-wrapper :global(h2 button:focus svg) {
		outline: 2px solid;
	}
</style>
