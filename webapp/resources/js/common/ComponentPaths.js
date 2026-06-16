
/**
 * 페이지에 사용되는 레이아웃 정보
 */
export const Layouts = {
	BASIC   : { id : 'basic'},
	HEADER  : { id : 'LayoutWithHeader'},
	SINGLE  : { id : 'single'},
	BOTTOM  : { id : 'LayoutWithBottom'},
	SINGLE_WITH_BOTTOM  : { id : 'SingleWithBottom'},
	MAIN    : { id : 'main'},
	AI      : { id : 'ai'},
	FNCNEWS : { id : 'fncNews' },
}

export const LayoutInfo = {
	crmpmng30m : { btn1Label : '초기화', btn2Label : '조회' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary'},
	crmpmng40m : { btn1Label : '초기화', btn2Label : '검색' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary'},
	fncpls10s  : { btn2Label : '조회'},
	fncpls13s  : { btn2Label : '조회'},
	fncpls16s  : { btn2Label : '조회'},
	fncpls20s  : { btn2Label : '조회'},
	nmcrmng10m    : { btn1Label : '등록', btn2Label: '공유' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary', iconClass : 'ico-share'},
	nmcrmng20m    : { btn2Label : '고객 명함 등록', iconClass : 'ico-add'},
	nmcrmng30m    : { btn2Label : '저장'},
	menu21m	: {btn2Label : '이용 해지'},
	lgin50m : {btn2Label : '전체동의'},
	dscmng21m : { btn1Label : '취소', btn2Label : '저장' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary'},
	dscmng24m : { btn1Label : '취소', btn2Label : '저장' , btn1Class : 'btn-outlined', btn2Class : 'btn-primary'},
}

/**
 * 컴포넌트 경로를 정의해 놓는다
 * module : js 클래스명
 * html 파일 경로 : basePath + htmlPath
 * js   파일 경로 : basePath + jsPath
 */
export const ModuleInfo = {
	home      : { module : 'Home',   basePath : '/components/home'  , htmlPath : '/home.html'	  , jsPath : '/home.js', layout: 'main'},
	sample    : { module : 'Sample', basePath : '/components/sample', htmlPath : '/SampleMain.html' , jsPath : '/SampleMain.js' , layout: 'basic', title : '샘플'},
	500       : { module : '500',    basePath : '/components/error' , htmlPath : '/500.html'	  , jsPath : '/500.js' , layout: 'basic'},
	404       : { module : '400', basePath : '/components/error' , htmlPath : '/404.html'	  , jsPath : '/404.js' , layout: 'basic'},
	datePicker : {module : 'datePicker', basePath : '/components/cmm/popup', htmlPath : '/DatePicker.html'	  , jsPath : '/DatePicker.js' , layout: 'basic'},
	datePickerYear : {module : 'datePickerYear', basePath : '/components/cmm/popup', htmlPath : '/DatePickerYear.html'	  , jsPath : '/DatePickerYear.js' , layout: 'basic'},
	pdfViewer :  {basePath : '/components/cmm/popup', htmlPath : '/PdfViewer.html'	  , jsPath : '/PdfViewer.js' , layout: 'basic', title : 'PDF 뷰어'},
	/* 샘플 영역 */
	appUpDown  : { module : 'AppUpDown', basePath : '/components/app' , htmlPath : '/AppUpDown.html' , jsPath : '' , layout: 'basic'},
	appUpload  : { module : 'AppUpload', basePath : '/components/app' , htmlPath : '/upload/AppUpload.html' , jsPath : '/upload/AppUpload.js' , layout: 'basic'},
	appDown   : { module : 'AppDown', basePath : '/components/app' , htmlPath : '/download/AppDown.html' , jsPath : '/download/AppDown.js' , layout: 'basic'},
	fileDown  : { module : 'FileDown', basePath : '/components/sample' , htmlPath : '/fileDown/FileDown.html' , jsPath : '/fileDown/FileDown.js' , layout: 'basic'},
	fileUp    : { module : 'FileUp', basePath : '/components/sample' , htmlPath : '/fileUp/FileUp.html'	 , jsPath : '/fileUp/FileUp.js' , layout: 'basic'},
	createVo    : { module : 'CreateVo', basePath : '/components/sample' , htmlPath : '/vo/CreateVo.html'	 , jsPath : '/vo/CreateVo.js' , layout: 'basic'},
	layout    : { module : 'SampleLayout', basePath : '/components/sample/layout' , htmlPath : '/SampleLayout.html'	 , jsPath : '/SampleLayout.js' , layout: 'basic', title : '레이아웃 샘플'},
	sampleModal 	  : { module : 'SampleModal', basePath : '/components/sample/modal' , htmlPath : '/SampleModal.html'	 , jsPath : '/SampleModal.js', layout: 'basic', title : '샘플 모달'},
	SampleNormalModal : { basePath : '/components/sample/modal' , htmlPath : '/SampleNormalModal.html'	 , jsPath : '/SampleNormalModal.js' , title : '샘플 모달 타이틀'},
	SampleBottomModal : { basePath : '/components/sample/modal' , htmlPath : '/SampleBottomModal.html'	 , jsPath : '/SampleBottomModal.js' , title : ''},
	SampleFullPopup   : { basePath : '/components/sample/modal' , htmlPath : '/SampleFullPopup.html'	 , jsPath : '/SampleFullPopup.js' , title : '샘플 모달 타이틀3'},
	sampleRadio : { module : 'SampleRadio',  basePath : '/components/sample/radio' , htmlPath : '/SampleRadio.html'	 , jsPath : '/SampleRadio.js', layout : 'basic'},
	sampleAlert       : { module : 'SampleAlert',  basePath : '/components/sample/alert' , htmlPath : '/SampleAlert.html'	 , jsPath : '/SampleAlert.js', layout : 'basic'},
	sampleDataBinding : { module : 'SampleDataBinding',  basePath : '/components/sample/databind' , htmlPath : '/SampleDataBinding.html'	 , jsPath : '/SampleDataBinding.js', layout : 'basic'},
	sampleList        : { module : 'SampleList',  basePath : '/components/sample/list' , htmlPath : '/SampleList.html'	 , jsPath : '/SampleList.js', layout : 'basic'},
	sampleSelect       : { module : 'SampleSelect',  basePath : '/components/sample/select' , htmlPath : '/SampleSelect.html'	 , jsPath : '/SampleSelect.js', layout : 'basic'},
	sampleDatePicker   : { module : 'SampleDatePicker',  basePath : '/components/sample/util/datePicker' , htmlPath : '/SampleDatePicker.html'	 , jsPath : '/SampleDatePicker.js', layout : 'basic'},
	utils             : { module : 'CommonUtils',  basePath : '/components/sample/util' , htmlPath : '/CommonUtils.html'	 , jsPath : '', layout : 'basic'},
	days   : { module : 'Days', basePath : '/components/sample/util/days' , htmlPath : '/Days.html'	 , jsPath : '/Days.js'},
	localStorage : { module : 'LocalStorage', basePath : '/components/sample/util/localStorage' , htmlPath : '/LocalStorage.html'	 , jsPath : '/LocalStorage.js'},
	list   : { module : 'List', basePath : '/components/sample/list' , htmlPath : '/List.html'	 , jsPath : '/List.js'},
	listItem   : { module : 'ListItem', basePath : '/components/sample/list' , htmlPath : '/ListItem.html'	 , jsPath : '/ListItem.js'},
	aiSample   : { module : 'AiSample', basePath : '/components/sample/ai' , htmlPath : '/Ai.html'	 , jsPath : '/Ai.js'},
	sampleNative : { module : 'SampleNative', basePath : '/components/sample/native' , htmlPath : '/SampleNative.html'	 , jsPath : '/SampleNative.js'},
	samplePdfViewer : { module : 'SamplePdfViewer', basePath : '/components/sample/pdfView' , htmlPath : '/SamplePdfViewer.html'	 , jsPath : '/SamplePdfViewer.js'},
	/* 샘플 영역 */
	
	/* 전체메뉴 */
	menu10p   : { basePath : '/components/menu' , htmlPath : '/MENU10P.html'	 , jsPath : '/MENU10P.js'},
	menu13s   : { module : 'menu13s', basePath : '/components/menu' , htmlPath : '/MENU13S.html'	 , jsPath : '/MENU13S.js', layout: 'basic', title : '구독설정'},
	menu14s   : { module : 'menu14s', basePath : '/components/menu' , htmlPath : '/MENU14S.html'	 , jsPath : '/MENU14S.js', layout: 'basic', title : '환율알림 설정'},
	menu14m   : { module : 'menu14m', basePath : '/components/menu' , htmlPath : '/MENU14M.html'	 , jsPath : '/MENU14M.js', layout : 'basic', title : '서비스 이용 동의서'},
	menu21m   : { module : 'menu21m', basePath : '/components/menu' , htmlPath : '/MENU21M.html'	 , jsPath : '/MENU21M.js', layout : 'LayoutWithBottom', title : '서비스 해지'},
	
	// 90194835
	/* 로그인 영역 */
	// ####################삭제예정################################# //
	lgin99m     : { module : 'Lgin99m', basePath : '/components/lgin' , htmlPath : '/LGIN99M.html'	 , jsPath : '/LGIN99M.js', layout: 'basic'},													// 생체 로그인 임시
	// ##################################################### //
	lgin20s      : { module : 'Lgin20s', basePath : '/components/lgin' , htmlPath : '/LGIN20S.html'	 , jsPath : '/LGIN20S.js', layout: 'single', title : '로그인'},								// 로그인
	lgin22m     : { module : 'Lgin22m', basePath : '/components/lgin' , htmlPath : '/LGIN22M.html'	 , jsPath : '/LGIN22M.js', layout: 'single', title : '로그아웃'},							// 로그아웃
	lgin40m     : { module : 'Lgin40m', basePath : '/components/lgin' , htmlPath : '/LGIN40M.html'	 , jsPath : '/LGIN40M.js', layout: 'single' , title : '로그인'},							// 비번 로그인
	lgin50m     : { basePath : '/components/lgin' , htmlPath : '/LGIN50M.html'	 , jsPath : '/LGIN50M.js', layout: 'single', title : '서비스 이용 동의'}, 											// 사용자이용동의
	lgin51p      : { basePath : '/components/lgin' , htmlPath : '/LGIN51P.html'	 , jsPath : '/LGIN51P.js', title : '서비스 이용 동의서'},																// 사용자 이용동의 팝업
	lgin60m     : { basePath : '/components/lgin' , htmlPath : '/LGIN60M.html'	 , jsPath : '/LGIN60M.js', layout: 'single'}, 																			// 사용자 이용동의 완료
	
	/* 메인 */
	mn10m     : { basePath : '/components/mn' ,   htmlPath : '/MN10M.html'	 , 	   jsPath : '/MN10M.js', 	 title : '메인', 			layout: 'main'},													// 메인 - 홈
	mn11p      : { basePath : '/components/mn' ,   htmlPath : '/MN11P.html'	 , 	   jsPath : '/MN11P.js', 	 title : ' '},																						// 메인 - 공지팝업
	fnd01m     : { basePath : '/components/fnd' , 	htmlPath : '/FND01M.html'	,  jsPath : '/FND01M.js', 	 title : '펀드', 			layout: 'main'}, 													// 펀드 - 서브메인
	etf01m     : { basePath : '/components/etf' , 	htmlPath : '/ETF01M.html'	,  jsPath : '/ETF01M.js', 	 title : 'ETF', 			layout: 'main'}, 													// ETF - 서브메인
	ivinf10s     : { basePath : '/components/ivinf' , htmlPath : '/IVINF10S.html'	,  jsPath : '/IVINF10S.js', title : '투자정보', 		layout: 'main'}, 													// 투자정보 - 서브메인
	fncpls10m	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS10M.html', jsPath : '/FNCPLS10M.js', title : '금융+', layout : 'main'},
	ntbx10m : { basePath : '/components/ntbx', htmlPath : '/NTBX10M.html', jsPath : '/NTBX10M.js', title : '알림', layout : 'main' },
	
	/* 명함관리 영역 */
	nmcrmng10m   : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG10M.html'	 , jsPath : '/NMCRMNG10M.js', layout: 'LayoutWithBottom', title: '내 명함 공유'}, 		// 내 명함 공유 - 목록
	nmcrmng11p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG11P.html'	 , jsPath : '/NMCRMNG11P.js', layout: 'LayoutWithBottom', title : '명함 순서 설정'}, 	// 내 명함 공유 - 명함순서설정
	nmcrmng12p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG12P.html'	 , jsPath : '/NMCRMNG12P.js', title : '내 명함 등록'},												// 내 명함 공유 - 등록
	nmcrmng13p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG13P.html'	 , jsPath : '/NMCRMNG13P.js', title : '내 명함 수정'}, 												// 내 명함 공유 - 수정
	nmcrmng20m   : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG20M.html'	 , jsPath : '/NMCRMNG20M.js', layout: 'LayoutWithBottom', title : '고객명함 관리'}, 		// 고객명함 관리 - 목록
	nmcrmng21m   : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG21M.html'	 , jsPath : '/NMCRMNG21M.js', title : '고객명함'}, 													// 고객명함 관리 - 상세
	nmcrmng22p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG22P.html'	 , jsPath : '/NMCRMNG22P.js', title : '이미지'}, 														// 고객명함 관리 - 상세 - 이미지
	nmcrmng23p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG23P.html'	 , jsPath : '/NMCRMNG23P.js', title : '메모'}, 															// 고객명함 관리 - 메모 등록
	nmcrmng24p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG24P.html'	 , jsPath : '/NMCRMNG24P.js', title : '메모'}, 															// 고객명함 관리 - 메모 수정
	nmcrmng25p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG25P.html'	 , jsPath : '/NMCRMNG25P.js', title : '메모'}, 															// 고객명함 관리 - 메모 전체보기
	nmcrmng26p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG26P.html'	 , jsPath : '/NMCRMNG26P.js', title : '고객명함 변경 내역'}, 										// 고객명함 관리 - 변경 내역
	nmcrmng27p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG27P.html'	 , jsPath : '/NMCRMNG27P.js', title : '고객명함 조회 조건'}, 										// 고객명함 관리 - 목록 조회조건 - 추가
	nmcrmng30m   : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG30M.html'	 , jsPath : '/NMCRMNG30M.js', layout: 'LayoutWithBottom', title : '고객명함 등록'}, 		// 고객명함 명함 - 등록
	nmcrmng32p    : { basePath : '/components/nmcr' , htmlPath : '/NMCRMNG32P.html'	 , jsPath : '/NMCRMNG32P.js', title : '고객명함 수정'}, 												// 고객명함 명함 - 수정
	
	/*대출 계산기*/
	fncpls20s   : { module : 'Fncpls20s', basePath : '/components/fncpls' , htmlPath : '/FNCPLS20S.html'	 , jsPath : '/FNCPLS20S.js', layout: 'LayoutWithBottom', title: '대출 계산기'},
	fncpls21p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS21P.html', jsPath : '/FNCPLS21P.js', title : '대출계산 결과'},
	
	/*실시간환율조회*/
	fncpls50m   : { module : 'Fncpls50m', basePath : '/components/fncpls' , htmlPath : '/FNCPLS50M.html'	 , jsPath : '/FNCPLS50M.js', layout: 'basic', title: '환율 조회'},
	fncpls52p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS52P.html', jsPath : '/FNCPLS52P.js', title : '환율정보 조회'},
	
	/*환율 계산기*/
	fncpls40m	: { module : 'Fncpls40m', basePath : '/components/fncpls', htmlPath : '/FNCPLS40M.html', jsPath : '/FNCPLS40M.js', layout : 'basic', title : '환율 계산기'},
	fncpls41p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS41P.html', jsPath : '/FNCPLS41P.js', title : '환율우대율 선택'},
	fncpls42p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS42P.html', jsPath : '/FNCPLS42P.js', title : '외화 선택'},
	fncpls40mfee	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS40MFEE.html', jsPath : '', title : '당발송금 수수료 안내'},
	
	/*환율 알림*/
	fncpls60m	: { module : 'Fncpls60m', basePath : '/components/fncpls', htmlPath : '/FNCPLS60M.html', jsPath : '/FNCPLS60M.js', layout : 'basic', title : '시간환율 알림설정'},
	fncpls61m	: { module : 'Fncpls61m', basePath : '/components/fncpls', htmlPath : '/FNCPLS61M.html', jsPath : '/FNCPLS61M.js', layout : 'basic', title : '목표환율 알림설정'},
	fncpls60p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS60P.html', jsPath : '', layout : 'basic', title : ''},
	fncpls61p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS61P.html', jsPath : '/FNCPLS61P.js', title : '대상 통화 선택'},
	fncpls62p	: { basePath : '/components/fncpls', htmlPath : '/FNCPLS62P.html', jsPath : '/FNCPLS62P.js', title : '환율 종류 선택'},
	
	/* 예적금계산기 */
	fncpls10s   : { module : 'Fncpls10s', basePath : '/components/fncpls' , htmlPath : '/FNCPLS10S.html'	 , jsPath : '/FNCPLS10S.js', layout: 'LayoutWithBottom', title : '예적금계산기'},  //예금계산
	fncpls13s   : { module : 'Fncpls13s', basePath : '/components/fncpls' , htmlPath : '/FNCPLS13S.html'	 , jsPath : '/FNCPLS13S.js', layout: 'LayoutWithBottom', title : '예적금계산기'},  //적금계산
	fncpls16s   : { module : 'Fncpls16s', basePath : '/components/fncpls' , htmlPath : '/FNCPLS16S.html'	 , jsPath : '/FNCPLS16S.js', layout: 'LayoutWithBottom', title : '예적금계산기'},  //목돈만들기
	fncpls11p   : { basePath : '/components/fncpls' , htmlPath : '/FNCPLS11P.html'	 , jsPath : '/FNCPLS11P.js', title : '예금계산'}, 	//예금계산 > 결과
	fncpls14p   : { basePath : '/components/fncpls' , htmlPath : '/FNCPLS14P.html'	 , jsPath : '/FNCPLS14P.js', title : '적금계산'}, 	//적금계산 > 매월모으기 > 결과
	fncpls17p   : { basePath : '/components/fncpls' , htmlPath : '/FNCPLS17P.html'	 , jsPath : '/FNCPLS17P.js', title : '적금계산'}, 	//적금계산 > 목표금액모으기 > 결과
	                                                                                                                                                        
	/* 고객기여도 조회 */
	crmpmng30m   : { module : 'Crmpmng30m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG30M.html'	 , jsPath : '/CRMPMNG30M.js', layout: 'LayoutWithBottom', title : '고객기여도 조회'},   //고객기여도 검색
	crmpmng31m   : { module : 'Crmpmng31m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG31M.html'	 , jsPath : '/CRMPMNG31M.js', layout: 'basic', title : '고객기여도 조회'}, 				//고객기여도 검색결과
	crmpmng30p   : { basePath : '/components/crmp' , htmlPath : '/CRMPMNG30P.html'	 , jsPath : '/CRMPMNG30P.js', title : '통합고객번호 검색'}, 														//고객기여도 > 통합고객번호 검색팝업
	
	/* 기업정보조회 */
	crmpmng40m	 : { module : 'Crmpmng40m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG40M.html'	 , jsPath : '/CRMPMNG40M.js', layout: 'LayoutWithBottom' , title : '기업정보 조회'}, //기업정보조회 > 검색    
	crmpmng40p   : { basePath : '/components/crmp' , htmlPath : '/CRMPMNG40P.html'	 , jsPath : '/CRMPMNG40P.js', title : '지역 선택'}, 														 //기업정보조회 > 지역선택 팝업
	crmpmng41p   : { basePath : '/components/crmp' , htmlPath : '/CRMPMNG41P.html'	 , jsPath : '/CRMPMNG41P.js', title : '표준산업별 선택'}, 													 //기업정보조회 > 표준산업별 팝업
	crmpmng41m   : { module : 'Crmpmng41m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG41M.html'	 , jsPath : '/CRMPMNG41M.js', layout: 'basic', title : '기업정보 조회'}, //기업정보조회 > 검색결과 
	crmpmng42m   : { module : 'Crmpmng42m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG42M.html'	 , jsPath : '/CRMPMNG42M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 기업일반
	crmpmng42p   : { basePath : '/components/crmp' , htmlPath : '/CRMPMNG42P.html'	 , jsPath : '/CRMPMNG42P.js', title : '대표자 정보'}, 											 //기업정보조회 > 표준산업별 팝업
	crmpmng43m   : { module : 'Crmpmng43m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG43M.html'	 , jsPath : '/CRMPMNG43M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 기업신용   
	crmpmng44m   : { module : 'Crmpmng44m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG44M.html'	 , jsPath : '/CRMPMNG44M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 재무정보   
	crmpmng45m   : { module : 'Crmpmng45m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG45M.html'	 , jsPath : '/CRMPMNG45M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 종합의견   
	crmpmng46m   : { module : 'Crmpmng46m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG46M.html'	 , jsPath : '/CRMPMNG46M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 연혁     
	crmpmng47m   : { module : 'Crmpmng47m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG47M.html'	 , jsPath : '/CRMPMNG47M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 경영진현황  
	crmpmng48m   : { module : 'Crmpmng48m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG48M.html'	 , jsPath : '/CRMPMNG48M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 거래처현황  
	crmpmng49m   : { module : 'Crmpmng49m', basePath : '/components/crmp' , htmlPath : '/CRMPMNG49M.html'	 , jsPath : '/CRMPMNG49M.js', layout: 'basic', title : '기업정보 상세'}, //기업정보조회 > 주요주주현황      
	
	/* 포탈게시글 연동	 */
	ctnsmng10m   : { module : 'ctnsmng10m', basePath : '/components/ctnsmng' , htmlPath : '/CTNSMNG10M.html'	 , jsPath : '/CTNSMNG10M.js', layout: 'basic', title : '포탈게시글'}, //포탈게시글 연동 > 게시글 목록
	
	/* 펀드 */
	fnd10m	 : { module : 'fnd10m', basePath : '/components/fnd' , htmlPath : '/FND10M.html'	 , jsPath : '/FND10M.js', layout: 'basic', title : '펀드 찾기'}, 					//펀드 > 펀드찾기
	fnd12s	 : { module : 'fnd12s', basePath : '/components/fnd' , htmlPath : '/FND12S.html'	 , jsPath : '/FND12S.js', layout: 'basic', title : '펀드 찾기 '}, 					//펀드 > 펀드찾기 > 결과 > 목록
	fndInqCnd: { basePath : '/components/fnd' , htmlPath : '/FND_INQ_CND.html'	 , jsPath : '/FND_INQ_CND.js', title : '  '},													//펀드 > 펀드찾기 > 결과 > 조회조건 팝업
	fnd21m	 : { module : 'fnd21m', basePath : '/components/fnd' , htmlPath : '/FND21M.html'	 , jsPath : '/FND21M.js', layout: 'basic', title : '펀드 판매 BEST'}, 					//펀드 > 판매Best
	fnd22m	 : { module : 'fnd22m', basePath : '/components/fnd' , htmlPath : '/FND22M.html'	 , jsPath : '/FND22M.js', layout: 'basic', title : '펀드 수익률 BEST'}, 				//펀드 > 수익률 Best
	fnd23m	 : { module : 'fnd23m', basePath : '/components/fnd' , htmlPath : '/FND23M.html'	 , jsPath : '/FND23M.js', layout: 'basic', title : '펀드 이달의 추천펀드'}, 				//펀드 > 이달의 추천 펀드
	fndTem   : { basePath : '/components/fnd' , htmlPath : '/FND_TEM.html'	 , jsPath : '/FND_TEM.js', title : '  '},
	fnd30s	 : { module : 'fnd30s', basePath : '/components/fnd' , htmlPath : '/FND30S.html'	 , jsPath : '/FND30S.js', layout: 'basic' , title : ''}, 						//펀드 > 펀드상세
	fnd31p   : { basePath : '/components/fnd' , htmlPath : '/FND31P.html'	 , jsPath : '/FND31P.js', title : '기간별 기준가/수익률'}, 												//펀드 > 펀드상세 > 기간별 기준가/수익률 
	fnd32p   : { basePath : '/components/fnd' , htmlPath : '/FND32P.html'	 , jsPath : '/FND32P.js', title : '매매 기준일'}, 														//펀드 > 펀드상세 > 매매 기준일
	fnd33p   : { basePath : '/components/fnd' , htmlPath : '/FND33P.html'	 , jsPath : '/FND33P.js', title : '투자설명서 및 약관'}, 													//펀드 > 펀드상세 > 투자설명서 및 약관
	fnd34p   : { basePath : '/components/fnd' , htmlPath : '/FND34P.html'	 , jsPath : '/FND34P.js', title : '투자에 따른 위험'}, 													//펀드 > 펀드상세 > 투자에 따른 위험
	fnd35p   : { basePath : '/components/fnd' , htmlPath : '/FND35P.html'	 , jsPath : '/FND35P.js', title : '클래스 비교'}, 														//펀드 > 펀드상세 > 클래스 비교
	fnd40s	 : { module : 'fnd40s', basePath : '/components/fnd' , htmlPath : '/FND40S.html'	 , jsPath : '/FND40S.js', layout: 'basic' , title : ''}, 						//펀드 > 펀드상세 > 커뮤니티
	fnd40p   : { basePath : '/components/fnd' , htmlPath : '/FND40P.html'	 , jsPath : '/FND40P.js', title : ' '}, 															//펀드 > 펀드상세 > 커뮤니티 > 수정/삭제 선택팝업
	fnd41p   : { basePath : '/components/fnd' , htmlPath : '/FND41P.html'	 , jsPath : '/FND41P.js', title : '내 정보 관리'}, 														//펀드 > 펀드상세 > 커뮤니티 > 내정보관리
	fnd42p   : { basePath : '/components/fnd' , htmlPath : '/FND42P.html'	 , jsPath : '/FND42P.js', title : '글쓰기'}, 															//펀드 > 펀드상세 > 커뮤니티 > 글쓰기 등록/수정
	fnd50m	 : { module : 'fnd50m', basePath : '/components/fnd' , htmlPath : '/FND50M.html'	 , jsPath : '/FND50M.js', layout: 'basic', title : '펀드 비교'}, 					//펀드 > 편드 비교
	fnd51p   : { basePath : '/components/fnd' , htmlPath : '/FND51P.html'	 , jsPath : '/FND51P.js', title : '수익률 추이'}, 														//펀드 > 펀드 비교 > 수익률 추이
	fnd52p   : { basePath : '/components/fnd' , htmlPath : '/FND52P.html'	 , jsPath : '/FND52P.js', title : '자산구성 비교'}, 													//펀드 > 펀드 비교 > 자산구성 비교
	fnd60m	 : { module : 'fnd60m', basePath : '/components/fnd' , htmlPath : '/FND60M.html'	 , jsPath : '/FND60M.js', layout: 'basic', title : '나의 관심 상품'}, 				//펀드 > 관심펀드
	fnd61p   : { basePath : '/components/fnd' , htmlPath : '/FND61P.html'	 , jsPath : '/FND61P.js', title : ' '}, 															//펀드 > 관심펀드 > 순서설정
	
	/* 펀드 */
	etf10m	 : { module : 'etf10m', basePath : '/components/etf' , htmlPath : '/ETF10M.html'	 , jsPath : '/ETF10M.js', layout: 'basic', title : 'ETF 찾기'}, 					//ETF > ETF찾기
	etf12s	 : { module : 'etf12s', basePath : '/components/etf' , htmlPath : '/ETF12S.html'	 , jsPath : '/ETF12S.js', layout: 'basic', title : 'ETF 찾기 '}, 					//ETF > ETF찾기 > 결과 > 목록
	etfInqCnd: { basePath : '/components/etf' , htmlPath : '/ETF_INQ_CND.html'	 , jsPath : '/ETF_INQ_CND.js', title : '  '},													//ETF > ETF찾기 > 결과 > 조회조건 팝업
	etf21m	 : { module : 'etf21m', basePath : '/components/etf' , htmlPath : '/ETF21M.html'	 , jsPath : '/ETF21M.js', layout: 'basic', title : 'ETF 판매 BEST'}, 					//ETF > 판매Best
	etf22m	 : { module : 'etf22m', basePath : '/components/etf' , htmlPath : '/ETF22M.html'	 , jsPath : '/ETF22M.js', layout: 'basic', title : 'ETF 수익률 BEST'}, 				//ETF > 수익률 Best
	etf23m	 : { module : 'etf23m', basePath : '/components/etf' , htmlPath : '/ETF23M.html'	 , jsPath : '/ETF23M.js', layout: 'basic', title : 'ETF 이달의 유망종목'}, 				//ETF > 이달의 유망종목
	etfTem   : { basePath : '/components/etf' , htmlPath : '/ETF_TEM.html'	 , jsPath : '/ETF_TEM.js', title : '  '},
	etf30s	 : { module : 'etf30s', basePath : '/components/etf' , htmlPath : '/ETF30S.html'	 , jsPath : '/ETF30S.js', layout: 'basic' , title : ''}, 						//ETF > ETF상세
	etf31p   : { basePath : '/components/etf' , htmlPath : '/ETF31P.html'	 , jsPath : '/ETF31P.js', title : '기간별 기준가/수익률'}, 												//ETF > ETF상세 > 기간별 기준가/수익률 
	etf32p   : { basePath : '/components/etf' , htmlPath : '/ETF32P.html'	 , jsPath : '/ETF32P.js', title : '매매 기준일'}, 														//ETF > ETF상세 > 매매 기준일
	etf33p   : { basePath : '/components/etf' , htmlPath : '/ETF33P.html'	 , jsPath : '/ETF33P.js', title : '투자설명서 및 약관'}, 													//ETF > ETF상세 > 투자설명서 및 약관
	etf34p   : { basePath : '/components/etf' , htmlPath : '/ETF34P.html'	 , jsPath : '/ETF34P.js', title : '투자에 따른 위험'}, 													//ETF > ETF상세 > 투자에 따른 위험
	etf35p   : { basePath : '/components/etf' , htmlPath : '/ETF35P.html'	 , jsPath : '/ETF35P.js', title : '클래스 비교'}, 														//ETF > ETF상세 > 클래스 비교
	etf40s	 : { module : 'etf40s', basePath : '/components/etf' , htmlPath : '/ETF40S.html'	 , jsPath : '/ETF40S.js', layout: 'basic' , title : ''}, 						//ETF > ETF상세 > 커뮤니티
	etf40p   : { basePath : '/components/etf' , htmlPath : '/ETF40P.html'	 , jsPath : '/ETF40P.js', title : ' '}, 															//ETF > ETF상세 > 커뮤니티 > 수정/삭제 선택팝업
	etf41p   : { basePath : '/components/etf' , htmlPath : '/ETF41P.html'	 , jsPath : '/ETF41P.js', title : '내 정보 관리'}, 														//ETF > ETF상세 > 커뮤니티 > 내정보관리
	etf42p   : { basePath : '/components/etf' , htmlPath : '/ETF42P.html'	 , jsPath : '/ETF42P.js', title : '글쓰기'}, 															//ETF > ETF상세 > 커뮤니티 > 글쓰기 등록/수정
	etf50m	 : { module : 'etf50m', basePath : '/components/etf' , htmlPath : '/ETF50M.html'	 , jsPath : '/ETF50M.js', layout: 'basic', title : 'ETF 비교'}, 					//ETF > 편드 비교
	etf51p   : { basePath : '/components/etf' , htmlPath : '/ETF51P.html'	 , jsPath : '/ETF51P.js', title : '수익률 추이'}, 														//ETF > ETF 비교 > 수익률 추이
	etf52p   : { basePath : '/components/etf' , htmlPath : '/ETF52P.html'	 , jsPath : '/ETF52P.js', title : '자산구성 비교'}, 													//ETF > ETF 비교 > 자산구성 비교
	etf60m	 : { module : 'etf60m', basePath : '/components/etf' , htmlPath : '/ETF60M.html'	 , jsPath : '/ETF60M.js', layout: 'basic', title : '나의 관심 상품'}, 				//ETF > 관심ETF
	etf61p   : { basePath : '/components/etf' , htmlPath : '/ETF61P.html'	 , jsPath : '/ETF61P.js', title : ' '}, 															//ETF > 관심ETF > 순서설정
	
	/* 투자정보 */
	ivinf20s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF20S.html'	 , jsPath : '/IVINF20S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 주요지수
	ivinf21s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF21S.html'	 , jsPath : '/IVINF21S.js', title : '종합주요지수'}, 																		// 종합주요지수 - 주요지수 - 주요 상세
	ivinf22s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF22S.html'	 , jsPath : '/IVINF22S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 주가지수
	ivinf23s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF23S.html'	 , jsPath : '/IVINF23S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 채권금리
	ivinf24s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF24S.html'	 , jsPath : '/IVINF24S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 환율/원자재
	ivinf25s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF25S.html'	 , jsPath : '/IVINF25S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 경제지표
	ivinf26s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF26S.html'	 , jsPath : '/IVINF26S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 섹터지수
	ivinf27s   : { basePath : '/components/ivinf' , htmlPath : '/IVINF27S.html'	 , jsPath : '/IVINF27S.js', title : '종합주요지수', 		layout: 'basic'}, 											// 종합주요지수 - 관심
	ivinf28p   : { basePath : '/components/ivinf' , htmlPath : '/IVINF28P.html'	 , jsPath : '/IVINF28P.js', title : '일자별 보기'}, 																		// 종합주요지수 - 주요지수 - 주요 상세 - 일자별보기
	ivinf29p   : { basePath : '/components/ivinf' , htmlPath : '/IVINF29P.html'	 , jsPath : '/IVINF29P.js', title : '지수 순서 설정'}, 																	// 종합주요지수 - 관심 - 관심지수 편집
	ivinf30m	 : { module : 'ivinf30m', basePath : '/components/ivinf' , htmlPath : '/IVINF30M.html'	 , jsPath : '/IVINF30M.js', layout: 'basic', title : '경제캘린더'}, 					// 경제캘린더 목록
	ivinf32m	 : { module : 'ivinf32m', basePath : '/components/ivinf' , htmlPath : '/IVINF32M.html'	 , jsPath : '/IVINF32M.js', layout: 'basic', title : '경제캘린더 검색'}, 			// 경제캘린더 검색
	ivinf50s	 : { module : 'ivinf50s', basePath : '/components/ivinf' , htmlPath : '/IVINF50S.html'	 , jsPath : '/IVINF50S.js', layout: 'basic', title: 'AI 시장지수 분석'}, // AI 시장지수 분석
	ivinf51p   : { basePath : '/components/ivinf/pop' , htmlPath : '/IVINF51P.html'	 , jsPath : '/IVINF51P.js', title : '지수분석 설정'}, 
	ivinf51m  :  { basePath : '/components/ivinf' , htmlPath : '/IVINF51M.html'	 , jsPath : '/IVINF51M.js', title : '전문가 리포트', 			layout: 'basic'},										// 전문가 리포트
	/* 영업캘린더 */
	dscmng10m		: { module : 'dscmng10m', basePath : '/components/dscmng' , htmlPath : '/DSCMNG10M.html'	 , jsPath : '/DSCMNG10M.js', layout: 'basic', title : '영업캘린더'}, // 영업캘린더 목록
	dscmng11m		: { module : 'dscmng11m', basePath : '/components/dscmng' , htmlPath : '/DSCMNG11M.html'	 , jsPath : '/DSCMNG11M.js', layout: 'basic', title : '영업캘린더 검색'}, // 영업캘린더 목록
	dscmng12p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG12P.html'	 , jsPath : '/DSCMNG12P.js', title : ' '}, 									// 영업캘린더 단독일정/반복일정 선택 팝업
	dscmng20p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG20P.html'	 , jsPath : '/DSCMNG20P.js', title : '일정 상세'}, 									// 영업캘린더 일정 상세 팝업
	dscmng21m		: { module : 'dscmng21m', basePath : '/components/dscmng' , htmlPath : '/DSCMNG21M.html'	 , jsPath : '/DSCMNG21M.js', layout: 'LayoutWithBottom', title : '영업캘린더 등록'}, // 영업캘린더 등록
	dscmng22p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG22P.html'	 , jsPath : '/DSCMNG22P.js', title : '반복 설정'}, 						// 영업캘린더 반복 설정 팝업
	dscmng23p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG23P.html'	 , jsPath : '/DSCMNG23P.js', title : '알림 설정'}, 						// 영업캘린더 알림 설정 팝업
	dscmng24m		: { module : 'dscmng24m', basePath : '/components/dscmng' , htmlPath : '/DSCMNG24M.html'	 , jsPath : '/DSCMNG24M.js', layout: 'LayoutWithBottom', title : '일정 수정'}, // 영업캘린더 수정
	dscmng25p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG25P.html'	 , jsPath : '/DSCMNG25P.js', title : '일정 공유'}, 						// 영업캘린더 일정 공유 팝업
	dscmng30p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG30P.html'	 , jsPath : '/DSCMNG30P.js', title : '수신만기 상세'}, 						// 영업캘린더 만기 상세 팝업
	dscmng40p     : { basePath : '/components/dscmng/pop' , htmlPath : '/DSCMNG40P.html'	 , jsPath : '/DSCMNG40P.js', title : '생일 상세'}, 						// 영업캘린더 생일 상세 팝업

	/* AI 지식상담 */
	aiCnslng : { module : 'AiCnslng', basePath : '/components/aicnsl' , htmlPath : '/AICNSL10M.html'	 , jsPath : '/AICNSL10M.js', layout: 'ai', title : '우리 GPT'},  // 우리상품바로알기 GPT (리즈닝적용)
	aiCnslng1 : { module : 'AiCnslng1', basePath : '/components/aicnsl' , htmlPath : '/AICNSL10M_1.html'	 , jsPath : '/AICNSL10M.js', layout: 'ai', title : '우리 GPT'},  // 외환 GPT (리즈닝적용)
	aiCnsl12p : { module : 'aiCnsl12p', basePath : '/components/aicnsl/comp/noti/item' , htmlPath : '/AICNSL12P.html'	 , jsPath : '/AICNSL12P.js', title : ' '}, 									// ai 지식상담 공지사항 팝업


	ntar01m : { module : 'notice', basePath : '/components/ntar' , htmlPath : '/NTAR01M.html'	 , jsPath : '/NTAR01M.js', layout: 'basic', title : '공지사항'}, 					// 공지사항
	ntar02m : { module : 'noticeDetail', basePath : '/components/ntar' , htmlPath : '/NTAR02M.html'	 , jsPath : '/NTAR02M.js', layout: 'basic', title : '공지사항 상세'}, // 공지사항 상세
	safeBoard01m : { module : 'safeBoard', basePath : '/components/ntar' , htmlPath : '/SAFEBOARD01M.html'	 , jsPath : '/SAFEBOARD01M.js', layout: 'basic', title : 'S.A.F.E Script'}, 					// safe script
	safeBoard02m : { module : 'safeBoardDetail', basePath : '/components/ntar' , htmlPath : '/SAFEBOARD02M.html'	 , jsPath : '/SAFEBOARD02M.js', layout: 'basic', title : 'S.A.F.E Script 상세'}, // safe script 상세
	ntar02mDetail : { module : 'safeBoardDetail', basePath : '/components/ntar' , htmlPath : '/SAFEBOARD02M.html'	 , jsPath : '/SAFEBOARD02M.js', layout: 'basic', title : 'S.A.F.E Script 상세'}, // safe script 상세
	etfGuide01m : { module : 'etfGuide', basePath : '/components/ntar' , htmlPath : '/ETFGUIDE01M.html'	 , jsPath : '/ETFGUIDE01M.js', layout: 'basic', title : 'ETF 가이드북'}, 					// ETF 가이드북
	ntar02mETFDetail : { module : 'etfGuideDetail', basePath : '/components/ntar' , htmlPath : '/ETFGUIDE02M.html'	 , jsPath : '/ETFGUIDE02M.js', layout: 'basic', title : 'ETF 가이드북'}, // ETF 가이드북 상세
	
	/* 관리 */
	mng02m : { module : 'mng02m', basePath : '/components/mng' , htmlPath : '/MNG02M.html'	 , jsPath : '/MNG02M.js', layout: 'basic', title : '커뮤니티 관리'}, 								// 관리 > 커뮤니티 관리
	mng01m  : { basePath : '/components/mng' , htmlPath : '/MNG01M.html'	 , jsPath : '/MNG01M.js', title : '고객 명함 메모 관리', 				layout: 'basic'}, 										// 고객 명함 메모 관리
	
	/* 차트 */
	chart10m   : { basePath : '/components/chart' , htmlPath : '/CHART10M.html'	 , jsPath : '/CHART10M.js', title : '상품/지수 비교',		layout: 'basic'}, 												// 차트 > 상품/지수 비교
	chart11p    : { basePath : '/components/chart' , htmlPath : '/CHART11P.html'	 , jsPath : '/CHART11P.js', title : '수익률/기준가 비교', 	layout: 'basic'}, 												// 차트 > 상품/지수 비교 > [P]수익률 비교
	chart12p    : { basePath : '/components/chart' , htmlPath : '/CHART12P.html'	 , jsPath : '/CHART12P.js', title : '상품/지수 검색', 		layout: 'basic'}, 												// 차트 > 상품/지수 비교 > [P]펀드/지수 검색 > 추천

	/* 투자관리 */
	ivinf50m : { basePath : '/components/ivinf', htmlPath : '/IVINF50M.html', jsPath : '/IVINF50M.js', title : '금융뉴스', layout : 'fncNews' },
	ivinf50p : { basePath : '/components/ivinf', htmlPath : '/IVINF50P.html', jsPath : '/IVINF50P.js', title : '뉴스 검색', layout : 'basic' },
	ivinf52p : { basePath : '/components/ivinf', htmlPath : '/IVINF52P.html', jsPath : '/IVINF52P.js', title : ' ', layout : 'basic' },
	ivinf40s : { basePath : '/components/ivinf', htmlPath : '/IVINF40S.html', jsPath : '/IVINF40S.js', title : '금융뉴스', layout : 'fncNews' },
	ivinf42s : { basePath : '/components/ivinf', htmlPath : '/IVINF42S.html', jsPath : '/IVINF42S.js', title : '금융뉴스', layout : 'fncNews' },
	ivinf52s : { basePath : '/components/ivinf', htmlPath : '/IVINF52S.html', jsPath : '/IVINF52S.js', title : '금융뉴스', layout : 'fncNews' },
	
	
	infpls10m : { basePath : '/components/infpls', htmlPath : '/INFPLS10M.html', jsPath : '/INFPLS10M.js', title : 'TWO CHAIRS 웹진', layout : 'basic' },
}

