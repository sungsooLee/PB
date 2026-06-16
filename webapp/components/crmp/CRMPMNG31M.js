/*************************************************************************
* @ 서비스경로 : CRMPMNG31M
* @ 파일명      : CRMPMNG31M 고객관리 > 고객기여도 조회 결과
* @ 화면ID	  : PBWCL000001
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export default class CRMPMNG31M extends BaseModule {
	
    constructor(elem, data) {
        
    	super(elem);
    	[this.data, this.setData] = this.useState('data', data);
    	
    }

    init () {
    	
    	this.apiBcusCtbdDataSet();
    }

   
    
    apiBcusCtbdDataSet() {
    	
    	const _data = this.data.value || {};
    	
		if(_data === null && _data ===""){
			
            $$('#opgAvblSum2').text("");	//일반부문계
            $$('#opgPlSum2').text("");		//일반부문계
            $$('#opgAvblSum4').text("");	//신탁부문계
            $$('#opgPlSum4').text("");		//신탁부문계
            $$('#opgAvblSum6').text("");	//외환부문계
            $$('#opgPlSum6').text("");		//외환부문계
            $$('#opgAvblSum8').text("");	//카드부문계
            $$('#opgPlSum8').text("");		//카드부문계
            $$('#opgAvblSum9').text("");	//총합계

			$$('#notfound_1').show();
		}else{
			$$('#notfound_1').hide();
		}


		const encyAcnmNo1 = _data.encyAcnmNo1 || "";
		const encyAcnmNo2 = _data.encyAcnmNo2 || "";
		let saupza = "";
		let bupin = "";
		if(encyAcnmNo1.length>12){
			saupza = encyAcnmNo2
			bupin = encyAcnmNo1
		}else{
			saupza = encyAcnmNo1
			bupin = encyAcnmNo2
		}

        $$('#cusNm1').text(_data.cusNm1);			//고객명
        const totalnum = _data.itcsno1.substring(0,3) + "-" + _data.itcsno1.substring(3,7) + "-" + _data.itcsno1.substring(7);
        $$('#itcsno1').text(totalnum);				//통합고객번호

        $$('#encyAcnmNo1').text(bupin);				//법인번호
        $$('#encyAcnmNo2').text(saupza);			//사업자번호

        $$('#affNo').text(_data.affNo);				//계열번호
        $$('#lstnDscdNm').text(_data.lstnDscdNm);	//상장구분
        $$('#prcDscdNm').text(_data.prcDscdNm);		//처리구분
       
        const startDay = this.formatChange(_data.tgtYm1);
        const endDay = this.formatChange(_data.tgtYm2);
        $$('#test_date').text(startDay+"~"+endDay); //대상기간
        $$('#brcdKorlNm1').text(_data.brcdKorlNm1);	///대상지점
        $$('#cmszDisNm').text(_data.cmszDisNm);		//기업 규모


        //wtemplate 부분이였음..뭔지모르곘음..ㅠ
        $$("#tapftRsltRt").text(_data.tapftRsltRt.toFixed(2) + "%");					//총자산이익율
        $$("#riskWgtdAsetAm").text(CmmUtils.comma(_data.riskWgtdAsetAm));				//RWA
        $$("#xprsAm").text(CmmUtils.comma(_data.xprsAm));								//수출실적
        $$("#riskWgtdRsltRt").text(_data.riskWgtdRsltRt.toFixed(2) + "%");				//RAROC
        $$("#riskWgtdAsetPrftRt").text(_data.riskWgtdAsetPrftRt.toFixed(2) + "%"); 		//RORWA
        $$("#impRsltAm").text( CmmUtils.comma(_data.impRsltAm)); 						//수입실적
        $$("#bsdvSpclMorRflcAm").text( CmmUtils.comma(_data.bsdvSpclMorRflcAm)); 		//사업부, 툭별MOR반영
        $$("#rarAm").text( CmmUtils.comma(_data.rarAm)); 								//RAR
        $$("#lcalOpngAm").text( CmmUtils.comma(_data.lcalOpngAm)); 						//로칼 L/C개설
        $$("#lnamPftRt").text(_data.lnamPftRt.toFixed(2) + "%"); 						//대출금이익율
        $$("#rarRt").text(_data.rarRt.toFixed(2) + "%"); 								//RAR율
        $$("#lcalBuyAm").text( CmmUtils.comma(_data.lcalBuyAm)); 						//로칼 L/C매입
        $$("#bsdvSpclMorNtyRflcAm").text( CmmUtils.comma(_data.bsdvSpclMorNtyRflcAm));  //사업부, 특별MOR미반영
        $$("#totCtbRar").text( CmmUtils.comma( CmmUtils.comma(_data.totCtbRar))); 		//위험조정영업수익
        $$("#fxRsltAm").text( CmmUtils.comma(_data.fxRsltAm)); 							//외환실적

        $$('#opgAvblSum2').text(CmmUtils.comma(_data.opgAvblSum2));	   //일반부문계
        $$('#opgPlSum2').text(CmmUtils.comma(_data.opgPlSum2));		   //일반부문계
        $$('#opgAvblSum4').text(CmmUtils.comma(_data.opgAvblSum4));	   //신탁부문계
        $$('#opgPlSum4').text(CmmUtils.comma(_data.opgPlSum4));		   //신탁부문계
        $$('#opgAvblSum6').text(CmmUtils.comma(_data.opgAvblSum6));	   //외환부문계
        $$('#opgPlSum6').text(CmmUtils.comma(_data.opgPlSum6));		   //외환부문계
        $$('#opgAvblSum8').text(CmmUtils.comma(_data.opgAvblSum8));	   //카드부문계
        $$('#opgPlSum8').text( CmmUtils.comma(_data.opgPlSum8));	   //카드부문계
        $$('#opgAvblSum9').text(CmmUtils.comma(_data.opgAvblSum9));	   //총합계
        $$('#opgPlSum9').text(CmmUtils.comma(_data.opgPlSum9));		   //총합계
                                                                       
        $$("#prrmAvblSum2").text(CmmUtils.comma(_data.prrmAvblSum2));	   //일반부문계
        $$("#prrmPlSum2").text(CmmUtils.comma(_data.prrmPlSum2));		   //일반부문계
        $$("#prrmAvblSum4").text(CmmUtils.comma(_data.prrmAvblSum4));	   //신탁부문계
        $$("#prrmPlSum4").text(CmmUtils.comma(_data.prrmPlSum4));		   //신탁부문계
        $$("#prrmAvblSum6").text(CmmUtils.comma(_data.prrmAvblSum6));	   //외환부문계
        $$("#prrmPlSum6").text(CmmUtils.comma(_data.prrmPlSum6));		   //외환부문계
        $$("#prrmAvblSum8").text(CmmUtils.comma(_data.prrmAvblSum8));	   //카드부문계
        $$("#prrmPlSum8").text(CmmUtils.comma(_data.prrmPlSum8));		   //카드부문계
        $$("#prrmAvblSum9").text(CmmUtils.comma(_data.prrmAvblSum9));	   //총합계
        $$("#prrmPlSum9").text(CmmUtils.comma(_data.prrmPlSum9));		   //총합계

    }
    
    formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM');
    	}
    	return '-';
    }

    destroy () {
        super.destroy(this);
    }
}
