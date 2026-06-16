/*************************************************************************
* @ 서비스경로 : DSCMNG40P
* @ 파일명      : DSCMNG40P 일정관리 > 영업 캘린더 > 생일 상세 팝업
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

export class DSCMNG40P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    }

    init (param) {
    	super.init(this);
    	
    	$$('#name').text(param.name);
    	$$('#basDt').text(param.basDt);
    	console.log('param.birthDscd : ', param.birthDscd);
    	
    	if(param.birthDscd === '') {
    		$$('#birthDscd').hide();
    	}else {
    		$$('#birthDscd').show();
    	}
    	$$('#birthDscd').text(param.birthDscd === '01' ? '양력' : param.birthDscd === '02' ? '음력' : '');
    	$$('#itemId').html(param.itemId);
    	$$('#cusGdcd').html(param.cusGdcd === '010100' ? 'TCE고객' : 'TC고객');
    }
       
    /**
     * ComPopUtils의 btn1 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn1CallBack () {
    
    }
    
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn2CallBack () {
   
    }

    destroy () {
        super.destroy(this);
    }
}
