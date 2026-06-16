/*************************************************************************
* @ 서비스경로 : DSCMNG10M
* @ 파일명      : DSCMNG10M 일정관리 > 영업 캘린더 > 월간 일정
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

export default class DSCMNG10M extends BaseModule {
	
    constructor(elem, data) {
    	super(elem);

    	this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        // 오늘 날짜
        const date = new Date();
        let today = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        
        // 체크박스 상태값 저장
        [this.chk01, this.setChk01] = this.useState('chk01', 'Y');
        [this.chk02, this.setChk02] = this.useState('chk02', 'Y');
        [this.chk03, this.setChk03] = this.useState('chk03', 'Y');
        
        // 메인에서 선택한 날짜
        if(data.mainBasDt && data.mainBasDt !== '') {
        	today = data.mainBasDt.slice(0, 4) + '-' + data.mainBasDt.slice(4, 6) + '-' + data.mainBasDt.slice(6, 8);
        }
        
        if(data.selectDate && data.selectDate !== '') {
        	console.log('data.selectDate=== ', data.selectDate);
        	today = data.selectDate;
        }
        
    	// 선택한 날짜
    	[this.selectDate, this.setSelectDate] = this.useState('selectDate', today);
    	// 검색 시작 시간
    	[this.searchStartDate, this.setSearchStartDate] = this.useState('searchStartDate', '');
    	// 검색 종료 시간
    	[this.searchEndDate, this.setSearchEndDate] = this.useState('searchEndDate', '');
    	// 일정 목록
    	[this.personalSchdList, this.setPersonalSchdList] = this.useState('personalSchdList', {});
    	// 일정 schedule
    	[this.personalSchdDate, this.setPersonalSchdDate] = this.useState('personalSchdDate', []);
    	// 선택한 날짜에 해당하는 일정 목록 (페이징용)
    	[this.todayList, this.setTodayList] = this.useState('todayList', {});
    	// 페이징 번호
    	[this.currentPage, this.setCurrentPage] = this.useState('pageNo', 1);
    	// 다음페이징여부
    	[this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'Y');
    }

    init () {
    	super.init(this);
    	this.load();
    	
    	// 검색 버튼
    	$$("#searchSchdBtn").on('touchend', async (e) => {this.handleOpenDSCMNG11M(e)});
    	// 일정 등록 버튼
    	$$("#addSchdBtn").on('touchend', async (e) => {this.handleOpenDSCMNG21M(e)});

    	// 상단 일정 체크 버튼
    	$$("#chk01").on('change', async(elem) => {
    		if (!elem.target.checked) {
    			this.setChk01("N");
    			
				$('.ui-datepicker-calendar .schedule_01').removeClass('schedule_01')
				$('.ui-datepicker-calendar .label01').css({
					'display': 'none'
				});
			} else {
				this.setChk01("Y");
				
				$('.ui-datepicker-calendar .label01').closest('td').addClass('schedule_01')
				$('.ui-datepicker-calendar .label01').css({
					'display': 'block'
				});
			}
    		
    		this.getDayDetailList(this.selectDate.value);
    	});
    	
    	// 상단 수신 버튼
    	$$("#chk02").on('change', async(elem) => {
    		if (!elem.target.checked) {
    			this.setChk02("N");
    			
				$('.ui-datepicker-calendar .schedule_02').removeClass('schedule_02')
				$('.ui-datepicker-calendar .label02').css({
					'display': 'none'
				});
			} else {
				this.setChk02("Y");
				
				$('.ui-datepicker-calendar .label02').closest('td').addClass('schedule_02')
				$('.ui-datepicker-calendar .label02').css({
					'display': 'block'
				});
			}
    		
    		this.getDayDetailList(this.selectDate.value);
    	});
    	
    	// 상단 생일 버튼
    	$$("#chk03").on('change', async(elem) => {
    		if (!elem.target.checked) {
    			this.setChk03("N");
    			
				$('.ui-datepicker-calendar .schedule_03').removeClass('schedule_03')
				$('.ui-datepicker-calendar .label03').css({
					'display': 'none'
				});
			} else {
				this.setChk03("Y");
				
				$('.ui-datepicker-calendar .label03').closest('td').addClass('schedule_03')
				$('.ui-datepicker-calendar .label03').css({
					'display': 'block'
				});
			}
    		
    		this.getDayDetailList(this.selectDate.value);
    	});
    	
    	this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this)); 	// list event
    }
    
    /**
     * 화면 접근 시, 실행
     */
    async load () {
    	$(document).off('click', '.datepicker-unfold button');
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
    	$(document).off('click', '.datepicker-wrap');
    	
    	// 로그인 세션 정보
    	const userInfo = globalApp.router.globalData.getData('userInfo');
    	
    	// PB팀, TC팀에게만 수신만기, 생일 토글 버튼 보여주기
    	if(userInfo) {
    		const teamCd = userInfo.teamCd;
   
    		if(teamCd.includes("PY12") || teamCd.includes("PY05") || teamCd.includes("PY07")) {
    			$$('#chk02Form').show();
    			$$('#chk03Form').show();
    		}else {
    			$$('#chk02Form').hide();
    			$$('#chk03Form').hide();
    		}
    	}
    	
    	CmmUtils.showLoading();
    	// 1. 조회 시간 세팅
    	await this.firstSetSearchDate();
    	// 2. 일정 조회
    	await this.getSchdList();
    	// 3. 캘린더 api load
    	await this.schedule();
    	// 4. 캘린더에 마크 추가
    	await this.scheduleMark();
    	// 5. 선택한 일정 조회
		await this.getDayDetailList(this.selectDate.value);
		// 6. 스크롤 이벤트
		this.scrollEvent();
		CmmUtils.hideLoading();
    }
    
    /**
     * 최초로 검색할 날짜를 세팅하는 함수
     */
    async firstSetSearchDate() {
    	const today = new Date(this.selectDate.value);
    	
    	let month = today.getMonth() + 1;
    	month = (month > 9) ? ''+month : '0' + month;
    	
		const startDate = today.getFullYear()+month+'01';
		const lastDay = new Date(today.getFullYear(), month, 0).getDate();
		const endDate = today.getFullYear()+month+lastDay;
		
		console.log('today.toISOString().slice(0, 10)========= ', today.toISOString().slice(0, 10));
		this.setSelectDate(today.toISOString().slice(0, 10));
    	this.setSearchStartDate(startDate);
    	this.setSearchEndDate(endDate);
    }
    
    /**
     * 일정 데이터를 객체 형태로 년, 월, 일로 나누는 함수
     */
    async splitSchedulesByMonth(obj) {
    	const result = {};
    	
    	console.log('##########obj ==== ', obj);
    	
    	obj.forEach((item) => {
    		let data = {};
    		let startDate =  this.formatDate(item.startDate);
    		let endDate =  this.formatDate(item.endDate);
    		
    		const diffStart = new Date(startDate.year, startDate.month-1, startDate.day);
			const diffEnd = new Date(endDate.year, endDate.month-1, endDate.day);
			
    		let index = 1;
    		
    		// 시작날짜와 종료날짜가 상이할 경우.
    		if(startDate.year !== endDate.year || startDate.month !== endDate.month || startDate.day !== endDate.day) {
    			const diffInMs = diffEnd - diffStart;
    			const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    			index = diffInDays + 1;
    		}
    		
    		for(let i = 0; i < index; i++) {
    			// 다음 날짜를 계산해서 던져줘야함
    			startDate = this.formatDate(diffStart);
    			
    			if(!result[startDate.year]) { 
    				result[startDate.year] = {};
    			}
    			
    			if(!result[startDate.year][startDate.month]) {
    				result[startDate.year][startDate.month] = {};
    			}
    			
    			if(!result[startDate.year][startDate.month][startDate.day]) {
    				result[startDate.year][startDate.month][startDate.day] = [];
    			}
    			
    			if(item.type === "1" || item.type === "2") { //만기, 생일
    				data = {
    						itemId:  item.itcsNo
    						, type: item.type
    						, isXpr: item.type === '1' ? true : false
    						, isBirth: item.type === '2' ? true : false
    						, isSchd: item.type === '3' && item.recurringYn === 'N' ? true : false
    						, isRepeatSchd: item.type === '3' && item.recurringYn === 'Y' ? true : false
    						, isTime: false
    						, isAlldayYn: false
    						, isLocation: false
    						, isAfcKrw: item.type === '1' ? true : false
    						, isItcsNo: item.type === '2' ? true : false
    						, startDate: item.startDate
    						, endDate: item.endDate
    						, basDt: item.basDt
    						, basDtFormat: item.basDtFormat
    						, subject: item.type === "1" ? item.cusKorlNm + " 수신만기" : item.cusKorlNm + " 생일"
    						, birthDscd: item.birthDscd
    						, crmpAcvtActSrno: item.crmpAcvtActSrno
    						, cusGdcd: item.cusGdcd
    						, afcKrwBal: item.afcKrwBal
    						, actXprDt: item.actXprDt
    						, actXprDt2: item.actXprDt2
    						, crmPrdNm: item.crmPrdNm
    						, aplIrt : item.aplIrt
    						, kycReCnfScdDt: item.kycReCnfScdDt
    				}
    			}else { // 캘린더 일정
    				data = {
    						itemId: item.itemId
    						, subject: item.subject
    						, type: item.type
    						, isXpr: item.type === '1' ? true : false
    						, isBirth: item.type === '2' ? true : false
    						, isSchd: item.type === '3' && item.recurringYn === 'N' ? true : false
    						, isRepeatSchd: item.type === '3' && item.recurringYn === 'Y' ? true : false
    						, location : item.location
    						, isLocation: item.location === '' || item.location === null ? false : true 
    						, isAfcKrw: false
    						, isItcsNo: false
    						, alldayYn: item.alldayYn
    						, isAlldayYn : item.alldayYn === 'Y' ? true : false
    						, startDate: `${startDate.year}${startDate.month}${startDate.day}${startDate.hours}${startDate.minutes}${startDate.seconds}`
    						, startTime: item.startTime
    						, endDate: `${endDate.year}${endDate.month}${endDate.day}${endDate.hours}${endDate.minutes}${endDate.seconds}`
    						, endTime: item.endTime
    						, isTime:  item.alldayYn === 'Y' ? false : true
    						, isRecurring: item.recurringYn === 'Y' ? true : false
    						, importance: item.importance
    						, masterItemId: item.masterItemId
    						, mode: item.mode
    						, recurringYn: item.recurringYn
    				}
    			}
    			
    			result[startDate.year][startDate.month][startDate.day].push(data);
    			
    			diffStart.setDate(diffStart.getDate() + 1);
    		}
    	});
    	
    	return result;
    }
    
    /**
     * 
     */
    async splitSchedulesByDate (obj) {
    	// 캘린더에 보여줄 마크 계산
    	let dateArray = [];
    	
    	for(const year in obj) {
    		for(const month in obj[year]) {
    			for(const day in obj[year][month]) {
    				const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    				dateArray.push(formattedDate);
    			}
    		}
    	}
    	
    	return dateArray;
    }
    
    /**
     * 날짜 계산
     */
    formatDate(target) {
    	let date = null;
    	
    	if(target instanceof Date) {
    		 date = target;
    	}else {
    		date = new Date(target);
    	}
    	
 	   const year = date.getFullYear();
 	   const month = String(date.getMonth() + 1).padStart(2, '0');
 	   const day = String(date.getDate()).padStart(2, '0');
 	   const hours = String(date.getHours()).padStart(2, '0');
 	   const minutes = String(date.getMinutes()).padStart(2, '0');
 	   const seconds = String(date.getSeconds()).padStart(2, '0');

 	   return { year, month, day, hours, minutes, seconds };
    }
    
    /**
     * 캘린더 일정 목록 조회
     */
    async getSchdList () {
    	const param = {
    			searchStartData : this.searchStartDate.value
    			, searchEndData : this.searchEndDate.value
    	}
    	
    	const result = await ApiUtils.sendPost('/api/dscmng/getSchdList.json', param);
    	
    	this.setCurrentPage(1);		// 페이징 번호 초기화
    	this.setNxtDatExstYn('Y');	// 스크롤 허용 여부
    	
    	if(result.resultCode === '000000') {
    		//개인일정
    		const dateList = result.data.schdList.rec;
    		console.log('dateList=== ', dateList);
    		
    		const resultObj = await this.splitSchedulesByMonth(dateList);
    		const resultArray = await this.splitSchedulesByDate(resultObj);
    		console.log('resultObj==== ', resultObj);
    		console.log('resultArray==== ', resultArray);
    		
    		this.setPersonalSchdList(resultObj);
    		this.setPersonalSchdDate(resultArray);
    	
    	}else {
    		await this.openAlert('', result.resultMessage, 'caution');
    	}
    }
    
    /**
     * 선택한 날짜의 일정 목록 조회
     */
    async getDayDetailList (value) {
    	const g = this;
    	
    	this.setCurrentPage(1);
    	this.setNxtDatExstYn('Y');
    	
    	// 선택한 날짜 Date 객체로 변환
    	const date = new Date(value);
    	
    	// 선택한 날짜 텍스트화 (ex 2024년 10월 20일 목요일..)
    	const dateOptions = {
    			year: 'numeric'
    			, month: 'long'
    			, day: 'numeric'
    			, weekday: 'long'
    	};
    	const formattedText = new Intl.DateTimeFormat("ko-KR", dateOptions).format(date);
    	$$('#selTodayText').html(formattedText);
    	
    	// 선택한 날짜의 일정 목록
    	if(Object.keys(this.personalSchdList.value).length > 0) {
    		const todayList = this.personalSchdList.value[date.getFullYear()][String(date.getMonth() + 1).padStart(2, '0')][String(date.getDate()).padStart(2, '0')];
    		console.log('선택한 날짜= ', todayList);
    		
    		if(todayList === undefined || todayList.length === 0 ){
    			$$('#schdListForm').hide();
    			$$('#noSchdListForm').show();
    			return; 
    		}
    		
    		// 상단 체크박스 구분에 따라 보여줄 데이터 가공
    		const todayFilter = todayList.filter(function(info) {
    			if(g.chk01.value === 'N' && info.type === '3') { // 일정
    				return false;
    			}
    			
    			if(g.chk02.value === 'N' && info.type === '1') { // 만기
    				return false;
    			}
    			
    			if(g.chk03.value === 'N' && info.type === '2') { // 생일
    				return false;
    			}
    			
    			return true;
    		});
    		this.setTodayList(todayFilter);
    		
    		if(todayFilter != undefined && todayFilter.length > 0) {
    			
    			// 데이터 페이징처리
    			// 최초에는 10개만
    			const sliceData = todayFilter.slice(0, 10);

    			$$('#schdListForm').show();
    			$$('#noSchdListForm').hide();
 
    			this.listManager = GlobalApp.getListManager(this.rootElem, {
    				container: '#schdListForm',
    				usePagination : false,
    				listItemHtmlPath : '/components/dscmng/list/DSCMNG10M_LIST.html',
    				listItemJsPath : '/components/dscmng/list/DSCMNG10M_LIST.js'
    			});
    			
    			$.each(sliceData, function(idx, val) {
    				val.id = val.itemId;
    			});
    			
    			await this.listManager.render(sliceData, this.eventReceiver);
//    			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this)); 	// list event (list 이벤트가 중첩되는 이슈가 있어 위치 수정
    		}else {
    			$$('#schdListForm').hide();
    			$$('#noSchdListForm').show();
    		}
    	}else {
    		$$('#schdListForm').hide();
			$$('#noSchdListForm').show();
    	}
    }
    
    /**
     * 일정검색 이동 이벤트
     */
   async handleOpenDSCMNG11M(e) {
	   e.preventDefault();
	
		const route = 'dscmng11m';	
		const props = {
				
		};
		router.navigate(route, props);
   }
   
    /**
     * 일정등록 이동 이벤트
     */
   async handleOpenDSCMNG21M(e) {
	   e.preventDefault();
		
		const route = 'dscmng21m';	
		const props = {
				'selectDate': this.selectDate.value
		};
		router.navigate(route, props);
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
	   			, 'type': obj.mainYn
	   			, 'selectDate': this.selectDate.value
	   };
	   router.navigate(route, props);
   }

   /**
    * 일정 페이징처리
    */
   async paginate() {
	   const startIndex = (this.currentPage.value - 1) * 10;
	   const endIndex = startIndex + 10;
   		
	   const fragment = document.createDocumentFragment();
	   
	   	// 데이터 자르기
	   if(Object.keys(this.todayList.value).length > 0) {
		   const sliceData = this.todayList.value.slice(startIndex, endIndex);
		   $.each(sliceData, function(idx, val) {
			   val.id = val.itemId;
		   });
		   
		   const listItemHTML = await this.loadHTML('/components/dscmng/list/DSCMNG10M_LIST.html');
		   console.log('listItemHTML================ ', listItemHTML);
		   for(let i = 0; i < sliceData.length; i++) {
			   await this.listManager.addItem(sliceData[i], fragment, listItemHTML, this.eventReceiver);
		   }
		   
		   this.listManager.listContainer.elements[0].appendChild(fragment);
	   }
   		
	   // 페이징 이후, 다음 페이지 여부 확인
	   if(this.todayList.value.length > (this.currentPage.value * 10)) {
		   // 남은 데이터가 존재할 경우 스크롤 이벤트 Y처리
		   this.setNxtDatExstYn('Y');
	   }
   }
   
   async loadHTML ( url ) {
		const res = await fetch( url );
		if ( res.ok ) {
			return res.text();
		}
	}
   
    /**
     * 캘린더 최초 생성
     */
    async schedule () {
    	const g = this;
		$("#datepicker_schedule").datepicker({
			dateFormat: 'yy-mm-dd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
			yearSuffix: '.',
			// minDate: 0,
			showButtonPanel: false,
			closeText: "닫기",
			showOtherMonths: true,
			onSelect: function(date, dp) {	// 캘린더에서 특정 일자 선택하면 실행되는 함수
				 setTimeout(function(){
					 g.setSelectDate(date);
					 g.getDayDetailList(date);
					 g.scheduleMark();
				 }, 10);
			},
			beforeShowDay: function(date) { // 캘린더에 마크 표시해주기 위해 일정tag마다 특정 일자 부여
				let result;
				if(!result) {
					result = [true, 'date' + date.getDate()];
				}
				
				return result;
			},
			onUpdateDatepicker: function() { // 캘린더가 업데이트 될 때 실행되는 함수
				g.addTags();
				//await this.scheduleMark();
			},
			onChangeMonthYear: async (year, month, inst) => { // 캘린더에서 이전,다음 월을 넘어갈 경우 실행되는 함수
				// 검색 기간 설정
				month = (month > 9) ? ''+month : '0' + month;
				const startDate = year+month+'01';
				const lastDay = new Date(year, month, 0).getDate();
				const endDate = year+month+lastDay;

				this.setSearchStartDate(startDate);
				this.setSearchEndDate(endDate);
				//this.setSelectDate(year+'-'+month+'-'+'01');

				// 캘린더에 시작날짜 selected
				const selectYaer = this.selectDate.value.split('-')[0];
				const selectMonth = this.selectDate.value.split('-')[1];
				
				if(selectYaer.includes(year) && selectMonth.includes(month)) {
				}else {
					this.setSelectDate(year+'-'+month+'-'+'01');
				}
				
				// 검색 시작
				await this.getSchdList();
				await this.getDayDetailList(this.selectDate.value);
				
				$("#datepicker_schedule").datepicker('setDate', this.selectDate.value);
				
				// 캘린더에 일정 마크 표시 업데이트
				await this.scheduleMark();
			}
		});
		
		$(document).on('click', '.ui-datepicker-next', function() {
			$('body').find('.datepicker-wrap').find('.ui-datepicker:visible table').hide('slide', {
				direction: 'left'
			}, 1).show('slide', {
				direction: 'right'
			}, 250)
		})

		$(document).on('click', '.ui-datepicker-prev', function() {
			$('body').find('.datepicker-wrap').find('.ui-datepicker:visible table').hide('slide', {
				direction: 'right'
			}, 1).show('slide', {
				direction: 'left'
			}, 250)
		})
		
		$('.datepicker-wrap').swipe({
			swipeLeft: function() {
				$(this).find("[data-handler='next']").trigger('click');
			},
			swipeRight: function() {
				$(this).find("[data-handler='prev']").trigger('click');
			}
		})
		
		console.log('this.selectDate.value=============== ', this.selectDate.value);
		$("#datepicker_schedule").datepicker('setDate', this.selectDate.value);
		
		const yyyy = String(this.searchStartDate.value).substring(0, 4);
		const mm = String(this.searchStartDate.value).substring(4, 6);

		$('#datepicker_schedule').data().datepicker.drawYear = Number(yyyy);
	    $('#datepicker_schedule').data().datepicker.drawMonth = Number(mm - 1) ;
	    $('#datepicker_schedule').data().datepicker.selectedYear = Number(yyyy);
	    $('#datepicker_schedule').data().datepicker.selectedMonth = Number(mm - 1);
	    $('#datepicker_schedule').datepicker('refresh');
    }
    
    /**
     * 캘린더 내부 마크 렌더링
     */
    async scheduleMark() {
    	const year = String(this.searchStartDate.value).substring(0, 4);
    	const month = String(this.searchEndDate.value).substring(4, 6);
    	
    	for(let i = 1; i < 32; i++) {
    		// 개인일정
    		if(Object.keys(this.personalSchdList.value).length > 0) {
    			if(typeof this.personalSchdList.value[year][month][("0"+i).slice(-2)] != "undefined" &&
    					this.personalSchdList.value[year][month][("0"+i).slice(-2)].length > 0) {
    				
    				$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').html('');
    				
    				let chk01Count = 0;
    				let chk02Count = 0;
    				let chk03Count = 0;
    				
    				for(let j = 0; j < this.personalSchdList.value[year][month][("0"+i).slice(-2)].length; j++) {
    					switch(this.personalSchdList.value[year][month][("0"+i).slice(-2)][j].type) {
    	
    					case "3" : // 일정
    						if(chk01Count === 0) {
    							if(this.chk01.value === 'N') {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label01" aria-label="일정" style="display:none;"></div>');
    							}else {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label01" aria-label="일정"></div>');
    							}
    							chk01Count = chk01Count + 1;
    						}
    						break;
    					case "2" : // 생일
    						if(chk03Count === 0) {
    							if(this.chk03.value === 'N') {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label03" aria-label="생일" style="display:none;"></div>');
    							}else {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label03" aria-label="생일"></div>');
    							}
    							chk03Count = chk03Count + 1;
    						}
    						break;
    					case "1" : //만기
    						if(chk02Count === 0) {
    							if(this.chk02.value === 'N') {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label02" aria-label="만기" style="display:none;"></div>');
    							}else {
    								$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').append('<div class="sc-label label02" aria-label="만기"></div>');
    							}
    							chk02Count = chk02Count + 1;
    						}
    						break;
    					}
    				}
    			}else {
    				// 마크 제거
    				$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').html('');
    			}
    		}else {
    			// 마크 제거
				$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').html('');
    		}
    	}
    }
    
    /**
     *  리스트이벤트 
     * @param 
     */
     async onItemAction ( event ) {
    	 const { 
    		 itemId
    		 , recurringYn
    		 , type
    		 , birthDscd
    		 , basDt
    		 , basDtFormat
    		 , name
    		 , crmpAcvtActSrno
    		 , cusGdcd
    		 , crmPrdNm
    		 , afcKrwBal
    		 , actXprDt
    		 , actXprDt2
    		 , aplIrt
    		 , kycReCnfScdDt
    	 } = event.detail;
    	 
     	if(type === '1') { // 수신만기
     		const route = 'dscmng30p';
     		
     		await GlobalApp.popupUtils.openPopup(route, {
     			params: {
     				itemId: itemId
     				, birthDscd: birthDscd
     				, basDt: basDt
     				, basDtFormat: basDtFormat
     				, crmpAcvtActSrno: crmpAcvtActSrno
     				, cusGdcd: cusGdcd
     				, name: name
     				, prdNm: crmPrdNm
     				, afcKrwBal: afcKrwBal
     				, actXprDt: actXprDt
     				, actXprDt2: actXprDt2
     				, aplIrt: aplIrt
     				, kycReCnfScdDt: kycReCnfScdDt
     			},   
     			btn2Label : '개인 일정으로 추가',
     			btn2IsMain : true,
                onYes: async(result) => {
                	// 등록 페이지로 전달
                	const subRoute = 'dscmng21m';	
            		const props = {
            				'mode': 'xpr'
            				, 'subject': result.name
            				, 'selectDate': result.basDt
            				, 'memo': result.memo
            		};
            		router.navigate(subRoute, props);
                },
                onClose : (result) => console.log('onClose Result : ' , result),
     			showCloseBtn : true
     		})
     	}else if(type === '2') { // 생일
     		const router = 'dscmng40p';
     		
     		await GlobalApp.popupUtils.openPopup(router, {
     			params: {
     				itemId: itemId
     				, birthDscd: birthDscd
     				, basDt: basDtFormat
     				, cusGdcd: cusGdcd
     				, name: name
     			},
     			showCloseBtn : true
     		})
    	}else { // 일정
    		// 단독일정, 반복일정 팝업 호출
    		// recurringYn가 Y일 경우에만
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
    								// 일정 조회
    								await this.getSchdList();
    								// 선택한 일정 조회
    								await this.getDayDetailList(this.selectDate.value);
    								
    								await this.scheduleMark();
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
    					// 일정 조회
    					await this.getSchdList();
    					// 선택한 일정 조회
    					await this.getDayDetailList(this.selectDate.value);
    					
    					await this.scheduleMark();
    				},
    				onClose : (result) => console.log('onClose Result : ' , result),
    			});
    		}
    	}
     }
     
     async addTags() {
 		const datepickerWrap = document.querySelectorAll('.ui-datepicker-calendar td a');
 		datepickerWrap.forEach(function(div) {
 			const scheduleWrap = document.createElement('div');
 			scheduleWrap.classList.add('schedule-wrap');
 			div.appendChild(scheduleWrap)
 		})

 		//개인 일정
 		const schedule_01 = document.querySelectorAll('.schedule_01 .schedule-wrap');
 		schedule_01.forEach(function(item) {
 			item.insertAdjacentHTML('beforeend', '<div class="sc-label label01" aria-label="개인 일정"></div>');
 		})

 		//고객 생일
 		const schedul_02 = document.querySelectorAll('.schedule_02 .schedule-wrap');
 		schedul_02.forEach(function(item) {
 			item.insertAdjacentHTML('beforeend', '<div class="sc-label label02" aria-label="고객 생일"></div>');
 		})

 		//수신 만기
 		const schedul_03 = document.querySelectorAll('.schedule_03 .schedule-wrap');
 		schedul_03.forEach(function(item) {
 			item.insertAdjacentHTML('beforeend', '<div class="sc-label label03" aria-label="수신 만기"></div>');
 		})
 	}
     
     /**
      * 스크롤 이벤트
      */
     scrollEvent() {
 		const _this = this;
 		$(document).scroll(function(){
 			let val = window.innerHeight + window.scrollY;
 			if(val>=document.body.offsetHeight-2) {
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
     async openAlert(title, message , cancelBtn, icon) {
 		await CmmUtils.alert(title, message,{
 			btnLabel : '확인',
 			useCancelBtn : false,
 			status: icon
 		});
 	}
    
    destroy () {
    	$("#datepicker_schedule").remove();
    	$(document).off('click', '.datepicker-unfold button');
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
    	$(document).off('click', '.datepicker-wrap');
        super.destroy(this);
        $(document).off("scroll");
    }
}
