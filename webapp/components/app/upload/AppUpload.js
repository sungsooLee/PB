import { BaseModule } from '../../cmm/BaseModule.js';

export default class AppUpload extends BaseModule {
    constructor(elem) {
        super(elem);
        this.rootElem = elem;
    }

    init() {
        super.init(this);

        this.initDropZone();
    }

    initDropZone () {
        Dropzone.autoDiscover = false;

        const dropzoneAppOptions = {
            dictDefaultMessage: "APK, API 확장자만 가능합니다. 최대 50MB이내로 1개만 업로드 가능합니다. <br> 업로드하려면 여기에 파일을 드롭하거나 여기를 클릭하세요.",
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
            acceptedFiles: ".apk,.ipa",
            uploadMultiple : false,
            url : '/api/file/uploadApp',
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
    }
}