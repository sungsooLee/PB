import { BaseModule } from '../../cmm/BaseModule.js';

export default class SampleDataBinding extends BaseModule {
    constructor(elem) {
        super(elem);

        // 변수선언
        [this.inputVal1, this.setInputVal1] = this.useState('inputVal1', 'hello');
        [this.inputVal2, this.setInputVal2] = this.useState('inputVal2', 'abcdefghijklm');
        [this.inputVal3, this.setInputVal3] = this.useState('inputVal3', '홍길동');
        [this.inputVal4, this.setInputVal4] = this.useState('inputVal4', '010-111-12222');
        [this.inputVal5, this.setInputVal5] = this.useState('inputVal5', '동해물과 백두산이 마르고 닳도록 하느님이 보우하나 우리나라 만세');

    }


    init () {
        super.init(this);

        this.initBinding();
    }

    initBinding () {
        
        // 데이터 바인딩
        this.bind( 'inputVal1', $$('#input1') , 'input');
        this.bind( 'inputVal2', $$('#input2') , 'input');
        this.bind( 'inputVal3', $$('#input3') , 'input');
        this.bind( 'inputVal4', $$('#input4') , 'input');
        this.bind( 'inputVal5', $$('#input5') , 'input');

        const g = this;

        // 값 변환 버튼 callback
        const changeInputVal1  = (event, element) => {

            console.log('element : ',  element);
            console.log('inputVal1 : ',  g.setInputVal1);

            if ( element.id === 'btn1') {
                g.setInputVal1('Welcome PB Won!!!');
            } else if ( element.id === 'btn2') {
                g.setInputVal2('nopqrstivWXYZ');
            } else if ( element.id === 'btn3') {
                g.setInputVal3('둘리');
            }else if ( element.id === 'btn4') {
                g.setInputVal4('010-2222-3333');
            } else {
                g.setInputVal5('환영합니다!!');
            }


            console.log(this.inputVal1.toString());
        }
    
        // x버튼 눌렀을 때 변수값 초기화 하기
        const fieldValRemove = (event, element) => {
            console.log('fieldValRemove element : ',  element);
            
            // 상위 부모 찾기
            const parentDiv = event.target.closest('div');
            const inputElem = parentDiv.querySelector('input');

            if ( inputElem ) {
                const fieldKey = inputElem.getAttribute('data-bind');
                console.log('fieldKey : ', fieldKey);

                // 바인딩 된 변수 초기화 하기
                this.resetField(fieldKey);

                const val = this[`${fieldKey}`];

                console.log('val : ' , val.value );
            }
        }
        
        // 동일 name 버튼에 대한 이벤트 처리
        $$( document ).findByName('dataBindBtn', 'click', changeInputVal1);
        $$( document ).findByName('fieldBtn', 'click', fieldValRemove);
    }

    destroy () {
        super.destroy(this);
        log.debug('sampleNormalModal destroy!');
    }
}
