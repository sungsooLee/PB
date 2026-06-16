/*************************************************************************
* @ 서비스경로 : FNCPLS50M
* @ 파일명      : FNCPLS50M  금융+ > 실시간 환율조회 > 실시간 환율 조회
* @ 화면ID	  : PBWFI050000
* @ 작성자      : 90196258
* @ 작성일      : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import ListManager from "../../resources/js/common/ListManager.js";

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class FNCPLS50M extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		this.listManager = null;
		this.eventReceiver = new EventTarget();
		
		[this.addGrid, this.setAddGrid]				= this.useState('addGrid', []);
		[this.searchGrid1, this.setSearchGrid1] 	= this.useState('searchGrid1', []);
		[this.searchGrid2, this.setSearchGrid2] 	= this.useState('searchGrids', []);
		[this.btnDatePicker, this.setBtnDatePicker]	= this.useState('btnDatePicker', '');
		
		[this.searchResult, this.setSearchResult]	= this.useState('searchResult', false);
	}
	
	init () {
		super.init(this);

		this.initDate();
		this.initExchangeAlim();
		this.register();
	}
	
	register () {
		const detailBtnCallback = () => {
			// target 데이터 저장 : cucd, iconNm
			const targetData = {
					cucd: event.currentTarget.value,
					iconNm: event.currentTarget.className.replace('flag ', '').replace(' flag-fluid', ''),
					nlKrNm: event.currentTarget.innerText.replace(/\n/, '').replace(event.currentTarget.value, '')
			};
			this.goDetailPage(targetData);
		}
		
		this.bind('btnDatePicker', $$('#btnDatePicker'), 'input');
		
		// 고시기준일
		this.registerCallback('click', $$('#btnDatePicker'), this.clickDate);
		
		// 상세버튼 클릭
		const detailBtn = $$('[id="detailBtn"]');
		const detailBtnCallbacks = Array(detailBtn.elements.length).fill(detailBtnCallback);

		this.registerCallback("click", detailBtn, detailBtnCallbacks);
		
		//환율알림설정 바로가기
		this.registerCallback('click', $$('#exchangeAlim'), () => {
			const route = 'menu14s';
			router.navigate(route, {});
		});
	}
	
	async initExchangeAlim() {
		let isShowAlim = false;
		const url = '/api/fncpls/getFncpls.json';
		const params1 = {sbscCd:'fncpls0001'};
		const params2 = {sbscCd:'fncpls0002'};
		const data1 = await ApiUtils.sendPost(url, params1);
		const data2 = await ApiUtils.sendPost(url, params2);

		if (data1.resultCode === '000000') {
			if( data1 != null && data1.data.length > 0 ) {
				if(data1.data[0].PBSBSCYN == 'Y') {
					isShowAlim = true;
				}
			}
		}
		
		if (data2.resultCode === '000000') {
			if( data2 != null && data2.data.length > 0 ) {
				if(data2.data[0].PBSBSCYN == 'Y') {
					isShowAlim = true;
				}
			}
		}
		
		if(isShowAlim) {
			$$('#exchangeAlimY').show();
			$$('#exchangeAlimN').hide();
		} else {
			$$('#exchangeAlimY').hide();
			$$('#exchangeAlimN').show();
		}
	}
	
	async initDate () {
		for (var i = 0; i < 10; i++) {
			const currentDate = dayjs().subtract(i, 'days');
			const inqDate = currentDate.day() === 0 ? currentDate.subtract(2, 'days') : currentDate.day() === 6 ? currentDate.subtract(1, 'days') : currentDate;
			this.setBtnDatePicker(inqDate.format('YYYY-MM-DD'));
			await this.search();
			
			if (this.searchResult.value) {
				break;
			}
		}
		
		if (!this.searchResult.value) {
			this.noSearchResult();
		}
	}
	
	async search () {
		$$("#sData").hide();
		
		const url = '/api/fncplsXrt/getXrtInfo.json';
		const params1 = {
				inqDscd: '81',
				inqTgtDt: this.btnDatePicker.value.replace(/-/gi, '')
		};
		console.log("---params1 : " + JSON.stringify(params1, null, 2));
		const data1 = await ApiUtils.sendPost(url, params1);
		if(data1.resultCode !== '000000'){
			this.noSearchResult();
			return;
		}
		this.setSearchGrid1(data1.data.grid);
		
		const params2 = {
				inqDscd: '82',
				inqTgtDt: this.btnDatePicker.value.replace(/-/gi, '')
		};
		console.log("---params2 : " + JSON.stringify(params2, null, 2));
		const data2 = await ApiUtils.sendPost(url, params2);
		if(data2.resultCode !== '000000'){
			this.noSearchResult();
			return;
		}
		this.setSearchGrid2(data2.data.grid);
		
		this.setSearchResult(true);
		this.dataSet();
	}
	
	noSearchResult () {
		$$("#sData").hide();
		$$("#noData").css({'display' : 'flex'});
	}
	
	async dataSet () {
		$$("#sData").show();
		
		let itemList = [];
		let sGrid1 = this.searchGrid1.value;
		let sGrid2 = this.searchGrid2.value;
		$.each(sGrid1, function(i, item){
			let nlNm = item.nlNm;
			let findData = sGrid2.find(x => x.nlNm === nlNm);
			let itemData = {
				cucd: item.cucd,								// 통화
				rt: CmmUtils.comma(item.sbBasRt.toFixed(2)),				// 매매기준율
				ioffSellRt: CmmUtils.comma(findData.tetBuyRt.toFixed(2)), 	// 본지점매도율
				ioffBuyRt: CmmUtils.comma(findData.tetSellRt.toFixed(2)),	// 본지점매입율
				pblsSq: item.pblsSq,						// 고시회차
				xrtntcDt: item.xrtntcDt,					// 고시기준일
				pblsTm: item.pblsTm,						// 고시시각
				tetSellRt: CmmUtils.comma(item.tetSellRt.toFixed(2)),		// 전신환매도율
				tetBuyRt: CmmUtils.comma(item.tetBuyRt.toFixed(2)),			// 전신환매입율
				cshSellRt: CmmUtils.comma(item.cshSellRt.toFixed(2)),		// 현찰매도율
				cshBuyRt: CmmUtils.comma(item.cshBuyRt.toFixed(2)),			// 현찰매입율
				faxcRt: item.faxcRt.toFixed(4),				// 대미환산율
				pusdXcRt: item.pusdXcRt.toFixed(4),			// 미불당환산율
				iconNm: '',									// class 아이콘 이름
				nlKrNm: ''									// 한글 이름
			}
			itemList.push(itemData);
		});
		
		this.setAddGrid(itemList);
		
		itemList.forEach((item) => {
			$$('#' + item.cucd + 'rt').text(item.rt);
			$$('#' + item.cucd + 'ioffSellRt').text(item.ioffSellRt);
			$$('#' + item.cucd + 'ioffBuyRt').text(item.ioffBuyRt);
		});
	}
	
	async goDetailPage (targetData) {
		let grid = this.addGrid.value;
		const param = grid.find(x => x.cucd === targetData.cucd);
		param.iconNm = targetData.iconNm;
		param.nlKrNm = targetData.nlKrNm;
		
		await GlobalApp.popupUtils.openPopup('fncpls52p', {
			showCloseBtn : true,
			btn2Label : '환율계산하기',
			btn2IsMain : true,
			params : param,
			onYes : (result) => this.goRateCalcPage(param.cucd)
		});
	}
	
	goRateCalcPage (cucd) {
		const param = {
			'cucd' : cucd
		}
		router.navigate('fncpls40m', param);
	}
	
	async clickDate (event) {
		await globalApp.popupUtils.openDatePickerPopup(this.btnDatePicker.value, Const.PickerType.DATE, {
			inputElem: $$('#btnDatePicker'),
			modalTitle: '고시기준일 선택',
			isDisabledFuture : true,
			onSelect: (result) => this.clickDateCallback(result),
			onClose : (result) => console.log('onClose Result : ', result)
		});
	}
	
	clickDateCallback (result) {
		this.setBtnDatePicker(result.date);
		this.search();
	}
	
	destroy() {
		super.destroy(this);
	}
}