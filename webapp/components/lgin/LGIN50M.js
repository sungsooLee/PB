/*************************************************************************
* @ 서비스경로 : LGIN50M
* @ 파일명      : LGIN50M.js  로그인 - 사용자 이용동의 
* @ 화면ID		: PBWLO010003
* @ 작성자      : 90194835
* @ 작성일      : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-21            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class LGIN50M extends BaseModule {
		constructor(elem, param ) {
	        super(elem);
	        this.rootElem = elem;
	        
	        [this.originalUri, this.setOriginalUri] = this.useState('originalUri', '');
	        
	        if(Object.keys(param).length > 0) {
				if(param.hasOwnProperty('originalUri')) {
					this.setOriginalUri(param.originalUri);
				}
			}
		}

		init () {
			super.init(this);
			this.register();
		}
		
		register() {
			$$('#chkAgreeAll').on('click', async () => await this.handleAgreeAllClick());				// 전체동의
			$$('input[name="agree"]').on('click', async () => await this.handleAgreeClick());		// 세부동의
			
			$$('#btnAgree').addAttr( 'aria-disabled', true);
			
			this.registerCallback('touchend', $$('#btnAgree'), this.handleClick);								// 동의
			
			history.pushState(null, null, location.href);
		}
		
		// 전체동의
		async handleAgreeAllClick() {
			const allCheck = $('#chkAgreeAll').is(':checked');
			if(allCheck) {
				$('input[name="agree"]').prop('checked', true);
				$$('#btnAgree').addAttr( 'aria-disabled', false);
			} else {
				$('input[name="agree"]').prop('checked', false);
				$$('#btnAgree').addAttr( 'aria-disabled', true);
			}
		}
		
		// 모든 약관 동의 확인
		async handleAgreeClick() {
			let agreeChk = 0;
			$('input[name="agree"]').each(function() {
				if($(this).is(':checked')) {
					agreeChk++;					
				}
			})
			
			if(agreeChk === $('input[name="agree"]').length) {
				$('#chkAgreeAll').prop('checked', true);
				$$('#btnAgree').addAttr( 'aria-disabled', false);
			} else {
				$('#chkAgreeAll').prop('checked', false);
				$$('#btnAgree').addAttr( 'aria-disabled', true);
			}
		}
		
		// 동의
		async handleClick() {
			const hasCls	= $('#btnAgree').attr('aria-disabled');
			if(hasCls === 'true') {																									// 저장 가능 상태 확인
				return false;
			}
			//서비스이용약관
			const route = 'lgin51p';							
			await GlobalApp.popupUtils.openPopup(route, {
                showCloseBtn : false,
                btn2Label : '전체 동의',
                btn2IsMain : true,
//                onYes: (result) => this.handleAgree(result),
                onYes : async(result) => {	 // 동의 최종 확인
                	const url = '/pb/api/lgin/agreeAll';
        			const params = {
        					usgYn: 'Y'
        				};
        			const res = await ApiUtils.sendPost(url, params);
        			
        			if(res.resultCode === '000000') {
        				const route = 'lgin60m';								//서비스 이용 신청 완료
        				let props = {};
        				
        				if(this.originalUri.value !== '') {
        					props = {
        							originalUri: this.originalUri.value
        					}
        				}
        				router.navigate(route, props);
        			} else {
        				toastr.error(``, '동의 실패 : ' + res.resultMessage);
        			}
    			},
                onClose : (result) => console.log('onClose Result : ' , result),
            });
		}
		
		destroy() {
			super.destroy(this);
		}
}