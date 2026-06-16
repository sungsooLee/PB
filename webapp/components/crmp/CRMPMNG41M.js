/*************************************************************************
* @ 서비스경로 : CRMPMNG41M
* @ 파일명      : CRMPMNG41M 고객관리 > 기업정보 조회
* @ 화면ID	  : PBWCL030000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import ListManager from "../../../resources/js/common/ListManager.js";
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;


export default class CRMPMNG41M extends BaseModule {

	
	constructor(elem, data) {
		super(elem);
        
		if(JSON.stringify(data) === "{}") {
			 router.navigate('crmpmng40m',{});
		}
		
		data.searchType = this.undefinedValue(data.searchType) === '' ? '1' : data.searchType;
		[this.searchText, this.setSearchText] = this.useState('searchText', data.searchText);
		[this.searchType, this.setSearchType] = this.useState('searchType', data.searchType);
		[this.pageCn, this.setPageCn] = this.useState('pageCn', 1);
		[this.isData, this.setIsData] = this.useState('isData', false);
		[this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'N');
		[this.sido, this.setSido] = this.useState('sido', data.sido);
		[this.gugun, this.setGugun] = this.useState('gugun', data.adsdNm);
		[this.bzctCfcd, this.setBzctCfcd] = this.useState('bzctCfcd', data.bzctCfcd);
	}
	
	 async init () {
	    	
		super.init(this);
		console.log('고객관리 > 기업정보 조회 > 결과');
		
		//페이징 변수
		this.setPageCn(1);
		await this.apiCompanyInfoList();
		
		this.register();
		
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
		 const detailClick = (event,element) => {
			 router.navigate('crmpmng42m',{bzpeNo:element.dataset.bzpeno});
		}
		$$(document).findByName('detail', 'click', detailClick);
	}
	
	
	scrollEvent() {
		const _this = this;
		$(document).scroll(function(){
			let val = window.innerHeight + window.scrollY;
			if (val >= document.documentElement.scrollHeight - 1) {
				if(_this.nxtDatExstYn.value === "Y") {
					_this.apiCompanyInfoList();
					_this.setNxtDatExstYn("N");				
				}
			}
		});
	}
	
	/*
	 * 기업 조회
	 */
	async apiCompanyInfoList() {
		
		
		let param = {
			userId: "woorbkonl",
			tlmNo: "wrb001",
			pageCn: this.pageCn.value,
			licn: 60,
			datDis: "JSON"
		};
		
		const searchText = this.searchText.value;
		const searchType = this.searchType.value;
		

		if(this.sido.value !== '') {
			param.sido = this.sido.value;
		}
		if(this.gugun.value !== '') {
			param.adsdNm = this.gugun.value;
		}

		if(this.bzctCfcd.value !== '') {
			param.bzctCfcd = this.bzctCfcd.value;
		}

		if(searchType === '4') {
			param.bzpeNo = searchText;
		} else if(searchType === '3') {
			param.corpNo = searchText;
		} else if(searchType === '1') {
			param.copNm = searchText;
		} else if(searchType === '2') {
			param.rppeNm = searchText;
		}
		
		const data = await ApiUtils.sendPost('/api/crmp/copSrch.json', param, true);
		
		//데이터세팅
		if(data.resultCode === '000000') {
			await this.companyInfoListDataSet(data.data);
			this.register();
			
			if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading();
	        }
			
		} else {
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인',
	            status : 'caution'
	        });
			if(res) {
				$$("#listContainer").hide();
            	$$("#com_search_notfound").css({'display':'flex'});
			}
		}
	}
	
	companyInfoListDataSet(data) {
        const _this = this;
       
        if(data.listDis.length > 0) { 
        	this.setIsData(true);
	        const listDis = data.listDis;
	        let html = '';
	        
	        $.each(listDis, function(i, item){
	        	html = '';
	        	html += '<a class="customer-card" name="detail" data-bzpeNo="'+item.bzpeNo+'">';
		        html += '	<strong class="anchor chevron anchor-fluid title-medium p0 fc-typography-title fw-700 normal-wrap" >'+item.copNm+'</strong>';
		        html += '	<div class="info-detail-list p0 bg-white-100">';
		        html += '		<div class="info-table">';
		        html += '			<div class="info-body">';
		        html += '				<div class="info-row">';
		        html += '					<div class="info-th fc-typography-black px0">대표자명</div>';
		        html += '					<div class="info-td ar" >'+item.rppeNm+'</div>';
		        html += '				</div>';
		        html += '				<div class="info-row">';
		        html += '					<div class="info-th fc-typography-black px0">기업상태</div>';
		        html += '					<div class="info-td ar" id="enp-scd' + i + '">'+item.copStcd+'</div>';
		        html += '				</div>';
		        html += '				<div class="info-row">';
		        html += '					<div class="info-th fc-typography-black px0">사업자번호</div>';
		        html += '					<div class="info-td ar">'+_this.bizNoFormatter(item.bzpeNo)+'</div>';
		        html += '				</div>';
		        html += '				<div class="info-row">';
		        html += '					<div class="info-th fc-typography-black px0">업종</div>';
		        html += '					<div class="info-td ar">'+item.bzctGrcd+'</div>';
		        html += '				</div>';
		        html += '				<div class="info-row">';
		        html += '					<div class="info-th fc-typography-black px0">주소</div>';
		        html += '					<div class="info-td ar">'+item.rdnmAdr+'</div>';
		        html += '				</div>';
		        html += '			</div>';
		        html += '		</div>';
		        html += '	</div>';
	        	html += '</a>';
	        
	        	
	        	$$("#listContainer").append(html);
	        	
	        });
	        
	        const licn = data.licn;
	        const corpCopCn = data.corpCopCn;
	        const param_pageCn = data.pageCn;
			if(licn > corpCopCn) {
				this.setNxtDatExstYn("N");	
				this.setPageCn(param_pageCn);
			} else {
				this.setNxtDatExstYn("Y");	
				this.setPageCn(param_pageCn + 1);
			}
			
			this.scrollEvent();
			
			$$("#listContainer").css({'display':'grid'});
			$$("#com_search_notfound").hide();
	
        } else {
        	if(this.isData.value === false) {
        		$$("#listContainer").hide();
            	$$("#com_search_notfound").css({'display':'flex'});
        	} else {
        		console.log("조회결과 및 코드가 없습니다.<br/>확인 후 다시 이용하시기 바랍니다.");
        	}
        }
    }
	
	
	isNull(data) {
		if( data !== ''  && data !== null) {
			return false;
		}
		return true;
	}
    
	undefinedValue (txt) {
		return typeof txt === 'undefined' || txt === '' || txt === null ? '' : txt;
	}
	
    /**
     * 사업자번호 포맷 변환
     * @param [String] : 1234567890 문자열
     * @return  [String] : 123-45-67890 문자열
     */
    bizNoFormatter(num){
		return this.undefinedValue(num) === "" ? "-" : num.replace(/(\d{3})(\d{2})(\d{5})/,'$1-$2-$3');
	}
    
    
	destroy() {
		super.destroy(this);
		$(document).off("scroll");
	}
	
	
}

