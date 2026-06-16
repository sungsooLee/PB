export default class MENU10P_L2 {
	constructor(elem, eventTarget) {
		this.elem = elem;
		this.eventTarget = eventTarget;
	}
	
	init () {
		const menuId = $$(this.elem).find('[data-bind="PBLINKURL"]').text();
		$$(this.elem).find('[name="goMenuUrl"]').addAttr('id', menuId);
		const imgURL = $$(this.elem).find('[data-bind="iconURL"]').text();
		$$(this.elem).find('source').addAttr('srcset', imgURL);
		$$(this.elem).find('img').addAttr('src', imgURL);
		$$(this.elem).find('img').addAttr('alt', $$(this.elem).find('[data-bind="PBMENUNM"]').text());
	}
	
	destroy() {
		super.destroy(this);
	}
}