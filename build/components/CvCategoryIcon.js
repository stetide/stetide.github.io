class CvCategoryIcon extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let src = this.hasAttribute('src') ? this.getAttribute('src') : '';

		const templateInner = `<img src="${src}"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-category-icon');
		let style = document.createElement('style');
		style.innerText = 'cv-category-icon {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		
	}
}

customElements.define('cv-category-icon', CvCategoryIcon);
