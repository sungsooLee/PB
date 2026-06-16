/*************************************************************************
* @ 서비스경로 : DSCMNG12P
* @ 파일명      : DSCMNG12P 일정관리 > 영업 캘린더 > 목록 > 반복/단독일정 팝업
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class DSCMNG12P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	[this.recurring, this.setRecurring] = this.useState('recurring', 'N');
    }

    init (param) {
    	super.init(this);
    	
    	$$(document).findByName('recurringRad001', 'click', (evnt, elem) => {
    		this.setRecurring(elem.value);
    	});
    }
        
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
    	const result = { 
    		data : {
    			recurring: this.recurring.value
    		}
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	
        return result;
    }

    destroy () {
        super.destroy(this);
    }
}
