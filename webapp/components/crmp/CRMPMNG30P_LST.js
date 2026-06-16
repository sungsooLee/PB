/*************************************************************************
* @ 서비스경로 : CRMPMNG30P
* @ 파일명      : CRMPMNG30P_LST  고객관리 > 통합고객번호 검색 리스트
* @ 화면ID	  : PBWCL019900
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

export default class CRMPMNG30P_LST {
    constructor(elem, eventTarget) {
        this.elem = elem;
        this.eventTarget = eventTarget;

        console.log('ListItem constructor : ', this.eventTarget);
        // 버튼
    }

    init () {
        console.log('listItem init!!');
        $$(this.elem).on('click', this.handleClick.bind(this));
    }

    handleClick (e) {
        e.preventDefault();

        this.eventTarget.dispatchEvent(
            new CustomEvent('itemAction', {
                detail : {
                    id : this.elem.dataset.id,
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
