'use strict';

export default class BasisFixedHeader {
	constructor(container, params) {
		if (!container) {
			container = '._l-container';
		}
		if (!params) {
			params = {};
		}
		this.params = params;
		if (!this.params.header) {
			this.params.header = '._l-header';
		}
		if (!this.params.class) {
			this.params.class = '_l-header--is-scrolled';
		}

		this.container = document.querySelector(container);
		this.header    = document.querySelector(this.params.header);
		this.setListener();
	}

	setListener() {
		this.container.addEventListener('scroll', (event) => {
			const scroll = container.scrollTop;
			if (scroll > 0) {
				this.header.classList.add(this.params.class);
			} else {
				this.header.classList.remove(this.params.class);
			}
		}, false);
	}
}
