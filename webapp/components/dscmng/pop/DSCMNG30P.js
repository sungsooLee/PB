/*************************************************************************
* @ 서비스경로 : DSCMNG30P
* @ 파일명      : DSCMNG30P 일정관리 > 영업 캘린더 > 만기 상세 팝업
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class DSCMNG30P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	// 조회한 만기상세 데이터
    	[this.xrpDetail, this.setXrpDetail] = this.useState('xprDetail', '');
    }

    init (param) {
    	super.init(this);

    	this.getXrpDetail(param);
    }
       
    /**
     * 수신만기 상세
     */
    async getXrpDetail (obj) {
    	this.setXrpDetail({
    		name: obj.name
    		, cusGdcd: obj.cusGdcd
    		, actXprDt: obj.actXprDt
    		, actXprDt2: obj.actXprDt2
    		, actKrwBal: obj.actKrwBal
    		, itemId: obj.itemId
    		, prdNm: obj.prdNm
    		, crmpAcvtActSrno: obj.crmpAcvtActSrno
    		, aplIrt: obj.aplIrt
    		, kycReCnfScdDt: kycReCnfScdDt
    	});
    	
    	$$('#name').text(obj.name);
    	$$('#cusGdcd').text(obj.cusGdcd === '010100' ? 'TCE고객' : 'TC고객');
    	$$('#actXprDt').text(obj.actXprDt2);
    	$$('#afcKrwBal').text(obj.afcKrwBal);
    	$$('#itemId').text(obj.itemId);
    	$$('#prdNm').text(obj.prdNm);
    	$$('#crmpAcvtActSrno').text(obj.crmpAcvtActSrno);
    	$$('#aplIrt').text(obj.aplIrt + '%');
    	$$('#kycReCnfScdDt').text(obj.kycReCnfScdDt);
    }
    
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    async returnToBtn2CallBack () {
    	// 수신만기 정보를 하나의 문자열로 변경하기
    	let memo = "";
    	
    	memo += '-고객등급: ' + $$('#cusGdcd').text() + '\n';
    	memo += '-계좌잔액: ' + $$('#afcKrwBal').text() + '\n';
    	memo += '-통합고객번호: ' + $$('#itemId').text() + '\n';
    	memo += '-상품명: ' + $$('#prdNm').text() + '\n';
    	memo += '-계좌번호: ' + $$('#crmpAcvtActSrno').text() + '\n';
    	memo += '-이율(금리): ' + $$('#aplIrt').text() + '\n';
    	memo += '-KYC 재확인일: ' + $$('#kycReCnfScdDt').text() + '\n';

    	const param = {
    		basDt: this.xrpDetail.value.actXprDt
    		, name: $$('#name').text()
    		, memo: memo
    	}
    		
    	return param;
    }

    destroy () {
        super.destroy(this);
    }
}
