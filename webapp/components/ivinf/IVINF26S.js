/*************************************************************************
* @ 서비스경로 : IVINF26S
* @ 파일명      : IVINF26S.js 투자정보 - 종합 주요지수 - 섹터지수 - 목록
* @ 화면ID		: PBWIV060000
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

export default class IVINF26S extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.tmSel, this.setTmSel] = this.useState('tmSel', '3');		// 차트 기간 선택
        [this.sData, this.setSdata]  = this.useState('sData', '');		// 섹터지수 데이터
        
        // 탭이동시 전달할 데이터
        [this.dataList, this.setDataList] 	= this.useState('dataList', data.dataList);						// 조회된 지수 데이터
        [this.favData, this.setFavData] 	= this.useState('favData', data.favData);						// 조회된 관심 데이터
    }

	init () {
        super.init(this);
        this.regist();
        
        tabContent.afterLoadTab(); // tab 위치지정  
	}
	
	async regist() {
		// 스켈레톤 시작
		await this.setSkeletone();
		
		let _this = this;
		$('a[name=ivinfTab]').on('click', function() {
			let route = $(this).data('id');	
			if(route !== 'ivinf26s') { 				// 현재 페이지 제외
	        	const props = {
	        			dataList: _this.dataList.value,
	        			favData: _this.favData.value
	        	};
	        	router.navigate(route, props);
			}
		})
		
		$('button[name=tmSel]').on('click', function() {
			const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active');
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active');
            _this.setTmSel($(this).val());
            _this.loadChart();
		})
		
		await this.loadData();
		$('button[name=tmSel][value="' + this.tmSel.value + '"]').trigger('click');
	}
	
	/**
	 * 스켈레톤 적용
	 * @param
	 */
	async setSkeletone() {
		let html = '';
		
		for(let i = 0; i < 8; i++) {
			html += '<tr height="50px;">';
			html += '	<td ></td>';
			html += '	<td ></td>';
			html += '	<td ></td>';
			html += '	<td ></td>';
			html += '	<td ></td>';
			html += '	<td ></td>';
			html += '</tr>';
		}
		$$('#listContainer').html(html);
		$('.content').addClass('loading');
	}
	
	/**
	 * 섹터지수  - 조회
	 * @param
	 */
	async loadData() {
		const url = '/pb/api/ivinf/sectorList.json';
		const params = {};
		const res = await ApiUtils.sendPost(url, params, true);
    	
		const items = res.data.data;	
		
		if(res.resultCode === '000000') {
			if(items.length > 0) {
				$$('#basDt').text(dayjs(items[0].basDt).format('YYYY-MM-DD'));
				
				this.listManager = GlobalApp.getListManager(this.rootElem, {
					usePagination : false,
					container: '#listContainer',
					listItemHtmlPath : '/components/ivinf/IVINF26S_L.html',
					listItemJsPath : '/components/ivinf/IVINF26S_L.js'
				});
				
			
				items.forEach((data, idx) => {
					data.id = idx;
					const str = data.zrinTpNm;
					if(str.indexOf('섹터') > -1) {
						data.zrinTpNm = str.substring(0, str.indexOf('섹터'));
					}
					
					data.prftRt1Val = CmmUtils.comma(parseFloat(data.prftRt1Val).toFixed(2));
					data.prftRt2Val = CmmUtils.comma(parseFloat(data.prftRt2Val).toFixed(2));
					data.prftRt3Val = CmmUtils.comma(parseFloat(data.prftRt3Val).toFixed(2));
					data.prftRt4Val = CmmUtils.comma(parseFloat(data.prftRt4Val).toFixed(2));
					data.prftRt5Val = CmmUtils.comma(parseFloat(data.prftRt5Val).toFixed(2));
					data.prftRt6Val = CmmUtils.comma(parseFloat(data.prftRt6Val).toFixed(2));
					data.prftRt7Val = CmmUtils.comma(parseFloat(data.prftRt7Val).toFixed(2));
				});
	
				this.setSdata(items);
				
				await this.listManager.render(items, this.eventReceiver);
			} else {
				let html = '';
				html += '		<br />';
				html += '		<div class="no-result">';
				html += '			<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
				html += '			<p class="body-medium fw-400">검색 결과가 없습니다.</p>';
				html += '		</div>';
				html += '		<br />';
				html += '		<br />';
				$$('#noDataContainer').html(html);
				$$('#ivinf26sChart').html(html);
				
				$$('.px0 mt24 mb40 content-fluid').hide();
				$$('.tab-content mt32').hide();
				$$('.group pb0 mt32').hide();
			}
		}
		// 차트영역
		this.loadChart();
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
	}
	
	/**
	 * 차트 - 조회
	 * @param
	 */
	async  loadChart() {
		let chartData = this.sData.value;
		let chartAll = [];
    	let chartArr = []; 
    	let selData = this.tmSel.value;
    	
    	if(chartData.length < 1) {
    		return;
    	}
    	
    	chartData.forEach((item, idx) => {
    		let data = {};
    		let str = null;
    		if(selData === '1') {
    			str = item.prftRt2Val;
    		} else if(selData === '2') {
    			str = item.prftRt3Val;
    		} else if(selData === '3') {
    			str = item.prftRt4Val;
    		} else if(selData === '4') {
    			str = item.prftRt5Val;
    		} else if(selData === '5') {
    			str = item.prftRt6Val;
    		}
    		
    		data = {
    				//name: item.indNm,
    				name: ' ',
    				y: parseFloat(str)
    		};
    		chartArr.push(data);
    		
    		let dataArr = [];
			dataArr.push(chartArr[idx]);
    			
    		chartAll.push({
    			name : item.zrinTpNm,
    			data : dataArr
    		});
    	});
    	
    	this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: 'ivinf26sChart',
			chartType:'bar',
			defaultShowDataLabel: true,
			lineColors: ["#2589F4", "#1641D0", "#1AA3C1", "#B348E5", "#F35E9C", "#7163EE", "#00AD7C", "#FFD138", "#F68486", "#CC1E24"],
			yAxisRightTitle: '',
		});
    	
    	await this.chartManager.render(chartAll);
	}
	
    destroy() {
        super.destroy(this);
    }
}