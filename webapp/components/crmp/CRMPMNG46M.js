/*************************************************************************
* @ 서비스경로 : CRMPMNG46M
* @ 파일명      : CRMPMNG46M  고객관리 > 기업정보 상세조회 > 연혁
* @ 화면ID	  : PBWCL070004
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

export default class CRMPMNG46M extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
		
		if(data.bzpeNo === null || data.bzpeNo === '' || typeof data.bzpeNo === "undefined") {
			 router.navigate('crmpmng40m',{});
		}
		
		[this.bzpeNo, this.setBzpeNo] = this.useState('bzpeNo', data.bzpeNo); //전달받은 사업자번호
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 상세조회 > 연혁');
		
		//기업 프로필
		this.apiEnpIntr();

		// 연혁
		this.apiEnpHist();
        
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
			router.navigate("crmpmng45m",{bzpeNo:this.bzpeNo.value});
		});

		$$("#tab-next").on("click", () => {
			router.navigate("crmpmng47m",{bzpeNo:this.bzpeNo.value});
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
     * 연혁
     */
	async apiEnpHist() {

		const param = {
            userId: "woorbkonl",
            prcDis: "s",
            psnInfInq: "N",
            tlmCd: "wrb018",
            datPrts: "JSON",
            bzpeNo: this.bzpeNo.value
        };
		const result = await ApiUtils.sendPost('/api/crmp/copHsrc.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiEnpOpnnDataSet(result.data);
		}
		
	}
	
	apiEnpOpnnDataSet(data) {
		console.log("연혁");
		
		const _data = data || {};
		const _this = this;
		let html = "";
		$("tbody.hist").empty();

        if(typeof _data.listDis != "undefined") {
			if(_data.listDis.length > 0) {

				// 리스트 역순으로 변경
//				console.log(_data.listDis)
				let ordered_list = new Array();
				for(let i = _data.listDis.length - 1; i >= 0; i--) {
					ordered_list.push(_data.listDis[i]);
				}
//				console.log(ordered_list);
				$.each(ordered_list, function(i, item){
					html +=
						'<tr>' +
						'	<th scope="row" class="al">' + _this.formatChange(item.kedHsrcDt) + '</td>' +
						'	<td class="ar">' + item.copHsrcTxt + '</td>' +
						'</tr>';
				});
			} else {
				html += '<tr><td colspan="2">';
				html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
				html += '</td></tr>';
			}
		} else {
			html += '<tr><td colspan="2">';
			html += '<p class="description caution body-small d-inflex">조회 데이터가 없습니다.</p>';
			html += '</td></tr>';
		}
		$("#hist").append(html);
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

