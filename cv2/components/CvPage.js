class CvPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let profile_picture_img = this.hasAttribute('profile_picture_img') ? this.getAttribute('profile_picture_img') : '';
		let signature_img = this.hasAttribute('signature_img') ? this.getAttribute('signature_img') : '';
		let signature_txt = this.hasAttribute('signature_txt') ? this.getAttribute('signature_txt') : '';
		let title_h1 = this.hasAttribute('title_h1') ? this.getAttribute('title_h1') : '';
		let title_h2 = this.hasAttribute('title_h2') ? this.getAttribute('title_h2') : '';

		const templateInner = `<cv-title h1="${title_h1}" h2="${title_h2}"></cv-title><cv-profile-picture imagesrc="${profile_picture_img}"></cv-profile-picture><div class="cv-sidebar"><cv-category><cv-item></cv-item></cv-category></div><div class="cv-main"><cv-category><cv-item></cv-item></cv-category><cv-signature citydate="${signature_txt}" signature_img="${signature_img}"></cv-signature></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'page cv');

		this.appendChild(template.content.cloneNode(true));

		this.querySelectorAll('cv-category').forEach(element => {
		    const item = document.createElement('cv-item');
		    element.appendChild(item);
		});
	}
}

customElements.define('cv-page', CvPage);
