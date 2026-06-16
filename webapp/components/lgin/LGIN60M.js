/*************************************************************************
* @ 서비스경로 : LGIN60M
* @ 파일명      : LGIN60M.js      로그인 - 사용자 이용동의 - 완료
* @ 화면ID		: PBWLO020003
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

export default class LGIN60M extends BaseModule {
		constructor(elem, param) {
			super(elem);
			
			[this.originalUri, this.setOriginalUri] = this.useState('originalUri', '');
	        
	        if(Object.keys(param).length > 0) {
				if(param.hasOwnProperty('originalUri')) {
					this.setOriginalUri(param.originalUri);
				}
			}
		}

		init () {
			super.init(this);
			$$('#btnCom').on('click', () => {
				// 페이지 이동 - 임시메뉴
				let route = '';
				
				if(this.originalUri.value !== '') {
					route = this.originalUri.value;
				}else {
					route = 'mn10m';					
				}
				router.navigate(route);
			});								// 확인
		}
		
		destroy() {
			super.destroy(this);
		}
}