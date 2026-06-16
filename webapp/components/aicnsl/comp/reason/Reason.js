import {BaseModule} from "../../../cmm/BaseModule.js";
import GlobalApp from "../../../cmm/GlobalApp.js";


export default class Reason extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
        this.callback = null;
        this.eventReceiver = new EventTarget();
        
    }
    
    async init(data, callback) {
        super.init(this);
        
        const reasonData = data;
        const itemInfo = {
            htmlPath : '/components/aicnsl/comp/reason/item/Reason_L.html',
            jsPath   : '/components/aicnsl/comp/reason/item/Reason_L.html'
        }
        
        // console.log('reasonData : ' , reasonData);

        for(let i = 0; i < reasonData.length; i++){
            reasonData[i]['idx'] = i + 1;
            const creDtm = dayjs(reasonData[i]['cre_dtm']);
            reasonData[i]['cre_dtm'] = creDtm.format('YYYY.MM.DD')

            // console.log('[ Aiden ] async () => { : ' , reasonData[i] );
            // 0번이면 container 내용 비우기
            if ( i === 0 ) {
                $$(this.rootElem).find('#reasonContainer').html('');
            }

            const htmlContent = await this.loadHtml(itemInfo);

            console.log('idx : ' , k );
            //console.log('htmlContent : ' , htmlContent );

            await this.appendItem(htmlContent, reasonData[i]);
        }

        // console.log('reasonData : ' , reasonData );

        //this.listManager.render(reasonData, this.eventReceiver);
        this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));

    }
    
    //리스트 목록 HTML 로드
    async loadHtml ( info ) {
        return new Promise( async ( resolve, reject) => {

            const response = await fetch(info.htmlPath);
            if ( !response.ok ) {
                reject ( `Failed to load HTML from ${path}`);
            }

            resolve(response.text());
        })
    }

    async appendItem ( htmlContent, data ) {
        // console.log('htmlCn : ' , htmlContent );
        // console.log('[ Aiden ] data : ' , data );

        $$(this.rootElem).find('#reasonContainer').append(htmlContent);
        const elemContainer = $$(this.rootElem).find('#reasonContainer').elements[0];
        
        console.log(`elemContainer : , ${elemContainer.outerHTML}`);
        // console.log('elemContainer : ', elemContainer);

        const listElems     = elemContainer.querySelectorAll(':scope > li');

        console.log('listElems : ' , listElems);

        if ( data ) {
            const item = {
                reasonIdx : data.idx,
                reasonSource : data.dmn_nm,
                reasonSrcTitle : data.disp_paps_nm,
                creDtm : data.cre_dtm,
                reasonFileIdAry : (data.atfl_id.indexOf('|') > -1 )? data.atfl_id.split('|') : [data.atfl_id],
                resonFileNmAry : (data.atfl_nm.indexOf('|') > -1 )? data.atfl_nm.split('|') : [data.atfl_nm],
                categoryId: (data.dmn_cd)? data.dmn_cd : ''
            }

            console.log('item data after : ' , item, data.idx - 1);

            await this.bindDataToHtml(item,  listElems[data.idx - 1]);
        }
    }

    // 리스트 목록의 Js 로드
    async loadJs () {
        
    }

    bindDataToHtml( item, elem ) {

        // console.log('[ Aiden ] elem : ' , elem);

        for ( const [key, value] of Object.entries(item)) {

            // console.log('[ Aiden ] key : ' , key);
            const targetElem = elem.querySelector(`[data-bind="${key}"]`);
            console.log('targetElem : ' , targetElem);

            if ( targetElem ) {

                // 파일 목록 인경우
                if ( key === 'reasonFileIdAry') {

                    let liHtml = '';

                    console.log('value len : ' , value.length );

                    let pdfIdx = -1;
                    let pdfFileNm = '';

                    value.forEach((itm, idx) => {

                        const fileId = item[key][idx];
                        const fileNm = item['resonFileNmAry'][idx];
                        const lastDotIdx = fileNm.lastIndexOf('.');
                        const fileNmWOExt = fileNm.substring(0, lastDotIdx);
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

                        // 확장자가 pdf 인경우에 변수에 저장한다.
                        if ( fileExt === 'pdf'){
                            pdfFileNm = fileNmWOExt;
                            pdfIdx = idx;
                        }
                        
                        // pdf와 파일명이 같은 경우에는 건너뛴다.
                        if ( pdfIdx !== idx && pdfFileNm === fileNmWOExt ) {
                            return;
                        } else if ( value.length > 1 && idx === 0 && fileExt !== 'pdf') {
                            // 첫번째 근거문서가 pdf가 아닌경우 다음 문서의 파일명과 확장자 명을 체크한다.

                            console.log('fileNm check!!!');

                            const nextFileNm = item['resonFileNmAry'][idx + 1];
                            const nextLastDotIdx = nextFileNm.lastIndexOf('.');
                            const nextFileNmWOExt = nextFileNm.substring(0, nextLastDotIdx);
                            const nextFileExt = (nextLastDotIdx === -1 )? 'etc' : nextFileNm.substring(lastDotIdx + 1);
                            // 다음 문서가 있으면
                            if ( nextFileNm ) {
                                console.log('nextFileNm exist!!!');

                                // 다음 문서가 pdf 이고 파일명이 같으면 건너뛴다.
                                if ( nextFileExt === 'pdf' && fileNmWOExt === nextFileNmWOExt ) {
                                    return;
                                }
                            }
                        }

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

        const fileExt = data.fileNm.substring(data.fileNm.lastIndexOf("."));
        const fileNm = data.fileId + fileExt;

        // pdf 파일이 아닌경우에는 안내후 리턴
        if ( fileExt.indexOf('pdf') === -1 ) {
            toastr.alert(`<p class="fs-14 fw-500 mt-10">일부 근거문서는 모바일 환경에서 열리지 않을 수 있어, 포털에서 확인 부탁드립니다</p>`);
            return;
        }

        // 개발의 경우는 하드코딩으로 문서 보여주는지만 처리한다.
        if ( !EnvUtils.isPrd() ) {
            const pdfViewerRes = await GlobalApp.popupUtils.openPdfViewer({fileName: '1802ef0a.hwp', fileType: '01'});
            return;
        }

        console.log('downloadReasonFile params : ' , data );
        const res = await ApiUtils.sendPost('/api/aiCnsl/reqAiFileDown.json', data );

        if ( res.resultCode === '000000') {
            const pdfViewerRes = await GlobalApp.popupUtils.openPdfViewer({fileName: fileNm, fileType: '03'});
        } else if ( res.resultCode === '900008' || res.resultCode === '900002') {
            toastr.error(``, res.resultMessage);
        } else {
            toastr.error(``, '근거문서를 여는데 실패하였습니다.');
        }

    }

    onItemAction ( event ) {
        const { id, key, action, status } = event.detail;
        console.log('id :' , id);
        console.log('key :' , key);
        console.log('action :' , action);
    }

    destroy() {
        super.destroy();
    }
}