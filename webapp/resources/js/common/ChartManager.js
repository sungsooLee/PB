class ChartManager {
	construcor(rootElem, options = {}) {
		if(ChartManager.instance) {
			return ChartManager.instance;
		}
		
		ChartManager.instance = this;
		
		this.rootElem = rootElem;
		this.items = [];
		this.itemModules = new Map();
		this.ChartContainer = null;
		
		this.options = {
				container: '',
				chartTitle: '',				// 차트명
				chartSubTitle: '',			// 차트 서브명
				chartType: 'line',		// 차트 타입
				chartWidth: '100%',		// 차트 넓이
				chartHeight: '100%',	// 차트 높이
				animation: true,			// 애니메이션 적용여부
				lineColors : [],			// 선 색상
				xAxisTitle: '',				// x축 레이블명	
				yAxisLeftTitle : '',		// y축 좌측 레이블명
				yAxisRightTitle : '',		// y축 우측 레이블명
				defaultShowDataLabel: true, // 차트 레이블 라벨 노출 여부
				minMaxShowDataLabel: false, // 최소값 최대값 레이블 라벨 노출 여부
				minMaxData: [], // 최소값 최대값
				tickInterval: 0,  // 눈금간격
				turboThreshold: 1000, // 차트에 보여줄 데이터 최대 개수
				tooltip: {}, // 차트 툴팁
				shared: false,
				tooltipFrm: false,
//				eventChart:false,
				plotLines: {}, 	// 차트 중심 선 표시
				stroke: {}, 		
				markers: {},
				yAxisLeftLabels: false,
				yAxisRigthLabels: false,
				showFirstLabel: true,
				...options,
		}
		
		this.chartObj = '';
	}
	
	// 최초 실행
	init(containerSelector, options) {
		this.ChartContainer = containerSelector;
		
		if(!this.ChartContainer) {
			throw new Error('chartContainer not found');
		}
		
		if(options) {
			this.options = options;
		}
	}
	
	// 차트 화면 렌더링
	async render (data) {
		// 기존 생성된 차트 객체 제거
		//this.removeChart();
		
		// 차트 옵션 설정 및 객체 생성
		// 차트 데이터 세팅 및 그리기
		this.settingChart(data);
		
	}
	
	// 차트 화면 렌더링
	async render2 (data, initChartData) {
		// 기존 생성된 차트 객체 제거
		//this.removeChart();
		
		// 차트 옵션 설정 및 객체 생성
		// 차트 데이터 세팅 및 그리기
		this.settingChart2(data, initChartData);
		
	}
	
	// 차트 옵션 설정 및 객체 생성
	async settingChart (data) {
		const defaultShowDataLabel = this.options.defaultShowDataLabel;
		const minMaxShowDataLabel = this.options.minMaxShowDataLabel;
		const minMaxData = this.options.minMaxData;
		
		const _this = this;
		
		console.log('차트설정값 =', this.options);
		const initChartData = {
				"chart": {
					"type": this.options.chartType,
					"animation": this.options.animation
				},
				"colors": this.options.lineColors,
				"stroke" : this.options.stroke ? this.options.stroke : {},
				"markers": this.options.markers ? this.options.markers : {},
				"xAxis" : {

					"type": "category",
					"title": {
						"text": this.options.xAxisTitle
					},
					"plotLines":  this.options.plotLines ? [this.options.plotLines] : [],
					"showFirstLabel": this.options.showFirstLabel === true || this.options.showFirstLabel === false ? this.options.showFirstLabel : true
				},
				"title": {
					"text": this.options.chartTitle
				},
				"subtitle": {
					"text": this.options.chartSubTitle
				},
				"plotOptions": {
					"series": {
						"states": {
							"inactive": {
								"enabled": false
							}
						},
						"marker": {
							"enabled" : false
							, "symbol" : 'circle'
						},
						"turboThreshold": this.options.turboThreshold,
						"dataLabels": {
							"enabled": this.options.defaultShowDataLabel || this.options.minMaxShowDataLabel ? true : false
							, formatter: function()  {
								// 기본 라벨 노출
								if(defaultShowDataLabel) {
									return this.y;
								}
								
								// 최소값 최대값 라벨 노출
								if(minMaxShowDataLabel) {
									if(this.y === minMaxData[0] || this.y === minMaxData[1]) {
										return this.y;
									}
								}
							}
						}
					}
				},
				"yAxis": this.options.yAxisRightTitle && this.options.yAxisRightTitle !== '' ? [
						{
							"title": {"text": this.options.yAxisLeftTitle},
							"labels" : {
			                    "formatter" : function() {
			                    	if(_this.options.yAxisLeftLabels) {
			                    		return this.value.toString()+"%";			                    		
			                    	}else {
			                    		return this.value.toString();
			                    	}
			                    }
							}
						},
						{
							"title": {"text": this.options.yAxisRightTitle},
							"labels" : {
								"formatter" : function() {
									if(_this.options.yAxisRightLabels) {
			                    		return this.value.toString()+"%";			                    		
			                    	}else {
			                    		return this.value.toString();
			                    	}
								}
							}
							, "opposite": true
						},
						
					] : [
						{
							"title": {"text": this.options.yAxisLeftTitle},
							"labels" : {
								"formatter" : function() {
									if(_this.options.yAxisLeftLabels) {
			                    		return this.value.toString()+"%";			                    		
			                    	}else {
			                    		return this.value.toString();
			                    	}
								}
							}
						},
					],
				"lengend": { // 범례
					"enabled": false
				},
				
				"tooltip": this.options.tooltip ? this.options.tooltip : {
					'enabled': true,
					'shared': this.options.shared,
					'formatter': this.options.tooltipFrm ? function()  {
							let tooltipTxt = '';
							$.each(this.points, function(i, item){
								if(i === 0) {
									tooltipTxt += '<span style="font-size: 10px;">' + item.point.name +'</span>';
									tooltipTxt += '<br>';
								}
			                    tooltipTxt += '<span style="color: '+item.color+';">●</span> ';
			                    tooltipTxt += ': ';
			                    if(item.point.options.val) {
			                    	tooltipTxt += '<b>' + item.point.options.val + '(' + item.y + '%)</b>';			                    	
			                    }else {
			                    	tooltipTxt += '<b>' + item.y + '</b>';		
			                    }
		                        tooltipTxt += '<br>';
							}); 
							return tooltipTxt;
					} : null,
				}
		};
	
		// 전달받은 containainer 정보가 없을 경우 retrun
		if($$('#'+this.options.container).elements.length === 0) {
			return;
		}
		
		createIBChart(this.options.container, this.options.container, {
			width: this.options.chartWidth,
			height: this.options.chartHeight
		});
		
		// 차트 객체 가져오기
		this.chartObj = window[this.options.container];
		this.chartObj.setOptions(initChartData);
		
		// 차트 데이터 삽입
		this.loadData(data);
	}
	
	// 차트 옵션 설정 및 객체 생성
	async settingChart2 (data, initChartData) {
		const defaultShowDataLabel = this.options.defaultShowDataLabel;
		const minMaxShowDataLabel = this.options.minMaxShowDataLabel;
		const minMaxData = this.options.minMaxData;
		
		const _this = this;

		// 전달받은 containainer 정보가 없을 경우 retrun
		if($$('#'+this.options.container).elements.length === 0) {
			return;
		}
		
		createIBChart(this.options.container, this.options.container, {
			width: this.options.chartWidth,
			height: this.options.chartHeight
		});
		
		// 차트 객체 가져오기
		this.chartObj = window[this.options.container];
		this.chartObj.setOptions(initChartData);
		
		// 차트 데이터 삽입
		this.loadData(data);
	}
	
	
	// 차트 데이터 삽입
	async loadData (data) {
		const finalData = {
				"series": data
		}
		
		this.chartObj.loadSearchData(finalData, {
        	append: true
        });
	}
	
	// 차트 삭제
	async removeChart (callBackFunc) {
		// 기존에 생성된 차트 객체가 존재할 경우
		if(typeof this.chartObj === 'object') { 
			
			const data = this.chartObj.removeAll();
			
			if(typeof callBackFunc === 'function') {
				callBackFunc(data);				
			}
		} 
	}
	
	// 차트의 모든 데이터 조회
	async getChartData (callBackFunc) {
		const data = this.chartObj.getData();
		
		if(typeof callBackFunc === 'function') {
			callBackFunc(data);				
		}
	}
	
	// 차트의 ID 조회
	async getChartId (callBackFunc) {
		const data = this.chartObj.getId();
		
		if(typeof callBackFunc === 'function') {
			callBackFunc(data);				
		}
	}
	
	// 차트의 데이터 조회
	async getChartSeries (callBackFunc) {
		const data = this.chartObj.getSeries();
		
		if(typeof callBackFunc === 'function') {
			callBackFunc(data);				
		}
	}
}

export default ChartManager;