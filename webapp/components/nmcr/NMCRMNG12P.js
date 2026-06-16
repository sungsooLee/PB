/*************************************************************************
* @ 서비스경로 : NMCRMNG12P
* @ 파일명      : NMCRMNG12P.js 내명함공유 - 등록
* @ 화면ID 	 : PBWBU009902
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-02            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;
//router 초기화
const router = globalApp.router;

export class NMCRMNG12P extends BaseModule {
		constructor(elem) {
			super(elem);
			this.rootElem = elem;
			this.callbackFunc = null;
			
			[this.mNmcrNm, this.setMnmcrNm] 	 		= this.useState('mNmcrNm', ''); 							// 별칭
			[this.mNmcrStylCd, this.setMnmcrStylCd]   = this.useState('mNmcrStylCd', ''); 					// 명함스타일코드
			[this.mLvjpEstCd, this.setMlvjpEstCd]   		= this.useState('mLvjpEstCd', ''); 						// 현재 직급코드
			[this.mLvjpEstNm, this.setMlvjpEstNm]  		= this.useState('mLvjpEstNm', ''); 						// 현재 직급명
			[this.licLstCnt, this.setLicLstCnt] 	 			= this.useState('licLstCnt', '0'); 							// 자격증 개수
			[this.mEstTelNo, this.setMestTelNo] 	 		= this.useState('mEstTelNo', ''); 							// 설정 전화번호
			[this.mInTelNo, this.setMinTelNo] 	 		= this.useState('mInTelNo', ''); 							// 설정 내선번호
			[this.mEstTelNm, this.setMestTelNm] 	 		= this.useState('mEstTelNm', ''); 						// 설정 전화번호
			
			[this.prlmEno, this.setPrlmEno] 					= this.useState('prlmEno', '');								// 직원번호
		}

		init (param, callbackFunc ) {
			super.init(this);
			
			this.callbackFunc = callbackFunc;
			
			this.register();
			
			this.loadSetData();
			
//			this.setSwiper();
		}
		
		register () {
			this.bind( 'mNmcrNm', $$('#mNmcrNm') , 'input');
			this.bind( 'mLvjpEstCd', $$('#mLvjpEstCd1') , 'radio');
			this.bind( 'mLvjpEstNm', $$('#mLvjpEstNm') , 'string');
			this.bind( 'mEstTelNo', $$('#mEstTelNo') , 'input');
			this.bind( 'mInTelNo', $$('#mInTelNo') , 'input');
			this.bind( 'mEstTelNm', $$('#mEstTelNm') , 'string');
			
			const btmSave = $$('#btmSave');

			// 등록 버튼 비활성화
			btmSave.addAttr( 'aria-disabled', true);
			
			$('input:radio[name=mTelNoDscd]').on('input', async () => await this.handleInputClick());		// 필수 값 체크 후 등록버튼 처리
			
			$('input').on('keyup', async () => await this.handleInputClick());											// 필수 값 체크 후 등록버튼 활성화 처리
			$$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));						// X버튼 클릭시, 데이터 지움.
			
			this.registerCallback('click', btmSave, this.handleClick);
			
			const userInfo = GlobalApp.router.globalData.getData('userInfo');
	        this.setPrlmEno(encodeURIComponent(userInfo.prlmEno));
	        const myRprsTelNo = userInfo.deptCd === '84616' ? '02-3151-3635' : userInfo.myRprsTelNo
	        this.setMestTelNm(myRprsTelNo);
		}
		
		async setSwiper() {
			const newSwiper = new Swiper('.swiper-business-card', {
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
		 * 내 명함 등록
		 * @param
		 */
		async handleClick() {
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
						
			const res = await this.handleBtnClick();
			
			if(res.resultCode === '000000') {
				toastr.success('', '저장 되었습니다.');
	    		setTimeout(() => {
					this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
				}, 2000);
			} else {
				toastr.error('', '저장에 실패하였습니다.');
			}
		}
		
		/**
	    *   자격증 조회 및 직급 조회
	    * @param prlmEno [string] : 사용자id
	    */
		async loadSetData () {
	    	const url = '/pb/api/nmcr/nmcrInfo.json';
	    	const params = {};
	    	params.prlmEno = this.prlmEno.value;
	    	
	    	const res = await ApiUtils.sendPost(url, params);
		
	    	this.setMlvjpEstCd(res.data.lvjpEstCd);
	    	this.setMlvjpEstNm(res.data.lvjpEstNm);
	    	//this.setMestTelNm(res.data.telNo);
	    	// 등록된 전화번호 없을 경우 직접입력만 보여지게 처리
	    	if(!$.trim(this.mEstTelNm.value)) {
	    		$$('#mTelNoDscd1').hide();
	    		$('#mTelNoDscd2').trigger('click');
	    	}
	    	this.setLicLstCnt(res.data.licLst.length);

	    	const items = res.data.licLst;
	    	
	    	if(items != null && this.licLstCnt > 0) {	// 자격증 정보가 있을 경우
	    		
	    		let html = '';
	    		$.each(items, function(idx, val) {
	    			html += '<div class="inp inp-medium">';
	    			html += '	<label>';
	    			html += '		<input type="checkbox" name="licItems" value="' + val.licNm + '">';
	    			html += '		<span class="label-title ff-42DotSans">' + val.licNm + '</span>';
	    			html += '	</label>';
	    			html += '</div>';
	    		});
	    		html += '<p class="validate-text" id="licTxt" style="display:none;">1개 이상 선택해 주세요.</p>';
	    		$$('#licListContainer').html(html);
	    		// 자격증 전체선택 true
//	    		$$('#licNoSel').addAttr('checked', true);
//	    		$('input[name=licItems]').prop('checked', true);															// 진입시 자격증 모두 선택 
	    		
	    		this.handleLicClick();
	    		
	    		$$('#licNoSel').on('click', async () => await this.handleLicClick());				 					// 자격증 선택
	    		$$('input[name=licItems]').on('click', async () => await this.handleLicCntClick());			// 자격증 선택 개수 제한
	    	} else {
	    		$$('#yesLicNm').hide();
	    		$$('#licNoSel').hide();
	    		$$('#noLicNm').show();
	    	}
	    	this.handleInputClick();
	    	this.setSwiper();
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
		
		// 필수 값 체크 후 등록버튼 활성화 처리
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
	    *   내 명합 등록
	    * @param 
	    */
		async handleBtnClick() {
			// 명함스타일
			const type = $('input:radio[name=mNmcrStylCd]:checked').val();
			
			this.setMnmcrStylCd(type == undefined ? 'A' : type);
			// 직급
			let lvjpEst = $('input:radio[name=mLvjpEstCd]:checked').val();
			let lvjpEstTxt = '팀장';
			if(lvjpEst !== '000000') {
				lvjpEst = '';
				lvjpEstTxt = '';
			}
			
			// 전화번호
			let telDesc = $('input:radio[name=mTelNoDscd]:checked').val();
			
			// 자격증 
			const licArr = [];
			$("input:checkbox[name=licItems]").each(function(idx) {
				if($(this).is(":checked") === true) {
					licArr.push($(this).val());
				}
			});
			
			const url = '/pb/api/nmcr/saveNmcr.json';
			const params = {
				prlmEno: this.prlmEno.value,
				nmcrStylCd: this.mNmcrStylCd.value,
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
		
		destroy() {
			super.destroy(this);
		}
}