/*************************************************************************
* @ 서비스경로 : MENU14M
* @ 파일명      : MENU14M  [P] 전체 메뉴 > 서비스 이용 동의서
* @ 화면ID	  : PBWME020000
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

export default class MENU14M extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
	}
	
	init () {
		console.log("####MENU14M#####init");
		super.init(this);
		this.register();
	}
	
	register () {
	}
	
	destroy () {
		super.destroy(this);
	}
}