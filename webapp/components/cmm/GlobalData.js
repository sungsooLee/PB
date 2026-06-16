
/**
 * 	화면별 데이터를 관리한다.
 */
const GlobalData = {
		history : [],		// 히스토리
		components : {},	// 화면별 데이터 객체
		
		/**
		 * 화면 데이터를 설정
		 * @param {*} compName [String] 화면 명
		 * @param {*} data     [Object] 화면별 데이터
		 */
		setData : ( compName, data ) => {
			if ( ! GlobalData.components[compName] ) {
				GlobalData.components[compName] = {};
			}
			
			Object.assign(GlobalData.components[compName], data);
		},
		
		/**
		 * 화면 데이터를 가져온다
		 * @param  {*} compName [String] 화면 명
		 * @return {*} [Object] 화면 데이터
		 */
		getData : ( compName ) => {
			log.debug('getData : ' , compName);
			if ( GlobalData.components.hasOwnProperty(compName) ) {
				return GlobalData.components[compName]; 
			} else {
				return null;
			}
		},
		
		/**
		 * 화면 데이터를 초기화
		 * @param  {*} compName [String] 화면 명
		 */
		clearData : ( compName ) => {
			delete GlobalData.components[compName];
		},
		
		/**
		 * 히스토리에 현재 데이터를 저장
		 * @param {*} compName [String] 화면 명
		 * @param {*} data     [Object] 데이터
		 * 
		 */
		setHistory : ( compName, data ) => {
			GlobalData.history.push({ compName, data : { ...data } });
		},
		
		/**
		 * 히스토리에서 마지막 상태 가져오기
		 */
		popHistory : () => {
			return GlobalData.history.pop() || null;
		},
		
}

export default GlobalData;