import { BaseModule } from '../cmm/BaseModule.js';

export default class SampleMain extends BaseModule {
	constructor(elem) {
		super(elem);
	}
	
	init () {
		super.init(this);
		log.debug('SampleMain!!!!');
	}
	
	destroy() {
		super.destroy(this);
	}
}