/*************************************************************************
* @ 서비스경로 : IVINF10S
* @ 파일명      : IVINF10S.js 투자정보 - 서브메인
* @ 화면ID		: PBWMA020000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-10            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import IvinfData from '/components/ivinf/comm/IvinfData.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class IVINF10S extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
    }

	init () {
        super.init(this);
        
        this.initRegist();
	}
	
	async initRegist() {
		// 스켈레톤 시작
		this.setSkeletone();
		
		await this.loadData();
		
		this.registerCallback('click', $$('#btnSetUp'), () => {										// 관심목록
			const route = 'ivinf27s';
			const props = {
					type: 'main'
			};
			router.navigate(route, props);
		});
		
		this.registerCallback('click', $$('#btnAI'), () => {												// AI 시장지수 분석(데자view)
			const route = 'ivinf50s';
			const props = {
			};
			router.navigate(route, props);
		});		
		
		this.registerCallback('click', $$('#btnEcono'), () => {										// 경제캘린더   
			const route = 'ivinf30m';
			const props = {
					type: 'main'
			};
			router.navigate(route, props);
		});	
		
		this.registerCallback('click', $$('#btnVoice'), () => {											// 전체뉴스   
			const route = 'ivinf50m';
			const props = {
			};
			router.navigate(route, props);
		});
		
		this.registerCallback('click', $$('#btnIvinf20s'), () => {										// 지수찾기
			const route = 'ivinf20s';
			const props = {
			};
			router.navigate(route, props);
		});
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
			html += '			<dd>';
			html += '				<strong></strong>';
			html += '				<div></div>';
			html += '			</dd>';
			html += '			<dd>';
			html += '				<div></div>';
			html += '			</dd>';
			html += '		</dl>';
			html += '	</a>';
			html += '</li>';
		}
		$$('#cncrData').html(html);
		
		let iHtml = '';
		for(let j = 0; j < 3; j++) {
			iHtml += '<a href="#" class="eco-list">';
			iHtml += '	<div class="eco-title">';
			iHtml += '		<div class="tags tags-small"></div>';
			iHtml += '		<strong class="title-medium"></strong>';
			iHtml += '	</div>';
			iHtml += '	<div class="eco-content">';
			iHtml += '		<dl>';
			iHtml += '			<div class="list">';
			iHtml += '				<dt></dt>';
			iHtml += '				<dd></dd>';
			iHtml += '			</div>';
			iHtml += '			<div class="list">';
			iHtml += '				<dt></dt>';
			iHtml += '				<dd></dd>';
			iHtml += '			</div>';
			iHtml += '			<div class="list">';
			iHtml += '				<dt></dt>';
			iHtml += '				<dd></dd>';
			iHtml += '			</div>';
			iHtml += '		</dl>';
			iHtml += '		<dl>';
			iHtml += '			<dt></dt>';
			iHtml += '			<dd>';
			iHtml += '				<div class="star-rate"></div>';
			iHtml += '			</dd>';
			iHtml += '		</dl>';
			iHtml += '	</div>';
			iHtml += '</a>';
		}
		$$('#ivinfContainer').html(iHtml);
		
		$('.content').addClass('loading');
	}
	
	/**
	 * 데이터 가져오기
	 * 
	 * @param
	 */
	async loadData() {
		const url = '/pb/api/mn/investMain.json';
		const params = {};
    	const res = await ApiUtils.sendPost(url, params, true);
    	
    	if(res.resultCode === '000000') {
    		// 나의관심지수
    		const data = res.data.data;
    		// PB WON에서 사용하는 명으로 변경
    		data.forEach((d, r) => {
    			d.nidxOriginalNm = d.nidxNm;
    			d.nidxNm = IvinfData.changePbData(d.nidxNm);
    		});
	    	if(data.length > 0) {
		    	// 순서지정 관심등록의 순번
//	    		data.sort((a , b) => a.cncrNidxExpsSeq - b.cncrNidxExpsSeq || a.nidxNm.localeCompare(b.nidxNm));
	    		this.setCncrData(data);
	    	} else {
	    		$('#cncrNoData').css({'display':''});
	    		// 스켈레톤 적용으로 인해 그려줬던 html을 초기화 해야함.
	    		$$('#cncrData').html('');
	    		$$('#cncrData').hide();
	    	}
    		// 오늘의 경제 캘린더
    		const ivinf = res.data.ivinf.grid;
    		const ivinfCnt = res.data.ivinf.gridRowCnt;
    		this.setIvinfData(ivinf, ivinfCnt);
    	}
	}
	
	/**
	 * 나의관심지수
	 * 
	 * @param
	 */
	async setCncrData(data) {
		// 5개까지만 보여짐
		data.splice(5);		
		
		let html = '';
		data.forEach((val, idx) => {
			
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
			// 실시간 여부
			const live = (val.rltmYn === 'Y') ? 'live-on' : 'live-off';
			const liveStr = (val.rltmYn === 'Y') ? '실시간' : '비 실시간';
			let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
			let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
			let fndNidxFlfdRt = CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2));
			
			html += '<li id="' + val.mktNidxDscd + '" data-id="' + val.fav + '" data-val="' + stcEprNidx + '" data-rt="' + flfdEqvvRt + '" data-rate="' + fndNidxFlfdRt + '" data-nm="' + val.nidxOriginalNm + '" data-time="' + val.basRgsTimTxt + '" data-exr="' + val.disTxt + '">';
			html += '	<a href="javascript:void(0);" name="btnDetail">';
			html += '		<dl>';
			html += '			<dt>' + val.nidxNm;
			if(val.rltmYn === 'Y') {
			html += '				<i class="' + live + '" aria-label="' + liveStr + '"></i>';
			}
			html += '			</dt>';
			html += '			<dd>';
			html += '				<strong>' + stcEprNidx + '</strong>';
			// 등락폭
			if(Number(parseFloat(val.flfdEqvvRt).toFixed(2)) == 0) {
				html += '				<div class="stock ' + cls + '" aria-label="' + label + '">0</div>';
			} else {
				html += '				<div class="stock ' + cls + '" aria-label="' + label + '">' + CmmUtils.comma(Math.abs(parseFloat(val.flfdEqvvRt)).toFixed(2)) + '</div>';
			}
			html += '			</dd>';
			html += '			<dd>';
			if(fndNidxFlfdRt > 0) {
			html += '				<div class="tags tags-small ' + tags + '" aria-label="등락율">+' + fndNidxFlfdRt + '%</div>';
			} else {
			html += '				<div class="tags tags-small ' + tags + '" aria-label="등락율">' + fndNidxFlfdRt + '%</div>';
			}
			html += '			</dd>';
			html += '		</dl>';
			html += '	</a>';
			html += '</li>';
		});
		if(data.length < 5) {
			html += '<li>';
			html += '	<button type="button" id="btnNidx">';
			html += '		<i class="icon-only icon-16 icon-add bg-typography-placeholder"></i>';
			html += '		<strong class="title-small fc-typography-placeholder">지수 추가</strong>';
			html += '	</button>';
			html += '</li>';
		}
		$$('#cncrData').html(html);
		
		$$(document).findByName('btnDetail', 'click', this.handleActionClick);					// 주요지수 - 상세화면이동
		this.registerCallback('click', $$('#btnNidx'), () => {												// 주요지수목록
			const route = 'ivinf20s';
			const props = {
			};
			router.navigate(route, props);
		});
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
    			rate: $key.attr('data-rate') + '%',
    			basDate: $key.attr('data-time'),
    			exr: $key.attr('data-exr'),
    			rltmYn: 'Y'
    	};
    	router.navigate(route, props);
	}

	/**
	 * 오늘의 경제 캘린더
	 * this.nacdToNacdNm > 한국, 미국, 중국, 일본 제외한 국가코드 유로존 처리
	 * @param
	 */
	async setIvinfData(data, rowCnt) {
		let html = '';
		if(rowCnt > 0) {
			data.forEach((val, idx) => {
				html += '<a href="javascript:void(0);" class="eco-list">';
				html += '	<div class="eco-title">';
				html += '		<div class="tags tags-small tags-us">';
				html += '			<div class="flag flag-' + this.nacdToNacdNm(val.nacd).cd.toLowerCase() + '"><strong></strong>' + this.nacdToNacdNm(val.nacd).str + '</div>';
				html += '		</div>';
				html += '		<strong class="title-medium">' + val.ecinTxt + '</strong>';
				html += '	</div>';
				html += '	<div class="eco-content">';
				html += '		<dl>';
				html += '			<div class="list">';
				html += '				<dt>과거</dt>';
				html += '				<dd>' + val.ecinPastNvTxt + '</dd>';
				html += '			</div>';
				html += '			<div class="list">';
				html += '				<dt>예상</dt>';
				html += '				<dd>' + val.ecinFrcsNvTxt + '</dd>';
				html += '			</div>';
				html += '			<div class="list">';
				html += '				<dt>실제</dt>';
				html += '				<dd class="rise" aria-label="상승">' + val.ecinAclNvTxt + '</dd>';
				html += '			</div>';
				html += '		</dl>';
				// 중요도(별) - 반복
				if(Number(val.ecinImptcDscd) > 0) {
					html += '		<dl>';
					html += '			<dt>중요도</dt>';
					html += '			<dd>';
					html += '				<div class="star-rate">';
					let i = 0;
					for(; i < Number(val.ecinImptcDscd); i++) {
						html += '					<i class="icon-only icon-12 icon-star bg-brandPrimary-blue400" aria-label="별"></i>';
					}						
					html += '				</div>';
					html += '			</dd>';
					html += '		</dl>';
				}
				html += '	</div>';
				html += '</a>';
			});
		} else {
			html += '<div class="py16">';
			html += '	<p class="description caution body-small fc-typography-caption ac">일정이 없습니다.</p>';
			html += '</div>';
		}
		$$('#ivinfContainer').html(html);
		$('.content').removeClass('loading');
		CmmUtils.hideLoading();
	}
	
	/**
	 * 국가코드 > 국가명
	 * 한국, 미국, 중국, 일본 제외한 국가코드 유로존 처리
	 * @param
	 */
	nacdToNacdNm(nacd) {
		let str = '';
		let cd = '';
		
		switch ( nacd ) {
		
		case "KR" :
		case "SK" :
			str = '한국';
			cd = nacd;
			break;
			
		case "US" :
			str = '미국';
			cd = nacd;
			break;
			
		case "CH" :
			str = '중국';
			cd = 'cn';
			break;
			
		case "JN" :
			str = '일본';
			cd = 'jp';
			break;
			
		default :
			str = '유럽';
			cd = 'eu';
			break;
	}
		return ({'str':str, 'cd':cd});
	}
	
    destroy() {
        super.destroy(this);
    }
}