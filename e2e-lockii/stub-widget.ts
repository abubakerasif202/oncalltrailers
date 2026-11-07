/**
 * Inert stand-in for the provider's embed script. It defines the same element names, renders an untitled
 * frame and a button that records any click, and never touches the network. The real script is never
 * loaded in this suite: it would record analytics and could start a booking.
 */
export const STUB_WIDGET = `
(() => {
  window.__stubLoads = (window.__stubLoads || 0) + 1;
  const me = document.currentScript;
  window.__stubScriptAttrs = me ? Object.fromEntries([...me.attributes].map((a) => [a.name, a.value])) : null;
  for (const tag of ['lockii-browse', 'lockii-account', 'lockii-checkout-button']) {
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() {
        const productId = this.getAttribute('product_id') || '';
        this.innerHTML = '<iframe srcdoc="<p>stub</p>" style="width:100%;height:240px"></iframe>' +
          '<button type="button" data-stub-action="' + tag + '" data-product="' + productId + '">Book (stub)</button>';
        this.querySelector('button').addEventListener('click', () => { window.__checkoutClicks = (window.__checkoutClicks || 0) + 1; });
      }
    });
  }
})();
`;
