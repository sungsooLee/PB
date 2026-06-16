/*************************************************************************
* @ 서비스경로 : IVINF21S
* @ 파일명      : IVINF21S.js 투자정보 - 종합 주요지수 - 주요지수 - 상세
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
import IvinfData from '/components/ivinf/comm/IvinfData.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF21S extends BaseModule {
	constructor(elem, data) {
        super(elem);
        this.rootElem = elem;
        this.chartManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.period, this.setPeriod] 					= this.useState('period', '2');																// 기간 탭 > 1: 1주일, 2: 3개월, 3: 1년, 4: 3년, 5: 5년
        [this.periodTxt, this.setPeriodTxt] 			= this.useState('periodTxt', '3개월');													// 기간 TEXT
        [this.formatter, this.setFormatter] 			= this.useState('formatter', 'YYYYMMDD');											// 날짜형식

        [this.inqStaDt, this.setInqStaDt] 			= this.useState('inqStaDt', '');																// 조회시작일
        [this.inqEndDt, this.setInqEndDt] 			= this.useState('inqEndDt', '');															// 조회종료일
        
        [this.inqPdcd, this.setInqPdcd] 				= this.useState('inqPdcd', data.inqPdcd);												// 지수구분코드
        [this.nidxNm, this.setNidxNm] 				= this.useState('nidxNm', IvinfData.changePbData(data.inqPdNm));		// 지수명 - pb won
        [this.fav, this.setFav] 							= this.useState('fav', data.fav);															// 관심등록여부
        [this.basDate, this.setBasDate] 				= this.useState('basDate', (data.basDate.length === 8 ? dayjs(data.basDate).format('YYYY-MM-DD') : data.basDate));	// 고시시각

        [this.kospiVal, this.setKospiVal] 				= this.useState('kospiVal', data.val);													// 지수값
        [this.kospiFluc, this.setKospiFluc] 			= this.useState('kospiFluc', CmmUtils.removeComma(data.eqvvRt));											// 등락폭
        [this.kospiRate, this.setKospiRate] 		= this.useState('kospiRate', data.rate);												// 등락율
        [this.exr, this.setExr] 							= this.useState('exr', data.exr);															// 환율 확인
        [this.rltmYn, this.setRltmYn] 					= this.useState('rltmYn', data.rltmYn);													// 실시간여부

        [this.afKospiFluc, this.setAfKospiFluc] 	= this.useState('afKospiFluc', '');															// 등락폭 - 비교
        [this.afKospiRate, this.setAfKospiRate] 	= this.useState('afKospiRate', '');														// 등락율 - 비교
        
        [this.basicVal, this.setBasicVal] 				= this.useState('basicVal', '');																// 기초종가
        [this.finalVal, this.setFinalVal] 				= this.useState('finalVal', '');																// 기말종가
        [this.maxVal, this.setMaxVal] 				= this.useState('maxVal', '');																// 기간 최고
        [this.minVal, this.setMinVal] 					= this.useState('minVal', '');																// 기간 최저
        [this.maxTxt, this.setMaxTxt] 				= this.useState('maxTxt', '');																// 기간 최고(일)
        [this.minTxt, this.setMinTxt] 					= this.useState('minTxt', '');																// 기간 최저(일)
        
        [this.nidxList, this.setNidxList] 				= this.useState('nidxList', []);
    }

    init () {
        super.init(this);
        
        this.initRegist();
        this.loadData();
    }
    
    async initRegist() {
    	this.bind( 'periodTxt', $$('#periodTxt') , 'string');    	
    	this.bind( 'nidxNm', $$('#nidxNm') , 'string');
    	this.bind( 'kospiVal', $$('#kospiVal') , 'string');
    	this.bind( 'kospiFluc', $$('#kospiFluc') , 'string');
    	this.bind( 'kospiRate', $$('#kospiRate') , 'string');    	
    	this.bind( 'basDate', $$('#basDateInfo') , 'string');    	
    	this.bind( 'afKospiFluc', $$('#afKospiFluc') , 'string');
    	this.bind( 'afKospiRate', $$('#afKospiRate') , 'string');    	
    	this.bind( 'basicVal', $$('#basicVal') , 'string');
    	this.bind( 'finalVal', $$('#finalVal') , 'string');
    	this.bind( 'maxTxt', $$('#maxVal') , 'string');
    	this.bind( 'minTxt', $$('#minVal') , 'string');
    	
    	this.registerCallback('click', $$('#dayView'), this.handleDayClick); 										// 일자별 보기
    	this.registerCallback('click', $$('#mpiView'), this.handleMpiClick); 										// 시장지수 비교 
    	this.registerCallback('click', $$('#exrView'), this.handleExrClick); 										// 환율정보상세(지수가 환율일 경우에만 노출) 
    	
    	// 등락에 따른 클래스 변경
    	const dtlClass = await this.getClass(this.kospiFluc.value);
    	// 등락폭
    	$$('#kospiFluc').addClass(dtlClass.cls); 
    	$$('#kospiFluc').addAttr('aria-label', dtlClass.label); 
    	// 등락율
    	$$('#kospiRate').addClass(dtlClass.tags);
    	// abs로 표시
    	if(this.kospiFluc.value < 0) {
    		this.setKospiFluc(Math.abs(this.kospiFluc.value).toFixed(2))
    	} else if(parseFloat(this.kospiFluc.value) === 0) {
    		this.setKospiFluc('0')
    	}
    	this.setKospiFluc(CmmUtils.comma(this.kospiFluc.value));
    	
    	const calRt = this.kospiRate.value;
    	const calRt2 = (parseFloat(calRt) > 0 ? ('+' + parseFloat(calRt).toFixed(2)) : parseFloat(calRt).toFixed(2)) + '%';    	
    	this.setKospiRate(calRt2);
    	
    	// 실시간여부
    	if(this.rltmYn.value === 'Y') {
    		$$('#live_on').css({'display':''});
    	} else {
    		$$('#live_on').hide();
    	}
    	
    	// 하단 탭 선택시 화면 영역 컨트롤
    	let _this = this;
    	let thisTab = '2';
		$('button[name=period]').on('click', function() {
			const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active').children('a').attr({ 'aria-selected': 'true' });
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active').children('a').attr({ 'aria-selected': 'false' });
            
            _this.setPeriod($(this).val());
            _this.setPeriodTxt($(this).text());
            if(thisTab !== $(this).val()) {
            	thisTab = $(this).val();
           	  	_this.loadData();
            }
		});
		
		// 관심등록/해제
		$('#btnFav').click(function(e, data) {
			if(!data) {
				_this.handleFavClick();
			}
		});
		
		// 관심등록여부확인
    	const fav = this.fav.value;
    	if(fav === 'Y') {
    		$('#btnFav').trigger('click', [true]); // init시 한번만 실행하기 위해 param 추가
    	}
		
		// 환율정보상세 버튼 노출 유무
    	if(this.exr.value === 'ESRM') {
    		$$('#exrView').show();
    	}
    }
    
    async loadData() {
    	const now = dayjs(); 		// 조회종료일 : 금일
    	let inqStaDt = '';				// 조회시작일
    	
    	// 조회기간 - 1개월, 3개월, 6개월, 1년, 3년
    	if(this.period.value === '1') {
    		inqStaDt = now.add(-1, 'month').format(this.formatter.value)
    	} else if(this.period.value === '2') {
    		inqStaDt = now.add(-3, 'month').format(this.formatter.value)
    	} else if(this.period.value === '3') {
    		inqStaDt = now.add(-6, 'month').format(this.formatter.value)
    	} else if(this.period.value === '4') {
    		inqStaDt = now.add(-1, 'year').format(this.formatter.value)
    	} else if(this.period.value === '5') {
    		inqStaDt = now.add(-3, 'year').format(this.formatter.value)
    	}
    	
    	this.setInqStaDt(inqStaDt);
    	this.setInqEndDt(now.format(this.formatter.value));
    	
    	const url = '/pb/api/ivinf/cncrDtlLst.json';
		const params = {
				"inqStaDt": this.inqStaDt.value,
				"inqEndDt": this.inqEndDt.value,
				"gridRow1Cnt": "1",
				"inqPdcd" : this.inqPdcd.value
		};
		
    	const res = await ApiUtils.sendPost(url, params);
    	
    	this.setNidxList(res.data.data);
    	const items = this.nidxList.value;
    	
    	if(items.length === 0) {
    		$$('#ivinfDetailView').hide();
    		$$('#noData').show();
    	} else {
    		$$('#ivinfDetailView').show();
    		$$('#noData').hide();
    	}
    	
    	items.sort((a , b) => a.basDt - b.basDt);
    	
    	this.setData();
    }
    
    /**
	 * 데이터 매핑
	 * @param
	 */
    async setData() {
    	const item = this.nidxList.value;
    	  	
    	if(item.length) {
    		// 지수는 조회시작일보다 직전 영업일 하루 데이터를 추가로 던져줌. 첫 로우 데이터 기준가로 등락폭 계산 후 첫 로우는 제외 처리
    		item.forEach((val, row) => {
	    		if(row > 0) {
					val.mKospiFluc = (val.stdv1Nidx - item[row-1].stdv1Nidx).toFixed(2);
				}
    		});
    		const items = item.slice(1);
    		this.setNidxList(items);
    		
	    	let historyData = items.find((val, idx) => {return val.basDt === String(Math.max(...items.map((obj) => obj["basDt"])))});
	    	let toDayData = items.find((val, idx) => {return val.basDt === String(Math.min(...items.map((obj) => obj["basDt"])))});
	    	
	    	let toData = toDayData.stdv1Nidx;
	    	let frData = historyData.stdv1Nidx;
	    	let calData = parseFloat((frData - toData)).toFixed(2);
	    	let calRate = parseFloat(((frData - toData) / toData * 100)).toFixed(2);
	    	
	    	this.classReset();
	    	
	    	// 등락에 따른 클래스 변경
	    	let moveClass = await this.getClass(calData);
	
	    	// 등락폭
	    	if(parseFloat(calData) < 0) {
	    		this.setAfKospiFluc(CmmUtils.comma(Math.abs(parseFloat(calData))));
	    	} else {
	    		this.setAfKospiFluc(CmmUtils.comma(calData));	
	    	}
	    	
	    	$$('#afKospiFluc').addClass(moveClass.cls); 
	    	$$('#afKospiFluc').addAttr('aria-label', moveClass.label); 
	    	// 등락율
	    	calRate = (calRate > 0 ? '+' + calRate : calRate);
	    	this.setAfKospiRate(calRate + '%');
	    	$$('#afKospiRate').addClass(moveClass.tags);
	    
	    	this.setBasicVal(CmmUtils.comma(toDayData.stdv1Nidx.toFixed(2))); 		// 기초종가
	    	this.setFinalVal(CmmUtils.comma(historyData.stdv1Nidx.toFixed(2))); 		// 기말종가
	    	
	    	let minInfo = items.find((val, idx) => {return val.stdv1Nidx === Math.min(...items.map((obj) => obj["stdv1Nidx"]))});
	    	minInfo.txt = '최저';
	    	const minVal = CmmUtils.comma(minInfo.stdv1Nidx.toFixed(2)) + ' (' + dayjs(minInfo.basDt).format('YYYY-MM-DD') + ')';
	    	this.setMinVal(minInfo.stdv1Nidx.toFixed(2));				// 기간 최저
	    	this.setMinTxt(minVal);												// 기간 최저(일)
	    	let maxInfo = items.find((val, idx) => {return val.stdv1Nidx === Math.max(...items.map((obj) => obj["stdv1Nidx"]))});
	    	maxInfo.txt = '최고';
	    	const maxVal = CmmUtils.comma(maxInfo.stdv1Nidx.toFixed(2)) + ' (' + dayjs(maxInfo.basDt).format('YYYY-MM-DD') + ')';
	    	this.setMaxVal(maxInfo.stdv1Nidx.toFixed(2));			// 기간 최고
	    	this.setMaxTxt(maxVal);											// 기간 최고(일)
	    	
	    	// 차트영역
	    	this.loadChart();
    	}
    }
    
    /**
	 * removeClass > 기간 선택시 등략폭이 다를경우 removeClass 후 addClass 하여야함.
	 * @param
	 */
    async classReset() {
    	// 등락폭
    	$$('#afKospiFluc').removeClass('fall'); 
    	$$('#afKospiFluc').removeClass('rise'); 
    	$$('#afKospiFluc').removeClass('steady'); 
    	// 등락폭 - label
    	$$('#afKospiFluc').removeAttr('aria-label'); 
    	// 등락율
    	$$('#afKospiRate').removeClass('tags-lightBlue');
    	$$('#afKospiRate').removeClass('tags-lightRed');
    	$$('#afKospiRate').removeClass('tags-lightGray');
    }
    
    /*
	 * 1. 등락폭 일 경우
	 *     - 상승 rise, 보합 steady, 하락 fall 처리 및 aria-label(등락폭(상승), 등락폭(하락), 등락폭(보합)) 수정 
	 * 2. 등락율 일 경우
	 * 		- 상승 tags-lightRed, 보합 tags-lightGray, 하락 tags-lightBlue
	 * */
    async getClass(str) {
    	let cls = '';
		let label = '';
		let tags = '';
		if(parseFloat(str) < 0) {
			cls = 'fall';			
			label = '등락폭(하락)';
			tags = 'tags-lightBlue';
		} else if(parseFloat(str) > 0) {
			cls = 'rise';
			label = '등락폭(상승)';
			tags = 'tags-lightRed';
		} else {
			cls = 'steady';
			label = '등락폭(보합)';
			tags = 'tags-lightGray';
		}
		
		return {'cls':cls, 'tags':tags, 'label':label};
    }
    
    /**
	 * 차트 - 조회
	 * @param
	 */
    async  loadChart() {
    	const item = this.nidxList.value;
		console.log('nidxList : ' , this.nidxList.value );

    	let chartData = [];
		item.forEach((itm, idx) => {
    		const arr = {};
    		arr.val = itm.stdv1Nidx;
    		arr.date = dayjs(itm.basDt).format('YYYY.MM.DD');
    		chartData.push(arr);
    	});
    	
    	let chartAll = [];
    	let chartArr = [];
    	
    	chartData.forEach((item, idx) => {
    		let data = {};
    		data = {
    				name: item.date,
    				y: parseFloat(item.val)
    		};
    		chartArr.push(data);
    	});
    	
    	chartAll.push({
    		name: this.nidxNm.value,
    		data: chartArr
    	});
    	
    	let rowNum = chartData.length;
    	let rowNo = 1000;
    	if(rowNum > 1000) {
    		rowNo = (rowNum + 1);
    	}
    	
    	this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: 'ivinf21sChart',
			chartType:'spline',
			lineColors: ["#0072ff"],
			yAxisRightTitle: '',
			tickInterval:Math.floor(Number(rowNum)/3),
			turboThreshold:rowNo,
//			minMaxShowDataLabel: true,
//			minMaxData: [this.maxVal.value, this.minVal.value],
		});
    	
    	await this.chartManager.render(chartAll);
    }
    
    /**
	 * 관심등록/해제
	 * @param
	 */
    async handleFavClick() {
    	const $active = $('#btnFav').children('i').hasClass('icon-fav-active');
    	let favorite = '';
    	
    	// 관심등록되어있는 상태
    	if($active) {
    		favorite = 'D';
    	} else {
    		favorite = 'I';
    	}
    	
    	const params = {
    			nidxNm : this.nidxNm.value, 		// 조회종목
    			nidxCd : this.inqPdcd.value,
    			fav : favorite 								// I : 등록, D : 삭제
    	}
    	
    	const url = '/pb/api/ivinf/saveCncr.json';
    	const res = await ApiUtils.sendPost(url, params);
    	if(res.resultCode === '000000') {
	    	if(favorite === 'I') {
	    		toastr.success(``, '관심지수에 등록되었습니다.');
	    	} else if(favorite === 'D') {
	    		toastr.caution(``, '관심지수에서 삭제되었습니다.');
	    	}
    	} else {
    		let msg = '관심지수에 등록 실패하였습니다.'
    		if(favorite === 'D') {
    			msg = '관심지수에서 삭제 실패하였습니다.';
	    	}
    		toastr.error(``, msg);
    	}
    }
    
    /**
	 * 일자별 보기
	 * @param
	 */
    async handleDayClick() {
    	const route = 'ivinf28p';
    	const props = {
    			data : this.nidxList.value
		};
    	
    	await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
            params : props,
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    }
    
    /**
     * 시장지수 비교
     * @param
     */
    async handleMpiClick() {
    	const route = 'chart10m';
		const props = {
		};
		router.navigate(route, props);
    }
    
    /**
     * 환율정보상세
     * @param
     */
    async handleExrClick() {
		const route = 'fncpls50m';
		const props = {
		};
		router.navigate(route, props);
    }

    destroy() {
        super.destroy(this);
    }
}