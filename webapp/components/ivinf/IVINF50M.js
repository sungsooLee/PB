/*************************************************************************
* @ 서비스경로 : IVINF50M
* @ 파일명      : IVINF50M  투자정보 > 금융 뉴스 > [T]전체 > 목록
* @ 화면ID	  : PBWIV090000
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

// router 초기화
const router = globalApp.router;
export default class IVINF50M extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		this.playerManager = null;
		
		[this.searchType, this.setSearchType]					= this.useState('searchType', 'all');
		
		[this.searchKeyAll, this.setSearchKeyAll]				= this.useState('searchKeyAll', '');
		[this.searchNspbNmAll, this.setSearchNspbNmAll]			= this.useState('searchNspbNmAll', []);
		[this.searchKeyMy, this.setSearchKeyMy]				= this.useState('searchKeyMy', '');
		[this.searchNspbNmMy, this.setSearchNspbNmMy]		= this.useState('searchNspbNmMy', []);
		[this.searchKeyEcon, this.setSearchKeyEcon]				= this.useState('searchKeyEcon', '');
		[this.searchNspbNmEcon, this.setSearchNspbNmEcon]		= this.useState('searchNspbNmEcon', []);
		[this.searchKeyWorld, this.setSearchKeyWorld]			= this.useState('searchKeyWorld', '');
		[this.searchNspbNmWorld, this.setSearchNspbNmWorld]		= this.useState('searchNspbNmWorld', []);
		[this.searchKeyFund, this.setSearchKeyFund]				= this.useState('searchKeyFund', '');
		[this.searchNspbNmFund, this.setSearchNspbNmFund]		= this.useState('searchNspbNmFund', []);
		
		[this.currentPageAll, this.setCurrentPageAll]			= this.useState('currentPageAll', 1);
		[this.currentPageMy, this.setCurrentPageMy]			= this.useState('currentPageMy', 1);
		[this.currentPageEcon, this.setCurrentPageEcon]			= this.useState('currentPageEcon', 1);
		[this.currentPageWorld, this.setCurrentPageWorld]		= this.useState('currentPageWorld', 1);
		[this.currentPageFund, this.setCurrentPageFund]			= this.useState('currentPageFund', 1);
		
		[this.pageSize, this.setPageSize]						= this.useState('pageSize', 10);
	}
	
	init () {
		super.init(this);
		console.log("######ivinf50m init");
		$$('#playerTxt').text('금융뉴스');
		this.playerManager = GlobalApp.getPlayerManager(this.rootElem, {
			container : '#fncNewsBtnDiv',
			menuNo : 'IVINF50M',
			singlePlay : false,
			searchType : 'all',
			searchKeyword : '',
			searchNspbNm : '',
			playList : [],
			playListTotalCount : 0,
			playSeq : 0
		});
		this.playerManager.allNewsList = [];
		this.playerManager.allNewsCount = 0;
		this.playerManager.allNewsOptions = {};
		this.playerManager.econNewsList = [];
		this.playerManager.econNewsCount = 0;
		this.playerManager.econNewsOptions = {};
		this.playerManager.myNewsList = [];
		this.playerManager.myNewsCount = 0;
		this.playerManager.myNewsOptions = {};
		this.playerManager.worldNewsList = [];
		this.playerManager.worldNewsCount = 0;
		this.playerManager.worldNewsOptions = {};
		this.playerManager.fundNewsList = [];
		this.playerManager.fundNewsCount = 0;
		this.playerManager.fundNewsOptions = {};
		$$('#fncNewsPlayerBottom').hide();
		this.getNewsList();
		
		this.register();
	}
	
	register () {
		$$('#btnSearchNews').on('touchend', async ()=> {
			event.preventDefault();
			await this.openSearchPopUp();
		});
		$$('#ttsPlay').off().on('touchend', async () => {
			event.preventDefault();
			await this.playTTS();
		});
		$$('#ttsPause').off().on('touchend', async () => {
			event.preventDefault();
			await this.pauseTTS();
		});
		$$('#ttsPrev').off().on('touchend', async () => {
			event.preventDefault();
			await this.prevTTS();
		});
		$$('#ttsNext').off().on('touchend', async () => {
			event.preventDefault();
			await this.nextTTS();
		});
		
		$$('#ttsPlayAll').off().on('touchend', async () => {
			event.preventDefault();
			//await this.stopTTS();
			await this.playTTS(true);
		});
		
		const _this = this;
		$$('a[name=fncNews]').on('touchend', async () => {
			let route = event.target.dataset.id;
			if (route !== _this.searchType.value) {
				$$('#all').removeClass('tab-active');
				$$('#my').removeClass('tab-active');
				$$('#econ').removeClass('tab-active');
				$$('#world').removeClass('tab-active');
				$$('#fund').removeClass('tab-active');
				
				$$('#'+route).addClass('tab-active');
				_this.setSearchType(route);
				
				$$(document).scrollToTop();
				$(document).off('scroll');
				
				$$('#allNewsDiv').hide();
				$$('#myNewsDiv').hide();
				$$('#econNewsDiv').hide();
				$$('#worldNewsDiv').hide();
				$$('#fundNewsDiv').hide();
				$$('#'+route+'NewsDiv').show();
				
				if (route === 'fund') {
					$$('#updateInfo').text('오늘의 금융뉴스는 오전 7시, 오후 12시, 4시에 업데이트됩니다. 펀드 뉴스는 6개월간의 뉴스를 조회할 수 있습니다.');
				} else if (route === 'my') {
					$$('#updateInfo').text('오늘의 금융뉴스는 오전 7시, 오후 12시, 4시에 업데이트됩니다. MY 뉴스는 최근 1년간 판매한 투자상품 관련 뉴스와 오늘의 주요뉴스를 제공합니다.');
				} else {
					$$('#updateInfo').text('오늘의 금융뉴스는 오전 7시, 오후 12시, 4시에 업데이트됩니다.');
				}
				
				if (_this.playerManager[route+'NewsCount'] === 0) {
					await _this.getNewsList();
				} else {
					_this.scrollEvent();
					$$('.financial-news').show();
					$$('#noFncNews').hide();
				}
			}
		});
	}
	
	async getNewsList () {
		const searchType = this.searchType.value;
		const searchTypeNm = searchType.charAt(0).toUpperCase() + searchType.slice(1).toLowerCase();
		
		console.log("---searchType : " + searchType);
		
		console.log("---searchTypeNm : " + searchTypeNm);
		const params = {};
		params.searchType = searchType;
		params.searchKeyword = this['searchKey'+searchTypeNm].value;
		params.searchNspbNm = this['searchNspbNm'+searchTypeNm].value;
		params.currentPage = this['currentPage'+searchTypeNm].value;
		params.pageSize = this.pageSize.value;
		
		console.log("---params : " + JSON.stringify(params, null, 2));
		const res = await this.playerManager.getNewsList(params);
		//console.log("---res : " + JSON.stringify(res, null, 2));
		
		if (res) {
			if (!this.playerManager.isPlaying) {
				this.setPlayList(false);
			}
			
			$$('#allNewsDiv').hide();
			$$('#myNewsDiv').hide();
			$$('#econNewsDiv').hide();
			$$('#worldNewsDiv').hide();
			$$('#fundNewsDiv').hide();
			$$('#'+searchType+'NewsDiv').show();
			
			$(document).off('scroll');
			this.scrollEvent();
			
			this.addListEvent();
		}
	}
	
	async stopTTS () {
		await this.playerManager.playerStop();
	}
	
	async playTTS (listBtn) {
		console.log("#######playTTS::::::::");
		if ((!this.playerManager.isPlaying && !this.playerManager.isPause) || listBtn) {
			await this.setPlayList(false);
		}
		
		await this.playerManager.playerPlay();
	}
	
	async pauseTTS () {
		await this.playerManager.playerPause();
	}
	
	async prevTTS () {
		await this.playerManager.playerPrev();
	}

	async nextTTS () {
		await this.playerManager.playerNext();
	}
	
	async playSingleTTS () {
		const newsId = event.currentTarget.id.replace('playNewsId', '');
		await this.setPlayList(true, newsId);
		await this.playerManager.playerPlay();
	}
	
	setPlayList (singlePlay, newsId) {
		const searchType = this.searchType.value;
		const searchTypeNm = searchType.charAt(0).toUpperCase() + searchType.slice(1).toLowerCase();
		const singlePlayList = [];
		if (singlePlay) {
			singlePlayList.push(this.playerManager[searchType+'NewsList'].find(x => x.PBNEWSID === newsId));
		}
		this.playerManager = GlobalApp.getPlayerManager(this.rootElem, {
			container : '#fncNewsBtnDiv',
			menuNo : 'IVINF50M',
			singlePlay : singlePlay,
			searchType : searchType,
			searchKeyword : this['searchKey'+searchTypeNm].value,
			searchNspbNm : this['searchNspbNm'+searchTypeNm].value,
			playList : singlePlay ? singlePlayList : this.playerManager[searchType+'NewsList'],
			playListTotalCount : singlePlay ? 1 : this.playerManager[searchType+'NewsCount'],
			playSeq : 0
		});
	}

	async openSearchPopUp () {
		const route = 'ivinf50p';
		const props = {};
		
		await GlobalApp.popupUtils.openPopup(route, {
			showCloseBtn : true,
			params : props,
			btn2IsMain : true,
			btn2Label : '검색',
			onClose : (result) => console.log('onClose Result : ', result),
			onYes : (result) => this.setSearchData(result),
		});
	}
	
	setSearchData (result) {
		const searchType = this.searchType.value;
		const searchTypeNm = searchType.charAt(0).toUpperCase() + searchType.slice(1).toLowerCase();
		this['setSearchKey'+searchTypeNm](result.data.searchKeyword);
		this['setSearchNspbNm'+searchTypeNm](result.data.searchNspbNm);
		this['setCurrentPage'+searchTypeNm](1);
		
		$$('#'+searchType+'NewsList').html('');
		
		this.getNewsList();
	}

	scrollEvent () {
		const searchType = this.searchType.value;
		const searchTypeNm = searchType.charAt(0).toUpperCase() + searchType.slice(1).toLowerCase();
		const _this = this;
		$(document).scroll(function(){
			_this.addListEvent();
			let val = window.innerHeight + window.scrollY;
			if (val >= document.documentElement.scrollHeight - 1) {
				if (_this.playerManager[searchType+'NewsList'].length < _this.playerManager[searchType+'NewsCount']) {
					const nextPage = _this['currentPage'+searchTypeNm].value + 1;
					_this['setCurrentPage'+searchTypeNm](nextPage);
					_this.getNewsList();
				}
			}
		})
	}
	
	addListEvent () {
		// 리스트 클릭 이벤트
		$$('button[name="btnDetailNews"]').off('click');
		$$('button[name="btnDetailNews"]').on('click', async ()=> await this.openDetailNews());

		$$('button[name="btnPlayNews"]').off('click');
		$$('button[name="btnPlayNews"]').on('click', async ()=> await this.playSingleTTS());
	}
	
	async openDetailNews () {
		const searchType = this.searchType.value;
		const targetId = event.currentTarget.id.replace('newsId', '');
		const targetData = this.playerManager[searchType+'NewsList'].filter(x => x.PBNEWSID.toString() === targetId);
		
		const isPlaying = this.playerManager.isPlaying;
		
		const route = 'ivinf52p';
		const props = {
			searchType : searchType,
			targetId : targetId,
			targetData : targetData,
			nspbNm : targetData[0].PBNSPBNM,
			newsTitle : targetData[0].PBNEWSTITLNM,
			newsTxt : targetData[0].PBNEWSTXT,
			newsPostDTM : targetData[0].PBAUTRGPEDTM,
			newsType : targetData[0].PBNEWSDSCD === 'MRKT' ? targetData[0].PBNEWSTYCD : '펀드',
			keyword : targetData[0].PBKEYWORD ? targetData[0].PBKEYWORD.split(', ') : [],
			isPlaying : isPlaying
		};
		
		$('#fncNewsBtnDiv').css({
			'zIndex': 'calc(var(--modal-zIndex) + 1)'
		})
		
		await GlobalApp.popupUtils.openPopup(route, {
			showCloseBtn : true,
			params : props,
			onClose : (result) => {
				$('#fncNewsBtnDiv').css({
					'z-index': ''
				})
			}
		});
	}
	
	destroy () {
		super.destroy(this);
		$(document).off('scroll');
		this.playerManager.playerStop();
	}
}