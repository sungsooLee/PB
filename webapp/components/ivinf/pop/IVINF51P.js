/*************************************************************************
* @ 서비스경로 : IVINF51P
* @ 파일명      : IVINF51P.js 투자정보 > AI 시장지수 분석(데자View) 설정
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '../../cmm/BaseModule.js';

export class IVINF51P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
        
        [this.ric, this.setRic] = this.useState('ric', '.KS11');
        [this.ricNm, this.setRicNm] = this.useState('ricNm', '코스피');
        
        [this.temDcnt, this.setTemDcnt] = this.useState('temDcnt', '60');
        [this.temDcntMonth, this.setTemDcntMonth] = this.useState('temDcntMonth', '3');
        
        [this.ycnt, this.setYcnt] = this.useState('ycnt', '5');
    }

    init (params) {
        super.init(this);
       
        this.setRic(params.ric);
        this.setRicNm(params.ricNm);
        this.setTemDcnt(params.temDcnt);
        this.setTemDcntMonth(params.temDcntMonth);
        this.setYcnt(params.ycnt);
        
        $('input[name="ric"][value="'+params.ric+'"]').prop('checked', true);
        $('input[name="temDcnt"][value="'+params.temDcnt+'"]').prop('checked', true);
        $('input[name="ycnt"][value="'+params.ycnt+'"]').prop('checked', true);
        
        $$(document).findByName('ric', 'click', async(evnt, elem) => this.ricCallBack(evnt, elem));
        $$(document).findByName('temDcnt', 'click', async(evnt, elem) => this.temDcntCallBack(evnt, elem));
        $$(document).findByName('ycnt', 'click', async(evnt, elem) => this.ycntCallBack(evnt, elem));
    }

     async ricCallBack (evnt, elem) {
    	this.setRic(elem.value);
    	this.setRicNm(elem.getAttribute('data-name'));
    }
    
     async temDcntCallBack (evnt, elem) {
    	 this.setTemDcnt(elem.value);

	     if(elem.value === '60') {
	     	this.setTemDcntMonth('3');
	     }else if(elem.value === '120') {
	     	this.setTemDcntMonth('6');
	     }else if(elem.value === '240') {
	     	this.setTemDcntMonth('12');
	     }
    }
    
     async ycntCallBack (evnt, elem) {
    	 this.setYcnt(elem.value);
    }
     
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
    	const result = { 
    		data : {
    			'ric': this.ric.value
    			, 'ricNm': this.ricNm.value
    			, 'temDcnt': this.temDcnt.value
    			, 'temDcntMonth': this.temDcntMonth.value
    			, 'ycnt': this.ycnt.value
    		}
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	
        return result;
    }

    destroy () {
        super.destroy();
    }
}