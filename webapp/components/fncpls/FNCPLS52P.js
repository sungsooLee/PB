/*************************************************************************
* @ 서비스경로 : FNCPLS52P
* @ 파일명      : FNCPLS52P  금융+ > 실시간 환율조회 > [P] 환율정보 조회
* @ 화면ID	  : PBWFI059901
* @ 작성자      : 90196258
* @ 작성일      : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class FNCPLS52P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = elem;

		[this.cucd, this.setCucd]				= this.useState('cucd', '');		// 통화
		[this.nlKrNm, this.setNlKrNm]			= this.useState('nlKrNm', '');		// 통화 한글 이름
		[this.xrtntcDt, this.setXrtntcDt]		= this.useState('xrtntcDt', '');	// 고시기준일
		[this.pblsTm, this.setPblsTm]			= this.useState('pblsTm', '');		// 고시시각
		[this.rt, this.setRt]					= this.useState('rt', '');			// 매매기준율
		[this.tetSellRt, this.setTetSellRt]		= this.useState('tetSellRt', '');	// 전신환매도율
		[this.tetBuyRt, this.setTetBuyRt]		= this.useState('tetBuyRt', '');	// 전신환매입율
		[this.cshSellRt, this.setCshSellRt]		= this.useState('cshSellRt', '');	// 현찰매도율
		[this.cshBuyRt, this.setCshBuyRt]		= this.useState('cshBuyRt', '');	// 현찰매입율
		[this.faxcRt, this.setFaxcRt]			= this.useState('faxcRt', '');		// 대미환산율
		[this.pusdXcRt, this.setPusdXcRt]		= this.useState('pusdXcRt', '');	// 미불당환산율
		[this.ioffSellRt, this.setIoffSellRt]	= this.useState('ioffSellRt', '');	// 본지점매도율
		[this.ioffBuyRt, this.setIoffBuyRt]		= this.useState('ioffBuyRt', '');	// 본지점매입율
	}
	
	init (param) {
		super.init(this);
		
		this.register();
		
		this.dataSet(param);
	}
	
	register () {
		// 항목 바인드
		this.bind('cucd', $$('#cucd'), 'strong');			// 통화
		this.bind('nlKrNm', $$('#nlKrNm'), 'span');			// 통화 한글 이름
		this.bind('xrtntcDt', $$('#xrtntcDt'), 'td');		// 고시기준일
		this.bind('pblsTm', $$('#pblsTm'), 'td');			// 고시시각
		this.bind('rt', $$('#rt'), 'td');					// 매매기준율
		this.bind('tetSellRt', $$('#tetSellRt'), 'td');		// 전신환매도율
		this.bind('tetBuyRt', $$('#tetBuyRt'), 'td');		// 전신환매입율
		this.bind('cshSellRt', $$('#cshSellRt'), 'td');		// 현찰매도율
		this.bind('cshBuyRt', $$('#cshBuyRt'), 'td');		// 현찰매입율
		this.bind('faxcRt', $$('#faxcRt'), 'td');			// 대미환산율
		this.bind('pusdXcRt', $$('#pusdXcRt'), 'td');		// 미불당환산율
		this.bind('ioffSellRt', $$('#ioffSellRt'), 'td');	// 본지점매도율
		this.bind('ioffBuyRt', $$('#ioffBuyRt'), 'td');		// 본지점매입율
	}
	
	dataSet (param) {
		// 아이콘 추가
		$$("#iconNm").addClass(param.iconNm);
		this.setCucd(param.cucd);
		this.setNlKrNm(param.nlKrNm);
		
		const sDTM = dayjs(param.xrtntcDt + "" + param.pblsTm);
		this.setXrtntcDt(sDTM.format('YYYY-MM-DD'));
		this.setPblsTm(sDTM.format('HH:mm:ss'));
		this.setRt(param.rt);
		this.setTetSellRt(param.tetSellRt);
		this.setTetBuyRt(param.tetBuyRt);
		this.setCshSellRt(param.cshSellRt);
		this.setCshBuyRt(param.cshBuyRt);
		this.setFaxcRt(param.faxcRt);
		this.setPusdXcRt(param.pusdXcRt);
		this.setIoffSellRt(param.ioffSellRt);
		this.setIoffBuyRt(param.ioffBuyRt);
	}
	
	destroy () {
		super.destroy(this);
	}
}

