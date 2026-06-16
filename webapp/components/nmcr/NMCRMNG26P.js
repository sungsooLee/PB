/*************************************************************************
* @ 서비스경로 : NMCRMNG26P
* @ 파일명      : NMCRMNG26P 고객명함 관리 - 지점 명함첩 - 변경내역
* @ 화면ID 	 : PBWBU069900	
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-13            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export class NMCRMNG26P extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.callbackFunc = null;
        
        [this.mNmcrMngNo, this.setMnmcrMngNo] = this.useState('mNmcrMngNo', '');
	}
	
	init (param, callbackFunc ) {
		super.init(this);
		
		this.setMnmcrMngNo(param.nmcrMngNo);
		
		this.callbackFunc = callbackFunc;
		
		this.loadData();
	}
	
	/**
    *  변경이력조회
    * @param 
    */
	async loadData() {
    	const url = '/pb/api/nmcr/cus/nmcrHistoryLst.json';
    	const params = {
    			nmcrMngNo: this.mNmcrMngNo.value
    	};
    	
    	const res = await ApiUtils.sendPost(url, params);
    	
    	if (res.resultCode === "000000") {
    		const items = res.data.data;
    		
    		this.listManager = GlobalApp.getListManager(this.rootElem, {
				usePagination : false,
				container : '#modalListContainer',
				listItemHtmlPath : '/components/nmcr/NMCRMNG26P_L.html',
				listItemJsPath : '/components/nmcr/NMCRMNG26P_L.js'
			});
    		
			items.forEach((val, idx) => {
    			val.id = val.logSrno;
    			val.chgTxt = (val.nmcrChgStcd === 'I' ? '등록' : '변경');
    		});
			
			await this.listManager.render(items, this.eventReceiver);
    	}
	}

    destroy() {
        super.destroy(this);
    }
}	