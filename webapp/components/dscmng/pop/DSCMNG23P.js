/*************************************************************************
* @ 서비스경로 : DSCMNG23P
* @ 파일명      : DSCMNG23P 일정관리 > 영업 캘린더 > 일정 등록 > 알림 팝업
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class DSCMNG23P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	[this.allDayYn, this.setAllDayYn] = this.useState('allDayYn', 'N');
    	[this.alarmType, this.setAlarmType] = this.useState('alarmType', '0');
    	[this.alarmText, this.setAlarmText] = this.useState('alarmText', '없음');
    	[this.alarmAmpm, this.setAlarmAmpm] = this.useState('alarmAmpm', '1');
    	[this.alarmHour, this.setAlarmHour] = this.useState('alarmHour', '9');
    	[this.alarmMinute, this.setAlarmMinute] = this.useState('alarmMinute', '00');
    }

    init (param) {
    	super.init(this);
    
    	// 하루종일
    	if(param.allDayYn != '' && param.allDayYn != undefined) {
    		this.setAllDayYn(param.allDayYn);
    		
    		if(param.allDayYn === 'Y') {
    			$$('#rad00_1_Form').hide();
    			$$('#rad00_2_Form').hide();
    			$$('#rad00_3_Form').hide();
    			$$('#rad00_4_Form').hide();
    			
    			/*$('input[name="rad00_alarm"][value="1"]').prop('disabled', true);
    			$('input[name="rad00_alarm"][value="2"]').prop('disabled', true);
    			$('input[name="rad00_alarm"][value="3"]').prop('disabled', true);
    			$('input[name="rad00_alarm"][value="4"]').prop('disabled', true);*/
    		}
    	}
    	
    	// 알림 타입
    	if(param.alarmType != '' && param.alarmType != undefined) {
    		this.setAlarmType(param.alarmType);
    		this.setAlarmText(param.alarmText);
    		$('input[name="rad00_alarm"][value="'+param.alarmType+'"]').prop('checked', true);
    		
    		if(param.alarmType === '5') {
    			$$('#pushTimeForm').show();
    		}else {
    			$$('#pushTimeForm').hide();
    		}
    	}
    	
    	// 시간
    	if(param.alarmTime != '' && param.alarmTime != undefined) {
    		const hour = param.alarmTime.slice(0, 2);
    		const minute = param.alarmTime.slice(2);
    		
    		if(parseInt(hour) >= 12) {
    			this.setAlarmAmpm('2');
    			$('input[name="rad01_alarm"][value="2"]').prop('checked', true);
    		}else {
    			this.setAlarmAmpm('1');
    			$('input[name="rad01_alarm"][value="1"]').prop('checked', true);
    		}
    		
    		if(parseInt(hour) === 0) {
    			this.setAlarmHour('12');
    		}else {
    			if(parseInt(hour) > 12) {
    				this.setAlarmHour((parseInt(hour) - 12) + "");    	
    			}else {
    				this.setAlarmHour(parseInt(hour) + "");    				
    			}
    		}
    		
    		this.setAlarmMinute(minute);
    	}
    	
    	/**
    	 * 알람 타입 선택 박스 이벤트
    	 */
    	$$(document).findByName('rad00_alarm', 'click', async (evnt, elem) => {
    		this.setAlarmType(elem.value);
    		this.setAlarmText(elem.getAttribute('aria-label'));
    		
    		if(elem.value === '5') {
    			$$('#pushTimeForm').show();
    		}else {
    			$$('#pushTimeForm').hide();
    		}
    	});
    	
    	/**
    	 * 알람 오전/오후 선택 박스 이벤트
    	 */
    	$$(document).findByName('rad01_alarm', 'click', async (evnt, elem) => {
    		this.setAlarmAmpm(elem.value);
    	});
    	
    	$$('#alarmHour').on('click', () => {
    		$$('#alarmHour').value('');
    		this.setAlarmHour('');
    	});
    	
    	$$('#alarmMinute').on('click', () => {
    		$$('#alarmMinute').value('');
    		this.setAlarmMinute('');
    	});
    	
    	this.bind('alarmHour', $$('#alarmHour'), 'input');
    	this.bind('alarmMinute', $$('#alarmMinute'), 'input');
    	
    }
    
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
     	
    	let afterAlarmHour = '';
    	
    	if(this.alarmHour.value === '') {
    		$$('#pushTimeValidateForm').addClass('form-invalid');
    		$$('#pushTimeValidateTxt').text('유효하지 않은 시간입니다.');
    		
    		return;
    	}
    	
    	// 입력한 시간 가공처리
    	if(parseInt(this.alarmHour.value) === 0 || parseInt(this.alarmHour.value) > 12) {
    		$$('#pushTimeValidateForm').addClass('form-invalid');
    		$$('#pushTimeValidateTxt').text('유효하지 않은 시간입니다.');
    		
    		return;
    	}
    	
    	if(this.alarmMinute.value === '') {
    		$$('#pushTimeValidateForm').addClass('form-invalid');
    		$$('#pushTimeValidateTxt').text('유효하지 않은 시간입니다.');
    		
    		return;
    	}
    	
    	if(parseInt(this.alarmMinute.value) > 59) {
    		$$('#pushTimeValidateForm').addClass('form-invalid');
    		$$('#pushTimeValidateTxt').text('유효하지 않은 시간입니다.');
    		
    		return;
    	}

    	if(this.alarmType.value === '5') {
    		if(this.alarmAmpm.value === '2' && parseInt(this.alarmHour.value) !== 12) {
    			afterAlarmHour = parseInt(this.alarmHour.value) + 12 + "";
    		}else if(this.alarmAmpm.value === '1' && parseInt(this.alarmHour.value) === 12) {
    			afterAlarmHour = '00';
    		}else {
    			afterAlarmHour = this.alarmHour.value;
    		}
    	}
    	
    	console.log('afterAlarmHour = ', afterAlarmHour);
    	
    	const result = { 
    		data : {
    			alarmType: this.alarmType.value
    			, alarmText: this.alarmText.value
    			, alarmTime: afterAlarmHour.padStart(2, '0') + this.alarmMinute.value.padStart(2, '0')
    		}
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	
        return result;
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
	};
    
    destroy () {
        super.destroy(this);
    }
}
