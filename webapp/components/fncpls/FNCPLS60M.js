/*************************************************************************
* @ 서비스경로 : FNCPLS60M
* @ 파일명      : FNCPLS60M  [P] 전체 메뉴 > 구독 설정
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
		
		[this.sbscList, this.setSbscList]	= this.useState('sbscList', '');
		[this.sbscId, this.setSbscId]		= this.useState('sbscId', 'fncpls0001');
		[this.selectCurrency, this.setSelectCurrency]		= this.useState('selectCurrency', '');
	}
	
	init () {
		console.log("####FNCPLS60M#####init");
		super.init(this);
		this.initData();
		this.register();
	}
	
	async initData() {
		const url = '/api/fncpls/getFncpls.json';
		const params = {
			sbscCd : 'fncpls0001',
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
				router.navigate('lgin40m', {originalUri: 'fncpls60m'});
			});
		}
	}
	
	register () {
		//환율 통화 선택
		const selectcurrencyClick = async () => {
			await GlobalApp.popupUtils.openPopup('fncpls61p', {
				showCloseBtn : true,
				params : this.sbscList.value,
				onCallback : (result) => {
					console.log("result.id - " + result.id);
					this.setSelectCurrency(result.id);
					$$("#selectCurrencyText").html(result.id);
				}
			});
		}
		this.registerCallback('click', $$("#selectCurrency"), selectcurrencyClick);
		
		//저장버튼
		const savealimclick = async () => {
			if(this.selectCurrency == '') {
				toastr.caution('', '알림대상통화를 선택해주세요.');
				return;
			}
			
			const pushtime = $('input:radio[name="pushtime"]:checked').val();
			console.log("pushtime - " + pushtime);
			
			let selectdays = '';
			$('input:checkbox[name="days"]:checked').each(function() {
				selectdays += $(this).val();
				//selectdays.push($(this).val());
			});
			console.log("days - " + selectdays);
			
			const data = {
				cur : this.selectCurrency.value,
				time : pushtime,
				day : selectdays
			};
			
			console.log("this.sbscList.value - " + JSON.stringify(this.sbscList.value, null, 2));
			
			let dataArr = [];
			if(this.sbscList.value != '' && this.sbscList.value.PBALIMCURRENCY != null) {
				dataArr = JSON.parse(this.sbscList.value.PBALIMCURRENCY);
			}
			dataArr.push(data);
			
			if(dataArr.length > 3) {
				$swal.fire02('환율알림 대상 통화는 최대 3개까지 설정 가능합니다.', 'caution', '확인');
			} else {
				await this.saveAlim(JSON.stringify(dataArr));
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