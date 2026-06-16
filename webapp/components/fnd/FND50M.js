/*************************************************************************
* @ 서비스경로 : FND50M
* @ 파일명      : FND50M 펀드 > 펀드 비교
* @ 화면ID	  : PBWFU060000
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

export default class FND50M extends BaseModule {
	
    constructor(elem, data) {
    	super(elem);
    	
    	$(document).off("scroll");
    	
    	//비교펀드 2개
    	[this.compareFnd1, this.setCompareFnd1] = this.useState('compareFnd1', data.compareFnd1);
    	[this.compareFnd2, this.setCompareFnd2] = this.useState('compareFnd2', data.compareFnd2);
    	
    	[this.asetTpClfList1, this.setAsetTpClfList1] = this.useState('asetTpClfList1', []);
    	[this.asetTpClfList2, this.setAsetTpClfList2] = this.useState('asetTpClfList2', []);
    	
    	[this.prdKorlNm1, this.setPrdKorlNm1] = this.useState('prdKorlNm1', '');
    	[this.prdKorlNm2, this.setPrdKorlNm2] = this.useState('prdKorlNm2', '');
    	
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
    }

    init () {
    	super.init(this);
    	
    	this.apiFndCmrs();
    	
    	this.register();
    }
    
    register() {
    	/**
    	 * 팝업오픈
    	 */
    	const openPopup = async (event, element) => {
    		let param = {};
    		
    		if(element.value === 'fnd52p') {
    			param = {
    				asetTpClfList1 : this.asetTpClfList1.value,
    				asetTpClfList2 : this.asetTpClfList2.value,
    				prdKorlNm1 : this.prdKorlNm1.value,
    				prdKorlNm2 : this.prdKorlNm2.value
    			}
    		} else {
    			param = {
    	    		compareFnd1 : this.compareFnd1.value
    	    		,compareFnd2 : this.compareFnd2.value
    	    		,prcBasDt : $$("#prcBasDt").text()
    			}
    		}
    		
    		await GlobalApp.popupUtils.openPopup(element.value, {
                showCloseBtn : true,
                params : param,
                onClose : (result) => console.log('onClose Result : ' , result),
            });
    		
    	}
    	$$(document).findByName('popup', 'click', openPopup);
    }
    
    /**
     * 펀드비교
     */
    async apiFndCmrs(data) {
    	const param = {
    			compareFnd1 : this.compareFnd1.value
    		,compareFnd2 : this.compareFnd2.value
		}
    	const result = await ApiUtils.sendPost('/api/fnd/getFndCmrs.json', param, true);
    	
    	if(result.resultCode === '000000') {
    		await this.allData(result);
    		if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading();
	        }
    	}
    }
    
    allData(result) {
    	this.fnd1Dataset(result.data.fnd1);
		this.fnd2Dataset(result.data.fnd2);
    }
    fnd1Dataset(fnd1) {

    	this.setPrdKorlNm1(fnd1.prdKorlNm);
    	$$("#fnd1-prdKorlNm").text(fnd1.prdKorlNm); //펀드명
    	$$(".fndNm1").text(fnd1.prdKorlNm); //펀드명
    	$$("#fnd1-fndAgrtTxt").html(fnd1.fndAgrtTxt); //상품설명
    	
    	
    	let risk = {};
    	const riskList = this.riskList.value;
    	let riskPgrdTxt = fnd1.riskPgrdTxt;
    	if(riskPgrdTxt.indexOf('(') > -1) riskPgrdTxt = riskPgrdTxt.substring(0,riskPgrdTxt.indexOf('('));
    	
    	for(let i=0;i<riskList.length;i++) {
    		if(riskPgrdTxt === riskList[i].ristGdNm) {
    			risk = riskList[i];
    			break;
    		}
    	}
    	
    	//상단태그
    	$$("#fnd1-risk").append('<div class="tags tags-small '+risk.riskColor+'">'+fnd1.riskPgrdTxt+'</div>')
    	
    	let html = ''
    	if(fnd1.prdIvstRgnNm !== null && fnd1.prdIvstRgnNm !== '' && typeof fnd1.prdIvstRgnNm !== "undefined")
    		html += '<div class="tags tags-small tags-gray">#'+fnd1.prdIvstRgnNm+'</div>';
    		
    	const keywords = fnd1.fndPrdKrdNm.split('#')

    	;
    	$.each(keywords, function(idx, item) {
    		if(item !== '') {
    			html += '<div class="tags tags-small tags-gray">#'+item.trim()+'</div>';
    		}
		});
    	$$("#fnd1-fndPrdKrdNm").html(html); 
    	
    	
		$$("#fnd1-fndBasPr").text(fnd1.fndBasPr.toFixed(2)); //기준가
    	if(Number(fnd1.difAm) > 0) {
    		$$("#fnd1-difAm").html('<span class="rise" aria-label="상승">'+Number(fnd1.difAm).toFixed(2)+'</span>');
    	} else if(fnd1.difAm < 0) {
    		$$("#fnd1-difAm").html('<span class="fall" aria-label="하락">'+Number(fnd1.difAm*-1).toFixed(2)+'</span>');
    	} else {
    		$$("#fnd1-difAm").html('<span class="steady" aria-label="보합">0</span>');
    	}
    	
    	//설정액
    	if(fnd1.fndEstAmCucd === "KRW") {
    		$$("#fnd1-fndEstAm").text(CmmUtils.comma(fnd1.fndEstAm)+"원");
    	} else {
    		$$("#fnd1-fndEstAm").text(fnd1.fndEstAm+" "+fnd1.fndEstAmCucd);
    	}
    	
    	
    	$.each(fnd1.grid8, function(idx, item) {
    		if(item.dis === '선취') {
    			//선취 수수료
    	    	if(item.fndFeeRtAm !== 0) {
    	    		$$("#fnd1-pocpFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		} else if(item.dis === '환매') {
    			if(item.fndFeeRtAm !== 0) {
    	    		$$("#fnd1-rprhFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		}
		});
    	
    	//총 보수
    	if(fnd1.totPfeRt !== 0) {
    		$$("#fnd1-totPfeRt").html("연"+Number(fnd1.totPfeRt)+"%");
    	} else {
    		$$("#fnd1-totPfeRt").html("없음");
    	}
    	
    	
    	let bmmPrftRt = CmmUtils.isNullorEmpty(fnd1.m1PrftRt) ? 0 : fnd1.m1PrftRt;
    	let m3PrftRt = CmmUtils.isNullorEmpty(fnd1.m3PrftRt) ? 0 : fnd1.m3PrftRt;
    	let m6PrftRt = CmmUtils.isNullorEmpty(fnd1.m6PrftRt) ? 0 : fnd1.m6PrftRt;
    	let m12PrftRt = CmmUtils.isNullorEmpty(fnd1.m12PrftRt) ? 0 : fnd1.m12PrftRt;
    	const fndEstDt = fnd1.fndEstDt;
    	
    	$$("#prcBasDt").text(this.formatChange(fnd1.prcBasDt)+' 기준');
    	
    	
    	bmmPrftRt = Number(bmmPrftRt).toFixed(2);
    	if(bmmPrftRt > 0) {
    		$$("#fnd1-bmmPrftRt").addClass("fc-red-500");	
    		bmmPrftRt = "+"+bmmPrftRt
    	} else if(bmmPrftRt < 0) {
    		$$("#fnd1-bmmPrftRt").addClass("fc-blue-500");	
    	}
    	$$("#fnd1-bmmPrftRt").text(bmmPrftRt+"%");
    	
    	m3PrftRt = Number(m3PrftRt).toFixed(2);
    	if(m3PrftRt > 0) {
    		$$("#fnd1-m3PrftRt").addClass("fc-red-500");	
    		m3PrftRt = "+"+m3PrftRt
    	} else if(m3PrftRt < 0) {
    		$$("#fnd1-m3PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd1-m3PrftRt").text(m3PrftRt+"%");
		
		m6PrftRt = Number(m6PrftRt).toFixed(2);
		if(m6PrftRt > 0) {
			m6PrftRt = "+"+m6PrftRt
    		$$("#fnd1-m6PrftRt").addClass("fc-red-500");	
    	} else if(m6PrftRt < 0) {
    		$$("#fnd1-m6PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd1-m6PrftRt").text(m6PrftRt+"%");
		
		m12PrftRt = Number(m12PrftRt).toFixed(2);
		if(m12PrftRt > 0) {
			m12PrftRt = "+"+m12PrftRt
    		$$("#fnd1-m12PrftRt").addClass("fc-red-500");	
    	} else if(m12PrftRt < 0) {
    		$$("#fnd1-m12PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd1-m12PrftRt").text(m12PrftRt+"%");
    	
    	this.setAsetTpClfList1(fnd1.grid1);
    	
    	//종목
    	$.each(fnd1.grid2, function(idx, item) {
    		
    		if(idx > 4) {
    			return;
    		}
			$$("#fnd1-sec-nm"+(idx+1)).text(item.secItmsNm);
			$$("#fnd1-sec-rt"+(idx+1)).text(Number(item.fndAdmtRt).toFixed(2)+"%");
		});
    	
    	//업종
    	$.each(fnd1.grid3, function(idx, item) {
    		if(item !== '') {
    			$$("#fnd1-bzct-nm"+(idx+1)).text(item.fndBzctItmsNm);
    			$$("#fnd1-bzct-rt"+(idx+1)).text(Number(item.sctrWgtRt).toFixed(2)+"%");
    		}
		});
    	
    	//지표정보 - 표준편차
    	let html1 = '';
    	let html2 = '';
    	let html3 = '';
    	let html4 = '';
    	$.each(fnd1.grid5, function(idx, item) {
    		html1 += '<div class="list">';
    		html1 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html1 += '<dd>'+item.stdvNidx+'</dd>';
    		html1 += '</div>';
    		
    		html2 += '<div class="list">';
    		html2 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html2 += '<dd>'+item.shprNidx+'</dd>';
    		html2 += '</div>';
    		
    		html3 += '<div class="list">';
    		html3 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html3 += '<dd>'+item.betaNidx+'</dd>';
    		html3 += '</div>';
    		
    		html4 += '<div class="list">';
    		html4 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html4 += '<dd>'+item.irNidx+'</dd>';
    		html4 += '</div>';
		});
    	$$("#fnd1-stdvNidx").html(html1);
    	$$("#fnd1-shprNidx").html(html2);
    	$$("#fnd1-betaNidx").html(html3);
    	$$("#fnd1-irNidx").html(html4);
    }
    
    fnd2Dataset(fnd2) {

    	this.setPrdKorlNm2(fnd2.prdKorlNm)
    	
    	$$("#fnd2-prdKorlNm").text(fnd2.prdKorlNm); //펀드명
    	$$(".fndNm2").text(fnd2.prdKorlNm); //펀드명
    	$$("#fnd2-fndAgrtTxt").html(fnd2.fndAgrtTxt); //상품설명
		
    	
    	let risk = {};
    	const riskList = this.riskList.value;
    	let riskPgrdTxt = fnd2.riskPgrdTxt;
    	if(riskPgrdTxt.indexOf('(') > -1) riskPgrdTxt = riskPgrdTxt.substring(0,riskPgrdTxt.indexOf('('));
    	
    	for(let i=0;i<riskList.length;i++) {
    		if(riskPgrdTxt === riskList[i].ristGdNm) {
    			risk = riskList[i];
    			break;
    		}
    	}
    	
    	//위험도
    	$$("#fnd2-risk").append('<div class="tags tags-small '+risk.riskColor+'">'+fnd2.riskPgrdTxt+'</div>')
    	

    	if(fnd2.prdIvstRgnNm !== null && fnd2.prdIvstRgnNm !== '' && typeof fnd2.prdIvstRgnNm !== "undefined")
    		$$("#fnd2-fndPrdKrdNm").html('<div class="tags tags-small tags-gray">#'+fnd2.prdIvstRgnNm+'</div>')
    	const keywords = fnd2.fndPrdKrdNm.split('#')

    	let html = '';
    	$.each(keywords, function(idx, item) {
    		if(item !== '') {
    			html += '<div class="tags tags-small tags-gray">#'+item.trim()+'</div>';
    		}
		});
    	$$("#fnd2-fndPrdKrdNm").append(html); //키워드
    	
    	
    	//설정액
    	if(fnd2.fndEstAmCucd === "KRW") {
    		$$("#fnd2-fndEstAm").text(CmmUtils.comma(fnd2.fndEstAm)+"원");
    	} else {
    		$$("#fnd2-fndEstAm").text(fnd2.fndEstAm+" "+fnd2.fndEstAmCucd);
    	}
    	
    	$$("#fnd2-fndBasPr").text(fnd2.fndBasPr.toFixed(2)); //기준가
    	
    	if(Number(fnd2.difAm) > 0) {
    		$$("#fnd2-difAm").html('<span class="rise" aria-label="상승">'+Number(fnd2.difAm).toFixed(2)+'</span>');
    	} else if(fnd2.difAm < 0) {
    		$$("#fnd2-difAm").html('<span class="fall" aria-label="하락">'+Number(fnd2.difAm*-1).toFixed(2)+'</span>');
    	} else {
    		$$("#fnd2-difAm").html('<span class="steady" aria-label="보합">0</span>');
    	}
    	
    	
    	$.each(fnd2.grid8, function(idx, item) {
    		if(item.dis === '선취') {
    			//선취 수수료
    	    	if(item.fndFeeRtAm !== 0) {
    	    		$$("#fnd2-pocpFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		} else if(item.dis === '환매') {
    			if(item.fndFeeRtAm !== 0) {
    	    		$$("#fnd2-rprhFee").html(item.temDisNm +" "+item.dtl_DIS+"의 "+Number(item.fndFeeRtAm)+"%");
    	    	} 
    		}
		});
    	
    	//총 보수
    	if(fnd2.totPfeRt !== 0) {
    		$$("#fnd2-totPfeRt").html("연"+Number(fnd2.totPfeRt)+"%");
    	} else {
    		$$("#fnd2-totPfeRt").html("없음");
    	}
    	
    	let bmmPrftRt = CmmUtils.isNullorEmpty(fnd2.m1PrftRt) ? 0 : fnd2.m1PrftRt;
    	let m3PrftRt = CmmUtils.isNullorEmpty(fnd2.m3PrftRt) ? 0 : fnd2.m3PrftRt;
    	let m6PrftRt = CmmUtils.isNullorEmpty(fnd2.m6PrftRt) ? 0 : fnd2.m6PrftRt;
    	let m12PrftRt = CmmUtils.isNullorEmpty(fnd2.m12PrftRt) ? 0 : fnd2.m12PrftRt;
    	const fndEstDt = fnd2.fndEstDt;
    	
    	bmmPrftRt = Number(bmmPrftRt).toFixed(2);
    	if(bmmPrftRt > 0) {
    		$$("#fnd2-bmmPrftRt").addClass("fc-red-500");	
    		bmmPrftRt = "+"+bmmPrftRt
    	} else if(bmmPrftRt < 0) {
    		$$("#fnd2-bmmPrftRt").addClass("fc-blue-500");	
    	}
    	$$("#fnd2-bmmPrftRt").text(bmmPrftRt+"%");
    	
    	m3PrftRt = Number(m3PrftRt).toFixed(2);
    	if(m3PrftRt > 0) {
    		$$("#fnd2-m3PrftRt").addClass("fc-red-500");	
    		m3PrftRt = "+"+m3PrftRt
    	} else if(m3PrftRt < 0) {
    		$$("#fnd2-m3PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd2-m3PrftRt").text(m3PrftRt+"%");
		
		m6PrftRt = Number(m6PrftRt).toFixed(2);
		if(m6PrftRt > 0) {
			m6PrftRt = "+"+m6PrftRt
    		$$("#fnd2-m6PrftRt").addClass("fc-red-500");	
    	} else if(m6PrftRt < 0) {
    		$$("#fnd2-m6PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd2-m6PrftRt").text(m6PrftRt+"%");
		
		m12PrftRt = Number(m12PrftRt).toFixed(2);
		if(m12PrftRt > 0) {
			m12PrftRt = "+"+m12PrftRt
    		$$("#fnd2-m12PrftRt").addClass("fc-red-500");	
    	} else if(m12PrftRt < 0) {
    		$$("#fnd2-m12PrftRt").addClass("fc-blue-500");	
    	}
		$$("#fnd2-m12PrftRt").text(m12PrftRt+"%");
    	
    	this.setAsetTpClfList2(fnd2.grid1);
    	
    	//종목
    	$.each(fnd2.grid2, function(idx, item) {
    		
    		if(idx > 4) {
    			return;
    		}
			$$("#fnd2-sec-nm"+(idx+1)).text(item.secItmsNm);
			$$("#fnd2-sec-rt"+(idx+1)).text(Number(item.fndAdmtRt).toFixed(2)+"%");
    		
		});
    	
    	//업종
    	$.each(fnd2.grid3, function(idx, item) {
    		if(item !== '') {
    			$$("#fnd2-bzct-nm"+(idx+1)).text(item.fndBzctItmsNm);
    			$$("#fnd2-bzct-rt"+(idx+1)).text(Number(item.sctrWgtRt).toFixed(2)+"%");
    		}
		});
    	
    	//지표정보 - 표준편차
    	let html1 = '';
    	let html2 = '';
    	let html3 = '';
    	let html4 = '';
    	$.each(fnd2.grid5, function(idx, item) {
    		html1 += '<div class="list">';
    		html1 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html1 += '<dd>'+item.stdvNidx+'</dd>';
    		html1 += '</div>';
    		
    		html2 += '<div class="list">';
    		html2 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html2 += '<dd>'+item.shprNidx+'</dd>';
    		html2 += '</div>';
    		
    		html3 += '<div class="list">';
    		html3 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html3 += '<dd>'+item.betaNidx+'</dd>';
    		html3 += '</div>';
    		
    		html4 += '<div class="list">';
    		html4 += '<dt>'+item.ivanlTemCn+'M</dt>';
    		html4 += '<dd>'+item.irNidx+'</dd>';
    		html4 += '</div>';
		});
    	$$("#fnd2-stdvNidx").html(html1);
    	$$("#fnd2-shprNidx").html(html2);
    	$$("#fnd2-betaNidx").html(html3);
    	$$("#fnd2-irNidx").html(html4);
    	
    }
    
    calcDiff (fndEstDt) {

        const stDt = dayjs(fndEstDt);
        const now = dayjs();

        const diffDay = now.diff(stDt, 'day');

        return diffDay >= 30 ? true : false;
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
