/*************************************************************************
* @ 서비스경로 : ETF51P
* @ 파일명      : ETF51P ETF > ETF 비교 > 수익률 추이
* @ 화면ID	  : PBWFU069901
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

export class ETF51P extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    	
    	//수익률추이 시작,종료일자
        [this.term, this.setTerm] = this.useState('term', '3');
        [this.startDate, this.setStartDate] = this.useState('startDate', this.getDate('3'));
        
        const now = dayjs();
        [this.endDate, this.setEndDate] = this.useState('endDate', now.format('YYYYMMDD'));
        
      //비교ETF 2개
    	[this.compareFnd1, this.setCompareFnd1] = this.useState('compareFnd1', '');
    	[this.compareFnd2, this.setCompareFnd2] = this.useState('compareFnd2', '');
    	
        [this.inq5Grid1, this.setInq5Grid1] = this.useState('inq5Grid1', []);
        [this.inq5Grid2, this.setInq5Grid2] = this.useState('inq5Grid2', []);
        [this.inq5Grid, this.setInq5Grid] = this.useState('inq5Grid', []);
        
        [this.dateList, this.setDateList] = this.useState('dateList', []);
        [this.ptrtList1, this.setPtrtList1] = this.useState('ptrtList1', []);
        [this.ptrtList2, this.setPtrtList2] = this.useState('ptrtList2', []);
    }

    async init (param) {
    	
    	super.init(this);
  
    	this.setCompareFnd1(param.compareFnd1);
    	this.setCompareFnd2(param.compareFnd2);
    	
    	$$("#prcBasDt2").html(param.prcBasDt);
    	
    	await this.apiFndTermInq('1',this.compareFnd1.value);
		await this.apiFndTermInq('2',this.compareFnd2.value);
		this.apiFndTermInqDataset();
		
    	this.register();
    }
    
    
    register() {
    	const _this = this;
    	/**
    	 * 수익률추이 기간설정
    	 */
    	const ptrtTermTab = async (event, element) => {
    		const param = {};
    		
    		if(!element.parentElement.classList.contains("tab-active")) {
    			
    			$$("#tabList").find("li").removeClass('tab-active');
        		element.parentElement.classList.add('tab-active');
        		
        		const term = element.dataset.term;
	    		this.setStartDate(this.getDate(term));
	        	
	    		await this.apiFndTermInq('1',this.compareFnd1.value);
	    		await this.apiFndTermInq('2',this.compareFnd2.value);
	    		this.apiFndTermInqDataset();
    		}
    	}
    	$$(document).findByName('ptrtTerm', 'click', ptrtTermTab);
    	
    	/**
    	 * 수익률추이 기간설정
    	 */
    	const typeTab = async (event, element) => {
    		const param = {};
    		
    		$("#tabList2").find("li").removeClass('tab-active');
    		element.parentElement.classList.add('tab-active');
    		
    		const div = element.dataset.type;
    		$$(".table-col").hide();
    		$$("#"+div+"Div").show();
    		
    	}
    	$$(document).findByName('type', 'click', typeTab);
    }
    
    /**
     * PBWON ETF 기간 조회
     */
    async apiFndTermInq(num,fndRprsCd) {
    	
    	const inq2Grid = [{
    		fndRprsCd :fndRprsCd
    	}]
    	const param = {
    		inqStaDt : this.startDate.value,
    		inqEndDt : this.endDate.value,
    		gridRow2Cnt : inq2Grid.length,
    		inqDisDfrsYn : '1',
    		inq2Grid : inq2Grid
		}
    	const result = await ApiUtils.sendPost('/api/etf/getFndTermInq.json', param);
    	
    	if(result.resultCode === '000000') {
    		if(num === '1') {
    			this.setInq5Grid1(result.data.inq5Grid);
    		} else {
    			this.setInq5Grid2(result.data.inq5Grid);
    		}
    	}
    }
    
    apiFndTermInqDataset() {
    	const _this = this;
    	
    	const inq5Grid1Cnt = this.inq5Grid1.value.length;
    	const inq5Grid2Cnt = this.inq5Grid2.value.length;
    	
    	let mainInq5Grid =  [];
    	let subInq5Grid =  [];
    	
    	if(inq5Grid1Cnt >= inq5Grid2Cnt) {
    		mainInq5Grid = this.inq5Grid1.value; 
    		subInq5Grid = this.inq5Grid2.value; 
    	} else {
    		mainInq5Grid = this.inq5Grid2.value; 
    		subInq5Grid = this.inq5Grid1.value;
    	}
    	
    	if(mainInq5Grid.length > 0) $$(".fndNm1").text(mainInq5Grid[0].tgtItmNm);
    	if(subInq5Grid.length > 0) $$(".fndNm2").text(subInq5Grid[0].tgtItmNm);
    	
    	let ptrtList = '';
    	let fndBasPrList = '';
    	
    	
    	//그래프 데이터
    	let dateList = [];
    	let ptrtList1 = [];
    	let ptrtList2 = [];
    	
    	if(mainInq5Grid.length > 0) {
    		
    		//데이터merge
	    	$.each(mainInq5Grid, function(idx, item) {
	    		item.tgtItmNm2 = '';  
	    		item.fndBasPr2 = 0;  
	    		item.stdv1Nidx2 = 0;
	    		
	    		if(subInq5Grid.length > 0) {
		    		$.each(subInq5Grid, function(idx2, item2) {
		    			if(item.basDt === item2.basDt) {
			    			item.tgtItmNm2 = item2.tgtItmNm;
			    			item.fndBasPr2 = item2.fndBasPr;
			    			item.stdv1Nidx2 = item2.stdv1Nidx;
		    			}
		    		});
	    		} 
	    		
			});
	    	
	    	$.each(mainInq5Grid, function(idx, item) {
	    		
	    		let classType1 = '';
	        	let classType2 = '';
	    		
	    		dateList.push(_this.formatChange(item.basDt,'MM-DD'));
	    		
	    		const arr1 = {};
				const arr2 = {};
				
				arr1.name = _this.formatChange(item.basDt,'MM-DD');
	    		arr1.y = item.stdv1Nidx;
	    		
	    		arr2.name = _this.formatChange(item.basDt,'MM-DD');
	    		arr2.y = item.stdv1Nidx2;
	    		
	    		//그래프 데이터
	    		ptrtList1.push(arr1);
	    		ptrtList2.push(arr2);
	    		
	    		item.basDt = _this.formatChange(item.basDt);
	    		
	    		if(item.stdv1Nidx > 0) classType1 = 'fc-red-600';
				else if(item.stdv1Nidx < 0) classType1 = 'fc-blue-600';
				let stdv1Nidx = item.stdv1Nidx > 0 ? "+"+Number(item.stdv1Nidx).toFixed(2) : Number(item.stdv1Nidx).toFixed(2);
				
				if(item.stdv1Nidx2 > 0) classType2 = 'fc-red-600';
				else if(item.stdv1Nidx2 < 0) classType2 = 'fc-blue-600';
				let stdv1Nidx2 = item.stdv1Nidx2 > 0 ? "+"+Number(item.stdv1Nidx2).toFixed(2) : Number(item.stdv1Nidx2).toFixed(2);
	    		
	    		ptrtList += '<tr>';
				ptrtList += '<th scope="row" class="ac">'+item.basDt+'</th>';
				ptrtList += '<td class="ar '+classType1+'">'+stdv1Nidx+'%</td>';
				ptrtList += '<td class="ar '+classType2+'">'+stdv1Nidx2+'%</td>';
				ptrtList += '</tr>';
				
				//let fndBasPr = item.fndBasPr > 0 ? item.fndBasPr : item.fndBasPr;
				//let fndBasPr2 = item.fndBasPr2 > 0 ? item.fndBasPr2 : item.fndBasPr2;
				fndBasPrList += '<tr>';                                    
				fndBasPrList += '<th scope="row" class="ac">'+item.basDt+'</th>';    
				fndBasPrList += '<td class="ar">'+Number(item.fndBasPr).toFixed(2)+'</td>'; 
				fndBasPrList += '<td class="ar">'+Number(item.fndBasPr2).toFixed(2)+'</td>';
				fndBasPrList += '</tr>'                                      
    			
	    	});
	    	
	    	$$("#ptrtList").html(ptrtList);
	    	$$("#fndBasPrList").html(fndBasPrList);
	    	
    	} else {
    		
    		let html = '';
    		html += '<tr>';
			html += '<td colspan="3">';
			html += '	<p class="description caution body-small d-inflex">내용이 없습니다.</p>';
			html += '</td>';
			html += '</tr>';
			
    		$$("#ptrtList").html(html);
	    	$$("#fndBasPrList").html(html);
    	}
    	
    	this.setDateList(dateList);
		this.setPtrtList1(ptrtList1);
		this.setPtrtList2(ptrtList2);
		this.setInq5Grid(mainInq5Grid);
		
    	this.drawSplineChart();
    }
    
    
    async drawSplineChart() {

    	const _this = this;
    	
    	const interval = Math.floor(Number(this.dateList.value.length)/2);
    	const tickInterval = Number(this.dateList.value.length)%2 === 0 ? interval - 1 : interval;
    	
    	this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: 'chart2',
			chartType:'spline',
			lineColors:  ['#7163EE', '#F35E9C', '#1AA3C1'],
			yAxisRightTitle: '',
			tickInterval: tickInterval,
			chartHeight : "250px",
			yAxisLeftLabels : true,
			shared: true,
			tooltip:  {
				"shared" : true,
				"formatter" : function() {
					console.log(this);
					
					const inq5Grid = _this.inq5Grid.value;
					let tooltipTxt = '';
					$.each(this.points, function(i, item){
						$.each(inq5Grid, function(i2, item2){
							if(item.key === _this.formatChange(item2.basDt,'MM-DD')) {
								if(i === 0) {
									tooltipTxt += '<span style="font-size: 10px;">'+_this.formatChange(item2.basDt,'YYYY-MM-DD')+'</span>';
									tooltipTxt += '<br>';
								}
								tooltipTxt += '<span style="color: '+item.color+';">●</span> ';
								tooltipTxt += ' ';
								if(item2.tgtItmNm === item.series.name) {
									tooltipTxt += '<b>'+Number(item.y).toFixed(2)+'% ('+Number(item2.fndBasPr).toFixed(2)+')</b>';
								} else  {
									tooltipTxt += '<b>'+Number(item.y).toFixed(2)+'% ('+Number(item2.fndBasPr2).toFixed(2)+')</b>';
								}
								tooltipTxt += '<br>';
							}
						});
			        });
					return tooltipTxt;
				},
				
				"useHTML" : true
			}
		});
    	
    	const chartAll =  [
    		{
				"name" : $$(".fndNm1").text()
				, "data" : this.ptrtList1.value
			},
			{
				"name" : $$(".fndNm2").text()
				, "data" : this.ptrtList2.value
			}
		];
        	
    	await this.chartManager.render(chartAll);
    	
    	$('.content').removeClass('loading');
    }
    
    getDate(term) {
    	const currentDate = new Date();
    	currentDate.setMonth(currentDate.getMonth() - Number(term));
    	return this.formatChange(currentDate,'YYYYMMDD');
    }

    formatChange (val,format) {
    	if(format === '' || format === null || typeof format === 'undefined') {
    		format = 'YYYY-MM-DD';
    	}
    	if(val != '') {
    		return dayjs(val).format(format);
    	}
    	return '-';
    }
    
    destroy () {
        super.destroy(this);
    }
}
