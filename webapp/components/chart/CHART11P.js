/*************************************************************************
* @ 서비스경로 : CHART11P
* @ 파일명      : CHART11P.html 차트 > 펀드/지수 비교 > [P]수익률 비교
* @ 화면ID		: PBWCH009901
* @ 작성자      : 90194835
* @ 작성일      : 2025-02-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-06            윤은정                 최초작성
*************************************************************************/

import { BaseModule } from '../cmm/BaseModule.js';

export class CHART11P extends BaseModule {
	constructor(elem) {
        super(elem);
        this.elem = elem;
        this.rootElem = elem;
		this.callbackFunc = null;
        
		[this.dataList, this.setDataList] 			= this.useState('dataList', '');						// 넘어온 데이터
		[this.paramData, this.setParamData] 	= this.useState('paramData', '');					// 넘어온 데이터
		[this.allData, this.setAllData] 			= this.useState('allData', '');						//  전체데이터
		[this.strTxt, this.setStrTxt] 				= this.useState('strTxt', '');							//  비교기간
    }
	
    init (param, callbackFunc ) {
        super.init(this);
        
        this.callbackFunc = callbackFunc;
        this.setDataList(param.data);
        this.setParamData(param.param);
        const txt = param.strTxt;
        if(txt === "1") {
        	this.setStrTxt("1개월");
        } else if(txt === "2") {
        	this.setStrTxt("3개월");
        } else if(txt === "3") {
        	this.setStrTxt("6개월");
        } else if(txt === "4") {
        	this.setStrTxt("1년");
        } else if(txt === "5") {
        	this.setStrTxt("3년");
        }
     
        this.register();
        this.initSetData();
    }
    
    async register() {
    	this.bind( 'strTxt', $$('#strTxt') , 'string');
    	
    	// 탭 선택시 화면 영역 컨트롤
		$('a[name=subTab]').on('click', function() {
			const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active');
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active');
            // 선택된 연관된 탭 패널 활성화
            $('#' + $(this).attr('data-controls')).addClass('tab-active').attr({ 'aria-selected': 'true' });
            // 기존 탭 패널 비활성화
            $('#' + $(this).attr('data-controls')).siblings('.tabpanel').removeClass('tab-active').attr({ 'aria-selected': 'false' });
		})
    }
    
    /*
	 * 표 그리기위한 데이터 정리
	 * */
    async initSetData() {
    	const params = this.paramData.value;
    	const items = this.dataList.value;
    	
    	let dataArr1 = [];
    	let dataArr2 = [];
    	let dataArr3 = [];
    	params.forEach((val, idx) => {
    		items.forEach((d, r) => {
				if(val.dscd === d.dscd) {
					const arr1 = {};
					const arr2 = {};
					const arr3 = {};
					if(idx === 0) {
						arr1.name1 = d.name;
						arr1.basDt = d.basDt;
						arr1.val1 = d.val;
						arr1.basPr1 = d.basPr;
						dataArr1.push(arr1);
					}
					if(idx === 1) {
						arr2.name2 = d.name;
						arr2.basDt = d.basDt;
						arr2.val2 = d.val;
						arr2.basPr2 = d.basPr;
						dataArr2.push(arr2);
					}
					if(idx === 2) {
						arr3.name3 = d.name;
						arr3.basDt = d.basDt;
						arr3.val3 = d.val;
						arr3.basPr3 = d.basPr;
						dataArr3.push(arr3);
					}
				}
			})
		});
    	
    	// 비교할 지수 및 펀드를 하나의 배열에 담기
    	const map = new Map();
    	dataArr1.forEach(item => map.set(item.basDt, item));
    	dataArr2.forEach(item => map.set(item.basDt, {...map.get(item.basDt), ...item}));
    	dataArr3.forEach(item => map.set(item.basDt, {...map.get(item.basDt), ...item}));
    	const mergeData = Array.from(map.values());
    	
    	this.setAllData(mergeData);
    	
    	await this.loadTab1Data();
    	await this.loadTab2Data();
    }
    
    /*
	 * 수익률 표 그리기
	 * */
    async loadTab1Data() {
    	const params = this.paramData.value;
    	const items = this.allData.value;
    	items.sort((a , b) => b.basDt - a.basDt);
    	
	   	 let html = '';
	   	 html += '<div class="table-col">';
	   	 html += '	<table>';
	   	 html += '		<caption>기간별 수익률</caption>';
	   	 html += '			<colgroup>';
	   	 if(params.length === 2) {
			 html += '				<col style="width:33%">';
	   	 html += '				<col style="width:34%">';
	   	 html += '				<col style="">';
	   	 } else if(params.length === 3) {
			 html += '				<col style="width:25%">';
	   	 html += '				<col style="width:25%">';
	   	 html += '				<col style="width:25%">';
	   	 html += '				<col style="">';
	   	 }
	   	 html += '			</colgroup>';
	   	 html += '			<thead>';
	   	 html += '				<tr>';
	   	 if(params.length === 2) {
			 html += '					<th scope="col">기준일</th>';
	   	 html += '					<th scope="col">' + params[0].name + '</th>';
	   	 html += '					<th scope="col">' + params[1].name + '</th>'; 
	   	 } else if(params.length === 3) {
			 html += '					<th scope="col">기준일</th>';
			 html += '					<th scope="col">' + params[0].name + '</th>';
			 html += '					<th scope="col">' + params[1].name + '</th>'; 
			 html += '					<th scope="col">' + params[2].name + '</th>';
	   	 }
	   	 html += '				</tr>';
	   	 html += '			</thead>';
	   	 html += '			<tbody>';
	   	 items.forEach((data, row) => {
		   	 html += '				<tr>';
		   	 html += '					<td>' + dayjs(data.basDt).format('YYYY-MM-DD') + '</th>';
		   	 
		   	 const val1 = (data.val1 === undefined || data.val1 === null) ? '0' : parseFloat(data.val1).toFixed(2);
		   	 const val2 = (data.val2 === undefined || data.val2 === null) ? '0' : parseFloat(data.val2).toFixed(2);
		   	 let cls1 = '';
		   	 let cls2 = '';
		   	 cls1 = (parseFloat(val1) < 0) ? cls1 = 'fc-deepblue-600' : ((parseFloat(val1) > 0) ? cls1 = 'fc-red-600' : 'steady');
		   	 cls2 = (parseFloat(val2) < 0) ? cls2 = 'fc-deepblue-600' : ((parseFloat(val2) > 0) ? cls2 = 'fc-red-600' : 'steady');
		   	 
		   	 let val = '0.00';
		   	 const rt1 = (parseFloat(val1) == 0) ? val : ((parseFloat(val1) > 0) ? '+' + parseFloat(data.val1).toFixed(2) : parseFloat(data.val1).toFixed(2));
		   	 const rt2 = (parseFloat(val2) == 0) ? val : ((parseFloat(val2) > 0) ? '+' + parseFloat(data.val2).toFixed(2) : parseFloat(data.val2).toFixed(2));
		   	 
		   	 html += '					<th scope="col"><div class="stock ' + cls1 + '">' + rt1 + '%</div></th>';
		   	 html += '					<th scope="col"><div class="stock ' + cls2 + '">' + rt2 + '%</div></th>';
		   	 if(params.length === 3) {
		   		 let cls3 = '';
		   		const val3 = (data.val3 === undefined || data.val3 === null) ? '0' : parseFloat(data.val3).toFixed(2);
		   		const rt3 = (parseFloat(val3) == 0) ? val : ((parseFloat(val3) > 0) ? '+' + parseFloat(data.val3).toFixed(2) : parseFloat(data.val3).toFixed(2));
		   		cls3 = (parseFloat(val3) < 0) ? cls3 = 'fc-deepblue-600' : ((parseFloat(val3) > 0) ? cls3 = 'fc-red-600' : 'steady');
		   		html += '					<th scope="col"><div class="stock ' + cls3 + '">' + rt3 + '%</div></th>';
		   	 }
		   	 html += '				</tr>';
	   	 })
	   	 html += '			</tbody>';
	   	 html += '	</table>';
	   	 html += '</div>';
	   	 $$('#tab1Container').html(html);
    }
    
    /*
	 * 기준가 표 그리기
	 * */
    async loadTab2Data() {
    	const params = this.paramData.value;
    	const items = this.allData.value;
    	items.sort((a , b) => b.basDt - a.basDt);
    	
    	let html = '';
    	html += '<div class="table-col">';
    	html += '	<table>';
    	html += '		<caption>기간별 기준가</caption>';
    	html += '			<colgroup>';
    	if(params.length === 2) {
    		html += '				<col style="width:33%">';
    		html += '				<col style="width:34%">';
    		html += '				<col style="">';
    	} else if(params.length === 3) {
    		html += '				<col style="width:25%">';
    		html += '				<col style="width:25%">';
    		html += '				<col style="width:25%">';
    		html += '				<col style="">';
    	}
    	html += '			</colgroup>';
    	html += '			<thead>';
    	html += '				<tr>';
    	if(params.length === 2) {
    		html += '					<th scope="col">기준일</th>';
    		html += '					<th scope="col">' + params[0].name + '</th>';
    		html += '					<th scope="col">' + params[1].name + '</th>'; 
    	} else if(params.length === 3) {
    		html += '					<th scope="col">기준일</th>';
    		html += '					<th scope="col">' + params[0].name + '</th>';
    		html += '					<th scope="col">' + params[1].name + '</th>'; 
    		html += '					<th scope="col">' + params[2].name + '</th>';
    	}
    	html += '				</tr>';
    	html += '			</thead>';
    	html += '			<tbody>';
    	items.forEach((data, row) => {
    		html += '				<tr>';
    		html += '					<td>' + dayjs(data.basDt).format('YYYY-MM-DD') + '</th>'; 
    		const basPr1 = (data.basPr1 === undefined || data.basPr1 === null) ? '0' : CmmUtils.comma(parseFloat(data.basPr1).toFixed(2));
		   	const basPr2 = (data.basPr2 === undefined || data.basPr2 === null) ? '0' : CmmUtils.comma(parseFloat(data.basPr2).toFixed(2));
    		html += '					<th scope="col">' + basPr1 + '</th>';
    		html += '					<th scope="col">' + basPr2 + '</th>';
    		if(params.length === 3) {
		   		const basPr3 = (data.basPr3 === undefined || data.basPr3 === null) ? '0' : CmmUtils.comma(parseFloat(data.basPr3).toFixed(2));
		   		 html += '					<th scope="col">' + basPr3 + '</th>';
		   	 }
    		html += '				</tr>';
    	})
    	html += '			</tbody>';
    	html += '	</table>';
    	html += '</div>';
	   	 $$('#tab2Container').html(html);
    }
    
    destroy () {
        super.destroy();
    }
}
