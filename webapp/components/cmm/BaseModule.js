export class BaseModule {
	constructor(elem, param) {
		this.elem = elem;			// HTML 요소
		this.eventArray = [];	// 이벤트 callback 함수
		this.data = {};				// 데이터 객체
		this.bindings = new Map();			// 데이터와 HTML 요소의 바인딩 정보
	}
	
	/**
	 * 데이터를 Proxy로 감싸 변경 감지 설정
	 * @param {*} initialData [Object] : 초기 데이터 객체
	 */
	initData ( initialData ) {
		this.data = new Proxy(initialData, {
			set : (target, key, value) => {
				target[key] = value;	// 데이터 변경
				this.updateBindings(key, value);	// 바인딩된 요소 업데이트
				return true;
			}
		})
	}

	useState ( key, initVal ) {
		if ( ! this.bindings.has(key)) {
			const valWrapper = { value : initVal };
			const proxy = new Proxy(valWrapper,  {
				set : (target, props, value ) => {
					if ( props === 'value') {
						//console.log(`Setting ${key} to ${value}`);
						target.value = value;
						//console.log(`useState!!! ${target} : ` , target);

						//console.log(`this.bindings.get(key)) : ` , this.bindings.get(key));

						// HTML 요소 업데이트
						if ( this.bindings.get(key)) {
							this.bindings.get(key).elements.forEach((subscriber) => {
								//console.log('subscriber : ' , subscriber);
								if ( subscriber instanceof HTMLInputElement  || subscriber instanceof HTMLTextAreaElement ) {
									subscriber.value = value;
								}else if (  subscriber instanceof HTMLSelectElement  ) {
									$$( subscriber).value(value);
								} else {
									if ( subscriber.tagName === 'DIV' ) {
										subscriber.innerText = value;
									} else {
										subscriber.textContent = value;
									}
								}
							});
						}

						return true;
					}
					return false;
				},

				get : (target, props) => {
					//console.log('props : ' , props);

					if ( props === 'value') return target.value;
					if ( props === Symbol.toPrimitive ) {
						//console.log('props primitive!!');
						return () => target.value;
					}

					if ( props === 'toString' ) {
						//console.log('props toStringTag!!');
						return () => String(target.value);
					}

					if ( typeof props === 'symbol') return undefined;
					return target[props];
				} ,
			});
			
			this.bindings.set(key, {proxy, elements : []});
		}

		const stateProxy = this.bindings.get(key).proxy;

		// 상태 업데이트 함수
		const setState = ( newVal ) => {
			if ( ! this.bindings.has(key)) {
				//console.log(`State "${key}" is not initialized`);
				return;
			}

			const binding = this.bindings.get(key);
			if ( binding ) {
				//console.log('setState!!');
				binding.proxy.value = newVal;
			}
		};
		
		// 현재 상태와 상태 업데이트 함수 반환
		return [ stateProxy, setState ];
	}


	/**
	 * 데이터와 HTML 요소를 바인딩
	 * @param {*} key 	  [Object] : 바인딩할 변수 ( 객체 )
	 * @param {*} element [HTMLElement] : HTML 요소
	 */
	bind ( key, element, eventType = 'input' ) {

		//console.log('val typeof ' , typeof key );
		//console.log('element typeof ' , element.elements );
		//console.log('element typeof ' , element.elements !== undefined);
		//console.log('element instanceof ' , element.elements instanceof HTMLSelectElement );
	
		// $$로 선택한 요소가 유틸리티 객체일 경우 HTML 요소 추출
		if ( element?.elements !== undefined && element?.elements.length === 1) {
			element = element.elements[0]; // 첫번째 요소로 설정
		}

		if ( ! ( element instanceof HTMLElement ) ) {
			throw new Error ('두번재 파라미터는 HTML 요소여야 합니다!!');
		}

		// proxy가 없으면 useState로 초기화
		if ( !this.bindings.has(key) ) {
			//console.log(`State "${key}" is not initialized`);
			this.useState(key, '');
		}
	
		// HTML 요소 -> proxy 값 업데이트
		const updateProxy = (e) => {
			//console.log('e.target.value : ' , e.target.innerText);

			const inputVal = e.target.tagName === 'DIV' ? e.target.innerText : e.target.value;
			this.bindings.get(key).proxy.value = inputVal;
		};

		// Proxy 값 -> HTML 요소 업데이트
		if ( element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ) {

			//console.log('bind!!!! : ' , this.bindings.get(key).proxy.value);

			// input 인경우
			element.value = this.bindings.get(key).proxy.value;
		} else {
			if ( element instanceof HTMLSelectElement ) {
				//console.log('select elem update!!');
				$$(element).value(this.bindings.get(key).proxy.value);
			} else {
				console.log('elem update!!');
				// 그외
				element.textContent = this.bindings.get(key).proxy.value;
			}
		}

		// 요소 이벤트 리스터 등록
		$$(element).on(eventType, updateProxy);

		// 요소를 구독 목록에 추가
		this.bindings.get(key).elements.push(element);
	}

	/**
	 * bind된 변수를 초기화 하는 함수
	 * @param key
	 */
	resetField ( key ) {
		// proxy가 없으면 useState로 초기화
		if ( this.bindings.has(key) ) {
			this.bindings.get(key).proxy.value = '';
		}
	}


	/**
	 * BaseModule 초기화 - 자식 모듈의 이벤트를 등록하고 데이터 바인딩 처리
	 */
	init (childModule) {
		//console.log('base module Init : ' , childModule);
		//console.log('base module Init className : ' , childModule.constructor.name);
	}
	
	/**
	 * 자식 모듈이 이벤트와 데이터를 등록하는 메서드
	 * @param {*} eventType [String] : 이벤트 타입 ( ex: 'click', 'change' )
	 * @param {*} target    [HTMLElement | HTMLElement[]] : 이벤트 대상
	 * @param {*} callbacks   [Func|Func[]]   : callback 함수
	 */
	registerCallback( eventType, targets, callbacks ) {

		//log.debug('targets : ', targets.elements);

		let tObj = null;
		if ( targets?.elements ) {
			if ( Array.isArray(targets?.elements) ) {
				tObj = targets.elements;
			} else {
				tObj = [targets.elements[0]];
			}
		}

		//log.debug('tObj : ',tObj);
		const callbackArray = Array.isArray(callbacks)? callbacks : [callbacks];

		//log.debug('callbackArray : ',callbackArray);
		tObj.forEach((target, index) => {
			if ( target && callbackArray[index]
					&& typeof callbackArray[index] === 'function' ) {
				const callback = callbackArray[index];

				const bindCallback = callback.bind(this);

				$$(target).on(eventType, bindCallback);
				this.eventArray.push({ eventType, target, bindCallback });
			}
		});
	}

	/**
	 * input 또는 textArea에서 Blur  시키기
	 */
	removeInputFocus () {
		const activeElem = document.activeElement;
		//console.log('removeInputFocus activeElem : ',activeElem);
		//console.log('removeInputFocus activeElem tagName : ',activeElem.tagName);
		if ( activeElem && ( activeElem.tagName === 'INPUT' || activeElem.tagName === 'TEXTAREA'
		     || activeElem.tagName === 'BUTTON') ){
			//console.log('blur 실행!!');
			$$(activeElem).focusOut();
		}
	}

	/**
	 * 핀치줌(앱 확대/축소) 적용여부 true=적용
	 */
	isPinchZoom(isZoom) {
    	if(isZoom) {
    		$('meta[name=viewport]').attr("content", "width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes");
    	} else {
    		$('meta[name=viewport]').attr("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
    	}
    }
	
	/**
	 * BaseModule 정리 - 등록된 모든 이벤트 제거 및 변수 초기화
	 */
	destroy() {
		//log.debug('module destroy!!');
		// focus blur 처리
		this.removeInputFocus();

		this.eventArray.forEach(({eventType, target, callback}) => {
			//console.log('target eventId : ', target.dataset.eventId)
			$$(target).off();
		});
		
		this.eventArray = [];

		//console.log('this.elem : ' , this.elem);

		if ( this.elem !== null || this.elem !== undefined ) {

			//console.log('event clear start');
			//findByName으로 등록한 이벤트 해제
			$$().removeAllEvents(this.elem);
		}
	}
}
