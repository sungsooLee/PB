/*************************************************************************
* @ 서비스경로 : CHART10M
* @ 파일명      : CHART10M.js 차트 > 펀드/지수 비교
* @ 화면ID		: PBWCH000000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-21            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import IvinfData from '/components/ivinf/comm/IvinfData.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class CHART10M extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.inqStaDt, this.setInqStaDt] 		= this.useState('inqStaDt', '');						// 조회시작일
        [this.inqEndDt, this.setInqEndDt] 		= this.useState('inqEndDt', '');					// 조회종료일
        [this.formatter, this.setFormatter] 		= this.useState('formatter', 'YYYYMMDD');	// 날짜형식
        
        [this.tmTab, this.setTmTab] 				= this.useState('tmTab', '2');						// 차트 기간 선택
        [this.fndList, this.setFndList]				= this.useState('fndList', '');						// 펀드 데이터
        [this.fndDefList, this.setFndDefList]		= this.useState('fndDefList', '');					// 펀드 데이터 - 랜덤용
        [this.dataList, this.setDataList]			= this.useState('dataList', '');						// 비교 데이터
        [this.fndData, this.setFndData] 			= this.useState('fndData',							// 랜덤 추출용 펀드 데이터
				[{
			            label : '우리KOSPI200인덱스증권자투자신탁(주식)',
			            value : 'G390006',
			            key : 'fnd'
			        },{
			            label : 'KB스타미국S&P500인덱스증권자투자신탁[주식-파생형]',
			            value : 'G400013',
			            key : 'fnd'
			        },{
			            label : 'KB스타미국나스닥100인덱스증권자투자신탁[주식-파생형]',
			            value : 'G400014',
			            key : 'fnd'
			        }
		        ]);
        [this.etfData, this.setETFData] 			= this.useState('etfData',							// 랜덤 추출용 ETF 데이터
				[{
			            label : 'KODEX 골드선물(H)	',
			            value : 'KR7132030008',
			            key : 'etf'
			        },{
			            label : 'WON 미국S&P500',
			            value : 'KR7444490007',
			            key : 'etf'
			        },{
			            label : 'TIGER 미국필라델피아반도체나스닥',
			            value : 'KR7381180009',
			            key : 'etf'
			        }
		        ]);
        [this.nidxData, this.setNidxData] 		= this.useState('nidxData',						// 랜덤 추출용 지수 데이터
        		[{
        			label : IvinfData.changePbData('KOSPI 200'),
		            value : '00202',
		            key : 'spi'
        		},{
        			label : IvinfData.changePbData('S&P500'),
		            value : '00204',
		            key : 'spi'
        		},{
        			label : IvinfData.changePbData('나스닥 100'),
		            value : 'NASO000014',
		            key : 'spi'
        		}
        		]);
        [this.chartData, this.setChartData]				= this.useState('chartData', []);				//  차트 출력용 데이터
        [this.paramData, this.setParamData]			= this.useState('paramData', []);			//  차트 조회조건 데이터
        [this.fCnt, this.setFCnt]								= this.useState('fCnt', '0');						//  펀드비교개수
        [this.etfCnt, this.setETFCnt]								= this.useState('etfCnt', '0');						//  ETF비교개수
        [this.nCnt, this.setNCnt]							= this.useState('nCnt', '0');					//  지수비교개수
	}
	
	init () {
        super.init(this);
        this.regist();
        this.randSetData();
    }
	
	async  regist() {
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
		})
		
		/**
	    *  펀드,지수 검색창 열기 
	    * @param 
	    */
		$$('#inSearch').on('click', async () => await this.findSearchOpen());
		$$('#btnSearch').on('click', async () => await this.findSearchOpen());
		$$('#btnOpenView').on('click', async () => await this.popupOpen());
	}
	
	/**
	 * 스켈레톤 적용
	 * @param
	 */
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
		$('#ch10Chart').html(rHtml);
		
		$('.content').addClass('loading');
	}
	
	/**
    *  init 랜덤 데이터 추출 
    * @param 
    */
	async randSetData() {
		const url = '/api/etf/getCncrFndOrderList.json'; //관심 상품 목록 조회
		const params = {};
    	const res = await ApiUtils.sendPost(url, params, true);
    	
		let fndLstData = [];
    	if(res.resultCode === '000000') {
    		const fndData = res.data;
    		
    		fndData.forEach((v, i) => {
    			const arr = {};
    			arr.label = v.PB_CNCR_FND_NM;
    			arr.value = v.PB_FND_PDCD;
    			arr.key = 'etf';
    			fndLstData.push(arr);
    		});    	    		
    		this.setFndList(fndLstData);
    		this.setFndDefList(fndLstData); // 랜덤용
    	}
		
		/*
		 * 랜덤 번호 추출
		 * 1. 디폴트 펀드, 지수(4개 row) 	1 ~ 3
		 * 2. 관심펀드								4
		 *     - 1개일 경우. pass
		 *     - 2~3개일 경우 서로 비교
		 *     - 3개 이상일 경우 3개만 추출
		 * 3. 1 또는 2에서 랜덤 비교
		 * */
    	let randDef = [0, 1, 2, 3];
    	const favStr = this.fndDefList.value;
    	// 관심펀드가 2개 이상일 경우 랜덤 번호 조정
    	if(favStr.length > 2) {
    		randDef.push(4);		// 랜덤번호 - 관심펀드
    	} 
    	const randIdx = (Math.random() * randDef.length) | 0;
    	
    	let defData = [];			//
    	const nidxData = this.nidxData.value;
		const fndData  = this.fndData.value;
		const etfData  = this.etfData.value;
		
    	// 관심펀드가 랜덤일 경우. 최대 3개까지 비교데이터 추출 
    	if(randIdx < 4) {
    		defData.push(fndData[randIdx]);
    		defData.push(etfData[randIdx]);
    		defData.push(nidxData[randIdx]);
    	} else {
    		defData = favStr.splice(0, 3);
    	}
    	
    	this.setDataList(defData);
    	this.loadData();
//    	$$('#basicDate').text(dayjs().format("YYYY-MM-DD") + " 기준");
	}
	
	/*
	 * 펀드/차트 비교
	 * */
	async loadData() {
		
		const now = dayjs(); 		// 조회종료일 : 금일
    	let inqStaDt = '';				// 조회시작일
    	
    	// 조회기간 - 1: 1개월, 2: 3개월, 3: 6개월, 4: 1년, 5: 3년
    	if(this.tmTab.value === '1') {
    		inqStaDt = now.add(-1, 'month').format(this.formatter.value)
    	} else if(this.tmTab.value === '2') {
    		inqStaDt = now.add(-3, 'month').format(this.formatter.value)
    	} else if(this.tmTab.value === '3') {
    		inqStaDt = now.add(-6, 'month').format(this.formatter.value)
    	} else if(this.tmTab.value === '4') {
    		inqStaDt = now.add(-1, 'year').format(this.formatter.value)
    	} else if(this.tmTab.value === '5') {
    		inqStaDt = now.add(-3, 'year').format(this.formatter.value)
    	}
    	this.setInqStaDt(inqStaDt);
    	this.setInqEndDt(now.format(this.formatter.value));
    	const items = this.dataList.value;
		const params = {
				"inqStaDt": this.inqStaDt.value,
				"inqEndDt": this.inqEndDt.value,
				"inData": items
		};
		
		let fndCnt = 0;
		let etfCnt = 0;
		let nidxCnt = 0;
		
		let pData = [];
		params.inData.forEach((v, i) => {
			if(v.key === 'fnd') {
				fndCnt++;
			} else if(v.key === 'etf') {
				etfCnt++;
			} else {
				nidxCnt++;
			}
			const pArr = {};
			pArr.dscd = v.value;
			pArr.name = v.label;
			pData.push(pArr);
		})
		this.setFCnt(fndCnt);
		this.setETFCnt(etfCnt);
		this.setNCnt(nidxCnt);
		
		this.setParamData(pData);
		console.log("---params : " + JSON.stringify(params, null, 2));
		const url = '/pb/api/chart/compare.json';
    	const res = await ApiUtils.sendPost(url, params);
    	console.log("---res : " + JSON.stringify(res, null, 2));

    	let fArr = [];
    	let etfArr = [];
    	let nArr = [];
    	// 펀드데이터 stdv1Nidx 수익률
    	let fData = '';
    	if(this.fCnt.value > 0) {
    		fData = res.data.data1.inq5Grid;
    	
	    	fData.forEach((item, idx) => {
	    		const arr = {};
	    		arr.basDt = item.basDt;
	    		arr.dscd = item.fndRprsCd;
	    		arr.name = item.tgtItmNm;
	    		arr.val = item.stdv1Nidx;		// 수익률
	    		arr.basPr = item.fndBasPr;		// 기준가
	    		fArr.push(arr);
	    	})
    	}
    	
    	// ETF데이터 stdv1Nidx 수익률
    	let etfData = '';
    	if(this.etfCnt.value > 0) {
    		etfData = res.data.dataETF.inq5Grid;
    	
    		etfData.forEach((item, idx) => {
	    		const arr = {};
	    		arr.basDt = item.basDt;
	    		arr.dscd = item.fndRprsCd;
	    		arr.name = item.tgtItmNm;
	    		arr.val = item.stdv1Nidx;		// 수익률
	    		arr.basPr = item.fndBasPr;		// 기준가
	    		etfArr.push(arr);
	    	})
    	}
    	
    	// 지수데이터
    	let nData = '';
    	if(this.nCnt.value > 0) {
    	    nData = res.data.data2.inq4Grid;
	    	nData.forEach((item, idx) => {
	    		// 지수는 조회시작일보다 직전 영업일 하루 데이터를 추가로 던져주므로 조회시작일 데이터는 제외하고 계산함.
	    		if(this.inqStaDt.value <= item.basDt) {
		    		const arr = {};
		    		arr.basDt = item.basDt;
		    		arr.dscd = item.mktNidxDscd;
		    		arr.name = item.tgtItmNm;
		    		arr.val = item.stdv2Nidx; 		// 등락율 
		    		arr.basPr = item.stdv1Nidx;	// 기준가
		    		nArr.push(arr);
	    		}
	    	})
    	}
    	//const arrAll = fArr.concat(nArr);
    	const arrAll = nArr.concat(fArr, etfArr);
    	
    	// 펀드, 지수 날짜 데이터 비교하여 비어 있는 날짜의 데이터를 채워주기 위함
    	let paData = this.paramData.value;
    	let chartData1 = [];
    	let chartData2 = [];
    	let chartData3 = [];
    	paData.forEach((val, idx) => {
    		arrAll.forEach((d, r) => {
    			if(val.dscd === d.dscd) {
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

    	if(chartData.length > 0) {
			paData.forEach((val, idx) => {
				chartData.forEach((d, r) => {
					if(val.dscd === d.dscd) {
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
							'name': val.name,
							'data': chartData1
						})
					} else if(idx === 1) {
						chartAll.push({
							'name': val.name,
							'data': chartData2
						})
					} else if(idx === 2) {
						chartAll.push({
							'name': val.name,
							'data': chartData3
						})
					} 
			});
			
			this.chartManager = GlobalApp.getChartManager(this.rootElem, {
				container: 'ch10Chart',
				chartType:'spline',
				chartHeight: '300px',
				lineColors: ["#2589F4", "#F35E9C", "#FFD138"],
				yAxisRightTitle: '',
				tickInterval: 10,
				shared: true,
				tooltipFrm: true,
			});
	    	
	    	await this.chartManager.render(chartAll);
	    	$$('#btnOpenView').show();
	} else {
		
		let html = '';
		html += '<div class="division-center" height="180px;">';
		html += '	<div class="no-result">';
		html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
		html += '		<p class="body-medium fw-400">조회된 데이터가 없습니다.</p>';
		html += '	</div>';
		html += '</div>';
		$$('#ch10Chart').html(html);
		$$('#btnOpenView').hide();
	}
    	// 스켈레톤 종료
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
	}
	
	/*
	 * 기간별 수익률/기준가 보기
	 * */
	async popupOpen() {
		const param = {};
		param.data = this.chartData.value;
		param.param = this.paramData.value;
		param.strTxt = this.tmTab.value;
		const router = 'chart11p';
		await GlobalApp.popupUtils.openPopup(router, {
			params: param,
			showCloseBtn : true,
		});
	}
	
	/*
	 * 검색창 open
	 * */
	async findSearchOpen() {
		const param = {};
		param.fndLst = this.fndList.value;
		const router = 'chart12p';
		await GlobalApp.popupUtils.openPopup(router, {
			type: 'full',
			showCloseBtn : true,
	        params : param,
	        onCallback: (result) => this.setCartDataChart(result), 
	    });
	}
	
	/*
	 * 선택 펀드/지수 return
	 * */
	setCartDataChart(result) {
		// 비교한 데이터 로컬스토리지에 담기
		const data = result.data;
		const cookieData = CmmUtils.getLocalStorageData("chart");
		
		let dataArr = [];
		let arr = [];
		if(cookieData.resultCd === '000000') {
			dataArr.push(data);			
			dataArr.push(cookieData.data);			
			arr = dataArr.reduce(function(arr1, arr2) {return arr1.concat(arr2);}); 
			
			const uniqueData = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
			
			CmmUtils.setLocalStorageData("chart", uniqueData);
		} else {
			CmmUtils.setLocalStorageData("chart", data);
		}
		
		this.setDataList(data);
		this.loadData();
	}

    destroy() {
        super.destroy(this);
    }
}