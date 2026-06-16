/*************************************************************************
* @ 서비스경로 : CRMPMNG48M
* @ 파일명      : CRMPMNG48M  고객관리 > 기업정보 상세조회 > 거래처현황
* @ 화면ID	  : PBWCL070006
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

export default class CRMPMNG48M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 거래처현황');
		

		//기업 프로필
		this.apiEnpIntr();
		
		 // 구매처
		this.apiEnpCust();
        
		// 판매처
		this.apiEnpSupp();
        
		this.register();
		
		//끝쪽에 있는 탭 클릭 시 탭 슬라이드 자동이동
		tabContent.afterLoadTab();
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
			router.navigate("crmpmng47m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng49m",{bzpeNo:this.bzpeNo.value});
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
		
		//데이터세팅
		if(result.resultCode == '000000') {
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
     * 구매처
     */
	async apiEnpCust() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb020",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/majPrhslDtl.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpCustDataSet(result.data);
		}
		
	}
	
	apiEnpCustDataSet(data) {
		console.log("구매처");
		
		const _data = data || {};
		
		$$(".caption-visible .mt24").text("기준일자 : " + this.formatChange(_data.infBasDt));
		$$("#cust-nm1").text(_data.prhslNm);
		$$("#cust-rt1").text(_data.trn01Scnt);
		$$("#cust-nm2").text(_data.prhslCmcmNm);
		$$("#cust-rt2").text(_data.trn02Scnt);
		$$("#cust-nm3").text(_data.prhslCoNm);
		$$("#cust-rt3").text(_data.trn03Scnt);
		$$("#cust-nm4").text(_data.purcoNm);
		$$("#cust-rt4").text(_data.trn4Scnt);
		$$("#cust-nm5").text(_data.purcoCorpNm);
		$$("#cust-rt5").text(_data.trn05Scnt);
		$$("#cust-nm6").text(_data.purcoTrnBr);
		$$("#cust-rt6").text(_data.trn06Scnt);
		$$("#cust-nm7").text(_data.purcoChrgDept);
		$$("#cust-rt7").text(_data.trn7Scnt);
		$$("#cust-nm8").text(_data.purcoChrgDeptNm);
		$$("#cust-rt8").text(_data.trn8Scnt);
		$$("#cust-nm9").text(_data.purcoRppe);
		$$("#cust-rt9").text(_data.trn10Scnt);
		$$("#cust-nm10").text(_data.purcoCorpPsnDisNm);
		$$("#cust-rt10").text(_data.trn11Scnt);

		if(_data.prhslNm === "") {
			$$("#cust-no-data").css({'display':'table-row'});
			$("tbody td#cust-nm1").closest("tr").hide();
		} else {
			$$("#cust-no-data").hide();
			$("tbody td#cust-nm1").closest("tr").show();
		}
		if(_data.prhslCmcmNm === "") {
			$("tbody td#cust-nm2").closest("tr").hide();
		} else {
			$("tbody td#cust-nm2").closest("tr").show();
		}
		if(_data.prhslCoNm === "") {
			$("tbody td#cust-nm3").closest("tr").hide();
		} else {
			$("tbody td#cust-nm3").closest("tr").show();
		}
		if(_data.purcoNm === "") {
			$("tbody td#cust-nm4").closest("tr").hide();
		} else {
			$("tbody td#cust-nm4").closest("tr").show();
		}
		if(_data.purcoCorpNm === "") {
			$("tbody td#cust-nm5").closest("tr").hide();
		} else {
			$("tbody td#cust-nm5").closest("tr").show();
		}
		if(_data.purcoTrnBr === "") {
			$("tbody td#cust-nm6").closest("tr").hide();
		} else {
			$("tbody td#cust-nm6").closest("tr").show();
		}
		if(_data.purcoChrgDept === "") {
			$("tbody td#cust-nm7").closest("tr").hide();
		} else {
			$("tbody td#cust-nm7").closest("tr").show();
		}
		if(_data.purcoChrgDeptNm === "") {
			$("tbody td#cust-nm8").closest("tr").hide();
		} else {
			$("tbody td#cust-nm8").closest("tr").show();
		}
		if(_data.purcoRppe === "") {
			$("tbody td#cust-nm9").closest("tr").hide();
		} else {
			$("tbody td#cust-nm9").closest("tr").show();
		}
		if(_data.purcoCorpPsnDisNm === "") {
			$("tbody td#cust-nm10").closest("tr").hide();
		} else {
			$("tbody td#cust-nm10").closest("tr").show();
		}
	}
	
	/**
     * 판매처
     */
	async apiEnpSupp() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb021",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/majSlelDtl.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpSuppDataSet(result.data);
		}
		
	}
	
	apiEnpSuppDataSet(data) {
		console.log("판매처");
		
		const _data = data || {};
		
		$$(".caption-visible .mt24").text("기준일자 : " + this.formatChange(_data.infBasDt));
		$$("#supp-nm1").text(_data.slelNm);
		$$("#supp-rt1").text(_data.trn01Scnt);
		$$("#supp-nm2").text(_data.slelMajMgdNm);
		$$("#supp-rt2").text(_data.trn02Scnt);
		$$("#supp-nm3").text(_data.slelNlNm);
		$$("#supp-rt3").text(_data.trn03Scnt);
		$$("#supp-nm4").text(_data.slelCmcmNm);
		$$("#supp-rt4").text(_data.trn4Scnt);
		$$("#supp-nm5").text(_data.selTrpeTxt);
		$$("#supp-rt5").text(_data.trn05Scnt);
		$$("#supp-nm6").text(_data.selAvlNprDisNm);
		$$("#supp-rt6").text(_data.trn06Scnt);
		$$("#supp-nm7").text(_data.selDisNm);
		$$("#supp-rt7").text(_data.trn7Scnt);
		$$("#supp-nm8").text(_data.selAvlNprDis);
		$$("#supp-rt8").text(_data.trn8Scnt);
		$$("#supp-nm9").text(_data.selDscd);
		$$("#supp-rt9").text(_data.trn10Scnt);
		$$("#supp-nm10").text(_data.selTrpeInfTxt);
		$$("#supp-rt10").text(_data.trn11Scnt);

		if(_data.slelNm === "") {
			$$("#supp-no-data").css({'display':'table-row'});
			$("tbody td#supp-nm1").closest("tr").hide();
		} else {
			$("tbody.supp tr.no-data").hide();
			$("tbody td#supp-nm1").closest("tr").show();
		}
		if(_data.slelMajMgdNm === "") {
			$("tbody td#supp-nm2").closest("tr").hide();
		} else {
			$("tbody td#supp-nm2").closest("tr").show();
		}
		if(_data.slelNlNm === "") {
			$("tbody td#supp-nm3").closest("tr").hide();
		} else {
			$("tbody td#supp-nm3").closest("tr").show();
		}
		if(_data.slelCmcmNm === "") {
			$("tbody td#supp-nm4").closest("tr").hide();
		} else {
			$("tbody td#supp-nm4").closest("tr").show();
		}
		if(_data.selTrpeTxt === "") {
			$("tbody td#supp-nm5").closest("tr").hide();
		} else {
			$("tbody td#supp-nm5").closest("tr").show();
		}
		if(_data.selAvlNprDisNm === "") {
			$("tbody td#supp-nm6").closest("tr").hide();
		} else {
			$("tbody td#supp-nm6").closest("tr").show();
		}
		if(_data.selDisNm === "") {
			$("tbody td#supp-nm7").closest("tr").hide();
		} else {
			$("tbody td#supp-nm7").closest("tr").show();
		}
		if(_data.selAvlNprDis === "") {
			$("tbody td#supp-nm8").closest("tr").hide();
		} else {
			$("tbody td#supp-nm8").closest("tr").show();
		}
		if(_data.selDscd === "") {
			$("tbody td#supp-nm9").closest("tr").hide();
		} else {
			$("tbody td#supp-nm9").closest("tr").show();
		}
		if(_data.selTrpeInfTxt === "") {
			$("tbody td#supp-nm10").closest("tr").hide();
		} else {
			$("tbody td#supp-nm10").closest("tr").show();
		}
	}

	formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
    
	destroy() {
		super.destroy(this);
	}
	
	
}

