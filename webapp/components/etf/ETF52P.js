/*************************************************************************
* @ 서비스경로 : ETF52P
* @ 파일명      : ETF52P ETF > ETF 비교 > 자산구성 비교
* @ 화면ID	  : PBWFU069902
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

export class ETF52P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	[this.asetIvstWgtRtList1, this.setAsetIvstWgtRtList1] = this.useState('asetIvstWgtRtList1', []);
    	[this.asetIvstWgtRtList2, this.setAsetIvstWgtRtList2] = this.useState('asetIvstWgtRtList2', []);
    	
    	[this.prdKorlNm1, this.setPrdKorlNm1] = this.useState('prdKorlNm1', '');
    	[this.prdKorlNm2, this.setPrdKorlNm2] = this.useState('prdKorlNm2', '');
    }

    init (param) {
    	
    	super.init(this);
    	
    	if(param.asetTpClfList1.length > 0 && param.asetTpClfList2.length > 0) {
    		
    		this.setPrdKorlNm1(param.prdKorlNm1);
    		this.setPrdKorlNm2(param.prdKorlNm2);
    		
    		$$("#prdKorlNm1").text(param.prdKorlNm1);
    		$$("#prdKorlNm2").text(param.prdKorlNm2);
    
	    	let map = new Map();
	    	let categories = [];
	    	
	    	param.asetTpClfList1.forEach((item) => {
	    		param.asetTpClfList2.forEach((item2) => {
	    			if(item.asetTpClfNm === item2.asetTpClfNm) {
	    				item.asetIvstWgtRt2 = item2.asetIvstWgtRt;
	    			}
	            });
	        });
	    	
	    	let html = '';
	    	let asetTpClfList1 = [];
	    	let asetTpClfList2 = [];
	    	
	    	param.asetTpClfList1.forEach((item) => {
	    		
	    		categories.push(item.asetTpClfNm);
	    		
	    		html += '<tr>';
				html += '<th scope="row" class="al">'+item.asetTpClfNm+'</th>';
				html += '<td class="ar">'+item.asetIvstWgtRt+'%</td>';
				html += '<td class="ar">'+item.asetIvstWgtRt2+'%</td>';
				html += '</tr>';
				
				const arr1 = {};
				const arr2 = {};
				
				arr1.name = item.asetTpClfNm;
	    		arr1.y = item.asetIvstWgtRt;
	    		asetTpClfList1.push(arr1);
	    		
	    		arr2.name = item.asetTpClfNm;
	    		arr2.y = item.asetIvstWgtRt2;
	    		asetTpClfList2.push(arr2);
	    		
	        });
	    	
	    	this.setAsetIvstWgtRtList1(asetTpClfList1);
    		this.setAsetIvstWgtRtList2(asetTpClfList2);
	    	
	    	$$("#list").html(html);
	    	
	    	this.drawSplineChart();
	    	
    	} else {
    		$$("#no-data").css({'display':'flex'});
    		$$("#chart").hide();
    		$$(".table-col").hide();
    	}
  
    }
    
    async drawSplineChart() {

    	
    	this.chartManager = GlobalApp.getChartManager(this.rootElem, {
			container: 'chart3',
			chartType:'column',
			lineColors:  ['#7163EE', '#F35E9C'],
			yAxisRightTitle: '',
			chartHeight : "250px",
			chartSubTitle : "1년 기준 지표(%순위)",
			yAxisLeftLabels : true,
			shared: true,
			tooltip:  {
				"shared" : true,
				"formatter" : function() {
					let tooltipTxt = '';
					
					$.each(this.points, function(i, item){
						if(i === 0) {
							tooltipTxt += '<span style="font-size: 10px;">'+item.key+'</span>';
							tooltipTxt += '<br>';
						}
						tooltipTxt += '<span style="color: '+item.color+';">●</span> ';
						tooltipTxt += ' ';
						tooltipTxt += '<b>'+item.y+'%</b>';
						tooltipTxt += '<br>';
			        });
					return tooltipTxt;
				},
			}
		});
    	
    	const chartAll =  [
    		{
				"name" : this.prdKorlNm1.value
				, "data" : this.asetIvstWgtRtList1.value
			},
			{
				"name" : this.prdKorlNm2.value
				, "data" : this.asetIvstWgtRtList2.value
			},
		];
        	
    	await this.chartManager.render(chartAll);
 
    }
    
    register() {
    	
    }
    
    destroy () {
        super.destroy(this);
    }
}
