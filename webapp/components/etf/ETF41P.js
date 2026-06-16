/*************************************************************************
* @ 서비스경로 : ETF41P
* @ 파일명      : ETF41P ETF > ETF상세 > 커뮤니티 > 내정보관리
* @ 화면ID	  : PBWFU059901
* @ 작성자      : 90195654
* @ 작성일      : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-01-13            90195654                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class ETF41P extends BaseModule {
	
	constructor(elem) {
		super(elem);
		
		[this.nickname, this.setNickname] = this.useState('nickname', '');
		[this.oldNickname, this.setOldNickname] = this.useState('oldNickname', '');
		[this.avtCd, this.setAvtCd] = this.useState('avtCd', '01');
		
	}
	
	init(param) {
		console.log('ETF > ETF상세 > 커뮤니티 > 내정보관리');

		super.init(this);
		
		$$("#btmBtn2").addAttr("aria-disabled",true);
		$$("#btmBtn2").addAttr("disabled",true);
		
		this.apiPrlmInfo();
		
		this.initRadio();
		
		this.register();
	
	}
	
	/**
	 * 이벤트 등록
	 */
	register() {
			
		this.bind( 'nickname', $$('#nickname'), 'input');
		
		const nickname = $$("#nickname");
		
		const nicknameKeyupCallback = () => {
			let targetVal = event.currentTarget.value;
			const mexLength = 8;
			
			$$("#nicknameForm").removeClass('form-invalid');
			$$("#nicknameErr").text('');
			
			
			targetVal = targetVal.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\u1100-\u1112\u318D\u119E\u11A2\u2022\u2025\u00B7\uFE55\s]/gi,'')
			
			this.setNickname(targetVal);
			nickname.value(targetVal);
				
			if(targetVal.length > mexLength) {
				this.setNickname(targetVal.substr(0,mexLength));
				nickname.value(targetVal.substr(0,mexLength));
			} 
			
			let lengthTxt = '';
			if(this.nickname.value.length>0) {
				lengthTxt = this.nickname.value.length+"/8자";
				$$("#btmBtn2").removeAttr("aria-disabled");
				$$("#btmBtn2").removeAttr("disabled");
			} else {
				lengthTxt = '0/8자';
				$$("#btmBtn2").addAttr("aria-disabled",true);
				$$("#btmBtn2").addAttr("disabled",true);
			}
			$$("#nicknameLength").text(this.nickname.value.length+"/8자");
			
		}
		
		this.registerCallback("keyup", nickname,  nicknameKeyupCallback);
		
		const delNicknameCallback = () => {
			this.setNickname('');
			$$("#nicknameLength").text("0/8자");
			$$("#btmBtn2").addAttr("aria-disabled",true);
			$$("#btmBtn2").addAttr("disabled",true);
		}
		this.registerCallback('click', $$('.input-remove'), delNicknameCallback);
		
	}
	
	async apiPrlmInfo() {
		
		
		const result = await ApiUtils.sendPost('/api/etf/getPrlmInfo.json', {});
		
		//데이터세팅
		if(result.resultCode === '000000') {
			if(result.data.NICKNAME !== '' && result.data.NICKNAME !== 'undefined' && result.data.NICKNAME !== null) {
				$$("#nickname").value(result.data.NICKNAME);
				$$("#nicknameLength").text(result.data.NICKNAME.length + "/8자");
				this.setAvtCd(result.data.AVT_CD);
				
				const selectRadio = $$('input[type="radio"]').elements.find(x => x.value === result.data.AVT_CD) || '';
				if (selectRadio) {
					selectRadio.checked = true;
				}
				
				this.setOldNickname(result.data.NICKNAME);
				this.setNickname(result.data.NICKNAME);
				$$("#btmBtn2").removeAttr("aria-disabled");
				$$("#btmBtn2").removeAttr("disabled");
			} 
			
		}
	}

	/**
	 * 저장 하단버튼 응답콜백
	 */
	
	returnToBtn2CallBack () {
		const param = {
			nickname : this.nickname.value
			, avtCd : this.avtCd.value
		}
		
		
		let result = {};
		if(this.nickname.value.length > 0) {
			if(this.nickname.value === this.oldNickname.value) {
				result = this.apiRegistNickname(param);
			} else {
				result = this.apiCheckDupliNickname(param);
			}
			
			if(result !== null) {
				return result;
			} 
		}
    }
	
	/**
	 * 아바타 선택 라디오버튼 세팅
	 */
	initRadio() {
		
		const selectAvtCd = (event, element) => {
			this.setAvtCd(element.value);
			$$("#btmBtn2").removeAttr("aria-disabled");
			$$("#btmBtn2").removeAttr("disabled");
	    }
		
		$$(document).findByName('avtCd', 'click', selectAvtCd);
	}
	
	/**
	 * 닉네임 중복체크
	 * 
	 */
	async apiCheckDupliNickname(param) {
		
		const result = await ApiUtils.sendPost('/api/etf/checkDupliNickname.json', param);
		
		//데이터세팅
		if(result.resultCode === '000000') {
			if(Number(result.data.DUPLI_NICKNAME) > 0) {
				$$("#nicknameForm").addClass('form-invalid');
				$$("#nicknameErr").text("이미 사용중인 닉네임입니다.");
				return null;
			} else {
				return this.apiRegistNickname(param);
			}
		}
	}

	/**
	 * 닉네임 등록
	 */
	async apiRegistNickname(param) {
		
		const result = await ApiUtils.sendPost('/api/etf/updateNickname.json', param);
		
		//데이터세팅
		if(result.resultCode == '000000') {
			let callBackResult =  {};
			if(result.data.result > 0) {
				callBackResult = {resultCd: '000000', resultMsg: '닉네임이 등록되었습니다.'};
			} else {
				callBackResult = {resultCd: '999999', resultMsg: '닉네임 등록을 실패했습니다.'};
			}
			return result;
		}
	}
	
	
	destroy() {
		super.destroy(this);
	}
	
	
}

