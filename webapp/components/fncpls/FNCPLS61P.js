import { BaseModule } from '../cmm/BaseModule.js';

export class FNCPLS61P extends BaseModule {
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		this.callbackFunc = null;
		this.eventReceiver = new EventTarget();
		this.alreadySelectCurrency = '';
		this.type = '1';
	}
	
	init (param, callbackFunc) {
		super.init(this);		
		this.callbackFunc = callbackFunc;
		console.log("---popup param json : " + JSON.stringify(param, null, 2));
		
		if (param != null && param != '') {
			this.type = param.PBSBSCCD;
			this.alreadySelectCurrency = param.PBALIMCURRENCY;
			if(this.alreadySelectCurrency != '' && this.alreadySelectCurrency != null) {
				if(this.type == "fncpls0001") {
					const curList = JSON.parse(param.PBALIMCURRENCY);
					if(curList != null && curList.length > 0) {
						curList.forEach((item) => {
							const currency = item.cur;
							console.log("---popup currency1 : " + currency);
							$('#'+currency).append('<i class="mlauto fc-status-active">알림받는 중</i>');
						});
					}
				} 
//				else if(this.type == "fncpls0002") {
//					const curList = (param.PBALIMCURRENCY).split(",");
//					if(curList != null && curList.length > 0) {
//						curList.forEach((item) => {
//							const items = item.split(":");
//							const currency = items[0];
//							console.log("---popup currency2 : " + currency);
//							$('#'+currency).append('<i class="mlauto fc-status-active">알림받는 중</i>');
//						});
//					}
//				}
			}
		}
		
		this.register();
	}
	
	register () {
		const btnCallback = (event) => {
			const selID = event.currentTarget.id;
			console.log("ID - " + selID);
			console.log("---this.alreadySelectCurrency : " + this.alreadySelectCurrency);
			
			if(this.alreadySelectCurrency != '' && this.alreadySelectCurrency != null) {
				if(this.type == "fncpls0001") {
					if(this.alreadySelectCurrency.indexOf(selID) > -1) {
						toastr.caution('', selID + '는 이미 선택된 통화 입니다.');
					} else {
						this.callbackFunc({id : selID});
					}
				} else {
					this.callbackFunc({id : selID});
				}
			} else {
				this.callbackFunc({id : selID});
			}
		}

		const exBtns = $$('button[name="exlist"]');
		const btnCallbacks = Array(exBtns.elements.length).fill(btnCallback);
		this.registerCallback('click', exBtns, btnCallbacks);
	}

	destroy () {
		super.destroy(this);
	}
}