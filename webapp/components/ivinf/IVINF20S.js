/*************************************************************************
* @ 서비스경로 : IVINF20S
* @ 파일명      : IVINF20S.js 투자정보 - 종합 주요지수 - 주요지수 - 목록
* @ 화면ID		: PBWIV010000
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

export default class IVINF20S extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.best, this.setBest] 			= this.useState('best', '');							// 주요 3대 지수
        [this.etcCncr, this.setEtcCncr] 	= this.useState('etcCncr', '');						// 기타 주요 지수
        
        // 탭이동시 전달할 데이터
        [this.dataList, this.setDataList] 	= this.useState('dataList', '');						// 조회된 지수 데이터
    }

	init () {
        super.init(this);
        
        this.initRegist();
	}
	
	async initRegist() {
		// 스켈레톤 시작
		this.setSkeletone();
		
		let _this = this;
		$('a[name=ivinfTab]').on('click', function() {
			let route = $(this).data('id');	
			if(route !== 'ivinf20s') { 				// 현재 페이지 제외
	        	const props = {
	        			dataList: _this.dataList.value
	        	};
	        	router.navigate(route, props);
			}
		})
		
		await this.loadData();
	}
	
	/**
	 * 스켈레톤 적용
	 * @param
	 */
	async setSkeletone() {
		let html = '';
		for(let i = 0; i < 3; i++) {
			html += '<li>';
			html += '	<a>';
			html += '		<dl>';
			html += '			<dt></dt>';
			html += '			<dd></dd>';
			html += '			<dd></dd>';
			html += '		</dl>';
			html += '	</a>';
			html += '</li>';
		}
		$('#bestContainer').html(html);
		
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
		$('#etcListContainer').html(rHtml);
		
		$('.content').addClass('loading');
	}
	
	/**
	 * 주요지수 조회
	 * @param
	 */
	async loadData() {
		const url = '/pb/api/ivinf/nidxList.json';
		const params = {};
		params.bestNidx = 'N';
		params.type		 = '1';
		
    	const res = await ApiUtils.sendPost(url, params, true);

    	if(res.resultCode === '000000') {
    		const grid = res.data.data;
    		// PB WON에서 사용하는 명으로 변경
    		grid.forEach((d, r) => {
    			d.nidxOriginalNm = d.nidxNm;
    			d.nidxNm = IvinfData.changePbData(d.nidxNm);
    		});
    		this.setDataList(grid);
    		
    		// 주요 3대지수 - KOSPI, KOSDAQ, 코스피 200  
    		const bestStr = ['00201', '00202', '00203'];
    		const str = grid.filter((data) => { return ($.inArray(data.mktNidxDscd, bestStr) > -1) });
    		this.setBest(str);

    		// 기타지수  
    		const etcStr = [ '00204', '00205', '00206', '00211', '00302']; 
    		const etc = grid.filter((data) => { return ($.inArray(data.mktNidxDscd, etcStr) > -1) });
    		this.setEtcCncr(etc);
    		
	    	// 관심등록되어 있는 지수와 비교하여 순서설정처리
	    	const etcLst = this.etcCncr.value;
	    	etcLst.forEach((val, idx) => {
	    		if(val.sort === '900') {
	    			val.sort = sortKey + 1;
	    		}
	    	});
	    	this.setEtcCncr(etcLst);

	    	this.setBestData();									// 주요 3대 지수 데이터 셋팅
	    	this.setData(this.etcCncr.value);				// 기타주요지수 - 데이터 셋팅
    	}
	}
	
	/**
	 * 주요 3대 지수 데이터 셋팅
	 * @param
	 */
	async setBestData() {
		// 기준시간
		$$('#stockTime').text(this.best.value[0].basRgsTimTxt);
		
		/*
    	 * 1. 등락폭 일 경우
    	 *     - 상승 rise, 보합 steady, 하락 fall 처리 및 aria-label(등락폭(상승), 등락폭(하락), 등락폭(보합)) 수정 
    	 * 2. 등락율 일 경우
    	 * 		- 상승 tags-lightRed, 보합 tags-lightGray, 하락 tags-lightBlue
    	 * */
		let html = '';
		this.best.value.forEach((val, idx) => {
			// 상승 rise, 보합 steady, 하락 fall
			let cls = '';
			let label = '';
			let tags = '';
			if(parseFloat(val.flfdEqvvRt) < 0) {
				cls = 'fall';			
				label = '등락폭(하락)';
				tags = 'tags-lightBlue';
			} else if(parseFloat(val.flfdEqvvRt) > 0) {
				cls = 'rise';
				label = '등락폭(상승)';
				tags = 'tags-lightRed';
			} else {
				cls = 'steady';
				label = '등락폭(보합)';
				tags = 'tags-lightGray';
			}
			let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
			let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
			let fndNidxFlfdRt = CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2));
			// 실시간 여부
			const live = (val.rltmYn === 'Y') ? 'live-on' : 'live-off';
			const liveStr = (val.rltmYn === 'Y') ? '실시간' : '비 실시간';
			
			html += '<li id="' + val.mktNidxDscd + '" data-id="' + val.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '"';
			html += '     data-nm="' + val.nidxOriginalNm + '" data-time="' + val.basRgsTimTxt + '" data-exr="' + val.disTxt + '" data-rltm=' + val.rltmYn + '>';
			html += '	<a href="javascript:void(0);" name="btnDetail">';
			html += '		<dl>';
			html += '			<dt>';
			html += '				<span id="nidxNm">' + val.nidxNm + '</span>';
			if(val.rltmYn === 'Y') {
			html += '				<i class="' + live + '" aria-label="' + liveStr + '" id="kospiLive"></i>';
			}
			html += '			</dt>';
			html += '			<dd>';
			html += '				<strong data-bind="stcEprNidx" id="stcEprNidx">' + stcEprNidx + '</strong>';
			// 등락폭
			if(Number(parseFloat(val.flfdEqvvRt).toFixed(2)) == 0) {
			html += '				<div class="stock ' + cls + '" aria-label="' + label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">0</div>';
			} else {
			html += '				<div class="stock ' + cls + '" aria-label="' + label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">' + CmmUtils.comma(Math.abs(parseFloat(val.flfdEqvvRt)).toFixed(2)) + '</div>';
			}
			html += '			</dd>';
			html += '			<dd>';
			// 등락율
			if(fndNidxFlfdRt > 0) {
			html += '				<div class="tags tags-small ' + tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">+' + fndNidxFlfdRt + '%</div>';
			} else {
			html += '				<div class="tags tags-small ' + tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">' + fndNidxFlfdRt + '%</div>';
			}
			html += '			</dd>';
			html += '		</dl>';
			html += '	</a>';
			html += '</li>';
		});
		$('#bestContainer').html(html);
		
		$$(document).findByName('btnDetail', 'click', this.handleActionClick);					// 주요지수 - 상세화면이동
	}
	
	/**
	 * 기타주요지수 - 데이터 셋팅
	 * @param
	 */
	async setData(items) {
		
		let html = '';
		if(items.length > 0) {
			/*
	    	 * 1. 등락폭 일 경우
	    	 *     - 상승 rise, 보합 steady, 하락 fall 처리 및 aria-label(등락폭(상승), 등락폭(하락), 등락폭(보합)) 수정 
	    	 * 2. 등락율 일 경우
	    	 * 		- 상승 tags-lightRed, 보합 tags-lightGray, 하락 tags-lightBlue
	    	 * */
			items.forEach((val, idx) => {
				val.id = val.mktNidxDscd;
				val.live = val.rltmYn;
				let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
				let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
				let fndNidxFlfdRt = CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2));
				val.basDate = val.basRgsTimTxt;
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
				
				html += '<li id="' + val.mktNidxDscd + '" data-id="' + val.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '"';
				html += ' 	  data-nm="' + val.nidxOriginalNm + '" data-time="' + val.basRgsTimTxt + '" data-exr="' + val.disTxt + '" data-rltm="' + val.rltmYn + '">';
				html += '	<a href="javascript:void(0);" name="btnDetail2">';
				html += '		<dl>';
				html += '			<dt>';
				html += '				<sapn data-bind="nidxNm">' + val.nidxNm + '</sapn>';
				if(val.rltmYn === 'Y') {
				html += '				<i class="live-on" aria-label="실시간" id="live"></i>';
				}
				html += '			</dt>';
				html += '			<dd data-bind="stcEprNidx">' + stcEprNidx + '</dd>';
				html += '		</dl>';
				html += '		<div>';
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
				html += '		</div>';
				html += '	</a>';
				html += '</li>';
			});
			$('#etcListContainer').html(html);
			$$(document).findByName('btnDetail2', 'click', this.handleActionClick);					// 주요지수 - 상세화면이동
		} else {
			html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">조회된 데이터가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
			$('#etcListContainer').html(html);
		}
		// 스켈레톤 종료
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
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
	
    destroy() {
        super.destroy(this);
    }
}