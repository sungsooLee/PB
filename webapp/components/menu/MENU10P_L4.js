export default class MENU10P_L4 {
	constructor(elem, eventTarget) {
		this.elem = elem;
		this.eventTarget = eventTarget;
	}
	
	init () {
		//$$(this.elem).find("#menuTabNm").on("click", this.handleClick.bind(this));
		const selClass = $$(this.elem).find('[data-bind="seq"]').text();
		if(selClass === "0") {
			$$(this.elem).addClass('tab-active');
		}
		$$(this.elem).find('#menuTabNm').addAttr('href', '#gnb-list'+this.elem.dataset.id);
	}
	
	handleClick (e) {
		e.preventDefault();
		
		this.eventTarget.dispatchEvent(
			new CustomEvent('itemAction', {
				detail : {
					
				}
			})
		);
	}
	
	destroy() {
		super.destroy(this);
	}
}