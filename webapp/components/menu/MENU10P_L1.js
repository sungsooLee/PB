export default class MENU10P_L1 {
	constructor(elem, eventTarget) {
		this.elem = elem;
		this.eventTarget = eventTarget;
	}
	
	init () {
		$$(this.elem).find('#searchKey').on('click', this.searchKeyClick.bind(this));
		$$(this.elem).find('#deleteKey').on('click', this.deleteKeyClick.bind(this));
	}
	
	searchKeyClick (e) {
		e.preventDefault();
		this.eventTarget.dispatchEvent(
			new CustomEvent('keywordAction', {
				detail : {
					id : this.elem.dataset.id,
					action : 'search',
					status : 'success'
				}
			})
		);
	}
	
	deleteKeyClick (e) {
		e.preventDefault();
		this.eventTarget.dispatchEvent(
			new CustomEvent('keywordAction', {
				detail : {
					id : this.elem.dataset.id,
					action : 'delete',
					status : 'success'
				}
			})
		);
	}
	
	destroy() {
		super.destroy(this);
	}
}