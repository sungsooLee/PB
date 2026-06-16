import GlobalApp from "/components/cmm/GlobalApp.js";

const ComPopUtils = (function () {
  let curPath = "";
  let curOptions = {};
  let popupStack = [];

  return class ComPopUtils {
    constructor() {
      this.modules = {}; // 로드한 모듈 저장소

      // 로드한 팝업 path 정보
      //this.curPath = '';
    }

    setCurPath(path) {
      curPath = path;
    }

    getCurPath() {
      return curPath;
    }

    setCurOptions(options) {
      curOptions = options;
    }

    getCurOptions() {
      return curOptions;
    }

    setPopupStack(stack) {
      popupStack = stack;
    }

    getPopupStack() {
      return popupStack;
    }

    addStack(stack) {
      popupStack.push(stack);
    }

    removeStack() {
      popupStack.pop();
    }

    /**
     * 팝업 오픈
     * @param {*} popupNm [String] 팝업 클래스명   [필수]
     * @param {*} options [Object] 팝업 옵션       [선택] {
     *                                          showCloseBtn [bool] : 닫기 버튼 표시 여부 ( false 일 경우 닫기버튼 표시 안되며, dimmed 영역 터치 안됨 )
     *                                          btn1Label    [String] : 왼쪽 버튼 텍스트  ( 값이 없는 경우 원버튼 형태의 팝업으로 표시 )
     *                                          btn2Label    [String] : 오른쪽 버튼 텍스트
     *                                          btn1IsMain   [Bool]   : 버튼 1 색상의 메인여부 ( true : 파랑색, false : 흰색 )
     *                                          btn2IsMain   [Bool]   : 버튼 2 색상의 메인여부 ( true : 파랑색, false : 흰색 )
     *                                          params       [Object] : 팝업으로 전달하기 위한 파라미터 객체
     *                                          onNo         [FUNC]   : 왼쪽 버튼 응답 함수
     *                                          onYes        [FUNC]   : 오른쪽 버튼 응답 함수
     *                                          onClose      [FUNC]   : 닫기 버튼 응답 함수
     *                                          type         [String] : 팝업타입 ('full', 'sticky', 'slideLeft')
     * }
     */
    async openPopup(popupNm, options) {
      const ctx = this;
      return new Promise(async function (resolve, reject) {
        const globalApp = GlobalApp;
        const path = globalApp.router.routes[popupNm];

        // 팝업이 떳을 때 historyback 을 3회 눌러야 뒤로가는 증상 해결을 위한 조치
        globalApp.router.historyBackCnt = -3;

        if (!path) {
          log.debug("해당 경로에 파일이 없습니다.");
          return;
        }

        console.log("path : ", path);
        console.log("curPath : ", ctx.curPath);
        ctx.setCurPath(path);
        ctx.setCurOptions(options);

        // html을 로드한다.
        const popupContent = await ctx.loadPopupHtml(path);

        // 팝업 내에 요소들을 세팅한다.
        ctx.setElementByOptions(popupContent, path, options);

        // 팝업을 띄운다
        resolve(ctx.showPopup(popupContent, options, path, resolve));
      });
    }

    /**
     * PDF Viewer 오픈
     * @param {*} options [Object] 팝업 옵션       [필수] {
     *                              fileName [String] : PDF 파일명 (확장자포함)
     *                              fileType [String] :  구분타입 (01:공지/02:펀드/03:AI지식상담)
     * }
     */
    async openPdfViewer(options) {
      return new Promise(async function (resolve, reject) {
        CmmUtils.showLoading();

        if (options.fileName === "") {
          await CmmUtils.alert("알림", "PDF 파일명은 필수 입니다.");
          resolve({ resultCode: "999999" });
        }

        if (options.fileType === "") {
          await CmmUtils.alert("알림", "PDF 구분타입은 필수 입니다.");
          resolve({ resultCode: "999999" });
        }
        const viewUrl = "../../resources/js/pdfviewer/rsc/web/viewer_new.html";
        const readPath =
          "../../resources/js/pdfviewer/jsp/pfileRead.jsp?pdfPath=";

        console.log("EnvUtils.isDev : ", EnvUtils.isDev());
        console.log("EnvUtils.getOs : ", EnvUtils.getOs());

        if (EnvUtils.getOs() === "PC") {
          axios
            .post("/api/file/pdfDownload.json", options)
            .then(async (response) => {
              window.open(
                viewUrl +
                  "?file=" +
                  encodeURIComponent(
                    "/api/file/getPdfViewer.json?fileName=" +
                      options.fileName +
                      "&type=" +
                      options.fileType,
                  ),
              );
              CmmUtils.hideLoading();
              resolve({ resultCode: "000000" });
            })
            .catch((error) => {
              resolve({ resultCd: "999999" });
            });
        } else {
          console.log("EnvUtils.isDev : ", EnvUtils.isDev());

          if (EnvUtils.isDev()) {
            //if(options.fileType === '03' || options.fileType === '02') {
            axios
              .post("/api/file/pdfDownload.json", options)
              .then(async (response) => {
                console.log("pdfDownload.json response : ", response);
                const res = await NativeUtils.callPopupWindow(
                  "https://trmwon.wooribank.com:1543" +
                    viewUrl +
                    "?file=" +
                    encodeURIComponent(
                      "/api/file/getPdfViewer.json?fileName=" +
                        options.fileName +
                        "&type=" +
                        options.fileType,
                    ),
                );
                CmmUtils.hideLoading();
                resolve(res.result);
              })
              .catch((error) => {
                resolve({ resultCd: "999999" });
              });
            //}else {
            //	const res = await NativeUtils.callPopupWindow('https://trmwon.wooribank.com:1543' + viewUrl + '?file=' + encodeURIComponent('/api/file/getPdfViewer.json?fileName=' + options.fileName + '&type=' + options.fileType));
            //	resolve(res.result);
            //}
          } else if (EnvUtils.isPrd()) {
            //if(options.fileType === '03' || options.fileType === '02') {
            axios
              .post("/api/file/pdfDownload.json", options)
              .then(async (response) => {
                const res = await NativeUtils.callPopupWindow(
                  "https://rmwon.wooribank.com:1543" +
                    viewUrl +
                    "?file=" +
                    encodeURIComponent(
                      "/api/file/getPdfViewer.json?fileName=" +
                        options.fileName +
                        "&type=" +
                        options.fileType,
                    ),
                );
                CmmUtils.hideLoading();
                resolve(res.result);
              })
              .catch((error) => {
                resolve({ resultCd: "999999" });
              });
            //}else {
            //	const res = await NativeUtils.callPopupWindow('https://rmwon.wooribank.com:1543' + viewUrl + '?file=' + encodeURIComponent('/api/file/getPdfViewer.json?fileName=' + options.fileName + '&type=' + options.fileType));
            //	resolve(res.result);
            //}
          } else {
            await CmmUtils.alert(
              "알림",
              "개발, 운영에서만 테스트가 가능합니다.",
            );
            resolve({ resultCode: "999999" });
          }
        }
      });
    }

    async loadPopupHtml(path) {
      const loadPopupPath = path.basePath + path.htmlPath;
      log.debug("loadPopupPath : ", loadPopupPath);

      const response = await fetch(loadPopupPath);
      if (!response.ok) reject("file load fail!!");

      return await response.text();
    }

    /**
     * 팝업 내에서 실행될 js 파일을 로드 한다.
     * @param {*} path [Object] : 팝업 모듈 정보
     * @param {*} rootElem [HTMLElement] : 바닥 요소
     * @param {*} options [Object] : 팝업 오픈 옵션
     * @param {*} callback [FUNC] : callback 함수
     */
    async loadPopupJsModule(path, rootElem, options, callback) {
      if (path === "index") return;

      log.debug("loadModule path:  ", path);
      const module = await this.createJsModule(path, rootElem);

      // module이 있는경우 히스토리에 저장
      if (module) {
        const className = path
          .split("/")
          .pop()
          .split(".")
          .slice(0, -1)
          .join(".");
        this.modules[className] = module;
      }

      // 모듈 내에 커스텀 콜백이벤트
      const moduleEventCallback = async (result) => {
        console.log("result : ", result);

        //callback에 리턴 값이 없는 경우 중단
        if (!result) {
          return;
        }

        const res =
          typeof options.onCallback !== "undefined"
            ? await options.onCallback(result)
            : { resultCd: "999999", resultMsg: "onCallback" };
        console.log("res : ", res);

        this.closePopup(this.getCurPath(), options);
      };

      // module 이 init 할 때에 callback 함수까지 같이 전달
      callback ? callback : module.init?.(options?.params, moduleEventCallback);

      return module;
    }

    async createJsModule(path, rootElem) {
      log.debug("path : ", path);

      const module = await import(path);
      const className = path.split("/").pop().split(".").slice(0, -1).join(".");
      log.debug("className : ", className);
      log.debug("module[className] : ", module);

      if (module) {
        // 모듈 관리를 위해 저장소에 저장한다.
        return new module[className](rootElem);
      } else {
        return new Error("class not found");
      }
    }

    /**
     * 팝업 내에 js 모듈 제거
     * @param {*} url [String] : js 모듈 경로
     */
    async removePopupJsModule(url) {
      log.debug("url : ", url);

      const tArry =
        typeof url === "object" ? url.jsPath.split(".") : url.split(".");
      log.debug("tArry : ", tArry);

      const tAry = tArry[0].split("/");
      const className = tAry[tAry.length - 1];

      log.debug("this.modules : ", this.modules);

      if (this.modules) {
        Object.keys(this.modules).forEach((key) => {
          if (key === className) {
            console.log("key : ", this.modules[key]);
            console.log("removeModules : ", key);
            const module = this.modules[className];

            console.log("module : ", module);
            module.destroy();

            // 저장소에서 삭제
            delete this.modules[className];
            console.log("removeModules : ", this.modules);
          }
        });
      }
    }

    async removeHtml() {
      $$("#cmmModal").find(".modal__content").html("");
    }

    /**
     * 팝업을 오픈
     * @param {*} content [String] : 팝업 안에 들어갈 HTML 문자열
     * @param {*} options [Object] : 팝업 옵션  {
     *                                  showCloseBtn [bool] : 닫기 버튼 보이기/ 숨기기
     *                                  btn1Lable    [String] : 버튼 1 라벨
     *                                  btn2Lable    [String] : 버튼 2 라벨
     *                                  onClose      [Func]   : 닫기 버튼 callback
     *                                  onYes        [Func]   : yes 버튼 callback
     *                                  onNo         [Func]   : no  버튼 callback
     * }m
     * @param {*} path    [Object] : 팝업 내에 모듈을 로드할 path 정보
     * @param {*} resolve [Object] : Promise resolver
     */
    async showPopup(content, options, path, resolve) {
      //log.debug('showPopup options : ', options);
      let jsModule;

      //js Module load
      if (path.jsPath) {
        const popupJsPath = path.basePath + path.jsPath;
        jsModule = await this.loadPopupJsModule(
          popupJsPath,
          $$("#cmmModal").elements[0],
          options,
        );
      }

      console.log("microModal : ", MicroModal);

      MicroModal.show("cmmModal", {
        onShow: (modal) => {
          // 모달 오픈 상태를 저장
          window.history.pushState({ modalOpen: true }, "", location.href);
          console.log("onshow history.state : ", window.history.state);
          console.log(
            "modal onShow!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
          );
          // console.log('showPopup modal : ' , modal);
          // console.log('showPopup jsModule : ' , jsModule);

          if (options.showCloseBtn) {
            //console.log('showPopup closeBtn : ' , $$(modal).find('#closeBtn'));
            $$("#cmmModal")
              .find("#closeBtn")
              .on(
                "click",
                () => {
                  console.log("close!!!!!!!!!!!!!");
                  this.closeEvent(this.getCurPath(), options, resolve);
                },
                true,
              );
          }

          if (options.btn1Label) {
            // 버튼 색깔 수정
            this.btnSetMain(
              $$("#cmmModal").find("#btmBtn1").elements[0],
              options.btn1IsMain,
            );

            // 버튼 클릭시 callback 등록
            $$("#cmmModal")
              .find("#btmBtn1")
              .on("touchend", async (event) => {
                event.preventDefault();
                this.btn1Callback(path, options, jsModule, resolve);
              });
          }

          if (options.btn2Label) {
            // 버튼 색깔 수정
            this.btnSetMain(
              $$("#cmmModal").find("#btmBtn2").elements[0],
              options.btn2IsMain,
            );

            // 버튼 클릭시 callback 등록
            $$("#cmmModal")
              .find("#btmBtn2")
              .on("touchend", async (event) => {
                event.preventDefault();
                this.btn2Callback(path, options, jsModule, resolve);
              });
          }
        },
        onClose: function () {
          // 2025-04-30 : 반응형 대응.
          setTimeout(() => {
            if ($("#cmmModal").attr("aria-hidden") === "true") {
              $$("#cmmModal").removeClass("micromodal-slide-bottom-right-full");
            }
          }, 1000);
          // $("#datepicker_month").datepicker("destroy")

          if (options.btn1Label) {
            console.log("micro onBtn1Close!!");
            $$("#cmmModal").find("#btmBtn1").off();
          }

          if (options.btn2Label) {
            console.log("micro onBtn2Close!!");
            $$("#cmmModal").find("#btmBtn2").off();
          }
        },
      });
    }

    async btn1Callback(path, options, jsModule, resolve) {
      const result =
        typeof jsModule?.returnToBtn1CallBack !== "undefined"
          ? await jsModule?.returnToBtn1CallBack?.()
          : { resultCd: "000000", resultMsg: "(default) no click!!" };

      console.log("returnToBtn1CallBack result : ", result);
      if (!result) {
        return;
      }

      options.onNo
        ? options.onNo(result)
        : resolve({ resultCd: "999999", resultMsg: "(default) no click!!" });

      this.closePopup(path, options);
    }

    async btn2Callback(path, options, jsModule, resolve) {
      const result =
        typeof jsModule?.returnToBtn2CallBack !== "undefined"
          ? await jsModule?.returnToBtn2CallBack?.()
          : { resultCd: "000000", resultMsg: "(default) yes click!!" };

      console.log("returnToBtn2CallBack result : ", result);
      if (!result) {
        return;
      }

      options.onYes
        ? options.onYes(result)
        : resolve({ resultCd: "000000", resultMsg: "(default) yes click!!" });

      this.closePopup(path, options);
    }

    /**
     * 팝업을 닫는다.
     * @param {*} path    [Object] : 팝업 모듈 정보
     * @param {*} options [Object] : 팝업 오픈 옵션
     */
    closePopup(path, options) {
      //팝업을 닫기전에 이벤트를 제거한다.
      if (options) {
        // 풀 팝업
        if (options.type === "full") {
          $$("#cmmModal").removeClass("micromodal-slide-bottom-full");
        } else if (options.type == "sticky") {
          $$("#cmmModal").removeClass("micromodal-slide-sticky");
        } else if (options.type == "slideLeft") {
          $$("#cmmModal").removeClass("micromodal-slide-bottom-right-full");
        } else if (options.type == "tablet") {
          $$("#cmmModal").removeClass("micromodal-slide-bottom-tablet");
        } else if (options.type == undefined) {
          $$("#cmmModal").removeClass("micromodal-slide-bottom-right-full");
        }

        if (options.showCloseBtn) {
          console.log("micro onClose : ", $$("#cmmModal").find("#closeBtn"));
          $$("#cmmModal").find("#closeBtn").off();
        }

        if (options.btn1Label) {
          console.log("micro onBtn1Close!!");
          $$("#cmmModal").find("#btmBtn1").off();
        }

        if (options.btn2Label) {
          console.log("micro onBtn2Close!!");
          $$("#cmmModal").find("#btmBtn2").off();
        }
      }

      //팝업을 닫기전에 js 파일을 제거한다.
      if (path) {
        console.log(path);
        this.removePopupJsModule(path);

        // 팝업내에 html 요소들을 제거한다
        this.removeHtml();

        // curPath 초기화
        this.setCurPath(null);
      }

      console.log("#####options.isMenu", options.isMenu);
      if (options.isMenu) {
        MicroModal.close("menuModal");
      } else {
        MicroModal.close("cmmModal");
      }

      // 모달 닫힘 상태를 저장
      window.history.pushState({ modalOpen: false }, "", location.href);
      console.log("onclose history.state : ", window.history.state);
    }

    /**
     * 팝업을 닫기 전에 결과를 리턴하고 팝업을 닫는다.
     * @param {*} options [Object] : 팝업 오픈시 설정한 옵션
     * @param {*} resolve [Object] : Promise Resolver
     */
    closeEvent(path, options, resolve) {
      console.log("closeClick!! : ", options);

      // 응답코드 리턴
      options.onClose
        ? options.onClose({ resultCd: "999999", resultMsg: "popupClosed" })
        : resolve({ resultCd: "999999", resultMsg: "popupClosed" });

      // 팝업을 닫는다.
      this.closePopup(path, options);
    }

    /**
     * 팝업 내에 요소 세팅
     * @param {*} content [String] : HTML 컨텐츠
     * @param {*} path    [Object] : 팝업 정보
     * @param {*} options [Object] : 팝업 오픈시 설정한 옵션
     */
    setElementByOptions(content, path, options) {
      // path에 타이틀이 있으면 헤더영역에 넣는다
      if (path.title) {
        console.log("path.title : ", path.title);
        $$("#cmmModal").find("#modalTitle").text(path.title);
      }

      let btn1, btn2;

      // content 영역 세팅
      if (content) {
        $$("#cmmModal").find(".modal__content").html(content);
      }

      console.log("options : ", options);

      // 풀 팝업
      if (options.type === "full") {
        $$("#cmmModal").addClass("micromodal-slide-bottom-full");
      } else if (options.type == "sticky") {
        $$("#cmmModal").addClass("micromodal-slide-sticky");
      } else if (options.type == "slideLeft") {
        $$("#cmmModal").addClass("micromodal-slide-bottom-right-full");
      } else if (options.type == "tablet") {
        $$("#cmmModal").addClass("micromodal-slide-bottom-tablet");
      }

      // 닫기 버튼 보이기/ 숨기기
      if (options.showCloseBtn) {
        $$("#cmmModal")
          .find(".modal__overlay")
          .addAttr("data-micromodal-close", "");
        $$("#cmmModal").find(".modal__close").show();
      } else {
        $$("#cmmModal")
          .find(".modal__overlay")
          .removeAttr("data-micromodal-close");
        $$("#cmmModal").find(".modal__close").hide();
      }

      btn1 = $$("#cmmModal").find("#btmBtn1").elements[0];
      btn2 = $$("#cmmModal").find("#btmBtn2").elements[0];

      // 버튼1 disabled 해제
      $$("#cmmModal").find("#btmBtn1").addAttr("aria-disabled", false);
      $$("#cmmModal").find("#btmBtn2").addAttr("aria-disabled", false);

      // 버튼1 보이기/ 숨기기
      this.btnSetTextShowAndHide(btn1, options.btn1Label);

      // 버튼2 보이기/ 숨기기
      this.btnSetTextShowAndHide(btn2, options.btn2Label);
    }

    /**
     * 모달내에 버튼 보이기/숨기기
     * @param {*} btnElem [HTMLElement] : 버튼 요소
     * @param {*} label   [String] : 버튼 라벨
     */
    btnSetTextShowAndHide(btnElem, label) {
      label ? $$(btnElem).show() : $$(btnElem).hide();
      label ? $$(btnElem).text(label) : "";
    }

    /**
     * 버튼 색 변경
     * @param {*} btnElem [HTMLElement] : 버튼 요소
     * @param {*} isMain  [Bool] : 메인 여부
     */
    btnSetMain(btnElem, isMain) {
      if (isMain) {
        $$(btnElem).removeClass("btn-secondary");
        $$(btnElem).addClass("btn-primary");
      } else {
        $$(btnElem).addClass("btn-secondary");
        $$(btnElem).removeClass("btn-primary");
      }
    }

    /**
     * DatePicker 팝업 오픈
     * @param {*} date    [String] : 기준일자
     * @param {*} type    [String] : 날짜 타입
     * @param {*} options [Object] : 팝업 옵션 {
     *                                           inputElem [HTMLInputElement] : 결과값 입력 요소
     *
     * }
     */
    async openDatePickerPopup(date, type, options) {
      if (options.modalTitle) {
        $$("#cmmModal").find("#modalTitle").text(options.modalTitle);
      } else {
        $$("#cmmModal").find("#modalTitle").hide();
      }

      // 월 선택 달력인 경우
      if (type === Const.PickerType.MONTH) {
        const path = {
          basePath: "/components/cmm/popup/",
          htmlPath: "/DatePickerYear.html",
        };
        // html을 로드한다.
        const popupContent = await this.loadPopupHtml(path);
        this.setElementByOptions(popupContent, path, options);

        MicroModal.show("cmmModal", {
          disableScroll: true, // [6]
          disableFocus: true, // [7]
          awaitOpenAnimation: true, // [8]
          awaitCloseAnimation: true, // [9]
          // debugMode: true // [10]
          onShow: function (modal) {
            // 모달 오픈 상태를 저장
            window.history.pushState({ modalOpen: true }, "", location.href);
            console.log("onshow history.state : ", window.history.state);

            $$("#cmmModal").addClass("micromodal-slide-bottom-right-full");

            const mpOptions = {
              pattern: "yyyy-mm",
              dateFormat: "yy-mm",
              showOn: "button",
              changeYear: false,
              yearRange: "c-2:c+2",
              prevText: "이전 달",
              nextText: "다음 달",
              monthNames: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ],
              monthNamesShort: [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월",
              ],
              showMonthAfterYear: true,
              showButtonPanel: false,
              closeText: "닫기",
              onBeforeShow: function (input, instance) {
                console.log("onBeforeShow : ", input);
              },

              onSelect: function (input, date) {
                console.log("onSelect : ", input);

                // onSelect callback 함수가 있는 경우
                if (
                  options.onSelect &&
                  typeof options.onSelect === "function"
                ) {
                  options.onSelect({
                    date: input,
                    resultCd: "000000",
                    resultMsg: "SUCCESS",
                  });
                }

                // input 객체를 전달 받은 경우
                if (options.inputElem.elements[0]) {
                  const inputElem = options.inputElem.elements[0];
                  console.log("inputElem : ", inputElem);
                  inputElem.innerText = input;
                }

                MicroModal.close("cmmModal");
              },
            };

            if (options.minYear) mpOptions["startYear"] = options.minYear;
            if (options.maxYear) mpOptions["finalYear"] = options.maxYear;
            if (options.setDate) mpOptions["setDate"] = options.setDate;
            if (options.onSelect) mpOptions["onSelect"] = options.onSelect;
            if (date) mpOptions["defaultDate"] = new Date(date);
            if (options.isDisabledFuture) mpOptions["maxDate"] = 0;
            if (options.isDisabledPast) mpOptions["minDate"] = 0;

            console.log("mpOptions : ", mpOptions);

            $("#datepickerMonth").monthpicker(mpOptions);

            // 닫기버튼 사용 옵션이 있는 경우
            if (options.showCloseBtn) {
              //console.log('showPopup closeBtn : ' , $$(modal).find('#closeBtn'));
              $$("#cmmModal")
                .find("#closeBtn")
                .on(
                  "click",
                  () => {
                    console.log("close!!!!!!!!!!!!!");
                    MicroModal.close("cmmModal");
                  },
                  true,
                );
            }
          },
          onClose: function () {
            options.onClose({
              date: null,
              resultCd: "000001",
              resultMsg: "CLOSE",
            });
            // 2025-04-30 : 반응형 대응.
            setTimeout(() => {
              if ($("#cmmModal").attr("aria-hidden") === "true") {
                $$("#cmmModal").removeClass(
                  "micromodal-slide-bottom-right-full",
                );
              }
            }, 1000);
            // $("#datepicker_month").datepicker("destroy")
          },
        });
      } else {
        // 일자 선택 달력인 경우

        const path = {
          basePath: "/components/cmm/popup/",
          htmlPath: "/DatePicker.html",
        };
        // html을 로드한다.
        const popupContent = await this.loadPopupHtml(path);
        this.setElementByOptions(popupContent, path, options);

        MicroModal.show("cmmModal", {
          // openTrigger: 'data-custom-open', // [3]
          // closeTrigger: 'data-custom-close', // [4]
          // openClass: 'is-open', // [5]
          disableScroll: true, // [6]
          disableFocus: true, // [7]
          awaitOpenAnimation: true, // [8]
          awaitCloseAnimation: true, // [9]
          // debugMode: true // [10]
          onShow: function (modalPopup) {
            // 모달 오픈 상태를 저장
            window.history.pushState({ modalOpen: true }, "", location.href);
            console.log("onshow history.state : ", window.history.state);

            const dpOptions = {
              defaultDate: date,
              dateFormat: "yy-mm-dd",
              prevText: "이전 달",
              nextText: "다음 달",
              monthNames: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ],
              monthNamesShort: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ],
              dayNames: ["일", "월", "화", "수", "목", "금", "토"],
              dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
              dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
              showMonthAfterYear: true,
              yearSuffix: ".",
              showButtonPanel: false,
              closeText: "닫기",
              showOtherMonths: false,
              onSelect: function (input, date) {
                if (
                  options.onSelect &&
                  typeof options.onSelect === "function"
                ) {
                  options.onSelect({
                    date: input,
                    resultCd: "000000",
                    resultMsg: "SUCCESS",
                  });
                }

                if (options.inputElem.elements[0]) {
                  const inputElem = options.inputElem.elements[0];
                  console.log("inputElem : ", inputElem);
                  inputElem.innerText = input;
                }

                MicroModal.close("cmmModal");
              },
            };

            if (options.isDisabledFuture) dpOptions["maxDate"] = 0;
            if (options.isDisabledPast) dpOptions["minDate"] = 0;

            $("#datepicker").datepicker(dpOptions);

            // 닫기버튼 사용 옵션이 있는 경우
            if (options.showCloseBtn) {
              //console.log('showPopup closeBtn : ' , $$(modalPopup).find('#closeBtn'));
              $$("#cmmModal")
                .find("#closeBtn")
                .on(
                  "click",
                  () => {
                    console.log("close!!!!!!!!!!!!!");
                    MicroModal.close("cmmModal");
                  },
                  true,
                );
            }
          },
          onClose: function (modalPopup) {
            options.onClose({
              date: null,
              resultCd: "000001",
              resultMsg: "CLOSE",
            });
            // console.log($(".jquery-datepicker").datepicker("refresh"))
          },
        });
      }
    }

    async openMenuModal(options) {
      //openMenuModal () {
      console.log("######openMenuModal Start");

      const ctx = this;

      const path = GlobalApp.router.routes["menu10p"];

      console.log("######openMenuModal path", path);
      console.log("######openMenuModal curPath", ctx.curPath);
      ctx.setCurPath(path);

      // html을 로드
      const popupContent = await ctx.loadPopupHtml(path);

      // 팝업 내에 요소 셋팅
      $$("#menuModal").find(".modal__content").html(popupContent);

      options.isMenu = true;

      // 팝업 띄운다
      //resolve(ctx.showPopup(popupContent, options, path, resolve));
      const popupJsPath = path.basePath + path.jsPath;
      let jsModule = await this.loadPopupJsModule(
        popupJsPath,
        $$("#menuModal").elements[0],
        options,
      );

      MicroModal.show("menuModal", {
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        onShow: (modal) => {
          console.log("######menuModal show#######");
          // 모달 오픈 상태를 저장
          window.history.pushState({ modalOpen: true }, "", location.href);
          console.log("onshow history.state : ", window.history.state);

          //gnb.init();
          //gnb.sizeCheck();

          // 홈 버튼
          $$("#menuModal")
            .find("#btnHome")
            .on(
              "click",
              () => {
                console.log("######menuModal btnHome########");
                options.onHome({ resultCd: "999999", resultMsg: "home" });
                MicroModal.close("menuModal");
              },
              true,
            );
        },
        onClose: function () {
          console.log("######menuModal onClose########");
          options.onClose({ resultCd: "999999", resultMsg: "close" });
        },
      });
    }

    openSelectModal(dataList, options) {
      const ctx = this;
      console.log("openSelectModal dataList : ", dataList);

      if (options.modalTitle) {
        $$("#selModalTitle").text(options.modalTitle);
      } else {
        $$("#selModalTitle").hide();
      }

      if (options.btnElem && options.btnElem instanceof HTMLElement) {
        const cmmt = options.defaultComment
          ? options.defaultComment
          : "선택해주세요.";
        $$(options.btnElem).find("span").text(cmmt);
      }

      let isProcClose = false;
      let content = "<ul>";
      dataList.forEach((item, index) => {
        const selectClass =
          item.isSelected || options.defaultSelectIndex === index
            ? 'class="select-active">'
            : ">";
        content +=
          "<li " +
          selectClass +
          '<button name="selectBtn" data-value=' +
          `${item.value}` +
          ' type="button"><span>' +
          `${item.label}` +
          "</span></button></li>";
      });

      content += "</ul>";

      $$("#selectModal").find(".select-option").html(content);

      const selectClickCallback = (event, element) => {
        console.log("elem : ", element);
        console.log("event.target : ", event.currentTarget);

        const btn = event.currentTarget;
        const value = btn.dataset.value;

        console.log("val : ", value);

        isProcClose = true;
        options.onCallback({
          data: value,
          resultCd: "000000",
          resultMsg: "success",
        });
        MicroModal.close("selectModal");
      };

      $$().findByName("selectBtn", "click", selectClickCallback);

      MicroModal.show("selectModal", {
        disableScroll: true, // [6]
        disableFocus: true, // [7]
        awaitOpenAnimation: true, // [8]
        awaitCloseAnimation: true, // [9]
        onShow: function (modalPopup, trigger, event) {
          // 모달 오픈 상태를 저장
          window.history.pushState({ modalOpen: true }, "", location.href);
          console.log("onshow history.state : ", window.history.state);

          console.log("modalPopup : ", modalPopup);
          console.log("trigger : ", trigger);
          console.log("event : ", event);

          // 모달 위치 또는 형태 작업
          ctx.modalPositionSet(modalPopup, trigger, event);

          // 2025-05-12
          $$("#selectModal").addClass("micromodal-slide-bottom-right-full");

          if (options.showCloseBtn) {
            //console.log('showPopup closeBtn : ' , $$(modal).find('#closeBtn'));
            $$("#selectModal")
              .find("#closeBtn2")
              .on(
                "click",
                () => {
                  console.log("close!!!!!!!!!!!!!");
                  options.onCallback({
                    resultCd: "999999",
                    resultMsg: "close",
                  });
                  MicroModal.close("selectModal");

                  $(trigger).removeClass("is-modal-open");
                },
                true,
              );
          }
        },
        onClose: function () {
          if (
            !isProcClose &&
            options.onClose &&
            typeof options.onClose === "function"
          ) {
            // 2025-05-12
            setTimeout(() => {
              if ($("#selectModal").attr("aria-hidden") === "true") {
                $$("#selectModal").removeClass(
                  "micromodal-slide-bottom-right-full",
                );
              }
            }, 1000);
            options.onClose({ resultCd: "999999", resultMsg: "close" });
          }
        },
      });
    }

    modalPositionSet(modalPopup, trigger, event) {
      let modalTrigger = trigger;
      // console.log(modalTrigger)
      if (modalTrigger.tagName === "SPAN") {
        modalTrigger = modalTrigger.closest("button");
        // console.log(modalTrigger)
      }

      const triggerPositionTop = $(modalTrigger).offset().top;
      const triggerPositionLeft = $(modalTrigger).offset().left;
      const triggerPositionBottom =
        $(modalTrigger).offset().top + $(modalTrigger).outerHeight();
      const triggerPositionRight =
        $(modalTrigger).offset().left + $(modalTrigger).outerWidth();
      const triggerWidth = $(modalTrigger).outerWidth();
      const windowWidth = $(window).outerWidth();
      const windowHeight = $(window).outerHeight();

      let scrollPosition = $(window).scrollTop();
      let scrollLeftPosition = $(window).scrollLeft();

      modalPopup
        .querySelectorAll(".select-option ul")
        .forEach(function (items) {
          //               if (items.childElementCount > 4) {
          modalPopup.classList.remove("micromodal-slide-select");
          modalPopup.classList.add("micromodal-slide-bottom");
          //               }
        });

      const dropDown = modalPopup.classList.contains(
        "micromodal-slide-dropdown",
      );
      const selectBox = modalPopup.classList.contains(
        "micromodal-slide-select",
      );

      if (dropDown || selectBox) {
        const modalPopupBody = modalPopup.querySelector(".modal__container");
        const modalPopupBodyWidth = modalPopupBody.clientWidth;
        let padding = 10;

        // default (position right)
        // default (position right)
        if (triggerPositionRight > windowWidth / 2) {
          if (selectBox) {
            modalPopupBody.style.width = triggerWidth + "px";
            modalPopupBody.style.left =
              triggerPositionRight - triggerWidth + "px";
          } else {
            modalPopupBody.style.left =
              triggerPositionRight - modalPopupBodyWidth + "px";
          }
        }
        // reverse (position left)
        else if (windowWidth / 2 > triggerPositionRight) {
          if (selectBox) {
            modalPopupBody.style.width = triggerWidth + "px";
            modalPopupBody.style.left =
              triggerPositionRight - triggerWidth + "px";
          } else {
            modalPopupBody.style.left =
              triggerPositionRight - modalPopupBodyWidth + "px";
          }
        }

        // default (position bottom)
        if (windowHeight / 2 > triggerPositionTop - scrollPosition) {
          modalPopupBody.style.top =
            triggerPositionBottom + padding - scrollPosition + "px";
        } else if (windowHeight / 2 < triggerPositionTop - scrollPosition) {
          // reverse (position top)
          modalPopupBody.style.bottom =
            windowHeight - triggerPositionTop + padding + scrollPosition + "px";
        }
      }
      modalTrigger.classList.add("is-modal-open");
    }

    setDatePickerBtn() {}
  };
})();

export default ComPopUtils;
