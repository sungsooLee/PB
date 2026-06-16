/*************************************************************************
* @ 서비스경로 : FND61P
* @ 파일명      : FND61P 펀드 > 나의 관심 펀드 > 펀드 순서 설정
* @ 화면ID	  : PBWFU079900
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/


import { BaseModule } from '../cmm/BaseModule.js';

export class FND61P extends BaseModule {
	
    constructor(elem) {
        
    	super(elem)
    }

    init () {
    	
    	super.init(this);
    	
    	this.apiCncrFndList();
    	
    	const sortableOption = {
			group: 'shared',
			animation: 150,
			handle: '.handler', // handle's class
		}
		let sortableLeft = Sortable.create(sortingBusinessCard, sortableOption);
    }
    
    register() {
    	
    }
    
    async apiCncrFndList() {
		
		
		const result = await ApiUtils.sendPost('/api/fnd/getCncrFndOrderList.json', {});
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this. apiCncrFndListDataset(result.data);
		}
	}
    
    apiCncrFndListDataset(data) {

    	$("#sortingBusinessCard").html('');
    	
    	let html = '';
    	$.each(data, function(idx, item) {
			html += '<div class="list-group-item" id="'+item.PB_FND_PDCD+'">';
			html += '		<strong class="title-medium" data-bind="nmcrNm">' + item.PB_CNCR_FND_NM + '</strong>';
			html += '		<button type="button" class="handler" aria-label="순서 이동" name="btnSort"></button>';
			html += '</div>';
		})
    		
    	$("#sortingBusinessCard").append(html);
    }

    
    /**
	 * 저장 하단버튼 응답콜백
	 */
	
	returnToBtn2CallBack () {
		
		let array = [];
		
		$(".list-group-item").each(function(i,box) { 
			let param = {
				fndPdcd : $$(box).elements[0].id
				, cncrFndSeq : i+1
			}
			array.push(param);
			
		});
	
		const param = {
				cncrFndList : array
		}
		
		return this.apiUpdateCncrFndSeq(param);
		
    }
	
	 async apiUpdateCncrFndSeq(param) {
			
			const result = await ApiUtils.sendPost('/api/fnd/updateCncrFndSeq.json', param);
			
			//데이터세팅
			if(result.resultCode === '000000') {
				return result;
			}
		}
	
    destroy () {
        super.destroy(this);
    }
}
