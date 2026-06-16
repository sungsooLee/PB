/*************************************************************************
* @ 서비스경로 : NMCRMNG27P
* @ 파일명      : NMCRMNG27P.js 고객명함 관리 - 지점 명함첩 - 조회조건
* @ 화면ID 	 : PBWBU030000	
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-19            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export class NMCRMNG27P extends BaseModule {
	constructor(elem) {
		super(elem);
        this.rootElem = elem;
        this.callbackFunc = null;
        
        // 필터 종류 - 1 : 전체, 2 : 키맨, 3 : 내가 등록한 명함, 4 : 나만보기, 5이상 : 지점의 팀
        [this.mGroupFilter, this.setMgroupFilter] 			 = this.useState('mGroupFilter', '1');	
        [this.mGroupFilterNm, this.setMgroupFilterNm] = this.useState('mGroupFilterNm', '전체');	
        [this.mTeamCd, this.setMTeamCd] 				 = this.useState('mTeamCd', '');			// 팀 선택했을 경우
        // 	정렬 종류 - 1 : 최신순, 2 : 이름순(한글 > 영문 > 특수문자-숫자), 3. 회사명순, 4. 만료일순
        [this.mSort, this.setMSort] 							 = this.useState('mSort', '1');	
        [this.mSortNm, this.setMSortNm]					 = this.useState('mSortNm', '최신순');	
	}
	
	init (param, callbackFunc ) {
		super.init(this);
		
		this.callbackFunc = callbackFunc;
		
		this.setMgroupFilter(param.groupFilter);
		this.setMTeamCd(param.teamCd);
		this.setMSort(param.sort);
		
		this.initRegist();
	}
	
	initRegist () {
		
		this.loadData();
	}
	
	checkCnt(cnt) {
		if(cnt == null || cnt == '' || cnt == 0 || cnt == '0') {
			return false;
		}
		return true;
	}
	
	/**
    *  고객명함조회조건
    * @param 
    */
	async loadData() {
		const url = '/pb/api/nmcr/cus/nmcrSearch.json';
    	const params = {};
    	
    	const res = await ApiUtils.sendPost(url, params);
		
		let html = '';
		if(res.resultCode === '000000') {
			const data = res.data.filter1;
			const items = res.data.filter2;
			
				html += '<li class="select-all select-active"><button type="button" name="groupFilter" value="1"><span>전체</span><i class="badge" id="groupAll">' + data.totalCnt + '</i></button></li>';
				if (this.checkCnt(data.keyCnt)) {
					html += '<li><button type="button" name="groupFilter" value="2"><span>키맨</span><i class="badge" id="groupKey">' + data.keyCnt + '</i></button></li>';
				}
				if(this.checkCnt(data.insCnt)) {
					html += '<li><button type="button" name="groupFilter" value="3"><span>내가 등록한 명함</span><i class="badge" id="groupNmcr">' + data.insCnt + '</i></button></li>';
				}
				if(this.checkCnt(data.myCnt)) {
					html += '<li><button type="button" name="groupFilter" value="4"><span>나만보기</span><i class="badge" id="groupKey">' + data.myCnt + '</i></button></li>';
				}
			$.each(items, function(idx, val) {
				const rowNo = (idx + 5); 					// 기존 하드코딩 되어있는 순서 이후 
				html += '<li><button type="button"  name="groupFilter" value="' + rowNo + '"><span data="' + val.teamCd + '">' + val.teamNm + '</span><i class="badge" id="team' + rowNo + '">' + val.cnt + '</i></button></li>';
			});
		}
		$$('#searchTeam').html(html);
		
		this.handleSelActive();
	}
	
	/**
    *  조회조건 - 선택 시, 활성화 처리
    * @param 
    */
	handleSelActive() {
		const ctx = this;
		
		// 필터  
		$$('button[name=groupFilter]').on('click', function() {
			const $parent = $(this).closest('li');
			// 선택 활성화
			$parent.addClass('select-all select-active');
			// 기존 비활성화
			$parent.siblings().removeClass('select-all select-active');
			
			const data = $(this).children('span').attr('data');
			ctx.setMgroupFilter($(this).val());
			ctx.setMTeamCd(data);
			ctx.setMgroupFilterNm($parent.find('span').text());
		});
		
		// 정렬  
		$$('button[name=sort]').on('click', function() {
			const $parent = $(this).closest('li');
			// 선택 활성화
	        $parent.addClass('select-active');
	        // 기존 비활성화
	        $parent.siblings().removeClass('select-active');
	        
	        ctx.setMSort($(this).val());
	        ctx.setMSortNm($(this).text());
		});
		
		// 기존 필터 및 정렬 조회한 이력이 있을 경우 처리
		const fRowNum = Number(this.mGroupFilter.value) -1;
		const sRowNum = Number(this.mSort.value) -1;
		$('button[name=groupFilter]').eq(fRowNum).trigger('click');
		$('button[name=sort]').eq(sRowNum).trigger('click');
	}
	
	/**
    *  메모 등록 및 부모창 리턴 
    * @param 
    */
	async returnToBtn2CallBack () {
		const props = {};
		props.groupFilter = this.mGroupFilter.value;
		props.groupFilterNm = this.mGroupFilterNm.value;
		props.teamCd = this.mTeamCd.value;
		props.sort = this.mSort.value;
		props.sortNm = this.mSortNm.value;
		
		const result = { data : props, resultCd : '000000', resultMsg : 'SUCCESS'};
		return result;
	}
	
    destroy() {
        super.destroy(this);
    }
}	