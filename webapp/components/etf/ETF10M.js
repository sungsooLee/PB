/*************************************************************************
* @ 서비스경로 : ETF10M
* @ 파일명      : ETF10M  ETF > ETF 찾기
* @ 화면ID		: PBWFU000000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class ETF10M extends BaseModule {
	
    constructor(elem) {
    	super(elem);
    	
    	[this.searchTxt, this.setSearchTxt] = this.useState('searchTxt', '');
    	[this.keywordType, this.setKeywordType] = this.useState('keywordType', 'ptrt');
    	[this.searchType, this.setSearchType] = this.useState('searchType', 'fndnm');
    	
    	[this.dataList, this.setDataList] = this.useState('dataList', [{
            label : 'ETF명',
            value : 'fndnm',
            isSelected : false
        },{
            label : '키워드',
            value : 'keyword',
            isSelected : false
        }]);
    	
    	const countryImgs = [
        	{img: 'flag-kr', nm: '한국'},
        	{img: 'flag-us', nm: '미국'},
        	{img: 'flag-europe', nm: '유럽'},
        	{img: 'flag-jp', nm: '일본'},
        	{img: 'flag-cn', nm: '중국'},
        	{img: 'flag-in', nm: '인도'},
        	{img: 'flag-vn', nm: '베트남'},
        	{img: 'flag-asia', nm: '아시아/태평양'},
        	{img: 'flag-south-america', nm: '브라질/남미'},
        	{img: 'flag-global', nm: '글로벌'},
        	{img: 'flag-emerging', nm: '이머징/신흥국'},
        	{img: 'flag-foreign', nm: '해외'},
        ];
        [this.countryImgs, this.setCountryImgs] = this.useState('countryImgs', countryImgs); 
    }

    init () {
    	super.init(this);
    	
    	$(document).off("scroll");
    	
    	/**
    	 * 키워드 조회
    	 */
    	this.apiKeywordList();
    	
    	this.register();
    	
    	this.drawLateRfwr();
    }
    
    register() {
    	
    	
    	this.bind( 'searchTxt', $$('#searchTxt'), 'input');
    	
    	/**
    	 * ETF 검색
    	 */
		const searchBtn = $$("#fndSearch");
		const searchBtnCallback = async () => {
			
			if(this.searchType.value === '') {
				$$(".validate-text").text("조회 조건을 선택해주세요.");
				return;
			}
			
			if(this.searchTxt.value === '') {
				$$("#fndSearchForm").addClass('form-invalid');
				$$(".validate-text").text("검색어를 2자 이상 입력해주세요.");
				$('#searchTxt').focus();
				return;
			}
			const param = {
				searchType : this.searchType.value,
				searchTxt : this.searchTxt.value	
			};
			
			router.navigate('etf12s',param);
		}
		this.registerCallback("click", searchBtn, searchBtnCallback);
		
		const searchTxtEnter = async (e) => {
			
			if(e.keyCode === 13) {
				searchBtnCallback();
	 		}
		}
		$$('#searchTxt').on('keydown', async (e) => await searchTxtEnter(e));				// 키워드 검색
		
		/**
		 * 검색어 keyup이벤트
		 */
		const searchText = $$("#searchTxt"); //검색어
		const searchTextChange = () => {
			if(event.currentTarget.value.length > 1) {
				$$("#fndSearchForm").removeClass('form-invalid');
				$$(".validate-text").text('');
			}
		}
		this.registerCallback("keyup", searchText, searchTextChange);		//검색어 keyup이벤트
		
		/**
		 * 키워드tab
		 */
		const changeTabCallBack  = (event, element) => {
		   $$("#tabList").find("li").removeClass('tab-active');
		   element.parentElement.classList.add('tab-active')
		   $$(".keyword-list").hide();
		   $$("#"+element.dataset.keywordtype+"List").css({'display':'flex'});
		   this.setKeywordType(element.dataset.keywordtype);
        }
        $$( document ).findByName('tab', 'click', changeTabCallBack);
        
        /**
		 * 링크이동 (전체ETF~이달의추천 영역)
		 */
		const goLinkCallBack  = (event, element) => {
			router.navigate(element.dataset.link,{});
        }
        $$( document ).findByName('link', 'click', goLinkCallBack);
        
        this.registerCallback('click', $$('#selBtn'), this.selBoxClick);
    }
    
    drawLateRfwr() {
		let res = CmmUtils.getLocalStorageData(this.empNo+"_fnd");
    	let searchTxtArr = res.data;
    		
    	let html = '';
    	if(searchTxtArr != null) {
	    	searchTxtArr.forEach((item,idx) => {
	    		html += '<li>';
				html += '	<div class="btn-xsmall btn-outlined btn-round">';
				html += '		<button class="btn-inner" value="'+item.searchTxt+'_'+item.type+'" name="detail">'+item.searchTxt+'</button>';
				html += '		<button aria-label="검색어 삭제" name="wordDel" value="'+item.searchTxt+'">';
				html += '			<i class="ico-close-16"></i>';
				html += '		</button>';
				html += '	</div>';
				html += '</li>';
	         });
	    	
	    	$$("#referenceWordList").html(html);
	    	
	    	const detailClick = (event,element) => {
	    		const searchTxt = element.value.split('_')[0];
	    		const type = element.value.split('_')[1];
	    		
	    		const param = {
    				searchType : type,
    				searchTxt : searchTxt	
    			};
				router.navigate('etf12s',param);
			}
			$$("#referenceWordList").findByName('detail', 'click', detailClick);
			
			const wordDelClick = (event,element) => {
			
				res = CmmUtils.getLocalStorageData(this.empNo+"_fnd");  
				searchTxtArr = res.data;    
				
				let modifyArr = searchTxtArr.filter((item) => item.searchTxt !== element.value);
				CmmUtils.setLocalStorageData(this.empNo+"_fnd", modifyArr);
				element.closest('li').remove();
			}
			$$("#referenceWordList").findByName('wordDel', 'click', wordDelClick);
    	}
	}

    /**
	 * 검색대상 
	 */
	selBoxClick (event) {

		const idx = this.dataList.value.findIndex((item) => item.value ===  this.searchType.value);
		const defaultComment = this.dataList.value[idx].label;
		
        const g = this;
        GlobalApp.popupUtils.openSelectModal(this.dataList.value , {
            showCloseBtn : true,
            btnElem : event.currentTarget,
            modalTitle : '옵션 선택',
            defaultSelectIndex : idx,
            defaultComment : defaultComment,
            onClose : (result) => {
                console.log('close Result : ' , result);
            },
            onCallback : (result) => {
                console.log('callback Result : ' , result);
                this.setSearchType(result.data);

                const tmpList = [];
                g.dataList.value.forEach((item) => {
                    if ( item.value === result.data ) {
                        item.isSelected = true;
                        $$("#selTxt").text(item.label);
                    } else {
                        item.isSelected = false;
                    }
                    tmpList.push(item);
                });

                g.setDataList(tmpList);
                
                
            }
        });
    }

    /*
     * 키워드조회
     * [keywordType]
     * ptrt : 수익률
     * sector : 섹터
     * country : 국가 
     */
    async apiKeywordList() {
    	const param ={
    		temDis : "3"
    	}
    	const result = await ApiUtils.sendPost('/api/etf/getKeywordList.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiPtrtKeywordListDataset(result.data);
			
			const tab = ['수익률 BEST', '섹터', '국가']
			var swiper = new Swiper(".keyword-swiper", {
				autoHeight: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
					renderBullet: function(index, className) {
						return `<span class="${className}"><button>${tab[index]}</button></span>`
					},
				},
			});
			
			this.keywordEvent();
		}
    }
    
    apiPtrtKeywordListDataset(data) {
    	
    	const _this = this;
    	$$("#ptrtList").html('');
    	$$("#sectorList").html('');
    	$$("#countryList").html('');

    	let html = '';
    	$.each(data.grid, function(i, item){
    		html = '';
    		html += '<button type="button" class="fw-700" name="keywordSearch" value="'+item.fndPrdKrdNm+'">';
    		
    		let imgFlg = _this.countryImgs.value.find(o => o.nm === item.fndPrdKrdNm.replaceAll("#",''));
    		
    		if(typeof imgFlg !== 'undefined') {
    			html += '<i class="flag '+imgFlg.img+'"></i>';
    		}
    		
    		let m3PrftRt = Number(item.m3PrftRt);
			html += '<span>'+item.fndPrdKrdNm.replaceAll("#",'')+'</span>'; 
			if(item.sgnDscd === '0') {
				html += '<span class="steady" aria-label="보합">';
			} else if(item.sgnDscd === '1') {
				html += '<span class="rise" aria-label="상승">';
			} else if(item.sgnDscd === '2') {
				html += '<span class="fall" aria-label="하락">';
				m3PrftRt *= -1;
			}
			html += m3PrftRt.toFixed(2)+'%</span>';
			html += '</button>';
    		if(item.prdKrdDisCd === 'B') {
    			$$("#ptrtList").append(html);
    		} else if(item.prdKrdDisCd === 'S') {
    			$$("#sectorList").append(html);
    		} else if(item.prdKrdDisCd === 'C') {
    			$$("#countryList").append(html);
    		} 
        });
    }
    
    keywordEvent() {
    	const keywordSearch  = (event, element) => {
    		
    		const param = {
				searchType : 'keyword',
				searchTxt : element.value.replace("#",'')	
			};
    		router.navigate('etf12s',param);
         }
         $$( document ).findByName('keywordSearch', 'click', keywordSearch);
    }
    

    destroy () {
        super.destroy(this);
    }
}
