/*************************************************************************
* @ 서비스경로 : NTBX10M
* @ 파일명      : NTBX10M  메인 > [T] 알림함
* @ 화면ID	  : PBWMA030000
* @ 작성자      : 90196258
* @ 작성일      : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import ListManager from '../../resources/js/common/ListManager.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;
export default class NTBX10M extends BaseModule {
	constructor (elem) {
		super(elem);
		
		this.rootElem = elem;
		this.listManager = null;
		this.eventReceiver = new EventTarget();
	}
	
	init () {
		super.init(this);
		
		this.getArmList();
		
		this.register();
	}
	
	register () {
		
	}
	
	async setAlmRdYn (readList) {
		const url = '/api/ntbx/setArmRdYn.json';
		const params = {
			umsPushSrno : readList
		};
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === '000000') {
			GlobalApp.router.globalData.setData('chkArm', {armCnt : 0});
			console.log('######chkArm-ntbx10m', GlobalApp.router.globalData.getData('chkArm'));
			$$('#btnNoti').removeAttr('aria-label');
			$$('#btnNoti').removeClass('not-read');
		} else {
			CmmUtils.alert('', '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			});
			$$('#noData').addAttr('style', 'display:flex;');
		}
	}
	
	/*onItemAction (event) {
		const { id, action, status } = event.detail;
		const menuId = event.detail.id;
		if (menuId) {
			const route = menuId.indexOf('ntar10m') ?  'ntar20m' : menuId;
			const params = menuId.indexOf('ntar10m') ? {
				blbrNo : menuId.split('&blbrNo=')[1]
			} : {}
			router.navigate(route, params);
		}
	}*/
	
	async showArmList (list) {
		if (list.length === 0) {
			$$('#noData').addAttr('style', 'display:flex;');
		} else {
			$$('#armListArea').show();
			/*this.listManager = GlobalApp.getListManager(this.rootElem, {
				useTable : true,
				container : '#armList',
				usePagination : false,
				listItemHtmlPath : '/components/ntbx/NTBX10M_L.html',
				listItemJsPath : '/components/ntbx/NTBX10M_L.js'
			});
			
			list.forEach((item) => {
				item.id = item.UMSPUSHLINKURL;
			});
			
			await this.listManager.render(list, this.eventReceiver);
			this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));*/
			
			let armHtml = '';
			const readList = [];
			for (let i = 0; i < list.length; i++) {
				const armData = list[i];
				//armData.UMSPUSHRECPYN = 'Y';
				
				armHtml = '';
//				if (armData.UMSPUSHRECPYN === 'N') {
//					armHtml += '<li class="unread">';
//					readList.push(armData.UMSPUSHSRNO);
//				} else {
//					armHtml += '<li>';
//				}
				readList.push(armData.UMSPUSHSRNO);
				armHtml += '<li>';

				if (armData.UMSPUSHLINKURL) {
//					if (armData.UMSPUSHRECPYN === 'N') {
//						armHtml += '	<a name="goDetailPage" id="' + armData.UMSPUSHLINKURL + '" href="javascript:void(0);" aria-label="읽지 않음">';
//					} else {
//						armHtml += '	<a name="goDetailPage" id="' + armData.UMSPUSHLINKURL + '" href="javascript:void(0);">';
//					}
					armHtml += '	<a name="goDetailPage" id="' + armData.UMSPUSHLINKURL + '" href="javascript:void(0);">';
				} else {
//					if (armData.UMSPUSHRECPYN === 'N') {
//						armHtml += '	<div aria-label="읽지 않음">';
//					} else {
//						armHtml += '	<div>';
//					}
					armHtml += '	<div>';
				}
				armHtml += '		<strong>' + armData.UMSPUSHTITLNM + '</strong>';
				armHtml += '		<div class="text">' + armData.UMSPUSHTXT + '</div>';
				armHtml += '		<div class="date">' + armData.UMSPUSHDMSGDT + '</div>';
				if (armData.UMSPUSHRECPYN === 'N') {
					armHtml += '	</a>';
				} else {
					armHtml += '	</div>';
				}
				armHtml += '</li>';
				
				$$('#armList').append(armHtml);
			}
			

			$$('a[name="goDetailPage"]').on('click', () => {
				const menuId = event.currentTarget.id;
//				const route = menuId.indexOf('ntar01m') != -1 ?  'ntar02m' : menuId;
//				const params = menuId.indexOf('ntar01m') != -1 ? {
//					blbrNo : menuId.split('&blbrNo=')[1]
//				} : {}
				
				let route = menuId;
				let params = null;
				if(menuId.indexOf('ntar01m') > -1) {
					route = 'ntar02m';
					params = {
						blbrNo : menuId.split('&blbrNo=')[1]
					}
				} else if(menuId.indexOf('safeBoard01m') > -1) {
					route = 'ntar02mDetail';
					params = {
						blbrNo : menuId.split('&blbrNo=')[1]
					}
				}
				
				console.log('route - ', route);
				console.log("---params : " + JSON.stringify(params, null, 2));
				
				router.navigate(route, params);
			});
			
			console.log('readList.length==', readList.length);
			if (readList.length !== 0) {
				
				await this.setAlmRdYn(readList);
			}
		}
	}
	
	async getArmList () {
		const url = '/api/ntbx/getArmList.json';
		const params = {};
		const res = await ApiUtils.sendPost(url, params);
		if (res.resultCode === '000000') {
			await this.showArmList(res.data.armList);
		} else {
			CmmUtils.alert('', '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			});
			$$('#noData').addAttr('style', 'display:flex;');
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}