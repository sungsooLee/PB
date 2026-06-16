import { BaseModule } from '../../cmm/BaseModule.js';
import GlobalApp from "../../cmm/GlobalApp.js";

export default class SampleSelect extends BaseModule {
    constructor(elem) {
        super(elem);

        [this.selectVal, this.setSelectVal] = this.useState('selectVal', '4');
        [this.selectedVal, this.setSelectedVal] = this.useState('selectedVal', '0');
        [this.dataList, this.setDataList] = this.useState('dataList', [{
            label : '옵션1',
            value : 'opt1',
            isSelected : false
        },{
            label : '옵션2',
            value : 'opt2',
            isSelected : false
        },{
            label : '옵션3',
            value : 'opt3',
            isSelected : false
        },{
            label : '옵션4',
            value : 'opt4',
            isSelected : false
        },{
            label : '옵션5',
            value : 'opt5',
            isSelected : true
        },{
            label : '옵션6',
            value : 'opt6',
            isSelected : true
        }]);
    }

    init() {
        super.init(this);
        log.debug('SampleSelect!!!!');

        this.bind('selectedVal',$$('#selectVal'), 'input' );

        this.registerCallback('click', $$('#selBtn'), this.selBoxClick);
        this.registerCallback('click', $$('#goBtn'), this.goToPage);
    }

    selBoxClick (event) {

        console.log('event : ' , event.currentTarget);

        const g = this;
        GlobalApp.popupUtils.openSelectModal(this.dataList.value , {
            showCloseBtn : true,
            btnElem : event.currentTarget,
            modalTitle : '옵션 선택',
            defaultSelectIndex : 0,
            onClose : (result) => {
                console.log('close Result : ' , result);
            },
            onCallback : (result) => {
                console.log('callback Result : ' , result);
                this.setSelectedVal(result.data);

                const tmpList = [];
                g.dataList.value.forEach((item) => {
                    if ( item.value === result.data ) {
                        item.isSelected = true;
                    } else {
                        item.isSelected = false;
                    }
                    tmpList.push(item);
                });

                g.setDataList(tmpList);
            }
        });

        //console.log('dataList : ' , this.dataList.value);
    }

    selChanged (event) {
        console.log('selChanged!! : ', event.target.value);
        this.setSelectedVal(event.target.value);
    }

    goToPage () {
        GlobalApp.router.navigate('home');
    }

    destroy() {
        super.destroy(this);
    }

}