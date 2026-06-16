/*************************************************************************
* @ 서비스경로 : IVINF28P
* @ 파일명      : IVINF28P.js 투자정보 - 종합 주요지수 - 주요지수 - 상세 - 일자별보기
* @ 화면ID		: PBWIV010001
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-02            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export class IVINF28P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.rootElem = elem;
		this.callbackFunc = null;
        
		[this.dateList, this.setDateList] 					= this.useState('dateList', '');
    }

    init (param, callbackFunc ) {
        super.init(this);
        
        this.setDateList(param.data);
        
        this.callbackFunc = callbackFunc;
        
        this.initDayData();
    }
    
    /**
     *  일자별 데이터 조회
     * @param 
     */
    async initDayData() {
		const items = this.dateList.value;
		
		items.sort((a , b) => a.basDt - b.basDt);
		let html = '';
		items.forEach((val, idx) => {
			val.id = idx;
			val.mBasDt = dayjs(val.basDt).format('YYYY-MM-DD');
			val.mKospiVal = CmmUtils.comma(val.stdv1Nidx.toFixed(2));
			val.mMax = (val.txt === '최고') ? true : false;
			val.mMin  = (val.txt === '최저') ? true : false;
			
			// 상승 rise, 보합 steady, 하락 fall
			let clsStr = '';
			if(parseFloat(val.mKospiFluc) < 0) {
				val.cls = 'fall';		
				clsStr = '등락폭(하락)';
			} else if(parseFloat(val.mKospiFluc) > 0) {
				val.cls = 'rise';
				clsStr = '등락폭(상승)';
			} else {
				val.cls = 'steady';
				clsStr = '등락폭(보합)';
			}
			
			html += '<tr>';
			html += '<th scope="row">';
			html += '	<div class="d-flex a-center gap2">';
			html += '		<div data-bind="mBasDt">' + val.mBasDt + '</div>';
			if(val.mMax) {
			html += '		<div class="tags tags-small tags-lightRed" aria-label="등락율" data-bind="mMax">기간최고</div>';
			} else if(val.mMin) {
			html += '		<div class="tags tags-small tags-lightBlue" aria-label="등락율" data-bind="mMin">기간최저</div>';
			}
			html += '	</div>';
			html += '</th>';
			html += '<td data-bind="mKospiVal">' + val.mKospiVal + '</td>';
			html += '<td>';
			if(val.mKospiFluc !== undefined && val.mKospiFluc !== '0.00') {
			html += '	<div class="stock ' + val.cls + '" aria-label="' + clsStr + '" data-bind="mKospiFluc">' + Math.abs(val.mKospiFluc).toFixed(2) + '</div>';
			} else {
			html += '	<div class="stock ' + val.cls + '" aria-label="' + clsStr + '" data-bind="mKospiFluc">0</div>';
			}
			html += '</td>';
			html += '</tr>';
		});
		$$('#listContainer').html(html);
    }
    
    destroy() {
        super.destroy(this);
    }
}