import { BaseModule } from '../../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export default class SampleModal extends BaseModule {
    constructor(elem) {
        super(elem);
    }

    init () {
        super.init(this);
        log.debug('SampleModal!!!!');

        this.registerCallback('click', $$('#popupBtn'), async () => await this.handlePopup());
        //$$('#popupBtn').on('click', async () => await this.handlePopup());
    }

    async handlePopup () {
        const val = document.querySelector('input[name="rad001"]:checked').value;
        log.debug('val ==> : ', val);

        const popObj = this.returnPopupObj(val);

        if ( val === 'normal' ) {
            await GlobalApp.popupUtils.openPopup(popObj.class, {
                showCloseBtn : true,
                btn1Label : '아니요',
                btn2Label : '예',
                btn1IsMain : false,
                btn2IsMain : true,
                params : { value : '1111111' },
                onYes: (result) => console.log('on Yes Result : ' , result),
                onNo: (result) => console.log('on No Result : ', result),
                onCallback: (result) => console.log('on Callback : ' , result ),
                onClose : (result) => console.log('onClose Result : ' , result),
            });
        } else if ( val === 'oneButton' ) {
            await GlobalApp.popupUtils.openPopup(popObj.class, {
                showCloseBtn : false,
                btn2Label : '예',
                onYes: (result) => console.log('on Yes Result : ' , result),
                onClose : (result) => console.log('onClose Result : ' , result),
            });
        } else if ( val === 'full' ) {
            await GlobalApp.popupUtils.openPopup(popObj.class, {
                showCloseBtn : true,
                onClose : (result) => console.log('onClose Result : ' , result),
            });
        }
    }

    returnPopupObj (val) {

        let rtnObj = {};

        switch ( val ) {

            case 'normal' :
                rtnObj['class'] = 'SampleNormalModal';
                rtnObj['type']  = Const.PopupLayout.NORMAL;
                break;

            case 'oneButton' :
                rtnObj['class'] = 'SampleBottomModal';
                rtnObj['type']  = Const.PopupLayout.BOTTOM;
                break;

            case 'full' :
                rtnObj['class'] = 'SampleFullPopup';
                rtnObj['type']  = Const.PopupLayout.FULL;
                break;

            default :
                rtnObj['class'] = 'SampleNormalModal';
                rtnObj['type']  = Const.PopupLayout.NORMAL;
                break;
        }

        return rtnObj;
    }

    destroy() {
        super.destroy(this);
    }
}