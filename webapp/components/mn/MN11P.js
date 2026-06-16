/*************************************************************************
* @ 서비스경로 : MN11P
* @ 파일명      : MN11P.js 메인 - [T] 홈 > 공지팝업
* @ 화면ID		: PBWMA000000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-20            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class MN11P extends BaseModule {
	constructor(elem) {
        super(elem);
        this.elem = elem;
        this.rootElem = elem;
		this.callbackFunc = null;
        
		[this.popData, this.setPopData] 	= this.useState('popData', '');
    }
	
    init (param, callbackFunc ) {
        super.init(this);
        
        this.callbackFunc = callbackFunc;
        
        this.setPopData(param);
        
        this.setPopupData();
        
        this.register();
    }
    
    async register() {
    	 
    	 $$('#btnPopView').on('click', async () => {
    		 this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
    	 });
    }
    
    /**
	 * 데이터 출력
	 * @param
	 */
    async setPopupData() {
    	const popMsg = this.popData.value;
    	
    	$$('#popTitTxt').text(popMsg.blbrTitleNm);
    	$$('#popBlbrTxt').text(popMsg.blbrTxt)
    }
	
    destroy () {
    	// 공지팝업 공통 버튼 클래스 복구
    	$$('#btmBtn1').removeClass('fs-18');
		$$('#btmBtn2').removeClass('fs-18');
		
    	$$('#btmBtn1').addClass('btn-outlined');
    	$$('#btmBtn1').addClass('btn-secondary');
		$$('#btmBtn2').addClass('btn-primary');
		
        super.destroy(this);
    }
}