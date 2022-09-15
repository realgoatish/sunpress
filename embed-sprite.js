import fs from 'fs';

const svgspriteContent = fs.readFileSync('static/svg/sprite/sprite.svg', 'utf-8');

const sprite = svgspriteContent.replace('<svg', '<svg aria-hidden="true" width="0" height="0"');

const spanSpriteWrapper = `
<span style="visibility: hidden; position: absolute; z-index: -1;">
${sprite}
</span>`;

const string = `{@html \` ${spanSpriteWrapper} \` }`;

fs.writeFileSync('src/lib/Sprite.svelte', string);
