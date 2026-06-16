/*************************************************************************
* @ 서비스경로 : IVINF51M
* @ 파일명      : IVINF51M 전문가 리포트
* @ 작성자      : 90195467
* @ 작성일      : 2024-12-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-26            이혜성                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;
export default class IVINF50M extends BaseModule {
	constructor (elem) {
		super(elem);
		this.rootElem = elem;
		
	}
	
	init () {
		super.init(this);
		
		this.getSubscribeDate();
		
		this.getBannerList();
		
		this.register();
	}
	
	register () {
		const handleDlyBrfgClick = async(e) => {
			if(e.target.checked) {
				const NotiStt = await NativeUtils.callNotificationStatus();
				
				if(NotiStt.status === 'true') {	
					this.setSubscribeDate('Y', 'sbsc0001');
				}else {
					$$('#dlyBrfg').elements[0].checked = false;
					
					const alertRes = await CmmUtils.confirm('Push 알림이 꺼져 있습니다. <br> 휴대폰의 설정>알림>WON Click에서 알림을 허용해주세요.', '',{
		    			okLabel : '설정하러 가기',
		    			noLabel : '다음에',
                        icon : 'caution'
		    		});
					
					if(alertRes.resultCd === '000000') {
						await NativeUtils.callOpenSetting();
					}
				}
			}else {
				this.setSubscribeDate('N', 'sbsc0001');
			}
		}
		this.registerCallback('change', $$('#dlyBrfg'), handleDlyBrfgClick);
		
		const handleWeekIvstStgClick = async(e) => {
			if(e.target.checked) {
				const NotiStt = await NativeUtils.callNotificationStatus();
				
				if(NotiStt.status === 'true') {
					this.setSubscribeDate('Y', 'sbsc0002');
				} else {
					$$('#weekIvstStg').elements[0].checked = false;
					
					const alertRes = await CmmUtils.confirm('Push 알림이 꺼져 있습니다. <br> 휴대폰의 설정>알림>WON Click에서 알림을 허용해주세요.', '',{
		    			okLabel : '설정하러 가기',
		    			noLabel : '다음에',
                        icon : 'caution'
		    		});
					
					if(alertRes.resultCd === '000000') {
						await NativeUtils.callOpenSetting();
					}
				}
			}else {
				this.setSubscribeDate('N', 'sbsc0002');
			}
		}
		this.registerCallback('change', $$('#weekIvstStg'), handleWeekIvstStgClick);
		
		
		const handleDlyBrfgLinkClick = async(e) => {
			e.preventDefault();
			const linkURL = 'http://m.wooribank.com/mw/mws?withyou=MWINQ0010';
			const res = await NativeUtils.callLocalBrowser(linkURL);
		}
		
		const handleWeeklyLinkClick = async(e) => {
			e.preventDefault();
			const linkURL = 'http://m.wooribank.com/mw/mws?withyou=MWINQ0008';
			const res = await NativeUtils.callLocalBrowser(linkURL);
		}
		
		const handleMonthlyLinkClick = async(e) => {
			e.preventDefault();
			const linkURL = 'http://m.wooribank.com/mw/mws?withyou=MWINQ0009';
			const res = await NativeUtils.callLocalBrowser(linkURL);
		}
		
		const handleIssueLinkClick = async(e) => {
			e.preventDefault();
			const linkURL = 'http://m.wooribank.com/mw/mws?withyou=MWINQ0011';
			const res = await NativeUtils.callLocalBrowser(linkURL);
		}
		
		const handleTechLinkClick = async(e) => {
			e.preventDefault();
			const linkURL = 'https://youtube.com/playlist?list=PLdS5cYbirCny0SJvCcKG9vevA2CSPKBuX&SI=tEf-FdTZjGiAoTmo';
			const res = await NativeUtils.callLocalBrowser(linkURL);
		}
		
		this.registerCallback('click', $$('#dlyBrfgLink'), handleDlyBrfgLinkClick);
		this.registerCallback('click', $$('#weeklyLink'), handleWeeklyLinkClick);
		this.registerCallback('click', $$('#monthlyLink'), handleMonthlyLinkClick);
		this.registerCallback('click', $$('#issueLink'), handleIssueLinkClick);
		this.registerCallback('click', $$('#techLink'), handleTechLinkClick);
		
		// 배너 스와이퍼
		var swiper = new Swiper(" .mySwiper", {
			slidesPerView: 1,
			spaceBetween: 16,
			pagination: {
				el: ".swiper-pagination",
			}
		});
	}
	
	// 배너정보 조회
	async getBannerList() {
		const url = '/api/userInfo/getBannerInfo.json';
		const params = {
				bnrUsgYn : '1'
		};
		const res = await ApiUtils.sendPost(url, params);
		
		console.log("---getBannerList : " + JSON.stringify(res, null, 2));
		
		if (res.resultCode === '000000') {
			this.setBanner(res.data);
		}
	}
	
	 /**
     *   배너 영역
     * @param 
     *  */
	async setBanner(data) {
		let html = '';
		const bnrLst = data;
		
		if(bnrLst.length > 0) {
			/*
			 * bnrLinkDscd(배너링크구분) - null : 이동없음, 1 : 내부, 2 : 외부
			 * 		1-1 > bnrInLinkDtlId - 데이터가 있을 경우 공지사항id임 (공지사항상세 : ntar02m) 
			 *              bnrInLinkMenuId : menuId
			 * 		2-1 > bnrExtrLinkTycd - 배너외부링크브라우저
			 * 				 bnrExtrLinkUrlNm - 배너외부링크URL
			 * */
			bnrLst.forEach((data, idx) => {
				const time = dayjs().format('YYYYMMDDHHmmss');
				const filePathNm = '/api/file/getFileView?fileName=' + data.atflNm + '&fileType=BNR&time=' + time;
				
				const bnrType = data.bnrLinkDscd;
				
				html += '<div class="swiper-slide">';
				if(bnrType === null) {
				html += '	<button name="noLink">';
				} else if(bnrType === "1") {		// 내부링크
				html += '	<button name="inLink" value="' + data.bnrInLinkDtlId + '" id="' + data.bnrInLinkMenuId + '">';
				} else if(bnrType === "2") {		// 외부링크
				html += '	<button name="outLink" value="' + data.bnrExtrLinkTycd + '" id="' + data.bnrExtrLinkUrlNm + '">';
				}
				html += '		<picture>';
				html += '			<source srcset="' + filePathNm + '">';
				html += '			<img src="' + filePathNm + '" alt="">';
				html += '		</picture>';
				html += '	</button>';
				html += '</div>';
			})
			$$('#bnrSwiper').html(html);
			
			const inLinkClick = (event, element) => {
				let route = element.id;
				if(!route) {
					return;
				}
				
				const props = {};
				if(element.value) {
					props.blbrNo = element.value;
				}
				if(route === 'ntar01m' && props.blbrNo) {
					route = 'ntar02m';
				}
				router.navigate(route, props);
		    }
			
			const outLinkClick = (event, element) => {
				const outType = element.value;
				const outUrl = element.id;
				
				if(outType === '1') {					// 인앱브라우저
					NativeUtils.callLocalBrowser(outUrl);
				} else if(outType === '2') {		// 외부브라우저
					NativeUtils.callOpenWindowWithURL(outUrl);
				}
			}
			
			$$(document).findByName('inLink', 'click', inLinkClick);
			$$(document).findByName('outLink', 'click', outLinkClick);
			
			$$('#bannerArea').show();
		} else {
			$$('#bannerArea').hide();
		}
	}
	
	// 구독정보 조회
	async getSubscribeDate() {
		const url = '/api/userInfo/getSbscList.json';
		const params = {
			sbscCd : ['sbsc0001', 'sbsc0002']
		};
		const data = await ApiUtils.sendPost(url, params);
		
		if (data.resultCode === '000000') {
			const dlyBrfg = data.data.find(x => x.PBSBSCCD === 'sbsc0001');
			const weekIvstStg = data.data.find(x => x.PBSBSCCD === 'sbsc0002');
			
			if (dlyBrfg.PBSBSCYN === 'Y'){
				$$('#dlyBrfg').elements[0].checked = true;
			} else {
				$$('#dlyBrfg').elements[0].checked = false;
			}
			
			if (weekIvstStg.PBSBSCYN === 'Y'){
				$$('#weekIvstStg').elements[0].checked = true;
			} else {
				$$('#weekIvstStg').elements[0].checked = false;
			}
		} else {
			CmmUtils.alert('', '로그인이 필요한 화면입니다. 로그인 후, 이용해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			}).then(() => {
				router.navigate('lgin40m', {originalUri: 'ivinf51m'});
			});
		}
	}
	
	// 구독정보 설정
	async setSubscribeDate(sbscVal, type) {
		const url = '/api/userInfo/setSbscData.json';
		const params = {
			sbscCd : type,
			sbscYn : sbscVal
		};
		const data = await ApiUtils.sendPost(url, params);
		if (!data.resultCode === '000000') {
			CmmUtils.alert('', '일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.', {
				btnLabel : '확인',
				useCancelBtn : false
			});
			router.navigate('home', {});
		}
	}
	
	destroy () {
		super.destroy(this);
	}
}
