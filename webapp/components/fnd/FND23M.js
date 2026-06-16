/*************************************************************************
* @ 서비스경로 : FND23M
* @ 파일명      : FND23M   펀드 > 이달의 추천 펀드 
* @ 화면ID	  : PBWFU030000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '../../components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class FND23M extends BaseModule {
	
	constructor(elem) {
    	super(elem);
        
    	$(document).off("scroll");
    	
    	[this.page, this.setPage] = this.useState('page', 1);
    	[this.pageSize, this.setPageSize] = this.useState('pageSize', 10);
    	[this.nxtDatExstYn, this.setNxtDatExstYn] = this.useState('nxtDatExstYn', 'N');
    	
    	[this.type, this.setTpye] = this.useState('type', 'RCMD');	//펀드목록 옵션 ( SB  : 판매, RCMD  : 이달의추천)
        const riskList = [
        	{riskColor: 'lightRed', ristGdNm: '#매우높은위험'},
        	{riskColor: 'FFF4EB', ristGdNm: '#높은위험'},
        	{riskColor: 'lightYellow', ristGdNm: '#다소높은위험'},
        	{riskColor: 'green-50', ristGdNm: '#보통위험'},
        	{riskColor: 'lightBlue', ristGdNm: '#낮은위험'},
        	{riskColor: 'lightViolet', ristGdNm: '#매우낮은위험'},
        	{riskColor: 'lightPurple', ristGdNm: '#글로벌'},
        	{riskColor: 'red-100', ristGdNm: '#원금손실가능'},
        ];
        [this.riskList, this.setRiskList] = this.useState('riskList', riskList); 
    }

	init () {
		
		super.init(this);
		
    	this.apiFndList();
    	
    	this.initButton();
    	
    	$$("#compareBottm").hide();
    }
	
	initAllEvent() {
		//이벤트 전체 삭제
    	const elements = document.querySelectorAll(".fund-card-list button");
    	elements.forEach((element) => {
    		element.parentNode.replaceChild(element.cloneNode(true),element);
    	});
    	
    	//이벤트 등록
		this.initListButton();
	}
    
	initButton() {
    	
    	/**
    	 * 비교하기 버튼
    	 */
    	const compare = $$("#compare");
    	const compareClick = () => {
    		const param = {
    				compareFnd1 : $$("#compare1Btn").value()
    				, compareFnd2 : $$("#compare2Btn").value()
    		}
    		router.navigate("fnd50m",param);
    	}
    	//비교담기 버튼
    	this.registerCallback("click", compare,  compareClick);
    	
    }
    
    initListButton() {
    	
    	//추천 애니메이션
        AOS.init({
            once: true,
            offset: 150,
        });
    	
    	/**
		 * 관심펀드 이벤트
		 */
    	const likeBtnClick = (event, element) => {

    		let isLike = "N";
    		if( element.value === 'N') {
    			isLike = 'Y';
    		}
    		
    		const param =  {
    				fndPdcd : element.dataset.fndpdcd
    				, isLike : isLike
    				, cncrFndNm :  element.dataset.korlitmsnm
    		}
    		this.apiUpdateCncrFnd(param, element);
    	}
    	
    	/**
		 * 비교담기 버튼 이벤트
		 */
    	const compareBtnClick = (event, element) => {
    		
    		event.preventDefault();
    		
    		const fndPdcd = element.dataset.fndpdcd
    		const cncrFndNm = element.dataset.korlitmsnm
    		
    		    		
    		const compare1Btn = $$("#compare1Btn").value();
    		const compare2Btn = $$("#compare2Btn").value();
    		
    		if(fndPdcd === compare1Btn) {
    			$$("#compare1Btn").value('');
    			$$("#compare1Btn").html('<i class="ico-add"></i><span>비교할 펀드 추가</span>');
    			$$("#compare").addAttr("aria-disabled",true);
    			$$("#compare").addAttr("disabled",true);
    			$$("#compare1Btn").removeClass("btn-primary");
    			$$("#compare1Btn").addClass("btn-outlined");
    			$$("#compare1Btn").addClass("btn-border-dashed");
    			if(compare2Btn === '') {
    				$$("#compareBottm").hide();
    				scrollReset();
        		}
    			return;
    		}
    		
    		if(fndPdcd === compare2Btn) {
    			$$("#compare2Btn").value('');
    			$$("#compare2Btn").html('<i class="ico-add"></i><span>비교할 펀드 추가</span>');
    			$$("#compare").addAttr("aria-disabled",true);
    			$$("#compare").addAttr("disabled",true);
    			$$("#compare2Btn").removeClass("btn-primary");
    			$$("#compare2Btn").addClass("btn-outlined");
    			$$("#compare2Btn").addClass("btn-border-dashed");
    			if(compare1Btn === '') {
    				$$("#compareBottm").hide();
    				scrollReset();
        		}
    			return;
    		}
    		
    		
    		if(compare1Btn !== '' && compare2Btn === '') {
    			$$("#compare2Btn").value(fndPdcd);
    			$$("#compare2Btn").html('<span>'+cncrFndNm+'</span><i class="ico-close-16"></i>');
    			$$("#compare2Btn").addClass("btn-primary");
    			$$("#compare2Btn").removeClass("btn-outlined");
    			$$("#compare2Btn").removeClass("btn-border-dashed");
    		} else if(compare1Btn !== '' && compare2Btn !== '') {
    			$$("#"+fndPdcd).removeClass("is-toggled");
    			element.classList.remove("btn-primary");
    			element.classList.add("btn-secondary");
    			toastr.error(``, '비교는 최대 2개까지 선택 가능합니다.');
    			event.stopPropagation();
    			return;
    		} else  {
    			$$("#compare1Btn").value(fndPdcd);
    			$$("#compare1Btn").addClass("btn-primary");
    			$$("#compare1Btn").removeClass("btn-outlined");
    			$$("#compare1Btn").removeClass("btn-border-dashed");
    			$$("#compare1Btn").html('<span>'+cncrFndNm+'</span><i class="ico-close-16"></i>');
    			$$("#compareBottm").show();
    		} 
    		
    		if($$("#compare1Btn").value() !== '' &&  $$("#compare2Btn").value() !== '') {
    			$$("#compare").removeAttr("aria-disabled");
    			$$("#compare").removeAttr("disabled");
    		} 
    		
    	}
    	
    	/**
		 * 담기 후 삭제이벤트
		 */
    	const deleteFndClick = (event, element) => {
    		
    		const divId = element.value;
    		$$("#"+divId).removeClass("is-toggled");
    		$$("#"+divId).find("button[name='compareBtn']").removeClass("btn-primary");
    		$$("#"+divId).find("button[name='compareBtn']").addClass("btn-secondary");
    		
    		$$("#"+element.id).value('');
			$$("#"+element.id).html('<i class="ico-add"></i><span>비교할 펀드 추가</span>');
			$$("#"+element.id).removeClass("btn-primary");
			$$("#"+element.id).addClass("btn-outlined");
			$$("#"+element.id).addClass("btn-border-dashed");
			$$("#compare").addAttr("aria-disabled",true);
			$$("#compare").addAttr("disabled",true);
			
			const compare1Btn = $$("#compare1Btn").value();
    		const compare2Btn = $$("#compare2Btn").value();
    		
			if(compare1Btn === '' && compare2Btn === '') {
				$$("#compareBottm").hide();
				scrollReset();
    		}
    	}
    	
    	/**
    	 * 상세페이지 이동
    	 */
    	const detailBtnClick = (event,element) => {
    		const param = {
    			fndPdcd : element.parentElement.id
    			, fndNm : element.text
    		}
        	router.navigate('fnd30s',param);
    	}
    	
    	$$(document).findByName('likeBtn', 'click', likeBtnClick);
    	$$(document).findByName('compareBtn', 'click', compareBtnClick);
    	$$(document).findByName('deleteFnd', 'click', deleteFndClick);
    	$$(document).findByName('detailBtn', 'click', detailBtnClick);
    }
    
    scrollEvent() {
		const _this = this;
		$(document).scroll(function(){
			let val = window.innerHeight + window.scrollY;
			if (val >= document.documentElement.scrollHeight - 1) {
				if(_this.nxtDatExstYn.value === "Y") {
					_this.apiFndList();
					_this.setNxtDatExstYn("N");				
				}
			}
		});
	}

    /**
	 * 펀드 목록 조회
	 */
	async apiFndList() {
		const param = {
			inqDscd    : this.type.value
			, page : this.page.value
    		, pageSize : this.pageSize.value
		};
		const result = await ApiUtils.sendPost('/api/fnd/getBestFndList.json', param, true);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiFndListDataSet(result.data);
			this.initAllEvent();
		} else {
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인',
	            status : 'caution'
	        });
			if(res) $$("#noResult").css({'display':'flex'});
		}
	}
	
	async apiFndListDataSet(data) {
		
		const _data = data || {};
		const _this = this;
		
		if(data.list.length < 1) {
        	$$("#noResult").css({'display':'flex'});
        	$$(".fund-result").hide();
        	return;
        } else {
        	$$("#noResult").hide();
        	$$(".fund-result").show();
        	
        	this.setNxtDatExstYn(data.nxtDatExstYn);	
        	if(data.nxtDatExstYn === 'Y') {
        		this.setPage(this.page.value + 1);
        	}
        }
		
		if(this.page.value === 1) {
			$$("#fndList").html('');
		}
        $.each(_data.list, function(i, item){
        	let html = '';
        	
        	let risk = _this.riskList.value.find(o => o.ristGdNm === '#'+item.riskGdNm);
        	
        	let bmmPrftRt = CmmUtils.isNullorEmpty(item.bmmPrftRt) ? Number(0).toFixed(2) : Number(item.bmmPrftRt).toFixed(2);
        	let m3PrftRt = CmmUtils.isNullorEmpty(item.m3PrftRt) ? Number(0).toFixed(2) : Number(item.m3PrftRt).toFixed(2);
        	let m6PrftRt = CmmUtils.isNullorEmpty(item.m6PrftRt) ? Number(0).toFixed(2) : Number(item.m6PrftRt).toFixed(2);
        	let m12PrftRt = CmmUtils.isNullorEmpty(item.m12PrftRt) ? Number(0).toFixed(2) : Number(item.m12PrftRt).toFixed(2);
        	
	        html += '<div class="fund-card" data-aos data-toggle="toggle-wrap" id="'+item.fndRprsCd+'">';
	        if(item.rcmFndYn === 'Y') {
	        	html += '	<div class="clip clip-recommend">추천</div>';
	        }
	        html += '	<div class="tag-wrap">';
	        html += '		<div class="tags tags-small tags-'+risk.riskColor+'">'+risk.ristGdNm+'</div>';
	        html += '	</div>';
	        html += '	<a name="detailBtn" class="fund-title headline-small">'+item.fndRprsCdNm+'</a>';
	        html += '	<div class="divide-list">';
	        html += '		<span class="divide01">'+item.rgnTpNm+'</span>';
	        if(item.asetOprcNm === '우리자산운용') {
		        html += '		<div class="division h14 mx8"></div>';
		        html += '		<span class="divide01">'+item.asetOprcNm+'</span>';
	        }
	        html += '	</div>';
	        /**
 	         * 설정기간이 없는데 수익률은 있거나, 설정일이 30일 이상인 경우 수익률 노출
 	         * 설정기간이 30일 이전이면 '설정기간 1개월 미경과' 노출
 	         */
        	if((CmmUtils.isEmpty(item.fndEstDt) && !CmmUtils.isEmpty(item.bmmPrftRt)) || _this.calcDiff(item.fndEstDt)) {
		        html += '	<dl class="expect-list">';
		        html += '		<div class="list">';
		        html += '			<dt>1개월</dt>';
		        bmmPrftRt = bmmPrftRt > 0 ? ("+"+bmmPrftRt+"%") : bmmPrftRt+"%"
		        html += '			<dd>'+bmmPrftRt+'</dd>';
		        html += '		</div>';
		        if(Number(item.m3PrftRt) > 0 ) {
		        	 html += '	<div class="list rise">';
		        } else if(Number(item.m3PrftRt) < 0 ) {
		        	 html += '	<div class="list fall">';
		        } else {
		        	 html += '	<div class="list">';
		        }
		        html += '			<dt>3개월</dt>';
		        m3PrftRt = m3PrftRt > 0 ? ("+"+m3PrftRt+"%") : m3PrftRt+"%"
		        html += '			<dd>'+m3PrftRt+'</dd>';
		        html += '		</div>';
		        html += '		<div class="list">';
		        html += '			<dt>6개월</dt>';
		        m6PrftRt = m6PrftRt > 0 ? ("+"+m6PrftRt+"%") : m6PrftRt+"%"
		        html += '			<dd>'+m6PrftRt+'</dd>';
		        html += '		</div>';
		        html += '		<div class="list">';
		        html += '			<dt>12개월</dt>';
		        m12PrftRt = m12PrftRt > 0 ? ("+"+m12PrftRt+"%") : m12PrftRt+"%"
		        html += '			<dd>'+m12PrftRt+'</dd>';
		        html += '		</div>';
		        html += '	</dl>';
        	} else { // 설정기간 1개월 미경과 시 안내 텍스트출력
        		html += '   <div class="expect-desc">';
    			html += '   	<p>설정기간 1개월 미경과</p>';
    			html += '   </div>';
        	}
        	
	        if(!CmmUtils.isEmpty(item.rcmTxt) && typeof item.rcmTxt !== "undefined") {
	 	        html += '   <dl class="expect-reason">';
				html += '   <dt>추천사유</dt>';
				html += '   <dd>'+item.rcmTxt+'</dd>';
				html += '   </dl>';
	        }
			html += '	<div class="compare-btn-wrap">';
	        html += '		<button type="button" data-korlItmsNm="'+item.fndRprsCdNm+'" data-fndPdcd="'+item.fndRprsCd+'" class="btn-small btn-secondary btn-round"';
	        html += '			data-toggle="toggle-trigger" data-switch-before="btn-secondary"';
	        html += '			data-switch-after="btn-primary" name="compareBtn">';
	        html += '			비교담기 <i class="ico-compare" data-switch-inner="true"';
	        html += '				data-switch-inner-before="ico-compare"';
	        html += '				data-switch-inner-after="ico-check"></i> <span';
	        html += '				class="toggle-off blind">선택</span> <span class="toggle-on blind">선택해제</span>';
	        html += '		</button>';
	        html += '	</div>';
	        html += '	<div class="favorite-btn-wrap" data-toggle="toggle-wrap">';
	        html += '		<button type="button" name="likeBtn" data-toggle="toggle-trigger" data-korlItmsNm="'+item.fndRprsCdNm+'"'; 
	        html += 		'data-fndPdcd="'+item.fndRprsCd+'" value="'+(item.isLike === 'Y' ? 'Y' : 'N')+'">';
	        
	        if(item.isLike === 'Y') {
		        html += '			<i class="icon-only icon-36 icon-fav-active" name="likeBtn"  data-switch-inner="true"';
		        html += 				'data-switch-inner-before="icon-fav"';
		        html += 				'data-switch-inner-after="icon-fav-active"></i>';
	        } else {
	        	html += '			<i class="icon-only icon-36 icon-fav" name="likeBtn" data-switch-inner="true"';
			     html += 				'data-switch-inner-before="icon-fav"';
			    html += 				'data-switch-inner-after="icon-fav-active"></i>';
	        }
	        html += '				<span class="toggle-off blind">관심펀드 등록</span>';
	        html += '				<span class="toggle-on blind">관심펀드 등록해제</span>';
	        html += '		</button>';
	        html += '	</div>';
	        html += '</div>';
	        
	        $$('#fndList').append(html);
        });
        
        if(CmmUtils.isLoading()) {
        	CmmUtils.hideLoading();
        }
        
        this.scrollEvent();
	}

	
	/**
	 * 관심펀드 등록/삭제
	 */
	async apiUpdateCncrFnd(param, element) {
		const result = await ApiUtils.sendPost('/api/fnd/updateCncrFnd.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			if(result.data === -1) {
				element.children[0].classList.remove('icon-fav-active');
				element.children[0].classList.add('icon-fav');
				toastr.error(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '더 이상 등록할 수 없습니다.', {
					"extendedTimeOut": 0,
					"preventDuplicates": false,
					"disableTimeOut": true,
				});
			} else if(result.data === 0) {
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav-active');
					element.children[0].classList.add('icon-fav');
					toastr.error(``, '관심펀드 등록에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add('icon-fav-active');
					toastr.error(``, '관심펀드 삭제에 실패하였습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			} else {
				element.value = param.isLike;
				if(param.isLike === 'Y') {
					element.children[0].classList.remove('icon-fav');
					element.children[0].classList.add("icon-fav-active");	
					toastr.success(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심펀드에 등록되었습니다', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				} else {
					element.children[0].classList.add('icon-fav');
					element.children[0].classList.remove("icon-fav-active");	
					toastr.caution(`<div class="btn-toast-wrap"><a href="javascript:void(0);" data-navigate='app/fnd60m' class="btn-xsmall btn-ghost-white">바로가기<i class="ico-chevron"></i></a>`, '관심펀드에서 삭제되었습니다.', {
						"extendedTimeOut": 0,
						"preventDuplicates": false,
						"disableTimeOut": true,
					});
				}
			}
		} else {
			toastr.error(``, result.resultMessage, {
				"extendedTimeOut": 0,
				"preventDuplicates": false,
				"disableTimeOut": true,
			});
		}
	}
	
	calcDiff (fndEstDt) {

        const stDt = dayjs(fndEstDt);
        const now = dayjs();

        const diffDay = now.diff(stDt, 'day');

        return diffDay >= 30 ? true : false;
    }
	
    destroy () {
        super.destroy(this);
        $(document).off("scroll");
    }
}
