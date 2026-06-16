import { BaseModule } from '../cmm/BaseModule.js';

export class FNCPLS62P extends BaseModule {
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		this.callbackFunc = null;
		this.eventReceiver = new EventTarget();
		this.cucd = null;
		this.alreadySelectCurrency = [];
	}
	
	init (param, callbackFunc) {
		super.init(this);		
		this.callbackFunc = callbackFunc;
		console.log("---popup param json : " + JSON.stringify(param, null, 2));
		
		for (let i=1 ; i<=5 ; i++) {
			$('#a'+i).hide();
		}
		
		if (param.data != null && param.data != '') { 
			let datas = (param.data).split(',');
			this.cucd = param.curJson.cucd;
			datas.forEach((item, idx) => {
				console.log("---item : " + item);
				console.log("---cucd : " + this.cucd);
				if ( item.includes(this.cucd) ){
					let type = item.split(':')[3];
					console.log("---type : " + type);
					this.alreadySelectCurrency.push(type);
					$('#a'+type).show();
	            }
	        })
		}
		
		$('#l1').text(param.curJson.sbBasRt.toFixed(2)+'원');
		$('#l2').text(param.curJson.tetSellRt.toFixed(2)+'원');
		$('#l3').text(param.curJson.tetBuyRt.toFixed(2)+'원');
		$('#l4').text(param.curJson.cshSellRt.toFixed(2)+'원');
		$('#l5').text(param.curJson.cshBuyRt.toFixed(2)+'원');
		
		this.register();
	}
	
	register () {
		const btnCallback = (event) => {
			const selID = event.currentTarget.id;
			const selValue = event.currentTarget.value;
			console.log("ID - " + selID);
			console.log("VALUE - " + selValue);
			
			if(this.alreadySelectCurrency.includes(selID)) {
				toastr.caution('', '['+ this.cucd + '] ' + selValue + ' 이미 선택되어 있습니다.');
			} else {
				this.callbackFunc({id : selID, value : selValue});
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