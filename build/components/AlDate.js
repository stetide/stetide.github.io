class AlDate extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let date = this.hasAttribute('date') ? this.getAttribute('date') : '02. August 2023';

		const templateInner = `<input class="cv-input" type="text" value="${date}" placeholder="" autocomplete="off"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'al-date');
		let style = document.createElement('style');
		style.innerText = 'al-address {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		
	}
}

customElements.define('al-date', AlDate);
