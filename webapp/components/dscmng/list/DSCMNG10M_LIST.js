/*************************************************************************
* @ 서비스경로 : DSCMNG10M_LIST
* @ 파일명      : DSCMNG10M_LIST 일정관리 > 영업 캘린더 > 월간 일정[LIST]
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

export default class DSCMNG10M_LIST {
	
	constructor(elem, eventTarget) {
    	this.elem = elem;
        this.eventTarget = eventTarget;
    }

    init () {
    	$$(this.elem).on('click', this.clickList.bind(this));
    }
   
    clickList (e) {
	   e.preventDefault();
    	
    	this.eventTarget.dispatchEvent(
    		new CustomEvent('itemAction', {
    			detail : {
    				itemId : this.elem.dataset.id,
    				recurringYn: $$(this.elem).find('[data-bind="recurringYn"]').text(),
    				type: $$(this.elem).find('[data-bind="type"]').text(),
    				birthDscd: $$(this.elem).find('[data-bind="birthDscd"]').text(),
    				basDt: $$(this.elem).find('[data-bind="basDt"]').text(),
    				basDtFormat: $$(this.elem).find('[data-bind="basDtFormat"]').text(),
    				name: $$(this.elem).find('[data-bind="subject"]').text(),
    				crmpAcvtActSrno: $$(this.elem).find('[data-bind="crmpAcvtActSrno"]').text(),
    				cusGdcd: $$(this.elem).find('[data-bind="cusGdcd"]').text(),
    				crmPrdNm: $$(this.elem).find('[data-bind="crmPrdNm"]').text(),
    				afcKrwBal: $$(this.elem).find('[data-bind="afcKrwBal"]').text(),
    				actXprDt: $$(this.elem).find('[data-bind="actXprDt"]').text(),
    				actXprDt2: $$(this.elem).find('[data-bind="actXprDt2"]').text(),
    				aplIrt: $$(this.elem).find('[data-bind="aplIrt"]').text(),
    				kycReCnfScdDt: $$(this.elem).find('[data-bind="kycReCnfScdDt"]').text(),
    				
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
