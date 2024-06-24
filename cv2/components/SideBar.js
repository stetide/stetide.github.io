class SideBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}


		const templateInner = ``;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'sidebar');

		this.appendChild(template.content.cloneNode(true));

		fetch('assets/css/themes/themes.json').then(resp => {
		    resp.json().then(json => {
		        for (const theme of json) {
		            const themeBlock = document.createElement('theme-preview');
		            themeBlock.setAttribute('name', theme['name']);
		            themeBlock.setAttribute('imgsrc', theme['image']);
		            
		            let colors = [];
		            let hrefs = [];
		            for (const color of theme['colors']) {
		                colors.push(color['color']);
		                hrefs.push(color['href']);
		            }
		
		            themeBlock.setAttribute('colors', colors.join(';'));
		            themeBlock.setAttribute('hrefs', hrefs.join(';'));
		
		            this.appendChild(themeBlock);
		        }
		    });
		});
	}
}

customElements.define('side-bar', SideBar);
