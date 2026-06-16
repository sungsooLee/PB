import { BaseModule } from '../../cmm/BaseModule.js';

export default class FileUp extends BaseModule {
	constructor(elem) {
		super(elem);
	}
	
	init () {
		super.init(this);
		this.initRegist();
	}
	
	/**
	 * 이벤트 등록
	 */
	initRegist() {

		
		this.registerCallback("click", $$('#voBtn'), this.createVo);
	}


	
	async createVo() {
		
		const voNm = document.getElementById('voNm');
		const mode = document.getElementById('mode');
		const packagePath = document.getElementById('packagePath');
		
		const param = {
				'file' : voNm.value
				, 'mode' : mode.value
				, 'package' : packagePath.value
		}
		const result = await ApiUtils.sendPost('/eai/test/gen.json', param);
		
		log.debug('result : ', result);
	}


	destroy () {
		super.destroy(this);
		log.debug('sampleNormalModal destroy!');
	}
}
