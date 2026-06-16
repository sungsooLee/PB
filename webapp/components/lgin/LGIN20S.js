/*************************************************************************
* @ 서비스경로 : LGIN20S
* @ 파일명      : LGIN20S.html 로그인
* @ 화면ID		: PBWLO020000
* @ 작성자      : 90194835
* @ 작성일      : 2025-02-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-21            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

let maxTime  = 60;
let pollingCnt = 0;				// polling 처리 진행 시간 (초)
let pollingObj = "";

export default class LGIN20S extends BaseModule {
		constructor(elem, data) {
			super(elem);

			// 생체로그인만 남기기위해 ul 처리
			const ul = document.getElementById('loginTypeTab');
			ul.style.display = 'none';
			
			[this.originalUri, this.setOriginalUri] = this.useState('originalUri', '');
			
			if(Object.keys(data).length > 0) {
				if(data.hasOwnProperty('originalUri')) {
					this.setOriginalUri(data.originalUri);
				}
			}
			
			[this.loginId, this.setLoginId]  				= this.useState('loginId', data.loginId);		// 생체인증id
			[this.wLoginId, this.setWloginId]  			= this.useState('wLoginId', data.loginId);		// 통합인증id
			[this.loginPw, this.setLoginPw]  				= this.useState('loginPw', data.loginPw);	
			[this.usgYn, this.setUsgYn]  					= this.useState('usgYn', data.usgYn);	
			
			[this.type, this.setType]  						= this.useState('type', data.type);				// BIO_INSERT : 생체인증등록 후 init 
			[this.hisToken, this.setHisToken]  			= this.useState('hisToken', '');					// 토큰
			[this.secureKey, this.setSecureKey]  		= this.useState('secureKey', '');					// 보안키패드 secureKey
			
			[this.sessionId, this.setSessionId]  		= this.useState('sessionId', '');			// sessionId
			[this.toTime, this.setToTime]  				= this.useState('toTime', '');				// toTime
			
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
	            }
	        }

			this.nativeCallback = handleNativeResponse;
			if ( EnvUtils.getOs() !== 'PC' ) {
				// 응답 callback 함수 리스터 등록
				NativeUtils.subscribe(this.nativeCallback);
			}

			// 운영인 경우에 다른 로그인 수단을 숨긴다.
			if ( EnvUtils.isPrd() ) {
				console.log('****************remove tab!!!!');
				const ul = document.getElementById('loginTypeTab');
				const liAry = ul.querySelectorAll('li');

				for( let i = liAry.length - 1 ; i > 0; i-- ) {
					ul.removeChild(liAry[i]);
				}
			}

			ul.style.display = '';
		}

		init () {
			super.init(this);
			this.register();
		}
		
		async register () {
			this.bind( 'loginId', $$('#login_id') , 'input');
			this.bind( 'wLoginId', $$('#wLogin_Id') , 'input');
			
			// start 임시 - 삭제영역 ##########################//
			this.bind( 'aloginId', $$('#alogin_id') , 'input');
			this.bind( 'aloginPw', $$('#alogin_pw') , 'input');
			// end 임시 - 삭제영역 ##########################//
			
//			if(!this.loginId.value) {
				const key = CmmUtils.getLocalStorageData("id_key"); 
				
				console.log('ID 확인 ::: ' + key.data);
				
				this.setLoginId(key.data);
				this.setWloginId(key.data);
				
				// start 임시 - 삭제영역 ##########################//
				this.setAloginId(key.data);
				// end 임시 - 삭제영역 ##########################//
//			}
			
			$('#loginId, #wLoginId, #alogin_id').on('focusout', async (e) => await this.cookieCallBack(e));	// 사용자id 쿠키 설정
			$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));					// X버튼 클릭시, 데이터 지움.
			$('input').on('click', async (e) => await this.handleFrmClick(e));										// 
			
			$('#btnReTry').on('click', async (e) => await this.tryLogin('bio'));									// 다시시도
			this.registerCallback('click', $$('#btnReSet'), this.resetLogin);										// 로그인 재설정
			
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
			
			const getToken = CmmUtils.getLocalStorageData("token"); 
			this.setHisToken(getToken.data);
			
    		console.log('getToken ################# : ', getToken.data );
    		
			if(getToken.data === null) {
				const route = 'lgin40m';						// 로그인
				let props = {};
				if(this.originalUri.value != '') {
					props = {
							originalUri: this.originalUri.value
					}
				}
				router.navigate(route, props);
//				return false;
			}
			
			if(this.type.value === "BIO_INSERT") {	// 생체인증 등록
				if(!EnvUtils.isLocal()) {
					this.tryBioInsert();
					return;
				}
			} else {
				if(!EnvUtils.isLocal()) {
					this.tryLogin('bio');
				}
			}
			
			// start 임시 - 삭제영역 ##########################//
			// 키패드 내리기
			document.addEventListener('touchstart', function(event) {
				if(event.target.tagName !== 'INPUT') {
					document.activeElement.blur();
				}
			})
			
			this.registerCallback('click', $$('#btnALogin'), this.imsiLogin);	
			// end 임시 - 삭제영역 ##########################//
			
			this.bioLogin(); 
		}
		
		// start 임시 - 삭제영역 ##########################//
		async imsiLogin() {
			if(!this.aloginId.value) {
				$$('#idForm3').addClass('form-invalid');
				return false;
			} else if(!this.aloginPw.value) {
				$$('#pwForm3').addClass('form-invalid');
				return false;
			}
			
			const url = '/pb/api/lgin/login';
			const params = {};
			params.userId = this.loginId.value;
			params.userPwd = this.loginPw.value;
			
			params.isFido = 'Y'; 

			const resSend = await ApiUtils.sendPost(url, params);
			
			 if (resSend.resultCode === "000000") {
				 CmmUtils.setLocalStorageData("id_key", this.loginId.value); 
				 
				 const usgYn = resSend.data.lginInfo.usgYn;
				 
                this.setUsgYn(usgYn);
                // session 정보 globalData에 저장
                GlobalApp.router.globalData.setData('userInfo', resSend.data.lginInfo);
                GlobalApp.router.globalData.setData('menuList', resSend.data.menuList);
			} 
			 if (resSend.resultCode === "000000" && this.usgYn.value === "Y") {
				let route = '';
				if(this.originalUri.value != '') {
					route = this.originalUri.value;
				}else {
					route = 'mn10m';					
				}
				router.navigate(route);
            } else if (resSend.resultCode === "000000" && this.usgYn.value !== "Y") {
            	const route = 'lgin50m';					//서비스이용약관
            	let props = {};
            	if(this.originalUri.value != '') {
            		props = {
            				originalUri: this.originalUri.value
            		}
            	}
            	router.navigate(route, props);
			} else {
				const result = await CmmUtils.alertWithIcon('', resSend.resultMessage,{
		            okLabel : '확인',
		            icon : 'icon-locked'
		        });
				
//				return false;
			}
		}
		// end 임시 - 삭제영역 ##########################//
		
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
				this.resetLogin();
	        }
		}
		
		/**
	    *  로그인재설정
	    * @param 
	    */
		async resetLogin() {			
			// 로그인 재설정이므로 토큰 초기화 로직 추가
			CmmUtils.setLocalStorageData('token','');
			
			const route = 'lgin40m'; 
			let props = {};
			if(this.originalUri.value !== '') {
				props = {
						originalUri : this.originalUri.value
				}
			}
			router.navigate(route, props);
		}
		
		/**
	    *  생체인증시도
	    * @param 
	    */
		async tryBioInsert() {
			let id = this.loginId.value;
			let type = '1'; 															// 0:로그인, 1:생체등록
  	
        	const res = await NativeUtils.callBIOAuth(id, type);		// 생체인증등록시도
        	
        	console.log('생체인증시도 20s  res : ', res );
        	if(res.result === '0') {				// 성공 
        		let pw = this.loginPw.value;
        		let secKey = await NativeUtils.getNonce(); 	// 보안키패드에서 가져온 secureKey 
    			this.setSecureKey(secKey);
    			
    			console.log('생체등록시 토큰 데이터 :: ' + res.token);
    			

    			CmmUtils.setLocalStorageData("token", res.token); 
        		
    			const insBioRes = await NativeUtils.callRegistSuccess(id, pw, this.secureKey.value);
        		
    			console.log('생체 등록 후 insBioRes : ', insBioRes );
    			
    			if(insBioRes.result === '0') { 			// 성공
					
					// 로그인 성공에 대한 처리
					NativeUtils.callLoginSuccess(this.loginId.value);

    				if(this.usgYn.value === "Y") {
    					let route = '';
    					if(this.originalUri.value != '') {
    						route = this.originalUri.value;
    					}else {
    						route = 'mn10m';    						
    					}
    					router.navigate(route);    						
    				} else if(this.usgYn.value !== "Y") {
    					const route = 'lgin50m';					//서비스이용약관
    					let props = {};
    					if(this.originalUri.value != '') {
    						props = {
    								originalUri : this.originalUri.value
    						}
    					}
    	            	router.navigate(route, props);
    				}
    			}
        	} else if(bioFirRes.result === '1') {	// 실패 
        		const result = await CmmUtils.alertWithIcon('', "생체 등록에 실패하였습니다. 다시 시도해 주세요.",{
		            okLabel : '확인',
		            icon : 'icon-locked'
		        });
				return false;
        	}
		}
		
		/**
		 *  로그인
		 * @param 
		 */
		async tryLogin(data) {
			if(!this.loginId.value) {
				$$('#idForm').addClass('form-invalid');
				return false;
			}
			
			let id = this.loginId.value;
			let type = '0'; 															// 0:로그인, 1:생체등록
  	
        	const res = await NativeUtils.callBIOAuth(id, type);		// 생체인증시도
			
			if(res.result === '0') {
				if(res.token === this.hisToken.value) {
					this.setLoginId(res.id);
        			this.setLoginPw(res.pw);
        			this.setSecureKey(res.secureKey);
				} else {
					const result = await CmmUtils.alertWithIcon('', "로그인 정보가 일치하지 않습니다. 다시 시도해 주세요.",{
			            okLabel : '확인',
			            icon : 'icon-locked'
			        });
					// 설정으로 이동
					const setRes = await NativeUtils.callOpenSetting();
//					return false;
				}
			} else if(res.result === '1') {			// 실패
				const result = await CmmUtils.alertWithIcon('', "로그인에 실패하였습니다. 다시 시도해 주세요.",{
		            okLabel : '확인',
		            icon : 'icon-locked'
		        });
				return false;
			}
			
			const url = '/pb/api/lgin/login';
			const params = {};
			params.userId = this.loginId.value;
			params.userPwd = this.loginPw.value;
			
			// 우리통합로그인 여부("Y": 우리통합로그인, "N": ID/PW 로그인, "B": 생체인증로그인)
			if(data === "wlogin") {
				params.isFido = 'Y';	
				params.userId = this.wLoginId.value;
			} else {
				params.isFido = 'B'; 
			}

			const resSend = await ApiUtils.sendPost(url, params);
			
			// 로그인 성공에 따른 후처리
			 if (resSend.resultCode === "000000") {
				CmmUtils.setLocalStorageData("id_key", this.loginId.value); 
                this.setUsgYn(resSend.data.lginInfo.usgYn);
                // session 정보 globalData에 저장
                GlobalApp.router.globalData.setData('userInfo', resSend.data.lginInfo);
                GlobalApp.router.globalData.setData('menuList', resSend.data.menuList);

                NativeUtils.callLoginSuccess(this.loginId.value);
			}
			 
			 
			if (resSend.resultCode === "000000" && this.usgYn.value === "Y") {
				let route = '';
				if(this.originalUri.value != '') {
					route = this.originalUri.value;
				}else {
					route = 'mn10m';					
				}
				router.navigate(route);
            } else if (resSend.resultCode === "000000" && this.usgYn.value !== "Y") {
            	const route = 'lgin50m';					//서비스이용약관
            	let props = {};
            	if(this.originalUri.value != '') {
            		props = {
            				originalUri : this.originalUri.value
            		}
            	}
            	router.navigate(route, props);
			} else {
				const result = await CmmUtils.alertWithIcon('', resSend.resultMessage,{
		            okLabel : '확인',
		            icon : 'icon-locked'
		        });
//				return false;
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
			
			if(res.data.result === 'true') {
				this.setSessionId(res.data.session_id);
				this.setToTime(res.data.totime);
				
				const wlogin = await this.wLoginWait();
			} else {
				const result = await CmmUtils.alertWithIcon('', res.data.msg,{
		            okLabel : '확인',
		            icon : 'icon-locked'
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
					const result = CmmUtils.alertWithIcon('', "인증 시간이 만료되었습니다.",{
			            okLabel : '확인',
			            icon : 'icon-locked'
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
					this.tryLogin('wlogin');	 								// 세션정보 가져오기
				} else if(res.data.code === '711.6') {
					// 사용자의 모바일 승인 대기
					pollingCnt = maxTime - res.data.resttime;
					this.wLoginWait();
				} else if(res.data.code === 'Z10.2') {				// 승인 취소
					const result = CmmUtils.alertWithIcon('', "모바일 App에서 로그인을 취소하였습니다.",{
			            okLabel : '확인',
			            icon : 'icon-locked'
			        });
					clearTimeout(pollingObj);
					this.wLoginCancel(); 
				} else if(res.data.code === '711.8') {					// 모바일 승인 TimeOut
					const result = CmmUtils.alertWithIcon('', "인증 시간이 종료되었습니다.",{
			            okLabel : '확인',
			            icon : 'icon-locked'
			        });
					this.wLoginCancel(); 
				} else {
					let msg = res.data.errmsg;
					if(msg === "") {
						msg = "요청하신 작업 처리 중 오류가 발생했습니다. 잠시 후, 다시 시도 하세요.";
					}
					const result = CmmUtils.alertWithIcon('', msg,{
			            okLabel : '확인',
			            icon : 'icon-locked'
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
				const result = await CmmUtils.alertWithIcon('', "에러",{
		            okLabel : '확인',
		            icon : 'icon-locked'
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
		
			this.setLoginId(inputVal);
			this.setWloginId(inputVal);
			// start 임시 - 삭제영역 ##########################//
			this.setAloginId(inputVal);
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
		}
		
		async handleFrmClick(e) {
			$$('#idForm').removeClass('form-invalid');
			$$('#idForm3').removeClass('form-invalid');
			$$('#pwForm3').removeClass('form-invalid');
		}
		
		destroy() {
			super.destroy(this);
			
//	        NativeUtils.callCloseKeypad();
	        // 응답 callback 함수 리스터 해제
			NativeUtils.unSubscribe(this.nativeCallback);
		}
}