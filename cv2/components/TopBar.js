class TopBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}


		const templateInner = `<div class="left"><span type="button" value="" class="hamburger"></span><h1 class="title">Lebenslauf</h1></div><span class="info">i</span>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'topbar');

		this.appendChild(template.content.cloneNode(true));

		this.querySelector('.hamburger').addEventListener('click', _ => {
		    const sidebar = document.querySelector('.sidebar');
		    if (sidebar.hasAttribute('open')) {
		        sidebar.removeAttribute('open');
		    } else {
		        sidebar.setAttribute('open', 'true');
		    }
		});
	}
}

customElements.define('top-bar', TopBar);
