/*************************************************************************
* @ 서비스경로 : FND32P
* @ 파일명      : FND32P  펀드 > 펀드 상세 > 펀드 > 매매 기준일
* @ 화면ID	  : PBWFU049902
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FND32P extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    }

    init (param) {
    	
    	super.init(this);
    	console.log(param);
    	//매수방법 17이전,이후
    	
    	if(param.bsdtTxt1 !== '') {
	    	let bsdtTxt1 = param.bsdtTxt1.split(',');
	    	let scntTime = bsdtTxt1[0].split(':')[0].split(' ')[0];
	    	const scnt1 = bsdtTxt1[0].split(':')[1].replaceAll('T+','');
	    	const scnt2 = bsdtTxt1[1].split(':')[1].replaceAll('T+','');
	    	
	    	if (scntTime.indexOf('분') < 0 ) {
	    		scntTime += "00분";
	    	}
	    	
	    	$$("#scnt1").text(scntTime+" 이전-제"+scnt1+"영업일 기준가");
	    	$$("#scnt2").text(scntTime+" 이후-제"+scnt2+"영업일 기준가");
    	} else {
    		$$("#scnt1").hide();
    	    $$("#scnt2").hide();
    	}
    	
    	//환매방법 17이전,이후
    	if(param.bsdtTxt2 !== '' && param.bsdtTxt3 !== '') {
	    	let bsdtTxt2 = param.bsdtTxt2.split(',');
	    	let rprhTime = bsdtTxt2[0].split(':')[0].split(' ')[0];
	    	const rprh1 = bsdtTxt2[0].split(':')[1].replaceAll('T+','');
	    	const rprh2 = bsdtTxt2[1].split(':')[1].replaceAll('T+','');
    	
    	
	    	//환매방법 출금
	    	let bsdtTxt3 = param.bsdtTxt3.split(',');
	    	const rprh3 = bsdtTxt3[0].split(':')[1].replaceAll('T+','');
	    	const rprh4 = bsdtTxt3[1].split(':')[1].replaceAll('T+','');
	    	
	    	if (rprhTime.indexOf('분') < 0 ) {
	    		rprhTime += "00분";
	    	}
	    	$$("#rprh1").text(rprhTime+" 이전-제"+rprh1+"영업일 기준가, 제"+rprh3+"영업일 출금");
	    	$$("#rprh2").text(rprhTime+" 이후-제"+rprh2+"영업일 기준가, 제"+rprh4+"영업일 출금");
    	} else {
    		$$("#rprh1").hide();
    		$$("#rprh2").hide();
    	}
    }
    
    register() {
    	
    }
    
    destroy () {
        super.destroy(this);
    }
}
