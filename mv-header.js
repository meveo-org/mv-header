import { LitElement, html, css } from "lit-element";

export class MvHeader extends LitElement {
  static get properties() {
    return {
      item: { type: Boolean, attribute: true },
      // "custom" is only applicable in root node, e.g. <mv-header custom>{...mv-header items}</mv-header>
      custom: { type: Boolean, attribute: true },
      // valid positions are: "left", "center", "right", default: "left"
      position: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
        --margin-left: var(--mv-header-margin-left, 0);
        --margin-right: var(--mv-header-margin-right, 0);
        --total-margins: calc(var(--margin-left) + var(--margin-right));
        --item-padding: var(--mv-header-item-padding: 10px); 
      }

      header {               
        min-height: var(--mv-header-height, 66px);
        max-height: var(--mv-header-height, 66px);
        background: var(--mv-header-background, #373E48);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin-top: 0;
        margin-bottom: var(--mv-header-margin-bottom, 20px);
        margin-left: var(--margin-left);
        margin-right: var(--margin-right);
        padding-left: var(--item-padding);
        padding-right: var(--item-padding);
        width: calc(100% - var(--total-margins));
        box-shadow: 0 2px 15px 0 rgba(0,0,0,0.2);
        transition: margin-left 0.3s;
        transition: margin-right 0.3s;
      }

      section {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      section.left {
        justify-content: flex-start;
      }

      section.center {
        justify-content: center;
      }

      section.right {        
        justify-content: flex-end;
      }

      section ::slotted(*) {
        margin: auto var(--item-padding, 10px);
      }

      .mv-header-item,
      .mv-header-item ::slotted(*) {
        margin: 0;
        text-decoration: none;
        color: #B0B3B6;
      }
      
      .mv-header-item:hover ::slotted(a) {
        text-decoration: underline;
      }
    `;
  }

  constructor() {
    super();
    this.item = false;
    this.custom = false;
    this.position = "left";
  }

  render() {
    if (this.item) {
      this.setAttribute("slot", this.position);
      return html`
        <div class="mv-header-item">
          <slot></slot>
        </div
      `;
    } else {
      return html`
      <header>
      ${this.custom
        ? html`<slot></slot>`
        : html`
            <section class="left">
              <slot name="left"></slot>
            </section>
            <section class="center">
              <slot name="center"></slot>
            </section>
            <section class="right">
              <slot name="right"></slot>
            </section>
          `}
      </header>
      `;
    }
  }
}

customElements.define("mv-header", MvHeader);
