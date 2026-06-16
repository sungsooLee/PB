/*************************************************************************
* @ 서비스경로 : CRMPMNG42M
* @ 파일명      : CRMPMNG42M 고객관리 > 기업정보 상세조회 > 기업일반
* @ 화면ID	  : PBWCL070000
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

export default class CRMPMNG42M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
    	
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 기업일반');
		
        // step1. 기업 프로필
		this.apiEnpIntr();

		// step2. 주요 주주
		this.apiEnpSthr();

		// step3. 종업원 현황
		this.apiEnpEmst();

		// step4. 관계회사
		this.apiEnpRenp();

		// step5. 주요 구매처
		this.apiEnpCust();

		// step6. 주요 판매처
		this.apiEnpSupp();
		
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
			router.navigate("crmpmng49m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng43m",{bzpeNo:this.bzpeNo.value});
		});
        
        const reperNmPopup = async () => {
        	var param = {
                userId: "woorbkonl",
                prcDis: "s",
                psnInfInq: "N",
                tlmCd: "wrb004",
                datPrts: "JSON",
                bzpeNo: this.bzpeNo.value,
            };
        	
        	await GlobalApp.popupUtils.openPopup('crmpmng42p', {
                showCloseBtn : true,
				type:'slideLeft',
                params : param,
            });
		}
		const reperNm = $$("#reper-nm"); //대표자명 
		
		this.registerCallback("click", reperNm, reperNmPopup); 
        
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
		if(result.resultCode === '000000') {
			this.apiEnpIntrDataSet(result.data);
		}
		
	}
	
	apiEnpIntrDataSet(data) {
		console.log("기업프로필");
		
		/*
		 * 최근검색어 저장
		 */
    	const res = CmmUtils.getLocalStorageData(this.empNo+"_crmpmngm");
    	if(res.data != null) {
    		
    		/**
    		 * 중복 데이터 있는 경우에는 저장X
    		 * 저장하기 전 이미 10개 검색어가 있으면 마지막 검색어 지우고 
    		 * 배열 처음에 저장
    		 */
    		const searchTxtArr = res.data;
    		const dupliChk = searchTxtArr.findIndex((item) => item.bizNo === data.bzno);
	    	if(dupliChk < 0) {
	    		
	    		if((data.kedCopNm !== '' && data.kedCopNm !== null)
	    				&& (data.bzno !== '' && data.bzno !== null)) {
		    		if(searchTxtArr.length > 9) {
			    		searchTxtArr.pop();
			    	} 
		    		
		    		const hist = {
						bizNo : data.bzno
						, copNm : data.kedCopNm
					}
					searchTxtArr.unshift(hist);
			    	
			    	CmmUtils.setLocalStorageData(this.empNo+"_crmpmngm", searchTxtArr);
	    		}
	    	}
    	} else {
    		if((data.kedCopNm !== '' && data.kedCopNm !== null)
    				&& (data.bzno !== '' && data.bzno !== null)) {
	    		const hist = {
					bizNo : data.bzno
					, copNm : data.kedCopNm
				}
				const searchTxtArr = [];
	    		searchTxtArr.unshift(hist);
		    	
		    	CmmUtils.setLocalStorageData(this.empNo+"_crmpmngm", searchTxtArr);
    		}
    	}
    	
    	
		// title 영역
		$$("#cmm-tit1").html(data.kedCopNm);
		$$("#cmm-txt2").html("대표자 : "+data.rppeNm);
       
		$$("#enp-nm-trd").text(data.kedCopNm);
		$$("#enp-nm-eng").text(data.copEngNm);
		$$("#cono-pid").text(this.bizRegNoFormatter(data.corpRrno));
		$$("#bzno").text(this.bizNoFormatter(data.bzno));
		// 대표자
		$$("#reper-nm").text(data.rppeNm);
		$$("#estb-dt").text(this.formatChange(data.estbDt));

		$$("#enp-sze").text( data.cmszCd); // 기업규모
		$$("#enp-fcd").text(data.copSpcd); // 기업형태
		$$("#ipo-cd").text(data.cmopYn);   // 기업공개	
		
		$$("#lstn-dt").text(this.formatChange(data.lstnDt));
		$$("#acct-eddt").text(data.kedClsaBasMmdd.substr(0,2) + "월");
		$$("#grp-nm").text(this.formatChange(data.grpNm));
		$$("#bzc").text("(" + data.bzctCd + ") " + data.kedBzctNm);
		$$("#mpd").text(data.mainPrdtItemNm);
		$$("#loc-addra").text(data.adr + " " + data.dtad);
		$$("#tel-no").text(this.replace(data.telNo, " ", "-"));
		$$("#fax-no").text(this.replace(data.faxNo, " ", "-"));
		$$("#hpage-url").text(data.hpageUrl);
		$$("#email").text(data.rprsEmail);
		$$("#pubi-fcd").text(data.istDscd); // 정부 및 공공기관 구분

		$$("#mtx-bnk-nm").text(data.mtrLonIstNm);
	}
	
	/**
     * 주요 주주
     */
	async apiEnpSthr() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb005",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };
		const result = await ApiUtils.sendPost('/api/crmp/majShrhPts.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpSthrDataSet(result.data);
		}
		
	}
	
	apiEnpSthrDataSet(data) {
		console.log("주요 주주 현황");
		
		const _data = data || {};

		$$("#sthr-nm1").text(_data.majShrh);
		$$("#sthr-eqrt1").text(_data.sreRt);
		$$("#sthr-nm2").text(_data.majShrhTxt);
		$$("#sthr-eqrt2").text(_data.kedStcSreRt);
		$$("#sthr-nm3").text(_data.shrh2KorlNm);
		$$("#sthr-eqrt3").text(_data.majShrhSreRt);

		if(_data.majShrh === "") {
			$$("#sthr-no-data").css({'display':'table-row'});
			$$("#sthr1").hide();
		} 
		
		if(_data.majShrhTxt === "") {
			$$("#sthr2").hide();
		} 
		if(_data.shrh2KorlNm === "") {
			$$("#sthr3").hide();
		} 
	}
	
	/**
     *  종업원 현황
     */
	async apiEnpEmst() {
		
		const param = {
			userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb006",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };

		const result = await ApiUtils.sendPost('/api/crmp/empdPts.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpEmstDataSet(result.data);
		}
		
	}
	
	apiEnpEmstDataSet(data) {
		console.log("종업원 현황");
		
		const _data = data || {};
		$$("#emst-count").text(CmmUtils.comma(_data.atatWpeCn));
	}
	
	/**
     *  관계회사
     */
	async apiEnpRenp() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb007",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };

		const result = await ApiUtils.sendPost('/api/crmp/relCo.json', param);
		
		//데이터세팅
		if(result.resultCode == '000000') {
			this.apiEnpRenpDataSet(result.data);
		}
		
	}
	
	apiEnpRenpDataSet(data) {

		console.log("관계회사");
		
		const _data = data || {};
//      console.log("apiEnpRenp", _data);
		$$("#renp-nm1").text(_data.rlp1Com);
		$$("#renp-eqrt1").text(_data.kor1TtmInvsRt);
		$$("#renp-nm2").text(_data.rlp2Com);
		$$("#renp-eqrt2").text(_data.kor2TtmInvsRt);
		$$("#renp-nm3").text(_data.rlp3Com);
		$$("#renp-eqrt3").text(_data.kor3TtmInvsRt);

		if(_data.rlp1Com === "") {
			$$("#renp-no-data").css({'display':'table-row'});
			$$("#renp1").hide();
		} 
		
		if(_data.rlp2Com === "") {
			$$("#renp2").hide();
		}
		
		if(_data.rlp3Com === "") {
			$$("#renp3").hide();
		} 
	}
	
	
	/**
     *  주요 구매처
     */
	async apiEnpCust() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb008",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };

		const result = await ApiUtils.sendPost('/api/crmp/majPrhsl.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpCustDataSet(result.data);
		}
		
	}
	
	apiEnpCustDataSet(data) {
		
		console.log("주요구매처");
		
		const _data = data || {};
		$$("#cust-nm1").text(_data.prhslNm);
		$$("#cust-rt1").text(_data.trn01Scnt);
		if(_data.prhslCmcmNm !== '') {
			$$("#cust-nm2").text(_data.prhslCmcmNm);
			$$("#cust-rt2").text(_data.trn02Scnt);
		}
		
		if(_data.prhslCoNm !== '') {
			$$("#cust-nm3").text(_data.prhslCoNm);
			$$("#cust-rt3").text(_data.trn03Scnt);
		}

		if(_data.prhslNm === "") {
			$$("#cust-no-data").css({'display':'table-row'});
			$$("#cust1").hide();
		} 
		
		if(_data.prhslCmcmNm === "") {
			$$("#cust2").hide();
		}
		
		if(_data.prhslCoNm === "") {
			$$("#cust3").hide();
		} 
		
	}
	
	/**
     *  주요 판매처
     */
	async apiEnpSupp() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb009",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value,
        };

		const result = await ApiUtils.sendPost('/api/crmp/majSlel.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpSuppDataSet(result.data);
		}
		
	}
	
	apiEnpSuppDataSet(data) {
		
		console.log("주요판매처");
		
		const _data = data || {};
		$$("#supp-nm1").text(_data.slelNm);
		$$("#supp-rt1").text(_data.trn01Scnt);
		$$("#supp-nm2").text(_data.slelMajMgdNm);
		$$("#supp-rt2").text(_data.trn02Scnt);
		$$("#supp-nm3").text(_data.slelNlNm);
		$$("#supp-rt3").text(_data.trn02Scnt);

		if(_data.slelNm === "") {
			$$("#supp-no-data").css({'display':'table-row'});
			$$("#supp1").hide();
		} 
		
		if(_data.slelMajMgdNm === "") {
			$$("#supp2").hide();
		} 
		
		if(_data.slelNlNm === "") {
			$$("#supp3").hide();
		} 
	}
	
    formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
    
    undefinedValue(txt) {
		return typeof txt == "undefined" ? "" : txt;
	}
   
    /**
     * 사업자번호 포맷 변환
     * @param [String] : 1234567890 문자열
     * @return  [String] : 123-45-67890 문자열
     */
    bizNoFormatter(num){
		return this.undefinedValue(num) === "" ? "-" : num.replace(/(\d{3})(\d{2})(\d{5})/,'$1-$2-$3');
	}
    
    /**
     * 법인번호 포맷 변환
     * @param [String] : 1234567890123 문자열
     * @return  [String] : 123456-7890123 문자열
     */
	bizRegNoFormatter(num){
		return this.undefinedValue(num) === "" ? "-" : num.replace(/(\d{6})(\d{7})/,'$1-$2');
	}
    
	 /**
     * 전화번호포맷
     * @param [String] : 01012344566 문자열
     * @return  [String] : 010-1234-4566 문자열
     */
    replace(txt, s1, s2){
    	return txt.replace(/[^0-9]/g,'').replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,'$1-$2-$3');
	}
    
	destroy() {
		super.destroy(this);
	}
	
	
}

