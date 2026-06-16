/*************************************************************************
* @ 서비스경로 : IVINF30M
* @ 파일명      : IVINF30M.js 투자정보 > 경제캘린더 
* @ 작성자      : 90195467
* @ 작성일      : 2024-01-15 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-01-15             이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF30M extends BaseModule {
	constructor(elem) {
		super(elem);
		
		// 국가별 체크박스 상태값 저장
		[this.korChk, this.setKorChk] = this.useState('korChk', 'Y');
 		[this.usaChk, this.setUsaChk] = this.useState('usaChk', 'Y');
		[this.chnChk, this.setChnChk] = this.useState('chnChk', 'Y');
		[this.jpnChk, this.setJpnChk] = this.useState('jpnChk', 'Y');
		[this.euChk, this.setEuChk] = this.useState('euChk', 'Y');
		
		[this.today, this.setToday] = this.useState('today', new Date());
		
		// 선택한 날짜
		[this.selectedDate, this.setSelectedDate] = this.useState('selectedDate', '');
		// 검색 시작 일자
		[this.searchStartDate, this.setSearchStartDate] = this.useState('searchStartDate', '');
		// 검색 종료 일자
		[this.searchEndDate, this.setSearchEndDate] = this.useState('searchEndDate', '');
		
		// 조회한 데이터 저장
		[this.dataList, this.setDataList] = this.useState('dataList', {});
		
		this.datepickerWeekend = null;
		
		// 스크롤 사용여부(목록에서 상세로 올 경우에만 Y)
		[this.scrollYn, this.setScrollYn] = this.useState('scrollYn', 'Y');
    }

	init () {
		// 캘린더 스와이프 이벤트 해제
		$(document).off('click', '.datepicker-unfold button');
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
    	
        super.init(this);
        // 조회
        this.load();
		
        // 캘린더 펼치기 버튼
        $$('#openSchedule').on('click', async() => this.handleOpenSchedule());
        
        // 검색 버튼
        $$('#searchBtn').on('click', async(e) => this.handleSaerchRouter(e));
      
    }
	
	async load() {
		await this.init_setting();
		await this.init_schedule();
		await this.handleGetList();
	}
	
	/**
	 * 경제지표 월간 목록 조회
	 */
	async handleGetList() {
		// 목록 데이터 조회
		const param = {
				searchStartDate: this.searchStartDate.value
				, searchEndDate: this.searchEndDate.value
		}
		const res = await ApiUtils.sendPost('/pb/api/ivinf/getEcoInd.json', param);
		
		if(res.resultCode === '000000') {
			if(res.data.ecoIndList.length >= 0) {
				const data = res.data.ecoIndList;
				
				this.setScrollYn('Y');
				
				// 데이터 가공처리
				// 같은 일자끼리 그룹화
		    	const groupData = data.reduce((acc, item) => {
		    		if(!acc[item.ecinBasDt]) {
		    			acc[item.ecinBasDt] = [];
		    		}
		    		acc[item.ecinBasDt].push(item);
		    		return acc;
		    	}, {});
		    	
		    	this.setDataList(groupData);

				// 마크 생성
		    	await this.schedMark(this.searchStartDate.value);
			}
		}else {
			await this.openAlert('', res.resultMessage);
		}
	}
	
	/**
	 * 경제지표 주간 목록 조회
	 */
	async handleDetail(startDate, endDate) {
		// 목록 데이터 조회
		const param = {
				searchStartDate: startDate.replaceAll('-', '')
				, searchEndDate: endDate.replaceAll('-', '')
		}
		const res = await ApiUtils.sendPost('/pb/api/ivinf/getEcoInd.json', param);
		
		if(res.resultCode === '000000') {
				const ecoIndList = res.data.ecoIndList;
				const date = new Date(startDate);
				let groupData = [];
				let html = "";
				
				for(let i = 0; i < 7; i++) {
					if(!groupData[date.toISOString().split('T')[0]]) {
						groupData[date.toISOString().split('T')[0]] = [];
					}
					
					if(ecoIndList.length > 0) {
						for(let j = 0; j < ecoIndList.length; j++) {
							if(date.toISOString().split('T')[0] === ecoIndList[j].ecinBasDt) {
								groupData[date.toISOString().split('T')[0]].push(ecoIndList[j]);
							}
						}						
					}
					
					date.setDate(date.getDate() + 1);
				}
				
				this.setDataList(groupData);
				
		    	// html 생성
		    	Object.entries(groupData).map(([date, items]) => {
		    		const subDate = new Date(date);
		    		const dayOfYear = subDate.getFullYear();
		    		const dayOfMonth = subDate.getMonth() + 1;
		    		const dayOfday = subDate.getDate();
		    		const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'long'}).format(subDate);

		    		// 요일 표시 (당일 체크)
		    		if(date === this.today.value.toISOString().split('T')[0]) {
		    			html += '<div class="eco-wrap py40">';
		    			html += '<div class="tags-wrap mb16">';
		    			html += '<div class="tags tags-medium tags-white tags-round fc-blue-600">오늘</div>';
		    			if(date === this.selectedDate.value) {
		    				html += '<div class="tags tags-medium tags-lightBlue" id="targetDate">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';
		    			}else {
		    				html += '<div class="tags tags-medium tags-lightBlue">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';
		    			}
		    			html += '</div>';
		    		}else {
		    			// (해당 요일에 일정 존재 유무)
		    			if(items.length > 0) {
		    				if(date === this.selectedDate.value) {
		    					html += '<div class="eco-wrap py40" id="targetDate">';
		    					/*html += '<div class="tags tags-medium tags-white" id="targetDate">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';*/
		    				}else {
		    					html += '<div class="eco-wrap py40">';
		    				}
		    				html += '<div class="tags-wrap mb16">';
		    				html += '<div class="tags tags-medium tags-white">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';
			    			html += '</div>';
		    			}else {
		    				html += '<div class="eco-wrap mb24">';
		    				html += '<div class="tags-wrap">'
		    				if(date === this.selectedDate.value) {
		    					html += '<div class="tags tags-medium tags-disabled_bg" id="targetDate">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';
		    				}else {
		    					html += '<div class="tags tags-medium tags-disabled_bg">'+`${dayOfYear}년 ${dayOfMonth}월 ${dayOfday}일 ${dayOfWeek}`+'</div>';
		    				}
			    			html += '</div>';
		    			}
		    		}
		    		
		    		for(let i = 0; i < items.length; i++) {
		    			let item = items[i];
		    			let flagCountry = item.nacd === 'SK' ? ['한국', 'tags-kr', 'flag-kr'] : item.nacd === 'US' ? ['미국', 'tags-us', 'flag-us'] : item.nacd === 'CH' ? ['중국', 'tags-cn', 'flag-cn'] : item.nacd === 'JN' ? ['일본', 'tags-jp', 'flag-jp'] : ['유럽', 'tags-eu', 'flag-eu'];
		    			
		    			if((this.korChk.value === 'N' && item.nacd === 'SK') 
		    				|| (this.usaChk.value === 'N' && item.nacd === 'US')
		    				|| (this.chnChk.value === 'N' && item.nacd === 'CH')
		    				|| (this.jpnChk.value === 'N' && item.nacd === 'JN')
		    				|| (this.euChk.value === 'N' && (item.nacd != 'SK' && item.nacd != 'US' && item.nacd != 'CH' && item.nacd != 'JN'))) {
		    				 
		    				continue;
		    			}

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
		    	});
		    	$$('#listForm').html(html);
		    	
		    	await this.schedDetailMark(startDate, endDate);
		    	
		    	// 상세 화면 노출
				$$('#listForm').show();
				
				// 클릭한 날짜로 이동
				this.goScroll();					
		}else {
			await this.openAlert('', res.resultMessage);
		}
	}
	
	async goScroll() {
		if(this.scrollYn.value === 'Y') {
			setTimeout(() => {
				const header = document.getElementById('basicHeader');
				const topMain = document.querySelector('.datepicker-collapsed');
				const target = document.getElementById("targetDate");

				window.scrollTo({top : target.offsetTop - (header.offsetHeight + topMain.offsetHeight), behavior: "smooth"});
			}, 50);
		}else {
			setTimeout(() => {
				window.scrollTo({top :  0, behavior: "smooth"});
			}, 50);
		}
		
	}
	
	/**
	 * 화면 세팅
	 */
	async init_setting() {
		// 최초에는 리스트 목록 영역 hide 처리
		$$('#listForm').hide();
		
		// 선택한 날짜와 주간일자를 오늘 기준으로 세팅
		const today = new Date();
	
    	let month = today.getMonth() + 1;
    	month = (month > 9) ? ''+month : '0' + month;
    	
		const startDate = today.getFullYear()+month+'01';
		const lastDay = new Date(today.getFullYear(), month, 0).getDate();
		const endDate = today.getFullYear()+month+lastDay;
		
		this.setSelectedDate(today.toISOString().split('T')[0]);
		this.setSearchStartDate(startDate);
    	this.setSearchEndDate(endDate);
	}
	
	/**
	 * 캘린더 생성 및 이벤트 적용
	 */
	async init_schedule() {
		let datepicker;
		let selectDay;
		let selectWeek;
        let currentDate;
		
		const g = this;
		this.datepickerWeekend = {
				init: function() {
					datepicker = $('.datepicker-weekend');
					selectDay = datepicker.find('[aria-current=true]');
					selectWeek = selectDay.closest('tr');
					selectWeek.addClass('thisWeek')
				},
				select: function() {
					setTimeout(function() {
                        if (datepicker.find('.ui-datepicker-other-month').hasClass('ui-datepicker-current-day')) {
                            $("#datepicker_schedule").datepicker('setDate',currentDate);
                        }
						datepicker.addClass('datepicker-collapsed');
						selectWeek.addClass('thisWeek');
						selectWeek.siblings('tr').hide();
					}, 0)
				},

				// 오른으로 스와이프
				selectPrev: function() {
					if (selectWeek.is(':first-child')) {
						datepicker.find("[data-handler='prev']").trigger('click');
						if (datepicker.find('table tbody tr:nth-last-child(1) td').hasClass('ui-datepicker-other-month')) {
							datepicker.find('table tbody tr:nth-last-child(2)').addClass('thisWeek').siblings('').removeClass('thisWeek');
						} else {
							datepicker.find('table tbody tr:nth-last-child(1)').addClass('thisWeek').siblings('').removeClass('thisWeek');
						}
					} else {
						selectWeek.prev('').addClass('thisWeek').siblings('').removeClass('thisWeek');
					}

					datepicker.find('table .thisWeek td').each(function() {
	                    if (!$(this).hasClass('ui-datepicker-other-month')) {
	                        $(this).find('a').trigger('click');
	                    }
	                });
					datepicker.find('table tbody tr').each(function() {
						if (!$(this).hasClass('thisWeek')) {
							$(this).css('display', 'none');
						} else {
							$(this).removeClass('selectNext').addClass('selectPrev');
							$(this).css('display', 'table-row')
						}
					})
					
					//window.scrollTo({top: 0, behavior: 'smooth'});
				},

				// 왼쪽으로 스와이프
				selectNext: function() {
					if (selectWeek.is(':last-child')) {
						datepicker.find("[data-handler='next']").trigger('click');
						if (datepicker.find('table tbody tr:nth-child(1) td').hasClass('ui-datepicker-other-month')) {
							datepicker.find('table tbody tr:nth-child(2)').addClass('thisWeek').siblings('').removeClass('thisWeek');
						} else {
							datepicker.find('table tbody tr:nth-child(1)').addClass('thisWeek').siblings('').removeClass('thisWeek');
						}
					} else {
						selectWeek.next('').addClass('thisWeek').siblings('').removeClass('thisWeek');
					}

					datepicker.find('table .thisWeek td').each(function() {
	                    if (!$(this).hasClass('ui-datepicker-other-month')) {
	                        $(this).find('a').trigger('click');
	                    }
	                });
					datepicker.find('table tbody tr').each(function() {
						if (!$(this).hasClass('thisWeek')) {
							$(this).css('display', 'none');
						} else {
							$(this).removeClass('selectPrev').addClass('selectNext');
							$(this).css('display', 'table-row')
						}
					})

					//window.scrollTo({top: 0, behavior: 'smooth'});
				},
				unFold: function() {
					$('.datepicker-unfold button').on('click', function() {
						datepicker.removeClass('datepicker-collapsed');
						datepicker.find('table tbody tr').each(function() {
							$(this).css('display', 'table-row')
						});
						$('html, body').stop().animate({
							scrollTop: 0
						}, 300);
					})
					
					
					g.registerCallback('click', $$('#arrow-prev'), function() {
						g.datepickerWeekend.selectPrev();
					});
					g.registerCallback('click', $$('#arrow-next'), function() {
						g.datepickerWeekend.selectNext();
					});
//					$('.datepicker-arrow .arrow-prev').on('click', function() {
//						g.datepickerWeekend.selectPrev();
//					});
//					$('.datepicker-arrow .arrow-next').on('click', function() {
//						g.datepickerWeekend.selectNext();
//					});
				}
			}
			this.datepickerWeekend.unFold();
		
//			$(async() => {
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
					selectOtherMonths: true,
					onSelect: async(date, dp) => {
						// 선택한 날짜 저장
						this.setSelectedDate(date);
						
						const today = new Date(date);
						const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
						const endOfWeek = new Date(startOfWeek);
						endOfWeek.setDate(startOfWeek.getDate() + 6);

						await this.handleDetail(startOfWeek.toISOString().split('T')[0], endOfWeek.toISOString().split('T')[0]);
						currentDate = date;
						g.datepickerWeekend.select();

					},
					onChangeMonthYear: async(year, month, dp) => {
						const lastDay = new Date(year, month, 0).getDate();
						
						this.setSearchStartDate(year+''+String(month).padStart(2, '0') +'01');
						this.setSearchEndDate(year+''+String(month).padStart(2, '0') +''+lastDay);
						
						// 서버로 데이터 다시 조회
						await this.handleGetList();
					},
					beforeShowDay: function(date) {
						
						let result;
						if(!result) {
							result = [true, 'date' + date.getDate()];
						}
						
						return result;
					},
					onUpdateDatepicker: function() {
						addTags()
						g.datepickerWeekend.init();
					},
				});

				function addTags() {
					const datepickerWrap = document.querySelectorAll('.ui-datepicker-calendar td a');
					datepickerWrap.forEach(function(div) {
						const scheduleWrap = document.createElement('div');
						scheduleWrap.classList.add('schedule-wrap');
						div.appendChild(scheduleWrap)
					})

					// 한국
					const schedule_04 = document.querySelectorAll('.schedule_04 .schedule-wrap');
					schedule_04.forEach(function(item) {
						item.insertAdjacentHTML('beforeend', '<div class="sc-label label04" aria-label="한국"></div>');
					})

					// 미국
					const schedule_05 = document.querySelectorAll('.schedule_05 .schedule-wrap');
					schedule_05.forEach(function(item) {
						item.insertAdjacentHTML('beforeend', '<div class="sc-label label05 aria-label="미국"></div>');
					})

					// 일본
					const schedule_06 = document.querySelectorAll('.schedule_06 .schedule-wrap');
					schedule_06.forEach(function(item) {
						item.insertAdjacentHTML('beforeend', '<div class="sc-label label06" aria-label="일본"></div>');
					})

					// 중국
					const schedule_07 = document.querySelectorAll('.schedule_07 .schedule-wrap');
					schedule_07.forEach(function(item) {
						item.insertAdjacentHTML('beforeend', '<div class="sc-label label07" aria-label="중국"></div>');
					})
					
					// 유럽
					const schedule_08 = document.querySelectorAll('.schedule_08 .schedule-wrap');
					schedule_08.forEach(function(item) {
						item.insertAdjacentHTML('beforeend', '<div class="sc-label label08" aria-label="유럽"></div>');
					})
				}

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
						if ($(this).hasClass('datepicker-collapsed')) {
							g.datepickerWeekend.selectNext();
						} else {
							$(this).find("[data-handler='next']").trigger('click');
						}
					},
					swipeRight: function() {
						if ($(this).hasClass('datepicker-collapsed')) {
							g.datepickerWeekend.selectPrev();
						} else {
							$(this).find("[data-handler='prev']").trigger('click');
						}
					}
				})

				$('#chk04').on('change', async (elem) => {
					if (elem.target.checked) {
						this.setKorChk('Y');
						
						$('.ui-datepicker-calendar .label04').closest('td').addClass('schedule_04')
						$('.ui-datepicker-calendar .label04').css({
							'display': 'block'
						});
					} else {
						this.setKorChk('N');
						
						$('.ui-datepicker-calendar .schedule_04').removeClass('schedule_04')
						$('.ui-datepicker-calendar .label04').css({
							'display': 'none'
						});
					}
				})
				$('#chk05').on('change', async (elem) => {
					if (elem.target.checked) {
						this.setUsaChk('Y');
						
						$('.ui-datepicker-calendar .label05').closest('td').addClass('schedule_05')
						$('.ui-datepicker-calendar .label05').css({
							'display': 'block'
						});
					} else {
						this.setUsaChk('N');
						
						$('.ui-datepicker-calendar .schedule_05').removeClass('schedule_05')
						$('.ui-datepicker-calendar .label05').css({
							'display': 'none'
						});
					}
				})
				$('#chk06').on('change', async (elem) => {
					if (elem.target.checked) {
						this.setChnChk('Y');
						
						$('.ui-datepicker-calendar .label07').closest('td').addClass('schedule_07')
						$('.ui-datepicker-calendar .label07').css({
							'display': 'block'
						});
					} else {
						this.setChnChk('N');
						
						$('.ui-datepicker-calendar .schedule_07').removeClass('schedule_07')
						$('.ui-datepicker-calendar .label07').css({
							'display': 'none'
						});
					}
				})
				$('#chk07').on('change', async (elem) => {
					if (elem.target.checked) {
						this.setJpnChk('Y');
						
						$('.ui-datepicker-calendar .label06').closest('td').addClass('schedule_06')
						$('.ui-datepicker-calendar .label06').css({
							'display': 'block'
						});
					} else {
						this.setJpnChk('N');
						
						$('.ui-datepicker-calendar .schedule_06').removeClass('schedule_06')
						$('.ui-datepicker-calendar .label06').css({
							'display': 'none'
						});
					}
				})
				$('#chk08').on('change', async (elem) => {
					if (elem.target.checked) {
						this.setEuChk('Y');
						
						$('.ui-datepicker-calendar .label08').closest('td').addClass('schedule_08')
						$('.ui-datepicker-calendar .label08').css({
							'display': 'block'
						});
					} else {
						this.setEuChk('N');
						
						$('.ui-datepicker-calendar .schedule_08').removeClass('schedule_08')
						$('.ui-datepicker-calendar .label08').css({
							'display': 'none'
						});
					}
				})
	}
	
	/**
	 * 검색 버튼 이벤트
	 */
	async handleSaerchRouter (e) {
		e.preventDefault();
		
		const route = 'ivinf32m';
		const props = {
				
		};
		router.navigate(route, props);
	}
	
	/**
	 * 월간 캘린더 펼치기 이벤트
	 */
	async handleOpenSchedule () {
		const date = new Date(this.selectedDate.value);
		
		let month = date.getMonth() + 1;
    	month = (month > 9) ? ''+month : '0' + month;
    	
    	const lastDay = new Date(date.getFullYear(), month, 0).getDate();
		
		const startOfMonth = date.getFullYear()+month+'01';
		const endOfMonth = date.getFullYear()+month+lastDay;

		this.setSearchStartDate(startOfMonth);
		this.setSearchEndDate(endOfMonth);
		
		await this.handleGetList();
		$$('#listForm').hide();
	}
	
	/*
	 * 주간 일정 마크 생성
	 */
	async schedDetailMark (startDateStr, endDateStr) {
		setTimeout(() => {
			// 시작일자와 종료일자 사이의 일자값들 구하기
			const result = [];
			const startDate = new Date(String(startDateStr));
			const endDate = new Date(String(endDateStr));
			
			for(let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
				const year = d.getFullYear();
				const month = String(d.getMonth() + 1).padStart(2, '0');
				const date = String(d.getDate()).padStart(2, '0');
				
				result.push(`${year}-${month}-${date}`);
			}

			for(let i = 0; i < result.length; i++) {
				let date = new Date(result[i]);
				$('#datepicker_schedule').find('.date' + String(date.getDate()) + ' .schedule-wrap').html('');
				
				if(Object.keys(this.dataList.value).length > 0) { // 목록 데이터 존재여부
					if(typeof this.dataList.value[result[i]] != "undefined" && this.dataList.value[result[i]].length > 0) {
						let date = new Date(result[i]);
						
	    				let krCount = 0;
						let usCount = 0;
						let chCount = 0;
						let jpCount = 0;
						let euCount = 0;
						
						for(let j = 0; j < this.dataList.value[result[i]].length; j++) {
							// 국가별  
							let elements = $('#datepicker_schedule').find('.thisWeek .date' + String(date.getDate()));
							let filterElem = Array.from(elements);
							
							switch ( this.dataList.value[result[i]][j].nacd ) {
								case "SK" :
									if(krCount === 0) {
										if(this.korChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label04" aria-label="한국" style="display:none;"></div>');	
											});	
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label04" aria-label="한국"></div>');	
											});
										}
										krCount = krCount + 1;
									}
									break;
									
								case "US" :
									if(usCount === 0) {
										if(this.usaChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label05" aria-label="미국" style="display:none;"></div>');	
											});		
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label05" aria-label="미국"></div>');	
											});					
										}
										usCount = usCount+ 1;
									}
									break;
									
								case "CH" :
									if(chCount === 0 ) {
										if(this.chnChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label07" aria-label="중국" style="display:none;"></div>');	
											});											
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label07" aria-label="중국"></div>');	
											});										
										}
										chCount = chCount + 1;
									}
									break;
									
								case "JN" :
									if(jpCount === 0) {
										if(this.jpnChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label06" aria-label="일본" style="display:none;"></div>');	
											});											
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label06" aria-label="일본"></div>');	
											});										
										}
										jpCount = jpCount + 1;
									}
									break;
									
								default :
									if(euCount === 0) {
										if(this.euChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label08" aria-label="유럽" style="display:none;"></div>');	
											});											
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label08" aria-label="유럽"></div>');	
											});										
										}
										euCount++;
									}
								break;
							}
						}
					}else {
						// 마크 제거
						$('#datepicker_schedule').find('.date' + String(date.getDate()) + ' .schedule-wrap').html('');
					}
				}else {
					// 마크 제거
					$('#datepicker_schedule').find('.date' + String(date.getDate()) + ' .schedule-wrap').html('');
				}
			}
		}, 50);
	}

	/**
	 * 월간 일정 마크 생성
	 */
	async schedMark (value) {
		setTimeout(() => {
			const year = String(value).substring(0, 4);
			const month = String(value).substring(4, 6);
	
			for(let i = 1; i < 32; i++) {
				$('#datepicker_schedule').find('.date' + i + ' .schedule-wrap').html('');

				if(Object.keys(this.dataList.value).length > 0) { // 목록 데이터 존재여부
					if(typeof this.dataList.value[year+"-"+month+"-"+("0"+i).slice(-2)] != "undefined" &&
	    					this.dataList.value[year+"-"+month+"-"+("0"+i).slice(-2)].length > 0) {

						let krCount = 0;
						let usCount = 0;
						let chCount = 0;
						let jpCount = 0;
						let euCount = 0;
						for(let j = 0; j < this.dataList.value[year+"-"+month+"-"+("0"+i).slice(-2)].length; j++) {
							// 국가별
							let elements = $('#datepicker_schedule').find('.date' + i);
							let filterElem = Array.from(elements).filter(el => 
								!el.classList.contains('ui-datepicker-other-month')
							);
							
							switch ( this.dataList.value[year+"-"+month+"-"+("0"+i).slice(-2)][j].nacd ) {
								case "SK" :
									if(krCount === 0) {
										if(this.korChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label04" aria-label="한국" style="display:none;"></div>');	
											});	
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label04" aria-label="한국"></div>');	
											});
										}
										krCount = krCount + 1;
									}
									break;
									
								case "US" :
									if(usCount === 0) {
										if(this.usaChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label05" aria-label="미국" style="display:none;"></div>');	
											});		
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label05" aria-label="미국"></div>');	
											});					
										}
										usCount = usCount+ 1;
									}
									break;
									
								case "CH" :
									if(chCount === 0 ) {
										if(this.chnChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label07" aria-label="중국" style="display:none;"></div>');	
											});											
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label07" aria-label="중국"></div>');	
											});											
										}
										chCount = chCount + 1;
									}
									break;
									
								case "JN" :
									if(jpCount === 0) {
										if(this.jpnChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label06" aria-label="일본" style="display:none;"></div>');	
											});										
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label06" aria-label="일본"></div>');	
											});											
										}
										jpCount = jpCount + 1;
									}
									break;
									
								default :
									if(euCount === 0) {
										if(this.euChk.value === 'N') {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label08" aria-label="유럽" style="display:none;"></div>');	
											});											
										}else {
											filterElem.forEach(el => {
												const childEl = el.querySelector('.schedule-wrap');
												childEl.insertAdjacentHTML('afterbegin', '<div class="sc-label label08" aria-label="유럽"></div>');	
											});										
										}
										euCount++;
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
		}, 50);
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
    	$("#datepicker_schedule").datepicker('destroy');
    	this.datepickerWeekend = null;
    	
    	$(document).off('click', '.datepicker-unfold button');
    	$(document).off('click', '.ui-datepicker-next');
    	$(document).off('click', '.ui-datepicker-prev');
        super.destroy(this);
    }
}