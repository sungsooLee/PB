import { BaseModule } from '../../cmm/BaseModule.js';
import NativeUtils from "../../../resources/js/common/NativeUtils.js";

export default class SampleNative extends BaseModule {
    constructor(elem) {
        super(elem);

        [this.inputVal1, this.setInputVal1] = this.useState('inputVal1', '');                     // 기본 공유기능 text
        [this.inputVal2, this.setInputVal2] = this.useState('inputVal2', { title : '타이틀', keyboardType: 'ctrlview', keypadType : 'alpha', inputType : 'pass2', nonce : ''}); // 보안키패드
        [this.inputVal4, this.setInputVal4] = this.useState('inputVal4', 'https://www.naver.com');  // 앱to앱 브라우저 호출
        [this.inputVal5, this.setInputVal5] = this.useState('inputVal5', '리턴 문자열');            // 앨범 호출
        [this.inputVal9, this.setInputVal9] = this.useState('inputVal9', 'https://m.wooribank.com/mw/mws?withyou=MWMEM0006');   // 팝업 웹뷰
        [this.inputVal12, this.setInputVal12] = this.useState('inputVal12', {nm : '', posNm : '', comNm : '', deptNm : '', phnNum : '', tel : '', eml : '', fax : '', cardImgData : '', msg : ''}); // 연락처 및 명함 정보 SMS 전송
        [this.inputVal15, this.setInputVal15] = this.useState('inputVal15', {key : 'userId', value : 'woori'});                 // 앱내 데이터 저장
        [this.inputVal16, this.setInputVal16] = this.useState('inputVal16', 'userId');                                          // 앱내 데이터 조회
        [this.inputVal17, this.setInputVal17] = this.useState('inputVal17', {str : '명함이미지 공유', imgData : ''});
        [this.inputVal18, this.setInputVal18] = this.useState('inputVal18', '');
        [this.inputVal19, this.setInputVal19] = this.useState('inputVal19', '40707354');    //
        [this.inputVal21, this.setInputVal21] = this.useState('inputVal21', 'https://m.wooribank.com/mw/mws?withyou=MWMEM0006');
        [this.inputVal23, this.setInputVal23] = this.useState('inputVal23', '0');           // 채널 선택 화면

        [this.inputVal22, this.setInputVal22] = this.useState('inputVal22', '');           // ID
        [this.inputVal24, this.setInputVal24] = this.useState('inputVal24', '');           // PW
        [this.inputVal25, this.setInputVal25] = this.useState('inputVal25', '');           // secureKey

        [this.inputVal26, this.setInputVal26] = this.useState('inputVal26', 'scheme://com.android.chrome');           // 앱투앱 실행 스키마
        [this.inputVal27, this.setInputVal27] = this.useState('inputVal27', '');           // 앱 없는 경우 이동할 스키마 url


        [this.input1Result, this.setInput1Result] = this.useState('input1Result', '');
        [this.input2Result, this.setInput2Result] = this.useState('input2Result', '');
        [this.input4Result, this.setInput4Result] = this.useState('input4Result', '');
        [this.input5Result, this.setInput5Result] = this.useState('input5Result', '');
        [this.input6Result, this.setInput6Result] = this.useState('input6Result', '');
        [this.input8Result, this.setInput8Result] = this.useState('input8Result', '');
        [this.input9Result, this.setInput9Result] = this.useState('input9Result', '');
        [this.input12Result, this.setInput12Result] = this.useState('input12Result', '');
        [this.input13Result, this.setInput13Result] = this.useState('input13Result', '');
        [this.input15Result, this.setInput15Result] = this.useState('input15Result', '');
        [this.input16Result, this.setInput16Result] = this.useState('input16Result', '');
        [this.input17Result, this.setInput17Result] = this.useState('input17Result', '');
        [this.input18Result, this.setInput18Result] = this.useState('input18Result', '');
        [this.input19Result, this.setInput19Result] = this.useState('input19Result', '');
        [this.input20Result, this.setInput20Result] = this.useState('input20Result', '');
        [this.input21Result, this.setInput21Result] = this.useState('input21Result', '');
        [this.input22Result, this.setInput22Result] = this.useState('input22Result', '');
        [this.input23Result, this.setInput23Result] = this.useState('input23Result', '');
        [this.input24Result, this.setInput24Result] = this.useState('input24Result', '');

        [this.input27Result, this.setInput27Result] = this.useState('input27Result', '');
        [this.input28Result, this.setInput28Result] = this.useState('input28Result', '');

        this.g = this;

        /**
         * nativeUtils.handleNativeResponse 로 응답 받은 내용을 eventDispatcher 통하여 전달 받음
         * @param event
         */
        const handleNativeResponse = ( event ) => {
            const response = event.detail;
            console.log('handleNativeResponse!!!!!!!!: ' , response );

            if ( response.command === 'callKeypadInputValue' ) {
                const data = response.data;
                const length = response.length;

                console.log('data : ', data);
                console.log('length : ', length);

                if ( length ) {
                    let ast = '';
                    if ( length.indexOf('*') === -1 ) {
                        const len = parseInt(length);
                        ast = '*'.repeat(length);
                    } else {
                        ast = length;
                    }

                    console.log('ast : ', ast);

                    this.setInput2Result(ast);
                }
            } else if ( response.command === 'callChangeOrientation') {
                const data = response.data;
                console.log('data : ', data);

                if ( data ) {
                    this.setInput28Result(JSON.stringify(data));
                }
            }
        }

        this.nativeCallback = handleNativeResponse;

        // 응답 callback 함수 리스터 등록
        NativeUtils.subscribe(handleNativeResponse);
    }

    init() {
        super.init(this);

        const installUrl = EnvUtils.isAOS() ? 'https://play.google.com/store/apps/details?id=com.android.chrome'
                                                  : 'https://apps.apple.com/kr/app/google-chrome/id535886823';

        this.setInputVal27(installUrl);

        this.initBinding();
    }

    initBinding () {
        this.bind( 'inputVal1', $$('#input1') , 'input');
        this.bind( 'inputVal2', $$('#input2') , 'input');
        this.bind( 'inputVal4', $$('#input4') , 'input');
        this.bind( 'inputVal5', $$('#input5') , 'input');
        this.bind( 'inputVal9', $$('#input9') , 'input');
        this.bind( 'inputVal12', $$('#input12') , 'input');
        this.bind( 'inputVal15', $$('#input15') , 'input');
        this.bind( 'inputVal16', $$('#input16') , 'input');
        this.bind( 'inputVal17', $$('#input17') , 'input');
        this.bind( 'inputVal18', $$('#input18') , 'input');
        this.bind( 'inputVal19', $$('#input19') , 'input');
        this.bind( 'inputVal21', $$('#input21') , 'input');
        this.bind( 'inputVal23', $$('#input23') , 'input');
        this.bind( 'inputVal22', $$('#input22') , 'input');
        this.bind( 'inputVal24', $$('#input24') , 'input');
        this.bind( 'inputVal25', $$('#input25') , 'input');
        this.bind( 'inputVal26', $$('#input26') , 'input');
        this.bind( 'inputVal27', $$('#input27') , 'input');


        this.bind('input1Result', $$('#input1Result'), 'input');
        this.bind('input2Result', $$('#input2Result'), 'input');
        this.bind('input4Result', $$('#input4Result'), 'input');
        this.bind('input5Result', $$('#input5Result'), 'input');
        this.bind('input6Result', $$('#input6Result'), 'input');
        this.bind('input9Result', $$('#input9Result'), 'input');
        this.bind('input12Result', $$('#input12Result'), 'input');
        this.bind('input15Result', $$('#input15Result'), 'input');
        this.bind('input16Result', $$('#input16Result'), 'input');
        this.bind('input17Result', $$('#input17Result'), 'input');
        this.bind('input18Result', $$('#input18Result'), 'input');
        this.bind('input19Result', $$('#input19Result'), 'input');
        this.bind('input20Result', $$('#input20Result'), 'input');
        this.bind('input21Result', $$('#input21Result'), 'input');
        this.bind('input22Result', $$('#input22Result'), 'input');
        this.bind('input23Result', $$('#input23Result'), 'input');
        this.bind('input24Result', $$('#input24Result'), 'input');

        this.bind('input28Result', $$('#input28Result'), 'input');

        // 전체 버튼에 대한 callback 처리
        $$( document ).findByName('dataBindBtn', 'click', (event, elem) => this.btnClick(event, elem, this.g));
    }

    btnClick (event, element, g) {
        console.log('event : ',  event);
        console.log('element : ',  element.id);
        console.log('this : ',  this);
        const funcNm = element.id + "Callback";

        console.log('funcNm : ',  funcNm);

        g[funcNm]();
    }

    async btn1Callback () {
        console.log('btn1Callback!!');

        const res = await NativeUtils.callShareData(this.inputVal1.value);

        console.log('res : ', res );

        this.setInput1Result(JSON.stringify(res));

    }

    async btn2Callback() {
        console.log('btn2Callback!!');

        const res = await NativeUtils.callOpenKeypad('타이틀', '', '', '', '');

        console.log('=====> res callOpenKeypad : ', res );

        this.setInput2Result(JSON.stringify(res));

    }

    async btn3Callback() {
        console.log('btn3Callback!!');

        const res = await NativeUtils.callCloseKeypad();

        console.log('res : ', res );

        this.setInput3Result(JSON.stringify(res));

    }

    async btn4Callback() {
        console.log('btn4Callback!!');

        const res = await NativeUtils.callOpenWindowWithURL(this.inputVal4.value);

        console.log('res : ', res );

        this.setInput4Result(JSON.stringify(res));

    }

    async btn5Callback() {
        console.log('btn5Callback!!');

        const res = await NativeUtils.callOpenAlbumLibrary(this.inputVal5.value);

        console.log('res : ', res );

        this.setInput5Result(JSON.stringify(res));

    }

    async btn6Callback() {
        console.log('btn6Callback!!');

        const res = await NativeUtils.callHistoryClear();

        console.log('res : ', res );

        this.setInput6Result(JSON.stringify(res));

    }

    async btn8Callback() {
        console.log('btn8Callback!!');

        const res = await NativeUtils.callCropImageScan();

        console.log('res : ', res );

        this.setInput8Result(JSON.stringify(res));

    }

    async btn9Callback() {
        console.log('btn9Callback!!');

        const res = await NativeUtils.callPopupWindow(this.inputVal9.value);

        console.log('res : ', res );

        this.setInput9Result(JSON.stringify(res));

    }

    async btn10Callback() {
        console.log('btn10Callback!!');

        const res = await NativeUtils.callCloseWindow();

        console.log('res : ', res );

        this.setInput10Result(JSON.stringify(res));

    }

    async btn11Callback() {
        console.log('btn11Callback!!');

        const res = await NativeUtils.callSessionKeep();

        console.log('res : ', res );

        this.setInput11Result(JSON.stringify(res));

    }

    async btn12Callback() {
        console.log('btn12Callback!!');
        const nm             = this.inputVal12.value.nm;
        const posNm = this.inputVal12.value.posNm;
        const comNm = this.inputVal12.value.comNm;
        const deptNm         = this.inputVal12.value.deptNm;
        const phnNum= this.inputVal12.value.phnNum;
        const tel            = this.inputVal12.value.tel;
        const eml            = this.inputVal12.value.eml;
        const fax   = this.inputVal12.value.fax;
        const cardImgData = this.inputVal12.value.cardImgData;
        const msg            = this.inputVal12.value.msg;

        const res = await NativeUtils.callContactToSMS(nm, posNm, comNm, deptNm, phnNum, tel, eml, fax, cardImgData, msg);

        console.log('res : ', res );

        this.setInput12Result(JSON.stringify(res));

    }

    async btn13Callback() {
        console.log('btn13Callback!!');

        const res = await NativeUtils.callNotificationStatus();

        console.log('res : ', res );

        this.setInput13Result(JSON.stringify(res));

    }

    async btn14Callback() {
        console.log('btn14Callback!!');

        const res = await NativeUtils.callOpenSetting();

        console.log('res : ', res );

        this.setInput14Result(JSON.stringify(res));

    }

    async btn15Callback() {
        console.log('btn15Callback!!');

        const key   = this.inputVal15.value.key;
        const value = this.inputVal15.value.value;

        const res = await NativeUtils.callSaveData(key, value);

        console.log('res : ', res );

        this.setInput15Result(JSON.stringify(res));

    }

    async btn16Callback() {
        console.log('btn16Callback!!');

        const res = await NativeUtils.callLoadData(this.inputVal16.value);

        console.log('res : ', res );

        this.setInput16Result(JSON.stringify(res));

    }

    async btn17Callback() {
        console.log('btn17Callback!!');

        const str = this.inputVal17.value.str;
        const imgData = this.inputVal17.value.imgData;

        const res = await NativeUtils.callContactToShare(str, imgData);

        console.log('res : ', res );

        this.setInput17Result(JSON.stringify(res));

    }

    async btn18Callback() {
        console.log('btn18Callback!!');

        const key = this.inputVal18.value.key;
        const action = this.inputVal18.value.action;
        const str = this.inputVal18.value.str;

        const res = await NativeUtils.callTTS(key, action, str);

        console.log('res : ', res );

        this.setInput18Result(JSON.stringify(res));

    }

    async btn19Callback() {
        console.log('btn19Callback!!');

        const res = await NativeUtils.callBIOAuth(this.inputVal19.value,'0');

        console.log('res : ', res );

        this.setInput19Result(JSON.stringify(res));

    }

    async btn20Callback() {
        console.log('btn20Callback!!');

        const res = await NativeUtils.callBIOAvailable();

        console.log('res : ', res );

        this.setInput20Result(JSON.stringify(res));

    }

    async btn21Callback() {
        console.log('btn21Callback!!');

        const res = await NativeUtils.callLocalBrowser(this.inputVal21.value);

        console.log('res : ', res );

        this.setInput21Result(JSON.stringify(res));

    }

    async btn22Callback() {
        console.log('btn22Callback!!');

        const res = await NativeUtils.callCloseLocalBrowser();

        console.log('res : ', res );

        this.setInput22Result(JSON.stringify(res));

    }

    async btn23Callback() {
        console.log('btn23Callback!!');
        const res = await NativeUtils.callSelectChannel(this.inputVal23.value);

        console.log('res : ', res );

        this.setInput23Result(JSON.stringify(res));

    }

    async btn24Callback() {
        console.log('btn24Callback!!');
        const res = await NativeUtils.callRegistSuccess(this.inputVal22.value
                                                        , this.inputVal24.value
                                                        , this.inputVal25.value)

        console.log('res : ', res );

        this.setInput24Result(JSON.stringify(res));

    }

    async btn25Callback() {
        console.log('btn25Callback!!');

        const res = await NativeUtils.callToApp ( this.inputVal26.value ,
                                                  this.inputVal27.value );

        this.setInput27Result(JSON.stringify(res));
    }

    destroy () {
        super.destroy(this);
        log.debug('sampleNormalModal destroy!');

        // 응답 callback 함수 리스터 해제
        NativeUtils.unSubscribe(this.nativeCallback);
    }
}
