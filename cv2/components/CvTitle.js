class CvTitle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let h1 = this.hasAttribute('h1') ? this.getAttribute('h1') : 'Max Mustermann';
		let h2 = this.hasAttribute('h2') ? this.getAttribute('h2') : 'Lebenslauf';

		const templateInner = `<input type="text" value="${h1}" class="cv-title-h1 cv-input" placeholder="" autocomplete="off"/><input type="text" value="${h2}" class="cv-title-h2 cv-input" placeholder="" autocomplete="off"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-title');

		this.appendChild(template.content.cloneNode(true));

		this.querySelector('.cv-title-h1').remove();
		h1.split(';').forEach(element => {
		    let inpt = document.createElement('input');
		    inpt.classList.add('cv-input', 'cv-title-h1');
		    inpt.setAttribute('type', 'text');
		    inpt.setAttribute('placeholder', '');
		    inpt.setAttribute('autocomplete', 'off');
		    inpt.setAttribute('value', element);
		    inpt.addEventListener('keydown', cvInputOnKeyDown);
		    this.appendChild(inpt);
		});
		
		this.querySelector('.cv-title-h2').remove();
		h2.split(';').forEach(element => {
		    let inpt = document.createElement('input');
		    inpt.classList.add('cv-input', 'cv-title-h2');
		    inpt.setAttribute('type', 'text');
		    inpt.setAttribute('placeholder', '');
		    inpt.setAttribute('autocomplete', 'off');
		    inpt.setAttribute('value', element);
		    inpt.addEventListener('keydown', cvInputOnKeyDown);
		    this.appendChild(inpt);
		});
	}
}

customElements.define('cv-title', CvTitle);
