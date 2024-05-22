class AlAddress extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let content = this.hasAttribute('content') ? this.getAttribute('content') : 'Musterfirma Inc.;Herr Max Muster;Beispielstr. 7;79334 Musterstadt';

		const templateInner = ``;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'al-address');
		let style = document.createElement('style');
		style.innerText = 'al-address {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		if (content != '') {
		    content.split(';').forEach(element => {
		        let inpt = document.createElement('input');
		        inpt.setAttribute('class', 'cv-input');
		        inpt.setAttribute('type', 'text');
		        inpt.setAttribute('placeholder', '');
		        inpt.setAttribute('autocomplete', 'off');
		        inpt.setAttribute('value', element);
		        inpt.addEventListener('keydown', cvInputOnKeyDown);
		        this.appendChild(inpt);
		    });
		} else {
		    for (let i = 0; i < 3; i++) {
		        let inpt = document.createElement('input');
		        inpt.setAttribute('class', 'cv-input');
		        inpt.setAttribute('type', 'text');
		        inpt.setAttribute('placeholder', '');
		        inpt.setAttribute('autocomplete', 'off');
		        inpt.addEventListener('keydown', cvInputOnKeyDown);
		        this.appendChild(inpt);
		    }
		}
	}
}

customElements.define('al-address', AlAddress);
