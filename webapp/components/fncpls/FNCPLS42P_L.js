export default class FNCPLS42P_L {
	constructor(elem, eventTarget) {
		this.elem = elem;
		this.eventTarget = eventTarget;
	}
	
	init () {
		$$(this.elem).find("#selCucdBtn").on("click", this.handleClick.bind(this));
		const selClass = $$(this.elem).find('[data-bind="selectCheck"]').text();
		if(selClass === 'Y') {
			$$(this.elem).addClass('select-active');
			$$(this.elem).find('#selCucdBtn').addAttr('aria-label', '선택됨');
		}
	}
	
	handleClick (e) {
		e.preventDefault();
		this.eventTarget.dispatchEvent(
			new CustomEvent('itemAction', {
				detail: {
					id: this.elem.dataset.id,
					action: 'click',
					status: 'success'
				}
			})
		);
	}
	
	destroy() {
		super.destroy(this);
	}
}