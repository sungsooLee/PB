/*************************************************************************
* @ 서비스경로 : IVINF25S
* @ 파일명      : IVINF25S.js 투자정보 - 종합 주요지수 - 경제지표 - 목록
* @ 화면ID		: PBWIV050000
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

export default class IVINF25S extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.dataList, this.setDataList] 	= this.useState('dataList', '');
    }

	init () {
        super.init(this);
        this.initRegist();
        
        tabContent.afterLoadTab(); // tab 위치지정
	}
	
	async initRegist() {
		// 스켈레톤 시작
		this.setSkeletone();
		
		let _this = this;
		$('a[name=ivinfTab]').on('click', function() {
			let route = $(this).data('id');	
			if(route !== 'ivinf25s') { 				// 현재 페이지 제외
	        	const props = {
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
	 * 경제지표  - 조회
	 * @param
	 */
	async loadData() {
		const url = '/pb/api/ivinf/nidxList.json';
		const params = {};
		params.bestNidx = 'N';
		params.type		 = '5';
		
    	const res = await ApiUtils.sendPost(url, params, true);
    	
    	const grid = res.data.data;
    	this.setDataList(grid);
    	
		// PB WON에서 사용하는 명으로 변경
		grid.forEach((d, r) => {
			d.nidxOriginalNm = d.nidxNm;
			d.nidxNm = IvinfData.changePbData(d.nidxNm);
			if(d.sort === '900') {
				d.sort = sortKey + 1;
			}
		});
		
    	this.setData(grid);
	}
	
	/**
	 * 경제지표  - 데이터 셋팅
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
				val.basDate = dayjs(val.basRgsTimTxt).format('YYYY-MM-DD');
				val.EI = 'Y';
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
				html += '		<div data-bind="fav" style="display: none;"></div>';
				html += '		<dl>';
				html += '			<sapn data-bind="nidxNm">' + val.nidxNm + '</sapn>';
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
				html += '</li>';
			});
			$('#listContainer').html(html);
			$$(document).findByName('btnDetail', 'click', this.handleActionClick);
		} else {
			const now = dayjs();
			
			html += '<div class="division-center">';
			html += '	<div class="no-result">';
			html += '		<i class="icon-only icon-48 icon-noresult bg-icon-gray_1"></i>';
			html += '		<p class="body-medium fw-400">조회된 데이터가 없습니다.</p>';
			html += '	</div>';
			html += '</div>';
			$('#listContainer').html(html);
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