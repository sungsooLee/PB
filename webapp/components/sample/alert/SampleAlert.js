import { BaseModule } from '../../cmm/BaseModule.js';

export default class FileUp extends BaseModule {
    constructor(elem) {
        super(elem);
    }

    init () {
        super.init(this);
        this.initRegist();
    }

    /**
     * 이벤트 등록
     */
    initRegist() {

        const btn1 = $$('#btn1');
        const btn2 = $$('#btn2');
        const btn3 = $$('#btn3');
        const btn4 = $$('#btn4');
        const btn5 = $$('#btn5');

        log.debug('btn1 : ', btn1);


        this.registerCallback("click", btn1, this.btn1Click);
        this.registerCallback("click", btn2, this.btn2Click);
        this.registerCallback("click", btn3, this.btn3Click);
        this.registerCallback("click", btn4, this.btn4Click);
        this.registerCallback("click", btn5, this.btn5Click);
    }

    // alert 창 호출
    async btn1Click () {

        log.debug('btn1Click!!');

        const result = await CmmUtils.alert('alert1', '확인해주세요!!',{
            btnLabel : '확인',
            useCancelBtn : false,
            status : 'success'
        });

        log.debug('result : ', result);
    }

    // confirm 창 호출
    async btn2Click () {
        log.debug('btn2Click!!');

        // 옵셥 값은 해당 함수 주석 확인
        const result = await CmmUtils.confirm('컨펌창입니다.', '확인해주세요!!',{
            okLabel : '확인',
            noLabel : '취소',
            useCloseBtn : false,
            title : '샘플 타이틀입니다.',
            icon : 'caution'                
        });

        log.debug('result : ', result);
    }

    async btn3Click () {
        log.debug('btn3Click!!');

        const htmlContent = await this.loadHtml('/publish/PBWLO/PBWLO010003.html');

        const options = {
            useCloseBtn : false,
            okLabel : '예'
        }

        const result = await CmmUtils.popupWithHtml(htmlContent, options);

        log.debug('result : ', result);

    }

    async btn4Click () {
        log.debug('btn4Click!!');

        const result = await CmmUtils.alertWithIcon('컨펌창입니다.', '확인해주세요!!',{
            okLabel : '확인',
            noLabel : '취소',
            icon : 'icon-locked'
        });

        log.debug('result : ', result);
    }

    btn5Click () {
        log.debug('btn5Click!!');
    }

    async loadHtml ( path ) {
        return new Promise (async ( resolve, reject ) => {
            const response = await fetch(path);
            if ( !response.ok ) {
                reject('Failed to load HTML from ${path}');
            }

            resolve(response.text());
        });
    }

    destroy () {
        super.destroy(this);
        log.debug('sampleNormalModal destroy!');
    }
}
