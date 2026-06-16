/*************************************************************************
* @ 서비스경로 : NMCRMNG21M
* @ 파일명      : NMCRMNG21M.js 고객명함 관리 - 지점 명함첩 - 상세
* @ 화면ID 	 : PBWBU040000	
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-10            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class NMCRMNG21M extends BaseModule {
	constructor(elem, data) {
		super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();

		[this.nmcrMngNo, this.setNmcrMngNo] 		 = this.useState('nmcrMngNo', data.nmcrMngNo);
		[this.fullNm, this.setFullNm] 		 				 = this.useState('fullNm', '');
		// 고객 정보
		[this.nmcrNm, this.setNmcrNm]					 = this.useState('nmcrNm', ''); 								// 이름
		[this.nmcrComNm, this.setNmcrComNm]	 = this.useState('nmcrComNm', ''); 						// 회사 
		[this.nmcrHpNo, this.setNmcrHpNo]			 = this.useState('nmcrHpNo', ''); 							// 휴대폰번호  
		[this.nmcrDepNm, this.setNmcrDepNm]	 	 = this.useState('nmcrDepNm', ''); 							// 부서  
		[this.nmcrDtsNm, this.setNmcrDtsNm]		 = this.useState('nmcrDtsNm', ''); 							// 직책 
		[this.nmcrEmail, this.setNmcrEmail]			 = this.useState('nmcrEmail', ''); 							// 이메일  
		[this.nmcrInlxNo, this.setNmcrInlxNo]		 = this.useState('nmcrInlxNo', ''); 							// 전화번호  
		[this.nmcrFaxNo, this.setNmcrFaxNo]			 = this.useState('nmcrFaxNo', ''); 							// 팩스번호  
		[this.adr, this.setAdr] 								 = this.useState('adr', ''); 										// 주소  
		// 등록/만료 정보
		[this.regEmpNm, this.setRegEmpNm]		 	 = this.useState('regEmpNm', ''); 							// 등록자				
		[this.regDeptNm, this.setRegDeptNm]		 = this.useState('regDeptNm', ''); 							// 등록자 부서명  
		[this.regPosiNm, this.setRegPosiNm]			 = this.useState('regPosiNm', ''); 							// 등록자 직책    
		[this.regTeamNm, this.setRegTeamNm]		 = this.useState('regTeamNm', ''); 							// 등록자 팀    
		[this.regFstDt, this.setRegFstDt]			 		 = this.useState('regFstDt', ''); 								// 등록일				
		[this.lstEmpNm, this.setLstEmpNm]			 = this.useState('lstEmpNm', ''); 								// 최종수정자	
		[this.lstDeptNm, this.setLstDeptNm]			 = this.useState('lstDeptNm', ''); 							// 최종수정자 부서명  
		[this.lstPosiNm, this.setLstPosiNm]				 = this.useState('lstPosiNm', ''); 								// 최종수정자 직책    
		[this.lstTeamNm, this.setLstTeamNm]			 = this.useState('lstTeamNm', ''); 							// 최종수정자 팀    
		[this.lstAmdDt, this.setLstAmdDt]				 = this.useState('lstAmdDt', ''); 								// 최종수정일		
		[this.expyDt, this.setExpyDt]					 	 = this.useState('expyDt', ''); 									// 만료일				
		[this.expyDay, this.setExpyDay]				 = this.useState('expyDay', ''); 								// 만료일	 d-day	
		
		[this.rowData, this.setRowData]		 		     = this.useState('rowData', ''); 								// rowData
	}

	init () {
		super.init(this);
		
		this.initRegist();

		const source = document.getElementById("btn-bottom-group");
		const target = document.querySelector("main");
		console.log("[ Aiden ] target = ", target);
		target.appendChild(source);

		
		// 2025 타블렛 대응
		const sectionLeft = $('.section-tablet-right');
		let sectionLeftWidth = sectionLeft.width();
		if ($('html').hasClass('TABLET')) {
			source.style.maxWidth = sectionLeftWidth + "px";
		} else {
			source.style.maxWidth = '';
		}

		$(window).on('resize', function() {
			sectionLeftWidth = sectionLeft.width();
			if ($('html').hasClass('TABLET')) {
				source.style.maxWidth = sectionLeftWidth + "px";
			} else {
				source.style.maxWidth = '';
			}
		});
	}
	
	initRegist () {
		this.bind( 'nmcrNm', 			$$('#nmcrNm'), 			'string');
		this.bind( 'nmcrComNm', 	$$('#nmcrComNm'), 	'string');
		this.bind( 'nmcrHpNo', 		$$('#nmcrHpNo'), 		'string');
		this.bind( 'nmcrDepNm', 	$$('#nmcrDepNm'), 	'');
		this.bind( 'nmcrDtsNm', 		$$('#nmcrDtsNm'), 	'string');
		this.bind( 'nmcrEmail', 		$$('#nmcrEmail'), 		'string');
		this.bind( 'nmcrInlxNo', 		$$('#nmcrInlxNo'), 	'string');
		this.bind( 'nmcrFaxNo', 		$$('#nmcrFaxNo'), 		'string');
		this.bind( 'adr', 					$$('#adr'), 				'string');
		this.bind( 'regEmpNm', 		$$('#regEmpNm'), 		'string');
		this.bind( 'regDeptNm', 		$$('#regDeptNm'), 	'');
//		this.bind( 'regPosiNm', 		$$('#regPosiNm'), 		'');
		this.bind( 'regTeamNm', 	$$('#regTeamNm'), 		'');
		this.bind( 'regFstDt', 			$$('#regFstDt'), 			'string');
		this.bind( 'lstEmpNm', 		$$('#lstEmpNm'), 		'string');
		this.bind( 'lstDeptNm', 		$$('#lstDeptNm'), 		'');
//		this.bind( 'lstPosiNm', 		$$('#lstPosiNm'), 		'');
		this.bind( 'lstTeamNm', 		$$('#lstTeamNm'), 		'');
		this.bind( 'lstAmdDt', 			$$('#lstAmdDt'), 		'string');
		this.bind( 'expyDt', 			$$('#expyDt'), 			'string');
		this.bind( 'expyDay', 			$$('#expyDay'), 		'string');
		
		this.loadData();
		
		$$('#btnMemo').on('click', async () => await this.handleMemoClick());								// 메모 등록
		$$('#memoBtn').on('click', async () => await this.handleMemoClick());								// 메모 등록
		$$('#memoAll').on('click', async () => await this.handleMemoAllClick());							// 메모 전체 보기
		$$('#btnHistory').on('click', async () => await this.handleHistoryAllClick());						// 변경 내역
		$$('#modalTrigger').on('click', async () => await this.handleImageClick());						// 이미지보기  
		$$('#btnDelNmcr').on('click', async () => await this.handleDelClick());								// 삭제
		$$('#btnModNmcr').on('click', async () => await this.handleModClick());							// 수정
		$$('#btnExpy').on('click', async () => await this.handleExpyClick());									// 연장하기
		
		$$(document).findByName('btnAction', 'click', this.handleActionClick);								// 휴대폰, 회사전화, 문자, 이메일 보내기
		this.registerCallback('click', $$('#btnCom'), this.handleComClick);									// 기업정보조회
		this.registerCallback('click', $$('#btnMore'), this.morePopup);											// 수정/삭제 버튼 show
	}
	
	/**
	 * 수정/삭제 팝업 open
	 */
	async morePopup() {
		let modalTrigger = document.querySelector('[data-micromodal-trigger="modal-dropdown-list"]')
		MicroModal.show('modal-dropdown-list', {
            onShow: (modalPopup) => {

            	modalTrigger = event.target;
                const triggerPositionTop = $(modalTrigger).offset().top;
                const triggerPositionLeft = $(modalTrigger).offset().left;
                const triggerPositionBottom = $(modalTrigger).offset().top + $(modalTrigger).outerHeight();
                const triggerPositionRight = $(modalTrigger).offset().left + $(modalTrigger).outerWidth()
                const triggerWidth = $(modalTrigger).outerWidth();
                const windowWidth = $(window).outerWidth();
                const windowHeight = $(window).outerHeight();

                let scrollPosition = $(window).scrollTop();
                let scrollLeftPosition = $(window).scrollLeft();
                
                const dropDown = modalPopup.classList.contains('micromodal-slide-dropdown');

                if (dropDown) {
                    const modalPopupBody = modalPopup.querySelector('.modal__container');
                    const modalPopupBodyWidth = modalPopupBody.clientWidth;
                    const modalPopupBodyHeight = modalPopupBody.clientHeight;

                    let padding = 10;

                    // default (position right)
                    if (triggerPositionRight > windowWidth / 2) {
                        modalPopupBody.style.left = triggerPositionRight - modalPopupBodyWidth + 'px';

                    }
                    // reverse (position left)
                    else if (windowWidth / 2 > triggerPositionRight) {
                        modalPopupBody.style.left = triggerPositionLeft + 'px';
                    }

                    if (windowHeight / 2 > triggerPositionTop - scrollPosition) {
                        modalPopupBody.style.top = triggerPositionBottom + padding - scrollPosition + 'px';
                    }
                    // reverse (position top)
                    else if (windowHeight / 2 < triggerPositionTop - scrollPosition) {
                        modalPopupBody.style.bottom = windowHeight - triggerPositionTop + padding + scrollPosition + 'px';
                    }
                }
                modalTrigger.classList.add('is-modal-open');
            },
            onClose: function (modalPopup, trigger, event) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                setTimeout(function () {
                    modalPopupBody.removeAttribute('style');
                }, 500)
                modalTrigger.classList.remove('is-modal-open');

				$$(modalPopup).find('#modify').off();
				$$(modalPopup).find('#delete').off();
            }, // [2]
            disableScroll: true, // [6]
            disableFocus: true, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
        });
	 
	}
	
	/**
    *  고객명함 상세조회
    * @param 
    */
	async loadData() {
    	const url = '/pb/api/nmcr/cus/nmcrCusDtlInfo.json';
    	const params = {
    			nmcrMngNo: this.nmcrMngNo.value
    	};
    	
    	const res = await ApiUtils.sendPost(url, params);
    	
    	if (res.resultCode === "000000") {
    		this.setNmcrData(res.data.data);	// 고객데이터 bind
    		this.setMemoData(res.data);			// 메모데이터 list
    		this.setRowData(res.data.data);		// 수정 시 이력관리를 위한 데이터 
		} else {
			toastr.error('', res.resultMessage);
		}
	}
	
	/**
    *  고객명함 상세조회 - 고객데이터 bind
    * @param 
    */
	async setNmcrData(data) {
		const time = dayjs().format('YYYYMMDDHHmmss');
		const filePathNm = '/api/file/getFileView?fileName=' + data.atflNm + '&fileType=NMCR&time=' + time;
		
		$('#nmcrFullNmSrc').attr('srcset', filePathNm);
		$('#nmcrFullNm').attr('src', filePathNm);
		this.setFullNm(filePathNm);
		// 키맨
		if(data.favtUsgYn === 'Y' ) {
			$$('#favtUsgYn').show();
		} else {
			$$('#favtUsgYn').hide();
		}
		// 명함나만보기
		if(data.nmcrShrgYn === 'Y' ) {
			$$('#nmcrShrgYn').show();
		} else {
			$$('#nmcrShrgYn').hide();
		}
		this.setNmcrNm(data.nmcrNm);
		this.setNmcrComNm(data.nmcrComNm);
		this.setNmcrHpNo(CmmUtils.phoneFormatter(data.nmcrHpNo));
		if(data.nmcrDepNm === null || data.nmcrDepNm === '') {
			$$('#nmcrDLine').hide();
		}
		this.setNmcrDepNm(data.nmcrDepNm);
		if(data.nmcrDtsNm === null || data.nmcrDtsNm === '') {
			$$('#nmcrDLine').hide();
		}
		this.setNmcrDtsNm(data.nmcrDtsNm);
		this.setNmcrEmail(data.nmcrEmail);
		if(data.nmcrEmail === '' || data.nmcrEmail === null) {
			$('#mailArea').hide();
			$('#btnMail').hide();
		} else {
			$('#mailArea').show();
			$('#btnMail').show();
		}
		if(data.nmcrInlxNo === '' || data.nmcrInlxNo === null) {
			this.setNmcrInlxNo('');
		} else {
			this.setNmcrInlxNo(CmmUtils.phoneFormatter(data.nmcrInlxNo));
		}
		if(data.nmcrFaxNo === '' || data.nmcrFaxNo === null) {
			this.setNmcrFaxNo('');
			$$('#faxNoArea').hide();
		} else {
			this.setNmcrFaxNo(CmmUtils.faxFormatter(data.nmcrFaxNo));
			$$('#faxNoArea').css({'display':''});
		}
		this.setAdr(data.adr);
		if(data.nmcrInlxNo === '' || data.nmcrInlxNo === null) {
			$('#inlxNoArea').hide();
			$('#btnOffTel').hide();
		}
		if(data.adr === '' || data.adr === null) {
			$('#adrArea').hide();
		}
		this.setRegEmpNm(data.regEmpNm);
		this.setRegDeptNm(data.regDeptNm);
		this.setRegTeamNm(data.regTeamNm);
		this.setRegFstDt(data.regFstDt);
		
		// 수정이 된 경우만 출력
		if(data.lstEmpNm === null || data.lstEmpNm === '') {
			$$('#lstEmpArea').hide();
			$$('#lstEmpTxt').hide();
			$$('#lstEmpDtArea').hide();
		} else {
			$$('#lstEmpArea').css({'display':''});
			$$('#lstEmpTxt').css({'display':''});
			$$('#lstEmpDtArea').css({'display':''});
		}
		this.setLstEmpNm(data.lstEmpNm);
		this.setLstDeptNm(data.lstDeptNm);
		this.setLstTeamNm(data.lstTeamNm);
		this.setLstAmdDt(data.lstAmdDt);
		this.setExpyDt(data.nmcrExpyDt);
		// 만료일 
		if(data.dDay === 0) {
			this.setExpyDay('삭제예정');
		} else if (data.dDay > 30) {
			$('#expyDay').hide();
			$('#btnExpy').hide();
		} else {
			this.setExpyDay('D-' + data.dDay);
			$$('#expyDay').removeClass('tags-lightRed').addClass('tags-lightBlue');
		}
	}
	
	/**
    *  고객명함 상세조회 - 메모list
    * @param 
    */
	async setMemoData(data) {
		let items = data.memo;
		
		if(items.length > 0) {
			$('#memoData').show();
			$('#memoNoData').hide();
			
			if(items.length > 3) {
				$$('#memoAll').show();
			}
			
    		// 상세화면에서는 3개까지만 보여짐
    		items.splice(3);						
    		
    		let html = '';
    		items.forEach((val, idx) => {

    			html += '	<div class="memo-inner" data-toggle="toggle-wrap">';
    			if(val.hdnYn === 'Y') { 	// 나만보기
    			html += '		<div class="tag-wrap mb12">';
    			html += '			<div class="tags tags-small tags-white tags-round">나만보기</div>';
    			html += '		</div>';
    			}
    			html += '		<p data-line="3">' + val.nmcrMemoTxt + '</p>';
    			html += '		<div class="memo-btn">';
                html += '			<div class="left">';
    			html += '				<button type="button" class="anchor chevron chevron-down fs-15" data-toggle="toggle-trigger" data-switch-before="chevron-down" data-switch-after="chevron-up">';
    			html += '					<span class="toggle-off" data-bind="btnPlus">더보기</span>';
    			html += '					<span class="toggle-on" data-bind="btnMinus">접기</span>';
    			html += '				</button>';
    			html += '			</div>';
    			if(val.btnYn === 'Y') {
    			html += '			<div class="right">';
    			html += '				<button type="button" class="btn-noborder" name="btnMemoMod" data-bind="btnMod" value="' + val.memoSrno + '"><i class="ico-modify"></i>수정</button>';
    			html += '				<button type="button" class="btn-noborder" name="btnMemoDel" data-bind="btnDel" value="' + val.memoSrno + '"><i class="ico-delete"></i>삭제</button>';
    			html += '			</div>';
    			}
    			html += '		</div>';
    			html += '		<dl>';
    			html += '			<dt>' + val.empNm + '</dt>';
    			html += '			<dd>' + val.lstAmdDt + '</dd>';
    			html += '		</dl>';
    			html += '		<div class="divide-list">';
    			html += '			<span>' + val.deptNm + '</span>';
    			html += '			<div class="division h12 mx8"></div>';
    			html += '			<span>' + val.teamNm + '</span>';
    			html += '		</div>';
    			html += '	</div>';
    		});
    		$$('#listContainer').html(html);

            // 메모 더보기 & 접기 노출 스크립트
            const toggleViewMore = document.querySelectorAll('[data-switch-before="chevron-down"]');
            toggleViewMore.forEach(function(items) {
                const toggleViewMoreWrap = items.closest('[data-toggle="toggle-wrap"]');
                const text = toggleViewMoreWrap.querySelector('p');
                const textLineHeight = parseInt(window.getComputedStyle(text).lineHeight);
                const textOuterHeight = parseInt(window.getComputedStyle(text).height);
                const textLineClamp = text.dataset.line;
                const textMaxHeight = textLineHeight * textLineClamp;
                console.log(textOuterHeight)
                if (textOuterHeight > textMaxHeight) {
                    text.classList.add('line-clamp')
                } else {
                    items.style.display = 'none'
                }
            })
    		
    		let _this = this;
    		const updateClick = (event, element) => {
	    		_this.moveUpdatePage(element.value);
			}
    		$$(document).findByName('btnMemoMod', 'click', updateClick);		// 수정
    		
    		const deleteClick = (event, element) => {
	    		_this.deleteClick(element.value);
			}
    		$$(document).findByName('btnMemoDel', 'click', deleteClick);		// 삭제
    		
		} else {
			$('#memoData').hide();
			$('#memoNoData').show();
		}
	}
	
	/**
    *  메모수정팝업
    * @param 
    */
	async moveUpdatePage(id) {
		const route = 'nmcrmng24p';	
		const props = {
				memoSrno: id, 											// 일련번호
				nmcrMngNo: this.nmcrMngNo.value,			
				nmcrNm: this.nmcrNm.value,						// 이름
				nmcrComNm: this.nmcrComNm.value,		// 회사 
				nmcrDepNm: this.nmcrDepNm.value,			// 부서  
				nmcrDtsNm: this.nmcrDtsNm.value				// 직책 
		};
		await GlobalApp.popupUtils.openPopup(route, {
	        showCloseBtn : true,
	        params : props,
	        onCallback: (result) => this.nmcrMemoReturn(result), 
	    });
	}
	
	/**
    *  메모삭제
    * @param 
    */
	async deleteClick(id) {
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
				memoSrno: id, // 일련번호
				nmcrMngNo:	this.nmcrMngNo.value
		};
		
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === "000000") {
			toastr.caution('', '삭제 되었습니다.');
			// 메모 재조회 실행
			setTimeout(() => {
				const result = this.reNmcrMemo();
			}, 2000);
		} else {
			toastr.error('', res.resultMessage);
		}
	}
	
	/**
    *  메모 조회
    * @param 
    */
	async reNmcrMemo() {
		const url = '/pb/api/nmcr/cus/nmcrCusMemo.json';
    	const params = {
    			nmcrMngNo: this.nmcrMngNo.value
    	};
    	const res = await ApiUtils.sendPost(url, params);
    	
		if (res.resultCode === "000000") {
    		const items = res.data;
    		this.setMemoData(items);
		} else {
			toastr.error('', '메모 조회 중 에러가 발생하였습니다.');
		}
	}
	
	// 전화 걸기, 메일전송 등.
	async handleActionClick(e) {
		const btnId = $(e.target).closest('li').attr('id');
		if(btnId === 'btnHp') {
			window.location.href = 'tel:' + $$('#nmcrHpNo').text();
		} else if(btnId === 'btnSms') {
			window.location.href = 'sms:' + $$('#nmcrHpNo').text();
		} else if(btnId === 'btnMail') {
			window.location.href = 'mailTo:' + $$('#nmcrEmail').text();
		} else if(btnId === 'btnOffTel') {
			window.location.href = 'tel:' + $$('#nmcrInlxNo').text();
		} 
	}
	
	/**
    *  메모등록 - 팝업
    * @param 
    */
	async handleMemoClick() {
		const route = 'nmcrmng23p';
		const props = {
				nmcrMngNo: this.nmcrMngNo.value,			
				nmcrNm: this.nmcrNm.value,						// 이름
				nmcrComNm: this.nmcrComNm.value,		// 회사 
				nmcrDepNm: this.nmcrDepNm.value,			// 부서  
				nmcrDtsNm: this.nmcrDtsNm.value				// 직책 
		};
		
		await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
            params : props,
            onCallback: (result) => this.nmcrMemoReturn(result),
        });
	}
	
	/**
    *  메모등록 후처리
    * @param 
    */
	nmcrMemoReturn(result) {
		this.reNmcrMemo();
	}
	
	// 메모 전체 보기
	async handleMemoAllClick() {
		const route = 'nmcrmng25p';
		const props = {
				nmcrMngNo: this.nmcrMngNo.value,			
				nmcrNm: this.nmcrNm.value,						// 이름
				nmcrComNm: this.nmcrComNm.value,		// 회사 
				nmcrDepNm: this.nmcrDepNm.value,			// 부서  
				nmcrDtsNm: this.nmcrDtsNm.value				// 직책 
		};
		router.navigate(route, props);
	}
	
	/**
    *  고객명함 삭제
    * @param 
    */
	async handleDelClick() {
		const result = await CmmUtils.confirm('삭제하시겠습니까?', '',{
			okLabel : '예',
			noLabel : '아니요',
			icon : 'caution'
		});
		if(result.resultCd === '999999') {
			return false;
		}
		
		MicroModal.close();
		
		const url = '/pb/api/nmcr/cus/nmcrDel.json';
		const params = {
				nmcrMngNo:	this.nmcrMngNo.value
		};
		
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === "000000") {
			toastr.caution('', '삭제 되었습니다.');
			
			let route = 'nmcrmng20m';
			setTimeout(() => {
				router.navigate(route);
			}, 2000);
		} else {
			toastr.error('', res.resultMessage);
		}
	}
	
	// 수정 화면 이동
	async handleModClick() {
		MicroModal.close();
		
		const route = 'nmcrmng32p';	
		const props = this.rowData.value;
		
    	await GlobalApp.popupUtils.openPopup(route, {
	      showCloseBtn : true,
		  type: 'tablet',
//	      btn2Label : '저장',
//	      btn2IsMain : true,
	      params : props,
	      onCallback: (result) => this.nmcrReturn(result),
	    });
	}
	
	// 연장하기
	async handleExpyClick() {
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
				nmcrMngNo: this.nmcrMngNo.value
		};
		
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === "000000") {
			toastr.success('', '연장 되었습니다.');
			// 재조회 실행
			setTimeout(() => {
				this.loadData();
			}, 2000);
		} else {
			toastr.error('', res.resultMessage);
		}
	}
	
	/**
    *  고객명함 수정 후 처리
    * @param 
    */
	async nmcrReturn(result) {
		setTimeout(() => {
			this.loadData();
		}, 1000);
	}
	
	/**
    *  고객명함 변경내역 팝업 호출
    * @param 
    */
	async handleHistoryAllClick() {
		const route = 'nmcrmng26p';	
		const props = {nmcrMngNo: this.nmcrMngNo.value};
		
		await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
			type: 'slideLeft',
            params : props,
            onClose : (result) => console.log('onClose Result : ' , result),
        });
	}

	/**
    *  이미지보기
    * @param 
    */
	async handleImageClick() {
		const route = 'nmcrmng22p';
		const props = {
				fullNm: this.fullNm.value
		};
		await GlobalApp.popupUtils.openPopup(route, {
            showCloseBtn : true,
            params : props,
            onClose : (result) => console.log('onClose Result : ' , result),
        });
	}
	
	/**
    *  기업정보조회
    * @param 
    */
	async handleComClick() {
		const route = 'crmpmng41m';
		const props = {
				searchText: this.nmcrComNm.value
		};
		router.navigate(route, props);
	}
	
    destroy() {
        super.destroy(this);

		// 2025: 타블렛 대응
		const source = document.getElementById("btn-bottom-group");
		source.remove();
    }
}