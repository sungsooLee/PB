/*************************************************************************
* @ 서비스경로 : NMCRMNG22P
* @ 파일명      : NMCRMNG22P.js 고객명함 관리 - 지점 명함첩 - 상세 - 이미지
* @ 화면ID 	: PBWBU049901
* @ 작성자      : 90194835
* @ 작성일      : 2024-12-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-118           윤은정                 최초작성
*************************************************************************/
import { BaseModule } from '../cmm/BaseModule.js';
import GlobalApp from '/components/cmm/GlobalApp.js';

const globalApp = GlobalApp;

export class NMCRMNG22P extends BaseModule {
    constructor(elem) {
        super(elem);
        this.elem = elem;
    }

    init (param, callbackFunc ) {
		super.init(this);

		this.callbackFunc = callbackFunc;
        super.init(this);
        
        $('#mDtlImgS').attr('srcset', param.fullNm);
		$('#mDtlImg').attr('src', param.fullNm);
        
        setTimeout(function () {
            let pz = '';
            let myElement = document.querySelector('.pinch-zoom');
            let pzInit = false;
            if (pzInit === false) {
                pz = new PinchZoom.default(myElement, {
                    draggableUnzoomed: false,
                    minZoom: 1,
                    maxZoom: 2,
                    onZoomStart: function(object, event) {
                        // Do something on zoom start
                        // You can use any Pinchzoom method by calling object.method()
                    },
                    onZoomEnd: function(object, event) {
                        // Do something on zoom end
                    }
                })
                pzInit = true;
            }    
        },10)
		
    }

	destroy() {
		super.destroy(this);
	}
}