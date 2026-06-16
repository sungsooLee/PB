/*************************************************************************
* @ 서비스경로 : FND42P
* @ 파일명      : FND42P 펀드 > 펀드상세 > 커뮤니티 답글 등록 팝업
* @ 화면ID	  : PBWFU059902
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class FND42P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		this.callbackFunc = null;
		
		
		$$("#cmtyTxt").text('');
		
		[this.fndPdcd, this.setFndPdcd] = this.useState('fndPdcd', '');					//펀드상품코드
		[this.fndNm, this.setFndNm] = this.useState('fndNm', '');						//펀드명
		[this.hgrnCmtyNo, this.setHgrnCmtyNo] = this.useState('hgrnCmtyNo', ''); 		//상위커뮤니티번호
		[this.rplsCmtyNo, this.setRplsCmtyNo] = this.useState('rplsCmtyNo', ''); 		//댓글 달 커뮤니티번호
		[this.cmtyTxt, this.setCmtyTxt] = this.useState('cmtyTxt', '');					//커뮤니티내용
		[this.cmtyNo, this.setCmtyNo] = this.useState('cmtyNo', '');					//커뮤니티번호
		[this.ncknNmUseYn, this.setNcknNmUseYn] = this.useState('ncknNmUseYn', 'N');	//닉네임사용여부
		[this.ncknNm, this.setNcknNm] = this.useState('ncknNm', '');					//닉네임
		[this.empNm, this.setEmpNm] = this.useState('emp', '');							//직원명
		[this.isModify, this.setIsModify] = this.useState('isModify', false); 			//수정여부
		
	}
	
	init (param, callbackFunc) {
		console.log('펀드 > 펀드상세 > 커뮤니티 > 답글 등록 : ', param );

		this.callbackFunc = callbackFunc;
		
		super.init(this);

		this.register();

		this.bind( 'cmtyTxt', $$('#cmtyTxt') , 'string');

		this.initData(param);
		
	}
	
	initData(param) {
		
		const cmtyNo = param.cmtyNo;
		if(cmtyNo !== '' && cmtyNo !== null && cmtyNo !== undefined) {
			//자신의 글 수정
			this.setIsModify(true);
			this.apiCmtyInfo(param);
		} else {
			//새로운글 또는 댓글
			this.setFndPdcd(param.fndPdcd);
			this.setFndNm(param.fndNm);
			this.setHgrnCmtyNo(param.hgrnCmtyNo);
			this.setRplsCmtyNo(param.rplsCmtyNo);
		}
		this.apiPrlmInfo();
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
			
		const regist_btn = $$("#regist_btn");
		const cmtyTxt = $$("#cmtyTxt");
		
		const contentRegist = () => {
			if(cmtyTxt.value().length > 0) {
				const param = {
					hgrnCmtyNo 			: this.hgrnCmtyNo.value		//상위커뮤니티번호 
					, rplsCmtyNo 		: this.rplsCmtyNo.value		//댓글 달 커뮤니티번호  
					, cmtyTxt	 		: cmtyTxt.value()	//커뮤니티내용    
					, fndPdcd 			: this.fndPdcd.value		//펀드상품코드         
					, fndNm 			: this.fndNm.value			//펀드명   
					, ncknNmUseYn 		: this.ncknNmUseYn.value	//닉네임사용여부    
					, cmtyNo 			: this.cmtyNo.value			//커뮤니티번호
				}                        

				if(this.isModify.value) { //수정    
					this.apiCmtyUpdate(param);
				} else { //글쓰기or답글
					this.apiCmtyRegist(param);
				}
			}
			
		}
		
		const cmtyTxtKeyUp = () => {
			
			let targetVal = event.currentTarget.value;
			const mexLength = 500;
			
			if(event.currentTarget.value.length>0) {
				$$("#regist_btn").removeAttr("aria-disabled");
				$$("#regist_btn").removeAttr("disabled");
				
				if(targetVal.length > mexLength) {
					targetVal = targetVal.substr(0,mexLength);
					this.setCmtyTxt(targetVal);
				}
				
				$$("#cmtyTxt").value(targetVal);
				$$("#txtLength").text(targetVal.length+"/500자");
				
			} else {
				$$("#txtLength").text(0+"/500자");
				$$("#regist_btn").addAttr("aria-disabled",true);
				$$("#regist_btn").addAttr("disabled",true);
			}
		}
		
		
		const ncknNmUseYnCheck = () => {
			if(event.target.checked === true) {
				this.setNcknNmUseYn("Y");
			} else {
				this.setNcknNmUseYn("N");
			}
			console.log("event : " ,event);
		}
		
		this.registerCallback("touchend", regist_btn,  contentRegist);
		this.registerCallback("click", $$("#ncknNmUseYn"),  ncknNmUseYnCheck);
		this.registerCallback("keyup", cmtyTxt, cmtyTxtKeyUp);
	}
	
	async apiPrlmInfo() {
		
		
		const result = await ApiUtils.sendPost('/api/fnd/getPrlmInfo.json', {});
		
		//데이터세팅
		if(result.resultCode === '000000') {
			$$("#nickname").text(result.data.NICKNAME+"(으)로 등록");
			this.setNcknNm(result.data.NICKNAME);
			this.setEmpNm(result.data.empNm);
		}
	}
	
	async apiCmtyInfo(param) {
		
		const result = await ApiUtils.sendPost('/api/fnd/getCmtyInfo.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.apiCmtyInfoDataSet(result.data);
		}
	}
	
	apiCmtyInfoDataSet(data) {
		
		this.setCmtyNo(data.PB_CMTY_NO);
		this.setCmtyTxt(data.PB_CMTY_TXT);
		this.setFndPdcd(data.PB_FND_PDCD);
		this.setHgrnCmtyNo(data.PB_HGRN_CMTY_NO);
		this.setRplsCmtyNo(data.PB_RPLS_CMTY_NO);
		this.setNcknNmUseYn(data.PB_NCKN_USG_YN);
		
		$$("#txtLength").text(data.PB_CMTY_TXT.length+"/500자");
		
		$$("#regist_btn").removeAttr("aria-disabled");
		$$("#regist_btn").removeAttr("disabled");
		
		if(data.PB_NCKN_USG_YN === 'Y') {
			$$("#ncknNmUseYn").addAttr("checked",true);
		} 
	}

	async apiCmtyUpdate(param) {
		
		const result = await ApiUtils.sendPost('/api/fnd/updateCmty.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.callbackFunc(result);
		}
	}
	
	async apiCmtyRegist(param) {
		
		const result = await ApiUtils.sendPost('/api/fnd/insertCmty.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			this.callbackFunc(result);
		}
	}

	

	destroy() {
		super.destroy(this);

		this.setFndPdcd('');		//펀드상품코드
		this.setFndNm('');		//펀드상품코드
		this.setHgrnCmtyNo(''); 	//상위커뮤니티번호
		this.setRplsCmtyNo(''); 	//댓글 달 커뮤니티번호
		this.setCmtyTxt('');		//커뮤니티내용
		this.setCmtyNo('');			//커뮤니티번호
		this.setNcknNmUseYn('');	//닉네임사용여부
		this.setIsModify(''); 	    //수정여부

	}
	
	
}

