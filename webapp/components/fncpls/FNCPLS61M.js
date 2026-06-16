/*************************************************************************
* @ 서비스경로 : FNCPLS60M
* @ 파일명      : FNCPLS60M  [P] 전체 메뉴 > 목표환율 알림설정
* @ 화면ID	  : PBWME010000
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FNCPLS60M extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
		[this.currencyName, this.setCurrencyName] = this.useState('currencyName', '');
		[this.btnDatePicker, this.setBtnDatePicker]	= this.useState('btnDatePicker', '');
		[this.selectCurrency, this.setSelectCurrency]		= this.useState('selectCurrency', '');
		[this.selectCurrencyType, this.setSelectCurrencyType]		= this.useState('selectCurrencyType', '');
		[this.endDate, this.setEndDate] = this.useState('endDate', '');
		[this.currencyDataJson, this.setCurrencyDataJson] = this.useState('currencyDataJson', []);
		[this.nowCurrency, this.setNowCurrency]	= this.useState('nowCurrency', '');
		[this.goal, this.setGoal]	= this.useState('goal', '');
		[this.upDown, this.setUpDown]	= this.useState('upDown', '1');
		[this.sbscList, this.setSbscList]	= this.useState('sbscList', '');
		[this.sbscId, this.setSbscId]		= this.useState('sbscId', 'fncpls0002');
		[this.searchOk, this.setSearchOk]	= this.useState('searchOk', false);
	}
	
	init () {
		console.log("####FNCPLS61M#####init");
		super.init(this);
		this.checkCurrencyDate();
		this.initData();
		this.register();
	}
	
	async checkCurrencyDate () {
		for (var i = 0; i < 10; i++) {
			const currentDate = dayjs().subtract(i, 'days');
			const inqDate = currentDate.day() === 0 ? currentDate.subtract(2, 'days') : currentDate.day() === 6 ? currentDate.subtract(1, 'days') : currentDate;
			const queryDate = inqDate.format('YYYYMMDD');
			
			if (this.searchOk.value) {
				return;
			}
			
			await this.initCurrency(queryDate);
		}
	}
	
	/** 현재 환율 조회 */
	async initCurrency (queryDate) {
		const url = '/api/fncplsXrt/getXrtInfo.json';
		const params1 = {
				inqDscd: '81',
				inqTgtDt: queryDate
		};
		console.log("---param : " + JSON.stringify(params1, null, 2));
		const curData = await ApiUtils.sendPost(url, params1);
		console.log("---curData : " + JSON.stringify(curData, null, 2));
		if (curData.resultCode === '000000') {
			this.setSearchOk(true);
			this.setCurrencyDataJson(curData.data.grid);
		} else {
			if(curData.resultCode == '900001' || curData.resultCode == '900009') {
				this.setSearchOk(true);
				CmmUtils.alert('', curData.resultMessage, {
					btnLabel : '확인',
					useCancelBtn : false
				}).then(() => {
					router.navigate('lgin40m', {originalUri: 'fncpls61m'});
				});
			}
		}
	}
	
	async initData() {
		const url = '/api/fncpls/getFncpls.json';
		const params = {
			sbscCd : 'fncpls0002',
			sbscYn : 'Y',
		};
		
		const data = await ApiUtils.sendPost(url, params);
		console.log("---getFncpls : " + JSON.stringify(data, null, 2));
		if (data.resultCode === '000000') {
			if( data != null && data.data.length > 0 ) {
				this.setSbscList(data.data[0]);
			}
		} else {
			CmmUtils.alert('', data.resultMessage, {
				btnLabel : '확인',
				useCancelBtn : false
			}).then(() => {
				router.navigate('lgin40m', {originalUri: 'fncpls61m'});
			});
		}
		
		//알림기간 세팅
		const curDate = new Date();
		const curDateTxt = curDate.toLocaleDateString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit'});
		let afterDate = new Date();
		afterDate.setMonth(afterDate.getMonth() + 3);
		const afterDateTxt = afterDate.toLocaleDateString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit'});
		this.setEndDate(afterDateTxt.replace(/\s+/g, "").slice(0,-1));
        $$("#alimEnd").text(curDateTxt.slice(0,-1) + " ~ " + afterDateTxt.slice(0,-1));
	}
	
	setSelectedCurrencyData(cur, type) {
		if(type == '') {
			$$("#curIcon").hide();
			$$("#curTxt").hide();
			$$("#selectCurrencyTypeText").text('선택');
			$("#keepRate1").val('');
			$("#keepRate2").val('');
		}
		
		const grid = this.currencyDataJson.value;
		const curJsons = grid.filter(item => item.cucd === cur);
		
		let nowCur = '';
		if(type == '1') {
			nowCur = curJsons[0].sbBasRt.toFixed(2);
		} else if(type == '2') {
			nowCur = curJsons[0].tetSellRt.toFixed(2);
		} else if(type == '3') {
			nowCur = curJsons[0].tetBuyRt.toFixed(2);
		} else if(type == '4') {
			nowCur = curJsons[0].cshSellRt.toFixed(2);
		} else if(type == '5') {
			nowCur = curJsons[0].cshBuyRt.toFixed(2);
		}
		console.log("---cur : " + cur);
		console.log("---type : " + type);
		console.log("---nowCur : " + nowCur);
		console.log("---curJsons : " + JSON.stringify(curJsons[0], null, 2));
		
		$("#keepRate1").val(nowCur.split('.')[0]);
		$("#keepRate2").val(nowCur.split('.')[1]);
		
		this.setNowCurrency(nowCur);
		$('#nowCurrency1').text(nowCur+'원');
		$('#nowCurrency').removeClass();
		switch (cur) {
			case 'USD':
				$('#nowCurrency2').text('(미국USD)');
				$('#nowCurrency').addClass('flag flag-us flag-fluid');
			break;
			case 'JPY':
				$('#nowCurrency2').text('(일본JPY)');
				$('#nowCurrency').addClass('flag flag-jp flag-fluid');
			break;
			case 'EUR':
				$('#nowCurrency2').text('(유럽EUR)');
				$('#nowCurrency').addClass('flag flag-eu flag-fluid');
			break;
			case 'GBP':
				$('#nowCurrency2').text('(영국GBP)');
				$('#nowCurrency').addClass('flag flag-gb flag-fluid');
			break;
			case 'CAD':
				$('#nowCurrency2').text('(캐나다CAD)');
				$('#nowCurrency').addClass('flag flag-ca flag-fluid');
			break;
			case 'CHF':
				$('#nowCurrency2').text('(스위스CHF)');
				$('#nowCurrency').addClass('flag flag-ch flag-fluid');
			break;
			case 'HKD':
				$('#nowCurrency2').text('(홍콩HKD)');
				$('#nowCurrency').addClass('flag flag-hk flag-fluid');
			break;
			case 'CNY':
				$('#nowCurrency2').text('(중국CNY)');
				$('#nowCurrency').addClass('flag flag-cn flag-fluid');
			break;
			case 'THB':
				$('#nowCurrency2').text('(태국THB)');
				$('#nowCurrency').addClass('flag flag-th flag-fluid');
			break;
			case 'SEK':
				$('#nowCurrency2').text('(스웨덴SEK)');
				$('#nowCurrency').addClass('flag flag-se flag-fluid');
			break;
			case 'AUD':
				$('#nowCurrency2').text('(호주AUD)');
				$('#nowCurrency').addClass('flag flag-au flag-fluid');
			break;
			case 'DKK':
				$('#nowCurrency2').text('(덴마크DKK)');
				$('#nowCurrency').addClass('flag flag-dk flag-fluid');
			break;
			case 'NOK':
				$('#nowCurrency2').text('(노르웨이NOK)');
				$('#nowCurrency').addClass('flag flag-no flag-fluid');
			break;
			case 'SGD':
				$('#nowCurrency2').text('(싱가포르SGD)');
				$('#nowCurrency').addClass('flag flag-sg flag-fluid');
			break;
			case 'NZD':
				$('#nowCurrency2').text('(뉴질랜드NZD)');
				$('#nowCurrency').addClass('flag flag-nz flag-fluid');
			break;
			case 'PHP':
				$('#nowCurrency2').text('(필리핀PHP)');
				$('#nowCurrency').addClass('flag flag-ph flag-fluid');
			break;
		}		
	}
	
	register () {
		//환율 통화 선택
		const selectcurrencyClick = async () => {
			await globalApp.popupUtils.openPopup('fncpls61p', {
				showCloseBtn : true,
				params : this.sbscList.value,
				onCallback : (result) => {
					console.log("result.id - " + result.id);
					this.setSelectCurrency(result.id);
					$$("#selectCurrencyText").html(result.id);
					this.setSelectedCurrencyData(result.id, '');
				}
			});
		}
		this.registerCallback('click', $$("#selectCurrency"), selectcurrencyClick);
		
		//환율 종류 선택
		const selectCurrencyTypeClick = async () => {
			if(this.selectCurrency.value == '') {
				toastr.caution('', '알림 대상 통화를 선택해주세요.');
				return;
			} else {
				const grid = this.currencyDataJson.value;
				const curJsons = grid.filter(item => item.cucd === this.selectCurrency.value);
				let param = {
						curJson : curJsons[0],
						data : this.sbscList.value.PBALIMCURRENCY
				};
				console.log("---popup call param : " + JSON.stringify(param, null, 2));
				await globalApp.popupUtils.openPopup('fncpls62p', {
					showCloseBtn : true,
					params : param,
					onCallback : (result) => {
						console.log("result.id - " + result.id);
						console.log("result.value - " + result.value);
						this.setSelectedCurrencyData(this.selectCurrency.value, result.id);
						this.setSelectCurrencyType(result.id);
						$$("#selectCurrencyTypeText").text(result.value);
						if(result.id =='2' || result.id =='4') {
							$$("#strongUpDownTxt").text("원 이하");
							$$("#divUpDown").hide();
							this.setUpDown('2');
						} else if(result.id =='3' || result.id =='5') {
							$$("#strongUpDownTxt").text("원 이상");
							$$("#divUpDown").hide();
							this.setUpDown('1');
						} else {
							$$("#strongUpDownTxt").text("원");
							$$("#divUpDown").css({'display': 'flex'});
						}
						
						$$("#curIcon").css({'display': 'flex'});
						$$("#curTxt").css({'display': 'flex'});
					}
				});
			}
		}
		this.registerCallback('click', $$("#selectCurrencyType"), selectCurrencyTypeClick);
		
		//저장버튼
		const savealimclick = async () => {
			if(this.selectCurrency.value == '') {
				toastr.caution('', '알림 대상 통화를 선택해주세요.');
				return;
			}
			
			if(this.selectCurrencyType.value == '') {
				toastr.caution('', '환율 종류를 선택해주세요.');
				return;
			}
			
			let goal1 = $("#keepRate1").val();
			let goal2 = $("#keepRate2").val();
			if(goal1 == '' || Number(goal1) == 0) {
				toastr.caution('', '목표 환율을 입력해주세요.');
				return;
			} else {
				goal1 = Number(goal1).toString();
			}
			
			if(goal2 == '' || Number(goal2) == 0) {
				goal2 = '00';
				//toastr.caution('', '목표 환율(소수점)을 입력해주세요.');
				//return;
			}
			
			console.log("goal1 - " + goal1);
			console.log("goal2 - " + goal1+"."+goal2);
			
			if(this.selectCurrencyType.value == '1') {
				if($('#down').is(':checked')) {
					this.setUpDown('2');
				} else {
					this.setUpDown('1');
				}
			}
			
			let inputGoal = parseFloat(goal1+"."+goal2);
			let nowCur = parseFloat(this.nowCurrency.value);
			
			if( this.upDown.value == '2') { //이하
				if(inputGoal > nowCur) {
					toastr.caution('', '현재 환율보다 목표환율이 높습니다. 낮게 설정해주세요.');
					return;
				}
			} else {
				if(inputGoal < nowCur) { //이상
					toastr.caution('', '현재 환율보다 목표환율이 낮습니다. 높게 설정해주세요.');
					return;
				}
			}

			this.setGoal(goal1+"."+goal2);
			
			let endDt = this.endDate.value;
			
			const data = {
				cur : this.selectCurrency.value,
				type : this.selectCurrencyType.value,
				goal : this.goal.value,
				endDate : endDt.replace(/\./g,""),
				upDown : this.upDown.value
			};
			
			const finalData = this.selectCurrency.value + ":" + this.goal.value + ":" + this.endDate.value + ":" + this.selectCurrencyType.value + ":" + this.upDown.value + ":1";
			
			console.log("final data - " + finalData);

			let saveData = '';
			if(this.sbscList.value.PBALIMCURRENCY == null || this.sbscList.value.PBALIMCURRENCY == '') {
				saveData = finalData;
			} else {
				saveData = this.sbscList.value.PBALIMCURRENCY + "," + finalData
			}
			
			console.log("final saveData - " + saveData);
			console.log("final saveData.split.length - " + (saveData.split(",")).length);
			if((saveData.split(",")).length > 5) {
				$swal.fire02('환율알림 대상 통화는 최대 5개까지 설정 가능합니다.', 'caution', '확인');
			} else {
				await this.saveAlim(saveData);
			}
		}
		this.registerCallback('touchend', $$("#savealim"), savealimclick);
	}
	
	async saveAlim(data) {
		const url = '/api/fncpls/setFncpls.json';
		const params = {
			sbscCd : this.sbscId.value,
			sbscYn : 'Y',
			sbscNm : data
		};	
		console.log("---saveAlim params : " + JSON.stringify(params, null, 2));		
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === '000000') {
			this.setSbscList(params); 
			this.sbscList.value.PBALIMCURRENCY = data;
			//this.setSbscList(this.sbscList.value.sbscNm = JSON.parse(data));
			toastr.success('', '알림을 설정했어요.');
			return router.historyBack();
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}