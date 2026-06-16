/*************************************************************************
* @ 서비스경로 : FND12S
* @ 파일명      : FND12S.js 펀드 > 펀드찾기 > 결과 > 조회조건 팝업
* @ 화면ID		: PBWFU000002
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FND_INQ_CND extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.sort, this.setSort] = this.useState('sort', 'PP');		//ptrt : 수익률순, sel: 판매순
		[this.term, this.setTerm] = this.useState('term', '3');
		[this.filter, this.setFilter] = this.useState('filter', 'N'); //all : 전체, rcm : 추천
		
	}
	
	init(param) {
		console.log(' 펀드 > 펀드찾기 > 결과 > 조회조건 팝업');

		super.init(this);
		
		const _this = this;
		this.setTerm(param.term);
		this.setSort(param.sort);
		this.setFilter(param.filter);
		document.querySelector('input[name="sort"][value="'+param.sort+'"]').setAttribute("checked",true);
		document.querySelector('input[name="term"][value="'+param.term+'"]').setAttribute("checked",true);
		document.querySelector('input[name="filter"][value="'+param.filter+'"]').setAttribute("checked",true);
		
		let ele = document.getElementsByName('term');
		
		if(param.sort === 'SB') {
			$.each(ele, function(i, item){
				item.checked = false;
				if(item.value === '1') {
					_this.setTerm(item.value);
					item.checked = true;
				} else {
					item.parentElement.style.display = "none";
				}
	        });
		} else {
			$.each(ele, function(i, item){
				item.checked = false;
				if(item.value === '3') {
					_this.setTerm(item.value);
					item.checked = true;
				}
	        });
		}
		
		this.initRadio();
		
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
			
		
	}
	
	/**
	 * 저장 하단버튼 응답콜백
	 */
	
	returnToBtn2CallBack () {
		const param = {
			sort: this.sort.value
			, term: this.term.value
			, filter: this.filter.value
		}
		
		return param;
    }
	
	initRadio() {
		
		const setTerm = (event, element) => {
			this.setTerm(element.value);
	    }
		
		const setSort = (event, element) => {
			const _this = this;
			let ele = document.getElementsByName('term');
			if(element.value === 'SB') {
				$.each(ele, function(i, item){
					item.checked = false;
					if(item.value === '1') {
						_this.setTerm(item.value);
						item.checked = true;
					} else {
						item.parentElement.style.display = "none";
					}
		        });
			}  else {
				$.each(ele, function(i, item){
					item.checked = false;
					item.parentElement.style.display = "block";
					if(item.value === '3') {
						_this.setTerm(item.value);
						item.checked = true;
					} 
		        });
			}
			this.setSort(element.value);
	    }
		
		const setFilter = (event, element) => {
			this.setFilter(element.value);
	    }
		
		$$(document).findByName('sort', 'click', setSort);
		$$(document).findByName('term', 'click', setTerm);
		$$(document).findByName('filter', 'click', setFilter);
	}
	
	
	destroy() {
		super.destroy(this);
	}
	
	
}

