import { fixture } from '@open-wc/testing';
import { html } from 'lit';

import { visualDiff } from '@web/test-runner-visual-regression';

import './{{ tagName }}.js';
import type { {{ className }} } from './{{ tagName }}.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe('{{ tagName }}', () => {
  let element: {{ className }};

  beforeEach(async () => {
    element = await fixture(
      html`<{{ tagName }}></{{ tagName }}>`
    );
    document.body.prepend(element);
  });

  afterEach(() => element.remove());

  it('displays the plugin', async () => {
    await visualDiff(element, '{{ tagName }}');
  });


});
