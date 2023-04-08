import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import './{{ tagName }}.js';
import type { {{ className }} } from './{{ tagName }}.js';

describe('{{ className }}', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture<{{ className }}>(
      html`<{{ tagName }}></{{ tagName }}>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
