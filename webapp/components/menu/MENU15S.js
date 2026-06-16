/*************************************************************************
* @ 서비스경로 : MENU14S
* @ 파일명      : MENU14S  [P] 전체 메뉴 > 구독 설정
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

export default class MENU15S extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.alimData, this.seAlimData]	= this.useState('alimData', '');
		[this.alimRangeData, this.seAlimRangeData]	= this.useState('alimRangeData', '');
		[this.sbscNm, this.setSbscNm] = this.useState('sbscNm', '');
		[this.sbscNm2, this.setSbscNm2] = this.useState('sbscNm2', '');
		[this.addYN, this.setAddYn] = this.useState('addYN', '');
		[this.addYN2, this.setAddYn2] = this.useState('addYN2', '');
	}
	
	init () {
		console.log("####MENU14S#####init");
		super.init(this);
		
		this.loadExAlim();
		
		this.loadExRangeAlim();
		
		this.register();
	}
	
	register () {
		const pushFailCallback = () => {
			$$('#fncpls0001').elements[0].checked = false;
			$$('#fncpls0002').elements[0].checked = false;
		}
		
		const pushCallback = () => {
			// 단말 설정 App으로 이동
			NativeUtils.callOpenSetting();
			$$('#fncpls0001').elements[0].checked = false;
			$$('#fncpls0002').elements[0].checked = false;
		}
		
		const sbscCheckboxClick = async () => {
			console.log("#####sbscCheckboxClick", event.currentTarget.id);
			console.log("#####sbscCheckboxClick", event.currentTarget.checked);
			
			const checked = event.currentTarget.checked;
			const sbscId = event.currentTarget.id;
			let alimData = {};
			if(sbscId == 'fncpls0002') {
				alimData = this.alimRangeData.value;
			} else {
				alimData = this.alimData.value;
			}
			console.log("#####typeof alimData - ", typeof alimData);
			console.log("#####alimData - ", alimData);
			if(alimData != null && alimData != '' && alimData != {}) {
				if (checked) {					
					if ( EnvUtils.isPrd() ) {
						// 단말의 알림 허용 상태 체크
						let resNotiStt = await NativeUtils.callNotificationStatus();
						if (resNotiStt.status === 'true') {
							if(sbscId == 'fncpls0002') {
								$$('#selectAlimDiv2').show();
							} else {
								$$('#selectAlimDiv').show();
							}
							this.saveData(sbscId, 'Y', null);
						} else {
							if(sbscId == 'fncpls0002') {
								$$('#selectAlimDiv2').hide();
							} else {
								$$('#selectAlimDiv').hide();
							}
							// 푸시 알림 설정 팝업
							$swal.fire02('Push 알림이 꺼져 있습니다. <br> 알림이 오지 않는다면, 휴대폰의 설정&gt;알림&gt;WON Click에서 알림을 허용해주세요.', 'caution', '예', true, '아니요', pushCallback, pushFailCallback);
						}
					} else {
						this.saveData(sbscId, 'Y', null);
						if(sbscId == 'fncpls0002') {
							$$('#selectAlimDiv2').show();
						} else {
							$$('#selectAlimDiv').show();
						}
					}
				} else {
					if(sbscId == 'fncpls0002') {
						$$('#selectAlimDiv2').hide();
					} else {
						$$('#selectAlimDiv').hide();
					}
					this.saveData(sbscId, 'N', null);
				}
			} else {
				event.currentTarget.checked = false;
				//데이터 없는경우
				if(sbscId == 'fncpls0002') {
					$swal.fire02('알림을 받을 목표환율 통화를 먼저 선택해 주세요', 'caution', '확인');
				} else {
					$swal.fire02('알림을 받을 시간환율 통화를 먼저 선택해 주세요', 'caution', '확인');
				}
			}
		}
		const checkboxs = {elements : [$$('#fncpls0001').elements[0], $$('#fncpls0002').elements[0]]};
		const checkboxCallbacks = [sbscCheckboxClick, sbscCheckboxClick];
		this.registerCallback('click', checkboxs, checkboxCallbacks);
		
		this.registerCallback('click', $$('#selectAlim'), () => {
			const route = 'fncpls60m';
			router.navigate(route, {});
		});
		
		this.registerCallback('click', $$('#selectAlim2'), () => {
			const route = 'fncpls61m';
			router.navigate(route, {});
		});
		
		this.registerCallback('click', $$('#addAlim'), () => {
			if(this.addYN == 'N') {
				$swal.fire02('환율알림 대상 통화는 최대 3개까지 설정 가능합니다.', 'caution', '확인');
			} else {	
				const route = 'fncpls60m';
				router.navigate(route, {});
			}
		});
		
		this.registerCallback('click', $$('#addAlim2'), () => {
			if(this.addYN2 == 'N') {
				$swal.fire02('목표환율 알림은 최대 5개까지 설정 가능합니다.', 'caution', '확인');
			} else {	
				const route = 'fncpls61m';
				router.navigate(route, {});
			}
		});
		
		//시간환율 삭제버튼 클릭
		const delBtnCallback = (event) => {
			console.log("ID - " + event.currentTarget.id);
			this.btnDeleteClick(event.currentTarget.id);
		}
		const delBtns = $$('button[name="exlist"]');
		const delBtnCallbacks = Array(delBtns.elements.length).fill(delBtnCallback);
		this.registerCallback('touchend', delBtns, delBtnCallbacks);
	}
	
	async loadExAlim() {
		$$('button[name="exlist"]').hide();
		$$('#selectText').hide();
		
		const url = '/api/fncpls/getFncpls.json';
		const params = {
			sbscCd : 'fncpls0001',
			sbscYn : 'Y',
		};
		
		const data = await ApiUtils.sendPost(url, params);
		console.log("---getFncpls1 : " + JSON.stringify(data, null, 2));
		if (data.resultCode === '000000') {
			if( data != null && data.data.length > 0 ) {
				$$('#addAlim').show();
				$$('#selectAlim').hide();
				$$('#selectText').hide();
				this.seAlimData(data.data[0]);
				this.drawAlimData();
			} else {
				$$('#selectAlim').show();
				$$('#addAlim').hide();
				$$('#selectText').show();
				this.seAlimData('');
				$$('#fncpls0001').prop('checked', false);
			}
		}  else {
			CmmUtils.alert('', data.resultMessage, {
				btnLabel : '확인',
				useCancelBtn : false
			}).then(() => {
				if(data.resultCode == '900001' || data.resultCode == '900009') {
					router.navigate('lgin40m', {originalUri: 'fncpls61m'});
				}
			});
		}
	}
	
	async loadExRangeAlim() {
		$$('button[name="exlist2"]').hide();
		$$('span[name="exRange"]').hide();
		$$('#selectText2').hide();
		
		const url = '/api/fncpls/getFncpls.json';
		const params = {
			sbscCd : 'fncpls0002',
			sbscYn : 'Y',
		};
		
		const data = await ApiUtils.sendPost(url, params);
		console.log("---getFncpls2 : " + JSON.stringify(data, null, 2));
		if (data.resultCode === '000000') {
			if( data != null && data.data.length > 0 ) {
				$$('#addAlim2').show();
				$$('#selectAlim2').hide();
				$$('#selectText2').hide();
				this.seAlimRangeData(data.data[0]);
				this.drawAlimRangeData();
			} else {
				$$('#selectAlim2').show();
				$$('#addAlim2').hide();
				$$('#selectText2').show();
				this.seAlimRangeData('');
				$$('#fncpls0002').prop('checked', false);
			}
		}
	}
	
	/**
	 * 시간환율 변경사항 저장
	 */
	async saveData (sbscId, sbscVal, sbscNmVal) {
		const url = '/api/fncpls/setFncpls.json';
		const params = {
			sbscCd : sbscId
		};
		
		if(sbscVal != null) {
			params.sbscYn = sbscVal;
		}
		
		if(sbscNmVal != null) {
			if(sbscId == 'fncpls0002') {
				params.sbscNm = sbscNmVal.join(',');
			} else {
				params.sbscNm = JSON.stringify(sbscNmVal);
			}
		}
		
		console.log("---saveData params : " + JSON.stringify(params, null, 2));
		
		const data = await ApiUtils.sendPost(url, params);
		if (data.resultCode === '000000') {
			if(sbscNmVal != null) {
				if(sbscId == 'fncpls0002') {
					this.loadExRangeAlim();
				} else {
					this.loadExAlim();
				}
				
			}
		}
	}
	
	/**
	 * 시간환율 삭제 버튼 클릭
	 */
	async btnDeleteClick(delCur) {
		const alertRes = await CmmUtils.confirm(delCur + ' 시간환율 알림을 삭제하시겠습니까?', '',{
			okLabel : '예',
			noLabel : '아니요',
			icon : 'caution'
		});
		if(alertRes.resultCd === '000000') {
			console.log("---this.sbscNm.value : " + this.sbscNm.value);
			const curList = JSON.parse(this.sbscNm.value);
			
			if(curList.length <= 1) {
				const url = '/api/fncpls/delFncpls.json';
				const params = {
					sbscCd : 'fncpls0001'
				};
				
				console.log("---deleteData params : " + JSON.stringify(params, null, 2));
				
				const data = await ApiUtils.sendPost(url, params);
				if (data.resultCode === '000000') {
					this.loadExAlim();
				}
			} else {
				let curNewList = [];
				curList.forEach((cItem) => {
					if(delCur != cItem.cur) {
						curNewList.push(cItem)
					}
				});
				
				this.saveData('fncpls0001', 'Y', curNewList);
			}
		}
	}
	
	/**
	 * 목표환율 삭제 버튼 클릭
	 */
	async btnGoalDeleteClick(delCur) {
		const alertRes = await CmmUtils.confirm(delCur.substring(0,3) + ' 목표환율 알림을 삭제하시겠습니까?', '',{
			okLabel : '예',
			noLabel : '아니요',
			icon : 'caution'
		});
		if(alertRes.resultCd === '000000') {
			console.log("---this.sbscNm.value : " + this.sbscNm2.value);
			const curList = (this.sbscNm2.value).split(",");
			
			if(curList.length <= 1) {
				const url = '/api/fncpls/delFncpls.json';
				const params = {
					sbscCd : 'fncpls0002'
				};
				console.log("---deleteData params : " + JSON.stringify(params, null, 2));
				
				const data = await ApiUtils.sendPost(url, params);
				if (data.resultCode === '000000') {
					this.loadExRangeAlim();
				}
			} else {
				let curNewList = [];
				curList.forEach((cItem) => {
					const items = cItem.split(":");
					const cur = items[0];
					const type = items[3];
					const delType = delCur.slice(-1);
					console.log("---delCur : " + delCur);
					console.log("---nowcur : " + cur);
					if(delCur.indexOf(cur) > -1 && delType == type) {
					} else {
						curNewList.push(cItem)
					}
				});
				console.log("---curNewList : " + curNewList);
				this.saveData('fncpls0002', 'Y', curNewList);
			}
		}
		
	}
	
	async drawAlimData () {
		const sbscList = this.alimData.value;
		const item = sbscList;
		
		if (item.PBSBSCYN === 'Y') {
			$$('#'+item.PBSBSCCD).elements[0].checked = true;
			$$('#selectAlimDiv').show();
		} else {
			$$('#'+item.PBSBSCCD).elements[0].checked = false;
			$$('#selectAlimDiv').hide();
		}
		
		console.log("---item : " + item.PBALIMCURRENCY);
		if( item.PBALIMCURRENCY != null ) {
			this.setSbscNm(item.PBALIMCURRENCY);
			const curList = JSON.parse(item.PBALIMCURRENCY);
			
			if(curList.length >= 3) {
				this.setAddYn('N');
			} else {
				this.setAddYn('Y');
			}
			
			curList.forEach((cItem) => {
				const currency = cItem.cur;
				const time = cItem.time;
				const day = cItem.day;
				console.log("---cItem currency : " + currency);
				console.log("---cItem time : " + time);
				console.log("---cItem day : " + day);
				$$('#'+currency).show();
				$$('#'+currency).css({display: ''});
				$$('#'+currency+'time').text('('+time+':00)');
			});
		} else {
			$$('#selectText').show();
		}
	}
	
	async drawAlimRangeData () {
		const alimRangeData = this.alimRangeData.value;
		const item = alimRangeData;
		
		if (item.PBSBSCYN === 'Y') {
			$$('#'+item.PBSBSCCD).elements[0].checked = true;
			$$('#selectAlimDiv2').show();
		} else {
			$$('#'+item.PBSBSCCD).elements[0].checked = false;
			$$('#selectAlimDiv2').hide();
		}
		
		console.log("---item2 : " + item.PBALIMCURRENCY);
		if( item.PBALIMCURRENCY != null ) {
			this.setSbscNm2(item.PBALIMCURRENCY);
			const curList = (item.PBALIMCURRENCY).split(",");
			if(curList.length >= 5) {
				this.setAddYn2('N');
			} else {
				this.setAddYn2('Y');
			}
			
			const flagMap = new Map([
				['USD','USD2" name="exlist2" class="flag20 flag-us flag-fluid2 m5 mb-5"><strong>미국 USD</strong><span></span></button>'],
				['JPY','" name="exlist2" class="flag20 flag-jp flag-fluid2 m5 mb-5"><strong>일본 JPY</strong><span></span></button>'],
				['EUR','" name="exlist2" class="flag20 flag-eu flag-fluid2 m5 mb-5"><strong>유럽 EUR</strong><span></span></button>'],
				['GBP','" name="exlist2" class="flag20 flag-gb flag-fluid2 m5 mb-5"><strong>영국 GBP</strong><span></span></button>'],
				['CAD','" name="exlist2" class="flag20 flag-ca flag-fluid2 m5 mb-5"><strong>캐나다 CAD</strong><span></span></button>'],
				['CHF','" name="exlist2" class="flag20 flag-ch flag-fluid2 m5 mb-5"><strong>스위스 CHF</strong><span></span></button>'],
				['HKD','" name="exlist2" class="flag20 flag-hk flag-fluid2 m5 mb-5"><strong>홍콩 HKD</strong><span></span></button>'],
				['CNY','" name="exlist2" class="flag20 flag-cn flag-fluid2 m5 mb-5"><strong>중국 CNY</strong><span></span></button>'],
				['THB','" name="exlist2" class="flag20 flag-th flag-fluid2 m5 mb-5"><strong>태국 THB</strong><span></span></button>'],
				['SEK','" name="exlist2" class="flag20 flag-se flag-fluid2 m5 mb-5"><strong>스웨덴 SEK</strong><span></span></button>'],
				['AUD','" name="exlist2" class="flag20 flag-au flag-fluid2 m5 mb-5"><strong>호주 AUD</strong><span></span></button>'],
				['DKK','" name="exlist2" class="flag20 flag-dk flag-fluid2 m5 mb-5"><strong>덴마크 DKK</strong><span></span></button>'],
				['NOK','" name="exlist2" class="flag20 flag-no flag-fluid2 m5 mb-5"><strong>노르웨이 NOK</strong><span></span></button>'],
				['SGD','" name="exlist2" class="flag20 flag-sg flag-fluid2 m5 mb-5"><strong>싱가포르 SGD</strong><span></span></button>'],
				['NZD','" name="exlist2" class="flag20 flag-nz flag-fluid2 m5 mb-5"><strong>질랜드 NZD</strong><span></span></button>'],
				['PHP','" name="exlist2" class="flag20 flag-ph flag-fluid2 m5 mb-5"><strong>필리핀 PHP</strong><span></span></button>']
			]);

			curList.forEach((cItems, idx) => {
				
				const cItem = cItems.split(":");
				const currency = cItem[0];
				const range = cItem[1];
				const day = cItem[2];
				const type = cItem[3];
				const updown = cItem[4];
				console.log("---cItem currency : " + currency);
				console.log("---cItem range : " + range);
				console.log("---cItem day : " + day);
				console.log("---cItem type : " + type);
				console.log("---cItem updown : " + updown);
				
				let typeTxt = "매매기준율";
				if(type == '2') {
					typeTxt = "송금할 때";
				} else if(type == '3') {
					typeTxt = "송금받을 때";
				} else if(type == '4') {
					typeTxt = "현찰 살 때";
				} else if(type == '5') {
					typeTxt = "현찰 팔 때";
				}
				
				let upDownTxt = " 이상";
				if(updown == 2) {
					upDownTxt = " 이하";
				}
				
//				$$('#'+currency+'2').show();
//				$$('#'+currency+'2').css({display: ''});
//				$$('#'+currency+'Range').show();
//				$$('#'+currency+'Range').text('('+typeTxt + ') ' + range + upDownTxt);
				
				let typeText = '('+typeTxt + ') ' + range + upDownTxt;
				$('#selectAlimDiv2').append('<button id="' + currency + type + '"' + flagMap.get(currency));
				$('#selectAlimDiv2').append('<span id="USDRange" name="exRange" class="ml30">'+typeText+'</span>');
			});
			
			//목표환율 삭제버튼 클릭
			const delGoalBtnCallback = (event) => {
				console.log("ID - " + event.currentTarget.id);
				this.btnGoalDeleteClick(event.currentTarget.id);
			}
			const delGoalBtns = $$('button[name="exlist2"]');
			const delGoalBtnCallbacks = Array(delGoalBtns.elements.length).fill(delGoalBtnCallback);
			this.registerCallback('touchend', delGoalBtns, delGoalBtnCallbacks);
		} else {
			$$('#selectText2').show();
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}