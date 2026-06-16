import { BaseModule } from '../../cmm/BaseModule.js';

export default class List extends BaseModule {
    constructor(elem) {
        super(elem);
    }

    init () {
        super.init(this);
    }

    /**
     * 이벤트 등록
     */
    register(registerCallback) {

    }

    destroy () {
        super.destroy(this);
    }
}
