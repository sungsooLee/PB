/*************************************************************************
* @ 서비스경로 : ETF12M
* @ 파일명      : ETF12M  ETF > ETF 찾기 > 검색결과 > 목록
* @ 화면ID		: PBWFU000002
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class ETF12M extends BaseModule {
	
    constructor(elem, data) {
    	super(elem);
    	
    	
    	const searchTxt = typeof data.searchTxt === 'undefined' || data.searchTxt === ''? '' : data.searchTxt;
    	const searchType = typeof data.searchType === 'undefined' || data.searchType === '' ? 'fndnm' : data.searchType;
    	
    	[this.searchTxt, this.setSearchTxt] = this.useState('searchTxt', searchTxt);
    	[this.searchType, this.setSearchType] = this.useState('searchType', searchType);
    	[this.page, this.setPage] = this.useState('page', 1);
    	[this.pageSize, this.setPageSize] = this.useState('pageSize', 10);
    	[this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'N');
    	
    	if(searchType === 'fndnm') {
    		$$("#selTxt").text("ETF명");
    	} else {
    		$$("#selTxt").text("키워드");
    	}
    	
    	//검색조건
    	[this.sort, this.setSort] = this.useState('sort', 'PP');		//PP : 수익률순, SB: 판매순
		[this.term, this.setTerm] = this.useState('term', '3');
		[this.filter, this.setFilter] = this.useState('filter', 'N'); //all : 전체, rcm : 추천
		
		[this.dataList, this.setDataList] = this.useState('dataList', [{
            label : 'ETF명',
            value : 'fndnm',
            isSelected : false
        },{
            label : '키워드',
            value : 'keyword',
            isSelected : false
        }]);
		
		const riskList = [
        	{riskColor: 'lightRed', ristGdNm: '#매우높은위험'},
        	{riskColor: 'FFF4EB', ristGdNm: '#높은위험'},
        	{riskColor: 'lightYellow', ristGdNm: '#다소높은위험'},
        	{riskColor: 'green-50', ristGdNm: '#보통위험'},
        	{riskColor: 'lightBlue', ristGdNm: '#낮은위험'},
        	{riskColor: 'lightViolet', ristGdNm: '#매우낮은위험'},
        	{riskColor: 'lightPurple', ristGdNm: '#글로벌'},
        	{riskColor: 'red-100', ristGdNm: '#원금손실가능'},
        ];
        [this.riskList, this.setRiskList] = this.useState('riskList', riskList); 
    }

    init () {
    	super.init(this);
    	
    	this.initButton();
    	
    	this.apiFndList();
    	
    	$$("#compareBottm").hide();
    }
    
    register() {
    	
    }
    
    /**
	 * 검색대상 
	 */
	selBoxClick (event) {

		const idx = this.dataList.value.findIndex((item) => item.value ===  this.searchType.value);
		const defaultComment = this.dataList.value[idx].label;
		
        const g = this;
        GlobalApp.popupUtils.openSelectModal(this.dataList.value , {
            showCloseBtn : true,
            btnElem : event.currentTarget,
            modalTitle : '옵션 선택',
            defaultSelectIndex : idx,
            defaultComment : defaultComment,
            onClose : (result) => {
                console.log('close Result : ' , result);
            },
            onCallback : (result) => {
                console.log('callback Result : ' , result);
                this.setSearchType(result.data);

                const tmpList = [];
                g.dataList.value.forEach((item) => {
                    if ( item.value === result.data ) {
                        item.isSelected = true;
                        $$("#selTxt").text(item.label);
                    } else {
                        item.isSelected = false;
                    }
                    tmpList.push(item);
                });

                g.setDataList(tmpList);
                
                
            }
        });
    }
	
	callFndList() {
		this.setPage(1);
		this.setNxtDatExstYn("N");
		this.apiFndList();
	}
	
	
	initAllEvent() {
		//이벤트 전체 삭제
    	const elements = document.querySelectorAll(".fund-card-list button");
    	elements.forEach((element) => {
    		element.parentNode.replaceChild(element.cloneNode(true),element);
    	});
    	
    	//이벤트 등록
		this.initListButton();
	}
	
    initButton() {
    	this.bind( 'searchTxt', $$('#searchTxt'), 'input');
    	
    	/**
    	 * 검색
    	 */
		const searchBtn = $$("#fndSearch");
		const searchBtnCallback = async () => {
			this.callFndList();
		}
		this.registerCallback("click", searchBtn, searchBtnCallback);
		
		
		const searchTxtEnter = async (e) => {
			if(e.keyCode === 13) {
				searchBtnCallback();
	 		}
		}
		$$('#searchTxt').on('keydown', async (e) => await searchTxtEnter(e));				// 키워드 검색
		
		/**
		 * 조회조건 팝업
		 */
		const inqCndPopup = $$("#inqCndPopup");
		const openInqCndPopup = async() => {
	    	await GlobalApp.popupUtils.openPopup('fndInqCnd', {
	            showCloseBtn : true,
	            btn2Label : '조회',
	            btn2IsMain : true,
	            params : {
	            	term : this.term.value
	            	,sort : this.sort.value
	            	,filter : this.filter.value
	            },
	            onYes: (result) => {
	            	this.setSort(result.sort);
	            	this.setTerm(result.term);
	            	this.setFilter(result.filter);
	            	
	            	let sort = '';
	            	if(result.sort === 'PP') {
	            		sort = '수익률순';
	            	} else {
	            		sort = '판매순';
	            	}
	            	$$("#inqCndPopup").find("#sort").text(sort);
	            	
	            	$$("#inqCndPopup").find("#term").text(result.term+"개월");
	            	

	            	let filter = '';
	            	if(result.filter === 'N') {
	            		filter = '전체';
	            	} else {
	            		filter = '추천ETF';
	            	}
	            	$$("#inqCndPopup").find("#filter").text(filter);
	            	this.callFndList();
	            }
	        });
	    }

    	this.registerCallback("click", inqCndPopup,  openInqCndPopup);
    	
    	/**
    	 * 비교하기 버튼
    	 */
    	const compare = $$("#compare");
    	const compareClick = () => {
    		const param = {
    				compareFnd1 : $$("#compare1Btn").value()
    				, compareFnd2 : $$("#compare2Btn").value()
    		}
    		router.navigate("etf50m",param);
    	}
    	//비교담기 버튼
    	this.registerCallback("click", compare,  compareClick);
    	
    	/*
    	 * 검색조건 (키워드/ETF명)
    	 */
    	this.registerCallback('click', $$('#selBtn'), this.selBoxClick);
    }
    
    initListButton() {
    	
    	//추천 애니메이션
        AOS.init({
            once: true,
            offset: 150,
        });
    	
    	/**
    	 * 관심ETF 이벤트
    	 */
    	const likeBtnClick = async (event, element) => {

    		let isLike = "N";
    		if( element.value === 'N') {
    			isLike = 'Y';
    		}
    		
    		const param =  {
    				fndPdcd : element.dataset.fndpdcd
    				, isLike : isLike
    				, cncrFndNm :  element.dataset.korlitmsnm
    		}
    		this.apiUpdateCncrFnd(param,element);
    	}
    	
    	/**
    	 * 비교담기 버튼 이벤트
    	 */
    	const compareBtnClick = async (event, element) => {
    		
    		event.preventDefault();
    		
    		const fndPdcd = element.dataset.fndpdcd
    		const cncrFndNm = element.dataset.korlitmsnm
    		
    		    		
    		const compare1Btn = $$("#compare1Btn").value();
    		const compare2Btn = $$("#compare2Btn").value();
    		
    		if(fndPdcd === compare1Btn) {
    			$$("#compare1Btn").value('');
    			$$("#compare1Btn").html('<i class="ico-add"></i><span>비교할 ETF 추가</span>');
    			$$("#compare").addAttr("aria-disabled",true);
    			$$("#compare").addAttr("disabled",true);
    			$$("#compare1Btn").removeClass("btn-primary");
    			$$("#compare1Btn").addClass("btn-outlined");
    			$$("#compare1Btn").addClass("btn-border-dashed");
    			if(compare2Btn === '') {
    				$$("#compareBottm").hide();
    				scrollReset();
        		}
    			return;
    		}
    		
    		if(fndPdcd === compare2Btn) {
    			$$("#compare2Btn").value('');
    			$$("#compare2Btn").html('<i class="ico-add"></i><span>비교할 ETF 추가</span>');
    			$$("#compare").addAttr("aria-disabled",true);
    			$$("#compare").addAttr("disabled",true);
    			$$("#compare2Btn").removeClass("btn-primary");
    			$$("#compare2Btn").addClass("btn-outlined");
    			$$("#compare2Btn").addClass("btn-border-dashed");
    			if(compare1Btn === '') {
    				$$("#compareBottm").hide();
    				scrollReset();
        		}
    			return;
    		}
    		
    		
    		if(compare1Btn !== '' && compare2Btn === '') {
    			$$("#compare2Btn").value(fndPdcd);
    			$$("#compare2Btn").html('<span>'+cncrFndNm+'</span><i class="ico-close-16"></i>');
    			$$("#compare2Btn").addClass("btn-primary");
    			$$("#compare2Btn").removeClass("btn-outlined");
    			$$("#compare2Btn").removeClass("btn-border-dashed");
    		} else if(compare1Btn !== '' && compare2Btn !== '') {
    			$$("#"+fndPdcd).removeClass("is-toggled");
    			element.classList.remove("btn-primary");
    			element.classList.add("btn-secondary");
    			toastr.error(``, '비교는 최대 2개까지 선택 가능합니다.');
    			event.stopPropagation();
    			return;
    		} else  {
    			$$("#compare1Btn").value(fndPdcd);
    			$$("#compare1Btn").addClass("btn-primary");
    			$$("#compare1Btn").removeClass("btn-outlined");
    			$$("#compare1Btn").removeClass("btn-border-dashed");
    			$$("#compare1Btn").html('<span>'+cncrFndNm+'</span><i class="ico-close-16"></i>');
    			$$("#compareBottm").show();
    		} 
    		
    		if($$("#compare1Btn").value() !== '' &&  $$("#compare2Btn").value() !== '') {
    			$$("#compare").removeAttr("aria-disabled");
    			$$("#compare").removeAttr("disabled");
    		} 
    		
    	}
    	
    	/**
    	 * 담기 후 삭제이벤트
    	 */
    	const deleteFndClick = async (event, element) => {
    		
    		const divId = element.value;
    		$$("#"+divId).removeClass("is-toggled");
    		$$("#"+divId).find("button[name='compareBtn']").removeClass("btn-primary");
    		$$("#"+divId).find("button[name='compareBtn']").addClass("btn-secondary");
    		
    		$$("#"+element.id).value('');
			$$("#"+element.id).html('<i class="ico-add"></i><span>비교할 ETF 추가</span>');
			$$("#"+element.id).removeClass("btn-primary");
			$$("#"+element.id).addClass("btn-outlined");
			$$("#"+element.id).addClass("btn-border-dashed");
			$$("#compare").addAttr("aria-disabled",true);
			$$("#compare").addAttr("disabled",true);
			
			const compare1Btn = $$("#compare1Btn").value();
    		const compare2Btn = $$("#compare2Btn").value();
    		
			if(compare1Btn === '' && compare2Btn === '') {
				$$("#compareBottm").hide();
				scrollReset();
    		}
    	}
    	
    	/**
    	 * 상세페이지 이동
    	 */
    	const detailBtnClick = (event,element) => {
    		const param = {
    			fndPdcd : element.parentElement.id
    			, fndNm : element.text
    		}
        	router.navigate('etf30s',param);
    	}
    	
    	$$(document).findByName('likeBtn', 'click', likeBtnClick);
    	$$(document).findByName('compareBtn', 'click', compareBtnClick);
    	$$(document).findByName('deleteFnd', 'click', deleteFndClick);
    	$$(document).findByName('detailBtn', 'click', detailBtnClick);
    	
    }
    
    /**
     * ETF 검색
     */
    async apiFndList() {
    	let param = {
    		inqDscd : this.sort.value
    		, temDis : this.term.value
    		, rcmFndYn : this.filter.value
    		, srchChrTxt : ''
    		, fndPrdKrdNm : ''
    		, page : this.page.value
    		, pageSize : this.pageSize.value
    	}
    	
    	if(this.searchType.value === 'fndnm') {
    		param.srchChrTxt = this.searchTxt.value;
    	} else if(this.searchType.value === 'keyword') {
    		param.fndPrdKrdNm = this.searchTxt.value;
    	}
    	
    	const result = await ApiUtils.sendPost('/api/etf/getFndList.json', param, true);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiFndListDataSet(result.data);
			this.initAllEvent();
		} else {
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인'
	        });
			if(res) {
				$$("#noResult").css({'display':'flex'});
				$$(".fund-result").hide();
			}
		}
		
		if(CmmUtils.isLoading()) {
        	CmmUtils.hideLoading();
        }
    }
    
    scrollEvent() {
		const _this = this;
		$(document).scroll(function(){
			let val = window.innerHeight + window.scrollY;
			if (val >= document.documentElement.scrollHeight - 1) {
				if(_this.nxtDatExstYn.value === "Y") {
					_this.apiFndList();
					_this.setNxtDatExstYn("N");				
				}
			}
		});
	}
    
    async apiFndListDataSet(data) {
		
		const _this = this;
		if(this.page.value === 1) {
			$$("#fndList").html('');
		}
        
        if(data.list.length < 1) {
        	$$("#noResult").css({'display':'flex'});
        	$$(".fund-result").hide();
        	return;
        } else {
        	$$("#noResult").hide();
        	$$(".fund-result").show();
        	$$("#totCnt").text('’'+data.totCnt+'’');
        	
        	this.setNxtDatExstYn(data.nxtDatExstYn);	
        	if(data.nxtDatExstYn === 'Y') {
        		this.setPage(this.page.value + 1);
        	}
        	
        	if(this.searchTxt.value !== '') {
        		this.saveLateRfwr();
        	}
        }
        
        const compare1Btn = $$("#compare1Btn").value();
		const compare2Btn = $$("#compare2Btn").value();
        
        $.each(data.list, function(i, item){
        	let html = '';
        	
        	const risk = _this.riskList.value.find(o => o.ristGdNm === '#'+item.riskGdNm);
        	
        	let bmmPrftRt = CmmUtils.isNullorEmpty(item.bmmPrftRt) ? Number(0).toFixed(2) : Number(item.bmmPrftRt).toFixed(2);
        	let m3PrftRt = CmmUtils.isNullorEmpty(item.m3PrftRt) ? Number(0).toFixed(2) : Number(item.m3PrftRt).toFixed(2);
        	let m6PrftRt = CmmUtils.isNullorEmpty(item.m6PrftRt) ? Number(0).toFixed(2) : Number(item.m6PrftRt).toFixed(2);
        	let m12PrftRt = CmmUtils.isNullorEmpty(item.m12PrftRt) ? Number(0).toFixed(2) : Number(item.m12PrftRt).toFixed(2);
        	
        	let btnClass = 'btn-secondary';
 	        let iClass = 'ico-compare';
 	        let divClass = '';
 	        if(compare1Btn === item.fndRprsCd || compare2Btn === item.fndRprsCd) {
 	        	btnClass = 'btn-primary';   
 	        	iClass = 'ico-check'; 
 	        	divClass = 'is-toggled';
 	        }
 	        
       	 	html += '<div class="fund-card '+divClass+'" data-aos data-toggle="toggle-wrap" id="'+item.fndRprsCd+'">';
	        if(item.rcmFndYn === 'Y') {
	        	html += '	<div class="clip clip-recommend">추천</div>';
	        }
	        html += '	<div class="tag-wrap">';
	        html += '		<div class="tags tags-small tags-'+risk.riskColor+'">'+risk.ristGdNm+'</div>';
	        html += '	</div>';
	        html += '	<a name="detailBtn" class="fund-title headline-small">'+item.fndRprsCdNm+'</a>';
	        html += '	<div class="divide-list">';
	        if(!CmmUtils.isEmpty(item.rgnTpNm)) {
	        	 html += '		<span class="divide01">'+item.rgnTpNm+'</span>';
	        }
	        if(item.asetOprcNm === '우리자산운용' && !CmmUtils.isEmpty(item.rgnTpNm)) {
	        	 html += '		<div class="division h14 mx8"></div>';
	        }
	        	 
	        if(item.asetOprcNm === '우리자산운용') {
		        html += '		<span class="divide01">'+item.asetOprcNm+'</span>';
	        }
	        html += '	</div>';
	        /**
 	         * 설정기간이 없는데 수익률은 있거나, 설정일이 30일 이상인 경우 수익률 노출
 	         * 설정기간이 30일 이전이면 '설정기간 1개월 미경과' 노출
 	         */
        	if((CmmUtils.isEmpty(item.fndEstDt) && !CmmUtils.isEmpty(item.bmmPrftRt)) || _this.calcDiff(item.fndEstDt)) {
        		html += '	<dl class="expect-list">'; 
		        if(_this.sort.value === 'PP' && _this.term.value === '1' && bmmPrftRt !== '') {
			        if(Number(item.bmmPrftRt) > 0 ) {
			        	 html += '	<div class="list rise">';
			        } else if(Number(item.bmmPrftRt) < 0) {
			        	 html += '	<div class="list fall">';
			        } else {
			        	html += '	<div class="list">';
			        }
		        } else {
		        	 html += '		<div class="list">';
		        }
	       
		        html += '			<dt>1개월</dt>';
		        
		        bmmPrftRt = bmmPrftRt > 0 ? ("+"+bmmPrftRt+"%") : bmmPrftRt+"%"
		        		
		        html += '			<dd>'+bmmPrftRt+'</dd>';
		        html += '		</div>';
		        if(_this.sort.value === 'PP' && _this.term.value === '3' && m3PrftRt !== '') {
			        if(Number(item.m3PrftRt) > 0 ) {
			        	 html += '	<div class="list rise">';
			        } else if(Number(item.m3PrftRt) < 0) {
			        	 html += '	<div class="list fall">';
			        } else {
			        	html += '	<div class="list">';
			        }
		        } else {
		        	 html += '		<div class="list">';
		        }
		        html += '			<dt>3개월</dt>';
		        
		        m3PrftRt = m3PrftRt > 0 ? ("+"+m3PrftRt+"%") : m3PrftRt+"%"
		        html += '			<dd>'+m3PrftRt+'</dd>';
		        html += '		</div>';
		        if(_this.sort.value === 'PP' && _this.term.value === '6' && m6PrftRt !== '') {
			        if(Number(item.m6PrftRt) > 0 ) {
			        	 html += '	<div class="list rise">';
			        } else if(Number(item.m6PrftRt) < 0) {
			        	 html += '	<div class="list fall">';
			        } else {
			        	html += '	<div class="list">';
			        }
		        } else {
		        	 html += '		<div class="list">';
		        }
		        html += '			<dt>6개월</dt>';
		        
		        m6PrftRt = m6PrftRt > 0 ? ("+"+m6PrftRt+"%") : m6PrftRt+"%"
		        html += '			<dd>'+m6PrftRt+'</dd>';
		        html += '		</div>';
		        if(_this.sort.value === 'PP' && _this.term.value === '12' && m12PrftRt !== '') {
			        if(Number(item.m12PrftRt) > 0 ) {
			        	 html += '	<div class="list rise">';
			        } else if(Number(item.m12PrftRt) < 0) {
			        	 html += '	<div class="list fall">';
			        } else {
			        	html += '	<div class="list">';
			        }
		        } else {
		        	 html += '		<div class="list">';
		        }
		        html += '			<dt>12개월</dt>';
		        
		        m12PrftRt = m12PrftRt > 0 ? ("+"+m12PrftRt+"%") : m12PrftRt+"%"
		        html += '			<dd>'+m12PrftRt+'</dd>';
		        html += '		</div>';
		        html += '	</dl>';
        	} else { // 설정기간 1개월 미경과 시 안내 텍스트출력
        		html += '   <div class="expect-desc">';
    			html += '   	<p>설정기간 1개월 미경과</p>';
    			html += '   </div>';
        	}
			html += '	<div class="compare-btn-wrap">';
	        html += '		<button type="button" data-korlItmsNm="'+item.fndRprsCdNm+'" data-fndPdcd="'+item.fndRprsCd+'" class="btn-small '+btnClass+' btn-round"';
	        html += '			data-toggle="toggle-trigger" data-switch-before="btn-secondary"';
	        html += '			data-switch-after="btn-primary" name="compareBtn">';
	        html += '			비교담기 <i class="'+iClass+'" data-switch-inner="true"';
	        html += '				data-switch-inner-before="ico-compare"';
	        html += '				data-switch-inner-after="ico-check"></i> <span';
	        html += '				class="toggle-off blind">선택</span> <span class="toggle-on blind">선택해제</span>';
	        html += '		</button>';
	        html += '	</div>';
	        html += '	<div class="favorite-btn-wrap" data-toggle="toggle-wrap">';
	        html += '		<button type="button" name="likeBtn" data-toggle="toggle-trigger" data-korlItmsNm="'+item.fndRprsCdNm+'"'; 
	        html += 		'data-fndPdcd="'+item.fndRprsCd+'" value="'+(item.isLike === 'Y' ? 'Y' : 'N')+'">';
	        
	        if(item.isLike === 'Y') {
		        html += '			<i class="icon-only icon-36 icon-fav-active" name="likeBtn"  data-switch-inner="true"';
		        html += 				'data-switch-inner-before="icon-fav"';
		        html += 				'data-switch-inner-after="icon-fav-active"></i>';
	        } else {
	        	html += '			<i class="icon-only icon-36 icon-fav" name="likeBtn" data-switch-inner="true"';
			     html += 				'data-switch-inner-before="icon-fav"';
			    html += 				'data-switch-inner-after="icon-fav-active"></i>';
	        }
	        html += '				<span class="toggle-off blind">관심ETF 등록</span>';
	        html += '				<span class="toggle-on blind">관심ETF 등록해제</span>';
	        html += '		</button>';
	        html += '	</div>';
	        html += '</div>';
	        
	        $$('#fndList').append(html);
        });
        
        this.scrollEvent();
	}
    
    /*
	 * 최근검색어 저장
	 */
    saveLateRfwr() {
    	
    	
    	const res = CmmUtils.getLocalStorageData(this.empNo+"_fnd");
    	if(res.data != null) {
    		
    		/**
    		 * 중복 데이터 있는 경우에는 저장X
    		 * 저장하기 전 이미 10개 검색어가 있으면 마지막 검색어 지우고 
    		 * 배열 처음에 저장
    		 */
    		const searchTxtArr = res.data;
    	
    		
    		const dupliChk = searchTxtArr.findIndex((item) => item.searchTxt ===  this.searchTxt.value);
	    	if(dupliChk < 0) {
	    		
	    		if(searchTxtArr.length > 5) {
		    		searchTxtArr.pop();
		    	} 
	    		
	    		const hist = {
    				searchTxt : this.searchTxt.value,
    				type : this.searchType.value
    			}
				searchTxtArr.unshift(hist);
		    	
		    	CmmUtils.setLocalStorageData(this.empNo+"_fnd", searchTxtArr);
	    	}
    	} else {
    		const hist = {
				searchTxt : this.searchTxt.value,
				type : this.searchType.value
			}
			const searchTxtArr = [];
    		searchTxtArr.unshift(hist);
	    	
	    	CmmUtils.setLocalStorageData(this.empNo+"_fnd", searchTxtArr);
    	}
    }

	
	/**
	 * 관심ETF 등록/삭제
	 */
    async apiUpdateCncrFnd(param, element) {
		const result = await ApiUtils.sendPost('/api/etf/updateCncrFnd.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			if(result.data === -1) {
				element.children[0].classList.remove('icon-fav-active');
				element.children[0].classList.add('icon-fav');
				toastr.error(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/etf60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '더 이상 등록할 수 없습니다.', {
					"extendedTimeOut": 0,
					"preventDuplicates": false,
					"disableTimeOut": true,
				});
			} else if(result.data === 0) {
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav-active');
					element.children[0].classList.add('icon-fav');
					toastr.error(``, '관심ETF 등록에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add('icon-fav-active');
					toastr.error(``, '관심ETF 삭제에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			} else {
				element.value = param.isLike;
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add("icon-fav-active");	
					toastr.success(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/etf60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심ETF에 등록되었습니다', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.add('icon-fav');
					element.children[0].classList.remove("icon-fav-active");	
					toastr.caution(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/etf60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심ETF에서 삭제되었습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			}
		} else {
			toastr.error(``, result.resultMessage, {
				"extendedTimeOut": 0,
				"preventDuplicates": false,
				"disableTimeOut": true,
			});
		}
	}
    
    calcDiff (fndEstDt) {

        const stDt = dayjs(fndEstDt);
        const now = dayjs();

        const diffDay = now.diff(stDt, 'day');

        return diffDay >= 30 ? true : false;
    }
    
   
    destroy () {
        super.destroy(this);
        $(document).off("scroll");
    }
}
