/*************************************************************************
* @ 서비스경로 : FNCPLS20S
* @ 파일명      : FNCPLS20S  금융+ > 대출 계산기 > 대출 계산
* @ 화면ID	  : PBWFI030000
* @ 작성자      : 90196258
* @ 작성일      : 2024-11-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-26            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FNCPLS20S extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.keepMoneyKr, this.setKeepMoneyKr]		= this.useState('keepMoneyKr', '');
		[this.keepMoney, this.setKeepMoney]			= this.useState('keepMoney', '');
		[this.keepMonth, this.setKeepMonth]			= this.useState('keepMonth', '');
		
		[this.saveKeepRate, this.setSaveKeepRate]	= this.useState('saveKeepRate', '');
	}
	
	init () {
		super.init(this);
		console.log('금융+ > 대출계산기 > 대출계산');

		this.register();
	}

	register() {
		
		this.bind( 'keepMoney', $$('#keepMoney'), 'input');
		this.bind( 'keepMoneyKr', $$('#keepMoneyKr'), 'span');
		this.bind( 'keepMonth', $$('#keepMonth'), 'input');
		
		const searchBtnCallback = () => {
			if(this.validation()) {
				this.search();
			}
		}
		
		// 대출원금 추가 버튼 콜백
		const plusMoneyCallBack = (event, element) => {
			
			let money = Number(CmmUtils.removeComma($$("#keepMoney").value()));
			
			money += Number(event.target.value);
			this.setKeepMoneyKr(this.showAmtKr(money) + '원');
			const cvtMoney = CmmUtils.comma(money);
			
			$$('#keepMoneyForm').removeClass('form-invalid');
			this.setKeepMoney(cvtMoney);
		}
		
		// 대출기간 추가 버튼 콜백
		const plusMonthCallBack = (event, element) => {
			
			let month = Number($$("#keepMonth").value());
			
			month +=  Number(element.value);
			
			if(month > 999){
				month = 999;
			}
			
			$$('#keepMonthForm').removeClass('form-invalid');
			this.setKeepMonth(month);
		}
		
		// keyup 이벤트
		const keyupCallback = () => {
			
			let val = event.currentTarget.value;
			val = val.replace(/[^\,0-9]/g,'');
			
			$$("#"+event.currentTarget.id).value(val);
			
			if($$("#"+event.currentTarget.id).value() === '0' && event.key === '0') {
				$$("#"+event.currentTarget.id).value('');
				return;
			}
			
			if(event.currentTarget.id === 'keepMoney') {
				const newValue = CmmUtils.removeComma($$("#keepMoney").value());
				if(newValue != "") {
					this.setKeepMoney(CmmUtils.comma(newValue));
					this.setKeepMoneyKr(this.showAmtKr(newValue)+'원');
				} else {
					this.setKeepMoney('');
					this.setKeepMoneyKr('');
				}
			}
			$$('#'+ event.currentTarget.id + 'Form').removeClass('form-invalid');
		}
		
		// 대출금리 입력
		const keepRateBlurCallBack = () => {
			let keepRate = $$("#keepRate").value();
			
			if (keepRate !== '') {
				keepRate = parseFloat(keepRate).toString();
				$$("#keepRate").value(keepRate);
			}
			
			this.setSaveKeepRate($$("#keepRate").value());
		}
		this.registerCallback("blur", $$('#keepRate'), keepRateBlurCallBack);
		
		const keepRateKeyupCallBack = () => {
			let targetVal = event.currentTarget.value;
			targetVal = targetVal.replace(/[^0-9.]/g,'');
			
			let result = true;
			
			let parts = targetVal.split('.');
			if (parts.length > 2) {
				result = false;
			}
			
			if (parts.length === 2 && parts[1].length > 2) {
				result = false;
			}
			
			if (parts.length === 2 && parts[0].length > 2) {
				result = false;
			}
			
			if (parts.length === 1 && parts[0].length > 2) {
				result = false;
			}
			
			if (targetVal === '00') {
				targetVal = '0';
			}
			
			if (!result) {
				targetVal = this.saveKeepRate.value;
			} else {
				this.setSaveKeepRate($$("#keepRate").value());
			}
			
			$$('#keepRateForm').removeClass('form-invalid');
			$$("#"+event.currentTarget.id).value(targetVal);
		}
		
		// 조회버튼 click
		const search_btn = $$("#layoutBtn2");
		$$("#layoutBtn2").off();
		this.registerCallback("touchend", search_btn, searchBtnCallback);
		
		// 대출원금, 기간 추가 버튼 click
		$$(document).findByName('plusMoney', 'touchend', plusMoneyCallBack);
		$$(document).findByName('plusMonth', 'touchend', plusMonthCallBack);
		
		// 조건입력 keyup
		const iptTargets = {elements : [$$("#keepMoney").elements[0], $$("#keepMonth").elements[0], $$("#keepMonth2").elements[0], $$("#keepRate").elements[0]]};
		const iptKeyupCallbacks = [keyupCallback, keyupCallback, keyupCallback, keepRateKeyupCallBack];
		this.registerCallback("keyup", iptTargets, iptKeyupCallbacks);
		
		// 삭제 버튼 콜백
		const deleteIptCallback = () => {
			let id = event.currentTarget.value;
			if(id === 'keepMoney') {
				this.setKeepMoney('');
				this.setKeepMoneyKr('');
			} else if(id === 'keepMonth') {
				this.setKeepMonth('');
			} else if(id === 'keepMonth2') {
				$$("#keepMonth2").value('');
			} else if(id === 'keepRate') {
				$$("#keepRate").value('');
			}
			event.preventDefault();
		}
		$$('button[name="deleteIpt"]').on('touchend', deleteIptCallback);
	}
	
	validation() {
		const keepMoney = CmmUtils.removeComma(this.keepMoney.value);
		const keepMonth = this.keepMonth.value;
		const keepMonth2 = $$("#keepMonth2").value();
		const keepRate = $$("#keepRate").value();
		
		if(keepMoney === "0" ||keepMoney === "") {
			$$('#keepMoneyForm').addClass('form-invalid');
			$$('#keepMoneyForm').find('.validate-text').text('필수 항목 입니다.');
			setTimeout(() => {
				document.getElementById('keepMoney').focus();
			}, 10);

			return false;
		}
		
		if(CmmUtils.removeComma(keepMoney*1) > 1000000000000 ){
			$$('#keepMoneyForm').addClass('form-invalid');
			$$('#keepMoneyForm').find('.validate-text').text('대출원금을 1조 미만으로 입력하세요');
			setTimeout(() => {
				document.getElementById('keepMoney').focus();
			}, 10);
			return false;
		}
		
		if(keepMonth === "0" ||keepMonth === "") {
			$$('#keepMonthForm').addClass('form-invalid');
			$$('#keepMonthForm').find('.validate-text').text('필수 항목 입니다.');
			setTimeout(() => {
				document.getElementById('keepMonth').focus();
			}, 10);
			return false;
		}
		
		if(keepMonth*1 > 600) {
			$$('#keepMonthForm').addClass('form-invalid');
			$$('#keepMonthForm').find('.validate-text').text('대출기간을 600개월 이하로 입력하세요.');
			setTimeout(() => {
				document.getElementById('keepMonth').focus();
			}, 10);
			return false;
		}
		
		if(keepRate === "0" ||keepRate === "" || keepRate === '0.0') {
			$$('#keepRateForm').addClass('form-invalid');
			$$('#keepRateForm').find('.validate-text').text('필수 항목 입니다.');
			setTimeout(() => {
				document.getElementById('keepRate').focus();
			}, 10);
			return false;
		}
		
		if(keepRate*1 > 30) {
			$$('#keepRateForm').addClass('form-invalid');
			$$('#keepRateForm').find('.validate-text').text('대출금리를 30%이하로 입력하세요.');
			setTimeout(() => {
				document.getElementById('keepRate').focus();
			}, 10);
			return false;
		}
		
		return true;
	}
	
	// 조회 실행
	async search() {
		
		const param = {
			trnLnPrn : CmmUtils.removeComma(this.keepMoney.value),
			lnTemMcn : this.keepMonth.value,
			dfrtmMcn : $$("#keepMonth2").value(),
			lonLnIr : $$("#keepRate").value()
		}
		
		await GlobalApp.popupUtils.openPopup('fncpls21p', {
			showCloseBtn : true,
			params : param,
		});
	}
	
	// alert 호출
	async cmmUtilAlert (msg) {
		const result = await CmmUtils.alert('', msg , {
			btnLabel : '확인',
			useCancelBtn : false
		});
	}
	
	// 금액 단위
	showAmtKr (num) {
		let numL = Math.ceil((num+'').length / 4);
		let rVal = "";
		let useNum = 0;
		if(numL > 3) {
			// 조 단위 세팅
			useNum = Math.floor(num*1 / 1000000000000);
			rVal += CmmUtils.comma(useNum) + "조";
			
			num -= useNum*1000000000000;
			numL = Math.ceil((num+'').length / 4);
		}
		if(numL === 3) {
			// 억 단위 세팅
			useNum = Math.floor(num*1 / 100000000);
			rVal += CmmUtils.comma(useNum) + "억";
			
			num -= useNum*100000000;
			numL = Math.ceil((num+'').length / 4);
		}
		if(numL === 2) {
			// 만 단위 세팅
			useNum = Math.floor(num*1 / 10000);
			rVal += CmmUtils.comma(useNum) + "만";
			
			num -= useNum*10000;
			numL = Math.ceil((num+'').length / 4);
		}
		if(numL < 2 && num !== 0) {
			useNum = Math.floor(num*1 / 1);
			rVal += CmmUtils.comma(useNum);
		}
		return rVal;
	}
	
	destroy() {
		super.destroy(this);
	}
}

