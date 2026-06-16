/*************************************************************************
* @ 서비스경로 : MNG02M
* @ 파일명      : MNG02M.html 관리 > 커뮤니티 관리 > 목록
* @ 화면ID		: PBWAD020000
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-17            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

export default class MNG02M extends BaseModule {
	
    constructor(elem) {
        
    	super(elem);
    	
    	[this.keywordCd, this.setKeywordCd] = this.useState('keywordCd', '1');
    	[this.keyword, this.setKeyword] = this.useState('keyword', '');
    	[this.startDtm, this.setStartDtm] = this.useState('startDtm', '');
    	[this.endDtm, this.setEndDtm] = this.useState('endDtm', '');
    	
    	[this.dataList, this.setDataList] = this.useState('dataList', [{
            label : '등록자',
            value : '1',
            isSelected : false
        },{
            label : '닉네임',
            value : '2',
            isSelected : false
        },{
            label : '부점',
            value : '3',
            isSelected : false
        },
        {
            label : '펀드명',
            value : '4',
            isSelected : false
        },
        {
            label : '내용',
            value : '5',
            isSelected : false
        }]);
    }

    init () {
    	
    	super.init(this);
    	
    	$$(".memo-list").html('');
    	$$("input").addAttr("autocomplete","off");
    	
    	this.initData();
    	
    	this.apiCmtyList();
  
    	this.register();
    }
    
    register() {
    	this.registerCallback('click', $$('#startDtm'), this.clickDate);
    	this.registerCallback('click', $$('#endDtm'), this.clickDate);
    	
    	this.registerCallback('click', $$(".input-remove"), this.initData);
    	
    	this.registerCallback('click', $$('#selBtn'), this.selBoxClick);
    	
    	this.registerCallback('click', $$('#search'), this.apiCmtyList);
    	
    	const keywordChange = () => {
			if(event.currentTarget.value.length > 1) {
				$$("#keywordForm").removeClass('form-invalid');
				$$(".validate-text").text('');
			}
		}
    	const keyword = $$("#keyword"); //검색어
    	this.registerCallback("keyup", keyword, keywordChange);		//검색어 keyup이벤트
    	
    	const searchTxtEnter = async (e) => {
			if(e.keyCode === 13) {
				this.apiCmtyList();
	 		}
		}
    	this.registerCallback('keydown',keyword, searchTxtEnter);
    }

    initData() {
    	
    	this.bind( 'keyword', $$('#keyword'), 'input');
    	
    	const format = 'YYYY-MM-DD';
    	
    	const now = dayjs();
        this.setEndDtm(now.format(format));
        
        const refDt = dayjs(this.endDtm.value, 'day');
        this.setStartDtm(refDt.subtract('6', 'day').format(format));
        
        $("#startDtm").text(this.startDtm.value);
        $("#endDtm").text(this.endDtm.value);
        
        this.setKeywordCd('1');
        this.setKeyword('');
        
    }
    
    async clickDate (event) {
        console.log('event : ', event.target.id );

        const inputVal =  $$('#'+event.target.id).text();

        await globalApp.popupUtils.openDatePickerPopup(inputVal, Const.PickerType.DATE,{
            inputElem : $$('#'+event.target.id),
            modalTitle : '날짜 선택',
            onSelect: (result) => {
            	
            	let startDtm = '';
            	let endDtm = '';
            	if(event.target.id === 'startDtm') {
            		startDtm = result.date;
            		endDtm = $$("#endDtm").text();
            		
            	} else {
            		startDtm = $$("#startDtm").text();
            		endDtm = result.date;
            	}
            	
            	if(startDtm.replaceAll('-','') <= endDtm.replaceAll('-','')) {
            		$$("#dateForm").removeClass('form-invalid');
        			$$("#dateErr").text('');
            		return;
            	}
            	
            },
            onClose : (result) => console.log('onClose Result : ' , result)
        });
    }
	     
    /**
	 * 검색대상 
	 */
	selBoxClick (event) {

		const idx = this.dataList.value.findIndex((item) => item.value ===  this.keywordCd.value);
		const defaultComment = this.dataList.value[idx].label;
		
        const g = this;
        GlobalApp.popupUtils.openSelectModal(this.dataList.value , {
            showCloseBtn : true,
            btnElem : event.currentTarget,
            modalTitle : '옵션 선택',
            defaultSelectIndex : idx,
            defaultComment : defaultComment,
            onClose : (result) => {
            },
            onCallback : (result) => {
                console.log('callback Result : ' , result);
                
                $$("#selBtn").removeClass("is-modal-open");
                
                if(result.resultCd == '000000') {
	                this.setKeywordCd(result.data)
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
            }
        });
    }
    
	 
    
    /**
	 * 커뮤니티 글 조회
	 */
	async apiCmtyList() {
		
		const keyword = this.keyword.value.trim();
		this.setStartDtm($("#startDtm").text());
		this.setEndDtm($("#endDtm").text());
		

		if(this.startDtm.value.replaceAll('-','') > this.endDtm.value.replaceAll('-','')) {
			$$("#dateForm").addClass('form-invalid');
			$$("#dateErr").text('시작일과 종료일를 확인해 주세요.');
    		return;
    	}
		const currentDate = new Date();
		
		const [startYear, startMonth, startDay] = this.startDtm.value.split('-').map(Number);
		const [endYear, endMonth, endDay] = this.endDtm.value.split('-').map(Number);
		
		const startDate = new Date(startYear, startMonth-1, startDay);
		const endDate = new Date(endYear, endMonth-1, endDay);
		
		if(startDate > currentDate) {
			$$("#dateForm").addClass('form-invalid');
			$$("#dateErr").text('시작일은 오늘 이후 날짜를 선택할 수 없습니다.');
    		return;
		}
		
		if(endDate > currentDate) {
			$$("#dateForm").addClass('form-invalid');
			$$("#dateErr").text('종료일은 내일 이후 날짜를 선택할 수 없습니다.');
    		return;
		}
		
		if(keyword !== '' && keyword.length < 2) {
			$$("#keywordForm").addClass('form-invalid');
			$$("#keywordErr").text('검색어를 2자 이상 입력해주세요.');
			$("#keyword").focus();
			return;
		}
		
		
		const param = {
			keywordCd: this.keywordCd.value,
			keyword : this.keyword.value,
			startDtm : this.startDtm.value,
			endDtm : this.endDtm.value
        };
		const result = await ApiUtils.sendPost('/api/mng/getCmtyList.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			
			if(result.data.length < 1) {
				$$("#no-result").css({'display':'flex'});
				$$(".memo-list").css({'display':'none'});
				return;
			} else {
				await this.apiCmtyListDataSet(result.data);
				$$("#no-result").css({'display':'none'});
				$$(".memo-list").css({'display':'block'});
				this.initButton();
			}
			
		} else {
			const res = CmmUtils.alert('', result.resultMessage, {
	            btnLabel : '확인',
	            status : 'caution'
	        });
			if(res) {
				$$("#no-result").css({'display':'flex'});
				$$(".memo-list").css({'display':'none'});
			}
		}
	}
	
	apiCmtyListDataSet(data) {
		
		const _this = this;
		let html = '';
		
		 $.each(data, function(i, item){
			
			const RGPE_DEPT_NM = item.RGPE_DEPT_NM === null ? '' : item.RGPE_DEPT_NM;
			const RGPE_TEAM_NM = item.RGPE_TEAM_NM === null ? '' : item.RGPE_TEAM_NM;
			const NICKNAME = item.PB_NICKNAME === null ? '' : item.PB_NICKNAME;
			const RPLS_EMP_NM = item.RPLS_EMP_NM === null ? '' : item.RPLS_EMP_NM;

			html += '<div class="memo-inner is-toggled">';
			html += '	<p>'+item.PB_CMTY_TXT+'</p>';
			html += '	<dl class="flex-column gap8 a-start">';
			html += '		<dt>';
			html += '			'+item.PB_EMP_NM+'<span class="fc-typography-gray fw-400 ml8">'+NICKNAME+'</span>';
			html += '		</dt>';
			html += '		<dd>';
			html += '			<div class="divide-list mt0">';
			html += '				<span>'+item.PB_DEPT_NM+'</span>';
			html += '				<div class="division h14 mx8"></div>';
			html += '				<span>'+item.PB_FST_RGS_DTM+'</span>';
			html += '				<div class="division h14 mx8"></div>';
			html += '				<span>'+item.PB_LST_AMD_DTM+'</span>';
			html += '			</div>';
			html += '		</dd>';
			html += '	</dl>';
			html += '	<div class="mt24">';
			html += '		<a name="goDetail" data-fndpdcd="'+item.PB_FND_PDCD+'"';
			html += '			class="anchor chevron fs-16 fc-status-active normal-wrap p0">'+item.PB_FND_NM+'</a>';
			html += '	</div>';
			html += '	<div class="memo-btn mt24">';
			html += '		<div class="right">';
			html += '			<button type="button" class="btn-noborder" name="delBtn" value="'+item.PB_CMTY_NO+'">';
			html += '				<i class="ico-delete"></i>삭제</button>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';
				
        });
		
		 $$(".memo-list").html(html);
	}
	
	initButton() {
		/**
		 * 삭제 버튼 클릭
		 */
		const delBtn = async (event, element) => {
			
			const cmtyNo = element.value;
			
			const result = await CmmUtils.confirm('삭제하시겠습니까?', "" ,{
	        	okLabel : '예',
	            noLabel : '아니요',
	            status : 'caution'        
	        });
			if(result.resultCd === '000000') {
				const param = {
					cmtyNo : cmtyNo
					,delYn : 'Y'
				}
				this.apiCmtyDelete(param);
			}
		}
		
		$$(document).findByName('delBtn', 'click', delBtn);
		
		/**
		 * 펀드상세 클릭
		 */
		const goDetail = async (event, element) => {
			
			const fndPdcd = element.dataset.fndpdcd;
			const fndNm = element.text;
			const param = {
    			fndPdcd : fndPdcd
    			, fndNm : fndNm
    		}
        	router.navigate('fnd30s',param);
		}
		
		$$(document).findByName('goDetail', 'click', goDetail);
	}
	

	/**
	 * 커뮤니티 글 삭제
	 */
	async apiCmtyDelete(param) {
		
		const result = await ApiUtils.sendPost('/api/mng/delCmty.json', param);
		
		// 데이터세팅
		if(result.resultCode === '000000') {
			if(result.errorYn !== 'Y') {
				if(param.delYn === 'Y') {
					toastr.caution(``, '삭제 되었습니다.');
				}
				this.apiCmtyList();
			} else {
				toastr.error('', '일시적인 서비스 장애가 발생하였습니다. 잠시 후 다시 이용해 주세요.');
			}
		
		} else {
			toastr.error('', result.resultMessage);
		}
	}
	
    destroy () {
        super.destroy(this);
    }
}
