export default class MENU10P_L2 {
	constructor(elem, eventTarget) {
		this.elem = elem;
		this.eventTarget = eventTarget;
	}
	
	init () {
		const hgrnNm = $$(this.elem).find('[data-bind="HgrnNm"]').text();
		console.log("#####hgrnNm", hgrnNm);
		if (hgrnNm === '') {
			$$(this.elem).find('[data-bind="HgrnNm"]').hide();
			$$(this.elem).find('.bul').hide();
			$$(this.elem).find('.blind').hide();
		}
		const keyword = $$(this.elem).find('[data-bind="keyword"]').text();
		const regex = new RegExp(keyword, 'gi');
		const fullNm = $$(this.elem).find('#fullNm').text();
		const newNm = fullNm.replace(regex, `<mark>$&</mark>`);
		$$(this.elem).find('#fullNm').html(newNm);
		$$(this.elem).find("a").on("click", this.handleClick.bind(this));
	}
	
	handleClick (e) {
		e.preventDefault();
		this.eventTarget.dispatchEvent(
			new CustomEvent('itemAction', {
				detail : {
					id : this.elem.dataset.id,
					action : 'click',
					status : 'success'
				}
			})
		)
	}
	
	destroy() {
		super.destroy(this);
	}
}