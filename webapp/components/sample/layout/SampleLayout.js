import { BaseModule } from '../../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const router = GlobalApp.router;

export default class SampleLayout extends BaseModule {
    constructor(elem) {
        super(elem);
    }

    init () {

        document.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el);
            console.log(hljs)
        });

        $$('#btn').on('click', async () => await this.handleLayout());
    }

    async handleLayout () {
        const val = document.querySelector('input[name="rad001"]:checked').value;
        log.debug('val ==> : ', val);
        let layout, layoutInfo ;
        if ( val === 'basic' ) {
            layout = { id : 'basic'};
        } else if ( val === 'single' ) {
            layout = { id : 'single'};
        } else if ( val === 'LayoutWithBottom') {
            layout = { id : 'LayoutWithBottom'};
            layoutInfo = { btn1Label : '초기화', btn2Label : '조회' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary', iconClass : 'ico-add'};
        } else if ( val === 'main') {
            layout = { id : 'main'};
        }

        await router.applyLayout(layout.id, layoutInfo);
    }

    destroy() {
        super.destroy(this);
    }
}