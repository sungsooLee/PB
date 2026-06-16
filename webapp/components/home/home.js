import { BaseModule } from '../cmm/BaseModule.js';

export default class Home extends BaseModule {
	constructor(elem) {
		super(elem);
	}
	
	init () {
		super.init(this);
		log.debug('home!!!!');

		this.initRegist();
	}

	initRegist() {
		
		const ajaxBtn = $$('#ajaxBtn');
		
		const handleClick = async () => { 
			log.debug('handleClick');
			const res = await ApiUtils.sendGet('/api/sample/basic.json', {id : 'aaaa', pass : 'bbbb'});
			
			log.debug('res : ' , res);
		}
		
		
		this.registerCallback('click', ajaxBtn, handleClick);
	}
	
	destroy() {
		super.destroy(this);
	}
}