import { BaseModule } from '../../../cmm/BaseModule.js';


export default class LocalStorage extends BaseModule {
    constructor(elem) {
        super(elem);

        [this.inputKey, this.setInputKey] = this.useState('inputKey', '');
        [this.inputVal, this.setInputVal] = this.useState('inputVal', '');
        [this.outKey, this.setOutKey] = this.useState('outKey', '');
        [this.outVal, this.setOutVal] = this.useState('outVal', '');
    }

    init() {
        super.init(this);


        this.bind('inputKey', $$('#inputKey'), 'input');
        this.bind('inputVal', $$('#inputValue'), 'input');
        this.bind('outKey', $$('#outKey'), 'input');
        this.bind('outVal', $$('#outValue'), 'input');

        this.registerCallback('click', $$('#saveBtn'), this.saveVal);
        this.registerCallback('click', $$('#selBtn'), this.selVal);
    }

    saveVal () {
        const res = CmmUtils.setLocalStorageData(this.inputKey.value, this.inputVal.value);
        console.log('saveVal : ' , res);
    }

    selVal () {
        const res = CmmUtils.getLocalStorageData(this.outKey);
        console.log('selVal : ' , res);

    }

    destroy() {
        super.init(this);
    }
}