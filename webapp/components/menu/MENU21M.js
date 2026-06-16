/*************************************************************************
* @ 서비스경로 : MENU21M
* @ 파일명      : MENU21M  [P] 전체 메뉴 > 서비스 해지
* @ 화면ID	  : PBWME030000
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class MENU21M extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
	}
	
	init () {
		console.log("####MENU21M#####init");
		super.init(this);
		this.register();
	}
	
	register () {
		this.registerCallback('touchend', $$('#layoutBtn2'), async () => await this.srvcCancle());
		//$$('#layoutBtn2').on('touchend', async () => await this.srvcCancle());
	}
	
	async srvcCancle () {
		const url = '/pb/api/lgin/agreeAll';
		const params = {
			usgYn : 'N'
		};
		const data = await ApiUtils.sendPost(url, params);
		
		if (data.resultCode === '000000') {
			$swal.fire01('서비스 이용이 해지되었습니다.', '확인', false, '', () => {router.navigate('lgin40m')});
			
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}