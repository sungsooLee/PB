/*************************************************************************
* @ 서비스경로 : ETF40S
* @ 파일명      : ETF40S ETF > ETF상세 > 커뮤니티 
* @ 화면ID	  : PBWFU050000
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

// router 초기화
const router = globalApp.router;

export default class ETF40S extends BaseModule {
	
	constructor(elem, data) {
		super(elem);
    	
    	[this.fndPdcd, this.setFndPdcd] = this.useState('fndPdcd', data.fndPdcd);
    	[this.fndNm, this.setFndNm] = this.useState('fndNm', data.fndNm);
    	
		[this.cmtyList, this.setCmtyList] = this.useState('cmtyList', []);
	}
	
	init () {
		console.log('ETF > ETF상세 > 커뮤니티');

		super.init(this);
		
		this.apiCmtyList();
		
		this.register();
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
			
		/*
		 * 새로운 글 등록
		 */
		const regist_btn = $$("#new_regist_btn");
		const contentRegist = () => {
			
			const param = {};
			this.apiPrlmInfo(param);
		}
		this.registerCallback("click", regist_btn,  contentRegist);
		
		/**
		 * 내정보관리
		 */
		const myInfo_btn = $$("#myInfo_btn");
		this.registerCallback("click", myInfo_btn,  this.MyInfoPopup);
		
		/**
		 * ETF 탭
		 */
		const goFndDetail = () => {
    		const param = {
    			fndPdcd : this.fndPdcd.value
    		}
    		router.navigate('etf30s',param);
    	}
    	this.registerCallback("click", $$("#goFndDetail"), goFndDetail);
	}
	
	
	initButton() {
		
		/**
		 * 더보기 모달팝업 오픈
		 */
		const moreBtn = (event, element) => {
			const cmtyNo = element.value;
			
			const param = {
				fndPdcd : this.fndPdcd.value
            	, cmtyNo : cmtyNo
			}
			
			this.morePopup(param,event);
	    }
		$$(document).findByName('more_btn', 'click', moreBtn);
		
		
		/**
		 * 답글 버튼
		 * 
		 * 답글 버튼 클릭 시 닉네임 등록 여부를 판단 후 닉네임 미동록 시 
		 * 내정보관리 팝업 오픈 닉네임 등록되어있을 시 글쓰기 팝업 오픈
		 */
		const contentReply = (event, element) => {
			
			const list = this.cmtyList.value;
			const id = element.value.split("_")[1];
			const hgrnCmtyNo = element.value.split("_")[0];
			
			const param = {
            	hgrnCmtyNo : hgrnCmtyNo
            	, rplsCmtyNo : list[id].CMTY_NO
			}
			
			this.apiPrlmInfo(param);
		}
		
		$$(document).findByName('replyBtn', 'click', contentReply);

		
		/**
		 * 좋아요 버튼 클릭
		 */
		const likeBtn = async (event, element) => {
			
			const isLike = element.value.split("_")[0];
			const cmtyNo = element.value.split("_")[1];
			
			let cmtyLikeYn = 'N';
			
			if(isLike === 'N') {
				cmtyLikeYn = 'Y'
			}
			
			const param = {
				fndPdcd : this.fndPdcd.value
            	, cmtyNo : cmtyNo
            	, cmtyLikeYn : cmtyLikeYn
			}
			
			const result = await this.apiSetCmtyLikeYn(param);
			
			// 데이터세팅
			if(result.resultCode === '000000') {
				//this.apiCmtyList();
				element.value = cmtyLikeYn+"_"+cmtyNo;
				if(cmtyLikeYn === 'Y') {
					element.firstChild.classList.add("icon-fav-active2", "bg-red-400");
					element.firstChild.classList.remove("icon-fav2", "bg-icon-gray_2");
				} else {
					element.firstChild.classList.remove("icon-fav-active2", "bg-red-400");
					element.firstChild.classList.add("icon-fav2", "bg-icon-gray_2");
				}
				
				//좋아요 건수 조회
				const likeObj = await ApiUtils.sendPost('/api/etf/getCmtyLikeCnt.json', param);
				
				if(likeObj.resultCode === '000000') {
					let likeCnt = likeObj.data === null ? '0' : likeObj.data.LIKE_COUNT;
					element.children.likeCnt.innerText = likeCnt;
				} else {
					this.apiCmtyList();
				}
				
			} else {
				toastr.error('', result.resultMessage);
			}
		}
		
		$$(document).findByName('likeBtn', 'click', likeBtn);
	}
	
	/**
	 * 수정/삭제 팝업 open
	 */
	async morePopup(param,event) {
		
		
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
                
                console.log("scrollPosition : ", scrollPosition)

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
                
                
                $$(modalPopup).find('#modify').on('click', async () => {
                    console.log("수정버튼 : ", param);
                    
                    MicroModal.close();
                    this.registPopup(param);

                });
                
                $$(modalPopup).find('#delete').on('click', async () => {
                    console.log("삭제버튼");
                    
                    MicroModal.close();
                    
                    const result = await CmmUtils.confirm('삭제하시겠습니까','', {
                    	okLabel : '예',
                        noLabel : '아니요',
                        icon : 'caution',
                    });
                    
            		if(result.resultCd === '000000') {
            			const deleteparam = {
            				cmtyNo : param.cmtyNo
            				,fndPdcd : param.fndPdcd
            				,pbPrlmEno : param.pbPrlmEno
            				,delYn : 'Y'
            			}
            			this.apiCmtyDelete(deleteparam);
            		}

                })
                
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
	async deleteContents(param) {
		const result = await CmmUtils.confirm('삭제하시겠습니까','', {
            okLabel : '예',
            noLabel : '아니요',
            icon : 'caution',
        });
		console.log(result+"!!!");
		if(result.resultCd === '000000') {
			const param = {
				cmtyNo : param.cmtyNo
				,fndPdcd : param.fndPdcd
				,pbPrlmEno : param.pbPrlmEno
				,delYn : 'Y'
			}
			this.apiCmtyDelete(param);
		}
	}
	
	/**
	 * 글쓰기 팝업 open
	 */
	async registPopup(param) {
		 
		
		param.fndPdcd = this.fndPdcd.value
		param.fndNm = this.fndNm.value
    	
		await GlobalApp.popupUtils.openPopup('etf42p', {
            showCloseBtn : true,
            params : param,
            onCallback: (result) => {
            	if(result.data > 0) {
            		this.apiCmtyList();
            		toastr.success(``, '저장 되었습니다.');
            	} else {
            		toastr.error(``, '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.');
            	}
            	
            }
        });
	}
	
	/**
	 * 내정보관리 팝업 open
	 */
	async MyInfoPopup(param) {
		await GlobalApp.popupUtils.openPopup('etf41p', {
            showCloseBtn : true,
            btn2Label : '저장',
            btn2IsMain : true,
            params : {},
            onYes: (result) => {
            	console.log('on Yes Result : ' , result);
            	if(result.resultCode === '000000') {
            		// 답글 클릭 후 닉네임등록을 한 경우 바로 답글 팝업창 오픈
            		if(param.isRegistBtnClick) {
            			this.registPopup({});
            		}
            		this.apiCmtyList();
            		// 내정보관리 클긱 후 닉네임등록을 한 경우는 수정된 결과만 return
            		toastr.success(``, '저장 되었습니다.');
            	}
            }
        });
	}
	
	/**
	 * 커뮤니티 글 조회
	 */
	async apiCmtyList() {
		const param = {
            fndPdcd: this.fndPdcd.value,
        };
		const result = await ApiUtils.sendPost('/api/etf/getCmtyList.json', param, true);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiCmtyListDataSet(result.data);
			this.initButton();
			if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading();
	        }
		}
	}
	
	apiCmtyListDataSet(data) {
		this.setCmtyList(data.list);
		
		$$("#tot_cnt").text(data.totCnt.CMTY_TOT_CNT);
		
		if(data.list.length < 1) {
			$$("#no-result").css({'display':'flex'});
			$$("#result").hide();
			return;
		} else {
			
			$$("#no-result").hide();
			$$("#result").show();
			
			let dept2Start = false;
			let hgrnCmtyNo = '';
			const _this = this;
			
			$$(".dep01").html('');
			 $.each(data.list, function(i, item){
				
				const RGPE_DEPT_NM = item.RGPE_DEPT_NM === null ? '' : item.RGPE_DEPT_NM;
				const RGPE_TEAM_NM = item.RGPE_TEAM_NM === null ? '' : item.RGPE_TEAM_NM;
				const RGPE_EMP_NM = item.RGPE_PRLM_EMP_NM === null ? '' : item.RGPE_PRLM_EMP_NM;
				const RPLS_EMP_NM = item.RPLS_EMP_NM === null ? '' : item.RPLS_EMP_NM;
				const MY_LIKE_YN = item.MY_LIKE_YN === null ? 'N' : item.MY_LIKE_YN;
				
				let html = '';
				
				/**
				 * 상위 게시글
				 */
				if(item.RPLS_CMTY_NO === '' || item.RPLS_CMTY_NO === null) {
					hgrnCmtyNo = item.CMTY_NO;
					dept2Start = true;
					
					if(item.DEL_YN !== 'Y') {
						html += '<li id="cmtyDep1_'+item.CMTY_NO+'">';
				 		html += '  <div class="comment-wrap">';
						html += '  	 <div class="comment-user">';
						html += '  	 	<div class="comment-user-profile">';
						html += '  	 		<div class="avartar avartar'+item.RGPE_AVT_CD+'"></div>';
						html += '  	 		<strong class="name">'+RGPE_EMP_NM+'</strong>';
						html += '  	 	</div>';
						html += '  	 	<div class="comment-user-info">';
						if(RGPE_DEPT_NM !== '' && item.NCKN_NM_USE_YN === 'N') {
							html += '  	 		<div class="divide-list">';
							html += '  	 			<span>'+RGPE_DEPT_NM+'</span>';
							html += '  	 			<div class="division h14 mx8"></div>';
							html += '  	 			<span>'+RGPE_TEAM_NM+'</span>';
							html += '  	 		</div>';
						}
						html += '  	 		<span class="date">'+_this.formatChange(item.LST_AMD_DTM)+'</span>';
						if(item.CMTY_AMD_AVL_YN === "Y") {
							html += '  	 		<button type="button" class="btn-more" name="more_btn" data-micromodal-trigger="modal-dropdown-list" aria-label="수정 및 삭제" value="'+item.CMTY_NO+'"></button>';
						}
						html += '  	 	</div>';
						html += '  	 </div>';
						html += '  	 <div class="comment-desc" data-toggle="toggle-wrap">';
						html += '  	 	<div class="comment-desc-inner">';
						let cmty_txt = item.CMTY_TXT === null ? '' : item.CMTY_TXT.replace(/\n/gi,"<br/>");
						html += '  	 		<p data-line="3">'+cmty_txt+'</p>';
						html += '  	 	</div>';
						html += '  	 	<div class="comment-toggle-wrap">';
						html += '  	 		<button type="button" class="anchor chevron chevron-down fs-15" data-toggle="toggle-trigger" data-switch-before="chevron-down" data-switch-after="chevron-up">';
						html += '  	 			<span class="toggle-off">더보기</span>';
						html += '  	 			<span class="toggle-on">접기</span>';
						html += '  	 		</button>';
						html += '  	 	</div>';
						html += '  	 </div>';
						html += '  	 <div class="comment-btn-wrap" data-toggle="toggle-wrap">';
						html += '  	 	<div class="left">';
						html += '  	 		<button type="button" name="likeBtn"';
						if(MY_LIKE_YN ==='Y') {
							html += 			'value="'+MY_LIKE_YN+'_'+item.CMTY_NO+'" class="btn-noborder fs-15"';
						} else {
							html += 			'value="'+MY_LIKE_YN+'_'+item.CMTY_NO+'" class="btn-noborder fs-15 fc-icon-gray_2"';
						}
						html += 			'>';
						if(MY_LIKE_YN ==='Y') {
							html += 			'<i class="icon-only icon-20 icon-fav-active2 bg-red-400"';
						} else {
							html += 			'<i class="icon-only icon-20 icon-fav2 bg-icon-gray_2"';
						}
						html += '  	 			></i>';
						html += '  	 			<span class="toggle-off blind">좋아요</span>';
						html += '  	 			<span class="toggle-on blind">좋아요 해제</span>';
						html += '				<span name="likeCnt">' + (item.LIKE_COUNT === null ? 0 : item.LIKE_COUNT) + '</span>';
						html += '  	 		</button>';
						html += '  	 	</div>';
						html += '  	 	<div class="right"><button type="button" class="btn-noborder" name="replyBtn" value="'+hgrnCmtyNo+'_'+i+'" data-micromodal-trigger="modal-reply-write"><i class="ico-reply"></i>답글</button></div>';
						html += '  	 </div>';
						html += '  </div>';
						html += '</li>';
					} else {
						html += '<li id="cmtyDep1_'+item.CMTY_NO+'" data-del="Y">';
						html += '	<div class="comment-wrap">';
						html += '		<div class="comment-user-profile">';
						html += '			<div class="avartar avartar-nodata "><i class="icon-only icon-24 icon-nodata bg-icon-gray_2"></i></div>';
						html += '		</div>';
						html += '		<div class="comment-user-info">';
						html += '			<p class="body-medium fw-400">원글이 삭제되었습니다.</p>';
						html += '		</div>';
						html += '	</div>';
						html += '</li>';
					}
					
					$$(".dep01").append(html);
				}
				 
				
				/**
				 * 댓글/대댓글
				 */
				if(item.RPLS_CMTY_NO !== null && dept2Start) {
					html = '';
					html += '  <ul class="dep02" id="cmtyDep2_'+hgrnCmtyNo+'">';
					html += '  </ul>';
					
					$$("#cmtyDep1_"+hgrnCmtyNo).append(html);
					dept2Start = false;
				}    
				
				if(item.RGPE_HGRN_CMTY_NO === hgrnCmtyNo) {
					html = '';
					if(item.DEL_YN !== 'Y') {
						html += '<li>';
				 		html += '  <div class="comment-wrap">';
						html += '  	 <div class="comment-user">';
						html += '  	 	<div class="comment-user-profile">';
						html += '  	 		<div class="avartar avartar'+item.RGPE_AVT_CD+'"></div>';
						html += '  	 		<strong class="name">'+RGPE_EMP_NM+'</strong>';
						html += '  	 	</div>';
						html += '  	 	<div class="comment-user-info">';
						if(RGPE_DEPT_NM !== '' && item.NCKN_NM_USE_YN === 'N') {
							html += '  	 		<div class="divide-list">';
							html += '  	 			<span>'+RGPE_DEPT_NM+'</span>';
							html += '  	 			<div class="division h14 mx8"></div>';
							html += '  	 			<span>'+RGPE_TEAM_NM+'</span>';
							html += '  	 		</div>';
						}
						html += '  	 		<span class="date">'+_this.formatChange(item.LST_AMD_DTM)+'</span>';
						if(item.CMTY_AMD_AVL_YN === "Y") {
							html += '  	 		<button type="button" class="btn-more" name="more_btn" data-micromodal-trigger="modal-dropdown-list" aria-label="수정 및 삭제" value="'+item.CMTY_NO+'"></button>';
						}
						html += '  	 	</div>';
						html += '  	 </div>';
						html += '	 <div class="tags tags-small tags-lightBlue">@'+RPLS_EMP_NM+'</div>';
						html += '  	 <div class="comment-desc" data-toggle="toggle-wrap">';
						html += '  	 	<div class="comment-desc-inner">';
						let cmty_txt = item.CMTY_TXT === null ? '' : item.CMTY_TXT.replace(/\n/gi,"<br/>");
						html += '  	 		<p data-line="3">'+cmty_txt+'</p>';
						html += '  	 	</div>';
						html += '  	 	<div class="comment-toggle-wrap">';
						html += '  	 		<button type="button" class="anchor chevron chevron-down fs-15" data-toggle="toggle-trigger" data-switch-before="chevron-down" data-switch-after="chevron-up">';
						html += '  	 			<span class="toggle-off">더보기</span>';
						html += '  	 			<span class="toggle-on">접기</span>';
						html += '  	 		</button>';
						html += '  	 	</div>';
						html += '  	 	<div class="comment-btn-wrap">';
						html += '  	 	    <div class="left">';
						html += '  	 		    <button type="button" name="likeBtn"';
						if(MY_LIKE_YN ==='Y') {
							html += 			    'value="'+MY_LIKE_YN+'_'+item.CMTY_NO+'" class="btn-noborder fs-15"';
						} else {
							html += 			    'value="'+MY_LIKE_YN+'_'+item.CMTY_NO+'" class="btn-noborder fs-15 fc-icon-gray_2"';
						}
						html +=      			'>';
						if(MY_LIKE_YN ==='Y') {
							html +=     			'<i class="icon-only icon-20 icon-fav-active2 bg-red-400"';
						} else {
							html += 	    		'<i class="icon-only icon-20 icon-fav2 bg-icon-gray_2"';
						}
						html += '  	 		    	></i>';
						html += '  	 			    <span class="toggle-off blind">좋아요</span>';
						html += '  	 			    <span class="toggle-on blind">좋아요 해제</span>';
						html += '					<span name="likeCnt">' + (item.LIKE_COUNT === null ? 0 : item.LIKE_COUNT) + '</span>';
						html += '  	 		    </button>';
						html += '  	 	    </div>';
						html += '  	 		<div class="right"><button type="button" class="btn-noborder" name="replyBtn" value="'+hgrnCmtyNo+'_'+i+'" data-micromodal-trigger="modal-reply-write"><i class="ico-reply"></i>답글</button></div>';
						html += '  	 	</div>';
						html += '  	 </div>';
						html += '  </div>';
						html += '</li>';
					} /*else {
						html += '<li>';
						html += '	<div class="comment-wrap">';
						html += '		<div class="comment-user-profile">';
						html += '			<div class="avartar avartar-nodata "><i class="icon-only icon-24 icon-nodata bg-icon-gray_2"></i></div>';
						html += '		</div>';
						html += '		<div class="comment-user-info">';
						html += '			<p class="body-medium fw-400">원글이 삭제되었습니다.</p>';
						html += '		</div>';
						html += '	</div>';
						html += '</li>';
					}*/
					
					$$("#cmtyDep2_"+hgrnCmtyNo).append(html);
				}
				
				const toggleViewMore = document.querySelectorAll('[data-switch-before="chevron-down"]');
				toggleViewMore.forEach(function (items) {
					const toggleViewMoreWrap = items.closest('[data-toggle="toggle-wrap"]');
					const text = toggleViewMoreWrap.querySelector('p')
					if (items.style.display !== 'none' && text.classList.value !== 'line-clamp') {
						const textLineHeight = parseInt(window.getComputedStyle(text).lineHeight);
						const textOuterHeight = parseInt(window.getComputedStyle(text).height);
						const textLineClamp = parseInt(text.dataset.line)+1;
						const textMaxHeight = textLineHeight * textLineClamp;
						if (textOuterHeight >= textMaxHeight) {
							text.classList.add('line-clamp')
						} else {
							items.style.display = 'none'
						}
					}
				})
				
	        });
			 
			 
			 //원글이 삭제되었는데 대댓글이 없는 경우는 요소 삭제
			$.each($$('ul.dep01 > li').elements, function(i, item){
				if(item.dataset.del === 'Y') {
					if($("#"+item.id+" ul").length === 0 || $("#"+item.id+" ul li").length === 0) {
						item.remove();
					}
				}
			}); 
			
			if($('ul.dep01 > li').length === 0) {
				$$("#no-result").css({'display':'flex'});
				$$("#result").hide();
			}
		}
		
	}
	
	
	/**
	 * 커뮤니티 글 삭제
	 */
	async apiCmtyDelete(param) {
		
		const result = await ApiUtils.sendPost('/api/etf/updateCmty.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			if(result.errorYn !== 'Y') {
				if(param.delYn === 'Y') {
					toastr.caution(``, '삭제 되었습니다.');
				}
				this.apiCmtyList();
			} else {
				toastr.error('', '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.');
			}
		
		} else {
			toastr.error('', result.resultMessage);
		}
	}
	
	/**
	 * 닉네임 유무 확인
	 */
	async apiPrlmInfo(param) {
		
		const result = await ApiUtils.sendPost('/api/etf/getPrlmInfo.json', {});
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			
			if(result.data.NICKNAME !== null) {// 닉네임 있는 경우 댓글 등록창
				this.registPopup(param);
			} else { // 닉네임 없는 경우 내정보관리 닉네임 등록 창
				param.isRegistBtnClick = true;
				this.MyInfoPopup(param);
			}
		} else {
			toastr.error('', result.resultMessage);
		}
	}
	
	
	/**
	 * 커뮤니티 좋아요
	 */
	async apiSetCmtyLikeYn(param) {
	
		const result = await ApiUtils.sendPost('/api/etf/setCmtyLikeYn.json', param);
		
		return result;
	}
	
	formatChange (val) {
    	if(val != '') {
    		return dayjs(val).format('YYYY-MM-DD HH:mm');
    	}
    	return '-';
    }
    
	destroy() {
		super.destroy(this);
	}
	
	
}

