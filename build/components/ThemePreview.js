class ThemePreview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let colors = this.hasAttribute('colors') ? this.getAttribute('colors') : '';
		let hrefs = this.hasAttribute('hrefs') ? this.getAttribute('hrefs') : '';
		let imgsrc = this.hasAttribute('imgsrc') ? this.getAttribute('imgsrc') : '';
		let name = this.hasAttribute('name') ? this.getAttribute('name') : '';

		const templateInner = `<h3 class="theme-name">${name}</h3><img src="${imgsrc}" alt="Bild ${name}" class="theme-img"/><div class="theme-colors"></div>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'theme-block');

		this.appendChild(template.content.cloneNode(true));

		let cols = colors.split(';');
		let refs = hrefs.split(';');
		
		if (cols.length == refs.length) {
		    const colorsDiv = this.querySelector('.theme-colors');
		
		    for (let i = 0; i < cols.length; i++) {
		        let button = document.createElement('input');
		        button.setAttribute('class', 'theme-color-button');
		        button.setAttribute('type', 'button');
		        // button.setAttribute('theme-color', cols[i]);
		        button.addEventListener('click', _ => {
		            loadTheme(refs[i]);
		        });
		        button.style.backgroundColor = cols[i];
		        
		        colorsDiv.appendChild(button);
		    }
		} else {
		    console.warn('colors and hrefs must contain the same amount of elements');
		}
	}
}

customElements.define('theme-preview', ThemePreview);
