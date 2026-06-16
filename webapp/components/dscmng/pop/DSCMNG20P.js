/*************************************************************************
* @ 서비스경로 : DSCMNG20P
* @ 파일명      : DSCMNG20P 일정관리 > 영업 캘린더 > 개인일정 상세
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

export class DSCMNG20P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
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
    	
    	[this.itemId, this.setItemId] = this.useState('itemId', '');
    	[this.recurring, this.setRecurring] = this.useState('recurring', 'N');
    	[this.recurringYn, this.setRecurringYn] = this.useState('recurringYn', 'N');
    	[this.prevItemId, this.setPrevItemId] = this.useState('prevItemId', '');
    	[this.mainType, this.setMainType] = this.useState('mainType', 'N');
    }

    init (param) {
    	super.init(this);
    	
    	if(param.mainType && param.mainType != '') {
    		this.setMainType(param.mainType);    		
    	}
    	
    	this.load(param.itemId, param.recurring);
    }
       
    async load(itemId, recurring) {
    	await this.getSchdDetail(itemId, recurring);
    }
    
    /**
     * 일정 상세 조회
     */
    async getSchdDetail(itemId, recurring) {
    	this.setPrevItemId(itemId);
    	
    	const param = {
    			itemId : itemId
    			, recurringYn : recurring
    			, mode : 'P'
    	}
    	
    	const result = await ApiUtils.sendPost('/api/dscmng/getSchdDetail.json', param);
    	
    	if(result.resultCode === '000000') {
    		if(result.data.schdDetail) {
    			const data = result.data.schdDetail;
    			this.setItemId(data.itemId);
    			
    			$$('#subject').html(data.subject);
    			$$('#startDate').html(data.startDateFormat);
    			$$('#startTime').html(data.alldayYn === 'N' ? data.startTimeFormat : '');
    			$$('#endDate').html(data.endDateFormat);
    			$$('#endTime').html(data.alldayYn === 'N' ? data.endTimeFormat : '');
    			
    			if(data.recRecurrence != null) {
    				$$('#alldayNicon').hide();
    				$$('#alldayYicon').show();
    			}else {
    				$$('#alldayNicon').show();
    				$$('#alldayYicon').hide();
    			}
    			
    			if(data.location) {
    				$$('#location').html(data.location);    	
    				$$('#locationForm').show();
    			}else {
    				$$('#locationForm').hide();
    			}
    			
    			// 반복 정보
    			if(data.recRecurrence != null){
					console.log(data.recRecurrence.length);
					console.log(this.recurrenceTxt(data.recRecurrence[0]));

					$("#recTxt").html(await this.recurrenceTxt(data.recRecurrence[0]))
					$$('#recForm').show();
				}else {
					$$('#recForm').hide();
				}
    			
    			//초대 정보
				if(data.recRa.length > 0) {
					let memberHtml = '';
					$.each(data.recRa, function(i, item){
							memberHtml += '<span class="btn-xsmall btn-outlined btn-round">';
							memberHtml += '	<span>'+item.name+'</span>';
							memberHtml += '</span>';
					});
					$("#recRaForm").html(memberHtml);
					$$('#recForm2').show();
				}else {
					$$('#recForm2').hide();
				}
				
				if(data.body) {
					let bodyText = data.body.replaceAll('\r\n', '');
					const doc = new DOMParser().parseFromString(bodyText.replaceAll('<br>', '\n'), "text/html");
					$$('#body').html(doc.body.textContent.replaceAll('\n', '<br>'));	
					$$('#bodyForm').show();
				}else {
					$$('#bodyForm').hide();
				}

				if(data.pushInfo) {
					if(data.pushInfo && data.pushInfo.PB_CAL_PUSH_TYPE === '1') {
						$$('#pushInfo').text('30분 전');
					}else if(data.pushInfo && data.pushInfo.PB_CAL_PUSH_TYPE === '2') {
						$$('#pushInfo').text('1시간 전');
					}else if(data.pushInfo && data.pushInfo.PB_CAL_PUSH_TYPE === '3') {
						$$('#pushInfo').text('2시간 전');
					}else if(data.pushInfo && data.pushInfo.PB_CAL_PUSH_TYPE === '4') {
						$$('#pushInfo').text('3시간 전');
					}else if(data.pushInfo && data.pushInfo.PB_CAL_PUSH_TYPE === '5') {
						$$('#pushInfo').text('직접입력, '+`${data.pushInfo.PB_CAL_PUSH_TIME.substr(0, 2)}`+':'+`${data.pushInfo.PB_CAL_PUSH_TIME.substr(2, 4)}`);
					}
					
					$$('#pushForm').show();
				}else {
					$$('#pushForm').hide();
				}
    			this.setRecurringYn(recurring);
    		} 
    	}else {
    		await this.openAlert('', result.resultMessage);
    	}
    }
    
    /**
     * ComPopUtils의 btn1 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn1CallBack () {
    	// 삭제!
    	let returnData = {};
   
    	const confirmRes = await CmmUtils.confirm('삭제하시겠습니까?', '',{
        	okLabel : '예',
            noLabel : '아니요',
            icon : 'caution',
        });
    	
    	if(confirmRes.resultCd === '000000') {
    		const param = {
        			itemId : this.itemId.value
        			, recurringYn: this.recurringYn.value
        	}
        	
        	const result = await ApiUtils.sendPost('/api/dscmng/deleteSchd.json', param);

        	if(result.resultCode === '000000') {
        		returnData = { 
        				resultCd : '000000'
        				, resultMsg : 'SUCCESS'
        	    };
        		
        		toastr.caution('','삭제 되었습니다.');
        	}else {
        		returnData = { 
        				resultCd : '999999'
        				, resultMsg : 'FAIL'
        	    };
        		
        		await this.openAlert('', result.resultMessage);
        	}
        	
        	return returnData;
		}else {
			returnData = { 
    				resultCd : '999999'
    				, resultMsg : 'FAIL'
    	    };
			
			return returnData;
		}
    }
    
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn2CallBack () {
    	// 수정!
    	console.log('prevItemId ==== ', this.prevItemId.value);
    	const result = { 
    		data : {
    			itemId: this.itemId.value
    			, prevItemId: this.prevItemId.value
    			, recurringYn: this.recurringYn.value
    			, mode: 'P'
    			, type: this.mainType.value
    		}
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	
        return result;
    }

    /**
     * 반복설정 정보 텍스트 생성
     */
    async recurrenceTxt(obj) {
    	let str = "";
    	
		if(obj.delYn != "Y") {
			if(obj.type === 'DAILY') {
				str += "매일, ";
				str += "매 "+obj.interval+"일마다";
			} else if(obj.type === 'WEEKLY') {
				str += "매주, ";
				str += "매 "+obj.interval+"주마다 ";

				for(var i=0;i<obj.recWeek.length;i++) {
					if(i > 0) {
						str += ",";
					}
					str += this.weekTable[obj.recWeek[i].dayOfTheWeek];
				}
				str += "에";
			} else if(obj.type === 'MONTHLY') {
				str += "매월, ";
				str += obj.interval+"개월마다 "+obj.dayOfMonth+"일에";
			} else if(obj.type === 'YEARLY') {
				str += "매년, ";
				str += this.monthTable[obj.month]+" "+obj.dayOfMonth+"일에";
			} else if(obj.type === 'RELATIVE_MONTHLY') {
				str += "매월, ";
				str += obj.interval+"개월마다 "+ this.weekIndexTable[obj.dayOfTheWeekIndex] + " "+ this.weekTable[obj.dayOfTheWeek]+"에";
			} else if(obj.type === 'RELATIVE_YEARLY') {
				str += "매년, ";
				str += this.monthTable[obj.month]+" "+ this.weekIndexTable[obj.dayOfTheWeekIndex] + " "+ this.weekTable[obj.dayOfTheWeek]+"에";
			}

			if(obj.numberOfOccurrences) {
				str += "("+obj.numberOfOccurrences+"회 반복)";
			} else if(obj.endDate) {
				str += "("+obj.endDate+" 까지)";
			} else {
				str += "(종료일 지정안함)";
			}
		} else {
			str = "반복없음";
		}
		
		return str;
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
