/*************************************************************************
* @ 서비스경로 : NTAR02M
* @ 파일명      : NTAR02M 공지사항 상세
* @ 화면ID		: PBWNO010000
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

export default class NTAR02M extends BaseModule {
	
    constructor(elem,data) {
        
    	super(elem);
    	
    	[this.blbrNo, this.setBlbrNo] = this.useState('blbrNo', data.blbrNo); //전달받은 사업자번호
    }

    init () {
    	super.isPinchZoom(true);
    	super.init(this);
    	this.apiNoticeDetail();
    	this.register();
    }
    
    register() {
    	const goList = async () => {
			router.navigate('ntar01m',{});
		}
		this.registerCallback("click", $$("#goList"), goList);
    }
    
    
    /**
     * 펀드 검색
     */
    async apiNoticeDetail() {
    	
    	const param = {
    		pbBlbrNo : this.blbrNo.value
    	}
    	const result = await ApiUtils.sendPost('/api/ntar/getNoticeDetail.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiNoticeDetailtDataSet(result.data);
		}
    }
    
    
    async apiNoticeDetailtDataSet(data) {
		
        console.log(data);
        $$("#blbrTitleNm").text(data.notice.PB_BLBR_TITLE_NM);
        $$("#bltnStaDt").text(data.notice.PB_BLTN_STA_DT);
        if(data.notice.PB_BLBR_TXT !== null) {
        	$$("#blbrTxt").text(data.notice.PB_BLBR_TXT);
        	$$(".text").show();
        }
        if(data.notice.PB_UPPO_FIX_YN === 'Y') $$("#uppoFix").show();
        if(data.notice.PB_IMG_NM !== null && typeof data.notice.PB_IMG_NM !== "undefined") {
        	$$("#imgSrcset").show();
        	$$("#imgUrl").show();
        	
        	const time = dayjs().format('YYYYMMDDHHmmss');
            const filePathNm = '/api/file/getFileView?fileName=' + data.notice.PB_IMG_NM + '&fileType=NOTI&time=' + time;
            
            $$("#imgSrcset").addAttr("srcset",filePathNm);
        	$$("#imgUrl").addAttr("src", filePathNm);
        }
        
        if(data.notice.PB_BLBR_LINK === '1') {
         	//내부링크
         	if(data.notice.PB_BLBR_IN_LINK_MENU_ID === 'ntar01m') {
         		//공지사항 상세인 경우 해당 상세페이지로 이동
         		 $$("#link").text('공지사항 상세 > '+data.notice.DETAIL_NOTICE_TITLE);
         	} else {
         		//메뉴로 이동
         		if(data.notice.PB_BLBR_IN_LINK_MENU_ID === 'mn10m') {
         			 $$("#link").text("메인>홈");
         		} else if(data.notice.PB_BLBR_IN_LINK_MENU_ID === 'ntbx10m') {
         			 $$("#link").text("메인>알림");
         		} else {
         			 $$("#link").text(data.notice.PB_MENU_NM);
         		}
         	}
         } else if(data.notice.PB_BLBR_LINK === '2') {
        	 if(data.notice.PB_BLBR_OUT_LINK_URL !==  null) {
        		 $$("#link").text(data.notice.PB_BLBR_OUT_LINK_URL);
        	 } else {
        		 $$(".message-link").hide();
        	 }
         } else {
        	 $$(".message-link").hide();
         }
        
        
         const openLink  = async (event, element) => {
        	 if(data.notice.PB_BLBR_LINK === '1') {
             	//내부링크
             	if(data.notice.PB_BLBR_IN_LINK_MENU_ID == 'ntar01m') {
             		//공지사항 상세인 경우
             		this.setBlbrNo(data.notice.PB_BLBR_IN_LINK_DTL_ID);
             		this.apiNoticeDetail();
             	} else {
             		//메뉴로 이동
             		router.navigate(data.notice.PB_BLBR_IN_LINK_MENU_ID,{});
             	}
             } else if(data.notice.PB_BLBR_LINK === '2') {
             	//외부링크
             	if(data.notice.PB_BLBR_OUT_LINK_BRWS === 'out001') { //인앱브라우저
             		const res = await NativeUtils.callLocalBrowser(data.notice.PB_BLBR_OUT_LINK_URL);
             	} else if(data.notice.PB_BLBR_OUT_LINK_BRWS === 'out002') { //외부브라우저
             		NativeUtils.callOpenWindowWithURL(data.notice.PB_BLBR_OUT_LINK_URL);
             	}
             }
         }
         this.registerCallback("click", $$("#link"),  openLink);
        
        $.each(data.files, function(i, item){
        	let html = '';
        	html += '<li>';
    	    html += '    <a name="download" data-filenm="'+item.PB_ATFL_NM+'" data-fileorcpnm="'+item.PB_ORCP_ATFL_NM+'" class="link"';
    	    html += '    	<span>'+item.PB_ORCP_ATFL_NM+'</span>';
    	    html += '    </a>';
            html += '</li>';
        	
	        $$('#fileList').append(html);
        });
        
        const downloadFile = async(event,element) => {
        	
        	const fileNm = element.dataset.filenm;
        	const fileId = element.dataset.fileorcpnm;
            
            const result = await GlobalApp.popupUtils.openPdfViewer({fileName: fileNm, fileType: '01'});
            
        }
        $$( document ).findByName('download', 'click', downloadFile);
        
	}
    
    
    destroy () {
        super.destroy(this);
        super.isPinchZoom(false);
    }
}
