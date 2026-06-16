/*************************************************************************
* @ 서비스경로 : CRMPMNG49M
* @ 파일명      : CRMPMNG49M  고객관리 > 기업정보 상세조회 > 주요주주현황
* @ 화면ID	  : PBWCL070007
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

export default class CRMPMNG49M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 주요주주현황');

		//테이블 스크롤 init
		tableInnerScroll.init();
		
		//기업 프로필
		this.apiEnpIntr();
		// step1. 주요주주현황
		this.apiEnpSthr();

		// step2. 주식발행현황
		this.apiEnpCapt();
        
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
			router.navigate("crmpmng48m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng42m",{bzpeNo:this.bzpeNo.value});
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
            bzpeNo: this.bzpeNo.value
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
     * 주주 현황
     */
	async apiEnpSthr() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb022",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/shrhPtsDtl.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpSthrDataSet(result.data);
		}
		
	}
	
	apiEnpSthrDataSet(data) {
		console.log("주주 현황");
		
		const _data = data || {};
		const _this = this;
		
		let html = "";
        if(typeof _data.listDis != "undefined") {
			if(_data.listDis.length > 0) {
				$.each(_data.listDis, function(i, item){
					if(i === 0) {
						$(".std-dt").text("기준일자 : " + _this.formatChange(item.infBasDt));
					}
					
					html +=
						'<tr>' +
	                    '	<td>' + item.shrhNm + '</td>' +
	                    '	<td>' + item.ordnStcCnRt + '</td>' +
	                    '	<td>' + item.prrsMlcnRt + '</td>' +
	                    '	<td>' + item.kedStcSreRt + '</td>' +
	                    '	<td id="mdm-rel-cd' + i + '">'+item.mngtDmpeRlcdNm+'</td>' +
	                    '</tr>';
					
				});
			} else {
				html += '<tr><td colspan="5">';
				html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
				html += '</td></tr>';
			}
		} else {
			html += '<tr><td colspan="5">';
			html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
			html += '</td></tr>';
		}
        $$("#sthr").html(html);
       
	}
	
	/**
     * 주식발행 현황
     */
	async apiEnpCapt() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb023",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/stcIssuPts.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpCaptDataSet(result.data);
		}
		
	}
	
	apiEnpCaptDataSet(data) {
		console.log("주식발행 현황");
		
		const _data = data || {};
		
		$$("#base-dt").text("기준일자 : " + this.formatChange(_data.basDt));
		$(".capt .dp-am").text(CmmUtils.comma(_data.pstkAm));
		$(".capt .iss-stk-t-cn").text(CmmUtils.comma(_data.issuStcCn));
		$(".capt .cstk-cn").text(CmmUtils.comma(_data.kedOrdnStcCn));
		$(".capt .pstk-cn").text(CmmUtils.comma(_data.prrsMlcn));
		$(".capt .t-am").text(CmmUtils.comma(_data.totAm));
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

