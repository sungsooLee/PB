class SSEUtils {
    constructor(url, params = {}) {
        this.url = url;             // 기본 URL
        this.params = params;       // Query parameter
        this.eventSource = null;    // Event Source 객체
    }

    /**
     * Query paramter url 생성
     * @returns {string}
     */
    buildURL () {

        const query = new URLSearchParams(
            Object.entries(this.params).map(([key, value]) =>[key, encodeURIComponent(value)])
        );

        return query ? `${this.url}?${query.toString()}` : this.url;
    }

    /**
     * SSE 연결 시작
     * @param {*} onMessage     [FUNC] : 기본 메시지 처리 핸들러
     * @param {*} eventHandlers [Object] : 추가 이벤트 처리 핸들러
     */
    start( onMessage , eventHandlers = {} ) {

        console.log('eventSource : ' , this.eventSource );
        if ( this.eventSource ) {
            return;
        }

        // URL 생성 및 eventSource 연결
        const fullURL = this.buildURL();
        console.log('fullURL : ' , fullURL);

        this.eventSource = new EventSource(fullURL);

        let isDoc = false;
        let docBuffer = '';

        // 기본 메시지 핸들러 설정
        this.eventSource.onmessage = async ( event ) => {

            //console.log('event : ', event);

            if (event.data && event.data.length > 0) {
                const jsonData = JSON.parse(event.data);
                const eventType = jsonData.event;
                let base64Data = '';
                let decodedData = '';
                let srchId = '';


                switch (eventType) {

                    case 'CHUNK' :
                        base64Data = jsonData.data;
                        decodedData = decodeURIComponent(escape(atob(base64Data)));

                        srchId = jsonData.srchId;
                        //console.log('srchId : ', srchId);
                        //console.log('decodedData : ' , decodedData );

                        if (decodedData.indexOf("<") > -1 || isDoc) {
                            docBuffer += decodedData;
                            isDoc = true;
                        }
                        eventHandlers['CHUNK'](decodedData);
                        //console.log('event : ', event);

                        if (onMessage && !isDoc) {
                            onMessage(decodedData);
                            eventHandlers['SRCHID'](srchId);
                        } 
//                        else if (isDoc && docBuffer.indexOf('</docu') > -1) {
//                            console.log('docBuffer decodedData : ' , docBuffer);
//                            let rtrnData = docBuffer.replaceAll('<docu>', '');
//                            rtrnData = rtrnData.replaceAll('</docu>', '');
//                            console.log('rtrnData : ' , rtrnData);
//                            //onMessage(rtrnData);
//                            if (eventHandlers) {
//                                eventHandlers['DOC'](rtrnData);
//                                return;
//                            }
//                        }

                        break;

                    case 'RESPONSE' :
                        base64Data = jsonData.contents;
                        decodedData = decodeURIComponent(escape(atob(base64Data)));
                        const reasonData = JSON.parse(decodedData);

                        console.log('reasonData : ', reasonData);

                        // 근거 문서 응답 구간
                        if ( reasonData && reasonData.rsp_msg === 'succ') {
                            const reasonList = reasonData.output.reason[0].contents;
                            console.log('reasonList : ', reasonList);
                            if ( eventHandlers ) {
                                eventHandlers['RESPONSE'](reasonList);
                            }
                            
                            const answerAll = reasonData.output.answer;
                            eventHandlers['THINKING'](answerAll);
                        }

                        // 관련 민원 응답 구간
                        if ( reasonData.output.complaint_contents && reasonData.output.complaint_contents.length > 0 ) {
                            const complaintData = reasonData.output.complaint_contents[0];
                            console.log('complaintData : ', complaintData);
                            if ( eventHandlers ) {
                                eventHandlers['COMPLAINT'](complaintData);
                            }
                        }
                        //     reasonList.forEach((item) => {
                        //         Object.entries(item).forEach(([key, value]) => {
                        //             const decodedData = decodeURIComponent(escape(atob(value)));
                        //             item[key] = decodedData;
                        //         });
                        //     });
                        //
                        //     console.log('reasonList : ' , reasonList );
                        //
                        //     if ( eventHandlers ) {
                        //         eventHandlers['CHUNK'](reasonList);
                        //     }
                        // }

                        break;

                    case 'EXCEPTION' :
                        base64Data = jsonData.contents;
                        decodedData = decodeURIComponent(escape(atob(base64Data)));

                        console.log('EXCEPTION decodedData : ', decodedData);

                        if ( decodedData.indexOf('null')) {
                            const expMsg = 'AI지식상담 서버에 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.'
                            if (eventHandlers) {
                                eventHandlers['EXCEPTION'](expMsg);
                                return;
                            }
                        } else {
                            const expMsg = JSON.parse(decodedData);
                            if (eventHandlers) {
                                eventHandlers['EXCEPTION'](expMsg);
                                return;
                            }

                            break;
                        }

                    default :
                        console.log('illigal eventtype : ', eventType);
                }
            }

            //
            //     let data = event.data;
            //
            //     // 기본 응답 메시지 구간
            //     if ( data.charCodeAt(0) === 63 ) {
            //         data = data.slice(1);
            //         const decodedData = decodeURIComponent(escape(atob(data)));
            //
            //         if ( decodedData.startsWith("DOC")) {
            //             const selectedDoc = decodedData.slice(4);
            //             if (eventHandlers) {
            //                 eventHandlers['DOC'](selectedDoc);
            //                 return;
            //             }
            //         } else if ( decodedData.startsWith("ERR")) {
            //
            //             await CmmUtils.alert("",decodedData, {
            //                 btnLabel : '확인'
            //             });
            //
            //
            //         } else {
            //             console.log('onmessage : ' , decodedData );
            //
            //
            //             if ( onMessage ) onMessage(decodedData);
            //             return;
            //         }
            //     }
            //
            //     console.log('onmessage : ' , data );
            //     const reasonList = JSON.parse(data);
            //
            //     // 근거 문서 응답 구간
            //     if ( reasonList.length > 0 ) {
            //         reasonList.forEach((item) => {
            //             Object.entries(item).forEach(([key, value]) => {
            //                 if ( value.charCodeAt(0) === 63 ) {
            //                     value = value.slice(1);
            //                     const decodedData = decodeURIComponent(escape(atob(value)));
            //                     item[key] = decodedData;
            //                 }
            //             });
            //         });
            //
            //         console.log('reasonList : ' , reasonList );
            //
            //         if ( eventHandlers ) {
            //             eventHandlers['CHUNK'](reasonList);
            //         }
            //     }
            // }
        }

        // 추가 이벤트 핸들러 설정
        Object.keys( eventHandlers ).forEach((eventName) => {
            this.eventSource.addEventListener(eventName, (event) => {
                if ( eventHandlers[eventName] ) eventHandlers[eventName](event.data);
            });
        });

        // 오류 처리
        this.eventSource.onerror = ( error ) => {
            console.log('SEE Error : ', error);
            this.stop();
        };

        this.eventSource.addEventListener('error', (event) => {

            console.log('error event : ', event);
            if ( event.data ) {
                if ( event.data.startsWith("ERROR")) {
                    console.log('SSEUtils error : ', event.data);
                }
            }
        });
    }

    stop () {
        if ( this.eventSource ) {
            this.eventSource.close();
            console.log('SSE connection closed!');
            this.eventSource = null;
        } else {
            console.log('no active SSE connection');
        }
    }
}

export default SSEUtils;