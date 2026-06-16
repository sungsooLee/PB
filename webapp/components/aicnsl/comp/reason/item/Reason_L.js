import {BaseModule} from "../../../../cmm/BaseModule.js";

export default class Reason extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
        this.callback = null;

        [this.reasonIdx, this.setReasonIdx] = this.useState('reasonIdx', '');
        [this.reasonSource, this.setReasonSource] = this.useState('reasonSource', '');
        [this.reasonSrcTitle, this.setReasonSrcTitle] = this.useState('reasonSrcTitle', '')
        [this.creDtm, this.setCreDtm] = this.useState('creDtm', '');
        [this.reasonFileAry, this.setReasonFileAry] = this.useState('reasonFileAry', []);

    }

    init(data, callback) {
        super.init(this);

        if ( data ) {

            console.log('item data : ' , data);

            const item = {
                reasonIdx : data.idx,
                reasonSource : data.dmn_nm,
                reasonSrcTitle : data.disp_paps_nm,
                creDtm : data.cre_dtm,
                reasonFileIdAry : (data.atfl_id.indexOf('|') > -1 )? data.atfl_id.split('|') : [data.atfl_id],
                resonFileNmAry : (data.atfl_nm.indexOf('|') > -1 )? data.atfl_nm.split('|') : [data.atfl_nm],
                categoryId: (data.dmn_cd)? data.dmn_cd : ''
            }

            console.log('item data after : ' , item);

            this.bindDataToHtml(item, this.rootElem);
        }
    }

    bindDataToHtml( item, elem ) {
        for ( const [key, value] of Object.entries(item)) {

            const targetElem = elem.querySelector(`[data-bind="${key}"]`);
            console.log('targetElem : ' , targetElem);

            if ( targetElem ) {

                // 파일 목록 인경우
                if ( key === 'reasonFileIdAry') {

                    let liHtml = '';

                    console.log('value len : ' , value.length );

                    value.forEach((itm, idx) => {

                        const fileId = item[key][idx];
                        const fileNm = item['resonFileNmAry'][idx];
                        const lastDotIdx = fileNm.lastIndexOf('.');
                        let fileExt = (lastDotIdx === -1 )? 'etc' : fileNm.substring(lastDotIdx + 1);
                        
                        // 파일 아이콘 세팅
                        if ( fileExt === 'xlsx' || fileExt === 'xls') {
                            fileExt = 'excel';
                        } else if ( fileExt === 'pptx' || fileExt === 'ppt' ) {
                            fileExt = 'ppt';
                        } else if ( fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
                            fileExt = 'img';
                        }

                        console.log('fileNm : ' , fileNm);

                        const li = document.createElement('li');
                        const a  = document.createElement('a');
                        const span  = document.createElement('span');

                        span.textContent = fileNm;
                        li.dataset.url = "/api/aiCnsl/reqAiFileDown.json";

                        a.dataset.ext = fileExt;
                        a.setAttribute('class', 'link');
                        a.append(span);

                        li.append(a);
                        li.addEventListener('click', (event) => {
                            event.preventDefault();

                            const param = {
                                categoryId : item['categoryId'],
                                fileId,
                                fileNm
                             }

                            this.downloadReasonFile(param);
                        });

                        console.log('liHtml : ' , li);

                        $$(targetElem).append(li);

                    });

                } else {
                    targetElem.textContent = value;
                }

            }
        }
    }

    async downloadReasonFile ( data ) {
        console.log('downloadReasonFile params : ' , data );
        const res = await ApiUtils.sendPost('/api/aiCnsl/reqAiFileDown.json', data );
    }

    destroy() {
        super.destroy(this);
    }
}