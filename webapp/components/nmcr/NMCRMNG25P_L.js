/*************************************************************************
* @ 서비스경로 : NMCRMNG25P_L
* @ 파일명      : NMCRMNG25P_L.js 고객명함 관리 - 지점 명함첩 - 전체메모(리스트 item)
* @ 화면ID 	 : PBWBU050002
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-12            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';

export default class NMCRMNG25P_L extends BaseModule {
	constructor(elem, eventTarget) {
			super(elem);
			this.elem = elem;
	        this.eventTarget = eventTarget;
		}
		
		init () {
			$$(this.elem).find('#btnMemoMod').on('click', this.handleModClick.bind(this)); 				// 버튼이벤트 - 수정
			$$(this.elem).find('#btnMemoDel').on('click', this.handleDelClick.bind(this)); 				// 버튼이벤트 - 삭제
		}
		
		// 버튼이벤트 - 수정
		handleModClick (e) {
	        e.preventDefault();

	        this.eventTarget.dispatchEvent(
	            new CustomEvent('itemAction', {
	                detail : {
	                    id : this.elem.dataset.id,
	                    action : 'modClick',
	                    status : 'success'
	                }
	            })
	        );
	    }
		
		handleDelClick (e) {
	        e.preventDefault();

	        this.eventTarget.dispatchEvent(
	            new CustomEvent('itemAction', {
	                detail : {
	                    id : this.elem.dataset.id,
	                    action : 'delClick',
	                    status : 'success'
	                }
	            })
	        );
	    }

		destroy() {
			super.destroy(this);
		}
}
