import { BaseModule } from '../../cmm/BaseModule.js';

export class SampleBottomModal extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
    }

    init () {
        super.init(this);
        console.log('SampleBottomModal init!');
    }

    /**
     * ComPopUtils의 btn2 클릭시 콜백 함수에 결과값을 전달한다.
     */
    returnToBtn2CallBack () {
        console.log('SampleBottomModal returnToBtn2CallBack!');
        const result = { data : '', resultCd : '000000', resultMsg : 'SampleBottomModal SUCCESS'};
        return result;
    }

    destroy () {
        super.destroy();
        log.debug('sampleNormalModal destroy!');
    }
}