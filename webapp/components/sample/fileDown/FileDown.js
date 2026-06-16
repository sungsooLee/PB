import { BaseModule } from '../../cmm/BaseModule.js';


export default class FileDown extends BaseModule {
	constructor(elem) {
		super(elem);
	}


	init () {
		super.init(this);

		log.debug('init!!');
	
	    document.getElementById('downBtn').addEventListener('click', async () => {
	        await this.downloadFile();
	    });
	}

	async downloadFile () {

	    const fileNmInput = document.getElementById('fileNm');
	    const fileNm = fileNmInput.value;
	
	    log.debug('fileNm : ' , fileNm);
	
	    const res = await ApiUtils.fileDownload('/api/file/download', {'fileName' : fileNm});
	    log.debug('res : ' , res);
	}
	
	destroy () {
		super.destroy(this);
		log.debug('sampleNormalModal destroy!');
	}
}