import { BaseModule } from '../../cmm/BaseModule.js';

export class SampleNormalModal extends BaseModule {
	constructor(elem) {
		super(elem);
		this.elem = elem;
		this.callbackFunc = null;

		[this.isTest, this.setIsTest] = this.useState('isTest', true);
	}

	/**
	 * 팝업 모듈 초기화
	 * @param {*} param			[Object] : 호출 화면에서 전달하는 파라미터
	 * @param {*} callbackFunc  [FUNC]   : 호출 부에 전달할 callback function
	 */
	init (param, callbackFunc ) {
		super.init(this);
		log.debug('sampleNormalModal init! : ' , param );

		this.callbackFunc = callbackFunc;

		this.register();
	}
	
	register() {

		log.debug('elem : ', this.elem);
		
		// 화면에 있는 버튼 목록을 조회
		//onst buttons = Array.from(this.elem.querySelectorAll(".sampleBtn"));
		const modal = $$('#cmmModal');
		const buttons = modal.find('.sampleBtn');

		log.debug('buttons : ', buttons);

		// 버튼별 이벤트 핸들러 설정
		buttons.elements.forEach((btn) => {
			const {id} = btn;
			
			if ( id ) {
				let callback;
				switch ( id ) {
				
					case "btn1" :
						callback = () =>  this.callbackFunc({val : 50000});
						break;
						
					case "btn2" :
						callback = () =>  this.callbackFunc(null);
						break;
						
					case "btn3" :
						callback = () =>  log.debug('btn3 click!');
						break;
					
					default : 
						callback = () => log.debug('btn1');
				
				}
				
				this.registerCallback("click", $$(btn), callback);
			}
			
		});

		//this.callbackFunc()

	}

	/**
	 * ComPopUtils의 btn1 클릭시 콜백 함수에 결과값을 전달한다.
	 * return null 한 경우에는 팝업이 꺼지지 않는다.
	 */
	async returnToBtn1CallBack () {

		//validation
		if ( this.isTest ) {
			const result = await CmmUtils.alert('','확인해주세요', {
				btnLabel : '확인',
				useCancelBtn : false
			});

			if ( result ) return null;

		} else {
			const result = { data : '', resultCd : '999999', resultMsg : 'SampleNormalModel Fail'};
			return result;
		}
	}

	/**
	 * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
	 * return null 한 경우에는 팝업이 꺼지지 않는다.
	 */
	async returnToBtn2CallBack () {

		const result = await CmmUtils.alert('','확인해주세요', {
							btnLabel : '확인',
							useCancelBtn : false
						});

		if ( result ) {
			return null;
		} else {
			const result = { data : '', resultCd : '000000', resultMsg : 'SampleNormalModel SUCCESS'};
			return result;
		}
	}

	destroy () {
		super.destroy();
		log.debug('sampleNormalModal destroy!');
	}
}
