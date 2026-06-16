/*************************************************************************
* @ 서비스경로 : FNCPLS17P
* @ 파일명      : FNCPLS17P 금융+ > 예적금계산기 > 예금계산 > 검색 결과
* @ 화면ID	  : PBWFI019901, PBWFI019902 (단리.복리)
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FNCPLS17P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.keepMoney, this.setKeepMoney] = this.useState('keepMoney', '');
	}
	
	init (param) {
		super.init(this);
		console.log(' 금융+ > 예적금계산기 > 적금계산 > 목표금액모으기');
		
		this.setKeepMoney(param.asetGoalAm);

		this.register();

		this.search(param);
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {

		// 조회결과 tab버튼 callback
		const tabClickCallback = (event) => {
			
			const target = event.currentTarget.id;
			$$("#cmmModal").find(".tab-list").find('.tab').removeClass('tab-active');
			$$("#cmmModal").find(".tab-list").find('#'+target).addClass('tab-active');
			
			if(target === "dan") {
				$$("#danDiv").show();
				$$("#bokDiv").hide();
			} else if(target === "bok") {
				$$("#danDiv").hide();
				$$("#bokDiv").show();
			}
		}
		
		const danBtn = $$("#dan").elements[0];
		const bokBtn = $$("#bok").elements[0];

		// 조회결과 tab버튼 click
		const tabTargets = { elements : [danBtn, bokBtn] };
		const tabClickCallbacks = [tabClickCallback,tabClickCallback]

		// 이벤트 등록
		this.registerCallback("click", tabTargets, tabClickCallbacks);
	}


	
	async search(param) {
		
		const data = await ApiUtils.sendPost('/api/fncpls/getInsvByMnRcvAm.json', param);
		
		// 데이터세팅
		if(data.resultCode === '000000') {
			
			this.dataSet(data.data);
		}
		
	}
	
	dataSet(data) {
		
		// 과세(단리)
		$$("#area1").text(data.trnCitAplTxrt1+"%");						// 세율
		$$("#area2").text(CmmUtils.comma(data.addMmAcldAm1)+"원");	// 매월
																							// 적립액
		$$("#area3").text(CmmUtils.comma(data.totPidPrn1)+"원");	// 납입원금
		$$("#area4").text(CmmUtils.comma(data.bftxIntAm1)+"원");	// 세전이자
		$$("#area5").text(CmmUtils.comma(data.actxAm1)+"원");		// 세금
		$$("#area6").text(CmmUtils.comma(data.aftxIntAm1)+"원");	// 세후이자
		// 비과세(단리)
		$$("#area7").text("0.0%");										// 세율
		$$("#area8").text(CmmUtils.comma(data.addMmAcldAm2)+"원");	// 매월
																							// 적립액
		$$("#area9").text(CmmUtils.comma(data.totPidPrn2)+"원");	// 납입원금
		$$("#area10").text( CmmUtils.comma(data.bftxIntAm2)+"원");	// 세전이자
		$$("#area11").text( "0원");										// 세금
		$$("#area12").text( CmmUtils.comma(data.aftxIntAm2)+"원");	// 세후이자
		
		// 과세(복리)
		$$("#area21").text(data.trnCitAplTxrt3+"%");						// 세율
		$$("#area22").text(CmmUtils.comma(data.addMmAcldAm3)+"원");	// 매월
																								// 적립액
		$$("#area23").text(CmmUtils.comma(data.totPidPrn3)+"원");	// 납입원금
		$$("#area24").text(CmmUtils.comma(data.bftxIntAm3)+"원");	// 세전이자
		$$("#area25").text(CmmUtils.comma(data.actxAm3)+"원");		// 세금
		$$("#area26").text(CmmUtils.comma(data.aftxIntAm3)+"원");	// 세후이자
		// 비과세(복리)
		$$("#area27").text("0.0%");										// 세율
		$$("#area28").text(CmmUtils.comma(data.addMmAcldAm4)+"원");	// 매월
																								// 적립액
		$$("#area29").text(CmmUtils.comma(data.totPidPrn4)+"원");	// 납입원금
		$$("#area30").text(CmmUtils.comma(data.bftxIntAm4)+"원");	// 세전이자
		$$("#area31").text("0원");											// 세금
		$$("#area32").text(CmmUtils.comma(data.aftxIntAm4)+"원");	// 세후이자
	}
	
	destroy() {
		super.destroy(this);
	}
	
	
}

