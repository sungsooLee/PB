/*************************************************************************
* @ 서비스경로 : CRMPMNG40M
* @ 파일명      : CRMPMNG40M 고객관리 > 기업정보 조회
* @ 화면ID	  : PBWCL030000
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

let items = [];

export default class CRMPMNG40M extends BaseModule {

	
	constructor(elem, data) {
		super(elem);
		
		this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
	        
		[this.searchText, this.setSearchText] = this.useState('searchText', '');
		[this.searchType, this.setSearchType] = this.useState('searchType', '1');
		[this.pageCn, this.setPageCn] = this.useState('pageCn', 1);
		[this.tpySido, this.setTpySido] = this.useState('tpySido', '');
		[this.tpyGugun, this.setTpyGugun] = this.useState('tpyGugun', '');
		[this.sido, this.setSido] = this.useState('sido', '');
		[this.gugun, this.setGugun] = this.useState('gugun', '');
		[this.bzctCfcd, this.setBzctCfcd] = this.useState('bzctCfcd', '');
		[this.tpyBzctCfcd, this.setTpyBzctCfcd] = this.useState('tpyBzctCfcd', '');
		[this.tpyBzctTxt2, this.setTpyBzctTxt2] = this.useState('tpyBzctTxt2', '');
		[this.tpyBzctTxt3, this.setTpyBzctTxt3] = this.useState('tpyBzctTxt3', '');
		[this.tpyBzctTxt4, this.setTpyBzctTxt4] = this.useState('tpyBzctTxt4', '');
		[this.tpyBzctTxt5, this.setTpyBzctTxt5] = this.useState('tpyBzctTxt5', '');
		[this.tpyBzctTxt6, this.setTpyBzctTxt6] = this.useState('tpyBzctTxt6', '');
		[this.selectDept, this.setSelectDept] = this.useState('selectDept', '');
		[this.searchTextErr, this.setSearchTextErr] = this.useState('searchTextErr', '');
		
		[this.dataList, this.setDataList] = this.useState('dataList', [{
            label : '기업명',
            value : '1',
            isSelected : false
        },{
            label : '대표자명',
            value : '2',
            isSelected : false
        },{
            label : '법인번호',
            value : '3',
            isSelected : false
        },
        {
            label : '사업자번호',
            value : '4',
            isSelected : false
        }]);
		
		if(!this.isNull(data.searchText)) {
        	this.setSearchText(data.searchText);
        	this.apiCompanyInfoList();
        }
		
	}
	
	init () {
		super.init(this);
		console.log('고객관리 > 기업정보 조회');
		
		//페이징 변수
		this.setPageCn(1);
		
		//이벤트
		this.register();
		
		$$("#layoutBtn2").addAttr("aria-disabled",true);
		$$("#layoutBtn2").addAttr("disabled",true);
		$$("input").addAttr("autocomplete","off");
		
		this.drawLateRfwr();
	}
	
	drawLateRfwr() {
		let res = CmmUtils.getLocalStorageData(this.empNo+"_crmpmngm");
    	let searchTxtArr = res.data;
    		
    	let html = '';
    	if(searchTxtArr != null) {
	    	searchTxtArr.forEach((item,idx) => {
	    		html += '<li>';
				html += '	<div class="btn-xsmall btn-outlined btn-round">';
				html += '		<button class="btn-inner" value="'+item.bizNo+'" name="detail">'+item.copNm+'</button>';
				html += '		<button aria-label="검색어 삭제" name="wordDel" value="'+item.bizNo+'">';
				html += '			<i class="ico-close-16"></i>';
				html += '		</button>';
				html += '	</div>';
				html += '</li>';
	         });
	    	
	    	$$("#referenceWordList").html(html);
	    	
	    	const detailClick = (event,element) => {
				 router.navigate('crmpmng42m',{bzpeNo:element.value});
			}
			$$("#referenceWordList").findByName('detail', 'click', detailClick);
			
			const wordDelClick = (event,element) => {
				
				res = CmmUtils.getLocalStorageData(this.empNo+"_crmpmngm");
		    	searchTxtArr = res.data;
		    	
				let modifyArr = searchTxtArr.filter((item) => item.bizNo !== element.value);
				CmmUtils.setLocalStorageData(this.empNo+"_crmpmngm", modifyArr);
				element.closest('li').remove();
			}
			$$("#referenceWordList").findByName('wordDel', 'click', wordDelClick);
    	}
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
		
		const _this = this;
		//바인딩
		this.bind( 'searchText', $$('#searchText'), 'input');
		this.bind( 'searchTextErr', $$('#searchTextErr'), 'p');
		
		//이벤트
		const searchBtnCallback = () => {
			if($$('#searchText').value().length > 0) {
				if(this.validation()) {
					this.apiCompanyInfoList();
				}
			}
		}
		
		const searchTxtEnter = async (e) => {
			if(e.keyCode === 13) {
				if($$('#searchText').value().length > 0) {
					if(this.validation()) {
						this.apiCompanyInfoList();
					}
				}
	 		}
		}
		
		const resetBtnCallback = () => {
			this.setSearchText("");
			this.setSearchType("1");
			$$("#selTxt").text("기업명");
			this.setGugun('');
			this.setSido('');
			this.setBzctCfcd('');
			$$("#businessBtn").find('span').text("업종 전체"); 
			$$("#regionBtn").find('span').text('지역 전체');
		}
		
		const searchTextChange = () => {
			if(event.currentTarget.value.length > 1) {
				
				$$("#layoutBtn2").addAttr("aria-disabled",false);
				$$("#layoutBtn2").removeAttr("disabled");
				$$("#searchForm").removeClass('form-invalid'); 
				$$("#searchTextErr").hide();
			} else {
				$$("#layoutBtn2").addAttr("aria-disabled",true);
				$$("#layoutBtn2").addAttr("disabled");
			}
		}
		
		const regionBtnCallback = async () => {
			//시도 리스트 조회
			this.apiSidoList();
		}
		
		const businessBtnCallback = async () => {
			_this.apiIndustryList({});
		}
		
		const modalCloseCallback = () => {
			MicroModal.close();
		}
		
		const searchText = $$("#searchText"); //검색어
		const resetBtn = $$("#layoutBtn1"); //초기화
		const search_btn = $$("#layoutBtn2"); //검색
		const businessBtn = $$("#businessBtn"); //업종선택
		const regionBtn = $$("#regionBtn"); //지역선택
		const modalClose = $$("#modal-company").find(".modal__close"); //팝업닫기
		
		//이벤트 등록
		this.registerCallback("touchend", search_btn, searchBtnCallback); 		//검색버튼
		this.registerCallback("touchend", resetBtn, resetBtnCallback);  		//초기화버튼
		this.registerCallback("click", regionBtn, regionBtnCallback);  		//지역선택
		this.registerCallback("click", businessBtn, businessBtnCallback);	//업종선택
		this.registerCallback("click", modalClose, modalCloseCallback);		//팝업닫기
		this.registerCallback("keyup", searchText, searchTextChange);		//검색어 keyup이벤트
		this.registerCallback('click', $$('#selBtn'), this.selBoxClick);
		this.registerCallback('keydown',searchText, searchTxtEnter);
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
	
	/**
	 * 지역 선택 팝업 이벤트
	 */
	initRegionPopupEvent() {
		
		const _this = this;
		
		const sidoClick = (event, element) => {
			
			const val = element.value;
			const idx = val.split('_')[0];
			const cminCmnTxt = val.split('_')[1];
			
			this.setTpySido(cminCmnTxt);
			
			const param = {
                cminCmnTxt: cminCmnTxt
                , idx : idx
            };
		
			_this.apiGugunList(param);
		}
		
		const gugunClick = (event, element) => {
			const gugun = element.value;
			
			$$('button').removeClass('is-checked')
			element.classList.add('is-checked')
			this.setTpyGugun(gugun);
			
		}
		
		const modalResetCallback = (event, element) => {
			this.resetPopup();
			
			this.setTpyGugun('');
			this.setTpySido('');
		}
		
		$$(document).findByName('modalBackBtn', 'click', modalResetCallback);
		$$(document).findByName('modalAllBtn', 'click', modalResetCallback);
		$$(document).findByName('sidoBtn', 'click', sidoClick);
		$$(document).findByName('gugunBtn', 'click', gugunClick);
		
	}
	
	/**
	 * 지역 선택 팝업 이벤트
	 */
	initBusinessPopupEvent() {
		
		const _this = this;
		
		const industryDeptClick = (event, element) => {
			
			const idx = element.value;
			const indsBzctNm = event.target.getAttribute("data-bzct-nm");
			const indsBzctCd = event.target.getAttribute("data-inds-bzct-cd");
			const hrctCd = event.target.getAttribute("data-hrct-cd");
			
			this.setTpyBzctCfcd(indsBzctCd);
			
			this.setSelectDept(hrctCd);
			
			if(hrctCd === '2') {
				this.setTpyBzctTxt2(indsBzctNm);
			} else if(hrctCd === '3') {
				this.setTpyBzctTxt3(indsBzctNm);
			} else if(hrctCd === '4') {
				this.setTpyBzctTxt4(indsBzctNm);
			} else if(hrctCd === '5') {
				this.setTpyBzctTxt5(indsBzctNm);
			} else if(hrctCd === '6') {
				this.setTpyBzctTxt6(indsBzctNm);
			} 
			
			const param = {
				indsBzctCd: indsBzctCd,
				indsBzctNm: indsBzctNm,
				hrctCd: hrctCd,
				idx : idx,
				div : element
			};
			
			_this.apiIndustryList(param);
		}
		
		const modalResetCallback = (event, element) => {
			this.resetPopup();

			this.setTpyBzctTxt2('');
	    	this.setTpyBzctTxt3('');
	    	this.setTpyBzctTxt4('');
			this.setTpyBzctTxt5('');
			this.setTpyBzctTxt6('');
			this.setTpyBzctCfcd('');
		}
		
		$$(document).findByName('industryDept', 'click', industryDeptClick);
		$$(document).findByName('modalBackBtn', 'click', modalResetCallback);
		$$(document).findByName('modalAllBtn', 'click', modalResetCallback);
		
	}
	
	

	
	/**
	 * 지역 선택 팝업
	 */
	async regionPopup () {
		const _this = this;
		const modalTrigger = document.querySelector('[id="modal-company"]');
		$$("#modal-company").find(".modal__title").text('지역 선택');
		
		MicroModal.show('modal-company', {
            onShow: (modal) => {
            	
            	$$("#modal-company").find('#selectBtn').on('click', async () => this.regionPopupCallback(_this));

				// 2025-05-19
				if($("#modal-company").attr('aria-hidden') === 'false'){
					$$("#modal-company").addClass('micromodal-slide-bottom-right-full');
				}

            },
            onClose: function (modalPopup, trigger, event) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                setTimeout(function () {
                    modalPopupBody.removeAttribute('style');
                }, 500)
                modalTrigger.classList.remove('is-modal-open');
                
               $$("#modal-company").find('#selectBtn').off();

			    // 2025-05-19
				setTimeout(() => {
					if($("#modal-company").attr('aria-hidden') === 'true'){
						$$("#modal-company").removeClass('micromodal-slide-bottom-right-full');
					} 
				},1000);
               
               _this.setTpyGugun('');
               _this.setTpySido('');
               
               _this.resetPopup();
                
            }, // [2]
            disableScroll: true, // [6]
            disableFocus: true, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
        });
	}
	
	/**
	 * 지역 선택 callback
	 */
	async regionPopupCallback(_this) {
		
		this.setSido(_this.tpySido.value);
		this.setGugun(_this.tpyGugun.value);
		
		if(!_this.isNull(_this.sido.value)) {
    		if(!_this.isNull(_this.gugun.value)) {
    			$$("#regionBtn").find('span').text(_this.sido.value+" > "+_this.gugun.value); 
    		} else {
    			$$("#regionBtn").find('span').text(_this.sido.value);
    		}
		} else {
			$$("#regionBtn").find('span').text('지역 전체');
		}
		
		this.resetPopup();
		MicroModal.close();
	}
	
	
	/**
	 * 업종 선택 팝업
	 */
	async businessPopup () {
		const _this = this;
		const modalTrigger = document.querySelector('[id="modal-company"]');
		
		$$("#modal-company").find(".modal__title").text('업종 선택');
		 
		MicroModal.show('modal-company', {
            onShow: (modal) => {
            	
            	$$("#modal-company").find('#selectBtn').on('click', async () => this.businessPopupCallback(_this));

				// 2025-05-19
				if($("#modal-company").attr('aria-hidden') === 'false'){
					$$("#modal-company").addClass('micromodal-slide-bottom-right-full');
				}

            },
            onClose: function (modalPopup, trigger, event) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                setTimeout(function () {
                    modalPopupBody.removeAttribute('style');
                }, 500)
                modalTrigger.classList.remove('is-modal-open');
                
                $$("#modal-company").find('#selectBtn').off();

				// 2025-05-19
				setTimeout(() => {
					if($("#modal-company").attr('aria-hidden') === 'true'){
						$$("#modal-company").removeClass('micromodal-slide-bottom-right-full');
					} 
				},1000);
                
                _this.setTpyBzctTxt2('');
            	_this.setTpyBzctTxt3('');
            	_this.setTpyBzctTxt4('');
    			_this.setTpyBzctTxt5('');
    			_this.setTpyBzctTxt6('');
    			_this.setTpyBzctCfcd('');
    			
                _this.resetPopup();

            }, // [2]
            disableScroll: true, // [6]
            disableFocus: true, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
        });
	}
	
	/*
	 * 업종 선택 callback
	 */
	businessPopupCallback(_this) {
		
		console.log("businessPopupCallback")
		
		_this.setBzctCfcd(_this.tpyBzctCfcd.value);

		let iptTxt = '';
		
		const dept = Number(this.selectDept.value);
		
		if(!_this.isNull(_this.tpyBzctCfcd.value)) {
			
			if(!_this.isNull(_this.tpyBzctTxt2.value) && dept > 1) {
				iptTxt = _this.tpyBzctTxt2.value;
			} 
			if(!_this.isNull(_this.tpyBzctTxt3.value) && dept > 2) {
				iptTxt += " > " +_this.tpyBzctTxt3.value;
			} 
			if(!_this.isNull(_this.tpyBzctTxt4.value) && dept > 3) {
				iptTxt += " > " +_this.tpyBzctTxt4.value;
			} 
			if(!_this.isNull(_this.tpyBzctTxt5.value) && dept > 4) {
				iptTxt += " > " +_this.tpyBzctTxt5.value;
			} 
			if(!_this.isNull(_this.tpyBzctTxt6.value) && dept > 5) {
				iptTxt +=  " > " +_this.tpyBzctTxt6.value;
			}
			
			$$("#businessBtn").find('span').text(iptTxt); 
		} else {
			$$("#businessBtn").find('span').text("업종 전체"); 
		}
		
		this.resetPopup();
		MicroModal.close();
	}
	
	/*
	 * 표준산업 조회
	 */
	async apiIndustryList(param) {
		
		const result = await ApiUtils.sendPost('/api/crmp/industryList.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.industryListDataSet(result.data,param);
			this.businessPopup();
			//업종 선택 팝업 이벤트
			this.initBusinessPopupEvent();
		}
		
	}
	
	industryListDataSet(data,param) {
		const _data = data || {};

		
		if(_data != "") {
			const hrctCd = param.hrctCd;

			if(typeof hrctCd === "undefined") {
				
				let html = "";
				
				html += '<div class="content content-fluid">';
				html += '	<div class="accordion-select">';
				html += '		<div class="dep01">';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				$$("#modal-company").find(".modal__content").html(html);
				$$("#modal-company").find(".modal__footer").show();
				
				html = '';
				html += '<button class="accordion-select-all is-selected" name="modalAllBtn" value="">전체</button>';
				html += '<ul class="accordion-select-list" id="list">';
				html += '</ul>';
				
				
				$$("#modal-company").find(".dep01").removeClass('dep02-show');
				$$("#modal-company").find(".dep01").html(html);
				
				//$$(".dep02").hide();
				
				html = '';
				// 표준산업코드 1depth 레이어 팝업
				if(_data.getindustryList.length > 0) {
					
					//$$("#modal-company").find("#list").html('');
					$.each(_data.getindustryList, function(i, item){
							html +='<li id="dept1_'+i+'">';
							html +='	<button type="button" data-inds-bzct-cd="' +
	                    			item.INDS_BZCT_CD + '" data-hrct-cd="' + Number(Number(item.HRCT_CD) + 1) + 
	                    			'"class="anchor chevron anchor-fluid" name="industryDept" value="'+i+'" data-bzct-nm="'+item.INDS_BZCT_TXT+'">'+ item.INDS_BZCT_TXT + '</button>';
							html +='	<div class="dep02" id="dep02Div_'+i+'">';
							html +='		<div class="history-back">';
							html +='			<button type="button" name="modalBackBtn" class="is-checked">'+item.INDS_BZCT_TXT+'</button>';
							html +='		</div>';
							html +='		<ul class="dept' +Number(Number(item.HRCT_CD) + 1)+ '">';
							html +='		</ul>';
							html +='	</div>';
							html +='</li>';
					});
					$$("#modal-company").find("#list").html(html);
				}
			} else {
				// 표준산업코드 2depth 이하 레이어 팝업
				$$("#modal-company").find(".dep01").addClass('dep02-show');
				$$("#modal-company").find("button").removeClass("is-checked");
				
				const $div = param.div;
				
				// 2depth 이벤트
				if(hrctCd === "2") {
					
					// gugun option 추가
					let html = ''
					
					html = '';
					$.each(_data.getindustryList, function(i, item){
						html +='<li>';
						html +='	<button type="button" data-inds-bzct-cd="' +
				        			item.INDS_BZCT_CD + '" data-hrct-cd="' + Number(Number(item.HRCT_CD) + 1) + 
				        			'" data-bzct-nm="'+item.INDS_BZCT_TXT+'" name="industryDept">' + item.INDS_BZCT_CD + ' ' +item.INDS_BZCT_TXT + '</button>';
						html +='		<ul class="dept' + (Number(hrctCd) + 1) + '">';
						html +='		</ul>';
						html +='</li>';
					});
					
					$$(".dept"+hrctCd).html(html);
					$$("#dep02Div_"+param.idx).show();
					$$("#dept1_"+param.idx).addClass('is-selected');
					
				} else if(hrctCd > 2 && hrctCd < 5) {
					
					let html = '';
					
					$.each(_data.getindustryList, function(i, item){
						html +='<li>';
						html +='	<button type="button" data-inds-bzct-cd="' +
				        			item.INDS_BZCT_CD + '" data-hrct-cd="' + Number(Number(item.HRCT_CD) + 1) + 
				        			'" data-bzct-nm="'+item.INDS_BZCT_TXT+'" name="industryDept">' +
				        			item.INDS_BZCT_CD + ' ' + item.INDS_BZCT_TXT + '</button>';
						html +='		<ul class="dept' + (Number(hrctCd) + 1) + '">';
						html +='		</ul>';
						html +='</li>';
					});
					
					if(typeof $div != "undefined") {
						
						//같은 라인에 열린 항목이 있으면 닫는다.
						const ulClass = $div.closest("ul").classList.value;
						$$("."+ulClass).find("li").removeClass("is-acc");
						
						//선택한 항목을 연다.
						$div.closest("li").classList.add("is-acc");
						 
						//내용을 지우고 다시 그린다.
						const ulList = $div.closest("li").querySelector("ul.dept"+hrctCd);
						while(ulList.firstChild) {
							ulList.removeChild(ulList.firstChild);
						}
						$div.closest("li").querySelector("ul.dept"+hrctCd).insertAdjacentHTML("beforeend",html);
						
						//현재 선택한 항목에 체크표시
						$div.classList.add("is-checked");
					}
					
				} else if(hrctCd === "5") {
					let html = '';
					
					$.each(_data.getindustryList, function(i, item){
						html +='<li>';
						html +='	<button type="button" data-inds-bzct-cd="' +
				        			item.INDS_BZCT_CD + '" data-hrct-cd="' + Number(Number(item.HRCT_CD) + 1) + 
				        			'" data-bzct-nm="'+item.INDS_BZCT_TXT+'" name="industryDept">' +
				        			item.INDS_BZCT_CD + ' ' +item.INDS_BZCT_TXT +  '</button>';
						html +='</li>';
					});
					
					if(typeof $div != "undefined") {
						
						//같은 라인에 열린 항목이 있으면 닫는다.
						const ulClass = $div.closest("ul").classList.value;
						$$("."+ulClass).find("li").removeClass("is-acc");
						
						//선택한 항목을 연다.
						$div.closest("li").classList.add("is-acc");
						 
						//내용을 지우고 다시 그린다.
						const ulList = $div.closest("li").querySelector("ul.dept"+hrctCd);
						while(ulList.firstChild) {
							ulList.removeChild(ulList.firstChild);
						}
						$div.closest("li").querySelector("ul.dept"+hrctCd).insertAdjacentHTML("beforeend",html);
						
						//현재 선택한 항목에 체크표시
						$div.classList.add("is-checked");
					}
					
				} else {
					$div.classList.add("is-checked");
				}
			}

		}
	}
	
	/**
	 * 팝업 상태 reset
	 */
	resetPopup() {
        $$('button').removeClass('is-selected');
		$$(".accordion-select-all").addClass("is-selected");
		$$('li').removeClass('is-checked');
		$$(".dep01").removeClass('dep02-show');
		$$(".dep02").hide();
	}
	
	validation() {
		
		const searchText = this.searchText.value.trim();
		
		if(searchText.length < 2) {
			$$("#searchForm").addClass('form-invalid');
			this.setSearchTextErr('검색어를 2자 이상 입력해주세요.');
			
			setTimeout(() => {
				$("#searchText").focus();
			},10);
			
			return;
		}
		
		return true;
	}

	
	/*
	 * 시/도 조회
	 */
	async apiSidoList() {
		
		const param = {
			cminUseCd: 'sido'
		}
		const data = await ApiUtils.sendPost('/api/crmp/sidoCodeList.json', param);
		
		//데이터세팅
		if(data.resultCode === '000000') {
			this.sidoListDataSet(data.data);
			this.regionPopup();
			//지역 선택 팝업 이벤트
			this.initRegionPopupEvent();
			
		}
		
	}
	
	sidoListDataSet(data) {
         // sido option 초기화
		
		let html = '';
		
		html += '<div class="content content-fluid">';
		html += '	<div class="accordion-select">';
		html += '		<div class="dep01">';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$$("#modal-company").find(".modal__content").html(html);
		$$("#modal-company").find(".modal__footer").show();
		
		html = '';
		html += '<button class="accordion-select-all is-selected" name="modalAllBtn" value="">전체</button>';
		html += '<ul class="accordion-select-list" id="list">';
		html += '</ul>';
		
		$$("#modal-company").find(".dep01").removeClass('dep02-show');
		$$("#modal-company").find(".dep01").html(html);
		
		html = '';
		$.each(data.getSidoCodeList, function(i, item){
				html +='<li id="dept1_'+i+'">';
				html +='	<button type="button" class="anchor chevron anchor-fluid" name="sidoBtn" value="'+i+'_'+item.CMIN_CMN_CD+'">'+item.CMIN_CMN_CD+'</button>';
				html +='	<div class="dep02" id="dep02Div_'+i+'">';
				html +='	</div>';
				html +='</li>';
		});
		$$("#modal-company").find("#list").html(html);
	}
	
	/*
	 * 구/군 조회
	 */
	async apiGugunList(param) {
		
		const result = await ApiUtils.sendPost('/api/crmp/gugunCodeList.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			
			$$("#modal-company").find(".dep01").addClass('dep02-show');
			
			this.gugunCodeListDataSet(result.data,param);
			this.initRegionPopupEvent();
		}
		
	}
	
	gugunCodeListDataSet(data,param) {
		
		// gugun option 추가
		let html = ''
		html +='		<div class="history-back">';
		html +='			<button type="button" name="modalBackBtn" class="is-checked">'+param.cminCmnTxt+'</button>';
		html +='		</div>';
		html +='		<ul id="dept2_'+param.idx+'">';
		html +='		</ul>';
		
		$$("#modal-company").find("#dep02Div_"+param.idx).html(html);
		
		html = '';
		$.each(data.getGugunCodeList, function(i, item){
			html +='<li>';
			html +='	<button type="button" name="gugunBtn" value="'+item.CMIN_CMN_CD+'">' + item.CMIN_CMN_CD + '</button>';
			html +='</li>';
		});
		
		$$("#modal-company").find("#dept2_"+param.idx).html(html);
		
		$$("#modal-company").find("#dep02Div_"+param.idx).show();
		$$("#modal-company").find("#dept1_"+param.idx).addClass('is-selected');
	}
	
	/*
	 * 기업 조회
	 */
	async apiCompanyInfoList() {
		
		let param = {};

		param.sido = this.sido.value;
		param.adsdNm = this.gugun.value;
		param.bzctCfcd = this.bzctCfcd.value;

		param.searchText = this.searchText.value;
		param.searchType = this.searchType.value;
		
		router.navigate("crmpmng41m",param);
	}
	
	
	isNull(data) {
		if( data !== ''  && data !== null && typeof data !== 'undefined') {
			return false;
		}
		return true;
	}
    
	destroy() {
		super.destroy(this);
	}
	
	
}

