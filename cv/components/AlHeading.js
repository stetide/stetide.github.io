class AlHeading extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let heading = this.hasAttribute('heading') ? this.getAttribute('heading') : 'Bewerbung für eine Stelle';

		const templateInner = `<input class="cv-input" type="text" value="${heading}" placeholder="" autocomplete="off"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'al-heading');
		let style = document.createElement('style');
		style.innerText = 'al-address {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		
	}
}

customElements.define('al-heading', AlHeading);
