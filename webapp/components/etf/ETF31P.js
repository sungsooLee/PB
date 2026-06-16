/*************************************************************************
* @ 서비스경로 : ETF31P
* @ 파일명      : ETF31P  ETF > ETF 상세 > ETF > 기간별 기준가/수익률
* @ 화면ID	  : PBWFU049901
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class ETF31P extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    }

    init (param) {
    	
    	super.init(this);
    	tableInnerScroll.init();
    	const _this = this;
    	
    	let html = '';
    	let classNm = '';
    	
    	$$(".month").text(param.term+"개월");
    	if(param.inq5Grid.length > 0) {
	    	$.each(param.inq5Grid, function(idx, item) {
	    		html += '<tr>';
	    		html += '<td>'+_this.formatChange(item.basDt)+'</td>';
	    		
	    		classNm = '';
	    		classNm = Number(item.stdv1Nidx) === 0 ? '' : (item.stdv1Nidx < 0 ? 'fc-deepblue-600' : 'fc-red-600');
	    		let stdv1Nidx  = item.stdv1Nidx > 0 ? '+'+item.stdv1Nidx : item.stdv1Nidx;
	    		html += '<td>'+item.fndBasPr.toFixed(2)+' <br> <span class="'+classNm+'">'+stdv1Nidx+'%</span></td>';
	    		
	    		classNm = '';
	    		classNm =  Number(item.stdv4Nidx) === 0 ? '' : (item.stdv4Nidx < 0 ? 'fc-deepblue-600' : 'fc-red-600');
	    		let stdv4Nidx  = item.stdv4Nidx > 0 ? '+'+item.stdv4Nidx : item.stdv4Nidx;
	    		html += '<td><span class="'+classNm+'">'+stdv4Nidx+'%</span></td>';
	    		
	    		classNm = '';
	    		classNm =  Number(item.stdv5Nidx) === 0 ? '' : (item.stdv5Nidx < 0 ? 'fc-deepblue-600' : 'fc-red-600');
	    		let stdv5Nidx  = item.stdv5Nidx > 0 ? '+'+item.stdv5Nidx : item.stdv5Nidx;
	    		html += '<td><span class="'+classNm+'">'+stdv5Nidx+'%</span></td>';
	    		html += '</tr>';
	    	})
    	} else {
    		html += '<tr>';
			html += '<td colspan="4">';
			html += '	<p class="description caution body-small d-inflex">내용이 없습니다.</p>';
			html += '</td>';
			html += '</tr>';
    	}
    	
    	$$("#fndNm").text(param.fndNm);
    	$$("#inq5Grid").html(html);
  
    }
    
    formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
    
     truncateNumber(num, decimalNum) {
    	 const factor = Math.pow(10,decimalNum);
    	 return Math.floor(num*factor)/factor;
     }
    
    register() {
    	
    }
    
    destroy () {
        super.destroy(this);
    }
}
