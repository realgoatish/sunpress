// Add the button inside the heading tag, hide the content, add an onclick method
// to the button to show/hide the content
export function enhanceToggleSection(node, params) {
	const heading = node.querySelector('h1, h2, h3, h4, h5, h6');
	heading.innerHTML = `
    <button class="collapsible-content-button" aria-expanded=${params.expanded}>
      ${params.headerText}
      <svg viewBox="0 0 10 10" focusable="false" class="toggle-svg">
        <rect class="vert" height="8" width="2" y="1" x="4" />
        <rect height="2" width="8" y="4" x="1" />
      </svg>
    </button>`;
	const contentWrapper = node.querySelector('.content-wrapper');
	if (!params.expanded) {
		contentWrapper.hidden = true;
	}
	let button = node.querySelector('button');
	button.onclick = () => {
		params.expanded = !params.expanded;
		button.setAttribute('aria-expanded', params.expanded);
		contentWrapper.hidden = !params.expanded;
	};
}
