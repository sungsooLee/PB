/*************************************************************************
 * @ 서비스경로 : NMCRMNG10M
 * @ 파일명      : NMCRMNG10M.js 내명함공유 - 목록
 * @ 화면ID		: PBWBU000000
 * @ 작성자      : 90194835
 * @ 작성일      : 2024-11-28
 ************************** 수정이력 ****************************************
 * 날짜                    작업자                 변경내용
 *_________________________________________________________________________
 * 2024-11-28            윤은정                 최초작성
 *************************************************************************/
import { BaseModule } from "../cmm/BaseModule.js";
import GlobalApp from "/components/cmm/GlobalApp.js";

const globalApp = GlobalApp;

// router 초기화
const router = globalApp.router;

export default class NMCRMNG10M extends BaseModule {
  constructor(elem) {
    super(elem);
    this.rootElem = elem;
    this.listManager = null;
    this.eventReceiver = new EventTarget();

    [this.lstCnt, this.setLstCnt] = this.useState("lstCnt", "0"); // 내 명함 등록 개수 체크
    [this.lstId, this.setLstId] = this.useState("lstId", ""); // 내 명함 seq

    [this.sortData, this.setSortData] = this.useState("setSortData", ""); // 내 명함 순서 설정을 위한 변수

    [this.prlmEno, this.setPrlmEno] = this.useState("prlmEno", ""); // 직원번호
    [this.rprsTelNo, this.setRprsTelNo] = this.useState("rprsTelNo", ""); // 직원전화번호
    [this.myRprsTelNo, this.setMyRprsTelNo] = this.useState("myRprsTelNo", "");

    /**
     * nativeUtils.handleNativeResponse 로 응답 받은 내용을 eventDispatcher 통하여 전달 받음
     * @param event
     */
    const handleNativeResponse = (event) => {
      const response = event.detail;
      console.log("handleNativeResponse!!!!!!!!: ", response);

      if (response.command === "callKeypadInputValue") {
        const data = response.data;
        const length = response.length;

        console.log("data : ", data);
        console.log("length : ", length);

        if (length) {
          let ast = "";
          if (length.indexOf("*") === -1) {
            const len = parseInt(length);
            ast = "*".repeat(length);
          } else {
            ast = length;
          }

          console.log("ast : ", ast);

          this.setInput2Result(ast);
        }
      }
    };

    this.nativeCallback = handleNativeResponse;
    // 응답 callback 함수 리스터 등록
    NativeUtils.subscribe(handleNativeResponse);
  }

  init() {
    super.init(this);

    const userInfo = GlobalApp.router.globalData.getData("userInfo");
    this.setPrlmEno(encodeURIComponent(userInfo.prlmEno));
    let rprsTelno = userInfo.rprsTelNo;
    if (
      userInfo.sbrDscd === "1" ||
      userInfo.deptCd === "20001" ||
      userInfo.deptCd === "84592"
    ) {
      rprsTelno = userInfo.myRprsTelNo;
    } else if (userInfo.deptCd === "84616") {
      rprsTelno = "02-3151-3635";
    }

    rprsTelno = decodeURIComponent(rprsTelno); // 전화번호에 인코딩 문자 제거
    rprsTelno = this.telNoFormatter(rprsTelno); // 공백 제거

    console.log("rtrsTelNo : ", rprsTelno);

    this.setRprsTelNo(rprsTelno);

    this.loadList();

    this.registerCallback("click", $$("#sortBtn"), this.handleSortbtnClick); // 순서설정
    this.registerCallback("click", $$("#nmcrSave"), this.handleSaveBtnClick); // 내 명합 등록 - 화면이동
    this.registerCallback(
      "touchend",
      $$("#layoutBtn1"),
      this.handleSaveBtnClick,
    ); // 내 명합 등록 - 화면이동
    this.registerCallback("click", $$("#layoutBtn2"), this.handleShabtnClick); // 내 명합 등록 - 공유
  }

  /**
   * 내 명합 등록 - 화면이동
   *
   * @param
   */
  async handleSaveBtnClick() {
    if (this.lstCnt === 10) {
      const result = await CmmUtils.alert(
        "",
        "최대 10개까지 등록할 수 있습니다.",
        {
          btnLabel: "확인",
          icon: "caution",
        },
      );
      return false;
    }

    const route = "nmcrmng12p"; // 명함 등록
    await GlobalApp.popupUtils.openPopup(route, {
      showCloseBtn: true,
      //            btn2Label : '저장',
      //            btn2IsMain : true,
      onCallback: (result) => this.callbackFunc(result),
    });
  }

  /**
   * 내 명함 공유
   *
   * @param
   */
  async handleShabtnClick() {
    const stat = $("#nmcrNoData").is(":visible");

    if (stat === false) {
      // 등록된 명함이 있을 경우

      $(':radio[name="rad001"]').each(function (e) {
        if ($(this).is(":checked")) {
          let $parent = $(this).next("div");

          $parent.addClass("capturing");

          html2canvas($parent[0], {
            //scale 키워 이미지 화질 향상
            scale: 5,
          }).then(function (canvas) {
            const nm = $parent.find('[data-bind="empNm"]').text();
            const posNm = $parent.find('[data-bind="posiNm"]').text();
            const comNm = "";
            const deptNm = $parent.find('[data-bind="deptNm"]').text();
            const posiNm = $parent.find('[data-bind="posiNm"]').text();
            const phnNum = $parent.find('[data-bind="hpNo"]').text();
            const tel = $parent.find('[data-bind="rprsTelNo"]').text();
            const inlxNo = $parent.find('[data-bind="inlxNo"]').text();
            const eml = $parent.find('[data-bind="email"]').text();
            const fax = $parent.find('[data-bind="cnadFaxNo"]').text();
            const adr = $parent.find('[data-bind="adr"]').text();
            const dataUrl = canvas.toDataURL().split(",")[1];
            let msg = "";

            msg += "이름: " + nm + "\n";
            msg += "회사: 우리은행" + "\n";
            if (deptNm != "") {
              msg += "부서: " + deptNm + "\n";
            }
            if (posiNm != "") {
              msg += "직책: " + posiNm + "\n\n";
            }
            if (phnNum != "") {
              msg += "휴대폰번호: " + phnNum + "\n";
            }
            if (tel != "") {
              msg += "유선번호: " + tel + "\n";
            }
            if (inlxNo != "") {
              msg += "내선: " + inlxNo + "\n";
            }
            if (eml != "") {
              msg += "이메일: " + eml + "\n";
            }
            if (adr != "") {
              msg += "주소: " + adr + "\n";
            }
            if (fax != "") {
              msg += "팩스번호: " + fax;
            }
            const res = NativeUtils.callContactToSMS(
              nm,
              posNm,
              comNm,
              deptNm,
              phnNum,
              tel,
              eml,
              fax,
              dataUrl,
              msg,
            );
          });

          $parent.removeClass("capturing");
        }
      });
    } else {
      // 등록된 명함이 없을 경우
      toastr.caution("", "내 명함을 먼저 등록하고 공유해주세요.");
      return false;
    }
  }

  /**
   * 순서 설정 - 팝업띄우기
   *
   * @param
   */
  async handleSortbtnClick() {
    const route = "nmcrmng11p";
    await GlobalApp.popupUtils.openPopup(route, {
      showCloseBtn: true,
      onCallback: (result) => this.callbackFunc(result),
    });
  }

  /**
   * 내 명함 조회
   *
   * @param
   */
  async loadList() {
    const url = "/pb/api/nmcr/nmcrLst.json";
    const params = {};
    params.prlmEno = this.prlmEno.value;
    params.rprsTelNo = this.rprsTelNo.value;
    params.sysCd = "pbw";

    const res = await ApiUtils.sendPost(url, params);

    const items = res.data;
    this.setSortData(res.data); // 내 명함 순서 설정을 위한 데이터

    this.setLstCnt(items.length);
    if (items != null && this.lstCnt > 0) {
      // 내 명함 설정 정보가 있을 경우

      $("#nmcrData").show();
      $("#nmcrNoData").hide();

      let html = "";
      let _this = this;
      $.each(items, function (idx, val) {
        val.seq = idx + 1;
        val.id = val.nmcrInfSrno;
        val.cnadFaxNo = CmmUtils.faxFormatter(val.cnadFaxNo);
        // 직위확인 - 설정해 놓은 직위 확인
        if (val.lvjpEstCd === "000000") {
          val.posiNm = val.lvjpEstNm;
        }
        // 자격증 정보
        if (val.licItmsNm != null) {
          // CFP 선택 확인
          let licCfp = "N";
          if (val.licItmsNm.indexOf("CFP") > -1) {
            licCfp = "Y";
          }
          val.licCfp = licCfp;
        }
        html += '<div class="stroke stroke-fluid my0"></div>';
        html += '	<div class="group pt24 px4">';
        html +=
          '		<strong class="title-medium" data-bind="nmcrNm">' +
          val.nmcrNm +
          "</strong>";
        html +=
          '		<button type="button" class="btn-noborder" name="btnModNmcr" id="nmcrMod" value="' +
          val.nmcrInfSrno +
          '"><i class="ico-modify"></i>수정</button>';
        html += "	</div>";
        html += '	<div class="bs-card-wrap mb16" id="' + val.nmcrInfSrno + '">';
        // 각 타입의 명함카드 영역
        if (val.nmcrStylCd == "A") {
          html += _this.writeCardTypeAHtml(val); // A타입
        } else if (val.nmcrStylCd == "B") {
          html += _this.writeCardTypeBHtml(val); // A사진타입
        } else if (val.nmcrStylCd == "C") {
          html += _this.writeCardTypeCHtml(val); // 위비프렌즈타입
        } else if (val.nmcrStylCd == "D") {
          html += _this.writeCardTypeDHtml(val); // TC타입
        } else if (val.nmcrStylCd == "E") {
          html += _this.writeCardTypeEHtml(val); // TC사진타입
        }

        html += "</div>";
      });
      $("#listContainer").html(html);

      //			bsCardResize.init();

      const moreBtn = (event, element) => {
        $(':radio[name="rad001"]').each(function (e) {
          if ($(event.target).val() === $(this).val()) {
            $(
              ':radio[name="rad001"][value="' + $(event.target).val() + '"]',
            ).attr("checked", true);
          } else {
            $(':radio[name="rad001"][value="' + $(this).val() + '"]').attr(
              "checked",
              false,
            );
          }
        });
        // 수정페이지 이동
        _this.popup(element.value);
      };
      $$(document).findByName("btnModNmcr", "click", moreBtn);
    } else {
      $("#nmcrData").hide();
      $("#nmcrNoData").show().css({
        display: "flex",
        height: "100%",
      });
    }
  }

  /**
   * 내 명함 수정페이지 이동
   *
   * @param
   */
  async popup(id) {
    const route = "nmcrmng13p"; // 명함 수정
    const props = {
      nmcrSrno: id,
    };
    await GlobalApp.popupUtils.openPopup(route, {
      showCloseBtn: true,
      //            btn1Label : '삭제',
      //            btn2Label : '저장',
      //            btn1IsMain : false,
      //            btn2IsMain : true,
      params: props,
      onCallback: (result) => this.callbackFunc(result),
    });
  }

  /**
   * 모달 event 후처리
   *
   * @param
   */
  async callbackFunc(result) {
    this.loadList();
  }

  /**
   * 출력 선택한 자격증 목록
   */
  getBottomLic(licArr) {
    let html = '<div class="bottom1"><ul>';
    if (licArr !== null) {
      const licItms = licArr.split(",");
      $.each(licItms, function (no, licVal) {
        const rowNo = no + 1;
        html +=
          '<li data-bind="licArr' +
          rowNo +
          '">' +
          licVal.replaceAll("LevelⅢ", "Level Ⅲ") +
          "</li>";
      });
    }
    html += "</ul></div>";
    return html;
  }

  /**
   * 전화번호 및 내선번호
   */
  getTelNoHtml(data) {
    let html = "";
    // 등록되어있는 전화번호 사용
    if (data.telNoDscd === "S") {
      html += '							<div class="row">';
      html += '								<div class="th">Tel</div>';
      html += '								<div class="td" data-bind="rprsTelNo">' + data.telNo + "</div>";
      html += "							</div>";
      if (data.myinlxno !== undefined) {
        html += '							<div class="row">';
        html += '								<div class="th">내선</div>';
        html +=
          '								<div class="td" data-bind="inlxNo">' + data.myinlxno + "</div>";
        html += "							</div>";
      }
      // 직접 입력한 전화번호 사용
    } else if (data.telNoDscd === "I") {
      html += '							<div class="row">';
      html += '								<div class="th">Tel</div>';
      html +=
        '								<div class="td" data-bind="rprsTelNo">' +
        CmmUtils.phoneFormatter(data.estTelNo) +
        "</div>";
      html += "							</div>";
      if (data.myinlxno !== undefined) {
        html += '							<div class="row">';
        html += '								<div class="th">내선</div>';
        html +=
          '								<div class="td" data-bind="inlxNo">' + data.myinlxno + "</div>";
        html += "							</div>";
      }
    }
    return html;
  }

  /**
   * 명함스타일 A - Type A
   *
   * @param
   */
  writeCardTypeAHtml(data) {
    let selRadio = "";
    if (data.seq === 1) {
      selRadio = 'checked="true"';
    }

    let html = "";
    html +=
      '<input type="radio" name="rad001" value="' +
      data.id +
      '" ' +
      selRadio +
      ">";
    html += '<div class="bs-card " id="cardA" data-bind="cardA">';
    html += '	<div class="bs-typeA">';
    html += '		<div class="top">';
    html += '				<div class="left">';
    html += '					<picture class="top-logo01">';
    html +=
      '						<source srcset="../../resources/images/bs_card/bs_a_top_logo01.png">';
    html +=
      '						<img src="../../resources/images/bs_card/bs_a_top_logo01.png" alt="우리 마음속 첫번째 금융">';
    html += "					</picture>";
    html += "				</div>";
    html += '				<div class="right">';
    html += '					<picture class="top-aff01">';
    html += '						<source srcset="../../resources/images/bs_card/bs_a_aff.png">';
    html +=
      '						<img src="../../resources/images/bs_card/bs_a_aff.png" alt="우리은행">';
    html += "					</picture>";
    html += "				</div>";
    html += "			</div>";
    html += '			<div class="line">';
    html += "				<picture>";
    html += '					<source srcset="../../resources/images/bs_card/bs_a_line.svg">';
    html += '					<img src="../../resources/images/bs_card/bs_a_line.svg" alt="">';
    html += "				</picture>";
    html += "			</div>";
    html += '			<div class="center">';
    html += '				<div class="title">';
    html += '					<div class="left">';
    html += '						<picture class="center-logo01">';
    html +=
      '							<source srcset="../../resources/images/bs_card/bs_a_center_logo01.png">';
    html +=
      '							<img src="../../resources/images/bs_card/bs_a_center_logo01.png" alt="우리은행">';
    html += "						</picture>";
    if (data.licCfp === "Y") {
      html += '					<picture class="center-cfp">';
      html +=
        '					    <source srcset="../../resources/images/bs_card/bs_b_center_logo01.png">';
      html +=
        '					    <img src="../../resources/images/bs_card/bs_b_center_logo01.png" alt="CFP">';
      html += "					</picture>";
    }
    html += "					</div>";
    html += '					<div class="right">';
    html += "						<dl>";
    html += '							<dt data-bind="empNm">' + data.empNm + "</dt>";
    html += '							<dd data-bind="posiNm">' + data.posiNm + "</dd>";
    html += '							<dd data-bind="deptNm">' + data.deptNm + "</dd>";
    html += "						</dl>";
    html += "					</div>";
    html += "				</div>";
    html += '				<div class="info">';
    html += '					<div class="left">';
    html += '						<div class="location" data-bind="adr">' + data.adr + "</div>";
    html += '						<div class="email" data-bind="email">' + data.email + "</div>";
    html += "					</div>";
    html += '					<div class="right">';
    html += '						<div class="contact">';
    html += '							<div class="row">';
    html += '								<div class="th">Mobile</div>';
    html += '								<div class="td" data-bind="hpNo">' + data.hpNo + "</div>";
    html += "							</div>";
    html += this.getTelNoHtml(data);
    html += '							<div class="row">';
    html += '								<div class="th">Fax</div>';
    html +=
      '								<div class="td" data-bind="cnadFaxNo">' + data.cnadFaxNo + "</div>";
    html += "							</div>";
    html += "						</div>";
    html += "					</div>";
    html += "				</div>";
    html += "			</div>";
    html += this.getBottomLic(data.licItmsNm);
    html += "		</div>";
    html += "	</div>";
    html += "</div>";

    return html;
  }

  /**
   * 명함스타일 B - Type A(사진)
   *
   * @param
   */
  writeCardTypeBHtml(data) {
    let selRadio = "";
    if (data.seq === 1) {
      selRadio = 'checked="true"';
    }

    let html = "";
    html +=
      '<input type="radio" name="rad001" value="' +
      data.id +
      '" ' +
      selRadio +
      ">";
    html += '<div class="bs-card " id="cardB" data-bind="cardB" >';
    html += '	<div class="bs-typeA">';
    html += '		<div class="top">';
    html += '			<div class="left">';
    html += '				<picture class="top-logo01">';
    html +=
      '					<source srcset="../../resources/images/bs_card/bs_a_top_logo01.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_top_logo01.png" alt="우리 마음속 첫번째 금융">';
    html += "				</picture>";
    html += "			</div>";
    html += '			<div class="right">';
    html += '				<picture class="top-aff01">';
    html += '					<source srcset="../../resources/images/bs_card/bs_a_aff.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_aff.png" alt="우리은행">';
    html += "				</picture>";
    html += "			</div>";
    html += "		</div>";
    html += '		<div class="line">';
    html += "			<picture>";
    html += '				<source srcset="../../resources/images/bs_card/bs_a_line.svg">';
    html += '				<img src="../../resources/images/bs_card/bs_a_line.svg" alt="">';
    html += "			</picture>";
    html += "		</div>";
    html += '		<div class="center">';
    html += '			<div class="title">';
    html += '				<div class="left">';
    html += "					<figure>";
    html += "						<picture>";
    html +=
      '							<source srcset="/pb/api/nmcr/pic?USER_ID=' +
      data.prlmEno +
      '">'; /* 직원사진 */
    html += '							<img src="/pb/api/nmcr/pic?USER_ID=' + data.prlmEno + '" alt="">';
    html += "						</picture>";
    html += "					</figure>";
    if (data.licCfp === "Y") {
      html += '			    <picture class="center-cfp">';
      html +=
        '				    <source srcset="../../resources/images/bs_card/bs_b_center_logo01.png">';
      html +=
        '				    <img src="../../resources/images/bs_card/bs_b_center_logo01.png" alt="CFP">';
      html += "				</picture>";
    }
    html += "				</div>";
    html += '			<div class="right">';
    html += "				<dl>";
    html += '					<dt data-bind="empNm">' + data.empNm + "</dt>";
    html += '					<dd data-bind="posiNm">' + data.posiNm + "</dd>";
    html += '					<dd data-bind="deptNm">' + data.deptNm + "</dd>";
    html += "				</dl>";
    html += "			</div>";
    html += "		</div>";
    html += '		<div class="info">';
    html += '			<div class="left">';
    html += '				<picture class="info-logo01">';
    html +=
      '					<source srcset="../../resources/images/bs_card/bs_a_center_logo01.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_center_logo01.png" alt="우리은행">';
    html += "				</picture>";
    html += '				<div class="location" data-bind="adr">' + data.adr + "</div>";
    html += '				<div class="email" data-bind="email">' + data.email + "</div>";
    html += "			</div>";
    html += '			<div class="right">';
    html += '				<div class="contact">';
    html += '					<div class="row">';
    html += '						<div class="th">Mobile</div>';
    html += '						<div class="td" data-bind="hpNo">' + data.hpNo + "</div>";
    html += "					</div>";
    html += this.getTelNoHtml(data);
    html += '					<div class="row">';
    html += '						<div class="th">Fax</div>';
    html +=
      '						<div class="td" data-bind="cnadFaxNo">' + data.cnadFaxNo + "</div>";
    html += "					</div>";
    html += "				</div>";
    html += "			</div>";
    html += "		</div>";
    html += "	</div>";
    html += this.getBottomLic(data.licItmsNm);
    html += "	</div>";
    html += "</div>";

    return html;
  }

  /**
   * 명함스타일 C - 위비프렌즈
   *
   * @param
   */
  writeCardTypeCHtml(data) {
    let selRadio = "";
    if (data.seq === 1) {
      selRadio = 'checked="true"';
    }

    let html = "";
    html +=
      '<input type="radio" name="rad001" value="' +
      data.id +
      '" ' +
      selRadio +
      ">";
    html += '<div class="bs-card " id="cardC" data-bind="cardC" >';
    html += '	<div class="bs-typeA">';
    html += '		<div class="top">';
    html += '			<div class="left">';
    html += '				<picture class="top-logo02">';
    html +=
      '					<source srcset="../../resources/images/bs_card/bs_a_top_logo02.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_top_logo02.png" alt="위비프렌즈">';
    html += "				</picture>";
    html += "			</div>";
    html += '			<div class="right">';
    html += '				<picture class="top-aff01">';
    html += '					<source srcset="../../resources/images/bs_card/bs_a_aff.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_aff.png" alt="우리은행">';
    html += "				</picture>";
    html += "			</div>";
    html += "		</div>";
    html += '		<div class="line">';
    html += "		<picture>";
    html += '			<source srcset="../../resources/images/bs_card/bs_a_line.svg">';
    html += '			<img src="../../resources/images/bs_card/bs_a_line.svg" alt="">';
    html += "		</picture>";
    html += "	</div>";
    html += '	<div class="center">';
    html += '		<div class="title">';
    html += '			<div class="left">';
    html += '					<picture class="info-logo01">';
    html +=
      '						<source srcset="../../resources/images/bs_card/bs_a_center_logo01.png">';
    html +=
      '						<img src="../../resources/images/bs_card/bs_a_center_logo01.png" alt="우리은행">';
    html += "					</picture>";
    if (data.licCfp === "Y") {
      html += '				<picture class="center-cfp">';
      html +=
        '				    <source srcset="../../resources/images/bs_card/bs_b_center_logo01.png">';
      html +=
        '				    <img src="../../resources/images/bs_card/bs_b_center_logo01.png" alt="CFP">';
      html += "				</picture>";
    }
    html += "				</div>";
    html += '				<div class="right">';
    html += "					<dl>";
    html += '						<dt data-bind="empNm">' + data.empNm + "</dt>";
    html += '						<dd data-bind="posiNm">' + data.posiNm + "</dd>";
    html += '						<dd data-bind="deptNm">' + data.deptNm + "</dd>";
    html += "					</dl>";
    html += "				</div>";
    html += "			</div>";
    html += '			<div class="info">';
    html += '				<div class="left">';
    html += '					<div class="location" data-bind="adr">' + data.adr + "</div>";
    html += '					<div class="email" data-bind="email">' + data.email + "</div>";
    html += "				</div>";
    html += '				<div class="right">';
    html += '					<div class="contact">';
    html += '						<div class="row">';
    html += '							<div class="th">Mobile</div>';
    html += '							<div class="td" data-bind="hpNo">' + data.hpNo + "</div>";
    html += "						</div>";
    html += this.getTelNoHtml(data);
    html += '						<div class="row">';
    html += '							<div class="th">Fax</div>';
    html +=
      '							<div class="td" data-bind="cnadFaxNo">' + data.cnadFaxNo + "</div>";
    html += "						</div>";
    html += "					</div>";
    html += "				</div>";
    html += "			</div>";
    html += "		</div>";
    html += this.getBottomLic(data.licItmsNm);
    html += "	</div>";
    html += "</div>";

    return html;
  }

  /**
   * 명함스타일 D - TC 타입
   *
   * @param
   */
  writeCardTypeDHtml(data) {
    let selRadio = "";
    if (data.seq === 1) {
      selRadio = 'checked="true"';
    }

    let html = "";
    html +=
      '<input type="radio" name="rad001" value="' +
      data.id +
      '" ' +
      selRadio +
      ">";
    html += '<div class="bs-card " id="cardD" data-bind="cardD" >';
    html += '	<div class="bs-typeB">';
    html += '		<div class="top">';
    html += '			<div class="left">';
    html += '				<picture class="top-logo03">';
    html +=
      '					<source srcset="../../resources/images/bs_card/bs_b_top_logo01.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_b_top_logo01.png" alt="TWO CHAIRS">';
    html += "				</picture>";
    html += "			</div>";
    html += '			<div class="right">';
    html += '				<picture class="top-aff01">';
    html += '					<source srcset="../../resources/images/bs_card/bs_a_aff.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_aff.png" alt="우리은행">';
    html += "				</picture>";
    html += "			</div>";
    html += "		</div>";
    html += '		<div class="center">';
    html += '			<div class="title">';
    html += '				<div class="left">';
    if (data.licCfp === "Y") {
      html += '				<picture class="center-cfp">';
      html +=
        '				    <source srcset="../../resources/images/bs_card/bs_b_center_logo01.png">';
      html +=
        '				    <img src="../../resources/images/bs_card/bs_b_center_logo01.png" alt="CFP">';
      html += "				</picture>";
    }
    html += "				</div>";
    html += '				<div class="right">';
    html += "					<dl>";
    html += '						<dt data-bind="empNm">' + data.empNm + "</dt>";
    html += '						<dd data-bind="posiNm">' + data.posiNm + "</dd>";
    html += '						<dd data-bind="deptNm">' + data.deptNm + "</dd>";
    html += "					</dl>";
    html += "				</div>";
    html += "			</div>";
    html += '			<div class="info">';
    html += '				<div class="left">';
    html += '					<div class="left">';
    html += '						<picture class="info-logo01">';
    html +=
      '							<source srcset="../../resources/images/bs_card/bs_a_center_logo01.png">';
    html +=
      '							<img src="../../resources/images/bs_card/bs_a_center_logo01.png" alt="우리은행">';
    html += "						</picture>";
    html += '						<div class="location" data-bind="adr">' + data.adr + "</div>";
    html += '						<div class="email" data-bind="email">' + data.email + "</div>";
    html += "					</div>";
    html += "				</div>";
    html += '				<div class="right">';
    html += '					<div class="contact">';
    html += '						<div class="row">';
    html += '							<div class="th">Mobile</div>';
    html += '							<div class="td" data-bind="hpNo">' + data.hpNo + "</div>";
    html += "						</div>";
    html += this.getTelNoHtml(data);
    html += '						<div class="row">';
    html += '							<div class="th">Fax</div>';
    html +=
      '							<div class="td" data-bind="cnadFaxNo">' + data.cnadFaxNo + "</div>";
    html += "						</div>";
    html += "					</div>";
    html += "				</div>";
    html += "			</div>";
    html += "		</div>";
    html += this.getBottomLic(data.licItmsNm);
    html += "	</div>";
    html += "</div>";

    return html;
  }

  /**
   * 명함스타일 E - TC 사진 타입
   *
   * @param
   */
  writeCardTypeEHtml(data) {
    let selRadio = "";
    if (data.seq === 1) {
      selRadio = 'checked="true"';
    }

    let html = "";
    html +=
      '<input type="radio" name="rad001" value="' +
      data.id +
      '" ' +
      selRadio +
      ">";
    html += '<div class="bs-card " id="cardE" data-bind="cardE" >';
    html += '	<div class="bs-typeB">';
    html += '		<div class="top">';
    html += '			<div class="left">';
    html += '				<picture class="top-logo03">';
    html +=
      '					<source srcset="../../resources/images/bs_card/bs_b_top_logo01.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_b_top_logo01.png" alt="TWO CHAIRS">';
    html += "				</picture>";
    html += "			</div>";
    html += '			<div class="right">';
    html += '				<picture class="top-aff01">';
    html += '					<source srcset="../../resources/images/bs_card/bs_a_aff.png">';
    html +=
      '					<img src="../../resources/images/bs_card/bs_a_aff.png" alt="우리은행">';
    html += "				</picture>";
    html += "			</div>";
    html += "		</div>";
    html += '		<div class="center">';
    html += '			<div class="title">';
    html += '				<div class="left">';
    html += "					<figure>";
    html += "						<picture>";
    html +=
      '							<source srcset="/pb/api/nmcr/pic?USER_ID=' +
      data.prlmEno +
      '">'; /* 직원사진 */
    html += '							<img src="/pb/api/nmcr/pic?USER_ID=' + data.prlmEno + '" alt="">';
    html += "						</picture>";
    html += "					</figure>";
    if (data.licCfp === "Y") {
      html += '				<picture class="center-cfp">';
      html +=
        '				    <source srcset="../../resources/images/bs_card/bs_b_center_logo01.png">';
      html +=
        '				    <img src="../../resources/images/bs_card/bs_b_center_logo01.png" alt="CFP">';
      html += "				</picture>";
    }
    html += "				</div>";
    html += '				<div class="right">';
    html += "					<dl>";
    html += '						<dt data-bind="empNm">' + data.empNm + "</dt>";
    html += '						<dd data-bind="posiNm">' + data.posiNm + "</dd>";
    html += '						<dd data-bind="deptNm">' + data.deptNm + "</dd>";
    html += "					</dl>";
    html += "				</div>";
    html += "			</div>";
    html += '			<div class="info">';
    html += '				<div class="left">';
    html += '					<div class="left">';
    html += '						<picture class="info-logo01">';
    html +=
      '							<source srcset="../../resources/images/bs_card/bs_a_center_logo01.png">';
    html +=
      '							<img src="../../resources/images/bs_card/bs_a_center_logo01.png" alt="우리은행">';
    html += "						</picture>";
    html += '						<div class="location" data-bind="adr">' + data.adr + "</div>";
    html += '						<div class="email" data-bind="email">' + data.email + "</div>";
    html += "					</div>";
    html += "				</div>";
    html += '				<div class="right">';
    html += '					<div class="contact">';
    html += '						<div class="row">';
    html += '							<div class="th">Mobile</div>';
    html += '							<div class="td" data-bind="hpNo">' + data.hpNo + "</div>";
    html += "						</div>";
    html += this.getTelNoHtml(data);
    html += '						<div class="row">';
    html += '							<div class="th">Fax</div>';
    html +=
      '							<div class="td" data-bind="cnadFaxNo">' + data.cnadFaxNo + "</div>";
    html += "						</div>";
    html += "					</div>";
    html += "				</div>";
    html += "			</div>";
    html += "		</div>";
    html += this.getBottomLic(data.licItmsNm);
    html += "	</div>";
    html += "</div>";

    return html;
  }

  telNoFormatter(telNo) {
    return telNo
      .replace(/\s+/g, "")
      .replace(/\((\d+)\)/, "$1-")
      .replace(/^(\d+)\)/, "$1-");
  }

  destroy() {
    super.destroy(this);

    // 응답 callback 함수 리스터 해제
    NativeUtils.unSubscribe(this.nativeCallback);
  }
}
