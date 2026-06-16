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

export default class LGIN40M extends BaseModule {
	constructor(elem, data) {
		super(elem);

		// 생체로그인만 남기기위해 ul 처리
		const ul = document.getElementById('loginTypeTab');
		ul.style.display = 'none';

		[this.originalUri, this.setOriginalUri]			= this.useState('originalUri', '');
		
		if(Object.keys(data).length > 0) {
			if(data.hasOwnProperty('originalUri')) {
				const originalUri = data.originalUri;
				this.setOriginalUri(originalUri);		
				console.log('여기탐?= ', originalUri);
			}
		}
		
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
		let _this = this;
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

					_this.setLoginPwView(ast);

					if(length>=8) { //8자리 이상인 경우 '생체인증등록' 버튼 활성화
						this.biobtn(true);
						_this.setLoginPw(response.data);
					} else { // 8자리 미만인경우 '생체인증등록' 버튼 비활성화
						this.biobtn(false);
					}
				}
			} else if ( response.command === 'callKeypadDoneValue' ) {
				// 버튼 활성화
				this.biobtn(true);

				_this.setLoginPw(response.data);

				_this.handleLoginClick ('bio', true);
			}
		}

		this.nativeCallback = handleNativeResponse;
		if ( EnvUtils.getOs() !== 'PC' ) {
			// 응답 callback 함수 리스터 등록
			NativeUtils.subscribe(handleNativeResponse);
		}

		/**
		 * 2025-05-19 : [ Aiden ] 타블렛 관련 로직이 생겨 수정
		 * 운영인 경우에 다른 로그인 수단을 숨긴다.
		 * 
		 * 
		 */
		const local = [0, 1, 2];
		const dev = [0, 1, 2];
		const prd = [0];
		const prdTablet = [1];
		let currEnv = [];
		const liAry = ul.querySelectorAll('li');

		if ( EnvUtils.isPrd() ) {
			console.log('****************remove tab!!!!');
			currEnv = EnvUtils.isTablet() ? prdTablet : prd;
		} else if ( EnvUtils.isDev() ) {
			currEnv = dev;
		} else {
			currEnv = local;
		}
		
		for( let i = 0 ; i < liAry.length; i++ ) {
			// 2025-05-19 : [ Aiden ] 타블렛인 경우 기울기 확인
			
			if(currEnv.indexOf(i) == -1){
				ul.removeChild(liAry[i]);
			}
		}

		if( EnvUtils.isTablet() ){
			this.changeOrientation();
			$("#loginTypeTab .tab").removeClass("tab-active");
			$("#loginTypeTab .tab").eq(1).addClass("tab-active");
			$("#loginTypeTab .tab").eq(0).hide();
			// $("#loginTypeTab .tab").eq(2).hide();
			$(".tabpanel").removeClass("tab-active");
			$(".tabpanel").eq(0).hide();
			$(".tabpanel").eq(1).addClass("tab-active");
			// $(".tabpanel").eq(2).hide();
		}

		ul.style.display = '';

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

		// 토큰값이 있을 경우 로그인화면으로 이동
		const getToken = CmmUtils.getLocalStorageData("token");
		if(getToken.data !== null) {
			const route = 'lgin20s';						// 로그인
			let props = {};
			if(this.originalUri.value != '') {
				props = {
						originalUri : this.originalUri.value
				}
			}
			router.navigate(route, props);
		}

		const key = CmmUtils.getLocalStorageData("id_key");

		this.setLoginId(key.data);
		this.setWloginId(key.data);
		// start 임시 - 삭제영역 ##########################//
		this.setAloginId(key.data);

		// 키패드 내리기
		document.addEventListener('touchstart', function(event) {
			if(event.target.tagName !== 'INPUT') {
				document.activeElement.blur();
			}
		})
		// end 임시 - 삭제영역 ##########################//

		$('#loginId, #wLoginId, #alogin_id').on('focusout', async (e) => await this.cookieCallBack(e));										// 사용자id 쿠키 설정  lginInput
		$('.input-remove').on('click', async (e) => await this.handleInputDelClick(e));				// X버튼 클릭시, 데이터 지움.

		$$('#login_id').on('click', async (e) => await this.keypadClose(e));								// 보안키패드
		$$('#login_pw').on('click', async (e) => await this.keypadOpen(e));								// 보안키패드
		$$('.btnRm').on('click', async (e) => await this.moveRmApp(e));									// RM으로 가기

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
			$$('#btnIos').hide();
			$$('#btnAnd').css({'display' : 'flex'});

			$$('#btnAnd').prop('disabled', true);

		} else if ( EnvUtils.getOs() === 'iOS' ) {
			$$('#btnIos').css({'display' : 'flex'});
			$$('#btnAnd').hide();

			$$('#btnIos').prop('disabled', true);
		}

		if(!EnvUtils.isTablet()){
			this.bioLogin();
		}
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
			const result = await CmmUtils.alertWithIcon('', 'PB WON 앱은 생체로그인이 필수입니다. <br>생체인증 미등록 시 PB WON 앱을 사용할 수 없습니다. <br>생체 정보를 등록해주세요.',{
				okLabel : '확인',
				noLabel : '취소',
				icon : 'icon-locked'
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
			const result = await CmmUtils.alertWithIcon('', '등록된 생체 정보가 없습니다. <br>생체 정보를 등록해 주세요.',{
				okLabel : '확인',
				noLabel : '취소',
				icon : 'icon-locked'
			});
			if(result.resultCd === '999999') {
				return false;
			}
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
	 * 보안키패드 닫기
	 */
	async keypadClose(e) {
		console.log('보안키패드 close', EnvUtils.getOs());

		NativeUtils.callCloseKeypad();
	}

	/**
	 * RM으로 가기
	 */
	async moveRmApp(e) {
		const url = '/pb/api/lgin/logout';
		const params = {};
		const res = await ApiUtils.sendGet(url, params);
		if (res.resultCode === '000000') {
			NativeUtils.callSelectChannel('1');
		}
	}

	/**
	 *  로그인 - 생체인증 로그인 임시.
	 * @param userId [string] : 사용자ID
	 */
	async handleLoginClick (data, isAutoInputKeypad) {
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
			params.userId = this.wLoginId.value;
			params.isFido = 'Y';
		} else if(data === "bio") {
			params.isFido = 'B';
			params.isCheck = 'Y';
			this.setLoginType('B');
			if(isAutoInputKeypad === undefined || !isAutoInputKeypad) {
				NativeUtils.callDoneKeypad();
				return;
			}
			// start 임시 - 삭제영역 ##########################//
		} else if(data === 'IM') {
			params.isFido = 'I';
			// end 임시 - 삭제영역 ##########################//
		} else {
			params.isFido = 'N';
		}

		const res = await ApiUtils.sendPost(url, params);

		//
		if(res.resultCode === "000000") {
			CmmUtils.setLocalStorageData("id_key", this.loginId.value);

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
				type : 'BIO_INSERT',
				originalUri : this.originalUri.value
			};
			router.navigate(route, props);

		} else if (res.resultCode === "000000" && this.loginType.value !== "B") {
			if (res.resultCode === "000000" && this.usgYn.value === "Y") {
				let route = '';
				
				if(this.originalUri.value != '') {
					route = this.originalUri.value;
				}else {
					route = 'mn10m';
				}
				router.navigate(route);					
			} else if (res.resultCode === "000000" && this.usgYn.value !== "Y") {
				const route = 'lgin50m';					//서비스이용약관
				let props = {};
				
				if(this.originalUri.value != '') {
					props = {
							originalUri : this.originalUri.value
					}
				}
				router.navigate(route, props);
			}
		} else {
			const result = await CmmUtils.alertWithIcon('', res.resultMessage,{
				okLabel : '확인',
				icon : 'icon-locked'
			});
			
			if(data === "bio") {
				$$('#login_pw').value("");
				await this.biobtn(false);
				//await this.keypadOpen(null);
			}
			
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

		const res = await ApiUtils.sendPost(url, params, true);

		console.log('wloginStart : ', res);

		if(res.resultCode === '000000') {
			const resultJsonStr = res.data.result;
			const jsonObj       = JSON.parse(resultJsonStr);

			this.setSessionId(jsonObj.data.session_id);
			this.setToTime(jsonObj.data.totime);

			const wlogin = await this.wLoginWait();
		} else {
			CmmUtils.hideLoading();
			const result = await CmmUtils.alertWithIcon('', res.resultMsg,{
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

		const g = this;
		pollingObj = setTimeout(async function() {
			pollingCnt++;
			// 제한시간이 지났을 경우
			if ( maxTime <= pollingCnt ) {
				CmmUtils.hideLoading();
				const result = CmmUtils.alertWithIcon('', "인증 시간이 만료되었습니다.",{
					okLabel : '확인',
					icon : 'icon-locked'
				});
				return false;
			}

			const url = '/pb/api/lgin/wloginWait';
			const params = {
				userId : g.wLoginId.value,
				sessionId : g.sessionId.value,
				toTime : g.toTime.value
			}
			let res = await ApiUtils.sendPost(url, params, true, true);
			
			console.log('wloginWait res : ', res );

			if ( res.resultCode === '000000' ) {

				const resultJsonStr = res.data.result;
				const jsonObj       = JSON.parse(resultJsonStr);
				
				console.log('resJsonObj : ', jsonObj);

				// 사용자가 모바일 승인
				if(jsonObj.code === '000.0') {	 						// 인증성공
					g.handleLoginClick('wlogin');	 					// 세션정보 가져오기
				} else if(jsonObj.code === '711.6') {
					// 사용자의 모바일 승인 대기
					pollingCnt = maxTime - res.data.resttime;
					g.wLoginWait();
				} else if(jsonObj.code === 'Z10.2') {				// 승인 취소
					CmmUtils.hideLoading();
					const result = CmmUtils.alertWithIcon('', "모바일 App에서 로그인을 취소하였습니다.",{
						okLabel : '확인',
						icon : 'icon-locked'
					});
					clearTimeout(pollingObj);
					g.wLoginCancel();
				} else if(jsonObj.code === '711.8') {					// 모바일 승인 TimeOut
					const result = CmmUtils.alertWithIcon('', "인증 시간이 종료되었습니다.",{
						okLabel : '확인',
						icon : 'icon-locked'
					});
					g.wLoginCancel();
				} else {
					let msg = res.data.resultMessage;
					if(msg === "") {
						msg = "요청하신 작업 처리 중 오류가 발생했습니다. 잠시 후, 다시 시도 하세요.";
					}
					const result = CmmUtils.alertWithIcon('', msg,{
						okLabel : '확인',
						icon : 'icon-locked'
					});
					clearTimeout(pollingObj);
					g.wLoginCancel();
				}
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


	/**
	 * 디바이스 방향 확인
	 */
	async changeOrientation () {
		// const res = await NativeUtils.callChangeOrientation();
		// console.log("[ Aiden / NativeUtils.callChangeOrientation ] JSON.stringify(res) = ", JSON.stringify(res));
	}

	async biobtn(isOn) {
		if(isOn) { //'생체인증등록' 버튼 활성화
			if ( EnvUtils.getOs() === 'AOS' ) {
				$$('#btnAnd').removeAttr('aria-disabled');
				$$('#btnAnd').prop('disabled', false);
			} else if ( EnvUtils.getOs() === 'iOS' ) {
				$$('#btnIos').removeAttr('aria-disabled');
				$$('#btnIos').prop('disabled', false);
			}
		} else { // '생체인증등록' 버튼 비활성화
			if ( EnvUtils.getOs() === 'AOS' ) {
				$$('#btnAnd').addAttr('aria-disabled', true);
				$$('#btnAnd').prop('disabled', true);
			} else if ( EnvUtils.getOs() === 'iOS' ) {
				$$('#btnIos').addAttr('aria-disabled', true);
				$$('#btnIos').prop('disabled', true);
			}
		}
	}
	
	destroy() {
		super.destroy(this);

		if ( EnvUtils.getOs() !== 'PC' ) {
			NativeUtils.callCloseKeypad();
			// 응답 callback 함수 리스터 해제
			NativeUtils.unSubscribe(this.nativeCallback);
		}
	}
}