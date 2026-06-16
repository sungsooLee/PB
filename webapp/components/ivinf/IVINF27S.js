/*************************************************************************
* @ 서비스경로 : IVINF27S
* @ 파일명      : IVINF27S.js 투자정보 - 종합 주요지수 - 관심 - 목록
* @ 화면ID		: PBWIV070000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-02            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import IvinfData from '/components/ivinf/comm/IvinfData.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF27S extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.cncrLst, this.setCncrLst] 	= this.useState('cncrLst', '');											// 순서설정을 위한 임시 변수
        [this.dataList, this.setDataList] 	= this.useState('dataList', '');
    }

	init () {
        super.init(this);
        this.regist();
        this.loadData();
        // tab 위치지정
        tabContent.afterLoadTab(); 
        // 순서설정
        this.registerCallback('click', $$('#sortBtn'), 		this.handleSortbtnClick);			
	}
	
	async regist() {
		// 스켈레톤 시작
		this.setSkeletone();
		
		let _this = this;
		$('a[name=ivinfTab]').on('click', function() {
			let route = $(this).data('id');	
			if(route !== 'ivinf27s') { 				// 현재 페이지 제외
	        	const props = {
	        	};
	        	router.navigate(route, props);
			}
		})
	}
	
	/**
	 * 스켈레톤 적용
	 * @param
	 */
	async setSkeletone() {
		let rHtml = '';
		for(let i = 0; i < 10; i++) {
			rHtml += '<li>';
			rHtml += '		<a href="#">';
			rHtml += '			<dl>';
			rHtml += '				<dt></dt>';
			rHtml += '				<dd></dd>';
			rHtml += '			</dl>';
			rHtml += '			<div></div>';
			rHtml += '		</a>';
			rHtml += '</li>';
		}
		$('#listContainer').html(rHtml);
		
		$('.content').addClass('loading');
	}
	
	/**
	 * 관심지수  - 조회
	 * @param
	 */
	async loadData() {
		/*
		 * 1. 투자 지수는 첫 진입 화면인 주요지수에서 데이터를 가져와서 탭 이동시마다 데이터를 넘겨주는 형식으로 구성됨. 
		 *     - 관심지수 데이터는 상세화면에서 변경되므로 화면 이동시마다 데이터 가져옴.
		 * 2. 관심목록 화면은 투자메인에서 직접 오는 경우가 있어 구분자를 두어 호출을 다르게 함.
		 * */
		let url = '/pb/api/ivinf/cncrLst.json';
		const params = {};
		const res = await ApiUtils.sendPost(url, params, true);
    	
    	if(res.resultCode === '000000') {
			const data = res.data.cncrData;
			data.forEach((d, r) => {
    			d.nidxOriginalNm = d.nidxNm;
    			d.nidxNm = IvinfData.changePbData(d.nidxNm);
    		});
	    	// 순서설정을 위한 데이터
	    	this.setCncrLst(data);
	    	this.setDataList(data);
	    	this.setData(data);
		}
	}
	
	/**
	 * 조회된 데이터 셋팅
	 * @param
	 */
	async setData(items) {
		/*
    	 * 1. 등락폭 일 경우
    	 *     - 상승 rise, 보합 steady, 하락 fall 처리 및 aria-label(등락폭(상승), 등락폭(하락), 등락폭(보합)) 수정 
    	 * 2. 등락율 일 경우
    	 * 		- 상승 tags-lightRed, 보합 tags-lightGray, 하락 tags-lightBlue
    	 * 3. 실시간 여부 표시
    	 *     - 주요지수, 주가지수, 환율에만 적용
    	 * 4. 경제지표 등락폭 제외표시
    	 */ 
		let html = '';
		if(items.length > 0) {
			items.forEach((val, idx) => {
				val.id = val.mktNidxDscd;
				if(val.basRgsTimTxt.length === 8) {
					val.basDate = dayjs(val.basRgsTimTxt).format('YYYY-MM-DD');
				} else {
					val.basDate = val.basRgsTimTxt;
				}
				// 상승 rise, 보합 steady, 하락 fall
				if(parseFloat(val.flfdEqvvRt) < 0) {
					val.cls = 'fall';			
					val.label = '등락폭(하락)';
					val.tags = 'tags-lightBlue';
				} else if(parseFloat(val.flfdEqvvRt) > 0) {
					val.cls = 'rise';
					val.label = '등락폭(상승)';
					val.tags = 'tags-lightRed';
				} else {
					val.cls = 'steady';
					val.label = '등락폭(보합)';
					val.tags = 'tags-lightGray';
				}	
				let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
				let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
				let fndNidxFlfdRt = CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2));
				
				html += '<li id="' + val.mktNidxDscd + '" data-id="' + val.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '" data-nm="' + val.nidxOriginalNm + '"';
				html += '     data-time="' + val.basRgsTimTxt + '" data-exr="' + val.disTxt + '" data-rltm="' + val.rltmYn + '">';
				html += '	<a href="javascript:void(0);" name="btnDetail">';
				html += '		<dl>';
				html += '			<dt data-bind="nidxNm">' + val.nidxNm;
				if(val.rltmYn === 'Y') {
				html += '				<i class="live-on" aria-label="실시간" id="live"></i>';
				}
				html += '			</dt>';
				html += '			<dd>';
				html += '				<strong data-bind="stcEprNidx">' + stcEprNidx + '</strong>';
				// 등락폭
				if(Number(parseFloat(val.flfdEqvvRt).toFixed(2)) == 0) {
				html += '				<div class="stock ' + val.cls + '" aria-label="' + val.label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">0</div>';
				} else {
				html += '				<div class="stock ' + val.cls + '" aria-label="' + val.label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">' + CmmUtils.comma(Math.abs(parseFloat(val.flfdEqvvRt)).toFixed(2)) + '</div>';
				}
				if(fndNidxFlfdRt > 0) {
				html += '				<div class="tags tags-small ' + val.tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">+' + fndNidxFlfdRt + '%</div>';
				} else {
				html += '				<div class="tags tags-small ' + val.tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">' + fndNidxFlfdRt + '%</div>';
				}
				html += '			</dd>';
				html += '		</dl>';
				html += '	</a>';
				html += '	<button class="stock-remove" name="btnDel" value="' + val.mktNidxDscd + '">';
				html += '		<i class="icon-only icon-24 icon-close bg-icon-gray_2"></i>';
				html += '	</button>';
				html += '</li>';
			});
			$('#listContainer').html(html);
			$$(document).findByName('btnDetail', 'click', this.handleActionClick);
			$$(document).findByName('btnDel', 'click', (evnt, elem) => {
				this.handleDelActionClick(elem.value);
			});
				
		} else {
			$$('#cncrDataArea').hide();
			$$('#cncrNoDataArea').show().css({'display':'flex'});
		}
		// 스켈레톤 종료
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
	}
	
	/**
	 * 관심지수 삭제
	 * @param
	 */
	async handleDelActionClick(val) {
		const params = {
    			nidxCd : val,
    			fav : 'D' 									// D : 삭제
    	}
    	
    	const url = '/pb/api/ivinf/saveCncr.json';
    	const res = await ApiUtils.sendPost(url, params);
    	if(res.resultCode === '000000') {
    		toastr.caution(``, '삭제되었습니다.');
    		setTimeout(() => {
    			this.loadData();
			}, 2000);
    	} else {
    		toastr.error(``, '삭제 실패하였습니다.');
    	}
	
	}
	
	/**
	 * 주요지수 - 상세화면이동
	 * @param
	 */
	async handleActionClick(e) {
		const route = 'ivinf21s';	
		const $key = $(e.target).closest('li');
    	const props = {
    			inqPdcd: $key.attr('id'),
    			inqPdNm: $key.attr('data-nm'),
    			fav: $key.attr('data-id'),
    			val: $key.attr('data-val'),
    			eqvvRt: $key.attr('data-rt'),
    			rate: $key.attr('data-rate'),
    			basDate: $key.attr('data-time'),
    			exr: $key.attr('data-exr'),
    			rltmYn: $key.attr('data-rltm')
    	};
    	router.navigate(route, props);
	}
	
	/**
	 * 순서 설정 - 팝업띄우기
	 * 
	 * @param
	 */	
	async handleSortbtnClick() {
		const route = 'ivinf29p';
		const props = {
    			key: this.cncrLst.value,
    	};
    	await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
            params : props,
            onCallback: (result) => this.callbackFunc(result), 
        });
	}
	
	/**
	 * 모달 event 후처리
	 * 
	 * @param
	 */
    async callbackFunc(result) {
    	this.loadData();
    }
	
    destroy() {
        super.destroy(this);
    }
}