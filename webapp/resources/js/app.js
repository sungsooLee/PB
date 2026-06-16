import InitUtils from './common/InitUtils.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// 최초로 router에 메뉴버튼 이벤트가 등록되었는지 여부 저장
globalApp.router.globalData.setData('router', {isRegist : false});

//console.log('appjs ===========================================>');
const pageParam = getQueryParam();
//console.log('pageParam ===========================================>', pageParam);

// ComPopUtils 초기화
const popupUtils = globalApp.popupUtils;

// router 초기화
const router = globalApp.router;
router.init(pageParam);

window.globalApp = globalApp;

let homeExitSec = 0;

//버튼 클릭 이벤트 감지
window.addEventListener("click", event => {
	if ( event.target.matches("[data-navigate]")) {
		
		const button = event.target;
		log.debug('button : ' , button);
		
		const val    = button.getAttribute('data-navigate').split('/')[1];
		log.debug('val : ' , val);
		
		//퍼블 페이지 이동
		if ( val === 'public') { 
			window.location.href = '/publish/index.html';
			return;
		}

		//차트 페이지 이동
		if ( val === 'chart') {
			window.location.href = '/ibchart/index.html';
			return;
		}
		
		
		router.navigate(val);
		event.preventDefault();
	}
});

if ( EnvUtils.getOs() === 'PC') {
	window.addEventListener('keydown', function(event) {
		const tag = event.target.tagName.toLowerCase();
		if (( event.key === 'Pause') || event.keyCode === 19 &&
		tag !== 'input' && tag!== 'textarea' && !isEditable ) {
			event.preventDefault();

			window.androidHistoryBack();
		}
	});
}

/**
 * 안드로이드 백버튼 감지
 * @param event
 */
const androidHistoryBack = () => {
	console.log("#####androidBackKeyCallback : ");

	// 전체 메뉴가 떠 있는 경우는 닫는다
	if ( $$('#menuModal').elements[0].classList.contains('is-open') ) {
		//console.log('MenuModal close start!!')
		MicroModal.close('menuModal');
		//console.log('MenuModal close end!!')
		return false;
	}

	//console.log('is Open : ', $$('#cmmModal').elements[0].classList.contains('is-open'));
	// 팝업이 떠있는 경우에 닫는다
	if ( $$('#cmmModal').elements[0].classList.contains('is-open') ) {
		//console.log('cmmModal close start!!')
		const curPath = globalApp.popupUtils.getCurPath();
		const curOptions = globalApp.popupUtils.getCurOptions();
		globalApp.popupUtils.closePopup(curPath, curOptions);
		console.log('cmmModal close end!!')
		return false;
	}

	// 기업조회 팝업이 떠있는 경우에 닫는다
	if ( $$('#modal-company') ) {
		if ( $$('#modal-company').elements[0].classList.contains('is-open') ) {
			//console.log('modal-company close start!!')
			MicroModal.close();
			//console.log('modal-company close end!!')
			return false;
		}
	} else {
		//console.log('modal-company popup not opened!');
	}

	// select bottom 팝업이 떠있는 경우에 닫는다.
	if ( $$('#selectModal') ) {
		if ( $$('#selectModal').elements[0].classList.contains('is-open') ) {
			//console.log('selectModal close start!!')
			MicroModal.close('selectModal');
			//console.log('selectModal close end!!')
			return false;
		}
	} else {
		//console.log('select popup not opened!');
	}


	// 기타 팝업이 떠있는 경우 닫는다.
	if ( $$('.micromodal-slide') && $$('.micromodal-slide').id !== null ) {
		if ( $$('.micromodal-slide').elements[0].classList.contains('is-open')) {
			//console.log('etc close start!!')
			MicroModal.close();
			console.log('etc close end!!')
			return false;
		}
	} else {
		//console.log('etc popup not opened!');
	}


	// 컨펌 또는 alert 창이 떠있는 경우에는 리턴한다.
	if ( $$('.swal2-container') ) {
		if ( $$('.swal2-container').elements.length > 0  ) {
			console.log('swal container close start!!');
			return false;
			//console.log('swal container close end!!');
		}
	} else {
		//console.log('swal popup not opened!');
	}

	const curHash = window.location.hash.slice(1);
	console.log('window.location.hash : ', curHash);
	
	// 홈화면 일때 뒤로가기 2초내 두번 누르는 경우 앱 종료
	if ( Const.HOME_PAGE.includes(curHash) ) {
		if(homeExitSec > 0) {
			NativeUtils.callAppFinish();
			return true;
		}	
		homeExitSec++;
		setTimeout(function () {
			homeExitSec = 0;
        }, 1500);
	}
	
	// 뒤로가기가 필요없거나, 홈인경우에는 리턴한다.
	if ( Const.BACKKEY_DISABLED_PAGE.includes(curHash) ) {
		console.log('except page!!');
		return true;
	}

	// 펀드 상세에서 뒤로가기로 목록으로 진입해야하는 경우
	// 이동할 목록 페이지를 찾아서 이동
	if( Const.BACK_SUB_PAGE.includes(curHash) ) {
		console.log('hashStack : ' , globalApp.router.hashStack);
		console.log('historyBackCnt : ' , globalApp.router.historyBackCnt);
		const len = globalApp.router.hashStack.length;
		const cnt = globalApp.router.historyBackCnt * -1;
		let count = 0;
		
		for ( let i = len ; i > 0 ; i-- ) {
			// 뒤로가기 카운트 만큼 스택에서 제거
			if ( cnt > count ) {
				globalApp.router.hashStack.pop();
				count++;
			} else {
				// 뒤로가기 카운트를 다 제거 했는데도 히스토리 스택에
				// 하위페이지가 적재되어 있는 경우에 추가로 제거한다.
				const len = globalApp.router.hashStack.length;
				const tmpHash = globalApp.router.hashStack[len - 1];
				console.log('tmpHash : ' , tmpHash);
				if ( tmpHash.endsWith('s')) {
					globalApp.router.hashStack.pop();
				}
			}
		}

		console.log('hashStack 2 : ' , globalApp.router.hashStack);

		const leng = globalApp.router.hashStack.length;
		const rtnHash = globalApp.router.hashStack[leng-1];
		return router.navigate(rtnHash);
	}

	if( Const.BACK_MAIN_PAGE.includes(curHash) ) {
		return router.navigate('mn10m');
	}

	// 이전 페이지로 이동한다.
	goBackSkip(globalApp.router.historyBackCnt);

}

// 안드로이드 전용 뒤로 가기
function goBackSkip ( steps ) {

	console.log('appjs goBackSkip!! : ', steps );
	let step = ( steps !== null && steps !== undefined)? steps : -1;

	console.log('hashStack : ' , globalApp.router.hashStack);

	let lastHash = globalApp.router.hashStack.pop();
	const currentHash = window.location.hash.slice(1);
	console.log('appjs history length : ' , history.length);
	console.log('lastHash : ' , lastHash);
	console.log('currentHash : ' , currentHash);

	console.log('appjs go step before : ' , step);

	//히스토리 이동
	history.go(step);
	console.log('appjs go step : ' , step);

	// popstate 이벤트 리스터 등록
	window.addEventListener('popstate', function checkHash() {
		const curHash = window.location.hash.slice(1);
		console.log('appjs curHash : ' , curHash);
		if ( curHash.endsWith('s')) {
			if ( Const.BACKKEY_CNT_INIT_PAGE.includes(curHash)) {
				window.removeEventListener('popstate', checkHash);
			}
			// if ( curHash === '#crmpmng40m'  ||  curHash === '#crmpmng41m' || curHash === '#ivinf10s'  ) {
			// 	// s로 끝나는 페이지 중 예외페이지 이벤트 리스터 제거
			// 	window.removeEventListener('popstate', checkHash);
			// } else {
			// 	// hash 가 s 로 끝나면 한단계 더 뒤로 이동
			// 	// history.go(-1);
			// }
		} else {
			console.log('lastHash : ' , lastHash);
			if ( lastHash && curHash === lastHash ) {
				console.log('history back!!');
				history.go(-2);
			}

			// 이벤트 리스터 제거
			window.removeEventListener('popstate', checkHash);
		}
	})
}

window.androidHistoryBack = androidHistoryBack;

function getQueryParam () {
	const urlParams = new URLSearchParams(window.location.search);
	const rtrnObj = {};

	for (const [key, value] of urlParams.entries()) {
		rtrnObj[key] = value;
	}

	//console.log('getQueryParam : ' , rtrnObj);
	// queryParam 추출한 후에 URL 삭제한다.
	window.history.replaceState({}, null, location.pathname);

	return rtrnObj;
}