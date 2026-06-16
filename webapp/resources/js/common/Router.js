import GlobalApp from '/components/cmm/GlobalApp.js';

class Router {
	constructor(Layouts, LayoutInfo, routes, moduleManager, globalData, listManager, contentElemId = 'app') {

		console.log('ROUTER init!!!!!!!!!!!!!!!!!!!!!!');
		this.historyBackCnt = 0;
		this.Layouts = Layouts;
		this.LayoutInfo = LayoutInfo;
		this.layoutContainer = $$('#wrap');
		this.curLayout = '';
		this.contentElem = null;
		this.routes = routes;
		this.moduleManager = moduleManager;
		this.listManager = listManager;
		this.globalData = globalData;			// 전역 데이터 객체
		this.state = {};						// 내부 상태 저장소
		this.historyStack = [];
		this.hashStack = [];
		this.context = null;
		this.startPage = '';
		this.pageParam = null;
		this.fvrtRegistered = false;
		this.homeRegistered = false;
		this.backRegistered = false;
		this.hashManualChanged = false;

		window.addEventListener("hashchange", (event) => this.handlerRouteChange(event));
	}
	
	async loadHtml ( path ) {
		return new Promise (async ( resolve, reject ) => {
			const response = await fetch(path);
			if ( !response.ok ) {
				reject('Failed to load HTML from ${path}');
			}

			resolve(response.text());
		});
	}
	
	async checkAlarm () {
		const res = await ApiUtils.sendPost('/api/ntbx/getArmRdYn.json', {});
		if (res.resultCode === '000000') {
			const armCnt = res.data.cnt || 0;
			GlobalApp.router.globalData.setData('chkArm', {armCnt : armCnt});
			console.log("#####chkArm.globalData", GlobalApp.router.globalData.getData('chkArm'));
		}
	}

	async handlerRouteChange ( event ) {

		log.debug('handlerRouteChange event =====> ' , window.location.hash);
		const hash = window.location.hash.slice(1);

		log.debug('handlerRouteChange hash =====> ' , hash);
		log.debug('handlerRouteChange event historyBackCnt before =====> ' , this.historyBackCnt);

		if ( hash.endsWith('s') || hash.startsWith('#crmpmng')) {
			if ( Const.BACKKEY_CNT_INIT_PAGE.includes(hash)) {
				this.historyBackCnt = 0;
			} else if (Const.BACKKEY_CNT_SECOND_PAGE.includes(hash)) {
				// 펀드상세 커뮤니티 페이지에 들어오면 무조건 historyCnt를 -1로 고정한다
				this.historyBackCnt = -1;
			} else {
				log.debug('minus historyBackCnt!!!: ', this.historyBackCnt);

				this.historyBackCnt--;
			}
			// if ( hash === '#crmpmng40m'  ||  hash === '#crmpmng41m' || hash === '#ivinf10s'
			// 	|| hash === '#ivinf20s' ) {
			// 	this.historyBackCnt = 0
			// } else {
			// 	log.debug('minus historyBackCnt!!!: ', this.historyBackCnt);
			//
			// 	this.historyBackCnt--;
			// }
		} else {
			this.historyBackCnt = (hash === 'mn10m')? 0 : -1;
		}

		log.debug('handlerRouteChange event historyBackCnt =====> ' , this.historyBackCnt);

		CmmUtils.showLoading();

		log.debug('handlerRouteChange event =======================================>: ' , event);

		log.debug('window.location.href: ' , window.location.href );
		log.debug('window.location.href split: ' , window.location.href.split('#')[1]);

		this.startPage = '';
		const token = CmmUtils.getLocalStorageData('token') ? CmmUtils.getLocalStorageData('token').data : null;
		if ( token ) {
			const userInfo = this.globalData.getData('userInfo');
			this.startPage = (userInfo)? 'mn10m' : 'lgin20s';
		} else {
			this.startPage = 'lgin40m';
		}

		if ( event === undefined && this.startPage.indexOf('lgin') > -1 ) {
			this.historyStack.push(this.startPage);
			this.hashStack.push(this.startPage);
			console.log('handlerRouteChange historyStack' , this.historyStack);
		}

		const route = window.location.hash.split('#')[1] || this.startPage;
		log.debug('route : ' , route);
		log.debug('route ary : ' , this.routes);
		
		const routeConfig = this.routes[route];
		const layoutInfo  = this.LayoutInfo[route];
		
		log.debug('routeConfig : ' , routeConfig);
		
		if ( routeConfig ) {

			const { module, basePath, htmlPath, layout} = routeConfig;

			log.debug('module : ' , module);
			log.debug('basePath : ' , basePath);
			log.debug('htmlPath : ' , htmlPath);
			log.debug('layout : ' , layout);

			//try {

				let oldUrl;
				if ( this.historyStack.length > 0 ) {

					console.log('=============== this.historyStack : ' , this.historyStack);

					oldUrl = this.historyStack.pop();

					console.log('=============== oldUrl 1 : ' , oldUrl);
					console.log('=============== window.location.hash : ' , window.location.hash.slice(1));
					console.log('=============== oldUrl 2 : ' , oldUrl);
				}

				// 기존 화면 정리
				this.moduleManager.unLoadModule(oldUrl);

				// 알림 유무 확인.
				if (GlobalApp.router.globalData.getData('userInfo')){
					console.log("#####chkArm", GlobalApp.router.globalData.getData('chkArm'));
					if (!GlobalApp.router.globalData.getData('chkArm')) {
						await this.checkAlarm();
					}
				}

				// 레이아웃 적용
				await this.applyLayout(layout, layoutInfo, htmlPath);

				// HTML 로드 및 삽입
				const htmlContent = await this.loadHtml(basePath + htmlPath);
				$$('.main-inner').find('.content').html(htmlContent);

				//스크롤 위로 이동
				$$(document.body).scrollToTop(0);

				console.log('this.pageParam  :  ', this.pageParam );
				// 푸시 이동 데이터가 있으면
				if ( this.pageParam ) {

					// 기존 전달할 파라미터가 있는 경우
					if ( this.state[route] ) {

						// 전달할 파라미터에 추가한다.
						const passParam = this.state[route];
						console.log('this.state[route] :  ', this.state[route]);

						for ( const [key, value] of Object.entries(this.pageParam)) {
							console.log('key :  ', key);
							console.log('value :  ', value);
							passParam[key] = value;
						};

						this.state[route] = passParam;

					} else {
						console.log('route :  ', route);
						console.log('this.state[route] :  ', this.state[route]);

						this.state[route] = {};
						for ( const [key, value] of Object.entries(this.pageParam)) {
							this.state[route][key] = value;
						}
					}
				}

				console.log('passParam :  ', this.state);

				// 모듈 초기화
				const moduleInstance = await this.moduleManager.loadModule(route, this.state[route] || {}, $$('.main-inner').find('.content').elements[0] );

				// 레이아웃 내에 버튼 클릭 이벤트 등록처리
				if ( moduleInstance && typeof moduleInstance.getButtonHandlers === 'function' ) {
					const buttonHandlers = moduleInstance.getButtonHandlers();
					this.connectLayoutHandlers(buttonHandlers);
				}

				this.hashStack.push(route);

		} else {
			console.warn('Route `${route}` not found.');
			await this.errContentLoad(); 
		}
	}
	
	/**
	 * 특정 라우트로 이동
	 * @param {*} route  [String] : 이동할 라우트
	 * @param {*} params [Object] : 전달할 파라미터
	 * @param {*} isHistoryStack [Object] : 히스토리 쌓지 않기
	 */
	async navigate ( route, params = {}, isHistoryStack = true) {

		console.log('==============> navigate curPage : ', window.location.hash);
		console.log('route : ', route);

		// 동일 라우터인 경우 이동 하기 막는다.
		if ( route === window.location.hash.slice(1)) {
		}

		const result = await ApiUtils.sendPost('/api/cmm/insertMenuVstpeLog.json', {route:route}, true, true);
		
		if (result.resultCode !== "000000") {
			console.warn('insertMenuVstpeLog Error' + result.resultMessage);
		} 
		
		this.state[route] = params;
		window.location.hash = route;

		console.log('==============> historyStack 1: ', this.historyStack);

		if(isHistoryStack) {
			// 히스토리 스택에 페이지명 저장
			this.historyStack.push(route);
		}

		console.log('==============> historyStack 2: ', this.historyStack);

		// const event= {
		// 	oldURL : window.location.href,
		// 	isBackBtnPressed : true
		// }
		//
		// console.log('navigate  event : ' , event);
		//
		// const curUrl = window.location.href.split('#')[0] + '#' + route;
		// console.log('navigate  curUrl : ' , curUrl);
		//
		// window.history.replaceState(null, '', curUrl);
		// this.handlerRouteChange(event);
	}
	

    
	
	/**
	 * 레이아웃 적용
	 * @param {*} layout [String] : 레이아웃 코드 ( 'basic', 'layoutWithHeader', 'layoutWithBottom' ) [필수]
	 * @param {*} layout [Object] : 레이아웃 버튼 정보 {												 [선택]
	 *     												btn1Label [String] : btn1의 라벨명
	 *     											    btn2Label [String] : btn2의 라벨명
	 *     											    btn1Class [String] : btn1의 클래스
	 *     											    btn2Class [String] : btn2의 클래스
	 *     											    iconClass [String] : icon이 있는 경우 icon의 클래스
	 * }
	 * @param [String] htmlPath : html 파일명
	 * */
	async applyLayout ( layout, layoutInfo, htmlPath ) {

		log.debug('layoutInfo : ' , layoutInfo);

		// 이전 페이지 레이아웃과 같지 않으면 레이아웃을 변경한다.
		if ( ! CmmUtils.isEmpty( this.curLayout) && this.curLayout !== layout ) {
			console.log('change Layout!!');
			// 기존 레이아웃 버튼 div를 숨긴다.
			$$('#layoutBtnDiv').hide();

			this.contentElem   = $$(".main-inner");

			this.curLayout = layout;
			log.debug('contentElem : ' , this.contentElem);

		}
		// else {
		//
		// 	// 레이아웃 타입에 따라 버튼 영역을 처리한다.
		// 	this.setLayoutBtn(layout, layoutInfo);
		// }

		// 레이아웃 타입에 따라 버튼 영역을 처리한다.
		this.setLayoutBtn(layout, layoutInfo);

		// 헤더 세팅
		this.setLayoutHeader(layout, htmlPath);

		// 헤더 버튼 이벤트 세팅
		this.setHeaderBtnEvent(layout, htmlPath);

		if (layout !== 'main') {
			// 헤더의 타이트명 변경
			this.setHeaderTitle();
		}
		
	}

	/**
	 *  헤더 내에 버튼에 보이기/숨기기
	 * @param layout
	 */
	setLayoutHeader ( layout, htmlPath ) {

		console.log('setLayoutHeader layout : ' , layout);

		if ( layout === 'main') {
			$$('#backBtn').hide();
			$$('#homeBtn').css({display: 'flex'});
			$$('#mainHeaderTitle').show();
			$$('#basicHeaderTitle').text('');
			$$('#fvrtBtn').hide();
			$$('#menuBtn').css({display: 'flex'});
		} else {
			// 메인 제외하고 하위 뎁스는 전부 상단 메뉴 안보이게 처리
			// 2025-03-31 처리 *현업요청
			$$('#menuBtn').hide();
			console.log('setLayoutHeader html : ' , htmlPath);
			console.log('html fnd indexOf : ' , htmlPath.indexOf('FND') > -1);

			if ( htmlPath.indexOf('FND') > -1 && htmlPath.indexOf('FND60M') < 0) {
				$$('#fvrtBtn').css({display: 'flex'});
			} else {
				$$('#fvrtBtn').hide();
			}

			$$('#backBtn').addAttr('aria-label', '뒤로 가기');
			$$('#backBtn').css({display : 'flex'});
			$$('#homeBtn').hide();
			$$('#mainHeaderTitle').hide();
			$$('#basicHeaderTitle').show();
		}
	}

	/**
	 * 헤더 타이틀 명 변경
	 */
	setHeaderTitle () {
		console.log('title : ' , this.routes[window.location.hash.slice(1)||this.startPage].title);
		$$('#basicHeaderTitle').text(this.routes[window.location.hash.slice(1)||this.startPage].title);
	}

	/**
	 * 레이아웃 내에 버튼 보이기/숨기기
	 * @param layout
	 * @param layoutInfo
	 */
	setLayoutBtn ( layout, layoutInfo ) {

		console.log('setLayoutBtn : ' , layout);
		console.log('setLayoutBtn layoutInfo : ' , layoutInfo);

		switch ( layout ) {

			case this.Layouts.BASIC.id :
				$$('.main-header').show();
				$$('#layoutBtnDiv').hide();
				$$('#aiCnslBtnDiv').hide();
				$$('#fncNewsBtnDiv').hide();
				$$('#mainBtnDiv').hide();
				break;

			case this.Layouts.SINGLE.id :
				$$('.main-header').hide();
				$$('#layoutBtnDiv').hide();
				$$('#aiCnslBtnDiv').hide();
				$$('#fncNewsBtnDiv').hide();
				$$('#mainBtnDiv').hide();
				break;

			case this.Layouts.BOTTOM.id :
			case this.Layouts.SINGLE_WITH_BOTTOM.id :

				if ( layout === this.Layouts.SINGLE_WITH_BOTTOM.id ) {
					$$('.main-header').hide();
				} else {
					$$('.main-header').show();
				}

				// Bottom에 버튼영역이 있는 layout
				$$('#layoutBtnDiv').show();
				$$('#aiCnslBtnDiv').hide();
				$$('#fncNewsBtnDiv').hide();
				$$('#mainBtnDiv').hide();
				
				//버튼 보이기/숨기기기
				if ( layoutInfo ) {
					if ( layoutInfo.btn1Label ) {
						$$('#layoutBtn1').text(layoutInfo.btn1Label);

						//버튼이 disabled 되어 있다면 해제 한다.
						$$('#layoutBtn1').removeAttr('aria-disabled');

						( layoutInfo.btn1Class )? $$('#layoutBtn1').addClass(layoutInfo.btn1Class)
												: $$('#layoutBtn1').addClass('btn-primary');

						$$('#layoutBtn1').show();
					} else {
						$$('#layoutBtn1').hide();
					}

					if ( layoutInfo.btn2Label ) {
						$$('#layoutBtn2').text('');

						//버튼이 disabled 되어 있다면 해제 한다.
						$$('#layoutBtn2').removeAttr('aria-disabled');

						if ( layoutInfo.btn2Class ) {
							$$('#layoutBtn2').addClass(layoutInfo.btn2Class);
						} else {
							$$('#layoutBtn2').removeAllClass();
							$$('#layoutBtn2').addClass('btn-large');
							$$('#layoutBtn2').addClass('btn-primary');
						}

						if ( layoutInfo.iconClass ) {
							const icon = document.createElement('i');
							icon.classList.add(layoutInfo.iconClass);
							$$('#layoutBtn2').append(icon).append(layoutInfo.btn2Label);
						} else {
							$$('#layoutBtn2').append(layoutInfo.btn2Label);
						}
					}
				}

				break;

			case this.Layouts.MAIN.id :
				$$('.main-header').show();
				$$('#mainBtnDiv').show();
				$$('#layoutBtnDiv').hide();
				$$('#aiCnslBtnDiv').hide();
				$$('#fncNewsBtnDiv').hide();
				
				//버튼 세팅
				this.setMainBottomButtons();
				
				break;

			case this.Layouts.AI.id :
				$$('.main-header').show();
				$$('#layoutBtnDiv').hide();
				$$('#mainBtnDiv').hide();
				// $$('#aiCnslBtnDiv').show();
				$$('#fncNewsBtnDiv').hide();
				$$('#quesInput').addAttr('placeholder','궁금하신 사항을 질문하세요.');
				$$('#sendBtn').text('확인');
				
				break;
				
			case this.Layouts.FNCNEWS.id :
				$$('.main-header').show();
				$$('#layoutBtnDiv').hide();
				$$('#mainBtnDiv').hide();
				$$('#aiCnslBtnDiv').hide();
				$$('#fncNewsBtnDiv').show();
				$$('#ttsPause').hide();
				$$('#playerTxt').html('금융뉴스<span class="blind">읽어주기</span>');
				break;
				

			default :
				$$('#layoutBtnDiv').hide();
				break;

		}
	}


	/**
	 * 레이아웃 헤더 내에 버튼 이벤트 등록
	 * @param{*} layout [String] : 레이아웃 타입
	 */
	setHeaderBtnEvent ( layout , htmlPath) {
		
		log.debug('layoutBtnEventRegist layout : ' , layout);

		const gotoHome = () => {
			log.debug('gotohome!!');
			this.navigate('mn10m');
		}

		const fvrtBtnClick = () => {
			log.debug('gotoFvrt!!');
			this.navigate('fnd60m');
		}

		const isRegistObj = GlobalApp.router.globalData.getData('router');

		if ( layout === 'main') {
			if ( isRegistObj !== null ) {
				if ( !isRegistObj.homeEventRegist ) {
					$$('#homeBtn').on('click', gotoHome);
					GlobalApp.router.globalData.setData('router', {homeEventRegist : true});
				}
			}

			//$$('#backBtn').off('click');
			$$('#fvrtBtn').off('click');
			this.fvrtRegistered = false;
		} else {
			console.log("#####this.fvrtRegistered", this.fvrtRegistered);


			if (  htmlPath.indexOf('FND') > -1 && ! this.fvrtRegistered ) {
				console.log("#####this.fvrtRegistered on!!!!");
				$$('#fvrtBtn').on('click', fvrtBtnClick);
				this.fvrtRegistered = true;
			} else if (  htmlPath.indexOf('FND') === -1 ){
				console.log("#####this.fvrtRegistered off!!!!");
				$$('#fvrtBtn').off('click');
				this.fvrtRegistered = false;
			}

			if ( isRegistObj !== null ) {
				//$$('#homeBtn').off('click');
				if ( !isRegistObj.backEventRegist ) {
					$$('#backBtn').on('click', () => {this.historyBack(this.historyBackCnt)});
					GlobalApp.router.globalData.setData('router', {backEventRegist : true});
				}
			}
		}

		console.log("#####menuBtn set", this.comPopUtils);
		
		
		/**
		 * 전체메뉴 callback
		*/
		
		const menuBtnClick = () => {
			console.log("[ Aiden ] #####menuBtn clicked");
			if (GlobalApp.router.globalData.getData('userInfo') === null || GlobalApp.router.globalData.getData('menuList') === null) {
				this.navigate('lgin40m', {});
			} else {
				GlobalApp.popupUtils.openMenuModal({
					onCallback : (result) => {
						if (result.resultMsg === 'goMenu') {
							let linkURL = result.linkURL;
							if (result.menuNo === '35') {
								const userInfo = GlobalApp.router.globalData.getData('userInfo');
								if (userInfo.prlmEno || userInfo.empNm || userInfo.deptNm) {
									const prlmEno = encodeURIComponent(userInfo.prlmEno);
									const empNm = encodeURIComponent(userInfo.empNm);
									const deptNm = encodeURIComponent(userInfo.deptNm);
									
									linkURL = linkURL.replace('&cmUserNo=&', '&cmUserNo='+prlmEno+'&').replace('&cmName=&', '&cmName='+empNm+'&').replace('&cmDNm=&', '&cmDNm='+deptNm+'&');
								}
							}

							//MicroModal.close('menuModal');
							if (result.linkCctn === '1') {
								this.navigate(linkURL);
							}
							if (result.linkCctn === '2') {
								if (result.linkDscd === '1') {
									NativeUtils.callLocalBrowser(linkURL);
								} else {
									NativeUtils.callOpenWindowWithURL(linkURL);
								}
							}
						} else if (result.resultMsg === 'error') {
							MicroModal.close('menuModal');
						}
					},
					onHome : (result) => {
						this.navigate('mn10m', {});
					},
					onClose : (result) => {
					}
				});
			}
		}
		
		if ( isRegistObj !== null ) {
			if ( !isRegistObj.isRegist ) {
				$$('#menuBtn').on('click', () => menuBtnClick());
				GlobalApp.router.globalData.setData('router', {isRegist : true});
			}
		}
	}

	/**
	 * 메인 레이아웃 바텀 네이게이션 버튼 세팅
	 */
	setMainBottomButtons () {

		console.log('setMainBottomButtons event Registed : ' , this.state['btmBtnEventRegisted']);

		const movePage = ( type ) => {
			if ( type === 'btnHome' ) {
				this.navigate('mn10m');
			} else if ( type === 'btnInvInf') {
				this.navigate('ivinf10s');
			} else if ( type === 'btnFund') {
				this.navigate('etf01m');
			} else if ( type === 'btnFnc' ) {
				this.navigate('fncpls10m');
			} else if ( type === 'btnNoti' ) {
				this.navigate('ntbx10m');
			}
		}

		// 텍스트 세팅
		Const.BottomNavi.LABEL_BTN_ARY.forEach((btn, index) => {
			$$('#' + btn).find('strong').text(Const.BottomNavi.LABEL_TXT_ARY[index]);

			// 현재 선택 메뉴 세팅
			console.log('window.location.hash : ', window.location.hash.slice(1).toUpperCase());
			console.log('Const.BottomNavi.PATH[index] : ', Const.BottomNavi.PATH[index]);
			if ( window.location.hash.slice(1).toUpperCase() === Const.BottomNavi.PATH[index]) {
				$$('#' + btn).addClass('is-current');
				$('#' + btn).closest('li').children('a').attr('aria-current', 'page');
			} else {
				$$('#' + btn).removeClass('is-current');
				$('#' + btn).closest('li').children('a').removeAttr('aria-current');
			}

			// 버튼 이벤트 등록이 안되어 있는 경우
			if ( ! this.state['btmBtnEventRegisted']) {

				if( btn === 'btnHome' ||  btn === 'btnInvInf'  ||  btn === 'btnFund' || btn === 'btnFnc' || btn === 'btnNoti') {
					$$('#' + btn).on('click', () => movePage(btn));
				} else {
					// 이동 이벤트 등록
					$$('#' + btn).on('click', () => CmmUtils.alert('', '현재 메뉴는 준비중입니다.', {}));
				}

				if ( index === 4 ) {
					// 버튼 이벤트 중복방지를 위해 등록 상태 변경
					this.state['btmBtnEventRegisted'] = true;
				}
			}
		});

		// TODO 알림 상태 세팅
		if (GlobalApp.router.globalData.getData('chkArm')) {
			const armCnt = GlobalApp.router.globalData.getData('chkArm').armCnt || 0;
			if (armCnt > 0) {
				$$('#btnNoti').addClass('not-read');
				$$('#btnNoti').addAttr('aria-label', '알림 있음');
			}
		}
	}



	/**
	 * 레이아웃의 버튼과 모듈 핸들러 연결 ( deprecated )
	 * @param {*} buttonHandlers [Object] 버튼 ID와 핸들러 매핑 객체
	 */
	connectLayoutHandlers(buttonHandlers = {}) {
		Object.keys(buttonHandlers).forEach((buttonId) => {
			const button = $$('#' + buttonId);
			if ( button && typeof buttonHandlers[buttonId] === 'function') {
				$$(button).on('click', buttonHandlers[buttonId]);
			}
		})
	}

	/**
	 * 홈으로 이동
	 */
	gotoHome () {

		console.log('gotoHome : ', this.context);
		console.log(this.context.navigate);
		this.navigate('home');
	}

	/**
	 * 네이게이터용 뒤로가기 버튼 callback
	 */
	historyBack (historyBackCnt) {
		//history.back();
		console.log('historyBack :', historyBackCnt);
		this.goBackSkip(historyBackCnt);
	}

	/**
	 * 네이게이터용 뒤로가기
	 * @param steps
	 */
	goBackSkip ( steps ) {
		console.log('router goBackSkip!! : ', window.location.hash);
		
		const curHash = window.location.hash.slice(1);

		if( Const.BACK_MAIN_PAGE.includes(curHash) ) {
			return this.navigate('mn10m');
		} else if( 'fncpls60m'.includes(curHash) || 'fncpls61m'.includes(curHash)) {
			return this.navigate('menu14s');
		} else {
			let step = steps || -1;

			//히스토리 이동
			history.go(step);
			console.log('router go step : ' , step);

			this.hashStack.pop();
			
			// popstate 이벤트 리스터 등록
			window.addEventListener('popstate', function checkHash() {
				console.log('curHash : ' , curHash);
				if ( curHash.endsWith('s') || curHash.startsWith('crmpmng') ) {
					if ( Const.BACKKEY_CNT_INIT_PAGE.includes(curHash)) {
						// s로 끝나는 페이지 중 예외페이지 이벤트 리스터 제거
						window.removeEventListener('popstate', checkHash);
					}
				} else {
					// 이벤트 리스터 제거
					window.removeEventListener('popstate', checkHash);
				}
			})
		}
	}

	
	async errContentLoad () {
		const errRoute = this.routes['404'];
		const { module, params = {}, basePath, htmlPath } = errRoute;
		const errContent = await this.loadHtml(basePath + htmlPath);
		
		log.debug('errContent : ' , errContent);
		
		this.contentElem.innerHTML = errContent;
	}

	/**
	 * 라우터 초기화
	 */
	async init ( pageParam ) {
		this.state['btmBtnEventRegisted'] = false;
		if ( pageParam ) {
			this.pageParam = pageParam;
		}

		await this.handlerRouteChange();

	}
	
}

export default Router;