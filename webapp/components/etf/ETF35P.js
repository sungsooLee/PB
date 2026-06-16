/*************************************************************************
* @ 서비스경로 : ETF35P
* @ 파일명      : ETF35P ETF > ETF 상세 > ETF > 클래스 비교
* @ 화면ID	  : PBWFU049904
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class ETF35P extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    }

    init (param) {
    	
    	super.init(this);
    	
    	let html = '';
    	
    	$.each(param, function(param, item) {
    		
    		let temDisNm1 = typeof item.temDisNm1 === 'undefined' ? '' : item.temDisNm1;
    		let temDisNm2 = typeof item.temDisNm2 === 'undefined' ? '' : item.temDisNm2;
    		let dtlDis1 = typeof item.dtlDis1 === 'undefined' ? '' : item.dtlDis1;
    		let dtlDis2 = typeof item.dtlDis2 === 'undefined' ? '' : item.dtlDis2;
    		
    		html += '<tr>';
			html += '	<td>'+item.prdKorlNm+'</td>';
			html += '	<td>'+(Number(item.totPfeRt) === 0 ? '없음' : Number(item.totPfeRt)+'%') +'</td>';
			html += '	<td>'+(Number(item.pocpFee) === 0 ? '없음' : temDisNm1 +' '+dtlDis1+'의 '+Number(item.pocpFee)+'%') +'</td>';
			html += '	<td>'+(Number(item.rprhFee) === 0 ? '없음' : temDisNm2 +' '+dtlDis2+'의 '+Number(item.rprhFee)+'%') +'</td>';
			html += '</tr>';
		});
    	$$("#clasCmrs").html(html);
    	
    }
    
    register() {
    	
    }
    
    destroy () {
        super.destroy(this);
    }
}
