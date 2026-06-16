/*************************************************************************
* @ 서비스경로 : INFPLS10M
* @ 파일명      : INFPLS10M  정보+ > TWO CHAIRS
* @ 화면ID	  : PBWIN000000
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-31            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;
export default class INFPLS10M extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		
		//[this.searchKey, this.setSearchKey]				= this.useState('searchKey', '');
	}
	
	init () {
		super.init(this);
		
		this.getSbscData();
		this.register();
	}
	
	register () {
		const pushSuccessCallback = () => {
			NativeUtils.callOpenSetting();
			$$('[type="checkbox"]').elements[0].checked = false;
		};
		
		const pushFailCallback = () => {
			$$('[type="checkbox"]').elements[0].checked = false;
		};
		
		const sbscCheckboxClick = async () => {
			const checked = event.currentTarget.checked;
			
			if (checked) {
				const NotiStt = await NativeUtils.callNotificationStatus();
				
				if (NotiStt.status === 'true') {
					this.setSbscData('Y');
				} else {
					$swal.fire02('Push 알림이 꺼져 있습니다. <br> 알림이 오지 않는다면, 휴대폰의 설정&gt;알림&gt;WON Click에서 알림을 허용해주세요.', 'caution', '예', true, '아니요', pushSuccessCallback, pushFailCallback);
				}
			} else {
				this.setSbscData('N');
			}
		};
		this.registerCallback('change', $$('input[type=checkbox]'), sbscCheckboxClick);
		
		const linkToClick = async () => {
			const linkURL = 'http://two-chairs.com/';
			
			const res = await NativeUtils.callLocalBrowser(linkURL);
		};
		this.registerCallback('click', $$('#linkTo'), linkToClick);
	}
	
	async setSbscData (sbscVal) {
		const url = '/api/userInfo/setSbscData.json';
		const params = {
			sbscCd : 'sbsc0003',
			sbscYn : sbscVal
		};
		const data = await ApiUtils.sendPost(url, params);
		if (!data.resultCode === '000000') {
			CmmUtils.alert('', '일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			});
			
			if (sbscVal === 'Y') {
				$$('[type="checkbox"]').elements[0].checked = false;
			} else {
				$$('[type="checkbox"]').elements[0].checked = true;
			}
		}
	}
	
	async getSbscData () {
		const url = '/api/userInfo/getSbscList.json';
		const params = {
			sbscCd : ['sbsc0003']
		};
		const data = await ApiUtils.sendPost(url, params);
		if (data.resultCode === '000000') {
			const sbscData = data.data.find(x => x.PBSBSCCD === 'sbsc0003');
			if (sbscData.PBSBSCYN === 'Y'){
				$$('[type="checkbox"]').elements[0].checked = true;
			} else {
				$$('[type="checkbox"]').elements[0].checked = false;
			}
		} else {
			CmmUtils.alert('', '일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			}).then(() => {
				if (globalApp.router.globalData.getData('userInfo')) {
					router.navigate('mn10m', {});
				} else {
					router.navigate('lgin40m', {originalUri: 'infpls10m'});
				}
			});
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}