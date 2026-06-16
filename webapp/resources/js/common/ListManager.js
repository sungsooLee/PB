class ListManager {
	constructor( rootElem, options = {}) {
		if ( ListManager.instance ) {
			return ListManager.instance;
		}
		
		// 싱글턴 인스턴스 설정
		ListManager.instance = this;
		
		this.rootElem = rootElem;
		this.items = [];
		this.itemModules = new Map();		// 리스트 아이템의 모듈 관리
		this.listContainer = null;
		this.paginationContainer = null;
		
		// 기본 옵션 설정
		this.options = {
			usePagination : false,
			itemsPerPage : 10,
			listItemHtmlPath : '',
			listItemJsPath : '',
			...options,
		};
		this.currentPage = 1;

	}

	/**
	 * ListManager 를 초기화한다. ( 함수 강제 실행 금지 )
	 * @param containerSelector  [HTMLElement] : list가 담길 요소
	 * @param paginationSelector [HTMLElement] : pagination 이 담기 요소
	 * @param options			 [Object] : pagination 관련 옵션 객체
	 */
	init ( containerSelector, paginationSelector, options ) {

		this.listContainer = containerSelector;

		if (!this.listContainer) {
			throw new Error('List container not found!!');
		}

		// 옵셥값이 바뀌는게 있으면 적용
		if ( options ) {
			this.options = options;
		}

		console.log('init options : ' , this.options);

		if (this.options.usePagination && paginationSelector) {
			this.paginationContainer = paginationSelector;
			if (!this.paginationContainer) {
				throw new Error('pagination container not found!!');
			}
		}
	}

	/**
	 * 리스트를 렌더링 한다.
	 * @param items       [List<Object>] 데이터 배열
	 * @param eventTarget [Object] 리스트 메이저를 호출한 모듈에서 아이템 클릭시 이벤트를 수신 할 객체
	 */
	async render ( items , eventTarget ) {
		return new Promise(async (resolve) => {
			//기존 아이템 삭제
			this.clear();

			console.log('addItem!!! :  items length : ' ,items.length);
			this.items = items;

			if (this.options.usePagination) {
				// 페이지네이션 렌더링
				this.renderPagination();
				//
			} else {
				console.log('addItem!!! :  items length : ' , this.items);

				const fragment = document.createDocumentFragment();

				// 모든 아이템 렌더링
				//ListItem HTML 로드
				const listItemHTML = await this.loadHTML(this.options.listItemHtmlPath);

				for ( let i = 0 ; i < this.items.length ; i++) {
					const item = this.items[i];
					await this.addItem(item, fragment, listItemHTML, eventTarget);
				}

				this.listContainer.elements[0].appendChild(fragment);
				//this.listContainer.elements[0].replaceChildren(fragment);

				// 모든 아이템을 로드 add 한 후에 로딩이 떠있으면, 로딩 숨기기
				if ( CmmUtils.isLoading() ) {
					CmmUtils.hideLoading();
				}
			}

			resolve({resultCd : "success"});
		});
	}

	async renderPage ( pageNum ) {
		//this.clear();
		this.currentPage = pageNumber;

		const startIdx = (pageNumber - 1) * this.options.itemsPerPage;
		const endIdx = startIdx + this.options.itemsPerPage;
		const pageItems = this.items.slice(startIdx, endIdx);

		//ListItem HTML 로드
		const listItemHTML = await this.loadHTML(this.options.listItemHtmlPath);

		for (const itemData of pageItems) {
			await this.addItem(itemData, listItemHTML);
		}
	}

	renderPagination () {

		if (!this.paginationContainer) return;

		const totalPage = Math.ceil(this.items.length / this.options.itemsPerPage);
		this.paginationContainer.innerHTML = '';

		for (let i = 1; i <= totalPage; i++) {
			//const pageBtn =
		}
	}


	async addItem ( itemData, fragment, itemHtml, eventTarget ) {


		//console.log('itemHtml : ' , itemHtml.startsWith('<th'));

		const itemDivi = itemHtml.startsWith('<th') ?  'tr' : 'div';

		const tempElem = document.createElement(itemDivi);
		tempElem.innerHTML = itemHtml.trim();
		// DOM 요소 생성
		const listItemElem = ( itemDivi === 'div')? tempElem.firstChild : tempElem;

		//console.log('listItemElem : ' , listItemElem);

		// data-id 속성 추가
		listItemElem.setAttribute('data-id', itemData.id);
		
		// 데이터 바인딩 ( itemData 키에 따라 바인딩시킨다 )
		await this.bindDataToHtml( itemData, listItemElem);
		
		// 모듈 로드
		const ItemModuleClass = (await import(this.options.listItemJsPath)).default;
		const itemModule = new ItemModuleClass(listItemElem, eventTarget);
		this.itemModules.set(itemData.id, itemModule);

		// 이벤트 등록
		$$(listItemElem).on('click', (event) => {
			this.handleItemClick(event, itemData);
		});

		//console.log('listContainer : ' , this.listContainer.elements[0]);

		fragment.appendChild(listItemElem);
		
		// 모듈 초기화
		if ( itemModule.init ) itemModule.init(itemData, eventTarget );
		
	}

	removeByIndex ( indexes ) {
		if ( !Arrays.from(indexes)) {
			indexes = [indexes];
		}

		// 내림차순으로 정렬하여 위에서 부터 삭제 ( 앞에서 삭제하면 인덱스가 틀어질 수 있음 )
		indexs.sort((a , b) => b - a);

		indexes.forEach((idx) => {
			if ( index < 0 || index >= this.items.length ) {
				return;
			}

			// 삭제 대상 아이템 데이터
			const itemData = this.items[index];

			// DOM 및 모듈 삭제
			this.removeItem(itemData.id);

			// 배열에서 데이터 삭제
			this.items.splice(index, 1);
		});

		if ( this.options.usePagination ) {
			this.renderPagination(this.currentPage);
		}
	}

	removeItem ( itemId ) {
		const listItemElem = this.listContainer.querySelector(`[data-id="${itemId}"]`);

		// 이벤트 등록 해제
		$$(listItemElem).off('click', (event) => {
			this.handleItemClick(event, itemData);
		});

		if ( listItemElem ) {
			this.listContainer.removeChild(listItemElem);
		}
	}


	/**
	 * HTML 요소에 데이터 바인딩
	 * @param data [Object] : 리스트 아이템 데이터
	 * @param elem [HTMLElement] : 바인딩할 HTML 요소
	 */
	async bindDataToHtml ( data, elem ) {
		for ( const [key, value] of Object.entries(data)) {
			//console.log('key : ' , key);
			//console.log('name elem : ' , elem.querySelector(`[data-bind="name"]`));
			const targetElem = elem.querySelector(`[data-bind="${key}"]`);
			//console.log('targetElem : ' , targetElem);
			//console.log('typeof value : ' , value);

			if ( targetElem ) {
				// value 타입이 true/false 가 아닌 경우
				if ( value && typeof value !== 'boolean') {
					if ( value.indexOf('jpg') > -1 || value.indexOf('jpeg') > -1 || value.indexOf('png') > -1 ) {
						targetElem.src = value;
					} else {
						targetElem.textContent = value;
					}
				} else {
					// value 타입이 true/false 인 경우
					(value)? $$(targetElem).show() : $$(targetElem).hide();
				}

			}
		}
	}

	/**
	 *  리스트 전체 초기화
	 */
	clear () {

		console.log('clear!!!');

		this.itemModules.forEach((module) => {
			if( module.destory ) {
				module.destory();
			}
		});

		this.itemModules.clear();
		this.items = []

		//console.log('clear listContainer : ' , this.listContainer);

		if ( this.listContainer.elements.length > 0 ) {
			//this.listContainer.elements[0].innerHTML = '';
			this.listContainer.elements[0].replaceChildren();
		}
	}

	async loadHTML ( url ) {
		const res = await fetch( url );
		if ( res.ok ) {
			return res.text();
		}
	}

	/**
	 * 리스트 아이템 클릭 핸들러 ( 데이터 내에 onClick 콜백함수를 등록한다 )
	 * @param event [Event] : 이벤트 유형
	 * @param itemData [Object] : 클릭된 아이템 데이터
	 */
	handleItemClick( event, itemData ) {
		if ( itemData.onClick ) {
			itemData.onClick( itemData );
		}
	}

	/**
	 * 전체 선택/ 해제
	 */
	handleSelectAll ( isChecked ) {
		const start = (this.curPage - 1) * this.itemPerPage;
		//const end   =
	}
}

export default ListManager;