/*************************************************************************
* @ 서비스경로 : DSCMNG25P_LIST
* @ 파일명      : DSCMNG25P_LIST 일정관리 > 영업 캘린더 > 일정 등록 > 공유 팝업[LIST]
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';

export default class DSCMNG25P_LIST extends BaseModule {
	
    constructor(elem, eventTarget) {
    	super(elem);
    	this.elem = elem;
        this.eventTarget = eventTarget;
    }

    init () {
    	super.init(this);

    	$$(this.elem).find('input[name="prlmCheckBtn"]').on('click', this.clickList.bind(this));
    }
    
    clickList (e) {
    	this.eventTarget.dispatchEvent(
    		new CustomEvent('itemAction', {
    			detail : {
    				email : this.elem.dataset.id,
    				deptNm : $$(this.elem).find('[data-bind="DEPT_NM"]').text(),
    				prlmNm : $$(this.elem).find('[data-bind="EMP_NM"]').text(),
    				posiNm : $$(this.elem).find('[data-bind="POSI_NM"]').text(),
    				checked: e.target.checked,
    				action : 'click',
    				status : 'success'
    			}
    		})
    	);
    }
    
    destroy () {
        super.destroy(this);
    }
}
