
/**
 *  Api 호출 관련 유틸리티
 */
const ApiUtils =  {

	/**
	 * post 통신을 처리한다.
	 * @param url		[String] :  api url
	 * @param params	[Object] :  전달 파라미터 객체
	 * @param isManual  [boolean] :  로딩 수동으로 조작 여부 ( true로 지정 시 로딩을 닫는 명령어는 따로
	 *                               실행하여야 함 )
	 * @param isHide	[boolean] :  통신시에 로딩을 숨길지 여부 ( 값이 있는 경우 로딩을 표시 하지 않는다.)
	 */
	sendPost : async ( url, params, isManual, isHide = null ) => {
		return new Promise( function ( resolve, reject) {
			log.debug('sendPost!!!');

			if ( isHide === null ) {
				CmmUtils.showLoading();
			}

			axios.post(url, params).then((response) => {
				ApiUtils.afterProcess(resolve, reject, response, isManual);
			}).catch((error) => {
				CmmUtils.hideLoading();
				reject(error);
			});
		});
	},

	/**
	 * GET 통신을 처리
	 * @param url		[String] : api url
	 * @param data		[Object] : 전달 파라미터 객체
	 * @param isManual  [boolean] : 로딩 수동으로 조작 여부 ( true로 지정 시 로딩을 닫는 명령어는 따로
	 *                               실행하여야 함 )
	 */
	sendGet : async ( url, data, isManual ) => {
		return new Promise( function ( resolve, reject) {
			log.debug('sendGet!!!');

			CmmUtils.showLoading();

			axios.get(url, {params : data}).then(function(response){
				ApiUtils.afterProcess(resolve, reject, response, isManual);
			}).catch(function(error){
				CmmUtils.hideLoading();
				reject(error);
			});
		});
	},


	fileDownload : async (url, data, token = null) => {
		axios.post(url, data, {
			responseType : 'blob',
			headers : token? { Authorization : 'Bearer ${token}'} : {}
		}).then( res => {
			if (res.status === 200 ) {
				const contentDisposition = res.headers['content-disposition'];
				const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
				const fileName = fileNameMatch ? fileNameMatch[1] : 'defaultFileName';


				const urlBlob = window.URL.createObjectURL( new Blob([res.data]));
				const link = document.createElement('a');
				link.href = urlBlob;
				link.download = fileName;
				document.body.appendChild(link);
				link.click();

				link.parentNode.removeChild(link);
				window.URL.revokeObjectURL(urlBlob);	
			}
		}).catch( error => {
			if ( error.response && error.response.status === 404 ) {
				CmmUtils.alert('', '파일이 존재하지 않습니다.', {
					btnLabel : '확인',
					useCancelBtn : false
				});
			} else {
				CmmUtils.alert('','파일 다운로드 중 오류가 발생하였습니다.', {
					btnLabel : '확인',
					useCancelBtn : false
				});
			}
		});
	},
	
	uploadFile : async ( files, additionalData = {}, token = null ) => {
		
		log.debug('uploadFile!!!');
		
		const confData = await ApiUtils.sendGet('/api/file/getConfig');
		
		log.debug('confData : ' , confData.data);
				
		const formData = new FormData();
		for ( let i = 0 ; i < files.length ; i++) {
			const file = files[i];
			
			log.debug('file.size : ' , file.size);

			if ( CmmUtils.parseSizeToBytes(file.size) > parseFloat(confData.data.maxFileSize) ) {
				alert(`파일 크기가 ${parseFloat(confData.data.maxFileSize)} MB를 초과하였습니다.`);
				return;
			}			
			
			formData.append('files',file);
		}
		
		// 추가 데이터가 있는경우에 params로 같이 전달
		if ( additionalData ) {
			console.log('additionalData : ' ,additionalData);
			formData.append('params', JSON.stringify(additionalData) );
		}

		log.debug('formData : ' , formData);

		const url = '/api/file/upload';
		
		const res = await axios.post( url, formData, {
			headers : {
				'Content-Type' : 'multipart/form-data',
				...(token && {Authorization : `Bearer ${token}`}),
			},
			onUploadProgress : (progressEvent) => {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				log.debug('upload progress : ', percentCompleted);
			}
		});
		
		return res.data;
	},
	
	/**
	 * api 통신 후에 후처리를 위한 함수
	 * @param resolve       [Object]  : promise resolve 객체
	 * @param reject		[Object]  : promise reject 객체
	 * @param response		[Object]  : api 응답 데이터 객체
	 * @oaram isManual		[booealn] : 로딩을 수동 조작 여부
	 */
	afterProcess : async ( resolve, reject, response, isManual) => {
		const data = response.data;

		if ( !isManual ) {
			CmmUtils.hideLoading();
		}

		if ( data.errorYn === 'Y' ) {
			CmmUtils.hideLoading();
			const msg = (data.resultMsg) ?  data.resultMsg : '일시적인 오류가 발생하였습니다.\n잠시후 다시 시도해주세요.';
			CmmUtils.alert('', msg, {status : 'caution'});
			
			reject(data);
		} else { 
			// 로그인정보가 없을 시, 로그인 페이지로 이동처리
			if(data.resultCode === '900001') {
				const msg = (data.resultMessage) ?  data.resultMessage : '일시적인 오류가 발생하였습니다.\n잠시후 다시 시도해주세요.';
				await CmmUtils.alert('', msg, {status : 'caution' });
				
				// 뒤로가기 방지..
				
				// 강제로 로그인 페이지로 전환
				window.globalApp.router.navigate('lgin40m');	
				
				return;
			}
			resolve(data);
		}
	},
	
	/**
	 * front 에서 발생하는 에러로그를 서버에 저장한다.
	 */
	serverLogging : async ( params ) => {
		const url = '/api/common/logging/frontEndLogging.json';
		
		return new Promise(function(resolve, reject) { 
			aixos.post(url, params).catch(function(error) { 
				console.error(error);
			});
		});
	},
};