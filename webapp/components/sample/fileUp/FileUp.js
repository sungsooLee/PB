import { BaseModule } from '../../cmm/BaseModule.js';

export default class FileUp extends BaseModule {
	constructor(elem) {
		super(elem);

		[this.fileNm, this.setFileNm]         = this.useState('fileNm', '');
		[this.filePath, this.setFilePath]     = this.useState('filePath', '');
		[this.fileType, this.setFileType]     = this.useState('fileType', '');
		[this.resultData, this.setResultData] = this.useState('resultData', '');
	}
	
	init () {
		super.init(this);
		this.initRegist();
	}
	
	/**
	 * 이벤트 등록
	 */
	initRegist() {

		this.bind('fileNm' , $$('#fileNm'), 'input');
		this.bind('filePath' , $$('#filePath'), 'input');
		this.bind('resultData' , $$('#resultData'), 'input');


		// 버튼 이벤트 등록
		const myBtn = $$("#myBtn");
		const btnCallBack = () => {
			this.uploadFile();
		}

		// input 파일 change event
		const fileInput = $$("#fileInput");
		const fileInputCallback = async () => {
			log.debug('fileInput changed!!');

			const fileArry = event.target.files;

			const confData = await ApiUtils.sendGet('/api/file/getConfig');
			const maxFileSize    = parseFloat(confData.data.maxFileSize);
			const maxRequestSize = parseFloat(confData.data.maxRequestSize);

			let ttlFileSize = 0;
			for( let i = 0 ; i < fileArry.length ; i++ ) {
				const file = fileArry[i];
				
				const type = file.type;
				this.setFileType(type.substr(type.indexOf('/') + 1));
				
				log.debug('fileSize : ' , CmmUtils.parseSizeToBytes(file.size) );
				log.debug('maxFileSize : ' , maxFileSize);
				log.debug('fileType : ' , this.fileType.value);

				if ( CmmUtils.parseSizeToBytes(file.size) > maxFileSize ) {
					alert(`파일 크기가 ${maxFileSize} MB를 초과하였습니다.`);
					break;
				}

				ttlFileSize += file.size;

				if ( i === fileArry.length - 1) { 
					log.debug('ttlFileSize : ' , CmmUtils.parseSizeToBytes(ttlFileSize) );
					if ( CmmUtils.parseSizeToBytes(ttlFileSize) > maxRequestSize ) { 
						alert(`전체 파일 크기가 ${maxRequestSize} MB를 초과하였습니다.`);
						break;
					}
				}
			}

			const params = {
				fileNm : this.fileNm.value,
				filePath : this.filePath.value,
				fileType : this.fileType.value
			}

			const res = await ApiUtils.uploadFile(fileArry, params );

			console.log('initRegist res : ', res );
		}

		//이벤트 등록
		this.registerCallback("click", myBtn, btnCallBack);
		this.registerCallback("change", fileInput, fileInputCallback);
	}

	/**
	 *  명함이미지 갤러리 선택
	 * @param
	 */
	async handleGalleryInfoClick() {
		$("#fileInput").trigger('click');
	}

	async uploadFile () {
		
		const fileInput = document.getElementById('fileInput');
		const files = fileInput.files;

		console.log('files : ' , files);

		if ( !files || files.length === 0 ) {
			console.log('noFile!!');
			await this.handleGalleryInfoClick();

			console.log('FileSelect!!');
			// alert('업로드할 파일을 고르시오');
			return;
		}

		console.log('ready to Send!!');

		let tFileType = this.fileType.value;

		tFileType = ( tFileType.indexOf('zip') > -1 )? 'zip' : tFileType;

		const params = {
			fileNm : this.fileNm.value,
			filePath : this.filePath.value,
			fileType :tFileType
		}

		const res = await ApiUtils.uploadFile(files, params );
		
		log.debug('res : ', res);
	}

	initDropZone () {
		Dropzone.autoDiscover = false;

		const dropzoneAppOptions = {
			dictDefaultMessage: "JPEG, JPG, PNG 확장자만 가능합니다. 최대 50MB이내로 1개만 업로드 가능합니다. <br> 업로드하려면 여기에 파일을 드롭하거나 여기를 클릭하세요.",
			dictFallbackMessage: "드래그 앤 드롭 파일 업로드를 지원하지 않습니다.",
			dictFallbackText: "예전처럼 파일을 업로드하려면 아래 대체 양식을 사용하세요.",
			dictFileTooBig: "파일이 너무 큽니다({{filesize}}MiB). 최대 파일 크기: {{maxFilesize}}MiB.",
			dictInvalidFileType: "이 유형의 파일은 업로드할 수 없습니다.",
			dictResponseError: "서버가 {{statusCode}} 코드로 응답했습니다.",
			dictCancelUpload: "업로드 취소",
			dictCancelUploadConfirmation: "정말 이 업로드를 취소하시겠습니까?",
			dictRemoveFile: "파일 제거",
			dictMaxFilesExceeded: "더 이상 파일을 업로드할 수 없습니다.",
			paramName: "file",
			maxFilesize: 50, // MB
			addRemoveLinks: true,
			createImageThumbnails: false,
			acceptedFiles: ".jpg,.jpeg, .png",
			uploadMultiple : false,
			url : '/api/file/upload',
			method : 'POST',
			init: function() {
				this.on("success", function(file) {
					console.log("success > " + file.name);
				});
			}
		};

		const appUploader = document.querySelector('.dropzone-attach-app');
		const newDropzone = new Dropzone(appUploader, dropzoneAppOptions);
	}


	destroy () {
		super.destroy(this);
		log.debug('sampleNormalModal destroy!');
	}
}
