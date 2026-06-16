import ComPopUtils from "../../resources/js/common/ComPopUtils.js";
import Router from '../../resources/js/common/Router.js';
import ModuleManager from "../../resources/js/common/ModuleManager.js";
import ListManager from "../../resources/js/common/ListManager.js";
import ChartManager from "../../resources/js/common/ChartManager.js";
import PlayerManager from "../../resources/js/common/PlayerManager.js";
import { Layouts, ModuleInfo, LayoutInfo } from '../../resources/js/common/ComponentPaths.js';
import globalData from './GlobalData.js';

const state = new WeakMap();

class GlobalApp  {
    constructor() {
        if ( !GlobalApp.instance ) {
            state.set(this, {
                popupUtils : null,
                router : null,
                moduleManger : new ModuleManager(ModuleInfo, globalData),
                listManager : null,
                chartManager: null,
            })

            //Router를 읽기 전용으로 설정
            Object.defineProperty(this, 'router', {
                value : new Router(Layouts, LayoutInfo, ModuleInfo, state.get(this).moduleManger, globalData, state.get(this).listManager, 'content' ),
                writable : false,       // 읽기 전용 설정
                configurable : false,
                enumerable : true
            });

            GlobalApp.instance = this;
        }

        return GlobalApp.instance;
    }

    /**
     * ComPopUtils 초기화
     */
    get popupUtils() {
        const appState = state.get(this);

        if ( !appState.popupUtils ) {
            appState.popupUtils = new ComPopUtils();
            Object.freeze(appState.popupUtils);
        }

        return appState.popupUtils;
    }

    getListManager( rootElem, options ) {

        const tState = state.get(this);

        if ( !tState.listManager) {
            tState.listManager = new ListManager(rootElem, options);
        }

        const container = ( options.container )? $$(options.container ) : $$('#listContainer');
        //const container = ( options.container )? $$(rootElem).find(options.container) : $$('#listContainer');
        // let container = null;
        //
        // if ( options.container ) {
        //     if ( rootElem.id === options.container.slice(1) ||  $$(rootElem) === null ) {
        //         container = $$(options.container);
        //     } else {
        //         container = $$(rootElem).find(options.container);
        //     }
        // } else {
        //     container = $$('#listContainer');
        // }
        //
        // //console.log('container : ' , container);

        tState.listManager.init(container, null, options);

        return tState.listManager;
    }
    
    getChartManager( rootElem, options) {

        const tState = state.get(this);

        if ( !tState.chartManager) {
            tState.chartManager = new ChartManager(rootElem, options);
        }

        const container = options.container;

        tState.chartManager.init(container, options);

        return tState.chartManager;
    }
    
    getPlayerManager(rootElem, options) {
    	const tState = state.get(this);
    	
    	if (!tState.playerManager) {
    		tState.playerManager = new PlayerManager(rootElem, options);
    	}
    	
    	const container = options.container;
    	
    	tState.playerManager.init(container, options);
    	
    	return tState.playerManager;
    }

    /**
     * Router 반환
     */
    get router () {
        const appState = state.get(this);

        if ( !appState.router ) {
            appState.router = new Router();
            Object.freeze(appState.router);
        };

        //console.log('getRouter : ', appState.router);

        return appState.router;
    }

    /**
     * ComPopUtils 반환
     * @returns {null}
     */
    getPopupUtils () { return this._popupUtils; }
}

const instance = new GlobalApp();
Object.freeze(instance);

export default instance;