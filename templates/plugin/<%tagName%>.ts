import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot something - You can put something here
 *
 * @fires fake-event - This is just to show off README generation
 *
 * @cssprop --{{ tagName }}-text-color - Controls the color of foo
 */
@customElement('{{ tagName }}')
export class {{ className }} extends LitElement {

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--{{ tagName }}-text-color, #000);
    }
  `;

  {{#if type.menu }}
  public run(): void {

  }
  {{/if}}

  render() {
    return html`
      <h2>{{ tagName }}</h2>
    `;
  }
}
