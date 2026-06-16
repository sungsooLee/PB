class ModuleManager {
	constructor(moduleInfos, globalData) {
		this.moduleInfos = moduleInfos; // 컴포넌트 정보 객체
		this.globalData  = globalData;	// 전역 데이터 객체
		//this.modules   = new WeakMap();	// 약한 참조로 모듈 관리
		this.moduleHistory = [];
		this.curModule = null;
		this.curCompNm = null;
		
		log.debug('moduleInfos : ', this.moduleInfos);
	}
	
	async loadModule ( pageNm, params = {} , rootElem ) {
		
		log.debug('loadModule pageNm : ' , pageNm);
		
		if ( this.curModule ) {
			//현재 모듈의 데이터를 저장 후 초기화
			const curData = this.globalData.getData(this.curCompNm) || null;
			
			if ( !curData ) {
				this.globalData.setHistory(this.curCompNm, curData);
				this.globalData.clearData(this.curCompNm);
				
				this.curModule = null;
				this.curCompNm = null;
			}
		}
		
		// 새로운 화면 데이터 세팅
		this.globalData.setData(pageNm, params);
		
		// 모듈 동적 로드
		//try {
			
			log.debug('loadModule route : ' , this.moduleInfos[pageNm]);
			const route = this.moduleInfos[pageNm] || this.moduleInfos['404']

			log.debug('route.jsPath : ' , route.jsPath);
			log.debug('route Path : ' , route.basePath + route.jsPath);

			if ( route.jsPath !== '' ) {
				const { default : ModuleClass} = await import(route.basePath + route.jsPath);

				const moduleInstance = new ModuleClass(rootElem, params);
				this.curModule = moduleInstance;

				//console.log('pageNm : ', typeof pageNm);
				//console.log('moduleInstance : ', typeof moduleInstance);

				if ( moduleInstance ) {
					// 모듈 히스토리에 현재 모듈 적재
					this.moduleHistory.push(moduleInstance);
					//this.moduleHistory[pageNm] = moduleInstance;
					////console.log('loadModule moduleHistory : ',this.moduleHistory);

					if ( !Const.LOADING_HIDE_EXP_PAGE.includes(pageNm)) {
						CmmUtils.hideLoading();
					}
					//(pageNm === 'crmpmng41m')?  CmmUtils.hideLoading(true) : CmmUtils.hideLoading();

					// 레이아웃 버튼 이벤트 초기화
					$$('#layoutBtn1').off();
					$$('#layoutBtn2').off();

					// 모듈 초기화
					moduleInstance.init();

					this.curCompNm = pageNm;

					return moduleInstance;
				} else {
					CmmUtils.hideLoading();
					return null;
				}
			} else {
				CmmUtils.hideLoading();
				return null;
			}
		//} catch ( error ) {
		//	log.debug('Filed to load module `${pageNm}` : ', error);
		//}
	}
	
	/**
	 * 모듈 해제
	 */
	unLoadModule ( moduleKey ) {

		//console.log('moduleKey : ' , moduleKey);
		// console.log('unLoadModule hasKey : ', Object.keys(this.moduleHistory).includes(moduleKey));
		// console.log('hasOwnProperty : ' , this.moduleHistory.hasOwnProperty(moduleKey));
		const idx = this.moduleHistory.length - 1;
		if ( idx !== -1 ) {
			const lastModule = this.moduleHistory[idx];
			//console.log('lastModule : ' , lastModule);
			lastModule.destroy();

			this.moduleHistory.splice(idx, 1);
			//console.log('unloadModule moduleHistory : ' , this.moduleHistory);
		} else {
			log.debug( 'module not found!!');
		}

		// if ( Object.keys(this.moduleHistory).includes(moduleKey)) {
		// 	const moduleInstance = this.moduleHistory[moduleKey];
		// 	moduleInstance.destroy();
		//
		// 	delete this.moduleHistory[moduleKey];
		// 	console.log('unloadModule moduleHistory : ' , this.moduleHistory);
		// } else {
		// 	log.debug( 'module not found!!');
		// }
	}
	
}

export default ModuleManager;