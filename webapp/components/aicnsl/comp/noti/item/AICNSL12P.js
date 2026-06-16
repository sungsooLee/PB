/*************************************************************************
 * @ 서비스경로 : NMCRMNG12P
 * @ 파일명      : NMCRMNG12P.js 내명함공유 - 등록
 * @ 화면ID 	 : PBWAI009907
 * @ 작성자      : 90194835
 * @ 작성일      : 2024-12-02
 ************************** 수정이력 ****************************************
 * 날짜                    작업자                 변경내용
 *_________________________________________________________________________
 * 2025-02-06              홍장환                 최초작성
 *************************************************************************/
import { BaseModule } from '../../../../cmm/BaseModule.js';

export class AICNSL12P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.rootElem = elem;
        this.callbackFunc = null
    }

    init (param, callbackFunc) {
        super.init(this);

        console.log('param : ' , param);
        this.callbackFunc = callbackFunc;

        const data = {
            notiPopupCatetory : '',
            notiPopupTitle : param.GDNC_TITL,
            notiPopupSubTitle : param.GDNC_TXT
        }

        this.bindDataToHtml(data, this.rootElem);
        this.createQuesBtn(param);
    }

    createQuesBtn (data) {
        for ( const [key, value] of Object.entries(data)) {

            console.log('key.startsWith(\'PMPT_\')', key.startsWith('PMPT_'));
            console.log('isValue null? ', CmmUtils.isNullorEmpty(value));

            if ( key.startsWith('PMPT_') && !CmmUtils.isNullorEmpty(value)) {
                console.log('createQuesBtn!!')
                const elem = document.createElement('li');
                const btn = document.createElement('button');
                elem.id = 'btn' + key ;

                $$(btn).addClass('question-link');
                $$(btn).text(value);
                $$(btn).addAttr('name', 'notiPopPromptBtn');

                $$(elem).append($$(btn).elements[0]);

                $$('#notiBtnPanel').append($$(elem).elements[0]);
            }
        }

        const g = this;
        const clickPrompt = (event, elem ) => {
            g.callbackFunc({quesVal : event.target.textContent});
        };

        $$(document).findByName('notiPopPromptBtn','click', clickPrompt);
    }

    bindDataToHtml ( data, elem ) {
        for ( const [key, value] of Object.entries(data)) {
            const targetElem = elem.querySelector(`[data-bind="${key}"]`);

            if ( targetElem ) {
                // value 타입이 true/false 가 아닌 경우
                if ( value && typeof value !== 'boolean') {
                    if ( value.indexOf('jpg') > -1 || value.indexOf('jpeg') > -1 || value.indexOf('png') > -1 ) {
                        targetElem.src = value;
                    } else {
                        targetElem.textContent = value;
                    }
                } else {
                    // value 타입이 true/false 인 경우
                    (value)? $$(targetElem).show() : $$(targetElem).hide();
                }
            }
        }
    }

    destroy() {
        super.destroy(this);
    }
}