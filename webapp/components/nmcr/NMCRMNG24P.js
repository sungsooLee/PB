/*************************************************************************
* @ 서비스경로 : NMCRMNG24P
* @ 파일명      : NMCRMNG24P.js 고객명함 관리 - 지점 명함첩 - 메모 수정
* @ 화면ID 	 : PBWBU059901
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-12            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class NMCRMNG24P extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.callbackFunc = null;
        
        [this.mNmcrMngNo, this.setMnmcrMngNo] 		 	= this.useState('mNmcrMngNo', '');
        [this.mMemoSrno, this.setMmemoSrno] 		 	 	= this.useState('mMemoSrno', '');
        [this.mNmcrMemoTxt, this.setMnmcrMemoTxt]  	= this.useState('mNmcrMemoTxt', '');
	}

	init (param, callbackFunc ) {
		super.init(this);
		
		this.callbackFunc = callbackFunc;
		
		this.setMnmcrMngNo(param.nmcrMngNo);
		this.setMmemoSrno(param.memoSrno);
		
		this.initRegist();
	}
	
	initRegist () {
		this.bind( 'mNmcrMemoTxt', 	$$('#mNmcrMemoTxt'), 'input');
		
		$$('#mNmcrMemoTxt').on('keyup', async () => await this.handleMemoClick());		 						// 메모 글자수 확인
		$$('#btnMemoSave').on('click', async () => await this.handleMemoSaveClick());		 					// 메모 수정
		
		this.loadData();
	}
	
	/**
    *  메모 수정을 위한 메모 조회
    * @param 
    */
	async loadData() {
    	const url = '/pb/api/nmcr/cus/nmcrMemoInfo.json';
    	const params = {
    			nmcrMngNo: this.mNmcrMngNo.value,
    			memoSrno: this.mMemoSrno.value
    	};
    	
    	const res = await ApiUtils.sendPost(url, params);
    	
    	if(res.resultCode === '000000') {
    		const data = res.data;
    		// 나만보기
    		if(data.memoHdnYn === 'Y') {
    			$('#hdnYn').attr('checked', true);
    		}
    		this.setMnmcrMemoTxt(data.nmcrMemoTxt);
    		this.handleMemoClick();
    	}
	}
	
	/**
    *  메모 내용 글자수확인 및 제한
    * @param 
    */
	async handleMemoClick() {
		let memoTxt = this.mNmcrMemoTxt.value;
		
		if(memoTxt === null || memoTxt.length <= 0) {
			$("#memoTxtLen").html("0 / 300자");
			$$('#btnMemoSave').addAttr( 'aria-disabled', true);	
		} else if(memoTxt.length > 300) {
			const result = CmmUtils.alert('', '메모는 300자 넘게 입력하실 수 없습니다.', {
	            btnLabel : '확인',
	            icon : 'caution'
	        });
			this.setMnmcrMemoTxt(memoTxt.substring(0, 300));
			return false;
		} else {
			$("#memoTxtLen").html(memoTxt.length + " / 300자");
			$$('#btnMemoSave').addAttr( 'aria-disabled', false);
		}
	}

	/**
    *  수정 이벤트 및 부모창 리턴 
    * @param 
    */
	async handleMemoSaveClick () {
		const hasCls	= $('#btnMemoSave').attr('aria-disabled');
		if(hasCls === 'true') {																									// 저장 가능 상태 확인
			return false;
		}
		
		const hdnYn  = $('#hdnYn').is(':checked') === true ? 'Y' : 'N';

		const url = '/pb/api/nmcr/cus/nmcrModMemo.json';
		const params = {};
		params.nmcrMngNo 	 = this.mNmcrMngNo.value;
		params.memoSrno 	 = this.mMemoSrno.value;
		params.hdnYn 	 		 = hdnYn;
		params.nmcrMemoTxt = this.mNmcrMemoTxt.value;
		
    	const res = await ApiUtils.sendPost(url, params);
    	
		if(res.resultCode === '000000') {
			toastr.success('저장 되었습니다.');
			this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
		} else {
			toastr.error(``, res.resultMessage);
			return false;
		}
	}
	
    destroy() {
        super.destroy(this);
    }
}	