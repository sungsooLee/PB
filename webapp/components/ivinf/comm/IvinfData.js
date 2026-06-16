/**
 * 원천 지수명을 PB WON에서 사용하는 명으로 변경한다.
 * @param  {*} winiName [String] 원천 명
 * @return {*} [Object] PB WON 데이터
 */
const IvinfData = {
		
		changePbData : ( winiName ) => {
			log.debug('changeData : ' , winiName);
			
			let resultStr = '';
			switch ( winiName ) {
				// 주가지수
				case "KOSPI" :
					resultStr = '코스피';
					break;

				case "KOSDAQ" :
					resultStr = '코스닥';
					break;
					
				case "KOSPI 200" :
					resultStr = '코스피 200';
					break;
					
				case "S&P500" :
					resultStr = 'S&P 500';
					break;
					
				case "나스닥" :
					resultStr = '나스닥';
					break;
					
				case "나스닥 100" :
					resultStr = '나스닥 100';
					break;
					
				case "다우존스" :
					resultStr = '다우존스';
					break;
					
				case "EURO STOXX 50" :
					resultStr = '유로스톡스 50';
					break;
					
				case "상해종합" :
					resultStr = '상해종합';
					break;
					
				case "홍콩H" :
					resultStr = '홍콩H';
					break;
					
				case "NIKKEI225" :
					resultStr = '니케이 225';
					break;
					
				case "필라델피아 반도체" :
					resultStr = '필라델피아 반도체';
					break;
					
				case "MSCI World" :
					resultStr = 'MSCI 선진국';
					break;
					
				case "MSCI EM (EMERGING MARKETS)" :
					resultStr = 'MSCI 신흥국';
					break;
					
				case "MSCI ACWI" :
					resultStr = 'MSCI ACWI';
					break;
					
				case "VIX" :
					resultStr = 'VIX';
					break;
					
				// 채권금리
				case "미국국채 2년" :
					resultStr = '미국 국채 2년물';
					break;
					
				case "미국국채 10년" :
					resultStr = '미국 국채 10년물';
					break;
					
				case "한국국채 3년" :
					resultStr = '한국 국채 3년물';
					break;
					
				case "한국국채 10년" :
					resultStr = '한국 국채 10년물';
					break;
					
				// 환율
				case "달러인덱스" :
					resultStr = '달러인덱스';
					break;

				case "USD" :
					resultStr = 'USD';
					break;
					
				case "EUR" :
					resultStr = 'EUR';
					break;
					
				case "CNY" :
					resultStr = 'CNY';
					break;
					
				case "JPY" :
					resultStr = 'JPY';
					break;
					
				// 원자재
				case "NYMEX WTI" :
					resultStr = 'WTI';
					break;
					
				case "국제 금" :
					resultStr = '금';
					break;
					
				case "LME 구리 3개월" :
					resultStr = '구리';
					break;
					
				case "NYMEX 천연가스" :
					resultStr = '천연가스';
					break;
					
				case "CBOT 옥수수" :
					resultStr = '옥수수';
					break;
					
				// 경제지표
				case "미국 소비자물가지수CPI" :
					resultStr = '미국소비자물가지수 CPI';
					break;
					
				case "미국 ISM제조업지수" :
					resultStr = '미국 제조업지수 ISM';
					break;
					
				case "미국 실업률" :
					resultStr = '미국 실업률';
					break;
					
				case "미국 경제성장률" :
					resultStr = '미국 경제성장률';
					break;
					
				case "미국 PMI 구매관리자지수(제조업)" :
					resultStr = '미국 제조업구매관리자지수 PMI';
					break;
					
				case "한국 경제성장률" :
					resultStr = '한국 경제성장률';
					break;
					
				case "한국 소비자물가지수 CPI" :
					resultStr = ' 한국 소비자물가지수 CPI';
					break;
					
				default :
					resultStr = winiName;
					break;
			}
			
			return 	resultStr;
			
		},
}

export default IvinfData;