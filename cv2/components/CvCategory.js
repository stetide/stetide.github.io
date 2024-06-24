class CvCategory extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let heading = this.hasAttribute('heading') ? this.getAttribute('heading') : 'Kategorie';
		let iconsrc = this.hasAttribute('iconsrc') ? this.getAttribute('iconsrc') : 'assets/icons/career.svg';

		const templateInner = `<div class="cv-category-header"><cv-category-icon src="${iconsrc}"></cv-category-icon><div class="cv-category-icon-dropdown"><cv-category-icon src="assets/icons/education.svg"></cv-category-icon><cv-category-icon src="assets/icons/career.svg"></cv-category-icon><cv-category-icon src="assets/icons/skills.svg"></cv-category-icon></div><input type="text" value="${heading}" class="cv-input cv-category-heading" placeholder="" autocomplete="off"/></div><!-- <hr class="cv-category-hr"> --><div class="cv-category-content"></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-category');
		let style = document.createElement('style');
		style.innerText = 'cv-category {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		const callback = (mutationList, observer) => {
		    let content = this.querySelector('.cv-category-content');
		
		    for (const mutation of mutationList) {
		        content.append(...mutation.addedNodes);
		    }
		};
		
		let observer = new MutationObserver(callback);
		observer.observe(this, { childList: true, subtree: false });
	}
}

customElements.define('cv-category', CvCategory);
