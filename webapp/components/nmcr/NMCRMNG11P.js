/*************************************************************************
* @ 서비스경로 : NMCRMNG11P
* @ 파일명      : NMCRMNG11P.js 내명함공유 - 명함순서설정
* @ 화면ID 	 : PBWBU009901
* @ 작성자      : 90194835
* @ 작성일      : 2024-11-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-28            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import ListManager from "../../resources/js/common/ListManager.js";

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class NMCRMNG11P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
        this.rootElem = elem;
		this.callbackFunc = null;
        
        [this.sortData, this.setSortData] 			= this.useState('sortData', '');							// 내 명함 순서 설정 데이터 - 기존
        [this.sortAftData, this.setSortAftData] 	= this.useState('sortAftData', '');						// 내 명함 순서 설정 데이터 - 변경
        
        [this.prlmEno, this.setPrlmEno] 				= this.useState('prlmEno', '');							// 직원번호
        [this.rprsTelNo, this.setRprsTelNo] 			= this.useState('rprsTelNo', '');						// 직원전화번호
    }

    init (param, callbackFunc ) {
        super.init(this);
        
        this.callbackFunc = callbackFunc;
        
        const userInfo = GlobalApp.router.globalData.getData('userInfo');
        this.setPrlmEno(encodeURIComponent(userInfo.prlmEno));
        this.setRprsTelNo(encodeURIComponent(userInfo.rprsTelNo));
        
        this.loadData();
        
        this.register();
    }
    
    register () {
    	$$('.modal__footer').hide();
    	
    	const btnSave = $$('#btnSave');
    	
    	const handleClick = async () => { 
			const res = await this.handleBtnClick();
			
			if(res.resultCode === '000000') {
				toastr.success('', '저장 되었습니다.');
				setTimeout(() => {
					this.callbackFunc({resultCd : '000000', resultMsg : 'SUCCESS'});
				}, 2000);
			} else {
				toastr.error('', '저장에 실패하였습니다.');
			}
		}
    	this.registerCallback('click', btnSave, handleClick);
    }
    
    /**
     *   내 명함 순서 목록 조회
     * @param 
     *  */
    async loadData () {
		const url = '/pb/api/nmcr/nmcrLst.json';
    	const params = {};
    	params.prlmEno = this.prlmEno.value;
    	params.rprsTelNo = this.rprsTelNo.value;
    	params.sysCd = 'pbw';
    	
    	const res = await ApiUtils.sendPost(url, params);
    	
    	if(res.resultCode === '000000') {
    		this.setSortData(res.data);
    		this.loadSetData();
    	}
	}
    
    /**
    *   내 명함 순서 설정 화면 출력
    * @param 
    *  */
	async loadSetData () {
		
		const items = this.sortData.value;
		let html = '';
		$.each(items, function(idx, val) {
			val.id = val.nmcrInfSrno;
			html += '<div class="list-group-item">';
			html += '		<strong class="title-medium" data-bind="nmcrNm">' + val.nmcrNm + '</strong>';
			html += '		<button type="button" class="handler" aria-label="순서 이동" name="btnSort" value="' + val.id + '"></button>';
			html += '</div>';
		})
		$$('#sortingBusinessCard').html(html);
		
		// sortable
		let sortableOption = {
			group: 'shared',
			animation: 150,
			handle: '.handler', // handle's class
		}
		let sortableLeft = Sortable.create(sortingBusinessCard, sortableOption);
	}
		
    /**
     * 순서변경저장
     */
	async handleBtnClick () {
			 
		let items = this.sortData.value;
		let afArr = [];
		$('button[name=btnSort]').each(function(idx, item) {
			idx = (idx + 1) + '0';
			
			const str = items.filter((data) => {return data.nmcrInfSrno === Number(item.value)});
			str.find((data) => data.nmcrSeqNo = idx);																				// 순서번호 설정
			const arr = str.reduce(function(arr1, arr2) {return arr1.concat(arr2);}); 								// 이차원 배열로 생성됨 방지
			afArr.push(arr);
		})
		this.setSortAftData(afArr);
		
		const url = '/pb/api/nmcr/nmcrSortSave.json';
		const params = {
			nmcrLst: this.sortAftData.value
		};
		
    	const res = await ApiUtils.sendPost(url, params);
        return res;
    }

    destroy () {
    	$$('.modal__footer').show();
        super.destroy(this);
    }
}
