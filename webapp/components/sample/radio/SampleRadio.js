import { BaseModule } from '../../cmm/BaseModule.js';

export default class SampleRadio extends BaseModule {
    constructor(elem) {
        super(elem);
    }

    init () {
        super.init(this);
        log.debug('SampleRadio!!!!');

        this.initRegist();
    }

    initRegist() {
        $$(document).findByName('rad001', 'click', this.rad1Callback);
        $$(document).findByName('rad002', 'click', this.rad2Callback);
        $$(document).findByName('rad003', 'click', this.rad3Callback);
    }

    rad1Callback (event, element) {
        console.log('Element clicked : ', element);
        console.log('rad1Callback val : ', element.value);
    }

    rad2Callback (event, element) {
        console.log('Element clicked : ', element);
        console.log('rad2Callback val : ', element.value);

    }

    rad3Callback (event, element) {
        console.log('Element clicked : ', element);
        console.log('rad3Callback val : ', element.value);
    }

    destroy() {
        super.destroy(this);
    }
}