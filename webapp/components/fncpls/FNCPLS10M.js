/*************************************************************************
* @ 서비스경로 : FNCPLS10M
* @ 파일명      : FNCPLS10M  메인 > [T] 금융+
* @ 화면ID	  : PBWMA040000
* @ 작성자      : 90196258
* @ 작성일      : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14            90196258                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;
export default class FNCPLS10M extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.basDt, this.setBasDt]						= this.useState('basDt', '');
		[this.sbBasRtUSD, this.setSbBasRtUSD]			= this.useState('sbBasRtUSD', '');
		[this.ioffSellRtUSD, this.setIoffSellRtUSD]		= this.useState('ioffSellRtUSD', '');
		[this.ioffBuyRtUSD, this.setIoffBuyRtUSD]		= this.useState('ioffBuyRtUSD', '');
		[this.sbBasRtJPY, this.setSbBasRtJPY]			= this.useState('sbBasRtJPY', '');
		[this.ioffSellRtJPY, this.setIoffSellRtJPY]		= this.useState('ioffSellRtJPY', '');
		[this.ioffBuyRtJPY, this.setIoffBuyRtJPY]		= this.useState('ioffBuyRtJPY', '');
		[this.sbBasRtEUR, this.setSbBasRtEUR]			= this.useState('sbBasRtEUR', '');
		[this.ioffSellRtEUR, this.setIoffSellRtEUR]		= this.useState('ioffSellRtEUR', '');
		[this.ioffBuyRtEUR, this.setIoffBuyRtEUR]		= this.useState('ioffBuyRtEUR', '');
		[this.sbBasRtGBP, this.setSbBasRtGBP]			= this.useState('sbBasRtGBP', '');
		[this.ioffSellRtGBP, this.setIoffSellRtGBP]		= this.useState('ioffSellRtGBP', '');
		[this.ioffBuyRtGBP, this.setIoffBuyRtGBP]		= this.useState('ioffBuyRtGBP', '');
		[this.inqDate, this.setInqDate]					= this.useState('inqDate', '');
		[this.inqCnt, this.setInqCnt]					= this.useState('inqCnt', 0);
	}
	
	init () {
		super.init(this);
		
		this.validInqDate();
		this.getDateXrt();
		
		this.register();
	}
	
	register () {
		this.bind('basDt', $$('#basDt'), 'div');
		this.bind('sbBasRtUSD', $$('#sbBasRtUSD'), 'i');
		this.bind('ioffSellRtUSD', $$('#ioffSellRtUSD'), 'i');
		this.bind('ioffBuyRtUSD', $$('#ioffBuyRtUSD'), 'i');
		this.bind('sbBasRtJPY', $$('#sbBasRtJPY'), 'i');
		this.bind('ioffSellRtJPY', $$('#ioffSellRtJPY'), 'i');
		this.bind('ioffBuyRtJPY', $$('#ioffBuyRtJPY'), 'i');
		this.bind('sbBasRtEUR', $$('#sbBasRtEUR'), 'i');
		this.bind('ioffSellRtEUR', $$('#ioffSellRtEUR'), 'i');
		this.bind('ioffBuyRtEUR', $$('#ioffBuyRtEUR'), 'i');
		this.bind('sbBasRtGBP', $$('#sbBasRtGBP'), 'i');
		this.bind('ioffSellRtGBP', $$('#ioffSellRtGBP'), 'i');
		this.bind('ioffBuyRtGBP', $$('#ioffBuyRtGBP'), 'i');
		
		this.registerCallback('click', $$('#goFncMenu1'), () => {
			const route = 'fncpls10s';
			router.navigate(route, {});
		});
		
		this.registerCallback('click', $$('#goFncMenu2'), () => {
			const route = 'fncpls20s';
			router.navigate(route, {});
		});
		
		this.registerCallback('click', $$('#goFncMenu3'), () => {
			const route = 'fncpls40m';
			router.navigate(route, {});
		});
		
		this.registerCallback('click', $$('#goFncMenu4'), () => {
			const route = 'fncpls50m';
			router.navigate(route, {});
		});
	}
	
	validInqDate () {
		const currentDate = this.inqDate.value ? this.inqDate.value : dayjs();
		const inqDate = currentDate.day() === 0 ? currentDate.subtract(2, 'days') : currentDate.day() === 6 ? currentDate.subtract(1, 'days') : currentDate;
		this.setInqDate(inqDate);
	}
	
	showTodayXrt (grid1, grid2) {
		const cucdList = ['USD', 'JPY', 'EUR', 'GBP'];
		cucdList.forEach((item) => {
			this['setSbBasRt'+item](CmmUtils.comma(grid1.find(x => x.cucd === item).sbBasRt.toFixed(2)));
			this['setIoffSellRt'+item](CmmUtils.comma(grid2.find(x => x.cucd === item).tetBuyRt.toFixed(2)));
			this['setIoffBuyRt'+item](CmmUtils.comma(grid2.find(x => x.cucd === item).tetSellRt.toFixed(2)));
		});
	}
	
	async getDateXrt () {
		const inqDate = this.inqDate.value;
		let resFail = false;
		const url = '/api/fncplsXrt/getXrtInfo.json';
		const params = {
			inqDscd : '81',
			inqTgtDt : inqDate.format('YYYYMMDD')
		}
		// 오늘이 주말이면 직전 금요일로. 그날도 조회가 안되면 10회까지 시도 후 에러 처리.
		const res1 = await ApiUtils.sendPost(url, params);
		if (res1.resultCode === '000000') {
			params.inqDscd = '82';
			const res2 = await ApiUtils.sendPost(url, params);
			if (res2.resultCode === '000000') {
				this.setBasDt('고시기준일 : '+inqDate.format('YYYY-MM-DD')+' (단위:원)');
				this.showTodayXrt(res1.data.grid, res2.data.grid);
			} else {
				resFail = true;
			}
		} else {
			resFail = true;
		}
		
		if (resFail) {
			const inqCnt = this.inqCnt.value;
			if (inqCnt < 10) {
				const newInqDate = this.inqDate.value.subtract(1, 'days');
				this.setInqDate(newInqDate);
				this.validInqDate();
				this.setInqCnt(inqCnt+1);
				this.getDateXrt();
			} else {
				CmmUtils.alert('', '실시간 환율 정보는 영업일에만 제공하고 있습니다.', {
					btnLabel : '확인',
					useCancelBtn : false
				});
			}
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}