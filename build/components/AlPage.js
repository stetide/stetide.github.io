class AlPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let address_from = this.hasAttribute('address_from') ? this.getAttribute('address_from') : '';
		let address_to = this.hasAttribute('address_to') ? this.getAttribute('address_to') : '';
		let date = this.hasAttribute('date') ? this.getAttribute('date') : '';
		let heading = this.hasAttribute('heading') ? this.getAttribute('heading') : '';
		let motivation = this.hasAttribute('motivation') ? this.getAttribute('motivation') : '';
		let name = this.hasAttribute('name') ? this.getAttribute('name') : '';
		let salutation = this.hasAttribute('salutation') ? this.getAttribute('salutation') : '';
		let signature_img = this.hasAttribute('signature_img') ? this.getAttribute('signature_img') : '';

		const templateInner = `<al-address id="al-address-to" content="${address_to}"></al-address><al-address id="al-address-from" content="${address_from}"></al-address><div class="al-main"><al-date date="${date}"></al-date><al-heading heading="${heading}"></al-heading><al-motivation content="${motivation}"></al-motivation><al-salutation salutation="${salutation}"></al-salutation><cv-signature citydate="${name}" signature_img="${signature_img}" class="al-signature"></cv-signature></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'page application-letter');

		this.appendChild(template.content.cloneNode(true));

		
	}
}

customElements.define('al-page', AlPage);
