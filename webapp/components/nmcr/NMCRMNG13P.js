/*************************************************************************
* @ 서비스경로 : NMCRMNG13P
* @ 파일명      : NMCRMNG13P.js 내명함공유 - 수정
* @ 화면ID 	 : PBWBU009903
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-06            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

// 스와이퍼 선언.
let newSwiper = null

export class NMCRMNG13P extends BaseModule {
		constructor(elem) {
			super(elem);
			this.rootElem = elem;
			this.callbackFunc = null;
			
			[this.mNmcrSrno, this.setMnmcrSrno]  		= this.useState('mNmcrSrno', '');
			
			[this.mNmcrNm, this.setMnmcrNm] 	 		= this.useState('mNmcrNm', ''); 							// 별칭
			[this.mNmcrStylCd, this.setMnmcrStylCd]   = this.useState('mNmcrStylCd', ''); 					// 명함스타일코드
			[this.mLvjpEstCd, this.setMlvjpEstCd]   		= this.useState('mLvjpEstCd', ''); 						// 현재 직급코드
			[this.mLvjpEstNm, this.setMlvjpEstNm]  		= this.useState('mLvjpEstNm', ''); 						// 현재 직급명
			[this.licLstCnt, this.setLicLstCnt] 	 			= this.useState('licLstCnt', ''); 							// 자격증 개수
			[this.mEstTelNo, this.setMestTelNo] 	 		= this.useState('mEstTelNo', ''); 							// 설정 전화번호
			[this.mInTelNo, this.setMinTelNo] 	 			= this.useState('mInTelNo', ''); 							// 설정 내선번호
			[this.mEstTelNm, this.setMestTelNm] 	 		= this.useState('mEstTelNm', ''); 						// 설정 전화번호
			
			[this.prlmEno, this.setPrlmEno] 					= this.useState('prlmEno', '');								// 직원번호
			[this.rprsTelNo, this.setRprsTelNo] 				= this.useState('rprsTelNo', '');							// 직원전화번호
		}

		init (param, callbackFunc ) {
			super.init(this);
			
			this.callbackFunc = callbackFunc;
			
			const userInfo = GlobalApp.router.globalData.getData('userInfo');
	        this.setPrlmEno(encodeURIComponent(userInfo.prlmEno));
	        const myRprsTelNo = userInfo.deptCd === '84616' ? '02-3151-3635' : userInfo.myRprsTelNo
	        this.setRprsTelNo(myRprsTelNo);
			
			this.setMnmcrSrno(param.nmcrSrno);
			
			this.loadSetData();
			
			this.register();
		}
		
		register () {
			this.bind( 'mNmcrNm', $$('#mNmcrNm') , 'input');
			this.bind( 'mLvjpEstCd', $$('#mLvjpEstCd1') , 'radio');
			this.bind( 'mLvjpEstNm', $$('#mLvjpEstNm') , 'string');
			this.bind( 'mEstTelNo', $$('#mEstTelNo') , 'input');
			this.bind( 'mInTelNo', $$('#mInTelNo') , 'input');
			this.bind( 'mEstTelNm', $$('#mEstTelNm') , 'string');
			
			const btmDel = $$('#btmDel');
			const btmSave = $$('#btmSave');
			
			// 수정
			const handleClick = async () => { 
				const hasCls	= $('#btmSave').attr('aria-disabled');
				if(hasCls === 'true') {																									// 저장 가능 상태 확인
					return false;
				}
				
				const licSel = $('#licNoSel').is(':checked');
				const lic = 'input[name=licItems]:checked';
				const licCnt = document.querySelectorAll(lic);
				const cnt = licCnt.length;
				if(licSel === true && cnt === 0) {
					$$('.inp-column-list form').addClass('form-invalid');
					$$('#licTxt').show();
					return;
				} 

				const res = await this.handleBtn2Click();
				
				if(res.resultCode === '000000') {
					toastr.success('', '저장 되었습니다.');
		    		setTimeout(() => {
						this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
					}, 2000);
				} else {
					toastr.error('', res.resultMessage);
				}
			}
			
			// 삭제
			const handleDelClick = async () => { 
				const result = await CmmUtils.confirm('삭제하시겠습니까?', '',{
					okLabel : '예',
					noLabel : '아니요',
					icon : 'caution'
				});
				if(result.resultCd === '999999') {
					return false;
				}
				
				const res = await this.handleBtn1Click();
				
				if(res.resultCode === '000000') {
					toastr.success('', '삭제 되었습니다.');
					setTimeout(() => {
						this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
					}, 2000);
				} else {
					toastr.error('', res.resultMessage);
				}
			}
			this.registerCallback('click', btmDel, handleDelClick);															// 내 명합 삭제
			this.registerCallback('click', btmSave, handleClick);																// 내 명합 수정
			
			$('input:radio[name=mTelNoDscd]').on('input', async () => await this.handleInputClick());		// 필수 값 체크 후 등록버튼 처리
			$('input').on('keyup', async () => await this.handleInputClick());											// 필수 값 체크 후 등록버튼 활성화 처리
			$$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));						// X버튼 클릭시, 데이터 지움.

			btmSave.addAttr('aria-disabled', false);
		}
		
		async setSwiper() {
			newSwiper = new Swiper('.swiper-business-card', {
				spaceBetween: 1,
				effect: 'cards',
				observer: true,
                observerParents: true,
				on : {
					slideChange: function () {
				        const index_currentSlide = this.realIndex;
				        const currentSlide = this.slides[index_currentSlide];
				        currentSlide.querySelector('input').checked = true;
				    },
				},
			});
//			bsCardResize.init();
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
			this.handleInputClick();
		}
		
		/**
	    *   내 명함 상세 조회
	    * @param prlmEno [string] : 사용자id
	    */
		async loadSetData() {
	    	const url = '/pb/api/nmcr/nmcrDtlInfo.json';
	    	const params = {};
	    	params.nmcrSrno = this.mNmcrSrno.value;
	    	params.prlmEno = this.prlmEno.value;
	    	params.rprsTelNo = this.rprsTelNo.value;
	    	
	    	const res = await ApiUtils.sendPost(url, params);
	    	
	    	const licItems = res.data.licLst;
	    	const items = res.data.data;
	    	const licData = items.licItmsNm;
	    	
	    	// 해당 스타일 코드 적용시 화면에 잘 보이는지 추후 확인
	    	$('input[name="mNmcrStylCd"][value="' + items.nmcrStylCd + '"]').prop('checked', true);
	    	// 별칭
	    	this.setMnmcrNm(items.nmcrNm);
	    	// 직급
	    	$('#mLvjpEstCd1').val(res.data.posiCd);
	    	this.setMlvjpEstNm(res.data.posiNm);
	    	// 전화번호
	    	this.setMestTelNm(items.telNo);
	    	// 등록된 전화번호 없을 경우 직접입력만 보여지게 처리
	    	if(!$.trim(this.mEstTelNm.value)) {
	    		$$('#mTelNoDscd1').hide();
	    		$('#mTelNoDscd2').trigger('click');
	    	}
	    	
	    	if(items.telNoDscd === 'I') {
	    		$('#mTelNoDscd2').prop('checked', true);
	    	}
	    	
	    	if(items.telNoDscd === 'I') {
	    		this.setMestTelNo(items.estTelNo);
	    		this.setMinTelNo(items.inTelNo);
	    	}
	    	// 자격증
	    	this.setLicLstCnt(licItems.length);
	    	
	    	if(items.lvjpEstCd === '000000') {
	    		$('#mLvjpEstCd2').prop('checked', true);
	    	}
	    	
	    	if(licItems !== null && this.licLstCnt > 0) {	// 자격증 정보가 있을 경우
	    		let html = '';
				
				let licRowCnt = 0;
				$.each(licItems, function(idx, val) {
	    			html += '<div class="inp inp-medium">';
	    			html += '	<label>';
	    			
	    			let check = '';
	    			if(licData !== null && licData.indexOf(val.licNm) > -1) {
	    				check = 'checked="true"';
	    				licRowCnt++;
	    			}
	    			
	    			html += '		<input type="checkbox" name="licItems" value="' + val.licNm + '" ' + check + '>';
	    			html += '		<span class="label-title ff-42DotSans">' + val.licNm + '</span>';
	    			html += '	</label>';
	    			html += '</div>';
	    		})
	    		html += '<p class="validate-text" id="licTxt" style="display:none;">1개 이상 선택해 주세요.</p>';
	    		$$('#licListContainer').html(html);
				
				// 선택한 자격증이 없을 경우 선택안함 체크
				if(licRowCnt === 0) { 
					$('#licNoSel').prop('checked', false);
				} else {
					$('#licNoSel').prop('checked', true);
				}
	    		
				$$('#licNoSel').on('click', async () => await this.handleLicClick());				 					// 자격증 선택
	    		$$('input[name=licItems]').on('click', async () => await this.handleLicCntClick());			// 자격증 선택 개수 제한
	    	} else {
	    		$$('#yesLicNm').hide();
	    		$$('#licNoSel').hide();
	    		$$('#noLicNm').show();
	    	}
	    	
	    	this.handleInputClick();
	    	this.setSwiper();
	    	
	    	// 기존 등록된 명함 스타일 보여주기
	    	$('input[name="mNmcrStylCd"]').each(function(i, d) {
	    		if($(this).is(':checked') === true) {
	    			newSwiper.slideTo(i, 300);
	    		}
	    	})
		}
		
		/**
		 * 전화번호, 휴대폰번호 유효성 체크
		 */
		telValidChk(tel) {
			const pattern = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
			if(pattern.test(tel) === false) { return false; }
		    else { return true; }
			return true;
		}
		
		// 필수 값 체크 후 등록버튼 처리
		async handleInputClick() {
			const inputTxt = this.mNmcrNm.value;
			
			let telDesc = $('input:radio[name=mTelNoDscd]:checked').val();
			if(telDesc === 'S') {
				$('#mEstTelNo').closest('div').addClass('disabled');
				$$('#mEstTelNo').addAttr('disabled', false);
				$('#mInTelNo').closest('div').addClass('disabled');
				$$('#mInTelNo').addAttr('disabled', false);
				$$('#inTelNoDiv').addAttr('style', 'display:none');
			} else {
				$('#mEstTelNo').closest('div').removeClass('disabled');
				$$('#mEstTelNo').removeAttr('disabled');
				$('#mInTelNo').closest('div').removeClass('disabled');
				$$('#mInTelNo').removeAttr('disabled');
				$$('#inTelNoDiv').addAttr('style', 'display:');
			}
			
			let telStat  = false;
			let checkTel = (telDesc === 'I' && this.telValidChk($('#mEstTelNo').val()));
			if(telDesc === 'S' || checkTel) {
				telStat  = true;
			}

			//toastr.caution('', '전화번호 : '+$('#mEstTelNo').val());
			//toastr.clear();
			if(telDesc === 'I') {
				if(checkTel) {
					$$('#checkTelText').hide();
				} else {
					$$('#checkTelText').show();
				}
			} else {
				$$('#checkTelText').hide();
			}
			
			if(inputTxt && telStat) {
				$$('#btmSave').addAttr( 'aria-disabled', false);													// 등록 버튼 활성화
			} else {
				$$('#btmSave').addAttr( 'aria-disabled', true);														// 등록 버튼 비활성화
			}
		}
		
		/**
	    *   자격증 선택 개수 제한
	    * @param 
	    */
		async handleLicCntClick() {
			const lic = 'input[name=licItems]:checked';
			const licCnt = document.querySelectorAll(lic);
			const cnt = licCnt.length;
			
			if(cnt > 0) {
				$$('.inp-column-list form').removeClass('form-invalid');
				$$('#licTxt').hide();
			}
			if(cnt > 5) {
				const result = await CmmUtils.alert('', '최대 5개 선택할 수 있습니다.',{
		            btnLabel : '확인',
		            icon : 'caution'
		        });
				$('input[name=licItems]').prop('checked', false);		// 선택된 자격증 체크해제
				return false;
			}
		}
		
		/**
	    *   자격증 선택에 따른 (비)활성화 처리 
	    *   선택안함 클릭 시, 자격증 목록 비활성화
	    * @param 
	    */
		async handleLicClick() {
			const licSel = $('#licNoSel').is(':checked');
			if(licSel === true) {
				$('input[name=licItems]').prop('disabled', false);
				$('input[name=licItems]').prop('checked', true);
			} else {
				$('input[name=licItems]').prop('disabled', true);		// 자격증 선택 비활성화
				$('input[name=licItems]').prop('checked', false);		// 선택된 자격증 체크해제
			}
		}
		
		/**
	    *   내 명함 수정
	    * @param 
	    */
		async handleBtn2Click() {
			// 명함스타일
			const type = $('input:radio[name=mNmcrStylCd]:checked').val();
			
			// 직급
			let lvjpEst = $('input:radio[name=mLvjpEstCd]:checked').val();
			let lvjpEstTxt = '팀장';
			if(lvjpEst != '000000') {
				lvjpEst = '';
				lvjpEstTxt = '';
			}
			
			// 전화번호
			let telDesc = $('input:radio[name=mTelNoDscd]:checked').val();
			
			// 자격증 licNoSel
			const licArr = [];
			$("input:checkbox[name=licItems]").each(function(idx) {
				if($(this).is(":checked") === true) {
					licArr.push($(this).val());
				}
			});
			
			const url = '/pb/api/nmcr/nmcrUpdate.json';
			const params = {
					prlmEno: this.prlmEno.value,
					nmcrInfSrno: this.mNmcrSrno.value,
					nmcrStylCd: type,
					nmcrNm: this.mNmcrNm.value,
					lvjpEstCd: lvjpEst,
					lvjpEstNm: lvjpEstTxt,
					telNoDscd: telDesc,
					estTelNo: this.mEstTelNo.value,
					inTelNo: this.mInTelNo.value,
					sysCd: 'pbw',
					licItmsNm: licArr.join()
				};
			
			const res = await ApiUtils.sendPost(url, params);
	    	return res;
		}
		
		/**
	    *   내 명함 삭제
	    * @param 
	    */
		async handleBtn1Click () {
			const url = '/pb/api/nmcr/delNmcr.json';
			const params = {
					prlmEno: this.prlmEno.value,
					sysCd: 'pbw',
					nmcrInfSrno: this.mNmcrSrno.value // 일련번호
			};
			
			const res = await ApiUtils.sendPost(url, params);
			return res;
		}

		destroy() {
			super.destroy(this);
		}
}