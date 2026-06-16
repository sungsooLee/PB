/*************************************************************************
* @ 서비스경로 : LGIN22M
* @ 파일명      : LGIN22M.html 로그아웃
* @ 화면ID		: PBWLO050000
* @ 작성자      : 90194835
* @ 작성일      : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class LGIN22M extends BaseModule {
		constructor(elem) {
			super(elem);
		}

		init () {
			super.init(this);
			this.register();
		}
		
		async register() {
			
			const btnLoginMoveClick = async () => {
				const route = 'lgin40m';
				router.navigate(route);
			};
			this.registerCallback('click', $$('#btnLogin'), btnLoginMoveClick);
			
			$$('#btnRm').on('click', async (e) => await this.moveRmApp(e));									// RM으로 가기
		}
		
		/**
		 * RM으로 가기
		 */
		async moveRmApp(e) {
			const url = '/pb/api/lgin/logout';
			const params = {};
			const res = await ApiUtils.sendGet(url, params);
			if (res.resultCode === '000000') {
				NativeUtils.callSelectChannel('1');
			}
		}

		destroy() {
			super.destroy(this);
		}
}