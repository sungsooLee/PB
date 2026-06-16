import { BaseModule } from '../../../cmm/BaseModule.js';
import GlobalApp from "/components/cmm/GlobalApp.js";

const globalApp = GlobalApp;

export default class SampleDatePicker extends BaseModule {
    constructor(elem) {
        super(elem);

        [this.startM, this.setStartM] = this.useState('startM', '2023-11');
        [this.endM, this.setEndM] = this.useState('endM', '2024-11');
    }

    init() {
        super.init(this);

        this.registerCallback('click', $$('#startDtBtn'), this.clickMonthDate);
        this.registerCallback('click', $$('#endDtBtn'), this.clickMonthDate);
        this.registerCallback('click', $$('#btnDatePicker'), this.clickDate);
    }

    async clickMonthDate (event) {
        console.log('event : ', event.target.id );

        const inputElem = ( event.target.id === 'startDtBtn') ? $$('#startDtBtn') : $$('#endDtBtn');

        await globalApp.popupUtils.openDatePickerPopup('2022-12', Const.PickerType.MONTH,{
            showCloseBtn : false,
            inputElem : inputElem,
            minYear : 2018,
            maxYear : 2022,
            setDate : 2020,
            modalTitle : 'Month Calendar',
            onCallback: (result) => console.log('on Callback : ', result),
            onClose : (result) => console.log('onClose Result : ' , result)
        });

    }

    async clickDate (event) {
        console.log('event : ', event.target.id );

        const prevVal =  $$('#btnDatePicker').text();
        console.log('prevVal : ', prevVal );

        let inputVal = ''
        if ( !prevVal || prevVal === '' ) {
            const now = dayjs();
            inputVal = now.format('YYYY-MM-DD')
        } else {
            inputVal = prevVal;
        }

        console.log('inputVal : ', inputVal);

        await globalApp.popupUtils.openDatePickerPopup(inputVal, Const.PickerType.DATE,{
            showCloseBtn : true,
            inputElem : $$('#btnDatePicker'),
            modalTitle : 'Calendar',
            //isDisabledFuture : true,
            //isDisabledPast : true,
            onSelect: (result) => console.log('onSelect : ', result),
            onClose : (result) => console.log('onClose Result : ' , result)
        });
    }


    destroy() {
        super.destroy(this);
    }
}