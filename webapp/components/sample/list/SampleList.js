import { BaseModule } from '../../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

export default class SampleList extends BaseModule {
    constructor(elem) {
        super(elem);
        this.rootElem = elem;
        this.listManager = null;
        this.eventReceiver = new EventTarget();
    }

    init () {
        super.init(this);
        this.loadList();
    }

    async loadList () {
        this.listManager = GlobalApp.getListManager(this.rootElem, {
            usePagination : false,
            listItemHtmlPath : '/components/sample/list/ListItem.html',
            listItemJsPath : '/components/sample/list/ListItem.js'
        });

        const items = [
            {
                name : '고길동',
                isShow : true,
                divNm : '경영지원실',
                divNm2 : '2팀',
                companyNm : '핑거',
                mbpNo : '010-****-2222',
                eml : 'finger@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '둘리',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '1팀',
                companyNm : '핑거',
                mbpNo : '010-****-3333',
                eml : 'finger2@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '홍희동',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '3팀',
                companyNm : '핑거',
                mbpNo : '010-****-5555',
                eml : 'finger76854@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '고길동2',
                isShow : true,
                divNm : '경영지원실',
                divNm2 : '2팀',
                companyNm : '핑거',
                mbpNo : '010-****-2222',
                eml : 'finger@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '둘리2',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '1팀',
                companyNm : '핑거',
                mbpNo : '010-****-3333',
                eml : 'finger2@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '홍희동2',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '3팀',
                companyNm : '핑거',
                mbpNo : '010-****-5555',
                eml : 'finger76854@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '고길동3',
                isShow : true,
                divNm : '경영지원실',
                divNm2 : '2팀',
                companyNm : '핑거',
                mbpNo : '010-****-2222',
                eml : 'finger@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '둘리3',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '1팀',
                companyNm : '핑거',
                mbpNo : '010-****-3333',
                eml : 'finger2@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '홍희동3',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '3팀',
                companyNm : '핑거',
                mbpNo : '010-****-5555',
                eml : 'finger76854@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '고길동4',
                isShow : true,
                divNm : '경영지원실',
                divNm2 : '2팀',
                companyNm : '핑거',
                mbpNo : '010-****-2222',
                eml : 'finger@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '둘리4',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '1팀',
                companyNm : '핑거',
                mbpNo : '010-****-3333',
                eml : 'finger2@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
            {
                name : '홍희동4',
                isShow : false,
                divNm : '경영지원실',
                divNm2 : '3팀',
                companyNm : '핑거',
                mbpNo : '010-****-5555',
                eml : 'finger76854@finger.co.kr',
                pNo : '1577-1577',
                fNo : '02-1234-2345'
            },
        ]

        items.forEach((itm, index) => {
            itm.id = index;
        })

        await this.listManager.render(items, this.eventReceiver);

        this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
    }

    onItemAction ( event ) {
        const { id, action, status } = event.detail;
        console.log(`Action "${action}" completed for item with ID ${id}. status : ${status}`);
    }

    destroy() {
        super.destroy(this);
    }
}