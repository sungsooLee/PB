import { BaseModule } from '../../../../cmm/BaseModule.js';

/**
 * @ 서비스경로 : NMCRMNG20M_L
 * @ 파일명      : Noti_L.js AI지식상담 공지사항- 목록(리스트 item)
 * @ 화면ID 	 : PBWAI000000
 */

export default class Noti_L extends BaseModule {
    constructor(elem, eventTarget) {
        super(elem);
        this.elem = elem;
        this.eventTarget = eventTarget;
    }

    init (data, callback) {
        super.init(this);


        console.log('notiL init!!!!!!');
        this.initRegist();
    }

    initRegist () {

        console.log('this elem : ' , this.elem);
        this.registerCallback('click', $$(this.elem).find('#notiBtn'), this.handleClick );
    }

    // 버튼이벤트
    handleClick (e) {

        console.log('!!!');

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

    destroy() {
        super.destroy(this);
    }
}
