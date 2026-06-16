/*************************************************************************
* @ 서비스경로 : NMCRMNG25P
* @ 파일명      : NMCRMNG25P.js 고객명함 관리 - 지점 명함첩 - 전체 메모
* @ 화면ID 	 : PBWBU050002
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-12            윤은정                 최초작성
* 2024-12-19            윤은정                 모달에서 일반 페이지 이동으로 변경
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

let nmcrNo = '';
export default class NMCRMNG25P extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.nmcrMngNo, this.setMnmcrMngNo] 		 = this.useState('nmcrMngNo', data.nmcrMngNo);
        nmcrNo = data.nmcrMngNo;
		// 고객 정보
		[this.nmcrNm, this.setMnmcrNm]				 = this.useState('nmcrNm', data.nmcrNm); 										// 이름
		[this.nmcrComNm, this.setMnmcrComNm]	 = this.useState('nmcrComNm', data.nmcrComNm); 						// 회사 
		[this.nmcrDepNm, this.setMnmcrDepNm]	 = this.useState('nmcrDepNm', data.nmcrDepNm); 							// 부서  
		[this.nmcrDtsNm, this.setMnmcrDtsNm]		 = this.useState('nmcrDtsNm', data.nmcrDtsNm); 							// 직책 
	}
	
	init () {
		super.init(this);
		
		this.initRegist();
	}
	
	initRegist () {
		this.bind( 'nmcrNm', 			$$('#mNmcrNm'), 			'string');
		this.bind( 'nmcrComNm', 	$$('#mNmcrComNm'), 	'string');
		this.bind( 'nmcrDepNm', 	$$('#mNmcrDepNm'), 	'string');
		this.bind( 'nmcrDtsNm', 		$$('#mNmcrDtsNm'), 		'string');
		
		this.loadData();
	}
	
	/**
    *  전체 메모 조회
    * @param 
    */
	async loadData() {
    	const url = '/pb/api/nmcr/cus/nmcrCusMemo.json';
    	const params = {
    			nmcrMngNo: this.nmcrMngNo.value
    	};

    	const res = await ApiUtils.sendPost(url, params);
    	
    	if (res.resultCode === "000000") {
    		const items = res.data.memo;
    		
    		this.listManager = GlobalApp.getListManager(this.rootElem, {
				usePagination : false,
				listItemHtmlPath : '/components/nmcr/NMCRMNG25P_L.html',
				listItemJsPath : '/components/nmcr/NMCRMNG25P_L.js'
			});
			
			items.forEach((val, idx) => {
    			val.id = val.memoSrno;
    			val.hdnYn = (val.hdnYn === 'Y' ? true : false); 
    			val.mNmcrMemoTxt = val.nmcrMemoTxt;
    			const btnYn = (val.btnYn === 'Y' ? true : false);
    			val.btnMod = btnYn;
    			val.btnDel = btnYn;
    			val.mEmpNm = val.empNm;
    			val.mLstAmdDt = val.lstAmdDt;
    			val.mDeptNm = val.deptNm;
    			val.mTeamNm = val.teamNm;
    		});
			
			await this.listManager.render(items, this.eventReceiver);
			
			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
    		
		} else {
			toastr.error('', res.resultMessage);
		}
	}

	/**
    *  리스트이벤트 - 삭제 및, 수정화면 이동
    * @param 
    */
	async onItemAction ( event ) {
        const { id, action, status } = event.detail;
        
        if(`${action}` === 'delClick') {
        	const result = await CmmUtils.confirm('삭제하시겠습니까?', '',{
				okLabel : '예',
				noLabel : '아니요',
				icon : 'caution'
			});
			if(result.resultCd === '999999') {
				return false;
			}
			
        	const url = '/pb/api/nmcr/cus/nmcrDelMemo.json';
			const params = {
					memoSrno: `${id}`, // 일련번호
					nmcrMngNo:	nmcrNo //this.nmcrMngNo.valse
			};

			const res = await ApiUtils.sendPost(url, params);
			if (res.resultCode === "000000") {
				toastr.success('', '삭제 되었습니다.');
				// 메모 재조회 실행
				setTimeout(() => {
					this.loadData();
				}, 2000);
			} else {
				toastr.error('', res.resultMessage);
			}
        	
        } else if(`${action}` === 'modClick') {

    		const route = 'nmcrmng24p';	
    		const props = {
    				memoSrno: `${id}`, // 일련번호
    				nmcrMngNo: this.nmcrMngNo.value,
    				screenType: 'M'
    		};
    		
    		await GlobalApp.popupUtils.openPopup(route, {
                showCloseBtn : true,
                params : props,
                onCallback: (result) => this.nmcrMemoReturn(result), 
            });
        }
	}
	
	/**
	    *  메모등록 후처리
	    * @param 
	    */
	async nmcrMemoReturn() {
		this.loadData();
	}
	
    destroy() {
        super.destroy(this);
    }
}	