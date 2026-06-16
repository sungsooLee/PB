/*************************************************************************
* @ 서비스경로 : FND_TEM
* @ 파일명      : FND_TEM 펀드 > 기간팝업
* @ 화면ID		: PBWFU059901
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FND_TEM extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.term, this.setTerm] = this.useState('term', '3');
		
	}
	
	init(param) {
		console.log('펀드 > 기간팝업');

		super.init(this);
		
		this.setTerm(param.term);
		document.querySelector('input[name="term"][value="'+param.term+'"]').setAttribute("checked",true);
		
		this.initRadio();
		
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
			
		
	}
	
	/**
	 * 저장 하단버튼 응답콜백
	 */
	
	returnToBtn2CallBack () {
		const param = {
			term: this.term.value
		}
		
		return param;
    }
	
	/**
	 * 아바타 선택 라디오버튼 세팅
	 */
	initRadio() {
		
		const setTerm = (event, element) => {
			this.setTerm(element.value);
	    }
		
		$$(document).findByName('term', 'click', setTerm);
	}
	
	
	destroy() {
		super.destroy(this);
	}
	
	
}

