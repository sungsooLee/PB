import { BaseModule } from '../../cmm/BaseModule.js';

export default class AppDown extends BaseModule {
    constructor(elem) {
        super(elem);
        this.rootElem = elem;

        [this.apkFileNm, this.setApkFileNm] = this.useState('apkFileNm', '');
        [this.appFileNm, this.setAppFileNm] = this.useState('appFileNm', '');

    }

    async init () {
        super.init(this);

		// ipa 링크 동적 처리
		document.getElementById('ipaLink').href = ( EnvUtils.isPrd())? Const.IPA_LINK.PRD : Const.IPA_LINK.DEV;

        this.registerCallback('click', $$('#btnApk'), () => this.downloadFile('/app/RMWon.apk'));
      //  this.registerCallback('click', $$('#btnApp'), () => this.downloadFile('/app/pbwon.ipa'));
    }

    async downloadFile (fileUrl) {
       // log.debug('fileExp : ' , fileExp);
       // await ApiUtils.fileDownload('/api/file/downloadApp', {'appType' : fileExp});
    	fetch(fileUrl, {
    		method : 'GET',
    		headers: {
    			//'Content-Type':'application/octet-stream'
    		}
    	})
    	.then(response => {
    		if(!response.ok) {
    			alert("다운로드 실패")
				return false;
    		}
    		return response.blob();
    	})
    	.then(blob => {
    		const link = document.createElement('a');
    		const url = URL.createObjectURL(blob);
    		link.href = url;
    		link.download = "RMWon."+fileUrl.split('.')[1];
    		document.body.appendChild(link);
    		link.click();
    		document.body.removeChild(link);
    		URL.revokeObjectURL(url);
    	})
    	.catch(error=> {
    		console.log("에러");
    	})
    }

    destroy() {
        super.destroy(this);
    }
}