
/**
 * Native App과 인터페이스를 제공하는 모듈
 */
let NativeUtils = {

    commandQueue : [],                  // 명령을 순서대로 실행할 스택
    isProcessing : false,               // 스택 flag
    responseHandlers : [],              // 고유 ID와 응답 처리 핸들러 매핑
    eventTarget : new EventTarget(),    // 특정 컴포넌트에서 응답을 받기 위한 이벤트 시스템
    registeredNativeMethods : [],       // 등록된 Native 함수 목록
    nonce : '',                         // keypad open시에 서버에서 생성한 값

    /**
     * 네이티브 인터페이스 호출
     * @param {*} command       [String] : 함수명
     * @param {*} params        [Object] : 전달 파라미터
     * @param {*} useResponse   [bool]   : callback 응답 여부
     */
    callNative : async ( command, params, useResponse = true ) => {
        return new Promise ( async ( resolve, reject) => {
            const reqId = Date.now() + Math.random().toString(16).slice(2);
            NativeUtils.responseHandlers.push({reqId, command, resolve, reject });

            console.log('reqId : ' , reqId );

            let reqParam = {};
            if ( params ) {
                // 요청 파라미터에 요청키 값 추가
                Object.entries(params).map(([key, value]) => reqParam[key] = value);
                reqParam['reqId'] = reqId;
            } else {
                reqParam['reqId'] = reqId;
            }

            console.log('reqParam : ' , reqParam );

            const message = {command, reqParam, reqId };
            NativeUtils.commandQueue.push({ message, command });
            await NativeUtils.processQueue(useResponse);
        })
    },

    /**
     * 스택에 있는 호출 함수를 하나씩 실행한다.
     * @param {*} useResponse [bool] : callback 응답 여부
     */
    processQueue : async ( useResponse ) => {
        if ( NativeUtils.isProcessing || NativeUtils.commandQueue.length === 0 ) {
            return;
        }

        NativeUtils.isProcessing = true;

        const { message, command } = NativeUtils.commandQueue.shift();
        const { resolve, reject }  =  NativeUtils.responseHandlers.find(item => item.reqId === message.reqId);

        console.log('message : ' , message);
        console.log('command : ' , command);

        try {
            let response = null;
            
            // 안드로이드인 경우
            if ( EnvUtils.getOs() === 'AOS' ) {
                console.log('[AOS] reqParam : ' , message.reqParam);
                window.Android[command]( JSON.stringify(message.reqParam));
            } else if ( EnvUtils.getOs() === 'iOS' ) {
                console.log('[iOS] reqParam : ' , message.reqParam);
                // iOS 인 경우
                window.webkit.messageHandlers[command].postMessage(message.reqParam);
            } else {
                response = JSON.stringify({ resultCd : '000000', resultMsg : 'PC'});
            }

            console.log('NativeUtils response : ' , response);

            if ( useResponse && ( response !== null && response !== undefined ) ) {
                try {
                    const res = JSON.parse(response);
                    resolve(res);
                } catch ( err ) {
                    // 응답을 받는 중에 에러 발생시
                    reject(err);
                }
            }
        } catch ( error ) {
            reject(error);
        } finally {
            NativeUtils.isProcessing = false;
            NativeUtils.processQueue();
        }
    },

    /**
     * 앱에서 응답을 내려주는 콜백 함수
     * @param res
     */
    handleNativeResponse : ( res, isOld) => {

        console.log('handleNativeResponse res : ', res);
        console.log('handleNativeResponse isOld : ', isOld );
        console.log('handleNativeResponse typeof : ', typeof res === 'string');

        // asis 함수가 아닌경우
        if ( isOld === null || typeof isOld === 'undefined') {
            const result = NativeUtils.fixAndParseJson(res);

            console.log('handleNativeResponse parse : ', result);

            const { reqId, data, error } = result;

            console.log('handleNativeResponse parse  reqId: ', result.reqId);
            const responseHistory = NativeUtils.responseHandlers.find( item => item.reqId === reqId );
            const idx = NativeUtils.responseHandlers.findIndex( item => item.reqId === reqId );

            if ( responseHistory ) {
                const { command, resolve, reject } = responseHistory
                if ( command === 'callTTS' ) {
                    // iOS는 다음 플레이시 이전 응답을 내려주므로, 다음 조건시 로직 처리
                    if ( EnvUtils.isIOS()) {
                        if ( idx !== -1 && idx === NativeUtils.responseHandlers.length - 1 ) {
                            console.log('TTS response!! : ' , data );
                            // TTS finish 응답 처리를 위한 이벤트 전송
                            NativeUtils.eventTarget.dispatchEvent(new CustomEvent('nativeResponse', { detail : data }));
                        }
                    }
                    
                    // AOS는 다음 플레이시 응답 없고, 재생 끝날 때마다 응답 오므로 다음과 조건 없이 처리
                    if ( EnvUtils.isAOS() ) {
                        NativeUtils.eventTarget.dispatchEvent(new CustomEvent('nativeResponse', { detail : data }));
                    }
                }

                // 응답을 하였으면 히스토리에서 지운다.
                if ( idx !== -1 ) {
                    NativeUtils.responseHandlers.splice(idx, 1);
                }

                if ( error ) {
                    reject(error);
                } else {
                    resolve(data);
                }
            } else {
                console.log('no Handler found for reqId : ' , reqId );
                // 특정 인터페이스의 응답 처리를 위한 이벤트 전송
                NativeUtils.eventTarget.dispatchEvent(new CustomEvent('nativeResponse', { detail : data }));
            }
        } else if ( isOld && typeof isOld === 'boolean' ) {
            // 특정 인터페이스의 응답 처리를 위한 이벤트 전송
            NativeUtils.eventTarget.dispatchEvent(new CustomEvent('nativeResponse', { detail : res }));
        }

        console.log('handleNativeResponse pass!!');

        NativeUtils.isProcessing = false;
        // 응답 처리 후 다음 명령 실행
        NativeUtils.processQueue();
    },

    /**
     * Native 기본 공유 기능
     * @param str [String] : 공유할 기능 텍스트
     */
    callShareData : async ( str ) => {
        const params  = {
            text :  str
        }

        return NativeUtils.callNative('callShareData', params);
        
    },

    /**
     * 보안키패드 오픈
     * @param title        [String] : 타이틀로 사용할 텍스트
     * @param keyboardType [String] : 사용할 키패드 종료 ( alpha )
     * @param keypadType   [String] : 키패드 사용
     * @param inputType    [String] 
     * @param nonce        [String] : 암호화를 위한 키값
     */
    callOpenKeypad : async (title, keyboardType, keypadType, inputType, nonce) => {

        // 기존에 nonce 값을 초기화한다.
        NativeUtils.setNonce('');

        const params = {
            inputTitle : title,
            keyboardType : keyboardType,
            keypadType : keypadType,
            inputType : inputType,
        }

        const res = await ApiUtils.sendPost('/api/scrtKpad/setKeypadGui.json', params);
        console.log('res : ' , res.data);

        // 생성한 nonce를 전역 데이터에 저장한다.
        NativeUtils.setNonce(res.data.nonce);

        const paramData = Object.entries(res.data).map(([key, value]) => `${key}=${value}`).join(';');

        const appParam = {
            data : paramData
        }

        console.log('appParam : ' , appParam);

        return NativeUtils.callNative('callOpenKeypad', appParam);
    },

    /**
     * 보안키패드 닫기 -> 이후 callKeypadDoneValue(보안키패드 입력완료) 자동호출됨
     */
    callDoneKeypad : async () =>  {
        return NativeUtils.callNative('callDoneKeypad', null, false);
    },

    /**
     * 보안키패드 닫기
     */
    callCloseKeypad : async () =>  {
        return NativeUtils.callNative('callCloseKeypad', null, false);
    },

    /**
     * 진동 울림
     */
    callVibration : async () => {
        return NativeUtils.callNative('callVibration', null, false);
    },

    /**
     * ApptoAPP
     */callOpenWindowWithURL : async ( url ) => {
        const params = {
            url : url
        }

        return NativeUtils.callNative('callOpenWindowWithURL', params, false);
    },

    /**
     * 일정을 디바이스에 전송
     */
    callScheduleRmToPhone : async () => {
        console.log('callScheduleRmToPhone');
    },

    /**
     * 디바이스 일정을 웹뷰로 전송
     */
    callSchedulePhoneToRm : async () => {
        console.log('callSchedulePhoneToRm');
    },

    /**
     * 앨범 라이브러리 화면을 열음
     */
    callOpenAlbumLibrary : async ( rtrnStr ) => {
        const params = {
            returnString : rtrnStr
        }

        return NativeUtils.callNative('callOpenAlbumLibrary', params, true);
    },

    /**
     * 웹 캐시데이터 초기화
     */
    callHistoryClear : async () => {
        return NativeUtils.callNative('callHistoryClear', null, false )
    },

    /**
     * 앱 종료
     */
    callAppFinish : () => {
        return NativeUtils.callNative('callAppFinish', null, false )
    },

    /**
     * 로그인 성공
     */
    callLoginSuccess : ( userId ) => {
        const params = {
            userId : userId
        }

        return NativeUtils.callNative('callLoginSuccess' , params, false)
    },

    /**
     * 명함 촬영용 카메라 실행
     */
    callCropImageScan : () => {

        if ( EnvUtils.getOs() === 'iOS') {
            return NativeUtils.callNative('callCropImageScan', null, true );
        } else {

            const oldCameraInput = document.getElementById('cameraInput');

            // 이전에 생성한 input이 있는 경우
            if ( oldCameraInput) {
                oldCameraInput.remove();
            }

            const input = document.createElement('input');
            input.type = 'file';
            input.id = 'cameraInput';
            input.accept = 'image/*';           // 이미지만 선택 가능
            input.capture = 'environment';      // 후면 카메라 사용 

            return new Promise((resolve, reject) => {
                const reqId = Date.now() + Math.random().toString(16).slice(2);
                const command = 'callCropImageScan';
                NativeUtils.responseHandlers[reqId] = { command, resolve, reject };

                input.onchange = async (event) => {
                    const file = event.target.files[0];
                    if ( file ) {

                        const base64Image = await NativeUtils.convertFileToBase64(file);

                        const resData = {
                            reqId : reqId,
                            data : base64Image,
                            error : null
                        }

                        console.log('callCropImageScan : ', resData );

                        const result = await NativeUtils.handleNativeResponse(resData);

                        resolve(result);
                    }
                };

                document.body.appendChild(input);
                input.click();

            });
        }
    },

    /**
     * file -> bASE64 이미지 변환
     * @param file
     */
    convertFileToBase64 ( file ) {
        return new Promise(( resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve( reader.result);
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    /**
     * 팝업으로 웹뷰를 띄움
     */
    callPopupWindow : ( url ) => {
        const params = {
            url : url
        }

        return NativeUtils.callNative('callPopupWindow', params, false );
    },

    /**
     * 현재 떠있는 웹뷰화면을 닫음
     */
    callCloseWindow : () => {
        return NativeUtils.callNative('callCloseWindow', null, false );
    },

    /**
     * 세션 유지를 위한 처리
     */
    callSessionKeep : () => {
        return NativeUtils.callNative('callSessionKeep', null, true );
    },

    /**
     * 내 연락처 및 명함 정보를 SMS로 전송
     */
    callContactToSMS : ( nm, posNm, comNm, deptNm, phnNum, tel, eml, fax, cardImgData, msg ) => {
        const params = {
            name : nm,
            positionName : posNm,
            componyName : comNm,
            departmentName : deptNm,
            phoneNumber : phnNum,
            telNumber : tel,
            email : eml,
            faxNumber : fax,
            cardImageData : cardImgData,
            message : msg
        }

        return NativeUtils.callNative('callContactToSMS', params, true );
    },

    /**
     * 앱 로컬로 알림을 발생 시킴
     */
    callSendNotification : ( id, dttm, title, msg, url ) => {
        const params = {
            id : id,
            datetime : dttm,
            title : title,
            message : msg,
            url : url
        }

        return NativeUtils.callNative('callSendNotification', params, true );
    },

    /**
     * 앱 로컬에 등록된 알람 제거
     * @param id
     */
    callRemoveNotification : ( id ) => {
        const params = {
            id : id
        }

        return NativeUtils.callNative('callRemoveNotification', params, true);
    },

    /**
     * 앱 로컬에 등록된 알림의 ID를 조회
     */
    callQueryNotification : () => {
        return NativeUtils.callNative('callQueryNotification', null, true );
    },

    /**
     * 푸시허용여부 상태 조회
     */
    callNotificationStatus : () => {
        return NativeUtils.callNative('callNotificationStatus', null, true );
    },

    /**
     * 앱의 설정화면으로 이동
     */
    callOpenSetting : () => {
        return NativeUtils.callNative('callOpenSetting', null, true );
    },

    /**
     * 앱 내부에 데이터를 저장
     * @param key
     * @param value
     * @returns {Promise<unknown>}
     */
    callSaveData : ( key, value) => {
        const params = {
            key : key,
            value : value
        }

        return NativeUtils.callNative('callSaveData', params, false );
    },

    /**
     * 앱 내부의 데이터를 불러옴
     * @param key
     */
    callLoadData : ( key ) => {
        const params = {
            key : key
        }

        return NativeUtils.callNative('callLoadData', params, true );
    },

    /**
     * 내 명함 이미지 텍스트를 디바이스로 공유
     * @param str
     * @param imgData
     */
    callContactToShare : ( str, imgData ) => {
        const params = {
            text : str,
            imageData : imgData
        }

        return NativeUtils.callNative('callContactToShare', params, true );
    },

    /**
     * TTS 기능 호출
     * @param key    [String] : 동작 키
     * @param action [String] : 동작 코드 ( 0 : play, 1 : stop)
     * @param str    [String] : 읽을 텍스트 문
     */
    callTTS : ( key, action, str ) => {
        const params = {
            key : key,
            action : action,
            text : str
        }

        return NativeUtils.callNative('callTTS', params, true );
    },

    /**
     * 생체인증 진행
     * @param id
     */
    callBIOAuth : ( id, type ) => {
        const params = {
            id : id,
            type : type
        }

        return NativeUtils.callNative('callBIOAuth', params, true );
    },

    /**
     * 생체인증 사용 가능여부 확인
     */
    callBIOAvailable : () => {
        return NativeUtils.callNative('callBIOAvailable', null, true );
    },

    /**
     * 생체 등록 성공 후 로그인 정보를 앱으로 전달한다.
     * @param [String] id : 아이디
     * @param [String] pw : 패스
     * @param [String] scrKy :  보안키패드 키
     */
    callRegistSuccess : (id, pw, scrKy ) => {
        const params = {
            id : id,
            pw : pw,
            secureKey : scrKy
        }

        return NativeUtils.callNative('callRegistSuccess', params )
    },

    /**
     * 앱 내의 자체 브라우저를 오픈
     * @param url
     */
    callLocalBrowser : ( url ) => {
        const params = {
            url : url
        }

        return NativeUtils.callNative('callLocalBrowser', params, true );
    },

    /**
     * 앱 자체브라우저가 있으면 닫는다
     */
    callCloseLocalBrowser : () => {
        return NativeUtils.callNative('callCloseLocalBrowser', null, true );
    },

    /**
     * 접속할 채널 선택 화면 오픈
     * @param channelType [String] : 채널 선택 화면을 띄움 (
     *                                  "0" : 채널 선택
     *                                  "1" : RM 화면
     *                                  "2" : PB 화면
     * )
     */
    callSelectChannel : ( channelType ) => {
        const params = {
            channel : channelType
        }

        return NativeUtils.callNative('callSelectChannel', params, true );
    },

    /**
     * 디바이스 가로/세로 방향 조회
     */
    callChangeOrientation : () => {
        return NativeUtils.callNative('callChangeOrientation', null, true );
    },

    /**
     * 외부 앱 실행, 앱이 없으면 설치페이지로 이동
     * @param scheme [String] :  앱 스키마
     * @param url    [String] : 설치 URL
     */
    callToApp : ( scheme, url) => {
        const params = {
            scheme: scheme,
            installURL: url
        };

        return NativeUtils.callNative('callToApp', params, true)
    },

    /**
     * JSON 문자열 파싱전 변환 처리
     * @param jsonString [String] :  JSON 문자열
     */
        fixAndParseJson ( jsonString ) {
      try {

          if ( typeof jsonString === 'object' ) {
              jsonString = JSON.stringify(jsonString);
          }

          let fixedJsonString = jsonString.replace(/"\{([^{}]+)\}"/g,( match) => {
              console.log('match : ' , match);
              return match.replace(/"/g, '\\"');
          })

          fixedJsonString = fixedJsonString.replace('\\"{', "\"{");
          fixedJsonString = fixedJsonString.replace('}\\"', "}\"");

          console.log('1st Fixed JSON String : ' , fixedJsonString);
          console.log('Fixed JSON String typeof  : ' , typeof fixedJsonString);

          // // 20250220 버전에서 에러 발생하여 추가 수정
          // fixedJsonString = fixedJsonString.replace(/[\r\n\t\f]/g, '');
          // fixedJsonString = fixedJsonString.replace(/\\"/g, '"');
          // console.log('2nc Fixed JSON : ' , fixedJsonString );
          // console.log('2nc Fixed JSON String typeof  : ' , typeof fixedJsonString);

          let parsedData = JSON.parse(fixedJsonString);

          console.log('parsedData : ' , parsedData );

          console.log('typeof parsedData object : ' , typeof parsedData === 'object' );
          console.log('typeof parsedData : ' , typeof parsedData.data === 'string' );

          if ( typeof parsedData.data === 'string' ) {

              let fixedInnerJson = parsedData.data.replace(/([{,])\s*([^":,\s]+)\s*:/g, '$1"$2":')
                                                           .replace(/:\s*([^",\s}\]]+)\s*([,}])/g,':"$1"$2');

              console.log('fixedInnerJson : ' , fixedInnerJson );

              try {
                  parsedData.data = JSON.parse(fixedInnerJson);
              } catch ( e ) {
                  console.log('parsing error : ' , e );
              }
          }

          return parsedData;
      } catch ( error ) {
          console.log('JSON parse error : ' , error );
          return null;
      }

    },

    /**
     * 컴포넌트에서 Native 응답을 구독하는 함수
     * @param  {function} handler - 이벤트 발생시 실행할 함/수
     */
    subscribe( handler, eventType = null) {
        if ( eventType === null ) {
            eventType = 'nativeResponse';
        }

        if ( typeof handler !== 'function') {
            console.log('subscribe handler is not a fuction!!');
        }

        NativeUtils.eventTarget.addEventListener( eventType, (event) => {
            handler(event);
        });
    },

    /**
     * 컴포넌트에서 Native 응답 구독을 해제하는 함수
     * @param {function} handler : 제거할 이벤트 리스터
     */
    unSubscribe( handler , eventType = null) {
        if ( eventType === null ) {
            eventType = 'nativeResponse';
        }

        if ( typeof handler !== 'function') {
            console.log('unSubscribe handler is not a fuction!!');
        }

        NativeUtils.eventTarget.removeEventListener( eventType, (event) => {
            handler(event);
        });
    },

    /**
     * RM과 공유하는 응답 함수인 경우에 별도 세팅
     */
    setupGlobalNativeResponseHandler () {
        const nativeResponseFunctions = [
            "callKeypadDoneValue",
            "callKeypadInputValue",
            "callScheduleRmToResult",
            "callSchedulePhoneToRm",
            "resImageBase64String",
            "callCropBase64Image",
            "callbackSessionKeep",
            "callTTSFinish",
            "androidHistoryBack"
        ];
        
        nativeResponseFunctions.forEach((method) => {
            if ( ! NativeUtils.registeredNativeMethods.includes(method)) {
                NativeUtils.registeredNativeMethods.push(method);
                
                // 키패드 입력중 함수 인경우
                if ( method === 'callKeypadInputValue' ) {
                    window[method] = ( response, response2 ) => {
                        console.log(`Native response from : ${method}`, response, response2 );
                        const result = {
                            command : method,
                            data : response,
                            length : response2
                        }

                        NativeUtils.handleNativeResponse(result, true);
                    }
                } else {
                    // 나머지 인 경우
                    window[method] = ( response ) => {
                        console.log(`Native response from : ${method}`, response );

                        const result = {
                            command : method,
                            data : response
                        }

                        NativeUtils.handleNativeResponse(result, true);
                    }
                }
            }
        })
    },

    //nonce 값 세팅
    /**
     * @param [String] nonce : 서버에서 생성한 임의의 값
     */
    setNonce ( nonce ) {
        NativeUtils.nonce = nonce;
    },

    // 저장된 nonce 걊을 가져온다
    getNonce () {
        return NativeUtils.nonce;
    },


    /**
     * 타블렛의 경우 화면 기울기 센서를 통해 가로(Landscape), 세로(Portrait) 인지 콜백을 실행해 준다.
     * 
     */
    nativeForceChangeTilt (tilt) {
        console.log("[ Aiden ] Tilt 변경 모드 확인", tilt);
        
        if(tilt === 'landscape'){
            
        } else if (tilt === 'portrait'){
            
        } else {
            console.log("[ Aiden ] Tilt 변경 시 잘못된 인자값이 들어옴");
        }
    }
};

NativeUtils.setupGlobalNativeResponseHandler();

export default NativeUtils;