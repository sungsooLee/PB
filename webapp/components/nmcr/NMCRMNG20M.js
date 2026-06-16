/*************************************************************************
* @ 서비스경로 : NMCRMNG20M
* @ 파일명      : NMCRMNG20M.js 고객명함 관리 - 지점 명함첩 - 목록
* @ 화면ID 	 : PBWBU030000
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-04            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class NMCRMNG20M extends BaseModule {
	constructor(elem, param ) {
        super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        // 변수선언
        [this.totalCnt, this.setTotalCnt] 			 		 = this.useState('totalCnt', '0');							// 지점 명함 개수
        [this.lstCnt, this.setLstCnt] 		  	 			 = this.useState('lstCnt', '0');								// 고객 명함 등록 개수 체크
        [this.inTotalCnt, this.setInTotalCnt] 			 = this.useState('inTotalCnt', '0');
        
        [this.keyword, this.setKeyword]  	 			 = this.useState('keyword', '');							// 검색키워드
        [this.groupFilter, this.setGroupFilter]  			 = this.useState('groupFilter', '1');						// 필터
        [this.groupFilterNm, this.setGroupFilterNm]  = this.useState('groupFilterNm', '전체');				// 필터명
        [this.sort, this.setSort]  	 						 = this.useState('sort', '1');									// 정렬
        [this.sortNm, this.setSortNm]  	 				 = this.useState('sortNm', '최신순');						// 정렬명
        [this.teamCd, this.setTeamCd]  	 				 = this.useState('teamCd', '');								// 팀코드 - 정렬일 경우
    }

	init () {
        super.init(this);
        this.initRegist();
		
    }
	
	async initRegist () {
		this.bind( 'inTotalCnt', $$('#totalCnt') , 'string');
		this.bind( 'keyword', $$('#keyword') , 'input');
		this.bind( 'sortNm', $$('#sortNm') , 'string');
		this.bind( 'groupFilterNm', $$('#selGroupNm') , 'string');
		
		$$('#nmcrSave').on('click', async () => await this.handleSaveBtnClick());					// 고객 명합 등록 - 화면이동
		$$('#searchOpen').on('click', async () => await this.handleOpenClick());					// 고객 명합 조회 - 조회조건 창 열기 - 필터, 정렬
		$$('#btnSearch').on('click', async () => await this.loadList());									// 고객 명합 조회
		$$('#keyword').on('keydown', async (e) => await this.keywordSearch(e));				// 키워드 검색 - 이름, 회사명 
		$$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));			// X버튼 클릭시, 데이터 지움.
		
		this.registerCallback('click', $$('#layoutBtn2'), this.handleSaveBtnClick);					// 고객 명합 등록 - 화면이동
		
		await this.loadList('init');
	}
	
	/**
    *  input X버튼 클릭시, 데이터 지움.
    * @param 
    */
	async handleInputDelClick(e) {
		// bind된 key값 가져오기
		const inputKey = $(e.target).closest('div').children('input').attr('data-bind');
		// 데이터 초기화
		this.resetField(inputKey);
	}
	
	/**
    *  키워드 입력 조회 - enter key
    * @param 
    */
	async keywordSearch(e) {
		
		$$('#keywordChk').removeClass('form-invalid');
		$$('#keywordMsg').text('');
		
		if(e.keyCode === 13) {
			this.loadList ();
		}
	}
	
	/**
    *  조회조건 창 열기 - 필터, 정렬
    * @param 
    */
	async handleOpenClick() {	
		const route = 'nmcrmng27p';
		const props = {};
		props.groupFilter = this.groupFilter.value;
		props.teamCd = this.teamCd.value;
		props.sort = this.sort.value;

		await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
            btn2Label : '조회',
            btn2IsMain : true,
            params : props,
			type: 'slideLeft',
            onYes: (result) => this.searchCallback(result), // console.log('on Yes Result : ' , result),
            onClose : (result) => console.log('onClose Result : ' , result),
        });
	}
	
	/**
    *  조회조건 창 콜백 - 필터, 정렬
    * @param 
    */
	searchCallback(result) {
		if(result.resultCd === '000000') {
			const data = result.data;
			this.setGroupFilter(data.groupFilter);
			this.setGroupFilterNm(data.groupFilterNm)
			this.setSort(data.sort);
			this.setSortNm(data.sortNm);
			this.setTeamCd(data.teamCd);
			
			this.loadList ('init');
		}
	}
	
	/**
    *  고객명함 조회
    * @param 
    */
	async loadList (type) {
    	const url = '/pb/api/nmcr/cus/nmcrLst.json';
    	const params = {};
    	params.keyword = this.keyword.value;
    	params.groupFilter = this.groupFilter.value;								// 조회 필터 - 1. 전체, 2. 키맨, 3. 내가 등록한 명함, 4. 나만보기, 5이상. 팀코드
    	params.sort = this.sort.value;												// 정렬 - 1. 최신순, 2. 이름순, 3. 회사명순, 4. 만료일
    	params.teamCd = this.teamCd.value;										// 조회 필터 - 팀 선택했을 경우
    	
    	if(this.keyword.value.length === 1) {
    		$$('#keywordChk').addClass('form-invalid');
    		$$('#keywordMsg').text('검색어를 2자 이상 입력해주세요.');
    		return false;
    	} else {
    		$$('#keywordChk').removeClass('form-invalid');
    		$$('#keywordMsg').text('');
    	}
    	
    	const res = await ApiUtils.sendPost(url, params);

    	this.setLstCnt(res.data.data.length);
    	this.setInTotalCnt(res.data.data.length);
    	
    	if(type === 'init') {
    		this.setTotalCnt(res.data.data.length);
    	}
    	
    	const items   = res.data.data; 												// 고객명함목록
    	
    	if(items !== null && this.lstCnt.value > 0) {							// 고객 명함 설정 정보가 있을 경우
    		$('#nmcrData').show();
			$('#nmcrNoData').hide();
			$('#nmcrNoSearch').hide();
			
			this.listManager = GlobalApp.getListManager(this.rootElem, {
				usePagination : false,
				listItemHtmlPath : '/components/nmcr/NMCRMNG20M_L.html',
				listItemJsPath : '/components/nmcr/NMCRMNG20M_L.js'
			});
			
			$.each(items, function(idx, val) {
				const time = dayjs().format('YYYYMMDDHHmmss');
				const filePathNm = '/api/file/getFileView?fileName=' + val.atflNm + '&fileType=NMCR&time=' + time;
				
				val.id = val.nmcrMngNo;
				val.filePath = filePathNm;
				val.favtUsgYn = ( val.favtUsgYn === 'Y' )? true : false;
				val.nmcrShrgYn = ( val.nmcrShrgYn === 'Y' )? true : false;
				if(!val.nmcrDepNm || !val.nmcrDtsNm) {
					val.dataDiv = false;
				} else {
					val.dataDiv = true;
				}
				// 만료일 확인
				if(val.dDay > 30) {
					val.expyDtYn 		= false;	// 만료일  text
					val.dDay 			= false;	// D-DAY text
					val.expyMod		= false;	// 연장하기 
					val.cls 				= '';
				} else if(val.dDay === 0) {
					val.nmcrExpyDt = false;
					val.expyDtYn 		= true;
					val.dDay 			= '삭제예정';
					val.expyMod		= true;
					val.cls 				= 'tags-lightRed';
				} else {
					val.nmcrExpyDt = false;	// 만료일자
					val.expyDtYn 		= true;
					val.dDay 			= 'D-' + val.dDay;
					val.expyMod		= true;
					val.cls 				= 'tags-lightBlue';
				}
			})

			await this.listManager.render(items, this.eventReceiver);
			
			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this)); 	// list event
    	} else {
    		if(this.totalCnt.value > 0) {
    			$('#nmcrNoSearch').show();
    			$('#nmcrNoData').hide();
    			$$('#listContainer').html('');
    		} else {
    			$('#nmcrData').hide();
    			$('#nmcrNoData').show().css({
                    'display':'flex',
                    'height':'100%'
                });
    		}
    	}
    }

	/**
    *  리스트이벤트 - 만료일 연장, 상세화면 이동
    * @param 
    */
	async onItemAction ( event ) {
        const { id, action, status } = event.detail;
        
        // 연장하기
        if(`${action}` === 'click') {
        	const result = await CmmUtils.confirm('연장하시겠습니까?', '',{
				okLabel : '예',
				noLabel : '아니요',
				icon : 'caution'
			});
			if(result.resultCd === '999999') {
				return false;
			}
        	
        	const url = '/pb/api/nmcr/cus/expyUpdate.json';
			const params = {
					nmcrMngNo: `${id}` // 관리번호 
			};
			
			const res = await ApiUtils.sendPost(url, params);
			if (res.resultCode === "000000") {
				toastr.success('', '연장 되었습니다.');
				// 재조회 실행
				setTimeout(() => {
					window.location.reload()
				}, 2000);
			} else {
				toastr.error('', res.resultMessage);
			}
        	
		// 상세화면이동
        } else if(`${action}` === 'detailClick') {
        	
        	const route = 'nmcrmng21m';	
        	const props = {
        			nmcrMngNo: `${id}` 
        	};
        	router.navigate(route, props);
        }
    }
	
	// 고객 명합 등록 - 화면이동
	async handleSaveBtnClick() {
		const route = 'nmcrmng30m';	
		window.location.hash = route;
	}
    
    destroy() {
        super.destroy(this);
    }
}