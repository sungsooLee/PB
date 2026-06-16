/*************************************************************************
* @ 서비스경로 : FND60M
* @ 파일명      : FND60M 펀드 > 나의 관심 펀드
* @ 화면ID	  : PBWFU070000
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

// router 초기화
const router = globalApp.router;

export default class FND60M extends BaseModule {
	
    constructor(elem) {
        
    	super(elem);
    	
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

    	// 탭 클릭
		const tabClickCallback = (event) => {
			const route = 'etf60m';	
			window.location.hash = route;
		}
		const tab2 = $$("#tab2").elements[0];
		const tabTargets = { elements : [tab2] };
		const tabClickCallbacks = [tabClickCallback];
		this.registerCallback('click', tabTargets, tabClickCallbacks);
		
    	this.apiCncrFndList();
    	
    	this.initEvent();
    	
    	$$("#compareBottm").hide();
    }
    
    initEvent() {
    	const _this = this;

    	/*
    	 * 순서변경 
    	 */
    	const orderBtn = $$("#orderBtn");
    	const fndOrderPopup = async () => {
			
			await GlobalApp.popupUtils.openPopup('fnd61p', {
	            showCloseBtn : true,
	            btn2Label : '저장',
	            btn2IsMain : true,
	            params : {},
	            onYes: (result) => {
	            	if(result.resultCode === '000000') {
	            		if(result.data > 0) {
	            			$$(".fund-card-list").html('');
	            			this.apiCncrFndList();
		            		toastr.success(``, '저장 되었습니다.');
	            		}
	            	}
	            }
	        });
			
		}
    	this.registerCallback("click", orderBtn,  fndOrderPopup);
    	
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
    	this.registerCallback("click", compare,  compareClick);
    }
    
    initButton() {
    	
    	//추천 애니메이션
        AOS.init({
            once: true,
            offset: 150,
        });
        
    	const cncrFndDeleteBtn = (evnent,element) => {
    		
    		event.preventDefault();
    		
    		const seq = element.value.split('_')[0];
    		const fndPdcd = element.value.split('_')[1];
    		
    		const param = {
    			fndPdcd : fndPdcd
    			, cncrFndSeq : seq
    		}
    		this.deleteCncrFnd(param, element);
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
    	
    	$$(document).findByName('compareBtn', 'click', compareBtnClick);
    	$$(document).findByName('deleteFnd', 'click', deleteFndClick);
    	$$(document).findByName('cncrFndDelete', 'click', cncrFndDeleteBtn);
    	$$(document).findByName('detailBtn', 'click', detailBtnClick);
    }
    
    /**
     * 관심 펀드 삭제
     */
    async deleteCncrFnd(param,element) {
    	
    	const confirmRes = await CmmUtils.confirm('삭제하시겠습니까','', {
            okLabel : '예',
            noLabel : '아니요',
            icon : 'caution',
        });
        
		if(confirmRes.resultCd === '000000') {
			const result = await ApiUtils.sendPost('/api/fnd/deleteCncrFnd.json', param);
			
			// 데이터세팅
			if(result.resultCode === '000000') {
				toastr.caution(``, '삭제 되었습니다.');
				element.parentElement.parentElement.remove();
				if($(".fund-card-list").children().length < 1) {
					$$(".fund-result").hide();
					$$("#orderBtn").hide();
					$$("#noResult").css({'display':'flex'});
				}
			}
		}
		
		
    }
    
    /**
     * 관심 펀드 조회
     */
    async apiCncrFndList() {
		const result = await ApiUtils.sendPost('/api/fnd/getCncrFndList.json', {}, true);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			await this.apiCncrFndListDataSet(result.data);
			
			if(CmmUtils.isLoading()) {
	        	CmmUtils.hideLoading(false);
	        }
			
			
		} else {
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인'
	        });
			if(res) {
				$$("#noResult").css({'display':'flex'});
				$$("#orderBtn").hide();
			}

		}
    }
    
    async apiCncrFndListDataSet(data) {
    	
    	const _this = this;
    	$$(".fund-card-list").html('');
    	
    	if(data.length > 0) {
    		
    		const compare1Btn = $$("#compare1Btn").value();
    		const compare2Btn = $$("#compare2Btn").value();
    		
    		$$(".fund-result").show();
    		$$("#orderBtn").css({'display':'flex'});

			let html = '';

	        $.each(data, function(i, item){

	        	let risk = _this.riskList.value.find(o => o.ristGdNm === '#'+item.riskGdNm);
	        	
	        	let bmmPrftRt = CmmUtils.isNullorEmpty(item.bmmPrftRt) ? Number(0).toFixed(2) : Number(item.bmmPrftRt).toFixed(2);
	        	let m3PrftRt = CmmUtils.isNullorEmpty(item.m3PrftRt) ? Number(0).toFixed(2) : Number(item.m3PrftRt).toFixed(2);
	        	let m6PrftRt = CmmUtils.isNullorEmpty(item.m6PrftRt) ? Number(0).toFixed(2) : Number(item.m6PrftRt).toFixed(2);
	        	let m12PrftRt = CmmUtils.isNullorEmpty(item.m12PrftRt) ? Number(0).toFixed(2) : Number(item.m12PrftRt).toFixed(2);
	        	
	        	let btnClass = 'btn-secondary';
	 	        let iClass = 'ico-compare';
	 	        let divClass = '';
	 	        if(compare1Btn === item.fndRprsCd || compare2Btn === item.fndRprsCd) {
	 	        	btnClass = 'btn-primary';   
	 	        	iClass = 'ico-check'; 
	 	        	divClass = 'is-toggled';
	 	        }
	 	        
	 	       html += '<div class="fund-card '+divClass+'" data-aos data-toggle="toggle-wrap" id="'+item.fndRprsCd+'">';
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
		        html += '	<div class="compare-btn-wrap">';
		        html += '		<button type="button" data-korlItmsNm="'+item.fndRprsCdNm+'" data-fndPdcd="'+item.fndRprsCd+'" class="btn-small '+btnClass+' btn-round"';
		        html += '			data-toggle="toggle-trigger" data-switch-before="btn-secondary"';
		        html += '			data-switch-after="btn-primary" name="compareBtn">';
		        html += '			비교담기 <i class="'+iClass+'" data-switch-inner="true"';
		        html += '				data-switch-inner-before="ico-compare"';
		        html += '				data-switch-inner-after="ico-check"></i> <span';
		        html += '				class="toggle-off blind">선택</span> <span class="toggle-on blind">선택해제</span>';
		        html += '		</button>';
		        html += '	</div>';
		        html += '	<div class="favorite-btn-wrap">';
		        html += '		<button type="button" aria-label="관심펀드 삭제"  name="cncrFndDelete" value="'+item.pbCncrFndSeq+'_'+item.fndRprsCd+'">';
		        html += '			<i class="icon-only icon-28 icon-close bg-icon-default"></i>';
		        html += '		</button>';
		        html += '	</div>';
		        html += '</div>';
	        });

			$$(".fund-card-list").append(html);

	        this.initButton();
	        
    	} else {
    		$$("#noResult").css({'display':'flex'});
    		$$("#orderBtn").hide();
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
    }
}
