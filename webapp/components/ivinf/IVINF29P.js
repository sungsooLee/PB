/*************************************************************************
* @ 서비스경로 : IVINF29P
* @ 파일명      : IVINF29P.html 투자정보 - 종합 주요지수 - 관심 - 관심지수 편집
* @ 화면ID		: PBWIV070000
* @ 작성자      : 90194835
* @ 작성일      : 2025-01-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-09            윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';
import ListManager from "../../resources/js/common/ListManager.js";

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export class IVINF29P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
        this.rootElem = elem;
		this.callbackFunc = null;
        
        [this.sortData, this.setSortData] 			= this.useState('sortData', '');							// 순서 설정 데이터 - 기존
        [this.sortAftData, this.setSortAftData] 	= this.useState('sortAftData', '');						// 순서 설정 데이터 - 변경
    }

    init (param, callbackFunc ) {
        super.init(this);
        
        this.callbackFunc = callbackFunc;
        
        this.setSortData(param.key);
        
        this.loadSetData();
        
        this.register();
    }
    
    register () {
    	const btnSave = $$('#btnSave');
    	
    	const handleClick = async () => { 
			const res = await this.handleBtnClick();
			
			if(res.resultCode === '000000') {
				toastr.success('', '저장되었습니다.');
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
    *   내 명함 순서 설정 화면 출력
    * @param 
    *  */
	async loadSetData () {
		const items = this.sortData.value;
		
		let html = '';
		$.each(items, function(idx, val) {
			val.id = val.cncrNidxSrno;
			html += '<div class="list-group-item">';
			html += '		<strong class="title-medium" data-bind="cncrNidxNm">' + val.cncrNidxNm + '</strong>';
			html += '		<button type="button" class="handler" aria-label="순서 이동" name="btnSort" value="' + val.id + '"></button>';
			html += '</div>';
		})
		$$('#sortCncrNidx').html(html);
		
		// sortable
		let sortableOption = {
			group: 'shared',
			animation: 150,
			handle: '.handler', // handle's class
		}
		let sortableLeft = Sortable.create(sortCncrNidx, sortableOption);
	}
		
    /**
     * 순서변경저장
     */
	async handleBtnClick () {
			 
		let items = this.sortData.value;
		
		let afArr = [];
		$('button[name=btnSort]').each(function(row, item) {
			let arr = [];
			items.forEach((data, idx) => {
				if(data.cncrNidxSrno === Number(item.value)) {
					data.cncrNidxExpsSeq = (row + 1) + '0';
					arr.push(data);
				}
			});
			afArr.push(arr);
		})
		const arr = afArr.reduce(function(arr1, arr2) {return arr1.concat(arr2);}); 								// 이차원 배열로 생성됨 방지
		console.log(' 데이터 == ' +JSON.stringify(arr) );
		this.setSortAftData(arr);
		
		const url = '/pb/api/ivinf/saveCncrSort.json';
		const params = {
			sortLst: this.sortAftData.value
		};
		
    	const res = await ApiUtils.sendPost(url, params);
        return res;
    }

    destroy () {
        super.destroy();
    }
}
