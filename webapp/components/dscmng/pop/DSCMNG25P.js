/*************************************************************************
* @ 서비스경로 : DSCMNG25P
* @ 파일명      : DSCMNG25P 일정관리 > 영업 캘린더 > 일정 등록 > 공유 팝업
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '/components/cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class DSCMNG25P extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
    	[this.searchPrlmNm, this.setSearchPrlmNm] = this.useState('searchPrlmNm', '');
    	[this.searchDeptNm, this.setSearchDeptNm] = this.useState('searchDeptNm', '');
    	[this.searchChrgBizNm, this.setSearchChrgBizNm] = this.useState('searchChrgBizNm', '');
    	
    	[this.searchPrlm, this.setSearchPrlm] = this.useState('searchPrlm', []);
    	
    	// 페이징 번호
    	[this.currentPage, this.setCurrentPage] = this.useState('pageNo', 1);
    	// 다음페이징여부
    	[this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'Y');
    	
    	this.checkPrlmList = {};
    	
    	this.observer = null;
    }

    init (param) {
    	super.init(this);
    	this.register();
    	
    	this.bind('searchPrlmNm', $$('#searchPrlmNm'), 'input');
    	this.bind('searchDeptNm', $$('#searchDeptNm'), 'input');
    	this.bind('searchChrgBizNm', $$('#searchChrgBizNm'), 'input');

		const g = this;

    	// 검색 버튼
    	$$('#searchBtn').on('click', async () => {
			g.setCurrentPage(1);
			await this.searchPrlmList()
		});
    
    	 const searchPrlmKeyup = async (event) => {
    		$$('#nameForm').removeClass('form-invalid');
     		$$('#nameValidTxt').text('');
     		
             if (event.key !== 'Shift') {
                 let searchType = false;
                 if (event.key === 'Enter') {
                     console.log('enter!!');
					 g.setCurrentPage(1);
                     this.searchPrlmList();
                 }
             }
         }
    	 
    	 const searchDeptKeyup = async (event) => {
    		$$('#deptForm').removeClass('form-invalid');
      		$$('#deptVaildTxt').text('');
      		
             if (event.key !== 'Shift') {
                 let searchType = false;
                 if (event.key === 'Enter') {
                     console.log('enter!!');
					 g.setCurrentPage(1);
                     this.searchPrlmList();
                 }
             }
         }
    	 
    	 const searchChrgBizKeyup = async (event) => {
    		$$('#chrgBizForm').removeClass('form-invalid');
       		$$('#chrgBizValidTxt').text('');

             if (event.key !== 'Shift') {
                 let searchType = false;
                 if (event.key === 'Enter') {
                     console.log('enter!!');
					 g.setCurrentPage(1);
                     this.searchPrlmList();
                 }
             }
         }

         this.registerCallback('keyup', $$('#searchPrlmNm'), searchPrlmKeyup);
         this.registerCallback('keyup', $$('#searchDeptNm'), searchDeptKeyup);
         this.registerCallback('keyup', $$('#searchChrgBizNm'), searchChrgBizKeyup);
    }
    
    async load() {
    }
    
    async register() {
    }
 
    /**
     * 직원 검색
     */
    async searchPrlmList () {
    	this.checkPrlmList = {}; // 초기화
    	
    	if(this.searchPrlmNm.value === ""
    		&& this.searchDeptNm.value === ""
    		&& this.searchChrgBizNm.value === "") {
    		this.openAlert('', '하나 이상의 조건을 입력해 주세요.');
    		return;
    	}
    	
    	console.log('this.searchPrlmNm.value == ', this.searchPrlmNm.value);
    	if(this.searchPrlmNm.value.length < 2 && this.searchPrlmNm.value !== '') {
    		$$('#nameForm').addClass('form-invalid');
    		$$('#nameValidTxt').text('2자 이상 입력해주세요.');
    		return;
    	}
    	
    	if(this.searchDeptNm.value.length < 2 && this.searchDeptNm.value !== '') {
    		$$('#deptForm').addClass('form-invalid');
    		$$('#deptValidTxt').text('2자 이상 입력해주세요.');
    		return;
    	}
    	
    	if(this.searchChrgBizNm.value.length < 2 && this.searchChrgBizNm.value !== '') {
    		$$('#chrgBizForm').addClass('form-invalid');
    		$$('#chrgBizValidTxt').text('2자 이상 입력해주세요.');
    		return;
    	}
    	
    	const param = {
    			searchPrlmNm : this.searchPrlmNm.value
    			, searchDeptNm : this.searchDeptNm.value
    			, searchChrgBizNm : this.searchChrgBizNm.value
    	}
    	
    	const result = await ApiUtils.sendPost('/api/dscmng/attendList.json', param);
    	
    	if(result.resultCode === '000000') {
    		const items = result.data;
    		
    		this.setSearchPrlm(result.data);
    		
    		if(items.length > 0) {
//    			// 직원 사진 조회
//    			const subParam = {
//    					userIdList: ['18311169']
//    			};
//    			
//    			const subResult = await ApiUtils.sendPost('/api/dscmng/getPic.json', subParam);
    			const sliceData = items.slice(0, 10);

    			this.listManager = GlobalApp.getListManager(this.rootElem, {
    				container: '#prlmData',
    				usePagination : false,
    				listItemHtmlPath : '/components/dscmng/list/DSCMNG25P_LIST.html',
    				listItemJsPath : '/components/dscmng/list/DSCMNG25P_LIST.js'
    			});
    			
    			$.each(sliceData, function(idx, val) {
    				val.id = val.EMAIL;
    			});
    			
    			await this.listManager.render(sliceData, this.eventReceiver);
    			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this)); 	// list event

    			$$('#noPrlmData').hide();
    			$$('#prlmData').show();
    			
    			this.initObserver();
    		}else {
    			$$('#prlmData').hide();
    			$$('#noPrlmData').show();
    		}
    	}
    }
    
    /**
     * 일정 페이징처리
     */
    async paginate() {
 	   	const startIndex = (this.currentPage.value - 1) * 10;
 	   	const endIndex = startIndex + 10;
    	
 	   	const fragment = document.createDocumentFragment();
 	  
 	   	// 데이터 자르기
    	const sliceData = this.searchPrlm.value.slice(startIndex, endIndex);

    	$.each(sliceData, function(idx, val) {
 			val.id = val.itemId;
 		});
    		
    	const listItemHTML = await this.loadHTML('/components/dscmng/list/DSCMNG25P_LIST.html');
    	
    	for(let i = 0; i < sliceData.length; i++) {
    		await this.listManager.addItem(sliceData[i], fragment, listItemHTML, this.eventReceiver);
    	}
    		
    	this.listManager.listContainer.elements[0].appendChild(fragment);

		console.log('this.searchPrlm.value.length : ' , this.searchPrlm.value.length);
		console.log('currentPage : ' , this.currentPage.value * 10);

    	// 페이징 이후, 다음 페이지 여부 확인
     	if(this.searchPrlm.value.length > (this.currentPage.value * 10)) {
     		// 남은 데이터가 존재할 경우 스크롤 이벤트 Y처리
     		this.setNxtDatExstYn('Y');
     	}
    }
    
    /**
     * 스크롤 이벤트
     */
    initObserver() {
    	const _this = this;
    	
    	if(this.observer) {
    		this.observer.disconnect();
    	}
    	
    	this.observer = new IntersectionObserver(async (entries) => {
    		const target = entries[0];
			console.log('isIntersecting!!!', target.isIntersecting );

    		if(target.isIntersecting) {
    			if(_this.nxtDatExstYn.value === "Y") {
					let nextPage = _this.currentPage.value + 1;
					
					console.log('nextPage=== ', nextPage);
					
					_this.setNxtDatExstYn("N");	
					_this.setCurrentPage(nextPage);
					_this.paginate();
				}
    		}
    	}, {
    		root: null,
    		threshold: 1.0
    	});
    	
    	this.observer.observe(document.getElementById('observerTarget'));
    }
    
	/**
     *  리스트이벤트 
     * @param 
     */
     onItemAction ( event ) {
    	 const { prlmNm, deptNm, posiNm, email, checked, action, status } = event.detail;
    	 
    	 if(checked) {
    		 this.checkPrlmList = {
    				 ...this.checkPrlmList
    				 , [email] : {
    					 prlmNm: prlmNm
    					 , deptNm: deptNm
    					 , posiNm: posiNm
    					 , email: email
    				 }
    		 }
    	 }else {
    		 delete this.checkPrlmList[email];
    	 }
     }
     
    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
     	
    	const result = { 
    		data : this.checkPrlmList
    		, resultCd : '000000'
    		, resultMsg : 'SUCCESS'
    	};
    	
        return result;
    }

    /**
     * 공통 팝업 호출
     */
    async openAlert (title, message) {
		await CmmUtils.alert(title, message,{
			btnLabel : '확인',
			useCancelBtn : false,
			status: 'caution'
		});
	};
    
    async loadHTML ( url ) {
		const res = await fetch( url );
		if ( res.ok ) {
			return res.text();
		}
	}
    
    destroy () {
    	if(this.observer) {
    		this.observer.disconnect();
    	}
    	
        super.destroy(this);
    }
}
