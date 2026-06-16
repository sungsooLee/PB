
import { BaseModule } from '../cmm/BaseModule.js';

// TODO 클래스 description 써주세요
/**
 * description : 금융+ > 실시간 환율 > 목록
 *               금융+ > 실시간 환율 > 실시간 환율 조회 > [T] 환율 고시
 *               금융+ > 환율조회 > [P]환율정보 조회 > [T]본지점매매율
 * 화면 ID     : PBWFI050000, PBWFI059901, PBWFI059902
 * 프로그램 ID : FNCPLS50M, PBWFI059901, FNCPLS52P
 */
export default class Home extends BaseModule {

	constructor(elem) {
		super(elem);

		//TODO 전역 변수 사용
		[this.num, this.setNum] = this.useState('num', '');				// 변수 용도 써주세요
		[this.dayFlag, this.setDayFlag] = this.useState('dayFlag', 'R');  // 변수 용도 써주세요
	}
	
	init () {
		super.init(this);
		log.debug('home!!!!');

		this.initRegist();
	}

	// TODO 함수별 제공하는 기능에 대해 주석 달아 주세요
	async initRegist() {

		//TODO 날짜 계산은 dayjs 사용
		console.log('오늘 요일은? : ' , dayjs(new Date).locale('en').format('ddd'));

		//토.일이 아닌경우 바로 이벤트 호출 (TODO 토,일인 경우는? )
		if ( this.getDay() !== 'SUN' || this.getDay() !== 'SAT' ) {
			$$('#cycd').hide();
			await this.apiSend();
			
			//TODO 오늘 날짜는 daysjs 사용해주세요
			//$$('#date1').value(this.getToday());
			const now = dayjs();
			$$('#date1').value(now.format('YYYY-MM-DD'));
		}
		
		//TODO 사용하지 않는 함수는 삭제 해주세요
		//100만원 추가
		const plus100Click = async () => { 
			log.debug('plus100Click');
			let totalVal =  CmmUtils.removeComma($$('#keepMoney').elements[0].value);
			totalVal = totalVal*1 + $$('#plus100').elements[0].value*1;
			$$('#keepMoney').elements[0].value = this.moneyReplace(totalVal);
		}
		
		//날자 클릭시 바로 이벤트 호출
		let oldValue = $$('#date1').value();
		const date1Focusout = async () => { 
			let newValue = $$('#date1').value();

			// TODO === , !==  엄격한 비교 연산자 사용해 주세요
			if( oldValue !== newValue && newValue !== '') {
				oldValue = newValue;
				this.dayFlag('R');
				this.apiSend();
			}
		};
		
		const layerOpenClick = async ( event ) => {
			const targetId = event.target.id;
			console.log('targetId : ' , targetId );

			if($$('#date1').value() === '' ) {
				const result = await CmmUtils.alert('알림', '날자를 선택하여 주십시오',{
		            btnLabel : '확인'
		        });
				return false;
			}

			const elemAry = $$('#area');

			console.log('elemAry : ' , elemAry);

			//고시환율 상세 초기화
			for(let i=1; i<12; i++){
				$$('#area'+i).text('-');
				//$$('#area'+i).elements[0].innerText = '-';
			}
			//본지점매매율 상세 초기화
			for(let i=1; i<6; i++){
				$$('#area2'+i).text('-');
				//$$('#area2'+i).elements[0].innerText = '-';
			}

			//고시환율 상세 호출
			this.apiSend02(targetId); //

		};


		$$(document).findByName('layerOpen','click', layerOpenClick);

		// TODO 반복되는 코드는 줄여주세요
		// const AId = $$('#0').elements[0];
		// const BId = $$('#1').elements[0];
		// const CId = $$('#12').elements[0];
		// const DId = $$('#2').elements[0];
		// const EId = $$('#3').elements[0];
		// const FId = $$('#4').elements[0];
		// const GId = $$('#5').elements[0];
		// const HId = $$('#6').elements[0];
		// const IId = $$('#7').elements[0];
		// const JId = $$('#8').elements[0];
		// const KId = $$('#9').elements[0];
		// const LId = $$('#10').elements[0];
		// const MId = $$('#11').elements[0];
		// const NId = $$('#13').elements[0];
		// const OId = $$('#14').elements[0];
		// const PId = $$('#15').elements[0];
		//
		// //해당환률 클릭시
		// const idClick = { elements : [AId, BId, CId, DId, EId, FId, GId, HId, IId, JId, KId, LId, MId, NId, OId, PId] };
		// const cucdClickCallbacks = [layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick,layerOpenClick]

		const tab01Click = async () => {

			$$('#tab01Detail').show();
			$$('#tab02Detail').hide ();
		};

		const tab02Click = async () => { 	
			//본지점매매율 상세 호출
			//if(_dayFlag=='R'){
			this.apiSend03(this.num.value);

			$$('#tab01Detail').show();
			$$('#tab02Detail').hide ();

			this.setDayFlag('');
		};

		const closeClick = async () => {
			$$('#tab01Detail').hide();
			$$('#tab02Detail').hide ();
		};
		
		/*const date1Keyup = async () => { 	
			this.dateFormatter($$('#date1').value);
		}
		*/
		this.registerCallback('focusout', $$('#date1'), date1Focusout);
		//this.registerCallback('click', idClick, cucdClickCallbacks);
		this.registerCallback('click', $$('#tab01'), tab01Click);
		this.registerCallback('click', $$('#tab02'), tab02Click);
		this.registerCallback('click', $$('#close'), closeClick);
		//this.registerCallback('keyup', $$('#date1'), date1Keyup);
		
	}


	// TODO 함수별 제공하는 기능에 대해 주석 달아 주세요
	async apiSend () {
		
    	const url = '/api/loc09/ea120';
    	let params = {
    			inqDscd : '81',
				inqTgtDt: $$('#date1').elements[0].value.replaceAll('-', ''),
    		};
    	const res = await ApiUtils.sendPost(url, params);

		console.log('res : ' , res);
		const currencyAry = ['USD', 'JPY', 'GBP', 'CAD', 'CHF', 'HKD', 'CNY', 'THB', 'SEK', 'AUD', 'DKK', 'NOK', 'EUR', 'SGD', 'NZD', 'PHP'];

		currencyAry.forEach((item, index) => {
			const elem = document.querySelector(`[data-bind="${item}"]`);
			$(elem).text(this.moneyReplace(this.getFloatFixed(res.grid[index].sbBasRt,2)));
		})

		// TODO 반복되는 코드는 줄여주세요
    	// $$('#USDrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[0].sbBasRt,2));	//기준환율[미국]
    	// $$('#JPYrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[1].sbBasRt, 2));	//기준환율[일본]
    	// $$('#EURrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[12].sbBasRt, 2));	//기준환율[유럽]
    	// $$('#GBPrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[2].sbBasRt, 2));	//기준환율[영국]
    	// $$('#CADrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[3].sbBasRt, 2));	//기준환율[캐나다]
    	// $$('#CHFrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[4].sbBasRt, 2));	//기준환율[스위스]
    	// $$('#HKDrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[5].sbBasRt, 2));	//기준환율[홍콩]
    	// $$('#CNYrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[6].sbBasRt, 2));	//기준환율[중국]
    	// $$('#THBrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[7].sbBasRt, 2));	//기준환율[태국]
    	// $$('#SEKrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[8].sbBasRt, 2));	//기준환율[스웨덴]
    	// $$('#AUDrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[9].sbBasRt, 2));	//기준환율[호주]
    	// $$('#DKKrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[10].sbBasRt, 2));	//기준환율[덴마크]
    	// $$('#NOKrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[11].sbBasRt, 2));	//기준환율[노르웨이]
    	// $$('#SGDrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[13].sbBasRt, 2));	//기준환율[싱가폴]
    	// $$('#NZDrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[14].sbBasRt, 2));	//기준환율[뉴질랜드]
    	// $$('#PHPrate').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[15].sbBasRt, 2));	//기준환율[필리핀]

		$$('#cycd').show();
		
		// TODO 공통으로 제공중인 함수 사용해 주세요
    	//$$('#cycd').elements[0].style.display = 'block';
    	//$$('#cmm-form').find('.unit').show();
	}

	// TODO 함수별 제공하는 기능에 대해 주석 달아 주세요
	async apiSend02 (number) {

		console.log('number : ' , number );

		// TODO 전역 변수 사용법 참고 해주세요 ( SampleDataBinding )
		this.setDayFlag('R');
		this.setNum(number);

		const url = '/api/loc09/ea120';

		const params = {
    			inqDscd : '81',
				inqTgtDt: $$('#date1').elements[0].value.replaceAll('-', ''),
    		};

    	const res = await ApiUtils.sendPost(url, params);

		console.log('res : ', res);
		console.log('number : ', number);

    	$$('#area1').elements[0].innerText = res.grid[number].cucd;	//통화
		$$('#area2').elements[0].innerText = res.grid[number].pblsSq;	//고시회차
		$$('#area3').elements[0].innerText = this.dateFormatter(res.grid[number].xrtntcDt);	//고시기준일
		$$('#area4').elements[0].innerText = this.timeFormatter(res.grid[number].pblsTm);	//고시시각
		$$('#area5').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].sbBasRt, 2))+' 원';	//매매기준율
		$$('#area6').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].tetSellRt, 2))+' 원';	//전신환매도율
		$$('#area7').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].tetBuyRt, 2))+' 원';	//전신환매입율
		$$('#area8').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].cshSellRt, 2))+' 원';	//현찰매도율
		$$('#area9').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].cshBuyRt, 2))+' 원';	//현찰매입율
		$$('#area10').elements[0].innerText = this.getFloatFixed(res.grid[number].faxcRt, 4)+' 배';	//대미환산율
		$$('#area11').elements[0].innerText = this.getFloatFixed(res.grid[number].pusdXcRt, 4)+' 배';	//미불당환산율

		$$('#tab01Detail').show();
		$$('#tab02Detail').hide();
		
		// TODO 공통 기능 사용해 주세요
		// $$('#tab01Detail').elements[0].style.display = 'block';
		// $$('#tab02Detail').elements[0].style.display = 'none';
	}
	
	/**
	 * API전송 본지점매매율
	 * @returns
	 */
	async apiSend03 (number) {
		const url = '/api/loc09/ea120';
    	let params = {
    			inqDscd : '82',
				inqTgtDt: $$('#date1').value().replaceAll('-', ''),
    		};
    	const res = await ApiUtils.sendPost(url, params);

		console.log('res : ' , res);
		console.log('number : ' , number);

		$$('#area21').text(res.grid[number].cucd);
		$$('#area22').text(res.grid[number].pblsSq);
		$$('#area23').text(this.dateFormatter(res.grid[number].xrtntcDt));
		$$('#area24').text(this.moneyReplace(this.getFloatFixed(res.grid[number].tetBuyRt, 2))+' 원');
		$$('#area25').text(this.moneyReplace(this.getFloatFixed(res.grid[number].tetSellRt, 2))+' 원');

		// TODO 공통기능 사용해 주세요
    	// $$('#area21').elements[0].innerText = res.grid[number].cucd;	//통화
    	// $$('#area22').elements[0].innerText = res.grid[number].pblsSq;	//고시회차
    	// $$('#area23').elements[0].innerText = this.dateFormatter(res.grid[number].xrtntcDt);	//고시기준일
    	// $$('#area24').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].tetBuyRt, 2))+' 원';//본지점매도율
    	// $$('#area25').elements[0].innerText = this.moneyReplace(this.getFloatFixed(res.grid[number].tetSellRt, 2))+' 원';	//본지점매입율
	}
	
	//시간
	//ex) HHmmss -> hh:mm:ss
	timeFormatter (str){
		return this.undefinedValue(str) === '' ? '-' : str.replace(/(\d{2})(\d{2})(\d{2})/,'$1:$2:$3');
	}
	
	//날짜
	//ex) yyyyMMdd -> yyyy-mm-dd
	dateFormatter (str){
		if(typeof str == 'undefined') {
			return '-';
		} else {
			str = typeof str == 'number' ? str + '' : str;
			if(str.length === 6){
				return this.undefinedValue(str) === '' ? '-' : str.replace(/(\d{4})(\d{2})/,'$1-$2');
			} else if(str.length === 8){
				return this.undefinedValue(str) === '' ? '-' : str.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3');
			} 
		}
	};
	
	undefinedValue (txt) {
		return typeof txt === 'undefined' ? '' : txt;
	};
	
	// 소수점으로 변환 input(값,소수점자릿수)
	getFloatFixed (value, fixed){
		return parseFloat(Math.round(value*100)/100).toFixed(fixed);
	};
	
	//금액포맷
	moneyReplace (money){
		money = String(money);
		let bExists = money.indexOf('.', 0);
		let moneyArr = money.split('.');
		if(bExists > -1){
			money = moneyArr[0].replace(/\B(?=(\d{3})+(?!\d))/g,',') + '.' + moneyArr[1];
		}else{
			money = money.replace(/\B(?=(\d{3})+(?!\d))/g,',');
		}
		return money;
	};
	
	//오늘 날짜ㅣ
	getToday (dateVal){
		if(typeof date_text == 'undefined') {
			dateVal = new Date();
		}
		let year = dateVal.getFullYear();
		let month = ('0' + (dateVal.getMonth() + 1)).slice(-2);
		let day = ('0' + dateVal.getDate()).slice(-2);
		let today = year + '-' + month + '-' + day;
		return today;
	};
	
	// 요일명 구하기 yyyy-mm-dd
	// Return : 'SUN','MON','TUR','WED','THU','FRI','SAT'
	getDay (dateVal){
		let todayNum = '';
		let week = ['SUN','MON','TUR','WED','THU','FRI','SAT'];

		//let week = new Array('SUN','MON','TUR','WED','THU','FRI','SAT');
		if(typeof dateVal == 'undefined') {
			dateVal = new Date();
			todayNum= dateVal.getDay();
		}else{
			todayNum = new Date(dateVal).getDay();
		}
		return week[todayNum];
	};
	
	destroy() {
		super.destroy(this);
	}
}

