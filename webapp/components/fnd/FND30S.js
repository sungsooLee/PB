/*************************************************************************
* @ 서비스경로 : FND30M
* @ 파일명      : FND30M    펀드 > 펀드 상세
* @ 화면ID	  : PBWFU040000
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

//router 초기화
const router = globalApp.router;

export default class FND30S extends BaseModule {
	
    constructor(elem, data) {
    	super(elem);
    	
    	$(document).off("scroll");
    	
    	[this.fndPdcd, this.setFndPdcd] = this.useState('fndPdcd',  data.fndPdcd);
    	[this.fndNm, this.setFndNm] = this.useState('fndNm',  '');
    	[this.isAllShow, this.setIsAllShow] = this.useState('isAllShow', false);

    	[this.sbBasPr, this.setSbBasPr] = this.useState('sbBasPr', false);
    	[this.clasCmrs, this.setClasCmrs] = this.useState('clasCmrs', false);
    	[this.agrtOrInmd, this.setAgrtOrInmd] = this.useState('agrtOrInmd', []);
    	
    	const riskList = [
        	{riskColor: 'tags-lightRed', ristGdNm: '매우높은위험'},
        	{riskColor: 'tags-FFF4EB', ristGdNm: '높은위험'},
        	{riskColor: 'tags-lightYellow', ristGdNm: '다소높은위험'},
        	{riskColor: 'tags-green-50', ristGdNm: '보통위험'},
        	{riskColor: 'tags-lightBlue', ristGdNm: '낮은위험'},
        	{riskColor: 'tags-lightViolet', ristGdNm: '매우낮은위험'},
        	{riskColor: 'tags-lightPurple', ristGdNm: '글로벌'},
        	{riskColor: 'tags-red-100', ristGdNm: '원금손실가능'},
        ];
        [this.riskList, this.setRiskList] = this.useState('riskList', riskList);
        
        //날짜/수익률지수/기준가/bm/유형 
        [this.inq5GridFndNm, this.setInq5GridFndNm] = this.useState('inq5GridFndNm', '');
        [this.inq5Grid, this.setInq5Grid] = this.useState('inq5Grid', {});
        [this.inq5GridCnt, this.setInq5GridCnt] = this.useState('inq5GridCnt', '');
        [this.dateList, this.setDateList] = this.useState('dateList', []);
        [this.ptrtList, this.setPtrtList] = this.useState('ptrtList', []);
        [this.bmList, this.setBmList] = this.useState('bmList', []);
        [this.tpAvgList, this.setTpAvgList] = this.useState('tpAvgList', []);

        //수익률추이 시작,종료일자
        [this.term, this.setTerm] = this.useState('term', '3');
        [this.startDate, this.setStartDate] = this.useState('startDate', this.getDate('3'));
        
        const now = dayjs();
        [this.endDate, this.setEndDate] = this.useState('endDate', now.format('YYYYMMDD'));
        
    }

    init () {
    	super.init(this);
    	
    	this.register();
    	
    	this.apiFndDetail();
    	
    	//행내한 팝업 내용
    	$$("#snackbar-title").text("행내한");
    	$$("#snackbar-content").text("본 자료는 직원에게 상품 정보를 제공하기 위한 목적으로 외부로 유출되거나 투자 권유, 계약 체결 등 다른 용도로 활용되지 않도록 유의하시기 바랍니다.");
    	
        
        /**
         *  안내문구
         */
        tippy('.d-flex',{
			allowHTML : true
		});
    }
    
    register() {
    	
    	
    	/**
    	 * 상위10위 전레보기
    	 */
    	const allShow = () => {
    		//TODO 전체보기
    		
    		if(this.isAllShow.value === false) {
    			$$(".more").css({'display':'flex'});
    			this.setIsAllShow(true);
    			event.currentTarget.innerText = '접기';
    		} else {
    			$$(".more").css({'display':'none'});
    			this.setIsAllShow(false);
    			event.currentTarget.innerText = '전체보기';
    		}
    	}
    	this.registerCallback("click", $$("#allShow"), allShow);
    	
    	/**
    	 * 팝업오픈
    	 */
    	const openPopup = async (event, element) => {
    		let param = {};
    		
    		if(element.value === 'fnd31p') {
    			param.inq5Grid = this.inq5Grid.value;
    			param.fndNm = this.inq5GridFndNm.value;
    			param.term = this.term.value;
    		} else if(element.value === 'fnd32p') {
    			param = this.sbBasPr.value;
    		}else if(element.value === 'fnd33p') {
    			param.agrtOrInmd = this.agrtOrInmd.value;
    		} else if(element.value === 'fnd35p') {
    			param = this.clasCmrs.value;
    		}
    		
    		await GlobalApp.popupUtils.openPopup(element.value, {
                showCloseBtn : true,
                params : param,
                onClose : (result) => console.log('onClose Result : ' , result),
            });
    		
    	}
    	$$(document).findByName('popup', 'click', openPopup);
    	
    	/**
    	 * 수익률추이 기간설정
    	 */
    	const ptrtTermTab = async (event, element) => {
    		const param = {};
    		
    		if(!element.parentElement.classList.contains("tab-active")) {
	    		$("#tabList").find("li").removeClass('tab-active');
	    		element.parentElement.classList.add('tab-active');
	    		
	    		const term = element.dataset.term;
	    		this.setTerm(term);
	    		this.setStartDate(this.getDate(term));
	        	
	    		this.apiFndTermInq();
    		}
    	}
    	$$(document).findByName('ptrtTerm', 'click', ptrtTermTab);
    	
    	
    	
    }
    

    goCmty() {
    	const param = {
			fndPdcd : this.fndPdcd.value
			, fndNm : this.fndNm.value
		}
		router.navigate('fnd40s',param);
    }
    
    /**
	 * 관심펀드 이벤트
	 */
    async likeBtnClick(event, element){

		let isLike = "N";
		if( element.value === 'N' || element.value === '') {
			isLike = 'Y';
		} 
		
		const param =  {
				fndPdcd : $$("#fndPdcd").value()
				, isLike : isLike
				, cncrFndNm :  $$("#fndNm").value()
		}
		
		
		const result = await ApiUtils.sendPost('/api/fnd/updateCncrFnd.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			if(result.data === -1) {
				element.children[0].classList.remove('icon-fav-active');
				element.children[0].classList.add('icon-fav');
				toastr.error(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '더 이상 등록할 수 없습니다.', {
					"extendedTimeOut": 0,
					"preventDuplicates": false,
					"disableTimeOut": true,
				});
			} else if(result.data === 0) {
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav-active');
					element.children[0].classList.add('icon-fav');
					toastr.error(``, '관심펀드 등록에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add('icon-fav-active');
					toastr.error(``, '관심펀드 삭제에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			} else {
				element.value = param.isLike;
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add("icon-fav-active");	
					toastr.success(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심펀드에 등록되었습니다', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.add('icon-fav');
					element.children[0].classList.remove("icon-fav-active");	
					toastr.caution(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심펀드에서 삭제되었습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			}
		} else {
			toastr.error(``, result.resultMessage, {
				"extendedTimeOut": 0,
				"preventDuplicates": false,
				"disableTimeOut": true,
			});
		}
	}
	
	
	
    /**
     * 펀드 상세정보 조회
     */
    async apiFndDetail() {
    	const param = {
    		fndPdcd : this.fndPdcd.value
		}
    	const result = await ApiUtils.sendPost('/api/fnd/getFndDetail.json', param, true);
    	
    	if(result.resultCode === '000000') {
    		await this.apiFndDetailDataset(result.data);
    		
    		/**
        	 * 커뮤니티 이동,관심펀드 이벤트 추가
        	 */
        	this.registerCallback("click", $$("#goCmty"), this.goCmty);
        	$$(document).findByName('likeBtn', 'click', this.likeBtnClick);
        	
    		this.top10ivstAset(result.data.data.grid2);
    		
    		if(result.data.data.grid1.length === 0) {
    			$$("#pieChartLine").hide();
    			$$("#pieChartDiv").hide();
    		} else {
    			this.drawPieChart(result.data.data.grid1);
    		}
    		
    		this.apiFndTermInq();
    	} else {
    		const res = await CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인',
	            status : 'caution'
	        });
			if(res.resultCd === "000000") {
				history.back();
			}
    	}
    	
    	if(CmmUtils.isLoading()) {
        	CmmUtils.hideLoading();
        }
    }
    
    
    apiFndDetailDataset(data) {

    	console.log(data);
    	
    	if(data.agrtOrInmd.length > 0) {
    		this.setAgrtOrInmd(data.agrtOrInmd);
    	} else {
    		$$("#fnd33pStroke").hide();
    		$$("#fnd33pBtn").hide();
    	}
    	
    	$$("#totCmtyCnt").html(data.cmtyCnt.CMTY_TOT_CNT);
    	$$("#likeBtn").value(data.isLike);
    	if(data.isLike === 'Y') {
    		$$(".icon-fav").addClass("icon-fav-active");	
    	}
    	
    	$$("#prdKorlNm").text(data.data.prdKorlNm); //펀드명
    	
    	$$("#fndPdcd").value(data.data.fndRprsCd);
    	$$("#fndNm").value(data.data.prdKorlNm);
    	
    	
    	if(this.fndNm.value === '' || this.fndNm.value === null || typeof this.fndNm.value === 'undefined' ) {
    		this.setFndNm(data.data.prdKorlNm);
    	}
    	
    	//상품설명
    	if(!CmmUtils.isNullorEmpty(data.data.fndAgrtTxt)) {
    		$$("#fndAgrtTxt").html(data.data.fndAgrtTxt);
    	} else {
    		$$("#fndAgrtTxtDiv").hide();
    	}
    	
    	$$("#prdDtlTxt").text(data.data.prdDtlTxt); //펀드설명


    	//수익률 부분
    	const bmmPrftRt = CmmUtils.isNullorEmpty(data.data.m1PrftRt) ? Number(0).toFixed(2) : Number(data.data.m1PrftRt).toFixed(2);
    	const m3PrftRt = CmmUtils.isNullorEmpty(data.data.m3PrftRt) ? Number(0).toFixed(2) : Number(data.data.m3PrftRt).toFixed(2);
    	const m6PrftRt = CmmUtils.isNullorEmpty(data.data.m6PrftRt) ? Number(0).toFixed(2) : Number(data.data.m6PrftRt).toFixed(2);
    	const m12PrftRt = CmmUtils.isNullorEmpty(data.data.m12PrftRt) ? Number(0).toFixed(2) : Number(data.data.m12PrftRt).toFixed(2);
    	const fndEstDt = data.data.fndEstDt;
    	
    	let html = '';
    	if((CmmUtils.isEmpty(fndEstDt) && !CmmUtils.isEmpty(bmmPrftRt)) || this.calcDiff(fndEstDt)) {
    		
    		$$("#bmmPrftRt").text(bmmPrftRt > 0 ? "+"+bmmPrftRt+"%" : bmmPrftRt+"%");
    		$$("#m3PrftRt").text(m3PrftRt > 0 ? "+"+m3PrftRt+"%" : m3PrftRt+"%");
    		if(m3PrftRt > 0 && $$("#m3PrftRt").elements[0] ) {
    			$$("#m3PrftRt").elements[0].parentElement.classList.add('rise');
			} else if(m3PrftRt < 0 && $$("#m3PrftRt").elements[0] ) {
    			$$("#m3PrftRt").elements[0].parentElement.classList.add('fall');
    		}
    		$$("#m6PrftRt").text(m6PrftRt > 0 ? "+"+m6PrftRt+"%" : m6PrftRt+"%");
    		$$("#m12PrftRt").text(m12PrftRt > 0 ? "+"+m12PrftRt+"%" : m12PrftRt+"%");
    		
    	} else { // 설정기간 1개월 미경과 시 안내 텍스트출력
    		html += '   <div class="expect-desc">';
			html += '   	<p>설정기간 1개월 미경과</p>';
			html += '   </div>';
			$(".expect-list").remove();
 			$$("#prftRtDiv").append(html);
    	}
        	
    	
    	$$("#fndBasPr").text(data.data.fndBasPr.toFixed(2)); //기준가
    	if(Number(data.data.difAm) > 0) {
    		$$(".status-list").append('<dd class="rise" aria-label="상승">'+Number(data.data.difAm).toFixed(2)+'</dd>');
    	} else if(Number(data.data.difAm) < 0) {
    		$$(".status-list").append('<dd class="fall" aria-label="하락">'+Number(data.data.difAm*-1).toFixed(2)+'</dd>');
    	} else {
    		$$(".status-list").append('<dd class="steady" aria-label="보합">0</dd>');
    	}
    	
    	
    	let risk = {};
    	const riskList = this.riskList.value;
    	let riskPgrdTxt = data.data.riskPgrdTxt;
    	if(riskPgrdTxt.indexOf('(') > -1) riskPgrdTxt = riskPgrdTxt.substring(0,riskPgrdTxt.indexOf('('));
    	
    	for(let i=0;i<riskList.length;i++) {
    		if(riskPgrdTxt === riskList[i].ristGdNm) {
    			risk = riskList[i];
    			break;
    		}
    	}
    	
    	//상단태그
    	$$("#tag").append('<div class="tags tags-medium '+risk.riskColor+'">'+data.data.riskPgrdTxt+'</div>')
    	$$("#tag").append('<div class="tags tags-medium tags-lightPurple">'+data.data.prdIvstRgnNm+'</div>')
    	
    	
    	const keywords = data.data.fndPrdKrdNm.split('#')

    	html = '';
    	$.each(keywords, function(idx, item) {
    		if(item !== '') {
    			html += '<div class="tags tags-medium tags-white">#'+item.trim()+'</div>';
    		}
		});
    	$$("#fndPrdKrdNm").html(html); //키워드
    	
    	$.each(data.data.grid8, function(idx, item) {
    		if(item.dis === '선취') {
    			//선취 수수료
    	    	if(item.fndFeeRtAm !== 0) {
    	    		$$("#pocpFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		} else if(item.dis === '환매') {
    			if(item.fndFeeRtAm !== 0) {
    	    		$$("#rprhFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		}
		});
    	
    	//총 보수
    	if(data.data.totPfeRt !== 0) {
    		$$("#totPfeRt").html("연 "+Number(data.data.totPfeRt)+"%");
    	} else {
    		$$("#totPfeRt").html("없음");
    	}
    	
    	let html1 = '';
    	html = '';
    	//html = '('
    	$.each(data.data.grid7, function(idx, item) {
    		if(idx < data.data.grid7.length-1) {
    			if(item.dtlDis.replaceAll('보수','') !== '평가') {
    				if(item.dtlDis.replaceAll('보수','') === '판매') {
    					html1 += item.dtlDis.replaceAll('보수','');
    	    			html1 += ' ';
    	    			html1 += Number(item.prdSelPfeRt)+'%';
    				} else {
    					if(item.dtlDis.replaceAll('보수','') !== '평가' 
    						|| (item.dtlDis.replaceAll('보수','') === '평가' && Number(item.prdSelPfeRt) !== 0)) {
	    					html += ', '
	    					html += item.dtlDis.replaceAll('보수','');
	    	    			html += ' ';
	    	    			html += Number(item.prdSelPfeRt)+'%';
    					}
    				}
    			} 
    		}
		});
    	//html += ')';
    	
    	$$("#totPfeRt").append('(<p class="fc-typography-caption fs-14 fw-400" id="totPreRtInfo"></p>)')
    	let resHtml = '('+html1+html+')';
    	$$("#totPreRtInfo").html(resHtml);
    	
    	$$("#prcBasDt").text(this.formatChange(data.data.prcBasDt)); //기준일
    	
    	$$("#zrinLrgTpNm").text(data.data.zrinLrgTpNm); //펀드 유형
    	$$("#prdIvstRgnNm").text(data.data.prdIvstRgnNm); //투자 국가
    	$$("#fndEstDt").text(this.formatChange(data.data.fndEstDt)); //펀드 설정일
    	$$("#zrinTpNm").text(data.data.zrinTpNm); //펀드 섹터
    	$$("#asetOprcNm").text(data.data.asetOprcNm); //운용사
    	
    	//매매기준일 팝업 내용
    	const bsdtTxt = {
			'bsdtTxt1' : data.data.bsdtTxt1,
			'bsdtTxt2' : data.data.bsdtTxt2,
			'bsdtTxt3' : data.data.bsdtTxt3
    	}
    	this.setSbBasPr(bsdtTxt);
    	
    	//클래스비교 팝업내용
    	this.setClasCmrs(data.data.grid4);
    }
    
    top10ivstAset(list) {
    	let html = '';
    	
    	if(list.length > 1) {
    		
    		if(list.length < 4) {
    			$$("#allShow").hide();
    		}
	    	$.each(list, function(idx, item) {
	    		let more = idx > 2 ? 'more' : '';
	    		let style = idx > 2 ? 'style="display:none;"' : '';
	    		
	    		html += '<div class="list '+more+'" '+style+'>';
				html += '	<dt>'+(idx+1)+'. '+item.secItmsNm+'</dt>';
				html += '	<dd>'+Number(item.fndAdmtRt).toFixed(2)+'%</dd>';
				html += '</div>';
			});
	    	
	    	$$("#top10List").html(html);
    	} else {
    		$$("#top10Div1").hide();
    		$$("#top10Div2").hide();
    	}
    }
    
    
    /**
     * PBWON 펀드 기간 조회
     */
    async apiFndTermInq() {
    	
    	const inq2Grid = [{
    		fndRprsCd : this.fndPdcd.value
    	}]
    	const param = {
    		inqStaDt : this.startDate.value,
    		inqEndDt : this.endDate.value,
    		gridRow2Cnt : inq2Grid.length,
    		inqDisDfrsYn : '1',
    		inq2Grid : inq2Grid
		}
    	const result = await ApiUtils.sendPost('/api/fnd/getFndTermInq.json', param);
    	
    	if(result.resultCode === '000000') {
    		
    		if(result.data.inq5Grid.length === 0) {
    			$$("#lineChart").hide();
    			$$("#lineChartLine").hide();
    		} else {
    			await this.apiFndTermInqDataset(result.data.inq5Grid);
    			this.drawSplineChart();
    		}
    	}
    }
  
    
    
    apiFndTermInqDataset(inq5Grid) {
    	const _this = this;
    	
    	let dateList = [];
    	let ptrtList = [];
    	let bmList = [];
    	let tpAvgList = [];

    	if(inq5Grid.length > 0) {
	    	
	    	this.setInq5GridFndNm(inq5Grid[0].tgtItmNm);
	    	
			
	    	$.each(inq5Grid, function(idx, item) {
	    		dateList.push(_this.formatChange(item.basDt,'MM-DD'));
	    		
	    		const arr1 = {};
				const arr2 = {};
				const arr3 = {};
				
	    		arr1.name = _this.formatChange(item.basDt,'MM-DD');
	    		arr1.y = item.stdv1Nidx;
	    		
	    		arr2.name = _this.formatChange(item.basDt,'MM-DD');
	    		arr2.y = item.stdv4Nidx;
	    		
	    		arr3.name = _this.formatChange(item.basDt,'MM-DD');
	    		arr3.y = item.stdv5Nidx;
	    		
	    		ptrtList.push(arr1);
	    		bmList.push(arr2);
	    		tpAvgList.push(arr3);
	    		
	    		item.stdv1Nidx = item.stdv1Nidx.toFixed(2);
	    		item.stdv4Nidx = item.stdv4Nidx.toFixed(2);
	    		item.stdv5Nidx = item.stdv5Nidx.toFixed(2);
			});
    	}
    	
    	const term = this.term.value;
    	
    	this.setInq5Grid(inq5Grid);
    	this.setInq5GridCnt(inq5Grid.length);
    	this.setDateList(dateList);
		this.setPtrtList(ptrtList);
		this.setBmList(bmList);
		this.setTpAvgList(tpAvgList);
    }
    
    
    drawPieChart(list) {
    	
    	const _this = this;
    	
    	const initData = {
    		"chart" : {
    			"type" : "pie"
    			,"borderWidth" : '0'
    		},
    		
    		/**
    		 * 	1. 국내주식 : #2589F4
			   	2. 해외주식 : #1641D0
				3. 국내채권 : #F35E9C
				4. 해외채권 : #B348E5
				6. 유동성 : #1AA3C1
				5. 펀드 : #7163EE
				7. 기타 : #048B65
    		 */
    		"colors": ['#2589F4', '#1641D0', '#F35E9C', '#B348E5', '#1AA3C1', '#7163EE', '#048B65'],
    		"plotOptions" : {
    			"pie": {
    				"size" : "150%"
    				, "innerSize": "50%"
    				, "startAngle" : -90
    				, "endAngle" : 90
    				, "center" : ["50%","100%"]
    				, "dataLabels" : {
    					"enabled" : true,
    					"distance" : -30,
    					"formatter" : function() {
    						return "";
    					},
    				},
    				"showInLegend" : true,
    				"shadow" : false,
        			"borderColor" : "#ffffff",
        			"borderWidth" : 0,
    			}
    			
    		},
    		"yAxis" : {
    			"labels" : {
    				"formatter" : function() {
    					console.log(this);
    				}
    			}
    		},
    		"legend": {
    			"enabled" : true
    			,"align" : "center"
    			,"verticalAlign" : "bottom"
    			,"borderWidth" : '0'
    			,"labelFormatter" : function() {
    				return this.options.name + " " + this.options.y+"%";
    			}
    		},
    		"tooltip":  {
				"shared" : true,
				"formatter" : function() {
					
					let tooltipTxt = '';
					
					tooltipTxt += '<span style="color: '+this.color+';">● </span>'+this.key;
					tooltipTxt += ' ';
					tooltipTxt += '<b>'+this.y+'%</b>';
					
					return tooltipTxt;
				},
				
				
				"useHTML" : true
			}
    		
    	}
    	
    	if($$('#chart').elements.length === 0) {
			return;
		}
    	
    	createIBChart('chart','pieChart', {
    		width:"100%"
    		, height : "250px"
    	});
    	
    	pieChart.setOptions(initData);
    	
    	const data = {
    		"series": [
    			{
    				"name" : "자산구성"
    				, "data" : []
    			}
    		]
    	}
    	
    	$.each(list, function(idx, item) {
    		if(idx === 0) $$("#baseDt").text(_this.formatChange(item.prcBasDt));
    		if(item.asetIvstWgtRt !== 0) {
    			let obj = {};
        		obj.name = item.asetTpClfNm;
        		obj.y = item.asetIvstWgtRt;
        		data.series[0].data.push(obj);
    		}
		});
    	
    	
    	pieChart.loadSearchData(data, {
    		append:true
    	});
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
									tooltipTxt += '<b>'+item.y.toFixed(2)+'% ('+item2.fndBasPr.toFixed(2)+')</b>';
								} else {
									tooltipTxt += '<b>'+item.y.toFixed(2)+'%</b>';
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
				"name" : this.inq5GridFndNm.value
				, "data" : this.ptrtList.value
			},
			{
				"name" : "BM"
				, "data" : this.bmList.value
			},
			{
				"name" : "유형평균"
				, "data" : this.tpAvgList.value
			}
		];
        	
    	await this.chartManager.render(chartAll);
    	
    	$('.content').removeClass('loading');
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
    
    getDate(term) {
    	const currentDate = new Date();
    	currentDate.setMonth(currentDate.getMonth() - Number(term));
    	return this.formatChange(currentDate,'YYYYMMDD');
    }
    
    calcDiff (fndEstDt) {

        const stDt = dayjs(fndEstDt);
        const now = dayjs();

        const diffDay = now.diff(stDt, 'day');

        return diffDay >= 30 ? true : false;
    }

    destroy () {
        super.destroy(this);
    }
    
 
}
