/*************************************************************************
* @ 서비스경로 : ETFBOARD01M
* @ 파일명      : ETFBOARD01M.html ETF가이드북 > 목록
* @ 작성자      : 90195654
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';


const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class ETFGUIDE01M extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    	this.rootElem = elem;
    	[this.sbscList, this.setSbscList]	= this.useState('sbscList', []);
		[this.sbscId, this.setSbscId]		= this.useState('sbscId', '');
    }

    init () {
    	super.init(this);
    	this.apiNoticeList();
    }
    
    /**
     * 게시판 목록
     */
    async apiNoticeList() {
    	
    	const result = await ApiUtils.sendPost('/api/ntar/getBoardList.json', {pbBlbrTpNm:'etf0001'});
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiNoticeListDataSet(result.data);
	    	this.initListButton();
		}
    }
    
    
    async apiNoticeListDataSet(data) {
		
        if(data.length > 0) {
	        $.each(data, function(i, item){
	        	let html = '';
	        	html += '<li><a name="goDetail" data-blbrno="'+item.PB_BLBR_NO+'">';
	        	if(item.PB_UPPO_FIX_YN == 'Y') {
					html += '<div class="tag-wrap">';
					html += '	<div class="tags tags-small tags-lightRed">중요</div>';
					html += '</div>';
	        	}
				html += '<div class="text">'+item.PB_BLBR_TITLE_NM+'</div>';
				html += '<div class="date">'+item.PB_BLTN_STA_DT+'</div>';
				html += '</a></li>';
	        	
		        $$('#noticeList').append(html);
	        });
        } else {
        	$$("#no-result").css({'display':'flex'});
        	$$(".notice-list").hide();
        }
	}
    
    initListButton() {
    	/**
    	 * 상세페이지 이동
    	 */
    	const detailBtnClick = (event,element) => {
    		const param = {
    			blbrNo : element.dataset.blbrno
    		}
        	router.navigate('ntar02mETFDetail',param);
    	}
    	
    	$$(document).findByName('goDetail', 'click', detailBtnClick);
    }
    
    destroy () {
        super.destroy(this);
    }
}
