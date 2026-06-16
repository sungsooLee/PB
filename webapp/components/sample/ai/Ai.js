import { BaseModule } from "../../cmm/BaseModule.js";
import SSEUtils from "../../resources/js/common/SSEUtils.js";

export default class Ai extends BaseModule {
  constructor(elem) {
    super(elem);
    [this.fstDbRgsId, this.setFstDbRgsId] = this.useState(
      "fstDbRgsId",
      "31800495",
    ); // 행번
    [this.brcd, this.setBrcd] = this.useState("brcd", "000120"); // 부서코드
    [this.bltnClf, this.setBltnClf] = this.useState("bltnClf", "B01"); // 게시분류
    [this.infwChnlDscd, this.setInfwChnlDscd] = this.useState(
      "infwChnlDscd",
      "C03",
    ); // 유입채널
    [this.useEn, this.setUseEn] = this.useState("useEn", "Y"); // 사용 유무
    [this.query, this.setQuery] = this.useState("query", "KYC 절차는?"); // 사용자 질의
    [this.streaming, this.setStreaming] = this.useState("streaming", "true"); // 스트리밍 사용 여부
  }

  init() {
    super.init(this);
    log.debug("AI!!!!");

    this.initBinding();

    $$(document).findByName("rad001", "click", this.rad1Callback);
    $$("#sendBtn").on("click", async () => await this.handleClick());
  }

  initBinding() {
    this.bind("fstDbRgsId", $$("#fst_db_rgs_id"), "input");
    this.bind("bltnClf", $$("#bltn_clf"), "input");
    this.bind("infwChnlDscd", $$("#infw_chnl_dscd"), "input");
    this.bind("useEn", $$("#usg_en"), "input");
    this.bind("query", $$("#query"), "input");
    this.bind("streaming", $$("#streaming"), "input");
  }

  async handleClick() {
    const stat = $("#getArea").is(":visible");
    const url = stat
      ? "/api/aiCnsl/getNotice.json"
      : "/api/aiCnsl/askStream.json";

    if (stat) {
      // GET
      const param = {
        fst_db_rgs_id: this.fstDbRgsId.value,
        bltn_clf: this.bltnClf.value,
        infw_chnl_dscd: this.infwChnlDscd.value,
        usg_en: this.useEn.value,
      };

      console.log("get :: " + param);
      const res = await ApiUtils.sendGet(url, param);

      console.log("res : ", JSON.stringify(res));
    } else {
      // POST
      const param = {
        query: this.query.value,
        chat_history: [],
        streaming: this.streaming.value,
      };

      const sseUtils = new SSEUtils(url, param);

      sseUtils.start(
        // 기본 메시지 처리 핸들러
        (data) => {
          console.log("default message : ", data);
        },
        // 추가 메시지 처리 핸들러
        {
          CHUNK: (data) => {
            console.log("chunk event : ", data);
          },
          END: (data) => {
            sseUtils.stop();
          },
        },
      );

      // const res = await ApiUtils.sendPost(url, param);
      //
      // console.log('res : ' , JSON.stringify(res));
    }
  }

  rad1Callback(event, element) {
    console.log("Element clicked : ", element);
    console.log("rad1Callback val : ", element.value);

    if (element.value == "get") {
      $$("#getArea").show();
      $$("#postArea").hide();
    } else {
      $$("#getArea").hide();
      $$("#postArea").show();
    }
  }

  /*
     * function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookieArray(cname) {
        var cookie = getCookie(cname);
        return cookie ? JSON.parse(cookie) : [];
    }

    function pushToCookieArray(cname, cvalue, exdays) {
        var cookieArray = getCookieArray(cname);
        cookieArray.push(cvalue);
        setCookie(cname, JSON.stringify(cookieArray), exdays);
    }
     * */

  destroy() {
    super.destroy(this);
  }
}
