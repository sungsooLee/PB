import { BaseModule } from '../../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export default class SamplePdfViewer extends BaseModule {
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
    	$$('#openPdfViewer').on('click', async () => this.handlePdfViewer());
    
    }
    
    async handlePdfViewer() {
    	const result = await GlobalApp.popupUtils.openPdfViewer({fileName: '05dd137e.png', fileType: '01'});
    	console.log('pdfView Result ==== ', result);
    }
    

    destroy () {
        super.destroy(this);
    }
}
