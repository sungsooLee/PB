/*************************************************************************
* @ 서비스경로 : DSCMNG11M
* @ 파일명      : DSCMNG11M 일정관리 > 영업 캘린더 > 일정 검색
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class DSCMNG11M extends BaseModule {
	
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
        [this.schdList, this.setSchdList] = this.useState('schdList', {});
        
        // 페이징 처리된 일정 목록 (화면에 보여줄 데이터)
        [this.PagingSchdList, this.setPagingSchdList] = this.useState('pagingSchdList', []);
        [this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'Y');
    }

    init () {
    	super.init(this);
    	this.load();
    	
    	// 초기값 설정
    	const today = new Date();
    	const nextDay = new Date(today);
    	nextDay.setMonth(nextDay.getMonth() + 1);
    	
    	this.setSearchStartDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
    	this.setSearchEndDate(`${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, '0')}-${String(nextDay.getDate()).padStart(2, '0')}`);
   
    	// 바인딩 및 버튼 이벤트 
    	// 시작일자
    	this.bind('searchStartDate', $$('#searchStartBtn'), 'p');
    	// 종료일자
    	this.bind('searchEndDate', $$('#searchEndBtn'), 'p');
    	// 검색어
    	this.bind('searchKeyword', $$('#searchKeyword'), 'input');
    	
    	// 검색 버튼
    	$$('#searchBtn').on('click', async () => await this.handleSearch());
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
     * 화면 접근 시, 실행
     */
    async load () {
    }
   
    /**
     * 검색 실행
     */
    async handleSearch () {
    	// 유효성 검사
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
    	
    	// 시작일자와 종료일자의 날짜 차이가 365일 초과일 경우
    	const d1 = new Date(this.searchStartDate.value);
    	const d2 = new Date(this.searchEndDate.value);
    	const dayDifference = (Math.abs(d2 - d1)) / (1000 * 3600 * 24);

    	if(dayDifference > 365) {
    		$$('#searchForm1').addClass('form-invalid');
    		$$('#validDate').text('검색 기간은 최대 1년만 설정 가능합니다.');
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
    	
    	const res = await ApiUtils.sendPost('/api/dscmng/getSearchSchdList.json', param);
    	
    	if(res.resultCode === '000000') {
    		
    		if(res.data.schdList != null && res.data.schdList.rec.length > 0) {
    			this.setSchdList(res.data.schdList.rec); // 원본 데이터 저장
    			
    			this.scrollEvent();
    			await this.paginate();
    			
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
     * 데이터 페이징처리
     */
    async paginate() {
    	const startIndex = (this.currentPage.value - 1) * this.pageSize.value;
    	const endIndex = startIndex + this.pageSize.value;
    	
    	// 데이터 자르기
    	const data = this.schdList.value.slice(startIndex, endIndex);

    	// 하루종일 정렬
    	const sortData = data.sort((a, b) => {
    		if(a.alldayYn === 'Y' && b.alldayYn === 'N') return -1;
    		if(a.alldayYn === 'N' && b.alldayYn === 'Y') return 1;
    		return 0;
    	});
    	
    	// 같은 일자끼리 그룹화
    	const groupData = data.reduce((acc, item) => {
    		if(!acc[item.startDate2]) {
    			acc[item.startDate2] = [];
    		}
    		acc[item.startDate2].push(item);
    		return acc;
    	}, {});
    	
    	// 리스트 텍스트 생성
    	Object.entries(groupData).map(([date, items]) => {
    		let html = "";
    		
    		html += '<div class="schedule-section content-fluid pt40">';
    		html += '		<div class="tags-wrap mb24">';
    		html += '			<div class="tags tags-medium tags-white">'+`${items[0].startDate3}`+'</div>';
    		html += '		</div>';
    		
    		items.map((item) => {
    	 		html += '		<a class="schedule-list" name="dataNode" data-id="'+ `${item.itemId}` +'" data-recurringYn="'+ `${item.recurringYn}`+'">';
        		html += '			<div class="schedule-title">';
        		html += '				<i class="icon-only icon-24 '+`${item.alldayYn === 'Y' ? 'icon-calendar-repeat' : 'icon-calendar'}`+'" aria-label="개인일정"></i>';
        		html += '				<strong class="title-medium">'+`${item.subject}`+'</strong>';	
        		html += '			</div>';
        		html += '			<div class="schedule-content">';
        		html += '				<div class="schedule-detail">';
        		html += '					<div class="schedule-detail-inner fc-typography-body">';
        		html += '						<i class="icon-only icon-16 icon-time bg-icon-gray_1"></i>';
        		html += '						'+`${item.alldayYn === 'Y' ? '하루종일' : item.startTime + ' ~ ' + item.endTime}`+'';		
        		html += '					</div>';
        		html += '					'+`${item.location !== null ? '<span class="division h12 mx6"></span>' : ''}` + '';				
        		html += '					'+`${item.location !== null ? '<div class="schedule-detail-inner">' : ''}` + '';				
        		html += '					'+`${item.location !== null ? '<i class="icon-only icon-16 icon-location bg-icon-gray_1"></i>' : ''}` + '';				
        		html += '						'+`${item.location !== null ? item.location : ''}`+'';
        		html += '					'+`${item.location !== null ? '</div>' : ''}`+'';
        		html += '				</div>';
        		html += '			</div>';
        		html += '		</a>';
    		});
    		html += '</div>';
    		
    		$$('#dataForm').append(html);
    	});
    	
    	// 페이징 이후, 다음 페이지 여부 확인
    	if(this.schdList.value.length > (this.currentPage.value * this.pageSize.value)) {
    		// 남은 데이터가 존재할 경우 스크롤 이벤트 Y처리
    		this.setNxtDatExstYn('Y');
    	}
    	
    	// 이벤트 삭제
    	$(document).find('a[name="dataNode"]').off();
    	
    	// 이벤트 등록
    	$(document).find('a[name="dataNode"]').on('click', async(evnt) => this.handleDetalPop(evnt));

    }
    
    /**
     * 상세 팝업 호출
     */
    async handleDetalPop (evnt) {
    	evnt.preventDefault();
    	const target = $(evnt.currentTarget);
    	const itemId = target.attr('data-id');
    	const recurringYn = target.attr('data-recurringYn');
    	
    	if(recurringYn === 'Y') {
    		const router = 'dscmng12p';

        	await GlobalApp.popupUtils.openPopup(router, {
    			params: {},
                showCloseBtn : true,
    			btn2Label : '선택',
    			btn2IsMain : true,
    			onYes : async(result) => {
    				// itemId와 recurring 값 가지고 상세 팝업 호출
    				// 개인일정, 만기일정, 생일 구분
    				const router = 'dscmng20p';
    				await GlobalApp.popupUtils.openPopup(router, {
    					params: {itemId: itemId, recurring: result.data.recurring},
    		            showCloseBtn : true,
    		            btn1Label : '삭제',
    					btn2Label : '수정',
    					btn2IsMain : true,
    					onYes : async(result) => {
    						// 수정 화면 이동
    						await this.handleOpenDSCMNG24M(result.data);
    					},
    					onNo : async(result) => {
    						// 삭제
    						console.log('onNo Result : ', result);
    						
    						if(result.resultCd === '000000') {
    								await this.handleOpenDSCMNG10M();
    						}
    					},
    					onClose : (result) => console.log('onClose Result : ' , result),
    				});
    			}, 
                onClose : (result) => console.log('onClose Result : ' , result),
            });
    	}else {
    		// itemId와 recurring 값 가지고 상세 팝업 호출
			// 개인일정, 만기일정, 생일 구분
			const router = 'dscmng20p';
			await GlobalApp.popupUtils.openPopup(router, {
				params: {itemId: itemId, recurring: 'N'},
	            showCloseBtn : true,
	            btn1Label : '삭제',
				btn2Label : '수정',
				btn2IsMain : true,
				onYes : async(result) => { // 수정
					// 수정 화면 이동
					await this.handleOpenDSCMNG24M(result.data);
				},
				onNo : async(result) => {	// 삭제
					await this.handleOpenDSCMNG10M();
				},
				onClose : (result) => console.log('onClose Result : ' , result),
			});
    	}
    }
    
    /**
     * 일정수정 이동 이벤트
     */
    async handleOpenDSCMNG24M(obj) {
 	   const route = 'dscmng24m';
 	   const props = {
 			   'itemId': obj.itemId
 				, 'recurringYn':  obj.recurringYn
 	   			, 'mode': obj.mode
 	   		, 'prevItemId': obj.prevItemId
 	   };
 	   router.navigate(route, props);
    }
    
    /**
     * 월간일정 목록 이동 이벤트
     */
    async handleOpenDSCMNG10M() {
 	   const route = 'dscmng10m';
 	   const props = {
 			  
 	   };
 	   router.navigate(route, props);
    }
    
    /**
     * datePicker 팝업 호출
     */
    async handleMonthPickerPop (event) {
    	 const inputElem = ( event.target.id === 'searchStartBtn') ? $$('#searchStartBtn') : $$('#searchEndBtn');
    	 const inputValue = ( event.target.id === 'searchStartBtn') ? this.searchStartDate.value : this.searchEndDate.value;
    	 
    	 await globalApp.popupUtils.openDatePickerPopup(inputValue, Const.PickerType.DAY,{
             inputElem : inputElem,
             onSelect: (result) => {( event.target.id === 'searchStartBtn') ? this.setSearchStartDate(result.date) : this.setSearchEndDate(result.date)},
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
					let nextPage = _this.currentPage.value + 1;
					_this.setNxtDatExstYn("N");	
					_this.setCurrentPage(nextPage);
					_this.paginate();
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
    
    destroy () {
    	$(document).off('scroll');
        super.destroy(this);
    }
}
