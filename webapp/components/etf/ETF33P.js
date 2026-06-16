/*************************************************************************
* @ 서비스경로 : FND33P
* @ 파일명      : FND33P ETF > ETF 상세 > ETF >  투자설명서 및 약관
* @ 화면ID	  : PBWFU049903
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export class ETF33P extends BaseModule {
	
    constructor(elem) {
    	super(elem);

		[this.didTimeOut, this.setDidTimeOut] = this.useState('didTimeOut', 'N');
    }

    init (param) {
    	
    	super.init(this);
    	console.log('FND33P param : ', param);
    	
    	$.each(param.agrtOrInmd, function(idx, item) {
    		$$("#"+item.PLM_PAPS_CD).css({'display':'flex'});
    		$$("#"+item.PLM_PAPS_CD).value(item.PLM_PDCD+'/'+item.PLM_ANX_SAVE_FILE_NM+'/'+item.PLM_ATFL_SIZE_CN);
		});
    	
    	this.register();
  
    }
    
    register() {
    	/**
    	 * 투자설명서 및 약관 팝업오픈
    	 */
    	const pdfViewerOpen = async (event, element) => {
			const _this = this;
			// 재시도 시 타임아웃 초기화
			_this.setDidTimeOut('N');
			
			// Timeout 시간 30초 현재 임시로 1초
			const sec = 30;
			
			// 토스트 띄움
			toastr.alert(`<p class="fs-14 fw-500 mt-10">파일 크기나 네트워크 상태에 따라 ${sec}초 이상 걸릴 수 있습니다.</p> `, '<div class="file-attach-loading fs-16 fc-brandPrimary-blue400 gap6">파일 다운로드중입니다.</div>', {
				"positionClass": ["toast-bottom-center", "toast-dimmed"],
				"closeButton": true,
				"timeOut": sec*1000,
				"tapToDismiss": false,
				"extendedTimeOut": 10000000000,
				"preventDuplicates": false,
				"disableTimeOut": true,
				"onHidden": (()=>{ _this.setDidTimeOut('Y'); }) 
			})
						
			await checkFileGeneration(element);
    	}
		
		
		/**
		 * 토스트로 다운로드(전환)을 대기하는 동안 파일 생성을 확인한다
		*/
		const checkFileGeneration = async (element) => {
			
			const plmodcd  = element.value.split('/')[0];
			const filenm   = element.value.split('/')[1];
			const fileSize = element.value.split('/')[2];

			console.log('checkFileGeneration fileSize : ' + fileSize);

			// 개발서버 테스트용
			// const plmodcd = "P040000874";
			// const filenm = "DS008_20180409000100006524.hwp";

			let param = {
				plmodcd : plmodcd,
				filenm : filenm,
			};
	
			// 파일 존재 여부 확인
			const result = await ApiUtils.sendPost('/api/fnd/getAgrtOrInmd.json', param, true, false);

			// TODO 파일사이즈와 서버에서 내려준 파일 사이즈 비교하여 같으면 뷰어 오픈처리

			// 파일이 있는 경우
			if(result.data.isExists === 'Y') {
				// TODO [임시처리]30초 대기 후 pdf 파일을 오픈한다.
				setTimeout(async () => {
					toastr.clear();
					await GlobalApp.popupUtils.openPdfViewer({fileName: filenm, fileType: '02'})
				},3000)
			} else if(this.didTimeOut.value === 'Y') {
				callAlertToRetry(element)
				toastr.clear();
			} else {
				checkFileGeneration(element);
			}
			
		}


		/**
		 * 파일 다운로드 실패. 재시도 컨펌창 호출
		 */
		const callAlertToRetry = async (el) => {
			let result = await CmmUtils.confirm(
				'파일 다운로드에 실패했습니다.',
				'다시 다운로드 받으시겠습니까?', 
				{ 
					okLabel: '예',
					noLabel: '아니요',
					icon: 'caution'
				}
			);
			if(result.resultCd === '000000'){
				pdfViewerOpen(null, el)
			}
		}

    	$$(document).findByName('pdfViewer', 'click', pdfViewerOpen);
    }
    
    destroy () {
        super.destroy(this);
    }
}
