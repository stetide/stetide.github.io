class CvSignature extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let citydate = this.hasAttribute('citydate') ? this.getAttribute('citydate') : 'Musterstadt, den 26.07.2023';
		let signature_img = this.hasAttribute('signature_img') ? this.getAttribute('signature_img') : 'assets/images/signature.png';

		const templateInner = `<input type="text" value="${citydate}" class="cv-input cv-signature-citydate" placeholder="" autocomplete="off"/><div class="cv-signature-container"><img src="${signature_img}" class="cv-signature-img"/></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'cv-signature');

		this.appendChild(template.content.cloneNode(true));

		this.querySelector('.cv-signature-container').addEventListener('drop', (e) => {
		    e.preventDefault();
		
		    if (e.dataTransfer.items) {
		        const item = e.dataTransfer.items[0];
		
		        if (item.type.match('^image/')) {
		            const file = item.getAsFile();
		            const reader = new FileReader();
		            reader.readAsDataURL(file);
		            reader.onloadend = () => {
		                // this.querySelector('.cv-signature-img').src = reader.result;
		                document.querySelectorAll('.cv-signature-img').forEach(elem => {
		                    elem.src = reader.result;
		                })
		            };
		        }
		    }
		});
		
		if (!this.hasAttribute('citydate')) {
		    let d = new Date();
		    citydate = Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(d);
		    this.querySelector('.cv-input').value = 'Mustderstadt, den ' + citydate;
		}
	}
}

customElements.define('cv-signature', CvSignature);
