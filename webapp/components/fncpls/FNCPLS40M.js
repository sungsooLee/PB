/*************************************************************************
* @ 서비스경로 : FNCPL40M
* @ 파일명      : FNCPL40M  금융+ > 환율계산기 > 환율 계산
* @ 화면ID	  : PBWFI040000
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-10            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FNCPLS40M extends BaseModule {
	constructor(elem, param) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.cucdList, this.setCucdList]		= this.useState('cucdList', []);		// 통화 리스트
		
		console.log("#####환율계산기 START", typeof param);
		
		let cucd = 'USD';
		if(typeof param !== 'undefined') {
			if(typeof param.cucd !== 'undefined') {
				cucd = param.cucd;
			}
		}
		
		[this.tabType, this.setTabType]			= this.useState('tabType', '1');		// 화면 탭 종류 -> 조회구분 코드
		[this.cucd, this.setCucd]				= this.useState('cucd', cucd);			// 통화
		[this.cucdKrNm, this.setCucdKrNm]		= this.useState('cucdKrNm', '');	// 통화
		[this.iptAmt, this.setIptAmt]			= this.useState('iptAmt', '1');			// 입력한 외화금액
		[this.iptAmtOut, this.setIptAmtOut]		= this.useState('iptAmtOut', '');	// 입력한 외화금액 - 한글
		[this.xrtPrmeRt, this.setXrtPrmeRt]		= this.useState('xrtPrmeRt', '');		// 환율우대율
		
		[this.krwAmt, this.setKrwAmt]			= this.useState('krwAmt', '');			// 원화금액
		[this.krwAmtOut, this.setKrwAmtOut]		= this.useState('krwAmtOut', '');		// 원화금액 - 한글
		[this.plInfAmt, this.setPlInfAmt]		= this.useState('plInfAmt', '');		// 손익정보
		[this.plInfAmtOut, this.setPlInfAmtOut]	= this.useState('plInfAmtOut', '');		// 손익정보 - 한글
		
		[this.exBenefit_1, this.setExBenefit_1] = this.useState('exBenefit_1', '');
		[this.exBenefit_0, this.setExBenefit_0] = this.useState('exBenefit_0', '');
		[this.ex_1, this.setEx_1] = this.useState('ex_1', '');
		[this.ex_0, this.setEx_0] = this.useState('ex_0', '');
		[this.bankBenefit_1, this.setBankBenefit_1] = this.useState('bankBenefit_1', '');
		[this.bankBenefit_0, this.setBankBenefit_0] = this.useState('bankBenefit_0', '');
		
	}
	
	init () {
		super.init(this);
		
		this.initCucd();
		
		this.register();
	}
	
	register () {
		console.log("#####환율계산기 REGISTER START");
		// 탭 클릭
		const tabClickCallback = (event) => {
			const target = event.currentTarget.id;
			const nowTab = this.tabType.value;

			//당발송금 탭인 경우 당발송금수수료 영역 노출
			if(target == 'tab3') {
				$$("#exFeePop").show();
			} else {
				$$("#exFeePop").hide();
			}
			if (target !== 'tab' + nowTab) {
				$$('#selectTab').find('.tab-list').find('.tab').removeClass('tab-active');
				$$('#selectTab').find('.tab-list').find('#'+target).addClass('tab-active');
				console.log("####tabclickcallback", target.replace(/tab/gi, ''));
				this.setTabType(target.replace(/tab/gi, ''));
				this.initData('tab');
				tabContent.afterLoadTab();
			}
		}
		const tab01Title = $$("#tab1").elements[0];
		const tab02Title = $$("#tab2").elements[0];
		const tab03Title = $$("#tab3").elements[0];
		const tab04Title = $$("#tab4").elements[0];
		
		const tabTargets = { elements : [tab01Title, tab02Title, tab03Title, tab04Title] };
		const tabClickCallbacks = [tabClickCallback, tabClickCallback, tabClickCallback, tabClickCallback];
		this.registerCallback('click', tabTargets, tabClickCallbacks);
		
		// 통화 변경
		this.bind('cucd', $$('#cucd'), 'input');
		this.bind('cucdKrNm', $$('#cucdKrNm'), 'input');
		const cucdBtnClick = async () => {
			await GlobalApp.popupUtils.openPopup('fncpls42p', {
				showCloseBtn : true,
				params : {
					currentCucd : this.cucd.value,
					cucdList : this.cucdList.value
				},
				onCallback : (result) => {
					this.setCucd(result.selCucd);
					this.initData('cucd');
				}
			});
		}
		this.registerCallback('touchend', $$("#cucdIcon"), cucdBtnClick);
		
		//당발송금수수료
		const exFeeBtnClick = async () => {
			await GlobalApp.popupUtils.openPopup('fncpls40mfee', {
				showCloseBtn : true,
				onCallback: (result) => this.callbackFunc(result),
			});
		}
		this.registerCallback('touchend', $$("#exFeebtn"), exFeeBtnClick);
		
		// 외화 입력
		this.bind('iptAmt', $$('#iptAmt'), 'input');
		this.bind('iptAmtOut', $$('#iptAmtOut'), 'span');
		
		// 외화 입력시 화면 움직임 추가
		const iptAmtKeyup = () => {
			let val = event.currentTarget.value;
			val = val.replace(/[^\,0-9]/g, '');
			
			this.setIptAmt(val);
			if ($$('#iptAmt').value() === '0' && event.key === '0') {
				this.setIptAmt('');
				return;
			}
			
			const newValue = CmmUtils.removeComma(this.iptAmt.value);
			if (newValue !== '') {
				this.setIptAmt(CmmUtils.comma(newValue));
			}
			
			this.loadIptAmtOut();
		}
		this.registerCallback('keyup', $$("#iptAmt"), iptAmtKeyup);
		const iptAmtClick = () => {
			const input = event.target;
			input.setSelectionRange(input.value.length, input.value.length);
		}
		this.registerCallback('touchend', $$("#iptAmt"), iptAmtClick);
		
		// 환율 우대율 선택
		this.bind('xrtPrmeRt', $$('#xrtPrmeRt'), 'button');
		const xrtPrmeRtClick = async () => {
			await GlobalApp.popupUtils.openPopup('fncpls41p', {
				showCloseBtn : true,
				btn2Label : '확인',
				btn2IsMain : true,
				params : {
					xrtPrmeRt : this.xrtPrmeRt.value
				},
				onYes : (result) => {
					if (result.resultCd === '000000') {
						let iptPrmeRt = result.data.iptPrmeRt;
						if (iptPrmeRt !== '') {
							iptPrmeRt += '%';
						}
						this.setXrtPrmeRt(iptPrmeRt);
					}
				}
			});
		}
		this.registerCallback('touchend', $$('#xrtPrmeRt'), xrtPrmeRtClick);
		
		// 조회 버튼 클릭
		this.bind('krwAmt', $$('#krwAmt'), 'input');
		this.bind('krwAmtOut', $$('#krwAmtOut'), 'span');
		this.bind('plInfAmt', $$('#plInfAmt'), 'input');
		this.bind('plInfAmtOut', $$('#plInfAmtOut'), 'span');
		const searchBtnClick = async () => {
			await this.search();
		}
		this.registerCallback("touchend", $$("#btnSearch"), searchBtnClick);
		
		//$$('#dotShow').on('click', async () => await this.handleDotClick());
		this.bind('exBenefit_1', $$('#exBenefit_1'), 'span');
		this.bind('exBenefit_0', $$('#exBenefit_0'), 'span');
		this.bind('ex_1', $$('#ex_1'), 'input');
		this.bind('ex_0', $$('#ex_0'), 'span');
		this.bind('bankBenefit_1', $$('#bankBenefit_1'), 'span');
		this.bind('bankBenefit_0', $$('#bankBenefit_0'), 'span');
	}

//	/**
//    * 소수점 노출 처리
//    */
//	async handleDotClick() {
//		const licSel = $('#licNoSel').is(':checked');
//		if(licSel === true) {
//			const exStandardPrev = await this.searchStandardPrev();
//			this.setExBenefit_1(CmmUtils.comma(this.addDot(resAfter.data.krwAm12)));
//			this.setExBenefit_0(CmmUtils.comma(this.addDot(resPrev.data.krwAm12)));
//			this.setEx_1(CmmUtils.comma(exStandard));
//			this.setEx_0(CmmUtils.comma(exStandardPrev));
//			this.setBankBenefit_1(CmmUtils.comma(this.addDot(resAfter.data.sbPftAm13)));
//			this.setBankBenefit_0(CmmUtils.comma(this.addDot(resPrev.data.sbPftAm13)));
//		} else {
//			this.setExBenefit_1(CmmUtils.comma(resAfter.data.krwAm12));
//			this.setExBenefit_0(CmmUtils.comma(resPrev.data.krwAm12));
//			this.setEx_1(CmmUtils.comma(exStandard));
//			this.setEx_0(CmmUtils.comma(resPrev.data.cusPxrtPsnb12));
//			this.setBankBenefit_1(CmmUtils.comma(resAfter.data.sbPftAm13));
//			this.setBankBenefit_0(CmmUtils.comma(resPrev.data.sbPftAm13));
//		}
//	}
		
	addDot (num) {
		num = num + "";
		return num.slice(0,-2) + "." + num.slice(-2);
	}
	
	/**
	 * 1, 10, 1000, ... 단위인 경우 체크
	 */
	isPowerOfTen(n) {
		if(n <= 0 || !Number.isInteger(n)) {
			return false;
		}
		const logValue = Math.log10(n);
		return logValue % 1 === 0;
	}
	
	async search () {
		let cusPxrtPcnt11 = this.xrtPrmeRt.value.replace('%', '');
		console.log("---cusPxrtPcnt11 : " + cusPxrtPcnt11);
		
		const exStandard = await this.searchStandard();
		
		if(exStandard != null) {
			const exStandardPrev = await this.searchStandardPrev();
			const resAfter = await this.searchAfter();
			let resPrev = cusPxrtPcnt11 == '' ? resAfter : await this.searchPrev();
			
			this.setExBenefit_1(CmmUtils.comma(resAfter.data.krwAm12));
			this.setExBenefit_0(CmmUtils.comma(resPrev.data.krwAm12));
			this.setEx_1(CmmUtils.comma(exStandard));
			this.setEx_0(CmmUtils.comma(exStandardPrev));
//			this.setEx_0(CmmUtils.comma(resPrev.data.cusPxrtPsnb12));
			this.setBankBenefit_1(CmmUtils.comma(resAfter.data.sbPftAm13));
			this.setBankBenefit_0(CmmUtils.comma(resPrev.data.sbPftAm13));
			
//			전체소수점적용
//			const exStandardPrev = await this.searchStandardPrev();
//			this.setExBenefit_1(CmmUtils.comma(this.addDot(resAfter.data.krwAm12)));
//			this.setExBenefit_0(CmmUtils.comma(this.addDot(resPrev.data.krwAm12)));
//			this.setEx_1(CmmUtils.comma(exStandard));
//			this.setEx_0(CmmUtils.comma(exStandardPrev));
//			this.setBankBenefit_1(CmmUtils.comma(this.addDot(resAfter.data.sbPftAm13)));
//			this.setBankBenefit_0(CmmUtils.comma(this.addDot(resPrev.data.sbPftAm13)));
		}
	}
	
	async searchAfter () { //우대후 환율
		const url = '/api/fncplsXrt/getXrtCal.json';
		const params = {
				inqDscd : this.tabType.value,
				cucd11 : this.cucd.value,
				fcAmPsnb11 : CmmUtils.removeComma(this.iptAmt.value),
				cusPxrtPcnt11 : this.xrtPrmeRt.value.replace('%', '')
		};
		
		const res = await ApiUtils.sendPost(url, params);
		console.log("---req 우대후 : " + JSON.stringify(params, null, 2));
		console.log("---res 우대후 : " + JSON.stringify(res, null, 2));
		if (res.resultCode === '000000') {
			return res;
		} else {
			await this.searchFail ();
			return null;
		}
	}
	
	async searchPrev () { //우대전 환율
		const url = '/api/fncplsXrt/getXrtCal.json';
		const params = {
				inqDscd : this.tabType.value,
				cucd11 : this.cucd.value,
				fcAmPsnb11 : CmmUtils.removeComma(this.iptAmt.value),
				cusPxrtPcnt11 : ''
		};
		
		const res = await ApiUtils.sendPost(url, params); 
		console.log("---req 우대전 : " + JSON.stringify(params, null, 2));
		console.log("---res 우대전 : " + JSON.stringify(res, null, 2));
		if (res.resultCode === '000000') {
			return res;
		} else {
			await this.searchFail ();
			return null;
		}
	}
	
	async searchStandard () { //기준환율조회
		const url = '/api/fncplsXrt/getXrtCal.json';
		let fcAmPsnb = 100;
		let cucd = this.cucd.value;
		if(cucd == 'JPY') {
			fcAmPsnb = 10000;
		}
		const params = {
				inqDscd : this.tabType.value,
				cucd11 : cucd,
				fcAmPsnb11 : fcAmPsnb,
				cusPxrtPcnt11 : this.xrtPrmeRt.value.replace('%', '')
		};
		
		const res = await ApiUtils.sendPost(url, params); 
		console.log("---req 적용환율 : " + JSON.stringify(params, null, 2));
		console.log("---res 적용환율 : " + JSON.stringify(res, null, 2));
		if (res.resultCode === '000000') {
			return this.addDot(res.data.krwAm12);
		} else {
			await this.searchFail ();
			return null;
		}
	}
	
	async searchStandardPrev () { //우대 전 기준환율조회
		const url = '/api/fncplsXrt/getXrtCal.json';
		let fcAmPsnb = 100;
		let cucd = this.cucd.value;
		if(cucd == 'JPY') {
			fcAmPsnb = 10000;
		}
		const params = {
				inqDscd : this.tabType.value,
				cucd11 : cucd,
				fcAmPsnb11 : fcAmPsnb,
				cusPxrtPcnt11 : ''
		};
		
		const res = await ApiUtils.sendPost(url, params); 
		console.log("---req 우대전 적용환율 : " + JSON.stringify(params, null, 2));
		console.log("---res 우대전 적용환율 : " + JSON.stringify(res, null, 2));
		if (res.resultCode === '000000') {
			return this.addDot(res.data.krwAm12);
		} else {
			await this.searchFail ();
			return null;
		}
	}
	
	async searchFail () {
		const currentHour = new Date().getHours();
		const msg = currentHour < 9 ? '환율 고시전입니다. <br>영업일 9시 이후 이용하실 수 있습니다.' : '일시적인 오류가 발생하였습니다. 잠시 후 다시 이용해 주세요.';
		CmmUtils.alert('', msg, {
			btnLabel : '확인',
			useCancelBtn : false
		}).then(() => {
			if (currentHour < 9) {
				document.getElementById('backBtn').click();
			}
		});
		this.setKrwAmt('');
		this.setKrwAmtOut('');
		this.setPlInfAmt('');
		this.setPlInfAmtOut('');
	}
	
	async initCucd () {
		console.log("#####initCucd");
		const url = '/api/fncplsXrt/getCmnCucd.json';
		const params = {};
		const res = await ApiUtils.sendPost(url, params);
		
		const cucdList = res.data || [];
		
		this.setCucdList(cucdList);
		console.log("#####loadCucd", this.cucdList.value);
		await this.loadCucd();
		await this.search();
	}
	
	async initData (type) {
		// 탭 이동 시나 통화 변경시 데이터 초기화.
		if (type !== 'cucd') {
			this.setCucd('USD');
			this.setIptAmt('1');
			this.setXrtPrmeRt('');
			
			await this.loadCucd();
			await this.search();
		} else {
			this.loadCucd();
			
			this.setKrwAmt('');
			this.setKrwAmtOut('');
			this.setPlInfAmt('');
			this.setPlInfAmtOut('');
		}
	}
	
	async loadCucd () {
		console.log("#####loadCucd", this.cucd.value);
		
		const cucdData = this.cucdList.value.find(x => x.PB_CMN_CD_ID === this.cucd.value);
		console.log("#####cucdData", cucdData);
		
		const cucdIcon = 'flag-' + this.cucd.value.substring(0,2).toLowerCase();
		$$('#cucdIcon').removeAllClass();
		$$('#cucdIcon').addClass('flag');
		$$('#cucdIcon').addClass(cucdIcon);
		this.setCucdKrNm(cucdData.PB_CMN_CD_NM);
		console.log("#####this.cucdKrNm.value", this.cucdKrNm.value);
		this.loadIptAmtOut();
	}
	
	loadIptAmtOut () {
		console.log("####loadIptAmtOut");
		let iptAmtOut = this.iptAmt.value;
		let cucdType = this.cucdKrNm.value.split(' ')[1];
		if (this.cucd.value === 'JPY') {
			cucdType = cucdType.replace(/[0-9]/g, '');
		}
		this.setIptAmtOut(this.showAmtOut(CmmUtils.removeComma(iptAmtOut))+cucdType);
		console.log("#####this.iptAmtOut.value", this.iptAmtOut.value);
	}
	
	showAmtOut (num) {
		if (num === null || num === '') {
			num = '0';
		}
		let iNum = parseInt(num);
		let sNum = iNum.toString();
		let numL = Math.ceil(sNum.length / 4);
		let rVal = '';
		let uNum = 0;
		if (numL > 2) {
			uNum = Math.floor(iNum / 100000000);
			rVal += CmmUtils.comma(uNum) + "억";
			
			iNum -= uNum*100000000;
			sNum = iNum.toString();
			numL = Math.ceil(sNum.length / 4);
		}
		if (numL === 2) {
			uNum = Math.floor(iNum / 10000);
			rVal += CmmUtils.comma(uNum) + "만";

			iNum -= uNum*10000;
			sNum = iNum.toString();
			numL = Math.ceil(sNum.length / 4);
		}
		if (numL < 2 && iNum !== 0) {
			uNum = Math.floor(iNum / 1);
			rVal += CmmUtils.comma(uNum);
		}
		return rVal;
	}
	
	destroy () {
		super.destroy(this);
	}
}