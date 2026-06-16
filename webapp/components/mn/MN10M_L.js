/*************************************************************************
* @ 서비스경로 : MN10M_L
* @ 파일명      : MN10M_L.js 메인 - [T] 홈
* @ 화면ID		: PBWMA000000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-14            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export default class MN10M_L extends BaseModule {
		constructor(elem, eventTarget) {
			super(elem);
			this.elem = elem;
	        this.eventTarget = eventTarget;
		}
		
		init () {
			this.initRegist();
			$$(this.elem).on('click', this.handleClick.bind(this));
		}
		
		/**
	     *  데이터에 따른 add class 처리
	     * @param 
	     */
		async initRegist() {
			// 오늘 여부
			const isToday = $$(this.elem).find('[data-bind="today"]').text();
			// 주말 확인
			const isHoliday = $$(this.elem).find('[data-bind="isHoliday"]').text();
			// 선택일
			const isday = $$(this.elem).find('[data-bind="isday"]').text();
			
			if(isToday === 'today') {
				$(this.elem).find('[data-bind="today"]').closest('li').addClass(isToday);
				$(this.elem).find('[data-bind="today"]').closest('li').addClass(isday);
			}
			if(isHoliday === 'weekend') {
				$(this.elem).find('[data-bind="isHoliday"]').closest('li').addClass(isHoliday);
			}
		}
		
		// 버튼이벤트 
		handleClick (e) {
	        e.preventDefault();
	        
	        let $elem = $(this.elem);
	        $elem.closest('li').addClass('is-active');
	        $elem.siblings().removeClass('is-active');
	        
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