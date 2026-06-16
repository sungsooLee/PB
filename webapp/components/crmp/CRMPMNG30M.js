
/*************************************************************************
* @ 서비스경로 : CRMPMNG30M
* @ 파일명      : CRMPMNG30M 고객관리 > 고객기여도 조회
* @ 화면ID	  : PBWCL000000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import ListManager from "../../../resources/js/common/ListManager.js";
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class CRMPMNG30M extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.rootElem = this.elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
		
		[this.cust, this.setCust] = this.useState('cust', {});
		[this.prcDis, this.setPrcDis] = this.useState('prcDis', '2');
		[this.todyval, this.setTodyval] = this.useState('todyval', '');
		
		[this.start_day, this.setStart_day] = this.useState('start_day', '');
		[this.end_day, this.setEnd_day] = this.useState('end_day', '');
		[this.endDayNumOnly, this.setEndDayNumOnly] = this.useState('endDayNumOnly', '');
		[this.itcsno_val, this.setItcsno_val] = this.useState('itcsno_val', '');
		[this.day, this.setDay] = this.useState('day', '');
		
	}
	
	init () {
		console.log('고객관리 > 고객기여도');

		super.init(this);
		
		this.register();
		
		this.initRadio();

		this.initData();
		
		
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
		
		this.bind( 'start_day', $$('#start_day'), 'input');
		this.bind( 'end_day', $$('#end_day'), 'input');
		this.bind( 'itcsno_val', $$('#itcsno_val'), 'input');
		
		const searchCallback = () => {
			if(this.validation()) {
				this.doSearch();
			}
		}
		
		const searchTxtEnter = async (e) => {
			if(e.keyCode === 13) {
				if(this.validation()) {
					this.doSearch();
				}
	 		}
		}
		
		const removeBtnCallback = () => {
			this.setItcsno_val('');
		}
		
		const resetBtnCallback = () => {
			this.initData();
			this.setItcsno_val('');
		}
		
		const resetBtn = $$("#layoutBtn1"); //초기화
		const searchBtn = $$("#layoutBtn2"); //검색
		const custSearchBtn = $$("#cust_search_btn");
		const itcsno_val = $$("#itcsno_val");
		const inputRemoveBtn = $$(".input-remove");
		const start_btn = $$("#start_btn");
		const end_btn = $$("#end_btn");
		
		//이벤트 등록
		this.registerCallback("touchend", searchBtn, searchCallback);
		this.registerCallback("touchend", resetBtn, resetBtnCallback);  		//초기화버튼
		this.registerCallback("click", custSearchBtn, this.custSearchCallback);
		this.registerCallback("click", itcsno_val, this.custSearchCallback);
		this.registerCallback("click", inputRemoveBtn, removeBtnCallback);
		this.registerCallback("click", start_btn, this.clickMonthDate);
		this.registerCallback("click", end_btn, this.clickMonthDate);
		this.registerCallback("keydown", itcsno_val, searchTxtEnter);
		
	}
	
	 async clickMonthDate (event) {
        console.log('event : ', event.target.id );
        const _this = this;
        const target = event.target.id;
        const inputElem = ( target === 'start_btn') ? $$('#start_btn') : $$('#end_btn');

        await globalApp.popupUtils.openDatePickerPopup(inputElem.text(), Const.PickerType.MONTH,{
            inputElem : inputElem,
            onSelect : function(input, date) {

            	var selectedDate =  input.replaceAll("-","");
            	
            	var endYear = _this.endDayNumOnly.value.split('-')[0];
            	var endMonth = _this.endDayNumOnly.value.split('-')[1];
            	
            	if(( target === 'end_btn')) {
            		if(selectedDate < $$('#start_btn').text().replaceAll("-","")){
    					_this.cmmUtilAlert("선택할수 없는 날짜입니다.");
    					return;
    				}
            	} else {
            		if($$('#end_btn').text().replaceAll("-","") < selectedDate) {
            			_this.cmmUtilAlert("선택할수 없는 날짜입니다.");
    					return;
            		}
            	}
            	
            	if(( target === 'end_btn')) {
					if(selectedDate > _this.endDayNumOnly.value.replaceAll("-","")){
						if(_this.day.value>25){
							_this.cmmUtilAlert("대상기간은 전월까지만 가능합니다.");
						}else{
							_this.cmmUtilAlert("대상기간은 전전월까지만 가능합니다.");
						}
						return;
					}
            	}
            	
            	inputElem.text(input);

                MicroModal.close('cmmModal');
            },
            onCallback: (result) => {
            	_this.dateValidate();
            },
            onClose : (result) => {
            	_this.dateValidate();
            }
        });

    }
	 
	dateValidate(_this) {
		const startDay = this.regExp($$("#start_btn").text());
		const endDay = this.regExp($$("#end_btn").text());
		const todyval = this.todyval.value;
		
		if(endDay-startDay < 100){
			$$("#dateForm").removeClass("form-invalid");
			return false;
		}else if(todyval>=endDay){
			$$("#dateForm").removeClass("form-invalid");
			return false;
		}
	}
	
	
	initData() {
		
		const current_date = new Date();
		const year = current_date.getFullYear();
		const month = current_date.getMonth();
		const day = current_date.getDate();
		this.setDay(day);
		let before_date = new Date();
		let before_month = before_date.getMonth();
        before_date = new Date(before_date.setMonth(before_month - 2));
        before_month = this.getToday(before_date).substr(0, 7);// 전전 달

        let start_month = "";
        let end_month = "";
        
        if(day > 25){
			// 전 달 로직
        	let today_date = new Date();
    		today_date = new Date(today_date.setMonth(month - 1))
            let today_month = this.getToday(today_date).substr(0, 7);
    		
			let be_month = new Date(current_date.setFullYear(current_date.getFullYear() - 1));
			be_month = this.getToday(be_month).substr(0, 7);
			start_month = be_month;
			end_month = today_month;
		} else {
			// 전전달 로직
			let be_month = new Date(before_date.setFullYear(before_date.getFullYear() - 1));
			be_month = new Date(before_date.setMonth(be_month.getMonth()+1))
			be_month = this.getToday(be_month).substr(0, 7);

			start_month = be_month;
			end_month = before_month;
		}
        
        this.setStart_day(start_month);
        this.setEnd_day(end_month);
        this.setTodyval(this.regExp(end_month));
        this.setEndDayNumOnly(end_month);
        
        $$("#start_btn").text(start_month);
        $$("#end_btn").text(end_month);
	}
	
	initRadio() {
		const prcDisCallback = (event, element) => {
			this.setPrcDis(element.value);
	    }
		$$(document).findByName('prcDis', 'click', prcDisCallback);
	}
	

	validation() {
		
		const startDay = this.regExp($$("#start_btn").text());
		const endDay = this.regExp($$("#end_btn").text());
		const itcsno = this.itcsno_val.value;
		const todyval = this.todyval.value;
		
		if(itcsno === null || itcsno ==="" || itcsno === "undefined"){
			$$("#itcsnoValForm").find(".validate-text").text("필수 항목입니다.");
			$$("#itcsnoValForm").addClass("form-invalid");
			return false;
		}else if(endDay-startDay >= 100){
			$$("#dateForm").find(".validate-text").text("대상기간은 전월/전전월 기준 1년 이내만 가능합니다.");
			$$("#dateForm").addClass("form-invalid");
			return false;
		}else if(todyval<endDay){
			$$("#dateForm").find(".validate-text").text("대상기간은 전월까지만 가능합니다.");
			$$("#dateForm").addClass("form-invalid");
			return false;
		}
		
		this.setStart_day(startDay);
		this.setEnd_day(endDay);
		
		return true;
	}
	
	doSearch() {
		const unqNoDscdVal = this.cust.value.acnmNo.length === 14 ? '3' : '2';
		const param = {
			    "temDscd" : "1",                   									/* 기간구분코드 1번은 기타, 2번은 과거 3개월, 3번은 과거 6개월, 4번이 과거 1년 */
			    "tgtYm1" : this.regExp(this.start_day.value),             		/* 대상년월_1 */
			    "tgtYm2" : this.regExp(this.end_day.value) ,             		/* 대상년월_2 */
			    "prcDis" : this.prcDis.value,                      							/* 처리구분 (필수) */           //(자점동일인 : 1 , 전점동일인 2)
			    "unqNoDscd" : unqNoDscdVal,                 						/* 고유번호구분코드 (필수) */ 		//(사업자번호 : 2,  법인등록번호 3)
			    "itcsno" : unqNoDscdVal === 3 ? "" : this.itcsno_val.value,     /* 통합고객번호 */              //(법인사업자번호 자리에 들어갈 값으로 예상되며, 검색 클릭 시 통합고객검색 팝업으로부터 받음)
			    "corpItcsno" : unqNoDscdVal === 3 ? this.itcsno_val.value : "",	/* 법인통합고객번호 */
			    "elDscd" : "2",                      								/* EL 구분코드 */              //(EL 구분코드는 현재 기획 화면에서 빠지는 부분이어서 그냥 강제값 세팅)//
			    "relpeItcsno1" : "",                 								/* 관련인통합고객번호_1 */
			    "relpeItcsno2" : "",                 								/* 관련인통합고객번호_2 */
			    "relpeItcsno3" : "",                 								/* 관련인통합고객번호_3 */
			    "relpeItcsno4" : "",                 								/* 관련인통합고객번호_4 */
			    "trnDt" : "20221011",            			 						/* 거래일자 */
			    "inqDscd" : "1"                   									/* 조회구분코드 */            	 //(강제 세팅.. 정확한 값을 알 수 없음)
		};
		
		this.apiBcusCtbd(param);
		
	}
	
	 /*
     * 고객별 기여도 측정표 조회
     */
    async apiBcusCtbd(param) {
		
    	console.log("고객별 기여도 측정표 조회");
		const result = await ApiUtils.sendPost('/api/crmp/getBcusCtbd.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			if(CmmUtils.isNullorEmpty(result.data.encyAcnmNo1)) {
				this.cmmUtilAlert("조회 결과가 없습니다.");
				return;
			}
			result.data.tgtYm1 = param.tgtYm1;
			result.data.tgtYm2 = param.tgtYm2;
			router.navigate('crmpmng31m',result.data);
		} else {
			this.cmmUtilAlert(result.resultMessage);
		}
		
	}
	
	
	// alert 창 호출
    async cmmUtilAlert (msg) {
        const result = await CmmUtils.alert('', msg ,{
            btnLabel : '확인',
            useCancelBtn : false,
            status : 'caution'
        });
    }
    
    regExp(str){
		let reg = /[:\-,.]/gi
		if(str===""){
			return str;
		}else if(reg.test(str)){
			return str.replace(reg, "");
		}else{
			return str;
		}
	}
    
    getToday (date_text){
		if(typeof date_text === "undefined") {
			date_text = new Date();
		}
		const year = date_text.getFullYear();
		const month = ('0' + (date_text.getMonth() + 1)).slice(-2);
		const day = ('0' + date_text.getDate()).slice(-2);
		
		return year + '-' + month + '-' + day;
	}
    
    
    /////////////////////////////////통합고객번호 조회 팝업////////////////////////////////////////
    
    /**
     * 통합고객번호 조회 팝업 open
     */
    async custSearchCallback () {
		const path = globalApp.router.routes['crmpmng30p'];
        const loadPopupPath = path.basePath + path.htmlPath;
        log.debug('loadPopupPath : ' , loadPopupPath);

        const response = await fetch(loadPopupPath);
        if ( !response.ok ) reject('file load fail!!');

        const html = await response.text();
        
        $$("#modal-company").find(".modal__content").html(html);
        $$("#modal-company").find(".modal__footer").hide();
        $$("#modal-company").find(".modal__title").text('통합고객번호 검색');
        
        const modalTrigger = document.querySelector('[id="modal-company"]')
		MicroModal.show('modal-company', {
			onShow: (modal) => {

            	$$("input").addAttr("autocomplete","off");
				$$('#modal-company').addClass('micromodal-slide-bottom-tablet');
            	
            	//변수 init
            	this.custSearchInitBind(); 
                
            	//이벤트 init
                this.custSearchInitEvent();	
                
                //라디오버튼 init
                this.custSearchInitRadio();
        		
                //탭 이벤트 init
        		this.custSearchInitTab();
        		
        		this.CmnCode();
        		
            	$$('#modal-company').find('#closeBtn').on('click', () => {
                    MicroModal.close('modal-company');
                }, true);
            	
            },
            onClose: function (modalPopup, trigger, event) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                
                //초기화
    			$$('#companyNum').value("");
    			$$('#custNm').value("");
    			$$('#accNo').value("");
    			
                setTimeout(function () {
                    modalPopupBody.removeAttribute('style');
					$$('#modal-company').removeClass('micromodal-slide-bottom-tablet');
                }, 500)
                modalTrigger.classList.remove('is-modal-open');
                
            }, // [2]
            disableScroll: true, // [6]
            disableFocus: true, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
        });
    }
    
    /**
     * 통합고객번호 조회 팝업 > 변수 init
     */
    custSearchInitBind() {
		
        [this.cusSrchNoDscd, this.setCusSrchNoDscd] = this.useState('cusSrchNoDscd', '02');
        [this.getCmnCodedata, this.setGetCmnCodedata] = this.useState('getCmnCodedata', {});
        [this.listClickData, this.setListClickData] = this.useState('listClickData', {});
        [this.searchType, this.setSearchType] = this.useState('searchType', '1');
        [this.cusDscd, this.setCusDscd] = this.useState('cusDscd', '2');
        [this.items, this.setItems] = this.useState('items', []);
        
        [this.ctinInqYn, this.setCtinInqYn] = this.useState('ctinInqYn', '');
        [this.ctinInqKey, this.setCtinInqKey] = this.useState('ctinInqKey', '');
        
		[this.companyNum, this.setCompanyNum] = this.useState('companyNum', '');
		[this.custNm, this.setCustNm] = this.useState('custNm', '');
		[this.accNo, this.setAccNo] = this.useState('accNo', '');
		[this.custErr, this.setCustErr] = this.useState('custErr', '');
		[this.companyNumErr, this.setCompanyNumErr] = this.useState('companyNumErr', '');
		[this.accNoErr, this.setAccNoErr] = this.useState('accNoErr', '');
		
	}
	
    /**
     * 통합고객번호 조회 팝업 > 이벤트 init
     */
	custSearchInitEvent() {
		//바인딩
		this.bind( 'companyNum', $$('#companyNum'), 'input');
		this.bind( 'custNm', $$('#custNm'), 'input');
		this.bind( 'accNo', $$('#accNo'), 'input');
		this.bind( 'custErr', $$('#custErr'), 'p');
		this.bind( 'companyNumErr', $$('#companyNumErr'), 'p');
		this.bind( 'accNoErr', $$('#accNoErr'), 'p');
		
		const searchTxtEnter = async (e) => {
			if(e.keyCode === 13) {
				if(this.custSearchValidation() === true) {
					this.custSearch();
					document.activeElement.blur();
				}
	 		}
		}
		$$('#companyNum').on('keydown', async (e) => await searchTxtEnter(e));			
		$$('#custNm').on('keydown', async (e) => await searchTxtEnter(e));				
		$$('#accNo').on('keydown', async (e) => await searchTxtEnter(e));				
		
		//이벤트
		const searchBtnCallback = () => {
			if(this.custSearchValidation() === true) {
				this.custSearch();
			}
		}
		
		const custNmCallback = () => {
			$$("#custDiv").show();
			if(event.currentTarget.value.length > 1) {
				$$("#type2Div").find('.form').removeClass('form-invalid');
			}
		}
		
		const companyNumCallback = () => {
			$$("#custDiv").hide();
			if(event.currentTarget.value.length > 0) {
				$$("#type1Div").find('.form').removeClass('form-invalid');
			}
		}
		
		const accNoCallback = () => {
			$$("#custDiv").hide();
			if(event.currentTarget.value.length > 0) {
				$$("#type3Div").find('.form').removeClass('form-invalid');
			}
		}
		
		const delCallback = () => {
			this.setCompanyNum('');
			this.setCustNm('');
			this.setAccNo('');
		}
		
		const searchBtn = $$("#doSearch_comp");
		const custNm = $$("#custNm");
		
		const inputs = {elements : [$$("#custNm").elements[0],$$("#companyNum").elements[0], $$("#accNo").elements[0]]};
		const inputsCallbacks = [custNmCallback,companyNumCallback,accNoCallback];
		
		//이벤트 등록
		this.registerCallback("click", inputs, inputsCallbacks);
		this.registerCallback("keyup", inputs, inputsCallbacks);
		
		$$(document).findByName('doSearch_comp', 'click', searchBtnCallback);
		$$(document).findByName('removeBtn', 'click', delCallback);
	}
	
	 /**
     * 통합고객번호 조회 팝업 > 탭 이벤트
     */
	custSearchInitTab() {
		const tabClick = (event, element) => {
			const tab = event.currentTarget.attributes[1].value;
			this.setSearchType(tab);
			$$("#type1Div").hide();
			$$("#type2Div").hide();
			$$("#type3Div").hide();
			$("#type"+tab+"Div").css("display","flex");
			$$("#type"+tab+"Div").find('.form').removeClass('form-invalid');
			$$(".tab").removeClass('tab-active');
			$$(event.currentTarget).addClass('tab-active');
			
			$$("#com_search_notfound").hide();
			
			this.setCusDscd("2");
			
			this.setCompanyNum('');
			this.setCustNm('');
			this.setAccNo('');
			
			$$('#companyNum').value("");
			$$('#custNm').value("");
			$$('#accNo').value("");
			
			//$$(".validate-text").hide();
	    }
		$$(".tab").on('click',tabClick);
	}
	
	 /**
     * 통합고객번호 조회 팝업 > 라디오 이벤트 init
     */
	custSearchInitRadio() {
		
		const cusDscdCallback = (event, element) => {
			this.setCusDscd(element.value);
	    }
		
		$$(document).findByName('cusDscd', 'click', cusDscdCallback);
	}
	
	 /**
     * 통합고객번호 조회 팝업 > validataion 
     */
	custSearchValidation() {
		
		const custNm = this.custNm.value;
		const companyNum = this.companyNum.value;
		const accNo = this.accNo.value;
		const searchType = this.searchType.value;
		
		
		if(searchType === '1' && companyNum === ""){;
			$$("#type"+searchType+"Div").find('.form').addClass('form-invalid')
			this.setCompanyNumErr("필수 입력 항목입니다."); 
			$("#companyNum").focus();
			return false;
		}
		
		if(searchType === '2') {
			if(custNm === '') {
				$$("#type"+searchType+"Div").find('.form').addClass('form-invalid');
				this.setCustErr("필수 입력 항목입니다."); 
				$("#custNm").focus();
				return false;
			}
			
			if(custNm.length<2) {
				$$("#type"+searchType+"Div").find('.form').addClass('form-invalid');
				$("#custNm").focus();
				this.setCustErr("고객명은 2자 이상 입력해주세요."); 
				return false;
			}
		}
		
		if(searchType === '3' && accNo === ""){
			$$("#type"+searchType+"Div").find('.form').addClass('form-invalid');
			$("#accNo").focus();
			this.setAccNoErr("필수 입력 항목입니다."); 
			return false;
		}
		
		if(companyNum.length>0){
			this.setCusSrchNoDscd("03");
		}else{
			this.setCusSrchNoDscd("02");
		}
		
		return true;
		
	}
	
	 /**
     * 통합고객번호 조회 팝업 > 조회
     */
	custSearch() {
		
		const param = {
			cusSrchNoDscd : this.cusSrchNoDscd.value || "02",
			cusKorlNm : this.custNm.value,					/* 화면사용-고객한글명 */
			cusDscd : this.cusDscd.value,					/* 화면사용 - 고객구분 (사업자 2, 법인 3) */
			inqStaBirYy : "",									/* 조회시작출생년도 */
			inqEndBirYy : "",									/* 조회종료출생년도 */
			cusAcno : this.accNo.value,					/* 화면사용-고객계좌번호 */
			csno : "",											/* 고객번호 */
			itcsno : "",										/* 통합고객번호 78999281217- 법인사업자번호*/ //임시 주석, 주석 풀기
			acnmNo : this.regExp(this.companyNum.value),	///* 실명번호 */ 임시 주석, 주석 풀기
			psptIsuNacd : "",									/* 여권발급국가코드 */
			ptntCusIncgYn : "",									/* 잠재고객포함여부 */
			nacvtIncgYn : "",									/* 비활동포함여부 */
	        ctinInqKey : this.ctinInqKey.value,
			ctinInqYn : this.ctinInqYn.value
		};
		
		let flag = this.checkSsn(param.acnmNo);

		if(!flag) {
			/*$('#loading').addClass('on');
			setTimeout(function(){
				$('#loading').removeClass('on');
			}, 200); */
			$$('#com_search_notfound').css({'display':'flex'});
			$$('#com_search_result').hide()
			return;
		}
		
		this.apiCustSearch(param);
	}
	
	/**
     * 통합고객번호 조회 팝업 > 기업고객 검색 api
     */
	async apiCustSearch(param) {
		
		console.log("기업고객 검색");
		
		const result = await ApiUtils.sendPost('/api/crmp/getItcsno.json', param, true);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			await this.apiCustSearchDataSet(result.data);
			
			if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading();
	        }
		} else {
			if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading();
	        }
			
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인'
	        });
			if(res) {
				$$('#com_search_notfound').css({'display':'flex'});
				$$('#com_search_result').hide();
			}
		}
		
	}
	
	/**
	 * 통합고객번호 조회 팝업 > 기업고객 검색 api dataset
	 */
	async apiCustSearchDataSet(data) {
		
		const _data = data || {};
		const grid = _data.grid || [];
		const _this = this;

		if(grid.length<1){
			$$('#com_search_notfound').css({'display':'flex'});
			$$('#com_search_result').hide()
		}else{
			 $$('#com_search_notfound').hide()
			 $$('#com_search_result').show();
			 $$(".search-result").show();
		}

		this.setCtinInqYn(_data.nxtDatExstYn);
		this.setCtinInqKey(_data.ctinInqKey);

		if(this.ctinInqYn.value != 'Y'){
			$$('#custCardList').html('');
		}
		
		this.listManager = GlobalApp.getListManager(this.rootElem, {
            usePagination : false,
            container : '#custCardList',
            listItemHtmlPath : '/components/crmp/CRMPMNG30P_LST.html',
            listItemJsPath : '/components/crmp/CRMPMNG30P_LST.js'
        });

        
        let itemList = [];
        $.each(grid, function(i, item){
        	let obj = {
        		cusKorlNm: item.cusKorlNm
        		, acnmNo : item.cusIdfRefno
        		, acnmNoDscd : _this.getCmnCode(item.acnmNoDscd)
        		, itcsno : item.itcsno
        		, psptIsuNacd : item.psptIsuNacd
        		, ptntCusYn : item.ptntCusYn
        	}
        	itemList.push(obj);
        });

        itemList.forEach((itm, index) => {
            itm.id = index;
        })
        
        this.setItems(itemList);

        await this.listManager.render(this.items.value, this.eventReceiver);

        this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));

	}
	
	/**
	 * 통합고객번호 조회 팝업 > 검색결과 list
	 */
	async onItemAction ( event ) {
		
		const items = this.items.value;
		const itemId = event.detail.id;
		const param =  {
				 acnmNo : items[itemId].acnmNo
				, acnmNoDscd : items[itemId].acnmNoDscd
				, itcsno : items[itemId].itcsno
				, psptIsuNacd : items[itemId].psptIsuNacd
				, ptntCusYn : items[itemId].ptntCusYn	
		}
		
		this.setCust(param);
		this.setItcsno_val(param.itcsno);
		
		if(param.itcsno.length > 0) {
			$$("#itcsnoValForm").removeClass("form-invalid");
		}
		
		this.setSearchType('1');

		this.setCompanyNum('');
		this.setCustNm('');
		this.setAccNo('');

		$$('#companyNum').value("");
		$$('#custNm').value("");
		$$('#accNo').value("");
		
		MicroModal.close('modal-company');
    }
	
	getCmnCode(strACNM_NO_DSCD) {
		
		let strRst = "코드미존재";
		const cmmCode = this.getCmnCodedata.value.cmmCode;
		if(cmmCode.length > 0) {
			$.each(cmmCode, function(i, v){
				if(strACNM_NO_DSCD.trim() === v.DTLS_CD_ID.trim()) {
					strRst = v.DTLS_CD_NM.trim();
					$('dd[name="selAcnmNoDscd"]').text(strRst);
				}
			});
		}else {
			$('dd[name="selAcnmNoDscd"]').text(strRst);
		}
		return strRst;
		
	}
	
	async CmnCode() {
		
		const param = {
			"cmmCdId" : "ACNM_NO_DSCD"
		};
		
		const result = await ApiUtils.sendPost('/api/cmmCode/getCmmCode.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.setGetCmnCodedata(result.data);
		}
		
	}
	
    checkSsn (obj) {

		console.log('obj = ', obj);

		const ssn = obj;
		let arr_ssn = [];
		const compare = [2,3,4,5,6,7,8,9,2,3,4,5];
		let sum = 0;

		for(let i = 0; i < 13; i++) {
			arr_ssn[i] = ssn.substring(i, i+1);
		}

		for(let i = 0; i < 12; i++) {
			sum = sum + (arr_ssn[i] * compare[i]);
		}

		sum = (11 - (sum % 11)) % 10;

		if(sum === arr_ssn[12]) {
			return false;
		}else {
			return true;
		}
	}
    
    regExp(str){
		const reg = /[:\-,.]/gi
		if(str===""){
			return str;
		}else if(reg.test(str)){
			return str.replace(reg, "");
		}else{
			return str;
		}
	}
    
    
	destroy() {
		super.destroy(this);
	}
	
	
}

