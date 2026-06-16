/*************************************************************************
* @ 서비스경로 : MNG01M_L
* @ 파일명      : MNG01M_L.js 관리 > 고객명함 메모 관리 > 목록
* @ 화면ID		: PBWAD000000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-20            윤은정                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';

export default class MNG01M_L extends BaseModule {
		constructor(elem, eventTarget) {
			super(elem);
			this.elem = elem;
	        this.eventTarget = eventTarget;
		}
		
		init () {
			this.initRegist();
			$$(this.elem).find('#btnDel').on('click', this.handleClick.bind(this));
		}
		
		async initRegist() {
			// 나만보기 display 정리
			const css = $(this.elem).find('[data-bind="memoHdnYn"]').css('display');
			if(css !== 'none') {
				$$(this.elem).find('[data-bind="memoHdnYn"]').css({'display':''});
			}
		}
		
		// 버튼이벤트 
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
	        );
	    }

		destroy() {
			super.destroy(this);
		}
}