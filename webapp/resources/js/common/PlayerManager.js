class PlayerManager {
	constructor (rootElem, options = {}) {
		if (PlayerManager.instance) {
			return PlayerManager.instance;
		}
		
		PlayerManager.instance = this;
		
		this.rootElem = rootElem;
		this.items = [];
		this.itemModules = new Map();
		this.playerContainer = null;
		this.isPlaying = false;
		this.isPause = false;
		
		this.searchNewsList = [];
		
		this.allNewsList = [];
		this.allNewsCount = 0;
		this.allNewsOptions = {};
		this.myNewsList = [];
		this.myNewsCount = 0;
		this.myNewsOptions = {};
		this.econNewsList = [];
		this.econNewsCount = 0;
		this.econNewsOptions = {};
		this.worldNewsList = [];
		this.worldNewsCount = 0;
		this.worldNewsOptions = {};
		this.fundNewsList = [];
		this.fundNewsCount = 0;
		this.fundNewsOptions = {};
		
		this.options = {
			menuNo : 'IVINF50M',
			singlePlay : false,
			searchType : 'all',
			playList : [],
			playListTotalCount : 0,
			playSeq : 0,
			...options
		};
		
		this.setPlayerBtn();
		
		const handleNativeResponse = (event) => {
			const response = event.detail;
			console.log("#####PlayerManager", response);
			console.log("#####PlayerManager22222222", event);
			console.log("#####PlayerManager::::seq", this.options.playSeq);
			
			if (response.result === '0') {
				console.log("#####PlayerManager::::isPlaying", this.isPlaying);
				if (this.isPlaying) {
					this.isPlaying = !this.isPlaying;
					console.log("#####PlayerManager::::isPlaying", this.isPlaying);
					this.playerNext();
				}
			}
		}
		
		this.nativeCallback = handleNativeResponse;
		console.log("######PlayerManager::::::NativeUtils")
		NativeUtils.subscribe(handleNativeResponse);
	}
	
	init (containerSelector, options) {
		this.playerContainer = containerSelector;
		
		if (!this.playerContainer) {
			throw new Error('Player Container not found!!');
		}
		
		if (options) {
			this.options = options;
		}
	}
	
	getPbnsIcon (pbnsNm) {
		switch (pbnsNm) {
			case '매일경제' :
				return 'media02';
			case '한국경제' :
				return 'media03';
			case '연합뉴스' :
				return 'media01';
			case '이데일리' :
				return 'media04';
			case '서울경제' :
				return 'media05';
			case '파이낸셜뉴스' :
				return 'media06';
			case '헤럴드' :
			case '해럴드' :
			case '헤럴드경제' :	
			case '해럴드경제' :
				return 'media07';
			case '뉴스1' :
				return 'media08';
			case '아시아경제' :
				return 'media09';
			case '국민일보' :
				return 'media10';
			case '머니투데이' :
				return 'media11';
			case '한국경제TV' :
				return 'media12';
			default : 
				return 'mediaetc';
		}
	}
	
	async showNewsList (searchType, newsList) {
		if (newsList.length === 0) {
			$$('.financial-news').hide();
			$$('#noFncNews').css({'display' : 'flex'});
			if (this[searchType+'NewsOptions'].searchKeyword === '' && this[searchType+'NewsOptions'].searchNspbNm.length === 0) {
				$$('#noFncNews').find('.no-result').find('p').html('오늘의 금융뉴스는 오전 7시, 오후 12시, 4시에  <br>업데이트됩니다.');
			} else {
				$$('#noFncNews').find('.no-result').find('p').text('검색 결과가 없습니다.');
			}
		} else {
			$$('.financial-news').show();
			$$('#noFncNews').hide();
			newsList.forEach((item) => {
				this[searchType+'NewsList'].push(item);
				
				let typeIcon = '';
				let typeTxt = '';
				let keyList = [];
				if (item.PBNEWSDSCD === 'PRD') {
					typeIcon = 'tags-green-50';
					typeTxt = '펀드';
					keyList = item.PBKEYWORD.split(', ');
				} else if (item.PBNEWSTYCD === '경제') {
					typeIcon = 'tags-lightCyan';
					typeTxt = '경제';
				} else if (item.PBNEWSTYCD === '세계') {
					typeIcon = 'tags-lightPurple';
					typeTxt = '세계';
				}
				
				const pbnsIcon = this.getPbnsIcon(item.PBNSPBNM);
				
				let newsHtml = '';
				newsHtml += '<li>';
				newsHtml += '	<button type="button" class="financial-news-detail" name="btnDetailNews" id="newsId' + item.PBNEWSID + '" data-micromodal-trigger="modal-news-content" class="financial-news-detail">';
				newsHtml += '		<span class="financial-news-title">';
				if (searchType === 'all') {
					newsHtml += '			<span class="tags tags-small' + ' ' + typeIcon + '">' + typeTxt + '</span>';
				}
				newsHtml += '			<span class="media"><i class="' + pbnsIcon + '"></i>' + item.PBNSPBNM + '</span>';
				newsHtml += '		</span>';
				newsHtml += '		<strong class="title-large ellipsis" data-ellipsis="2">' + item.PBNEWSTITLNM + '</strong>';
				newsHtml += '		<span class="date">' + item.PBAUTRGPEDTM + '</span>';
				if (searchType !== 'all' && item.PBNEWSDSCD === 'PRD') {
					newsHtml += '		<span class="tag-wrap overflow-list">';
					keyList.forEach((element) => {
						newsHtml += '			<span class="tags tags-small tags-surface50">' + element + '</span>';
					});
					newsHtml += '		</span>';
				}
				newsHtml += '	</button>';
				newsHtml += '	<button type="button" name="btnPlayNews" id="playNewsId' + item.PBNEWSID + '" class="financial-news-control" aria-label="이 뉴스 듣기" data-toggle="toggle-trigger">';
				newsHtml += '		<i class="icon-only icon-24 icon-sound2 bg-icon-gray_1" data-switch-inner="true" data-switch-inner-before="bg-icon-gray_1" data-switch-inner-after="bg-status-active"></i>';
				newsHtml += '	</button>';
				newsHtml += '</li>';
				
				$$('#'+searchType+'NewsList').append(newsHtml);
			})
		}
	}
	
	async getNewsList (params) {
		const url = '/pb/api/ivinfNews/getNewsList.json';
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === '000000') {
			this[params.searchType+'NewsOptions'] = params;
			this[params.searchType+'NewsCount'] = res.data.totalCnt;
			const resetList = await this.checkSearchData(params);
			if (resetList) {
				this[params.searchType+'NewsList'] = [];
			}
			
			await this.showNewsList(params.searchType, res.data.data);
			
			return true;
		} else {
			await CmmUtils.alert('', '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.');// {btnLabel : '확인', useCancelBtn : false});
			return false;
		}
	}
	
	async checkSearchData (params) {
		if (params.currentPage === 1) {
			return true;
		}
		
		return false;
	}
	
	async callNativeTTS (action) {
		$$('.bg-status-active').addClass('bg-icon-gray_1').removeClass('bg-status-active');
		if (action === '0') {
			if (this.options.playList.length === 0) {
				return;
			}
			this.isPlaying = true;
			this.isPause = false;
			const newsId = this.options.playList[this.options.playSeq].PBNEWSID;
			const newsTitle = this.options.playList[this.options.playSeq].PBNEWSTITLNM;
			$$('#' + this.options.searchType + 'NewsList').find('#playNewsId' + newsId).find('i').addClass('bg-status-active');
			$$('#fncNewsPlayerBottom').show();
			const titleStatus = $$('#fncNewsPlayerBottom').find('p').text();
			if (titleStatus === '') {
				scrollReset();
			}
			$$('#fncNewsPlayerBottom').find('p').text(newsTitle);
			
			const url2 = '/api/cmm/insertFunctionVstpeLog.json';
			const params2 = {
				menuNo: this.options.menuNo, 
				majFuncCd: '01'
			};
			
			const res2 = await ApiUtils.sendPost(url2, params2, false, true);
		} else if (action === '1') {
			this.isPlaying = false;
			this.isPause = false;
		} else if (action === '2') {
			this.isPlaying = false;
			this.isPause = true;
		}
		
		this.setPlayerAction(this.isPlaying);
		this.setPlayerBtn();
		
		const ttsKey = this.options.siglePlay ? 'single' : this.options.playSeq.toString();
		const ttsTxt = this.options.playList[this.options.playSeq].PBNEWSTXT;
		await NativeUtils.callTTS(ttsKey, action, ttsTxt);
	}
	
	async playerPlay () {
		await this.callNativeTTS('0');
	}

	async playerStop () {
		if (this.isPlaying || this.isPause) {
			await this.callNativeTTS('1');
		}
	}
	
	async playerPause () {
		await this.callNativeTTS('2');
	}
	
	async playerPrev () {
		if (!document.getElementById('ttsPrev').disabled) {
			if (this.options.playSeq > 0) {
				this.options.playSeq = this.options.playSeq - 1;
				await this.playerPlay();
			}
		}
	}
	
	async playerNext () {
		if (!document.getElementById('ttsNext').disabled) {
			if (this.options.playSeq < this.options.playList.length - 1) {
				this.options.playSeq = this.options.playSeq + 1;
				await this.playerPlay();
			} else {
				if (this.options.playSeq < this.options.playListTotalCount - 1) {
					const params = this[this.options.searchType+'NewsOptions'];
					params.currentPage = params.currentPage+1;
					const res = await this.getNewsList(params);
					console.log("#####playerNext::::res", res);
					if (res) {
						this.options.playSeq = this.options.playSeq + 1;
						await this.playerPlay();
					}
				} else {
					this.isPlaying = !this.isPlaying;
					this.setPlayerAction(this.isPlaying);
				}
			}
		} else {
			if (!this.isPlaying && !this.isPause) {
				$$('.bg-status-active').addClass('bg-icon-gray_1').removeClass('bg-status-active');
				this.setPlayerAction(this.isPlaying);
				$$('#fncNewsPlayerBottom').find('p').text('');
				$$('#fncNewsPlayerBottom').hide();
				scrollReset();
			}
		}
	}
	
	setPlayerBtn () {
		if (this.options.singlePlay) {
			this.setPlayerBtnSub('ttsPrev', false);
			this.setPlayerBtnSub('ttsNext', false);
		} else {
			this.setPlayerBtnSub('ttsPrev', true);
			this.setPlayerBtnSub('ttsNext', true);
			if (this.options.playSeq === 0) {
				this.setPlayerBtnSub('ttsPrev', false);
			}
			if (this.options.playSeq === this.options.playListTotalCount-1) {
				this.setPlayerBtnSub('ttsNext', false);
			}
		}
	}
	
	setPlayerBtnSub(btnId, status) {
		if (status) {
			$$('#'+btnId).removeAttr('disabled');
			$$('#'+btnId).find('i').addClass('bg-icon-white');
			$$('#'+btnId).find('i').removeClass('bg-icon-disabled');
		} else {
			$$('#'+btnId).addAttr('disabled', true);
			$$('#'+btnId).find('i').removeClass('bg-icon-white');
			$$('#'+btnId).find('i').addClass('bg-icon-disabled');
		}
	}
	
	setPlayerAction (action) {
		if (action) {
			$$('#ttsPlay').hide();
			$$('#ttsPause').css({'display' : 'flex'});
			$$('#fncNewsPlayer').addClass('is-playing');
		} else {
			$$('#ttsPause').hide();
			$$('#ttsPlay').css({'display' : 'flex'});
			$$('#fncNewsPlayer').removeClass('is-playing');
		}
	}
}

export default PlayerManager;