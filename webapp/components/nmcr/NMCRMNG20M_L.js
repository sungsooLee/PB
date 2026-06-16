/*************************************************************************
* @ 서비스경로 : NMCRMNG20M_L
* @ 파일명      : NMCRMNG20M_L.js 지점 명함첩 - 목록(리스트 item)
* @ 화면ID 	 : PBWBU030000
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-06            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';

export default class NMCRMNG20M_L extends BaseModule {
		constructor(elem, eventTarget) {
			super(elem);
			this.elem = elem;
	        this.eventTarget = eventTarget;
		}
		
		init () {
			$$(this.elem).find('#detailRowData').on('click', this.handleDetailClick.bind(this)); 			// 버튼이벤트 - 상세화면
			$$(this.elem).find('#btnExpyMod').on('click', this.handleExpyModClick.bind(this)); 		// 버튼이벤트 - 연장하기
			
			this.initRegist();
		}
		
		/**
	     *  만료일에 따른 add class 처리 
	     * @param 
	     */
		async initRegist() {
			const cls = $$(this.elem).find('[data-bind="cls"]').text();
			if(cls !== '') {
				$$(this.elem).find('[data-bind="dDay"]').addClass(cls);
			}
			
			const key = $(this.elem).find('[data-bind="favtUsgYn"]').css('display');
			if(key === 'block') {
				$(this.elem).find('[data-bind="favtUsgYn"]').css({'display':''});
			}
			
			const keyShrgYn = $(this.elem).find('[data-bind="nmcrShrgYn"]').css('display');
			if(keyShrgYn === 'block') {
				$(this.elem).find('[data-bind="nmcrShrgYn"]').css({'display':''});
			}
		}
		
		// 버튼이벤트
		handleExpyModClick (e) {
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
		
		handleDetailClick(e) {
			e.preventDefault();
			
			this.eventTarget.dispatchEvent(
		            new CustomEvent('itemAction', {
		                detail : {
		                    id : this.elem.dataset.id,
		                    action : 'detailClick',
		                    status : 'success'
		                }
		            })
		        );
		}
	
		destroy() {
			super.destroy(this);
		}
}
