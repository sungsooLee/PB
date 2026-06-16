/*************************************************************************
* @ 서비스경로 : MENU10P
* @ 파일명      : MENU10P  금융+ > [P] 전체 메뉴
* @ 화면ID	  : PBWME009900
* @ 작성자      : 90196258
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            90196258                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import ListManager from "../../resources/js/common/ListManager.js";

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class MENU10P extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		this.listManager = null;
		this.eventReceiver = new EventTarget();
		this.callbackFunc = null;
		
		[this.userNm, this.setUserNm]					= this.useState('userNm', '');			// 사용자명
		[this.loginDt, this.setLoginDt]					= this.useState('loginDt', '');			// 최종 로그인 일시
		[this.menuList, this.setMenuList]				= this.useState('menuList', []);		// 메뉴 리스트
		[this.searchMenuList, this.setSearchMenuList]	= this.useState('searchMenuList', []);	// 검색용 메뉴 리스트.
		
		[this.lstSearch, this.setLstSearch]				= this.useState('lstSearch', []);		// 최근 검색어
		
		[this.drawProc1, this.setDrawProc1]				= this.useState('drawProc1', false);	// 리스트 중복 처리 제어 위함.
		[this.drawProc2, this.setDrawProc2]				= this.useState('drawProc2', false);	// 리스트 중복 처리 제어 위함.
	}
	
	init (param, callbackFunc) {
		super.init(this);
		this.callbackFunc = callbackFunc;
		
		this.setUserInfo();
		this.drawMenuList();
		
		this.displayControl('list');
		
		this.register();
	}
	
	register () {
		this.bind('userNm', $$('#userNm'), 'strong');
		$$('#userNm').append('<span>님</span>');
		this.bind('loginDt', $$('#loginDt'), 'div');
		
		// 메뉴 검색부분 터치
		const iptSearchClick = () => {
			if ($$('#iptSearch').value() === ''){
				this.initSearchList();
			}
		};
		this.registerCallback('click', $$('#iptSearch'), iptSearchClick);
		
		const emptySearch = () => {
			$$('#validId').addClass('form-invalid');
			$$('#validValue').text('검색어를 입력해주세요.');
		}
		
		// 메뉴 검색 키업 이벤트
		const iptSearchKeyup = async () => {
			if ($$('#iptSearch').value() === '') {
				if (event.key === 'Enter') {
					emptySearch();
				} else {
					this.initSearchList();
				}
			} else {
				if (event.key !== 'Shift') {
					let searchType = false;
					if (event.key === 'Enter') {
						searchType = true;
					}
					this.drawSearchList(searchType);
				}
			}
		}
		this.registerCallback('keyup', $$('#iptSearch'), iptSearchKeyup);
		
		// 메뉴 검색 비활성화(닫기)
		const btnSearchCloseClick = () => {
			this.displayControl('list');
		};
		this.registerCallback('click', $$('#btnSearchClose'), btnSearchCloseClick);
		
		// 검색 내용 삭제
		const btnDeleteClick = () => {
			$$('#iptSearch').value('');
			this.initSearchList();
		};
		this.registerCallback('click', $$('#btnDelete'), btnDeleteClick);
		
		// 검색 실행 버튼 클릭
		const btnSearchClick = async () => {
			if ($$('#iptSearch').value() !== '') {
				this.drawSearchList(true);
			} else {
				emptySearch();
			}
		};
		this.registerCallback('click', $$('#btnSearch'), btnSearchClick);
		
		// 로그 아웃
		const btnLogOutClick = async () => {
			const url = '/pb/api/lgin/logout';
			const params = {};
			
			const data = await ApiUtils.sendGet(url, params);
			if (data.resultCode === '000000') {
				GlobalApp.router.globalData.clearData('userInfo');
				GlobalApp.router.globalData.clearData('menuList');
				const param = {
					linkCctn : '1',
					linkDscd : '',
					linkURL : 'lgin22m',
					resultMsg : 'goMenu'
				};
				this.callbackFunc(param);
			}
		};
		this.registerCallback('click', $$('#btnLogOut'), btnLogOutClick);
		
		// 최근 검색어 이벤트
		this.eventReceiver.addEventListener('keywordAction', this.onKeywordAction.bind(this));
		
		// 메뉴 검색 이벤트
		this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
	}
	
	setUserInfo () {
		const userNm = GlobalApp.router.globalData.getData('userInfo').empNm;
		this.setUserNm(userNm);
		const loginDt = dayjs(GlobalApp.router.globalData.getData('userInfo').loginDt.toString()).format('YYYY-MM-DD HH:mm:ss');
		this.setLoginDt(loginDt);
		const menuList = Object.values(GlobalApp.router.globalData.getData('menuList'));
		this.setMenuList(menuList);
		const searchMenuList = this.menuList.value.filter(item => item.PBHGRNMENUNO*1 !== 0 && item.PBHGRNMENUNO*1 !== 1 && item.PBMENUNO !== '2');
		const maxMenuNo = searchMenuList.reduce((max, item) => (parseInt(item.PBMENUNO) > max ? parseInt(item.PBMENUNO) : max), -Infinity);
		const maxHGRNMENUNO = searchMenuList.reduce((max, item) => (item.PBHGRNMENUNO*1 > max ? item.PBHGRNMENUNO*1 : max), -Infinity);
		const addMenuSeq = maxMenuNo > maxHGRNMENUNO ? maxMenuNo + 1 : maxHGRNMENUNO + 1;
		console.log("######addMenuSeq", addMenuSeq);
		const addMenu1 = {
			PBLINKCCTNDSCD : '1',
			PBLINKURL : 'menu13s',
			PBMENUNM : '구독 설정',
			HgrnSeq : addMenuSeq,
			PBSORTSEQSRNO : '1'
		};
		searchMenuList.push(addMenu1);
		const addMenu2 = {
			PBLINKCCTNDSCD : '1',
			PBLINKURL : 'menu14m',
			PBMENUNM : '이용 동의서',
			HgrnSeq : addMenuSeq,
			PBSORTSEQSRNO : '2'
		};
		searchMenuList.push(addMenu2);
		const addMenu3 = {
			PBLINKCCTNDSCD : '1',
			PBLINKURL : 'menu21m',
			PBMENUNM : '서비스 해지',
			HgrnSeq : addMenuSeq,
			PBSORTSEQSRNO : '3'
		};
		searchMenuList.push(addMenu3);
		this.setSearchMenuList(searchMenuList);
		console.log("######searchMenuList", searchMenuList);
	}
	
	displayControl (viewType) {
		if (viewType === 'search') {
			$$('#iptSearch').singleElement.closest('.modal__container').classList.add('is-search');
			
			$$('#rcmArea').hide();			// 추천 메뉴
			$$('#menuNavArea').hide();		// 메뉴 탭
			$$('#menuListArea').hide();		// 메뉴 리스트
			$$('#logOutArea').hide();		// 로그 아웃
		} else {
			$$('#iptSearch').value('');
			$$('#iptSearch').singleElement.closest('.modal__container').classList.remove('is-search');
			
			$$('#rcmArea').show();			// 추천 메뉴
			$$('#menuNavArea').show();		// 메뉴 탭
			$$('#menuListArea').show();		// 메뉴 리스트
			$$('#logOutArea').show();		// 로그 아웃

			this.searchDisplayControl('hide');
		}
	}
	
	searchDisplayControl (viewType) {
		$$('#validId').removeClass('form-invalid');
		$$('#validValue').text('');
		if (viewType === 'init') {
			$$('#searchArea').show();
			
			$$('#noResultArea').hide();	
			$$('#resultArea').hide();
		} else {
			$$('#searchArea').hide();		// 검색 초기 창

			$$('#noResultArea').hide();		// 검색 결과 창 > 데이터 없음
			$$('#resultArea').hide();		// 검색 결과 창
		}
	}
	
	async initSearchList () {
		// 메뉴 검색창 초기화
		this.displayControl('search');
		this.searchDisplayControl('init');
		
		// 로컬에 최근 검색어 여부에 따라 화면 변경.
		const lstSearch = CmmUtils.getLocalStorageData('searchMenu');
		if (lstSearch.data) {
			if (this.drawProc1.value) {
				return;
			}
			
			this.setDrawProc1(true);
			// 최근 검색 데이터 있는 경우
			this.setLstSearch(lstSearch.data);
			$$('#searchData').addAttr('style', 'display:flex;');
			$$('#noSearchData').hide();
			
			this.listManager = GlobalApp.getListManager(this.rootElem, {
				useTable : true,
				container : '#searchData',
				usePagination : false,
				listItemHtmlPath : '/components/menu/MENU10P_L1.html',
				listItemJsPath : '/components/menu/MENU10P_L1.js'
			});
			await this.listManager.render(this.lstSearch.value, this.eventReceiver);
			this.setDrawProc1(false);
		} else {
			this.setLstSearch([]);
			// 최근 검색 데이터 없는 경우
			$$('#searchData').hide();
			$$('#noSearchData').show();
		}
	}
	
	async onKeywordAction () {
		const { id, action, status } = event.detail;
		const keyId = event.detail.id;
		const keyAction = event.detail.action;
		if (keyAction === 'search') {
			$$('#iptSearch').value(keyId);
			this.drawSearchList(false);
		} else if (keyAction === 'delete') {
			this.delLstSearch(keyId);
		}
	}
	
	addLstSearch () {
		let lstSearchList = this.lstSearch.value.filter(item => item.id.toLowerCase() !== $$('#iptSearch').value().toLowerCase());
		lstSearchList.unshift({id : $$('#iptSearch').value()});
		lstSearchList = lstSearchList.slice(0, 6);
		this.setLstSearch(lstSearchList);
		CmmUtils.setLocalStorageData('searchMenu', lstSearchList);
	}
	
	delLstSearch (keyId) {
		let lstSearchList = this.lstSearch.value.filter(item => item.id !== keyId);
		this.setLstSearch(lstSearchList);
		CmmUtils.setLocalStorageData('searchMenu', lstSearchList);
		this.initSearchList();
	}
	
	async drawSearchList (viewType) {
		if (this.drawProc2.value) {
			return;
		}
		
		this.setDrawProc2(true);
		
		const searchList = this.searchMenuList.value.filter(item => item.PBMENUNM.toLowerCase().includes($$('#iptSearch').value().toLowerCase()));
		
		this.searchDisplayControl('hide');
		
		if (searchList.length === 0) {
			if (viewType) {
				$$('#noResultArea').addAttr('style', 'display:flex;');
			} else {
				$$('#resultData').html('');
			}
		} else {
			$$('#resultArea').show();
			
			let drawList = [];
			
			searchList.forEach((item) => {
				let drawData = {};
				drawData.id = item.PBLINKURL;
				drawData.fullNm = item.PBMENUNM;
				if (item.PBLINKURL === 'menu13s' || item.PBLINKURL === 'menu14m' || item.PBLINKURL === 'menu21m') {
					drawData.HgrnNm = '';
					drawData.HgrnSeq = item.HgrnSeq;
				} else {
					const HgrnData = this.menuList.value.find(x => x.PBMENUNO === item.PBHGRNMENUNO.toString());
					drawData.HgrnNm = HgrnData.PBMENUNM;
					drawData.HgrnSeq = parseInt(HgrnData.PBSORTSEQSRNO);
				}
				drawData.keyword = $$('#iptSearch').value();
				drawData.seq = parseInt(item.PBSORTSEQSRNO);
				
				drawList.push(drawData);
			});
			drawList.sort((a, b) => {
				if (a.HgrnSeq < b.HgrnSeq) return -1;
				if (a.HgrnSeq > b.HgrnSeq) return 1;

				if (a.seq < b.seq) return -1;
				if (a.seq > b.seq) return 1;
			});
			
			this.listManager = GlobalApp.getListManager(this.rootElem, {
				useTable : true,
				container : '#resultData',
				usePagination : false,
				listItemHtmlPath : '/components/menu/MENU10P_L2.html',
				listItemJsPath : '/components/menu/MENU10P_L2.js'
			});
			await this.listManager.render(drawList, this.eventReceiver);
		}
		
		this.setDrawProc2(false);
	}
	
	async onItemAction (event) {
		const { id, action, status } = event.detail;
		const menuData = this.menuList.value.find(x=>x.PBLINKURL === event.detail.id) ? this.menuList.value.find(x=>x.PBLINKURL === event.detail.id) : { PBLINKURL : event.detail.id, PBLINKCCTNDSCD : '1', PBLINKCCTNDTLDSCD : '1'};
		const linkCctn = menuData.PBLINKCCTNDSCD ? menuData.PBLINKCCTNDSCD : '';
		const linkDscd = menuData.PBLINKCCTNDTLDSCD ? menuData.PBLINKCCTNDTLDSCD : '';
		const linkURL = menuData.PBLINKURL;
		const param = {
			menuNo : menuData.PBMENUNO,
			linkCctn : linkCctn,
			linkDscd : linkDscd,
			linkURL : linkURL,
			resultMsg : 'goMenu'
		};
		console.log("#####param", param);
		await this.addLstSearch();
		this.callbackFunc(param);
	}
	
	async drawMenuList () {
		// 메뉴 리스트를 필요한 리스트대로 나누기.
		let rmdMenuList = [];	// 추천 메뉴 리스트
		let menuTabList = [];	// 메뉴 탭 리스트
		let basicMenuList = [];	// 기본 메뉴 리스트

		let menuTabSeq = 0;		// 메뉴 탭 Seq
		
		const menuList = this.menuList.value.filter(x => x.PBHGRNMENUNO.toString() !== '0');
		
		if (menuList.length !== 0) {
			menuList.forEach((item) => {
				let menuData = {};
				if (item.PBHGRNMENUNO*1 === 2) {
					menuData = item;
					menuData.id = item.PBMENUNO;
					menuData.iconURL = '/api/file/getFileView?fileName=' + item.PBATFLNM + '&fileType=MENU&time=' + dayjs().format('YYYYMMDDHHmmss');//item.PBATFLPATHNM + '/' + item.PBATFLNM;
					rmdMenuList.push(menuData);
				} else {
					if (item.PBHGRNMENUNO*1 === 1 && item.PBMENUNO !== '2') {
						menuData.id = item.PBMENUNO;
						menuData.tabNm = item.PBMENUNM;
						menuData.seqSrno = item.PBSORTSEQSRNO;
						menuData.seq = menuTabSeq.toString();
						menuTabSeq++;
						menuData.detailData = menuList.filter(x => x.PBHGRNMENUNO.toString() === item.PBMENUNO);
						menuData.detailData.sort((a, b) => a.PBSORTSEQSRNO - b.PBSORTSEQSRNO);
						menuTabList.push(menuData);
					}
				}
			});
			rmdMenuList.sort((a, b) => a.PBSORTSEQSRNO - b.PBSORTSEQSRNO);
			menuTabList.sort((a, b) => a.seqSrno - b.seqSrno);

			// 추천 메뉴 그리기
			this.listManager = GlobalApp.getListManager(this.rootElem, {
				useTable : true,
				container : '#rcmAreaList',
				usePagination : false,
				listItemHtmlPath : '/components/menu/MENU10P_L3.html',
				listItemJsPath : '/components/menu/MENU10P_L3.js'
			});
			await this.listManager.render(rmdMenuList, this.eventReceiver);

			// 메뉴 탭 그리기
			this.listManager = GlobalApp.getListManager(this.rootElem, {
				useTable : true,
				container : '#menuTabList',
				usePagination : false,
				listItemHtmlPath : '/components/menu/MENU10P_L4.html',
				listItemJsPath : '/components/menu/MENU10P_L4.js'
			});
			await this.listManager.render(menuTabList, this.eventReceiver);
			
			// 기본 메뉴 리스트 그리기
			let totalMenuHtml = '';
			for (let i = 0; i < menuTabList.length; i++) {
				let menuHgrnNo = menuTabList[i].id;
				let menuHgrnNm = menuTabList[i].tabNm;
				
				totalMenuHtml = '';
				totalMenuHtml += '<div class="gnb-menu-section" id="gnb-list' + menuHgrnNo + '">';
				totalMenuHtml += '<strong>' + menuHgrnNm + '</strong>';
				totalMenuHtml += '<ul>';
				menuTabList[i].detailData.forEach((item) => {
					totalMenuHtml += '<li><a href="javascript:void(0);" name="goMenuUrl" id="' + item.PBLINKURL + '">' + item.PBMENUNM + '</a></li>';
				})
				totalMenuHtml += '</ul>';
				totalMenuHtml += '</div>';
				
				$$("#menuListArea").append(totalMenuHtml);
			}
		} else {
			$$('#rcmAreaList').hide();
			$$('#menuNavArea').hide();
			$$('.gnb-menu-search').addAttr('style', 'flex:0;');
		}
		
		let lstMenuHtml = '';
		lstMenuHtml += '<div class="gnb-menu-section">';
		lstMenuHtml += '<strong class="blind">기타</strong>';
		lstMenuHtml += '<ul>';
		lstMenuHtml += '<li><a href="javascript:void(0);" name="goMenuUrl" id="menu13s">구독 설정</a></li>';
		lstMenuHtml += '<li><a href="javascript:void(0);" name="goMenuUrl" id="menu14m">이용 동의서</a></li>';
		lstMenuHtml += '<li><a href="javascript:void(0);" name="goMenuUrl" id="menu21m">서비스 해지</a></li>';
		
		// 운영 환경이 아닌 경우 샘플 페이지 링크 추가한다
		if ( ! EnvUtils.isPrd() ) {
			lstMenuHtml += '<li><a href="javascript:void(0);" name="goMenuUrl" id="home">샘플 페이지</a></li>';
		}
		
		lstMenuHtml += '</ul>';
		lstMenuHtml += '</div>';
		
		$$("#menuListArea").append(lstMenuHtml);
		
		if (menuList.length !== 0) {
			gnb.init();
			gnb.sizeCheck();
            window.addEventListener('resize', function () {
                gnb.sizeCheck();
            });
		}
		
		// 메뉴 리스트가 다 그려진 후 처리
		const goMenuClick = () => {
			const menuData = this.menuList.value.find(x=>x.PBLINKURL === event.currentTarget.id) || {
				PBLINKCCTNDSCD : '1',
				PBLINKURL : event.currentTarget.id
			};
			console.log("####menuData", menuData);
			const linkCctn = menuData.PBLINKCCTNDSCD ? menuData.PBLINKCCTNDSCD : '';
			const linkDscd = menuData.PBLINKCCTNDTLDSCD ? menuData.PBLINKCCTNDTLDSCD : '';
			const linkURL = menuData.PBLINKURL;
			const param = {
				menuNo : menuData.PBMENUNO,
				linkCctn : linkCctn,
				linkDscd : linkDscd,
				linkURL : linkURL,
				resultMsg : 'goMenu'
			};
			this.callbackFunc(param);
		}
		
		const goMenus = $$('a[name="goMenuUrl"]');
		const goMenusCallbacks = Array(goMenus.elements.length).fill(goMenuClick);
		this.registerCallback('click', goMenus, goMenusCallbacks);
	}
	
	destroy () {
		super.destroy(this);
	}
}