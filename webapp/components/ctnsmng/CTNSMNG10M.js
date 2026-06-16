/*************************************************************************
* @ 서비스경로 : CTNSMNG10M
* @ 파일명      : CTNSMNG10M 포탈 게시글 연동 > 목록
* @ 작성자      : 90194834
* @ 작성일      : 2025-04-29
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-29           홍장환                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class CTNSMNG10M extends BaseModule {
	
	constructor(elem, data) {
    	super(elem);
    	this.rootElem = elem;
    	this.listManager = null;
    	this.eventReceiver = new EventTarget();
    	
    	
    	[this.blbrType, this.setBlbrType] = this.useState('blbrType', '');
    	
    	[this.blbrNm  , this.setBlbrNm]  = this.useState('blbrNm', '');
    	
    	// 구분
    	[this.blbrCtgr  , this.setBlbrCtgr]  = this.useState('blbrCtgr', '');
    	// 검색어
    	[this.searchKeyWord  , this.setSearchKeyWord]  = this.useState('searchKeyWord', '');
    	
    	// 추가 데이터 존재여부
    	[this.nxtDatExstYn  , this.setNxtDatExstYn]  = this.useState('nxtDatExstYn', '');
    	// 시작일
    	[this.startDt  , this.setStartDt]  = this.useState('startDt', '');
    	// 종료일
    	[this.endDt  , this.setEndDt]  = this.useState('endDt', '');
    	// 페이지 번호
    	[this.currPageNo  , this.setCurrPageNo]  = this.useState('currPageNo', '1');
    	// 날짜 포매터
    	[this.formatter, this.setFormatter] = this.useState('formatter', 'YYYY-MM-DD');
	}
	

    init () {
    	super.init(this);
    	
    	this.bind('blbrType', $$('#blbrType'), 'string');
    	this.bind('blbrNm', $$('#blbrNm'), 'string');
    	this.bind('blbrCtgr', $$('#blbrCtgr'), 'string');
    	this.bind('startDt', $$('#startDt'), 'string');
    	this.bind('endDt', $$('#endDt'), 'string');
    	this.bind('currPageNo', $$('#currPageNo'), 'string');
    	
    	
    	//날짜 세팅
    	this.initDate();    	
    
    	
    	// api 조회
    }
    
    // 날짜 세팅
    async initDate () {
    	
    	const now = dayjs();
    	// 시작일 오늘 날짜 세팅
    	this.setStartDt(now.format(this.formatter.value));
    	// 종료일 한달전 날짜 세팅
    	const minusDt = now.subtract('1', 'month').format(this.formatter.value);
    	this.setEndDt(minusDt);
    	
    	this.setCurrPageNo('1');
    	
    	// 최초 게시글 조회
    	await this.bltnList();
    }
    
    register () {
    	
//    	//시작일자 선택시 종료일자 data-mindate Set
//		$("button.date").on("click", function() {
//	
//			var $dv = $(this).closest(".input");
//			setTimeout(function() {
//				// case1. 로딩된 달 이벤트 바인딩
//				_this.dateClickEvent($dv);
//
//				$(".ui-datepicker-year, .ui-datepicker-month").change(function(){
//					_this.dateClickEvent($dv);
//				});
//				// case2. 이전 달, 이후 달 이벤트 바인딩
//				$(".ui-datepicker-next, .ui-datepicker-prev").click(function(){
//					_this.dateClickEvent($dv);
//				});
//			}, 500);
//		});
//
//		//조건 셀렉트 선택 이벤트
//		$('.option').on('click', function(e) {
//			$("#blbrCtgr").val($(this).val());
//		});
    	
    	const onClickStartDt = () => {
    		
    	};
		
		const onClickEndDt = () => {
			
		};
		
		//조건 검색 클릭 이벤트
		const onClickBtnSearch = async () =>{
			
			this.setCurrPageNo(1);
			
			//목록 호출
			await this.bltnList(false);
			
			$$("body").removeClass("on");
			$$("#searchLayer").removeClass("active").attr("aria-hidden", true);
		};
		
		//조건 셀렉트 선택 이벤트
		const onClickOptions = (event) => {
			console.log('val : ', event.target.value );
			
			if ( event.target.value ) {
				this.setBlbrCtgr(evetn.target.value);
			}
		}
		
		//등록 버튼 클릭 이벤트
		const onClickRegistBtn = () => {
			const route = '/blbr/' + this.blbrType.value + '/edit';
			const props = {
					blbrNm : this.blbrNm.value
			}
			
			router.navigate(route, props);
		};
		
		$$(document).findByName('btnCtgry', 'click', onClickOptions);								// 휴대폰, 회사전화, 문자, 이메일 보내기
    	this.registerCallback('click', $$('#btnStartDt'), onClickStartDt);
    	this.registerCallback('click', $$('#btnEndDt'), onClickEndDt);
    	this.registerCallback('click', $$('#btnSearch'), onClickBtnSearch);
    	this.registerCallback('click', $$('#registBtn'), onClickRegistBtn);
    	
    	
    }
    
    // 게시글 검색
    async bltnList () {
    	
    	const param = {
    			blbrCtgr : this.blbrCtgr.value,
    			searchKeyWord :  this.searchKeyWord.value,
    			currPageNo :  this.currPageNo.value,
    			cabinetId : EnvUtils.isPrd() ? Const.CABINET_ID.PRD : Const.CABINET_ID.DEV 
    	}
    	
    	const url = '/api/ctnsmng/getBoardList.json';
    	const res = await ApiUtils.sendPost(url, param);
    	
    	console.log('res : ', res );
    	
    }
    
    destroy () {
    	super.destroy(this);
    }
    
}