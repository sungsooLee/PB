/*************************************************************************
* @ 서비스경로 : IVINF52P
* @ 파일명      : IVINF52P  투자정보 > 금융 뉴스 > [T]전체 > [P] 상세
* @ 화면ID	  : PBWIV099902
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export class IVINF52P extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		
		[this.targetData, this.setTargetData]	= this.useState('targetData', '');
		[this.targetType, this.setTargetType]	= this.useState('targetType', '');
		
		[this.newsType, this.setNewsType]		= this.useState('newsType', '');
		[this.nspbNm, this.setNspbNm]			= this.useState('nspbNm', '');
		[this.newsPostDTM, this.setNewsPostDTM]	= this.useState('newsPostDTM', '');
		[this.newsTitle, this.setNewsTitle]		= this.useState('newsTitle', '');
		[this.keyword1, this.setKeyword1]		= this.useState('keyword1', '');
		[this.keyword2, this.setKeyword2]		= this.useState('keyword2', '');
		[this.keyword3, this.setKeyword3]		= this.useState('keyword3', '');
		[this.keyword4, this.setKeyword4]		= this.useState('keyword4', '');
		[this.newsTxt, this.setNewsTxt]			= this.useState('newsTxt', '');
	}
	
	init (param) {
		super.init(this);
		this.setTargetData(param.targetData);
		this.setTargetType(param.searchType);
		
		if (!param.isPlaying) {
			this.setPlayManagerInit();
		}

		this.getDetailNewsData(param);
		
		this.register();
	}
	
	register () {
		// 항목 바인드
		this.bind('newsType', $$('#newsType'), 'div');
		this.bind('nspbNm', $$('#nspbNm'), 'div');
		this.bind('newsTitle', $$('#newsTitle'), 'h2');
		this.bind('newsPostDTM', $$('#newsPostDTM'), 'div');
		this.bind('keyword1', $$('#keyword1'), 'div');
		this.bind('keyword2', $$('#keyword2'), 'div');
		this.bind('keyword3', $$('#keyword3'), 'div');
		this.bind('keyword4', $$('#keyword4'), 'div');
		this.bind('newsTxt', $$('#newsTxt'), 'p');
		
		const inputFilesClick = async () => {
			this.setPlayManagerInit();
			await this.playerManager.playerPlay();
		}
		this.registerCallback('click', $$('#openNewsPlay'), inputFilesClick);
	}
	
	setPlayManagerInit () {
		this.playerManager = GlobalApp.getPlayerManager(this.rootElem, {
			container : '#fncNewsBtnDiv',
			menuNo : 'IVINF52P',
			singlePlay : true,
			searchType : this.targetType.value,
			searchKeyword : '',
			searchNspbNm : '',
			playList : this.targetData.value,
			playListTotalCount : 1,
			playSeq : 0
		});
	}

	async getDetailNewsData (param) {
		// 상품 분기 처리
		if (param.newsType === '펀드') {
			param.keyword.forEach((element, index) => {
				$$('#products').addClass('d-flex');
				$$('#keyword' + (index+1)).show();
				this['setKeyword'+(index+1)](element);
				$$('#newsType').addClass('tags-green-50');
			})
		} else {
			$$('#products').hide();
			if (param.newsType === '경제') {
				$$('#newsType').addClass('tags-lightCyan');
			}
			if (param.newsType === '세계') {
				$$('#newsType').addClass('tags-lightPurple');
			}
		}
		
		this.setNewsType(param.newsType);
		this.setNspbNm(param.nspbNm);
		this.setNewsPostDTM(param.newsPostDTM);
		this.setNewsTitle(param.newsTitle);
		this.setNewsTxt(param.newsTxt);
	}
	
	destroy () {
		super.destroy(this);
	}
}