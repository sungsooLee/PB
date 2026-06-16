/*************************************************************************
* @ 서비스경로 : LGIN40M
* @ 파일명      : LGIN40M.js 로그인
* @ 화면ID		: PBWLO00000
* @ 작성자      : 90194835
* @ 작성일      : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

let maxTime  = 60;
let pollingCnt = 0;				// polling 처리 진행 시간 (초)
let pollingObj = "";
//let lginBioCnt = 0;

export default class LGIN99M extends BaseModule {
		constructor(elem) {
			super(elem);
			
			[this.loginId, this.setLoginId]  				= this.useState('loginId', '');				// 생체인증id
			[this.wLoginId, this.setWloginId]  			= this.useState('wLoginId', '');			// 통합인증id
			[this.loginPw, this.setLoginPw]  				= this.useState('loginPw', '');	
			[this.loginPwView, this.setLoginPwView]	= this.useState('loginPwView', '');	
			[this.secureKey, this.setSecureKey]  		= this.useState('secureKey', '');			// 보안키패드 secureKey
			
			[this.usgYn, this.setUsgYn]  					= this.useState('usgYn', '');	
			
			[this.sessionId, this.setSessionId]  		= this.useState('sessionId', '');			// sessionId
			[this.toTime, this.setToTime]  				= this.useState('toTime', '');				// toTime

			[this.loginType, this.setLoginType]  		= this.useState('loginType', 'W');			// 로그인 방법 > B:생체로그인, W:통합로그인
			
			// start 임시 - 삭제영역 ##########################//
			[this.aloginId, this.setAloginId]  			= this.useState('aloginId', '');				// 임시id
			[this.aloginPw, this.setAloginPw]  			= this.useState('aloginPw', '');	
			// end 임시 - 삭제영역 ##########################//
			
	        /**
	         * nativeUtils.handleNativeResponse 로 응답 받은 내용을 eventDispatcher 통하여 전달 받음
	         * @param event
	         */
	        const handleNativeResponse = ( event ) => {
	            const response = event.detail;
	            console.log('handleNativeResponse!!!!!!!!: ' , response );

	            if ( response.command === 'callKeypadInputValue' ) {
	                const data = response.data;
	                const length = response.length;

	                console.log('data : ', data);
	                console.log('length : ', length);

	                if ( length ) {
	                    let ast = '';
	                    if ( length.indexOf('*') === -1 ) {
	                        const len = parseInt(length);
	                        ast = '*'.repeat(length);
	                    } else {
	                        ast = length;
	                    }

	                    console.log('ast : ', ast);

	                    this.setLoginPwView(ast);
	                }
	            } else if ( response.command === 'callKeypadDoneValue' ) {
					this.setLoginPw(response.data);
				}
	        }

			this.nativeCallback = handleNativeResponse;

	        // 응답 callback 함수 리스터 등록
	        NativeUtils.subscribe(handleNativeResponse);
		}

		init () {
			super.init(this);
			this.register();
		}
		
		async register () {
			console.log('#### 로그인 등록 register ####' );
			
			this.bind( 'loginId', $$('#login_id') , 'input');
			this.bind( 'wLoginId', $$('#wLogin_Id') , 'input');
			this.bind( 'loginPwView', $$('#login_pw') , 'input');

			// start 임시 - 삭제영역 ##########################//
			this.bind( 'aloginId', $$('#alogin_id') , 'input');
			this.bind( 'aloginPw', $$('#alogin_pw') , 'input');
			// end 임시 - 삭제영역 ##########################//
			
			
			
			const key = CmmUtils.getLocalStorageData("id_key"); 
			
			this.setLoginId(key.data);
			this.setWloginId(key.data);
			// start 임시 - 삭제영역 ##########################//
			this.setAloginId(key.data);
			// end 임시 - 삭제영역 ##########################//
			
			$('#loginId, #wLoginId, #alogin_id').on('blur', async (e) => await this.cookieCallBack(e));										// 사용자id 쿠키 설정  lginInput
			$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));				// X버튼 클릭시, 데이터 지움.

			$$('#login_pw').on('click', async (e) => await this.keypadOpen(e));								// 보안키패드
			
			const _this = this;
			$('button[name=btnLogin]').on('click', function() {
				const lginType = $(this).attr('id');
				
				if(lginType === 'btnWLogin') {	// 통합로그인
					_this.handleWLoginClick();	
				// start 임시 - 삭제영역 ##########################//
				} else if(lginType === 'btnALogin') {	
					_this.handleLoginClick('IM');	
				// end 임시 - 삭제영역 ##########################//
				} else {									// 통합로그인 외.
					_this.insertBioLogin();				// 생체로그인 등록 
				}
			});
			
			// 탭 선택시 화면 영역 컨트롤
			$('button[name=lginTab]').on('click', function() {
				const $parent = $(this).closest('li');
	            // 선택 탭 활성화
	            $parent.addClass('tab-active');
	            // 기존 탭 비활성화
	            $parent.siblings().removeClass('tab-active');
	            // 선택된 연관된 탭 패널 활성화
	            $('#' + $(this).attr('data-controls')).addClass('tab-active').attr({ 'aria-selected': 'true' });
	            // 기존 탭 패널 비활성화
	            $('#' + $(this).attr('data-controls')).siblings('.tabpanel').removeClass('tab-active').attr({ 'aria-selected': 'false' });
			})
			
			if ( EnvUtils.getOs() === 'AOS' ) {
				$('#btnIos').hide();
				$('#btnAnd').show();
            } else if ( EnvUtils.getOs() === 'iOS' ) {
            	$('#btnIos').show();
				$('#btnAnd').hide();
            }
			
			this.bioLogin();
		}
		
		/**
	     * 생체인증 로그인
	     * 1. 생체인증 사용가능 여부 확인 			> result > 0:사용가능, 1:사용불가
	     * 		1-1. 0:사용가능 - 생체인증 시도
	     * 		1-2. 1:사용불가 - 생체등록 설정 이동
	     * 2. 생체인증 시도 								> result > 0:성공, 1:실패
	     * 		2-1. 0:성공 - token 데이터 === CmmUtils.getLocalStorageData("token"); 확인
	     *  					> 같으면 data.id/data.password 로그인시도
	     *  					> 다르면 id로그인화면 이동??
	     *  	2-2. 1:실패 - 
	     * 3. 미등록이라면 생체인증 등록 > 설정
	    */
		async bioLogin() {
			console.log('#### 생체인증 ####' );
			// 생체인증 사용 가능여부 확인 
			const res = await NativeUtils.callBIOAvailable();

	        console.log('생체인증 사용가능 여부 res : ', res ); // data.result > 0:사용가능, 1:사용불가 .. message : Lock.... = 등록필요
	        	
        	if(res.result === '1') {		// 사용불가
				// 생체 등록 - 설정가기
				const result = await CmmUtils.confirm('', 'PB WON 앱은 생체로그인이 필수입니다. \n생체인증 미등록 시 PB WON 앱을 사용할 수 없습니다. \n생체 정보를 등록해주세요. ',{
					okLabel : '확인',
					noLabel : '취소'
				});
				
				if(result.resultCd === '999999') {
					NativeUtils.callAppFinish(); 		// 앱종료
				} else {
					// 설정으로 이동
					const setRes = await NativeUtils.callOpenSetting();
					console.log('설정으로 이동 res2 : ', setRes );
				}
	        }
		}
				
		/**
	     * 생체 등록 성공 후 로그인 정보를 확인 후 생체 인증 등록
	     * @param [String] id : 아이디
	     * @param [String] pw : 패스
	     * @param [String] scrKy :  보안키패드 키
	     */
		async insertBioLogin() {
			// 생체인증 사용 가능여부 확인 
			const res = await NativeUtils.callBIOAvailable();
			if(res.result === '1') {		// 사용불가
				const result = await CmmUtils.alert('', "등록된 생체 정보가 없습니다. <br>생체 정보를 등록해 주세요.", { 
		            btnLabel : '확인'
		        });
				// 설정으로 이동
				const setRes = await NativeUtils.callOpenSetting();
				console.log('설정으로 이동 res2 : ', setRes );
			}
			
			if(!this.loginId.value) {
				$$('#idForm').addClass('form-invalid');
				return false;
			} else if(!this.loginPwView.value) {
				$$('#pwForm').addClass('form-invalid'); 
				return false;
			}
			
			const lginRes = await this.handleLoginClick ('bio');
		}
		
		/**
	     * 보안키패드 오픈
         * @param title        [String] : 타이틀로 사용할 텍스트
         * @param keyboardType [String] : 사용할 키패드 종료 ( alpha )
         * @param keypadType   [String] : 키패드 사용
         * @param inputType    [String] 
         * @param nonce        [String] : 암호화를 위한 키값
	    */
		async keypadOpen(e) {
			console.log('보안키패드 open', EnvUtils.getOs());
			
			const openRes = await NativeUtils.callOpenKeypad('비밀번호 입력', '', '', '', '');
		}
		
 		
		/**
	    *  로그인 - 생체인증 로그인 임시.
	    * @param userId [string] : 사용자ID
	    */
		async handleLoginClick (data) {
			// start 임시 - 삭제영역 ##########################//
			if(data === 'IM') { 
				if(!this.aloginId.value) {
					$$('#idForm3').addClass('form-invalid');
					return false;
				} else if(!this.aloginPw.value) {
					$$('#pwForm3').addClass('form-invalid'); 
					return false;
				}
				
				this.setLoginId(this.aloginId.value);
				this.setLoginPw(this.aloginPw.value);
			}
			// start 임시 - 삭제영역 ##########################//
			
			const url = '/pb/api/lgin/login';
			const params = {};
			params.userId = this.loginId.value;
			params.userPwd = this.loginPw.value;
			// 우리통합로그인 여부("Y": 우리통합로그인, "N": ID/PW 로그인, "B": 생체인증로그인)
			if(data === "wlogin") {
				params.isFido = 'Y';
			} else if(data === "bio") {
				params.isFido = 'B'; 
				params.isCheck = 'Y';
				this.setLoginType('B');
			// start 임시 - 삭제영역 ##########################//
			} else if(data === 'IM') {	
				params.isFido = 'I'; 
			// end 임시 - 삭제영역 ##########################//
			} else {
				params.isFido = 'N';	
			}
			
			const res = await ApiUtils.sendPost(url, params);
			
			if(res.resultCode === "000000") {
				this.setUsgYn(res.data.lginInfo.usgYn);
                // session 정보 globalData에 저장
                GlobalApp.router.globalData.setData('userInfo', res.data.lginInfo);
                GlobalApp.router.globalData.setData('menuList', res.data.menuList);
			}
			// 로그인 정보 확인 완료 > 생체 정보를 등록
			if (res.resultCode === "000000" && this.loginType.value === "B" && res.data.lginSucc === "Y") { 
				// 생체 등록 및 로그인 시도
				const route = 'lgin20s';	
		    	const props = {
		    			loginId : this.loginId.value,
						loginPw : this.loginPw.value,
						usgYn : this.usgYn.value,
						type : 'BIO_INSERT'
	        	};
	        	router.navigate(route, props);
	        	
			} else if (res.resultCode === "000000" && this.loginType.value !== "B") {
				if (res.resultCode === "000000" && this.usgYn.value === "Y") {
					const route = 'mn10m';
					window.location.hash = route;
	            } else if (res.resultCode === "000000" && this.usgYn.value !== "Y") {
	            	const route = 'lgin50m';					//서비스이용약관
	            	window.location.hash = route;
            	}
			} else {
				
				const result = await CmmUtils.alert('', res.resultMessage, {
		            btnLabel : '확인'
		        });
				return false;
			}
		}
		
		/**
	    *  통합로그인 start
	    * @param 
	    */
		async handleWLoginClick() {
			if(!this.wLoginId.value) {
				$$('#idForm2').addClass('form-invalid');
				return false;
			}
			
			const url = '/pb/api/lgin/wloginStart';
			const params = {
					userId: this.wLoginId.value
			};
			
			const res = await ApiUtils.sendPost(url, params);
			
			console.log('======> ' + JSON.stringify(res));
			if(res.data.result === 'true') {
				this.setSessionId(res.data.session_id);
				this.setToTime(res.data.totime);
				
				const wlogin = await this.wLoginWait();
			} else {
				const result = await CmmUtils.alert('', res.data.msg, {
		            btnLabel : '확인'
		        });
				return false;
			}
		}
			
		/**
	    *  통합로그인 wait
	    * @param 
	    */
		async wLoginWait() {
			
			pollingObj = setTimeout(function() {
				pollingCnt++;
				// 제한시간이 지났을 경우
				if ( maxTime <= pollingCnt ) {
					const result = CmmUtils.alert('', "인증 시간이 만료되었습니다.", { 
			            btnLabel : '확인'
			        });
					return false;
				}

				const url = '/pb/api/lgin/wloginWait';
				const params = {
						userId : this.wLoginId.value,
						sessionId : this.sessionId.value,
						toTime : this.toTime.value
					}
				const res = ApiUtils.sendPost(url, params); 
				
				// 사용자가 모바일 승인
				if(res.data.code === '000.0') {	 						// 인증성공
					this.handleLoginClick('wlogin');	 					// 세션정보 가져오기
				} else if(res.data.code === '711.6') {
					// 사용자의 모바일 승인 대기
					pollingCnt = maxTime - res.data.resttime;
					this.wLoginWait();
				} else if(res.data.code === 'Z10.2') {				// 승인 취소
					const result = CmmUtils.alert('', "모바일 App에서 로그인을 취소하였습니다.", { 
			            btnLabel : '확인'
			        });
					clearTimeout(pollingObj);
					this.wLoginCancel(); 
				} else if(res.data.code === '711.8') {					// 모바일 승인 TimeOut
					const result = CmmUtils.alert('', "인증 시간이 종료되었습니다.", { 
			            btnLabel : '확인'
			        });
					this.wLoginCancel(); 
				} else {
					const msg = res.data.errmsg;
					if(msg === "") {
						msg = "요청하신 작업 처리 중 오류가 발생했습니다. 잠시 후, 다시 시도 하세요.";
					}
					const result = CmmUtils.alert('', msg, { 
			            btnLabel : '확인'
			        });
					clearTimeout(pollingObj);
					this.wLoginCancel(); 
				}
			}, 1000);
		}
		
		/**
	    *  통합로그인 wait
	    * @param 
	    */
		async wLoginCancel() {
			const url = '/pb/api/lgin/wloginCancel';
			const params = {
					userId : this.wLoginId.value,
					sessionId : this.sessionId.value
				}
			const res = ApiUtils.sendPost(url, params); 
			
			if(!res.data.result) {		// ############## 확인
				const result = CmmUtils.alert('', "에러", { 
		            btnLabel : '확인'
		        });
			}
		}
			
		/**
	    *  ID(행번) 저장
	    * @param 
	    */
		async cookieCallBack (e) {
			
			const inputId = $(e.target).attr('id');
			if(inputId === 'login_pw') {
				$$('#pwForm').removeClass('form-invalid');
				return false;
			} else if(inputId === 'login_id') {
				$$('#idForm').removeClass('form-invalid');
			} else if(inputId === 'wLogin_Id') {
				$$('#idForm2').removeClass('form-invalid');
			} else if(inputId === 'alogin_id') {
				$$('#idForm3').removeClass('form-invalid');
			} else if(inputId === 'alogin_pw') {
				$$('#pwForm3').removeClass('form-invalid');
				return false;
			}
			
			const inputVal = $('#' + inputId).val() === undefined ? '' : $('#' + inputId).val();
			
			CmmUtils.setLocalStorageData("id_key", inputVal); 
			const key = CmmUtils.getLocalStorageData("id_key"); 
			
			this.setLoginId(key.data);
			this.setWloginId(key.data);
			// start 임시 - 삭제영역 ##########################//
			this.setAloginId(key.data);
			// end 임시 - 삭제영역 ##########################//
			$$('.validate-text wLogin').text('');
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
			this.cookieCallBack(e);
		}
		
		destroy() {
			super.destroy(this);
			
	        NativeUtils.callCloseKeypad();
	        // 응답 callback 함수 리스터 해제
	        NativeUtils.unSubscribe(this.nativeCallback);
		}
}