/*************************************************************************
* @ 서비스경로 : FNCPL41P
* @ 파일명      : FNCPL41P  금융+ > 환율계산기 > [P] 환율우대율 선택
* @ 화면ID	  : PBWFI049902
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-10            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class FNCPLS41P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.iptPrmeRt, this.setIptPrmeRt] 	= this.useState('iptPrmeRt', '');
	}
	
	init (params) {
		super.init(this);
		console.log("####params", params);
		this.setRadio(params.xrtPrmeRt.replace('%', ''));
		
		this.register();
	}
	
	register () {
		// 버튼 클릭 이벤트 콜백
		const btnClickCallback = (event) => {
			const target = event.currentTarget.value;
			if (target === 'ipt') {
				$$('#iptPrmeRtArea').show();
			} else {
				// 하단 입력된 값 제거
				$$('#iptPrmeRt').value('');
				$$('#iptPrmeRtArea').hide();
				this.setIptPrmeRt(target);
			}
		}
		const rateBtns = $$('input[name="rad001"]');
		const rateBtnCallbacks = Array(rateBtns.elements.length).fill(btnClickCallback);
		this.registerCallback('touchend', rateBtns, rateBtnCallbacks);
		
		// 입력 키업 이벤트 콜백
		const keyupCallback = () => {
			let val = event.currentTarget.value;
			val = val.replace(/[^-\,0-9]/g, '');
			
			if (val.length > 3) {
				const oldVal = this.iptPrmeRt.value;
				$$('#'+event.currentTarget.id).value(oldVal);
				this.setIptPrmeRt(oldVal);
				return;
			}
			
			$$('#'+event.currentTarget.id).value(val);
			
			if($$("#"+event.currentTarget.id).value() === '0' && event.key === '0'){
				$$("#"+event.currentTarget.id).value('');
				this.setIptPrmeRt('');
				return;
			}
			
			this.setIptPrmeRt(val);
		}
		this.registerCallback('keyup', $$("#iptPrmeRt"), keyupCallback);
		
		// 입력값 제거 이벤트 콜백
		const delIptCallback = () => {
			this.setIptPrmeRt('');
		}
		this.registerCallback('touchend', $$('.input-remove'), delIptCallback);
	}
	
	setRadio (xrtPrmeRt) {
		const selectRadio = $$('input[type="radio"]').elements.find(x => x.value === xrtPrmeRt) || '';
		if (selectRadio) {
			selectRadio.checked = true;
			$$('#iptPrmeRtArea').hide();
		} else {
			this.setIptPrmeRt(xrtPrmeRt);
			$$('#iptPrmeRt').value(xrtPrmeRt);
			$$('#iptPrmeRtArea').show();
		}
	}
	
	offRadioBtn () {
		const radioCnt = $$('input[type="radio"]').elements.length;
		$.each($$('input[type="radio"]').elements, function(i, item){
			item.checked = false;
		});
	}
	
	returnToBtn2CallBack () {
		const rData = {
			iptPrmeRt : this.iptPrmeRt.value
		};
		const result = { data : rData, resultCd : '000000'};
		return result;
	}
	
	destroy () {
		super.destroy(this);
	}
}

