/*************************************************************************
* @ 서비스경로 : IVINF50S
* @ 파일명      : IVINF50S.js 투자정보 > AI 시장지수 분석(데자View)
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF50S extends BaseModule {
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
	    this.chartManager = null;
	    this.chartManager2 = null;
	    this.eventReceiver = new EventTarget();
	    
		[this.searchRic, this.setSearchRic] = this.useState('searchRic', '.KS11'); // RIC
		[this.searchRicTxt, this.setSearchRicTxt] = this.useState('searchRicTxt', '코스피'); // RIC명
		
		[this.searchTemDcnt, this.setSearchTemDcnt] = this.useState('searchTemDcnt', '60'); // 유사기간일수
		[this.searchTemDcntMonth, this.setSearchTemDcntMonth] = this.useState('searchTemDcntMonth', '3');
		[this.searchTemDcntTxt, this.setSearchTemDcntTxt] = this.useState('searchTemDcntTxt', '최근 3개월'); // 월
		
		[this.searchYcnt, this.setSearchYcnt] = this.useState('searchYcnt', '5'); // 탐색년수
		[this.searchYcntTxt, this.setSearchYcntTxt] = this.useState('searchYcntTxt', '과거 5년');
		
		[this.ricTxt, this.setRicTxt] = this.useState('ricTxt', '');
		[this.yearTxt, this.setYearTxt] = this.useState('yearTxt', '');
		[this.dateTxt, this.setDateTxt] = this.useState('dateTxt', '');
		[this.dataSimTxt, this.setDataSimTxt] = this.useState('dataSimTxt', '');
		
		[this.selectedTab, this.setSelectedTab] = this.useState('selectedTab', 'KRW=');
    }

	init () {
        super.init(this);
        this.register();

        this.loadList();
        this.getSubList('KRW=');
    }
	
	async register () {
		this.bind('searchRicTxt', $$('#searchRicTxt'), 'p');
		this.bind('searchTemDcntTxt', $$('#searchTemDcntTxt'), 'p');
		this.bind('searchYcntTxt', $$('#searchYcntTxt'), 'p');
		
		this.bind('ricTxt', $$('#ricTxt'), 'p');
		this.bind('yearTxt', $$('#yearTxt'), 'p');
		this.bind('dateTxt', $$('#dateTxt'), 'p');
		this.bind('dataSimTxt', $$('#dataSimTxt'), 'p');
		
		$$('#searchOptionBtn').on('click', async () => await this.handleOpenOptionPop()); 
		
		$$(document).findByName('tabNode', 'click', async (evnt, elem) => await this.tabChangeEvent(evnt, elem));
	}
	
	/**
	 * 지수 조회
	 */
	async loadList() {
		this.setRicTxt(this.searchTemDcntMonth.value + "개월 " + this.searchRicTxt.value );
		this.setYearTxt("과거 " + this.searchYcnt.value + "년");
		
		const url = '/pb/api/ivinf/getMainIdxAnlyQry.json';
		const params = {
				'ycnt': this.searchYcnt.value
				, 'temDcnt': this.searchTemDcnt.value
				, 'temDcntMonth': this.searchTemDcntMonth.value
				, 'ric': this.searchRic.value
		};
		
		const res = await ApiUtils.sendPost(url, params);
		
		if(res.resultCode === '000000') {
			const aiTxt = res.data.aiTxt;

			// 기준일자
			$$('#basDt').html(res.data.basDt);
			// AI 예측 일자
			this.setDateTxt(aiTxt.PB_SMLR_DT);
			// AI 예측 확률
			this.setDataSimTxt(aiTxt.PB_SIMLARITY + " 유사");
			
			// AI 예측 텍스트
			$$('#aiTxtContent').text(aiTxt.PB_CRE_RST_TXT);
			// 상단 차트 호출
			await this.chartSetting(true, res.data.prevMainIdx, res.data.currMainIdx, {
				container: 'chart1'
			});
		} else {
			this.openAlert('', res.resultMessage);
		}
		
		// 로그 저장
		const url2 = '/api/cmm/insertFunctionVstpeLog.json';
		const params2 = {
				menuNo: 'IVINF50S'
				, majFuncCd: '03'
		};
		
		const res2 = await ApiUtils.sendPost(url2, params2);
	}
	
	/**
	 * 하단 경제지표 조회
	 */
	async getSubList(ricType) {
		const url = '/pb/api/ivinf/getSubIdxAnlyQry.json';
		const params = {
				'ycnt': this.searchYcnt.value
				, 'temDcnt': this.searchTemDcnt.value
				, 'temDcntMonth': this.searchTemDcntMonth.value
				, 'ric': ricType
				, 'ric_subRic': this.searchRic.value + '_' + ricType
		};
		
		const res = await ApiUtils.sendPost(url, params);
		
		if(res.resultCode === '000000') {
			// 하단 차트 호출
			await this.chartSetting(false, res.data.prevMainIdx, res.data.currMainIdx, {
				container: 'chart2'
			});
		} else {
			this.openAlert('', res.resultMessage);
		}
	}
	
	/**
	 * 경제지표 탭 선택 이벤트
	 */
	async tabChangeEvent (evnt, elem) {
		evnt.preventDefault();
		
		// 선택 클래스 삭제
		$('.tab-content').find('.tab').removeClass('tab-active');
		
		let prevData = '';
		let currData = '';
		let option = {};

		console.log('this.selectedTab.value === ', this.selectedTab.value);
		
		if(elem.dataset.id === '1') {
			// 달러/원
			$(elem).closest('li').addClass('tab-active');
			
			if(this.selectedTab.value !== 'KRW=') {
				this.setSelectedTab('KRW=');
				await this.getSubList('KRW=');				
			}
		}else if(elem.dataset.id === '2') {
			// 유로/달러
			$(elem).closest('li').addClass('tab-active');
			
			if(this.selectedTab.value !== 'EUR=') {
				this.setSelectedTab("EUR=");
				await this.getSubList('EUR=');				
			}
		}else if(elem.dataset.id === '3') {
			// WTI
			$(elem).closest('li').addClass('tab-active');
			
			if(this.selectedTab.value !== 'CLc1') {
				this.setSelectedTab("CLc1");
				await this.getSubList('CLc1');				
			}
		}else if(elem.dataset.id === '4') {
			// 금
			$(elem).closest('li').addClass('tab-active');

			if(this.selectedTab.value !== 'XAU=') {
				this.setSelectedTab("XAU=");
				await this.getSubList('XAU=');	
			}
		}
	}
	
	/**
	 * 검색 설정 팝업
	 */
	async handleOpenOptionPop() {
		const route = 'ivinf51p';		
		
		await GlobalApp.popupUtils.openPopup(route, {
			params: {
				ric: this.searchRic.value
				, ricNm: this.searchRicTxt.value
				, temDcnt: this.searchTemDcnt.value
				, temDcntMonth: this.searchTemDcntMonth.value
				, ycnt: this.searchYcnt.value
			},
            showCloseBtn : true,
            btn2Label : '확인',
            btn2IsMain : true,
            onYes: (result) => this.callbackFunc(result)
        });
	}
	
	/**
	 * 검색 설정 팝업 콜백 함수
	 */
	async callbackFunc(result) {
		
		if(result.resultCd === '000000') {
			this.setSearchRic(result.data.ric);
			this.setSearchRicTxt(result.data.ricNm);
			
			this.setSearchTemDcnt(result.data.temDcnt);
			this.setSearchTemDcntMonth(result.data.temDcntMonth);
			this.setSearchTemDcntTxt('최근 ' + result.data.temDcntMonth + '개월');
			
			this.setSearchYcnt(result.data.ycnt);
			this.setSearchYcntTxt('과거 ' + result.data.ycnt + '년');
			
			// 메인 지수 조회
			await this.loadList();
			
			// 서브 지수 조회
			await this.getSubList(this.selectedTab.value);
		}
	}
	
	stringToDate(yyyymmdd) {
		const year = parseInt(yyyymmdd.substring(0, 4), 10);
		const month = parseInt(yyyymmdd.substring(4, 6), 10) - 1;
		const day = parseInt(yyyymmdd.substring(6, 8), 10);
		return new Date(year, month, day);
	}

	dateToString(date) {
		const year = String(date.getFullYear()).substr(2,2);
		let month = String(date.getMonth() + 1);
		if(this.searchTemDcntMonth.value != '12') {
			month = month.padStart(2, '0');
		}
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}.${month}`;
	}
	
	getDateStr(pbSmlrDt, serchMonth) {
		let dateObj = this.stringToDate(pbSmlrDt);
		return this.dateToString(dateObj);
	}
	
	getLastDateStr(pbSmlrDt) {
		let dateObj = this.stringToDate(pbSmlrDt);
		dateObj.setMonth(dateObj.getMonth() + 2);
//		dateObj.setDate(dateObj.getDate() + 40);
//		if(this.searchTemDcntMonth.value == '3') {
//			dateObj.setMonth(dateObj.getMonth() + 2);
//		} else if(this.searchTemDcntMonth.value == '6') {
//			dateObj.setMonth(dateObj.getMonth() + 6);
//		} else if(this.searchTemDcntMonth.value == '12') {
//			dateObj.setMonth(dateObj.getMonth() + 12);
//		}
		return this.dateToString(dateObj);
	}
	
	/**
	 * 차트 세팅 함수
	 */
	async chartSetting(isUpChart, prevData, currData, option) {
		let chartDataArr = [];
		let chartYPrevDataArr = [];
		let chartYCurrDataArr = [];
		let chartXPrevDataArr = [];
		let chartXCurrDataArr = [];
		let currLength = currData.length;
		let prevLength = prevData.length;
		let tickPosition = [];
		let currColor = "#0871F3";
		let prevColor = "#CFD4D9";
		let fontFamily = "Pretendard";
		
		// 과거 지수
		prevData.forEach((item, idx) => {
			chartXPrevDataArr.push(this.getDateStr(item.PB_SMLR_DT));
			chartYPrevDataArr.push(parseFloat(item.PB_SMLR_DT_NIDX));
		});
		
		// 현재 지수
		let lastDate = this.getLastDateStr(currData[0].PB_BAS_DT);
		prevData.forEach((item, idx) => {
			if(idx < currLength) {
				chartXCurrDataArr.push(this.getDateStr(currData[idx].PB_SMLR_DT));
				chartYCurrDataArr.push(parseFloat(currData[idx].PB_SMLR_DT_NIDX));
			} else {
				chartXCurrDataArr.push(lastDate);
				chartYCurrDataArr.push(null);
			}
		});
		
		chartDataArr.push({
			'name': '과거',
			'data': chartYPrevDataArr
		});
		
		chartDataArr.push({
			'name': '현재',
			'xAxis': 1,
			'data': chartYCurrDataArr
		});
		
		let initChartData = {
			"colors": [prevColor, currColor],
			borderWidth : 5,
			"chart": {
				"type": "line",
				"borderWidth": 0,
				"marginTop": 40,
				"marginLeft": 0,
				"marginBottom": 70
			},
			"xAxis": [
				{ //과거 X축
					"categories": chartXPrevDataArr,
					"tickPositions": [0, currLength-1, prevLength-1],
					//"gridLineWidth": 1,
					"lineWidth": 1,
					"lineColor": "#000000",
					"labels": {
						"y":18,
						"style": {
							"fontFamily": fontFamily,
							"color": "#A4A9AE",
							"fontSize": 12
						}
					},
					"plotLines": [{
						"dashStyle": 'Dot',
						"color": '#0C0C0D8F',
						"width": 1,
						"value": currLength-1,
						"zIndex":-10,
					}]
				},
				{//현재 X축
					"categories": chartXCurrDataArr,
					"opposite": true,
					"tickPositions": [0, currLength-1, prevLength-1],
					//"gridLineWidth": 1,
					"lineWidth": 1,
					"lineColor": "#000000",
					"labels": {
						"y":2,
						"style": {
							"fontFamily": fontFamily,
							"color": currColor,
							"fontWeight": "bold",
							"fontSize": 12
						}
					},
				}
			],
			"yAxis": { 
				"visible": false
			},
			"plotOptions": {
				"series": {
					"dataLabels": {
						"enabled": false
					},
					"marker": {
						"enabled": false
					},
					"shadow": false
				}
			},
			//legend: false,
			legend: {
				"y":15,
			    itemStyle: {
			    "fontFamily": fontFamily,
			    }
			},
			"tooltip": {
				"valueSuffix": ""
			}
		};
		
		if(!isUpChart) {
			console.log('Chart Setting : ==== ', initChartData);
			console.log('Chart Y Value : ==== ', chartDataArr);
		}
		
		this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: option.container,
			chartTitle: option.title,
			chartSubTitle: option.subTitle,
			lineColors: option.colors,
			xAxisTitle: option.xAxisTitle,
			yAxisLeftTitle: option.yAxisLeftTitle,
			tickInterval: 10,
			plotLines: option.plotLines,
			stroke: option.stroke,
			markers: option.markers,
			shared: true,
			tooltipFrm: true
		});
		await this.chartManager.render2(chartDataArr, initChartData);
	}
	
	 /**
     * 공통 팝업 호출
     */
    async openAlert (title, message , cancelBtn) {
		await CmmUtils.alert(title, message,{
			btnLabel : '확인',
			useCancelBtn : false,
			status: 'caution'
		});
	}
    
    destroy() {
        super.destroy(this);
    }
}