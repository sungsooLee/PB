/*************************************************************************
* @ 서비스경로 : SAFEBOARD01M
* @ 파일명      : SAFEBOARD01M 공지사항 목록
* @ 화면ID		: PBWNO000000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
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

export default class SAFEBOARD01M extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    	this.rootElem = elem;
    	[this.sbscList, this.setSbscList]	= this.useState('sbscList', []);
		[this.sbscId, this.setSbscId]		= this.useState('sbscId', '');
    }

    init () {
    	//page 이동
//    	const param = {
//			blbrNo : element.dataset.blbrno
//		}
//    	router.navigate('safeBoard02m',param);
    	
    	super.init(this);
    	this.getSbscData();
		this.register();
    	this.apiNoticeList();
    }
    
    register () {
		const pushFailCallback = () => {
			$$('#'+this.sbscId.value).elements[0].checked = false;
		}
		
		const pushCallback = () => {
			// 단말 설정 App으로 이동
			NativeUtils.callOpenSetting();
			$$('#'+this.sbscId.value).elements[0].checked = false;
		}
		
		const sbscCheckboxClick = async () => {
			console.log("#####sbscCheckboxClick", event.currentTarget.id);
			console.log("#####sbscCheckboxClick", event.currentTarget.checked);
			
			const checked = event.currentTarget.checked;
			const sbscId = event.currentTarget.id;
			this.setSbscId(sbscId);
			
			if (checked) {
				if ( EnvUtils.isPrd() ) {
					// 단말의 알림 허용 상태 체크
					let resNotiStt = await NativeUtils.callNotificationStatus();	// return 값에서 상태값 확인. : text / true/false
					
					// 알림 설정 상태
					if (resNotiStt.status === 'true') {
						this.setSbscData(sbscId, 'Y');
					} else {
						// 푸시 알림 설정 팝업
						$swal.fire02('Push 알림이 꺼져 있습니다. <br> 알림이 오지 않는다면, 휴대폰의 설정&gt;알림&gt;WON Click에서 알림을 허용해주세요.', 'caution', '예', true, '아니요', pushCallback, pushFailCallback);
					}
				} else {
					this.setSbscData(sbscId, 'Y');
				}
			} else {
				this.setSbscData(sbscId, 'N');
			}
		}
		const checkboxs = {elements : [$$('#sbsc0004').elements[0]]};
		const checkboxCallbacks = [sbscCheckboxClick];
		this.registerCallback('click', checkboxs, checkboxCallbacks);
	}
    
    async setSbscData (sbscId, sbscVal) {
		const url = '/api/userInfo/setSbscData.json';
		const params = {
			sbscCd : sbscId,
			sbscYn : sbscVal
		};
		
		const data = await ApiUtils.sendPost(url, params);
		if (data.resultCode === '000000') {
			
		}
	}
	
	async getSbscData () {
		const url = '/api/userInfo/getSbscList.json';
		const params = {
			sbscCd : ['sbsc0004']
		};
		
		const data = await ApiUtils.sendPost(url, params);
		console.log("---getSbscData : " + JSON.stringify(data, null, 2));
		if (data.resultCode === '000000') {
			this.setSbscList(data.data);
			
			this.drawSbscData();
		}
	}
	
	drawSbscData () {
		const sbscList = this.sbscList.value;
		sbscList.forEach((item) => {
			if (item.PBSBSCYN === 'Y') {
				$$('#'+item.PBSBSCCD).elements[0].checked = true;
			} else {
				$$('#'+item.PBSBSCCD).elements[0].checked = false;
			}
		})
	}
	
    destroy () {
        super.destroy(this);
    }
    
    /**
     * 게시판 목록
     */
    async apiNoticeList() {
    	
    	const result = await ApiUtils.sendPost('/api/ntar/getBoardList.json', {pbBlbrTpNm:'safe0001'});
		
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
        	router.navigate('ntar02mDetail',param);
    	}
    	
    	$$(document).findByName('goDetail', 'click', detailBtnClick);
    }
}
