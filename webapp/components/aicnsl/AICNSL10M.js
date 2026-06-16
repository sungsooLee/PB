/**
 * description : AI 지식상담
 *  화면ID : PBWAI000000
 *  프로그램ID : AICNSL10M
 */

import { BaseModule } from "../cmm/BaseModule.js";
import SSEUtils from "../../resources/js/common/SSEUtils.js";

export default class AICNSL10M extends BaseModule {
  constructor(elem) {
    super(elem);
    this.rootElem = elem;
    this.timerId = null;

    this.TYPE = Object.freeze({
      ANSWER: "answer",
      EMPL: "empl",
      INTRO: "intro",
      LINK: "link",
      NOTI: "noti",
      QUES: "ques",
      REASON: "reason",
    });

    this.PATH = Object.freeze({
      ANSWER: "/components/aicnsl/comp/answer/",
      EMPL: "/components/aicnsl/comp/empl/",
      INTRO: "/components/aicnsl/comp/intro/",
      LINK: "/components/aicnsl/comp/link/",
      NOTI: "/components/aicnsl/comp/noti/",
      QUES: "/components/aicnsl/comp/ques/",
      REASON: "/components/aicnsl/comp/reason/",
    });

    [this.quesVal, this.setQuesVal] = this.useState("quesVal", "");
    [this.quesAry, this.setQuesAry] = this.useState("quesAry", {});
    [this.reasonAry, this.setReasonAry] = this.useState("reasonAry", {});
    [this.srchId, this.setSrchId] = this.useState("srchId", "");

    [this.isChk, this.setIsChk] = this.useState("isChk", false);
  }

  async init() {
    super.init(this);
    console.log("AI Cnsl init!!");

    this.bind("quesVal", $$("#quesInput"), "input");
    this.registerCallback("touchend", $$("#sendBtn"), this.askQuestion);

    // intro 조회
    await this.reqIntroApi();

    // 공지사항 조회
    // TODO 자주하는 질문 목록이 수집이 되지 않아, 오픈 이후에 적용 예정
    await this.reqNotiApi();

    // 공지사항 스와이프
    //this.initSwipe();

    const searchKeyup = async (event) => {
      //console.log('keyup!!');

      if (event.key !== "Shift") {
        let searchType = false;
        if (event.key === "Enter") {
          event.preventDefault();
          console.log("enter!!");
          await this.askQuestion();
        }
      }
    };
    this.registerCallback("keydown", $$("#quesInput"), searchKeyup);

    const searchInput = async (event) => {
      let val = event.target.value;

      if (val.trim() === "") {
        this.setIsChk(false);
        $$("#sendBtn").addAttr("aria-disabled", true);
      } else {
        this.setIsChk(true);
        $$("#sendBtn").addAttr("aria-disabled", false);
      }
    };

    this.registerCallback("input", $$("#quesInput"), searchInput);

    $$("a[name=aiType]").on("touchend", async () => {
      let type = event.target.dataset.id;
      const props = {
        aiType: type,
      };

      if (type == "1") {
        globalApp.router.navigate("aiCnslng1", props, false);
        //$$('#aiType2').addClass('tab-active');
        //$$('#aiType1').removeClass('tab-active');
      } else {
        globalApp.router.navigate("aiCnslng", props, false);
        //$$('#aiType1').addClass('tab-active');
        //$$('#aiType2').removeClass('tab-active');
      }
    });
  }

  /**
   * 인트로 API 조회
   */
  async reqIntroApi() {
    const aiType = $("input[name=aiSelect]").val();
    const url = "/api/aiCnsl/getNotice.json";
    const param = {
      fst_db_rgs_id: "31800495",
      bltn_clf: "B02",
      infw_chnl_dscd: aiType == "0" ? "C03" : "C49",
      usg_en: "Y",
      ai_type: "0",
    };

    const res = await ApiUtils.sendGet(url, param);

    const data = JSON.parse(res.data.data);
    console.log("reqIntroApi : ", data);
    console.log("reqIntroApi output : ", data.output.data);

    //응닶 값이 있으면 말풍선을 그린다.
    if (data && data.output.data.length > 0) {
      const g = this;
      const btnCallback = (data) => {
        g.setQuesVal(data.quesVal);
        g.setIsChk(true);
        g.askQuestion();
      };

      // 말풍선 로드
      const htmlContent = await this.loadHtml(this.TYPE.INTRO);
      this.appendBubble(
        this.TYPE.INTRO,
        htmlContent,
        data.output.data,
        btnCallback,
      );

      // scroll을 맨 하단으로 이동
      //this.scrollBottom();
    }
  }

  /**
   * 공지사항 API 조회
   */
  async reqNotiApi() {
    const aiType = $("input[name=aiSelect]").val();
    const url = "/api/aiCnsl/getNotice.json";
    const param = {
      fst_db_rgs_id: "31800495",
      bltn_clf: "B01",
      infw_chnl_dscd: aiType == "0" ? "C03" : "C49",
      usg_en: "Y",
      ai_type: aiType,
    };

    const res = await ApiUtils.sendGet(url, param);

    const data = JSON.parse(res.data.data);
    console.log("selNotiMsg : ", data);
    console.log("selNotiMsg output : ", data.output.data);

    // 응답 값이 있으면 말풍선을 그린다
    if (data && data.output.data.length > 0) {
      const g = this;
      const btnCallback = (data) => {
        console.log("btnCallback : ", data);

        g.setQuesVal(data.quesVal);
        this.setIsChk(true);
        g.askQuestion();
      };

      // 말풍선 로드
      const htmlContent = await this.loadHtml(this.TYPE.NOTI);
      this.appendBubble(
        this.TYPE.NOTI,
        htmlContent,
        data.output.data,
        btnCallback,
      );

      // scroll을 맨 하단으로 이동
      //this.scrollBottom();

      if (aiType === "1") {
        $$("#introText3").addAttr("style", "display:none");
        $$("#introText1").addAttr("style", "display:block");
        $$("#introText2").addAttr("style", "display:block");
      } else {
        $$("#introText1").addAttr("style", "display:none");
        $$("#introText2").addAttr("style", "display:none");
        $$("#introText3").addAttr("style", "display:block");
      }
    }
  }

  /**
   * 질문 하기
   */
  async askQuestion() {
    const aiType = $("input[name=aiSelect]").val();
    console.log("aiType ====> : ", aiType);
    if (this.isChk.value) {
      //CmmUtils.showLoading();
      let docList = [];

      //질문 id 생성
      const quesId = dayjs().format("HHmmssSSS");
      console.log("quesId : ", quesId);

      const quesData = {
        quesVal: this.quesVal.value,
        quesId: quesId,
      };

      // 전역 변수에 질문 저장
      const quesAry = this.quesAry.value;
      quesAry[quesId] = quesData;
      this.setQuesAry(quesAry);

      // 말풍선 로드
      const htmlContent = await this.loadHtml(this.TYPE.QUES);
      this.appendBubble(this.TYPE.QUES, htmlContent, quesData);

      // scroll을 맨 하단으로 이동
      this.scrollBottom();

      // 로딩 말풍선 띄움
      this.loadingSpinner();

      // 질문 api 호출
      const url = "/api/aiCnsl/askStream.json";

      const params = {
        query: this.quesVal.value,
        chat_history: [],
        streaming: true,
        ai_type: aiType,
      };

      const sseUtils = new SSEUtils(url, params);

      const answerContent = await this.loadHtml(this.TYPE.ANSWER);
      const answerModule = await this.appendBubble(
        this.TYPE.ANSWER,
        answerContent,
        quesData,
        null,
      );

      // scroll을 맨 하단으로 이동
      this.scrollBottom();

      let selectedDoc = 0;

      // 응답이 오면 타입별로 화면에 응답 말풍선 append
      sseUtils.start(
        (res) => {
          //                	if(aiType == '0') {
          //	                    if( answerModule && answerModule.appendResTxt ) {
          //	                        //CmmUtils.hideLoading();
          //	                        setTimeout(() => {
          //	                            answerModule.appendResTxt(quesData, res);
          //	                            //answerModule.appendThinkingTxt(res);
          //
          //	                            // scroll을 맨 하단으로 이동
          //	                            this.scrollBottom();
          //	                        }, 500);
          //	                    }
          //                	}
          this.hideSpinner();
        },
        {
          // 근거 문서 선택 값 세팅
          //                    DOC : async (data) => {
          //                        if ( data ) {
          //                            selectedDoc = ( data.indexOf("|")> -1 )? data.split("|").map(n => Number(n) - 1) : [Number(data) - 1];
          //                            console.log('selectedDoc : ', selectedDoc);
          //
          //                            if ( selectedDoc && selectedDoc.length > 0 && selectedDoc[0] !== -1 ) {
          //
          //                                console.log('this.srchId.value : ', this.srchId.value);
          //                                answerModule.showLikeDisLikePanel(quesData, this.srchId.value);
          //                            }
          //                        }
          //                    },

          // 질문 ID 전송
          SRCHID: async (data) => {
            this.setSrchId(data);
            console.log("askQuestion ====> srchId : ", this.srchId.value);
          },

          PIPELINE_DETAIL: async (data) => {
            console.log("pipelineDetail : ", data);
          },

          // 근거 문서 세팅
          RESPONSE: async (data) => {
            if (aiType == "0") {
              console.log("reason Event : ", data);
              if (data && data.length > 0) {
                //근거문서 노출 개수
                const LIMIT_DOC_COUNT = 5;
                docList = [];
                if (data[0].hasOwnProperty("EXTRA")) {
                  let extra = data[0].EXTRA;
                  if (extra && extra.length > 0) {
                    extra.forEach((docData, index) => {
                      if (index >= LIMIT_DOC_COUNT) {
                        return false;
                      }
                      console.log("atfl_id : ", docData.atfl_id);
                      docList.push(docData);
                    });
                  }
                } else {
                  data.forEach((docData, index) => {
                    if (index >= LIMIT_DOC_COUNT) {
                      return false;
                    }
                    console.log("atfl_id : ", docData.atfl_id);
                    if (docData.atfl_id !== "" && docData.atfl_id !== "blank") {
                      docList.push(docData);
                    }
                  });
                }

                console.log("docList : ", docList);

                if (docList.length > 0) {
                  const reasonMap = this.reasonAry.value;
                  reasonMap[quesId] = docList;
                  this.setReasonAry(reasonMap);

                  // 운영 근거문서 임시로 막음
                  // EnvUtils.isPrd()? answerModule.hideReasonBtn(quesId) :
                  //     answerModule.showReasonBtn((data) => this.showReasonBubble(data, quesId));
                  answerModule.showLikeDisLikePanel(
                    quesData,
                    this.srchId.value,
                  );
                  answerModule.showReasonBtn((data) =>
                    this.showReasonBubble(data, quesId),
                  );

                  console.log("reasonAry : ", this.reasonAry.value);
                } else {
                  answerModule.hideReasonBtn(quesId);
                }
              }
            }
          },

          // 추론과정
          THINKING: async (data) => {
            console.log("thinking Event : ", data);
            //                        if(aiType == '1') {

            //const hashTags = /#[가-힣a-zA-Z0-9_]+/g;
            if (data.indexOf("</think>") > -1) {
              let thinking = data
                .split("</think>")[0]
                .replaceAll("#", "")
                .replaceAll("*", "")
                .replaceAll("^", "")
                .replaceAll("---", "");
              let chunkData = data
                .split("</think>")[1]
                .replaceAll("#", "")
                .replaceAll("*", "")
                .replaceAll("^", "")
                .replaceAll("---", "");
              await answerModule.appendThinkingTxt(quesData, thinking);
              await answerModule.appendResTxt(quesData, chunkData);
            } else {
              await answerModule.appendResTxt(
                quesData,
                data
                  .replaceAll("#", "")
                  .replaceAll("*", "")
                  .replaceAll("^", "")
                  .replaceAll("---", ""),
              );
            }
            //                        }
          },

          // 관련 민원 데이터 세팅
          COMPLAINT: (data) => {
            if (data && data.complaint_contents !== null) {
              answerModule.appendComplaintTxt(data);
            }
          },

          EXCEPTION: (msg) => {
            CmmUtils.alert("", msg, {
              useCloseBtn: false,
              btnLabel: "확인",
            });

            // 버블 멈추기
            this.hideSpinner();
          },

          END: (data) => {
            sseUtils.stop();
          },
        },
      );

      // 로컬 스토리지에 입력값 저장

      // 입력값 초기화
      this.setQuesVal("");

      this.setIsChk(false);
      $$("#sendBtn").addAttr("aria-disabled", true);
    }
  }

  async showReasonBubble(res, quesId) {
    console.log("showReasonBubble!!!", quesId);

    const divElem = document.getElementById(quesId);
    const childCnt = divElem.childElementCount;

    // 자식이 하나면 근거문서를 붙인다
    if (childCnt === 1) {
      const reasonAry = this.reasonAry.value;
      const docList = reasonAry[quesId];

      if (docList.length > 0) {
        // 말풍선 로드
        const htmlContent = await this.loadHtml(this.TYPE.REASON);
        this.appendBubble(
          this.TYPE.REASON,
          htmlContent,
          docList,
          null,
          "#" + quesId,
        );

        const currentBodies = document.querySelectorAll(
          "#aiCnslBody .chatbody",
        );
        const currentBubble = currentBodies[currentBodies.length - 2];

        console.log("lastBubble : ", currentBubble);
      }
    } else if (childCnt === 2) {
      const disValue = window.getComputedStyle(
        divElem.lastElementChild,
      ).display;
      if (disValue === "block") {
        // 자식이 2개이면 마지막 요소를 숨긴다.
        divElem.lastElementChild.style.display = "none";
      } else {
        // 자식이 2개이면 마지막 요소를 보이게 한다.
        divElem.lastElementChild.style.display = "block";
      }
    }
  }

  async loadHtml(type) {
    return new Promise(async (resolve, reject) => {
      console.log("loadHtml : ", type);

      console.log(Object.keys(this.PATH));
      const clsNm = type.charAt(0).toUpperCase() + type.slice(1);
      const path = this.PATH[type.toUpperCase()] + clsNm + ".html";
      const response = await fetch(path);

      if (!response.ok) {
        reject(`Failed to load HTML from ${path}`);
      }

      resolve(response.text());
    });
  }

  /**
   * 말풍선 붙이기
   * @param type          [String] : 말풍선 타입 ( this.TYPE )
   * @param htmlContent   [String] : 말풍선 내에 들어갈 html contents
   * @param data          [Object] : 말풍선 컴포넌트로 전달할 데이터 객체
   * @param callback      [Object] : 말풍선 컴포넌트와 연결할 callback 함수
   * @param bubbleDiv     [HTMLElement] : 부모 요소
   */
  async appendBubble(type, htmlContent, data, callback, bubbleDiv) {
    // 버블 컴포넌트로 전달할 node 추출
    const tDiv = document.createElement("div");
    tDiv.innerHTML = htmlContent;
    const parentDiv = tDiv.querySelector("div");
    const loadingBubble = document.querySelector(".chatbottom");
    let bodyDiv = bubbleDiv ? bubbleDiv : "#aiCnslBody";

    bodyDiv =
      type === this.TYPE.INTRO || type === this.TYPE.NOTI
        ? "#aiCnslIntro"
        : bodyDiv;

    console.log("[ Aiden ]", type);

    if (type === this.TYPE.ANSWER) {
      parentDiv.id = data.quesId;
    }

    console.log("parentDiv : ", parentDiv);
    console.log("bodyDiv : ", bodyDiv);

    // 화면에 질문 말풍선 append
    if (bodyDiv === "#aiCnslBody") {
      const body = document.getElementById(bodyDiv.slice(1));

      body.insertBefore(parentDiv, loadingBubble);
    } else {
      $$(bodyDiv).append(parentDiv);
    }

    if (type === this.TYPE.ANSWER) {
      $$(parentDiv).hide();
      let btnList = [
        "btnReasonDisplay",
        "divThinking",
        "preThinkTxt",
        "extraDiv",
        "strongThinkTitle",
        "answerPre",
      ];
      btnList.forEach((list) => {
        const btn = $$(parentDiv).find("#" + list);
        console.log(list + " - ", btn);
        btn.elements[0].id = list + "_" + data.quesId;
      });

      //            const btn = $$(parentDiv).find('#btnReasonDisplay');
      //            console.log('reasonBtn : ', btn);
      //            btn.elements[0].id = 'btnReasonDisplay_' + data.quesId;
      //
      //            const divId = $$(parentDiv).find('#divThinking');
      //            console.log('divThinking : ', divId);
      //            divId.elements[0].id = 'divThinking_' + data.quesId;
      //
      //            const preId = $$(parentDiv).find('#preThinkTxt');
      //            console.log('preThinkTxt : ', preId);
      //            preId.elements[0].id = 'preThinkTxt_' + data.quesId;
      //
      //            const extraId = $$(parentDiv).find('#extraDiv');
      //            console.log('extraDiv : ', extraId);
      //            extraId.elements[0].id = 'extraDiv_' + data.quesId;
      //
      //            const strongId = $$(parentDiv).find('#strongThinkTitle');
      //            console.log('strongThinkTitle : ', strongId);
      //            strongId.elements[0].id = 'strongThinkTitle_' + data.quesId;
      //
      //            const answerPre = $$(parentDiv).find('#answerPre');
      //            console.log('answerPre : ', answerPre);
      //            answerPre.elements[0].id = 'answerPre_' + data.quesId;
    }

    // module 로드 ( 말풍선에 입력값 삽입 )
    return await this.loadJs(type, parentDiv, data, callback);
  }

  async loadJs(type, elem, data, callback) {
    const clsNm = type.charAt(0).toUpperCase() + type.slice(1);
    const path = this.PATH[type.toUpperCase()] + clsNm + ".js";

    console.log(path);

    const { default: ModuleClass } = await import(path);
    const moduleInstance = new ModuleClass(elem);
    console.log("module : ", moduleInstance);

    moduleInstance.init?.(data, callback);

    return moduleInstance;
  }

  // scroll page bottom animation 100%
  scrollBottom = function () {
    var $el = "";
    if ($("html").hasClass("MOBILE") || $("html").hasClass("PORTRAIT")) {
      $el = $("html");
    } else {
      $el = $("#aiCnslBody");
      // $el = $('.chatgroup.chatgroup-body');
    }
    // console.log("[ Aiden ] scrollBottom 실행됨. $el = ", $el)
    // console.log($el)
    var $elDefaultHeight = $(window).height();
    var scrollTime = 400;
    $el.stop().animate(
      {
        scrollTop: $el.prop("scrollHeight"),
      },
      scrollTime,
    );
  };

  // 말풍선 로딩 띄우기
  loadingSpinner() {
    $$(".chatBottom").append($$(".chat-loading").elements[0]);

    const random = Math.random() * 1000 + 1000;
    $$(".chat-loading").show();
    $$(".chat-loading").removeClass("hide");
    $$(".chat-loading").addClass("show");

    //문구
    this.changeLoadingMessage();
    CmmUtils.showLoadingEmpty();
  }

  /**
   * TODO : 실시간 답변 상태 연동
   */
  async changeLoadingMessage() {
    const messages = [
      "답변을 준비 중입니다. 잠시만 기다려 주세요.",
      "질의 재생성",
      "정보검색 시작",
      "답변 방법 결정 종료(영역 別 추가 검색 실시)",
      "최종 답변 생성",
      "최종 답변 생성.",
      "최종 답변 생성..",
      "최종 답변 생성...",
      "최종 답변 생성....",
      "최종 답변 생성.....",
      "최종 답변 생성......",
      "최종 답변 생성.......",
      "최종 답변 생성........",
      "최종 답변 생성.........",
      "최종 답변 생성..........",
    ];

    $$("#loadingMessage").html("답변을 준비 중입니다. 잠시만 기다려 주세요.");
    clearInterval(this.timerId);

    let currentMessageIndex = 0;
    const changeMessage = () => {
      $$("#loadingMessage").html(messages[currentMessageIndex]);
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      if (currentMessageIndex >= 14) {
        clearInterval(this.timerId);
      }
    };
    this.timerId = setInterval(changeMessage, 5000);
  }

  // 말풍선 로딩 숨기기
  hideSpinner() {
    clearInterval(this.timerId);
    $$(".chat-loading").removeClass("show");
    $$(".chat-loading").addClass("hide");
    $$(".chat-loading").hide();
    this.scrollBottom();
    CmmUtils.hideLoading();
  }

  initSwipe() {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1.02,
      spaceBetween: 8,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  destroy() {
    super.destroy(this);
  }
}
