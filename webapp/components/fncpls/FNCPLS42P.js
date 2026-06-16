/*************************************************************************
* @ 서비스경로 : FNCPL42P
* @ 파일명      : FNCPL42P  금융+ > 환율계산기 > [P] 외환 선택
* @ 화면ID	  : PBWFI049901
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-10            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';
import ListManager from "../../resources/js/common/ListManager.js";

export class FNCPLS42P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		this.callbackFunc = null;
		this.listManager = null;
		this.eventReceiver = new EventTarget();
	}
	
	init (param, callbackFunc) {
		super.init(this);
		
		this.callbackFunc = callbackFunc;
		
		this.loadList(param);
		
		this.register();
	}
	
	async loadList (param) {
		// 통화 코드 목록
		this.listManager = GlobalApp.getListManager(this.rootElem, {
			container: '#cucdSelectList',
			usePagination: false,
			listItemHtmlPath: '/components/fncpls/FNCPLS42P_L.html',
			listItemJsPath: '/components/fncpls/FNCPLS42P_L.js'
		});
		
		let itemList = [];
		param.cucdList.forEach((item) => {
			let selChk = 'N';
			if (item.PB_CMN_CD_ID === param.currentCucd) {
				selChk = 'Y';
			}
			let itemData = {
				id : item.PB_CMN_CD_ID,
				selectCucdNm : item.PB_CMN_CD_NM,
				selectCucd : item.PB_CMN_CD_ID,
				selectCheck : selChk
			}
			itemList.push(itemData);
		});
		
		await this.listManager.render(itemList, this.eventReceiver);
		this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
	}
	
	onItemAction (event) {
		const { id, action, status } = event.detail;
		this.callbackFunc({selCucd : event.detail.id});
	}
	
	register () {
	}
	
	destroy () {
		super.destroy(this);
	}
}

