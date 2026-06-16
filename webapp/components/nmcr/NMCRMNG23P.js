/*************************************************************************
* @ 서비스경로 : NMCRMNG23P
* @ 파일명      : NMCRMNG23P.js 고객명함 관리 - 지점 명함첩 - 메모 등록
* @ 화면ID 	: PBWBU059900	
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-12            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export class NMCRMNG23P extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.callbackFunc = null;
        
        [this.mNmcrMngNo, this.setMnmcrMngNo] 		 = this.useState('mNmcrMngNo', '');
        [this.mNmcrMemoTxt, this.setMnmcrMemoTxt]  = this.useState('mNmcrMemoTxt', '');
	}

	init (param, callbackFunc ) {
		super.init(this);
		
		this.callbackFunc = callbackFunc;
		
		this.setMnmcrMngNo(param.nmcrMngNo);

		this.initRegist();
	}
	
	initRegist () {
		this.bind( 'mNmcrMemoTxt', 	$$('#mNmcrMemoTxt'), 'input');
		
		$$('#mNmcrMemoTxt').on('keyup', async () => await this.handleMemoClick());		 				 	// 메모 글자수 확인
		$$('#btnMemoSave').on('touchend', async () => await this.handleMemoSaveClick());		 		 	// 메모 등록
		
		$$('#btnMemoSave').addAttr( 'aria-disabled', true);																	// 저장 버튼 비활성화
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
    *  메모 등록 및 부모창 리턴 
    * @param 
    */
	async handleMemoSaveClick () {
		const hasCls	= $('#btnMemoSave').attr('aria-disabled');
		if(hasCls === 'true') {																									// 저장 가능 상태 확인
			return false;
		}
				
		const hdnYn  = $('#hdnYn').is(':checked') === true ? 'Y' : 'N';

		const url = '/pb/api/nmcr/cus/saveNmcrMemo.json';
		const params = {};
		params.nmcrMngNo 	 = this.mNmcrMngNo.value;
		params.hdnYn 	 		 = hdnYn;
		params.nmcrMemoTxt = this.mNmcrMemoTxt.value;
		
		const res = await ApiUtils.sendPost(url, params);
		
		const props = {};
		if(res.resultCode === '000000') {
			props.nmcrMngNo = this.mNmcrMngNo.value,
			toastr.success('', '저장 되었습니다.');
			this.callbackFunc({data: props, resultCd : '000000', resultMsg : 'SUCCESS'});
		} else {
			toastr.error('', res.resultMessage);
			return false;
		}
	}
	
    destroy() {
        super.destroy(this);
    }
}	