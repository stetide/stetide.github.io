class AlMotivation extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
		while (this.firstChild) {
			this.removeChild(this.lastChild);
		}

		let content = this.hasAttribute('content') ? this.getAttribute('content') : 'Ich bin sehr motiviert und so weiter';

		const templateInner = `<p contenteditable="true" spellcheck="false" class="content">${content}</p>`;
		const template = document.createElement('template');
        template.innerHTML = templateInner;

		this.setAttribute('class', this.hasAttribute('class') ? this.getAttribute('class') : 'al-motivation');
		let style = document.createElement('style');
		style.innerText = 'al-address {     display: block;   }';
		this.appendChild(template.content.cloneNode(true));
		this.appendChild(style);
		content = content.replaceAll('\n', '<br>');
		this.querySelector('.content').innerHTML = content;
	}
}

customElements.define('al-motivation', AlMotivation);
