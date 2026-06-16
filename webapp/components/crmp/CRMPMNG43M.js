/*************************************************************************
* @ 서비스경로 : CRMPMNG43M
* @ 파일명      : CRMPMNG43M 고객관리 > 기업정보 상세조회 > 기업신용
* @ 화면ID	  : PBWCL070001
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

export default class CRMPMNG43M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 기업신용');
		
		//테이블 스크롤 init
		tableInnerScroll.init();
		
		// step0. 기업 프로필
		this.apiEnpIntr();

		// step1. 기업등급
		this.apiEnpGrad();

		// step2. 기업등급 이력
		this.apiEnpGradHist();

		// step3. 기타 신용정보
		this.apiEnpKbad();

		// step4. 휴폐업정보
		this.apiEnpLqdt();

        
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
			router.navigate("crmpmng42m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng44m",{bzpeNo:this.bzpeNo.value});
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
		$$("#cmm-txt2").html("대표자 : " +_data.rppeNm);
	}
	
	/**
     * 기업 등급
     */
	async apiEnpGrad() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb010",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/copGd.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpGradDataSet(result.data);
		}
		
	}
	
	apiEnpGradDataSet(data) {
		console.log("기업 등급");
		
		const _data = data || {};
//      console.log("apiEnpGrad", _data);

		// class 초기화
		const cls = ["d", "c", "cc", "ccc", "b", "bb", "bbb", "a", "aa", "aaa"];
		$.each(cls, function(i, item){
			$$("#cr-grd-nm").removeClass("rate-"+item.toUpperCase());
		});
		// class 추가
		if(_data.crgdNm !== '') {
			const crGrdNm = _data.crgdNm.toUpperCase();
			let crGrdCd = crGrdNm.replaceAll("+" , "").replaceAll("-", "");
			crGrdCd = crGrdCd.toLowerCase();
			if(crGrdCd !== '') {
				$$("#cr-grd-cr").addClass("rate-"+crGrdCd.toUpperCase());
			}
			$$("#cr-grd-nm").text(crGrdNm);
		}
		$$("#evl-dt").text(this.formatChange(_data.crevDt));
		$$("#sttl-base-dd").text(this.formatChange(_data.clsaBsdt));
		$$("#grd-cls-nm").text(_data.crgdDscd)
	}
	
	/**
     *  기업 등급 이력
     */
	async apiEnpGradHist() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb011",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };

		const result = await ApiUtils.sendPost('/api/crmp/copGdHst.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpGradHistDataSet(result.data);
		}
		
	}
	
	apiEnpGradHistDataSet(data) {
		console.log("기업 등급 이력");
		const _this = this;
		
		const _data = data || {};
		let html = "";
        if(typeof _data.listDis != "undefined") {
			if(_data.listDis.length > 0) {

				$.each(_data.listDis, function(i, item){
					html +=
						'<tr>' +
						'	<td>' + item.crgdNm.toUpperCase() + '</td>' +
						'	<td>' + _this.formatChange(item.crevDt) + '</td>' +
						'	<td>' + _this.formatChange(item.clsaBsdt) + '</td>' +
						'	<td class="grd-cls' + i + '">'+item.crgdDscd+'</td>' +
						'</tr>';
				});

			} else {
				html += '<tr><td colspan="4">';
				html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
				html += '</td></tr>';
			}
		} else {
			html += '<tr><td colspan="4">';
			html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
			html += '</td></tr>';
		}
        
        $$("#gradHist").html(html);
		
	}
	
	/**
     *  기타 신용 정보
     */
	async apiEnpKbad() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb012",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };

		const result = await ApiUtils.sendPost('/api/crmp/copFpof.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpKbadDataSet(result.data);
		}
		
	}
	
	apiEnpKbadDataSet(data) {

		console.log("기타 신용 정보");
		
		const _data = data || {};
		$$("#kfb-bad-cnt").text(CmmUtils.comma(_data.niceFpofCnt));
		$$("#kfb-fin-tx-cnt").text(CmmUtils.comma(_data.fpofInfTotAm));
		$$("#workout-cnt").text(CmmUtils.comma(_data.dfrAm));
		$$("#dshovd-cnt").text(CmmUtils.comma(_data.cnt));
	}
	
	
	/**
     *  휴폐업정보
     */
	async apiEnpLqdt() {
		
		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb013",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };;

		const result = await ApiUtils.sendPost('/api/crmp/getStbz.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpLqdtDataSet(result.data);
		}
		
	}
	
	apiEnpLqdtDataSet(data) {
		
		console.log("휴폐업정보");
		
		const _data = data || {};
		$$("#base-dt").text(this.formatChange(_data.basDt));
		$$("#lqdt-dt").text(this.formatChange(_data.stbzDt));
		$$("#lqdt-cls").text(_data.stbzDscd);
	}
	
    
    formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
    
    replace(txt, s1, s2){
		return txt === "" ? "-" : txt.replaceAll(s1, s2);
	}
    
	destroy() {
		super.destroy(this);
	}
	
	
}

