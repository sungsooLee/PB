/*************************************************************************
* @ 서비스경로 : IVINF24S
* @ 파일명      : IVINF24S.js 투자정보 - 종합 주요지수 - 환율/원자재 - 목록
* @ 화면ID		: PBWIV040000
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

export default class IVINF24S extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.favData, this.setFavData] 		= this.useState('favData', '');										//  관심 데이터
        [this.rateData, this.setRateData] 	= this.useState('rateData', '');									//  환율 데이터
        [this.comData, this.setComData] 	= this.useState('comData', '');									//  원자재 데이터
    }

	init () {
        super.init(this);
        
        this.initRegist();
        
        tabContent.afterLoadTab(); // tab 위치지정
	}
	
	async initRegist () {
		// 스켈레톤 시작
		this.setSkeletone();
		
		let _this = this;
		$('a[name=ivinfTab]').on('click', function() {
			let route = $(this).data('id');	
			if(route !== 'ivinf24s') { 				// 현재 페이지 제외
	        	const props = {
	        	};
	        	router.navigate(route, props);
			}
		})
		
    	await this.loadData();
    	await this.loadRawData();
    	// 스켈레톤 종료
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
    }
	
	/**
	 * 스켈레톤 적용
	 * @param
	 */
	async setSkeletone() {
		let rHtml = '';
		for(let i = 0; i < 5; i++) {
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
		$('#rawListContainer').html(rHtml);
		
		$('.content').addClass('loading');
	}

	/**
	 * 환율 - 조회
	 * @param
	 */
	async loadData() {
		const url = '/pb/api/ivinf/nidxList.json';
		const params = {};
		params.bestNidx = 'N';
		params.type		 = '4';
		
    	const res = await ApiUtils.sendPost(url, params, true);
    	const grid = res.data.data;
		// PB WON에서 사용하는 명으로 변경
		grid.forEach((d, r) => {
			d.nidxOriginalNm = d.nidxNm;
			d.nidxNm = IvinfData.changePbData(d.nidxNm);
			if(d.sort === '900') {
				d.sort = sortKey + 1;
			}
		});
		
		// 환율
		let rateStr = ['00301', '00302', '00303', '00304', '00305'];
		
		let rateArr = [];
		let comArr = [];
		grid.forEach((item, idx) => {
			if($.inArray(item.mktNidxDscd, rateStr) > -1) { // 환율
				rateArr.push(item);
			} else {
				if(item.mktNidxDscd == 'NYMO000001') { //'00601 WTI' -> 'NYMO000001 서브텍사스 원유 선물' 변경으로 제외
				} else {
					comArr.push(item);
				}
			}
		});

    	this.setRateData(rateArr);	// 환율
		this.setComData(comArr);	// 원자재
		
    	this.setData();
	}
	
	/**
	 * 환율 - 데이터 셋팅
	 * @param
	 */
	async setData() {
		const items = this.rateData.value;
		
		let html = '';
		if(items.length > 0) {
			items.forEach((val, idx) => {
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
					val.flfdEqvv = '';
				}
				// 실시간 여부
				const live = (val.rltmYn === 'Y') ? 'live-on' : 'live-off';
				const liveStr = (val.rltmYn === 'Y') ? '실시간' : '비 실시간';
				
				let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
				let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
				let fndNidxFlfdRt = CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2));
				
				html += '<li id="' + val.mktNidxDscd + '" data-id="' + val.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '" data-nm="' + val.nidxOriginalNm + '" data-time="' + val.basRgsTimTxt + '" data-exr="' + val.disTxt + '" data-rltmYn="' + val.rltmYn + '">';
				html += '	<a href="javascript:void(0);" name="btnDetail">';
				html += '		<dl>';
				html += '			<span id="nidxNm">' + val.nidxNm + '</span>';
				if(val.rltmYn === 'Y') {
				html += '			<i class="' + live + '" aria-label="' + liveStr + '" id="kospiLive"></i>';
				}
				html += '			<dd>';
				html += '				<strong data-bind="stcEprNidx" id="stcEprNidx">' + stcEprNidx + '</strong>';
				// 등락폭
				if(Number(parseFloat(val.flfdEqvvRt).toFixed(2)) == 0) {
				html += '				<div class="stock ' + cls + '" aria-label="' + label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">0</div>';
				} else {
				html += '				<div class="stock ' + cls + '" aria-label="' + label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">' + CmmUtils.comma(Math.abs(parseFloat(val.flfdEqvvRt)).toFixed(2)) + '</div>';
				}
				html += '				<div class="tags tags-small ' + tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">' + fndNidxFlfdRt + '%</div>';
				html += '			</dd>';
				html += '		</dl>';
				html += '	</a>';
				html += '</li>';
			});
			$('#listContainer').html(html);
			
			$$(document).findByName('btnDetail', 'click', this.handleActionClick);					// 주요지수 - 상세화면이동
		} else {
			const now = dayjs();
			
			let html = '';
			html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">조회된 데이터가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
			$('#listContainer').html(html);
		}
	}
	
	/**
	 * 원자재 - 조회
	 * @param
	 */
	async loadRawData() {
		const data = this.comData.value;
    	this.setRawData(data);
	}
	
	/**
	 * 원자재 - 데이터 셋팅
	 * @param
	 */
	async setRawData(data) {
		let html = '';
		if(data.length > 0) {
			/*
	    	 * 1. 등락폭 일 경우
	    	 *     - 상승 rise, 보합 steady, 하락 fall 처리 및 aria-label(등락폭(상승), 등락폭(하락), 등락폭(보합)) 수정 
	    	 * 2. 등락율 일 경우
	    	 * 		- 상승 tags-lightRed, 보합 tags-lightGray, 하락 tags-lightBlue
	    	 * */
			data.forEach((item, idx) => {
				item.id = item.mktNidxDscd;
				item.basDate = item.basRgsTimTxt;
				// 상승 rise, 보합 steady, 하락 fall
				if(parseFloat(item.flfdEqvvRt) < 0) {
					item.cls = 'fall';			
					item.label = '등락폭(하락)';
					item.tags = 'tags-lightBlue';
				} else if(parseFloat(item.flfdEqvvRt) > 0) {
					item.cls = 'rise';
					item.label = '등락폭(상승)';
					item.tags = 'tags-lightRed';
				} else {
					item.cls = 'steady';
					item.label = '등락폭(보합)';
					item.tags = 'tags-lightGray';
				}	
				
				let stcEprNidx = CmmUtils.comma(parseFloat(item.stcEprNidx).toFixed(2));
				let flfdEqvvRt = CmmUtils.comma(parseFloat(item.flfdEqvvRt).toFixed(2));
				let fndNidxFlfdRt = CmmUtils.comma(parseFloat(item.fndNidxFlfdRt).toFixed(2));
				
				html += '<li id="' + item.mktNidxDscd + '" data-id="' + item.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '" data-nm="' + item.nidxOriginalNm + '" data-time="' + item.basRgsTimTxt + '" data-exr="' + item.disTxt + '">';
				html += '	<a href="javascript:void(0);" name="btnDetail">';
				html += '		<div data-bind="fav" style="display: none;"></div>';
				html += '		<dl>';
				html += '			<sapn data-bind="nidxNm">' + item.nidxNm + '</sapn>';
				if(item.rltmYn === 'Y') {
				html += '			<i class="live-on" aria-label="실시간" id="live"></i>';
				}
				html += '			<dd>';
				html += '				<strong data-bind="stcEprNidx">' + stcEprNidx + '</strong>';
				// 등락폭
				if(Number(flfdEqvvRt) == 0) {
				html += '				<div class="stock ' + item.cls + '" aria-label="' + item.label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">0</div>';
				} else {
				html += '				<div class="stock ' + item.cls + '" aria-label="' + item.label + '" data-bind="flfdEqvvRt" id="flfdEqvvRt">' + Math.abs(flfdEqvvRt).toFixed(2) + '</div>';
				}
				if(fndNidxFlfdRt > 0) {
				html += '				<div class="tags tags-small ' + item.tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">+' + fndNidxFlfdRt + '%</div>';
				} else {
				html += '				<div class="tags tags-small ' + item.tags + '" aria-label="등락율" data-bind="fndNidxFlfdRt" id="fndNidxFlfdRt">' + fndNidxFlfdRt + '%</div>';
				}
				html += '			</dd>';
				html += '		</dl>';
				html += '	</a>';
				html += '</li>';
				
			});
			$('#rawListContainer').html(html);
			$$(document).findByName('btnDetail', 'click', this.handleActionClick);
		} else {
			const now = dayjs();
			
			html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">조회된 데이터가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
			$('#rawListContainer').html(html);
		}
	}
	
	/**
	 * 주요지수 - 상세화면이동
	 * @param
	 */
	async handleActionClick(e) {
		const route = 'ivinf21s';	
		const $key = $(e.target).closest('li');
		const basDt = ($key.attr('data-time').length === 8) ? dayjs($key.attr('data-time')).format('YYYY-MM-DD') : $key.attr('data-time');
    	const props = {
    			inqPdcd: $key.attr('id'),
    			inqPdNm: $key.attr('data-nm'),
    			fav: $key.attr('data-id'),
    			val: $key.attr('data-val'),
    			eqvvRt: $key.attr('data-rt'),
    			rate: $key.attr('data-rate'),
    			basDate: basDt,
    			exr: $key.attr('data-exr'),
    			rltmYn: $key.attr('data-rltmYn')
    	};
    	router.navigate(route, props);
	}
	
    destroy() {
        super.destroy(this);
    }
}