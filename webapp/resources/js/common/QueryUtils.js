
const eventRegistry = {};

/**
 * DOM Element 선택하는 함수
 * param {*} selector [String] : 찾고자 하는 element의 아이디, 클래스 또는 태그 문자열
 *                               ( ex: #myId , .modal, div )
 */
export default function $$ (selector) {
    const elements = ( () => {

        if ( typeof selector === 'string' ) {
            if (selector.startsWith("#")) {
                const el = document.getElementById(selector.slice(1));
                return el ? [el] : [];
            } else if (selector.startsWith(".")) {
                return document.getElementsByClassName(selector.slice(1));
            } else {
                return document.querySelectorAll(selector);
            }
        } else if ( selector instanceof Node ) {
            return [selector];
        } else if ( selector instanceof NodeList || Array.isArray(selector)) {
            return selector;
        }

        return [];
    })();

    const utilObj = {
        elements : Array.from(elements),
        
        // 단일 객체에 접근
        get singleElement () {
            if ( this.elements.length === 1 ) {
                return this.elements[0];
            }
            
            return null;
        },
        
        value (newVal) {
            // 단일 요소 인경우
            if ( this.singleElement ) {
                if ( newVal !== undefined ) {
                    this.singleElement.value = newVal;
                    return; // 설정시에는 반환값 없음
                }

                return this.singleElement.value;
            }

            // 다중 요소 인경우
            if ( newVal !== undefined ) {
                this.elements.forEach((el) => {
                    el.value = value;
                });
                return; // 설정시에는 반환값 없음
            }

            return this.elements.map((el) => el.value);
        },
        
        // 선택한 요소의 텍스트 가져오기
        getText () {
              return this.elements.map(el => el.textContent).join(' ');
        },
        
        
        /**
         * 하위 요소 검색
         * @param selector [String || HTML 요소]
         * @param useChaining [Bool] :  체이닝 필요여부 ( true : 요소반환 / false : 배열 반환  )
         */
        find ( selector , useChaining = true ) {

            let foundElements = [];
            this.elements.forEach((el) => {
                const elems = this.getElem(el, selector);
                foundElements = foundElements.concat(Array.from(elems));
            });
            //console.log('foundElements : ' , foundElements);

            return useChaining ? $$(foundElements) : foundElements;
        },

        getElem ( elem = document, selector ) {
            //console.log(elem);
            //console.log('isDocument : ', elem === document);
            if ( typeof selector === 'string' ) {
                if (selector.startsWith("#")) {
                    const el = elem.querySelector(selector);
                    return el ? [el] : [];
                } else if (selector.startsWith(".")) {
                    return elem.getElementsByClassName(selector.slice(1));
                } else {
                    return elem.querySelectorAll(selector);
                }
            } else if ( selector instanceof Node ) {
                return [selector];
            } else if ( selector instanceof NodeList || Array.isArray(selector)) {
                return selector;
            }

            return [];
        },

        /**
         * 요소 보이기
         */
        show () {
          this.elements.forEach((el) => {
              el.style.display = el.dataset.originalDisplay || 'block';
          });
          return this;
        },

        /**
         * 요소 숨기기
         */
        hide () {
            this.elements.forEach((el) => {
                if (! el.dataset.originalDisplay ) {
                    el.style.originalDisplay = getComputedStyle(el).display;
                }
                el.style.display = 'none';
            });
            return this;
        },

        /**
         * 클래스 추가
         * @param classNm [String] : 클래스명
         */
        addClass( classNm ) {
            this.elements.forEach((el) => el.classList.add(classNm));
            return this;
        },

        /**
         * 클래스 삭제
         * @param classNm [String] : 클래스명
         */
        removeClass( classNm ) {
            this.elements.forEach((el) => el.classList.remove(classNm));
            return this;
        },
        
        // 클래스 전체 삭제
        removeAllClass() {
          this.elements.forEach((el) => el.className = '');
          return this;
        },
        
        /**
         * 클래스 토글
         * @param classNm [String] : 클래스명
         */
        toggleClass( classNm ) {
            this.elements.forEach((el) => el.classList.toggle(classNm));
            return this;
        },

        /**
         * HTML 가져오기/변경하기
         * @param content [String] : HTML 문자열
         */
        html ( content ) {
            if ( content === undefined ) {
                return this.elements[0]?.innerHTML || "";
            } else {
                this.elements.forEach((el) => {
                    el.innerHTML = content;
                });
                return this;
            }
        },

        /**
         * 텍스트 가져오기 /설정
         * @param content [String] : 텍스트 문구
         */
        text( content ) {
            if ( content === undefined ) {
                return this.elements[0]?.textContent || "";
            }  else {
                log.debug('text ===> ', content);
                this.elements.forEach((el) => {
                    log.debug('el ===> ', el);
                    el.textContent = content;
                });
                return this;
            }
        },

        /**
         * 하위에 HTML Element 요소를 붙인다.
         * @param child   [String | HTMLElement] : 하위에 붙일 아이템
         */
        append( child ) {
            this.elements.forEach((el) => {
                if ( child instanceof HTMLElement || child instanceof Node ) {
                    el.appendChild(child);
                } else if ( typeof child === 'string') {

                    if ( child.indexOf('<') > -1 ) {
                        //console.log('div append');
                        if( child.indexOf('li') > -1 ) {
                            el.insertAdjacentHTML('beforeend',child);
                        } else {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = child;
                            el.appendChild(tempDiv.firstElementChild);
                        }
                    } else {
                        //console.log('textNode');
                        const textNode = document.createTextNode(child);
                        el.append(textNode);
                    }
                }
            });
            return this;
        },

        /**
         * 이벤트 리스터 등록
         * @param event [String] : 이벤트 타입 ( 'click', 'change' )
         * @param handler [FUNC] : Callback 함수
         */
        on ( event, handler, isOnce ) {

            const onceObj = ( isOnce )? { once : true} : { once : false};
            //console.log('this.elements : ' , this.elements);

            this.elements.forEach((el) => {

                if ( !el.dataset.eventId ) {
                    el.dataset.eventId = `event-${Date.now()}-${Math.random()}`;
                }

                const eventId = el.dataset.eventId;

                if ( !eventRegistry[eventId]) {
                    eventRegistry[eventId] = {};
                }

                const elementEvents =  eventRegistry[eventId];

                //console.log('elementEvents : ' , elementEvents)

                if ( !elementEvents[event]) {
                    elementEvents[event] = new Set();
                }
                
                // 중복 등록 방지
                if ( !elementEvents[event].has(handler)) {
                    elementEvents[event].add(handler);
                    el.addEventListener(event, handler, onceObj)
                }
            });

            return this;
        },

        /**
         * 이벤트 리스터 해제
         * @param event [String] : 이벤트 타입 ( 'click', 'change' )
         * @param handler [FUNC] : Callback 함수
         */
        off ( event, handler ) {

            this.elements.forEach((el) => {
                const eventId = el.dataset.eventId;
                if ( !eventId || !eventRegistry[eventId]) return;

                const elementEvents = eventRegistry[eventId];

                if ( event ) {
                    // 특정 이벤트 타입 제거
                    if ( elementEvents[event]) {
                        if ( handler ) {
                            if ( elementEvents[event].has(handler)) {
                                el.removeEventListener(event, handler);
                                elementEvents[event].delete(handler);
                            }
                        } else {
                            elementEvents[event].forEach((cb) => {
                                el.removeEventListener(event, cb);
                            });
                            delete elementEvents[event];
                        }
                    }
                } else {
                    // 모든 이벤트 제거
                    Object.keys(elementEvents).forEach((type) => {
                        elementEvents[type].forEach((cb) => {
                            el.removeEventListener(type, cb);
                        });
                    });
                    delete eventRegistry[eventId];
                }
            });
            return this;
        },

        /**
         * 어트리뷰트 추가
         * @param attrNm [String] : 아트리뷰트 이름
         * @param value  [String] : 내용
         */
        addAttr ( attrNm, value) {
            this.elements.forEach((el) => {
                el.setAttribute(attrNm, value);
            });
            return this;
        },

        /**
         * 어트리뷰트 제거
         * @param attrNm [String] : 아트리뷰트 이름
         */
        removeAttr ( attrNm ) {
            this.elements.forEach((el) => {
                el.removeAttribute(attrNm);
            });
            return this;
        },

        /**
         * 어트리뷰트 가져오기 ( 첫번쩨 요소 기준 )
         * @param attrNm [String] : 아트리뷰트 이름
         */
        getAttr ( attrNm ) {
            if ( this.elements.length > 0 ) {
                return this.elements[0].getAttribute(attrNm);
            }
            return null;
        },

        /**
         * 요소의 속성값 조회, 수정
         * @param key
         * @param value
         */
        prop ( key, value) {
          if ( value === undefined ) {
              return this.elements.length > 0 ? this.elements[0][key] : undefined;
          } else {
              this.elements.forEach( el => el[key] = value);
              return this;
          }
        },

        /**
         * 요소를 순회하며 콜백 실행
         * @param callback
         */
        each ( callback ) {
          this.elements.forEach((el, index) => callback(el, index));
        },

        findByName (name, eventType, callback) {

            const namedElem = document.getElementsByName(name);

            Array.from(namedElem).forEach((el) => {
                if ( el.name === name ) {
                    el.addEventListener(eventType, (event) => {
                        callback(event, el);
                    });

                    if ( !el.dataset.eventId ) {
                        el.dataset.eventId = `event-${Date.now()}-${Math.random()}`;
                    }

                    const eventId = el.dataset.eventId;

                    if ( !eventRegistry[eventId]) {
                        eventRegistry[eventId] = {};
                    }

                    const elementEvents =  eventRegistry[eventId];

                    //console.log('elementEvents : ' , elementEvents)

                    if ( !elementEvents[eventType]) {
                        elementEvents[eventType] = new Set();
                    }

                    // 중복 등록 방지
                    if ( !elementEvents[eventType].has(callback)) {
                        elementEvents[eventType].add(callback);
                    }
                }
            });

            return this;


            // const tElem = $$(`[name="${name}"`);
            //
            // document.addEventListener(eventType, (event) => {
            //     const target = event.target;
            //     if ( target && target.name === name) {
            //         callback(event, target);
            //     }
            // });

            // 이벥트 레지스트리에 등록
            //if ( !eventRegistry.has())
        },

        removeAllEvents ( rootElem ) {

            //console.log('removeAllEvents rootElem : ' , rootElem);

            Object.keys(eventRegistry).forEach((eventId) => {

                //console.log('removeAllEvents eventId : ' , eventId);

                const elementEvents = eventRegistry[eventId];
                const el = rootElem.querySelector(`[data-event-id="${eventId}"]`);

                //console.log('removeAllEvents : ' , el);

                if ( !el ) {
                    return;
                }

                //console.log('elementEvents : ' , elementEvents);

                Object.keys(elementEvents).forEach((eventType) => {

                    //console.log('elementEvents eventType : ' , eventType);
                    const handlers = elementEvents[eventType];

                    //console.log('handlers : ' ,handlers );

                    handlers.forEach((hndlr) => {
                        el.removeEventListener(eventType, hndlr);
                    });
                });

                delete eventRegistry[eventId];
            });

            console.log('All events removed from eventRegistry');
        },

        scrollToTop (duration = 0) {
            this.elements.forEach((el) => {
                if ( el === window || el === document || el === document.body ) {
                    window.scrollTo({
                        top : 0,
                        behavior : duration > 0 ? 'smooth' : 'auto'
                    });
                } else {
                    el.scrollTo({
                        top : 0,
                        behavior : duration > 0 ? 'smooth' : 'auto'
                    });
                }
            });
            return this;
        },

        scrollToBottom (duration = 0) {
            this.elements.forEach((el) => {
                if ( el === window || el === document || el === document.body ) {
                    window.scrollTo({
                        top : document.documentElement.scrollHeight,
                        behavior : duration > 0 ? 'smooth' : 'auto'
                    });
                } else {
                    el.scrollTo({
                        top : el.scrollHeight,
                        behavior : duration > 0 ? 'smooth' : 'auto'
                    });
                }
            });
            return this;
        },

        /**
         * 특정요소 또는 목록에 focusout 이벤트를 강제로 발생하는 유틸리티 함수
         */
        focusOut () {
          if ( this.elements instanceof NodeList ) {
              //console.log('focusout nodeList!!');
              this.elements.forEach(el => el.dispatchEvent( new Event ('focusout', { bubbles : true, cancelable :true })));
          } else if ( this.elements instanceof HTMLElement ) {
              //console.log('focusout htmlElem!!');
              this.elements.dispatchEvent(new Event('focusout',  { bubbles : true, cancelable :true }));
          }

          return this;
        },

        /**
         * CSS 스타일 설정
         * @param styles [Object] : 스타일 객체
         * */
        css( styles ) {
            this.elements.forEach((el) => {
                for ( const [key, value] of Object.entries(styles)) {
                    el.style[key] = value;
                }
            });
            return this;
        },

        registerElem ( key, elem ) {
            registeredElem[key] = elem;
        },

        compareElem (key) {
            return registeredElem.has(key)
        }
    };

    if ( utilObj.elements.length === 1 ) {
        utilObj.elements = [utilObj.elements[0]];
        return utilObj;
    }

    return utilObj;
}




