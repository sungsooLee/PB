/*************************************************************************
* @ 서비스경로 : DSCMNG22P
* @ 파일명      : DSCMNG22P 일정관리 > 영업 캘린더 > 일정 등록 > 반복 팝업
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';
import GlobalApp from "/components/cmm/GlobalApp.js";

export class DSCMNG22P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	// 현재 시간
    	const now1 = new Date();
    	const now2 = new Date();
    	let today = now1.toISOString().slice(0, 10);
    	
    	now2.setFullYear(now2.getFullYear() + 2);
    	let add2year = now2.toISOString().slice(0, 10);
    	
    	// 월, 요일, 순서
    	this.weekTable = {Sunday : "일요일",Monday : "월요일",Tuesday : "화요일",Wednesday : "수요일",Thursday : "목요일",Friday : "금요일",Saturday : "토요일"};
    	this.weekArrTable = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    	this.monthTable = {
    			January		: "1월",
    			February	: "2월",
    			March		: "3월",
    			April		: "4월",
    			May			: "5월",
    			June		: "6월",
    			July		: "7월",
    			August		: "8월",
    			September	: "9월",
    			October		: "10월",
    			November	: "11월",
    			December	: "12월",
    			};
    	this.monthArrTable = [
    		'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    	];
    	
    	this.weekIndexTable = {
    		First : "첫째",
    		Second : "둘째",
    		Third : "셋째",
    		Fourth : "넷째",
    		Last : "마지막"
    	};
    	
    	[this.recRecurrence, this.setRecRecurrence] = this.useState('recRecurrence', '');
    	
    	[this.repeatCycle, this.setRepeatCycle] = this.useState('repeatCycle', 'none'); // 반복주기Select
    	
    	[this.startTime, this.setStartTime] = this.useState('startTime', '');
    	[this.endTime, this.setEndTime] = this.useState('endTime', '');
    	[this.allDayYn, this.setAllDayYn] = this.useState('allDayYn', '');
    	
    	[this.repeatDay, this.setRepeatDay] = this.useState('repeatDay', '1');	// 매일 Radio
    	[this.repeatDayCount, this.setRepeatDayCount] = this.useState('repeatDayCount', '1');	// 매일 반복
 
    	[this.repeatWeekCount, this.setRepeatWeekCount] = this.useState('repeatWeekCount', '1'); // 매주 반복 
    	//[this.repeatWeekDay, this.setRepeatWeekDay] = this.useState('repeatWeekDay', '');
    	this.repeatWeekDay = []; // 월요일.. 화요일..
    	
    	[this.repeatMonth, this.setRepeatMonth] = this.useState('repeatMonth', '1'); // 매월 Radio
    	[this.repeatMonthCount, this.setRepeatMonthCount] = this.useState('repeatMonthCount', '1'); // 매월 반복
    	[this.repeatMonthCount2, this.setRepeatMonthCount2] = this.useState('repeatMonthCount2', '1'); // 매일 반복
    	this.repeatMonthWeek = ''; // 첫째주.. 둘째주..
    	this.repeatMonthDay = ''; // 월요일.. 화요일..
    	
    	[this.repeatYear, this.setRepeatYear] = this.useState('repeatYear', '1');
    	[this.repeatYearDate, this.setRepeatYearDate] = this.useState('repeatYearDate', today);
    	this.repeatYearMonth = ''; // 1월.. 2월
    	this.repeatYearWeek = ''; // 첫째주.. 둘째주..
    	this.repeatYaerDay = ''; // 월요일.. 화요일..
    
    	[this.repeatSetting, this.setRepeatSetting] = this.useState('repeatSetting', '3'); // 반복설정 Radio
    	[this.repeatSettingCount, this.setRepeatSettingCount] = this.useState('repeatSettingCount', '1'); // 반복횟수
    	[this.repeatSettingDate, this.setRepeatSettingDate] = this.useState('repeatSettingDate', add2year); // 종료일
    	
    	[this.selectList, this.setSelectList] = this.useState('selectList', [{
    		label: '반복 없음',
    		value: 'none',
    		isSelected: true
    	}, {
    		label: '매일',
    		value: 'day',
    		isSelected: false
    	}, {
    		label: '매주',
    		value: 'week',
    		isSelected: false
    	}, {
    		label: '매월',
    		value: 'month',
    		isSelected: false
    	}, {
    		label: '매년',
    		value: 'year',
    		isSelected: false
    	}]);
    }

    init (param) {
    	console.log('이혜성 0번 param = ', param);
    	super.init(this);
    	
    	$(document).off('click', '#popDatepicker > .ui-datepicker-next');
    	$(document).off('click', '#popDatepicker > .ui-datepicker-prev');
    	
    	this.setStartTime(param.startDate);
    	this.setEndTime(param.endDate);
    	this.setAllDayYn(param.alldayYn);
    	this.setRecRecurrence(param.recRecurrence);
    
    	this.register();
    	this.load();
    }
    
    async register() {
    	this.schedSettingToRepeatRadio1();
    	
    	// 기존에 세팅된 데이터가 있을 경우
    	await this.dataSetting();
    	
    	// 반복주기 선택박스
    	this.registerCallback('click', $$('#sSel1'), this.selBoxClick);
    	
    	// ==============================
    	// 반복주기 라디오버튼 (매일)
    	$$(document).findByName('dayRadio1', 'click', (evnt, elem) => {
    		$$('#interval_dayForm').removeClass('form-invalid');
    		$$('#interval_dayValidTxt').text('');
    		this.setRepeatDay(elem.value);
    	});
    	
    	this.bind('repeatDayCount', $$('#interval_day'), 'input');
    	
    	const intervalDayForm = async () => {
    		this.setRepeatMonth("1");
    		$('input[name="dayRadio1"][value=1]').prop('checked', true);
    		
    	}
    	this.registerCallback('click', $$('#interval_dayForm'), intervalDayForm);
    	
    	const intervalDayKeyup = async () => {
    		$$('#interval_dayForm').removeClass('form-invalid');
    		$$('#interval_dayValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#interval_day'), intervalDayKeyup);
    	//================================
    	// ?주마다 반복 횟수 (매주)
    	this.bind('repeatWeekCount', $$('#interval_week'), 'input');
    	
    	const intervalWeekKeyup = async () => {
    		$$('#interval_weekForm').removeClass('form-invalid');
    		$$('#interval_weekValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#interval_week'), intervalWeekKeyup);
    	
    	
    	//요일 선택 (매주)
    	$$(document).findByName('weekDayCheck', 'click', (evnt, elem) => {
    		if(evnt.target.checked) {
    			this.repeatWeekDay.push(elem.value);
    		}else {
    			this.repeatWeekDay = this.repeatWeekDay.filter(item => item !== elem.value);
    		}
    	});
    	
    	//================================
    	// 반복주기 라디오버튼 (매월)
    	$$(document).findByName('monthRadio1', 'click', (evnt, elem) => {
    		this.setRepeatMonth(elem.value);
    		
    		if(elem.value === '1') {
    			$$('#spinner02').css({'display': 'none'});
    		}else {
    			$$('#spinner02').css({'display': 'inline-flex'});
    		}
    	});
    	
    	// ?개월마다 반복 횟수 (매월)
    	this.bind('repeatMonthCount', $$('#repeatMonthCount'), 'input');
    	
    	const repeatMonthCountKeyup = async () => {
    		$$('#repeatMonthCountForm').removeClass('form-invalid');
    		$$('#repeatMonthCountValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#repeatMonthCount'), repeatMonthCountKeyup);
    	
    	
    	// ?일에 반복 횟수 (매월)
    	this.bind('repeatMonthCount2', $$('#repeatMonthCount2'), 'input');
    	
    	const repeatMonthCount2Keyup = async () => {
    		$$('#repeatMonthCount2Form').removeClass('form-invalid');
    		$$('#repeatMonthCount2ValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#repeatMonthCount2'), repeatMonthCount2Keyup);
    	
    	const repeatMonthCount2Click = async () => {
    		$$('#spinner02').css({'display': 'none'});
    		$('input[name="monthRadio1"][value=1]').prop('checked', true);
    		this.setRepeatMonth('1');
    	}
    	this.registerCallback('click', $$('#repeatMonthCount2'), repeatMonthCount2Click);
    	
    	const items2TextClick = async () => {
    		$$('#spinner02').css({'display': 'inline-flex'});
    		$('input[name="monthRadio1"][value=2]').prop('checked', true);
    		this.setRepeatMonth('2');
    		
    		$$('#repeatMonthCount2Form').removeClass('form-invalid');
    		$$('#repeatMonthCount2ValidTxt').text('');
    	}
    	this.registerCallback('click', $$('#items2Text'), items2TextClick);
    	//================================
    	// 반복주기 라디오버튼 (매년)
    	$$(document).findByName('yearRadio1', 'click', (evnt, elem) => {
    		this.setRepeatYear(elem.value);
    		
    		if(elem.value === '1') {
    			this.schedSettingToYearRadio1();
    			$$('#spinner03').css({'display': 'none'});
    		}else {
    			$('#datepicker_schedule03').datepicker('destroy');
    			$$('#spinner03').css({'display': 'inline-flex'});
    		}
    	});
    	
    	const repeatYearDateTextClick = async () => {
    		this.schedSettingToYearRadio1();
    		this.setRepeatYear('1');
    		$('input[name="yearRadio1"][value=1]').prop('checked', true);
    		$$('#spinner03').css({'display': 'none'});
    	}
    	this.registerCallback('click', $$('#repeatYearDateText'), repeatYearDateTextClick);
    	
    	
    	const items3TextClick = async () => {
    		this.setRepeatYear('2');
    		$('input[name="yearRadio1"][value=2]').prop('checked', true);
    		$('#datepicker_schedule03').datepicker('destroy');
    		$$('#spinner03').css({'display': 'inline-flex'});
    	}
    	this.registerCallback('click', $$('#items3Text'), items3TextClick);
    	
    	//================================
    	// 반복설정 라디오버튼 (공용)
    	$$(document).findByName('repeatRadio1', 'click', (evnt, elem) => {
    		this.setRepeatSetting(elem.value);
    		
    		$$('#repeatSettingCountForm').removeClass('form-invalid');
    		$$('#repeatSettingCountValidTxt').text('');
    		
    		// 종료일 지정 클릭 시, 캘린더 노출
    		if(elem.value === '3') {
    			this.schedSettingToRepeatRadio1();
    		}else {
    			$('#popDatepicker').datepicker('destroy');
    		}
    	});
    	
    	// 반복설정 횟수 (공용)
    	this.bind('repeatSettingCount', $$('#repeatSettingCount'), 'input');
    	
    	// 반복설정 종료일 Text 영역
    	$$('#repeatSettingDateText').html(this.repeatSettingDate.value);
    	
    	const repeatSettingDateTextClick = async () => {
    		$('input[name="repeatRadio1"][value=3]').prop('checked', true);
    		this.setRepeatSetting('3');
    		this.schedSettingToRepeatRadio1();
    		
    	}
    	this.registerCallback('click', $$('#repeatSettingDateText'), repeatSettingDateTextClick);
    	
    	const repeatSettingCountClick = async () => {
    		$('input[name="repeatRadio1"][value=2]').prop('checked', true);
    		this.setRepeatSetting('2');
    		$('#popDatepicker').datepicker('destroy');
    	}
    	this.registerCallback('click', $$('#repeatSettingCount'), repeatSettingCountClick);
    	
    	const repeatSettingCountKeyup = async () => {
    		$$('#repeatSettingCountForm').removeClass('form-invalid');
    		$$('#repeatSettingCountValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#repeatSettingCount'), repeatSettingCountKeyup);
    }
    
    async load() {
    	await this.loadSpinnerWrap();
    }
    
    /**
     * 기존 데이터가 있을 경우, 기존 값으로 화면 세팅
     */
    async dataSetting() {
    	// 일정 데이터가 있을 경우에만
    	if(this.recRecurrence.value != null && this.recRecurrence.value != undefined && this.recRecurrence.value != '') {
    		$('#popDatepicker').datepicker('destroy');
    		
    		$$('#notRep').hide();
    		
    		const obj = this.recRecurrence.value[0];
    		
    		// 반복 주기 선택 박스
    		this.setSelectList([{
        		label: '반복 없음',
        		value: 'none',
        		isSelected: false
        	}, {
        		label: '매일',
        		value: 'day',
        		isSelected: obj.type === 'DAILY' || (obj.type === 'WEEKLY' && obj.recWeek.length === 5) ? true : false
        	}, {
        		label: '매주',
        		value: 'week',
        		isSelected: obj.type === 'WEEKLY' && obj.recWeek.length !== 5 ? true : false
        	}, {
        		label: '매월',
        		value: 'month',
        		isSelected: obj.type === 'MONTHLY' || obj.type === 'RELATIVE_MONTHLY' ? true : false
        	}, {
        		label: '매년',
        		value: 'year',
        		isSelected: obj.type === 'YEARLY' || obj.type === 'RELATIVE_YEARLY' ? true : false
        	}]);
    		
    		// type 매일
    		if(obj.type === 'DAILY' || (obj.type === 'WEEKLY' && obj?.recWeek.length === 5)) {
    			// 화면 노출
    			$$('#dayForm').show();
    			$$('#repeatForm').show();
    			
    			// 반복 주기 선택 박스
    			this.setRepeatCycle('day');
    			$$("#selTxt").text('매일');
    			
    			// 매일(평일) 구분
    			if(!obj.recWeek) {
    				$('input[name="dayRadio1"][value=1]').prop('checked', true);
    				this.setRepeatDay('1');
    				// 반복 횟수
    				this.setRepeatDayCount(obj.interval);
    			}else {
    				$('input[name="dayRadio1"][value=2]').prop('checked', true);
    				this.setRepeatDay('2');
    			}
    		}
    		
    		// type 매주
    		if(obj.type === 'WEEKLY' && obj.recWeek.length !== 5) {
    			// 화면 노출
    			$$('#weekForm').show();
    			$$('#repeatForm').show();
    			
    			// 반복 주기 선택 박스
    			this.setRepeatCycle('week');
    			$$("#selTxt").text('매주');
    			
    			// 반복 횟수
    			this.setRepeatWeekCount(obj.interval);
    			
    			// 요일
    			for(let i = 0; i < obj.recWeek.length; i++) {
    				this.repeatWeekDay.push(obj.recWeek[i].dayOfTheWeek);
    				$('input[name="weekDayCheck"][value="'+obj.recWeek[i].dayOfTheWeek+'"]').prop('checked', true);
    			}
    		}
    		
    		// type 매월
    		if(obj.type === 'MONTHLY' || obj.type === 'RELATIVE_MONTHLY') {
    			// 화면 노출
    			$$('#monthForm').show();
    			$$('#repeatForm').show();
    			
    			// 반복 주기 선택 박스
    			this.setRepeatCycle('month');
    			$$("#selTxt").text('매월');
    			
    			// 매월 구분
    			if(!obj.dayOfTheWeek) {
    				$$('#spinner02').css({'display': 'none'});
    				$('input[name="monthRadio1"][value=1]').prop('checked', true);
    				this.setRepeatMonth('1');
    				
    				this.setRepeatMonthCount(obj.interval);
    				this.setRepeatMonthCount2(obj.dayOfMonth);
    			}else {
    				$$('#spinner02').css({'display': 'inline-flex'});
    				$('input[name="monthRadio1"][value=2]').prop('checked', true);
    				this.setRepeatMonth('2');
    				
    				this.repeatMonthWeek = obj.dayOfTheWeekIndex;
    				this.repeatMonthDay = obj.dayOfTheWeek;
    				
    				$('input[name="items2s1"][value="'+this.repeatMonthWeek+'"]').closest('label').addClass('scroll-items-selected');
    				$('input[name="items2s2"][value="'+this.repeatMonthDay+'"]').closest('label').addClass('scroll-items-selected');
    				
    				setTimeout(async() => {
    					const scrollWrap = document.querySelector('#scroll-container2-1');
        				const scrollWrapFirst = scrollWrap.firstElementChild;
        				const scrollWrapFristMargin = parseInt(window.getComputedStyle(scrollWrapFirst).marginTop, 10);
        				const scrollSelected = scrollWrap.querySelector('.scroll-items-selected');
        				if (scrollSelected != null) {
        					const selectedOffsetTop = scrollSelected.offsetTop;
        					scrollWrap.scrollTo({
        						top : selectedOffsetTop - scrollWrapFristMargin,
        						behavior : 'smooth'
        					})
        				}
        				
        				const scrollWrap2 = document.querySelector('#scroll-container2-2');
        				const scrollWrapFirst2 = scrollWrap2.firstElementChild;
        				const scrollWrapFristMargin2 = parseInt(window.getComputedStyle(scrollWrapFirst2).marginTop, 10);
        				const scrollSelected2 = scrollWrap2.querySelector('.scroll-items-selected');
        				if (scrollSelected2 != null) {
        					const selectedOffsetTop = scrollSelected2.offsetTop;
        					scrollWrap2.scrollTo({
        						top : selectedOffsetTop - scrollWrapFristMargin2,
        						behavior : 'smooth'
        					})
        				}
        			},1);
    			}
    		}
    		
    		// type 매년
    		if(obj.type === 'YEARLY' || obj.type === 'RELATIVE_YEARLY') {
    			// 화면 노출
    			$$('#yearForm1').show();
    			$$('#yearForm2').show();
    			$$('#repeatForm').show();
    			
    			// 반복 주기 선택 박스
    			this.setRepeatCycle('year');
    			$$("#selTxt").text('매년');
    			
    			// 매년 구분
    			if(!obj.dayOfTheWeek || obj.dayOfTheWeek === '') {
    				$('input[name="yearRadio1"][value=1]').prop('checked', true);
    				this.setRepeatYear('1');
    				
    				const today = new Date(`${obj.month} ${obj.dayOfMonth} ,2025`);
    				const option = { year: 'numeric', month: '2-digit', day: '2-digit'};
    				
    				this.setRepeatYearDate(new Intl.DateTimeFormat('en-CA', option).format(today));
    				$$('#repeatYearDateText').html(`${this.monthTable[obj.month]} ${parseInt(obj.dayOfMonth)}일`);
    				this.schedSettingToYearRadio1();
    			}else {
    				$$('#spinner03').css({'display': 'inline-flex'});
    				
    				$('input[name="yearRadio1"][value=2]').prop('checked', true);
    				this.setRepeatYear('2');
    				
    				this.setRepeatYearMonth = obj.month
    				this.setRepeatYearWeek = obj.dayOfTheWeekIndex
    				this.setRepeatYaerDay = obj.dayOfTheWeek
    				
    				$('input[name="items3s1"][value="'+this.setRepeatYearMonth+'"]').closest('label').addClass('scroll-items-selected');
    				$('input[name="items3s2"][value="'+this.setRepeatYearWeek+'"]').closest('label').addClass('scroll-items-selected');
    				$('input[name="items3s3"][value="'+this.setRepeatYaerDay+'"]').closest('label').addClass('scroll-items-selected');
    				
    				setTimeout(async() => {
    					const scrollWrap = document.querySelector('#scroll-container3-1');
        				const scrollWrapFirst = scrollWrap.firstElementChild;
        				const scrollWrapFristMargin = parseInt(window.getComputedStyle(scrollWrapFirst).marginTop, 10);
        				const scrollSelected = scrollWrap.querySelector('.scroll-items-selected');
        				if (scrollSelected != null) {
        					const selectedOffsetTop = scrollSelected.offsetTop;
        					scrollWrap.scrollTo({
        						top : selectedOffsetTop - scrollWrapFristMargin,
        						behavior : 'smooth'
        					})
        				}
        				
        				const scrollWrap2 = document.querySelector('#scroll-container3-2');
        				const scrollWrapFirst2 = scrollWrap2.firstElementChild;
        				const scrollWrapFristMargin2 = parseInt(window.getComputedStyle(scrollWrapFirst2).marginTop, 10);
        				const scrollSelected2 = scrollWrap2.querySelector('.scroll-items-selected');
        				if (scrollSelected2 != null) {
        					const selectedOffsetTop = scrollSelected2.offsetTop;
        					scrollWrap2.scrollTo({
        						top : selectedOffsetTop - scrollWrapFristMargin2,
        						behavior : 'smooth'
        					})
        				}
        				
        				const scrollWrap3 = document.querySelector('#scroll-container3-3');
        				const scrollWrapFirst3 = scrollWrap3.firstElementChild;
        				const scrollWrapFristMargin3 = parseInt(window.getComputedStyle(scrollWrapFirst3).marginTop, 10);
        				const scrollSelected3 = scrollWrap3.querySelector('.scroll-items-selected');
        				if (scrollSelected3 != null) {
        					const selectedOffsetTop = scrollSelected3.offsetTop;
        					scrollWrap3.scrollTo({
        						top : selectedOffsetTop - scrollWrapFristMargin3,
        						behavior : 'smooth'
        					})
        				}
        			},1);
    			}
    		}
    	
    		// 반복 설정
    		if(!obj.numberOfOccurrences && !obj.endDate) {
    			$('input[name="repeatRadio1"][value=1]').prop('checked', true);
				this.setRepeatSetting('1');
    		}else if(!obj.endDate && obj.numberOfOccurrences != '') {
    			$('input[name="repeatRadio1"][value=2]').prop('checked', true);
				this.setRepeatSetting('2');
				this.setRepeatSettingCount(obj.numberOfOccurrences);
    		}else if(!obj.numberOfOccurrences && obj.endDate != '') {
    			$('input[name="repeatRadio1"][value=3]').prop('checked', true);
				this.setRepeatSetting('3');
				this.setRepeatSettingDate(obj.endDate);
				this.schedSettingToRepeatRadio1();
    		}
    	}
    }
    
	/**
	 * 반복주기 선택 박스
	 */
	async selBoxClick () {
		 const g = this;
		 GlobalApp.popupUtils.openSelectModal(this.selectList.value , {
			 showCloseBtn : true,
			 modalTitle : '옵션 선택',
		
			 onClose : (result) => {
				 console.log('close Result : ' , result);
			 },
			 onCallback : (result) => {
				 console.log('callback Result : ' , result);
				 /* this.setSelectedVal(result.data); */

				 if(result.resultCd !== '999999') {
					 const tmpList = [];
					 g.selectList.value.forEach((item) => {
						 if ( item.value === result.data ) {
							 item.isSelected = true;
							 $$("#selTxt").text(item.label);
						 } else {
							 item.isSelected = false;
						 }
						 tmpList.push(item);
					 });
					 
					 g.setSelectList(tmpList);
					 
					 const type = result.data;
					 
					 this.setRepeatCycle(type);
					 
					 $$('#dayForm').hide();
					 $$('#weekForm').hide();
					 $$('#monthForm').hide();
					 $$('#yearForm1').hide();
					 $$('#yearForm2').hide();
					 $$('#repeatForm').hide();
					 $$('#notRep').hide();
					 
					 if(type === 'none') {	// 반복 없음
						 $$('#notRep').show();
					 }else if(type === 'day') { // 매일 반복
						 $$('#dayForm').show();
						 $$('#repeatForm').show();
					 }else if(type === 'week') { // 매주 반복
						 $$('#weekForm').show();
						 $$('#repeatForm').show();
					 }else if(type === 'month') { // 매월 반복
						 $$('#monthForm').show();
						 $$('#repeatForm').show();
					 }else if(type === 'year') { // 매년 반복
						 $$('#yearForm1').show();
						 $$('#yearForm2').show();
						 $$('#repeatForm').show();
						 
						 if(this.repeatYear.value === '1') {
							 this.schedSettingToYearRadio1();
						 }
					 }
				 }
			 }
		 });
	}
	
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn2CallBack () {
    	let resultObj = {};
    	
    	console.log('this.startTime.value = ', this.startTime.value);
    	
    	resultObj.startTime = this.startTime.value;
    	resultObj.endTime = this.endTime.value;
    	
    	// 유효성 검사부터 실시
    	console.log('저장값들 ================');
    	if(this.repeatCycle.value === 'none') { // 반복없음
    		resultObj.delYn = 'Y';
    	}else {
    		resultObj.delYn = 'N';
    		
    		// 하루종일 가져오기
    		resultObj.alldayYn = this.allDayYn.value;
    		
    		if(this.allDayYn.value === 'Y') {
    			resultObj.startTime = '00:00';
    			resultObj.endTime = '00:00';
    		}
    	}
    	
    	if(this.repeatCycle.value === 'day') { // 매일
    		if(this.repeatDay.value === '1') { // ..일마다
    			// 반복 주기일수 
    			if(this.repeatDayCount.value === "") {
    				$$('#interval_dayForm').addClass('form-invalid');
    				$$('#interval_dayValidTxt').text('반복 주기일수를 입력해 주세요.');
    				return;
    			}
    			
    			if(parseInt(this.repeatDayCount.value) < 1 || parseInt(this.repeatDayCount.value) > 999) {
    				$$('#interval_dayForm').addClass('form-invalid');
    				$$('#interval_dayValidTxt').text('반복 주기일수를 1~999까지 입력해 주세요.');
    				return;
    			}
    			
    			resultObj.type = 'DAILY';
    			resultObj.interval = parseInt(this.repeatDayCount.value) + "";
    		}else if(this.repeatDay.value === '2'){ // 매일(평일)
    			resultObj.type = 'WEEKLY';
    			resultObj.interval = '1';
    			resultObj.recWeek = [ 
    				{dayOfTheWeek : "Monday"}
    				 ,{dayOfTheWeek : "Tuesday"}
    				 ,{dayOfTheWeek : "Wednesday"}
    				 ,{dayOfTheWeek : "Thursday"}
    				 ,{dayOfTheWeek : "Friday"}
    			];
    		}
    	}else if(this.repeatCycle.value === 'week') { // 매주
    		if(this.repeatWeekCount.value === "") {
    			$$('#interval_weekForm').addClass('form-invalid');
				$$('#interval_weekValidTxt').text('반복 주기일수를 입력해 주세요.');
    			return;
    		}
    		
    		if(parseInt(this.repeatWeekCount.value) < 1 || parseInt(this.repeatWeekCount.value) > 999) {
    			$$('#interval_weekForm').addClass('form-invalid');
				$$('#interval_weekValidTxt').text('반복 주기일수를 1~999까지 입력해 주세요.');
    			return;
    		}
    		
    		if(this.repeatWeekDay.length === 0) {
    			$$('#weekDayForm').addClass('form-invalid');
    			$$('#weekDayValidateTxt').text('적어도 하나의 요일은 필수입니다.');
    			return;
    		}
    		
    		resultObj.type = "WEEKLY";
    		resultObj.interval = parseInt(this.repeatWeekCount.value) + '';
    		
    		let weekArr = [];
    		
    		for(let i = 0; i < this.weekArrTable.length; i++) {
    			for(let j = 0; j < this.repeatWeekDay.length; j++) {
    				if(this.weekArrTable[i] === this.repeatWeekDay[j]) {
    					weekArr.push({dayOfTheWeek: this.weekArrTable[i]});
    				}
    			}
    		}
    		resultObj.recWeek = weekArr;
    		
    	}else if(this.repeatCycle.value === 'month') { // 매월
    		if(this.repeatMonthCount.value === "") {
    			$$('#repeatMonthCountForm').addClass('form-invalid');
        		$$('#repeatMonthCountValidTxt').text('월간격을 입력해 주세요.');
				return;
			}
			
			if(parseInt(this.repeatMonthCount.value) < 1 || parseInt(this.repeatMonthCount.value) > 999) {
				$$('#repeatMonthCountForm').addClass('form-invalid');
        		$$('#repeatMonthCountValidTxt').text('월간격을 1~999까지 입력해 주세요.');
				return;
			}
			
			resultObj.interval = parseInt(this.repeatMonthCount.value) + '';
			
    		if(this.repeatMonth.value === '1') {
    			if(this.repeatMonthCount2.value === '') {
    				$$('#repeatMonthCount2Form').addClass('form-invalid');
            		$$('#repeatMonthCount2ValidTxt').text('날짜를 입력해 주세요.');
    				return;
    			}
    			
    			if(parseInt(this.repeatMonthCount2.value) < 1 || parseInt(this.repeatMonthCount2.value) > 31) {
    				$$('#repeatMonthCount2Form').addClass('form-invalid');
            		$$('#repeatMonthCount2ValidTxt').text('날짜를 0~31 사이로 입력해 주세요.');
    				return;
    			}
    			
    			resultObj.type = 'MONTHLY';
    			resultObj.dayOfMonth = parseInt(this.repeatMonthCount2.value) + '';
    		}else if(this.repeatMonth.value === '2') {
    			resultObj.type = "RELATIVE_MONTHLY";
    			resultObj.dayOfTheWeekIndex = this.repeatMonthWeek;
    			resultObj.dayOfTheWeek = this.repeatMonthDay;
    		}
    	}else if(this.repeatCycle.value === 'year') { // 매년
    		if(this.repeatYear.value === '1') {
    			resultObj.type = 'YEARLY';
    			
    			const monthIndex = parseInt(this.repeatYearDate.value.split('-')[1]) - 1;
    			const monthName = this.monthArrTable[monthIndex];
    			resultObj.month = monthName;
    			
    			const dayIndex = parseInt(this.repeatYearDate.value.split('-')[2]) + '';
    			resultObj.dayOfMonth = dayIndex;
    		}else if(this.repeatYear.value === '2') {
    			resultObj.type = 'RELATIVE_YEARLY';
    			resultObj.month = this.repeatYearMonth;
    			resultObj.dayOfTheWeekIndex = this.repeatYearWeek;
    			resultObj.dayOfTheWeek = this.repeatYaerDay;
    		}
    	}
    	
    	// 반복설정
    	if(this.repeatCycle.value != '') {
    		if(this.repeatSetting.value === '2') { // 반복횟수 지정
    			if(this.repeatSettingCount.value === '') {
    				$$('#repeatSettingCountForm').addClass('form-invalid');
    	    		$$('#repeatSettingCountValidTxt').text('반복회수를 입력해 주세요.');
    				return;
    			}
    			
    			if(parseInt(this.repeatSettingCount.value) < 1 || parseInt(this.repeatSettingCount.value) > 999) {
    				$$('#repeatSettingCountForm').addClass('form-invalid');
    	    		$$('#repeatSettingCountValidTxt').text('반복회수를 0~999 사이로 입력해 주세요.');
    				return;
    			}
    			
    			resultObj.numberOfOccurrences = parseInt(this.repeatSettingCount.value) + '';
    		}else if(this.repeatSetting.value === '3') { // 종료일 지정
    			if(this.repeatSettingDate.value === '') {
    				this.openAlert('종료일을 지정해 주세요.');
    				return;
    			}

    			if(this.repeatSettingDate.value.split('-')[2] === '29' || this.repeatSettingDate.value.split('-')[2] === '30' || this.repeatSettingDate.value.split('-')[2] === '31') {
    				const confirmRes = await this.openConfirm('', '일부 '+`${this.repeatSettingDate.value.split('-')[2]}`+'일 보다 작은 월은 마지막 날에 되풀이 됩니다.');
    				
    				if(confirmRes.resultCd === '999999') {
    					return;
    				}
    			}
    			
    			resultObj.endDate = this.repeatSettingDate.value;
    		}
    	}

    	console.log('반복설정_resultObj = ', JSON.stringify(resultObj));

    	const result = { 
    		data : resultObj
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	return result;
    }
    
    /**
     * schedSettingToRepeatRadio1 load
     */
    async schedSettingToRepeatRadio1 () {
    	$('.schedule-regist-trigger').on('click', function() {

			const identify = $(this).data('anchor');
			const identifyWrap = $(this).closest('dl');

			if (!$(this).hasClass('is-active')) {
				$('.schedule-regist-trigger').each(function() {
					const falseIdentify = $(this).data('anchor');
					$(this).removeClass('is-active');
					$(`#${falseIdentify}`).stop().slideUp('150');
					const falseIdentifyWrap = $(this).closest('dl');
					falseIdentifyWrap.removeClass('is-wrap-active')
				})
				$(this).addClass('is-active');
				$(`#${identify}`).stop().slideDown('150');
				if (!identifyWrap.hasClass('is-wrap-active')) {
					identifyWrap.addClass('is-wrap-active');
				};
			} else {
				$(this).removeClass('is-active');
				$(`#${identify}`).stop().slideUp('150');
				identifyWrap.removeClass('is-wrap-active');
			}
		});
	
		$("#popDatepicker").datepicker({
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
			onSelect: async(date, dp) => {
				this.setRepeatSettingDate(date);
				$$('#repeatSettingDateText').html(date);
				$('#popDatepicker').datepicker('destroy');
			},
		}).datepicker("setDate", this.repeatSettingDate.value);
		
		$(document).on('click', '#popDatepicker > .ui-datepicker-next', function() {
			$('body').find('.datepicker-wrap').find('.ui-datepicker:visible table').hide('slide', {
				direction: 'left'
			}, 1).show('slide', {
				direction: 'right'
			}, 250)
		})

		$(document).on('click', '#popDatepicker > .ui-datepicker-prev', function() {
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
    }
    
    /**
     * schedSettingToYearRadio1 load
     */
    async schedSettingToYearRadio1 () {
    	$('.schedule-regist-trigger').on('click', function() {

			const identify = $(this).data('anchor');
			const identifyWrap = $(this).closest('dl');

			if (!$(this).hasClass('is-active')) {
				$('.schedule-regist-trigger').each(function() {
					const falseIdentify = $(this).data('anchor');
					$(this).removeClass('is-active');
					$(`#${falseIdentify}`).stop().slideUp('150');
					const falseIdentifyWrap = $(this).closest('dl');
					falseIdentifyWrap.removeClass('is-wrap-active')
				})
				$(this).addClass('is-active');
				$(`#${identify}`).stop().slideDown('150');
				if (!identifyWrap.hasClass('is-wrap-active')) {
					identifyWrap.addClass('is-wrap-active');
				};
			} else {
				$(this).removeClass('is-active');
				$(`#${identify}`).stop().slideUp('150');
				identifyWrap.removeClass('is-wrap-active');
			}
		});
	
		$("#datepicker_schedule03").datepicker({
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
			onSelect: async(date, dp) => {
				this.setRepeatYearDate(date);
				const [year, month, day] = date.split('-');
				$$('#repeatYearDateText').html(`${parseInt(month)}월 ${parseInt(day)}일`);
				$('#datepicker_schedule03').datepicker('destroy');
			},
		}).datepicker("setDate", this.repeatYearDate.value);
		
		const [year, month, day] = this.repeatYearDate.value.split('-');
		$$('#repeatYearDateText').html(`${parseInt(month)}월 ${parseInt(day)}일`);
		
		$(document).on('click', '#popDatepicker > .ui-datepicker-next', function() {
			$('body').find('.datepicker-wrap').find('.ui-datepicker:visible table').hide('slide', {
				direction: 'left'
			}, 1).show('slide', {
				direction: 'right'
			}, 250)
		})

		$(document).on('click', '#popDatepicker > .ui-datepicker-prev', function() {
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
    }
    
    async loadSpinnerWrap () {
		const spinnerWrap2 = document.querySelector('#spinner02')
		let observer2 = new IntersectionObserver(async(entries) => {
			entries.forEach(async(entry) => {
				const prevChild = entry.target.previousElementSibling;
				const nextChild = entry.target.nextElementSibling;

				if (entry.isIntersecting) {
					let targetName = entry.target.children[0].name;
					let targetValue = entry.target.children[0].defaultValue;

					console.log('targetName 2번째 = ', targetName);
					console.log('targetValue 2번째 = ', targetValue);
					if(targetName === 'items2s2') {
						this.repeatMonthDay = targetValue;
					}else if(targetName === 'items2s1'){
						this.repeatMonthWeek = targetValue;
					}

					$$('#items2Text').html(`${this.weekIndexTable[this.repeatMonthWeek]}주 ${this.weekTable[this.repeatMonthDay]}`);
					
					entry.target.querySelector('input').checked = true;
					entry.target.classList.add('center');
					if (prevChild != null) {
						prevChild.classList.add('outside');
					}
					if (nextChild != null) {
						nextChild.classList.add('outside');
					}
				} else {
					entry.target.classList.remove('center');
					if (prevChild != null) {
						prevChild.classList.remove('outside');
					}
					if (nextChild != null) {
						nextChild.classList.remove('outside');
					}
				}

			})
		}, {
			root: spinnerWrap2,
			rootMargin: `-50% 0px`,
			threshold: [0, 0.25, 0.5, 0.75, 1]
		});
		let box2 = spinnerWrap2.querySelectorAll(`.scroll-items`);
		box2.forEach(function(item) {
			observer2.observe(item)

		});
		
		const spinnerWrap3 = document.querySelector('#spinner03')
		let observer3 = new IntersectionObserver(async(entries) => {
			entries.forEach(async(entry) => {
				const prevChild = entry.target.previousElementSibling;
				const nextChild = entry.target.nextElementSibling;

				if (entry.isIntersecting) {
					let targetName = entry.target.children[0].name;
					let targetValue = entry.target.children[0].defaultValue;

					if(targetName === 'items3s1') {
						this.repeatYearMonth = targetValue;
					}else if(targetName === 'items3s2') {
						this.repeatYearWeek = targetValue;
					}else if(targetName === 'items3s3') {
						this.repeatYaerDay = targetValue;
					}
					
					$$('#items3Text').html(`${this.monthTable[this.repeatYearMonth]} ${this.weekIndexTable[this.repeatYearWeek]}주 ${this.weekTable[this.repeatYaerDay]}`);
					
					entry.target.querySelector('input').checked = true;
					entry.target.classList.add('center');
					if (prevChild != null) {
						prevChild.classList.add('outside');
					}
					if (nextChild != null) {
						nextChild.classList.add('outside');
					}
				} else {
					entry.target.classList.remove('center');
					if (prevChild != null) {
						prevChild.classList.remove('outside');
					}
					if (nextChild != null) {
						nextChild.classList.remove('outside');
					}
				}
			})
		}, {
			root: spinnerWrap3,
			rootMargin: `-50% 0px`,
			threshold: [0, 0.25, 0.5, 0.75, 1]
		});
		let box3 = spinnerWrap3.querySelectorAll(`.scroll-items`);
		box3.forEach(function(item) {
			observer3.observe(item)

		});
    }
    
    /**
     * 공통 팝업 호출
     */
    async openAlert (title, message) {
		await CmmUtils.alert(title, message,{
			btnLabel : '확인',
			useCancelBtn : false,
			status: 'caution'
		});
	}
    
    async openConfirm (title, message) {
    	const result = await CmmUtils.confirm(title, message,{
            okLabel : '확인',
            noLabel : '취소'
        });
    	
    	return result;
    }
   
    destroy () {
    	$(document).off('click', '#popDatepicker > .ui-datepicker-next');
    	$(document).off('click', '#popDatepicker > .ui-datepicker-prev');
        super.destroy(this);
    }
}
