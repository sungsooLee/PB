/*************************************************************************
* @ 서비스경로 : MNG01M
* @ 파일명      : MNG01M.js 관리 > 고객명함 메모 관리 > 목록
* @ 화면ID		: PBWAD000000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class MNG01M extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
        
        [this.stdDt, this.setStdDt] 				= this.useState('stdDt', '');								// 조회조건 - 수정기간 시작일
        [this.endDt, this.setEndDt] 			= this.useState('endDt', '');							// 조회조건 - 수정기간 종료일
        [this.formatter, this.setFormatter]  = this.useState('formatter', 'YYYY-MM-DD');
        [this.item, this.setItem] 				= this.useState('item', '1');								// 조회조건 - 선택옵션
        [this.itemNm, this.setItemNm] 		= this.useState('itemNm', '등록자');					// 조회조건 - 선택옵션명
        [this.keyword, this.setKeyword] 	= this.useState('keyword', '');							// 조회조건 - 검색어
        
        [this.memoLst, this.setMemoLst] 	= this.useState('memoLst', '');
        
        [this.dataList, this.setDataList] = this.useState('dataList', [{
            label : '등록자',
            value : '1',
            isSelected : true
        },{
            label : '부점',
            value : '2',
            isSelected : false
        },{
            label : '팀',
            value : '3',
            isSelected : false
        },{
            label : '고객명',
            value : '4',
            isSelected : false
        },{
            label : '회사',
            value : '5',
            isSelected : false
        },{
            label : '메모',
            value : '6',
            isSelected : false
        }]);
    }

	init () {
        super.init(this);
        this.regist();
        
        this.loadData();
    }
	
	async regist() {
		this.bind( 'stdDt', $$('#stdDt') , 'button');
		this.bind( 'endDt', $$('#endDt') , 'button');
		this.bind( 'itemNm', $$('#btnItems') , 'button');
		this.bind( 'keyword', $$('#keyword') , 'input');
		
		const now = dayjs();
        this.setStdDt(now.add(-6, 'day').format(this.formatter.value));										// 조회시작일 - 오늘기준 일주일전(-6)
        this.setEndDt(now.format(this.formatter.value));															// 조회종료일 - 오늘
		
        this.registerCallback('click', $$('#stdDt'), this.clickDate);
        this.registerCallback('click', $$('#endDt'), this.clickDate);
        this.registerCallback('click', $$('#btnItems'), this.selBoxClick);
        
        $$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));				// 키워드 검색 삭제 버튼 
        $$('#keyword').on('keydown', async (e) => await this.keywordSearch(e));					// 키워드 검색
        $$('#btnSearch').on('click', async () => await this.loadData());										// 검색
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
		this.keywordSearch(e);
	}
	
	/**
    *  캘린더 열기
    * @param 
    */
	async clickDate(event) {
		$$('#dateChk').removeClass('form-invalid');
		$$('#dateMsg').text('');
		
		let comNm = event.target.id;

        const prevVal =  $$('#' + comNm).text();
        
        let inputVal = ''
        if ( !prevVal || prevVal === '' ) {
            const now = dayjs();
            inputVal = now.format('YYYY-MM-DD')
        } else {
            inputVal = prevVal;
        }

        await globalApp.popupUtils.openDatePickerPopup(inputVal, Const.PickerType.DATE,{
            inputElem : $$('#' + comNm),
            modalTitle : '날짜 선택',
            //isDisabledFuture : true,
            //isDisabledPast : true,
            onSelect: (result) => console.log('onSelect : ', result),
            onClose : (result) => console.log('onClose Result : ' , result)
        });
	}
	
	/**
	 * 조회조건 적용
	 * @param
	 */
	selBoxClick (event) {
        const g = this;
        GlobalApp.popupUtils.openSelectModal(this.dataList.value , {
            showCloseBtn : true,
            btnElem : event.currentTarget,
            modalTitle : '조회조건 선택',
//            defaultSelectIndex : 0,
            onClose : (result) => {
                console.log('close Result : ' , result);
            },
            onCallback : (result) => {

                const tmpList = [];
                g.dataList.value.forEach((item) => {
                    if ( item.value === result.data ) {
                        item.isSelected = true;
                        this.setItem(result.data);
                        this.setItemNm(item.label);
                    } else {
                        item.isSelected = false;
                    }
                    tmpList.push(item);
                });

                g.setDataList(tmpList);
            }
        });
    }
	
	/**
    *  키워드 입력 조회 - enter key
    * @param 
    */
	async keywordSearch(e) {
		
		$$('#keywordChk').removeClass('form-invalid');
		$$('#keywordMsg').text('');
		
		if(e.keyCode === 13) {
			this.loadData ();
		}
	}
	
	/**
	 * 데이터 조회
	 * @param
	 */
	async loadData() {
		const url = '/api/mng/memoMng.json';
		const params 	 = {};
    	params.stdDt  	 = dayjs($$('#stdDt').text()).format('YYYYMMDD');
    	params.endDt 	 = dayjs($$('#endDt').text()).format('YYYYMMDD');
    	params.item   	 = this.item.value;
    	params.itemNm 	 = this.itemNm.value;
    	params.keyword = this.keyword.value;
    	
    	if(params.stdDt > params.endDt) {
    		$$('#dateChk').addClass('form-invalid');
    		$$('#dateMsg').text('수정기간을 확인해주세요.');
    		return false;
    	}
    	if(this.keyword.value.length === 1) {
    		$$('#keywordChk').addClass('form-invalid');
    		$$('#keywordMsg').text('검색어를 2자 이상 입력해주세요.');
    		return false;
    	} else {
    		$$('#keywordChk').removeClass('form-invalid');
    		$$('#keywordMsg').text('');
    	}
    	
		const res = await ApiUtils.sendPost(url, params);
    	
    	if(res.resultCode === '000000') {
    		this.setMemoLst(res.data.data);
    		const data = this.memoLst.value;
    		
			if(data !== null && data.length > 0) {
				$('#yesData').show();
    			$('#noData').hide();
    			
    			this.listManager = GlobalApp.getListManager(this.rootElem, {
    				usePagination : false,
    				listItemHtmlPath : '/components/mng/MNG01M_L.html',
    				listItemJsPath : '/components/mng/MNG01M_L.js'
    			});
    			
    			data.forEach((item, idx) => {
    				item.id = item.memoSrno;
    				item.memoHdnYn = (item.memoHdnYn === 'Y') ? true : false;
    				// 해당 항목에 값이 없을 경우 | hidden처리
    				if(item.deptNm === null) {
    					item.deptNmBar = false;
    				}
    				if(item.teamNm === null) {
    					item.teamNmBar = false;
    				}
    				if(item.nmcrDeptNm === null) {
    					item.nmcrDeptNmBar = false;
    				}
    				if(item.nmcrDtsNm === null) {
    					item.nmcrDtsNmBar = false;
    				}
    			});
    			await this.listManager.render(data, this.eventReceiver);
    			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
    		} else {
    			$('#yesData').hide();
    			$('#noData').show();
    		}
    	}
	}

	/**
    *  메모삭제
    * @param 
    */
	async onItemAction ( event ) {
        const { id, action, status } = event.detail;
        
        const resConfirm = await CmmUtils.confirm('삭제하시겠습니까?', '',{
            okLabel : '확인',
            noLabel : '취소',
            icon : 'caution'
        });
		if(resConfirm.resultCd === '999999') {
			return false;
		}
		
		const url = '/api/mng/memoDel.json';
		const params = {};
    	params.memoSrno   = `${id}`;
		
		const res = await ApiUtils.sendPost(url, params);
		if(res.resultCode === '000000') {
			toastr.caution('', '삭제 되었습니다.');
    		setTimeout(() => {
				this.loadData();
			}, 2000);
		} else {
			toastr.error('', '삭제에 실패하였습니다.');
		}
    }

    destroy() {
        super.destroy(this);
    }
}