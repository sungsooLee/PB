/*************************************************************************
* @ 서비스경로 : CRMPMNG44M
* @ 파일명      : CRMPMNG44M  고객관리 > 기업정보 상세조회 > 재무정보 
* @ 화면ID	  : PBWCL070002
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';


const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class CRMPMNG44M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); // 전달받은
																				// 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 재무정보');
		
		//테이블 스크롤 init
		tableInnerScroll.init();
		
		// step0.기업 프로필
		this.apiEnpIntr();
		
		// step1. 재무상태표 & 손익계산서
		this.apiEnpFsdt();

		// step2. 재무비율
		this.apiEnpFirt();

		// step3. 현금흐름분석
		this.apiEnpCfan();
        
		this.register();
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
		const changeTabCallBack  = (event, element) => {
           router.navigate(element.dataset.link,{bzpeNo:this.bzpeNo.value});
        }
        
        // 동일 name 버튼에 대한 이벤트 처리
        $$( document ).findByName('tab', 'click', changeTabCallBack);

		// 2025-05-08: 이전 탭/다음 탭 기능 추가
		$$("#tab-prev").on("click", () => {
			router.navigate("crmpmng43m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng45m",{bzpeNo:this.bzpeNo.value});
		});
	}

	/**
	 * 기업프로필
	 */
	async apiEnpIntr() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb003",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };
		const result = await ApiUtils.sendPost('/api/crmp/copProfile.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpIntrDataSet(result.data);
		}
		
	}
	
	apiEnpIntrDataSet(data) {
		console.log("기업프로필");
		
		const _data = data || {};
		// title 영역
		$$("#cmm-tit1").html(_data.kedCopNm);
		$$("#cmm-txt2").html("대표자 : "+_data.rppeNm);
	}
	
	/**
	 * 재무상태표 & 손익계산서
	 */
	async apiEnpFsdt() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb014",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/copFnst.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpFsdtDataSet(result.data);
		}
		
	}
	
	apiEnpFsdtDataSet(data) {
		console.log("재무상태표 & 손익계산서");
		
		const _data = data || {};
		
		$$(".fs-acct-dt").text(this.formatChange(_data.cadt));
		$$("#fs-val1").text(CmmUtils.comma((_data.liqAsetAm / 1000).toFixed()));
		$$("#fs-val2").text(CmmUtils.comma((_data.nliqLbltVal / 1000).toFixed()));
		$$("#fs-val3").text(CmmUtils.comma((_data.tsum / 1000).toFixed()));
		$$("#fs-val4").text(CmmUtils.comma((_data.liqLbltVal / 1000).toFixed()));
		$$("#fs-val5").text(CmmUtils.comma((_data.lblt1Am / 1000).toFixed()));
		$$("#fs-val6").text(CmmUtils.comma((_data.lbltTsumVal / 1000).toFixed()));
		$$("#fs-val7").text(CmmUtils.comma((_data.capam / 1000).toFixed()));
		$$("#fs-val8").text(CmmUtils.comma((_data.cptsTsum / 1000).toFixed()));

		$$("#fs-val9").text(CmmUtils.comma((_data.salem / 1000).toFixed()));
		$$("#fs-val10").text(CmmUtils.comma((_data.salTotPftRt / 1000).toFixed()));
		$$("#fs-val11").text(CmmUtils.comma((_data.bzPft / 1000).toFixed()));
		$$("#fs-val12").text(CmmUtils.comma((_data.bbizPrftVal / 1000).toFixed()));
		$$("#fs-val13").text(CmmUtils.comma((_data.bbizCostVal / 1000).toFixed()));
		$$("#fs-val14").text(CmmUtils.comma((_data.cotxCostBfdnCtnBzPftVal / 1000).toFixed()));
		$$("#fs-val15").text(CmmUtils.comma((_data.cotx / 1000).toFixed()));
		$$("#fs-val16").text(CmmUtils.comma((_data.ctmNpft / 1000).toFixed()));
		$$("#fs-val17").text(CmmUtils.comma((_data.pftrAm / 1000).toFixed()));
		$$("#fs-val18").text(CmmUtils.comma((_data.salPcs / 1000).toFixed()));
		$$("#fs-val19").text(CmmUtils.comma((_data.intCost / 1000).toFixed()));
		$$("#fs-val20").text(CmmUtils.comma((_data.crnxDvlpAm / 1000).toFixed()));
    
		$$(".fs1-acct-dt").text(this.formatChange(_data.clsa));
		$$("#fs1-val1").text(CmmUtils.comma((_data.liqAsetAmVal / 1000).toFixed()));
		$$("#fs1-val2").text(CmmUtils.comma((_data.nliqAsetAmVal / 1000).toFixed()));
		$$("#fs1-val3").text(CmmUtils.comma((_data.asetTsumVal / 1000).toFixed()));
		$$("#fs1-val4").text(CmmUtils.comma((_data.liqLbltAm / 1000).toFixed()));
		$$("#fs1-val5").text(CmmUtils.comma((_data.nliqBrwLbltVal / 1000).toFixed()));
		$$("#fs1-val6").text(CmmUtils.comma((_data.lblt2Am / 1000).toFixed()));
		$$("#fs1-val7").text(CmmUtils.comma((_data.capamAm / 1000).toFixed()));
		$$("#fs1-val8").text(CmmUtils.comma((_data.cptsTsumVal / 1000).toFixed()));
  
		$$("#fs1-val9").text(CmmUtils.comma((_data.sal1Am / 1000).toFixed()));
		$$("#fs1-val10").text(CmmUtils.comma((_data.salTotTaxm / 1000).toFixed()));
		$$("#fs1-val11").text(CmmUtils.comma((_data.bzPftRstv / 1000).toFixed()));
		$$("#fs1-val12").text(CmmUtils.comma((_data.prftVal / 1000).toFixed()));
		$$("#fs1-val13").text(CmmUtils.comma((_data.bbizCostAm / 1000).toFixed()));
		$$("#fs1-val14").text(CmmUtils.comma((_data.bfdnPlAm / 1000).toFixed()));
		$$("#fs1-val15").text(CmmUtils.comma((_data.cotxAm / 1000).toFixed()));
		$$("#fs1-val16").text(CmmUtils.comma((_data.ctmNpftRstv / 1000).toFixed()));
		$$("#fs1-val17").text(CmmUtils.comma((_data.pftrAmVal / 1000).toFixed()));
		$$("#fs1-val18").text(CmmUtils.comma((_data.salPcsVal / 1000).toFixed()));
		$$("#fs1-val19").text(CmmUtils.comma((_data.intCostVal / 1000).toFixed()));
		$$("#fs1-val20").text(CmmUtils.comma((_data.opftAm / 1000).toFixed()));

		$$(".fs2-acct-dt").text(this.formatChange(_data.clsaDt));
		$$("#fs2-val1").text(CmmUtils.comma((_data.liqAsevlTtam / 1000).toFixed()));
		$$("#fs2-val2").text(CmmUtils.comma((_data.altrFnas / 1000).toFixed()));
		$$("#fs2-val3").text(CmmUtils.comma((_data.asetTsumAm / 1000).toFixed()));
		$$("#fs2-val4").text(CmmUtils.comma((_data.liqLbltRtVal / 1000).toFixed()));
		$$("#fs2-val5").text(CmmUtils.comma((_data.lblt3Am / 1000).toFixed()));
		$$("#fs2-val6").text(CmmUtils.comma((_data.lbltTsumAm / 1000).toFixed()));
		$$("#fs2-val7").text(CmmUtils.comma((_data.cptsAm / 1000).toFixed()));
		$$("#fs2-val8").text(CmmUtils.comma((_data.cptsTsumAm / 1000).toFixed()));
  
		$$("#fs2-val9").text(CmmUtils.comma((_data.salemRstv / 1000).toFixed()));
		$$("#fs2-val10").text(CmmUtils.comma((_data.salTotPftAmVal / 1000).toFixed()));
		$$("#fs2-val11").text(CmmUtils.comma((_data.bzPftAm / 1000).toFixed()));
		$$("#fs2-val12").text(CmmUtils.comma((_data.prftAm / 1000).toFixed()));
		$$("#fs2-val13").text(CmmUtils.comma((_data.bbizPrftCost / 1000).toFixed()));
		$$("#fs2-val14").text(CmmUtils.comma((_data.bfdnAm / 1000).toFixed()));
		$$("#fs2-val15").text(CmmUtils.comma((_data.cotxRt / 1000).toFixed()));
		$$("#fs2-val16").text(CmmUtils.comma((_data.ctmNpftAmVal / 1000).toFixed()));
		$$("#fs2-val17").text(CmmUtils.comma((_data.pftrAmCtmNpftVal / 1000).toFixed()));
		$$("#fs2-val18").text(CmmUtils.comma((_data.salPcsSumVal / 1000).toFixed()));
		$$("#fs2-val19").text(CmmUtils.comma((_data.intCostAm / 1000).toFixed()));
		$$("#fs2-val20").text(CmmUtils.comma((_data.crnxDvlp2Am / 1000).toFixed()));
	}
	
	/**
	 * 요약 재무비율
	 */
	async apiEnpFirt() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb015",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/copFnafRt.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpFirtDataSet(result.data);
		}
		
	}
	
	apiEnpFirtDataSet(data) {
		console.log("요약 재무비율");
		
		const _data = data || {};
		
		$$(".fr-acct-dt").text(this.formatChange(_data.cadt));
		$$("#fr-val1").text(_data.totAsetIncRt);
		$$("#fr-val2").text(_data.salemIncRt);
		$$("#fr-val3").text(this.removePlus(_data.incRt));
		$$("#fr-val4").text(_data.coBzPftRt);
		$$("#fr-val5").text(_data.ntfnPftRt);
		$$("#fr-val6").text(_data.prftRt1Val);
		$$("#fr-val7").text(this.removePlus(_data.lbltRt));
		$$("#fr-val8").text(CmmUtils.comma(_data.intRwrdCfcn));
		$$("#fr-val9").text(_data.brwmDpinRt);
		$$("#fr-val10").text(_data.arcvRotRt);
		$$("#fr-val11").text(_data.invasRotrVal);
		$$("#fr-val12").text(_data.totCptsRotrVal);
		$$("#fr-val13").text(_data.ntfnRt);
		$$("#fr-val14").text(_data.ctmNpft);
		$$("#fr-val15").text(_data.liqRt);
		$$("#fr-val16").text(_data.adiWrhRt);

		$$(".fr1-acct-dt").text(this.formatChange(_data.clsaDtm));
		$$("#fr1-val1").text(_data.totAsetIncRtVal);
		$$("#fr1-val2").text(_data.salemIncRtVal);
		$$("#fr1-val3").text(this.removePlus(_data.npftAm));
		$$("#fr1-val4").text(_data.bzPftRstv);
		$$("#fr1-val5").text(_data.ntfnRstv);
		$$("#fr1-val6").text(_data.prftRt2Val);
		$$("#fr1-val7").text(this.removePlus(_data.lbltRtVal));
		$$("#fr1-val8").text(CmmUtils.comma(_data.intRwrdCfcnRt));
		$$("#fr1-val9").text(_data.brwmDpinVal);
		$$("#fr1-val10").text(_data.arcvRotrVal);
		$$("#fr1-val11").text(_data.invtAsetCfRt);
		$$("#fr1-val12").text(_data.totAsetCmpDifRtVal);
		$$("#fr1-val13").text(_data.ntfn);
		$$("#fr1-val14").text(_data.ctmNpftAm);
		$$("#fr1-val15").text(_data.ctmLiqRt);
		$$("#fr1-val16").text(_data.vatWrhTaxAm);

		$$(".fr2-acct-dt").text(this.formatChange(_data.clsaDt));
		$$("#fr2-val1").text(_data.totAsetAm);
		$$("#fr2-val2").text(_data.salemIncRtSts);
		$$("#fr2-val3").text(this.removePlus(_data.prIncRt));
		$$("#fr2-val4").text(_data.bzPftRwrdRt);
		$$("#fr2-val5").text(_data.ntfnCfRt);
		$$("#fr2-val6").text(_data.prftRt3Val);
		$$("#fr2-val7").text(this.removePlus(_data.lbltRtCmtv));
		$$("#fr2-val8").text(CmmUtils.comma(_data.intRwrdRt));
		$$("#fr2-val9").text(_data.brwmDpinRtYn);
		$$("#fr2-val10").text(_data.arcvRotTemNmrtCn);
		$$("#fr2-val11").text(_data.invtAsetRotDcnt);
		$$("#fr2-val12").text(_data.totCptsRotTemMcn);
		$$("#fr2-val13").text(_data.ntfnRtRst);
		$$("#fr2-val14").text(_data.ctmNpftRstv);
		$$("#fr2-val15").text(_data.liqRtSts);
		$$("#fr2-val16").text(_data.bzctBytpAdiWrhRt);
	}
	
	/**
	 * 현금흐름분석
	 */
	async apiEnpCfan() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb016",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/cashFlowAnls.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpCfanDataSet(result.data);
		}
		
	}
	
	apiEnpCfanDataSet(data) {
		console.log("현금흐름분석");
		
		const _data = data || {};
		
		$$("#cf-acct-dt").text(this.formatChange(_data.cadt));
		$$("#cf-anal1").text(CmmUtils.comma((_data.cashBzPftVal / 1000).toFixed()));
		$$("#cf-anal2").text(CmmUtils.comma((_data.opftCfRt / 1000).toFixed()));
		$$("#cf-anal3").text(CmmUtils.comma((_data.ivstAcvtCsflAm / 1000).toFixed()));
		$$("#cf-anal4").text(_data.csflGdGdDes);

		$$("#cf1-acct-dt").text(this.formatChange(_data.clsaDt));
		$$("#cf1-anal1").text(CmmUtils.comma((_data.bzPft / 1000).toFixed()));
		$$("#cf1-anal2").text(CmmUtils.comma((_data.opftAm / 1000).toFixed()));
		$$("#cf1-anal3").text(CmmUtils.comma((_data.ivstCashAm / 1000).toFixed()));
		$$("#cf1-anal4").text(_data.rvlvCashGd);

		$$("#cf2-acct-dt").text(this.formatChange(_data.cadtBspr));
		$$("#cf2-anal1").text(CmmUtils.comma((_data.bzPftAm / 1000).toFixed()));
		$$("#cf2-anal2").text(CmmUtils.comma((_data.crnxDvlpAm / 1000).toFixed()));
		$$("#cf2-anal3").text(CmmUtils.comma((_data.ivstAcvtCashInfwAmVal / 1000).toFixed()));
		$$("#cf2-anal4").text(_data.bzAfactCsfl);
	}
	
	formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
	
    undefinedValue(txt) {
		return typeof txt === "undefined" ? "" : txt;
	}
    
    removePlus (val){
    	val = this.undefinedValue(val);
    	if(val != "") {
    		return val.replace(/\+/g, "");
    	} 
		return val;
	}
    
	destroy() {
		super.destroy(this);
	}
	
	
}

