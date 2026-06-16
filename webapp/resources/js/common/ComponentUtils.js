const Components = {};

const ComponentUtils = {
	app : null,
	history : [],
	isInitHistoryData : false,
	
	initComponent : async ( rootElementId, options ) => {
		
		// Load Component Paths
		await ComponentUtils.loadComponentPaths( options );
		
		// root component  생성
		const componentId   = 'root';
		const rootComponent = await ComponentUtils.getComponent(componentId);
		
		// 전역 함수 세팅
		
		
		 
	},
	
	// 컴포넌트 경로 정보가 포함된 스크립트 파일을 로드한다.
	loadComponentPaths : async options => {
		const paths = options.componentsPaths;
		if ( !paths || paths.length < 1 ) {
			return Promise.resolve();
		}
		
		const time = new Date().getTime();
		const arr  = $.map(paths, path => {
			return $.getScript(path + '?time=' + time );
		});
		
		return $.when.apply($, arr);
	},
	
	// 화면을 특정 컴포넌트로 이동한다. layout은 전역 데이터인 Layouts에 정의된 Object 값
	move : async ( componentId, layout ) => {
		if ( !ComponentUtils.isInitHistoryData ) { 
			ComponentUtils.addHistory(componentId, layout);
		}
		
		// 이동할 컴포넌트 아이디를 현재 root 컴포넌트데이터에 세팅
		Components.root.app.nowComponentId = componentId;
		
		if ( !Components[componentId]) { 
			const component = await ComponentUtils.getComponent(componentId);
			ComponentUtils.app.component(componentId, component);
		}
		
		if ( layout.id === Layouts.SINGLE.id ) {
			Components.root.app.nowLayout   = layout;
			Components.root.app.componentId = componentId;
		} else {
			if ( !Components[layout.id]) { 
				const component = await ComponentUtils.getComponent(layout.id);
				ComponentUtils.app.component(layout.id, component);
			}
			
			if ( Components.root.app.nowLayout.id === layout.id ) { 
				Components[layout.id].app.layoutComponentId = componentId;
			} else {
				layout.initComponentId = componentId;
				Components.root.app.nowLayout = layout;
				Components.root.app.componentId = layout.id;
			}
		}
	},
	
	// 히스토리 추가
	addHistory: (componentId, layout) => {
		const history = ComponentUtils.history;
		
		const nowLayout = Components.root.app.nowLayout;
		const nowComponentId = nowLayout.id === Layouts.SINGLE.id ?  Components.root.app.componentId : Components[nowLayout.id].app.layoutComponentId;
		
		// 현재 컴포넌트 아이디가 없을 경우 초기화면 로드로 간주하고 이력을 쌓지 않는다
		if ( nowComponentId === null ) {
			return;
		}
		
		const newHistory = { 
			componentId   : nowComponentId,
			layout        : nowLayout,
			componentData : ComponentUtils.getNowData[nowComponentId]
		}
		
		history.push(newHistory);
	},
	
	
	getNowData : componentId => {
		const originalData = Components[componentId].data;
		const app = Components[componentId].app;
		
		const resultData = {};
		for ( let key of Object.keys(originalData)) { 
			resultData[key] = _.closeData(app[key]);
		}
		
		return resultData;
	},
	
	
	goBack : async () => {
		const history = ComponentUtils.history;
		if ( history.length < 1 ) { 
			return Promise.reject("History is Empty...");
		}
		
		const lastHistoryInfo = history[history.length -1];
		const nowLayout = Components.root.app.nowLayout;
		const nowComnponentId = nowLayout.id === Layouts.SINGLE.id ? Components.root.app.componentId : Components[nowLayout.id].app.layoutComponentId;
		
	}
};