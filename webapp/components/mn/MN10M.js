/*************************************************************************
 * @ 서비스경로 : MN10M
 * @ 파일명      : MN10M.html 메인 - [T] 홈
 * @ 화면ID		: PBWMA000000
 * @ 작성자      : 90194835
 * @ 작성일      : 2025-01-13
 ************************** 수정이력 ****************************************
 * 날짜                    작업자                 변경내용
 *_________________________________________________________________________
 * 2025-01-13            윤은정                 최초작성
 *************************************************************************/

import { BaseModule } from "../cmm/BaseModule.js";
import GlobalApp from "/components/cmm/GlobalApp.js";
import IvinfData from "/components/ivinf/comm/IvinfData.js";

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class MN10M extends BaseModule {
  constructor(elem) {
    super(elem);
    this.rootElem = elem;
    this.listManager = null;
    this.eventReceiver = new EventTarget();

    [this.empNm, this.setEmpNm] = this.useState("empNm", ""); // 직원명
    [this.toDay, this.setToDay] = this.useState("toDay", ""); // 오늘날짜
    [this.isToDay, this.setIsToDay] = this.useState("isToDay", ""); // 오늘날짜
    [this.day, this.setDay] = this.useState("day", ""); // 오늘 요일
    [this.currDate, this.setCurrDate] = this.useState("currDate", ""); // 오늘 요일
    [this.basDt, this.setBasDt] = this.useState("basDt", ""); // 기준일 - 현재 날짜기준 일 ~ 토

    [this.schdDtl, this.setSchdDtl] = this.useState("schdDtl", ""); // 수신만기/고객생일
    [this.schd, this.setSchd] = this.useState("schd", ""); // 개인일정
    [this.schdCnt, this.setSchdCnt] = this.useState("schdCnt", ""); // 개인일정 건수

    [this.schdDetail, this.setSchdDetail] = this.useState("schdDetail", ""); // 일정 상세보기시 필요 변수
    [this.nidx, this.setNidx] = this.useState("nidx", ""); // 주요지수
    [this.fav, this.setFav] = this.useState("fav", ""); // 관심지수
    [this.bnr, this.setBnr] = this.useState("bnr", ""); // 배너
    [this.noti, this.setNoti] = this.useState("noti", ""); // 공지사항
    [this.notiPop, this.setNotiPop] = this.useState("notiPop", ""); // 공지사항 - 팝업

    [this.selDay, this.setSelDay] = this.useState("selDay", "");

    this.checkResize = this.checkResize.bind(this);
  }

  init() {
    super.init(this);
    this.regist();

    this.loadData();
  }

  async regist() {
    this.bind("isToDay", $$("#isToDay"), "string");
    this.bind("currDate", $$("#currDate"), "string");

    // 스켈레톤 시작
    this.setSkeletone();

    // 전체일정보기
    this.registerCallback("click", $$("#btnSchdView"), () => {
      const route = "dscmng10m";
      const props = {};
      router.navigate(route, props);
    });

    // 주요지수전체보기
    this.registerCallback("click", $$("#btnNidxView"), () => {
      const route = "ivinf20s";
      const props = {};
      router.navigate(route, props);
    });

    // 수익률, 판매Best, 이달의 추천
    let auth = true;
    $("li[name=btnFndView]").on("click", function () {
      let items = Object.values(
        GlobalApp.router.globalData.getData("menuList"),
      );
      const route = $(this).data("key");
      const item = items.filter((s) => {
        return String(s.PBLINKURL) === route;
      });

      if (CmmUtils.isEmptyObject(item)) {
        CmmUtils.alert("", "메뉴 조회 권한이 없습니다.", {
          btnLabel: "확인",
        });
        return false;
      }

      const props = {};
      router.navigate(route, props);
    });

    // 공지사항 전체보기
    this.registerCallback("click", $$("#btnBlbrAll"), () => {
      const route = "ntar01m";
      const props = {};
      router.navigate(route, props);
    });

    // 배너 스와이퍼
    var swiper = new Swiper(" .mySwiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        el: ".swiper-pagination",
      },
    });

    // 리사이즈 체크
    window.addEventListener("resize", this.checkResize);
  }

  checkResize() {
    this.addPrivSchdHtml("F");
  }

  /**
   * 스켈레톤 적용
   * @param
   */
  async setSkeletone() {
    // 환영문구영역
    let wHtml = "";
    wHtml += "<figure>";
    wHtml += "	<figcaption>";
    wHtml += "		<span></span>";
    wHtml += "		<strong></strong>";
    wHtml += "	</figcaption>";
    wHtml += "</figure>";
    $$("#welcomeInfo").html(wHtml);
    // 일정영역
    let data = [];
    for (let i = 0; i < 7; i++) {
      data.push(i);
    }
    this.listManager = GlobalApp.getListManager(this.rootElem, {
      usePagination: false,
      listItemHtmlPath: "/components/mn/MN10M_L.html",
      listItemJsPath: "/components/mn/MN10M_L.js",
    });
    await this.listManager.render(data, this.eventReceiver);
    // 일정상세영역
    let html = "";
    for (let i = 0; i < 2; i++) {
      html += "<ul>";
      html += "	<li>";
      html += '		<a href="#">';
      html += '			<div class="tag-wrap"></div>';
      html += '			<div class="schedule-title"></div>';
      html += "		</a>";
      html += "	</li>";
      html += "</ul>";
    }
    $$("#planContainer").html(html);
    // 주요지수영역
    let nHtml = "";
    for (let i = 0; i < 3; i++) {
      nHtml += "<li>";
      nHtml += '		<a href="#">';
      nHtml += "			<dl>";
      nHtml += "				<dt></dt>";
      nHtml += "				<dd>";
      nHtml += "					<strong></strong>";
      nHtml += '					<div class="stock"></div>';
      nHtml += "				</dd>";
      nHtml += "				<dd>";
      nHtml += '					<div class="tags tags-small"></div>';
      nHtml += "				</dd>";
      nHtml += "			</dl>";
      nHtml += "		</a>";
      nHtml += "</li>";
    }
    $$("#nidxContainer").html(nHtml);

    $(".content").addClass("loading");
  }

  /**
   * 데이터 가져오기
   * @param
   */
  async loadData() {
    const url = "/pb/api/mn/main.json";
    const params = {};
    params.bestNidx = "Y";
    const res = await ApiUtils.sendPost(url, params, true);

    if (res.resultCode === "000000") {
      this.setEmpNm(res.data.empNm);

      await this.setWelcomeInfo();
      await this.setData(res.data);
      await this.setThisWeek(); // 일정
      await this.setBestNidx(); // 주요지수
      await this.setBanner(); // 배너
      await this.setNotiLst(); // 공지사항
      await this.setNotiPopup(); // 공지사항 - 팝업

      // 스켈레톤 종료
      $(".content").removeClass("loading");
      CmmUtils.hideLoading();
    }
  }

  /**
   *   문구 영역 데이터 셋팅
   *   스켈레톤 적용으로 인해 직접 그려줌.
   * @param
   *  */
  async setWelcomeInfo() {
    let wHtml = "";
    wHtml += "<figure>";
    wHtml += "	<picture>";
    wHtml +=
      '		<source srcset="../../resources/images/PBWMA/image_headline.png" media="(max-width:767px), (orientation:portrait)">';
    wHtml +=
      '		<source srcset="../../resources/images/PBWMA/image_headline_tablet.png 2x" media="(min-width:768px) and (orientation:landscape)">';
    wHtml +=
      '		<img src="../../resources/images/PBWMA/image_headline.png" alt="">';
    wHtml += "	</picture>";
    wHtml += "	<figcaption>";
    wHtml +=
      '		<span><b data-bind="empNm" id="empNm">' +
      this.empNm.value +
      "</b>님 안녕하세요</span>";
    wHtml += "		<strong>오늘의 일정 <br> 잊지말고 챙기세요!</strong>";
    wHtml += "	</figcaption>";
    wHtml += "</figure>";
    $$("#welcomeInfo").html(wHtml);

    $$("#btnSchdView").addClass("chevron");
    $$("#btnSchdView").addClass("fs-15");
    $$("#btnSchdView").text("전체보기");
    $$("#nidxStr").text("주요 지수");

    $$("#btnNidxView").addClass("chevron");
    $$("#btnNidxView").addClass("fs-15");
    $$("#btnNidxView").text("전체보기");
  }

  /**
   *   데이터 셋팅
   * @param
   *  */
  async setData(data) {
    // 수신만기/고객생일
    if (!CmmUtils.isEmpty(data.schd2)) {
      this.setSchdDtl(data.schd2.data.dpsAndtCnt);
    }

    // 개인일정
    if (!CmmUtils.isEmpty(data.schd.data.schdList)) {
      const dataLst = data.schd.data.schdList.rec;

      let schd3 = []; // 개인일정
      dataLst.forEach((d, r) => {
        if (d.type === "3") {
          schd3.push(d);
        }
      });

      // 개인일정
      this.setSchd(schd3);
      this.setSchdCnt(schd3.length);
      // 날짜형식 변경
      this.schd.value.forEach((item, idx) => {
        item.startDate3 = dayjs(item.startDate2).format("YYYYMMDD");
      });
    }

    this.setBasDt(data.basicDate); // 주 단위 - 기본일자
    this.setToDay(data.toDay); // 오늘일자 - YYYYMMDD
    this.setSelDay(this.toDay.value); // 선택된 일자
    this.setDay(data.day); // 오늘 요일
    this.setIsToDay(this.toDay.value.substring(6)); // 오늘일자 - DD

    const str = this.toDay.value
      .substring(4, 6)
      .concat(
        "월 ",
        this.toDay.value.substring(6),
        "일 ",
        this.getDayName(this.day.value),
      );
    this.setCurrDate(str); // 오늘일자 - 화면 출력용

    // 주요지수
    const cncrData = data.cncr;
    // PB WON에서 사용하는 명으로 변경
    cncrData.forEach((d, r) => {
      d.nidxOriginalNm = d.nidxNm;
      d.nidxNm = IvinfData.changePbData(d.nidxNm);
    });
    // 관심지수
    const items = data.fav;
    cncrData.forEach((val, idx) => {
      const item = items.filter((s) => {
        return s.cncrNidxNm === val.nidxNm;
      });
      if (item.length > 0) {
        val.fav = "Y";
      } else {
        val.fav = "N";
      }
    });
    // 주요지수 정렬(1.코스피, 2. 코스닥, 3. 환율)
    //		cncrData.sort((a, b) => b.mktNidxDscd.localeCompare(a.mktNidxDscd));
    this.setNidx(cncrData);
    // 배너
    this.setBnr(data.bnr);
    // 공지사항
    this.setNoti(data.noti);
    this.setNotiPop(data.notiPop);
  }

  /**
   *   일정
   * @param
   *  */
  async setThisWeek() {
    let data = this.basDt.value; // 일 ~ 토요일 일자정의
    let schdDtl = this.schdDtl.value; // 수신만기/고객생일 건수
    let schd = this.schd.value; // 개인일정정보

    // 개인일정 정보 관련해서 시작일자와 종료일자가 상이한 일정인 경우,
    // exChange에서 각 날짜별로 일정을 만들어주지 않기 때문에
    // 화면에서 임의로 날짜별로 일정 생성
    let schdBef = [];
    for (let i = 0; i < schd.length; i++) {
      const item = schd[i];
      const startDt = new Date(item.startDate);
      const endDt = new Date(item.endDate);

      // 시작날짜와 종료날짜가 상이할 경우, 종료날짜까지 일정을 표기해줘야함
      if (
        startDt.getFullYear() === endDt.getFullYear() &&
        startDt.getMonth() === endDt.getMonth() &&
        startDt.getDate() === endDt.getDate()
      ) {
        schdBef.push(item);
      } else {
        const diffInMs = endDt - startDt;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;

        for (let j = 0; j < parseInt(diffInDays); j++) {
          const subItem = { ...item };

          subItem.startDate3 = dayjs(startDt).format("YYYYMMDD");
          subItem.startDate2 = dayjs(startDt).format("YYYY-MM-DD");

          schdBef.push(subItem);

          startDt.setDate(startDt.getDate() + 1);
        }
      }
    }
    schd = schdBef;
    this.setSchd(schdBef);

    this.listManager = GlobalApp.getListManager(this.rootElem, {
      usePagination: false,
      listItemHtmlPath: "/components/mn/MN10M_L.html",
      listItemJsPath: "/components/mn/MN10M_L.js",
    });
    data.forEach((item, idx) => {
      const dd = item.date.substring(6); // 일자만 추출
      const today = this.toDay.value === item.date ? "today" : ""; // 오늘
      const isday = this.toDay.value === item.date ? "is-active" : ""; // 선택일
      const isHoliday = item.day === "1" || item.day === "7" ? "weekend" : ""; // 주말 - 1:일요일, 7:토요일

      item.id = item.date;
      item.dd = dd;
      item.today = today;
      item.isHoliday = isHoliday;
      item.isday = isday;
      // 일정이 있는 경우 아이콘 적용을 위해 데이터 처리
      // 수신만기/고객생일
      let isExpy;
      let isBirt;
      if (schdDtl.length > 0) {
        schdDtl.forEach((d, i) => {
          const td = d.basDt.substring(6, 8);
          if (dd === td && Number(d.dpsXprCnt) > 0) {
            isExpy = true;
          }
          if (dd === td && Number(d.andtMngInqCnt) > 0) {
            isBirt = true;
          }
        });
      }
      // 개인일정
      let isSchd = false;
      if (schd.length > 0) {
        schd.forEach((d, i) => {
          const td = d.startDate3.substring(6, 8);
          if (dd === td) {
            isSchd = true;
          }
        });
      }
      item.isExpy = isExpy;
      item.isBirt = isBirt;
      item.isSchd = isSchd;
    });

    await this.listManager.render(data, this.eventReceiver);
    this.eventReceiver.addEventListener(
      "itemAction",
      this.onItemAction.bind(this),
    );

    $$("#custContainer").html("");
    // 수신만기, 생일 데이터가 없는 경우
    if (!CmmUtils.isEmpty(schdDtl)) {
      await this.setDetailInfoDay();
    }
    // 개인 일정 데이터가 없는 경우
    $$("#planContainer").html("");
    if (!CmmUtils.isEmpty(schd)) {
      await this.setDetailDay();
    }

    this.setNoData();
  }

  /**
   *   수신만기/생일 데이터 - 출력영역 미사용으로 인한 주석처리
   * @param
   *  */
  async setDetailInfoDay() {
    let dataList = this.schdDtl.value; // 수신만기/고객생일 데이터
    // 선택한 날짜 데이터 추출
    let str = [];
    if (!CmmUtils.isEmpty(dataList)) {
      str = dataList.filter((data) => {
        return dayjs(data.basDt).format("YYYYMMDD") === this.selDay.value;
      });
    }

    if (str.length > 0) {
      let html = "";
      str.forEach((data, idx) => {
        idx = idx + 1;

        if (data.basDt === this.selDay.value) {
          html += '<div name="btnSchd">';
          html += '<a href="javascript:void(0);" >';
          html += "	<dl>";
          html += "		<dt>";
          html +=
            '			<div class="tags tags-medium tags-lightCyan tags-round">수신만기</div>';
          html += "		</dt>";
          html +=
            "		<dd><strong>" +
            CmmUtils.comma(data.dpsXprCnt) +
            "</strong>건</dd>";
          html += "	</dl>";
          html += "	<dl>";
          html += "		<dt>";
          html +=
            '			<div class="tags tags-medium tags-lightPurple tags-round">고객생일</div>';
          html += "		</dt>";
          html +=
            "		<dd><strong>" +
            CmmUtils.comma(data.andtMngInqCnt) +
            "</strong>건</dd>";
          html += "	</dl>";
          html += "</a>";
          html += "</div>";
        }
      });
      $$("#custContainer").html(html);
      let _this = this;
      $("div[name=btnSchd]").on("click", function () {
        const route = "dscmng10m";
        const props = {};
        props.mainBasDt = _this.selDay.value;

        router.navigate(route, props);
      });
    }
  }

  /**
   *   개인일정 영역
   * @param
   *  */
  async setDetailDay() {
    const schd = this.schd.value;
    // 선택한 날짜 데이터 추출
    let str = [];
    if (!CmmUtils.isEmpty(schd)) {
      str = schd.filter((data) => {
        return dayjs(data.startDate2).format("YYYYMMDD") === this.selDay.value;
      });
      this.setSchdCnt(str.length);
    }

    console.log("이혜성 1번 = ", this.schd.value);

    let html = "";
    if (str.length > 0) {
      html += "<ul>";
      str.forEach((data, idx) => {
        idx = idx + 1;
        const startDt = dayjs(data.startDate2).format("YYYYMMDD");
        if (startDt === this.selDay.value) {
          html +=
            '<li data-key="' +
            idx +
            '" name="privSchd_2" data-id="' +
            data.itemId +
            '" data-recu="' +
            data.recurringYn +
            '" data-mode="' +
            data.mode +
            '">';
          html += '	<a href="javascript:void(0);">';
          html += '		<div class="tag-wrap">';
          if (data.alldayYn === "Y") {
            // 일정시간 - 하루종일
            html +=
              '			<div class="tags tags-small tags-lightBlue tags-round">하루종일</div>';
          } else {
            // 일정시간 - !하루종일(시작시간)
            html += '			<div class="tags">' + data.startTime + "</div>";
          }
          html += "		</div>";
          html += '		<div class="schedule-title">';
          html += '			<div class="schedule-title-inner">';
          html +=
            '				<i class="icon-only icon-24 icon-calendar" aria-label="개인일정"></i>';
          html +=
            '				<strong class="body-small"><span>' +
            data.subject +
            "</span></strong>";
          html += "			</div>";
          html += "		</div>";
          html += "	</a>";
          html += "</li>";
        }
      });
      html += "</ul>";
    }
    $$("#planContainer").html(html);
    // 개인 일정 더보기 영역
    $$("#chevronContainer").html("");
    if (Number(this.schdCnt.value) !== 0) {
      await this.addPrivSchdHtml("F");
    }

    this.setNoData();

    // 개인일정 상세
    let _this = this;
    $("li[name=privSchd_2]").on("click", function () {
      const itemId = $(this).data("id");
      const recurring = $(this).data("recu");
      const mode = $(this).data("mode");

      const params = {};
      params.itemId = itemId;
      params.recurring = recurring;
      params.mode = mode;
      params.type = "main";

      _this.setSchdDetail(params); // 선택일정 정보 저장
      _this.schdPpopup(params); // 선택일정 상세보기
    });
  }

  /**
   *   개인 일정 더보기 영역
   * @param
   *  */
  async addPrivSchdHtml(type) {
    console.log("[ Aiden / type ] " + type);
    let html = "";
    const row = Number(this.schdCnt.value) - 3;
    // 첫 진입일 경우에만 적용 - 2건 이상일 경우 hide
    if (type === "F") {
      if (row > 0) {
        $("li[name=privSchd_2]").each(function (idx, item) {
          if ($(this).data("key") > 3) {
            $(this).hide();
          }
        });
        type = "Y";
      }
    }

    if (type === "Y") {
      html += '<div class="mt8 ac">';
      html +=
        '	<a class="anchor chevron chevron-down fs-15 py16 gap4" name="btnAddPriv_2" data-id="P">' +
        row +
        "건 더보기</a>";
      html += "</div>";
    } else if (type === "N") {
      html += '<div class="mt8 ac">';
      html +=
        '	<a class="anchor chevron chevron-up fs-15 py16 gap4" name="btnAddPriv_2" data-id="M">접기</a>';
      html += "</div>";
    }

    if ($("html").hasClass("TABLET")) {
      $$("#chevronContainer").html("");
    } else {
      $$("#chevronContainer").html(html);
    }

    let _this = this;
    $("a[name=btnAddPriv_2]").on("click", function () {
      if ($(this).data("id") == "P") {
        // 더보기 클릭
        $("li[name=privSchd_2]").each(function (row, item) {
          if ($(this).data("key") > 3) {
            $(this).show();
          }
        });
        _this.addPrivSchdHtml("N");
      } else {
        // 접기 클릭
        $("li[name=privSchd_2]").each(function (row, item) {
          if ($(this).data("key") > 3) {
            $(this).hide();
          }
        });
        _this.addPrivSchdHtml("Y");
      }
    });
  }

  /**
   *   일정이 없을 경우
   * @param
   *  */
  async setNoData() {
    $$("#schdNoData").html("");
    $$("#schdNoData").show();

    const cnt3 = CmmUtils.isEmpty(this.schdCnt.value) ? 0 : this.schdCnt.value;
    if (cnt3 === 0) {
      let html = "";
      html += '<div class="py24">';
      html +=
        '<p class="description caution body-small fc-typography-caption ac my12">개인 일정이 없습니다.</p>';
      html += "</div>";

      $$("#schdNoData").html(html);
    }
  }

  /**
   *   선택일정 상세 보기 - 개인일정
   * @param
   *  */
  async schdPpopup(param) {
    if (param.recurring === "Y") {
      const router = "dscmng12p";
      await GlobalApp.popupUtils.openPopup(router, {
        params: {},
        type: "slideLeft",
        showCloseBtn: true,
        btn2Label: "선택",
        btn2IsMain: true,
        onYes: async (result) => {
          // itemId와 recurring 값 가지고 상세 팝업 호출
          // 개인일정, 만기일정, 생일 구분
          const router = "dscmng20p";
          await GlobalApp.popupUtils.openPopup(router, {
            params: {
              itemId: param.itemId,
              recurring: result.data.recurring,
              mainType: "Y",
            },
            type: "slideLeft",
            showCloseBtn: true,
            btn1Label: "삭제",
            btn2Label: "수정",
            btn2IsMain: true,
            onYes: async (result) => {
              // 수정 화면 이동
              await this.handleOpenDSCMNG24M(result.data);
            },
            onNo: async (result) => {
              // 삭제
              console.log("onNo Result : ", result);

              if (result.resultCd === "000000") {
                const delSchd = this.schd.value;
                const delStr = delSchd.filter((data) => {
                  return data.itemId !== param.itemId;
                });

                // 개인일정
                await this.setSchd(delStr); // 삭제한 일정 배열에서 삭제
                await this.setSchdCnt(delStr.length);
                await this.setThisWeek(); // 일정 새로 그리기
              }
            },
            onClose: (result) => console.log("onClose Result : ", result),
          });
        },
        onClose: (result) => console.log("onClose Result : ", result),
      });
    } else {
      const router = "dscmng20p";
      await GlobalApp.popupUtils.openPopup(router, {
        params: { itemId: param.itemId, recurring: "N", mainType: "Y" },
        type: "slideLeft",
        showCloseBtn: true,
        btn1Label: "삭제",
        btn2Label: "수정",
        btn2IsMain: true,
        onYes: async (result) => {
          // 수정
          // 수정 화면 이동
          await this.handleOpenDSCMNG24M(result.data);
        },
        onNo: async (result) => {
          // 삭제 후 처리
          if (result.resultCd === "000000") {
            const delSchd = this.schd.value;
            const delStr = delSchd.filter((data) => {
              return data.itemId !== param.itemId;
            });

            // 개인일정
            await this.setSchd(delStr); // 삭제한 일정 배열에서 삭제
            await this.setSchdCnt(delStr.length);
            await this.setThisWeek(); // 일정 새로 그리기
          }
        },
        onClose: (result) => console.log("onClose Result : ", result),
      });
    }
  }

  /**
   * 일정수정 이동 이벤트 - 개인일정
   */
  async handleOpenDSCMNG24M() {
    const route = "dscmng24m";
    const param = this.schdDetail.value;
    const props = {
      itemId: param.itemId,
      recurringYn: param.recurring,
      mode: param.mode,
      type: "Y",
    };
    router.navigate(route, props);
  }

  /**
   *   일정 날짜 선택
   * @param
   *  */
  onItemAction(event) {
    const { id, action, status } = event.detail;

    const key = `${id}`;
    // 선택일
    this.setSelDay(key);
    // 수신만기, 고객생일
    this.setDetailInfoDay();
    // 개인일정
    this.setDetailDay();
  }

  /**
   *   주요지수 영역
   * @param
   *  */
  async setBestNidx() {
    const nidxLst = this.nidx.value;

    let html = "";
    nidxLst.forEach((val, idx) => {
      // 상승 rise, 보합 steady, 하락 fall
      let cls = "";
      let label = "";
      let tags = "";
      if (parseFloat(val.flfdEqvvRt) < 0) {
        cls = "fall";
        label = "등락폭(하락)";
        tags = "tags-lightBlue";
      } else if (parseFloat(val.flfdEqvvRt) > 0) {
        cls = "rise";
        label = "등락폭(상승)";
        tags = "tags-lightRed";
      } else {
        cls = "steady";
        label = "등락폭(보합)";
        tags = "tags-lightGray";
      }
      // 실시간 여부
      const live = val.rltmYn === "Y" ? "live-on" : "live-off";
      const liveStr = val.rltmYn === "Y" ? "실시간" : "비 실시간";
      let stcEprNidx = CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2));
      let flfdEqvvRt = CmmUtils.comma(parseFloat(val.flfdEqvvRt).toFixed(2));
      let fndNidxFlfdRt = CmmUtils.comma(
        parseFloat(val.fndNidxFlfdRt).toFixed(2),
      );

      html +=
        '<li id="' +
        val.mktNidxDscd +
        '" data-id="' +
        val.fav +
        '" data-val="' +
        stcEprNidx +
        '" data-rt="' +
        flfdEqvvRt +
        '" data-rate="' +
        fndNidxFlfdRt +
        '" data-nm="' +
        val.nidxOriginalNm +
        '" data-time="' +
        val.basRgsTimTxt +
        '" data-exr="' +
        val.disTxt +
        '">';
      html += '	<a name="bestNidx">';
      html += "		<dl>";
      if (val.rltmYn === "Y") {
        html +=
          "			<dt>" +
          val.nidxNm +
          ' <i class="' +
          live +
          '" aria-label="' +
          liveStr +
          '"></i></dt>';
      } else {
        html += "			<dt>" + val.nidxNm + "</dt>";
      }
      html += "			<dd>";
      html +=
        "				<strong>" +
        CmmUtils.comma(parseFloat(val.stcEprNidx).toFixed(2)) +
        "</strong>";
      // 등락폭
      if (Number(flfdEqvvRt) == 0) {
        html +=
          '				<div class="stock ' + cls + '" aria-label="' + label + '">0</div>';
      } else {
        html +=
          '				<div class="stock ' +
          cls +
          '" aria-label="' +
          label +
          '">' +
          CmmUtils.comma(Math.abs(parseFloat(val.flfdEqvvRt)).toFixed(2)) +
          "</div>";
      }
      html += "			</dd>";
      html += "			<dd>";
      html +=
        '				<div class="tags tags-small ' +
        tags +
        '" aria-label="등락율">' +
        CmmUtils.comma(parseFloat(val.fndNidxFlfdRt).toFixed(2)) +
        "%</div>";
      html += "			</dd>";
      html += "		</dl>";
      html += "	</a>";
      html += "</li>";
    });
    $$("#nidxContainer").html(html);
    // 주가지수 상세페이지 이동
    $("a[name=bestNidx]").on("click", function () {
      const route = "ivinf21s";
      const $key = $(this).closest("li");

      const str = nidxLst.filter((data) => {
        return data.mktNidxDscd === $key.attr("id");
      });

      const props = {
        inqPdcd: $key.attr("id"),
        inqPdNm: $key.attr("data-nm"),
        fav: $key.attr("data-id"),
        val: $key.attr("data-val"),
        eqvvRt: $key.attr("data-rt"),
        rate: $key.attr("data-rate") + "%",
        basDate: $key.attr("data-time"),
        exr: $key.attr("data-exr"),
        rltmYn: str[0].rltmYn,
      };
      router.navigate(route, props);
    });
  }

  /**
   *   배너 영역
   * @param
   *  */
  async setBanner() {
    let html = "";
    const bnrLst = this.bnr.value;

    if (bnrLst.length > 0) {
      /*
       * bnrLinkDscd(배너링크구분) - null : 이동없음, 1 : 내부, 2 : 외부
       * 		1-1 > bnrInLinkDtlId - 데이터가 있을 경우 공지사항id임 (공지사항상세 : ntar02m)
       *              bnrInLinkMenuId : menuId
       * 		2-1 > bnrExtrLinkTycd - 배너외부링크브라우저
       * 				 bnrExtrLinkUrlNm - 배너외부링크URL
       * */
      bnrLst.forEach((data, idx) => {
        const time = dayjs().format("YYYYMMDDHHmmss");
        const filePathNm =
          "/api/file/getFileView?fileName=" +
          data.atflNm +
          "&fileType=BNR&time=" +
          time;

        const bnrType = data.bnrLinkDscd;

        html += '<div class="swiper-slide">';
        if (bnrType === null) {
          html += '	<button name="noLink">';
        } else if (bnrType === "1") {
          // 내부링크
          html +=
            '	<button name="inLink" value="' +
            data.bnrInLinkDtlId +
            '" id="' +
            data.bnrInLinkMenuId +
            '">';
        } else if (bnrType === "2") {
          // 외부링크
          html +=
            '	<button name="outLink" value="' +
            data.bnrExtrLinkTycd +
            '" id="' +
            data.bnrExtrLinkUrlNm +
            '">';
        }
        html += "		<picture>";
        html += '			<source srcset="' + filePathNm + '">';
        html += '			<img src="' + filePathNm + '" alt="">';
        html += "		</picture>";
        html += "	</button>";
        html += "</div>";
      });
      $$("#bnrSwiper").html(html);

      const inLinkClick = (event, element) => {
        let route = element.id;
        if (!route) {
          return;
        }

        const props = {};
        if (element.value) {
          props.blbrNo = element.value;
        }
        if (route === "ntar01m" && props.blbrNo) {
          route = "ntar02m";
        }
        router.navigate(route, props);
      };

      const outLinkClick = (event, element) => {
        const outType = element.value;
        const outUrl = element.id;

        if (outType === "1") {
          // 인앱브라우저
          NativeUtils.callLocalBrowser(outUrl);
        } else if (outType === "2") {
          // 외부브라우저
          NativeUtils.callOpenWindowWithURL(outUrl);
        }
      };

      $$(document).findByName("inLink", "click", inLinkClick);
      $$(document).findByName("outLink", "click", outLinkClick);
    } else {
      $$("#bannerArea").hide();
    }
  }

  /**
   *   공지사항 영역
   * @param
   *  */
  async setNotiLst() {
    const notiLst = this.noti.value;

    if (notiLst != null) {
      $$("#blbrTitleNm").text(notiLst.blbrTitleNm);
      $$("#bltnStaDt").text(notiLst.bltnStaDt);

      let blbrNo = notiLst.blbrNo;
      $$("#notiMsg").on("click", async () => {
        const route = "ntar02m";
        const props = {
          blbrNo: blbrNo,
        };
        router.navigate(route, props);
      });
    } else {
      $$("#notiMsg").hide();
      $$("#notiNoMsg").show();
    }
  }

  /**
   *   공지사항 영역 - 팝업공지
   * setLocalStorageData ( key, value) < 다시 보지 않기 로컬스토리지에 저장
   * getLocalStorageData ( key) < 로컬스토리지 호출
   * @param
   *  */
  async setNotiPopup() {
    const notiPopup = this.notiPop.value;
    // 팝업공지 없을때.
    if (notiPopup === null) {
      return false;
    }
    if (notiPopup.length === 0) {
      return false;
    }
    const res = CmmUtils.getLocalStorageData("main_" + notiPopup.blbrNo);
    if (res.resultCd === "999999") {
      const route = "mn11p"; // 공지팝업
      await GlobalApp.popupUtils.openPopup(route, {
        //	            showCloseBtn : true,
        btn1Label: "더 이상 보지 않기",
        btn2Label: "닫기",
        btn1IsMain: false,
        btn2IsMain: true,
        type: "sticky",
        params: notiPopup,
        onCallback: (result) => {
          const route = "ntar02m";
          const props = {
            blbrNo: notiPopup.blbrNo,
          };
          router.navigate(route, props);
        }, // 자세히보기
        onYes: (result) => "", // 닫기버튼
        onNo: (result) =>
          CmmUtils.setLocalStorageData("main_" + notiPopup.blbrNo, notiPopup), // 다시 보지 않기
      });
      // 공지팝업 버튼 클래스 변경
      this.btnClassChange();
    }
  }

  /**
   *  공지팝업 공통 버튼 클래스 변경
   *  */
  async btnClassChange() {
    $$("#btmBtn1").removeClass("btn-secondary");
    $$("#btmBtn1").removeClass("btn-outlined");
    $$("#btmBtn2").removeClass("btn-primary");

    $$("#btmBtn1").addClass("fs-18");
    $$("#btmBtn2").addClass("fs-18");
  }

  /**
   *   요일 추출
   * @param
   *  */
  getDayName(date) {
    let str = "";

    switch (date) {
      case "1":
        str = "일요일";
        break;

      case "2":
        str = "월요일";
        break;

      case "3":
        str = "화요일";
        break;

      case "4":
        str = "수요일";
        break;

      case "5":
        str = "목요일";
        break;

      case "6":
        str = "금요일";
        break;

      case "7":
        str = "토요일";
        break;

      default:
        break;
    }
    return str;
  }

  destroy() {
    super.destroy(this);

    // 리사이즈 체크
    window.removeEventListener("resize", this.checkResize);
  }
}
