/*************************************************************************
* @ 서비스경로 : DSCMNG21M
* @ 파일명      : DSCMNG21M 일정관리 > 영업 캘린더 > 일정 등록
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

export default class DSCMNG21M extends BaseModule {
	
    constructor(elem, data) {
    	super(elem);
    	
    	/**
    	 * 시간
    	 */
    	const now = new Date();
    	let today = now.toISOString().slice(0, 10); // 오늘 날짜
    	
    	// 시작 시간 구하기
    	const startDay = new Date(now.getTime() + 60*60*1000); //now.getTime() + 60*60*1000
    	let startHours = startDay.getHours();
    	let startMinutes = startDay.getMinutes();
    	let startPeriod = startHours >= 12 ? "1" : "2" // 오후, 오전
    	startHours = startHours % 12;
    	startHours = startHours === 0 ? 12 : startHours;0
    	
    	// 종료 시간 구하기
    	const endDay = new Date(now.getTime() + 2*60*60*1000);
    	let endHours = endDay.getHours();
    	let endMinutes = endDay.getMinutes();
    	let endPeriod = endHours >= 12 ? "1" : "2" // 오후, 오전
    	endHours = endHours % 12;
    	endHours = endHours === 0 ? 12 : endHours;
    	
    	// 이전화면에서 전달받은 파라미터
    	if(data != "" && data.selectDate != "-" && data.selectDate != undefined) {
    		today = data.selectDate;
    	}
    	
    	// 수신만기 상세에서 온 경우
    	if(data.mode === 'xpr' && data.mode != undefined) {
    		$('#allDayYn').prop('checked', true);
    		$$('#allDayYnForm1').hide();
	    	$$('#allDayYnForm2').hide();
	    	$$('#bodyTextCnt').html(data.memo.length + '/300자');
    	}
    	
    	// 선택한 날짜
    	[this.selectDate, this.setSelectDate] = this.useState('selectDate', today);
    	
    	// 제목
    	[this.subject, this.setSubject] = this.useState('subject', data.mode != undefined && data.mode === 'xpr' ? data.subject : '');
    	
    	// 하루종일 구분값
    	[this.allDayYn, this.setAllDayYn] = this.useState('allDayYn', data.mode != undefined && data.mode === 'xpr' ? 'Y' : 'N');
    	
    	// 시작 일시 관련
    	[this.startDay, this.setStartDay] = this.useState('startDay', today);	// 날짜
    	[this.startAmpm, this.setStartAmpm] = this.useState('startAmpm', startPeriod);	// 오후/오전
    	[this.startHour, this.setStartHour] = this.useState('startHour', startHours);	// 시간 (12시간체계)
    	[this.startMinutes, this.setStartMinutes] = this.useState('startMinutes', '00'); // 분
    	
    	// 종료 일시 관련
    	[this.endDay, this.setEndDay] = this.useState('endDay', today); // 날짜
    	[this.endAmpm, this.setEndAmpm] = this.useState('endAmpm', endPeriod); // 오후/오전
    	[this.endHour, this.setEndHour] = this.useState('endHour',  endHours); // 시간 (12시간체계)
    	[this.endMinutes, this.setEndMinutes] = this.useState('endMintes', '00'); // 분
    
    	// 장소
    	[this.location, this.setLocation] = this.useState('location', '');
    	
    	// 반복
    	[this.recurrence, this.setRecurrence] = this.useState('recurrence', []);
    	
    	// 공유 받을 직원
    	[this.recRa, this.setRecRa] = this.useState('recRa', '');
    	[this.checkRecRa, this.setCheckRecRa] = this.useState('checkRecRa', {});
    	
    	// 메모
    	[this.bodyText, this.setBodyText] = this.useState('bodyText', data.memo != undefined && data.memo != '' ? data.memo : '');
    	
    	// 푸쉬 알림 정보
    	[this.pushInfo, this.setPushInfo] = this.useState('pushInfo', {alarmType: '0'});
    	
    	// 월, 요일, 순서
    	this.weekTable = {Sunday : "일요일",Monday : "월요일",Tuesday : "화요일",Wednesday : "수요일",Thursday : "목요일",Friday : "금요일",Saturday : "토요일"};
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
    }

    init () {
    	super.init(this);
    	
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
    	
    	this.register();
    }
    
    register() {
    	this.load();
    	
    	this.bind('subject', $$('#subject'), 'input');	// 제목
    	this.bind('location', $$('#location'), 'input'); // 장소
   
    	this.bind('startHour', $$('#startHour'), 'input'); // 시작 시간
    	this.bind('startMinutes', $$('#startMinutes'), 'input'); // 시작 분
    	
    	this.bind('endHour', $$('#endHour'), 'input'); // 종료 시간
    	this.bind('endMinutes', $$('#endMinutes'), 'input'); // 종료 분
    	
    	this.bind('bodyText', $$('#bodyText'), 'input'); // 메모
    	
    	$$('#bodyText').on('keyup', async (e) => {
    		$$('#bodyTextCnt').html(e.target.value.length + '/300자');
    	});
    	
    	// 하루종일 토글 버튼
    	$$('#allDayYn').on('change', async (evnt, elem) => {
    		if(evnt.target.checked) {
    			this.setAllDayYn('Y');
    			
    			$('[data-anchor="dp02"]').closest('dl').removeClass('is-wrap-active');
    			$('[data-anchor="dp02"]').removeClass('is-active');
    			$('#dp02').stop().slideUp('150');
    			
    			$('[data-anchor="dp04"]').closest('dl').removeClass('is-wrap-active');
    			$('[data-anchor="dp04"]').removeClass('is-active');
    			$('#dp04').stop().slideUp('150');
    			
    	    	$$('#allDayYnForm1').hide();
    	    	$$('#allDayYnForm2').hide();
    	    	
    		}else {
    			this.setAllDayYn('N');
    			
    			$$('#allDayYnForm1').css({'display': 'inline-block'});
    			$$('#allDayYnForm2').css({'display': 'inline-block'});
    		}
    	});
 
    	// 공유 직원 삭제 버튼
    	$(document).on('click', '.member-delete', async(e) => {
    		const obj = this.checkRecRa.value;
    		delete obj[e.target.closest('button').getAttribute('data-id')];
    		this.setCheckRecRa(obj);
    		e.target.closest('button').remove();
    	});
    	
    	// 반복 설정 팝업 버튼
    	$$('#recurrenceBtn').on('click', async () => await this.handleOpenDSCMNG22P());
    	
    	// 일정 공유 팝업 버튼
    	$$('#prlmShareBtn').on('click', async () => await this.handleOpenDSCMNG25P());
    	
    	// 알림 설정 팝업 버튼
    	$$('#pushBtn').on('click', async () => await this.handleOpenDSCMNG23P());
    	
    	// 등록 버튼
//    	$$('#regBtn').on('click', async () => await this.registerCal());
    	
    	// 취소 버튼
//    	$$('#cancelBtn').on('click', async () => await this.cancelCal());
    	
    	const cancelCallback = () => {
    		this.cancelCal();
    	}
    	const registerCallback = () => {
    		this.registerCal()
    	}
    	this.registerCallback('touchend', $$('#layoutBtn1'), cancelCallback);
    	this.registerCallback('touchend', $$('#layoutBtn2'), registerCallback);
    	// 제목 입력
    	const subJectKeyup = async () => {
    		$$('#subJectForm').removeClass('form-invalid');
    		$$('#subJectValidTxt').text('');
    	}
    	this.registerCallback('keyup', $$('#subject'), subJectKeyup);
    }
    
    async load () {
    	await this.schedSetting();
    	await this.dateSetting();
    }
    
    /**
     * 화면 데이터 load
     */
    async dateSetting() {
    	/**
    	 * 화면에 일자 넣기 (ex. 01월 01일 수요일 )
    	 */
    	// 시작일자
    	const startDayString = await this.dayToString(this.startDay.value);
    	$$('#startFormatDay').html(startDayString);
    	
    	// 종료일자
    	const endDayString = await this.dayToString(this.endDay.value);
    	$$('#endFormatDay').html(endDayString);
    	
    	/**
    	 * 화면에 시간 넣기 (ex. 오전 01시 01분)
    	 */
    	// 시작시간
    	$$('#startFormatAmpm').html(this.startAmpm.value === '1' ? '오후' : '오전');
    	$$('#startFormatHour').html(this.startHour.value + '시');
    	$$('#startFormatMinutes').html(this.startMinutes.value === '00' ? '' : this.startMinutes.value + '분');
    	
    	// 종료시간
    	$$('#endFormatAmpm').html(this.endAmpm.value === '1' ? '오후' : '오전');
    	$$('#endFormatHour').html(this.endHour.value + '시');
    	$$('#endFormatMinutes').html(this.endMinutes.value === '00' ? '' : this.endMinutes.value + '분');
    	
    	/**
    	 * 오전/오후 라디오 버튼
    	 */
    	$('input[name="startAmpm"][value="'+ this.startAmpm.value+'"]').prop('checked', true);
    	$('input[name="endAmpm"][value="'+ this.endAmpm.value+'"]').prop('checked', true);
    	
    	/**
    	 * 입력박스, 라디오 이벤트처리
    	 */
    	$$('#startHour').value(this.startHour.value);
    	$('#startHour').on('input', (evnt, elemt) => {
    		this.setStartHour(evnt.target.value);
    		$$('#startFormatHour').html(evnt.target.value + '시');
    	});
    	
    	$$('#startMinutes').value(this.startMinutes.value);
    	$('#startMinutes').on('input', (evnt, elemt) => {
    		this.setStartMinutes(evnt.target.value);
    		if(evnt.target.value != "" && evnt.target.value != '00' && evnt.target.value != '0') {
    			$$('#startFormatMinutes').html(evnt.target.value + '분');    			
    		}else {
    			$$('#startFormatMinutes').html('');    
    		}
    	});
    	
    	$$('#endHour').value(this.endHour.value);
    	$('#endHour').on('input', (evnt, elemt) => {
    		this.setEndHour(evnt.target.value);
    		$$('#endFormatHour').html(evnt.target.value + '시');
    	});
    	
    	$$('#endMinutes').value(this.endMinutes.value);
    	$('#endMinutes').on('input', (evnt, elemt) => {
    		this.setEndMinutes(evnt.target.value);
    		if(evnt.target.value != "" && evnt.target.value != '00' && evnt.target.value != '0') {
    			$$('#endFormatMinutes').html(evnt.target.value + '분');    			
    		}else {
    			$$('#endFormatMinutes').html('');    
    		}
    	});
    	
    	$$(document).findByName('startAmpm', 'click', (evnt, elemt) => {
    		this.setStartAmpm(elemt.value);
    		$$('#startFormatAmpm').html(elemt.value === '1' ? '오후 ' : '오전 ');
    	});
    	
    	$$(document).findByName('endAmpm', 'click', (evnt, elemt) => {
    		this.setEndAmpm(elemt.value);
    		$$('#endFormatAmpm').html(elemt.value === '1' ? '오후 ' : '오전 ');
    	});
    }
  
    /**
     * 캘린더 load
     */
    async schedSetting () {
    	$('.schedule-regist-trigger_dscmng21').on('click', function() {

			const identify = $(this).data('anchor');
			const identifyWrap = $(this).closest('dl');

			if (!$(this).hasClass('is-active')) {
				$('.schedule-regist-trigger_dscmng21').each(function() {
					const falseIdentify = $(this).data('anchor');
					
					console.log('falseIdentify :', falseIdentify);
					
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
		$("#datepicker_schedule01").datepicker({
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
				this.setStartDay(date);
				const startDayString = await this.dayToString(this.startDay.value);
		    	$$('#startFormatDay').html(startDayString);
		    	
		    	$('[data-anchor="dp01"]').closest('dl').removeClass('is-wrap-active');
		    	$('[data-anchor="dp01"]').removeClass('is-active');
		    	$('#dp01').stop().slideUp('150');
			},
		}).datepicker("setDate", this.selectDate.value);

		$("#datepicker_schedule02").datepicker({
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
				this.setEndDay(date);
				const endDayString = await this.dayToString(this.endDay.value);
		    	$$('#endFormatDay').html(endDayString);
		    	
		    	$('[data-anchor="dp03"]').closest('dl').removeClass('is-wrap-active');
		    	$('[data-anchor="dp03"]').removeClass('is-active');
		    	$('#dp03').stop().slideUp('150');
			},
		}).datepicker("setDate", this.selectDate.value);

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
    }
    
    /**
     * 반복 설정 팝업
     */
    async handleOpenDSCMNG22P(target) {
    	const router = 'dscmng22p';

    	const startHourAfter = this.startHour.value != '00' && this.startAmpm.value === '1' ? parseInt(this.startHour.value) + 12 : parseInt(this.startHour.value);
    	const startFormattedHour = startHourAfter.toString().padStart(2, '0');
    	const startFormattedMinute = this.startMinutes.value.toString().padStart(2, '0');
    	
    	const endHourAfter = this.endHour.value != '00' && this.endAmpm.value === '1' ? parseInt(this.endHour.value) + 12 : parseInt(this.endHour.value);
    	const endFormattedHour = endHourAfter.toString().padStart(2, '0');
    	const endFormattedMinute = this.endMinutes.value.toString().padStart(2, '0');
    	
    	await GlobalApp.popupUtils.openPopup(router, {
			params: {
				startDate: `${startFormattedHour}:${startFormattedMinute}`
				, endDate: `${endFormattedHour}:${endFormattedMinute}`
				, alldayYn: this.allDayYn.value
				, recRecurrence: this.recurrence.value
			},
            showCloseBtn : true,
			btn2Label : '확인',
			btn2IsMain : true,
			onYes : async(result) => {
				// 반복 결과값 저장
				this.setRecurrence([result.data]);
				
				// 화면 Text 그리기
				const repeatText = await this.recurrenceTxt(result.data);
				$$('#recurrenceTxt').html(repeatText);
			}, 
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    }
    
    /**
     * 일정 공유 팝업 
     */
    async handleOpenDSCMNG25P() {
    	const router = 'dscmng25p';
    	
    	await GlobalApp.popupUtils.openPopup(router, {
			params: {},
			type : 'full',
            showCloseBtn : true,
			btn2Label : '선택',
			btn2IsMain : true,
			onYes : async(result) => {
				console.log('onYes Result : ', result);
				
				let obj = result.data;
				let subObj = this.checkRecRa.value;
				let reSubObj = {};
				
				if(Object.keys(obj).length > 0) {
					// 기존 객체에 추가된 직원 데이터 계속 넣어주기
					for(const key in obj) { // 체크한 직원 정보
						let dupChkMember = false; // 중복여부
						
						if(Object.keys(subObj).length > 0) {
							for(const subKey in subObj) { // 이미 기존에 체크한 직원 정보
								if(key === subKey) {
									dupChkMember = true;										
								}
							}
						}
						
						if(!dupChkMember) {
							this.selPrlmFormTxt(obj[key]);
							
							reSubObj = {
									...subObj,
									...reSubObj
									, [key] : {
										prlmNm: obj[key].prlmNm
										, deptNm: obj[key].deptNm
										, posiNm: obj[key].posiNm
										, email: key
									}
							}
						}
					}
					
					this.setCheckRecRa(reSubObj);
				}
				console.log('최종결과값 = ', this.checkRecRa.value);
			}, 
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    }
    
    /**
     * 알림 설정 팝업
     */
    async handleOpenDSCMNG23P () {
	const router = 'dscmng23p';
    	
    	await GlobalApp.popupUtils.openPopup(router, {
			params: {
				alarmType: this.pushInfo.value.alarmType
				, alarmTime: this.pushInfo.value.alarmTime
				, alarmText: this.pushInfo.value.alarmText
				, allDayYn: this.allDayYn.value
			},
            showCloseBtn : true,
			btn2Label : '선택',
			btn2IsMain : true,
			onYes : async(result) => {
				console.log('onYes Result : ', result);
				
				this.setPushInfo({
					alarmType: result.data.alarmType
					, alarmTime: result.data.alarmTime
					, alarmText: result.data.alarmText
				});
				
				$$('#psuhTxt').html(result.data.alarmText);
			}, 
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    }
    
    /**
     * 공유 직원 목록 텍스트 생성
     */
    async selPrlmFormTxt(obj) {
    	let str = '';
    	
    	str += '<button type="button" class="btn-xsmall btn-outlined btn-round member-delete" data-id='+ obj.email + '>';
		str += '<span>'+ obj.prlmNm + ' ' + obj.posiNm + '(' + obj.deptNm + ')' + '</span>';
		str += '<i class="ico-close-16"></i>';
		str += '</button>';
    	
    	$$('#selPrlmForm').append(str);
    }
    
    /**
     * 반복설정 정보 텍스트 생성
     */
    async recurrenceTxt(obj) {
    	let str = "";
    	
		if(obj.delYn != "Y") {
			if(obj.type === 'DAILY') {
				str += "";
				str += ""+obj.interval+"일마다";
			} else if(obj.type === 'WEEKLY') {
				str += "";
				str += ""+obj.interval+"주마다 ";

				for(var i=0;i<obj.recWeek.length;i++) {
					if(i > 0) {
						str += ",";
					}
					str += this.weekTable[obj.recWeek[i].dayOfTheWeek];
				}
				str += "에";
			} else if(obj.type === 'MONTHLY') {
				str += "";
				str += obj.interval+"개월마다, "+obj.dayOfMonth+"일";
			} else if(obj.type === 'YEARLY') {
				str += "매년 ";
				str += this.monthTable[obj.month]+" "+obj.dayOfMonth+"일";
			} else if(obj.type === 'RELATIVE_MONTHLY') {
				str += "";
				str += obj.interval+"개월마다, "+ this.weekIndexTable[obj.dayOfTheWeekIndex] + " 주 "+ this.weekTable[obj.dayOfTheWeek]+"";
			} else if(obj.type === 'RELATIVE_YEARLY') {
				str += "";
				str += this.monthTable[obj.month]+" "+ this.weekIndexTable[obj.dayOfTheWeekIndex] + " 주 "+ this.weekTable[obj.dayOfTheWeek]+"";
			}

			if(obj.numberOfOccurrences) {
				str += ", "+obj.numberOfOccurrences+"회 반복";
			} else if(obj.endDate) {
				str += ", "+obj.endDate+" 까지";
			} else {
				str += ""; // "(종료일 지정안함)"
			}
		} else {
			str = "반복없음";
		}
		
		return str;
    }
    
    /**
     * 화면에 보여줄 시작/종료 format 변경 (날짜)
     */
    async dayToString(value) {
    	const dateObj = new Date(value);
    	const options = { month: '2-digit', day: '2-digit', weekday: 'long' };
    	const formattedDate = dateObj.toLocaleDateString('ko-KR', options);
    	
    	const [month, day, weekday] = formattedDate.split('.').map((s) => s.trim());
    	const finalResult = `${month}월 ${day}일 ${weekday}`;
    	
    	return finalResult;
    }
    
    /**
     * 등록버튼
     */
    async registerCal () {
    	if(this.subject.value === "") {
    		$$('#subJectForm').addClass('form-invalid');
    		$$('#subJectValidTxt').text('필수 항목입니다.');
    		setTimeout(() => {
    			$('#subject').focus();
			},10);
    		return;
    	}
    	
    	if(this.subject.value.length > 30) {
    		$$('#subJectValidTxt').text('제목은 30자를 초과할 수 없습니다.');
    		setTimeout(() => {
    			$('#subject').focus();
			},10);
    		return;
    	}

    	if(this.allDayYn.value === 'N' && (this.startHour.value === "" || this.startMinutes.value === "")) {
    		this.openAlert('', '시작 시간(분)을 입력해 주세요.');
    		return;
    	}
    	
    	if(this.allDayYn.value === 'N' && (this.endHour.value === "" || this.endMinutes.value === "")) {
    		this.openAlert('', '종료 시간(분)을 입력해 주세요.');
    		return;
    	}
    	
    	if(this.allDayYn.value === 'N' && (parseInt(this.startHour.value) === 0 || parseInt(this.startHour.value) > 12)) {
    		this.openAlert('', '시작 시간을 1~12 사이로 입력해 주세요.');
    		return;
    	}
    	
    	if(this.allDayYn.value === 'N' && (parseInt(this.startMinutes.value) > 60)) {
    		this.openAlert('', '시작 분을 0~59 사이로 입력해 주세요.');
    		return;
    	}
    	
    	if(this.allDayYn.value === 'N' && (parseInt(this.endHour.value) === 0 || parseInt(this.endHour.value)) > 12) {
    		this.openAlert('', '종료 시간을 1~12 사이로 입력해 주세요.');
    		return;
    	}
    	
//    	if(this.allDayYn.value === 'N' && (this.startAmpm.value === '2' && (parseInt(this.startHour.value) === 12))) {
//    		this.openAlert('', '오전 12시는 설정 할 수 없습니다.');
//    		return;
//    	}
    	
//    	if(this.allDayYn.value === 'N' && (this.endAmpm.value === '2' && (parseInt(this.endHour.value) === 12))) {
//    		this.openAlert('', '오전 12시는 설정 할 수 없습니다.');
//    		return;
//    	}
    	
    	if(this.allDayYn.value === 'N' && (parseInt(this.endMinutes.value) > 60)) {
    		this.openAlert('', '종료 분을 0~59 사이로 입력해 주세요.');
    		return;
    	}
    	
    	let a = '';
    	let b = '';
    	
    	if(this.allDayYn.value === 'N') {
    		let startHours = this.startHour.value;
    		let endHours = this.endHour.value;
    		
    		if(this.startAmpm.value === '1' && parseInt(startHours) !== 12) {
    			startHours = parseInt(startHours) + 12;
    		}else if(this.startAmpm.value === '2' && parseInt(startHours) === 12) {
    			startHours = 0;
    		}
    		
    		if(this.endAmpm.value === '1' && parseInt(endHours) !== 12) {
    			endHours = parseInt(endHours) + 12;
    		}else if(this.endAmpm.value === '2' && parseInt(endHours) === 12) {
    			endHours = 0;
    		}
    		
    		a = this.startDay.value.split('-').join('') + startHours.toString().padStart(2, '0') + this.startMinutes.value.toString().padStart(2, '0') + '00';
    		b = this.endDay.value.split('-').join('') + endHours.toString().padStart(2, '0') + this.endMinutes.value.toString().padStart(2, '0') + '00';
    		
    	}else {
    		a = this.startDay.value.split('-').join('') + '000000';
    		b = this.endDay.value.split('-').join('') + '000000';
    	}
    	
    	if(a > b) {
			this.openAlert('', '시작일시를 종료일시보다 작게 입력해 주세요.');
			return;
		}
    	
    	if(this.recurrence.value.length > 0 && (new Date(this.startDay.value).getTime() < new Date(this.endDay.value).getTime())) {
    		this.openAlert('', '반복 설정을 할 경우, 종료일자는 시작일자와 동일해야 합니다.');
			return;
    	}
    	
    	const arlarmObj = this.pushInfo.value;
    	
    	if(this.allDayYn.value === 'Y' && (arlarmObj.alarmType !== "0" && arlarmObj.alarmType !== "5")) {
    		this.openAlert('', "하루종일로 설정할 경우, 알림은 '없음'과 '직접설정'만 가능합니다.");
    		return;
    	}
    	
    	// 일정공유 데이터 가공
    	let afterCheckRecRa = [];
    	
    	if(Object.keys(this.checkRecRa.value).length > 0) {
	    	for(const key in this.checkRecRa.value) {
	    		afterCheckRecRa.push({
	    			address: this.checkRecRa.value[key].email
	    			, title: this.checkRecRa.value[key].prlmNm + ' (' + this.checkRecRa.value[key].deptNm + ') ' + '<' + this.checkRecRa.value[key].email + '>'
	    			, name: this.checkRecRa.value[key].prlmNm + ' (' + this.checkRecRa.value[key].deptNm + ')'
	    		});
	    	}
	    	
	    	this.setRecRa(afterCheckRecRa);
    	}else {
    		this.setRecRa([]);
    	}
    	
    	console.log('알림 설정 데이터 = ', this.pushInfo.value);
    	
    	this.setBodyText(this.bodyText.value.replaceAll(/\n/g, "<br/>"));
    	
    	const param = {
    			subject: this.subject.value 	// 제목
    			, itemId:	''
    			, mode: 'P' 						// P:개인, D:부서
    			, startDate: a
    			, endDate: b
    			, recurringYn: 'N'				// 
    			, body: this.bodyText.value	// 메모
    			, location: this.location.value	// 장소
    			, importance: 'Normal' 		// 중요도
    			, alldayYn: this.allDayYn.value// 하루종일 여부
    			, sensitivity: 'Private' 			// 공개여부
    			, recRecurrence: this.recurrence.value	//반복설정
    			, recRa: this.recRa.value			// 공유자
    			, pushInfo: this.pushInfo.value    // 알림설정
    	}
    	
    	console.log('최종값 = ', param);
    	const result = await ApiUtils.sendPost('/api/dscmng/saveSchd.json', param);
    	
    	if(result.resultCode === '000000') {
    		toastr.success('','저장 되었습니다.');
    		
  			if(this.pushInfo.value.alarmType !== '0') {
  				await ApiUtils.sendPost('/api/cmm/insertFunctionVstpeLog.json', {menuNo: 'DSCMNG10M', majFuncCd: '04'});
  			}
    		router.navigate('dscmng10m', {selectDate: this.selectDate.value});
    	}else {
    		await this.openAlert('', result.resultMessage);
    		// router.navigate('dscmng10m', {});
    	}
    }
    
    /**
     * 취소버튼
     */
    async cancelCal () {
    	router.navigate('dscmng10m', {});
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
        super.destroy(this);
        $(document).off('click', '.datepicker-unfold button');
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
    }
}
