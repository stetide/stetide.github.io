class CvProfilePicture extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let imagesrc = this.hasAttribute('imagesrc') ? this.getAttribute('imagesrc') : 'assets/images/profile-picture.png';

		const templateInner = `<img class="cv-profile-picture-img" src="${imagesrc}"/>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-profile-picture');

		this.appendChild(template.content.cloneNode(true));

		this.addEventListener('drop', (e) => {
		    acceptDropImage(e, this, '.cv-profile-picture-img');
		});
	}
}

customElements.define('cv-profile-picture', CvProfilePicture);
