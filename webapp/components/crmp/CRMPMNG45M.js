/*************************************************************************
* @ 서비스경로 : CRMPMNG45M
* @ 파일명      : CRMPMNG45M  고객관리 > 기업정보 상세조회 > 종합의견
* @ 화면ID	  : PBWCL070003
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

export default class CRMPMNG45M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 종합의견');
		

		//기업 프로필
		this.apiEnpIntr();
		
		//종합의견(기업체개요,경영진,영업상황)
        this.apiEnpOpnn();
        
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
			router.navigate("crmpmng44m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng46m",{bzpeNo:this.bzpeNo.value});
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
     * 종합의견
     */
	async apiEnpOpnn() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb017",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/snthOpi.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpOpnnDataSet(result.data);
		}
		
	}
	
	apiEnpOpnnDataSet(data) {
		console.log("종합의견");
		
		const _data = data || {};
		
		//기업체개요
		if(typeof _data.comSmor != "undefined" && _data.comSmor != "") {
			$$("#opnn-enp").html(_data.comSmor);
		} else {
			$("#box1-no-search").show();
		}
		
		//경영진
		if(typeof _data.brdrSmrRptdTxt != "undefined" && _data.brdrSmrRptdTxt != "") {
			$$("#opnn-reper").html(_data.brdrSmrRptdTxt);
		} else {
			$("#box2-no-search").show();
		}
		
		//영업상황
		if(typeof _data.bzPtsCrorOpiTxt != "undefined" && _data.bzPtsCrorOpiTxt != "") {
			$$("#opnn-sales").html(_data.bzPtsCrorOpiTxt);
		} else {
			$("#box3-no-search").show();
		}
	}
	
	
    
	destroy() {
		super.destroy(this);
	}
	
	
}

