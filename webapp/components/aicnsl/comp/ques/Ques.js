import { BaseModule } from '../../../cmm/BaseModule.js';

export default class Ques extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
    }

    init (data) {
        super.init(this);

        console.log('Ques init : ', data);
        if ( !CmmUtils.isEmptyObject(data) ) {
            console.log('QuesVal : ', data.quesVal);
            $$(this.rootElem).find('#quesBubble').text(data.quesVal);
        }
    }

    destroy() {
        super.destroy(this);
    }
}