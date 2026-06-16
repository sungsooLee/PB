/*************************************************************************
* @ 서비스경로 : IVINF26S_L
* @ 파일명      : IVINF26S_L.js 투자정보 - 종합 주요지수 - 섹터지수 - 목록
* @ 화면ID		: PBWIV060000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-08            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF26S_L extends BaseModule {
	constructor(elem, eventTarget) {
		super(elem);
		this.elem = elem;
        this.eventTarget = eventTarget;
    }

	init () {
        this.initListRegist();
    }
	
	/**
	 * 각 지수별 class 적용
	 * @param
	 */
	async initListRegist() {
		// 1W
		const prftRt2Val = $$(this.elem).find('[data-bind="prftRt2Val"]').text();
		const prftRt2ValColor = await this.colorRegist(parseFloat(prftRt2Val));
		$$(this.elem).find('[data-bind="prftRt2Val"]').addClass(prftRt2ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt2Val"]').addClass(prftRt2ValColor.fontColor);
		// 1M
		const prftRt3Val = $$(this.elem).find('[data-bind="prftRt3Val"]').text();
		const prftRt3ValColor = await this.colorRegist(prftRt3Val);
		$$(this.elem).find('[data-bind="prftRt3Val"]').addClass(prftRt3ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt3Val"]').addClass(prftRt3ValColor.fontColor);
		// 3M
		const prftRt4Val = $$(this.elem).find('[data-bind="prftRt4Val"]').text();
		const prftRt4ValColor = await this.colorRegist(prftRt4Val);
		$$(this.elem).find('[data-bind="prftRt4Val"]').addClass(prftRt4ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt4Val"]').addClass(prftRt4ValColor.fontColor);
		// 6M
		const prftRt5Val = $$(this.elem).find('[data-bind="prftRt5Val"]').text();
		const prftRt5ValColor = await this.colorRegist(prftRt5Val);
		$$(this.elem).find('[data-bind="prftRt5Val"]').addClass(prftRt5ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt5Val"]').addClass(prftRt5ValColor.fontColor);
		// prftRt7Val
		const prftRt7Val = $$(this.elem).find('[data-bind="prftRt7Val"]').text();
		const prftRt7ValColor = await this.colorRegist(prftRt7Val);
		$$(this.elem).find('[data-bind="prftRt7Val"]').addClass(prftRt7ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt7Val"]').addClass(prftRt7ValColor.fontColor);
		// 1Y
		const prftRt6Val = $$(this.elem).find('[data-bind="prftRt6Val"]').text();
		const prftRt6ValColor = await this.colorRegist(prftRt6Val);
		$$(this.elem).find('[data-bind="prftRt6Val"]').addClass(prftRt6ValColor.resultColor);
		$$(this.elem).find('[data-bind="prftRt6Val"]').addClass(prftRt6ValColor.fontColor);
	}
	
	/**
	 * 각 수치별 계산값으로 색상을 변경
	 * fontColor = 'fc' > 임의의 값(빈값 넣을시 에러)
	 * @param
	 */
	async colorRegist(val) {
		let resultColor = '';
		let fontColor = 'fc-typography-white';
		
		if(val > 0 && val <= 5) {
			resultColor = 'bg-red-50';
			fontColor = 'fc';
		} else if(val > 5 && val <= 10) {
			resultColor = 'bg-red-100';
			fontColor = 'fc';
		} else if(val > 10 && val <= 15) {
			resultColor = 'bg-red-200';
		} else if(val > 15 && val <= 20) {
			resultColor = 'bg-red-300';
		} else if(val > 20) {
			resultColor = 'bg-red-400';
		} else if(val < 0 && val >= -5) {
			resultColor = 'bg-deepblue-50';
			fontColor = 'fc';
		} else if(val < -5 && val >= -10) {
			resultColor = 'bg-deepblue-100';
			fontColor = 'fc';
		} else if(val < -10 && val >= -15) {
			resultColor = 'bg-deepblue-200';
		} else if(val < -15 && val >= -20) {
			resultColor = 'bg-deepblue-300';
		} else if(val < -20) {
			resultColor = 'bg-deepblue-400';
		}
		
		return {'resultColor':resultColor , 'fontColor':fontColor};
	}

    destroy() {
        super.destroy(this);
    }
}