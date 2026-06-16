/*************************************************************************
* @ 서비스경로 : FNCPLS14P
* @ 파일명      : FNCPLS14P  금융+ > 예적금계산기 > 예금계산 > 검색 결과
* @ 화면ID	  : PBWFI019901, PBWFI019902 (단리.복리)
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';

export class FNCPLS14P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.keepMoney, this.setKeepMoney] = this.useState('keepMoney', '');
		[this.dpstmMcn, this.setDpstmMcn] = this.useState('dpstmMcn', '');

	}
	
	init (param) {
		super.init(this);
		console.log(' 금융+ > 예적금계산기 > 적금계산 > 매월모으기 > 결과');

		this.setKeepMoney(param.addMmAcldAm);
		this.setDpstmMcn(param.dpstmMcn);
		
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
		
		const data = await ApiUtils.sendPost('/api/fncpls/getInsvSprAm.json', param);
		
		// 데이터세팅
		if(data.resultCode === '000000') {
			
			this.dataSet(data.data);
		}
		
	}
	
	dataSet(data) {
		
		const keepMoney = CmmUtils.removeComma(this.keepMoney.value.trim());
		const dpstmMcn = CmmUtils.removeComma(this.dpstmMcn.value);
		
		//과세(단리)
		$$('#area1').text(data.trnCitAplTxrt1+"%");						//세율
		$$('#area2').text(CmmUtils.comma(Number(keepMoney)*Number(dpstmMcn))+"원");			//납입원금
		$$('#area3').text(CmmUtils.comma(data.totPayAm1)+"원");		//만기지급액
		$$('#area4').text(CmmUtils.comma(data.actxAm1)+"원");		//세금
		$$('#area5').text(CmmUtils.comma(data.aftxIntAm1)+"원");	//세후이자
		//비과세(단리)
		$$("#area6").text("0.0%");										//세율
		$$("#area7").text(CmmUtils.comma(Number(keepMoney)*Number(dpstmMcn))+"원");				//납입원금
		$$("#area8").text(CmmUtils.comma(data.totPayAm2)+"원");		//만기지급액
		$$("#area9").text("0원");											//세금
		$$("#area10").text(CmmUtils.comma(data.aftxIntAm2)+"원");	//세후이자
		 
		//과세(복리)
		$$("#area11").text(data.trnCitAplTxrt3+"%");						//세율
		$$("#area12").text(CmmUtils.comma(Number(keepMoney)*Number(dpstmMcn))+"원");			//납입원금
		$$("#area13").text(CmmUtils.comma(data.totPayAm3)+"원");	//만기지급액
		$$("#area14").text(CmmUtils.comma(data.actxAm3)+"원");		//세금
		$$("#area15").text(CmmUtils.comma(data.aftxIntAm3)+"원");	//세후이자
		//비과세(복리)    
		$$("#area16").text("0.0%");										//세율
		$$("#area17").text(CmmUtils.comma(Number(keepMoney)*Number(dpstmMcn))+"원");				//납입원금
		$$("#area18").text(CmmUtils.comma(data.totPayAm4)+"원");	//만기지급액
		$$("#area19").text("0원");											//세금
		$$("#area20").text(CmmUtils.comma(data.aftxIntAm4)+"원"); 	//세후이자
	}
	
	destroy() {
		super.destroy(this);
	}
	
	
}

