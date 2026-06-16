/*************************************************************************
* @ 서비스경로 : FNCPL21P
* @ 파일명      : FNCPL21P  금융+ > 대출계산기 > [P]검색 결과 > [T]만기일시
* @ 화면ID	  : PBWFI039901
* @ 작성자      : 90196258
* @ 작성일      : 2024-11-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-26            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FNCPLS21P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.popKeepMoney, this.setPopKeepMoney]		= this.useState('popKeepMoney', '');
		[this.popkeepMonth, this.setPopKeepMonth]		= this.useState('popkeepMonth', '');
		[this.popkeepMonth2, this.setPopKeepMonth2]		= this.useState('popkeepMonth2', '');
		[this.popKeepRate, this.setPopKeepRate]			= this.useState('popKeepRate', '');
		[this.dfrtmMcn, this.setDfrtmMcn]				= this.useState('dfrtmMcn', '');
		
		[this.sData, this.setSData]				= this.useState('sData', {});
		
		[this.mmPidAm, this.setMmPidAm]			= this.useState('mmPidAm', '');
		[this.lnintAm, this.setLnintAm]			= this.useState('lnintAm', '');
		[this.rpyAm, this.setRpyAm]			= this.useState('rpyAm', '');
		
		[this.tabType, this.setTabType]		= this.useState('tabType', 'tab01');
	}
	
	init (param) {
		super.init(this);
		console.log('금융+ > 대출계산기 > 대출계산 > 검색 결과');
		
		this.register();

		this.setPopKeepMoney(CmmUtils.comma(param.trnLnPrn) + "원");
		this.setPopKeepMonth(param.lnTemMcn + "개월");
		
		this.setPopKeepMonth2("-");
		this.setDfrtmMcn(param.dfrtmMcn);
		this.setPopKeepRate(param.lonLnIr + "%");
		
		this.search(param);
	}

	/**
	 * 이벤트 등록
	 */
	register () {
		// 바인드 작업
		this.bind('popKeepMoney', $$('#popKeepMoney'), 'dd');
		this.bind('popkeepMonth', $$('#popkeepMonth'), 'dd');
		this.bind('popkeepMonth2', $$('#popkeepMonth2'), 'dd');
		this.bind('popKeepRate', $$('#popKeepRate'), 'dd');
		
		this.bind('mmPidAm', $$('#mmPidAm'), 'dd');
		this.bind('lnintAm', $$('#lnintAm'), 'dd');
		this.bind('rpyAm', $$('#rpyAm'), 'dd');
		
		// 검색 결과 tab버튼 콜백
		const tabClickCallback = (event) => {
			
			const target = event.currentTarget.id;
			$$("#cmmModal").find(".tab-list").find('.tab').removeClass('tab-active');
			$$("#cmmModal").find(".tab-list").find('#'+target).addClass('tab-active');
			
			if(target === "tab01") {
				this.setTabType('tab01');
				this.dataSet();
				this.setPopKeepMonth2("-");
			} else if(target === "tab02") {
				this.setTabType('tab02');
				this.dataSet();
				if(this.dfrtmMcn.value === ""){
					this.setPopKeepMonth2("0개월");
				} else {
					this.setPopKeepMonth2(this.dfrtmMcn.value + "개월");
				}
			} else if(target === "tab03") {
				this.setTabType('tab03');
				this.dataSet();
				if(this.dfrtmMcn.value === ""){
					this.setPopKeepMonth2("0개월");
				} else {
					this.setPopKeepMonth2(this.dfrtmMcn.value + "개월");
				}
			}
			
			$$('.modal__content').scrollToTop(0);
		}
		
		const tab01Title = $$("#tab01").elements[0];
		const tab02Title = $$("#tab02").elements[0];
		const tab03Title = $$("#tab03").elements[0];
		
		// 검색 결과 tab버튼 click
		const tabTargets = { elements : [tab01Title, tab02Title, tab03Title] };
		const tabClickCallbacks = [tabClickCallback, tabClickCallback, tabClickCallback];
		
		// 이벤트 등록
		this.registerCallback("click", tabTargets, tabClickCallbacks);
	}
	
	async search (param) {
		const data = await ApiUtils.sendPost('/api/fncplsLnCal/getLnCal.json', param);
		if(data.resultCode !== '000000'){
			return;
		} else {
			this.setSData(data.data);
			
			this.dataSet();
		}
	}
	
	async dataSet () {
		const data = this.sData.value;
		const grid = data.grid1 || [];
		
		const sTabType = this.tabType.value;
		let tabNm = '1';
		
		if(sTabType === 'tab01') {
			tabNm = '1';
		} else if(sTabType === 'tab02') {
			tabNm = '2';
		} else if(sTabType === 'tab03') {
			tabNm = '3';
		}
		
		this.setMmPidAm(CmmUtils.comma(data['mmPidAm'+tabNm]) + '원');		// 월납입액
		this.setLnintAm(CmmUtils.comma(data['lnintAm'+tabNm]) + '원');		// 총 이자
		this.setRpyAm(CmmUtils.comma(data['rpyAm'+tabNm]));					// 총 상환금액
		$$('#rpyAm').append('<span>원</span>');
		
		let html = '';
		$$('#rpySQList').html(html);
		grid.forEach((item, index) => {
			html = '';
			html += '<dl class="list">';
			html += '	<dt>' + (index+1) + '회차' + '</dt>';
			html += '	<dd>';
			html += '		<div class="left">상환원리금</div>';
			html += '		<div class="right">' + CmmUtils.comma(item['rpyPiamAm'+tabNm])+'원' + '</div>';
			html += '	</dd>';
			html += '	<dd>';
			html += '		<div class="left">대출잔액</div>';
			html += '		<div class="right">' + CmmUtils.comma(item['lnBal'+tabNm])+'원' + '</div>';
			html += '	</dd>';
			html += '</dl>';
			
			$$('#rpySQList').append(html);
		});
		CmmUtils.hideLoading();
	}

	destroy() {
		super.destroy(this);
	}
}

