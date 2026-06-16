//import GlobalApp from '/components/cmm/GlobalApp.js';

const CmmUtils = {

    isManualLoading : false,       // 로딩 조작이 메뉼얼인지 여부 

    /**
     * Alert 창 띄운다. ( 아이콘 없음 )
     * @param [String] title   : 얼럿창 타이틀
     * @param [String] desc    : 얼럿창 내용
     * @param [Object] options : 얼럿창 옵션 {
     *                                  useCancelBtn [bool]   : 취소버튼 사용 여부 ( true : 사용, false : 미사용 ),
     *                                  status       [String] : 아이콘 상태 ( 등록, 확인 : 'success', 삭제, 수정 등등 : 'caption' )
     * }
     */
    alert : ( title , desc, options ) => {

        console.log(options);

        const status = ( options.status )? options.status : 'success';

        return new Promise (function (resolve) {
            Swal.fire({
                showCancelButton: ( options.useCancelBtn )? options.useCancelBtn : false,
                showCloseButton: false,
                reverseButtons: true,
                confirmButtonText: ( options.btnLabel )? options.btnLabel : '확인',
                title: `<span class="description ${status} body-large">${desc}</span>`,
                customClass: {
                    actions: 'btn-wrap',
                    htmlContainer: 'al',
                    cancelButton: "btn-medium btn-outlined",
                    confirmButton: "btn-medium btn-primary",
                },
                buttonsStyling: false,
                allowOutsideClick: false,
            }).then((result) => {
                if ( result.isConfirmed) {
                    resolve({resultCd : '000000', resultMsg : 'SUCCESS'})
                } else if ( result.isDismissed ) {
                    resolve({resultCd : '999999', resultMsg : 'FAIL'})
                }
            })
        });
    },

    /**
     * 아이콘 있는 alert 창
     * @param title
     * @param desc
     * @param options
     */
    alertWithIcon : ( title , desc, options ) => {
        return new Promise (function (resolve) {
            Swal.fire({
                showCloseButton: ( options.useCancelBtn )? options.useCancelBtn : false,
                reverseButtons: true,
                confirmButtonText: ( options.btnLabel )? options.btnLabel : '확인',
                customClass: {
                    htmlContainer: 'mt40',
                    actions: 'btn-wrap pt40',
                    cancelButton: "btn-medium btn-outlined",
                    confirmButton: "btn-medium btn-primary inflex",
                },
                buttonsStyling: false,
                // allowOutsideClick: false,
                html: `
                <i class="icon-only icon-48 ${options.icon} bg-icon-gray_1"></i>
                <strong class="title-large mt8">${title}</strong>
                <p class="body-large mt8 fw-400">${desc}</p>
                `,
                allowOutsideClick: false,
            }).then((result) => {
                if ( result.isConfirmed) {
                    resolve({resultCd : '000000', resultMsg : 'SUCCESS'})
                } else if ( result.isDismissed ) {
                    resolve({resultCd : '999999', resultMsg : 'FAIL'})
                }
            })
        });
    },

    /**
     * 컨펌창을 띄운다
     * @param title [String] : 컨펌창 타이틀
     * @param content [String] : 컨펌창 메시지
     * @param options [Object] : 컨펌창 옵션  {
     *                                             useCancleBtn : 취소버트 사용 여부,
     *                                             useCloseBtn  : 닫기 버튼 사용 여부,
     *                                             okLabel      : 확인 버튼 라벨 문구,
     *                                             noLabel      : 취소 버튼 라벨 문구,
     *                                             icon         : 타이틀 아이콘 ( 성공 :'success', 경고 : 'caution' )
     *
     * }
     */
    confirm : ( title, content , options) => {
        const iconState = (options.icon)? options.icon : '';

        return new Promise (function (resolve) {
            Swal.fire({
                showCancelButton: options.useCancleBtn || true,
                showCloseButton: false,
                reverseButtons: true,
                title: (title)? `<span class="description ${iconState} body-large">${title}<span>` : '',
                text: content || '',
                confirmButtonText: options.okLabel || '예',
                cancelButtonText: options.noLabel || '아니요',
                customClass: {
                    actions: 'btn-wrap',
                    htmlContainer: 'al',
                    cancelButton: "btn-medium btn-outlined",
                    confirmButton: "btn-medium btn-primary",
                },
                buttonsStyling: false,
                allowOutsideClick: false,
                willClose: () => {
                	console.log('willClose');
                }
            }).then((result) => {
                if ( result.isConfirmed) {
                    resolve({resultCd : '000000', resultMsg : 'SUCCESS'})
                } else if ( result.isDismissed ) {
                	console.log('################### result = ', result);
                	//e.preventDefault;
                    resolve({resultCd : '999999', resultMsg : 'FAIL'})
                }
            })
        });
    },

    /**
     * 팝업에 HTML 삽인
     * @param html  [String] : html 문자열
     * @param options [Object] : 옵션
     */
    popupWithHtml : ( html , options) => {
        return new Promise((resolve) => {
            Swal.fire({
                showCloseButton: options.useCloseBtn || true,
                reverseButtons: true,
                confirmButtonText: options.okLabel || '확인',
                customClass: {
                    htmlContainer: 'mt40',
                    actions: 'btn-wrap pt40',
                    cancelButton: "btn-medium btn-outlined",
                    confirmButton: "btn-medium btn-primary",
                },
                buttonsStyling: false,
                html: `${html}`,
            }).then((result) => {
                if ( result.isConfirmed) {
                    resolve({resultCd : '000000', resultMsg : 'SUCCESS'})
                } else if ( result.isDismissed ) {
                    resolve({resultCd : '999999', resultMsg : 'FAIL'})
                }
            })
        })
    },

    /**
     * 달력 팝업을 띄운다.
     */
    openDatePicker : () => {
        globalApp.popupUtils.openPopup('datePicker', {
            showCloseBtn : true,
            onCallback: (result) => console.log('on Callback : ' , result ),
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    },

    /**
     * 달력(월) 팝업을 띄운다.
     */
    openMonthCalendar : () => {
        GlobalApp.popupUtils.openPopup('datePickerYear', {
            showCloseBtn : true,
            onCallback: (result) => console.log('on Callback : ' , result ),
            onClose : (result) => console.log('onClose Result : ' , result),
        });
    },

    parseSizeToBytes : (size) => {
        const units = { 
            B:1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
            TB: 1024 * 1024 * 1024 * 1024
        }

        log.debug('size : ' , size);
        
        const value = parseFloat(size);
        //const unit  = size.match(/[a-zA-Z]+/)[0].toUpperCase();

        return ( value / (1024 ** 2)).toFixed(2);
    },
    
    formatFileSize : (size) => {
    	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    	let unitIndex = 0;
    	
    	while( size >= 1024 && unitIndex < units.length - 1 ) {
    		size /= 1024;
    		unitIndex++;
    	}
    	
    	return `${size.toFixed(2)} ${units[unitIndex]}`;
    },

    /**
     * 문자열이 빈값인지 체크한다.
     * @param obj [Object]
     */
    isEmpty ( obj ) {
        if ( typeof  obj === 'string') {
            if ( obj !== null && obj !== '') {
                return false;
            } else {
                return true;
            }
        } else {
            return ( obj !== null )? false : true;
        }
    },

    /**
     * 숫자를 세자리 단위로 comma를 추가한다.
     * @param number [Number] : 숫자
     */
    comma (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * 숫자에서 컴마 제거 
     * @param numStr [String] 숫자
     */
    removeComma (numStr) {
        if ( typeof numStr === 'string' && numStr.indexOf(',') > -1 ) {
            return numStr.replace(/,/g, '');
        } else {
            return numStr.toString();
        }
    },

    /**
     * 전화번호 형식 변환
     * @param str [String] : 전화번호 문자열
     */
    phoneFormatter( str ){
        let strleng = str.length;
        if( strleng === 0 ){
            return '-';
        }else if(strleng > '10'){
            return str.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g,'$1-$2-$3').replace(/\-{1,2}$/g, '');
        }else{
            return str.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g,'$1-$2-$3').replace(/\-{1,2}$/g, '');
        }
    },
    
    /**
     * 팩스번호 형식 변환
     * @param str [String] : 전화번호 문자열
     */
    faxFormatter( str ){
        let strleng = str.length;
        if( strleng === 0 ){
            return '-';
        }else if(strleng > '10'){
            return str.replace(/^(\d{0,4})(\d{0,3})(\d{0,4})$/g,'$1-$2-$3').replace(/\-{1,2}$/g, '');
        }else{
            return str.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g,'$1-$2-$3').replace(/\-{1,2}$/g, '');
        }
    },

    /**
     * 모듈이 빈 오브젝트인지 체크한다.
     * @param obj
     */
    isEmptyObject ( obj ) {

        // console.log('isEmptyObject : ' , obj);
        // console.log('isEmptyObject undefined: ' , typeof obj !== 'undefined');
        // console.log('isEmptyObject length > 0 : ' ,  Object.keys(obj).length > 0 );
        // console.log('isEmptyObject obj : ' ,  obj);
        // console.log('isEmptyObject  obj !== null : ' ,  obj !== null );
        // console.log('isEmptyObject obj.constructor === Object : ' ,  typeof obj.constructor );
        // console.log('isEmptyObject obj.constructor === Object : ' ,  obj.constructor === Object );

        if ( typeof obj !== 'undefined') {
            if ( obj && obj.constructor !== null && Object.keys(obj).length > 0 ) {
                console.log('isEmptyObject false!!');
                return false;
            }
        }

        return true;
    },

    /**
     * null, undefined, 빈 문자열, 빈 배열, 빈 객체를 체크하는 유틸
     * @param {*} value  [Any] : 체크할 값
     * @returns {boolean}
     */
    isNullorEmpty ( value ) {
        if ( value === null || value === undefined ) {
            return true;
        }

        if ( typeof value === 'string' && value.trim() === '' ) {
            return true;
        }

        if ( Array.isArray(value) && value.length === 0 ) {
            return true;
        }

        if ( typeof value === 'object' && Object.keys(value).length === 0 ) {
            return true;
        }

        return false;
    },

    /**
     * 로컬스토리지에 데이터를 저장
     * @param {*} key    [String]  : 데이터 저장 키
     * @param {*} value  [Object]  : 데이터 저장 값
     */
    setLocalStorageData ( key, value) {
        localStorage.setItem(key, JSON.stringify(value) );
        return { resultCd : '000000', resultMsg : 'SUCCESS'};
    },

    /**
     * 로컬스토리지에 저장된 데이터 조회
     * @param {*} key  [String]  : 데이터 저장 키
     */
    getLocalStorageData ( key) {
        const data =  JSON.parse(localStorage.getItem(key));

        console.log(data);
        console.log('isNullorEmpty : ', this.isNullorEmpty(data));

        return this.isNullorEmpty(data)? { data : null, resultCd : '999999', resultMSg : 'FAIL'}
                                       : { data : data, resultCd : '000000', resultMsg : 'SUCCESS'};
    },

    /**
     * 로딩을 보이기
     */
    showLoading () {
        $$('.loader-wrap').css({display : 'flex'});
        $$('.loader-wrap').removeClass("no-deco");
    },
    
    /**
     * 로딩을 보이기 (아이콘 없는 빈 화면 로딩)
     */
    showLoadingEmpty () {
        $$('.loader-wrap').css({display : 'flex'});
        $$('.loader-wrap').addClass("no-deco");
    },

    /**
     * 로딩 숨기기
     */
    hideLoading (manual) {
        if ( manual ) {
            $$('.loader-wrap').css({display : 'none'});
        } else {
            setTimeout(() => {
                console.log('timeout loading hide!!');
                $$('.loader-wrap').css({display : 'none'});
            }, 700);
        }
    },

    /**
     * 로딩 숨겨져 있는지 여부
     * @returns {boolean}
     */
    isLoading () {
        const loadingDiv = document.getElementsByClassName('loader-wrap');
        console.log('loadingDiv : ', loadingDiv);
        const style = window.getComputedStyle(loadingDiv[0]);
        return ( style.display === 'flex' );
    },

    /**
     * 로딩 조작이 메뉴얼인지 여부 확인
     * @returns {boolean}
     */
    getLoadingManualState () {
        return CmmUtils.isManualLoading;
    }
}