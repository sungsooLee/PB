import { BaseModule } from '../cmm/BaseModule.js';

export default class Home extends BaseModule {
	constructor(elem) {
		super(elem);
	}
	
	init () {
		super.init(this);
		log.debug('home!!!!');

		this.initRegist();
	}

	initRegist() {
		
		
		var oldValue = CmmUtils.removeComma($$('#keepMoney').elements[0].value);
		const keepMoneyClick = async () => { 
			log.debug('keepMoneyClick');
			var newValue = CmmUtils.removeComma($$('#keepMoney').elements[0]);
			if(oldValue != newValue && newValue != "") {
				oldValue = newValue;
				$$('#keepMoney').elements[0].value = this.moneyReplace(oldValue);
			}
		}
		
		//100만원 추가
		const plus100Click = async () => { 
			log.debug('plus100Click');
			var totalVal =  CmmUtils.removeComma($$('#keepMoney').elements[0].value);
			totalVal = totalVal*1 + $$("#plus100").elements[0].value*1;
			$$('#keepMoney').elements[0].value = this.moneyReplace(totalVal);
		}
		
		//500만원추가
		const plus500Click = async () => { 
			log.debug('plus500Click');
			var totalVal =  CmmUtils.removeComma($$('#keepMoney').elements[0].value);
			totalVal = totalVal*1 + $$("#plus500").elements[0].value*1;
			$$('#keepMoney').elements[0].value = this.moneyReplace(totalVal);
		}
		
		//천만원 추가
		const plus1000Click = async () => { 
			log.debug('plus1000Click');
			var totalVal =  CmmUtils.removeComma($$('#keepMoney').elements[0].value);
			totalVal = totalVal*1 + $$("#plus1000").elements[0].value*1;
			$$('#keepMoney').elements[0].value = this.moneyReplace(totalVal);
		}
		
		//5천만원 추가
		const plus5000Click = async () => { 
			log.debug('plus5000Click');
			var totalVal =  CmmUtils.removeComma($$('#keepMoney').elements[0].value);
			totalVal = totalVal*1 + $$("#plus5000").elements[0].value*1;
			$$('#keepMoney').elements[0].value = this.moneyReplace(totalVal);
		}
		
		//대출원금 삭제
		const deleteMoneyClick = async () => { 
			$$('#keepMoney').elements[0].value = "";
		};
		
		//6개월 추가
		const mon6Click = async () => { 
			var totalVal =   CmmUtils.removeComma($$('#keepMonth').elements[0].value);
			totalVal = totalVal*1 + $$("#mon6").elements[0].value*1;
			if(totalVal>999){
				totalVal=999;
			}
			$$('#keepMonth').elements[0].value = this.moneyReplace(totalVal);
		};
		
		//1년 추가
		const mon12Click = async () => { 
			var totalVal =   CmmUtils.removeComma($$('#keepMonth').elements[0].value);
			totalVal = totalVal*1 + $$("#mon12").elements[0].value*1;
			if(totalVal>999){
				totalVal=999;
			}
			$$('#keepMonth').elements[0].value = this.moneyReplace(totalVal);
		};
		
		//3년 추가
		const mon36Click = async () => { 
			var totalVal =   CmmUtils.removeComma($$('#keepMonth').elements[0].value);
			totalVal = totalVal*1 + $$("#mon36").elements[0].value*1;
			if(totalVal>999){
				totalVal=999;
			}
			$$('#keepMonth').elements[0].value = this.moneyReplace(totalVal);
		};
		
		//5년추가
		const mon60Click = async () => { 
			var totalVal =   CmmUtils.removeComma($$('#keepMonth').elements[0].value);
			totalVal = totalVal*1 + $$("#mon60").elements[0].value*1;
			if(totalVal>999){
				totalVal=999;
			}
			$$('#keepMonth').elements[0].value = this.moneyReplace(totalVal);
		};

		//대출기간 삭제
		const deleteMonthClick = async () => { 
			$$('#keepMonth').elements[0].value = "";
		};

		//거치기간 삭제
		const deleteMonth2Click = async () => { 
			$$('#keepMonth2').elements[0].value = "";
		};

		//대출금리 삭제
		const deleteRateClick = async () => { 
			$$('#keepRate').elements[0].value = "";
		};
		
		// [조회 클릭] 버튼
		const searchBtnClick = async () => { 
			if($$('#keepMoney').elements[0].value == "0" || $$('#keepMoney').elements[0].value == "") {
				$$('#keepMoney').focus;
				const result = await CmmUtils.alert('알림', '대출원금을 입력 바랍니다!',{
		            btnLabel : '확인'
		        });
				return false;
			}
			if(CmmUtils.removeComma($$('#keepMoney').elements[0].value*1) > 1000000000000 ){
				$$('#keepMoney').elements[0].focus;
				const result = await CmmUtils.alert('알림', '대출원금을 1조 미만으로 입력하세요!',{
					btnLabel : '확인'
				});
				return false;
			}
			
			if($$('#keepMonth').elements[0].value == "0" || $$('#keepMonth').elements[0].value == "") {
				$$('#keepMonth').elements[0].focus;
				const result = await CmmUtils.alert('알림', '대출기간을 입력 바랍니다!',{
					btnLabel : '확인'
				});
				return false;
			}
			
			if($$('#keepMonth').elements[0].value*1 > 600) {
				$$('#keepMonth').elements[0].focus;
				const result = await CmmUtils.alert('알림', '대출기간을 600개월 이하로 입력하세요!',{
					btnLabel : '확인'
				});
				return false;
			}			

			if($$('#keepRate').elements[0].value == "0" || $$('#keepRate').elements[0].value == "") {
				$$('#keepRate').elements[0].focus;
				const result = await CmmUtils.alert('알림', '대출금리를 입력 바랍니다!',{
					btnLabel : '확인'
				});
				return false;
			}
			
			if($$('#keepRate').elements[0].value*1 > 30) {
				$$('#keepRate').elements[0].focus;
				const result = await CmmUtils.alert('알림', '대출금리를 30%이하로 입력하세요',{
					btnLabel : '확인'
				});
				return false;
			}

			this.apiSend();
		};
		
		// [만기일시 탭]
		const tab01BtnClick = async () => { 
			$$("#tab01Div").elements[0].style.display = "block";
			$$("#tab02Div").elements[0].style.display = "none";
			$$("#tab03Div").elements[0].style.display = "none";
		};
		// [원리금균등 탭]
		const tab02BtnClick = async () => { 
			$$("#tab01Div").elements[0].style.display = "none";
			$$("#tab02Div").elements[0].style.display = "block";
			$$("#tab03Div").elements[0].style.display = "none";
		};
		// [원금균등 탭]
		const tab03BtnClick = async () => { 
			$$("#tab01Div").elements[0].style.display = "none";
			$$("#tab02Div").elements[0].style.display = "none";
			$$("#tab03Div").elements[0].style.display = "block";
		};

		// [닫기 버튼 클릭]
		const closeBtnClick = async () => { 
			//document.querySelector($$("#tab01"));
			$$("#tab01Div").elements[0].style.display = "none";
			$$("#tab02Div").elements[0].style.display = "none";
			$$("#tab03Div").elements[0].style.display = "none";
		};
		
		const keepRateKeyUp = async () => { 
			var val = $$("#keepRate").elements[0].value;
			var pattern = /^\d{1,2}$/;
			var pattern2 = /^(\d{0,2}.\d{0,2})$/;

			if(pattern2.test(val)) {
				if(!pattern.test(val)) {
					if(val.indexOf(".") > - 1){
						var arr_val = val.split(".");
						if(arr_val[1].length > 2) {
							val = arr_val[0] + "." + arr_val[1].substr(0, 2);
							$$("#keepRate").elements[0].value = val;
						}
					} else {
						val = val.substr(0, val.length - 1);
						$$("#keepRate").elements[0].value = val;
					}
				}
			} else {
				if(val.indexOf(".") > - 1){
					var arr_val = val.split(".");
					console.log("arr_val1", arr_val[1].length);
					if(arr_val[1].length > 2) {
						val = arr_val[0] + "." + arr_val[1].substr(0, 2);
						$$("#keepRate").elements[0].value = val;
					}
				}
			}
		};
		
		this.registerCallback('keyup', $$('#keepMoney'), keepMoneyClick);
		this.registerCallback('click', $$("#plus100"), plus100Click);
		this.registerCallback('click', $$("#plus500"), plus500Click);
		this.registerCallback('click', $$("#plus1000"), plus1000Click);
		this.registerCallback('click', $$("#plus5000"), plus5000Click);
		this.registerCallback('click', $$("#deleteMoney"), deleteMoneyClick);
		this.registerCallback('click', $$("#mon6"), mon6Click);
		this.registerCallback('click', $$("#mon12"), mon12Click);
		this.registerCallback('click', $$("#mon36"), mon36Click);
		this.registerCallback('click', $$("#mon60"), mon60Click);
		this.registerCallback('click', $$("#deleteMonth"), deleteMonthClick);
		this.registerCallback('click', $$("#deleteMonth2"), deleteMonth2Click);
		this.registerCallback('click', $$("#deleteRate"), deleteRateClick);
		this.registerCallback('click', $$("#search_btn"), searchBtnClick);
		this.registerCallback('click', $$("#tab01"), tab01BtnClick);
		this.registerCallback('click', $$("#tab02"), tab02BtnClick);
		this.registerCallback('click', $$("#tab03"), tab03BtnClick);
		this.registerCallback('click', $$("#close"), closeBtnClick);
		this.registerCallback('keyup', $$("#keepRate"), keepRateKeyUp);
	};
	
	
	//금액포맷
	moneyReplace (money){
		money = String(money);
		var bExists = money.indexOf(".", 0);
		var moneyArr = money.split('.');
		if(bExists > -1){
			money = moneyArr[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") + "." + moneyArr[1];
		}else{
			money = money.replace(/\B(?=(\d{3})+(?!\d))/g,",");
		}
		return money;
	}
	
	//
	async apiSend () {
		var keepMoney = $$('#keepMoney').elements[0].value;
		var keepMonth = $$('#keepMonth').elements[0].value;
		var keepMonth2 = $$('#keepMonth2').elements[0].value;
		var keepRate = $$('#keepRate').elements[0].value;
		
    	const url = '/api/loc02/ea102';
    	var params = {
    			"trnLnPrn": CmmUtils.removeComma($$('#keepMoney').elements[0].value),
    			"lnTemMcn": $$('#keepMonth').elements[0].value,
    			"dfrtmMcn": $$('#keepMonth2').elements[0].value,
    			"lonLnIr":  $$('#keepRate').elements[0].value
    		};
    	const res = await ApiUtils.sendPost(url, params);
    	
    	//const items = res;
    	
    	$$("#areaA1").elements[0].innerText = keepMoney+"원";						//대출원금
		$$("#areaA2").elements[0].innerText = keepMonth+"개월";						//대출기간
		if(keepMonth2 != ""){
			$$("#areaA3").elements[0].innerText = keepMonth2+"개월";										//거치기간
		}

		$$("#areaA4").elements[0].innerText = keepRate+"%";												//대출금리
		$$("#areaA5").elements[0].innerText = this.moneyReplace(res.mmPidAm1)+"원";					//월납입액
		$$("#areaA6").elements[0].innerText = this.moneyReplace(res.lnintAm1)+"원";					//총이자
		$$("#areaA7").elements[0].innerText = this.moneyReplace(res.rpyAm1)+"원";						//총 상환금액

		$$("#areaB1").elements[0].innerText = keepMoney+"원";						//대출원금
		$$("#areaB2").elements[0].innerText = keepMonth+"개월";						//대출기간
		if(keepMonth2 != ""){
			$$("#areaB3").elements[0].innerText = keepMonth2+"개월";						//거치기간
		}
		$$("#areaB4").elements[0].innerText = keepRate+"%";						//대출금리
		$$("#areaB5").elements[0].innerText = this.moneyReplace(res.mmPidAm2)+"원";					//월납입액
		$$("#areaB6").elements[0].innerText = this.moneyReplace(res.lnintAm2)+"원";					//총이자
		$$("#areaB7").elements[0].innerText = this.moneyReplace(res.rpyAm2)+"원";						//총 상환금액

		$$("#areaC1").elements[0].innerText = keepMoney+"원";						//대출원금
		$$("#areaC2").elements[0].innerText = keepMonth+"개월";						//대출기간
		if(keepMonth2 != ""){
			$$("#areaC3").elements[0].innerText = keepMonth2+"개월";						//거치기간
		}
		$$("#areaC4").elements[0].innerText = keepRate+"%";						//대출금리
		$$("#areaC5").elements[0].innerText = this.moneyReplace(res.mmPidAm3)+"원";					//월납입액
		$$("#areaC6").elements[0].innerText = this.moneyReplace(res.lnintAm3)+"원";					//총이자
		$$("#areaC7").elements[0].innerText = this.moneyReplace(res.rpyAm3)+"원";						//총 상환금액

		var gridList = res.grid1 || [];
		
		var areaHtmlA = '';
		for(var i=1;i<=gridList.length;i++){
			//alert('gridList[i-1].rpyPiamAm1 -> ' + gridList[i-1].rpyPiamAm1);
			areaHtmlA += '<div class="box">';
			areaHtmlA += '<span class="cmm-tit1">'+i+'회차</span>';
			areaHtmlA += '<dl>';
			areaHtmlA += '<dt>상환원리금</dt>';
			areaHtmlA += '<dd><em id="rpyPiamAm1_'+i+'">'+this.moneyReplace(gridList[i-1].rpyPiamAm1)+'원</em></dd>';
			areaHtmlA += '<dt>대출잔액</dt>';
			areaHtmlA += '<dd><em id="lnBal1_'+i+'">'+this.moneyReplace(gridList[i-1].lnBal1)+'원</em></dd>';
			areaHtmlA += '</dl>';
			areaHtmlA += '</div>';
		}
		$$('#areaHtmlA').elements[0].innerHTML = areaHtmlA;

		var areaHtmlB = '';
		for(var i=1;i<=gridList.length;i++){
			areaHtmlB += '<div class="box">';
			areaHtmlB += '<span class="cmm-tit1">'+i+'회차</span>';
			areaHtmlB += '<dl>';
			areaHtmlB += '<dt>상환원리금</dt>';
			areaHtmlB += '<dd><em id="rpyPiamAm2_'+i+'">'+this.moneyReplace(gridList[i-1].rpyPiamAm2)+'원</em></dd>';
			areaHtmlB += '<dt>대출잔액</dt>';
			areaHtmlB += '<dd><em id="lnBal2_'+i+'">'+this.moneyReplace(gridList[i-1].lnBal2)+'원</em></dd>';
			areaHtmlB += '</dl>';
			areaHtmlB += '</div>';
		}
		$$('#areaHtmlB').elements[0].innerHTML = areaHtmlB;

		var areaHtmlC = '';
		for(var i=1;i<=gridList.length;i++){
			areaHtmlC += '<div class="box">';
			areaHtmlC += '<span class="cmm-tit1">'+i+'회차</span>';
			areaHtmlC += '<dl>';
			areaHtmlC += '<dt>상환원리금</dt>';
			areaHtmlC += '<dd><em id="rpyPiamAm3_'+i+'">'+this.moneyReplace(gridList[i-1].rpyPiamAm3)+'원</em></dd>';
			areaHtmlC += '<dt>대출잔액</dt>';
			areaHtmlC += '<dd><em id="lnBal3_'+i+'">'+this.moneyReplace(gridList[i-1].lnBal3)+'원</em></dd>';
			areaHtmlC += '</dl>';
			areaHtmlC += '</div>';
		}
		$$('#areaHtmlC').elements[0].innerHTML = areaHtmlC;

		$$("#tab01Div").elements[0].style.display = "block";
	};
	
	
	destroy() {
		super.destroy(this);
	}
}

