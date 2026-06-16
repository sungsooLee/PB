/*************************************************************************
* @ 서비스경로 : CHART12P
* @ 파일명      : CHART12P.js 차트 > 펀드/지수 비교 > [P]상품/지수 검색 > 추천
* @ 화면ID		: PBWCH009902
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-21            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import IvinfData from '/components/ivinf/comm/IvinfData.js';

export class CHART12P extends BaseModule {
	constructor(elem) {
        super(elem);
        this.elem = elem;
        this.rootElem = elem;
		this.callbackFunc = null;
        
		[this.selTab, this.setSelTab] 				= this.useState('selTab', '1');						// 탭 선택
		[this.inKeyword, this.setInKeyword] 	= this.useState('inKeyword', '');					// 키워드
		
		/*
		 * 고정된 데이터를 배열에 담아놓는다.
		 * 1. 주가지수 
		 * 2. 채권금리 
		 * 3. 환율 		
		 * 4. 원자재 	
		 * */
		this.setDataInit();
		
		[this.favFnd, this.setFavFnd] 				= this.useState('favFnd', '');						// 관심펀드
		[this.cart, this.setCart] 						= this.useState('cart', []);							// 비교함 담기 
    }
	
    init (param, callbackFunc ) {
        super.init(this);
        
        this.callbackFunc = callbackFunc;
        this.setFavFnd(param.fndLst);
        
        this.register();
        this.initLastData();
    }
    
     register() {
    	this.bind( 'inKeyword', $$('#inKeyword') , 'input');
    	
    	$$('.modal__footer').hide();
    	
    	let _this = this;
		$('button[name=subTab]').on('click', function() {
			const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active');
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active');
            
            _this.setSelTab($(this).val());
            _this.setData();
		});
		
		$$('#btnSelBack').on('click', async (e) => await this.btnBackClick(e));						// 돌아가기
		$$('#btnComp').on('click', async (e) => await this.btnHandleClick(e));						// 비교하기
		$$('#inKeyword').on('keydown', async (e) => await this.keywordSearch(e));				// 키워드 검색
		$$('.input-remove').on('click', async (e) => await this.keywordRemoveSearch(e));		// 키워드 삭제
		this.registerCallback('click', $$('#btnPopSearch'), this.handleSelClick); 
		
		$('button[name="subTab"][value="1"]').trigger('click');
    }
    
	/**
     *  초기화면으로 돌아가기
     * @param 
     */
     async btnBackClick(e) {
    	$$('#keywordChk').removeClass('is-searched');
    	this.resetField('inKeyword');
    	$$('#basicArea').show();
		$$('#searchDataLst').hide();
     	$$('#searchDataLst').html('');
     	$$('#cartArea').show();
     }
     
     /**
      *  키워드 입력 조회 - enter key
      * @param 
      */
 	async keywordSearch(e) {
 		$$('#keywordChk').removeClass('form-invalid');
		$$('#keywordMsg').text('');
		
 		if(e.keyCode === 13) {
 			this.handleSelClick ();
 			// 키패드 닫음
 			document.activeElement.blur();
 		}
 	}
 	
 	/**
     *  키워드 삭제
     * @param 
     */
 	async keywordRemoveSearch(e) {
    	this.resetField('inKeyword');
 	}
    
 	/**
     *  펀드검색
     * @param 
     */
    async handleSelClick() {
    	if(this.inKeyword.value.length === 1) {
    		$$('#keywordChk').addClass('form-invalid');
    		$$('#keywordMsg').text('검색어를 2자 이상 입력해주세요.');
    		return false;
    	} else {
    		$$('#keywordChk').removeClass('form-invalid');
    		$$('#keywordMsg').text('');
    	}
    	
    	const url = '/pb/api/chart/fndLst.json';
		const params 		= {};
		params.inqDscd 	= 'PP';
		params.temDis  		= '3';
		params.rcmFndYn  	= 'N';
		params.srchChrTxt	= this.inKeyword.value;

		const res = await ApiUtils.sendPost(url, params, true);
		
		const searchArr = [];
		let fndArr = [];
		if(res.resultCode === '000000') {
		
			const fndRes = res.data.data.grid;
			fndRes.forEach((el) => {
				const arr = {};
				arr.label = el.fndRprsCdNm;
				arr.value = el.fndRprsCd;
				arr.key = 'fnd';
				fndArr.push(arr);
			});
		}
    	
    	const nidxData = this.dataList.value; // 지수데이터
    	const sp = nidxData.sp;
    	const bir = nidxData.bir;
    	const rate = nidxData.rate;
    	const com = nidxData.com;
    	
    	let arrAll = [];
    	arrAll.push(sp);
    	arrAll.push(bir);
    	arrAll.push(rate);
    	arrAll.push(com);
    	
    	const arr = arrAll.reduce(function(arr1, arr2) {return arr1.concat(arr2);});
    	
    	let resArr = [];
    	arr.forEach((el) => {
    		const labelStr = el.label.toUpperCase();
    		const valueStr = el.value.toUpperCase();
    		const keyStr = this.inKeyword.value.toUpperCase();
    		if(labelStr.indexOf(keyStr) > -1 || valueStr.indexOf(keyStr) > -1) {
    			resArr.push(el);
    		}
    	})
    	
		searchArr.push(fndArr);
		searchArr.push(resArr);
		
		const arrMerge = searchArr.reduce(function(arr1, arr2) {return arr1.concat(arr2);});
		
		if(arrMerge.length > 0) {
			$$('#basicArea').hide();
	    	$$('#searchDataLst').show();
	    	
	    	let html = '';
	    	html += '<ul class="d-flex flex-column gap14 mt16">';
			arrMerge.forEach((d, i) => {
				html += '<li>';
				html += '	<button class="btn-xsmall btn-outlined btn-round normal-wrap" name="searchWord" data-key="fnd" value="' + d.value + '">' + d.label + '</button>';
				html += '</li>	';
			});
			html += '</ul>';
			$$('#searchDataLst').html(html);
			
			let _this = this;
	    	$('button[name=searchWord]').on('click', function() {
	    		let data = _this.cart.value;
	    		const row = data.filter((el) => {return el.value === $(this).val()});
	    		
	    		if(row.length > 0) {
	    			toastr.caution('','이미 추가된 펀드/지수입니다.');
	    			return false;
	    		}
	    		
	    		const css = $(this).hasClass('btn-primary');
	    		if(data.length > 2 && !css) {
	    			toastr.error('','더 이상 추가할 수 없습니다.');
	    			return false;
	    		}
	    		_this.setDataCss($(this), css);
			});
		} else {
			$$('#cartArea').hide();
			$$('#infoStr').hide();
			$$('#basicArea').show();
			$$('#nidxArea').show();
			
	    	$$('#searchDataLst').show();
	    	let html = '';
			html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">검색 결과가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
			html += '<p class="description caution body-small fc-typography-caption mt16">비교하고 싶은 펀드/지수를 아래에서 선택해주세요.</p>';
			$$('#searchDataLst').html(html);
		}
		CmmUtils.hideLoading();
		
		$$('#keywordChk').addClass('is-searched');
    }
    
    /*
	 * 최근 본 펀드/지수 그리기
	 * */
    async initLastData() {
    	const getData = CmmUtils.getLocalStorageData("chart");
    	let html = '';
    	if(getData.data === null) {
    		$$('#cartArea').hide();
    	} else {
	    	getData.data.splice(10);		 	// 최대 10건	
	    	const data = getData.data;
	    	
	    	data.forEach((d, i) => {
	    		let key = '';
	    		if(d.key === 'fnd') {
	    			key = 'fnd';
	    		}
	    		html += '<li>';
	    		html += '	<button class="btn-xsmall btn-outlined btn-round text-ellipsis" name="cookie" data-key="' + key + '" value="' + d.value + '"><span style="max-width:122px;">' + d.label + '</span></button>';
	    		html += '</li>';
	    	});   	
	    	$$('#cookieData').html(html);
	    	
	    	let _this = this;
	    	$('button[name=cookie]').on('click', function() {
	    		let data = _this.cart.value;
	    		const row = data.filter((el) => {return el.value === $(this).val()});
	    		
	    		if(row.length > 0) {
	    			toastr.caution('','이미 추가된 펀드/지수입니다.');
	    			return false;
	    		}
	    		
	    		const css = $(this).hasClass('btn-primary');
	    		if(data.length > 2 && !css) {
	    			toastr.error('','더 이상 추가할 수 없습니다.');
	    			return false;
	    		}
	    		
	    		_this.setDataCss($(this), css);
			});
    	}
    }
    
    /*
	 * 펀드/지수 선택 해제 시 css 적용
	 * */
    async setDataCss(_this, css) {
    	let data = this.cart.value;
    	if(!css) {
    		const d = {};
    		_this.addClass('btn-primary');
    		_this.removeClass('btn-outlined');
    		_this.attr('aria-label', '선택됨');
    		// 펀드 선택 확인
    		if(_this.data('key') === 'fnd') {
    			d.label = _this.text();
    			d.key = 'fnd';
    		} else {
    			d.label = IvinfData.changePbData(_this.text());
    		}
    		d.value = _this.val();
    		data.push(d);
    	}
    	this.setcartData();
    }
    
    /*
	 * 탭 선택시 해당되는 지수 데이터 가져오기
	 * */
    async setData() {
    	const listData = this.dataList.value;
    	let items = '';
    	if(this.selTab.value === '1') {
    		items = listData.sp;
    	} else if(this.selTab.value === '2') {
    		items = listData.bir;
    	} else if(this.selTab.value === '3') {
    		items = listData.rate;
    	} else if(this.selTab.value === '4') {
    		items = listData.com;
    	} else if(this.selTab.value === '5') {
    		items = this.favFnd.value;
    	}
    	this.setFixData(items);
    	this.setcartData();
    	
    	// tabContent.afterLoadTab(); // tab 위치지정  
    }
    
    /*
	 * 각 탭에 해당되는 데이터를 해당 영역에 셋팅
	 * */
    async setFixData(items) {
    	let html = '';
    	
    	if(items.length > 0) {
	    	items.forEach((val, idx) => {
	    		let primary = 'N';
	    		let key = '';
	    		if(val.key === 'fnd') {
	    			key = 'fnd';
	    		}
	    		$('button[name=cartItem]').each((i, d) => {
					if(d.value === val.value) {
						primary = 'Y';
					}
	    		});
	    		if(primary === 'N') {
	    			html += '<button class="btn-xsmall btn-outlined btn-round normal-wrap" name="colItem" data-key="' + key + '" value="' + val.value + '">' + val.label + '</button>';
	    		} else {
	    			html += '<button class="btn-xsmall btn-primary btn-round normal-wrap" name="colItem" data-key="' + key + '" value="' + val.value + '" aria-label="선택됨">' + val.label + '</button>';
	    		}
	    	})
	    	$$('#tabDataLst').html(html);
	    	
	    	let _this = this;
	    	$('button[name=colItem]').on('click', function() {
	    		let data = _this.cart.value;
	    		
	    		const row = data.filter((el) => {return el.value === $(this).val()});
	    		
	    		if(row.length > 0) {
	    			toastr.caution('','이미 추가된 펀드/지수입니다.');
	    			return false;
	    		}
	    		
	    		const css = $(this).hasClass('btn-primary');
	    		if(data.length > 2 && !css) {
	    			toastr.error('','더 이상 추가할 수 없습니다.');
	    			return false;
	    		}
	    		_this.setDataCss($(this), css);
	    	});
    	} else {
    		html += '';
    		html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">나의 관심펀드가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
    		$$('#tabDataLst').html(html);
    	}
    }
    
    /*
	 * 비교함 담기
	 * */
    async setcartData() {
    	let data = this.cart.value;
    	let html = '';
    	let rowCnt = 1;
    	for(let i = 0; i < 3; i++) {
    		const item = data[i];
    		if(item) {
    			html += '<button type="button" class="btn-xsmall btn-primary btn-round" aria-label="비교선택" name="cartItem" value="' + item.value + '"><span>' + item.label + '</span><i class="ico-close-16"></i></button>';
    			rowCnt++;
    		} else {
    			html += '<button type="button" class="btn-xsmall btn-outlined btn-round btn-border-dashed"><i class="ico-add"></i></button>';
    		}
    	}
    	$$('#cartContainer').html(html);
    	
    	if(rowCnt > 2) {
			$$('#btnComp').addAttr('aria-disabled', false);															// 버튼 활성화
		} else {
			$$('#btnComp').addAttr('aria-disabled', true);															// 버튼 비활성화
		}
    	
    	this.setCartToCont();
    }
    
    /*
	 * 비교함에서 제외  
	 * */
    async setCartToCont() {
    	let _this = this;
    	$('button[name=cartItem]').on('click', function() {
    		let data = _this.cart.value;
    		const row = data.filter((el) => {return el.value !== $(this).val()});
			_this.setCart(row);
			_this.setcartData();
			
			// 지수영역 
			$('button[name=colItem]').each((i, d) => {
				let primary = 'N';
				row.forEach((r, v) => {
					if(d.value === r.value) {
						primary = 'Y';
					}
				})
				
				if(primary === 'N') {
					$('button[name="colItem"][value="' + $(this).val() + '"]').removeClass('btn-primary');
					$('button[name="colItem"][value="' + $(this).val() + '"]').addClass('btn-outlined');
					$('button[name="colItem"][value="' + $(this).val() + '"]').attr('aria-label', '');
				}
			});
			// cookie영역  
			$('button[name=cookie]').each((i, d) => {
				let primary = 'N';
				row.forEach((r, v) => {
					if(d.value === r.value) {
						primary = 'Y';
					}
				})
				
				if(primary === 'N') {
					$('button[name="cookie"][value="' + $(this).val() + '"]').removeClass('btn-primary');
					$('button[name="cookie"][value="' + $(this).val() + '"]').addClass('btn-outlined');
					$('button[name="cookie"][value="' + $(this).val() + '"]').attr('aria-label', '');
				}
			});
			// search영역  
			$('button[name=searchWord]').each((i, d) => {
				let primary = 'N';
				row.forEach((r, v) => {
					if(d.value === r.value) {
						primary = 'Y';
					}
				})
				
				if(primary === 'N') {
					$('button[name="searchWord"][value="' + $(this).val() + '"]').removeClass('btn-primary');
					$('button[name="searchWord"][value="' + $(this).val() + '"]').addClass('btn-outlined');
					$('button[name="searchWord"][value="' + $(this).val() + '"]').attr('aria-label', '');
				}
			});
    	});
    }
    
    /*
	 * 비교하기
	 * */
    async btnHandleClick() {
    	const hasCls	= $('#btnComp').attr('aria-disabled');
		if(hasCls === 'true') {																									// 비교하기 가능 상태 확인
			return false;
		}
		
		const params = this.cart.value;
    	const result = { data : params, resultCd : '000000', resultMsg : ''};
    	
    	this.callbackFunc(result);
    }
    
    /*
	 * 고정된 데이터를 배열에 담아놓는다.
	 * 1. 주가지수 
	 * 2. 채권금리 
	 * 3. 환율 		
	 * 4. 원자재 	
	 * */
    setDataInit() {
    	// 주가지수
		[this.dataList, this.setDataList] = this.useState('dataList', 
			{ "sp":
			[
				{
		            label : IvinfData.changePbData('KOSPI'),
		            nm : 'KOSPI',
	            	value : '00201'
				},
				{
					label : IvinfData.changePbData('KOSDAQ'),
		            nm : 'KOSDAQ',
	            	value : '00203'
				},
				{
					label : IvinfData.changePbData('KOSPI200'),
		            nm : 'KOSPI 200',
	            	value : '00202'
				},
				{
					label : IvinfData.changePbData('S&P500'),
		            nm : 'S&P500',
	            	value : '00204'
				},
				{
					label : IvinfData.changePbData('나스닥'),
		            nm : '나스닥',
	            	value : '00206'
				},
				{
					label : IvinfData.changePbData('다우존스'),
		            nm : '다우존스',
	            	value : '00205'
				},
				{
					label : IvinfData.changePbData('EURO STOXX 50'),
		            nm : 'EURO STOXX 50',
	            	value : '00207'
				},
				{
					label : IvinfData.changePbData('상해종합'),
		            nm : '상해종합',
	            	value : '00208'
				},
				{
					label : IvinfData.changePbData('홍콩H'),
		            nm : '홍콩H',
	            	value : '00209'
				},
				{
					label : IvinfData.changePbData('NIKKEI225'),
		            nm : 'NIKKEI225',
	            	value : '00211'
				},
				{
					label : IvinfData.changePbData('필라델피아 반도체'),
		            nm : '필라델피아 반도체',
	            	value : '00213'
				},
				{
					label : IvinfData.changePbData('MSCI World'),
		            nm : 'MSCI World',
	            	value : '00217'
				},
				{
					label : IvinfData.changePbData('MSCI EM (EMERGING MARKETS)'),
		            nm : 'MSCI EM (EMERGING MARKETS)',
	            	value : 'MSIO000083'
				},
				{
					label : IvinfData.changePbData('MSCI ACWI'),
		            nm : 'MSCI ACWI',
	            	value : 'MSIO000034'
				},
				{
					label : IvinfData.changePbData('VIX'),
		            nm : 'VIX',
	            	value : '00212'
				}
			],
			"bir" : [
				{
		            label : IvinfData.changePbData('미국국채 2년'),
		            nm : '미국국채 2년',
	            	value : 'TRSO000002'
				},
				{
					label : IvinfData.changePbData('미국국채 10년'),
		            nm : '미국국채 10년',
	            	value : '00403'
				},
				{
					label : IvinfData.changePbData('한국국채 3년'),
		            nm : '한국국채 3년',
	            	value : '00405'
				},
				{
					label : IvinfData.changePbData('한국국채 10년'),
		            nm : '한국국채 10년',
	            	value : '00406'
				}
			],
			"rate" : [
				{
					label : IvinfData.changePbData('달러인덱스'),
		            nm : '달러인덱스',
	            	value : '00301'
				},
				{
					label : IvinfData.changePbData('USD'),
		            nm : 'USD',
	            	value : '00302'
				},
				{
					label : IvinfData.changePbData('EUR'),
		            nm : 'EUR',
	            	value : '00303'
				},
				{
					label : IvinfData.changePbData('CNY'),
		            nm : 'CNY',
	            	value : '00304'
				},
				{
					label : IvinfData.changePbData('JPY'),
		            nm : 'JPY',
	            	value : '00305'
				}
			],
			"com" : [
				{
					label : IvinfData.changePbData('NYMEX WTI'),
		            nm : 'NYMEX WTI',
	            	value : '00601'
				},
				{
					label : IvinfData.changePbData('국제 금'),
		            nm : '국제 금',
	            	value : 'COMO000002'
				},
				{
					label : IvinfData.changePbData('LME 구리 3개월'),
		            nm : 'LME 구리 3개월',
	            	value : '00613'
				},
				{
					label : IvinfData.changePbData('NYMEX 천연가스'),
		            nm : 'NYMEX 천연가스',
	            	value : '00606'
				},
				{
					label : IvinfData.changePbData('CBOT 옥수수'),
		            nm : 'CBOT 옥수수',
	            	value : '00617'
				}
			]
		});
    }

    destroy () {
    	$$('.modal__footer').show();
        super.destroy(this);
    }
}

