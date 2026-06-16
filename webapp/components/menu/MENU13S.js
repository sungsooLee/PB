/*************************************************************************
* @ 서비스경로 : MENU13S
* @ 파일명      : MENU13S  [P] 전체 메뉴 > 구독 설정
* @ 화면ID	  : PBWME010000
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class MENU13S extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
		
		[this.sbscList, this.setSbscList]	= this.useState('sbscList', []);
		[this.sbscId, this.setSbscId]		= this.useState('sbscId', '');
	}
	
	init () {
		console.log("####MENU13S#####init");
		super.init(this);
		
		this.getSbscData();
		this.register();
	}
	
	register () {
		const pushFailCallback = () => {
			$$('#'+this.sbscId.value).elements[0].checked = false;
		}
		
		const pushCallback = () => {
			// 단말 설정 App으로 이동
			NativeUtils.callOpenSetting();
			$$('#'+this.sbscId.value).elements[0].checked = false;
		}
		
		const sbscCheckboxClick = async () => {
			console.log("#####sbscCheckboxClick", event.currentTarget.id);
			console.log("#####sbscCheckboxClick", event.currentTarget.checked);
			
			const checked = event.currentTarget.checked;
			const sbscId = event.currentTarget.id;
			this.setSbscId(sbscId);
			
			if (checked) {
				if ( EnvUtils.isPrd() ) {
					// 단말의 알림 허용 상태 체크
					let resNotiStt = await NativeUtils.callNotificationStatus();	// return 값에서 상태값 확인. : text / true/false
					
					// 알림 설정 상태
					if (resNotiStt.status === 'true') {
						this.setSbscData(sbscId, 'Y');
					} else {
						// 푸시 알림 설정 팝업
						$swal.fire02('Push 알림이 꺼져 있습니다. <br> 알림이 오지 않는다면, 휴대폰의 설정&gt;알림&gt;WON Click에서 알림을 허용해주세요.', 'caution', '예', true, '아니요', pushCallback, pushFailCallback);
					}
				} else {
					this.setSbscData(sbscId, 'Y');
				}
			} else {
				this.setSbscData(sbscId, 'N');
			}
		}
		const checkboxs = {elements : [$$('#sbsc0001').elements[0], $$('#sbsc0002').elements[0], $$('#sbsc0003').elements[0], $$('#sbsc0004').elements[0]]};
		const checkboxCallbacks = [sbscCheckboxClick, sbscCheckboxClick, sbscCheckboxClick, sbscCheckboxClick];
		this.registerCallback('click', checkboxs, checkboxCallbacks);
		
		const menuList = Object.values(GlobalApp.router.globalData.getData('menuList'));
		const isExistSafeScript = menuList.some(item => item.PBLINKURL === "safeBoard01m");
		console.log("---isExistSafeScript : " + isExistSafeScript);
		if(!isExistSafeScript) {
			$$('#safeScriptAlim').hide();
		}
	}
	
	async setSbscData (sbscId, sbscVal) {
		const url = '/api/userInfo/setSbscData.json';
		const params = {
			sbscCd : sbscId,
			sbscYn : sbscVal
		};
		
		const data = await ApiUtils.sendPost(url, params);
		if (data.resultCode === '000000') {
			
		}
	}
	
	async getSbscData () {
		const url = '/api/userInfo/getSbscList.json';
		const params = {
			sbscCd : ['sbsc0001', 'sbsc0002', 'sbsc0003', 'sbsc0004']
		};
		
		const data = await ApiUtils.sendPost(url, params);
		console.log("######getSbscData", data);
		if (data.resultCode === '000000') {
			this.setSbscList(data.data);
			
			this.drawSbscData();
		}
	}
	
	drawSbscData () {
		const sbscList = this.sbscList.value;
		
		sbscList.forEach((item) => {
			if (item.PBSBSCYN === 'Y') {
				$$('#'+item.PBSBSCCD).elements[0].checked = true;
			} else {
				$$('#'+item.PBSBSCCD).elements[0].checked = false;
			}
		})
	}
	
	destroy () {
		super.destroy(this);
	}
}