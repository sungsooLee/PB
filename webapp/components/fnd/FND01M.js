/*************************************************************************
* @ 서비스경로 : FND01M.html
* @ 파일명      : FND01M.html 펀드 - [T]펀드
* @ 화면ID 	 : PBWMA010000	
* @ 작성자      : 90194835
* @ 작성일      : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FND01M extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.cncrList, this.setCncrList] 				= this.useState('cncrList', '');						// 관심펀드
        [this.bestList, this.setBestList] 				= this.useState('bestList', '');						// BEST펀드
        [this.dataList, this.setDataList]				= this.useState('dataList', '');						// 비교 데이터
        [this.chartData, this.setChartData]			= this.useState('chartData', []);					//  차트 출력용 데이터
        [this.paramData, this.setParamData]		= this.useState('paramData', []);				//  차트 조회조건 데이터
        
        [this.tmTab, this.setTmTab] 					= this.useState('tmTab', '2');						// 차트 기간 선택
        [this.inqStaDt, this.setInqStaDt] 			= this.useState('inqStaDt', '');						// 조회시작일
        [this.inqEndDt, this.setInqEndDt] 			= this.useState('inqEndDt', '');					// 조회종료일
        [this.formatter, this.setFormatter] 			= this.useState('formatter', 'YYYYMMDD');	// 날짜형식
	}

	init () {
		super.init(this);
		
		this.regist();
	}
	
	async regist() {
		// 탭 클릭
		const tabClickCallback = (event) => {
			const route = 'etf01m';	
			window.location.hash = route;
		}
		const tab2 = $$("#tab2").elements[0];
		const tabTargets = { elements : [tab2] };
		const tabClickCallbacks = [tabClickCallback];
		this.registerCallback('click', tabTargets, tabClickCallbacks);
		
		// 스켈레톤 시작
		this.setSkeletone();
		
		let _this = this;
		let thisTab = '2';
		$('button[name=tmTab]').on('click', function() {
			const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active');
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active');
            
            _this.setTmTab($(this).val());
            if(thisTab !== $(this).val()) {
            	thisTab = $(this).val();
           	  	_this.loadData();
            }
		});
		
		$$('#btnMyFnd').on('click', async () => await this.moveCncrFnd());								// 나의 관심펀드 바로가기
		$$('#btnChart').on('click', async () => await this.moveChart());									// 펀드/지수 비교하기 
		$$('#btnFnd').on('click', async () => await this.searchFnd());										// 펀드찾기 
		
		await this.initData();
	}
	
	async setSkeletone() {
		let rHtml = '';
		for(let i = 0; i < 10; i++) {
			rHtml += '<li>';
			rHtml += '		<a href="#">';
			rHtml += '			<dl>';
			rHtml += '				<dt></dt>';
			rHtml += '				<dd></dd>';
			rHtml += '			</dl>';
			rHtml += '			<div></div>';
			rHtml += '		</a>';
			rHtml += '</li>';
		}
		$('#fnd01Chart').html(rHtml);
		$('.content').addClass('loading');
	}
	
	async initData() {
		const url = '/pb/api/mn/fndMain.json';
		const params = {};
    	const res = await ApiUtils.sendPost(url, params, true);
		
		if(res.resultCode === '000000') {
			const cncrLst = res.data.cncrData;
			const bestLst = res.data.BestData.list;
			cncrLst.splice(3);
			
			this.setCncrList(cncrLst);
			this.setBestList(bestLst);
			
			let data = [];
			if(cncrLst.length > 1) {
				data = cncrLst;
				$$('#infoTxt').text('나의 관심 펀드 수익률');
				$$('#btnMyFnd').show();
			} else {
				data = bestLst;
				$$('#infoTxt').text('판매 BEST 3 펀드 수익률');
				$$('#addFndTxt').show();
			}
			
			await this.setDataList(data);
			await this.loadData();
		}
	}

	async loadData() {
		const now = dayjs(); 		// 조회종료일 : 금일
    	let inqStaDt = '';				// 조회시작일
    	
    	// 조회기간 - 1: 1주일, 2: 3개월, 3: 6개월, 4: 12개월
    	if(this.tmTab.value === '1') {
    		inqStaDt = now.add(-1, 'month').format(this.formatter.value);
    	} else if(this.tmTab.value === '2') {
    		inqStaDt = now.add(-3, 'month').format(this.formatter.value);
    	} else if(this.tmTab.value === '3') {
    		inqStaDt = now.add(-6, 'month').format(this.formatter.value);
    	} else if(this.tmTab.value === '4') {
    		inqStaDt = now.add(-1, 'year').format(this.formatter.value);
    	}
    	this.setInqStaDt(inqStaDt);
    	this.setInqEndDt(now.format(this.formatter.value));
    	
    	const params = {
				"inqStaDt": this.inqStaDt.value,
				"inqEndDt": this.inqEndDt.value,
		};
    	
    	const items = this.dataList.value;
		let data = [];
		items.forEach((d, idx) => {
			const arr = {};
			arr.label = d.fndRprsCdNm;
			arr.value = d.fndRprsCd;
			arr.key = 'fnd';
			data.push(arr);
		});
		params.inData = data;
		
		this.setParamData(params.inData);
    	
		const url = '/pb/api/chart/compare.json';
    	const res = await ApiUtils.sendPost(url, params, true);
    	
    	let fData = res.data.data1.inq5Grid;
    	let fArr = [];
    	fData.forEach((item, idx) => {
    		const arr = {};
    		arr.basDt = item.basDt;
    		arr.dscd = item.fndRprsCd;
    		arr.name = item.tgtItmNm;
    		arr.val = item.stdv1Nidx;		// 수익률
    		arr.basPr = item.fndBasPr;		// 기준가
    		fArr.push(arr);
    	})
    	
    	// 날짜 데이터 비교하여 비어 있는 날짜의 데이터를 채워주기 위함
    	let paData = this.paramData.value;
    	let chartData1 = [];
    	let chartData2 = [];
    	let chartData3 = [];
    	paData.forEach((val, idx) => {
    		fArr.forEach((d, r) => {
    			if(val.value === d.dscd) {
    				if(idx === 0) {
    					chartData1.push(d);
    				}
    				if(idx === 1) {
    					chartData2.push(d);
    				}
    				if(idx === 2) {
    					chartData3.push(d);
    				}
    			}
    		});
    	});
    	
    	const allData = [
    		...chartData1.map(item => item.basDt),
    		...chartData2.map(item => item.basDt),
    		...chartData3.map(item => item.basDt),
    	]
    	
    	const uniqueData = [... new Set(allData)];
    	
    	const fillArray = (arr, data) => {
    		const filledArr = [];
    		data.forEach(data => {
    			const exItem = arr.find(item => item.basDt === data);
    			if(exItem) {
    				filledArr.push(exItem);
    			} else {
    				filledArr.push({
    					basDt: data,
    					val: null, 
    					dscd: arr[0]?.dscd,
						name: arr[0]?.name,
						basPr: null
					});
    			}
    		})
    		return filledArr;
    	}
    	
    	let arr1 = fillArray(chartData1, uniqueData);
    	let arr2 = fillArray(chartData2, uniqueData);
    	let arr3 = fillArray(chartData3, uniqueData);
    	
    	arr1 = arr1.sort((a, b) => a.basDt - b.basDt);
    	arr2 = arr2.sort((a, b) => a.basDt - b.basDt);
    	arr3 = arr3.sort((a, b) => a.basDt - b.basDt);
    	
    	const quantity = chartData3.length > 0 ? 3 : 2;
    	
    	const chartDate1 = new Set(chartData1.map(item => item.basDt));
    	const chartDate2 = new Set(chartData2.map(item => item.basDt));
    	const chartDate3 = new Set(chartData3.map(item => item.basDt));
    	const commonDate = quantity === 3 ? [...chartDate1].filter(date => chartDate2.has(date) && chartDate3.has(date)) : [...chartDate1].filter(date => chartDate2.has(date));
    	
    	const arr11 = chartData1.filter(item => commonDate.includes(item.basDt));
    	const arr21 = chartData2.filter(item => commonDate.includes(item.basDt));
    	const arr31 = chartData3.filter(item => commonDate.includes(item.basDt));
    	
    	let sumArr1 = [];
    	let sumArr2 = [];
    	let sumArr3 = [];
    	if (arr11.length > 0) {
        	let sumDate1 = '';
    		for (var i = 0; i < arr1.length; i++) {
    			if (arr1[i].basDt === arr11[0].basDt) {
    				break;
    			}
    			sumArr1.push(arr1[i]);
    		}
    		for (var i = 0; i < arr11.length; i++) {
    			sumArr1.push(arr11[i]);
    			sumDate1 = arr11[i].basDt;
    		}
    		const sumIdx1 = arr1.findIndex((item) => item.basDt === sumDate1);
    		for (var i = sumIdx1+1; i < arr1.length; i++) {
    			sumArr1.push(arr1[i]);
    		}
    	} else {
    		for (var i = 0; i < arr1.length; i++) {
    			sumArr1.push(arr1[i]);
    		}
    	}
		
		if (arr21.length > 0) {
			let sumDate2 = '';
			for (var i = 0; i < arr2.length; i++) {
				if (arr2[i].basDt === arr21[0].basDt) {
					break;
				}
				sumArr2.push(arr2[i]);
			}
			for (var i = 0; i < arr21.length; i++) {
				sumArr2.push(arr21[i]);
				sumDate2 = arr21[i].basDt;
			}
			const sumIdx2 = arr2.findIndex((item) => item.basDt === sumDate2);
			for (var i = sumIdx2+1; i < arr2.length; i++) {
				sumArr2.push(arr2[i]);
			}
		} else {
			for (var i = 0; i < arr2.length; i++) {
				sumArr2.push(arr2[i]);
			}
		}
		
		if (quantity > 2) {
			if (arr31.length > 0) {
				let sumDate3 = '';
				for (var i = 0; i < arr3.length; i++) {
					if (arr3[i].basDt === arr31[0].basDt) {
						break;
					}
					sumArr3.push(arr3[i]);
				}
				for (var i = 0; i < arr31.length; i++) {
					sumArr3.push(arr31[i]);
					sumDate3 = arr31[i].basDt;
				}
				const sumIdx3 = arr3.findIndex((item) => item.basDt === sumDate3);
				for (var i = sumIdx3+1; i < arr3.length; i++) {
					sumArr3.push(arr3[i]);
				}
			} else {
				for (var i = 0; i < arr3.length; i++) {
					sumArr3.push(arr3[i]);
				}
			}
		}
    	
    	const mergeData = [...sumArr1, ...sumArr2, ...sumArr3];
    	const mergeSort = mergeData.sort((a, b) => new Date(a.basDt) - new Date(b.basDt));
    	
    	this.setChartData(mergeSort);
    	this.setChart();
	}
	
	/**
    *  차트 데이터 생성 및 그리기
    * @param 
    */
	async setChart() {
		let chartData = this.chartData.value;
		let paData = this.paramData.value;
		let chartAll = [];
    	let chartData1 = [];
    	let chartData2 = [];
    	let chartData3 = [];
    	
		paData.forEach((val, idx) => {
			chartData.forEach((d, r) => {
				if(val.value === d.dscd) {
					const arr1 = {};
					const arr2 = {};
					const arr3 = {};
					if(idx === 0) {
						arr1.name = dayjs(d.basDt).format('YYYY-MM-DD');
						arr1.y = d.val;
						arr1.val = (d.basPr === null) ? null : CmmUtils.comma(d.basPr);
						chartData1.push(arr1);
					}
					if(idx === 1) {
						arr2.name = dayjs(d.basDt).format('YYYY-MM-DD');
						arr2.y = d.val;
						arr2.val = (d.basPr === null) ? null : CmmUtils.comma(d.basPr);
						chartData2.push(arr2);
					}
					if(idx === 2) {
						arr3.name = dayjs(d.basDt).format('YYYY-MM-DD');
						arr3.y = d.val;
						arr3.val = (d.basPr === null) ? null : CmmUtils.comma(d.basPr);
						chartData3.push(arr3);
					}
				}
			})
		});
		chartData1 = chartData1.sort((a, b) => {
			return new Date(a.name) - new Date(b.name);
		});
		chartData2 = chartData2.sort((a, b) => {
			return new Date(a.name) - new Date(b.name);
		});
		chartData3 = chartData3.sort((a, b) => {
			return new Date(a.name) - new Date(b.name);
		});
			
		paData.forEach((val, idx) => {
				if(idx === 0) {
					chartAll.push({
						'name': val.label,
						'data': chartData1
					})
				} else if(idx === 1) {
					chartAll.push({
						'name': val.label,
						'data': chartData2
					})
				} else if(idx === 2) {
					chartAll.push({
						'name': val.label,
						'data': chartData3
					})
				}
		});
		
		this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: 'fnd01Chart',
			chartType:'line',
			chartHeight: '300px',
			lineColors: ["#2589F4", "#F35E9C", "#FFD138"],
			yAxisRightTitle: '',
			tickInterval: 10,
			shared: true,
			tooltipFrm: true,
			showFirstLabel: false
		});
    	
    	await this.chartManager.render(chartAll);
    	
    	// 스켈레톤 종료
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
	}
	
	/**
    *  나의 관심펀드 바로가기
    * @param 
    */
	async moveCncrFnd() {
		const route = 'fnd60m';	
		window.location.hash = route;
	}
	
	/**
	 *  펀드/지수 비교하기
	 * @param 
	 */
	async moveChart() {
		const route = 'chart10m';	
		window.location.hash = route;
	}
	
	/**
	 *  펀드찾기
	 * @param 
	 */
	async searchFnd() {
		const route = 'fnd10m';	
		window.location.hash = route;
	}
	
    destroy() {
        super.destroy(this);
    }
}