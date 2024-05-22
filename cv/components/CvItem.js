class CvItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let content = this.hasAttribute('content') ? this.getAttribute('content') : 'Stichwort;Kurze Beschreibung';
		let heading = this.hasAttribute('heading') ? this.getAttribute('heading') : 'von - bis';

		const templateInner = `<div class="cv-item-header"><input class="cv-input" type="text" value="${heading}" placeholder="" autocomplete="off"/></div><div class="cv-item-content"></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-item');
		let style = document.createElement('style');
		style.innerText = 'cv-item {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		let contentContainer = this.querySelector('.cv-item-content');
		content.split(';').forEach(element => {
		    let inpt = document.createElement('input');
		    inpt.setAttribute('class', 'cv-input');
		    inpt.setAttribute('type', 'text');
		    inpt.setAttribute('placeholder', '');
		    inpt.setAttribute('autocomplete', 'off');
		    inpt.setAttribute('value', element);
		    inpt.addEventListener('keydown', cvInputOnKeyDown);
		    contentContainer.appendChild(inpt);
		});
	}
}

customElements.define('cv-item', CvItem);
