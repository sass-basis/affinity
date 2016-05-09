'use strict';

export default class BasisMenu {
	constructor(container, params) {
		if (!container) {
			container = '._c-menu';
		}
		if (!params) {
			params = {};
		}
		this.params = params;

		this.container = document.querySelectorAll(container);
		this.setListener();
	}

	setListener() {
		for (let i = 0; i < this.container.length; i ++) {
			const container = this.container[i];

			const has_submenus = container.querySelectorAll('[aria-expanded]');
			for (let i = 0; i < has_submenus.length; i ++) {
				const item = has_submenus[i];
				item.addEventListener('mouseover', (event) => {
					this.open(item);
				}, false);

				item.addEventListener('mouseleave', (event) => {
					this.close(item);
				}, false);
			}
		}
	}

	open(item) {
		item.setAttribute('aria-expanded', 'true');
	}

	close(item) {
		item.setAttribute('aria-expanded', 'false');
	}
}
