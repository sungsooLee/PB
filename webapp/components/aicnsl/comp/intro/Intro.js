import { BaseModule } from '../../../cmm/BaseModule.js';

export default class Intro extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
        this.callback = null;

    }

    init ( data, callback ) {
        super.init(this);

        this.callback = callback;

        console.log('Intro init : ', data);
        if ( !CmmUtils.isEmptyObject(data) ) {
            
            // 프롬프트 영역 초기화
            $$('#introPromptList').html('');
            
            const introData = data[0];
            let title    = introData.GDNC_TITL;
            const subTitle = introData.GDNC_TXT;

            title = title.replaceAll('\\n','<br>');

            const tmpAry = title.split('<br>');

            title = tmpAry[0];
            $$('#introTitle').html(title);

            tmpAry.forEach((itm, idx) => {
                if ( idx > 0 ) {
                    //const txtAry = itm.split('.');
                    //const txt = txtAry[1];
                    //const html = '<li>' + txt + '</li>';
                    //console.log('html : ', html);
	             	const html = '<li>' + itm.trim().substring(2) + '</li>';
                    $$('#subTitle').append(html);
                }
            })

            const promptAry = [];
            Object.keys(introData).forEach((key) => {
                if ( key.indexOf('PMPT_TXT') > -1 && introData[key] !== null ){
                    promptAry.push(introData[key]);
                }
            })

            console.log('promptAry len : ' , promptAry.length);

            promptAry.forEach((item) => {
                const elem = document.createElement('li');
                const btn = document.createElement('button');

                elem.id = 'promt';

                $$(btn).addClass('question-link');
                $$(btn).text(item);
                $$(btn).addAttr('name', 'promptBtn');

                console.log('btn : ', $$(btn).elements[0]);

                $$(elem).append($$(btn).elements[0]);

                console.log('elem : ', $$(elem).elements[0]);
                $$('#introPromptList').append($$(elem).elements[0]);
            });

            const g = this;
            const clickPrompt = (event, element) => {
                g.callback({quesVal : event.currentTarget.textContent});
            }

            $$(document).findByName('promptBtn', 'click', clickPrompt);
        }
    }

    destroy() {
        super.destroy(this);
    }
}