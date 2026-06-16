/*************************************************************************
* @ 서비스경로 : LGIN51P
* @ 파일명      : LGIN51P.js    로그인 - 사용자 이용동의 약관 
* @ 화면ID		: PBWLO010003
* @ 작성자      : 90194835
* @ 작성일      : 2024-11-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-27            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class LGIN51P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
    }

    init () {
        super.init(this);
        
        $('#btmBtn2').attr('aria-disabled', true);
        $('#btmBtn2').attr('disabled','');
        
        const modal = document.querySelector('#cmmModal');
        const modalScrollWrap = modal.querySelector('.modal__content');
        
        const observation = () => {
            const sentinalEl = modal.querySelector('.sticky-sentinal-terms');
            const termsButton = modal.querySelector('.modal__footer #btmBtn2')
    
            // Initial state
            const handler = (entries) => {
                if (entries[0].isIntersecting) {
                    termsButton.setAttribute('aria-disabled', false)
                    termsButton.removeAttribute('disabled')
                }
            }
    
            const observer = new window.IntersectionObserver(handler);
    
            if (sentinalEl != null) {
                observer.observe(sentinalEl);
            }

        }

        observation();

        modalScrollWrap.addEventListener('scroll', observation());
    }

    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
    	
    	if($('#btmBtn2').attr('aria-disabled') === 'false') {
    		const result = { data : '', resultCd : '000000', resultMsg : 'SUCCESS'};
    		return result;
    	}
    }

    destroy () {
        super.destroy();
    }
}