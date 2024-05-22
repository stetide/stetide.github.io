class AlSalutation extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let salutation = this.hasAttribute('salutation') ? this.getAttribute('salutation') : 'Mit freundlichen Grüßen';

		const templateInner = `<input type="text" value="${salutation}" class="cv-input" placeholder="" autocomplete="off"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'al-salutation');
		let style = document.createElement('style');
		style.innerText = 'al-address {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		
	}
}

customElements.define('al-salutation', AlSalutation);
