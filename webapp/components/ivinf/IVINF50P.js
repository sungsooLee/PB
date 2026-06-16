/*************************************************************************
* @ 서비스경로 : IVINF50P
* @ 파일명      : IVINF50P  투자정보 > 금융 뉴스 > [T]전체 > [P] 뉴스검색
* @ 화면ID	  : PBWIV099901
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

export class IVINF50P extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		
		[this.searchKeyword, this.setSearchKeyword]	= this.useState('searchKeyword', '');
		[this.searchNspbNm, this.setSearchNspbNm]	= this.useState('searchNspbNm', []);
	}
	
	init (param) {
		super.init(this);
		
		this.register();
	}
	
	register () {
		this.bind('searchKeyword', $$('#searchKeyword'), 'input');
		
		$('.input-remove').on('click', () => {this.setSearchKeyword('')});
		
		$$('#chkAll').on('change', async (elem) => {
			document.getElementById('chk01').checked = false;
			document.getElementById('chk02').checked = false;
			document.getElementById('chk03').checked = false;
			document.getElementById('chk04').checked = false;
			this.setSearchNspbNmList();
		});
		$$('#chk01').on('change', async (elem) => {
			document.getElementById('chkAll').checked = false;
			this.setSearchNspbNmList();
		});
		$$('#chk02').on('change', async (elem) => {
			document.getElementById('chkAll').checked = false;
			this.setSearchNspbNmList();
		});
		$$('#chk03').on('change', async (elem) => {
			document.getElementById('chkAll').checked = false;
			this.setSearchNspbNmList();
		});
		$$('#chk04').on('change', async (elem) => {
			document.getElementById('chkAll').checked = false;
			this.setSearchNspbNmList();
		});
	}
	
	setSearchNspbNmList () {
		const chkAll = document.getElementById('chkAll').checked;
		const chk01 = document.getElementById('chk01').checked;
		const chk02 = document.getElementById('chk02').checked;
		const chk03 = document.getElementById('chk03').checked;
		const chk04 = document.getElementById('chk04').checked;
		
		let chkList = [];
		if (!chkAll) {
			if (chk01) {
				chkList.push('매일경제');
			}
			if (chk02) {
				chkList.push('한국경제');
			}
			if (chk03) {
				chkList.push('연합뉴스');
			}
			if (chk04) {
				chkList.push('이데일리');
			}
		}
		this.setSearchNspbNm(chkList);
	}
	
	returnToBtn2CallBack () {
		if (!document.getElementById('chkAll').checked && !document.getElementById('chk01').checked && !document.getElementById('chk02').checked && !document.getElementById('chk03').checked && !document.getElementById('chk04').checked) {
			CmmUtils.alert('', '언론사를 선택해주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			});
			return;
		}
		const result = {
			data : {
				searchKeyword : this.searchKeyword.value,
				searchNspbNm : this.searchNspbNm.value
			},
			resultCd : '000000',
			resultMsg : 'SUCCESS'
		};
		
		return result;
	}
	
	destroy () {
		super.destroy(this);
	}
}