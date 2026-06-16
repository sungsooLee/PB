import { BaseModule } from '../../../cmm/BaseModule.js';
import GlobalApp from "../../../cmm/GlobalApp.js";

const globalApp = GlobalApp;

export default class Noti extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
        this.callback = null;
        this.eventReceiver = new EventTarget();
        this.data = null;
    }

    init ( data, callback ) {
        super.init(this);

        this.data = data;
        this.callback = callback;

        console.log('Noti init : ', data);
        console.log('rootElem : ', this.rootElem);
        if ( !CmmUtils.isEmptyObject(data) ) {
            
            // 공지사항 스와이프 세팅
            const notiData = data;

            this.listManager = GlobalApp.getListManager(this.rootElem, {
                usePagination : false,
                container: '#notiListContainer',
                listItemHtmlPath : '/components/aicnsl/comp/noti/item/Noti_L.html',
                listItemJsPath : '/components/aicnsl/comp/noti/item/Noti_L.js'
            });

            notiData.forEach((item, idx) => {
                const rgstDt = dayjs(item['LST_DB_CHG_DTM']);

                item['id'] = idx;
                item['rgstDt'] = rgstDt.format('YYYY.MM.DD')

                const tmpAry = item['GDNC_TITL'].split(']');
                item['title'] = tmpAry[0] +']';
                item['subTitle'] = tmpAry[1];

                // item['title'] = item['GDNC_TITL'];
                // item['subTitle'] = item['GDNC_TXT'];
            })

            this.listManager.render(notiData, this.eventReceiver);
            this.eventReceiver.addEventListener('itemAction', this.onItemAction.bind(this));
        }
    }

    onItemAction ( event ) {
        const { id, key, action, status } = event.detail;
        console.log('id :' , id);
        console.log('key :' , key);
        console.log('action :' , action);

        console.log('data : ' , this.data[id]);

        window.globalApp.popupUtils.openPopup('aiCnsl12p',{
            showCloseBtn : true,
            useCancelBtn : false,
            params : this.data[id],
            type : 'slideLeft',
            onCallback : (result) => this.callback(result)
        });
    }

    destroy() {
        super.destroy(this);
    }
}