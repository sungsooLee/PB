import { BaseModule } from '../../cmm/BaseModule.js';

export class SampleFullPopup extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
    }

	init () {
        super.init(this);
        log.debug('SampleFullPopup init!');
    }

    /**
     * ComPopUtils의 btn1 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn1CallBack () {
        const result = { data : '', resultCd : '999999', resultMsg : 'SampleNormalModel Fail'};
        return result;
    }

    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
        const result = { data : '', resultCd : '000000', resultMsg : 'SampleNormalModel SUCCESS'};
        return result;
    }

    destroy () {
        super.destroy();
        log.debug('sampleNormalModal destroy!');
    }
}