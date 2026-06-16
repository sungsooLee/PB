/*************************************************************************
* @ 서비스경로 : FNCPLS16S
* @ 파일명      : FNCPLS16S 금융+ > 예적금계산기 > 적금계산 > 목표금액모으기 
* @ 화면ID	  : PBWFI020000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FNCPLS16S extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.keepMoney, this.setKeepMoney] = this.useState('keepMoney', '');
		[this.keepMonth, this.setKeepMonth] = this.useState('keepMonth', '');
	}
	
	init () {
		console.log(' 금융+ > 예적금계산기 > 적금계산 > 목표금액모으기');

		super.init(this);
		
		this.register();
	}
	
	
	register() {

		const g = this;
		this.bind( 'keepMoney', $$('#keepMoney'), 'input');
		this.bind( 'keepMonth', $$('#keepMonth'), 'input');

		$$("input").addAttr("autocomplete","off");
		
		const searchBtnCallback = () => {
			if(this.validation()) {
				this.search();
			}
		}
		
		const plusMoneyCallBack = (event, element) => {

			let money = Number(CmmUtils.removeComma($$("#keepMoney").value()));
			
			money += Number(event.target.value);

			const cvtMoney = CmmUtils.comma(money);
			$$("#hangleAmt").text(this.showAmtKr(money)+"원");
			
			$$("#keepMoneyForm").removeClass("form-invalid");
			g.setKeepMoney(cvtMoney);
		}
		
		const plusMonthCallBack = (event, element) => {

			let month = Number($$("#keepMonth").value());
			month +=  Number(element.value);
			if(month>999){
				month=999;
			}

			$$("#keepMonthForm").removeClass("form-invalid");
			g.setKeepMonth(month);
		}
		
		// keyup 이벤트
		const keyupCallback = () => {
			
			let val = event.currentTarget.value;
			val = val.replace(/[^-\,0-9]/g,'').replaceAll('-','');
			
			$$("#"+event.currentTarget.id).value(val);
			
			if(($$("#"+event.currentTarget.id).value() === '0' && event.key === '0') || Number(val.replace(/[^-0-9]/g,'')) === 0) {
				$$("#"+event.currentTarget.id).value('');
				$$("#hangleAmt").text('');
				return;
			}
			
			$$("#"+event.currentTarget.id+"Form").removeClass("form-invalid");
			
			if(event.currentTarget.id === 'keepMoney') {
				const newValue = CmmUtils.removeComma($$("#keepMoney").value());
				if(newValue != "") {
					$$("#hangleAmt").text(this.showAmtKr(newValue)+"원");
					g.setKeepMoney(CmmUtils.comma(newValue));
				} else {
					$$("#hangleAmt").text('');
				}
			}
		}
		
		const keepRateKeyupCallBack = () => {
			let targetVal = event.currentTarget.value;
			const targetId = event.currentTarget.id;
			const pattern = /^\d{1,2}$/;
			const pattern2 = /^(\d{0,2}.\d{0,2})$/;
			
			// 00.xxx 형식 막기위함
			if(targetVal.length>1 && Number(targetVal) === 0) {
				$$("#"+event.currentTarget.id).value(0);
				return;
			}
			
			$$("#"+event.currentTarget.id+"Form").removeClass("form-invalid");
			
			if(pattern2.test(targetVal)) {
				if(!pattern.test(targetVal)) {
					if(targetVal.indexOf(".") > - 1){
						const arr_val = targetVal.split(".");
						if(arr_val[1].length > 2) {
							targetVal = arr_val[0] + "." + arr_val[1].substr(0, 2);
							$$("#"+event.currentTarget.id).value(targetVal);
						}
					} else {
						targetVal = targetVal.substr(0, targetVal.length - 1);
						$$("#"+event.currentTarget.id).value(targetVal);
					}
				}
			} else {
				if(targetVal.indexOf(".") > - 1){
					const arr_val = targetVal.split(".");
					console.log("arr_val1", arr_val[1].length);
					if(arr_val[1].length > 2) {
						targetVal = arr_val[0] + "." + arr_val[1].substr(0, 2);
						$$("#"+event.currentTarget.id).value(targetVal);
					}
				}
			}
		}
		
		const tabClickCallback = (event) => {
			const target = event.currentTarget.id;
			router.navigate(target,{});
		}
		
		const inputRemove =(event,element) => {
			
			const inputId = element.parentElement.children[0].id;
			if(inputId === 'keepMoney') {
				g.setKeepMoney('');
				$$("#hangleAmt").text('');
			} else if(inputId === 'keepMonth') {
				g.setKeepMonth('');
			} 
			
			$$("#"+inputId).value('');
		}
		
		// 이벤트 등록
		//tab버튼 click
		const tabs = {elements : [$$("#fncpls10s").elements[0], $$("#fncpls13s").elements[0]]};
		const tabCallbacks = [tabClickCallback,tabClickCallback];
		
		this.registerCallback("click", tabs, tabCallbacks);

		// 조회버튼 click
		const search_btn = $$("#layoutBtn2");
		this.registerCallback("touchend", search_btn, searchBtnCallback);

		$$(document).findByName('plusMoney', 'click', plusMoneyCallBack);
		$$(document).findByName('plusMonth', 'click', plusMonthCallBack);

		
		// 조건검색 keyup
		const iptTargets = {elements : [$$("#keepMoney").elements[0], $$("#keepMonth").elements[0],$$("#keepRate").elements[0]]};
		const iptKeyupCallbacks = [keyupCallback,keyupCallback,keepRateKeyupCallBack];
		this.registerCallback("keyup", iptTargets, iptKeyupCallbacks);
		
		$$(document).findByName('delBtn', 'touchend', inputRemove);
	}

	validation() {
		const keepMoney = CmmUtils.removeComma(this.keepMoney.value);
		const keepMonth = this.keepMonth.value;
		const keepRate = $$("#keepRate").value();
		
		if(keepMoney === "0" ||keepMoney === "") {
			$$("#keepMoneyForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepMoney").focus();
			},10)
			$$("#keepMoneyForm").find(".validate-text").text('필수 항목 입니다.');
			return false;
		}
		
		if(CmmUtils.removeComma(keepMoney*1) > 100000000000 ){
			$$("#keepMoneyForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepMoney").focus();
			},10)
			$$("#keepMoneyForm").find(".validate-text").text("목표금액을 1000억 미만으로 입력하세요");
			return false;
		}

		if(keepMonth === "0" ||keepMonth === "") {
			$$("#keepMonthForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepMonth").focus();
			},10)
			$$("#keepMonthForm").find(".validate-text").text('필수 항목 입니다.');
			return false;
		}
		
		if(keepMonth*1 > 600) {
			$$("#keepMonthForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepMonth").focus();
			},10)
			$$("#keepMonthForm").find(".validate-text").text('불입기간을 600개월 이하로 입력하세요');
			return false;
		}

		if(keepRate === "0" ||keepRate === "") {
			$$("#keepRateForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepRate").focus();
			},10)
			$$("#keepRateForm").find(".validate-text").text('필수 항목 입니다.');
			return false;
		}
		if(keepRate*1 > 30) {
			$$("#keepRateForm").addClass("form-invalid");
			setTimeout(() => {
				$("#keepRate").focus();
			},10)
			$$("#keepRateForm").find(".validate-text").text('예상금리를 30%이하로 입력하세요');
			return false;
		}
		
		return true;
	}

	async search () {
		const param = {
			"asetGoalAm" : CmmUtils.removeComma(this.keepMoney.value)
			, "dfrtmMcn" : this.keepMonth.value
			, "irFrcsUsgRt" : $$("#keepRate").value()
		}
		await GlobalApp.popupUtils.openPopup('fncpls17p', {
            showCloseBtn : true,
            params : param,
        });
		
	}

	// 금액 단위
	showAmtKr (num) {
		let oNum = '';
		if((num+'').indexOf('.') !== -1){
			oNum = num.substring((num+'').indexOf('.'));
			num = parseInt(num);
		}
		let numL = Math.ceil((num+'').length / 4);
		let rVal = "";
		let useNum = 0;
		if(numL > 2) {
			// 억 단위 세팅
			useNum = Math.floor(num*1 / 100000000);
			rVal += useNum + "억";
			
			num -= useNum*100000000;
			numL = Math.ceil((num+'').length / 4);
		}
		if(numL === 2) {
			// 만 단위 세팅
			useNum = Math.floor(num*1 / 10000);
			rVal += useNum + "만";
			
			num -= useNum*10000;
			numL = Math.ceil((num+'').length / 4);
		}
		if(numL < 2 && num !== 0) {
			useNum = Math.floor(num*1 / 1);
			rVal += useNum;
		}
		rVal = rVal + "" + oNum;
		return rVal;
	}
	
	
	destroy() {
		super.destroy(this);
	}
}

