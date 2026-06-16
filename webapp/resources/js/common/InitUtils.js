import $$ from './QueryUtils.js';
import { bind, bindData } from './DataBindUtils.js';
import NativeUtils from "./NativeUtils.js";


const init =  () => {
    window.$$ = $$;
    window.NativeUtils = NativeUtils;
    window.bind = bind;
    window.bindData = bindData;
    
    // 환경정보 조회 세팅
    EnvUtils.setEnv();

    // 로컬, 개발만 디버깅 툴 로드
    if ( EnvUtils.isLocal() || EnvUtils.isDev() ) {
        eruda.init();
    }

}

export default init();