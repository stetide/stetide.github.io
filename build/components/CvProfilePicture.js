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
		    e.preventDefault();
		
		    // if (e.dataTransfer.items) {
		    //     const file = e.dataTransfer.items[0].getAsFile();
		    //     this.querySelector('#cv-profile-picture-img').src = URL.createObjectURL(file);
		    // }
		
		    if (e.dataTransfer.items) {
		        console.log(e)
		        console.log(e.dataTransfer.items);
		        const item = e.dataTransfer.items[0];
		
		        if (item.type.match('^image/')) {
		            const file = item.getAsFile();
		            const reader = new FileReader();
		            reader.readAsDataURL(file);
		            reader.onloadend = () => {
		                // this.querySelector('.cv-signature-img').src = `data:${file.type};base64,${reader.result}`;
		                this.querySelector('.cv-profile-picture-img').src = reader.result;
		            };
		
		            // this.querySelector('.cv-signature-img').src = URL.createObjectURL(file);
		        }
		    }
		});
	}
}

customElements.define('cv-profile-picture', CvProfilePicture);
