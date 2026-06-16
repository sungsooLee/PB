/*************************************************************************
* @ 서비스경로 : CRMPMNG42P
* @ 파일명      : CRMPMNG42P 고객관리 > 기업정보 상세조회 > 기업일반 > 대표자정보
* @ 화면ID	  : PBWCL030000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import ListManager from "../../../resources/js/common/ListManager.js";
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;


export class CRMPMNG42P extends BaseModule {

	
	constructor(elem) {
		super(elem);
        
		[this.param, this.setParam] = this.useState('param', elem);
		
	}
	
	init(param) {
		console.log('기업정보 조회 > 기업일반 > 대표자정보 팝업');

		super.init(this);
		
		this.apiRppeInfo(param);
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
	}
	
	
	/*
	 * 기업 조회
	 */
	async apiRppeInfo(param) {
		
		const data = await ApiUtils.sendPost('/api/crmp/rppeInfo.json', param);
		
		//데이터세팅
		if(data.resultCode === '000000') {
			this.apiRppeInfoDataSet(data.data);
		} 
		
	}
	
	apiRppeInfoDataSet(data) {
		const _data = data || {};
		const _this = this;
		
		$$("#sdt-dt").html('<span class="blind">인적사항</span>기준일자 : '+ _this.formatChange(data.infBasDt));
		let sex = "";
		let gend_num = _data.rrno.substr(6,7);
		if(gend_num % 2 === 0) {
			sex = "여";
		} else {
			sex = "남";
		}
		$$("#name").text(_data.rppeFnm + " " + _data.kedPosi + " (" + sex + ")");
		$("#reper-ccd").text(_data.rppeDscd);

		$$("#mrk-reper-yn").text(_data.markRppeYn);
		$$("#asmp-dt").text(_this.formatChange(_data.rppeIngtDt));
		$$("#po-yn").text(_data.pofYn);
		$$("#ttl").text(_data.kedPosi);
		$("#mng-fcd").text(_data.kedMngtSpcd);

		$$("#sind-eg-prd").text(_data.ptnshRppeWkYcnt + "년 " + _data.ptnshRppeWkMcn + "개월");
		$("#mdm-rel-cd").text(_data.mngtDmpeRlcdNm);
		$("#reper-mabl-cd").text(_data.kedMngtAblCd);

		$$("#cstk-own").text(CmmUtils.comma(_data.orstMlcn));
		$$("#pstk-own").text(CmmUtils.comma(_data.prrsMlcn));
		$$("#so-reg-cn").text(CmmUtils.comma(_data.stoGivStcCn));
		$$("#rmk").text(_data.rmrk);
    }
	
	
	
	isNull(data) {
		if( data !== ''  && data !== null) {
			return false;
		}
		return true;
	}
	
	formatChange (val) {
    	if(val !== '') {
    		return dayjs(val).format('YYYY-MM-DD');
    	}
    	return '-';
    }
    
	destroy() {
		super.destroy(this);
	}
	
	
}

