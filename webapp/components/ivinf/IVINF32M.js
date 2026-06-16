/*************************************************************************
* @ 서비스경로 : IVINF32M
* @ 파일명      : IVINF32M 투자정보 > 경제캘린더 > 검색
* @ 작성자      : 90195467
* @ 작성일      : 2024-01-15 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-01-15             이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';

import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF32M extends BaseModule {
	constructor(elem) {
		super(elem);

		this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        // 검색 시작일자
        [this.searchStartDate, this.setSearchStartDate] = this.useState('searchStartDate', '');
        // 검색 종료일자
        [this.searchEndDate, this.setSearchEndDate] = this.useState('searchEndDate', '');
        // 검색 키워드
        [this.searchKeyword, this.setSearchKeyword] = this.useState('searchKeyword', '');
        
        [this.currentPage, this.setCurrentPage] = this.useState('currentPage', 1);
        [this.pageSize, this.setPageSize] = this.useState('pageSize', 10);
        
        // 조회한 일정 목록 (원본 데이터)
        [this.ecoIndList, this.setEcoIndList] = this.useState('ecoIndList', {});
        
        // 다음 페이징 작동여부
        [this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'Y');
    }

	init () {
        super.init(this);
        
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
    	const endDate = new Date();
    
    	this.setSearchStartDate(`${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`);
    	this.setSearchEndDate(`${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}`);
    	
        // 바인딩 및 버튼 이벤트
    	// 시작일자
    	this.bind('searchStartDate', $$('#searchStartBtn'), 'p');
    	// 종료일자
    	this.bind('searchEndDate', $$('#searchEndBtn'), 'p');
    	// 검색어
    	this.bind('searchKeyword', $$('#searchKeyword'), 'input');
    	
    	// 검색 버튼
    	$$('#searchBtn').on('click', async () => await this.handleSearch());
    	// 검색어 삭제 버튼
    	$$('#delSearchBtn').on('click', async () => this.setSearchKeyword(''));
    	// datePicker 팝업
    	$$('#searchStartBtn').on('click', async (e) => await this.handleMonthPickerPop(e));
    	// datePicker 팝업
    	$$('#searchEndBtn').on('click', async (e) => await this.handleMonthPickerPop(e));
    	
    	const searchKeyup = async () => {
    		$$('#searchForm2').removeClass('form-invalid');
    		$$('#validKeyword').text('');
    		
    		if (event.key !== 'Shift') {
				let searchType = false;
				if (event.key === 'Enter') {
					await this.handleSearch();
				}
			}
    	}
    	this.registerCallback('keyup', $$('#searchKeyword'), searchKeyup);
    }
	
	
	/**
	 * 검색 실행
	 */
    async handleSearch () {
    	const endDateStr = this.searchEndDate.value.split('-');
    	
    	const d1 = new Date(this.searchStartDate.value);
    	const d2 = new Date(endDateStr[0], endDateStr[1], '0');
    	
    	const diffInMs = Math.abs(d1 - d2);
    	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    	
    	// 종료일자가 시작일자보다 이전일 경우
    	if(this.searchStartDate.value > this.searchEndDate.value) {
    		$$('#searchForm1').addClass('form-invalid');
    		$$('#validDate').text('시작일자와 종료일자를 확인해 주세요.');
    		$('#searchStartBtn').focus();
    		return;
    	}else {
    		$$('#searchForm1').removeClass('form-invalid');
    		$$('#validDate').text('');
    	}
    	
    	if(diffInDays > 213) {
    		$$('#searchForm1').addClass('form-invalid');
    		$$('#validDate').text('검색 기간은 최대 6개월까지 설정 가능합니다.');
    		$('#searchStartBtn').focus();
    		return;
    	}else {
    		$$('#searchForm1').removeClass('form-invalid');
    		$$('#validDate').text('');
    	}
    	
    	// 검색어 2자 미만일 경우
    	if(this.searchKeyword.value.length < 2) {
    		$$('#searchForm2').addClass('form-invalid');
    		$$('#validKeyword').text('검색어를 2자 이상 입력해주세요.');
    		$('#searchKeyword').focus();
    		return;
    	}else {
    		$$('#searchForm2').removeClass('form-invalid');
    		$$('#validKeyword').text('');
    	}
    	
    	// 초기값 재설정
    	this.setCurrentPage(1);
    	$$('#dataForm').html('');
    	
    	const param = {
    			searchStartDate: this.searchStartDate.value.replace(/-/g, '')
    			, searchEndDate: this.searchEndDate.value.replace(/-/g, '')
    			, searchKeyword: this.searchKeyword.value
    	};
    	
    	const res = await ApiUtils.sendPost('/pb/api/ivinf/getEcoInd.json', param);
    	
    	if(res.resultCode === '000000') {
    		
    		if(res.data.ecoIndList != null && res.data.ecoIndList.length > 0) {
    			this.setEcoIndList(res.data.ecoIndList); // 원본 데이터 저장
    			
    			this.scrollEvent(); // 스크롤 이벤트
    			await this.paginate(); // 페이징 이벤트
    			
    			$$('#noDataForm').hide();
    			$$('#dataForm').show();
    		}else {
    			$$('#dataForm').hide();
    			$$('#noDataForm').css({display: 'flex'});
    		}
    	}else {
    		await this.openAlert('', res.resultMessage);
    	}
    }
    
    /**
	 * 페이징 이벤트
	 */
    async paginate () {
    	const startIndex = (this.currentPage.value - 1) * this.pageSize.value;
    	const endIndex = startIndex + this.pageSize.value;
    	
    	// 데이터 자르기
    	const data = this.ecoIndList.value.slice(startIndex, endIndex);
    	
    	// 같은 일자끼리 그룹화
    	const groupData = data.reduce((acc, item) => {
    		if(!acc[item.ecinBasDt]) {
    			acc[item.ecinBasDt] = [];
    		}
    		acc[item.ecinBasDt].push(item);
    		return acc;
    	}, {});
    	
    	// 목록 테스트 생성
    	Object.entries(groupData).map(([date, items]) => {
    		let html = "";
    		
    		html += '<div class="eco-wrap py40">';
			html += '<div class="tags-wrap mb16">';
			html += '<div class="tags tags-medium tags-white">'+`${items[0].ecinBasDt2}`+'</div>';
			html += '</div>';
			
			for(let i = 0; i < items.length; i++) {
				let item = items[i];
				let flagCountry = item.nacd === 'SK' ? ['한국', 'tags-kr', 'flag-kr'] : item.nacd === 'US' ? ['미국', 'tags-us', 'flag-us'] : item.nacd === 'CH' ? ['중국', 'tags-cn', 'flag-cn'] : item.nacd === 'JN' ? ['일본', 'tags-jp', 'flag-jp'] : ['유럽', 'tags-eu', 'flag-eu'];

    			html += '<a class="eco-list">';
    			html += '<div class="eco-title">';
    			html += '<div class="tags tags-small '+`${flagCountry[1]}` + '">';
    			html += '<div class="flag ' + `${flagCountry[2]}` + '">';
    			html += '<strong></strong>'+`${flagCountry[0]}`+'';
    			html+= '</div>';
    			html += '</div>';
    			html += '<strong class="title-medium">'+`${item.ecinTxt}`+'</strong>';
    			html += '</div>';
    			html += '<div class="eco-content">';
    			html += '<dl>';
    			html += '<div class="list">';
    			html += '<dt>과거</dt>';
    			html += '<dd>'+`${item.ecinPastNvTxt}`+'</dd>';
    			html += '</div>';
    			html += '<div class="list">';
    			html += '<dt>예상</dt>';
    			html += '<dd>'+`${item.ecinFrcsNvTxt}`+'</dd>';
    			html += '</div>';
    			html += '<div class="list">';
    			html += '<dt>실제</dt>';
    			html += '<dd class="'+`${item.ecinNvTxtFlag === 'UP' ? 'rise' : item.ecinNvTxtFlag === 'DOWN' ? 'fall' : ''}`+'">'+`${item.ecinAclNvTxt}`+'</dd>';
    			html += '</div>';
    			html += '</dl>';
    			if(parseInt(item.ecinImptcDscd) > 0) {
    				html += '<dl>';
    				html += '<dt>중요도</dt>';
    				html += '<dd>';
    				html += '<div class="star-rate">';
    				for(let j = 0; j < parseInt(item.ecinImptcDscd); j++) {
    					html += '<i class="icon-only icon-12 icon-star bg-brandPrimary-blue400" aria-label="별"></i>';    				
    				}
    				html += '</div>';
    				html += '</dd>';
    				html += '</dl>';
    			}
    			html +=' </div>';
    			html += '</a>';
			}
			html += '</div>';
			$$('#dataForm').append(html);
    	});
    	
    	// 페이징 이후, 다음 페이지 여부 확인
    	if(this.ecoIndList.value.length > (this.currentPage.value * this.pageSize.value)) {
    		// 남은 데이터가 존재할 경우 스크롤 이벤트 Y처리
    		this.setNxtDatExstYn('Y');
    	}
    }
	
    /**
	 * datePicker 팝업 호출
	 */
    async handleMonthPickerPop (event) {
    	 const inputElem = ( event.target.id === 'searchStartBtn') ? $$('#searchStartBtn') : $$('#searchEndBtn');
    	 const inputValue = ( event.target.id === 'searchStartBtn') ? this.searchStartDate.value : this.searchEndDate.value;

    	 await globalApp.popupUtils.openDatePickerPopup(inputValue, Const.PickerType.MONTH,{
             inputElem : inputElem,
             onSelect: (input, date) => {
            	 ( event.target.id === 'searchStartBtn') ? this.setSearchStartDate(input) : this.setSearchEndDate(input); 
            	 MicroModal.close('cmmModal');
            },
             onClose : (result) => console.log('onClose Result : ' , result)
         });
    	 
    	 $$('#searchForm1').removeClass('form-invalid');
 		 $$('#validDate').text('');
    }
    
    /**
	 * 스크롤 이벤트
	 */
    scrollEvent() {
		const _this = this;
		$(document).scroll(function(){
			let val = window.innerHeight + window.scrollY;
			if(val>=document.body.offsetHeight) {
				if(_this.nxtDatExstYn.value === "Y") {
					CmmUtils.showLoading();
					
					let nextPage = _this.currentPage.value + 1;
					_this.setNxtDatExstYn("N");	
					_this.setCurrentPage(nextPage);
					_this.paginate();
					
					setTimeout(async() => {
						CmmUtils.hideLoading();						
					}, 600);
				}
			}
		});
	}
    
	/**
	 * 공통 팝업 호출
	 */
    async openAlert (title, message , cancelBtn) {
		await CmmUtils.alert(title, message,{
			btnLabel : '확인',
			useCancelBtn : false,
			status: 'caution'
		});
	}
    
    destroy() {
        super.destroy(this);
    }
}